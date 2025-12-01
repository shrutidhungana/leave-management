import { Home, Users, FileText,  LogOut } from "lucide-react";
import type { NavItem } from "@/types/nav";

export const navItems: NavItem[] = [
  { title: "Dashboard", href: "/dashboard", icon: Home },
  {
    title: "My Leaves",
    href: "/my-leaves",
    icon: FileText,
  },
  { title: "All Leaves", href: "/leaves", icon: Users },
  { title: "Logout", icon: LogOut },
];
