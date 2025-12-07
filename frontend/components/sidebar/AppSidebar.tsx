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

import { LayoutDashboard, Users, CirclePlus, NotebookPen} from 'lucide-react';

export default function AppSidebar() {
  const pathname = usePathname()

  // Helper function to check if current route is active
  const isActive = (path: string) => pathname === path

  return (
    <Sidebar className="h-full" collapsible="offcanvas">
      <SidebarHeader>
        <div className="flex flex-row items-center px-4 py-4 gap-2">
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
          <SidebarGroupLabel className="text-[#a0a0a0] ml-2">Beranda</SidebarGroupLabel>
          <div className="flex flex-col pr-8">
          {/* <SidebarSeparator className="bg-gray-100/7"/> */}
          <SidebarGroupContent className="flex flex-col gap-1 mx-4">
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={isActive("/")}
                  className="pl-5 py-6  mt-1 hover:bg-gray-100/5 hover:text-sidebar-foreground"
                >
                  <Link href="/">
                    <div className="flex flex-row items-center gap-3">
                      <LayoutDashboard className="w-5 h-5"/>
                      <div>Dashboard</div>
                    </div>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
          </div>
        </SidebarGroup>

        {/* STUDENTS SECTION */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-[#a0a0a0] ml-2">Murid</SidebarGroupLabel>
          <div className="flex flex-col pr-8">
            {/* <SidebarSeparator className="bg-gray-100/7"/> */}
            <SidebarGroupContent className="flex flex-col gap-1 mx-4">
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    asChild
                    isActive={isActive("/students")}
                    className="pl-5 py-6 mt-1 hover:bg-gray-100/5 hover:text-sidebar-foreground"
                  >
                    <Link href="/students">
                      <div className="flex flex-row items-center gap-3">
                        <Users className="w-5 h-5"/>
                        <div>Semua Murid</div>
                      </div>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>

              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    asChild
                    isActive={isActive("/add-new-student")}
                    className="pl-5 py-6 hover:bg-gray-100/5 hover:text-sidebar-foreground" 
                  >
                    <Link href="/add-new-student">
                    <div className="flex flex-row items-center gap-3">
                      <CirclePlus className="w-5 h-5"/>
                      <div>Tambah Murid</div>
                    </div>
                  </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>

          </div>
        </SidebarGroup>

        {/* TOKEN MANAGEMENT */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-[#a0a0a0] ml-2">Token & Attendance</SidebarGroupLabel>
          <div className="flex flex-col pr-8">

          {/* <SidebarSeparator className="bg-gray-100/7"/> */}
          <SidebarGroupContent className="flex flex-col gap-1 mx-4">
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={isActive("/attendance")}
                  className="pl-5 py-6 mt-1 hover:bg-gray-100/5 hover:text-sidebar-foreground"
                >
                  <Link href="/attendance">
                    <div className="flex flex-row items-center gap-3">
                      <NotebookPen className="w-5 h-5"/>
                      <div>Catatan Kehadiran</div>
                    </div>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </div>
        </SidebarGroup>

      </SidebarContent>

      <SidebarFooter>
        <div className="px-4 py-2 text-sm font-semibold text-gray-600">
          Version 0.7
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
