"use client"
import React, { useEffect, useState } from 'react';
import { getUserBankTransactions } from '../actions/user';
import { BankTransaction } from '@repo/types/zodtypes';

function BankTransactions() {
const [ transactions, setTransactions ] = useState<BankTransaction[] | null>(null)

  useEffect(() => {
    const getData = async () => {
      const data = await getUserBankTransactions();
      console.log("from here: ", data)
      setTransactions(data.slice(0,7));

    }
    getData();

  },[]);

const getAmountColor = (status: string) => {
    const lower = status.toLowerCase();
    if (lower === "success") return "text-green-600";
    if (lower === "failure") return "text-red-600";
    if (lower === "processing") return "text-white";
    return "text-yellow-600";
};

const getSign = (type: string) => {
  const lower = type.toLowerCase();
  return lower === "credit"  ? "+" : "-";
};

  return (
    <div className="w-full h-full overflow-y-auto ">
      <h2 className="text-lg font-semibold mb-4">Recent Transactions</h2>
      <ul className="space-y-4 text-sm max-h-[400px] overflow-y-auto scrollbar-hide relative pr-2">
        {transactions?.map((txn, index) => (
          <li key={index} className="flex justify-between border-b pb-2">
            <div>
              <p className="font-medium capitalize">{txn.type}</p>
              <p className="text-muted-foreground">
                {txn.status}
              </p>
            </div>
            <p className={`${getAmountColor(txn.status)} font-semibold`}>
              {getSign(txn.type)}₹{txn.amount / 100}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BankTransactions;
