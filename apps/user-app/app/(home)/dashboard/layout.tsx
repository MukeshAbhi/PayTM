"use client";

import { AppSidebar } from "../../../components/DashboardSidebar"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@repo/ui/components/sidebar";
import { Separator } from "@repo/ui/components/separator";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 items-center gap-2 border-b px-4">
          <SidebarTrigger />
          <Separator orientation="vertical" />
        </header>
        <div>
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
