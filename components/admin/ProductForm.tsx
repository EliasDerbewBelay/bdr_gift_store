"use client";

import React, { useState } from "react";
import { X, Upload, Plus, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProductFormProps {
  initialData?: any;
  onSave: (data: any) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

const categories = ["Gift Boxes", "Flower Bouquets", "Personalized Gifts", "Luxury Hampers", "Others"];

export default function ProductForm({ initialData, onSave, onCancel, isLoading }: ProductFormProps) {
  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    category: initialData?.category || categories[0],
    description: initialData?.description || "",
    price: initialData?.price || "",
    packagingStyle: initialData?.packagingStyle || "",
  });

  const [images, setImages] = useState<string[]>(initialData?.images || []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Mock image upload for UI
    if (e.target.files && e.target.files[0]) {
      const newImage = URL.createObjectURL(e.target.files[0]);
      setImages(prev => [...prev, newImage]);
    }
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ ...formData, images });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Main Info */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 lg:p-8 rounded-2xl border border-slate-100 shadow-xs space-y-6">
            <h3 className="text-lg font-bold text-slate-800 border-b border-slate-50 pb-4">Product Details</h3>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Product Title</label>
                <input
                  required
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="e.g. Elegant Peony Box"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 outline-hidden transition-all placeholder:text-slate-300"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">Category</label>
                  <div className="relative">
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 outline-hidden transition-all appearance-none bg-white cursor-pointer"
                    >
                      {categories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                    <ChevronDown size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">Price (Optional)</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium">$</span>
                    <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleChange}
                      placeholder="0.00"
                      className="w-full pl-8 pr-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 outline-hidden transition-all placeholder:text-slate-300"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Description</label>
                <textarea
                  required
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={5}
                  placeholder="Describe the product features, contents, etc..."
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 outline-hidden transition-all resize-none placeholder:text-slate-300"
                />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 lg:p-8 rounded-2xl border border-slate-100 shadow-xs space-y-6">
            <h3 className="text-lg font-bold text-slate-800 border-b border-slate-50 pb-4">Packaging & Extra Info</h3>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Packaging Style</label>
              <input
                type="text"
                name="packagingStyle"
                value={formData.packagingStyle}
                onChange={handleChange}
                placeholder="e.g. Premium White Box with Velvet Ribbon"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 outline-hidden transition-all placeholder:text-slate-300"
              />
            </div>
          </div>
        </div>

        {/* Right Column: Media */}
        <div className="space-y-6">
          <div className="bg-white p-6 lg:p-8 rounded-2xl border border-slate-100 shadow-xs space-y-6">
            <div className="flex items-center justify-between border-b border-slate-50 pb-4">
              <h3 className="text-lg font-bold text-slate-800">Product Images</h3>
              <span className="text-xs font-medium text-slate-400">{images.length} / 5</span>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                {images.map((img, idx) => (
                  <div key={idx} className="relative aspect-square rounded-xl overflow-hidden border border-slate-100 group">
                    <img src={img} alt="" className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => removeImage(idx)}
                      className="absolute top-2 right-2 p-1.5 bg-rose-500 text-white rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X size={14} />
                    </button>
                    {idx === 0 && (
                      <span className="absolute bottom-2 left-2 px-1.5 py-0.5 bg-indigo-600 text-white text-[10px] font-bold rounded-md">Main</span>
                    )}
                  </div>
                ))}
                
                {images.length < 5 && (
                  <label className="relative aspect-square rounded-xl border-2 border-dashed border-slate-100 hover:border-indigo-200 hover:bg-indigo-50/50 flex flex-col items-center justify-center gap-2 cursor-pointer transition-all text-slate-400 hover:text-indigo-600">
                    <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-indigo-100">
                      <Plus size={20} />
                    </div>
                    <span className="text-xs font-semibold">Add Image</span>
                    <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
                  </label>
                )}
              </div>
              
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                <div className="flex gap-3">
                  <Upload size={18} className="text-slate-400 mt-0.5" />
                  <div>
                    <p className="text-xs font-bold text-slate-700">Drop images here</p>
                    <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">Accepted formats: JPG, PNG, WEBP. Max size: 5MB per image.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-3">
            <button
              disabled={isLoading}
              type="submit"
              className="w-full py-4 px-6 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold shadow-lg shadow-indigo-200 transition-all active:scale-98 disabled:opacity-50"
            >
              {isLoading ? "Saving..." : "Save Product"}
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="w-full py-4 px-6 rounded-xl bg-white border border-slate-200 text-slate-600 font-bold hover:bg-slate-50 transition-all active:scale-98"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
