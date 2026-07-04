/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { Menu, X, Sun, Moon } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface NavigationProps {
  theme: "dark" | "light";
  onToggleTheme: () => void;
  onOpenAdmin: () => void;
}

export default function Navigation({ theme, onToggleTheme, onOpenAdmin }: NavigationProps) {
  const [activeSection, setActiveSection] = useState("home");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navItems = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "journey", label: "Journey" },
    { id: "education", label: "Education" },
    { id: "expertise", label: "Expertise" },
    { id: "highlights", label: "Highlights" },
    { id: "learning", label: "Learning" },
    { id: "philosophy", label: "Philosophy" },
    { id: "beyond-work", label: "Beyond Work" },
    { id: "contact", label: "Contact" }
  ];

  useEffect(() => {
    // Scroll to section on initial load if hash exists in the URL
    const handleHashScroll = () => {
      const hash = window.location.hash;
      if (hash) {
        const id = hash.replace("#", "");
        setTimeout(() => {
          const el = document.getElementById(id);
          if (el) {
            el.scrollIntoView({ behavior: "smooth" });
          }
        }, 300);
      }
    };

    const handleScroll = () => {
      // Background shading on scroll
      setScrolled(window.scrollY > 20);

      // Check if near bottom of page - if so, highlight contact
      const isAtBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 100;
      if (isAtBottom) {
        setActiveSection("contact");
        return;
      }

      // Section intersection detection
      const scrollPosition = window.scrollY + 120;
      for (const item of navItems) {
        const el = document.getElementById(item.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          const absoluteTop = rect.top + window.scrollY;
          const height = el.offsetHeight;
          if (scrollPosition >= absoluteTop && scrollPosition < absoluteTop + height) {
            setActiveSection(item.id);
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("load", handleHashScroll);
    handleHashScroll(); // Run immediately in case of already loaded DOM

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("load", handleHashScroll);
    };
  }, []);

  const handleNavClick = (e: React.MouseEvent, id: string) => {
    // We let the browser handle the navigation using standard anchor links
    // The CSS `scroll-behavior: smooth` and `scroll-margin-top` will handle the rest
    setIsMobileMenuOpen(false);
    
    // Optional: Update active section immediately for better UX
    setActiveSection(id);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
        scrolled
          ? "py-3 bg-white/5 backdrop-blur-xl border-b border-white/10 shadow-lg"
          : "py-5 bg-transparent border-b border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        
        {/* Brand Identity */}
        <a
          href="#home"
          onClick={(e) => handleNavClick(e, "home")}
          className="flex items-center gap-2 group cursor-pointer"
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700/60 flex items-center justify-center group-hover:border-teal-500/40 transition-all duration-300">
            <span className="text-xs font-bold text-teal-300 font-mono">MB</span>
          </div>
          <div>
            <span className="text-sm font-extrabold tracking-wider text-slate-100 uppercase group-hover:text-teal-300 transition-colors">
              Manasi Badgujar
            </span>
            <p className="text-[9px] font-mono tracking-widest text-slate-400 uppercase leading-none mt-0.5">
              Chartered Accountant
            </p>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => handleNavClick(e, item.id)}
              className={`px-3 py-1.5 text-xs font-semibold tracking-wide uppercase transition-all duration-200 rounded-lg cursor-pointer ${
                activeSection === item.id
                  ? "text-teal-300 bg-slate-900/90 border border-slate-800/80"
                  : "text-slate-400 hover:text-slate-100 border border-transparent hover:bg-slate-900/30"
              }`}
            >
              {item.label}
            </a>
          ))}

          {/* Elegant Glassmorphism Theme Toggle Button - Desktop */}
          <button
            onClick={onToggleTheme}
            className="ml-3 p-1.5 rounded-lg bg-slate-900/60 hover:bg-slate-850 text-teal-300 hover:text-teal-200 border border-slate-850 hover:border-teal-500/20 transition-all duration-200 cursor-pointer flex items-center justify-center shadow-sm"
            title={theme === "light" ? "Switch to Dark Mode" : "Switch to Light Mode"}
          >
            {theme === "light" ? (
              <Moon className="w-4 h-4 text-slate-600" />
            ) : (
              <Sun className="w-4 h-4 text-teal-300" />
            )}
          </button>
        </nav>

        {/* Hamburger Trigger */}
        <div className="flex items-center gap-2 lg:hidden">
          {/* Elegant Glassmorphism Theme Toggle Button - Mobile */}
          <button
            onClick={onToggleTheme}
            className="p-2 rounded-lg bg-slate-900 text-teal-300 hover:text-teal-200 border border-slate-850 cursor-pointer flex items-center justify-center"
            title={theme === "light" ? "Switch to Dark Mode" : "Switch to Light Mode"}
          >
            {theme === "light" ? (
              <Moon className="w-4 h-4 text-slate-600" />
            ) : (
              <Sun className="w-4 h-4 text-teal-300" />
            )}
          </button>
          
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-lg bg-slate-900 text-slate-400 hover:text-slate-100 border border-slate-850 cursor-pointer"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="lg:hidden bg-slate-950 border-b border-slate-900 shadow-2xl overflow-hidden"
          >
            <div className="px-6 py-4 flex flex-col gap-1.5 bg-slate-950/95 backdrop-blur-md">
              {navItems.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => handleNavClick(e, item.id)}
                  className={`px-4 py-2.5 text-xs font-semibold tracking-wider uppercase rounded-xl transition-all duration-200 text-left cursor-pointer ${
                    activeSection === item.id
                      ? "text-teal-300 bg-slate-900 border border-slate-850"
                      : "text-slate-400 hover:text-slate-100"
                  }`}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
