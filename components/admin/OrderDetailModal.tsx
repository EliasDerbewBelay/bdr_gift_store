"use client";

import React from "react";
import { X, User, Phone, MessageSquare, Package, Calendar, CheckCircle2, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import StatusBadge from "./StatusBadge";

interface OrderDetailModalProps {
  order: any;
  isOpen: boolean;
  onClose: () => void;
  onUpdateStatus?: (id: string, status: string) => void;
}

export default function OrderDetailModal({ order, isOpen, onClose, onUpdateStatus }: OrderDetailModalProps) {
  if (!isOpen || !order) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="relative bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 slide-in-from-bottom-4 duration-300">
        {/* Header */}
        <div className="px-6 py-6 border-b border-slate-50 flex items-center justify-between bg-white sticky top-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600">
              <Package size={20} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-800 tracking-tight">Order #{order.id.slice(-6).toUpperCase()}</h3>
              <p className="text-xs font-medium text-slate-400 mt-0.5">{order.date}</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-xl transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 lg:p-8 overflow-y-auto max-h-[70vh] space-y-8">
          {/* Customer & Status */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Customer Information</h4>
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3 text-slate-700">
                  <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400">
                    <User size={16} />
                  </div>
                  <span className="text-sm font-semibold">{order.customerName}</span>
                </div>
                <div className="flex items-center gap-3 text-slate-700">
                  <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400">
                    <Phone size={16} />
                  </div>
                  <span className="text-sm font-semibold">{order.phone}</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Order Status</h4>
              <div className="flex items-center gap-3">
                <StatusBadge status={order.status} className="px-4 py-2 text-sm" />
                <button className="text-xs font-bold text-indigo-600 hover:underline">Change Status</button>
              </div>
            </div>
          </div>

          <div className="h-[1px] bg-slate-50" />

          {/* Product Details */}
          <div className="space-y-4">
            <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Items Ordered</h4>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-center gap-4">
              <div className="w-16 h-16 rounded-xl bg-white border border-slate-100 p-1 flex items-center justify-center overflow-hidden">
                <img src={order.productImage || "https://placehold.co/100"} alt="" className="w-full h-full object-cover rounded-lg" />
              </div>
              <div>
                <h5 className="font-bold text-slate-800">{order.product}</h5>
                <p className="text-xs text-slate-500 mt-1 capitalize">{order.category || "Gift Category"}</p>
              </div>
              <div className="ml-auto text-right">
                <p className="text-sm font-bold text-slate-800">{order.price || "N/A"}</p>
                <p className="text-[10px] text-slate-400 font-medium">Qty: 1</p>
              </div>
            </div>
          </div>

          {/* Custom Message */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <MessageSquare size={16} className="text-indigo-500" />
              <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Customization Message</h4>
            </div>
            <div className="p-6 rounded-2xl bg-indigo-50/30 border border-indigo-50 italic text-slate-600 text-sm leading-relaxed">
              "{order.customMessage || "No custom message provided."}"
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-6 border-t border-slate-50 bg-slate-50/50 flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => onUpdateStatus?.(order.id, "completed")}
            className="flex-1 flex items-center justify-center gap-2 py-3 px-6 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold transition-all"
          >
            <CheckCircle2 size={18} />
            Mark as Completed
          </button>
          <button
            onClick={onClose}
            className="flex-1 py-3 px-6 rounded-xl bg-white border border-slate-200 text-slate-600 font-bold hover:bg-slate-50 transition-all"
          >
            Close Detail
          </button>
        </div>
      </div>
    </div>
  );
}
