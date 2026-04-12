"use client";
import { useState } from "react";
import { Gift, ShoppingCart, Heart, Menu, X, Search, User } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuthGuard } from "@/hooks/useAuthGuard";
import { useSession, signOut } from "next-auth/react";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { data: session, status } = useSession();
  const pathname = usePathname();
  const router = useRouter();
  const { authenticatedAction } = useAuthGuard();

  const NavLinks = [
    { name: "Home", href: "/" },
    { name: "Gifts", href: "/gifts" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  };

  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push("/");
    router.refresh();
  };

  return (
    <>
      <header className="sticky top-0 z-50 bg-sky-900/95 backdrop-blur-sm shadow-lg shadow-slate-950/20">
        {/* Main Header Bar */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3 lg:py-4">
          {/* Left Section - Mobile Menu Button & Logo */}
          <div className="flex items-center gap-3">
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 hover:bg-white/10 rounded-lg transition"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6 text-white" />
              ) : (
                <Menu className="h-6 w-6 text-white" />
              )}
            </button>

            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 sm:gap-3 group">
              <div className="relative">
                <Gift className="h-7 w-7 sm:h-8 sm:w-8 lg:h-9 lg:w-9 text-amber-500 transition-transform group-hover:scale-110" />
              </div>
              <div className="flex flex-col">
                <h1 className="text-lg sm:text-xl lg:text-2xl font-semibold text-white leading-tight">
                  Bahr Dar Gifts
                </h1>
                <span className="hidden sm:block text-[10px] text-amber-500 tracking-wider">
                  PREMIUM DELIVERY
                </span>
              </div>
            </Link>
          </div>

          {/* Center Section - Desktop Navigation */}
          <nav className="hidden lg:block">
            <ul className="flex items-center gap-8">
              {NavLinks.map((link) => {
                const active = isActive(link.href);
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={`text-sm font-medium uppercase tracking-wider transition relative group ${
                        active
                          ? "text-amber-500"
                          : "text-white/90 hover:text-amber-500"
                      }`}
                    >
                      {link.name}
                      <span
                        className={`absolute -bottom-1 left-0 h-0.5 bg-amber-500 transition-all ${
                          active ? "w-full" : "w-0 group-hover:w-full"
                        }`}
                      />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Right Section - Actions */}
          <div className="flex items-center gap-1 sm:gap-2 lg:gap-3">
            {/* Search - Hidden on mobile */}
            <button className="hidden sm:flex p-2 hover:bg-white/10 rounded-full transition">
              <Search className="h-5 w-5 text-white" />
            </button>

            {/* Wishlist */}
            <Link
              href="/wishlist"
              onClick={(e) => {
                e.preventDefault();
                authenticatedAction(() => router.push("/wishlist"));
              }}
              className="relative p-2 hover:bg-white/10 rounded-full transition group"
            >
              <Heart
                className={`h-5 w-5 transition ${
                  isActive("/wishlist")
                    ? "text-amber-500"
                    : "text-white group-hover:text-amber-500"
                }`}
              />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-amber-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                0
              </span>
            </Link>

            {/* Cart */}
            <Link
              href="/cart"
              onClick={(e) => {
                e.preventDefault();
                authenticatedAction(() => router.push("/cart"));
              }}
              className="relative p-2 hover:bg-white/10 rounded-full transition group"
            >
              <ShoppingCart
                className={`h-5 w-5 transition ${
                  isActive("/cart")
                    ? "text-amber-500"
                    : "text-white group-hover:text-amber-500"
                }`}
              />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-amber-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                0
              </span>
            </Link>

            {/* Desktop Auth Section */}
            <div className="hidden md:flex items-center gap-3 ml-4">
              {status === "authenticated" ? (
                <div className="relative">
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center gap-3 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-full transition group border border-white/10"
                  >
                    <div className="w-8 h-8 rounded-full bg-amber-500 flex items-center justify-center text-slate-900 font-bold text-xs">
                      {session?.user?.name?.charAt(0) || "U"}
                    </div>
                    <span className="text-sm font-medium text-white max-w-[120px] truncate">
                      {session?.user?.name}
                    </span>
                  </button>

                  {isUserMenuOpen && (
                    <div className="absolute right-0 mt-3 w-56 bg-sky-950 border border-white/10 rounded-xl shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                      <div className="p-4 border-b border-white/5 bg-white/5">
                        <p className="text-[10px] text-amber-500 font-bold uppercase tracking-widest mb-1">Signed in as</p>
                        <p className="text-sm text-white font-medium truncate">{session?.user?.email}</p>
                      </div>
                      <div className="p-2">
                        <Link
                          href="/account"
                          onClick={() => setIsUserMenuOpen(false)}
                          className="flex items-center gap-3 px-4 py-3 text-sm text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition"
                        >
                          <User className="h-4 w-4" />
                          My Account
                        </Link>
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition"
                        >
                          <X className="h-4 w-4" />
                          Log Out
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <>
                  <Link
                    href="/signin"
                    className={`px-5 py-2.5 text-sm font-bold tracking-wide transition-all duration-300 ${
                      isActive("/signin")
                        ? "text-amber-500 underline underline-offset-8"
                        : "text-white/90 hover:text-amber-500"
                    }`}
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/signup"
                    className={`px-6 py-2.5 text-sm font-bold tracking-tight rounded-md transition-all duration-300 shadow-lg active:scale-95 ${
                      isActive("/signup")
                        ? "bg-amber-600 text-white ring-2 ring-amber-500/20"
                        : "bg-amber-500 hover:bg-amber-600 text-slate-950 hover:shadow-amber-500/20"
                    }`}
                  >
                    Join Now
                  </Link>
                </>
              )}
            </div>

            {/* Mobile User/Menu Trigger */}
            {status === "authenticated" ? (
               <Link
               href="/account"
               className="md:hidden p-2 hover:bg-white/10 rounded-full transition"
             >
               <div className="w-8 h-8 rounded-full bg-amber-500 flex items-center justify-center text-slate-900 font-bold text-xs ring-2 ring-white/10">
                 {session?.user?.name?.charAt(0) || "U"}
               </div>
             </Link>
            ) : (
              <Link
                href="/account"
                className="md:hidden p-2 hover:bg-white/10 rounded-full transition"
              >
                <User
                  className={`h-5 w-5 ${
                    isActive("/account") ? "text-amber-500" : "text-white"
                  }`}
                />
              </Link>
            )}
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="sm:hidden px-4 pb-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="search"
              placeholder="Search gifts..."
              className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder:text-slate-400 text-sm focus:outline-none focus:border-amber-500 transition"
            />
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-white/10 bg-sky-900/98">
            <nav className="px-4 py-4">
              <ul className="space-y-1">
                {NavLinks.map((link) => {
                  const active = isActive(link.href);
                  return (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`block px-4 py-3 rounded-lg transition text-sm font-medium uppercase tracking-wider ${
                          active
                            ? "text-amber-500 bg-white/10"
                            : "text-white/90 hover:text-amber-500 hover:bg-white/5"
                        }`}
                      >
                        {link.name}
                      </Link>
                    </li>
                  );
                })}

                {/* Mobile Auth Links */}
                <li className="pt-6 mt-6 border-t border-white/20">
                  <div className="flex flex-col gap-3">
                    {status === "authenticated" ? (
                      <>
                        <div className="px-4 py-2">
                          <p className="text-[10px] text-amber-500 font-bold uppercase tracking-widest">Signed in as</p>
                          <p className="text-sm text-white font-medium truncate">{session?.user?.email}</p>
                        </div>
                        <Link
                          href="/account"
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="block px-4 py-4 text-center rounded-lg transition-all text-sm font-bold tracking-widest uppercase text-white hover:bg-white/10"
                        >
                          My Account
                        </Link>
                        <button
                          onClick={() => { handleLogout(); setIsMobileMenuOpen(false); }}
                          className="block w-full px-4 py-4 text-center rounded-lg transition-all text-sm font-bold tracking-widest uppercase bg-red-500/20 text-red-400 hover:bg-red-500/30"
                        >
                          Log Out
                        </button>
                      </>
                    ) : (
                      <>
                        <Link
                          href="/signin"
                          onClick={() => setIsMobileMenuOpen(false)}
                          className={`block px-4 py-4 text-center rounded-lg transition-all text-sm font-bold tracking-widest uppercase ${
                            isActive("/signin")
                              ? "text-amber-500 bg-white/10"
                              : "text-white hover:bg-white/10"
                          }`}
                        >
                          Sign In
                        </Link>
                        <Link
                          href="/signup"
                          onClick={() => setIsMobileMenuOpen(false)}
                          className={`block px-4 py-4 text-center rounded-lg transition-all shadow-lg active:scale-95 text-sm font-bold tracking-widest uppercase ${
                            isActive("/signup")
                              ? "bg-amber-600 text-white"
                              : "bg-amber-500 text-slate-950"
                          }`}
                        >
                          Join The Circle
                        </Link>
                      </>
                    )}
                  </div>
                </li>
              </ul>
            </nav>
          </div>
        )}
      </header>
    </>
  );
}
