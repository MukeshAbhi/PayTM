"use client"
import { Button } from "@repo/ui/components/button";
import React, { useState } from "react";
import axios from "axios"
import { useSession } from "next-auth/react";

const Card = () => (
  <div className="p-4 border border-border rounded-lg bg-background">
    <p className="font-medium text-lg">Credit / Debit Card</p>
    <div className="mt-4 space-y-3">
      <input
        type="text"
        placeholder="Card Number"
        className="w-full p-2 rounded-md border border-input bg-popover text-popover-foreground"
      />
      <div className="flex gap-4">
        <input
          type="text"
          placeholder="MM/YY"
          className="w-1/2 p-2 rounded-md border border-input bg-popover text-popover-foreground"
        />
        <input
          type="text"
          placeholder="CVV"
          className="w-1/2 p-2 rounded-md border border-input bg-popover text-popover-foreground"
        />
      </div>
      <input
        type="text"
        placeholder="Card Holder Name"
        className="w-full p-2 rounded-md border border-input bg-popover text-popover-foreground"
      />
    </div>
  </div>
);

const UPI = () => (
  <div className="p-4 border border-border rounded-lg bg-background">
    <p className="font-medium text-lg">UPI</p>
    <div className="mt-4">
      <input
        type="text"
        placeholder="Enter UPI ID (e.g., name@bank)"
        className="w-full p-2 rounded-md border border-input bg-popover text-popover-foreground"
      />
    </div>
  </div>
);

const NetBanking = () => {
   const [selectedBank, setSelectedBank ] = useState("Select your Bank");

  return(
  <div className="p-4 border border-border rounded-lg bg-background">
    <p className="font-medium text-lg">Net Banking</p>
    <div className="mt-4">
      <select className="w-full p-2 rounded-md border border-input bg-popover text-popover-foreground"
              value={selectedBank}
              onChange={(e) => setSelectedBank(e.target.value)}
              
      >
        <option disabled value={selectedBank}>
          {selectedBank}
        </option>
        <option>State Bank of India</option>
        <option>ICICI Bank</option>
        <option>HDFC Bank</option>
        <option>Axis Bank</option>
        <option>Punjab National Bank</option>
      </select>
    </div>
  </div>
  )
}

function Deposite() {
  const [selectedMethod, setSelectedMethod] = useState<"card" | "upi" | "netbanking">("card");
  const [amount, setAmount] = useState<string>();
  const { data: session } = useSession();
  const WEB_HOOK_URL = process.env.BANK_WEBHOOK_URL;

  const renderForm = () => {
    switch (selectedMethod) {
      case "card":
        return <Card />;
      case "upi":
        return <UPI />;
      case "netbanking":
        return <NetBanking />;
      default:
        return null;
    }
  };

  const sendRequest = async () => {
    const user = session?.user;
    const response = await axios.post(`${WEB_HOOK_URL}/toWebhook`,{
      token:"",
      userId: user?.id,
      amount: amount
    })
  }

  return (
    <div className="max-w-5xl mx-auto p-6 grid grid-cols-1 md:grid-cols-4 gap-6">
      {/* Sidebar */}
      <div className="col-span-1 bg-sidebar text-sidebar-foreground rounded-2xl p-4 space-y-4 shadow-md">
        <h3 className="font-bold text-lg mb-4">Payment Options</h3>
        <button
          className={`w-full text-left p-2 rounded-lg ${
            selectedMethod === "card" ? "bg-sidebar-accent text-sidebar-accent-foreground" : ""
          }`}
          onClick={() => setSelectedMethod("card")}
        >
          Credit / Debit Card
        </button>
        <button
          className={`w-full text-left p-2 rounded-lg ${
            selectedMethod === "upi" ? "bg-sidebar-accent text-sidebar-accent-foreground" : ""
          }`}
          onClick={() => setSelectedMethod("upi")}
        >
          UPI
        </button>
        <button
          className={`w-full text-left p-2 rounded-lg ${
            selectedMethod === "netbanking" ? "bg-sidebar-accent text-sidebar-accent-foreground" : ""
          }`}
          onClick={() => setSelectedMethod("netbanking")}
        >
          Net Banking
        </button>
      </div>

      {/* Payment Form */}
      <div className="col-span-1 md:col-span-3 bg-card text-card-foreground p-6 rounded-2xl shadow-lg space-y-6">
        <h2 className="text-2xl font-bold">Enter Payment Details</h2>
        <input
          onChange={e => setAmount(e.target.value)}
          type="number"
          placeholder="Amount"
          className="w-full h-14 rounded-md border border-input font-bold pl-2 text-2xl bg-popover text-shadow-white"
        />
        {renderForm()}
        <Button variant={"destructive"} onClick={sendRequest} className="w-full text-white">Add Money</Button>
      </div>
    </div>
  );
}

export default Deposite;
