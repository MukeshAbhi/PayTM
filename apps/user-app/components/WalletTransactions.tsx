import { creditedWalletTransactions, debitedWalletTransactions } from "@/actions/user";
import { useState, useEffect } from "react";
import { WalletTransfer } from "../types/index";

function RecentWalletTransactions() {
  type LabeledTransaction = WalletTransfer & { type: "credit" | "debit" };

  const [allTransactions, setAllTransactions] = useState<LabeledTransaction[]>([]);

  const [creditTransactions, setCreditTransactions] = useState<LabeledTransaction[] | null>(null);
  const [debitTransactions, setDebitTransactions] = useState<LabeledTransaction[] | null>(null);

  useEffect(() => {
    const getData = async () => {
      const credit  = await creditedWalletTransactions()
      const debit = await debitedWalletTransactions();

      if ("transaction" in credit) {
        const sliced = credit.transaction.slice(0, 7);
        const labeledCredit = sliced.map(tx => ({ ...tx, type: "credit" as const }));
        setCreditTransactions(labeledCredit);
      }

      if ("transaction" in debit) {
        const sliced = debit.transaction.slice(0, 7);
        const labeledDebit = sliced.map(tx => ({ ...tx, type: "debit" as const }));
        setDebitTransactions(labeledDebit);
      }
 
    }
    getData();
  }, []);

  useEffect(() => {
    if (creditTransactions && debitTransactions) {
      const merged = [...creditTransactions, ...debitTransactions];
      const sorted = merged.sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      setAllTransactions(sorted);
    }
  }, [creditTransactions, debitTransactions]);


  const getAmountColor = (type: string) => {
    if (type.toLowerCase() === "credit") return "text-green-600";
    if (type.toLowerCase() === "debit") return "text-red-600";
    return "text-yellow-600";
  };

  return (
    <div className="w-full h-full overflow-y-auto ">
      <h2 className="text-lg font-semibold mb-4">Recent  Wallet  Transactions</h2>
      <ul className="space-y-4 text-sm max-h-[400px] overflow-y-auto scrollbar-hide relative pr-2">
        {allTransactions.map((txn) => (
          <li key={txn.id} className="flex justify-between border-b pb-2">
            <div>
              <p className="font-medium capitalize">{txn.type}</p>
              <p className="text-muted-foreground">
                {txn.createdAt.toLocaleDateString()}
              </p>
            </div>
            <p className={`${getAmountColor(txn.type)} font-semibold`}>
              {txn.type.toLowerCase() === "credit" ? "+" : "-"}₹{txn.amount / 100}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RecentWalletTransactions