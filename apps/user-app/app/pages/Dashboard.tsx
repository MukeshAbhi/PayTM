"use client"
import { AppSidebar } from "../components/Sidebar"

import { Separator } from "@repo/ui/components/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@repo/ui/components/sidebar"
import Home from "../components/Home"
import { useState } from "react"
import Transfer from "../components/Transfer"
import Transcations from "../components/Transcations"
import Investments from "../components/Investments"

export default function Dashboard() {
  const [ selected, setSelected ] = useState("Home");
  console.log(selected)

  const renderComponents = () => {
    switch (selected) {
      case "Home":
        return <Home />;
      case "Transfer":
        return <Transfer />;
      case "Transcations":
        return <Transcations />;
      case "Investments":
        return <Investments />;
      default: 
        return <Home />;
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