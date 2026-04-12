"use client";

import React, { useState } from "react";
import AdminTable from "@/components/admin/AdminTable";
import OrderDetailModal from "@/components/admin/OrderDetailModal";
import StatusBadge from "@/components/admin/StatusBadge";
import { cn } from "@/lib/utils";
import { Search, Eye, Filter, Calendar as CalendarIcon, Download } from "lucide-react";

// Mock Data
const initialOrders = [
  { 
    id: "ord_1", 
    customerName: "Elias Belay", 
    phone: "+251 911 123456",
    product: "Luxury Rose Box", 
    productImage: "https://placehold.co/100",
    status: "pending", 
    date: "2026-04-12 14:30", 
    price: "$85.00",
    customMessage: "Happy Birthday to my lovely wife! I hope you like these flowers."
  },
  { 
    id: "ord_2", 
    customerName: "Sara Johnson", 
    phone: "+251 922 654321",
    product: "Gourmet Hamper", 
    productImage: "https://placehold.co/100",
    status: "completed", 
    date: "2026-04-12 12:15", 
    price: "$120.00",
    customMessage: "Thank you for the wonderful service last time!"
  },
  { 
    id: "ord_3", 
    customerName: "Michael Chen", 
    phone: "+251 933 111222",
    product: "Personalized Mug", 
    productImage: "https://placehold.co/100",
    status: "pending", 
    date: "2026-04-12 10:45", 
    price: "$25.00",
    customMessage: "Put the name 'Micky' on the mug please."
  },
  { 
    id: "ord_4", 
    customerName: "Amana K.", 
    phone: "+251 911 555666",
    product: "Birthday Surprise", 
    productImage: "https://placehold.co/100",
    status: "completed", 
    date: "2026-04-11 18:20", 
    price: "$55.00",
    customMessage: "Please deliver it exactly at 6:00 PM."
  },
  { 
    id: "ord_5", 
    customerName: "James Wilson", 
    phone: "+251 944 777888",
    product: "Wedding Gift Set", 
    productImage: "https://placehold.co/100",
    status: "completed", 
    date: "2026-04-11 16:00", 
    price: "$150.00",
    customMessage: "Congratulations to the happy couple!"
  },
];

export default function OrdersPage() {
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [orders, setOrders] = useState(initialOrders);

  const handleViewDetails = (order: any) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const handleUpdateStatus = (id: string, status: string) => {
    setOrders(prev => prev.map(o => o.id === id ? { ...o, status: status as any } : o));
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold text-slate-800 tracking-tight text-left">Customer Orders</h2>
          <p className="text-sm text-slate-500 font-medium">Review, track and manage all gift orders from your customers.</p>
        </div>
        <button className="flex items-center justify-center gap-2 px-5 py-3 bg-white border border-slate-200 text-slate-600 font-bold rounded-2xl hover:bg-slate-50 transition-all shadow-xs">
          <Download size={18} />
          Export CSV
        </button>
      </div>

      {/* Stats Quick Look */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "All Orders", value: orders.length, color: "bg-slate-50 text-slate-600" },
          { label: "Pending", value: orders.filter(o => o.status === "pending").length, color: "bg-amber-50 text-amber-600" },
          { label: "Completed", value: orders.filter(o => o.status === "completed").length, color: "bg-emerald-50 text-emerald-600" },
          { label: "Cancelled", value: 0, color: "bg-rose-50 text-rose-600" },
        ].map((item, i) => (
          <div key={i} className={cn("p-4 rounded-2xl border border-slate-100 flex flex-col gap-1 shadow-xs bg-white text-left")}>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{item.label}</span>
            <span className={cn("text-xl font-bold", item.color.split(" ")[1])}>{item.value}</span>
          </div>
        ))}
      </div>

      {/* Filters & Search */}
      <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-xs flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-1 w-full">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search orders by customer name, ID, or product..." 
            className="w-full pl-12 pr-4 py-3 rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-indigo-100 transition-all text-sm outline-hidden"
          />
        </div>
        <div className="flex items-center gap-2 w-full md:w-auto">
          <button className="flex-1 md:w-auto px-4 py-3 rounded-xl bg-slate-50 text-slate-600 text-sm font-bold flex items-center justify-center gap-2 border border-slate-50 hover:bg-slate-100 transition-colors">
            <CalendarIcon size={16} />
            Date Range
          </button>
          <button className="flex-1 md:w-auto px-4 py-3 rounded-xl bg-slate-50 text-slate-600 text-sm font-bold flex items-center justify-center gap-2 border border-slate-50 hover:bg-slate-100 transition-colors">
            <Filter size={16} />
            Filter
          </button>
        </div>
      </div>

      {/* Orders Table */}
      <AdminTable
        columns={["Customer", "Product", "Message Preview", "Status", "Date", "Actions"]}
        data={orders}
        renderRow={(order) => (
          <tr key={order.id} className="hover:bg-slate-50/50 transition-colors border-b border-slate-50 last:border-0 group">
            <td className="px-6 py-5">
              <div className="flex flex-col text-left">
                <span className="text-sm font-bold text-slate-800">{order.customerName}</span>
                <span className="text-[11px] text-slate-400 font-medium mt-0.5">{order.phone}</span>
              </div>
            </td>
            <td className="px-6 py-5">
              <span className="text-sm font-medium text-slate-600">{order.product}</span>
            </td>
            <td className="px-6 py-5 max-w-xs overflow-hidden">
              <p className="text-xs text-slate-400 truncate italic">
                "{order.customMessage}"
              </p>
            </td>
            <td className="px-6 py-5">
              <StatusBadge status={order.status as any} />
            </td>
            <td className="px-6 py-5 text-xs font-medium text-slate-400 whitespace-nowrap">
              {order.date}
            </td>
            <td className="px-6 py-5">
              <button 
                onClick={() => handleViewDetails(order)}
                className="flex items-center gap-2 px-3 py-2 text-xs font-bold text-indigo-600 bg-indigo-50 border border-indigo-100 rounded-lg hover:bg-indigo-100 transition-all"
              >
                <Eye size={14} />
                View Detail
              </button>
            </td>
          </tr>
        )}
      />

      {/* Order Details Modal */}
      <OrderDetailModal 
        isOpen={isModalOpen}
        order={selectedOrder}
        onClose={() => setIsModalOpen(false)}
        onUpdateStatus={handleUpdateStatus}
      />
    </div>
  );
}
