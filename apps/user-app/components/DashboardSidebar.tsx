"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  Home,
  ArrowRightLeft,
  Clock,
  TrendingUp
} from "lucide-react";

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
} from "@repo/ui/components/sidebar";

// Sidebar config
const data = {
  navMain: [
    {
      title: "",
      items: [
        { title: "Home", url: "/dashboard/home", icon: Home },
        { title: "Transfer", url: "/dashboard/transfer", icon: ArrowRightLeft },
        { title: "Transactions", url: "/dashboard/transactions", icon: Clock },
        { title: "Investments", url: "/dashboard/investments", icon: TrendingUp },
      ]
    }
  ]
};

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar className="pt-20">
      <SidebarContent>
        {data.navMain.map(group => (
          <SidebarGroup key={group.title} className="pt-32">
            {group.title && <SidebarGroupLabel>{group.title}</SidebarGroupLabel>}
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map(item => {
                  const isActive = pathname === item.url;

                  return (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        asChild
                        isActive={isActive}
                        className="text-2xl py-4 my-1"
                      >
                        <Link href={item.url} className="flex items-center">
                          <div className="w-8">{item.icon && <item.icon />}</div>
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail className="fixed" />
    </Sidebar>
  );
}
