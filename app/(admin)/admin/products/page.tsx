"use client";

import React, { useState } from "react";
import AdminTable from "@/components/admin/AdminTable";
import ProductForm from "@/components/admin/ProductForm";
import StatusBadge from "@/components/admin/StatusBadge";
import { Plus, Search, Edit3, Trash2, Package } from "lucide-react";
import { cn } from "@/lib/utils";

// Mock Data
const initialProducts = [
  { id: "1", title: "Luxury Rose Box", category: "Flower Bouquets", price: "$85.00", packagingStyle: "Velvet Box", status: "active", image: "https://placehold.co/100" },
  { id: "2", title: "Gourmet Hamper", category: "Luxury Hampers", price: "$120.00", packagingStyle: "Wicker Basket", status: "active", image: "https://placehold.co/100" },
  { id: "3", title: "Personalized Mug", category: "Personalized Gifts", price: "$25.00", packagingStyle: "Cardboard Box", status: "active", image: "https://placehold.co/100" },
  { id: "4", title: "Birthday Surprise", category: "Gift Boxes", price: "$55.00", packagingStyle: "Themed Box", status: "active", image: "https://placehold.co/100" },
  { id: "5", title: "Wedding Gift Set", category: "Luxury Hampers", price: "$150.00", packagingStyle: "White Silk Box", status: "inactive", image: "https://placehold.co/100" },
];

export default function ProductsPage() {
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [products, setProducts] = useState(initialProducts);

  const handleAddProduct = () => {
    setEditingProduct(null);
    setShowForm(true);
  };

  const handleEditProduct = (product: any) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  const handleSaveProduct = (data: any) => {
    console.log("Saving product:", data);
    // Logic to save would go here
    setShowForm(false);
  };

  if (showForm) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setShowForm(false)}
            className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
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
        />
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold text-slate-800 tracking-tight">Products Catalog</h2>
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

      {/* Filters & Search */}
      <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-xs flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-1 w-full">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search products by title or category..." 
            className="w-full pl-12 pr-4 py-3 rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-indigo-100 transition-all text-sm outline-hidden"
          />
        </div>
        <div className="flex items-center gap-2 w-full md:w-auto">
          <select className="flex-1 md:w-40 px-4 py-3 rounded-xl bg-slate-50 border-none text-sm font-bold text-slate-600 outline-hidden">
            <option>All Categories</option>
            <option>Gift Boxes</option>
            <option>Flower Bouquets</option>
          </select>
          <select className="flex-1 md:w-32 px-4 py-3 rounded-xl bg-slate-50 border-none text-sm font-bold text-slate-600 outline-hidden">
            <option>Status</option>
            <option>Active</option>
            <option>Inactive</option>
          </select>
        </div>
      </div>

      {/* Products Table */}
      <AdminTable
        columns={["Product", "Category", "Price", "Status", "Actions"]}
        data={products}
        renderRow={(product) => (
          <tr key={product.id} className="hover:bg-slate-50/50 transition-colors border-b border-slate-50 last:border-0 group">
            <td className="px-6 py-5">
              <div className="flex items-center gap-4 text-left">
                <div className="w-12 h-12 rounded-xl bg-slate-100 border border-slate-200 overflow-hidden p-1 flex items-center justify-center">
                  <img src={product.image} alt="" className="w-full h-full object-cover rounded-lg" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-800">{product.title}</h4>
                  <p className="text-[11px] text-slate-400 font-medium mt-0.5">{product.packagingStyle}</p>
                </div>
              </div>
            </td>
            <td className="px-6 py-5">
              <span className="text-xs font-bold text-slate-500 bg-slate-100 px-2 py-1 rounded-md">{product.category}</span>
            </td>
            <td className="px-6 py-5 text-sm font-bold text-slate-700">{product.price}</td>
            <td className="px-6 py-5">
              <StatusBadge status={product.status as any} />
            </td>
            <td className="px-6 py-5">
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => handleEditProduct(product)}
                  className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all"
                >
                  <Edit3 size={16} />
                </button>
                <button className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all">
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

function ChevronLeft({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="15 18 9 12 15 6"></polyline>
    </svg>
  );
}
