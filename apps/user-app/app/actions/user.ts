"use server"

import { auth } from "@/authTypes";
import { prisma } from "@repo/db/prisma";


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

export async function getUserBankTranscationHistory(userId: string) {
  const data = await prisma.
}