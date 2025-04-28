import * as React from "react"

import {
    Home,
    ArrowRightLeft,
    Clock 
  } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@repo/ui/components/sidebar"


// This is sample data.
const data = {
  navMain: [
    {
        title: "",
        url: "#",
        items: [
            {
                title: "Home",
                url: "#",
                isActive: true,
                icon: Home
            },
            {
                title: "Transfer",
                url: "#",
                isActive: false,
                icon: ArrowRightLeft 
            },
            {
                title: "Transcations",
                url: "#",
                isActive: false,
                icon:  Clock 
            },
        ]
    }
    
    
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props} >
      
      <SidebarContent >
        {/* We create a SidebarGroup for each parent. */}
        {data.navMain.map((item) => (
          <SidebarGroup  key={item.title} className="pt-32 ">
            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
            <SidebarGroupContent  >
              <SidebarMenu   >
                {item.items.map((item) => (
                  <SidebarMenuItem key={item.title} >
                    <SidebarMenuButton asChild isActive={item.isActive} className="text-2xl py-4 my-1">
                    <a href={item.url} className="flex items-center">
                        <div className="w-8 ">{item.icon && <item.icon />}</div>
                        <span>{item.title}</span>
                    </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
