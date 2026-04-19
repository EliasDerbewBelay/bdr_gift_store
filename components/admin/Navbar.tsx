"use client";

import React from "react";
import { Bell, User, LogOut, ChevronDown, Search, Command } from "lucide-react";
import { useSession, signOut } from "next-auth/react";
import { usePathname } from "next/navigation";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

export default function Navbar() {
  const { data: session } = useSession();
  const pathname = usePathname();
  
  const userName = session?.user?.name || "Admin User";
  const userRole = (session?.user as any)?.role || "Super Admin";

  const getPageTitle = (path: string) => {
    if (path === "/admin") return "Overview";
    if (path.includes("/products")) return "Inventory";
    if (path.includes("/orders")) return "Order Management";
    if (path.includes("/analytics")) return "Performance & Insights";
    if (path.includes("/users")) return "Client Relation";
    return "Operations Center";
  };

  const title = getPageTitle(pathname);

  return (
    <header className="h-20 bg-white/60 backdrop-blur-2xl border-b border-slate-200/50 flex items-center justify-between px-8 sticky top-0 z-40">
      <div className="flex items-center gap-6 flex-1">
        <SidebarTrigger className="-ml-3 text-slate-400 hover:text-primary transition-all duration-300 h-10 w-10 rounded-xl hover:bg-white hover:shadow-xl" />
        
        <div className="h-6 w-[1px] bg-slate-200 hidden md:block" />
        
        <div className="hidden lg:flex flex-col">
           <div className="flex items-center gap-2">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Intelligence Unit</span>
              <Badge variant="outline" className="text-[8px] font-black uppercase tracking-widest border-slate-100 bg-white shadow-sm h-4">Alpha</Badge>
           </div>
           <h1 className="text-xl font-black text-slate-900 tracking-tight leading-none mt-1">{title}</h1>
        </div>

        {/* Search Bar - Aesthetic Focus */}
        <div className="hidden md:flex flex-1 max-w-sm ml-10 relative group">
           <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-primary transition-colors" />
           <Input 
             placeholder="Search database..." 
             className="h-11 pl-12 pr-4 bg-slate-50/50 border-slate-100 rounded-2xl font-bold text-xs focus-visible:ring-primary/10 focus-visible:border-primary transition-all shadow-xs"
           />
           <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-1.5 opacity-40 group-focus-within:opacity-100 transition-opacity">
              <Command className="h-3 w-3" />
              <span className="text-[10px] font-black">K</span>
           </div>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="flex items-center gap-3 pr-4 border-r border-slate-100">
           <Button variant="outline" size="icon" className="h-10 w-10 rounded-xl border-slate-100 bg-white shadow-sm text-slate-400 hover:text-primary hover:shadow-xl hover:-translate-y-0.5 transition-all relative">
             <Bell className="h-4 w-4" />
             <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-secondary rounded-full border-2 border-white ring-4 ring-secondary/20 animate-pulse" />
           </Button>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center gap-4 px-3 h-14 hover:bg-white hover:shadow-2xl hover:shadow-slate-200/50 rounded-2xl transition-all duration-500 data-[state=open]:bg-white group">
              <div className="text-right hidden sm:block">
                <p className="text-xs font-black text-slate-900 tracking-tight">{userName}</p>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-0.5 opacity-60 group-hover:opacity-100 transition-opacity">{userRole}</p>
              </div>
              
              <div className="relative">
                <Avatar className="h-10 w-10 border-2 border-white shadow-2xl transition-all duration-500 group-hover:scale-105 group-hover:rotate-3">
                  <AvatarImage src={session?.user?.image || ""} alt={userName} />
                  <AvatarFallback className="bg-slate-950 text-white font-black text-xs">
                    {userName.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-white shadow-sm ring-4 ring-emerald-500/10" />
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-72 rounded-[2rem] p-3 mt-4 border-slate-100 shadow-2xl animate-in fade-in slide-in-from-top-4 duration-500">
            <DropdownMenuLabel className="p-6 bg-slate-50/50 rounded-[1.5rem] mb-2">
              <div className="flex flex-col space-y-2">
                 <div className="flex items-center gap-2">
                   <div className="h-1.5 w-1.5 rounded-full bg-secondary" />
                   <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">Identity Confirmed</p>
                 </div>
                 <p className="text-sm font-black text-slate-900 truncate leading-none">{session?.user?.email || "admin@example.com"}</p>
              </div>
            </DropdownMenuLabel>
            
            <DropdownMenuItem className="px-5 py-4 text-xs font-bold text-slate-600 focus:bg-slate-50 focus:text-slate-900 rounded-xl cursor-pointer transition-all flex items-center justify-between group">
               View Profile
               <User className="h-4 w-4 opacity-40 group-hover:opacity-100 transition-all group-hover:translate-x-0.5" />
            </DropdownMenuItem>
            
            <DropdownMenuSeparator className="my-2 bg-slate-50" />
            
            <DropdownMenuItem 
              onClick={() => signOut({ callbackUrl: "/signin" })}
              className="px-5 py-4 text-xs font-black text-rose-500 focus:bg-rose-50 focus:text-rose-600 rounded-xl cursor-pointer transition-all flex items-center justify-between group"
            >
              Sign Out Securely
              <LogOut className="h-4 w-4 opacity-40 group-hover:opacity-100 transition-all group-hover:translate-x-0.5" />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
