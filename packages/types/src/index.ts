import z from 'zod';
import { $Enums } from "@repo/db/prisma"

export type TransactionType = $Enums.TransactionType;

export interface BankTransaction {
  id: string;
  status: $Enums.OnRampStatus;
  type: $Enums.TransactionType;
  token: string;
  amount: number;
  startTime: Date;
  userId: string;
  provider: string;
}

export interface WalletBalance {
  id: string;
  userId: string;
  amount: number;
  locked: number;
}

export interface ErrMsg {
    message: string;
    status: string
}

export const amountType =  z.string().regex(/^\d+$/, "Amount must be a number")

export const signUpSchema = z.object({
    name: z.string(),
    email: z.string(),
    password: z.string().min(6)
});

export type SignUpSchema = z.infer<typeof signUpSchema>;

export interface SignIn {
  email: string;
  password: string
}