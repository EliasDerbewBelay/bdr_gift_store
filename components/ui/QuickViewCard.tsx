"use client";
import { useState } from "react";
import Image from "next/image";
import {
  X,
  Heart,
  ShoppingCart,
  Minus,
  Plus,
  Star,
  Truck,
  Shield,
  Gift,
  Clock,
  Share2,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface QuickViewCardProps {
  isOpen: boolean;
  onClose: () => void;
  product: {
    id: number;
    name: string;
    category: string;
    price: number;
    originalPrice?: number;
    image: string;
    badge?: string;
    description: string;
    rating?: number;
    reviews?: number;
    sku?: string;
    tags?: string[];
    inStock?: boolean;
    deliveryInfo?: string;
    features?: string[];
    images?: string[];
  };
  onAddToCart?: (id: number, quantity: number) => void;
  onWishlist?: (id: number) => void;
}

export default function QuickViewCard({
  isOpen,
  onClose,
  product,
  onAddToCart,
  onWishlist,
}: QuickViewCardProps) {
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const productImages = product.images || [product.image];

  const handleQuantityChange = (delta: number) => {
    setQuantity((prev) => Math.max(1, prev + delta));
  };

  const handleWishlist = () => {
    setIsWishlisted(!isWishlisted);
    if (onWishlist) {
      onWishlist(product.id);
    }
  };

  const handleAddToCart = () => {
    if (onAddToCart) {
      onAddToCart(product.id, quantity);
      onClose();
    }
  };

  const discount = product.originalPrice
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100,
      )
    : 0;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed inset-4 sm:inset-6 lg:inset-8 z-50 flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full max-w-6xl max-h-full overflow-y-auto bg-white rounded-2xl shadow-2xl">
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 z-10 p-2 bg-white/90 hover:bg-white rounded-full shadow-lg transition"
                aria-label="Close quick view"
              >
                <X className="w-5 h-5 text-slate-700" />
              </button>

              <div className="p-6 sm:p-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                  {/* Left Column - Images */}
                  <div className="space-y-4">
                    {/* Main Image */}
                    <div className="relative aspect-square rounded-2xl overflow-hidden bg-slate-100">
                      <Image
                        src={productImages[selectedImage]}
                        alt={product.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 1024px) 100vw, 600px"
                        priority
                      />

                      {/* Badge */}
                      {product.badge && (
                        <div className="absolute top-4 left-4">
                          <span className="inline-block px-3 py-1.5 bg-amber-500 text-white text-xs font-semibold rounded-full shadow-lg">
                            {product.badge}
                          </span>
                        </div>
                      )}

                      {/* Discount Badge */}
                      {discount > 0 && (
                        <div className="absolute top-4 right-4">
                          <span className="inline-block px-3 py-1.5 bg-red-500 text-white text-xs font-bold rounded-full shadow-lg">
                            -{discount}%
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Thumbnail Gallery */}
                    {productImages.length > 1 && (
                      <div className="flex gap-3 overflow-x-auto pb-2">
                        {productImages.map((img, index) => (
                          <button
                            key={index}
                            onClick={() => setSelectedImage(index)}
                            className={`relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 transition ${
                              selectedImage === index
                                ? "ring-2 ring-amber-500 ring-offset-2"
                                : "opacity-70 hover:opacity-100"
                            }`}
                          >
                            <Image
                              src={img}
                              alt={`${product.name} - view ${index + 1}`}
                              fill
                              className="object-cover"
                            />
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Right Column - Product Details */}
                  <div className="space-y-6">
                    {/* Category & SKU */}
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-amber-600 uppercase tracking-wider">
                        {product.category}
                      </span>
                      {product.sku && (
                        <span className="text-xs text-slate-400">
                          SKU: {product.sku}
                        </span>
                      )}
                    </div>

                    {/* Product Name */}
                    <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
                      {product.name}
                    </h2>

                    {/* Rating */}
                    {product.rating && (
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-0.5">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-5 h-5 ${
                                i < Math.floor(product.rating!)
                                  ? "text-amber-500 fill-amber-500"
                                  : "text-slate-300"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-sm font-medium text-slate-700">
                          {product.rating} / 5.0
                        </span>
                        {product.reviews && (
                          <span className="text-sm text-slate-400">
                            ({product.reviews} reviews)
                          </span>
                        )}
                      </div>
                    )}

                    {/* Price */}
                    <div className="flex items-baseline gap-3">
                      <span className="text-3xl font-bold text-slate-900">
                        ${product.price}
                      </span>
                      {product.originalPrice && (
                        <span className="text-lg text-slate-400 line-through">
                          ${product.originalPrice}
                        </span>
                      )}
                    </div>

                    {/* Description */}
                    <p className="text-slate-600 leading-relaxed">
                      {product.description}
                    </p>

                    {/* Features */}
                    {product.features && product.features.length > 0 && (
                      <div className="space-y-2">
                        <h4 className="text-sm font-semibold text-slate-900">
                          Features:
                        </h4>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {product.features.map((feature, index) => (
                            <li
                              key={index}
                              className="flex items-center gap-2 text-sm text-slate-600"
                            >
                              <div className="w-1.5 h-1.5 bg-amber-500 rounded-full" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Stock Status */}
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-2 h-2 rounded-full ${
                          product.inStock !== false
                            ? "bg-green-500"
                            : "bg-red-500"
                        }`}
                      />
                      <span
                        className={`text-sm font-medium ${
                          product.inStock !== false
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {product.inStock !== false
                          ? "In Stock"
                          : "Out of Stock"}
                      </span>
                    </div>

                    {/* Quantity Selector */}
                    <div className="space-y-3">
                      <h4 className="text-sm font-semibold text-slate-900">
                        Quantity:
                      </h4>
                      <div className="flex items-center gap-3">
                        <div className="flex items-center border border-slate-200 rounded-lg">
                          <button
                            onClick={() => handleQuantityChange(-1)}
                            className="p-3 hover:bg-slate-50 transition rounded-l-lg"
                            disabled={quantity <= 1}
                          >
                            <Minus className="w-4 h-4 text-slate-600" />
                          </button>
                          <span className="w-12 text-center font-medium text-slate-900">
                            {quantity}
                          </span>
                          <button
                            onClick={() => handleQuantityChange(1)}
                            className="p-3 hover:bg-slate-50 transition rounded-r-lg"
                          >
                            <Plus className="w-4 h-4 text-slate-600" />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3 pt-4">
                      <button
                        onClick={handleAddToCart}
                        disabled={product.inStock === false}
                        className="flex-1 flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-600 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-semibold px-6 py-3.5 rounded-full transition shadow-lg hover:shadow-xl"
                      >
                        <ShoppingCart className="w-5 h-5" />
                        Add to Cart
                      </button>

                      <button
                        onClick={handleWishlist}
                        className={`flex items-center justify-center gap-2 px-6 py-3.5 rounded-full font-medium transition border-2 ${
                          isWishlisted
                            ? "bg-amber-500 border-amber-500 text-white"
                            : "border-slate-200 text-slate-700 hover:border-amber-500 hover:bg-amber-50"
                        }`}
                      >
                        <Heart
                          className={`w-5 h-5 ${isWishlisted ? "fill-white" : ""}`}
                        />
                        {isWishlisted ? "Wishlisted" : "Add to Wishlist"}
                      </button>
                    </div>

                    {/* Delivery & Guarantee */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t border-slate-200">
                      <div className="flex items-start gap-3">
                        <Truck className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium text-slate-900">
                            Free Delivery
                          </p>
                          <p className="text-xs text-slate-500">
                            {product.deliveryInfo || "3-5 business days"}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <Shield className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium text-slate-900">
                            Satisfaction Guarantee
                          </p>
                          <p className="text-xs text-slate-500">
                            30-day returns
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <Gift className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium text-slate-900">
                            Gift Wrapping
                          </p>
                          <p className="text-xs text-slate-500">
                            Available at checkout
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <Clock className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium text-slate-900">
                            Same Day Dispatch
                          </p>
                          <p className="text-xs text-slate-500">
                            Order within 2 hours
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Tags */}
                    {product.tags && product.tags.length > 0 && (
                      <div className="pt-4">
                        <p className="text-xs text-slate-500 mb-2">Tags:</p>
                        <div className="flex flex-wrap gap-2">
                          {product.tags.map((tag, index) => (
                            <span
                              key={index}
                              className="px-3 py-1 bg-slate-100 text-slate-600 text-xs rounded-full"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Share Button */}
                    <button className="flex items-center gap-2 text-sm text-slate-500 hover:text-amber-600 transition">
                      <Share2 className="w-4 h-4" />
                      Share this product
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
