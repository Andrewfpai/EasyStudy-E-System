// components/layout/AppSidebar/AppSidebar.tsx
"use client";
import { usePathname } from "next/navigation";
import { Sidebar, SidebarHeader, SidebarContent, SidebarFooter } from "@/components/ui/sidebar";
import { navGroups } from "./navConfig";
import { SidebarNavGroup } from "./SidebarNavGroup";

export default function AppSidebar() {
  const pathname = usePathname();
  const isActive = (path: string) => pathname === path;

  return (
    <Sidebar className="h-full" collapsible="offcanvas">
      <SidebarHeader>
        <div className="flex flex-row items-center px-4 py-4 gap-2">
          <div className="text-lg font-semibold text-gray-600 text-muted">
            EasyStudy E-System
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        {navGroups.map((group) => (
          <SidebarNavGroup key={group.label} group={group} isActive={isActive} />
        ))}
      </SidebarContent>

      <SidebarFooter>
        <div className="px-4 py-2 text-sm font-semibold text-gray-600">
          Version 0.7
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}