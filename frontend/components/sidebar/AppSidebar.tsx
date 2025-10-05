"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { SidebarHeader, SidebarProvider, SidebarTrigger, Sidebar, SidebarContent, SidebarGroup, SidebarGroupLabel, SidebarGroupContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarFooter, SidebarSeparator, SidebarRail } from "@/components/ui/sidebar"

export default function AppSidebar() {
  const pathname = usePathname()



  return (

        <Sidebar collapsible="offcanvas" >
            <SidebarHeader>
                <div className="px-4 py-2 text-sm font-semibold text-gray-600">
                    EasyStudy E-System
                </div>
            </SidebarHeader>

            <SidebarContent>

                <SidebarGroup>
                    <SidebarGroupLabel>Home</SidebarGroupLabel>
                    <SidebarSeparator/>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild isActive>
                                    <Link
                                    href="/"
                                    >
                                    Dashboard
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                        
                    </SidebarGroupContent>
                </SidebarGroup>


                <SidebarGroup>
                    <SidebarGroupLabel>Students</SidebarGroupLabel>
                    <SidebarSeparator/>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild>
                                    <Link
                                    href="/students"
                                    >
                                    All
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild>
                                    <Link
                                    href="/add-new-student"
                                    >
                                    Add New Student
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>


            </SidebarContent>

            <SidebarFooter>
                <div className="px-4 py-2 text-sm font-semibold text-gray-600">
                    Version 0.6
                </div>
            </SidebarFooter>
            {/* <SidebarRail/> */}
        </Sidebar>

  )
}
