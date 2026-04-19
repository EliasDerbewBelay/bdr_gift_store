"use client";

import React, { useState } from "react";
import AdminTable from "@/components/admin/AdminTable";
import OrderDetailModal from "@/components/admin/OrderDetailModal";
import StatusBadge from "@/components/admin/StatusBadge";
import { cn } from "@/lib/utils";
import { Search, Eye, Filter, Calendar as CalendarIcon, Download, ShoppingBag, Receipt, Zap, ArrowRight, Table as TableIcon, Phone } from "lucide-react";
import { updateOrderStatus } from "@/lib/actions/admin";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { TableRow, TableCell } from "@/components/ui/table";
import { toast } from "sonner";

interface OrderManagementProps {
  initialOrders: any[];
}

export default function OrderManagement({ initialOrders }: OrderManagementProps) {
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredOrders = initialOrders.filter(o => {
    const matchesSearch = o.customerName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          o.product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          o.id.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  const handleViewDetails = (order: any) => {
    // Normalizing order data for the modal
    const normalizedOrder = {
        ...order,
        productName: order.product.title,
        productImage: order.product.images[0]?.url,
        date: new Date(order.createdAt).toLocaleString(),
        price: order.product.price ? `ETB ${order.product.price.toLocaleString()}` : "COMPLIMENTARY"
    };
    setSelectedOrder(normalizedOrder);
    setIsModalOpen(true);
  };

  const handleStatusUpdate = async (id: string, status: string) => {
    const result = await updateOrderStatus(id, status);
    if (result.success) {
      setIsModalOpen(false);
      toast.success(`Order ${status === "COMPLETED" ? "fulfilled" : "updated"} successfully`);
    } else {
      toast.error("Process synchronization failed");
    }
  };

  const stats = [
    { label: "Active Manifests", value: initialOrders.length, icon: Receipt, color: "text-slate-900", bg: "bg-slate-50" },
    { label: "Pending Selection", value: initialOrders.filter(o => o.status === "PENDING").length, icon: Zap, color: "text-secondary", bg: "bg-secondary/5" },
    { label: "Secured Orders", value: initialOrders.filter(o => o.status === "COMPLETED").length, icon: ShoppingBag, color: "text-emerald-500", bg: "bg-emerald-50" },
  ];

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-6 duration-1000">
      {/* Dynamic Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 px-2">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
             <TableIcon className="h-4 w-4 text-secondary" />
             <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Logistics & Flow</span>
          </div>
          <h2 className="text-4xl font-black text-slate-900 tracking-tight">Customer Manifests</h2>
          <p className="text-slate-500 font-bold text-sm">Review, track and analyze high-priority acquisition requests.</p>
        </div>
        
        <Button variant="outline" className="h-14 px-8 rounded-2xl border-slate-100 bg-white shadow-sm font-black uppercase text-[10px] tracking-widest hover:bg-slate-50 transition-all">
           <Download className="mr-2 h-4 w-4" />
           Export Analytics
        </Button>
      </div>

      {/* Strategic Intelligence Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-2">
        {stats.map((item, i) => (
          <div key={i} className={cn("p-8 rounded-[2rem] border border-slate-100 flex items-center justify-between shadow-sm transition-all hover:shadow-xl hover:-translate-y-1 duration-500 bg-white group")}>
            <div className="space-y-2">
               <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] leading-none mb-1">{item.label}</p>
               <p className={cn("text-3xl font-black tracking-tight", item.color)}>{item.value}</p>
            </div>
            <div className={cn("h-14 w-14 rounded-2xl flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 shadow-inner", item.bg)}>
               <item.icon className={cn("h-6 w-6", item.color)} />
            </div>
          </div>
        ))}
      </div>

      {/* Filters & Search - Tactical Focus */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 px-2">
        <div className="md:col-span-3 relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-primary transition-colors" />
          <Input 
            placeholder="Search manifests by client identity, acquisition title or invoice signature..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="h-14 pl-12 pr-4 bg-white border-slate-100 rounded-2xl font-bold text-xs focus-visible:ring-primary/10 shadow-sm transition-all"
          />
        </div>
        
        <div className="flex items-center gap-4">
           <Button variant="outline" className="flex-1 h-14 rounded-2xl border-slate-100 bg-white font-black text-[10px] uppercase tracking-widest px-6 shadow-sm">
              <CalendarIcon className="mr-2 h-3.5 w-3.5 text-slate-400" />
              Duration
           </Button>
           <div className="h-14 w-14 rounded-2xl bg-slate-950 text-white flex items-center justify-center shadow-xl group cursor-pointer hover:bg-slate-900 transition-colors">
              <Filter className="h-4 w-4 text-secondary group-hover:scale-110 transition-transform" />
           </div>
        </div>
      </div>

      {/* High-Performance Manifest Table */}
      <AdminTable
        columns={["Client Identity", "Acquisition Manifest", "Signature", "Status", "Deployment"]}
        data={filteredOrders}
        renderRow={(order) => (
          <TableRow key={order.id} className="hover:bg-slate-50/50 transition-all duration-300 border-b border-slate-100 group cursor-pointer" onClick={() => handleViewDetails(order)}>
            <TableCell className="px-8 py-7">
              <div className="flex flex-col text-left">
                <span className="text-sm font-black text-slate-900 tracking-tight leading-none mb-2">{order.customerName}</span>
                <div className="flex items-center gap-2">
                   <Phone className="h-3 w-3 text-slate-300" />
                   <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{order.customerPhone}</span>
                </div>
              </div>
            </TableCell>
            <TableCell className="px-8 py-7">
               <div className="flex flex-col gap-1">
                  <span className="text-xs font-black text-slate-600 uppercase tracking-tight">{order.product.title}</span>
                  <Badge variant="outline" className="w-fit text-[8px] font-black uppercase tracking-widest border-slate-100 bg-white h-4 p-1">Item ID: {order.id.slice(-4).toUpperCase()}</Badge>
               </div>
            </TableCell>
            <TableCell className="px-8 py-7 max-w-[240px]">
              <p className="text-xs font-bold text-slate-400 line-clamp-1 italic bg-slate-50 p-2 rounded-lg border border-slate-100/50 transition-colors group-hover:bg-white">
                {order.customMessage ? `"${order.customMessage}"` : "Institutional Selection"}
              </p>
            </TableCell>
            <TableCell className="px-8 py-7">
              <StatusBadge status={order.status.toLowerCase() as any} />
            </TableCell>
            <TableCell className="px-8 py-7">
              <div className="flex items-center justify-between gap-4">
                 <div className="flex flex-col">
                    <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest leading-none mb-1.5">{new Date(order.createdAt).toLocaleDateString()}</span>
                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">Validated</span>
                 </div>
                 <Button 
                   variant="ghost" 
                   size="icon"
                   className="h-10 w-10 rounded-xl text-slate-300 hover:text-primary hover:bg-white hover:shadow-xl transition-all group/btn"
                 >
                   <ArrowRight size={16} className="transition-transform group-hover/btn:translate-x-1" />
                 </Button>
              </div>
            </TableCell>
          </TableRow>
        )}
      />

      <OrderDetailModal 
        isOpen={isModalOpen}
        order={selectedOrder}
        onClose={() => setIsModalOpen(false)}
        onUpdateStatus={handleStatusUpdate}
      />
    </div>
  );
}
