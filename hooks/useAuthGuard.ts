"use client";
import { useSession } from "next-auth/react";
import { useGuard } from "@/context/GuardContext";

export function useAuthGuard() {
  const { status } = useSession();
  const isAuthenticated = status === "authenticated";
  const { showGuard } = useGuard();

  const authenticatedAction = (action: () => void) => {
    if (isAuthenticated) {
      action();
      return true;
    } else {
      showGuard(action);
      return false;
    }
  };

  return { authenticatedAction, isAuthenticated };
}
