"use client";

import { createPaymentKey, getUserData } from "@/actions/user";
import { BasicUser } from "../types/index";
import { Button } from "@repo/ui/components/button";
import { useEffect, useState } from "react";

export const UserProfile = () => {
  const [user, setUser] = useState<BasicUser | null>(null);
  const [isPresent, setIsPresent] = useState(false);

  const fetchUser = async () => {
    const data = await getUserData();
    if (data) {
      setUser(data);
      setIsPresent(!!data.walletKey);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const createKey = async () => {
    if (!user) return;
      
      await createPaymentKey(user.id);
      await fetchUser();
  }
  

  return (
    <div className="w-full   h-auto mt-4 p-6 bg-card text-card-foreground rounded-lg shadow-md space-y-6">
      <div className="space-y-6">
        <div className="flex  flex-row sm:items-center justify-between">
          <span className="text-base sm:text-xl font-medium">User Name:</span>
          <h2 className="text-lg sm:text-2xl  font-semibold text-right">{user?.name}</h2>
        </div>

        <div className="flex flex-row sm:items-center justify-between">
          <span className="text-base sm:text-xl font-medium">Created On:</span>
          <span className="text-right">{user?.createdAt ? new Date(user.createdAt).toDateString() : "-"}</span>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex flex-row sm:items-center justify-between">
            <span className="text-base sm:text-xl font-medium">Email:</span>
            <span className="text-right break-all">{user?.email}</span>
          </div>

          <div className="flex flex-row sm:items-center justify-between">
            <span className="text-base sm:text-xl font-medium">Verification:</span>
            <span className="text-primary font-semibold text-right">Verified</span>
          </div>
        </div>

        <div className="flex flex-row sm:items-center justify-between">
          <span className="text-base sm:text-xl font-medium">Paytm ID:</span>
          {
            isPresent == false ? (<span className="text-right break-all">{"-"}<Button onClick={createKey} className="ml-2 text-white">Create Id</Button></span>) 
                               : (<span className="text-right break-all">{user?.walletKey}</span>)
          }
        </div>
      </div>
    </div>
  );
};
