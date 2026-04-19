"use client";

import { useState, useMemo } from "react";
import {
  Search,
  ChevronDown,
  Grid3x3,
  List,
  X,
  Filter,
  Heart,
  ShoppingCart,
  Eye,
  SlidersHorizontal,
} from "lucide-react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import GiftCard from "@/components/ui/GiftCard";
import QuickViewCard from "@/components/ui/QuickViewCard";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle, 
  SheetTrigger,
  SheetFooter 
} from "@/components/ui/sheet";

interface GiftsContentProps {
  initialProducts: any[];
  initialCategories: any[];
}

export default function GiftsContent({ initialProducts, initialCategories }: GiftsContentProps) {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 5000 });
  const [sortBy, setSortBy] = useState("newest");
  const [searchQuery, setSearchQuery] = useState("");

  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);

  const categoriesList = useMemo(() => {
    return ["All", ...initialCategories.map((c) => c.name)];
  }, [initialCategories]);

  const sortOptions = [
    { value: "newest", label: "Newest Arrivals" },
    { value: "price-low", label: "Price: Low to High" },
    { value: "price-high", label: "Price: High to Low" },
    { value: "popular", label: "Highly Rated" },
  ];

  const filteredProducts = useMemo(() => {
    return initialProducts.filter((product) => {
      const matchesCategory =
        selectedCategories.length === 0 ||
        selectedCategories.includes(product.category.name);
      
      const price = product.price || 0;
      const matchesPrice = price >= priceRange.min && price <= priceRange.max;
      
      const matchesSearch =
        product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCategory && matchesPrice && matchesSearch;
    }).sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return (a.price || 0) - (b.price || 0);
        case "price-high":
          return (b.price || 0) - (a.price || 0);
        case "newest":
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        default:
          return 0;
      }
    });
  }, [initialProducts, selectedCategories, priceRange, sortBy, searchQuery]);

  const handleCategoryToggle = (category: string) => {
    if (category === "All") {
      setSelectedCategories([]);
    } else {
      setSelectedCategories((prev) =>
        prev.includes(category)
          ? prev.filter((c) => c !== category)
          : [...prev, category],
      );
    }
  };

  const handleQuickView = (id: string) => {
    const product = initialProducts.find((p) => p.id === id);
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

  const handleClearFilters = () => {
    setSelectedCategories([]);
    setPriceRange({ min: 0, max: 5000 });
    setSearchQuery("");
  };

  // Modern List View Card
  const ListViewCard = ({ product }: { product: any }) => (
    <Card className="group overflow-hidden border-slate-200/60 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-500 rounded-[2rem] bg-white border-2 hover:border-primary/10">
      <CardContent className="p-0">
        <div className="flex flex-col md:flex-row gap-6 p-6">
          <div className="relative w-full md:w-64 lg:w-72 aspect-square overflow-hidden rounded-2xl shrink-0 shadow-lg">
            <Image
              src={product.images[0]?.url || "https://placehold.co/400x400"}
              alt={product.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
              sizes="(max-width: 640px) 100vw, 300px"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
          </div>

          <div className="flex-1 flex flex-col justify-between py-2 text-left">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="h-1 w-6 bg-secondary rounded-full" />
                <Badge variant="outline" className="text-[10px] font-bold text-slate-400 uppercase tracking-widest border-slate-100 bg-slate-50/50">
                  {product.category.name}
                </Badge>
              </div>

              <h3 className="text-2xl font-black text-slate-900 tracking-tight leading-tight group-hover:text-primary transition-colors">
                {product.title}
              </h3>

              <p className="text-slate-500 font-medium text-sm leading-relaxed max-w-xl">
                {product.description}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pt-6 border-t border-slate-50 mt-6">
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">Premium Edition</span>
                <span className="text-3xl font-black text-slate-900 tracking-tighter">
                  ETB {product.price?.toLocaleString() || "0"}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <Button variant="outline" size="icon" className="h-12 w-12 rounded-2xl transition hover:bg-slate-50" onClick={() => console.log('wishlist')}>
                  <Heart className="h-5 w-5" />
                </Button>
                <Button variant="outline" size="icon" className="h-12 w-12 rounded-2xl transition hover:bg-slate-50" onClick={() => handleQuickView(product.id)}>
                  <Eye className="h-5 w-5" />
                </Button>
                <Button className="h-12 px-8 rounded-2xl font-black uppercase text-xs tracking-widest gap-2 shadow-lg shadow-primary/10 transition-all active:scale-95" onClick={() => console.log('add to cart')}>
                  <ShoppingCart className="h-4 w-4" />
                  Add to Cart
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-slate-50/50 pb-20">
      {/* Premium Header */}
      <div className="bg-white border-b border-slate-200/60 sticky top-0 z-40 backdrop-blur-xl bg-white/80">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-secondary animate-pulse" />
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">The Artisan Collection</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                Gift Collections
              </h1>
            </div>
            
            {/* Desktop Search Integration */}
            <div className="relative w-full md:max-w-md group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-primary transition-colors" />
              <Input
                type="search"
                placeholder="Find the perfect gift..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-12 pl-12 pr-4 bg-slate-50/50 border-slate-200/60 rounded-2xl font-medium focus-visible:ring-primary/20 focus-visible:border-primary transition-all shadow-xs"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-10">
        {/* Modern Toolbar */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-10 pb-6 border-b border-slate-200/60">
          <div className="flex flex-wrap items-center gap-4">
             {/* Mobile Filter Trigger */}
             <Sheet>
               <SheetTrigger asChild>
                 <Button variant="outline" className="lg:hidden h-11 rounded-xl px-5 gap-2 border-slate-200 font-bold">
                   <Filter className="h-4 w-4" />
                   Filters
                 </Button>
               </SheetTrigger>
               <SheetContent side="right" className="w-full sm:max-w-md p-0 flex flex-col">
                 <SheetHeader className="p-8 border-b border-slate-100">
                    <SheetTitle className="text-2xl font-black tracking-tight">Filters</SheetTitle>
                 </SheetHeader>
                 <div className="flex-1 overflow-y-auto p-8 space-y-10 text-left">
                    <div className="space-y-6">
                      <h4 className="text-xs font-black uppercase tracking-widest text-slate-400">Categories</h4>
                      <div className="grid grid-cols-1 gap-4">
                        {categoriesList.map(cat => (
                          <div key={cat} className="flex items-center space-x-3">
                             <Checkbox 
                                id={`mob-${cat}`} 
                                checked={cat === "All" ? selectedCategories.length === 0 : selectedCategories.includes(cat)}
                                onCheckedChange={() => handleCategoryToggle(cat)}
                             />
                             <label htmlFor={`mob-${cat}`} className="text-base font-bold text-slate-700 cursor-pointer">{cat}</label>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <Separator className="bg-slate-100" />
                    
                    <div className="space-y-6">
                      <h4 className="text-xs font-black uppercase tracking-widest text-slate-400">Price Range (ETB)</h4>
                      <div className="flex items-center gap-4">
                        <Input 
                          type="number" 
                          value={priceRange.min} 
                          onChange={e => setPriceRange({...priceRange, min: Number(e.target.value)})}
                          className="h-12 rounded-xl border-slate-200 font-bold"
                          placeholder="Min"
                        />
                        <span className="text-slate-300 font-bold">-</span>
                        <Input 
                          type="number" 
                          value={priceRange.max} 
                          onChange={e => setPriceRange({...priceRange, max: Number(e.target.value)})}
                          className="h-12 rounded-xl border-slate-200 font-bold"
                          placeholder="Max"
                        />
                      </div>
                    </div>
                 </div>
                 <SheetFooter className="p-8 bg-slate-50 border-t border-slate-200">
                    <Button className="w-full h-14 rounded-2xl font-black uppercase tracking-widest" onClick={() => setIsFilterOpen(false)}>Show {filteredProducts.length} Results</Button>
                 </SheetFooter>
               </SheetContent>
             </Sheet>

             <div className="flex items-center gap-2">
               <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 mr-2">Sort By</span>
               <Select value={sortBy} onValueChange={setSortBy}>
                 <SelectTrigger className="h-11 w-[180px] rounded-xl border-slate-200/60 font-bold bg-white focus:ring-primary/20">
                   <SelectValue placeholder="Sort by" />
                 </SelectTrigger>
                 <SelectContent className="rounded-xl border-slate-200 shadow-xl">
                    {sortOptions.map(opt => (
                      <SelectItem key={opt.value} value={opt.value} className="font-medium p-3">{opt.label}</SelectItem>
                    ))}
                 </SelectContent>
               </Select>
             </div>
          </div>

          <div className="flex items-center gap-4">
             <div className="hidden sm:flex items-center p-1 bg-white border border-slate-200/60 rounded-xl shadow-xs">
                <Button 
                  variant={viewMode === "grid" ? "secondary" : "ghost"} 
                  size="icon" 
                  className={cn("h-9 w-9 rounded-lg transition-all", viewMode === "grid" ? "bg-primary text-white hover:bg-primary shadow-sm" : "text-slate-400")}
                  onClick={() => setViewMode("grid")}
                >
                  <Grid3x3 className="h-4 w-4" />
                </Button>
                <Button 
                  variant={viewMode === "list" ? "secondary" : "ghost"} 
                  size="icon" 
                   className={cn("h-9 w-9 rounded-lg transition-all", viewMode === "list" ? "bg-primary text-white hover:bg-primary shadow-sm" : "text-slate-400")}
                  onClick={() => setViewMode("list")}
                >
                  <List className="h-4 w-4" />
                </Button>
             </div>
             
             <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 bg-white px-4 py-3 rounded-xl border border-slate-200/60 shadow-xs">
                Showing <span className="text-slate-900">{filteredProducts.length}</span> Results
             </div>
          </div>
        </div>

        <div className="flex gap-10">
          {/* Detailed Desktop Sidebar */}
          <aside className="hidden lg:block w-72 shrink-0 space-y-10 text-left">
            <div className="space-y-8 sticky top-36">
              <div className="space-y-6">
                 <div className="flex items-center justify-between">
                    <h3 className="text-xs font-black uppercase tracking-widest text-slate-400">Categories</h3>
                    {(selectedCategories.length > 0) && (
                      <Button variant="link" className="p-0 h-auto text-[10px] font-bold text-secondary uppercase tracking-widest" onClick={() => setSelectedCategories([])}>Clear</Button>
                    )}
                 </div>
                 <div className="grid grid-cols-1 gap-4">
                    {categoriesList.map(cat => (
                      <div key={cat} className="flex items-center space-x-3 group">
                         <Checkbox 
                           id={`desk-${cat}`} 
                           checked={cat === "All" ? selectedCategories.length === 0 : selectedCategories.includes(cat)}
                           onCheckedChange={() => handleCategoryToggle(cat)}
                           className="data-[state=checked]:bg-secondary data-[state=checked]:border-secondary"
                         />
                         <label htmlFor={`desk-${cat}`} className={cn("text-sm font-bold transition-colors cursor-pointer", (cat === "All" ? selectedCategories.length === 0 : selectedCategories.includes(cat)) ? "text-slate-900" : "text-slate-400 group-hover:text-slate-600")}>{cat}</label>
                      </div>
                    ))}
                 </div>
              </div>
              
              <Separator className="bg-slate-200/60" />
              
              <div className="space-y-6">
                 <h3 className="text-xs font-black uppercase tracking-widest text-slate-400">Price Filtering</h3>
                 <div className="space-y-4">
                    <div className="flex items-center gap-3">
                       <Input 
                         type="number" 
                         value={priceRange.min} 
                         onChange={e => setPriceRange({...priceRange, min: Number(e.target.value)})}
                         className="h-11 rounded-xl bg-white border-slate-200 text-xs font-bold focus-visible:ring-primary/10"
                         placeholder="Min"
                       />
                       <span className="text-slate-300 font-black">-</span>
                       <Input 
                         type="number" 
                         value={priceRange.max} 
                         onChange={e => setPriceRange({...priceRange, max: Number(e.target.value)})}
                         className="h-11 rounded-xl bg-white border-slate-200 text-xs font-bold focus-visible:ring-primary/10"
                         placeholder="Max"
                       />
                    </div>
                 </div>
              </div>

              <div className="pt-4">
                 <Button 
                   className="w-full h-14 rounded-2xl font-black uppercase tracking-widest shadow-xl shadow-primary/10 transition-all hover:translate-y-[-2px] active:translate-y-0"
                   onClick={handleClearFilters}
                   variant="outline"
                 >
                    Reset All Filters
                 </Button>
              </div>
            </div>
          </aside>

          {/* Dynamic Content Feed */}
          <div className="flex-1">
            <AnimatePresence mode="popLayout">
              {filteredProducts.length > 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className={cn(
                    "transition-all duration-500",
                    viewMode === "grid" 
                      ? "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8" 
                      : "space-y-8"
                  )}
                >
                  {filteredProducts.map((product) => (
                    viewMode === "grid" ? (
                      <GiftCard
                        key={product.id}
                        id={product.id}
                        name={product.title}
                        category={product.category.name}
                        price={product.price || 0}
                        image={product.images[0]?.url || "https://placehold.co/400x400"}
                        onQuickView={() => handleQuickView(product.id)}
                        onAddToCart={() => console.log('cart')}
                        onWishlist={() => console.log('wishlist')}
                      />
                    ) : (
                      <ListViewCard key={product.id} product={product} />
                    )
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-32 bg-white rounded-[3rem] border-2 border-dashed border-slate-200 space-y-8"
                >
                  <div className="h-24 w-24 rounded-[2rem] bg-slate-50 flex items-center justify-center text-slate-200">
                    <SlidersHorizontal className="h-12 w-12" />
                  </div>
                  <div className="text-center space-y-2">
                    <h3 className="text-2xl font-black text-slate-900 tracking-tight">No Matches Found</h3>
                    <p className="text-slate-500 font-medium max-w-sm mx-auto">
                      We couldn't find any gifts matching your current selection. 
                      Try expanding your filters or search terms.
                    </p>
                  </div>
                  <Button 
                    className="h-14 px-10 rounded-2xl font-black uppercase tracking-widest shadow-xl shadow-primary/10"
                    onClick={handleClearFilters}
                  >
                    Clear All Selection
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Modernized Quick View */}
      {selectedProduct && (
        <QuickViewCard
          isOpen={isQuickViewOpen}
          onClose={() => setIsQuickViewOpen(false)}
          product={selectedProduct}
          onAddToCart={(product, qty) => console.log('cart')}
          onWishlist={(id) => console.log('wishlist')}
        />
      )}
    </div>
  );
}
