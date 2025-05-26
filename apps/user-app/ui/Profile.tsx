"use client"
import { AppSidebar } from "../components/ProfileSidebar"
import { Separator } from "@repo/ui/components/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@repo/ui/components/sidebar"
import { useState } from "react"
import { UserProfile } from "../components/UserProfile"
import { Passwords } from "../components/Passwords"
import { WalletPin } from "../components/WalletPin"

export default function Profile() {
  const [ selected, setSelected ] = useState("Profile");
  console.log(selected)

  const renderComponents = () => {
    switch (selected) {
      case "Profile":
        return <UserProfile />;
      case "Wallet Pin":
        return <WalletPin />;
      default: 
        return <UserProfile />;
    }
  }
  return (
    <SidebarProvider>
      <AppSidebar onItemSelect={setSelected}/>
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4 ">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="" />
        </header>
        <div className="">
        {renderComponents()} 
        </div>
      </SidebarInset>
      
    </SidebarProvider>
  )
}