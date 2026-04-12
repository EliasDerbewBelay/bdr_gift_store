"use client";

import React from "react";
import StatsCard from "@/components/admin/StatsCard";
import { TrendingUp, ShoppingBag, Award, Target, ArrowUpRight, ArrowDownRight, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";

const topProducts = [
  { id: "1", title: "Luxury Rose Box", orders: 48, revenue: "$4,080", trend: "+12%", image: "https://placehold.co/50" },
  { id: "2", title: "Gourmet Hamper", orders: 35, revenue: "$4,200", trend: "+8%", image: "https://placehold.co/50" },
  { id: "3", title: "Birthday Surprise", orders: 28, revenue: "$1,540", trend: "-2%", image: "https://placehold.co/50" },
  { id: "4", title: "Wedding Gift Set", orders: 12, revenue: "$1,800", trend: "+25%", image: "https://placehold.co/50" },
];

export default function AnalyticsPage() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold text-slate-800 tracking-tight text-left">Analytics & Insights</h2>
          <p className="text-sm text-slate-500 font-medium">Detailed breakdown of your store performance and customer behavior.</p>
        </div>
        <div className="flex items-center gap-2 p-1.5 bg-white rounded-2xl border border-slate-100 shadow-xs">
          {["7D", "30D", "3M", "1Y"].map((range) => (
            <button key={range} className={cn(
              "px-4 py-2 text-xs font-bold rounded-xl transition-all",
              range === "30D" ? "bg-indigo-600 text-white shadow-lg shadow-indigo-100" : "text-slate-400 hover:text-slate-600 hover:bg-slate-50"
            )}>
              {range}
            </button>
          ))}
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
        <StatsCard label="Net Revenue" value="$12,450" icon={TrendingUp} trend={{ value: "15", isUp: true }} />
        <StatsCard label="Orders Volume" value="128" icon={ShoppingBag} trend={{ value: "8", isUp: true }} />
        <StatsCard label="Avg. Order Value" value="$97.20" icon={Target} trend={{ value: "2", isUp: false }} />
        <StatsCard label="Growth Rate" value="24.8%" icon={Award} trend={{ value: "4", isUp: true }} />
      </div>

      {/* Main Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Revenue Chart Placeholder */}
        <div className="lg:col-span-2 bg-white p-6 lg:p-8 rounded-3xl border border-slate-100 shadow-xs space-y-6">
          <div className="flex items-center justify-between border-b border-slate-50 pb-4">
            <div>
              <h3 className="text-lg font-bold text-slate-800">Orders Over Time</h3>
              <p className="text-[11px] font-medium text-slate-400 mt-0.5">Daily order volume for the last 30 days</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-indigo-500" />
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Current Period</span>
              </div>
            </div>
          </div>
          
          {/* SVG Line Chart Placeholder */}
          <div className="h-64 relative pt-4">
            <svg className="w-full h-full overflow-visible" preserveAspectRatio="none">
              <defs>
                <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#4f46e5" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="#4f46e5" stopOpacity="0" />
                </linearGradient>
              </defs>
              {/* Grid Lines */}
              {[0, 25, 50, 75, 100].map(val => (
                <line key={val} x1="0" y1={`${val}%`} x2="100%" y2={`${val}%`} stroke="#f1f5f9" strokeWidth="1" />
              ))}
              {/* Area */}
              <path 
                d="M0,80 Q10,20 20,40 T40,30 T60,60 T80,20 T100,50 V100 H0 Z" 
                fill="url(#gradient)" 
                className="animate-in fade-in duration-1000"
              />
              {/* Line */}
              <path 
                d="M0,80 Q10,20 20,40 T40,30 T60,60 T80,20 T100,50" 
                fill="none" 
                stroke="#4f46e5" 
                strokeWidth="3" 
                strokeLinecap="round"
                className="animate-chart-line"
              />
              {/* Points */}
              <circle cx="20" cy="40" r="4" fill="#4f46e5" stroke="white" strokeWidth="2" />
              <circle cx="60" cy="60" r="4" fill="#4f46e5" stroke="white" strokeWidth="2" />
              <circle cx="100" cy="50" r="4" fill="#4f46e5" stroke="white" strokeWidth="2" />
            </svg>
            <div className="absolute top-0 left-[20%] -translate-x-1/2 -translate-y-8 px-2 py-1 bg-slate-900 text-white text-[10px] font-bold rounded-lg shadow-xl opacity-0 hover:opacity-100 transition-opacity">
              +12 Orders
            </div>
          </div>
          
          <div className="flex justify-between px-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            <span>Mar 14</span>
            <span>Mar 21</span>
            <span>Mar 28</span>
            <span>Apr 04</span>
            <span>Today</span>
          </div>
        </div>

        {/* Popular Products */}
        <div className="bg-white p-6 lg:p-8 rounded-3xl border border-slate-100 shadow-xs space-y-6">
          <div className="flex flex-col text-left">
             <h3 className="text-lg font-bold text-slate-800">Popular Products</h3>
            <p className="text-[11px] font-medium text-slate-400 mt-0.5">Top performing items by sales</p>
          </div>
         
          <div className="space-y-4 pt-2">
            {topProducts.map((product, i) => (
              <div key={i} className="flex items-center gap-4 p-3 rounded-2xl hover:bg-slate-50 transition-colors group cursor-pointer text-left">
                <div className="w-12 h-12 rounded-xl border border-slate-100 overflow-hidden">
                  <img src={product.image} alt="" className="w-full h-full object-cover" />
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-bold text-slate-800 leading-tight">{product.title}</h4>
                  <p className="text-[11px] text-slate-400 font-medium mt-1">{product.orders} Orders &bull; {product.revenue}</p>
                </div>
                <div className={cn(
                  "flex items-center gap-0.5 text-[10px] font-bold px-1.5 py-0.5 rounded-md",
                  product.trend.startsWith("+") ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-600"
                )}>
                  {product.trend.startsWith("+") ? <ArrowUpRight size={10} /> : <ArrowDownRight size={10} />}
                  {product.trend}
                </div>
              </div>
            ))}
          </div>

          <button className="w-full py-3 text-xs font-bold text-indigo-600 bg-indigo-50 border border-indigo-100 rounded-xl hover:bg-indigo-100 transition-all">
            Full Product Report
          </button>
        </div>
      </div>

      {/* Additional Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pb-12">
        <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-xs flex items-center justify-between group overflow-hidden relative text-left">
          <div className="space-y-2 z-10">
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Active Customers</p>
            <h4 className="text-4xl font-black text-slate-800 tracking-tighter">842</h4>
            <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-600">
               <ArrowUpRight size={14} />
               12% increase from yesterday
            </div>
          </div>
          <div className="w-24 h-24 rounded-full bg-slate-50 flex items-center justify-center text-slate-200 group-hover:scale-125 transition-transform duration-700">
            <Calendar size={48} strokeWidth={1} />
          </div>
          <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50/50 rounded-full translate-x-12 -translate-y-12 blur-3xl pointer-events-none" />
        </div>

        <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-xs flex items-center justify-between group overflow-hidden relative text-left">
          <div className="space-y-2 z-10">
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Store Conversion</p>
            <h4 className="text-4xl font-black text-slate-800 tracking-tighter">4.2%</h4>
            <div className="flex items-center gap-1.5 text-xs font-bold text-indigo-600">
               Above industry average (3.1%)
            </div>
          </div>
          <div className="w-24 h-24 rounded-full bg-indigo-50/50 flex items-center justify-center text-indigo-200 group-hover:scale-125 transition-transform duration-700">
            <Target size={48} strokeWidth={1} />
          </div>
        </div>
      </div>
    </div>
  );
}
