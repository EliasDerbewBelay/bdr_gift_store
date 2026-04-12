"use client";

import React, { useState, useEffect } from "react";
import Sidebar from "@/components/admin/Sidebar";
import Navbar from "@/components/admin/Navbar";
import { usePathname } from "next/navigation";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname();

  // Helper to get title from pathname
  const getPageTitle = (path: string) => {
    if (path === "/admin") return "Dashboard Overview";
    if (path.includes("/products")) return "Products Management";
    if (path.includes("/orders")) return "Orders Management";
    if (path.includes("/analytics")) return "Analytics & Insights";
    return "Admin Dashboard";
  };

  const currentTitle = getPageTitle(pathname);

  // Close sidebar on mobile when path changes
  useEffect(() => {
    setIsSidebarOpen(false);
  }, [pathname]);

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <Sidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
      />
      
      <div className="flex-1 flex flex-col lg:ml-64 transition-all duration-300">
        <Navbar 
          onOpenSidebar={() => setIsSidebarOpen(true)} 
          title={currentTitle} 
        />
        
        <main className="flex-1 p-4 lg:p-8 max-w-7xl mx-auto w-full">
          {children}
        </main>

        <footer className="py-6 px-8 text-center text-slate-400 text-sm border-t border-slate-100 bg-white/50">
          <p>&copy; {new Date().getFullYear()} BDR Gift Store &bull; Admin Panel</p>
        </footer>
      </div>
    </div>
  );
}

