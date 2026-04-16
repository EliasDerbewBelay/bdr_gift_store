"use client";

import React, { useState } from "react";
import AdminTable from "@/components/admin/AdminTable";
import ProductForm from "@/components/admin/ProductForm";
import StatusBadge from "@/components/admin/StatusBadge";
import { Plus, Search, Edit3, Trash2, ChevronLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { upsertProduct, deleteProduct } from "@/lib/actions/admin";

interface ProductManagementProps {
  initialProducts: any[];
  categories: any[];
}

export default function ProductManagement({ initialProducts, categories }: ProductManagementProps) {
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");

  // Filtering logic
  const filteredProducts = initialProducts.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          p.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All Categories" || p.category.name === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleAddProduct = () => {
    setEditingProduct(null);
    setShowForm(true);
  };

  const handleEditProduct = (product: any) => {
    setEditingProduct({
        ...product,
        categoryName: product.category.name,
        images: product.images.map((img: any) => img.url)
    });
    setShowForm(true);
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
        setShowForm(false);
      } else {
        alert("Failed to save product");
      }
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this product?")) {
      const result = await deleteProduct(id);
      if (!result.success) {
        alert("Failed to delete product");
      }
    }
  };

  if (showForm) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setShowForm(false)}
            className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-xl transition-all"
          >
            <ChevronLeft size={20} />
          </button>
          <h2 className="text-2xl font-bold text-slate-800 tracking-tight">
            {editingProduct ? "Edit Product" : "Add New Product"}
          </h2>
        </div>
        <ProductForm 
          initialData={editingProduct} 
          onSave={handleSaveProduct} 
          onCancel={() => setShowForm(false)} 
          isLoading={isSaving}
        />
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold text-slate-800 tracking-tight text-left">Products Catalog</h2>
          <p className="text-sm text-slate-500 font-medium">Manage your gift items, prices, and stock status.</p>
        </div>
        <button
          onClick={handleAddProduct}
          className="flex items-center justify-center gap-2 px-6 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-2xl shadow-lg shadow-indigo-100 transition-all active:scale-95"
        >
          <Plus size={20} />
          Add New Product
        </button>
      </div>

      {/* Filters & Search - UI State handled here */}
      <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-xs flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-1 w-full">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input 
            type="text" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search products..." 
            className="w-full pl-12 pr-4 py-3 rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-indigo-100 transition-all text-sm outline-hidden"
          />
        </div>
        <div className="flex items-center gap-2 w-full md:w-auto">
          <select 
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="flex-1 md:w-48 px-4 py-3 rounded-xl bg-slate-50 border-none text-sm font-bold text-slate-600 outline-hidden cursor-pointer"
          >
            <option>All Categories</option>
            {categories.map(cat => (
              <option key={cat.id} value={cat.name}>{cat.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Products Table */}
      <AdminTable
        columns={["Product", "Category", "Price", "Actions"]}
        data={filteredProducts}
        renderRow={(product) => (
          <tr key={product.id} className="hover:bg-slate-50/50 transition-colors border-b border-slate-50 last:border-0 group">
            <td className="px-6 py-5">
              <div className="flex items-center gap-4 text-left">
                <div className="w-12 h-12 rounded-xl bg-slate-100 border border-slate-200 overflow-hidden p-1 flex items-center justify-center">
                  <img 
                    src={product.images[0]?.url || "https://placehold.co/100"} 
                    alt="" 
                    className="w-full h-full object-cover rounded-lg" 
                  />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-800">{product.title}</h4>
                  <p className="text-[11px] text-slate-400 font-medium mt-0.5 truncate max-w-[200px]">{product.description}</p>
                </div>
              </div>
            </td>
            <td className="px-6 py-5">
              <span className="text-xs font-bold text-slate-500 bg-slate-100 px-2 py-1 rounded-md">{product.category.name}</span>
            </td>
            <td className="px-6 py-5 text-sm font-bold text-slate-700">
              {product.price ? `ETB ${product.price.toLocaleString()}` : "FREE"}
            </td>
            <td className="px-6 py-5">
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => handleEditProduct(product)}
                  className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all"
                >
                  <Edit3 size={16} />
                </button>
                <button 
                  onClick={() => handleDelete(product.id)}
                  className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </td>
          </tr>
        )}
      />
    </div>
  );
}
