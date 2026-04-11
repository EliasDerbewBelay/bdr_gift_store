import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { GuardProvider } from "@/context/GuardContext";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <GuardProvider>
            {children}
          </GuardProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
