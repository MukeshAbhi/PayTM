"use client";

const UserProfileSkeleton = () => {
  return (
    <div className="w-full h-auto mt-4 p-6 bg-card text-card-foreground rounded-lg shadow-md space-y-6 animate-pulse">
      <div className="space-y-6">
        {/* User Name */}
        <div className="flex flex-row justify-between items-center">
          <div className="h-4 w-24 rounded bg-muted-foreground/30" />
          <div className="h-6 w-32 rounded bg-muted/50" />
        </div>

        {/* Created On */}
        <div className="flex flex-row justify-between items-center">
          <div className="h-4 w-28 rounded bg-muted-foreground/30" />
          <div className="h-4 w-24 rounded bg-muted/50" />
        </div>

        {/* Email */}
        <div className="flex flex-col gap-4">
          <div className="flex flex-row justify-between items-center">
            <div className="h-4 w-20 rounded bg-muted-foreground/30" />
            <div className="h-4 w-48 rounded bg-muted/50" />
          </div>

          {/* Verification */}
          <div className="flex flex-row justify-between items-center">
            <div className="h-4 w-28 rounded bg-muted-foreground/30" />
            <div className="h-4 w-20 rounded bg-primary/40" />
          </div>
        </div>

        {/* Paytm ID or Button */}
        <div className="flex flex-row justify-between items-center">
          <div className="h-4 w-24 rounded bg-muted-foreground/30" />
          <div className="flex flex-row items-center gap-2">
            <div className="h-4 w-36 rounded bg-muted/50" />
            <div className="h-8 w-20 rounded bg-primary/60" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfileSkeleton;
