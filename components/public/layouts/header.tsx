"use client";
import { useState } from "react";
import { Gift, ShoppingCart, Heart, Menu, X, Search, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

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

            {/* Desktop Auth Buttons */}
            <div className="hidden md:flex items-center gap-2 ml-2">
              <Link
                href="/signin"
                className={`px-4 py-2 text-sm font-medium transition ${
                  isActive("/signin")
                    ? "text-amber-500"
                    : "text-white hover:text-amber-500"
                }`}
              >
                Sign In
              </Link>
              <Link
                href="/signup"
                className={`px-4 py-2 text-sm font-medium rounded-full transition shadow-md hover:shadow-lg ${
                  isActive("/signup")
                    ? "bg-amber-600 text-white"
                    : "bg-amber-500 hover:bg-amber-600 text-slate-950"
                }`}
              >
                Sign Up
              </Link>
            </div>

            {/* Mobile User Menu */}
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
                <li className="pt-4 mt-4 border-t border-white/10">
                  <div className="space-y-2">
                    <Link
                      href="/signin"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`block px-4 py-3 text-center rounded-lg transition text-sm font-medium ${
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
                      className={`block px-4 py-3 text-center rounded-lg transition text-sm font-medium ${
                        isActive("/signup")
                          ? "bg-amber-600 text-white"
                          : "bg-amber-500 hover:bg-amber-600 text-slate-950"
                      }`}
                    >
                      Sign Up
                    </Link>
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
