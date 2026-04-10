import { Gift, ShoppingCart, Heart } from "lucide-react";

export default function Header() {
  const NavLinks = [
    { name: "Home", href: "/" },
    { name: "gifts", href: "/gifts" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];
  return (
    <div className="sticky top-0 z-50 flex items-center justify-between gap-6 bg-slate-950/95 px-6 py-4 text-white shadow-lg shadow-slate-950/20 backdrop-blur-sm">
      <div className="flex items-center gap-3">
        <Gift className="h-9 w-9 text-amber-500" />
        <h1 className="text-2xl font-semibold">Bahr Dar Gifts</h1>
      </div>
      <nav>
        <ul className="flex items-center gap-6 text-sm uppercase tracking-[0.2em]">
          {NavLinks.map((link) => (
            <li key={link.href}>
              <a href={link.href} className="transition hover:text-slate-300">
                {link.name}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <div className="flex items-center gap-3">
        <ShoppingCart className="h-5 w-5" />
        <Heart className="h-5 w-5" />
        <button className="rounded-full border border-white px-4 py-2 text-sm transition hover:bg-white hover:text-slate-950">
          Register
        </button>
        <button className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-slate-200">
          Login
        </button>
      </div>
    </div>
  );
}
