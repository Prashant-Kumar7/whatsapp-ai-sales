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
} from "lucide-react";
import { signIn } from "next-auth/react";

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
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-gray-100 font-['Inter', sans-serif] transition-colors duration-300">
      <header
        className={`sticky top-0 z-50 transition-all duration-300 bg-white dark:bg-gray-900 bg-opacity-80 dark:bg-opacity-80 backdrop-blur-md ${
          isScrolled ? "py-3 shadow-md" : "py-5"
        }`}
      >
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-indigo-700 dark:text-indigo-400">
              B2B WhatsApp AI Bot
            </h1>
            <nav className="hidden md:flex items-center space-x-8">
              <ul className="flex space-x-8">
                {navItems.map((item, index) => (
                  <li key={index}>
                    {item.href ? (
                      <a
                        href={item.href}
                        className="text-gray-600 dark:text-gray-300 hover:text-indigo-700 dark:hover:text-indigo-400 transition-colors"
                      >
                        {item.label}
                      </a>
                    ) : (
                      <button
                        onClick={item.onClick}
                        className="text-gray-600 dark:text-gray-300 hover:text-indigo-700 dark:hover:text-indigo-400 transition-colors"
                      >
                        {item.label}
                      </button>
                    )}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
              >
                {darkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>
            </nav>
            <button
              className="md:hidden text-gray-600 dark:text-gray-300"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 p-6">
          <nav>
            <ul className="space-y-4">
              {navItems.map((item, index) => (
                <li key={index}>
                  {item.href ? (
                    <a
                      href={item.href}
                      className="block py-2 text-gray-600 dark:text-gray-300 hover:text-indigo-700 dark:hover:text-indigo-400 transition-colors"
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
                      className="block w-full text-left py-2 text-gray-600 dark:text-gray-300 hover:text-indigo-700 dark:hover:text-indigo-400 transition-colors"
                    >
                      {item.label}
                    </button>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}

      <main>
        <section className="text-center py-32">
          <div className="container mx-auto px-6">
            <h2 className="text-5xl font-extrabold mb-6 text-indigo-900 dark:text-indigo-300 leading-tight">
              Revolutionize Your B2B Sales
            </h2>
            <p className="text-xl mb-10 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Harness the power of AI-driven communication for unparalleled
              efficiency.
            </p>
            <Button className="bg-indigo-600 dark:bg-indigo-500 hover:bg-indigo-700 dark:hover:bg-indigo-600 text-white font-semibold px-8 py-4 rounded-lg text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
              Explore the Future
            </Button>
          </div>
        </section>

        <section id="features" className="py-24 bg-white dark:bg-gray-800">
          <div className="container mx-auto px-6">
            <h3 className="text-3xl font-bold mb-16 text-center text-indigo-900 dark:text-indigo-300">
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
                <div
                  key={index}
                  className="bg-gray-50 dark:bg-gray-700 rounded-xl p-8 shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                >
                  <feature.icon className="w-12 h-12 mb-6 text-indigo-600 dark:text-indigo-400" />
                  <h4 className="text-xl font-semibold mb-4 text-indigo-800 dark:text-indigo-200">
                    {feature.title}
                  </h4>
                  <p className="text-gray-600 dark:text-gray-300">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="benefits" className="py-24 bg-indigo-50 dark:bg-gray-900">
          <div className="container mx-auto px-6">
            <h3 className="text-3xl font-bold mb-16 text-center text-indigo-900 dark:text-indigo-300">
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
                <div
                  key={index}
                  className="flex items-start bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg"
                >
                  <benefit.icon className="w-10 h-10 mr-6 text-indigo-600 dark:text-indigo-400 flex-shrink-0" />
                  <div>
                    <h4 className="text-xl font-semibold mb-4 text-indigo-800 dark:text-indigo-200">
                      {benefit.title}
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section
          id="cta"
          className="py-24 bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-900 dark:to-purple-900 text-white"
        >
          <div className="container mx-auto px-6 text-center">
            <h3 className="text-4xl font-bold mb-6">
              Ready to Transform Your B2B Sales Process?
            </h3>
            <p className="mb-10 text-xl max-w-2xl mx-auto opacity-90">
              Experience the power of AI-driven communication. Request a demo
              today.
            </p>
            <form className="max-w-md mx-auto space-y-4">
              <Input
                type="text"
                placeholder="Company Name"
                className="w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 border-0 rounded-lg focus:ring-2 focus:ring-indigo-400 dark:focus:ring-indigo-500"
              />
              <Input
                type="email"
                placeholder="Business Email"
                className="w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 border-0 rounded-lg focus:ring-2 focus:ring-indigo-400 dark:focus:ring-indigo-500"
              />
              <Button className="w-full bg-white dark:bg-gray-800 text-indigo-600 dark:text-indigo-400 hover:bg-gray-100 dark:hover:bg-gray-700 font-semibold px-8 py-4 rounded-lg text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                Request Demo
              </Button>
            </form>
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
                    href="#"
                    className="hover:text-white dark:hover:text-gray-300 transition-colors"
                  >
                    Features
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-white dark:hover:text-gray-300 transition-colors"
                  >
                    Benefits
                  </a>
                </li>
                <li>
                  <a
                    href="#"
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
