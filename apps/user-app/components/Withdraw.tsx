"use client"
import { Button } from "@repo/ui/components/button";
import React, { useState } from "react";
import { checkUserBalance } from "../actions/onrampTransaction";
import { amountType, ErrMsg } from "../types/index";
import { useForm } from "react-hook-form";

const BankTransfer = () => (
  <div className="p-4 border border-border rounded-lg bg-background">
    <p className="font-medium text-lg">Bank Transfer</p>
    <div className="mt-4 flex flex-col gap-4">
      <input
        type="text"
        placeholder="Account Number"
        className="w-full p-2 rounded-md border border-input bg-popover text-popover-foreground"
      />
      <input
        type="text"
        placeholder="IFSC Code"
        className="w-full p-2 rounded-md border border-input bg-popover text-popover-foreground"
      />
      <input
        type="text"
        placeholder="Account Holder Name"
        className="w-full p-2 rounded-md border border-input bg-popover text-popover-foreground"
      />
    </div>
  </div>
);

function Withdraw() {
  const [selectedMethod, setSelectedMethod] = useState<"bank">("bank");
  const [errMsg, setErrMsg] = useState<ErrMsg>({
                                              message:"",
                                              status:""
                                          });
  
  const {register, handleSubmit, reset, formState:{errors}}    = useForm({mode:"onChange"})                                    


  const clickHandler = async (data : any) => {
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

    try{
      const res = await checkUserBalance((Number(amount)*100), "bank", "Debit");

          if(!res){
            setErrMsg({
              message:"Something went wrong. Please try again..!",
              status:"failed"
            })
            return;
          }

          setErrMsg(res);
          reset();
         
    }catch(e){
      console.log(e);
    }
  }
  const renderForm = () => {
    switch (selectedMethod) {
      case "bank":
        return <BankTransfer />;
      default:
        return null;
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6 grid grid-cols-1 md:grid-cols-4 gap-6">
      {/* Sidebar */}
      <div className="col-span-1 bg-sidebar text-sidebar-foreground rounded-2xl p-4 space-y-4 shadow-md">
        <h3 className="font-bold text-lg mb-4">Withdrawal Options</h3>
        <button
          className={`w-full text-left p-2 rounded-lg ${
            selectedMethod === "bank" ? "bg-sidebar-accent text-sidebar-accent-foreground" : ""
          }`}
          onClick={() => setSelectedMethod("bank")}
        >
          Bank Transfer
        </button>
      </div>

      {/* Withdrawal Form */}
      <div className="col-span-1 md:col-span-3 bg-card text-card-foreground p-6 rounded-2xl shadow-lg space-y-6">
        <h2 className="text-2xl font-bold">Enter Bank Details</h2>
          {errMsg?.message && (
              <span className={`text-sm ${
                errMsg.status == 'failed'
                ? "text-[#f64949fe]"
                : "text-[#2ba150fe]"
              }`}>
                {errMsg.message}
              </span>
            )}
        <form onClick={handleSubmit(clickHandler)} className="flex flex-col gap-2 mt-2">
          <input
            {...register("amount", {
              required:"Please enter Amount"
            })}
            type="text"
            placeholder="Amount"
            className="w-full h-14 rounded-md border border-input font-bold pl-3 text-2xl bg-popover text-shadow-white"
          />
          {errors.amount?.message && (
            <span className="text-xs text-[#f64949fe] mt-0.5 ml-2">{String(errors.amount.message)}</span>
          )}
          {renderForm()}
          <Button variant={"destructive"}  className="w-full bg-primary text-white font-semibold py-2 rounded-lg hover:opacity-90 transition">
            Withdraw Funds
          </Button>
        </form>
      </div>
    </div>
  );
}

export default Withdraw;
