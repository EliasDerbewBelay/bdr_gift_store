import AuthView from "@/components/auth/AuthView";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign Up | Bahr Dar Gifts",
  description: "Create a Bahr Dar Gifts account to start curating moments of intimacy.",
};

export default function SignUpPage() {
  return <AuthView initialTab="register" />;
}
