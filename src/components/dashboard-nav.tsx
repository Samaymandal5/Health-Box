"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import {
  LayoutDashboard,
  BotMessageSquare,
  Pill,
  Salad,
  Dumbbell,
  BrainCircuit,
  HeartPulse,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/dashboard/chat", icon: BotMessageSquare, label: "Dr. AI Assistant" },
  { href: "/dashboard/medicine-suggestion", icon: Pill, label: "Medicine Suggestion" },
  { href: "/dashboard/diet-planner", icon: Salad, label: "AI Diet Planner" },
  { href: "/dashboard/exercise-planner", icon: Dumbbell, label: "Exercise Planner" },
  { href: "/dashboard/mental-health", icon: BrainCircuit, label: "Mental Health" },
  { href: "/dashboard/wellness-corner", icon: HeartPulse, label: "Wellness Corner" },
];

export function DashboardNav() {
  const pathname = usePathname();

  return (
    <SidebarMenu>
      {navItems.map((item) => (
        <SidebarMenuItem key={item.href}>
          <SidebarMenuButton
            asChild
            isActive={pathname === item.href}
            className={cn(
              "w-full justify-start",
              pathname === item.href && "bg-primary/10 text-primary"
            )}
          >
            <Link href={item.href}>
              <item.icon className="h-5 w-5 mr-3" />
              <span>{item.label}</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}
