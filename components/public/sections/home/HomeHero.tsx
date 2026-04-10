"use client";

import Image from "next/image";
import { ArrowRight,  Sparkles, } from "lucide-react";
import HeroImage from "@/public/background/Hero-background.jpg";

export default function HomeHero() {
  return (
    <section className="relative w-full min-h-screen overflow-hidden">
      {/* Single Background Image */}
      <div className="absolute inset-0">
        <Image
          src={HeroImage}
          alt="Luxury gift box with ribbon"
          fill
          className="object-cover scale-105 animate-subtle-zoom"
          priority
          sizes="100vw"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />

        {/* Radial Glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,black_100%)] opacity-40" />
      </div>

      {/* Animated Border Lines */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/50 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/50 to-transparent" />
        <div className="absolute top-0 bottom-0 left-0 w-px bg-gradient-to-b from-transparent via-amber-500/50 to-transparent" />
        <div className="absolute top-0 bottom-0 right-0 w-px bg-gradient-to-b from-transparent via-amber-500/50 to-transparent" />
      </div>

      {/* Corner Decorations */}
      <div className="absolute top-8 left-8 w-16 h-16 border-t-2 border-l-2 border-amber-500/30 rounded-tl-2xl" />
      <div className="absolute top-8 right-8 w-16 h-16 border-t-2 border-r-2 border-amber-500/30 rounded-tr-2xl" />
      <div className="absolute bottom-8 left-8 w-16 h-16 border-b-2 border-l-2 border-amber-500/30 rounded-bl-2xl" />
      <div className="absolute bottom-8 right-8 w-16 h-16 border-b-2 border-r-2 border-amber-500/30 rounded-br-2xl" />

      {/* Content */}
      <div className="relative h-screen flex flex-col items-center justify-center px-5 sm:px-6 lg:px-8">
        {/* Top Tagline */}
        <div className="absolute top-8 left-1/2 -translate-x-1/2">
          <div className="flex items-center gap-2 bg-black/30 backdrop-blur-md border border-amber-500/20 rounded-full px-4 py-2">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span className="text-amber-500 text-xs sm:text-sm tracking-wider">
              BAHIR DAR GIFTS
            </span>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-5xl mx-auto text-center space-y-8">
          {/* Heading */}
          <h1 className="space-y-3">
            <span className="text-white text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight block">
              Discover
              <span className="text-amber-500"> Unique</span>
            </span>
            <span className="text-white text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight block">
              Gifts for Every
            </span>
            <span className="text-white text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight block">
              Special Moment
            </span>
          </h1>

          {/* Description with Line */}
          <div className="flex items-center justify-center gap-6 max-w-3xl mx-auto">
            <div className="hidden sm:block w-16 h-px bg-gradient-to-r from-transparent to-amber-500/50" />
            <p className="text-gray-300 text-base sm:text-lg">
              Curated collections delivered with elegance
            </p>
            <div className="hidden sm:block w-16 h-px bg-gradient-to-l from-transparent to-amber-500/50" />
          </div>

          {/* Buttons with Unique Style */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
            <button className="group relative overflow-hidden bg-amber-500 hover:bg-amber-600 text-slate-950 font-semibold px-10 py-4 rounded-full transition-all hover:scale-105">
              <span className="relative z-10 flex items-center gap-2">
                Explore Collection
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            </button>

            <button className="relative group">
              <span className="relative z-10 flex items-center justify-center gap-2 bg-transparent hover:bg-white/5 text-white font-medium px-10 py-4 rounded-full border border-white/20 transition-all hover:border-amber-500/50 backdrop-blur-sm">
                View Catalog
              </span>
              <div className="absolute -inset-0.5 bg-gradient-to-r from-amber-500/0 via-amber-500/30 to-amber-500/0 rounded-full opacity-0 group-hover:opacity-100 blur transition-opacity" />
            </button>
          </div>
        </div>
      </div>

      {/* Animation Styles */}
      <style jsx>{`
        @keyframes subtle-zoom {
          0%,
          100% {
            transform: scale(1.05);
          }
          50% {
            transform: scale(1.08);
          }
        }

        .animate-subtle-zoom {
          animation: subtle-zoom 20s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}
