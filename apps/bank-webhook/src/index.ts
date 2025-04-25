import express from "express";
import {prisma }from "@repo/db/prisma"

const app = express();


app.post("/hdfcWebhook",async (req, res) => {
    //TODO: Add Zod Validation
    // Check if this request actually came from a bank , use a webhook secret here

    const paymentInfo = {
        token: req.body.token,
        userId: req.body.user_identifier,
        amount: req.body.amount
    }

    // transcations
    await prisma.balance.update({
        where: {
            userId: paymentInfo.userId,
        },
        data: {
            amount: {
                increment: paymentInfo.amount
            }
        }
    });

    await prisma.onRampTranscation.update({
        where: {
            token: paymentInfo.token
        },
        data: {
            status: "Success"
        }
    });
    res.status(200).json({
        message:"captured"
    })
})
