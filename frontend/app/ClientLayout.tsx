"use client"

import { usePathname } from "next/navigation"
import { SidebarProvider } from "@/components/ui/sidebar"
import AppSidebar from "@/components/sidebar/AppSidebar"

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const excluded = ["/login", "/register", "/not-found"]

  if (excluded.includes(pathname)) {
    return <>{children}</>
  }

  return (
    <SidebarProvider>
      <div className="flex h-full w-full">
        {/* Sidebar */}
        <AppSidebar />

        {/* Main content */}
        <div className="flex-1 min-w-0 overflow-auto">
          {children}
        </div>
      </div>
    </SidebarProvider>
  )
}
