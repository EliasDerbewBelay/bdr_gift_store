import React from "react";
import { cn } from "@/lib/utils";

type StatusType = "pending" | "completed" | "cancelled" | "active" | "inactive";

interface StatusBadgeProps {
  status: StatusType;
  className?: string;
}

const statusConfig: Record<StatusType, { label: string; bg: string; text: string; dot: string }> = {
  pending: { 
    label: "Pending", 
    bg: "bg-amber-50", 
    text: "text-amber-700", 
    dot: "bg-amber-500" 
  },
  completed: { 
    label: "Completed", 
    bg: "bg-emerald-50", 
    text: "text-emerald-700", 
    dot: "bg-emerald-500" 
  },
  cancelled: { 
    label: "Cancelled", 
    bg: "bg-rose-50", 
    text: "text-rose-700", 
    dot: "bg-rose-500" 
  },
  active: { 
    label: "Active", 
    bg: "bg-teal-50", 
    text: "text-teal-700", 
    dot: "bg-teal-500" 
  },
  inactive: { 
    label: "Inactive", 
    bg: "bg-slate-100", 
    text: "text-slate-600", 
    dot: "bg-slate-400" 
  },
};

export default function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = statusConfig[status] || statusConfig.pending;

  return (
    <span className={cn(
      "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold ring-1 ring-inset transition-colors",
      config.bg,
      config.text,
      status === "pending" ? "ring-amber-100" : 
      status === "completed" ? "ring-emerald-100" :
      status === "active" ? "ring-teal-100" : "ring-slate-200",
      className
    )}>
      <span className={cn("w-1.5 h-1.5 rounded-full animate-pulse", config.dot)} />
      {config.label}
    </span>
  );
}
