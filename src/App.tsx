/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import Navigation from "./components/Navigation";
import Hero from "./components/Hero";
import About from "./components/About";
import Journey from "./components/Journey";
import Education from "./components/Education";
import Expertise from "./components/Expertise";
import Highlights from "./components/Highlights";
import Learning from "./components/Learning";
import Philosophy from "./components/Philosophy";
import BeyondWork from "./components/BeyondWork";
import ContactForms from "./components/ContactForms";
import AIChatRepresentative from "./components/AIChatRepresentative";
import AdminPortal from "./components/AdminPortal";
import { Lock, Linkedin, Mail, Heart, ArrowUp, Sparkles } from "lucide-react";

export default function App() {
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleRefreshData = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <div className="relative min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-teal-500/20 selection:text-teal-200 overflow-x-hidden">
      
      {/* Frosted Glass premium ambient backgrounds */}
      <div className="absolute inset-0 z-0 opacity-50 pointer-events-none overflow-hidden">
        <div className="absolute top-[-5%] left-[-10%] w-[600px] h-[600px] rounded-full blur-[130px] bg-[#1a2e4d]" />
        <div className="absolute top-[20%] right-[-10%] w-[500px] h-[500px] rounded-full blur-[120px] bg-[#2d3a31]" />
        <div className="absolute top-[45%] left-[-5%] w-[600px] h-[600px] rounded-full blur-[140px] bg-[#15233c]" />
        <div className="absolute bottom-[15%] right-[-5%] w-[500px] h-[500px] rounded-full blur-[110px] bg-[#1f2f23]" />
      </div>

      {/* Global Sticky Navigation */}
      <Navigation onOpenAdmin={() => setIsAdminOpen(true)} />

      {/* Main Single Page Layout Sections */}
      <main className="space-y-0">
        <Hero />
        <About />
        <Journey />
        <Education />
        <Expertise />
        <Highlights />
        <Learning />
        <Philosophy />
        <BeyondWork />
        <ContactForms onSubmissionSuccess={handleRefreshData} />
      </main>

      {/* Sticky Administrative Submissions Dashboard Modal */}
      {isAdminOpen && (
        <AdminPortal
          onClose={() => setIsAdminOpen(false)}
          onRefreshTrigger={handleRefreshData}
        />
      )}

      {/* Premium Footer */}
      <footer className="bg-slate-950 border-t border-slate-900/80 py-12 px-6 relative overflow-hidden">
        {/* Soft layout line */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4/5 h-[1px] bg-gradient-to-r from-transparent via-slate-800 to-transparent" />
        
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-slate-400">
          
          <div className="space-y-2 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2">
              <span className="font-extrabold tracking-wider text-slate-200 uppercase font-mono">Manasi Badgujar</span>
              <span className="w-1.5 h-1.5 rounded-full bg-teal-500" />
              <span className="text-slate-500 font-mono text-[10px]">Mumbai, India</span>
            </div>
            <p className="text-[10px] leading-relaxed max-w-sm text-slate-500">
              Chartered Accountant & Strategic Financial Advisory Advisor. High-potential problem solver delivering long-term value.
            </p>
          </div>

          <div className="flex flex-col items-center md:items-end gap-3">
            {/* Quick shortcuts */}
            <div className="flex items-center gap-4">
              <a
                href="https://www.linkedin.com/in/manasi-badgujar"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-teal-300 transition-colors"
                title="LinkedIn Network"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="mailto:ca.manasi.badgujar@gmail.com"
                className="hover:text-teal-300 transition-colors"
                title="Direct Email"
              >
                <Mail className="w-4 h-4" />
              </a>
              <button
                onClick={() => setIsAdminOpen(true)}
                className="p-1 rounded hover:bg-slate-900 text-slate-600 hover:text-teal-300 transition-all cursor-pointer"
                title="Open Administrative Submission Portal"
              >
                <Lock className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="flex items-center gap-1 text-[10px] text-slate-600">
              <span>Made with dedication</span>
              <Heart className="w-3 h-3 text-red-500/60" />
              <span>&copy; {new Date().getFullYear()} All Rights Reserved.</span>
            </div>
          </div>

        </div>

        {/* Closing positive signature element */}
        <div className="text-center mt-6 select-none opacity-80">
          <p className="font-serif italic text-xs tracking-wider text-slate-500">
            Keep smiling always :)
          </p>
        </div>

        {/* Elegant scroll to top button in footer */}
        <div className="flex justify-center mt-6">
          <button
            onClick={handleScrollToTop}
            className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-slate-900/60 hover:bg-slate-900 hover:text-teal-300 border border-slate-850 text-[10px] uppercase font-mono tracking-wider transition-colors cursor-pointer"
          >
            <ArrowUp className="w-3 h-3 text-teal-400" />
            Back to top
          </button>
        </div>
      </footer>

      {/* Persistent global floating AI Assistant */}
      <AIChatRepresentative />

    </div>
  );
}
