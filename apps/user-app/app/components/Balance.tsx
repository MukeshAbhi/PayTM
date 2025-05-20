"use client"
import React, { useEffect, useState } from 'react'
import {  getUserWalletBalance } from '../actions/user';
import { RefreshCcw } from 'lucide-react';

function Balance() {
  const [ balance, setBalance ] = useState<number | null>(null);
  const [ date, setDate ] = useState<number | null>(null);

  const getData = async () => {
      const data = await getUserWalletBalance();
      setBalance(data.amount);
      setDate(Date.now());
    };
    
    
  useEffect(() => {
    getData();
  }, []);

return (
  <div className="w-full rounded-xl bg-card p-6 shadow-md text-card-foreground">
    <h2 className="text-xl font-semibold mb-2">Wallet Balance</h2>
    <div className="flex justify-between items-start">
      <div>
        <p className="text-3xl font-bold text-primary">
          {balance !== null
            ? new Intl.NumberFormat("en-IN", {
                style: "currency",
                currency: "INR",
                minimumFractionDigits: 2,
              }).format(balance / 100)
            : "Loading..."}
        </p>
        <p className="text-muted-foreground mt-2 text-sm">
          {date ? new Date(date).toLocaleString() : ""}
        </p>
      </div>
      <button
        onClick={getData} // define this function
        className="p-2 hover:bg-muted rounded-full"
        aria-label="Refresh balance"
      >
        <RefreshCcw className="w-5 h-5" />
      </button>
    </div>
  </div>
);

}

export default Balance;