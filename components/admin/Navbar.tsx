"use client";

import React from "react";
import { Menu, Bell, User, LogOut, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

interface NavbarProps {
  onOpenSidebar: () => void;
  title: string;
}

export default function Navbar({ onOpenSidebar, title }: NavbarProps) {
  return (
    <header className="h-16 bg-white/80 backdrop-blur-md border-b border-slate-100 flex items-center justify-between px-4 lg:px-8 sticky top-0 z-30">
      <div className="flex items-center gap-4">
        <button 
          onClick={onOpenSidebar}
          className="lg:hidden p-2 text-slate-500 hover:bg-slate-50 rounded-lg transition-colors"
        >
          <Menu size={20} />
        </button>
        <h1 className="text-xl font-bold text-slate-800 tracking-tight">{title}</h1>
      </div>

      <div className="flex items-center gap-2 lg:gap-4">
        {/* Notifications */}
        <button className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-slate-50 rounded-full transition-all relative group">
          <Bell size={20} />
          <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border-2 border-white ring-2 ring-rose-100 group-hover:animate-bounce" />
        </button>

        <div className="h-8 w-[1px] bg-slate-100 mx-1 hidden sm:block" />

        {/* Admin Profile Dropdown - Simple Version for now */}
        <div className="flex items-center gap-3 pl-2 group cursor-pointer">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-semibold text-slate-800 leading-none">Admin User</p>
            <p className="text-[11px] font-medium text-slate-400 mt-1 uppercase tracking-tight">Super Admin</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-linear-to-br from-indigo-500 to-purple-600 border-2 border-white shadow-soft flex items-center justify-center text-white font-bold group-hover:scale-105 transition-transform">
            <User size={20} />
          </div>
        </div>
      </div>
    </header>
  );
}
