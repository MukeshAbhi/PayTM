"use client";

const TransferSkeleton = () => {
  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row p-4 gap-4 animate-pulse">
      {/* Left Panel - Transfer Form */}
      <div className="w-full md:w-3/4 lg:w-1/2 bg-muted/30 rounded-2xl shadow-md p-6 flex flex-col justify-between">
        <div className="space-y-6">
          {/* Heading */}
          <div className="text-center space-y-3">
            <div className="h-8 w-32 bg-muted-foreground/30 mx-auto rounded" />
            <div className="h-4 w-3/4 bg-muted/50 mx-auto rounded" />
          </div>

          {/* Error Message Placeholder */}
          <div className="h-4 w-1/2 bg-destructive/30 mx-auto rounded" />

          {/* Form Skeleton */}
          <div className="flex flex-col gap-5">
            {/* Amount */}
            <div className="space-y-2">
              <div className="h-5 w-32 bg-muted-foreground/30 rounded" />
              <div className="h-10 w-full bg-muted/50 rounded" />
            </div>

            {/* PayTM ID */}
            <div className="space-y-2">
              <div className="h-5 w-48 bg-muted-foreground/30 rounded" />
              <div className="h-12 w-full bg-muted/50 rounded" />
            </div>

            {/* Confirm PayTM ID */}
            <div className="space-y-2">
              <div className="h-5 w-48 bg-muted-foreground/30 rounded" />
              <div className="h-12 w-full bg-muted/50 rounded" />
            </div>

            {/* Wallet PIN */}
            <div className="space-y-3">
              <div className="h-5 w-32 bg-muted-foreground/30 rounded" />
              <div className="flex gap-2 pl-10 justify-center">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="h-12 w-10 bg-muted/50 rounded" />
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <div className="h-12 w-full bg-primary/40 rounded" />
          </div>
        </div>
      </div>

      {/* Right Panel - Recent Transactions */}
      <div className="w-full md:w-3/4 lg:w-1/2 bg-muted/30 rounded-2xl shadow-md p-6 space-y-3">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-10 w-full bg-muted/50 rounded" />
        ))}
      </div>
    </div>
  );
};

export default TransferSkeleton;
