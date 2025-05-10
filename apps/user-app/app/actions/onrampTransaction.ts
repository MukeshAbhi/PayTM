"use server"

import { auth } from "@/authTypes";
import { prisma } from "@repo/db/prisma";
import axios from "axios";

const WEBHOOK_URL = process.env.BANK_WEBHOOK_URL;

export async function createOnrampTransaction(amount: number, provider: string) {

    const session = await auth();
    console.log("here");
    console.log("userid :", session?.user?.id)

    if(!session || !session.user?.id)
    {
        console.log("No valid session");
        return {
            message: "User not logged in"
        };
    }
    const userId = session.user.id;
    //like the token is from banking provider(sbi/hdfc);
    const token = (Math.random() * 1000).toString();
   try{
        await prisma.onRampTranscation.create({
            data:{
                provider,
                status:"Processing",
                amount:amount * 100,
                token,
                startTime: new Date(),
                userId:userId
            }
        });

        await hitBankapi(amount, userId, token);
        return{
            message:"Done"
        }
   } catch(e) {
        console.log("Failed in create an Onramptranscation ", e);
        return null;
   }
};


export async function hitBankapi(amount: number,userId: string, token: string){

   
    await axios.post(`${WEBHOOK_URL}/toWebhook`,{
        amount,userId,token
    })

}