"use client"
import { useState } from "react";
import Deposite from "./Deposite";
import Withdraw from "./Withdraw";
import Balance from "./Balance";
import BankTransactions from "./BankTransactions";

function Home() {
  const [activeTab, setActiveTab] = useState<"deposite" | "withdraw">("deposite");

  return (
    <div className="flex h-screen w-full flex-col p-4">
      <div className="flex flex-1 flex-col gap-4 md:flex-row rounded-lg">
        {/* Panel One - contains toggle + forms */}
        <div className="flex h-[60%] md:h-full md:w-3/5 flex-col rounded-lg bg-muted/50 p-6 overflow-y-auto">
          {/* Top Toggle Buttons (inside panel) */}
          <div className="mb-4 flex justify-baseline pl-10 gap-4">
            <button
              onClick={() => setActiveTab("deposite")}
              className={`px-4 py-2 rounded-lg font-semibold ${
                activeTab === "deposite"
                  ? "bg-primary text-white"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              Deposite
            </button>
            <button
              onClick={() => setActiveTab("withdraw")}
              className={`px-4 py-2 rounded-lg font-semibold ${
                activeTab === "withdraw"
                  ? "bg-primary text-white"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              Withdraw
            </button>
          </div>

          {/* Active Form */}
          <div className="flex-1">{activeTab === "deposite" ? <Deposite /> : <Withdraw />}</div>
        </div>

        {/* Panel Two and Three */}
        <div className="flex flex-1 flex-col gap-4 md:w-1/2">
          <div className="flex h-[50%] md:h-1/3 items-center justify-center rounded-lg bg-muted/50 p-6">
            <Balance/>
          </div>
          <div className="flex flex-1 items-center md:items-start justify-center rounded-lg bg-muted/50 p-6">
            <BankTransactions />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
