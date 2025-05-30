import AppbarClient from "@/ui/AppbarClient";
import { JSX } from "react";

export default function Layout({children} : {children: React.ReactNode}): JSX.Element {
    return(
        <div className="flex flex-col min-h-screen">
            <AppbarClient />
            <div className="flex-1 pt-20 px-4">
                {children}
            </div>
        </div>
    )
}