import React from 'react';

// Sample transactions with unique IDs and createdAt dates
const transactions = [
  {
    id: 1,
    type: "Deposit",
    amount: 5000,
    createdAt: new Date("2024-04-15"),
  },
  {
    id: 2,
    type: "Withdrawal",
    amount: 2000,
    createdAt: new Date("2024-04-16"),
  },
  {
    id: 3,
    type: "Deposit",
    amount: 10000,
    createdAt: new Date("2024-04-17"),
  },
  {
    id: 4,
    type: "Withdrawal",
    amount: 1500,
    createdAt: new Date("2024-04-18"),
  },
  {
    id: 5,
    type: "Deposit",
    amount: 7500,
    createdAt: new Date("2024-04-19"),
  },
];

function RecentWithdrawals() {
  const getAmountColor = (type: string) => {
    if (type.toLowerCase() === "deposit") return "text-green-600";
    if (type.toLowerCase() === "withdrawal") return "text-red-600";
    return "text-yellow-600";
  };

  return (
    <div className="w-full">
      <h2 className="text-lg font-semibold mb-4">Recent Transactions</h2>
      <ul className="space-y-4 text-sm">
        {transactions.map((txn) => (
          <li key={txn.id} className="flex justify-between border-b pb-2">
            <div>
              <p className="font-medium capitalize">{txn.type}</p>
              <p className="text-muted-foreground">
                {txn.createdAt.toLocaleDateString()}
              </p>
            </div>
            <p className={`${getAmountColor(txn.type)} font-semibold`}>
              {txn.type.toLowerCase() === "deposit" ? "+" : "-"}₹{txn.amount}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RecentWithdrawals;
