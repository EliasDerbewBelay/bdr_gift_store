"use client";

import React, { useState, useRef, useEffect } from "react";
import { Menu, Bell, User, LogOut, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { useSession, signOut } from "next-auth/react";

interface NavbarProps {
  onOpenSidebar: () => void;
  title: string;
}

export default function Navbar({ onOpenSidebar, title }: NavbarProps) {
  const { data: session } = useSession();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  // session.user.name will contain the fullName if logged in via DB
  // or "Admin" if logged in via hardcoded credentials.
  const userName = session?.user?.name || "Admin User";
  const userRole = (session?.user as any)?.role || "Super Admin";

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="h-16 bg-white/80 backdrop-blur-md border-b border-slate-100 flex items-center justify-between px-4 lg:px-8 sticky top-0 z-30">
      <div className="flex items-center gap-4 text-left">
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

        {/* Admin Profile Dropdown Container */}
        <div className="relative" ref={dropdownRef}>
          <button 
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="flex items-center gap-3 pl-2 group h-12 rounded-2xl hover:bg-slate-50 px-2 transition-all active:scale-98"
          >
            <div className="text-right hidden sm:block">
              <p className="text-sm font-bold text-slate-800 leading-none">{userName}</p>
              <p className="text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-widest leading-none">{userRole}</p>
            </div>
            
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-linear-to-br from-indigo-500 to-indigo-600 border-2 border-white shadow-soft flex items-center justify-center text-white font-bold overflow-hidden ring-2 ring-transparent group-hover:ring-indigo-100 transition-all">
                 {session?.user?.image ? (
                   <img src={session.user.image} alt={userName} className="w-full h-full object-cover" />
                 ) : (
                   <User size={20} />
                 )}
              </div>
              <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-white shadow-sm flex items-center justify-center border border-slate-100">
                <ChevronDown size={10} className={cn("text-slate-400 transition-transform duration-300", isProfileOpen && "rotate-180")} />
              </div>
            </div>
          </button>

          {/* Dropdown Menu */}
          {isProfileOpen && (
            <div className="absolute top-full right-0 mt-3 w-64 bg-white/95 backdrop-blur-xl rounded-3xl border border-slate-100 shadow-2xl shadow-indigo-100/50 overflow-hidden animate-in fade-in zoom-in-95 slide-in-from-top-4 duration-300 z-50">
              <div className="p-6 border-b border-slate-50 bg-linear-to-br from-slate-50 to-white text-left">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 leading-none">Authentication</p>
                <p className="text-sm font-bold text-slate-800 truncate">{session?.user?.email || "admin@example.com"}</p>
              </div>

              {/* Security and Settings removed as per user request */}

              <div className="p-2 bg-slate-50/40">
                <button 
                  onClick={() => signOut({ callbackUrl: "/signin" })}
                  className="w-full flex items-center gap-3 px-4 py-4 text-sm font-bold text-rose-500 hover:bg-rose-50 hover:text-rose-600 rounded-2xl transition-all group active:scale-95"
                >
                  <div className="w-8 h-8 rounded-lg bg-rose-100/50 flex items-center justify-center group-hover:bg-rose-100 transition-colors">
                    <LogOut size={18} className="text-rose-500" />
                  </div>
                  Sign Out of Dashboard
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
