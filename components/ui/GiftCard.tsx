"use client";
import Image from "next/image";
import { Heart, ShoppingCart, Eye } from "lucide-react";
import { useAuthGuard } from "@/hooks/useAuthGuard";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

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
    if (onQuickView) onQuickView(id);
  };

  const handleAddToCart = () => {
    if (onAddToCart) authenticatedAction(() => onAddToCart(id));
  };

  const handleWishlist = () => {
    if (onWishlist) authenticatedAction(() => onWishlist(id));
  };

  return (
    <Card className="group overflow-hidden border-slate-200/50 shadow-sm hover:shadow-2xl hover:shadow-slate-200/50 transition-all duration-500 rounded-3xl bg-white border-2 hover:border-secondary/20">
      <CardContent className="p-0 relative aspect-square overflow-hidden">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=2070&auto=format&fit=crop";
          }}
        />

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-500" />

        {/* Status Badge */}
        {badge && (
          <Badge className="absolute top-4 left-4 bg-secondary text-secondary-foreground font-bold shadow-lg uppercase tracking-wider text-[10px]">
            {badge}
          </Badge>
        )}

        {/* Actions */}
        <div className="absolute top-4 right-4 flex flex-col gap-2 translate-x-12 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300">
          <Button 
            size="icon" 
            variant="secondary" 
            className="rounded-full shadow-lg h-9 w-9 hover:bg-secondary hover:text-secondary-foreground transition-colors"
            onClick={handleWishlist}
          >
            <Heart className="h-4 w-4" />
          </Button>
        </div>

        <div className="absolute inset-x-4 bottom-4 translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
          <Button 
            variant="secondary" 
            className="w-full bg-white/95 backdrop-blur-md font-bold text-xs uppercase tracking-widest h-10 rounded-xl shadow-lg border-none"
            onClick={handleQuickView}
          >
            <Eye className="mr-2 h-4 w-4" />
            Quick View
          </Button>
        </div>
      </CardContent>

      <CardContent className="p-5 space-y-3">
        {/* Category Label */}
        <div className="flex items-center gap-2">
           <div className="h-1 w-4 bg-secondary rounded-full" />
           <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{category}</span>
        </div>

        {/* Product Identity */}
        <h3 className="text-slate-900 font-bold text-base line-clamp-2 leading-tight min-h-[2.5rem] group-hover:text-primary transition-colors">
          {name}
        </h3>

        {/* Commercial Section */}
        <div className="pt-2 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">Price</span>
            <span className="text-xl font-black text-slate-900 tracking-tight">
              ETB {price.toLocaleString()}
            </span>
          </div>

          <Button 
            size="icon" 
            className="h-11 w-11 rounded-2xl shadow-lg shadow-primary/10 hover:shadow-primary/20 transition-all active:scale-90"
            onClick={handleAddToCart}
          >
            <ShoppingCart className="h-5 w-5" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
