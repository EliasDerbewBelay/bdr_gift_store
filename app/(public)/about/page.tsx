"use client";
import Image from "next/image";
import {
  Heart,
  Award,
  Users,
  Package,
  Sparkles,
  MapPin,
  Mail,
  Quote,
  Flower,
  Gift,
  Scissors,
  Palette,
} from "lucide-react";
import { FaInstagram, FaFacebookF } from "react-icons/fa";
import { motion } from "framer-motion";

export default function AboutPage() {
  const stats = [
    { value: "500+", label: "Gifts Delivered", icon: Package },
    { value: "200+", label: "Happy Customers", icon: Users },
    { value: "50+", label: "Custom Orders", icon: Sparkles },
    { value: "5+", label: "Years Experience", icon: Award },
  ];

  const values = [
    {
      icon: Heart,
      title: "Made with Love",
      description:
        "Every piece is handcrafted with care and attention to detail",
    },
    {
      icon: Flower,
      title: "Local Artisan",
      description: "Proudly creating unique gifts right here in Bahr Dar",
    },
    {
      icon: Palette,
      title: "Custom Designs",
      description: "Personalized creations that tell your unique story",
    },
    {
      icon: Gift,
      title: "Premium Quality",
      description: "Only the finest materials for lasting impressions",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-amber-50 via-white to-sky-50 py-16 sm:py-20 lg:py-24 overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-10 left-10 text-amber-200">
          <Flower className="w-16 h-16 opacity-20" />
        </div>
        <div className="absolute bottom-10 right-10 text-sky-200">
          <Gift className="w-20 h-20 opacity-20" />
        </div>

        <div className="relative max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left - Content */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 bg-amber-100 px-4 py-2 rounded-full mb-6">
                <Sparkles className="w-4 h-4 text-amber-600" />
                <span className="text-amber-700 text-sm font-medium">
                  Meet the Maker
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 mb-6">
                Crafting Joy from
                <span className="text-amber-600 block mt-2">
                  Bahr Dar with Love
                </span>
              </h1>

              <div className="space-y-4 mb-8">
                <p className="text-lg text-slate-600 leading-relaxed">
                  Hi, I'm{" "}
                  <span className="font-semibold text-slate-900">
                    Diana Derebe
                  </span>
                  , the heart and hands behind Bahr Dar Gifts. What started as a
                  personal passion for creating beautiful handmade treasures has
                  blossomed into a beloved local gift store serving our
                  wonderful community.
                </p>
                <p className="text-slate-600 leading-relaxed">
                  Every piece in my collection is thoughtfully designed and
                  carefully crafted right here in Bahr Dar. I believe that the
                  best gifts carry a piece of the maker's heart, and that's
                  exactly what I pour into every creation.
                </p>
              </div>

              <div className="flex items-center gap-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-amber-600" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">Location</p>
                    <p className="font-medium text-slate-900">
                      Bahr Dar, Ethiopia
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
                    <Mail className="w-5 h-5 text-amber-600" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">Email</p>
                    <p className="font-medium text-slate-900">
                      diana@bahrdargifts.com
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right - Image */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="relative aspect-[4/5] max-w-md mx-auto lg:max-w-none">
                {/* Background decoration */}
                <div className="absolute -top-4 -left-4 w-32 h-32 bg-amber-200 rounded-full opacity-20 blur-2xl" />
                <div className="absolute -bottom-4 -right-4 w-40 h-40 bg-sky-200 rounded-full opacity-20 blur-2xl" />

                {/* Main image */}
                <div className="relative h-full rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                  <Image
                    src="https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?q=80&w=1974&auto=format&fit=crop"
                    alt="Diana Derebe - Bahr Dar Gifts"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>

                {/* Floating elements */}
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute -top-6 -right-6 w-20 h-20 bg-white rounded-2xl shadow-xl flex items-center justify-center"
                >
                  <Scissors className="w-8 h-8 text-amber-500" />
                </motion.div>

                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="absolute -bottom-8 -left-8 w-24 h-24 bg-amber-500 rounded-2xl shadow-xl flex items-center justify-center"
                >
                  <span className="text-3xl">🎨</span>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 bg-amber-100 rounded-full mb-3">
                  <stat.icon className="w-6 h-6 text-amber-600" />
                </div>
                <div className="text-3xl font-bold text-slate-900 mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-slate-500">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 sm:py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left - Story content */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-6">
                My Story & Passion
              </h2>

              <div className="space-y-4 text-slate-600 leading-relaxed">
                <p>
                  Growing up in beautiful Bahr Dar, I was always surrounded by
                  rich culture, vibrant colors, and the warmth of community. My
                  grandmother taught me the art of handcrafting when I was just
                  a little girl, and those precious moments sparked a lifelong
                  passion.
                </p>
                <p>
                  What started as creating gifts for family and friends soon
                  grew into something bigger. People fell in love with the
                  unique, personal touch in every piece I made. In 2021, I
                  decided to turn this passion into Bahr Dar Gifts - a place
                  where every creation tells a story.
                </p>
                <p>
                  Today, I work from my cozy studio in Bahr Dar, carefully
                  selecting materials, designing new pieces, and personally
                  crafting each order. Every gift that leaves my studio carries
                  a piece of my heart and the spirit of our beautiful city.
                </p>
              </div>
            </motion.div>

            {/* Right - Quote */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="bg-gradient-to-br from-amber-500 to-amber-600 rounded-3xl p-8 sm:p-10 lg:p-12 text-white shadow-xl">
                <Quote className="w-12 h-12 text-white/30 mb-6" />

                <p className="text-xl sm:text-2xl font-medium leading-relaxed mb-6">
                  I believe every gift should be as unique as the person
                  receiving it. That's why I pour my heart into every single
                  creation.
                </p>

                <div>
                  <p className="font-semibold text-lg">- Diana Derebe</p>
                  <p className="text-white/80">
                    Founder & Artisan, Bahr Dar Gifts
                  </p>
                </div>
              </div>

              {/* Decorative dots */}
              <div className="absolute -z-10 top-10 -right-6 w-32 h-32 bg-amber-200 rounded-full opacity-20 blur-2xl" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              What Makes My Work Special
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Every creation is guided by these core values that define the Bahr
              Dar Gifts experience
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group p-6 bg-slate-50 rounded-2xl hover:shadow-lg transition-all"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition">
                  <value.icon className="w-7 h-7 text-white" />
                </div>

                <h3 className="text-lg font-semibold text-slate-900 mb-2">
                  {value.title}
                </h3>

                <p className="text-sm text-slate-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Connect Section */}
      <section className="py-16 sm:py-20 bg-gradient-to-r from-amber-500 to-amber-600">
        <div className="max-w-4xl mx-auto px-5 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Let's Create Something Beautiful Together
            </h2>

            <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
              Whether you're looking for a special gift or want to discuss a
              custom creation, I'd love to hear from you!
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="inline-flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-amber-600 font-semibold px-8 py-4 rounded-full transition shadow-lg hover:shadow-xl">
                <Mail className="w-5 h-5" />
                Contact Me
              </button>

              <div className="flex items-center justify-center gap-3">
                <a
                  href="https://instagram.com/bahrdargifts"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center transition"
                  aria-label="Instagram"
                >
                  <FaInstagram className="w-5 h-5 text-white" />
                </a>
                <a
                  href="https://facebook.com/bahrdargifts"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center transition"
                  aria-label="Facebook"
                >
                  <FaFacebookF className="w-5 h-5 text-white" />
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
