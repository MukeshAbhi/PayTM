"use client"
import React, { useEffect, useState } from 'react'
import { getUserWalletBalance } from '../actions/user';

function Balance() {
  const [balance, setBalance] = useState<number | null>(null);

  useEffect(() => {
    const getData = async () => {
      const data = await getUserWalletBalance();
      setBalance(data.amount);
    };
    getData();
  }, []);

  useEffect(() => {
    console.log("balance updated:", balance);
  }, [balance]);

  return (
    <div className="w-full rounded-xl bg-card p-6 shadow-md text-card-foreground">
      <h2 className="text-xl font-semibold mb-2">Wallet Balance</h2>
      <p className="text-3xl font-bold text-primary">
        {balance !== null ? `₹${balance / 100}` : "Loading..."}
      </p>
      <p className="text-muted-foreground mt-2 text-sm">As of April 29, 2025</p>
    </div>
  );
}

export default Balance;