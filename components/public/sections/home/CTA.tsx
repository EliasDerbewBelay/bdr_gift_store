"use client";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function CTA() {
  return (
    <section className="relative w-full py-20 sm:py-24 lg:py-28 overflow-hidden bg-amber-500">
      <div className="relative max-w-3xl mx-auto px-5 sm:px-6 lg:px-8 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6"
        >
          Send joy with the perfect gift
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-white/80 text-lg mb-8"
        >
          Curated collections delivered with care
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <button className="group inline-flex items-center gap-2 bg-white hover:bg-slate-50 text-amber-600 font-semibold px-8 py-4 rounded-full transition-all shadow-lg hover:shadow-xl">
            Shop Now
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
