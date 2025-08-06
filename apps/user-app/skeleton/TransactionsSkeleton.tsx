"use client";

const TransactionsSkeleton = () => {
  return (
    <div className="p-4 animate-pulse">
      {/* Toggle buttons */}
      <div className="inline-flex rounded-xl overflow-hidden border border-border bg-muted mb-6">
        <div className="px-6 py-2 w-40 h-10 bg-muted-foreground/20" />
        <div className="px-6 py-2 w-40 h-10 bg-muted-foreground/40" />
      </div>

      {/* List of transactions */}
      <div className="mt-4 space-y-4">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="h-12 w-full rounded-lg bg-muted-foreground/20"
          />
        ))}
      </div>
    </div>
  );
};

export default TransactionsSkeleton;
