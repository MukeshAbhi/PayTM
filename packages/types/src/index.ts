import z from 'zod';
import { $Enums } from "@repo/db/prisma"

export const BankTransactionSchema = z.object({
  id: z.string(),
  status: z.nativeEnum($Enums.OnRampStatus),
  type: z.nativeEnum($Enums.TransactionType),
  token: z.string(),
  amount: z.number(),
  startTime: z.date(),
  userId: z.string(),
  provider: z.string(),
});

export type BankTransaction = z.infer<typeof BankTransactionSchema>;

export const WalletBalanceSchema = z.object({
  id: z.string(),
  userId: z.string(),
  amount: z.number(),
  locked: z.number(),
})

export type WalletBalance = z.infer<typeof WalletBalanceSchema>;