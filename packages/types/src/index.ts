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
