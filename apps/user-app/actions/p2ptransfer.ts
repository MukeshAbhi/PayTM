"use server"

import { prisma } from "@repo/db/prisma";
import { getUserData } from "./user";
import { compare } from "bcrypt";

export async function p2pTransfer(toWalletKey:string, amount: number, pin: string){
    const fromUser = await getUserData();

    if(!fromUser){
        return{
            message: "Authentication error",
            status: 411
        }
    }

    const toUser = await prisma.user.findFirst({
        where: {
            walletKey: toWalletKey
        }
    })

    if(!toUser){
        return {
            message: "Enter a valid PayTM ID",
            status: 400
        }
    }

    if(fromUser.id == toUser.id){
        return {
            message: "Cannot use your own PayTM Id",
            status: 411
        }
    }

   const walletPin = fromUser.walletPin;

   const isMatch = compare(pin,walletPin as string);

   if(!isMatch){
    return{
        message: "Icorrect Wallet PIN",
        status: 411
    }
   }

    try{
        await prisma.$transaction( async (tx) => {
            // Locking a perticular Field so that only one request can access this Table 
            await tx.$queryRaw`SELECT * FROM "WalletBalance" WHERE "userId" = ${fromUser?.id} FOR UPDATE`;
            
            const fromBalance = await tx.walletBalance.findUnique({
                where: {
                    userId: fromUser?.id 
                }
            })

            if(!fromBalance || fromBalance.amount < amount){
                return{
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
            })
            return{
                message: "Transaction Successfull",
                status: 200
            }
        })
    }catch(err){
        console.log("Wallet Transaction : ", err);
        return{
            message: "Internal Server Error",
            status: 500
        }
    }
}