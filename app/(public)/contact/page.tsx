"use client";
import { useState } from "react";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  MessageCircle,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import {
  FaInstagram,
  FaFacebookF,
  FaTwitter,
  FaWhatsapp,
} from "react-icons/fa";
import { motion } from "framer-motion";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const contactInfo = [
    {
      icon: MapPin,
      title: "Visit Our Studio",
      details: ["Bahr Dar, Amhara Region", "Ethiopia"],
      color: "bg-amber-100 text-amber-600",
    },
    {
      icon: Phone,
      title: "Call Us",
      details: ["+251 11 123 4567", "+251 91 234 5678"],
      color: "bg-sky-100 text-sky-600",
    },
    {
      icon: Mail,
      title: "Email Us",
      details: ["hello@bahrdargifts.com", "support@bahrdargifts.com"],
      color: "bg-emerald-100 text-emerald-600",
    },
    {
      icon: Clock,
      title: "Business Hours",
      details: ["Mon - Fri: 9:00 AM - 6:00 PM", "Sat: 10:00 AM - 4:00 PM"],
      color: "bg-purple-100 text-purple-600",
    },
  ];

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });

      // Reset success message after 5 seconds
      setTimeout(() => setIsSubmitted(false), 5000);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-amber-50 via-white to-sky-50 py-16 sm:py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 mb-6">
              Get in Touch
            </h1>
            <p className="text-lg sm:text-xl text-slate-600 leading-relaxed">
              Have questions about our gifts or want to discuss a custom order?
              I'd love to hear from you. Send me a message and I'll respond as
              soon as possible.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((info, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group p-6 bg-slate-50 rounded-2xl hover:shadow-lg transition-all"
              >
                <div
                  className={`w-14 h-14 ${info.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition`}
                >
                  <info.icon className="w-7 h-7" />
                </div>

                <h3 className="text-lg font-semibold text-slate-900 mb-3">
                  {info.title}
                </h3>

                <div className="space-y-1">
                  {info.details.map((detail, i) => (
                    <p key={i} className="text-slate-600 text-sm">
                      {detail}
                    </p>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Map Section */}
      <section className="py-16 sm:py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">
                Send a Message
              </h2>
              <p className="text-slate-600 mb-8">
                Fill out the form below and I'll get back to you within 24
                hours.
              </p>

              {isSubmitted && (
                <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-600" />
                  <span className="text-emerald-700">
                    Thank you! Your message has been sent successfully.
                  </span>
                </div>
              )}

              {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3">
                  <AlertCircle className="w-5 h-5 text-red-600" />
                  <span className="text-red-700">{error}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-slate-700 mb-2"
                    >
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition"
                      placeholder="Your name"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-slate-700 mb-2"
                    >
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-slate-700 mb-2"
                    >
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition"
                      placeholder="+251"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-sm font-medium text-slate-700 mb-2"
                    >
                      Subject *
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition"
                    >
                      <option value="">Select a subject</option>
                      <option value="general">General Inquiry</option>
                      <option value="custom">Custom Order</option>
                      <option value="wholesale">Wholesale/Bulk Order</option>
                      <option value="support">Customer Support</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-slate-700 mb-2"
                  >
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition resize-none"
                    placeholder="Tell me about your gift needs or questions..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="inline-flex items-center justify-center gap-2 w-full sm:w-auto bg-amber-500 hover:bg-amber-600 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-semibold px-8 py-4 rounded-full transition shadow-lg hover:shadow-xl"
                >
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <Send className="w-5 h-5" />
                    </>
                  )}
                </button>
              </form>
            </motion.div>

            {/* Map & Additional Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              {/* Map Placeholder */}
              <div className="bg-white rounded-2xl overflow-hidden shadow-lg border border-slate-200">
                <div className="aspect-[4/3] bg-slate-200 relative">
                  <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-slate-200 to-slate-300">
                    <div className="text-center">
                      <MapPin className="w-12 h-12 text-amber-500 mx-auto mb-3" />
                      <p className="text-slate-700 font-medium">
                        Bahr Dar, Ethiopia
                      </p>
                      <p className="text-slate-500 text-sm mt-1">
                        Near Lake Tana
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* FAQ Quick Links */}
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
                <h3 className="text-lg font-semibold text-slate-900 mb-4">
                  Frequently Asked Questions
                </h3>
                <div className="space-y-3">
                  <div className="pb-3 border-b border-slate-100">
                    <p className="font-medium text-slate-800 mb-1">
                      Do you take custom orders?
                    </p>
                    <p className="text-sm text-slate-600">
                      Yes! I love creating custom pieces. Just send me your
                      ideas.
                    </p>
                  </div>
                  <div className="pb-3 border-b border-slate-100">
                    <p className="font-medium text-slate-800 mb-1">
                      What's your delivery area?
                    </p>
                    <p className="text-sm text-slate-600">
                      I deliver throughout Bahr Dar and can ship across
                      Ethiopia.
                    </p>
                  </div>
                  <div>
                    <p className="font-medium text-slate-800 mb-1">
                      How long does delivery take?
                    </p>
                    <p className="text-sm text-slate-600">
                      Local delivery: 1-2 days. Shipping: 3-5 business days.
                    </p>
                  </div>
                </div>
              </div>

              {/* Social Connect */}
              <div className="bg-gradient-to-br from-amber-500 to-amber-600 rounded-2xl p-6 text-white">
                <h3 className="text-lg font-semibold mb-3">Connect With Me</h3>
                <p className="text-white/90 text-sm mb-4">
                  Follow me on social media for behind-the-scenes content and
                  new arrivals!
                </p>
                <div className="flex gap-3">
                  <a
                    href="https://instagram.com/bahrdargifts"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition"
                    aria-label="Instagram"
                  >
                    <FaInstagram className="w-5 h-5" />
                  </a>
                  <a
                    href="https://facebook.com/bahrdargifts"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition"
                    aria-label="Facebook"
                  >
                    <FaFacebookF className="w-5 h-5" />
                  </a>
                  <a
                    href="https://twitter.com/bahrdargifts"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition"
                    aria-label="Twitter"
                  >
                    <FaTwitter className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* WhatsApp Quick Contact */}
      <section className="py-8 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-emerald-50 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-4"
          >
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-emerald-500 rounded-full flex items-center justify-center">
                <FaWhatsapp className="w-7 h-7 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-900">
                  Prefer a quick chat?
                </h3>
                <p className="text-slate-600">
                  Message me on WhatsApp for faster responses!
                </p>
              </div>
            </div>

            <a
              href="https://wa.me/251911234567"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold px-6 py-3 rounded-full transition shadow-lg hover:shadow-xl"
            >
              <FaWhatsapp className="w-5 h-5" />
              Chat on WhatsApp
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
