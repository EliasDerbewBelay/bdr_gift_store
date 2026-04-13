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
} from "lucide-react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import GiftCard from "@/components/ui/GiftCard";
import QuickViewCard from "@/components/ui/QuickViewCard";
import { cn } from "@/lib/utils";

interface GiftsContentProps {
  initialProducts: any[];
  initialCategories: any[];
}

export default function GiftsContent({ initialProducts, initialCategories }: GiftsContentProps) {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });
  const [sortBy, setSortBy] = useState("newest");
  const [searchQuery, setSearchQuery] = useState("");

  // Modal state
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);

  const categories = useMemo(() => {
    return ["All", ...initialCategories.map((c) => c.name)];
  }, [initialCategories]);

  const sortOptions = [
    { value: "newest", label: "Newest First" },
    { value: "price-low", label: "Price: Low to High" },
    { value: "price-high", label: "Price: High to Low" },
    { value: "popular", label: "Featured" },
  ];

  // Filtering and Sorting Logic
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
      // Map to Product type if necessary, or just pass as is
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

  const handleAddToCart = (id: string) => {
    console.log(`Add to cart: product ${id}`);
  };

  const handleWishlist = (id: string) => {
    console.log(`Add to wishlist product ${id}`);
  };

  // List View Card Component
  const ListViewCard = ({ product }: { product: any }) => (
    <div className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 border border-slate-100">
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 p-4 sm:p-5">
        {/* Image */}
        <div className="relative w-full sm:w-48 lg:w-56 aspect-square sm:aspect-[4/3] overflow-hidden rounded-lg">
          <Image
            src={product.images[0]?.url || "https://placehold.co/400x400"}
            alt={product.title}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-700"
            sizes="(max-width: 640px) 100vw, 200px"
          />
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col text-left">
          <div className="flex-1">
            <span className="text-xs font-semibold text-amber-600 uppercase tracking-wider">
              {product.category.name}
            </span>

            <h3 className="text-lg sm:text-xl font-bold text-slate-900 mt-1 mb-2">
              {product.title}
            </h3>

            <p className="text-sm text-slate-600 mb-4 line-clamp-2 leading-relaxed">
              {product.description}
            </p>
          </div>

          <div className="flex items-center justify-between mt-auto">
            <span className="text-2xl font-black text-slate-900">
              {product.price ? `$${product.price}` : "FREE"}
            </span>

            <div className="flex items-center gap-2">
              <button
                onClick={() => handleWishlist(product.id)}
                className="w-10 h-10 bg-slate-50 hover:bg-slate-100 text-slate-700 rounded-full flex items-center justify-center transition border border-slate-100"
              >
                <Heart className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleQuickView(product.id)}
                className="w-10 h-10 bg-slate-50 hover:bg-slate-100 text-slate-700 rounded-full flex items-center justify-center transition border border-slate-100"
              >
                <Eye className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleAddToCart(product.id)}
                className="px-5 py-2.5 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-xl transition flex items-center gap-2 shadow-lg shadow-amber-100"
              >
                <ShoppingCart className="w-4 h-4" />
                <span className="hidden sm:inline">Add to Cart</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Page Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 mb-2 tracking-tight">
            Gift Collections
          </h1>
          <p className="text-slate-500 text-sm sm:text-base font-medium">
            Discover our curated selection of premium gifts for every occasion
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          {/* Search Bar */}
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
            <input
              type="search"
              placeholder="Search gifts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 bg-white border border-slate-200 rounded-2xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-4 focus:ring-amber-500/10 focus:border-amber-500 transition-all font-medium"
            />
          </div>

          {/* Toolbar Actions */}
          <div className="flex gap-3">
            <button
              onClick={() => setIsFilterOpen(true)}
              className="lg:hidden flex items-center gap-2 px-5 py-3.5 bg-white border border-slate-200 rounded-2xl text-slate-700 font-bold hover:bg-slate-50 transition shadow-xs"
            >
              <Filter className="h-4 w-4" />
              <span className="text-sm">Filters</span>
            </button>

            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none px-5 py-3.5 pr-10 bg-white border border-slate-200 rounded-2xl text-sm font-bold text-slate-700 focus:outline-none focus:border-amber-500 cursor-pointer shadow-xs"
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
            </div>

            <div className="hidden sm:flex items-center gap-1 p-1.5 bg-white border border-slate-200 rounded-2xl shadow-xs">
              <button
                onClick={() => setViewMode("grid")}
                className={cn(
                  "p-2 rounded-xl transition-all",
                  viewMode === "grid"
                    ? "bg-amber-500 text-white shadow-md shadow-amber-200"
                    : "text-slate-400 hover:text-slate-600 hover:bg-slate-50"
                )}
                aria-label="Grid view"
              >
                <Grid3x3 className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={cn(
                  "p-2 rounded-xl transition-all",
                  viewMode === "list"
                    ? "bg-amber-500 text-white shadow-md shadow-amber-200"
                    : "text-slate-400 hover:text-slate-600 hover:bg-slate-50"
                )}
                aria-label="List view"
              >
                <List className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Results Area */}
        <div className="flex gap-8">
          {/* Desktop Filters Sidebar */}
          <aside className="hidden lg:block w-72 flex-shrink-0">
            <div className="bg-white rounded-2xl border border-slate-200 p-6 sticky top-24 shadow-xs space-y-8 text-left">
              <div>
                <h3 className="text-base font-bold text-slate-900 mb-5">Categories</h3>
                <div className="space-y-3">
                  {categories.map((category) => (
                    <label
                      key={category}
                      className="flex items-center gap-3 cursor-pointer group"
                    >
                      <input
                        type="checkbox"
                        checked={
                          category === "All"
                            ? selectedCategories.length === 0
                            : selectedCategories.includes(category)
                        }
                        onChange={() => handleCategoryToggle(category)}
                        className="w-5 h-5 text-amber-500 border-slate-300 rounded-lg focus:ring-amber-500 focus:ring-offset-0 cursor-pointer"
                      />
                      <span className={cn(
                        "text-sm font-medium transition-colors",
                        (category === "All" ? selectedCategories.length === 0 : selectedCategories.includes(category))
                          ? "text-amber-600 font-bold"
                          : "text-slate-600 group-hover:text-slate-900"
                      )}>
                        {category}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="pt-6 border-t border-slate-100">
                <h3 className="text-base font-bold text-slate-900 mb-5">
                  Price Range
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="relative flex-1">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs">$</span>
                      <input
                        type="number"
                        value={priceRange.min}
                        onChange={(e) =>
                          setPriceRange({
                            ...priceRange,
                            min: Number(e.target.value),
                          })
                        }
                        className="w-full pl-6 pr-3 py-2.5 bg-slate-50 border-none rounded-xl text-xs font-bold focus:ring-2 focus:ring-amber-500/20 transition"
                        placeholder="Min"
                      />
                    </div>
                    <span className="text-slate-300">-</span>
                    <div className="relative flex-1">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs">$</span>
                      <input
                        type="number"
                        value={priceRange.max}
                        onChange={(e) =>
                          setPriceRange({
                            ...priceRange,
                            max: Number(e.target.value),
                          })
                        }
                        className="w-full pl-6 pr-3 py-2.5 bg-slate-50 border-none rounded-xl text-xs font-bold focus:ring-2 focus:ring-amber-500/20 transition"
                        placeholder="Max"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <button 
                onClick={() => {
                   // No-op for now as it's state-synced, but good for UX
                }}
                className="w-full py-3.5 bg-slate-900 text-white font-bold rounded-2xl hover:bg-slate-800 transition active:scale-95 shadow-lg shadow-slate-200"
              >
                Apply Filters
              </button>
            </div>
          </aside>

          {/* Product Grid/List */}
          <div className="flex-1">
            {filteredProducts.length > 0 ? (
              viewMode === "grid" ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredProducts.map((product) => (
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
              ) : (
                <div className="space-y-6">
                  {filteredProducts.map((product) => (
                    <ListViewCard key={product.id} product={product} />
                  ))}
                </div>
              )
            ) : (
              <div className="text-center py-32 bg-white rounded-3xl border border-dashed border-slate-200">
                <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Search className="w-10 h-10 text-slate-300" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  No products found
                </h3>
                <p className="text-slate-500 max-w-xs mx-auto mb-8">
                  We couldn't find any products matching your current filters. Try adjusting them!
                </p>
                <button
                  onClick={() => {
                    setSelectedCategories([]);
                    setPriceRange({ min: 0, max: 1000 });
                    setSearchQuery("");
                  }}
                  className="px-8 py-3 bg-amber-500 text-white font-bold rounded-2xl hover:bg-amber-600 transition shadow-lg shadow-amber-100"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filters Modal */}
      <AnimatePresence>
        {isFilterOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 lg:hidden"
              onClick={() => setIsFilterOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30 }}
              className="fixed right-0 top-0 bottom-0 w-full max-w-sm bg-white z-50 lg:hidden flex flex-col"
            >
              <div className="px-6 py-6 border-b border-slate-100 flex items-center justify-between">
                <h2 className="text-xl font-black text-slate-900 tracking-tight">
                  Filters
                </h2>
                <button
                  onClick={() => setIsFilterOpen(false)}
                  className="p-2.5 hover:bg-slate-50 rounded-xl transition border border-slate-50"
                >
                  <X className="h-5 w-5 text-slate-900" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-10 text-left">
                <div>
                  <h3 className="text-base font-bold text-slate-900 mb-5">Categories</h3>
                  <div className="space-y-4">
                    {categories.map((category) => (
                      <label
                        key={category}
                        className="flex items-center gap-3 cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={
                            category === "All"
                              ? selectedCategories.length === 0
                              : selectedCategories.includes(category)
                          }
                          onChange={() => handleCategoryToggle(category)}
                          className="w-6 h-6 text-amber-500 border-slate-300 rounded-lg focus:ring-amber-500"
                        />
                        <span className="text-base font-medium text-slate-700">
                          {category}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-base font-bold text-slate-900 mb-5">Price Range</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">$</span>
                      <input
                        type="number"
                        value={priceRange.min}
                        onChange={(e) =>
                          setPriceRange({
                            ...priceRange,
                            min: Number(e.target.value),
                          })
                        }
                        className="w-full pl-8 pr-4 py-3.5 bg-slate-50 border-none rounded-2xl text-sm font-bold"
                        placeholder="Min"
                      />
                    </div>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">$</span>
                      <input
                        type="number"
                        value={priceRange.max}
                        onChange={(e) =>
                          setPriceRange({
                            ...priceRange,
                            max: Number(e.target.value),
                          })
                        }
                        className="w-full pl-8 pr-4 py-3.5 bg-slate-50 border-none rounded-2xl text-sm font-bold"
                        placeholder="Max"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 border-t border-slate-100 bg-slate-50/50">
                <button
                  onClick={() => setIsFilterOpen(false)}
                  className="w-full px-4 py-4 bg-amber-500 hover:bg-amber-600 text-white font-black rounded-2xl transition shadow-lg shadow-amber-100"
                >
                  Show Results
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Quick View Modal */}
      {selectedProduct && (
        <QuickViewCard
          isOpen={isQuickViewOpen}
          onClose={() => setIsQuickViewOpen(false)}
          product={selectedProduct}
          onAddToCart={(product, qty) => handleAddToCart(product.id)}
          onWishlist={(id) => handleWishlist(id)}
        />
      )}
    </div>
  );
}
