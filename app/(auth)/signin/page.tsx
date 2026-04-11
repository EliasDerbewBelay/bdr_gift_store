import AuthView from "@/components/auth/AuthView";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In | Bahr Dar Gifts",
  description: "Sign in to your Bahr Dar Gifts account to manage your orders and wishlist.",
};

export default function SignInPage() {
  return <AuthView initialTab="login" />;
}
