"use client";

import * as React from "react";
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  BarChart3,
  Gift,
  Settings,
  Users,
  Bell,
  ExternalLink,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const navItems = [
  { label: "Overview", href: "/admin", icon: LayoutDashboard },
  { label: "Inventory", href: "/admin/products", icon: Package },
  { label: "Orders", href: "/admin/orders", icon: ShoppingBag },
  { label: "Customers", href: "/admin/users", icon: Users },
  { label: "Analytics", href: "/admin/analytics", icon: BarChart3 },
];

const secondaryItems = [
  { label: "Settings", href: "/admin/settings", icon: Settings },
  { label: "History", href: "/admin/history", icon: Bell },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar collapsible="icon" className="border-r border-slate-200/50 bg-white">
      <SidebarHeader className="h-20 flex items-center px-6">
        <Link href="/admin" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-2xl shadow-primary/20 rotate-3 transition-transform hover:rotate-0">
            <Gift className="h-5 w-5" />
          </div>
          <div className="flex flex-col gap-0.5 leading-none group-data-[collapsible=icon]:hidden origin-left transition-all">
            <span className="font-black text-slate-900 tracking-tight text-lg">Bahr Dar</span>
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.25em]">Exclusive</span>
          </div>
        </Link>
      </SidebarHeader>
      
      <SidebarContent className="px-3">
        <SidebarGroup>
          <SidebarGroupLabel className="px-4 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-4 mt-2">Intelligence</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1.5">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <SidebarMenuItem key={item.label}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive}
                      tooltip={item.label}
                      className={React.useMemo(() => {
                        return "h-12 rounded-[1.25rem] transition-all duration-300 px-4 group/btn data-[active=true]:bg-slate-950 data-[active=true]:text-white data-[active=true]:shadow-xl data-[active=true]:shadow-slate-200 hover:bg-slate-50";
                      }, [])}
                    >
                      <Link href={item.href} className="flex items-center gap-3">
                        <item.icon className={`h-4.5 w-4.5 transition-all duration-300 ${isActive ? 'text-secondary scale-110' : 'text-slate-400 group-hover/btn:text-slate-600'}`} />
                        <span className="font-black text-[11px] uppercase tracking-widest leading-none">{item.label}</span>
                        {isActive && (
                           <motion.div 
                             layoutId="sidebar-active" 
                             className="ml-auto h-1.5 w-1.5 rounded-full bg-secondary shadow-[0_0_10px_#fbbf24]"
                           />
                        )}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <Separator className="my-6 bg-slate-50 mx-4" />

        <SidebarGroup>
          <SidebarGroupLabel className="px-4 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-4">Operations</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1.5">
              {secondaryItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <SidebarMenuItem key={item.label}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive}
                      tooltip={item.label}
                      className="h-12 rounded-[1.25rem] transition-all duration-300 px-4 hover:bg-slate-50 group/secondary"
                    >
                      <Link href={item.href} className="flex items-center gap-3">
                        <item.icon className="h-4.5 w-4.5 text-slate-400 group-hover/secondary:text-slate-600 transition-colors" />
                        <span className="font-bold text-[11px] uppercase tracking-widest text-slate-500 group-hover/secondary:text-slate-900 leading-none">{item.label}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-6">
        <div className="rounded-[2.5rem] bg-slate-950 p-6 shadow-2xl group-data-[collapsible=icon]:hidden relative overflow-hidden group/status cursor-pointer">
          <div className="absolute top-0 right-0 p-3 opacity-20 transition-transform group-hover/status:scale-110 group-hover/status:rotate-12">
             <ExternalLink className="h-8 w-8 text-white" />
          </div>
          <div className="relative z-10 space-y-4">
             <div className="space-y-1">
                <p className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em] leading-none">Global Status</p>
                <div className="flex items-center gap-2 text-xs font-black text-secondary uppercase tracking-widest">
                  <div className="h-2 w-2 rounded-full bg-secondary animate-pulse shadow-[0_0_12px_#fbbf24]" />
                  Online
                </div>
             </div>
             
             <Badge className="bg-white/10 hover:bg-white/20 text-white border-none text-[9px] font-black uppercase tracking-widest h-6">
                Premium Store
             </Badge>
          </div>
        </div>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}

import { motion } from "framer-motion";
