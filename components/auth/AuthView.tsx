"use client";
import { useState, useEffect } from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface AuthViewProps {
  initialTab?: "login" | "register";
}

export default function AuthView({ initialTab = "login" }: AuthViewProps) {
  const [activeTab, setActiveTab] = useState<"login" | "register">(initialTab);
  const router = useRouter();

  // Sync state if initialTab changes (e.g. navigation between /signin and /signup)
  useEffect(() => {
    setActiveTab(initialTab);
  }, [initialTab]);

  const handleTabChange = (tab: "login" | "register") => {
    setActiveTab(tab);
    // Update URL to match tab for professional UX
    const newPath = tab === "login" ? "/signin" : "/signup";
    router.replace(newPath, { scroll: false });
  };

  return (
    <div className="h-screen flex items-center justify-center p-4 sm:p-6 lg:p-12 relative overflow-hidden bg-[#F9FAF9]">
      {/* Ambient decorative elements */}
      <div className="absolute top-[-10%] left-[-5%] w-[45%] h-[45%] bg-[#064E3B] opacity-5 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-10%] right-[-5%] w-[40%] h-[40%] bg-[#D1FAE5] opacity-20 rounded-full blur-[100px]" />

      <div className="w-full max-w-5xl h-full max-h-[min(94vh,820px)] grid grid-cols-1 md:grid-cols-2 bg-white rounded-xl lg:rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-[#D1D5DB]/30 relative z-10 transition-all duration-500">
        {/* Left Side: Visual/Branding (Shown only on md+) */}
        <div className="hidden md:flex relative overflow-hidden bg-[#D1FAE5]/30 p-10 flex-col justify-between border-r border-[#D1D5DB]/20">
          <div>
            <h1 className="font-['Noto_Serif',serif] text-3xl font-bold tracking-tight text-[#064E3B] mb-2">
              Bahr Dar Gifts
            </h1>
            <p className="text-[#4B5563] text-sm font-medium leading-relaxed max-w-xs">
              Curating moments of intimacy through hand-composed gifts and
              heirloom keepsakes.
            </p>
          </div>

          <div className="relative aspect-[4/5] rounded-xl overflow-hidden mt-6 group border border-[#D1D5DB]/10 shadow-sm">
            <Image
              alt="Hand-wrapped gift"
              className="object-cover w-full h-full transition-transform duration-1000 group-hover:scale-105"
              src="https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=2070&auto=format&fit=crop"
              fill
              sizes="50vw"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#064E3B]/40 to-transparent opacity-60" />
            <div className="absolute bottom-6 left-6 right-6">
              <p className="text-white font-['Noto_Serif',serif] text-lg font-medium italic tracking-tight drop-shadow-md">
                "A gift is a bridge between two souls."
              </p>
            </div>
          </div>

          <div className="mt-6 flex gap-2">
            <div className="w-10 h-1 rounded-full bg-[#064E3B]" />
            <div className="w-10 h-1 rounded-full bg-[#D1D5DB]/40" />
            <div className="w-10 h-1 rounded-full bg-[#D1D5DB]/40" />
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="p-6 sm:p-10 lg:p-12 flex flex-col justify-center h-full overflow-y-auto overflow-x-hidden scrollbar-hide bg-white">
          {/* Mobile Brand Header */}
          <div className="md:hidden flex flex-col items-center mb-6">
            <h1 className="font-['Noto_Serif',serif] text-2xl font-bold text-[#064E3B]">Bahr Dar Gifts</h1>
            <div className="h-px w-12 bg-amber-500 my-1 line-through" />
            <p className="text-[10px] text-[#4B5563] uppercase tracking-[0.2em] font-bold">Premium Quality</p>
          </div>

          <div className="mb-6">
            <h2 className="font-['Noto_Serif',serif] text-3xl lg:text-4xl font-bold text-[#111827] tracking-tight mb-2">
              {activeTab === "login" ? "Welcome Home" : "Create Account"}
            </h2>
            <p className="text-[#4B5563] text-sm lg:text-base">
              {activeTab === "login" 
                ? "Join our community of thoughtful gift-givers."
                : "Join the elite circle of curated gifting."}
            </p>
          </div>

          {/* Tab Switcher */}
          <div className="flex p-1 bg-[#F3F4F6]/60 rounded-lg mb-6 border border-[#D1D5DB]/20">
            <button
              onClick={() => handleTabChange("login")}
              className={`flex-1 py-2.5 px-6 rounded-md text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                activeTab === "login"
                  ? "bg-white text-[#064E3B] shadow-sm ring-1 ring-black/5"
                  : "text-[#6B7280] hover:text-[#064E3B]"
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => handleTabChange("register")}
              className={`flex-1 py-2.5 px-6 rounded-md text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                activeTab === "register"
                  ? "bg-white text-[#064E3B] shadow-sm ring-1 ring-black/5"
                  : "text-[#6B7280] hover:text-[#064E3B]"
              }`}
            >
              Sign Up
            </button>
          </div>

          {/* Form Container */}
          <div className="flex-1 w-full max-w-sm mx-auto flex flex-col justify-center py-2">
            {activeTab === "login" ? (
              <LoginForm />
            ) : (
              <RegisterForm onSwitchToLogin={() => handleTabChange("login")} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
