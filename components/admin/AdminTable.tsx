import React from "react";
import { cn } from "@/lib/utils";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { SearchX } from "lucide-react";

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
  emptyMessage = "No relevant records found in the database."
}: AdminTableProps<T>) {
  return (
    <div className={cn("bg-white/50 backdrop-blur-xl rounded-[2.5rem] border border-slate-100 shadow-3xl shadow-slate-100/50 overflow-hidden", className)}>
      <div className="overflow-x-auto scrollbar-hide">
        <Table className="min-w-full">
          <TableHeader>
            <TableRow className="border-b border-slate-100 bg-slate-50/50 hover:bg-slate-50/50 h-16">
              {columns.map((col) => (
                <TableHead 
                  key={col} 
                  className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.25em] whitespace-nowrap"
                >
                  {col}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.length > 0 ? (
              data.map((item, index) => renderRow(item, index))
            ) : (
              <TableRow className="hover:bg-transparent border-none">
                <TableCell 
                  colSpan={columns.length} 
                  className="px-8 py-24 text-center"
                >
                  <div className="flex flex-col items-center gap-6 max-w-xs mx-auto">
                    <div className="w-20 h-20 rounded-[2rem] bg-slate-50 flex items-center justify-center border border-slate-100 shadow-inner group">
                      <SearchX className="w-8 h-8 text-slate-300 group-hover:scale-110 transition-transform duration-500" />
                    </div>
                    <div className="space-y-2">
                       <h4 className="text-sm font-black text-slate-900 tracking-tight uppercase">System Null Result</h4>
                       <p className="text-[11px] font-bold text-slate-400 leading-relaxed uppercase tracking-wider">{emptyMessage}</p>
                    </div>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
