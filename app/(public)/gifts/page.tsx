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
import { MOCK_GIFTS } from "@/constants/gifts";
import { Product } from "@/types/product";

export default function GiftsPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 500 });
  const [sortBy, setSortBy] = useState("featured");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  // Modal state
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);

  const categories = useMemo(() => {
    const cats = ["All", ...new Set(MOCK_GIFTS.map((p) => p.category))];
    return cats;
  }, []);

  const sortOptions = [
    { value: "featured", label: "Featured" },
    { value: "price-low", label: "Price: Low to High" },
    { value: "price-high", label: "Price: High to Low" },
    { value: "newest", label: "Newest First" },
    { value: "popular", label: "Most Popular" },
  ];

  // Filtering and Sorting Logic
  const filteredProducts = useMemo(() => {
    return MOCK_GIFTS.filter((product) => {
      const matchesCategory =
        selectedCategories.length === 0 ||
        selectedCategories.includes(product.category);
      const matchesPrice =
        product.price >= priceRange.min && product.price <= priceRange.max;
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCategory && matchesPrice && matchesSearch;
    }).sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "popular":
          return (b.reviews || 0) - (a.reviews || 0);
        default:
          return 0;
      }
    });
  }, [selectedCategories, priceRange, sortBy, searchQuery]);

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

  const handleQuickView = (id: number) => {
    const product = MOCK_GIFTS.find((p) => p.id === id);
    if (product) {
      setSelectedProduct(product);
      setIsQuickViewOpen(true);
    }
  };

  const handleAddToCart = (id: number, quantity: number = 1) => {
    console.log(`Add to cart: product ${id}, quantity ${quantity}`);
  };

  const handleWishlist = (id: number) => {
    console.log(`Add to wishlist product ${id}`);
  };

  const handleCloseQuickView = () => {
    setIsQuickViewOpen(false);
  };

  // List View Card Component
  const ListViewCard = ({ product }: { product: Product }) => (
    <div className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300">
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 p-4 sm:p-5">
        {/* Image */}
        <div className="relative w-full sm:w-48 lg:w-56 aspect-square sm:aspect-[4/3] overflow-hidden rounded-lg">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-700"
            sizes="(max-width: 640px) 100vw, 200px"
          />
          {product.badge && (
            <div className="absolute top-2 left-2">
              <span className="inline-block px-2.5 py-1 bg-amber-500 text-white text-xs font-semibold rounded-full">
                {product.badge}
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col">
          <div className="flex-1">
            <span className="text-xs font-medium text-amber-600 uppercase tracking-wider">
              {product.category}
            </span>

            <h3 className="text-lg sm:text-xl font-semibold text-slate-900 mt-1 mb-2">
              {product.name}
            </h3>

            <p className="text-sm text-slate-600 mb-4 line-clamp-2">
              {product.description}
            </p>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-slate-900">
              ${product.price}
            </span>

            <div className="flex items-center gap-2">
              <button
                onClick={() => handleWishlist(product.id)}
                className="w-10 h-10 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-full flex items-center justify-center transition"
                aria-label="Add to wishlist"
              >
                <Heart className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleQuickView(product.id)}
                className="w-10 h-10 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-full flex items-center justify-center transition"
                aria-label="Quick view"
              >
                <Eye className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleAddToCart(product.id)}
                className="px-5 py-2.5 bg-amber-500 hover:bg-amber-600 text-white font-medium rounded-lg transition flex items-center gap-2"
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 mb-2">
            Gift Collections
          </h1>
          <p className="text-slate-600 text-sm sm:text-base">
            Discover our curated selection of premium gifts for every occasion
          </p>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <nav className="flex items-center gap-2 text-sm">
          <a
            href="/"
            className="text-slate-500 hover:text-amber-600 transition"
          >
            Home
          </a>
          <span className="text-slate-400">/</span>
          <span className="text-slate-900 font-medium">Gifts</span>
        </nav>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          {/* Search Bar */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
            <input
              type="search"
              placeholder="Search gifts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition"
            />
          </div>

          {/* Toolbar Actions */}
          <div className="flex gap-2 sm:gap-3">
            {/* Mobile Filter Button */}
            <button
              onClick={() => setIsFilterOpen(true)}
              className="lg:hidden flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 rounded-lg text-slate-700 hover:bg-slate-50 transition"
            >
              <Filter className="h-4 w-4" />
              <span className="text-sm">Filter</span>
            </button>

            {/* Sort Dropdown */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none px-4 py-2.5 pr-8 bg-white border border-slate-200 rounded-lg text-sm text-slate-700 focus:outline-none focus:border-amber-500 cursor-pointer"
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
            </div>

            {/* View Toggle */}
            <div className="hidden sm:flex items-center gap-1 p-1 bg-white border border-slate-200 rounded-lg">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded transition ${
                  viewMode === "grid"
                    ? "bg-amber-500 text-white"
                    : "text-slate-500 hover:bg-slate-100"
                }`}
                aria-label="Grid view"
              >
                <Grid3x3 className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded transition ${
                  viewMode === "list"
                    ? "bg-amber-500 text-white"
                    : "text-slate-500 hover:bg-slate-100"
                }`}
                aria-label="List view"
              >
                <List className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Results Count & Active Filters */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <p className="text-sm text-slate-600">
            Showing{" "}
            <span className="font-medium text-slate-900">
              {filteredProducts.length}
            </span>{" "}
            products
          </p>

          {selectedCategories.length > 0 && (
            <div className="flex flex-wrap items-center gap-2">
              {selectedCategories.map((category) => (
                <button
                  key={category}
                  onClick={() => handleCategoryToggle(category)}
                  className="flex items-center gap-1 px-3 py-1 bg-amber-100 text-amber-700 text-xs rounded-full hover:bg-amber-200 transition"
                >
                  {category}
                  <X className="h-3 w-3" />
                </button>
              ))}
              <button
                onClick={() => setSelectedCategories([])}
                className="text-xs text-slate-500 hover:text-slate-700"
              >
                Clear all
              </button>
            </div>
          )}
        </div>

        {/* Main Content Area */}
        <div className="flex gap-6 lg:gap-8">
          {/* Desktop Sidebar Filters */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="bg-white rounded-xl border border-slate-200 p-5 sticky top-24">
              <h3 className="font-semibold text-slate-900 mb-4">Categories</h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <label
                    key={category}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={
                        category === "All"
                          ? selectedCategories.length === 0
                          : selectedCategories.includes(category)
                      }
                      onChange={() => handleCategoryToggle(category)}
                      className="w-4 h-4 text-amber-500 border-slate-300 rounded focus:ring-amber-500"
                    />
                    <span className="text-sm text-slate-700">{category}</span>
                  </label>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t border-slate-200">
                <h3 className="font-semibold text-slate-900 mb-4">
                  Price Range
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      value={priceRange.min}
                      onChange={(e) =>
                        setPriceRange({
                          ...priceRange,
                          min: Number(e.target.value),
                        })
                      }
                      className="w-full px-3 py-2 border border-slate-200 rounded text-sm"
                      placeholder="Min"
                    />
                    <span className="text-slate-400">-</span>
                    <input
                      type="number"
                      value={priceRange.max}
                      onChange={(e) =>
                        setPriceRange({
                          ...priceRange,
                          max: Number(e.target.value),
                        })
                      }
                      className="w-full px-3 py-2 border border-slate-200 rounded text-sm"
                      placeholder="Max"
                    />
                  </div>
                </div>
              </div>

              <button className="w-full mt-6 px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white font-medium rounded-lg transition">
                Apply Filters
              </button>
            </div>
          </aside>

          {/* Product Display */}
          <div className="flex-1">
            {filteredProducts.length > 0 ? (
              viewMode === "grid" ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
                  {filteredProducts.map((product) => (
                    <GiftCard
                      key={product.id}
                      id={product.id}
                      name={product.name}
                      category={product.category}
                      price={product.price}
                      image={product.image}
                      badge={product.badge}
                      onQuickView={handleQuickView}
                      onAddToCart={() => handleAddToCart(product.id)}
                      onWishlist={handleWishlist}
                    />
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredProducts.map((product) => (
                    <ListViewCard key={product.id} product={product} />
                  ))}
                </div>
              )
            ) : (
              <div className="text-center py-20 bg-white rounded-2xl border border-slate-200">
                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8 text-slate-400" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900">
                  No products found
                </h3>
                <p className="text-slate-500">
                  Try adjusting your filters or search query
                </p>
                <button
                  onClick={() => {
                    setSelectedCategories([]);
                    setPriceRange({ min: 0, max: 500 });
                    setSearchQuery("");
                  }}
                  className="mt-6 text-amber-600 font-semibold hover:text-amber-700"
                >
                  Clear all filters
                </button>
              </div>
            )}

            {/* Pagination */}
            {filteredProducts.length > 0 && (
              <div className="mt-8 sm:mt-10 flex items-center justify-center gap-2">
                <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 transition disabled:opacity-50 disabled:cursor-not-allowed">
                  <ChevronDown className="h-4 w-4 rotate-90" />
                </button>

                {[1, 2, 3, 4].map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-10 h-10 flex items-center justify-center rounded-lg text-sm font-medium transition ${
                      currentPage === page
                        ? "bg-amber-500 text-white"
                        : "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    {page}
                  </button>
                ))}

                <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 transition disabled:opacity-50 disabled:cursor-not-allowed">
                  <ChevronDown className="h-4 w-4 -rotate-90" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      <AnimatePresence>
        {isFilterOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-50 lg:hidden"
              onClick={() => setIsFilterOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30 }}
              className="fixed right-0 top-0 bottom-0 w-full max-w-sm bg-white z-50 lg:hidden overflow-y-auto"
            >
              <div className="sticky top-0 bg-white border-b border-slate-200 px-4 py-4 flex items-center justify-between">
                <h2 className="text-lg font-semibold text-slate-900">
                  Filters
                </h2>
                <button
                  onClick={() => setIsFilterOpen(false)}
                  className="p-2 hover:bg-slate-100 rounded-lg transition"
                >
                  <X className="h-5 w-5 text-slate-700" />
                </button>
              </div>

              <div className="p-4 space-y-6">
                <div>
                  <h3 className="font-semibold text-slate-900 mb-3">
                    Categories
                  </h3>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <label
                        key={category}
                        className="flex items-center gap-2 cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={
                            category === "All"
                              ? selectedCategories.length === 0
                              : selectedCategories.includes(category)
                          }
                          onChange={() => handleCategoryToggle(category)}
                          className="w-4 h-4 text-amber-500 border-slate-300 rounded focus:ring-amber-500"
                        />
                        <span className="text-sm text-slate-700">
                          {category}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-slate-900 mb-3">
                    Price Range
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        value={priceRange.min}
                        onChange={(e) =>
                          setPriceRange({
                            ...priceRange,
                            min: Number(e.target.value),
                          })
                        }
                        className="w-full px-3 py-2 border border-slate-200 rounded text-sm"
                        placeholder="Min"
                      />
                      <span className="text-slate-400">-</span>
                      <input
                        type="number"
                        value={priceRange.max}
                        onChange={(e) =>
                          setPriceRange({
                            ...priceRange,
                            max: Number(e.target.value),
                          })
                        }
                        className="w-full px-3 py-2 border border-slate-200 rounded text-sm"
                        placeholder="Max"
                      />
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setIsFilterOpen(false)}
                  className="w-full px-4 py-3 bg-amber-500 hover:bg-amber-600 text-white font-medium rounded-lg transition"
                >
                  Apply Filters
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
          onClose={handleCloseQuickView}
          product={selectedProduct}
          onAddToCart={handleAddToCart}
          onWishlist={handleWishlist}
        />
      )}
    </div>
  );
}
