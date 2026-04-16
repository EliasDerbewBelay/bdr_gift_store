"use client";

import React, { useState } from "react";
import AdminTable from "@/components/admin/AdminTable";
import OrderDetailModal from "@/components/admin/OrderDetailModal";
import StatusBadge from "@/components/admin/StatusBadge";
import { cn } from "@/lib/utils";
import { Search, Eye, Filter, Calendar as CalendarIcon, Download } from "lucide-react";
import { updateOrderStatus } from "@/lib/actions/admin";

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
        price: order.product.price ? `ETB ${order.product.price.toLocaleString()}` : "N/A"
    };
    setSelectedOrder(normalizedOrder);
    setIsModalOpen(true);
  };

  const handleStatusUpdate = async (id: string, status: string) => {
    const result = await updateOrderStatus(id, status);
    if (result.success) {
      setIsModalOpen(false);
    } else {
      alert("Failed to update status");
    }
  };

  const stats = [
    { label: "All Orders", value: initialOrders.length, color: "text-slate-600" },
    { label: "Pending", value: initialOrders.filter(o => o.status === "PENDING").length, color: "text-amber-600" },
    { label: "Completed", value: initialOrders.filter(o => o.status === "COMPLETED").length, color: "text-emerald-600" },
    { label: "Cancelled", value: initialOrders.filter(o => o.status === "CANCELLED").length, color: "text-rose-600" },
  ];

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
        {stats.map((item, i) => (
          <div key={i} className="p-4 rounded-2xl border border-slate-100 flex flex-col gap-1 shadow-xs bg-white text-left">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">{item.label}</span>
            <span className={cn("text-xl font-bold", item.color)}>{item.value}</span>
          </div>
        ))}
      </div>

      {/* Filters & Search */}
      <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-xs flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-1 w-full">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input 
            type="text" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search orders..." 
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
        columns={["Customer", "Product", "Message", "Status", "Date", "Actions"]}
        data={filteredOrders}
        renderRow={(order) => (
          <tr key={order.id} className="hover:bg-slate-50/50 transition-colors border-b border-slate-50 last:border-0 group">
            <td className="px-6 py-5">
              <div className="flex flex-col text-left">
                <span className="text-sm font-bold text-slate-800">{order.customerName}</span>
                <span className="text-[11px] text-slate-400 font-medium mt-0.5">{order.customerPhone}</span>
              </div>
            </td>
            <td className="px-6 py-5 text-left">
              <span className="text-sm font-medium text-slate-600">{order.product.title}</span>
            </td>
            <td className="px-6 py-5 max-w-[200px] text-left">
              <p className="text-xs text-slate-400 truncate italic">
                {order.customMessage ? `"${order.customMessage}"` : "No message"}
              </p>
            </td>
            <td className="px-6 py-5 text-left">
              <StatusBadge status={order.status.toLowerCase() as any} />
            </td>
            <td className="px-6 py-5 text-xs font-medium text-slate-400 whitespace-nowrap text-left">
              {new Date(order.createdAt).toLocaleDateString()}
            </td>
            <td className="px-6 py-5 text-left">
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

      <OrderDetailModal 
        isOpen={isModalOpen}
        order={selectedOrder}
        onClose={() => setIsModalOpen(false)}
        onUpdateStatus={handleStatusUpdate}
      />
    </div>
  );
}
