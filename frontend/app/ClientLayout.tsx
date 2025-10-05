"use client"

import { usePathname } from "next/navigation"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import AppSidebar from "@/components/sidebar/AppSidebar"


export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  const excluded = ["/login", "/register", "/not-found"]

  if (excluded.includes(pathname)) {
    return <>{children}</>
  }

  return (
    <SidebarProvider>
      <AppSidebar/>
      <div className="mr-5"></div>
      {children}
    </SidebarProvider>
  )
}
