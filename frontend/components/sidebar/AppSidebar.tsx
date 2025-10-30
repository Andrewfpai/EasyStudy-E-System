"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  SidebarHeader,
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarSeparator,
} from "@/components/ui/sidebar"
import ESLogo from "@/assets/Logo.png"
import Image from "next/image"

export default function AppSidebar() {
  const pathname = usePathname()

  // Helper function to check if current route is active
  const isActive = (path: string) => pathname === path

  return (
    <Sidebar collapsible="offcanvas">
      <SidebarHeader>
        <div className="flex flex-row items-center px-4 py-2 gap-2">
          {/* <div className="relative w-10 h-10">
            <Image
              src={ESLogo}
              alt="EasyStudy logo"
              fill
              className="rounded-full object-contain"
            />
          </div> */}
          <div className="text-lg font-semibold text-gray-600 text-muted">
            EasyStudy E-System
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>

        {/* HOME SECTION */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-[#a0a0a0]">Home</SidebarGroupLabel>
          <div className="flex flex-col pr-4">
          <SidebarSeparator className="bg-gray-100/7"/>
          <SidebarGroupContent className="flex flex-col gap-1 ml-2">
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={isActive("/")}
                  className="pl-4 py-4.5 mt-1 hover:bg-gray-100/5 hover:text-sidebar-foreground"
                >
                  <Link href="/">Dashboard</Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
          </div>
        </SidebarGroup>

        {/* STUDENTS SECTION */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-[#a0a0a0]">Students</SidebarGroupLabel>
          <div className="flex flex-col pr-4">
            <SidebarSeparator className="bg-gray-100/7"/>
            <SidebarGroupContent className="flex flex-col gap-1 ml-2">
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    asChild
                    isActive={isActive("/students")}
                    className="pl-4 py-4.5 mt-1 hover:bg-gray-100/5 hover:text-sidebar-foreground"
                  >
                    <Link href="/students">All Students</Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>

              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    asChild
                    isActive={isActive("/add-new-student")}
                    className="pl-4 py-4.5 hover:bg-gray-100/5 hover:text-sidebar-foreground" 
                  >
                    <Link href="/add-new-student">Register Student</Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>

          </div>
        </SidebarGroup>

        {/* TOKEN MANAGEMENT */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-[#a0a0a0]">Token & Attendance</SidebarGroupLabel>
          <div className="flex flex-col pr-4">

          <SidebarSeparator className="bg-gray-100/7"/>
          <SidebarGroupContent className="flex flex-col gap-1 ml-2">
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={isActive("/attendance")}
                  className="pl-4 py-4.5 mt-1 hover:bg-gray-100/5 hover:text-sidebar-foreground"
                >
                  <Link href="/attendance">Attendance Records</Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </div>
        </SidebarGroup>

      </SidebarContent>

      <SidebarFooter>
        <div className="px-4 py-2 text-sm font-semibold text-gray-600">
          Version 0.6
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
