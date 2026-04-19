"use client";

import Image from "next/image";
import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";
import HeroImage from "@/public/background/Hero-background.jpg";
import { Button } from "@/components/ui/button";

export default function HomeHero() {
  return (
    <section className="relative w-full min-h-screen overflow-hidden">
      {/* Visual Background Layer */}
      <div className="absolute inset-0">
        <Image
          src={HeroImage}
          alt="Luxury gift box with ribbon"
          fill
          className="object-cover scale-105 animate-subtle-zoom"
          priority
          sizes="100vw"
        />

        {/* Gradient Overlay for Text Readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black/90" />

        {/* Radial Glow for Focus */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,black_100%)] opacity-50" />
      </div>

      {/* Modern Framing Lines */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-secondary/30 to-transparent z-10" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-secondary/30 to-transparent z-10" />

      {/* Decorative Corners */}
      <div className="absolute top-12 left-12 w-20 h-20 border-t border-l border-secondary/20 rounded-tl-3xl z-10 hidden sm:block" />
      <div className="absolute top-12 right-12 w-20 h-20 border-t border-r border-secondary/20 rounded-tr-3xl z-10 hidden sm:block" />

      {/* Main Hero Container */}
      <div className="relative h-screen flex flex-col items-center justify-center px-6 lg:px-8 z-20">
        {/* Floating Tagline */}
        <div className="mb-10 animate-in fade-in slide-in-from-top-6 duration-1000">
          <div className="flex items-center gap-2.5 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full px-5 py-2.5 shadow-2xl">
            <Sparkles className="w-3.5 h-3.5 text-secondary animate-pulse" />
            <span className="text-secondary text-[10px] sm:text-xs font-bold uppercase tracking-[0.25em]">
              The Art of Gifting &bull; Bahir Dar
            </span>
          </div>
        </div>

        {/* Hero Typography */}
        <div className="max-w-6xl mx-auto text-center space-y-10">
          <h1 className="flex flex-col gap-2 sm:gap-4 animate-in fade-in zoom-in-95 duration-1000">
            <span className="text-white text-4xl sm:text-6xl md:text-8xl font-black tracking-tight leading-[0.9]">
              Elevate Your <span className="text-secondary italic font-medium serif">Special</span>
            </span>
            <span className="text-white text-4xl sm:text-6xl md:text-8xl font-black tracking-tight leading-[0.9]">
              Moments with Elegance
            </span>
          </h1>

          <div className="flex items-center justify-center gap-6 max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-200">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent to-secondary/30" />
            <p className="text-slate-300 text-sm sm:text-lg font-medium tracking-wide">
              Exquisite collections curated for the sophisticated giver
            </p>
            <div className="h-px flex-1 bg-gradient-to-l from-transparent to-secondary/30" />
          </div>

          {/* shadcn Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-5 justify-center pt-8 animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-300">
            <Button size="lg" asChild className="h-14 px-10 rounded-full bg-secondary text-secondary-foreground hover:bg-secondary/90 font-bold text-base shadow-xl shadow-secondary/20 group">
              <Link href="/gifts">
                Explore Collection
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
              </Link>
            </Button>

            <Button variant="outline" size="lg" asChild className="h-14 px-10 rounded-full bg-white/5 text-white border-white/20 hover:bg-white/10 hover:border-secondary/40 font-bold text-base backdrop-blur-md group">
              <Link href="/catalog">
                View Catalog
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Animated Subtle Background Effects */}
      <style jsx>{`
        @keyframes subtle-zoom {
          0%, 100% { transform: scale(1.05); }
          50% { transform: scale(1.1); }
        }
        .animate-subtle-zoom {
          animation: subtle-zoom 25s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}
