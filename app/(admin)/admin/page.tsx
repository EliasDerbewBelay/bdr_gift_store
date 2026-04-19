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
  Plus,
  Zap,
  LayoutDashboard,
  ShieldCheck,
  Activity,
  ArrowUpRight
} from "lucide-react";
import Link from "next/link";
import { getDashboardStats, getRecentOrders } from "@/lib/actions/admin";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TableRow, TableCell } from "@/components/ui/table";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

export default async function DashboardPage() {
  const [stats, recentOrdersRaw] = await Promise.all([
    getDashboardStats(),
    getRecentOrders(5)
  ]);

  const iconMap: Record<string, any> = {
    "Total Orders": ShoppingBag,
    "Total Products": Package,
    "Total Users": Users,
  };

  const formattedStats = stats.map(s => ({
    ...s,
    icon: iconMap[s.label] || Package
  }));

  const recentOrders = recentOrdersRaw.map(order => ({
    id: order.id,
    customerName: order.customerName,
    product: order.product.title,
    status: order.status.toLowerCase(),
    date: new Date(order.createdAt).toLocaleDateString(),
  }));

  const pendingCount = recentOrdersRaw.filter(o => o.status === "PENDING").length;

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 px-2">
         <div className="space-y-2">
            <div className="flex items-center gap-2">
               <ShieldCheck className="h-4 w-4 text-emerald-500" />
               <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Authenticated Session</span>
            </div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight">Executive Summary</h1>
            <p className="text-slate-500 font-bold text-sm">Real-time database insights and store performance metrics.</p>
         </div>
         
         <div className="flex items-center gap-3">
            <Button variant="outline" className="h-12 px-6 rounded-2xl border-slate-100 bg-white shadow-sm font-black uppercase text-[10px] tracking-widest hover:bg-slate-50">
               Refresh Data
            </Button>
            <Button className="h-12 px-6 rounded-2xl font-black uppercase text-[10px] tracking-widest shadow-xl shadow-primary/20 hover:translate-y-[-2px] transition-transform">
               Download Report
            </Button>
         </div>
      </div>

      {/* Hero Performance Card */}
      <Card className="relative overflow-hidden border-none bg-slate-950 text-white shadow-3xl rounded-[2.5rem] group">
        <div className="absolute top-0 right-0 p-10 opacity-10 rotate-12 transition-transform group-hover:scale-110 group-hover:rotate-0 duration-700">
           <Activity className="h-64 w-64" />
        </div>
        <CardContent className="p-12 relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-12">
          <div className="max-w-xl space-y-6">
            <Badge variant="outline" className="text-[10px] font-black uppercase tracking-[0.3em] border-white/20 text-secondary bg-white/5 px-4 py-1.5 backdrop-blur-md">
              <Zap className="h-3 w-3 mr-2 fill-secondary" />
              Intelligence Unit Active
            </Badge>
            <h2 className="text-5xl font-black tracking-tight leading-tight">
              Operational Efficiency <br /> <span className="text-secondary">Optimal.</span>
            </h2>
            <p className="text-slate-400 font-bold text-lg leading-relaxed max-w-md">
              {pendingCount > 0 ? (
                <>Attention required: <span className="text-white font-black underline decoration-secondary underline-offset-8 decoration-4">{pendingCount} orders in queue.</span> Secure fulfillment flow initiated.</>
              ) : (
                <>Database cleared. All transactional systems are synchronized and performing at peak efficiency.</>
              )}
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-4 w-full md:w-auto">
             <div className="p-6 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 space-y-2">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40">Market Health</p>
                <p className="text-2xl font-black text-emerald-400">+12.4%</p>
             </div>
             <div className="p-6 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 space-y-2">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40">Uptime</p>
                <p className="text-2xl font-black text-secondary">99.99%</p>
             </div>
          </div>
        </CardContent>
      </Card>

      {/* High-Performance Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {formattedStats.map((stat, i) => (
          <StatsCard 
            key={i} 
            {...stat} 
            className="animate-in fade-in slide-in-from-bottom-4" 
            style={{ animationDelay: `${i * 100}ms` }} 
          />
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-10">
        {/* Modernized Recent Transactions */}
        <div className="xl:col-span-2 space-y-6">
          <div className="flex items-center justify-between px-2">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-2xl bg-slate-950 flex items-center justify-center text-white shadow-xl shadow-slate-200">
                <ShoppingBag className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-2xl font-black text-slate-900 tracking-tight">Recent Transactions</h3>
                <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em] mt-1">Institutional Order Flow</p>
              </div>
            </div>
            <Button variant="ghost" asChild className="font-black text-[10px] uppercase tracking-widest text-primary hover:bg-primary/5 rounded-xl group px-6">
              <Link href="/admin/orders">
                Access Archives <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>

          <Card className="rounded-[2.5rem] border-slate-100 shadow-3xl shadow-slate-100 overflow-hidden bg-white/80 backdrop-blur-sm">
            <CardContent className="p-0">
              <AdminTable
                columns={["Identity", "Acquisition", "Status", "Timestamp"]}
                data={recentOrders}
                renderRow={(order) => (
                  <TableRow key={order.id} className="hover:bg-slate-50 transition-colors group cursor-pointer border-slate-100">
                    <TableCell className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <Avatar className="h-11 w-11 border-2 border-white shadow-xl rotate-3 group-hover:rotate-0 transition-transform">
                          <AvatarFallback className="bg-slate-900 text-white font-black text-xs">
                            {order.customerName.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-sm font-black text-slate-900 tracking-tight">{order.customerName}</span>
                      </div>
                    </TableCell>
                    <TableCell className="px-8 py-6 text-sm font-bold text-slate-500">{order.product}</TableCell>
                    <TableCell className="px-8 py-6">
                      <StatusBadge status={order.status as any} />
                    </TableCell>
                    <TableCell className="px-8 py-6 text-[10px] font-black text-slate-300 uppercase tracking-[0.2em] transition-colors group-hover:text-slate-600">{order.date}</TableCell>
                  </TableRow>
                )}
              />
            </CardContent>
          </Card>
        </div>

        {/* Strategic Intelligence Sidebar */}
        <div className="space-y-8">
          <Card className="rounded-[2rem] border-slate-100 shadow-2xl bg-white overflow-hidden group">
            <CardHeader className="p-8 pb-4 border-b border-slate-50">
              <CardTitle className="text-sm font-black uppercase tracking-[0.2em] text-slate-400 flex items-center justify-between">
                 Rapid Deployment
                 <Plus className="h-4 w-4 text-secondary" />
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8 space-y-4">
              <Button asChild className="w-full h-16 justify-between px-6 rounded-2xl bg-slate-50 hover:bg-slate-950 text-slate-900 hover:text-white border-2 border-slate-100 hover:border-slate-950 transition-all duration-500 group/btn shadow-none">
                <Link href="/admin/products">
                  <span className="font-black text-xs uppercase tracking-widest">Inventory Addition</span>
                  <div className="h-8 w-8 rounded-xl bg-white group-hover/btn:bg-white/10 shadow-sm flex items-center justify-center text-primary group-hover/btn:text-secondary group-hover/btn:rotate-90 transition-all">
                    <Plus className="h-4 w-4" />
                  </div>
                </Link>
              </Button>
              <Button asChild className="w-full h-16 justify-between px-6 rounded-2xl bg-slate-50 hover:bg-slate-950 text-slate-900 hover:text-white border-2 border-slate-100 hover:border-slate-950 transition-all duration-500 group/btn shadow-none">
                <Link href="/admin/analytics">
                  <span className="font-black text-xs uppercase tracking-widest">Deep Analytics</span>
                  <div className="h-8 w-8 rounded-xl bg-white group-hover/btn:bg-white/10 shadow-sm flex items-center justify-center text-primary group-hover/btn:text-secondary transition-all">
                    <TrendingUp className="h-4 w-4" />
                  </div>
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="rounded-[2.5rem] border-none shadow-3xl bg-slate-950 text-white overflow-hidden relative">
             <div className="absolute top-0 right-0 p-6 opacity-10">
                <Activity className="h-24 w-24" />
             </div>
            <CardHeader className="p-8 pb-4 border-b border-white/5">
              <CardTitle className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40">Market Presence</CardTitle>
            </CardHeader>
            <CardContent className="p-8 space-y-8">
              <div className="space-y-4">
                <div className="flex justify-between items-end">
                   <div className="space-y-1">
                      <p className="text-2xl font-black text-white">84.2%</p>
                      <p className="text-[9px] font-black text-white/30 uppercase tracking-widest">Revenue Growth Index</p>
                   </div>
                   <ArrowUpRight className="h-8 w-8 text-secondary" />
                </div>
                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-secondary to-amber-500 w-[84%] rounded-full shadow-[0_0_15px_#fbbf24] transition-all duration-1000" />
                </div>
              </div>
              
              <div className="flex items-center gap-5 p-6 rounded-[2rem] bg-white/5 border border-white/10 transition-transform hover:scale-[1.02] duration-500 cursor-pointer">
                <div className="relative h-14 w-14 flex items-center justify-center">
                   <svg className="h-14 w-14 -rotate-90">
                    <circle cx="28" cy="28" r="24" fill="transparent" stroke="currentColor" strokeWidth="3" className="text-white/5" />
                    <circle cx="28" cy="28" r="24" fill="transparent" stroke="currentColor" strokeWidth="3" strokeDasharray="150" strokeDashoffset="10" className="text-secondary" />
                   </svg>
                   <span className="absolute text-xs font-black text-white">94%</span>
                </div>
                <div>
                  <p className="text-[10px] font-black text-white/40 uppercase tracking-widest leading-none mb-2">CSAT SCORE</p>
                  <p className="text-sm font-black text-white leading-none">Elite Status</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
