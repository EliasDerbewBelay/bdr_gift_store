"use client";
import { useState } from "react";
import Link from "next/link";
import { Mail, Lock, User, ArrowRight, Phone } from "lucide-react";
import Image from "next/image";

import { registerUser } from "@/lib/actions/auth";
import { useRouter } from "next/navigation";

interface RegisterFormProps {
  onSwitchToLogin?: () => void;
}

export default function RegisterForm({ onSwitchToLogin }: RegisterFormProps) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    acceptTerms: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setIsLoading(true);

    try {
      const result = await registerUser(formData);
      
      if (result.error) {
        setError(result.error);
        setIsLoading(false);
      } else {
        // Success
        console.log("Registered successfully:", result.user);
        // Switch to login tab
        if (onSwitchToLogin) onSwitchToLogin();
      }
    } catch (err) {
      setError("An unexpected error occurred");
      setIsLoading(false);
    }
  };

  return (
    <>
      <form className="space-y-4" onSubmit={handleSubmit}>
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md text-xs font-medium">
            {error}
          </div>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label
              className="block text-[10px] font-bold uppercase tracking-widest text-[#4B5563] ml-1"
              htmlFor="name"
            >
              Full Name
            </label>
            <div className="relative group">
              <input
                className="w-full bg-white border border-[#D1D5DB] rounded-md py-3 px-4 text-[#111827] focus:ring-1 focus:ring-[#064E3B] focus:border-[#064E3B] placeholder:text-[#9CA3AF]/60 text-sm transition-all"
                id="name"
                name="name"
                type="text"
                placeholder="Diana Derebe"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <User className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9CA3AF] group-focus-within:text-[#064E3B] transition-colors" />
            </div>
          </div>

          <div className="space-y-2">
            <label
              className="block text-[10px] font-bold uppercase tracking-widest text-[#4B5563] ml-1"
              htmlFor="email"
            >
              Email Address
            </label>
            <div className="relative group">
              <input
                className="w-full bg-white border border-[#D1D5DB] rounded-md py-3 px-4 text-[#111827] focus:ring-1 focus:ring-[#064E3B] focus:border-[#064E3B] placeholder:text-[#9CA3AF]/60 text-sm transition-all"
                id="email"
                name="email"
                type="email"
                placeholder="hello@bahrdargifts.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <Mail className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9CA3AF] group-focus-within:text-[#064E3B] transition-colors" />
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <label
            className="block text-[10px] font-bold uppercase tracking-widest text-[#4B5563] ml-1"
            htmlFor="phone"
          >
            Phone Number (Optional)
          </label>
          <div className="relative group">
            <input
              className="w-full bg-white border border-[#D1D5DB] rounded-md py-3 px-4 text-[#111827] focus:ring-1 focus:ring-[#064E3B] focus:border-[#064E3B] placeholder:text-[#9CA3AF]/60 text-sm transition-all"
              id="phone"
              name="phone"
              type="tel"
              placeholder="+251 91 234 5678"
              value={formData.phone}
              onChange={handleChange}
            />
            <Phone className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9CA3AF] group-focus-within:text-[#064E3B] transition-colors" />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label
              className="block text-[10px] font-bold uppercase tracking-widest text-[#4B5563] ml-1"
              htmlFor="password"
            >
              Password
            </label>
            <div className="relative group">
              <input
                className="w-full bg-white border border-[#D1D5DB] rounded-md py-3 px-4 text-[#111827] focus:ring-1 focus:ring-[#064E3B] focus:border-[#064E3B] placeholder:text-[#9CA3AF]/60 text-sm transition-all"
                id="password"
                name="password"
                type="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                required
                minLength={8}
              />
              <Lock className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9CA3AF] group-focus-within:text-[#064E3B] transition-colors" />
            </div>
          </div>

          <div className="space-y-2">
            <label
              className="block text-[10px] font-bold uppercase tracking-widest text-[#4B5563] ml-1"
              htmlFor="confirmPassword"
            >
              Confirm Password
            </label>
            <div className="relative group">
              <input
                className="w-full bg-white border border-[#D1D5DB] rounded-md py-3 px-4 text-[#111827] focus:ring-1 focus:ring-[#064E3B] focus:border-[#064E3B] placeholder:text-[#9CA3AF]/60 text-sm transition-all"
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="••••••••"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
              <Lock className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9CA3AF] group-focus-within:text-[#064E3B] transition-colors" />
            </div>
          </div>
        </div>

        <div className="flex items-start gap-3 py-1">
          <input
            className="w-3.5 h-3.5 mt-0.5 rounded border-[#D1D5DB] text-[#064E3B] focus:ring-[#064E3B]/30 transition-all cursor-pointer"
            id="acceptTerms"
            name="acceptTerms"
            type="checkbox"
            checked={formData.acceptTerms}
            onChange={handleChange}
            required
          />
          <label
            className="text-[11px] text-[#4B5563] font-medium cursor-pointer select-none leading-relaxed"
            htmlFor="acceptTerms"
          >
            I agree to the{" "}
            <Link
              href="/terms"
              className="text-[#064E3B] font-bold hover:underline"
            >
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link
              href="/privacy"
              className="text-[#064E3B] font-bold hover:underline"
            >
              Privacy Policy
            </Link>
          </label>
        </div>

        <button
          className="w-full bg-[#064E3B] text-white py-3.5 rounded-md font-bold text-base shadow-sm hover:bg-[#064032] hover:shadow-md active:scale-[0.99] transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed mt-2"
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Creating...
            </>
          ) : (
            <>
              Create Account
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </form>
      <p className="mt-6 text-center text-xs text-[#4B5563]">
        Already have an account?{" "}
        <button
          onClick={onSwitchToLogin}
          type="button"
          className="text-[#064E3B] font-bold hover:underline"
        >
          Sign In
        </button>
      </p>
    </>
  );
}
