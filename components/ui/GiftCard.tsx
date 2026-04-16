"use client";
import Image from "next/image";
import { Heart, ShoppingCart, Eye } from "lucide-react";
import { useAuthGuard } from "@/hooks/useAuthGuard";

interface GiftCardProps {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  badge?: string;
  onQuickView?: (id: string) => void;
  onAddToCart?: (id: string) => void;
  onWishlist?: (id: string) => void;
}

export default function GiftCard({
  id,
  name,
  category,
  price,
  image,
  badge,
  onQuickView,
  onAddToCart,
  onWishlist,
}: GiftCardProps) {
  const { authenticatedAction } = useAuthGuard();
  const handleQuickView = () => {
    if (onQuickView) {
      onQuickView(id);
    }
  };

  const handleAddToCart = () => {
    if (onAddToCart) {
      authenticatedAction(() => onAddToCart(id));
    }
  };

  const handleWishlist = () => {
    if (onWishlist) {
      authenticatedAction(() => onWishlist(id));
    }
  };

  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300">
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-700"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src =
              "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=2070&auto=format&fit=crop";
          }}
        />

        {/* Dark Overlay on Hover */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />

        {/* Category Badge */}
        {badge && (
          <div className="absolute top-3 left-3">
            <span className="inline-block px-3 py-1.5 bg-amber-500 text-white text-xs font-semibold rounded-full shadow-md">
              {badge}
            </span>
          </div>
        )}

        {/* Quick View Button - Appears on Hover */}
        <div className="absolute bottom-3 left-3 right-3">
          <button
            onClick={handleQuickView}
            className="w-full bg-white/90 backdrop-blur-sm hover:bg-amber-500 text-slate-900 hover:text-white text-xs font-medium py-2 rounded-lg flex items-center justify-center gap-1.5 transition-all duration-300 shadow-md opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0"
          >
            <Eye className="w-3.5 h-3.5" />
            Quick View
          </button>
        </div>

        {/* Wishlist Button - Appears on Hover */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
          <button
            onClick={handleWishlist}
            className="w-9 h-9 bg-white hover:bg-slate-100 text-slate-700 rounded-full flex items-center justify-center shadow-lg transform hover:scale-110 transition-all duration-300"
          >
            <Heart className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Category */}
        <span className="inline-block text-xs font-medium text-amber-600 uppercase tracking-wider mb-2">
          {category}
        </span>

        {/* Product Name */}
        <h3 className="text-slate-900 font-semibold text-lg mb-3 line-clamp-2 leading-tight">
          {name}
        </h3>

        {/* Price and Add to Cart */}
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-slate-900">ETB {price.toLocaleString()}</span>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            className="w-10 h-10 bg-slate-900 hover:bg-amber-600 text-white rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110"
          >
            <ShoppingCart className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
