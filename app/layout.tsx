import "./globals.css";
import { Providers } from "@/app/providers";
import { GuardProvider } from "@/context/GuardContext";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={cn("font-sans", geist.variable)}>
      <body>
        <Providers>
          <GuardProvider>
            <TooltipProvider>
              {children}
              <Toaster />
            </TooltipProvider>
          </GuardProvider>
        </Providers>
      </body>
    </html>
  );
}
