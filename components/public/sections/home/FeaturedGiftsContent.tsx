"use client";
import { useState } from "react";
import { ArrowRight, Gift, Truck, Shield } from "lucide-react";
import GiftCard from "@/components/ui/GiftCard";
import QuickViewCard from "@/components/ui/QuickViewCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface FeaturedGiftsContentProps {
  products: any[];
}

export default function FeaturedGiftsContent({ products }: FeaturedGiftsContentProps) {
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);

  const handleQuickView = (id: string) => {
    const product = products.find((p) => p.id === id);
    if (product) {
      const mappedProduct = {
        id: product.id,
        name: product.title,
        description: product.description,
        price: product.price || 0,
        category: product.category.name,
        image: product.images[0]?.url || "https://placehold.co/400x400",
        images: product.images.map((img: any) => img.url),
      };
      setSelectedProduct(mappedProduct);
      setIsQuickViewOpen(true);
    }
  };

  const handleCloseQuickView = () => {
    setIsQuickViewOpen(false);
  };

  const handleAddToCart = (id: string) => {
    console.log(`Add to cart: product ${id}`);
  };

  const handleWishlist = (id: string) => {
    console.log(`Add to wishlist product ${id}`);
  };

  return (
    <section className="relative w-full py-20 sm:py-24 overflow-hidden bg-white">
      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 px-2">
          <div className="space-y-4 max-w-2xl text-left">
            <Badge variant="outline" className="px-4 py-1 border-primary/20 text-primary font-bold uppercase tracking-widest bg-primary/5">
              Handpicked Selection
            </Badge>
            <h2 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">
              Featured Gift Selection
            </h2>
            <p className="text-slate-500 text-lg font-medium">
              Discover our most loved gifts, carefully selected for every special moment and delivered with elegance.
            </p>
          </div>
          
          <Button variant="ghost" asChild className="font-bold text-primary group hidden md:flex rounded-full px-6">
            <a href="/gifts">
              Browse All <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1.5 transition-transform" />
            </a>
          </Button>
        </div>

        {/* Featured Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {products.map((product) => (
            <GiftCard
              key={product.id}
              id={product.id}
              name={product.title}
              category={product.category.name}
              price={product.price || 0}
              image={product.images[0]?.url || "https://placehold.co/400x400"}
              onQuickView={() => handleQuickView(product.id)}
              onAddToCart={() => handleAddToCart(product.id)}
              onWishlist={() => handleWishlist(product.id)}
            />
          ))}
        </div>

        {/* Features Banner */}
        <div className="mt-20 grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="flex items-center gap-5 p-6 bg-slate-50 rounded-3xl border border-slate-100 group hover:bg-white hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300">
            <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-secondary shadow-sm group-hover:scale-110 transition-transform">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 text-base">Free Shipping</h4>
              <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">Orders over ETB 1,000</p>
            </div>
          </div>

          <div className="flex items-center gap-5 p-6 bg-slate-50 rounded-3xl border border-slate-100 group hover:bg-white hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300">
            <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-secondary shadow-sm group-hover:scale-110 transition-transform">
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 text-base">Secure Payment</h4>
              <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">100% Secure Process</p>
            </div>
          </div>

          <div className="flex items-center gap-5 p-6 bg-slate-50 rounded-3xl border border-slate-100 group hover:bg-white hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300">
            <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-secondary shadow-sm group-hover:scale-110 transition-transform">
              <Gift className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 text-base">Gift Wrapping</h4>
              <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">Available on Request</p>
            </div>
          </div>
        </div>

        {/* Mobile View All */}
        <div className="text-center mt-12 md:hidden">
          <Button variant="outline" asChild className="rounded-full px-8 py-6 h-auto font-bold border-secondary text-secondary">
             <a href="/gifts">
                View All Featured Gifts <ArrowRight className="ml-2 h-4 w-4" />
             </a>
          </Button>
        </div>
      </div>

      {/* Quick View Modal */}
      {selectedProduct && (
        <QuickViewCard
          isOpen={isQuickViewOpen}
          onClose={handleCloseQuickView}
          product={selectedProduct}
          onAddToCart={(product, qty) => handleAddToCart(product.id)}
          onWishlist={(id) => handleWishlist(id)}
        />
      )}
    </section>
  );
}
