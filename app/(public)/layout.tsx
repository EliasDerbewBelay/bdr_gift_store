import Footer from "@/components/public/layouts/footer";
import Header from "@/components/public/layouts/header";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Header />
      <main className="min-h-screen">{children}</main>
      <Footer />
    </div>
  );
}
