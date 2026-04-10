"use client";
import Image from "next/image";
import { ArrowRight, Heart, Eye } from "lucide-react";

export default function Collections() {
  const collections = [
    {
      id: 1,
      title: "Luxury Gift Boxes",
      description: "Premium curated selections",
      price: "From $89.99",
      image:
        "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=2070&auto=format&fit=crop",
      items: "12 items",
      badge: "Bestseller",
      span: "row-span-1",
    },
    {
      id: 2,
      title: "Birthday Specials",
      description: "Celebrate with style",
      price: "From $49.99",
      image:
        "https://images.unsplash.com/photo-1513885535751-8b9238bd345a?q=80&w=2070&auto=format&fit=crop",
      items: "8 items",
      badge: "Popular",
      span: "row-span-1",
    },
    {
      id: 3,
      title: "Wedding Collection",
      description: "Elegant wedding gifts",
      price: "From $129.99",
      image:
        "https://images.unsplash.com/photo-1513201099705-a9746e1e201f?q=80&w=1974&auto=format&fit=crop",
      items: "15 items",
      badge: "Premium",
      span: "row-span-2",
    },
    {
      id: 4,
      title: "Anniversary Gifts",
      description: "Timeless treasures",
      price: "From $69.99",
      image:
        "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=2070&auto=format&fit=crop",
      items: "10 items",
      badge: "New",
      span: "row-span-1",
    },
    {
      id: 5,
      title: "Seasonal Specials",
      description: "Limited time offers",
      price: "From $39.99",
      image:
        "https://images.unsplash.com/photo-1513885535751-8b9238bd345a?q=80&w=2070&auto=format&fit=crop",
      items: "6 items",
      badge: "Limited",
      span: "row-span-1",
    },
  ];

  return (
    <section className="relative w-full bg-cyan-200/20 py-16 sm:py-20 lg:py-24 overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center space-y-4 mb-12 sm:mb-16">
          <span className="text-amber-600 text-sm font-semibold tracking-wider uppercase">
            Our Collections
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900">
            Curated Gift Collections
          </h2>
          <p className="text-slate-700 text-base sm:text-lg max-w-2xl mx-auto">
            Discover our thoughtfully curated collections designed for every
            occasion and celebration
          </p>
        </div>

        {/* Masonry Grid - Reduced sizes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6 auto-rows-[180px] sm:auto-rows-[200px]">
          {collections.map((item) => (
            <div
              key={item.id}
              className={`relative group overflow-hidden rounded-2xl sm:rounded-3xl shadow-lg ${
                item.id === 3 ? "sm:row-span-2" : ""
              } ${item.id === 1 ? "sm:col-span-2 lg:col-span-1" : ""}`}
            >
              {/* Image */}
              <div className="relative w-full h-full">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />

                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                {/* Badge */}
                {item.badge && (
                  <div className="absolute top-3 left-3 sm:top-4 sm:left-4">
                    <span className="inline-block px-3 py-1 bg-amber-500 text-white text-xs font-semibold rounded-full shadow-md">
                      {item.badge}
                    </span>
                  </div>
                )}

                {/* Action Buttons - Appear on Hover */}
                <div className="absolute top-3 right-3 sm:top-4 sm:right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button className="w-8 h-8 sm:w-9 sm:h-9 bg-white/20 backdrop-blur-md hover:bg-amber-500 rounded-full flex items-center justify-center transition-colors group/btn">
                    <Heart className="w-4 h-4 sm:w-4 sm:h-4 text-white" />
                  </button>
                  <button className="w-8 h-8 sm:w-9 sm:h-9 bg-white/20 backdrop-blur-md hover:bg-white rounded-full flex items-center justify-center transition-colors group/btn">
                    <Eye className="w-4 h-4 sm:w-4 sm:h-4 text-white" />
                  </button>
                </div>

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-4 lg:p-5">
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <h3 className="text-white text-base sm:text-lg lg:text-xl font-bold">
                        {item.title}
                      </h3>
                      <span className="text-amber-400 text-sm sm:text-sm font-semibold">
                        {item.price}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <p className="text-gray-200 text-xs sm:text-xs">
                        {item.description}
                      </p>
                      <span className="text-gray-300 text-xs">
                        {item.items}
                      </span>
                    </div>

                    {/* Quick View Link */}
                    <button className="mt-2 flex items-center gap-1 text-amber-400 text-xs font-medium opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                      Quick View
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12 sm:mt-16">
          <button className="group inline-flex items-center gap-2 bg-transparent hover:bg-amber-500 text-amber-600 hover:text-white font-semibold px-8 py-3 sm:px-10 sm:py-4 rounded-full border-2 border-amber-500 transition-all shadow-md hover:shadow-lg">
            View All Collections
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      {/* Mobile Optimizations */}
      <style jsx>{`
        @media (max-width: 640px) {
          .grid {
            display: flex;
            flex-direction: column;
            gap: 1rem;
          }

          .grid > div {
            height: 260px;
          }
        }
      `}</style>
    </section>
  );
}
