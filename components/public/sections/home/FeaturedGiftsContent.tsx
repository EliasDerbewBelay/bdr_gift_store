"use client";
import { useState } from "react";
import { ArrowRight, Gift, Truck, Shield } from "lucide-react";
import GiftCard from "@/components/ui/GiftCard";
import QuickViewCard from "@/components/ui/QuickViewCard";

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
    <section className="relative w-full py-16 sm:py-20 lg:py-24 overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center space-y-4 mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 bg-amber-100 px-4 py-2 rounded-full">
            <Gift className="w-4 h-4 text-amber-600" />
            <span className="text-amber-700 text-sm font-semibold tracking-wider uppercase">
              Handpicked For You
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900">
            Featured Gift Selection
          </h2>

          <p className="text-slate-600 text-base sm:text-lg max-w-2xl mx-auto">
            Discover our most loved gifts, carefully selected for every special
            moment
          </p>
        </div>

        {/* Featured Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
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
        <div className="mt-12 sm:mt-16 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
          <div className="flex items-center gap-3 p-4 bg-white/50 backdrop-blur-sm rounded-xl border border-slate-200">
            <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
              <Truck className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <h4 className="font-semibold text-slate-900 text-sm">
                Free Shipping
              </h4>
              <p className="text-xs text-slate-600">On orders over ETB 1,000</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 bg-white/50 backdrop-blur-sm rounded-xl border border-slate-200">
            <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
              <Shield className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <h4 className="font-semibold text-slate-900 text-sm">
                Secure Payment
              </h4>
              <p className="text-xs text-slate-600">100% secure transactions</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 bg-white/50 backdrop-blur-sm rounded-xl border border-slate-200">
            <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
              <Gift className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <h4 className="font-semibold text-slate-900 text-sm">
                Gift Wrapping
              </h4>
              <p className="text-xs text-slate-600">Available on all orders</p>
            </div>
          </div>
        </div>

        {/* View All Link */}
        <div className="text-center mt-12 sm:mt-16">
          <a href="/gifts" className="group inline-flex items-center gap-2 text-amber-600 hover:text-amber-700 font-semibold px-6 py-3 transition-all">
            Browse All Featured Gifts
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
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
