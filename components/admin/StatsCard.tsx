import React from "react";
import { LucideIcon, TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
} from "@/components/ui/card";

interface StatsCardProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: string;
    isUp: boolean;
  };
  className?: string;
  iconClassName?: string;
  style?: React.CSSProperties;
}

export default function StatsCard({ 
  label, 
  value, 
  icon: Icon, 
  trend,
  className,
  iconClassName,
  style
}: StatsCardProps) {
  return (
    <Card 
      className={cn("overflow-hidden border-slate-100 shadow-xl shadow-slate-100/50 hover:shadow-2xl hover:shadow-slate-200 transition-all duration-500 group rounded-[2.5rem] bg-white relative", className)}
      style={style}
    >
      <div className="absolute top-0 right-0 p-6 opacity-[0.03] group-hover:opacity-[0.07] transition-opacity duration-500">
         <Icon size={120} className="stroke-[1px]" />
      </div>
      
      <CardContent className="p-8 relative z-10">
        <div className="flex items-start justify-between">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
               <div className="h-1 w-4 rounded-full bg-secondary" />
               <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">{label}</p>
            </div>
            
            <h3 className="text-4xl font-black text-slate-900 tracking-tight leading-none">{value}</h3>
            
            {trend && (
              <div className="flex items-center gap-3 pt-2">
                <div className={cn(
                  "flex items-center gap-1.5 text-[10px] font-black px-3 py-1.5 rounded-xl transition-colors duration-500 uppercase tracking-widest",
                  trend.isUp 
                    ? "bg-emerald-50 text-emerald-600 border border-emerald-100" 
                    : "bg-rose-50 text-rose-600 border border-rose-100"
                )}>
                  {trend.isUp ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                  {trend.isUp ? "+" : "-"}{trend.value}%
                </div>
                <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest opacity-60">Benchmark</span>
              </div>
            )}
          </div>
          
          <div className={cn(
            "h-14 w-14 rounded-2xl bg-slate-950 text-white shadow-xl shadow-slate-200 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 flex items-center justify-center relative overflow-hidden",
            iconClassName
          )}>
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
            <Icon size={20} className="stroke-[2.5px] relative z-10 text-secondary" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
