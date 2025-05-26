"use server"

import { prisma } from "@repo/db/prisma";
import { getUserData } from "./user";
import { compare } from "bcrypt";

export async function p2pTransfer(toWalletKey:string, amount: number, pin: string){
    const fromUser = await getUserData();
    console.log("from heree : 1");
    
    if(!fromUser){
        return{
            message: "Authentication error",
            status: 411
        }
    }
    console.log("from heree : 2");
    const toUser = await prisma.user.findFirst({
        where: {
            walletKey: toWalletKey
        }
    })
    console.log("from heree : 3");
    if(!toUser){
        return {
            message: "Enter a valid PayTM ID",
            status: 400
        }
    }
    console.log("from heree : 4");
    if(fromUser.id == toUser.id){
        return {
            message: "Cannot use your own PayTM Id",
            status: 411
        }
    }
    console.log("from heree : 5");
    const walletPin = fromUser.walletPin;

    const isMatch = await compare(pin,walletPin as string);
    console.log("from heree : 6");
    if(!isMatch){
        return{
            message: "Icorrect Wallet PIN",
            status: 411
        }
    }
    console.log("from heree : 7");
    try{
       const result : any =  await prisma.$transaction( async (tx) => {
            // Locking a perticular Field so that only one request can access this Table 
            await tx.$queryRaw`SELECT * FROM "WalletBalance" WHERE "userId" = ${fromUser?.id} FOR UPDATE`;
            
            const fromBalance = await tx.walletBalance.findUnique({
                where: {
                    userId: fromUser?.id 
                }
            })

            if(!fromBalance || fromBalance.amount < amount){
                throw{
                    message: "Insufficient funds",
                    status: 411
                }
            }

            await tx.walletBalance.update({
                where: { 
                    userId: fromUser?.id
                },
                data: {
                    amount: {
                        decrement: amount
                    }
                }
            })

            await tx.walletBalance.update({
                where: { 
                    userId: toUser?.id
                },
                data: {
                    amount: {
                        increment: amount
                    }
                }
            })

            await tx.walletTransaction.create({
                data: {
                    fromUserId: fromUser?.id,
                    toUserId: toUser.id,
                    amount,
                    createdAt: new Date()
                }
            });

            return{
                message: "Transcation successfull",
                status: 200
            }

            return result;
        })

       
            
    }catch(err:any){
        console.log("Wallet Transaction : ", err);
        if (err?.message && err?.status) {
            return err;
        }
        return{
            message: "Internal Server Error",
            status: 500
        }
    }
}