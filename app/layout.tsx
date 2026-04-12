import "./globals.css";
import { Providers } from "@/app/providers";
import { GuardProvider } from "@/context/GuardContext";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <GuardProvider>
            {children}
          </GuardProvider>
        </Providers>
      </body>
    </html>
  );
}
