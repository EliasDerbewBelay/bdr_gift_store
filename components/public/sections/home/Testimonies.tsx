"use client";
import Image from "next/image";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import TestimonialCard from "@/components/ui/TestimonialCard";

export default function Testimonies() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Happy Customer",
      content:
        "The gift package I ordered for my sister's birthday was absolutely stunning. The presentation was elegant, and delivery was right on time. She loved every single item in the box!",
      rating: 5,
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format&fit=crop",
      date: "2 weeks ago",
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Regular Client",
      content:
        "I've been using Bahrdar Gifts for all my corporate gifting needs. The quality is consistently excellent, and their customer service team goes above and beyond. Highly recommended!",
      rating: 5,
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop",
      date: "1 month ago",
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      role: "Newlywed",
      content:
        "Ordered wedding favor gifts for our guests and they were perfect! Each box was beautifully wrapped and the personalization option made them extra special. Thank you Bahrdar Gifts!",
      rating: 5,
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=format&fit=crop",
      date: "3 weeks ago",
    },
    {
      id: 4,
      name: "David Thompson",
      role: "Verified Buyer",
      content:
        "The anniversary gift set exceeded my expectations. The quality of each item was exceptional, and the packaging made it feel truly luxurious. Will definitely order again!",
      rating: 4,
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1974&auto=format&fit=crop",
      date: "5 days ago",
    },
  ];

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length,
    );
  };

  const handleCardClick = (id: number) => {
    const index = testimonials.findIndex((t) => t.id === id);
    if (index !== -1) {
      setCurrentIndex(index);
    }
  };

  // Auto-advance testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      nextTestimonial();
    }, 5000); // Change every 5 seconds

    return () => clearInterval(interval);
  }, []);

  // Animation variants
  const fadeVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  return (
    <section className="relative w-full py-16 sm:py-20 lg:py-24 overflow-hidden bg-gradient-to-b from-white to-slate-50">
      <div className="relative max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-4 mb-12 sm:mb-16"
        >
          <span className="text-amber-600 text-sm font-semibold tracking-wider uppercase">
            Testimonials
          </span>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900">
            What Our Customers Say
          </h2>

          <p className="text-slate-600 text-base sm:text-lg max-w-2xl mx-auto">
            Don't just take our word for it - hear from our happy customers
          </p>
        </motion.div>

        {/* Featured Testimonial - Large Card */}
        <div className="relative mb-12">
          <div className="bg-white rounded-3xl shadow-xl p-8 sm:p-10 lg:p-12 border border-slate-100">
            {/* Quote Icon */}
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
              className="absolute -top-5 -left-5 w-12 h-12 bg-amber-500 rounded-full flex items-center justify-center shadow-lg"
            >
              <Quote className="w-6 h-6 text-white" />
            </motion.div>

            <div className="grid lg:grid-cols-3 gap-8 lg:gap-12 items-center">
              {/* Left - Image */}
              <div className="lg:col-span-1">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.5, type: "spring" }}
                    className="relative aspect-square max-w-[250px] mx-auto"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-amber-500/20 to-transparent rounded-full blur-2xl" />
                    <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-white shadow-xl">
                      <Image
                        src={testimonials[currentIndex].image}
                        alt={testimonials[currentIndex].name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 250px, 300px"
                      />
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Right - Content */}
              <div className="lg:col-span-2">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentIndex}
                    variants={fadeVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    transition={{ duration: 0.4 }}
                  >
                    {/* Rating */}
                    <div className="flex items-center gap-1 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: i * 0.1 }}
                        >
                          <Star
                            className={`w-5 h-5 ${
                              i < testimonials[currentIndex].rating
                                ? "text-amber-500 fill-amber-500"
                                : "text-slate-300"
                            }`}
                          />
                        </motion.div>
                      ))}
                    </div>

                    {/* Testimonial Text */}
                    <blockquote className="mb-6">
                      <p className="text-slate-700 text-lg sm:text-xl lg:text-2xl leading-relaxed italic">
                        "{testimonials[currentIndex].content}"
                      </p>
                    </blockquote>

                    {/* Author Info */}
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-slate-900 font-bold text-lg">
                          {testimonials[currentIndex].name}
                        </h4>
                        <p className="text-slate-500 text-sm">
                          {testimonials[currentIndex].role}
                        </p>
                      </div>
                      <span className="text-slate-400 text-sm">
                        {testimonials[currentIndex].date}
                      </span>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevTestimonial}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 lg:-translate-x-6 w-10 h-10 sm:w-12 sm:h-12 bg-white hover:bg-amber-500 text-slate-700 hover:text-white rounded-full flex items-center justify-center shadow-lg transition-all duration-300 border border-slate-200"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          <button
            onClick={nextTestimonial}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 lg:translate-x-6 w-10 h-10 sm:w-12 sm:h-12 bg-white hover:bg-amber-500 text-slate-700 hover:text-white rounded-full flex items-center justify-center shadow-lg transition-all duration-300 border border-slate-200"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>

        {/* Testimonial Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 mt-12">
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

        {/* Dots Indicator */}
        <div className="flex items-center justify-center gap-2 mt-8 lg:hidden">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-2 rounded-full transition-all ${
                index === currentIndex
                  ? "w-8 bg-amber-500"
                  : "w-2 bg-slate-300 hover:bg-slate-400"
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
