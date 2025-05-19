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
        const status = await prisma.onRampTransaction.findFirst({
            where: { userId: paymentInfo.userId},
            select: { type: true }
        });

        if(!status){
            res.status(404).json({ message: "Transaction not found" });
            return;
        }

        const lower = status.type.toLowerCase();
        console.log("type : ", lower);
        
        if(lower === "debit")
        {
            await prisma.$transaction([
                prisma.walletBalance.update({
                    where: { userId: paymentInfo.userId},
                    data: {
                        amount: {
                            decrement: paymentInfo.amount
                        }
                    }
                })
            ])
        } else {
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
