import React from "react";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

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
}

export default function StatsCard({ 
  label, 
  value, 
  icon: Icon, 
  trend,
  className,
  iconClassName
}: StatsCardProps) {
  return (
    <div className={cn(
      "bg-white p-6 rounded-2xl border border-slate-100 shadow-xs hover:shadow-soft transition-all duration-300 group",
      className
    )}>
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">{label}</p>
          <h3 className="text-3xl font-bold text-slate-800 tracking-tight">{value}</h3>
          
          {trend && (
            <div className="flex items-center gap-1.5 pt-1">
              <span className={cn(
                "text-xs font-bold px-1.5 py-0.5 rounded-md",
                trend.isUp ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-600"
              )}>
                {trend.isUp ? "+" : "-"}{trend.value}%
              </span>
              <span className="text-xs text-slate-400 font-medium">vs last month</span>
            </div>
          )}
        </div>
        
        <div className={cn(
          "p-3 rounded-xl bg-slate-50 text-slate-400 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors duration-300",
          iconClassName
        )}>
          <Icon size={24} />
        </div>
      </div>
    </div>
  );
}
