"use client";

import React from "react";

const HomeSkeleton = () => {
  return (
    <div className="flex h-screen w-full flex-col p-4 animate-pulse">
      <div className="flex flex-1 flex-col gap-4 md:flex-row rounded-lg">
        {/* Panel One - Toggle + Form Skeleton */}
        <div className="flex h-[60%] md:h-full md:w-3/5 flex-col rounded-lg bg-muted/30 p-6 overflow-y-auto">
          <div className="mb-4 flex justify-baseline pl-10 gap-4">
            <div className="h-10 w-24 rounded-lg bg-muted-foreground/30" />
            <div className="h-10 w-24 rounded-lg bg-muted-foreground/50" />
          </div>

          <div className="flex flex-col gap-4 mt-4">
            <div className="h-10 w-3/4 rounded bg-muted-foreground/30" />
            <div className="h-10 w-2/3 rounded bg-muted-foreground/40" />
            <div className="h-40 w-full rounded bg-muted-foreground/20" />
          </div>
        </div>

        {/* Panel Two - Balance */}
        <div className="flex flex-1 flex-col gap-4 md:w-1/2">
          <div className="flex h-[50%] md:h-1/3 items-center justify-center rounded-lg bg-muted/30 p-6">
            <div className="h-20 w-3/4 rounded bg-muted-foreground/30" />
          </div>

          {/* Panel Three - Transactions */}
          <div className="flex flex-1 flex-col gap-2 rounded-lg bg-muted/30 p-6">
            {[...Array(4)].map((_, idx) => (
              <div
                key={idx}
                className="h-10 w-full rounded bg-muted-foreground/20"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeSkeleton;
