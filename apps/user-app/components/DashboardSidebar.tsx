"use client"
import * as React from "react"

import {
    Home,
    ArrowRightLeft,
    Clock,
    TrendingUp
  } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@repo/ui/components/sidebar"
import Link from "next/link"


// This is sample data.
const data = {
  navMain: [
    {
        title: "",
        url: "#",
        items: [
            {
                title: "Home",
                url: "/user-dashboard",
                icon: Home
            },
            {
                title: "Transfer",
                url: "#",
                icon: ArrowRightLeft 
            },
            {
                title: "Transcations",
                url: "#",
                icon:  Clock 
            },
            {
              title: "Investments",
              url: "#",
              icon: TrendingUp
            }
        ]
    }
    
    
  ],
}

type AppSidebarProps = {
  onItemSelect: (title: string) => void;
  children?: React.ReactNode; // ✅ Accepts children
};

export function AppSidebar({ onItemSelect, children }: AppSidebarProps)  {

  const [activeTitle, setActiveTitle] = React.useState("Home");
  return (
    <Sidebar className="pt-20"  >
      <SidebarContent >
        {/* We create a SidebarGroup for each parent. */}
        {data.navMain.map((item) => (
          <SidebarGroup  key={item.title} className="pt-32 ">
            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
            <SidebarGroupContent  >
              <SidebarMenu   >
                {item.items.map((item) => (
                  <SidebarMenuItem key={item.title} >
                    <SidebarMenuButton 
                      asChild 
                      isActive={activeTitle === item.title} 
                      onClick={() => {
                        setActiveTitle(item.title);
                        onItemSelect(item.title);
                      }} 
                      className="text-2xl py-4 my-1">
                    <Link href={item.url} className="flex items-center">
                        <div className="w-8 ">{item.icon && <item.icon />}</div>
                        <span>{item.title}</span>
                    </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail className="fixed" />
    </Sidebar>
  )
}
