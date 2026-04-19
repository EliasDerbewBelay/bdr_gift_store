"use client";
import Image from "next/image";
import { ArrowRight, Heart, Eye } from "lucide-react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function Collections() {
  const collections = [
    {
      id: 1,
      title: "Luxury Gift Boxes",
      description: "Premium curated selections",
      price: "From ETB 899",
      image: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=2070&auto=format&fit=crop",
      items: "12 items",
      badge: "Bestseller",
    },
    {
      id: 2,
      title: "Birthday Specials",
      description: "Celebrate with style",
      price: "From ETB 499",
      image: "https://images.unsplash.com/photo-1513885535751-8b9238bd345a?q=80&w=2070&auto=format&fit=crop",
      items: "8 items",
      badge: "Popular",
    },
    {
      id: 3,
      title: "Wedding Collection",
      description: "Elegant wedding gifts",
      price: "From ETB 1,299",
      image: "https://images.unsplash.com/photo-1513201099705-a9746e1e201f?q=80&w=1974&auto=format&fit=crop",
      items: "15 items",
      badge: "Premium",
    },
    {
      id: 4,
      title: "Anniversary Gifts",
      description: "Timeless treasures",
      price: "From ETB 699",
      image: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=2070&auto=format&fit=crop",
      items: "10 items",
      badge: "New",
    },
    {
      id: 5,
      title: "Seasonal Specials",
      description: "Limited time offers",
      price: "From ETB 399",
      image: "https://images.unsplash.com/photo-1513885535751-8b9238bd345a?q=80&w=2070&auto=format&fit=crop",
      items: "6 items",
      badge: "Limited",
    },
  ];

  return (
    <section className="relative w-full bg-slate-50/50 py-20 sm:py-24 overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center space-y-4 mb-16 max-w-3xl mx-auto">
          <Badge variant="outline" className="px-4 py-1 border-secondary/30 text-secondary font-bold uppercase tracking-widest bg-secondary/5">
            Our Collections
          </Badge>
          <h2 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">
            Curated Gift Collections
          </h2>
          <p className="text-slate-500 text-lg font-medium leading-relaxed">
            Discover our thoughtfully curated collections designed for every occasion and celebration, crafted with elegance in mind.
          </p>
        </div>

        {/* Masonry Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[250px] sm:auto-rows-[300px]">
          {collections.map((item) => (
            <Card
              key={item.id}
              className={`group border-none overflow-hidden bg-white shadow-xl shadow-slate-200/40 rounded-3xl transition-all duration-500 hover:-translate-y-2 ${
                item.id === 3 ? "sm:row-span-2" : ""
              } ${item.id === 1 ? "sm:col-span-2 lg:col-span-1" : ""}`}
            >
              <CardContent className="p-0 h-full relative">
                {/* Image Container */}
                <div className="relative w-full h-full">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 transition-opacity group-hover:opacity-90" />
                  
                  {/* Floating Elements */}
                  {item.badge && (
                    <Badge className="absolute top-5 left-5 bg-secondary text-secondary-foreground font-bold shadow-lg">
                      {item.badge}
                    </Badge>
                  )}
                  
                  <div className="absolute top-5 right-5 flex flex-col gap-2 translate-x-12 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300">
                    <Button size="icon" variant="secondary" className="rounded-full shadow-lg h-9 w-9">
                      <Heart className="h-4 w-4" />
                    </Button>
                    <Button size="icon" variant="secondary" className="rounded-full shadow-lg h-9 w-9">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>

                  {/* Content Overlay */}
                  <div className="absolute inset-x-0 bottom-0 p-6 flex flex-col justify-end">
                    <div className="space-y-2">
                       <div className="flex items-center justify-between">
                         <h3 className="text-white text-xl font-bold tracking-tight">{item.title}</h3>
                         <span className="text-secondary font-bold text-sm">{item.price}</span>
                       </div>
                       
                       <p className="text-white/70 text-sm line-clamp-1">{item.description} &bull; {item.items}</p>
                       
                       <Button variant="link" className="p-0 h-auto text-secondary font-bold text-xs uppercase tracking-widest opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                         Explore Now <ArrowRight className="ml-2 h-3 w-3" />
                       </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* View All Action */}
        <div className="mt-16 text-center">
          <Button size="lg" variant="outline" asChild className="h-14 px-10 rounded-full border-2 border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground font-bold shadow-xl transition-all active:scale-95 group">
            <Link href="/collections">
              View All Collections
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
