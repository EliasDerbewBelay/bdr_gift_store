import React from "react";
import StatsCard from "@/components/admin/StatsCard";
import AdminTable from "@/components/admin/AdminTable";
import StatusBadge from "@/components/admin/StatusBadge";
import { 
  ShoppingBag, 
  Package, 
  Users, 
  TrendingUp, 
  ArrowRight,
  Clock,
  Plus
} from "lucide-react";
import Link from "next/link";
import { getDashboardStats, getRecentOrders } from "@/lib/actions/admin";

export default async function DashboardPage() {
  const [stats, recentOrdersRaw] = await Promise.all([
    getDashboardStats(),
    getRecentOrders(5)
  ]);

  // Map icons to stats (icons lost in transition from server action)
  const iconMap: Record<string, any> = {
    "Total Orders": ShoppingBag,
    "Total Products": Package,
    "Total Users": Users,
  };

  const formattedStats = stats.map(s => ({
    ...s,
    icon: iconMap[s.label] || Package
  }));

  // Format orders for table
  const recentOrders = recentOrdersRaw.map(order => ({
    id: order.id,
    customerName: order.customerName,
    product: order.product.title,
    status: order.status.toLowerCase(),
    date: new Date(order.createdAt).toLocaleDateString(),
  }));

  const pendingCount = recentOrdersRaw.filter(o => o.status === "PENDING").length;

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden p-8 rounded-3xl bg-linear-to-br from-indigo-600 to-purple-700 text-white border border-indigo-500/20 shadow-xl shadow-indigo-100/50">
        <div className="relative z-10 max-w-2xl text-left text-left">
          <h2 className="text-3xl font-bold tracking-tight mb-2">Welcome back, Admin! 👋</h2>
          <p className="text-indigo-100 text-lg font-medium opacity-90 text-left">
            Here's what's happening with your store today. 
            {pendingCount > 0 ? (
              <> You have <span className="text-white font-bold underline decoration-indigo-300 underline-offset-4 pointer-events-none">{pendingCount} pending orders</span> that need your attention.</>
            ) : (
              <> Everything is up to date!</>
            )}
          </p>
        </div>
        <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/4 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {formattedStats.map((stat, i) => (
          <StatsCard 
            key={i} 
            {...stat} 
            className="animate-in fade-in slide-in-from-bottom-4" 
            style={{ animationDelay: `${i * 100}ms` }} 
          />
        ))}
      </div>

      {/* Recent Orders Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Clock size={20} className="text-indigo-600" />
            <h3 className="text-xl font-bold text-slate-800 tracking-tight">Recent Orders</h3>
          </div>
          <Link 
            href="/admin/orders" 
            className="group flex items-center gap-1.5 text-sm font-bold text-indigo-600 hover:text-indigo-700 transition-colors"
          >
            View All Orders
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <AdminTable
          columns={["Customer Name", "Product", "Status", "Date"]}
          data={recentOrders}
          renderRow={(order) => (
            <tr key={order.id} className="hover:bg-slate-50 transition-colors group cursor-pointer border-b border-slate-50 last:border-0">
              <td className="px-6 py-4">
                <div className="flex items-center gap-3 text-left">
                  <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600 font-bold text-xs uppercase">
                    {order.customerName.charAt(0)}
                  </div>
                  <span className="text-sm font-semibold text-slate-800">{order.customerName}</span>
                </div>
              </td>
              <td className="px-6 py-4 text-sm font-medium text-slate-600 text-left">{order.product}</td>
              <td className="px-6 py-4 text-left">
                <StatusBadge status={order.status as any} />
              </td>
              <td className="px-6 py-4 text-xs font-medium text-slate-400 text-left">{order.date}</td>
            </tr>
          )}
        />
      </div>

      {/* Quick Actions / Other Info */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pb-8">
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-xs space-y-4">
          <h3 className="text-lg font-bold text-slate-800 border-b border-slate-50 pb-4 text-left">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-4">
            <Link href="/admin/products" className="flex flex-col gap-3 p-5 rounded-2xl bg-slate-50 hover:bg-indigo-50 hover:border-indigo-100 border border-slate-50 transition-all group">
              <div className="w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center text-indigo-600 group-hover:scale-110 transition-transform">
                <Plus size={24} />
              </div>
              <span className="text-sm font-bold text-slate-700 text-left">Add New Product</span>
            </Link>
            <Link href="/admin/analytics" className="flex flex-col gap-3 p-5 rounded-2xl bg-slate-50 hover:bg-emerald-50 hover:border-emerald-100 border border-slate-50 transition-all group">
              <div className="w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center text-emerald-600 group-hover:scale-110 transition-transform">
                <TrendingUp size={24} />
              </div>
              <span className="text-sm font-bold text-slate-700 text-left">Analytics Reports</span>
            </Link>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-xs space-y-4">
          <h3 className="text-lg font-bold text-slate-800 border-b border-slate-50 pb-4 text-left">Store Health</h3>
          <div className="space-y-6 pt-2">
            <div className="space-y-2">
              <div className="flex justify-between text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">
                <span>Monthly Goal Progress</span>
                <span className="text-slate-700">78%</span>
              </div>
              <div className="h-2 w-full bg-slate-50 rounded-full overflow-hidden">
                <div className="h-full bg-linear-to-r from-indigo-500 to-purple-500 w-[78%] rounded-full shadow-lg" />
              </div>
            </div>
            
            <div className="flex items-center gap-4 text-left">
              <div className="w-14 h-14 rounded-full border-4 border-indigo-50 border-t-indigo-500 flex items-center justify-center relative">
                <span className="text-xs font-bold text-slate-700">92%</span>
              </div>
              <div>
                <p className="text-xs font-bold text-slate-800">Customer Satisfaction</p>
                <p className="text-[10px] text-slate-400 mt-0.5">Updated 5 minutes ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
