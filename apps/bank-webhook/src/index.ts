import express from "express";
import { prisma }from "@repo/db/prisma";
import z from "zod";

const app = express();
app.use(express.json());

const HMAC_KEY="JNAFJSDJJK";

const zodSchema = z.object({
    token: z.string(),
    userId: z.string(),
    amount: z.number(),
    key: z.string(),
});

app.post("/toWebhook",async (req, res) => {
     
    const FIVE_MINUTES = 5 * 60 * 1000;
    const now = Date.now();
    //Zod Validation
    const parsedData = zodSchema.safeParse(req.body);

    if(!parsedData.success)
    {
        console.error("Zod error ", parsedData.error);
        res.status(411).json({
            message:"Error while processing webhook"
        });
        return;
    }
    
    const paymentInfo = parsedData.data;

    // Check if this request actually came from a bank , use a webhook secret here
    
    const key = paymentInfo.key;

    if(key != HMAC_KEY){
        res.status(411).json({
            message:"Bank not authorised"
        })
        return;
    }

    
    // transcations
   try{
        const newAction = await prisma.onRampTransaction.findFirst({
            where: { token: paymentInfo.token},
            select: { 
                type: true,
                status:true
            }
        });

        if(!newAction){
            res.status(404).json({ message: "Transaction not found" });
            return;
        }

        //Check if the transaction is 
        if(newAction.status != "Processing"){
            return;
        }

        // Check if transaction is older than 5 minutes and mark as failed if yes
        const allTransactions = await prisma.onRampTransaction.findMany({
            where: {
                userId: paymentInfo.userId,
                status: "Processing"
            },
            select: {
                id: true,
                startTime: true
            }
        });
                //Filtter and get the ids of expired transactions 
        const expiredTransactionIds = allTransactions.filter(txn => now - txn.startTime.getTime() > FIVE_MINUTES)
                                                     .map(txn => txn.id);
        
        if(expiredTransactionIds.length > 0){
            await prisma.onRampTransaction.updateMany({
                where:{
                    id: {
                        in: expiredTransactionIds
                    }
                },
                data: {
                    status: "Failure"
                }
            })
            console.log(`Marked ${expiredTransactionIds.length} transactions as "Failure"`);
        }

        const lower = newAction.type.toLowerCase();
        console.log("type : ", lower);
        
        if(lower === "debit")
        {// Debit: decrement wallet balance
            await prisma.$transaction([
                prisma.walletBalance.update({
                    where: { userId: paymentInfo.userId},
                    data: {
                        amount: {
                            decrement: paymentInfo.amount
                        }
                    }
                }),
                prisma.onRampTransaction.update({
                    where: {
                        token: paymentInfo.token
                    },
                    data: {
                        status: "Success"
                    }
                })
            ])
        } else {// Credit : upsert wallet balance and update transaction status
            await prisma.$transaction([
                prisma.walletBalance.upsert({
                    where: { userId: paymentInfo.userId },
                        update: {
                            amount: {
                                increment: paymentInfo.amount
                            }
                    },
                    create: {
                        userId: paymentInfo.userId,
                        amount: paymentInfo.amount,
                        locked: 0
                    }
                }),
                prisma.onRampTransaction.update({
                    where: {
                        token: paymentInfo.token
                    },
                    data: {
                        status: "Success"
                    }
                })
            ]);
        }
        

    res.status(200).json({message:"Captured"})

   } catch(error) {
        console.error("Transaction error:", error);
        
        await prisma.onRampTransaction.update({
                where: {
                    token: paymentInfo.token
                },
                data: {
                    status: "Failure"
                }
            })

    

    res.status(411).json({
        message:"Error while processing webhook"
    })
   }
});

app.listen(3003, () => {
    console.log("Server running on port 3003");
});
