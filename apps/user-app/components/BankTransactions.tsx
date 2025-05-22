"use client"
import React, { useEffect, useState } from 'react';
import { getUserBankTranscations } from '../actions/user';
import { BankTransaction } from '@repo/types/zodtypes';

function BankTransactions() {
const [ transactions, setTransactions ] = useState<BankTransaction[]>()
const [ newTransaction, setNewTransaction] = useState<BankTransaction[]>()

  useEffect(() => {
    const getData = async () => {
      const data = await getUserBankTranscations();
      const all = data?.OnRampTranscation || [];
      
      setTransactions(all);

      const last6 = all.slice(-6).reverse();
  
      setNewTransaction(last6);
    }
    getData();

  },[]);

const getAmountColor = (status: string) => {
    const lower = status.toLowerCase();
    if (lower === "credit" || lower === "success") return "text-green-600";
    if (lower === "debit" || lower === "failure") return "text-red-600";
    if (lower === "processing") return "text-white";
    return "text-yellow-600";
};

const getSign = (type: string) => {
  const lower = type.toLowerCase();
  return lower === "credit" || lower === "success" ? "+" : "-";
};

  return (
    <div className="w-full max-h-[400px] overflow-y-auto scrollbar-hide relative p-0">
      <h2 className="text-lg font-semibold mb-4 sticky top-0">Recent Transactions</h2>
      <ul className="space-y-4 text-sm">
        {newTransaction?.map((txn) => (
          <li key={txn.id} className="flex justify-between border-b pb-2">
            <div>
              <p className="font-medium capitalize">{txn.type}</p>
              <p className="text-muted-foreground">
                {txn.status}
              </p>
            </div>
            <p className={`${getAmountColor(txn.type)} font-semibold`}>
              {getSign(txn.type)}₹{txn.amount / 100}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BankTransactions;
