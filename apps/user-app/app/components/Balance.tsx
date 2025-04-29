import React from 'react'

function Balance() {
  return (
    <div className="w-full rounded-xl bg-card p-6 shadow-md text-card-foreground">
        <h2 className="text-xl font-semibold mb-2">Wallet Balance</h2>
        <p className="text-3xl font-bold text-primary">₹12,500.00</p>
        <p className="text-muted-foreground mt-2 text-sm">As of April 29, 2025</p>
    </div>

  )
}

export default Balance