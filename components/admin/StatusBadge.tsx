import React from "react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

type StatusType = "pending" | "completed" | "cancelled" | "active" | "inactive";

interface StatusBadgeProps {
  status: StatusType;
  className?: string;
}

const statusConfig: Record<StatusType, { label: string; class: string; dot: string; shadow: string }> = {
  pending: { 
    label: "Pending", 
    class: "bg-secondary/5 text-secondary border-secondary/20", 
    dot: "bg-secondary",
    shadow: "shadow-secondary/10"
  },
  completed: { 
    label: "Fulfilled", 
    class: "bg-emerald-50 text-emerald-600 border-emerald-100", 
    dot: "bg-emerald-400",
    shadow: "shadow-emerald-100"
  },
  cancelled: { 
    label: "Revoked", 
    class: "bg-rose-50 text-rose-500 border-rose-100", 
    dot: "bg-rose-400",
    shadow: "shadow-rose-100"
  },
  active: { 
    label: "Active", 
    class: "bg-indigo-50 text-indigo-600 border-indigo-100", 
    dot: "bg-indigo-400",
    shadow: "shadow-indigo-100"
  },
  inactive: { 
    label: "Inert", 
    class: "bg-slate-50 text-slate-400 border-slate-100", 
    dot: "bg-slate-300",
    shadow: "shadow-slate-50"
  },
};

export default function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = statusConfig[status] || statusConfig.pending;

  return (
    <Badge 
      variant="outline" 
      className={cn(
        "px-3 py-1 rounded-xl text-[9px] font-black uppercase tracking-[0.15em] gap-2 transition-all duration-500 shadow-sm",
        config.class,
        config.shadow,
        "hover:scale-105 active:scale-95",
        className
      )}
    >
      <div className="relative flex items-center justify-center">
         <span className={cn("inline-block w-1.5 h-1.5 rounded-full", config.dot)} />
         <span className={cn("absolute inline-block w-1.5 h-1.5 rounded-full animate-ping opacity-75", config.dot)} />
      </div>
      {config.label}
    </Badge>
  );
}
