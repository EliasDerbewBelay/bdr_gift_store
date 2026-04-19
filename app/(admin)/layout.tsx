import React from "react";
import { AppSidebar } from "@/components/admin/AppSidebar";
import Navbar from "@/components/admin/Navbar";
import { 
  SidebarInset, 
  SidebarProvider,
} from "@/components/ui/sidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-slate-50/50">
        <AppSidebar />
        <SidebarInset className="flex flex-col">
          <Navbar />
          <main className="flex-1 p-4 lg:p-8 w-full max-w-7xl mx-auto">
            {children}
          </main>
          <footer className="py-8 px-8 text-center text-slate-400 text-[10px] font-bold uppercase tracking-widest border-t border-slate-200/50 bg-white/50">
            <p>&copy; {new Date().getFullYear()} BDR Gift Store &bull; Premium Admin Experience</p>
          </footer>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
