// components/layout/AppSidebar/SidebarNavGroup.tsx
import Link from "next/link";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import type { NavGroup } from "./navConfig";

interface SidebarNavGroupProps {
  group: NavGroup;
  isActive: (path: string) => boolean;
}

export function SidebarNavGroup({ group, isActive }: SidebarNavGroupProps) {
  return (
    <SidebarGroup>
      <SidebarGroupLabel className="text-[#a0a0a0] ml-2">{group.label}</SidebarGroupLabel>
      <div className="flex flex-col pr-8">
        <SidebarGroupContent className="flex flex-col gap-1 mx-4">
          {group.items.map((item, index) => (
            <SidebarMenu key={item.href}>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={isActive(item.href)}
                  className={`pl-5 py-6 hover:bg-gray-100/5 hover:text-sidebar-foreground ${index === 0 ? "mt-1" : ""}`}
                >
                  <Link href={item.href}>
                    <div className="flex flex-row items-center gap-3">
                      <item.icon className="w-5 h-5" />
                      <div>{item.label}</div>
                    </div>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          ))}
        </SidebarGroupContent>
      </div>
    </SidebarGroup>
  );
}