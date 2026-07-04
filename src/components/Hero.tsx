/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { FileText, Linkedin, MapPin, Sparkles, TrendingUp } from "lucide-react";
import { motion } from "motion/react";

export default function Hero() {
  const handleRequestResumeClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const contactEl = document.getElementById("contact");
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: "smooth" });
      setTimeout(() => {
        const reqBtn = Array.from(document.querySelectorAll('button')).find(b => b.textContent?.includes('Request Resume'));
        if (reqBtn) {
          (reqBtn as HTMLButtonElement).click();
        }
      }, 800);
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen pt-28 pb-16 flex items-center justify-center overflow-hidden bg-slate-950"
    >
      {/* Background ambient halos styling sustainability/growth (sage green) and trust (navy) */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-teal-500/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-112 h-112 rounded-full bg-slate-800/15 blur-[150px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-120 h-120 rounded-full bg-emerald-500/3 blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10 w-full">
        
        {/* Left Info Column */}
        <div className="lg:col-span-7 space-y-6 text-left">
          
          {/* Tag */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-teal-300 font-mono text-[10px] uppercase tracking-wider">
            <Sparkles className="w-3 h-3 text-teal-400" />
            Strategic Finance Executive
          </div>

          <div className="space-y-3">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-100 font-sans leading-none">
              Manasi Badgujar
            </h1>
            <p className="text-sm sm:text-base lg:text-lg font-semibold tracking-wide text-teal-300">
              Chartered Accountant <span className="text-slate-600">|</span> Finance Professional <span className="text-slate-600">|</span> Business Problem Solver
            </p>
          </div>

          {/* Location Badge */}
          <div className="inline-flex items-center gap-1.5 text-xs font-mono text-slate-400">
            <MapPin className="w-3.5 h-3.5 text-slate-500" />
            Mumbai, Maharashtra, India
          </div>

          <p className="text-sm sm:text-base leading-relaxed text-slate-300 font-normal max-w-2xl">
            Chartered Accountant with experience across financial analysis, business advisory, project finance, 
            investment operations, regulatory compliance, and process improvement. Passionate about understanding 
            how businesses create value and using analytical thinking to transform complex challenges into practical, 
            sustainable solutions.
          </p>

          {/* CTA Group */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <a
              href="https://www.linkedin.com/in/manasi-badgujar"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-3 bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold rounded-xl text-xs uppercase tracking-wider transition-all shadow-[0_4px_24px_rgba(20,184,166,0.15)] cursor-pointer"
            >
              <Linkedin className="w-4 h-4" />
              Connect on LinkedIn
            </a>
            <a
              href="#resume"
              onClick={handleRequestResumeClick}
              className="flex items-center gap-2 px-5 py-3 bg-white/5 hover:bg-white/10 text-slate-100 font-bold rounded-xl text-xs uppercase tracking-wider border border-white/10 hover:border-white/20 transition-all cursor-pointer"
            >
              <FileText className="w-4 h-4 text-teal-300" />
              Request Resume
            </a>
          </div>

        </div>

        {/* Right Headshot / Visual Column */}
        <div className="lg:col-span-5 flex justify-center items-center">
          
          {/* Modern Premium Glassmorphism Visual */}
          <div className="relative w-72 h-72 sm:w-84 sm:h-84 md:w-96 md:h-96 rounded-3xl p-3 bg-white/5 border border-white/10 backdrop-blur-xl shadow-2xl overflow-hidden flex items-center justify-center">
            
            {/* Soft sustainability shapes behind avatar */}
            <div className="absolute inset-0 bg-gradient-to-br from-teal-500/10 via-transparent to-transparent" />
            
            {/* Embedded glowing concentric rings representing financial operations & cyclical growth */}
            <div className="absolute inset-6 rounded-full border border-dashed border-white/10 animate-[spin_120s_linear_infinite]" />
            <div className="absolute inset-16 rounded-full border border-white/5 animate-[spin_60s_linear_infinite_reverse]" />
            <div className="absolute inset-28 rounded-full border border-dashed border-white/5" />

            {/* Custom stylized vector avatar showing high potential and business vision */}
            <div className="relative z-10 w-44 h-44 sm:w-52 sm:h-52 md:w-60 md:h-60 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center shadow-lg group">
              
              {/* Initials Badge with elegant gradient */}
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shadow-inner group-hover:border-teal-500/30 transition-colors duration-300 mb-4">
                <span className="text-2xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-teal-300 to-emerald-400 font-mono">
                  MB
                </span>
              </div>

              {/* Minimalist Professional representation details */}
              <div className="space-y-1">
                <span className="text-xs uppercase font-mono tracking-widest text-teal-300">Chartered Accountant</span>
                <p className="text-[10px] text-slate-400 leading-normal max-w-[180px] mx-auto">
                  Qualified November 2024
                </p>
                <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-white/5 border border-white/10 mt-2">
                  <TrendingUp className="w-3 h-3 text-emerald-400" />
                  <span className="text-[9px] font-mono text-emerald-300 uppercase">Strategic Focus</span>
                </div>
              </div>

            </div>

            {/* Floating metric indicator of strategic analysis */}
            <div className="absolute bottom-6 left-6 z-20 px-3 py-1.5 bg-white/5 rounded-xl border border-white/10 flex items-center gap-2 shadow-lg backdrop-blur-md">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[10px] font-mono tracking-wider uppercase text-slate-300">Continuous Growth</span>
            </div>

            {/* Floating location pin */}
            <div className="absolute top-6 right-6 z-20 px-3 py-1.5 bg-white/5 rounded-xl border border-white/10 flex items-center gap-2 shadow-lg backdrop-blur-md">
              <span className="text-[10px] font-mono tracking-wider uppercase text-slate-300">Financial Advisor</span>
            </div>

          </div>

        </div>

      </div>
  </section>
);
}
