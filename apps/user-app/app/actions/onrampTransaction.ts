"use server"

import { auth } from "@/authTypes";
import { prisma } from "@repo/db/prisma";

export async function createOnrampTransaction(amount:number,provider:string) {

    const session = await auth();
    console.log("here");
    console.log("userid :", session?.user?.id)

    if(!session || !session.user?.id)
    {
        console.log("No valid session");
        return null;
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
        return{
            message:"Done"
        }
   } catch(e) {
        console.log("Failed in create an Onramptranscation ", e);
        return null;
   }

    
}