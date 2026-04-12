"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  ShoppingBag, 
  Package, 
  BarChart3, 
  X,
  Gift
} from "lucide-react";
import { cn } from "@/lib/utils"; // Assuming utils exists, if not I'll define a fallback

const navItems = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Products", href: "/admin/products", icon: Package },
  { label: "Orders", href: "/admin/orders", icon: ShoppingBag },
  { label: "Analytics", href: "/admin/analytics", icon: BarChart3 },
];

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar Container */}
      <aside className={cn(
        "fixed top-0 left-0 h-full bg-white border-r border-slate-100 w-64 z-50 transition-transform duration-300 ease-soft-spring lg:translate-x-0 outline-hidden",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        {/* Logo Section */}
        <div className="h-16 flex items-center justify-between px-6 border-b border-slate-50">
          <Link href="/admin" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white shadow-soft group-hover:scale-110 transition-transform">
              <Gift size={18} />
            </div>
            <span className="font-bold text-slate-800 text-lg tracking-tight">BDR Admin</span>
          </Link>
          <button 
            onClick={onClose}
            className="lg:hidden p-2 text-slate-400 hover:text-slate-600 rounded-md hover:bg-slate-50"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => {
                  if (window.innerWidth < 1024) onClose();
                }}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group text-sm font-medium",
                  isActive 
                    ? "bg-indigo-50 text-indigo-600 shadow-sm shadow-indigo-100/50" 
                    : "text-slate-500 hover:bg-slate-50 hover:text-slate-800"
                )}
              >
                <Icon 
                  size={18} 
                  className={cn(
                    "transition-colors",
                    isActive ? "text-indigo-600" : "text-slate-400 group-hover:text-slate-600"
                  )} 
                />
                {item.label}
                {isActive && (
                  <div className="ml-auto w-1 h-4 rounded-full bg-indigo-600" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Bottom Section (Optional) */}
        <div className="absolute bottom-4 left-0 w-full px-4">
          <div className="p-4 rounded-2xl bg-slate-50/80 border border-slate-100/50">
            <p className="text-[11px] font-medium text-slate-400 uppercase tracking-wider mb-1">Status</p>
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-600">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Store Online
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
