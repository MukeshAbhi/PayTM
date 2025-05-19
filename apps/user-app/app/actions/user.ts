"use server"

import { auth } from "@/authTypes";
import { prisma } from "@repo/db/prisma";
import { BankTransaction } from "@repo/types/zodtypes"

export async function getData() {

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
      name: true,
      id: true,
    },
  });

  console.log(user?.id);

  return user;
}

export async function getUserBankTranscations():Promise<any> {
  const user = await getData();
  const userId = user?.id
  const data = await prisma.onRampTransaction.findMany({
    where: {
      userId
    }
  })
  return data;
}