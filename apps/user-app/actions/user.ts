"use server"

import { auth } from "@/authTypes";
import { prisma } from "@repo/db/prisma";

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