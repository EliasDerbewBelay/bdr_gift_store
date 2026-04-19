"use client";
import { Star } from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <Card 
        onClick={() => onClick(id)}
        className={cn(
          "text-left cursor-pointer transition-all duration-500 rounded-3xl overflow-hidden border-2",
          isActive 
            ? "bg-primary text-primary-foreground border-primary shadow-2xl shadow-primary/20" 
            : "bg-white hover:bg-slate-50 border-slate-100 shadow-xl shadow-slate-200/50"
        )}
      >
        <CardContent className="p-6 space-y-4">
          <div className="flex items-center gap-4">
            <Avatar className={cn(
              "h-12 w-12 border-2 shadow-sm",
              isActive ? "border-white/20" : "border-secondary/20"
            )}>
              <AvatarImage src={image} className="object-cover" />
              <AvatarFallback className="bg-primary/10 text-primary font-bold">
                {name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex flex-col">
              <h5 className="font-bold text-sm leading-none mb-1">{name}</h5>
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={cn(
                      "w-3 h-3",
                      i < rating
                        ? isActive ? "text-amber-400 fill-amber-400" : "text-secondary fill-secondary"
                        : isActive ? "text-white/20" : "text-slate-200"
                    )}
                  />
                ))}
              </div>
            </div>
          </div>
          
          <p className={cn(
            "text-xs leading-relaxed line-clamp-3 font-medium italic",
            isActive ? "text-primary-foreground/90" : "text-slate-500"
          )}>
            "{content}"
          </p>
          
          <div className={cn(
            "text-[10px] font-bold uppercase tracking-widest pt-2 flex justify-between",
            isActive ? "text-primary-foreground/60" : "text-slate-400"
          )}>
            <span>{role}</span>
            <span>{date}</span>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
