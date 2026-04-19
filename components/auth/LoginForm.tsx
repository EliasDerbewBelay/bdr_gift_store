"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Mail, Lock, ArrowRight, Loader2, AlertCircle } from "lucide-react";
import { signIn, getSession } from "next-auth/react";
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

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  remember: z.boolean().default(false).optional(),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      remember: false,
    },
  });

  const onSubmit = async (values: LoginFormValues) => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await signIn("credentials", {
        email: values.email,
        password: values.password,
        redirect: false,
      });

      if (result?.error) {
        setError(result.error);
        setIsLoading(false);
      } else {
        const session = await getSession();
        if (session?.user?.role === "ADMIN") {
          router.push("/admin");
        } else {
          router.push("/");
        }
        router.refresh();
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
                      placeholder="alexander@lux.com"
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

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <div className="flex justify-between items-center px-1">
                  <FormLabel className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                    Password
                  </FormLabel>
                  <button
                    type="button"
                    className="text-[10px] font-black uppercase tracking-widest text-secondary hover:text-secondary/80 transition-colors"
                  >
                    Forgot Password?
                  </button>
                </div>
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
            name="remember"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center space-x-3 space-y-0 px-1">
                <FormControl>
                   <Checkbox 
                     checked={field.value} 
                     onCheckedChange={field.onChange}
                     className="data-[state=checked]:bg-secondary data-[state=checked]:border-secondary h-4 w-4 rounded-sm"
                   />
                </FormControl>
                <FormLabel className="text-[11px] font-bold text-slate-500 cursor-pointer select-none">
                  Keep me signed in for 30 days
                </FormLabel>
              </FormItem>
            )}
          />

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full h-14 rounded-2xl font-black uppercase tracking-widest shadow-xl shadow-primary/10 transition-all hover:translate-y-[-2px] active:scale-95 group mt-4"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Validating...
              </>
            ) : (
              <>
                Sign In to Portal
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </>
            )}
          </Button>
        </form>
      </Form>

      <div className="relative py-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-slate-100" />
        </div>
        <div className="relative flex justify-center text-[9px] uppercase tracking-[0.3em] font-black">
          <span className="bg-white px-4 text-slate-300">Or continue with</span>
        </div>
      </div>
    </div>
  );
}
