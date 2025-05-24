"use server"

import { auth } from "@/authTypes";
import { prisma } from "@repo/db/prisma";
import { compare, hash } from "bcrypt";


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
      paymentId: true,
      walletPin: false,
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
        OnRampTransaction: true, 
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


export async function getUserWalletPin(id: string): Promise<string | null | { message: string; status: number }>{

  try{
    const userPin = await prisma.user.findUnique({
      where:{
        id
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

export async function setWalletPin(id:string, pin:string): Promise<{ message: string; status: number }> {
  try{
    const hashedPin = await hash(pin, 10);
    const user = await prisma.user.update({
      where:{
        id,
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

export async function changeUserPin(id:string, currentPin:string, newPin:string):Promise<{ message: string; status: number }> {

    try{
      const oldPin = await getUserWalletPin(id);

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
          id
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