import React from "react";
import { cn } from "@/lib/utils";

interface Column {
  header: string;
  accessor: string; // Not strictly used if using render function
}

interface AdminTableProps<T> {
  data: T[];
  columns: string[]; // Headers
  renderRow: (item: T, index: number) => React.ReactNode;
  className?: string;
  emptyMessage?: string;
}

export default function AdminTable<T>({ 
  data, 
  columns, 
  renderRow, 
  className,
  emptyMessage = "No data found."
}: AdminTableProps<T>) {
  return (
    <div className={cn("bg-white rounded-2xl border border-slate-100 shadow-xs overflow-hidden", className)}>
      <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/50 border-b border-slate-100 uppercase tracking-wider">
              {columns.map((col) => (
                <th 
                  key={col} 
                  className="px-6 py-4 text-[11px] font-bold text-slate-500 whitespace-nowrap"
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {data.length > 0 ? (
              data.map((item, index) => renderRow(item, index))
            ) : (
              <tr>
                <td 
                  colSpan={columns.length} 
                  className="px-6 py-12 text-center text-slate-400 font-medium"
                >
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center">
                      <svg className="w-6 h-6 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                      </svg>
                    </div>
                    {emptyMessage}
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
