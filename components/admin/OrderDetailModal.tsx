"use client";

import React from "react";
import { X, User, Phone, MessageSquare, Package, Calendar, CheckCircle2, Clock, MapPin, Receipt, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import StatusBadge from "./StatusBadge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface OrderDetailModalProps {
  order: any;
  isOpen: boolean;
  onClose: () => void;
  onUpdateStatus?: (id: string, status: string) => void;
}

export default function OrderDetailModal({ order, isOpen, onClose, onUpdateStatus }: OrderDetailModalProps) {
  if (!order) return null;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[calc(100%-2rem)] md:max-w-[90vw] lg:max-w-4xl p-0 overflow-hidden border-none rounded-3xl lg:rounded-[2.5rem] shadow-4xl shadow-slate-900/20 bg-slate-50">
        <div className="max-h-[95vh] overflow-y-auto scrollbar-hide">
           {/* Header with Luxury Banner */}
           <div className="relative h-24 sm:h-32 bg-slate-950 flex items-center px-4 sm:px-6 md:px-10 overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-10 rotate-12">
                 <Receipt className="h-40 w-40 text-white" />
              </div>
              <div className="relative z-10 flex items-center gap-6">
                 <div className="h-16 w-16 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center text-white shadow-2xl">
                    <Package className="h-8 w-8 text-secondary" />
                 </div>
                 <div>
                    <div className="flex items-center gap-2 mb-1">
                       <ShieldCheck className="h-3 w-3 text-emerald-400" />
                       <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/50">Transaction Verified</span>
                    </div>
                    <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-white tracking-tight">Invoice #{order.id.slice(-6).toUpperCase()}</h3>
                 </div>
              </div>
           </div>

           <div className="p-4 sm:p-6 md:p-10 space-y-6 md:space-y-10">
              {/* Strategic Details Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-10">
                 {/* Identity Profile */}
                 <div className="space-y-6">
                    <div className="flex items-center gap-3">
                       <div className="h-1 w-4 rounded-full bg-secondary" />
                       <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Client Profile</h4>
                    </div>
                    <div className="grid grid-cols-1 gap-4">
                       <div className="flex items-center gap-5 p-5 rounded-2xl bg-white border border-slate-100 shadow-sm transition-all hover:border-primary/20 cursor-default group">
                          <div className="h-12 w-12 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-slate-950 group-hover:text-white transition-all duration-300">
                             <User className="h-5 w-5" />
                          </div>
                          <div>
                             <p className="text-sm font-black text-slate-900 tracking-tight leading-none mb-1.5">{order.customerName}</p>
                             <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">Full Identification</p>
                          </div>
                       </div>
                       
                       <div className="flex items-center gap-5 p-5 rounded-2xl bg-white border border-slate-100 shadow-sm transition-all hover:border-primary/20 cursor-default group">
                          <div className="h-12 w-12 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-slate-950 group-hover:text-white transition-all duration-300">
                             <Phone className="h-5 w-5" />
                          </div>
                          <div>
                             <p className="text-sm font-black text-slate-900 tracking-tight leading-none mb-1.5">{order.customerPhone || order.phone}</p>
                             <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">Secure Contact Line</p>
                          </div>
                       </div>
                    </div>
                 </div>

                 {/* Operational Status */}
                 <div className="space-y-6">
                    <div className="flex items-center gap-3">
                       <div className="h-1 w-4 rounded-full bg-secondary" />
                       <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Deployment Status</h4>
                    </div>
                    <div className="p-4 sm:p-6 md:p-8 rounded-2xl lg:rounded-[2rem] bg-white border border-slate-100 shadow-sm space-y-6">
                       <div className="flex items-center justify-between">
                          <StatusBadge status={order.status.toLowerCase() as any} className="px-5 py-2.5" />
                          <div className="flex items-center gap-2">
                             <Clock className="h-3 w-3 text-slate-400" />
                             <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{order.date}</span>
                          </div>
                       </div>
                       
                       <Separator className="bg-slate-50" />
                       
                       <div className="flex items-center gap-3 text-slate-400 text-xs font-bold px-2 italic">
                          <MapPin className="h-4 w-4 shrink-0" />
                          Pending logistical clearance for finalized destination.
                       </div>
                    </div>
                 </div>
              </div>

              {/* Manifest Item */}
              <div className="space-y-6">
                 <div className="flex items-center gap-3">
                    <div className="h-1 w-4 rounded-full bg-secondary" />
                    <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Acquisition Manifest</h4>
                 </div>
                 <div className="p-4 sm:p-6 md:p-8 rounded-2xl lg:rounded-[2rem] bg-slate-950 text-white shadow-2xl overflow-hidden relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-secondary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                    <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
                       <div className="md:h-24 md:w-24 h-40 w-full rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 p-1 flex items-center justify-center overflow-hidden transition-transform duration-700 group-hover:scale-105 group-hover:rotate-2">
                          <img 
                            src={order.productImage || "https://placehold.co/100"} 
                            alt="" 
                            className="w-full h-full object-cover rounded-xl" 
                          />
                       </div>
                       <div className="flex-1 text-center md:text-left space-y-2">
                          <Badge variant="outline" className="text-[8px] font-black uppercase tracking-[0.2em] border-secondary/30 text-secondary bg-secondary/5 mb-1 px-3">
                             Premium Collection
                          </Badge>
                          <h5 className="text-2xl font-black text-white tracking-tight leading-none capitalize">
                            {order.productName || order.product?.title || order.product}
                          </h5>
                          <p className="text-[10px] font-black text-white/40 uppercase tracking-[0.15em]">{order.category?.name || "Artisanal Gifting"}</p>
                       </div>
                       <div className="md:text-right text-center space-y-1 bg-white/5 p-6 rounded-2xl border border-white/10 backdrop-blur-sm min-w-[160px]">
                          <p className="text-2xl font-black text-secondary leading-none">{order.price || "N/A"}</p>
                          <p className="text-[9px] font-black text-white/30 uppercase tracking-[0.2em]">Unit Valuation</p>
                       </div>
                    </div>
                 </div>
              </div>

              {/* Personal Signature */}
              <div className="space-y-6">
                 <div className="flex items-center gap-3">
                    <div className="h-1 w-4 rounded-full bg-secondary" />
                    <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Personal Signature</h4>
                 </div>
                 <div className="p-4 sm:p-6 md:p-10 rounded-2xl lg:rounded-[2.5rem] bg-white border border-slate-100 shadow-sm relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-6 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity duration-1000">
                       <MessageSquare size={120} />
                    </div>
                    <p className="text-lg font-bold text-slate-600 leading-relaxed italic relative z-10">
                       "{order.customMessage || "No specialized instruction or message was provided with this acquisition manifest."}"
                    </p>
                 </div>
              </div>

              {/* Operation Controls */}
              <div className="flex flex-col sm:flex-row gap-5 pt-4">
                 <Button
                   size="lg"
                   onClick={() => onUpdateStatus?.(order.id, "COMPLETED")}
                   className="flex-1 h-16 rounded-2xl bg-slate-950 hover:bg-slate-900 text-white font-black uppercase text-[11px] tracking-widest shadow-2xl transition-all hover:translate-y-[-2px] group"
                 >
                    <CheckCircle2 className="mr-3 h-5 w-5 text-secondary group-hover:scale-110 transition-transform" />
                    Finalize Fulfillment
                 </Button>
                 <Button
                   size="lg"
                   variant="outline"
                   onClick={onClose}
                   className="flex-1 h-16 rounded-2xl border-slate-100 bg-white text-slate-500 font-black uppercase text-[11px] tracking-widest hover:bg-slate-50 hover:text-slate-900 transition-all"
                 >
                    Abort Interface
                 </Button>
              </div>
           </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
