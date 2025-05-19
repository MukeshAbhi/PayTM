"use server"

import { prisma } from "@repo/db/prisma";
import axios from "axios";
import { getUserData, getUserWalletBalance } from "./user";
import { TransactionType } from "@repo/types/zodtypes";

const WEBHOOK_URL = process.env.BANK_WEBHOOK_URL;
const HMAC_KEY = process.env.HMAC_KEY;

export async function checkUserBalance(amount: number, provider: string, type:TransactionType){
    const data = await getUserWalletBalance();
    const balance = data.amount;
    if((balance - amount) >= 0){
        createOnrampTransaction(amount,provider,type);
    }else{
        return{
            message: "You Dont Have Enough Balance"
        }
    }
}
export async function createOnrampTransaction(amount: number, provider: string, type:TransactionType ){

    const user = await getUserData();
    const userId = (user?.id) as string;

    //like the token is from banking provider(sbi/hdfc) => not true
    const token = (Math.random() * 1000).toString();
    try{
        await prisma.onRampTransaction.create({
            data:{
                provider,
                status:"Processing",
                amount,
                token,
                startTime: new Date(),
                userId:userId,
                type,
            }
        });

        await hitBankapiCredit(amount, userId, token, HMAC_KEY as string);
        return{
            message:"Done"
        }
   } catch(e) {
        console.log("Failed in create an Onramptranscation ", e);
        return null;
   }
};

//mimicing a bank
export async function hitBankapiCredit(amount: number, userId: string, token: string ,key: string){

    await axios.post(`${WEBHOOK_URL}/toWebhook`,{
        amount, userId, token, key
    })

}

