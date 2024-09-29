"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Moon,
  Sun,
  MessageCircle,
  BarChart,
  Zap,
  Clock,
  Building,
  Lock,
  Menu,
  X,
  ChevronRight,
  Github,
  Twitter,
  Linkedin,
} from "lucide-react";
import { signIn } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import { ModeToggle } from "@/components/ui/ModeToggle";

export default function Component() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const navItems = [
    { href: "#features", label: "Features" },
    { href: "#benefits", label: "Benefits" },
    { href: "#cta", label: "Request Demo" },
    {
      label: "Login",
      onClick: () => signIn(undefined, { callbackUrl: "/home" }),
    },
    { label: "Signup" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-100 dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-gray-100 font-sans transition-colors duration-300">
      <header
        className={`fixed w-full top-0 z-50 transition-all duration-300 bg-white/70 dark:bg-gray-900/70 backdrop-blur-lg ${
          isScrolled ? "py-3 shadow-md" : "py-5"
        }`}
      >
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-teal-600 dark:from-cyan-400 dark:to-teal-500">
              B2B WhatsApp AI Bot
            </h1>
            <nav className="hidden md:flex items-center space-x-8">
              <ul className="flex space-x-8">
                {navItems.map((item, index) => (
                  <li key={index}>
                    {item.href ? (
                      <a
                        href={item.href}
                        className="text-gray-700 dark:text-gray-300 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
                      >
                        {item.label}
                      </a>
                    ) : (
                      <button
                        onClick={item.onClick}
                        className="text-gray-700 dark:text-gray-300 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
                      >
                        {item.label}
                      </button>
                    )}
                  </li>
                ))}
              </ul>
              {/* <button
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 transition-colors duration-300 hover:bg-gray-200 dark:hover:bg-gray-700"
              >
                {darkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button> */}
              <ModeToggle/>
            </nav>
            <button
              className="md:hidden text-gray-700 dark:text-gray-300"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="md:hidden fixed inset-0 z-40 bg-white/90 dark:bg-gray-900/90 backdrop-blur-lg"
          >
            <div className="flex justify-end p-6">
              <button
                onClick={() => setIsMenuOpen(false)}
                className="text-gray-700 dark:text-gray-300"
              >
                <X size={24} />
              </button>
            </div>
            <nav className="flex flex-col items-center space-y-8 p-6">
              {navItems.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {item.href ? (
                    <a
                      href={item.href}
                      className="text-2xl font-semibold text-gray-800 dark:text-gray-200 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.label}
                    </a>
                  ) : (
                    <button
                      onClick={() => {
                        item.onClick?.();
                        setIsMenuOpen(false);
                      }}
                      className="text-2xl font-semibold text-gray-800 dark:text-gray-200 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
                    >
                      {item.label}
                    </button>
                  )}
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      <main>
        <section className="relative text-center py-32 mt-16 overflow-hidden">
          <div className="container mx-auto px-6 relative z-10">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-5xl md:text-6xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-cyan-600 to-teal-600 dark:from-cyan-400 dark:to-teal-400 leading-tight"
            >
              Revolutionize Your B2B Sales
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl mb-10 text-gray-700 dark:text-gray-300 max-w-2xl mx-auto"
            >
              Harness the power of AI-driven communication for unparalleled
              efficiency and growth.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Button className="bg-gradient-to-r from-cyan-600 to-teal-600 dark:from-cyan-500 dark:to-teal-500 hover:from-cyan-700 hover:to-teal-700 dark:hover:from-cyan-600 dark:hover:to-teal-600 text-white font-semibold px-8 py-4 rounded-full text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                Explore the Future
                <ChevronRight className="ml-2" />
              </Button>
            </motion.div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-teal-600 opacity-10 dark:opacity-20" />
          <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
        </section>

        <section id="features" className="py-24 bg-white dark:bg-gray-800">
          <div className="container mx-auto px-6">
            <h3 className="text-3xl font-bold mb-16 text-center bg-clip-text text-transparent bg-gradient-to-r from-cyan-600 to-teal-600 dark:from-cyan-400 dark:to-teal-400">
              Enterprise-Grade Features
            </h3>
            <div className="grid md:grid-cols-3 gap-12">
              {[
                {
                  icon: MessageCircle,
                  title: "AI-Powered Conversations",
                  description:
                    "Engage clients with intelligent, context-aware responses.",
                },
                {
                  icon: BarChart,
                  title: "Advanced Analytics",
                  description:
                    "Gain insights from comprehensive conversation data.",
                },
                {
                  icon: Zap,
                  title: "Seamless Integration",
                  description: "Easily connect with your existing B2B systems.",
                },
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="bg-gray-100 dark:bg-gray-800 rounded-xl p-8 shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                >
                  <feature.icon className="w-12 h-12 mb-6 text-cyan-600 dark:text-cyan-400" />
                  <h4 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
                    {feature.title}
                  </h4>
                  <p className="text-gray-600 dark:text-gray-300">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section id="benefits" className="py-24 bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto px-6">
            <h3 className="text-3xl font-bold mb-16 text-center bg-clip-text text-transparent bg-gradient-to-r from-cyan-600 to-teal-600 dark:from-cyan-400 dark:to-teal-400">
              B2B Benefits
            </h3>
            <div className="grid md:grid-cols-2 gap-12">
              {[
                {
                  icon: Clock,
                  title: "Time Efficiency",
                  description:
                    "Automate responses to save valuable time for your team.",
                },
                {
                  icon: Building,
                  title: "Scalable Solution",
                  description:
                    "Grow your business without proportionally increasing support costs.",
                },
                {
                  icon: Lock,
                  title: "Enhanced Security",
                  description:
                    "Ensure data protection with enterprise-grade security measures.",
                },
                {
                  icon: BarChart,
                  title: "Improved Conversion",
                  description:
                    "Increase sales with timely and relevant customer interactions.",
                },
              ].map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="flex items-start bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <benefit.icon className="w-10 h-10 mr-6 text-cyan-600 dark:text-cyan-400 flex-shrink-0" />
                  <div>
                    <h4 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
                      {benefit.title}
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300">
                      {benefit.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section
          id="cta"
          className="py-24 bg-gradient-to-r from-cyan-600 to-teal-600 dark:from-cyan-900 dark:to-teal-900 text-white"
        >
          <div className="container mx-auto px-6 text-center">
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl font-bold mb-6"
            >
              Ready to Transform Your B2B Sales Process?
            </motion.h3>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-10 text-xl max-w-2xl mx-auto opacity-90"
            >
              Experience the power of AI-driven communication. Request a demo
              today.
            </motion.p>
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="max-w-md mx-auto space-y-4"
            >
              <Input
                type="text"
                placeholder="Company Name"
                className="w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 border-0 rounded-full focus:ring-2 focus:ring-cyan-400 dark:focus:ring-cyan-500"
              />
              <Input
                type="email"
                placeholder="Business Email"
                className="w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 border-0 rounded-full focus:ring-2 focus:ring-cyan-400 dark:focus:ring-cyan-500"
              />
              <Button className="w-full bg-white dark:bg-gray-800 text-cyan-600 dark:text-cyan-400 hover:bg-gray-100 dark:hover:bg-gray-700 font-semibold px-8 py-4 rounded-full text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                Request Demo
              </Button>
            </motion.form>
          </div>
        </section>
      </main>

      <footer className="bg-gray-900 dark:bg-black text-gray-400 dark:text-gray-500 py-12">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h4 className="text-white dark:text-gray-300 font-semibold mb-4">
                About Us
              </h4>
              <p className="text-sm">
                Innovating B2B communication with AI-powered solutions.
              </p>
            </div>
            <div>
              <h4 className="text-white dark:text-gray-300 font-semibold mb-4">
                Quick Links
              </h4>
              <ul className="text-sm space-y-2">
                <li>
                  <a
                    href="#"
                    className="hover:text-white dark:hover:text-gray-300 transition-colors"
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href="#features"
                    className="hover:text-white dark:hover:text-gray-300 transition-colors"
                  >
                    Features
                  </a>
                </li>
                <li>
                  <a
                    href="#benefits"
                    className="hover:text-white dark:hover:text-gray-300 transition-colors"
                  >
                    Benefits
                  </a>
                </li>
                <li>
                  <a
                    href="#contact"
                    className="hover:text-white dark:hover:text-gray-300 transition-colors"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-white dark:text-gray-300 font-semibold mb-4">
                Contact
              </h4>
              <p className="text-sm">info@b2bwhatsappbot.com</p>
              <p className="text-sm">+1 (555) 123-4567</p>
            </div>
            <div>
              <h4 className="text-white dark:text-gray-300 font-semibold mb-4">
                Follow Us
              </h4>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <Twitter size={20} />
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <Linkedin size={20} />
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <Github size={20} />
                </a>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 dark:border-gray-700 text-center">
            <p>
              &copy; {new Date().getFullYear()} B2B WhatsApp AI Bot. All rights
              reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
