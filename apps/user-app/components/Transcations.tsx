import { useState } from "react";
import BankTransactions from "./BankTransactions";
import RecentWalletTransactions from "./WalletTransactions";

function Transactions() {
  const [isSelected, setIsSelected] = useState<"bank" | "wallet">("bank");

  return (
    <div className="p-4">
      <div className="inline-flex rounded-xl overflow-hidden border border-border bg-muted mb-6">
        <button
          onClick={() => setIsSelected("bank")}
          className={`px-6 py-2 font-medium transition-colors duration-200 ${
            isSelected === "bank"
              ? "bg-primary text-white"
              : "text-muted-foreground hover:bg-muted"
          }`}
        >
          Bank Transactions
        </button>
        <button
          onClick={() => setIsSelected("wallet")}
          className={`px-6 py-2 font-medium transition-colors duration-200 ${
            isSelected === "wallet"
              ? "bg-primary text-white"
              : "text-muted-foreground hover:bg-muted"
          }`}
        >
          Wallet Transactions
        </button>
      </div>

      <div className="mt-4">
        {isSelected === "bank" ? <BankTransactions /> : <RecentWalletTransactions />}
      </div>
    </div>
  );
}

export default Transactions;
