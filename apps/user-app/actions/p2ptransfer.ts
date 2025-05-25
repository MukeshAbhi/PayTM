import { prisma } from "@repo/db/prisma";
import { getUserData } from "./user";

export async function p2pTransfer(toWalletKey:string, amount: number){
    const fromUser = await getUserData();

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

    try{
        await prisma.$transaction( async (tx) => {
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
            return{
                message: "Transaction Successfull",
                status: 200
            }
        })
    }catch(err){
        console.log("Wallet Transaction ");
        return{
            message: "Internal Server Error",
            status: 500
        }
    }
}