"use server"

import { auth } from "@/authTypes";
import { prisma } from "@repo/db/prisma";
import axios from "axios";

const WEBHOOK_URL = process.env.BANK_WEBHOOK_URL;
const HMAC_KEY = process.env.HMAC_KEY;


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


    //like the token is from banking provider(sbi/hdfc) => not true
    const token = (Math.random() * 1000).toString();
   try{
        await prisma.onRampTranscation.create({
            data:{
                provider,
                status:"Processing",
                amount:amount * 100,
                token,
                startTime: new Date(),
                userId:userId,
                type:"Credit"
            }
        });

        await hitBankapi(amount, userId, token, HMAC_KEY as string);
        return{
            message:"Done"
        }
   } catch(e) {
        console.log("Failed in create an Onramptranscation ", e);
        return null;
   }
};

//mimicing a bank
export async function hitBankapi(amount: number, userId: string, token: string ,key: string){

    await axios.post(`${WEBHOOK_URL}/toWebhook`,{
        amount, userId, token, key
    })

}