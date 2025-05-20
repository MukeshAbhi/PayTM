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