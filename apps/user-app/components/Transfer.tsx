"use client";
import { Controller, useForm } from "react-hook-form";
import { Input } from "@repo/ui/components/input";
import { Label } from "@repo/ui/components/label";
import { Button } from "@repo/ui/components/button";
import { InputForForm } from "./input";
import { InputOTP, InputOTPGroup, InputOTPSlot, MaskedInputOTPSlot } from "@repo/ui/components/input-otp";
import { useState } from "react";
import { amountType, ErrMsg } from "@repo/types/zodtypes";
import { p2pTransfer } from "@/actions/p2ptransfer";

type FormData = {
        paytmid: string;
        confirmpaytmid: string;
        amount: number;
        pin: string;
    };

function Transfer() {

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    control,
    reset
  } = useForm<FormData>({ mode: "onChange" });

  const [errMsg, setErrMsg] = useState<ErrMsg>({
    message: "",
    status: ""
  })

  const onSubmit = async (data: FormData) => {
    console.log("data : ", data);
    const { pin, paytmid, amount } = data;
    try{
          const parsedData = amountType.safeParse(amount);
          
          if(parsedData.error || !parsedData)
          {
              setErrMsg({
                  message:"Amount must be a Positive Number",
                  status: "failed"
              })
                return;
          }
          const res = await p2pTransfer(paytmid, (amount * 100), pin);
          console.log(res);
    
          if(!res){
              setErrMsg({
                  message: "Failed to Process your request ",
                  status: "failed"
              })
                  return;
          }
    
          if(res.status != 200)
          {
              setErrMsg({
                message: res.message,
                status: "failed"
              })
          }else{
              setErrMsg({
                message: res.message,
                status: "Success"
              })
              reset({ amount: 0, paytmid: "", confirmpaytmid: "", pin: "" });
          }
    
            }catch(err){
                console.log("Error during transfe ", err);
                setErrMsg({
                    message: "Error during transfe",
                    status: "failed"
                })
            }
  }

  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row p-4 gap-4">
      {/* Left Panel - Transfer Form */}
      <div className="w-full md:w-3/4 lg:w-1/2 bg-muted/50 rounded-2xl shadow-md p-6 flex flex-col justify-between">
        <div className="space-y-6">
          <div className="text-center space-y-2">
            <p className="text-3xl font-bold">Transfer</p>
            <p className="text-muted-foreground text-base">
              Transfer money from your wallet to other users.
            </p>
          </div>
          {errMsg.message && (
            <span className={`text-sm ${
              errMsg.status == 'failed'
              ? "text-[#f64949fe]"
              : "text-[#2ba150fe]"
            } mt-0.5`}>
              {errMsg.message}
            </span>
          )}
          <form
            className="flex flex-col gap-5"
            onSubmit={handleSubmit(onSubmit)}
          >
            {/* Amount */}
            <div className="flex flex-col gap-1">
              <Label className="text-xl font-semibold">Amount</Label>
              <Input
                placeholder="Enter amount"
                type="text"
                {...register("amount", { 
                  required: "Amount is required",
                  min: { value: 1, message: "Amount must be greater than 0"}
                 })}
              />
              {errors.amount && (
                <span className="text-sm text-destructive">
                  {String(errors.amount.message)}
                </span>
              )}
            </div>

            {/* PayTM ID */}
            <div className="flex flex-col gap-1">
              <Label className="text-xl font-semibold">PayTM ID (Receiver)</Label>
              <InputForForm
                className="w-full h-12 text-lg font-medium"
                placeholder="e.g. axnvcyru5ac55ac"
                type="text"
                name="paytmid"
                register={register("paytmid", {
                  required: "PayTM ID is required",
                })}
              />
              {errors.paytmid && (
                <span className="text-sm text-destructive">
                  {String(errors.paytmid.message)}
                </span>
              )}
            </div>

            {/* Confirm PayTM ID */}
            <div className="flex flex-col gap-1">
              <Label className="text-xl font-semibold">Confirm PayTM ID</Label>
              <InputForForm
                className="w-full h-12 text-lg font-medium"
                placeholder="Confirm PayTM ID"
                type="text"
                name="confirmpaytmid"
                register={register("confirmpaytmid", {
                  validate: (value) => {
                    const { paytmid } = getValues();
                    return value === paytmid || "PayTM IDs do not match";
                  },
                })}
              />
              {errors.confirmpaytmid && (
                <span className="text-sm text-destructive">
                  {String(errors.confirmpaytmid.message)}
                </span>
              )}
            </div>

            {/* Wallet Pin */}
            <div className="flex flex-col gap-1">
              <Label className="text-xl font-semibold">Wallet PIN</Label>
              <div className="w-full max-w-md">
                <div className="space-y-4">
                  <Controller 
                        name="pin"
                        control={control}
                        rules={{
                            required: 'Wallet PIN is required',
                            minLength: { value: 6, message: "Must be 6 Digits"}
                        }}
                        render={({ field }) => (
                            <InputOTP
                                maxLength={6}
                                value={field.value || ""}
                                onChange={(value) => field.onChange(value)}
                            >
                                <InputOTPGroup className="flex justify-center pl-20 gap-2 sm:gap-3">
                                  {Array.from({ length: 6 }).map((_, i) => (
                                      <MaskedInputOTPSlot key={i} index={i} maskChar="●" />
                                  ))}

                                </InputOTPGroup>
                            </InputOTP>
                        )}
                    />
                    {errors.pin && (
                        <p className="text-red-500 text-sm text-center">{errors.pin.message}</p>
                    )}
                </div>
              </div>
            </div>
            <Button
              type="submit"
              className="w-full text-white text-lg py-3 rounded-lg hover:scale-[1.01] transition-transform duration-150"
            >
              Pay
            </Button>
          </form>
        </div>
      </div>

      {/* Right Panel - Recent Payments */}
      <div className="w-full md:w-3/4 lg:w-1/2 bg-muted/50 rounded-2xl shadow-md p-6">
        <RecentPayments />
      </div>
    </div>
  );
}

export default Transfer;

const transactions = [
  {
    id: 1,
    type: "credited",
    amount: 5000,
    createdAt: new Date("2024-04-15"),
  },
  {
    id: 2,
    type: "debited",
    amount: 2000,
    createdAt: new Date("2024-04-16"),
  },
  {
    id: 3,
    type: "credited",
    amount: 10000,
    createdAt: new Date("2024-04-17"),
  },
  {
    id: 4,
    type: "debited",
    amount: 1500,
    createdAt: new Date("2024-04-18"),
  },
  {
    id: 5,
    type: "credited",
    amount: 7500,
    createdAt: new Date("2024-04-19"),
  },
];

function RecentPayments() {
  const getAmountColor = (type: string) => {
    if (type.toLowerCase() === "credited") return "text-green-600";
    if (type.toLowerCase() === "debited") return "text-red-600";
    return "text-yellow-600";
  };

  return (
    <div className="w-full h-full">
      <h2 className="text-lg font-semibold mb-4">Recent Transactions</h2>
      <ul className="space-y-4 text-sm max-h-[400px] overflow-y-auto pr-2">
        {transactions.map((txn) => (
          <li key={txn.id} className="flex justify-between border-b pb-2">
            <div>
              <p className="font-medium capitalize">{txn.type}</p>
              <p className="text-muted-foreground">
                {txn.createdAt.toLocaleDateString()}
              </p>
            </div>
            <p className={`${getAmountColor(txn.type)} font-semibold`}>
              {txn.type.toLowerCase() === "credited" ? "+" : "-"}₹{txn.amount}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

