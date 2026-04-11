"use client";
import { useAuth } from "@/context/AuthContext";
import { useGuard } from "@/context/GuardContext";

/**
 * A professional hook to guard actions that require authentication.
 * If the user is authenticated, the action is executed.
 * If not, the Guest Guard Modal is displayed.
 */
export function useAuthGuard() {
  const { isAuthenticated } = useAuth();
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
