"use client";

import React, { useState } from "react";
import AdminTable from "@/components/admin/AdminTable";
import ProductForm from "@/components/admin/ProductForm";
import StatusBadge from "@/components/admin/StatusBadge";
import { Plus, Search, Edit3, Trash2, ChevronLeft, Package, Filter, MoreHorizontal, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { upsertProduct, deleteProduct } from "@/lib/actions/admin";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { TableRow, TableCell } from "@/components/ui/table";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

interface ProductManagementProps {
  initialProducts: any[];
  categories: any[];
}

export default function ProductManagement({ initialProducts, categories }: ProductManagementProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Filtering logic
  const filteredProducts = initialProducts.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          p.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || p.category.name === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleAddProduct = () => {
    setEditingProduct(null);
    setIsOpen(true);
  };

  const handleEditProduct = (product: any) => {
    setEditingProduct({
        ...product,
        categoryName: product.category.name,
        images: product.images.map((img: any) => img.url)
    });
    setIsOpen(true);
  };

  const handleSaveProduct = async (data: any) => {
    setIsSaving(true);
    try {
      const result = await upsertProduct({
        ...data,
        id: editingProduct?.id,
        categoryName: data.category
      });
      if (result.success) {
        setIsOpen(false);
        toast.success(editingProduct ? "Product updated successfully" : "Product created successfully");
      } else {
        toast.error("Failed to save product");
      }
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this product? This action cannot be undone.")) {
      const result = await deleteProduct(id);
      if (result.success) {
        toast.success("Product deleted successfully");
      } else {
        toast.error("Failed to delete product");
      }
    }
  };

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-6 duration-1000">
      {/* Dynamic Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 px-2">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
             <div className="h-2 w-2 rounded-full bg-secondary animate-pulse shadow-[0_0_8px_#fbbf24]" />
             <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Inventory Management</span>
          </div>
          <h2 className="text-4xl font-black text-slate-900 tracking-tight">Products Catalog</h2>
          <p className="text-slate-500 font-bold text-sm">Oversee your collection of high-end gift items and availability.</p>
        </div>
        
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button
              onClick={handleAddProduct}
              className="h-14 px-8 rounded-2xl font-black uppercase text-[11px] tracking-widest shadow-2xl shadow-primary/20 hover:translate-y-[-2px] transition-all group"
            >
              <Plus className="mr-2 h-5 w-5 transition-transform group-hover:rotate-90" />
              Initialize New Entry
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl p-0 overflow-hidden border-none rounded-[2.5rem] shadow-4xl shadow-slate-900/20 bg-slate-50">
             <div className="max-h-[90vh] overflow-y-auto scrollbar-hide px-8 py-10">
                <DialogHeader className="mb-8 px-2">
                  <div className="flex items-center gap-2 mb-2">
                     <Package className="h-4 w-4 text-secondary" />
                     <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Database Entry</span>
                  </div>
                  <DialogTitle className="text-3xl font-black text-slate-900 tracking-tight">
                    {editingProduct ? "Revise Collection Item" : "New Collection Addition"}
                  </DialogTitle>
                  <DialogDescription className="text-sm font-bold text-slate-500 mt-2">
                    Enter the specific details for this artisanal piece. All fields are encrypted and secure.
                  </DialogDescription>
                </DialogHeader>
                
                <ProductForm 
                  initialData={editingProduct} 
                  onSave={handleSaveProduct} 
                  onCancel={() => setIsOpen(false)} 
                  isLoading={isSaving}
                />
             </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Strategic Intelligence Filtering */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 px-2">
        <div className="md:col-span-2 relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-primary transition-colors" />
          <Input 
            placeholder="Search by title, description or identification code..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="h-14 pl-12 pr-4 bg-white border-slate-100 rounded-2xl font-bold text-xs focus-visible:ring-primary/10 shadow-sm transition-all"
          />
        </div>
        
        <div className="relative">
           <Select value={selectedCategory} onValueChange={(val) => val && setSelectedCategory(val)}>
             <SelectTrigger className="h-14 rounded-2xl bg-white border-slate-100 font-black text-[10px] uppercase tracking-widest px-6 shadow-sm">
               <div className="flex items-center gap-3">
                  <Filter className="h-3 w-3 text-slate-400" />
                  <SelectValue placeholder="All Sectors" />
               </div>
             </SelectTrigger>
             <SelectContent className="rounded-[1.5rem] border-slate-100 shadow-2xl">
                <SelectItem value="all" className="font-black text-[10px] uppercase tracking-widest py-3">All Sectors</SelectItem>
                {categories.map(cat => (
                  <SelectItem key={cat.id} value={cat.name} className="font-black text-[10px] uppercase tracking-widest py-3">
                    {cat.name}
                  </SelectItem>
                ))}
             </SelectContent>
           </Select>
        </div>

        <div className="flex items-center gap-4">
           <div className="flex-1 h-14 rounded-2xl bg-slate-950 text-white flex items-center justify-between px-6 shadow-xl">
              <span className="text-[10px] font-black uppercase tracking-widest opacity-60">Results</span>
              <span className="text-lg font-black text-secondary">{filteredProducts.length}</span>
           </div>
        </div>
      </div>

      {/* High-Performance Catalog Table */}
      <AdminTable
        columns={["Specimen", "Sector", "Valuation", "Operations"]}
        data={filteredProducts}
        renderRow={(product) => (
          <TableRow key={product.id} className="hover:bg-slate-50/50 transition-all duration-300 border-b border-slate-100 group">
            <TableCell className="px-8 py-6">
              <div className="flex items-center gap-6">
                <div className="relative h-16 w-16 rounded-[1.25rem] bg-slate-100 border border-slate-200 p-1 overflow-hidden transition-transform duration-500 group-hover:scale-105 group-hover:rotate-2 shadow-sm">
                  <img 
                    src={product.images[0]?.url || "https://placehold.co/100"} 
                    alt="" 
                    className="w-full h-full object-cover rounded-xl" 
                  />
                </div>
                <div>
                  <h4 className="text-sm font-black text-slate-900 tracking-tight leading-none mb-2">{product.title}</h4>
                  <p className="text-[11px] font-bold text-slate-400 max-w-[280px] line-clamp-1">{product.description}</p>
                </div>
              </div>
            </TableCell>
            <TableCell className="px-8 py-6">
              <Badge variant="outline" className="text-[9px] font-black uppercase tracking-widest border-slate-100 bg-white/50 px-3 py-1">
                {product.category.name}
              </Badge>
            </TableCell>
            <TableCell className="px-8 py-6">
              <div className="flex flex-col gap-0.5">
                 <span className="text-xs font-black text-slate-900 tracking-tight">
                   {product.price ? `ETB ${product.price.toLocaleString()}` : "COMPLIMENTARY"}
                 </span>
                 <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest">Market Value</span>
              </div>
            </TableCell>
            <TableCell className="px-8 py-6">
              <div className="flex items-center gap-2">
                <Button 
                  variant="outline" 
                  size="icon"
                  onClick={() => handleEditProduct(product)}
                  className="h-10 w-10 rounded-xl border-slate-100 bg-white text-slate-400 hover:text-primary hover:shadow-xl transition-all duration-300"
                >
                  <Edit3 size={15} />
                </Button>
                <Button 
                  variant="outline" 
                  size="icon"
                  onClick={() => handleDelete(product.id)}
                  className="h-10 w-10 rounded-xl border-slate-100 bg-white text-slate-400 hover:text-rose-600 hover:bg-rose-50 hover:border-rose-100 hover:shadow-xl transition-all duration-300"
                >
                  <Trash2 size={15} />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        )}
      />
    </div>
  );
}
