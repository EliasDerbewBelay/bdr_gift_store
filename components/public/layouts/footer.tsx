import { Gift } from "lucide-react";

const footerLinks = [
  { name: "Home", href: "/" },
  { name: "Gifts", href: "/gifts" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-200">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-6 py-12 md:flex-row md:items-start md:justify-between">
        <div className="flex items-center gap-3">
          <Gift className="h-10 w-10 text-amber-500" />
          <div>
            <p className="text-lg font-semibold text-white">Bahr Dar Gifts</p>
            <p className="max-w-xs text-sm text-slate-400">
              Curated gift collections crafted for every celebration and moment.
            </p>
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div className="flex flex-col items-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">
              Explore
            </p>
            <ul className="space-x-2 flex text-sm text-slate-300">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="transition hover:text-white">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div>
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">
            Contact
          </p>
          <p className="text-sm text-slate-300">support@bahrdargifts.com</p>
          <p className="text-sm text-slate-300">+251 11 123 4567</p>
        </div>
      </div>

      <div className="border-t border-slate-800 bg-slate-950/90 px-6 py-4 text-sm text-slate-500">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <p>© 2026 Bahr Dar Gifts. All rights reserved.</p>
          <p>Designed to match the same premium feel as the header.</p>
        </div>
      </div>
    </footer>
  );
}
