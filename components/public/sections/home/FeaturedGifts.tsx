"use client";
import { ArrowRight, Gift, Truck, Shield } from "lucide-react";
import GiftCard from "@/components/ui/GiftCard";

export default function FeaturedGifts() {
  const featuredProducts = [
    {
      id: 1,
      name: "Premium Chocolate Box",
      category: "Luxury",
      price: 49.99,
      image:
        "https://images.unsplash.com/photo-1549007994-cb92caebd54b?q=80&w=2070&auto=format&fit=crop",
      badge: "Bestseller",
    },
    {
      id: 2,
      name: "Elegant Flower Bouquet",
      category: "Floral",
      price: 59.99,
      image:
        "https://images.unsplash.com/photo-1563241527-3004b7be0ffd?q=80&w=2070&auto=format&fit=crop",
      badge: "Popular",
    },
    {
      id: 3,
      name: "Luxury Spa Gift Set",
      category: "Wellness",
      price: 89.99,
      image:
        "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?q=80&w=2070&auto=format&fit=crop",
      badge: "Premium",
    },
    {
      id: 4,
      name: "Personalized Gift Box",
      category: "Custom",
      price: 39.99,
      image:
        "https://images.unsplash.com/photo-1513885535751-8b9238bd345a?q=80&w=2070&auto=format&fit=crop",
      badge: "Trending",
    },
  ];

  const handleQuickView = (id: number) => {
    console.log(`Quick view product ${id}`);
    // Add your quick view logic here (open modal, navigate, etc.)
  };

  const handleAddToCart = (id: number) => {
    console.log(`Add to cart product ${id}`);
    // Add your add to cart logic here
  };

  const handleWishlist = (id: number) => {
    console.log(`Add to wishlist product ${id}`);
    // Add your wishlist logic here
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
          {featuredProducts.map((product) => (
            <GiftCard
              key={product.id}
              id={product.id}
              name={product.name}
              category={product.category}
              price={product.price}
              image={product.image}
              badge={product.badge}
              onQuickView={handleQuickView}
              onAddToCart={handleAddToCart}
              onWishlist={handleWishlist}
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
              <p className="text-xs text-slate-600">On orders over $50</p>
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
          <button className="group inline-flex items-center gap-2 text-amber-600 hover:text-amber-700 font-semibold px-6 py-3 transition-all">
            Browse All Featured Gifts
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
}
