"use client";
import { useState, useEffect } from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sparkles, ArrowRight } from "lucide-react";

interface AuthViewProps {
  initialTab?: "login" | "register";
}

export default function AuthView({ initialTab = "login" }: AuthViewProps) {
  const [activeTab, setActiveTab] = useState<string>(initialTab);
  const router = useRouter();

  useEffect(() => {
    setActiveTab(initialTab);
  }, [initialTab]);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    const newPath = value === "login" ? "/signin" : "/signup";
    router.replace(newPath, { scroll: false });
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-slate-50 relative overflow-hidden">
      {/* Decorative Orbs */}
      <div className="absolute top-[-10%] left-[-5%] w-[50%] h-[50%] bg-primary/5 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-10%] right-[-5%] w-[40%] h-[40%] bg-secondary/10 rounded-full blur-[100px]" />

      <Card className="w-full max-w-5xl overflow-hidden border-none shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] rounded-[3rem] bg-white relative z-10">
        <CardContent className="p-0">
          <div className="grid grid-cols-1 md:grid-cols-2 min-h-[700px]">
            {/* Left Side: Modern Luxury Showcase */}
            <div className="hidden md:flex relative group overflow-hidden p-12 flex-col justify-between">
              <div className="absolute inset-0">
                <Image
                  alt="Premium Gifting"
                  className="object-cover w-full h-full transition-transform duration-[2000ms] group-hover:scale-110"
                  src="https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=2070&auto=format&fit=crop"
                  fill
                  sizes="50vw"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-br from-slate-900/60 via-slate-900/40 to-transparent" />
              </div>

              <div className="relative z-10 space-y-6">
                 <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-secondary animate-pulse" />
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/80">Est. 2024</span>
                 </div>
                 <h1 className="text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
                    Bahr Dar<br />Exclusive Gifts
                 </h1>
                 <p className="text-white/70 font-medium leading-relaxed max-w-xs text-sm">
                   Where every gesture becomes an heirloom piece. Login to explore our curated collections.
                 </p>
              </div>

              <div className="relative z-10 space-y-8">
                 <div className="space-y-4">
                    <p className="text-white font-serif text-2xl italic tracking-tight opacity-90 leading-relaxed">
                      "Exquisite taste, meticulously wrapped for your most precious moments."
                    </p>
                    <div className="flex items-center gap-4">
                       <div className="h-px w-8 bg-secondary" />
                       <span className="text-xs font-black uppercase tracking-widest text-secondary">The Collection</span>
                    </div>
                 </div>
                 
                 <div className="flex gap-2">
                    <div className="w-12 h-1 rounded-full bg-secondary" />
                    <div className="w-6 h-1 rounded-full bg-white/20" />
                    <div className="w-3 h-1 rounded-full bg-white/20" />
                 </div>
              </div>
            </div>

            {/* Right Side: High-Performance Form */}
            <div className="p-8 sm:p-12 lg:p-16 flex flex-col justify-center bg-white relative">
              <div className="mb-10 text-left">
                <div className="flex items-center gap-2 mb-4">
                  <Badge variant="outline" className="text-[10px] font-black uppercase tracking-widest border-slate-100 bg-slate-50 px-3 py-1">
                    Secure Portal
                  </Badge>
                </div>
                <h2 className="text-3xl font-black text-slate-900 tracking-tight mb-3">
                  {activeTab === "login" ? "Welcome Back" : "Join the Elite"}
                </h2>
                <p className="text-slate-500 font-medium text-sm">
                  {activeTab === "login" 
                    ? "Login to your account to manage your curated selections."
                    : "Become a member to access exclusive artisanal gift pieces."}
                </p>
              </div>

              <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-10 h-14 bg-slate-50 p-1.5 rounded-2xl border border-slate-100">
                  <TabsTrigger value="login" className="rounded-xl font-black uppercase text-[10px] tracking-widest data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-primary">
                    Sign In
                  </TabsTrigger>
                  <TabsTrigger value="register" className="rounded-xl font-black uppercase text-[10px] tracking-widest data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-primary">
                    Sign Up
                  </TabsTrigger>
                </TabsList>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6"
                  >
                    <TabsContent value="login" className="mt-0 focus-visible:ring-0">
                      <LoginForm />
                    </TabsContent>
                    <TabsContent value="register" className="mt-0 focus-visible:ring-0">
                      <RegisterForm onSwitchToLogin={() => handleTabChange("login")} />
                    </TabsContent>
                  </motion.div>
                </AnimatePresence>
              </Tabs>

              {/* Enhanced Footer */}
              <div className="mt-12 flex items-center justify-between border-t border-slate-50 pt-8">
                <div className="flex items-center gap-2 text-slate-300">
                  <Sparkles className="h-4 w-4" />
                  <span className="text-[10px] font-black uppercase tracking-widest">Handcrafted Experiences</span>
                </div>
                <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-primary transition-colors hover:translate-x-1 duration-300">
                  Help Center
                  <ArrowRight className="h-3 w-3" />
                </button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
