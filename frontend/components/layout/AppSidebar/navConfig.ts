// components/layout/AppSidebar/navConfig.ts
import { LayoutDashboard, Users, CirclePlus, NotebookPen } from "lucide-react";
import type { ComponentType } from "react";

export interface NavItem {
  href: string;
  label: string;
  icon: ComponentType<{ className?: string }>;
}

export interface NavGroup {
  label: string;
  items: NavItem[];
}

export const navGroups: NavGroup[] = [
  {
    label: "Beranda",
    items: [
      { href: "/", label: "Dashboard", icon: LayoutDashboard },
    ],
  },
  {
    label: "Murid",
    items: [
      { href: "/students", label: "Semua Murid", icon: Users },
      { href: "/add-new-student", label: "Tambah Murid", icon: CirclePlus },
    ],
  },
  {
    label: "Token & Attendance",
    items: [
      { href: "/attendance", label: "Catatan Kehadiran", icon: NotebookPen },
    ],
  },
];