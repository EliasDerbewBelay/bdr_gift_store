import { Gift, Phone, MapPin, ChevronRight } from "lucide-react";
import { FaTelegramPlane, FaFacebookF, FaInstagram } from "react-icons/fa";

const footerLinks = [
  {
    title: "Shop",
    links: [
      { name: "All Gifts", href: "/gifts" },
      { name: "Birthday", href: "/gifts/birthday" },
      { name: "Wedding", href: "/gifts/wedding" },
      { name: "Anniversary", href: "/gifts/anniversary" },
      { name: "Corporate", href: "/gifts/corporate" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-200">
      {/* Main Footer Content */}
      <div className="mx-auto max-w-7xl px-6 py-16">
        {/* Grid Layout - Responsive */}
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-3">
          {/* Brand Column */}
          <div className="space-y-6">
            {/* Logo & Brand */}
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl flex items-center justify-center">
                <Gift className="h-7 w-7 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Bahr Dar Gifts</h3>
                <p className="text-xs text-amber-500 tracking-wider">
                  PREMIUM GIFT DELIVERY
                </p>
              </div>
            </div>

            <p className="text-slate-400 text-sm leading-relaxed max-w-md">
              Curated gift collections crafted for every celebration and moment.
              We deliver joy across Bahr Dar and beyond with elegance and care.
            </p>

            {/* Newsletter Signup */}
            <div className="space-y-3">
              <p className="text-sm font-medium text-white">
                Subscribe to our newsletter
              </p>
              <div className="flex gap-2 max-w-md">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-2.5 bg-slate-900 border border-slate-800 rounded-lg text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-amber-500 transition"
                />
                <button className="px-5 py-2.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-medium text-sm rounded-lg transition">
                  Subscribe
                </button>
              </div>
            </div>
          </div>

          {/* Shop Links Column */}
          {footerLinks.map((section) => (
            <div key={section.title} className="space-y-4">
              <h4 className="text-sm font-semibold uppercase tracking-wider text-white">
                {section.title}
              </h4>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="group flex items-center text-sm text-slate-400 hover:text-amber-500 transition"
                    >
                      <ChevronRight className="w-3 h-3 mr-1 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact & Social Column */}
          <div className="space-y-6">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white">
              Contact & Follow
            </h4>

            {/* Contact Information */}
            <div className="space-y-4">
              <a
                href="tel:+251111234567"
                className="flex items-center gap-3 group"
              >
                <div className="w-10 h-10 bg-slate-900 group-hover:bg-amber-500 rounded-full flex items-center justify-center transition">
                  <Phone className="w-4 h-4 text-amber-500 group-hover:text-white transition" />
                </div>
                <div>
                  <p className="text-xs text-slate-500">Call us</p>
                  <p className="text-sm text-white group-hover:text-amber-500 transition">
                    +251 11 123 4567
                  </p>
                </div>
              </a>

              <div className="flex items-start gap-3 group">
                <div className="w-10 h-10 bg-slate-900 group-hover:bg-amber-500 rounded-full flex items-center justify-center transition">
                  <MapPin className="w-4 h-4 text-amber-500 group-hover:text-white transition" />
                </div>
                <div>
                  <p className="text-xs text-slate-500">Location</p>
                  <p className="text-sm text-white">Bahr Dar, Ethiopia</p>
                </div>
              </div>
            </div>

            {/* Social Media Links */}
            <div className="pt-4">
              <p className="text-sm font-medium text-white mb-3">Follow Us</p>
              <div className="flex gap-3">
                <a
                  href="https://t.me/bahrdargifts"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 bg-slate-900 hover:bg-[#0088cc] rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                  aria-label="Telegram"
                >
                  <FaTelegramPlane className="w-5 h-5 text-slate-300" />
                </a>

                <a
                  href="https://facebook.com/bahrdargifts"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 bg-slate-900 hover:bg-[#1877f2] rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                  aria-label="Facebook"
                >
                  <FaFacebookF className="w-5 h-5 text-slate-300" />
                </a>

                <a
                  href="https://instagram.com/bahrdargifts"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 bg-slate-900 hover:bg-gradient-to-br hover:from-[#f09433] hover:via-[#e6683c] hover:to-[#bc1888] rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                  aria-label="Instagram"
                >
                  <FaInstagram className="w-5 h-5 text-slate-300" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-800 bg-slate-950/95">
        <div className="mx-auto max-w-7xl px-6 py-5">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
            <p className="text-slate-500">
              © 2026 Bahr Dar Gifts. All rights reserved.
            </p>

            <p className="text-slate-500 text-sm">Made with ❤️ in Ethiopia</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
