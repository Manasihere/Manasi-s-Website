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

      <div className="max-w-5xl mx-auto px-6 relative z-10 w-full space-y-8 text-left">
        
        {/* Tag */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-teal-300 font-mono text-[10px] uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5 text-teal-400" />
          Strategic Finance Executive
        </div>

        <div className="space-y-4">
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight text-slate-100 font-sans leading-tight">
            Manasi Badgujar
          </h1>
          <p className="text-base sm:text-lg lg:text-xl font-medium tracking-wide text-teal-300">
            Chartered Accountant <span className="text-slate-600">|</span> Finance Professional <span className="text-slate-600">|</span> Business Problem Solver
          </p>
        </div>

        {/* Location Badge */}
        <div className="inline-flex items-center gap-1.5 text-xs font-mono text-slate-400">
          <MapPin className="w-4 h-4 text-slate-500" />
          Mumbai, Maharashtra, India
        </div>

        <p className="text-base sm:text-lg leading-relaxed text-slate-300 font-normal max-w-3xl">
          Chartered Accountant with experience across financial analysis, business advisory, project finance, 
          investment operations, regulatory compliance, and process improvement. Passionate about understanding 
          how businesses create value and using analytical thinking to transform complex challenges into practical, 
          sustainable solutions.
        </p>

        {/* CTA Group */}
        <div className="flex flex-wrap items-center gap-4 pt-4">
          <a
            href="https://www.linkedin.com/in/manasi-badgujar"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-3.5 bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold rounded-xl text-xs uppercase tracking-wider transition-all shadow-[0_4px_24px_rgba(20,184,166,0.15)] cursor-pointer"
          >
            <Linkedin className="w-4 h-4" />
            Connect on LinkedIn
          </a>
          <a
            href="#resume"
            onClick={handleRequestResumeClick}
            className="flex items-center gap-2 px-6 py-3.5 bg-white/5 hover:bg-white/10 text-slate-100 font-bold rounded-xl text-xs uppercase tracking-wider border border-white/10 hover:border-white/20 transition-all cursor-pointer"
          >
            <FileText className="w-4 h-4 text-teal-300" />
            Request Resume
          </a>
        </div>

      </div>
  </section>
);
}
