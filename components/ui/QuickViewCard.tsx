"use client";
import { useState } from "react";
import Image from "next/image";
import {
  Heart,
  ShoppingCart,
  Minus,
  Plus,
  Star,
  Truck,
  Shield,
  Gift,
  Share2,
} from "lucide-react";
import { useAuthGuard } from "@/hooks/useAuthGuard";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

interface QuickViewCardProps {
  isOpen: boolean;
  onClose: () => void;
  product: {
    id: string;
    name: string;
    category: string;
    price: number;
    originalPrice?: number;
    image: string;
    badge?: string;
    description: string;
    rating?: number;
    reviews?: number;
    sku?: string;
    tags?: string[];
    inStock?: boolean;
    deliveryInfo?: string;
    features?: string[];
    images?: string[];
  };
  onAddToCart?: (id: string, quantity: number) => void;
  onWishlist?: (id: string) => void;
}

export default function QuickViewCard({
  isOpen,
  onClose,
  product,
  onAddToCart,
  onWishlist,
}: QuickViewCardProps) {
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const { authenticatedAction } = useAuthGuard();

  const productImages = product.images || [product.image];

  const handleQuantityChange = (delta: number) => {
    setQuantity((prev) => Math.max(1, prev + delta));
  };

  const handleWishlist = () => {
    authenticatedAction(() => {
      setIsWishlisted(!isWishlisted);
      if (onWishlist) {
        onWishlist(product.id);
      }
    });
  };

  const handleAddToCart = () => {
    authenticatedAction(() => {
      if (onAddToCart) {
        onAddToCart(product.id, quantity);
        onClose();
      }
    });
  };

  const discount = product.originalPrice
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100,
      )
    : 0;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[calc(100%-2rem)] md:max-w-[90vw] lg:max-w-5xl p-0 overflow-hidden rounded-3xl lg:rounded-[2.5rem] border-none shadow-2xl bg-white">
        <DialogTitle className="sr-only">{product.name}</DialogTitle>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 h-full max-h-[95vh] lg:max-h-[800px] overflow-y-auto lg:overflow-hidden">
          {/* Visual Showcase - Left */}
          <div className="p-4 md:p-8 lg:p-10 flex flex-col gap-6 bg-slate-50/50">
            <div className="relative aspect-square rounded-2xl lg:rounded-[2rem] overflow-hidden shadow-2xl border-2 lg:border-4 border-white group">
              <Image
                src={productImages[selectedImage]}
                alt={product.name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 1024px) 100vw, 500px"
                priority
              />
              
              {/* Contextual Badges */}
              <div className="absolute top-4 left-4 lg:top-6 lg:left-6 flex flex-col gap-2">
                {product.badge && (
                  <Badge className="bg-secondary text-secondary-foreground font-black px-3 py-1 lg:px-4 lg:py-1.5 uppercase tracking-widest text-[10px] shadow-lg">
                    {product.badge}
                  </Badge>
                )}
                {discount > 0 && (
                  <Badge variant="destructive" className="font-black px-3 py-1 lg:px-4 lg:py-1.5 uppercase tracking-widest text-[10px] shadow-lg">
                    {discount}% OFF
                  </Badge>
                )}
              </div>
            </div>

            {/* Thumbnail Navigation */}
            {productImages.length > 1 && (
              <div className="flex gap-3 lg:gap-4 overflow-x-auto py-2 no-scrollbar">
                {productImages.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={cn(
                      "relative w-16 h-16 lg:w-20 lg:h-20 rounded-xl lg:rounded-2xl overflow-hidden shrink-0 transition-all border-2",
                      selectedImage === index 
                        ? "border-secondary scale-95 shadow-lg" 
                        : "border-transparent opacity-60 hover:opacity-100"
                    )}
                  >
                    <Image src={img} alt="Thumbnail" fill className="object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Micro Features - Visible on all screens, but adjusted */}
            <div className="grid grid-cols-2 gap-3 lg:gap-4 mt-auto">
                <div className="flex items-center gap-2 lg:gap-3 p-2 lg:p-3 bg-white rounded-xl lg:rounded-2xl border border-slate-100 shadow-sm">
                   <div className="h-6 w-6 lg:h-8 lg:w-8 rounded-lg bg-secondary/10 flex items-center justify-center text-secondary">
                      <Truck className="h-3 w-3 lg:h-4 lg:w-4" />
                   </div>
                   <span className="text-[8px] lg:text-[10px] font-black uppercase tracking-widest text-slate-500">Free Express</span>
                </div>
                <div className="flex items-center gap-2 lg:gap-3 p-2 lg:p-3 bg-white rounded-xl lg:rounded-2xl border border-slate-100 shadow-sm">
                   <div className="h-6 w-6 lg:h-8 lg:w-8 rounded-lg bg-secondary/10 flex items-center justify-center text-secondary">
                      <Gift className="h-3 w-3 lg:h-4 lg:w-4" />
                   </div>
                   <span className="text-[8px] lg:text-[10px] font-black uppercase tracking-widest text-slate-500">Lux Wrapping</span>
                </div>
            </div>
          </div>

          {/* Commerce Engine - Right */}
          <div className="flex flex-col h-full bg-white relative">
            <ScrollArea className="h-full">
              <div className="p-6 md:p-8 lg:p-12 space-y-6 lg:space-y-8">
              {/* Meta & Identity */}
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                   <div className="h-1 w-8 bg-secondary rounded-full" />
                   <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                     {product.category}
                   </span>
                </div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 tracking-tight leading-tight">
                  {product.name}
                </h2>
                {product.sku && <p className="text-[10px] font-bold text-slate-300 uppercase tracking-[0.2em]">SKU: {product.sku}</p>}
              </div>

              {/* Commercial Metrics */}
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-y border-slate-50 py-4 lg:py-6">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
                    <span className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tighter">
                      ETB {product.price.toLocaleString()}
                    </span>
                    {product.originalPrice && (
                      <span className="text-base sm:text-lg text-slate-300 line-through font-bold">
                        ETB {product.originalPrice.toLocaleString()}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                     <div className={cn("h-2 w-2 rounded-full", product.inStock !== false ? "bg-emerald-500" : "bg-rose-500")} />
                     <span className={cn("text-xs font-bold uppercase tracking-widest", product.inStock !== false ? "text-emerald-500" : "text-rose-500")}>
                       {product.inStock !== false ? "In Stock & Ready" : "Out of Stock"}
                     </span>
                  </div>
                </div>

                {product.rating && (
                  <div className="flex flex-col items-end gap-1">
                     <div className="flex items-center gap-0.5">
                       {[...Array(5)].map((_, i) => (
                         <Star
                           key={i}
                           className={cn("w-4 h-4", i < Math.floor(product.rating!) ? "text-secondary fill-secondary" : "text-slate-200")}
                         />
                       ))}
                     </div>
                     <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{product.reviews || 0} reviews</span>
                  </div>
                )}
              </div>

              {/* Narrative */}
              <div className="space-y-4">
                <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400">Description</h4>
                <p className="text-slate-500 font-medium leading-relaxed">
                  {product.description}
                </p>
                {product.features && product.features.length > 0 && (
                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                      {product.features.map((f, i) => (
                        <div key={i} className="flex items-center gap-3">
                           <div className="h-1.5 w-1.5 rounded-full bg-secondary" />
                           <span className="text-xs font-bold text-slate-600">{f}</span>
                        </div>
                      ))}
                   </div>
                )}
              </div>

              {/* Interactive Module */}
              <div className="pt-6 space-y-6">
                 <div className="flex flex-col sm:flex-row items-center gap-6">
                    <div className="flex items-center space-x-1 bg-slate-50 p-1.5 rounded-2xl border border-slate-100">
                      <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl" onClick={() => handleQuantityChange(-1)} disabled={quantity <= 1}>
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="w-12 text-center font-black text-slate-900">{quantity}</span>
                      <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl" onClick={() => handleQuantityChange(1)}>
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>

                    <Button 
                      className="flex-1 h-14 w-full rounded-2xl font-black uppercase tracking-widest shadow-2xl shadow-primary/20 transition-all hover:translate-y-[-2px] active:scale-95 group"
                      onClick={handleAddToCart}
                      disabled={product.inStock === false}
                    >
                      <ShoppingCart className="mr-3 h-5 w-5 transition-transform group-hover:rotate-12" />
                      Secure Add to Cart
                    </Button>
                 </div>

                 <Button 
                   variant="outline" 
                   className={cn(
                     "w-full h-12 rounded-2xl font-bold border-2 transition-all gap-2",
                     isWishlisted ? "bg-secondary border-secondary text-white hover:bg-secondary/90" : "border-slate-100 text-slate-600 hover:border-secondary hover:text-secondary"
                   )}
                   onClick={handleWishlist}
                 >
                   <Heart className={cn("h-4 w-4", isWishlisted && "fill-current")} />
                   {isWishlisted ? "In Your Wishlist" : "Add to Private Wishlist"}
                 </Button>
              </div>

                <div className="pt-6 lg:pt-8 flex items-center justify-between border-t border-slate-50 mt-6 lg:mt-10 mb-4 lg:mb-0">
                  <div className="flex items-center gap-2 text-slate-300">
                    <Shield className="h-4 w-4" />
                    <span className="text-[10px] font-black uppercase tracking-widest">Encrypted Checkout</span>
                  </div>
                  <Button variant="ghost" className="h-auto p-0 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-primary group">
                    <Share2 className="mr-2 h-3 w-3 group-hover:rotate-12 transition-transform" />
                    Share Inspiration
                  </Button>
                </div>
              </div>
            </ScrollArea>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
