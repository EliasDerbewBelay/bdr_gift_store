"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { X, Upload, Plus, ChevronDown, Loader2, Image as ImageIcon, CheckCircle2, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { uploadToCloudinary } from "@/lib/actions/upload";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

const productSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  category: z.string().min(1, "Please select a category"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  price: z.string().optional().or(z.literal("")),
  packagingStyle: z.string().optional(),
});

type ProductFormValues = z.infer<typeof productSchema>;

interface ProductFormProps {
  initialData?: any;
  onSave: (data: any) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

const categories = ["Gift Boxes", "Flower Bouquets", "Personalized Gifts", "Luxury Hampers", "Others"];

export default function ProductForm({ initialData, onSave, onCancel, isLoading }: ProductFormProps) {
  const [images, setImages] = useState<string[]>(initialData?.images || []);
  const [isUploading, setIsUploading] = useState(false);

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      title: initialData?.title || "",
      category: initialData?.categoryName || initialData?.category?.name || "",
      description: initialData?.description || "",
      price: initialData?.price?.toString() || "",
      packagingStyle: initialData?.packagingStyle || "",
    },
  });

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      if (images.length >= 5) {
        toast.error("Maximum 5 images allowed");
        return;
      }
      
      setIsUploading(true);
      const toastId = toast.loading("Uploading high-resolution media...");
      
      try {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append("file", file);

        const result = await uploadToCloudinary(formData);
        if (result.success && result.url) {
          setImages(prev => [...prev, result.url!]);
          toast.success("Media synchronized successfully", { id: toastId });
        } else {
          toast.error(result.error || "Failed to upload media", { id: toastId });
        }
      } catch (error) {
        console.error("Upload error:", error);
        toast.error("An error occurred during secure upload", { id: toastId });
      } finally {
        setIsUploading(false);
      }
    }
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
    toast.info("Media record removed");
  };

  const onSubmit = (values: ProductFormValues) => {
    if (isUploading) {
      toast.warning("Please wait for media upload to conclude");
      return;
    }
    if (images.length === 0) {
      toast.error("At least one specimen image is required");
      return;
    }
    onSave({ ...values, images, price: values.price ? parseFloat(values.price) : null });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          {/* Main Attributes Section */}
          <div className="lg:col-span-3 space-y-8">
            <div className="space-y-6">
              <div className="flex items-center gap-3 px-2">
                 <div className="h-4 w-1 bg-secondary rounded-full" />
                 <h3 className="text-xl font-black text-slate-900 tracking-tight">Core Attributes</h3>
              </div>

              <div className="grid grid-cols-1 gap-6 p-8 rounded-[2rem] bg-white border border-slate-100 shadow-sm">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[10px] font-black uppercase tracking-widest text-slate-400">Specimen Title</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="e.g. Imperial Rose Collection" 
                          {...field} 
                          className="h-14 rounded-2xl border-slate-100 bg-slate-50/50 font-bold text-sm focus-visible:ring-primary/10 transition-all"
                        />
                      </FormControl>
                      <FormMessage className="text-[10px] font-black uppercase tracking-wider" />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[10px] font-black uppercase tracking-widest text-slate-400">Classification Sector</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="h-14 rounded-2xl border-slate-100 bg-slate-50/50 font-black text-[10px] uppercase tracking-widest px-4 focus:ring-primary/10">
                              <SelectValue placeholder="Select Sector" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="rounded-2xl border-slate-100 shadow-2xl">
                            {categories.map(cat => (
                              <SelectItem key={cat} value={cat} className="font-black text-[10px] uppercase tracking-widest py-3">
                                {cat}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage className="text-[10px] font-black uppercase tracking-wider" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[10px] font-black uppercase tracking-widest text-slate-400">Valuation (ETB)</FormLabel>
                        <FormControl>
                          <div className="relative group">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[10px] font-black text-slate-300 group-focus-within:text-primary transition-colors">ETB</span>
                            <Input 
                              type="number" 
                              step="0.01"
                              placeholder="0.00" 
                              {...field} 
                              className="h-14 pl-12 rounded-2xl border-slate-100 bg-slate-50/50 font-bold text-sm focus-visible:ring-primary/10 transition-all"
                            />
                          </div>
                        </FormControl>
                        <FormMessage className="text-[10px] font-black uppercase tracking-wider" />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[10px] font-black uppercase tracking-widest text-slate-400">Analytical Description</FormLabel>
                      <FormControl>
                        <Textarea 
                          rows={6}
                          placeholder="Provide detailed characteristics of this artisanal piece..." 
                          {...field} 
                          className="rounded-2xl border-slate-100 bg-slate-50/50 font-bold text-sm focus-visible:ring-primary/10 transition-all resize-none p-4"
                        />
                      </FormControl>
                      <FormMessage className="text-[10px] font-black uppercase tracking-wider" />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-3 px-2">
                 <div className="h-4 w-1 bg-secondary rounded-full" />
                 <h3 className="text-xl font-black text-slate-900 tracking-tight">Presentation Detail</h3>
              </div>
              <div className="p-8 rounded-[2rem] bg-white border border-slate-100 shadow-sm">
                <FormField
                  control={form.control}
                  name="packagingStyle"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[10px] font-black uppercase tracking-widest text-slate-400">Aesthetic Packaging Signature</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="e.g. Velvet Noir Case with Golden Silk Ribbon" 
                          {...field} 
                          className="h-14 rounded-2xl border-slate-100 bg-slate-50/50 font-bold text-sm focus-visible:ring-primary/10 transition-all"
                        />
                      </FormControl>
                      <FormDescription className="text-[10px] font-bold text-slate-400 mt-2">
                        Define the final physical encounter for the client.
                      </FormDescription>
                      <FormMessage className="text-[10px] font-black uppercase tracking-wider" />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>

          {/* Media & Action Section */}
          <div className="lg:col-span-2 space-y-8">
            <div className="space-y-6">
              <div className="flex items-center justify-between px-2">
                 <div className="flex items-center gap-3">
                   <div className="h-4 w-1 bg-secondary rounded-full" />
                   <h3 className="text-xl font-black text-slate-900 tracking-tight">Visual Identity</h3>
                 </div>
                 <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{images.length} / 5</span>
              </div>

              <div className="p-6 rounded-[2rem] bg-white border border-slate-100 shadow-sm space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <AnimatePresence>
                    {images.map((img, idx) => (
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        key={idx} 
                        className="relative aspect-square rounded-2xl overflow-hidden border border-slate-100 group shadow-sm bg-slate-50"
                      >
                        <img src={img} alt="" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                        <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                           <Button
                             type="button"
                             variant="destructive"
                             size="icon"
                             onClick={() => removeImage(idx)}
                             className="h-10 w-10 rounded-xl shadow-2xl"
                           >
                             <Trash2 className="h-4 w-4" />
                           </Button>
                        </div>
                        {idx === 0 && (
                          <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 bg-secondary text-white text-[8px] font-black uppercase tracking-widest rounded-lg shadow-xl ring-4 ring-secondary/20">
                             <CheckCircle2 className="h-2.5 w-2.5" />
                             Signature
                          </div>
                        )}
                      </motion.div>
                    ))}
                  </AnimatePresence>
                  
                  {images.length < 5 && (
                    <label className={cn(
                      "relative aspect-square rounded-2xl border-2 border-dashed flex flex-col items-center justify-center gap-3 cursor-pointer transition-all duration-500 overflow-hidden group",
                      isUploading ? "border-slate-100 bg-slate-50 cursor-not-allowed" : "border-slate-100 hover:border-secondary/50 hover:bg-secondary/[0.02] text-slate-400 hover:text-secondary"
                    )}>
                      {isUploading ? (
                        <div className="flex flex-col items-center gap-3">
                           <Loader2 size={24} className="animate-spin text-secondary" />
                           <span className="text-[8px] font-black uppercase tracking-widest text-secondary/60 animate-pulse">Syncing...</span>
                        </div>
                      ) : (
                        <>
                          <div className="w-12 h-12 rounded-2xl bg-slate-50 group-hover:bg-secondary/10 group-hover:scale-110 group-hover:rotate-12 flex items-center justify-center transition-all duration-500 shadow-sm border border-slate-100 group-hover:border-secondary/20">
                            <Plus size={20} className="text-slate-400 group-hover:text-secondary" />
                          </div>
                          <div className="text-center">
                             <span className="block text-[9px] font-black uppercase tracking-widest">Add Specimen</span>
                             <span className="block text-[8px] font-bold text-slate-400 mt-1">High Res JPG/PNG</span>
                          </div>
                        </>
                      )}
                      <input 
                        type="file" 
                        className="hidden" 
                        accept="image/*" 
                        onChange={handleImageUpload} 
                        disabled={isUploading}
                      />
                    </label>
                  )}
                </div>

                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 flex gap-4 items-start">
                  <div className="h-8 w-8 rounded-xl bg-white shadow-sm flex items-center justify-center text-slate-300 shrink-0">
                    <ImageIcon size={16} />
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] font-black text-slate-700 uppercase tracking-widest">Media Protocol</p>
                    <p className="text-[9px] text-slate-400 font-bold leading-relaxed uppercase tracking-wider">Maintain consistent lighting and scale across all specimen images for visual harmony.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Form Termination Controls */}
            <div className="pt-4 space-y-4">
              <Button
                size="lg"
                disabled={isLoading || isUploading}
                type="submit"
                className="w-full h-16 rounded-2xl bg-slate-950 hover:bg-slate-900 text-white font-black uppercase text-[11px] tracking-[0.2em] shadow-2xl shadow-slate-200 transition-all hover:translate-y-[-2px] group"
              >
                {isLoading ? (
                  <Loader2 className="mr-3 h-5 w-5 animate-spin text-secondary" />
                ) : (
                  <CheckCircle2 className="mr-3 h-5 w-5 text-secondary group-hover:scale-110 transition-transform" />
                )}
                {isLoading ? "Synchronizing..." : "Finalize Entry"}
              </Button>
              <Button
                type="button"
                variant="outline"
                size="lg"
                onClick={onCancel}
                className="w-full h-16 rounded-2xl border-slate-100 bg-white text-slate-500 font-black uppercase text-[11px] tracking-[0.2em] hover:bg-slate-50 hover:text-slate-900 transition-all"
              >
                Abort Operation
              </Button>
            </div>
          </div>
        </div>
      </form>
    </Form>
  );
}

import { Trash2 } from "lucide-react";
