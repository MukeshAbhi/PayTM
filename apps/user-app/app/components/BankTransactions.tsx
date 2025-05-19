"use client"
import React, { useEffect, useState } from 'react';
import { getUserBankTranscations } from '../actions/user';
import { BankTransaction } from '@repo/types/zodtypes';

// Sample transactions with unique IDs and createdAt dates
// const transactions = [
//   {
//     id: 1,
//     type: "Deposit",
//     amount: 5000,
//     createdAt: new Date("2024-04-15"),
//   },
//   {
//     id: 2,
//     type: "Withdrawal",
//     amount: 2000,
//     createdAt: new Date("2024-04-16"),
//   },
//   {
//     id: 3,
//     type: "Deposit",
//     amount: 10000,
//     createdAt: new Date("2024-04-17"),
//   },
//   {
//     id: 4,
//     type: "Withdrawal",
//     amount: 1500,
//     createdAt: new Date("2024-04-18"),
//   },
//   {
//     id: 5,
//     type: "Deposit",
//     amount: 7500,
//     createdAt: new Date("2024-04-19"),
//   },
// ];

function BankTransactions() {
const [ transactions, setTranscations ] = useState<BankTransaction[]>()
  useEffect(() => {
    const getData = async () => {
      const data = await getUserBankTranscations();
      setTranscations(data);
    }
  })

  const getAmountColor = (type: string) => {
    if (type.toLowerCase() === "Credit || Success") return "text-green-600";
    if (type.toLowerCase() === "Debit || Failure") return "text-red-600";
    if (type.toLowerCase() === "Processsing") return "text-gray-600";
    return "text-yellow-600";
  };

  return (
    <div className="w-full">
      <h2 className="text-lg font-semibold mb-4">Recent Transactions</h2>
      <ul className="space-y-4 text-sm">
        {transactions?.map((txn) => (
          <li key={txn.id} className="flex justify-between border-b pb-2">
            <div>
              <p className="font-medium capitalize">{txn.type}</p>
              <p className={`${getAmountColor(txn.type)}`}>
                {txn.status}
              </p>
            </div>
            <p className={`${getAmountColor(txn.type)} font-semibold`}>
              {txn.type.toLowerCase() === "Credit" ? "+" : "-"}₹{txn.amount}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BankTransactions;
