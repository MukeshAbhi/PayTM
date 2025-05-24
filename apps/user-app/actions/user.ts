"use server"

import { auth } from "@/authTypes";
import { prisma } from "@repo/db/prisma";
import { compare, hash } from "bcrypt";
import { Wallet } from "lucide-react";

export async function getUserData() {

  const session = await auth();

  if (!session || !session.user?.email) {
    console.log("No valid session")
    return null
  }

  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email
    }
  });

  return user;
}

export async function getUserBankTranscations():Promise<any> {
  const user = await getUserData();
  const userId = user?.id
  const data = await prisma.user.findFirst({
    where: {
      id: userId
    },
    select: {
      OnRampTranscation: true
    }
    
  })
  
  return data;
}

export async function getUserWalletBalance():Promise<any> {
  const user = await getUserData();
  const userId = user?.id;
  const data = await prisma.walletBalance.findUnique({
    where:{
      userId
    },
    select:{
      amount:true
    }
  })
  return data;
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
    console.log("error while getting PIN: ", err);
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
    console.log("Error in creating PIN :", err);
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
      console.log("Error while updating PIN ", err)
      return{
        message: "Something went wrong.! Please try again later",
        status: 500
      }
    }
  
}