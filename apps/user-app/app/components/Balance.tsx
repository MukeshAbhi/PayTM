"use client"
import React, { useEffect, useState } from 'react'
import { getUserWalletBalance } from '../actions/user';

function Balance() {
  const [ balance, setBalance ] = useState<number | null>(null);
  const [ date, setDate ] = useState<number | null>(null);

  useEffect(() => {
    const getData = async () => {
      const data = await getUserWalletBalance();
      setBalance(data.amount);
    };
    getData();
    setDate(Date.now());
  }, []);

  return (
    <div className="w-full rounded-xl bg-card p-6 shadow-md text-card-foreground">
      <h2 className="text-xl font-semibold mb-2">Wallet Balance</h2>
      <p className="text-3xl font-bold text-primary">
        {balance !== null
          ? new Intl.NumberFormat("en-IN", {
              style: "currency",
              currency: "INR",
              minimumFractionDigits: 2,
            }).format(balance / 100)
          : "Loading..."}
      </p>
      <p className="text-muted-foreground mt-2 text-sm">{date ? new Date(date).toLocaleString() : ""}</p>
    </div>
  );
}

export default Balance;