import React from "react";
import StatsCard from "@/components/admin/StatsCard";
import { TrendingUp, ShoppingBag, Award, Target, ArrowUpRight, ArrowDownRight, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";
import RevenueChart from "@/components/admin/RevenueChart";
import { getAnalyticsStats, getOrdersOverTime, getTopProducts } from "@/lib/actions/admin";

export default async function AnalyticsPage() {
  const [stats, ordersOverTime, topProducts] = await Promise.all([
    getAnalyticsStats(),
    getOrdersOverTime(),
    getTopProducts(4),
  ]);

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
        <StatsCard label="Net Revenue" value={stats.netRevenue} icon={TrendingUp} trend={{ value: "15", isUp: true }} />
        <StatsCard label="Orders Volume" value={stats.orderVolume} icon={ShoppingBag} trend={{ value: "8", isUp: true }} />
        <StatsCard label="Avg. Order Value" value={stats.avgOrderValue} icon={Target} trend={{ value: "2", isUp: false }} />
        <StatsCard label="Growth Rate" value={stats.growthRate} icon={Award} trend={{ value: "4", isUp: true }} />
      </div>

      {/* Main Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Revenue Chart */}
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
          
          <RevenueChart data={ordersOverTime} />
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
                <div className="w-12 h-12 rounded-xl border border-slate-100 overflow-hidden bg-slate-50">
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
            <h4 className="text-4xl font-black text-slate-800 tracking-tighter">
              {stats.activeCustomers} 
            </h4>
            <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-600">
               <ArrowUpRight size={14} />
               Live data from orders
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
