"use client";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

export default function CTA() {
  return (
    <section className="relative w-full py-24 sm:py-32 overflow-hidden bg-primary">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[60%] bg-white/5 rounded-full blur-[120px] rotate-12" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[30%] h-[50%] bg-secondary/10 rounded-full blur-[100px] -rotate-12" />
      </div>

      <div className="relative max-w-4xl mx-auto px-6 lg:px-8 text-center space-y-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center gap-6"
        >
          <Badge variant="outline" className="px-5 py-1.5 border-white/20 text-white font-bold uppercase tracking-[0.2em] bg-white/5 backdrop-blur-md">
            The Ultimate Gifting Experience
          </Badge>

          <h2 className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-[1.1]">
            Send Joy with the <span className="text-secondary italic font-medium serif">Perfect</span> Gift
          </h2>
          
          <p className="text-white/70 text-lg sm:text-xl font-medium max-w-2xl mx-auto leading-relaxed">
            Curated collections delivered with extraordinary care and elegance. 
            Make every occasion unforgettable with Bahir Dar Gifts.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Button 
            size="lg" 
            asChild 
            className="h-16 px-12 rounded-full bg-white text-primary hover:bg-slate-100 font-black text-lg shadow-2xl shadow-black/10 transition-all active:scale-95 group"
          >
            <Link href="/gifts">
              Shop the Collection
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
