"use client"

import { useState } from "react";

export const UserProfile = () => {
    const [isVerified, setIsVerified ] = useState<boolean>(false)

    return (
    <div className=" w-3/5 h-screen  mt-4  p-4 bg-card text-card-foreground rounded-lg shadow-md space-y-4">
        <div className="space-y-5 ">
            <div className="flex  sm:text-2xl ">
                <span className="font-medium">User Name:</span>
                <h2 className="text-2xl font-semibold text-center pl-32">Mukesh</h2>
            </div>

            <div className="flex text-sm sm:text-2xl">
                <span className="font-medium">Created On:</span>
                <span className="pl-30">Jan 1st 2025</span>
            </div>

            <div className="space-y-2">
                <div className="flex  text-sm sm:text-2xl">
                    <span className="font-medium">Email:</span>
                    <span className="pl-46">abhi@gmail.com</span>
                </div>
                <div className="flex  text-sm sm:text-2xl">
                    <span className="font-medium">Verification:</span>
                    <span className="text-primary font-semibold pl-30">Verified</span>
                
                </div>
            </div>

            <div className="flex  text-sm sm:text-2xl">
                <span className="font-medium">Paytm ID:</span>
                <span className="break-all pl-36">321230dnjfn3489tu38</span>
            </div>
        </div>
    </div>
  );
};
