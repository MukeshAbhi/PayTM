"use client"
import { Button } from "@repo/ui/components/button";
import React, { useState } from "react";
import { createOnrampTransaction } from "../actions/onrampTransaction";
import { useForm } from "react-hook-form";
import { amountType, ErrMsg } from "@repo/types/zodtypes";

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

interface Bank {
  name: string;
  redirectUrl: string;
}

interface NetBankingProps {
  onBankSelect: (bank: Bank) => void;
}

const NetBanking = ({ onBankSelect }: NetBankingProps) => {
  const [selectedBank, setSelectedBank] = useState("");

  const SUPPORTED_BANKS: Bank[] = [
    { name: "State Bank of India", redirectUrl: "https://www.onlinesbi.sbi/" },
    { name: "ICICI Bank", redirectUrl: "https://www.icicibank.com/" },
    { name: "HDFC Bank", redirectUrl: "https://netbanking.hdfcbank.com" },
    { name: "Axis Bank", redirectUrl: "https://www.axisbank.com/" },
    { name: "Punjab National Bank", redirectUrl: "https://www.pnbindia.in/" },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = SUPPORTED_BANKS.find((bank) => bank.name === e.target.value);
    if (selected) {
      setSelectedBank(selected.name);
      onBankSelect(selected); // send full object with name + redirectUrl
    }
  };

  return (
    <div className="p-4 border border-border rounded-lg bg-background">
      <p className="font-medium text-lg">Net Banking</p>
      <div className="mt-4">
        <select
          className="w-full p-2 rounded-md border border-input bg-popover text-popover-foreground"
          value={selectedBank}
          onChange={handleChange}
        >
          <option value="" disabled>
            Select your Bank
          </option>
          {SUPPORTED_BANKS.map((bank) => (
            <option key={bank.name} value={bank.name}>
              {bank.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

function Deposite() {
  const [selectedMethod, setSelectedMethod] = useState<"card" | "upi" | "netbanking">("netbanking");
  const [bank, setBank] = useState<Bank>({
    name:"card",
    redirectUrl:""
  });
  const [errMsg, setErrMsg] = useState<ErrMsg>({
                                            message:"",
                                            status:""
                                        });
  
  const{register, handleSubmit, formState:{ errors}, reset} = useForm({mode: "onChange"});

  const onClickHandler =  async (data: any ) => {
    const { amount } = data;
    const parsedData = amountType.safeParse(amount);

    if(parsedData.error || !parsedData)
    {
      setErrMsg({
        message:"Amount must be a Positive Number",
        status: "failed"
      })
      return;
    }

    try {
          const res =  await createOnrampTransaction((Number(amount)*100), bank?.name!, "Credit");

          if(!res){
            setErrMsg({
              message:"Something went wrong. Please try again..!",
              status:"failed"
            })
            return;
          }

          if(res.status == "failed"){
            setErrMsg(res);
            reset();
          }else{
            setErrMsg(res);
            window.open(bank?.redirectUrl || "")
            reset();
          }
    }catch(error) {
      console.log(error);
    }
  }

  const renderForm = () => {
    switch (selectedMethod) {
      case "card":
        return <Card />;
      case "upi":
        return <UPI />;
      case "netbanking":
        return <NetBanking onBankSelect={(bank) => {setBank(bank)
        }} />;
      default:
        return null;
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6 grid grid-cols-1 md:grid-cols-4 gap-6">
      {/* Sidebar */}
      <div className="col-span-1 bg-sidebar text-sidebar-foreground rounded-2xl p-4 space-y-4 shadow-md">
        <h3 className="font-bold text-lg mb-4">Payment Options</h3>
        <button
          className={`w-full text-left p-2 rounded-lg ${
            selectedMethod === "netbanking" ? "bg-sidebar-accent text-sidebar-accent-foreground" : ""
          }`}
          onClick={() => setSelectedMethod("netbanking")}
        >
          Net Banking
        </button>
        <button
          className={`w-full text-left p-2 rounded-lg ${
            selectedMethod === "card" ? "bg-sidebar-accent text-sidebar-accent-foreground" : ""
          }`}
          onClick={() => {
            setSelectedMethod("card");
            setBank({
              name:"card",
              redirectUrl:""
            })
          }}
        >
          Credit / Debit Card
        </button>
        <button
          className={`w-full text-left p-2 rounded-lg ${
            selectedMethod === "upi" ? "bg-sidebar-accent text-sidebar-accent-foreground" : ""
          }`}
          onClick={() => {
            setSelectedMethod("upi");
            setBank({
              name:"upi",
              redirectUrl:"https://bharatpe.com/"
            })
          }}
        >
          UPI
        </button>
        
      </div>

      {/* Payment Form */}
      <div className="col-span-1 md:col-span-3 bg-card text-card-foreground p-6 rounded-2xl shadow-lg space-y-6">
        <h2 className="text-2xl font-bold">Enter Payment Details</h2>
        {errMsg?.message && (
            <span className={`text-sm ${
              errMsg.status == 'failed'
              ? "text-[#f64949fe]"
              : "text-[#2ba150fe]"
            } mt-0.5`}>
              {errMsg.message}
            </span>
          )}
        <form onSubmit={handleSubmit(onClickHandler)} className="flex flex-col gap-2">
          <input
            {...register("amount", {
              required: "Please enter Amount"
            })}
            type="text"
            placeholder="Amount"
            className="w-full h-14 rounded-md border border-input font-bold pl-2 text-2xl bg-popover text-shadow-white"
          />
          {errors.amount?.message && (
                <span className="text-xs text-[#f64949fe] mt-0.5 ml-2">{String(errors.amount?.message)}</span>
            )}
          {renderForm()}
          <Button variant={"destructive"} className="w-full text-white">
            Add Money
          </Button>
          
        </form>
      </div>
    </div>
  );
}

export default Deposite;
