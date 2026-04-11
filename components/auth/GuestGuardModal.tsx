"use client";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Lock, ShoppingCart, Heart, ArrowRight } from "lucide-react";
import Link from "next/link";

interface GuestGuardModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function GuestGuardModal({ isOpen, onClose }: GuestGuardModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
            onClick={onClose}
          />

          {/* Modal Container */}
          <div className="fixed inset-0 flex items-center justify-center p-4 z-[101] pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden pointer-events-auto relative"
            >
              {/* Top Decorative Header */}
              <div className="bg-[#064E3B] p-8 text-center relative overflow-hidden">
                <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[150%] bg-white/10 rounded-full blur-3xl transform -rotate-12" />
                <div className="relative z-10 flex justify-center mb-4">
                  <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20">
                    <Lock className="w-8 h-8 text-amber-500" />
                  </div>
                </div>
                <h3 className="relative z-10 text-2xl font-['Noto_Serif',serif] font-bold text-white mb-2">
                  Unlock Premium Gifting
                </h3>
                <p className="relative z-10 text-white/80 text-sm">
                  Join our community of thoughtful gift-givers to continue.
                </p>
              </div>

              {/* Modal Body */}
              <div className="p-8">
                <div className="space-y-4 mb-8">
                  <div className="flex items-center gap-4 p-3 rounded-lg bg-[#F9FAF9] border border-[#D1D5DB]/30">
                    <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0">
                      <ShoppingCart className="w-5 h-5 text-amber-600" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-[#111827]">Save your Cart</h4>
                      <p className="text-xs text-[#4B5563]">Items in your cart are waiting for you.</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-3 rounded-lg bg-[#F9FAF9] border border-[#D1D5DB]/30">
                    <div className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center flex-shrink-0">
                      <Heart className="w-5 h-5 text-red-500" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-[#111827]">Track your Wishlist</h4>
                      <p className="text-xs text-[#4B5563]">Never lose track of the gifts you love.</p>
                    </div>
                  </div>
                </div>

                {/* Primary Actions */}
                <div className="flex flex-col gap-3">
                  <Link
                    href="/signin"
                    onClick={onClose}
                    className="w-full py-4 bg-[#064E3B] text-white rounded-xl font-bold text-lg flex items-center justify-center gap-2 hover:bg-[#064032] transition shadow-md hover:shadow-lg active:scale-[0.98]"
                  >
                    Sign In
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                  <Link
                    href="/signup"
                    onClick={onClose}
                    className="w-full py-4 bg-white text-[#064E3B] border-2 border-[#064E3B] rounded-xl font-bold text-lg flex items-center justify-center hover:bg-[#F9FAF9] transition active:scale-[0.98]"
                  >
                    Create Account
                  </Link>
                </div>

                {/* Secondary Actions */}
                <button
                  onClick={onClose}
                  className="w-full mt-6 text-sm text-[#4B5563] font-medium hover:text-[#064E3B] transition"
                >
                  Maybe later
                </button>
              </div>

              {/* Close Icon (Top Right) */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-white/60 hover:text-white transition group z-20"
              >
                <X className="w-6 h-6 group-hover:rotate-90 transition-transform duration-300" />
              </button>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
