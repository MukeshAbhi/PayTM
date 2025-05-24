"use client"

import { getUserData } from "@/actions/user";
import { BasicUser} from "@repo/types/zodtypes";
import { useEffect, useState } from "react";

export const UserProfile = () => {
    const [user, setUser ] = useState<BasicUser | null>()
    useEffect(() => {
        const userData = async () => {
           const data = await getUserData();
           if (data) {
            setUser(data);
    }
        }
        userData();
    },[])

    return (
    <div className=" w-3/5 h-screen  mt-4  p-4 bg-card text-card-foreground rounded-lg shadow-md space-y-4">
        <div className="space-y-5 ">
            <div className="flex  sm:text-2xl ">
                <span className="font-medium">User Name:</span>
                <h2 className="text-2xl font-semibold text-center pl-32">{user?.name}</h2>
            </div>

            <div className="flex text-sm sm:text-2xl">
                <span className="font-medium">Created On:</span>
                <span className="pl-30">{(user?.createdAt)?.getDate()}</span>
            </div>

            <div className="space-y-2">
                <div className="flex  text-sm sm:text-2xl">
                    <span className="font-medium">Email:</span>
                    <span className="pl-46">{user?.email}</span>
                </div>
                <div className="flex  text-sm sm:text-2xl">
                    <span className="font-medium">Verification:</span>
                    <span className="text-primary font-semibold pl-30">Verified</span>
                
                </div>
            </div>

            <div className="flex  text-sm sm:text-2xl">
                <span className="font-medium">Paytm ID:</span>
                <span className="break-all pl-36">{user?.paymentId}</span>
            </div>
        </div>
    </div>
  );
};
