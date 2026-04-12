"use client";
import { useState } from "react";
import Link from "next/link";
import { Mail, Lock, ArrowRight } from "lucide-react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    remember: false,
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
    setIsLoading(true);
    setError(null);

    try {
      const result = await signIn("credentials", {
        email: formData.email,
        password: formData.password,
        redirect: false,
      });

      if (result?.error) {
        setError(result.error);
        setIsLoading(false);
      } else {
        router.push("/");
        router.refresh();
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

        <div className="space-y-2">
          <div className="flex justify-between items-center ml-1">
            <label
              className="block text-[10px] font-bold uppercase tracking-widest text-[#4B5563]"
              htmlFor="password"
            >
              Password
            </label>
            <Link
              href="/forgot-password"
              className="text-[10px] font-bold text-[#064E3B] hover:text-[#064032] transition-colors"
            >
              Forgot?
            </Link>
          </div>
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
            />
            <Lock className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9CA3AF] group-focus-within:text-[#064E3B] transition-colors" />
          </div>
        </div>

        <div className="flex items-center gap-2 py-1">
          <input
            className="w-3.5 h-3.5 rounded border-[#D1D5DB] text-[#064E3B] focus:ring-[#064E3B]/30 transition-all cursor-pointer"
            id="remember"
            name="remember"
            type="checkbox"
            checked={formData.remember}
            onChange={handleChange}
          />
          <label
            className="text-[11px] text-[#4B5563] font-medium cursor-pointer select-none"
            htmlFor="remember"
          >
            Remember me
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
              Signing In...
            </>
          ) : (
            <>
              Sign In
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </form>

      {/* Social Login */}
      <div className="relative my-8">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-[#D1D5DB]/60" />
        </div>
        <div className="relative flex justify-center text-[9px] uppercase tracking-widest font-bold">
          <span className="bg-white px-3 text-[#9CA3AF]">Or continue with</span>
        </div>
      </div>
    </>
  );
}
