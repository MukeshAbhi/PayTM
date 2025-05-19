import express from "express";
import {prisma }from "@repo/db/prisma";
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
        console.error("Zod error");
        res.status(411).json({
            message:"Error while processing webhook"
        });
        return;
    }
    
    const paymentInfo = parsedData.data;

    // Check if this request actually came from a bank , use a webhook secret here
    try{
        const key = parsedData.data.key;

        if(key != HMAC_KEY){
            res.status(411).json({
                message:"Bank not authorised"
            })
            return;
        }

    }catch(error) {
        console.error("Transaction error:", error);
        res.status(411).json({
            message:"Error while processing webhook"
        })
    }
    

    // transcations
   try{
    await prisma.$transaction([
        prisma.walletBalance.update({
            where: {
                userId: paymentInfo.userId,
            },
            data: {
                amount: {
                    increment: paymentInfo.amount
                }
            }
        }),
        prisma.onRampTranscation.update({
            where: {
                token: paymentInfo.token
            },
            data: {
                status: "Success"
            }
        })
    ]);

    res.status(200).json({
        message:"captured"
    })

   } catch(error) {
    console.error("Transaction error:", error);
    res.status(411).json({
        message:"Error while processing webhook"
    })
   }
});

app.listen(3003, () => {
    console.log("Server running on port 3003");
});
