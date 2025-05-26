"use server"

import { auth } from "@/authTypes";
import { prisma } from "@repo/db/prisma";
import { WalletTransfer } from "@repo/types/zodtypes";
import { compare, hash } from "bcrypt";

function generateFormattedKey() {
  const getRandom = () => Math.random().toString(36).substring(2, 6).toUpperCase();
  return `${getRandom()}-${getRandom()}-${getRandom()}`;
}

export async function getUserData() {

  const session = await auth();

  if (!session || !session.user?.email) {
    console.log("No valid session")
    return null
  }

  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email
    },
     select: {
      id: true,
      name: true,
      email: true,
      emailVerified: true,
      image: true,
      walletKey: true,
      walletPin: true,
      createdAt: true,
      updatedAt: true,
    }
  });

  return user;
}

export async function getUserBankTransactions(): Promise<any> {
  try {
    const user = await getUserData();

    if (!user || !user.id) {
      return {
        message: "User not authenticated",
        status: 401,
      };
    }

    const data = await prisma.user.findUnique({
      where: { id: user.id },
      select: {
        OnRampTransaction: {
          orderBy: {startTime: "desc"}
        }, 
      },
    });
    
    if (!data || !data.OnRampTransaction) {
      return {
        message: "No transactions found",
        status: 404,
      };
    }
    
    return data.OnRampTransaction;

  } catch (err) {
    console.error("Error fetching bank transactions:", err);
    return {
      message: "Something went wrong. Please try again later.",
      status: 500,
    };
  }
}

export async function getUserWalletBalance(): Promise<{ amount: number } | { message: string; status: number }> {
  try {
    const user = await getUserData();

    if (!user || !user.id) {
      return {
        message: "User not authenticated",
        status: 401,
      };
    }

    const data = await prisma.walletBalance.findUnique({
      where: {
        userId: user.id,
      },
      select: {
        amount: true,
      },
    });

    if (!data) {
      return {
        amount: 0,
        message: "Wallet balance not found",
        status: 404,
      };
    }

    return data; // { amount: number }
  } catch (err) {
    console.error("Error fetching wallet balance:", err);
    return {
      message: "Something went wrong. Please try again later.",
      status: 500,
    };
  }
}

export async function getUserWalletPin(): Promise<string | null | { message: string; status: number }>{

  try{
     const user = await getUserData();

      if (!user || !user.id) {
        return {
          message: "User not authenticated",
          status: 401,
        };
      }

      const userPin = await prisma.user.findUnique({
        where:{
          id: user.id
        },
        select:{
          walletPin: true
        }
      })
      return userPin?.walletPin ?? null;

  }catch(err){
    console.error("error while getting PIN: ", err);
    return{
        message: "Something went wrong.! Please try again later",
        status: 500
      }
  }
}

export async function setWalletPin( pin:string): Promise<{ message: string; status: number }> {
  try{
    const hashedPin = await hash(pin, 10);

    const userFound = await getUserData();

      if (!userFound || !userFound.id) {
        return {
          message: "User not authenticated",
          status: 401,
        };
      }

    const user = await prisma.user.update({
      where:{
        id: userFound.id
      },data: {
        walletPin: hashedPin
      }
    })

    if(!user){
      return{
        message: " Failed to create a PIN",
        status: 400
      } 
    }

    return {
      message: "PIN generated successfully",
      status: 200
    }
  } catch(err) {
    console.error("Error in creating PIN :", err);
    return{
        message: "Something went wrong.! Please try again later",
        status: 500
      }
  }
}

export async function changeWalletPin( currentPin:string, newPin:string):Promise<{ message: string; status: number }> {

    try{
      const user = await getUserData();

      if (!user || !user.id) {
        return {
          message: "User not authenticated",
          status: 401,
        };
      }

      const oldPin = await getUserWalletPin();

      const isMatch = await compare(currentPin, String(oldPin));

      if(!isMatch){
        return{
          message: "Current PIN is incorrect",
          status: 411
        }
      }
      const hashedPin = await hash(newPin,10);
      const updatePin = await prisma.user.update({
        where: {
          id: user.id
        },data: {
          walletPin: hashedPin
        }
      })

      if(!updatePin){
        return{
          message: "Failed to update your PIN",
          status: 411
        }
      }

      return {
        message: "PIN changed successfully",
        status: 200
      }
    }catch(err){
      console.error("Error while updating PIN ", err)
      return{
        message: "Something went wrong.! Please try again later",
        status: 500
      }
    }
  
}

export async function createPaymentKey(id:string) {
  let uniqueKey: string;
    console.log("From here id: ", id);
    
    try{
      while(true){
        const key = generateFormattedKey();
        const existing = await prisma.walletKey.findFirst({
          where: {key}
        });

        if (!existing) {
          uniqueKey = key
          break;
        }
      }

      await prisma.walletKey.create({
        data: {
          key: uniqueKey
        }
      })
      const wKey = await prisma.user.update({
        where: {
          id,
        },
        data: {
          walletKey: uniqueKey
          
        }
      })

      if(wKey){
        return uniqueKey;
      }
    }catch(err){
      console.log("error while creating key ", err)
    }
  
}

export async function debitedWalletTransactions() : Promise<{transaction: WalletTransfer[] } |{ message: string; status: number }> {
  try {
      const user = await getUserData();

      if (!user || !user.id) {
        return {
          message: "User not authenticated",
          status: 401,
        };
      }

      const data = await prisma.user.findUnique({
        where: { id: user.id },
        select: {
          sentTransfers:{
            orderBy: {
              createdAt: "desc"
            }
          }
        },
      });
      
      if (!data || !data.sentTransfers) {
        return {
          message: "No transactions found",
          status: 404,
        };
      }
      
      return {
        transaction: data.sentTransfers
      };

    } catch (err) {
    console.error("Error fetching  transactions:", err);
    return {
      message: "Something went wrong. Please try again later.",
      status: 500,
    };
  }
}

export async function creditedWalletTransactions() :  Promise<{transaction: WalletTransfer[] } |{ message: string; status: number }> {
  try {
      const user = await getUserData();

      if (!user || !user.id) {
        return {
          message: "User not authenticated",
          status: 401,
        };
      }

      const data = await prisma.user.findUnique({
        where: { id: user.id },
        select: {
          receivedTransfers: {
            orderBy: {
              createdAt: "desc"
            }
          }
        },
      });
      
      if (!data || !data.receivedTransfers) {
        return {
          message: "No transactions found",
          status: 404,
        };
      }
      
      return {
        transaction: data.receivedTransfers
      };

    } catch (err) {
    console.error("Error fetching  transactions:", err);
    return {
      message: "Something went wrong. Please try again later.",
      status: 500,
    };
  }
}