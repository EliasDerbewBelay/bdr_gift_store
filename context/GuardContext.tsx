"use client";
import React, { createContext, useContext, useState } from "react";
import GuestGuardModal from "@/components/auth/GuestGuardModal";

interface GuardContextType {
  showGuard: (onSuccess?: () => void) => void;
  hideGuard: () => void;
}

const GuardContext = createContext<GuardContextType | undefined>(undefined);

export function GuardProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [successCallback, setSuccessCallback] = useState<(() => void) | undefined>(undefined);

  const showGuard = (onSuccess?: () => void) => {
    setIsOpen(true);
    setSuccessCallback(() => onSuccess);
  };

  const hideGuard = () => {
    setIsOpen(false);
    setSuccessCallback(undefined);
  };

  return (
    <GuardContext.Provider value={{ showGuard, hideGuard }}>
      {children}
      <GuestGuardModal isOpen={isOpen} onClose={hideGuard} />
    </GuardContext.Provider>
  );
}

export const useGuard = () => {
  const context = useContext(GuardContext);
  if (context === undefined) {
    throw new Error("useGuard must be used within a GuardProvider");
  }
  return context;
};
