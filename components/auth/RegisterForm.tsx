"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Link from "next/link";
import { Mail, Lock, User, ArrowRight, Phone, Loader2, AlertCircle, ShieldCheck } from "lucide-react";
import { registerUser } from "@/lib/actions/auth";
import { useRouter } from "next/navigation";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";

const registerSchema = z.object({
  name: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional(),
  password: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string().min(8, "Please confirm your password"),
  acceptTerms: z.boolean().refine((val) => val === true, {
    message: "You must accept the terms and conditions",
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

type RegisterFormValues = z.infer<typeof registerSchema>;

interface RegisterFormProps {
  onSwitchToLogin?: () => void;
}

export default function RegisterForm({ onSwitchToLogin }: RegisterFormProps) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      acceptTerms: false,
    },
  });

  const onSubmit = async (values: RegisterFormValues) => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await registerUser(values);
      if (result.error) {
        setError(result.error);
        setIsLoading(false);
      } else {
        if (onSwitchToLogin) onSwitchToLogin();
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          {error && (
            <div className="flex items-center gap-3 p-4 bg-destructive/10 border border-destructive/20 text-destructive rounded-2xl text-xs font-bold animate-in fade-in slide-in-from-top-2">
              <AlertCircle className="h-4 w-4" />
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">
                    Full Name
                  </FormLabel>
                  <FormControl>
                    <div className="relative group">
                      <Input
                        placeholder="Diana Derebe"
                        className="h-12 pl-4 pr-10 rounded-xl border-slate-200 focus-visible:ring-primary/10 font-medium transition-all"
                        {...field}
                      />
                      <User className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-300 group-focus-within:text-primary transition-colors" />
                    </div>
                  </FormControl>
                  <FormMessage className="text-[10px] font-bold" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">
                    Email Address
                  </FormLabel>
                  <FormControl>
                    <div className="relative group">
                      <Input
                        placeholder="hello@lux.com"
                        className="h-12 pl-4 pr-10 rounded-xl border-slate-200 focus-visible:ring-primary/10 font-medium transition-all"
                        {...field}
                      />
                      <Mail className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-300 group-focus-within:text-primary transition-colors" />
                    </div>
                  </FormControl>
                  <FormMessage className="text-[10px] font-bold" />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">
                  Phone (Optional)
                </FormLabel>
                <FormControl>
                  <div className="relative group">
                    <Input
                      placeholder="+251 911 22 33 44"
                      className="h-12 pl-4 pr-10 rounded-xl border-slate-200 focus-visible:ring-primary/10 font-medium transition-all"
                      {...field}
                    />
                    <Phone className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-300 group-focus-within:text-primary transition-colors" />
                  </div>
                </FormControl>
                <FormMessage className="text-[10px] font-bold" />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">
                    Password
                  </FormLabel>
                  <FormControl>
                    <div className="relative group">
                      <Input
                        type="password"
                        placeholder="••••••••"
                        className="h-12 pl-4 pr-10 rounded-xl border-slate-200 focus-visible:ring-primary/10 font-medium transition-all"
                        {...field}
                      />
                      <Lock className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-300 group-focus-within:text-primary transition-colors" />
                    </div>
                  </FormControl>
                  <FormMessage className="text-[10px] font-bold" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">
                    Confirm Password
                  </FormLabel>
                  <FormControl>
                    <div className="relative group">
                      <Input
                        type="password"
                        placeholder="••••••••"
                        className="h-12 pl-4 pr-10 rounded-xl border-slate-200 focus-visible:ring-primary/10 font-medium transition-all"
                        {...field}
                      />
                      <Lock className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-300 group-focus-within:text-primary transition-colors" />
                    </div>
                  </FormControl>
                  <FormMessage className="text-[10px] font-bold" />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="acceptTerms"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 px-1 py-2">
                <FormControl>
                   <Checkbox 
                     checked={field.value} 
                     onCheckedChange={field.onChange}
                     className="data-[state=checked]:bg-secondary data-[state=checked]:border-secondary h-4 w-4 rounded-sm mt-0.5"
                   />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel className="text-[11px] font-bold text-slate-500 cursor-pointer select-none leading-relaxed">
                    I agree to the <Link href="/terms" className="text-secondary hover:underline">Terms of Service</Link> and <Link href="/privacy" className="text-secondary hover:underline">Privacy Policy</Link>
                  </FormLabel>
                </div>
              </FormItem>
            )}
          />

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full h-14 rounded-2xl font-black uppercase tracking-widest shadow-xl shadow-primary/10 transition-all hover:translate-y-[-2px] active:scale-95 group mt-4 hover:bg-secondary hover:text-white"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating Account...
              </>
            ) : (
              <>
                Create Account
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </>
            )}
          </Button>
        </form>
      </Form>

      <div className="text-center pt-6">
        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
          Already a member?{" "}
          <button
            onClick={onSwitchToLogin}
            type="button"
            className="text-secondary font-black hover:underline transition-all ml-1"
          >
            Sign In Now
          </button>
        </p>
      </div>
    </div>
  );
}
