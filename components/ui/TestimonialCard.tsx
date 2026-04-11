"use client";
import Image from "next/image";
import { Star } from "lucide-react";
import { motion } from "framer-motion";

interface TestimonialCardProps {
  id: number;
  name: string;
  role: string;
  content: string;
  rating: number;
  image: string;
  date: string;
  isActive: boolean;
  onClick: (id: number) => void;
  index: number;
}

export default function TestimonialCard({
  id,
  name,
  role,
  content,
  rating,
  image,
  date,
  isActive,
  onClick,
  index,
}: TestimonialCardProps) {
  return (
    <motion.button
      onClick={() => onClick(id)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`text-left p-5 rounded-xl transition-all duration-300 ${
        isActive
          ? "bg-amber-500 shadow-lg"
          : "bg-white hover:bg-slate-50 shadow-md hover:shadow-lg"
      }`}
    >
      <div className="flex items-center gap-3 mb-3">
        <div
          className={`relative w-10 h-10 rounded-full overflow-hidden flex-shrink-0 border-2 ${
            isActive ? "border-white" : "border-amber-500"
          }`}
        >
          <Image src={image} alt={name} fill className="object-cover" />
        </div>
        <div>
          <h5
            className={`font-semibold text-sm ${
              isActive ? "text-white" : "text-slate-900"
            }`}
          >
            {name}
          </h5>
          <div className="flex items-center gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-3 h-3 ${
                  i < rating
                    ? isActive
                      ? "text-white fill-white"
                      : "text-amber-500 fill-amber-500"
                    : isActive
                      ? "text-white/40"
                      : "text-slate-300"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
      <p
        className={`text-xs line-clamp-3 ${
          isActive ? "text-white/90" : "text-slate-600"
        }`}
      >
        "{content}"
      </p>
    </motion.button>
  );
}
