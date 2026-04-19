"use client";
import Image from "next/image";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import TestimonialCard from "@/components/ui/TestimonialCard";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

export default function Testimonies() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Happy Customer",
      content: "The gift package I ordered for my sister's birthday was absolutely stunning. The presentation was elegant, and delivery was right on time. She loved every single item in the box!",
      rating: 5,
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format&fit=crop",
      date: "2 weeks ago",
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Regular Client",
      content: "I've been using Bahrdar Gifts for all my corporate gifting needs. The quality is consistently excellent, and their customer service team goes above and beyond. Highly recommended!",
      rating: 5,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop",
      date: "1 month ago",
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      role: "Newlywed",
      content: "Ordered wedding favor gifts for our guests and they were perfect! Each box was beautifully wrapped and the personalization option made them extra special. Thank you Bahrdar Gifts!",
      rating: 5,
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=format&fit=crop",
      date: "3 weeks ago",
    },
    {
      id: 4,
      name: "David Thompson",
      role: "Verified Buyer",
      content: "The anniversary gift set exceeded my expectations. The quality of each item was exceptional, and the packaging made it feel truly luxurious. Will definitely order again!",
      rating: 4,
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1974&auto=format&fit=crop",
      date: "5 days ago",
    },
  ];

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const handleCardClick = (id: number) => {
    const index = testimonials.findIndex((t) => t.id === id);
    if (index !== -1) {
      setCurrentIndex(index);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextTestimonial();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const fadeVariants = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 },
  };

  return (
    <section className="relative w-full py-20 sm:py-24 overflow-hidden bg-slate-50/30">
      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center space-y-4 mb-16 lg:mb-20 max-w-3xl mx-auto">
          <Badge variant="outline" className="px-4 py-1 border-secondary/30 text-secondary font-bold uppercase tracking-widest bg-secondary/5">
            Testimonials
          </Badge>
          <h2 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">
            What Our Customers Say
          </h2>
          <p className="text-slate-500 text-lg font-medium">
            Hear from our happy customers about their experiences with our premium gift selections.
          </p>
        </div>

        {/* Featured Showcase */}
        <div className="relative mb-20 max-w-5xl mx-auto">
          <Card className="rounded-[2.5rem] border-none shadow-2xl shadow-slate-200/50 bg-white overflow-hidden">
            <CardContent className="p-8 sm:p-12 lg:p-16 relative">
               <div className="absolute top-10 left-10 opacity-10">
                 <Quote className="w-24 h-24 text-primary fill-current" />
               </div>
               
               <div className="grid lg:grid-cols-5 gap-12 items-center relative z-10">
                 {/* Large Visual Focus */}
                 <div className="lg:col-span-2">
                   <AnimatePresence mode="wait">
                     <motion.div
                       key={currentIndex}
                       initial={{ opacity: 0, scale: 0.9, rotate: -5 }}
                       animate={{ opacity: 1, scale: 1, rotate: 0 }}
                       exit={{ opacity: 0, scale: 0.9, rotate: 5 }}
                       transition={{ duration: 0.6, type: "spring" }}
                       className="relative aspect-square max-w-[300px] mx-auto"
                     >
                        <div className="absolute inset-0 bg-primary/10 rounded-full blur-3xl animate-pulse" />
                        <Avatar className="w-full h-full border-[6px] border-white shadow-2xl rounded-full">
                          <AvatarImage src={testimonials[currentIndex].image} className="object-cover" />
                          <AvatarFallback className="text-4xl font-black">{testimonials[currentIndex].name.charAt(0)}</AvatarFallback>
                        </Avatar>
                     </motion.div>
                   </AnimatePresence>
                 </div>

                 {/* High-Impact Copy */}
                 <div className="lg:col-span-3 space-y-8">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={currentIndex}
                        variants={fadeVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        transition={{ duration: 0.5 }}
                        className="space-y-6"
                      >
                         <div className="flex items-center gap-1.5">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={cn(
                                  "w-6 h-6",
                                  i < testimonials[currentIndex].rating ? "text-secondary fill-secondary" : "text-slate-200"
                                )}
                              />
                            ))}
                         </div>

                         <blockquote className="text-2xl sm:text-3xl font-bold text-slate-900 leading-tight italic">
                            "{testimonials[currentIndex].content}"
                         </blockquote>

                         <div className="flex items-end justify-between pt-4 border-t border-slate-100">
                           <div>
                              <h4 className="text-xl font-black text-slate-900">{testimonials[currentIndex].name}</h4>
                              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">{testimonials[currentIndex].role}</p>
                           </div>
                           <Badge variant="secondary" className="bg-slate-100 text-slate-500 font-bold border-none px-3">
                              {testimonials[currentIndex].date}
                           </Badge>
                         </div>
                      </motion.div>
                    </AnimatePresence>
                 </div>
               </div>
            </CardContent>
          </Card>

          {/* Navigation Controls */}
          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-4 z-20">
             <Button 
                onClick={prevTestimonial}
                size="icon" 
                variant="outline" 
                className="h-14 w-14 rounded-full bg-white shadow-xl hover:bg-primary hover:text-white border-none transition-all"
             >
                <ChevronLeft className="h-6 w-6" />
             </Button>
             <Button 
                onClick={nextTestimonial}
                size="icon" 
                variant="outline" 
                className="h-14 w-14 rounded-full bg-white shadow-xl hover:bg-primary hover:text-white border-none transition-all"
             >
                <ChevronRight className="h-6 w-6" />
             </Button>
          </div>
        </div>

        {/* Supporting Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-20">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={testimonial.id}
              id={testimonial.id}
              name={testimonial.name}
              role={testimonial.role}
              content={testimonial.content}
              rating={testimonial.rating}
              image={testimonial.image}
              date={testimonial.date}
              isActive={index === currentIndex}
              onClick={handleCardClick}
              index={index}
            />
          ))}
        </div>

        {/* Mobile Page Indicator */}
        <div className="flex items-center justify-center gap-2 mt-12 lg:hidden">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={cn(
                "h-1.5 transition-all rounded-full",
                index === currentIndex ? "w-10 bg-primary" : "w-1.5 bg-slate-300"
              )}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
