/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Quote } from "lucide-react";
import { motion } from "motion/react";

export default function Philosophy() {
  return (
    <section id="philosophy" className="py-24 relative overflow-hidden bg-slate-950 border-t border-slate-900/60">
      
      {/* Soft elegant background glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-120 h-120 rounded-full bg-teal-500/5 blur-[150px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        
        <div className="glass-panel p-8 sm:p-14 rounded-3xl text-center space-y-10 shadow-2xl relative overflow-hidden">
          {/* Subtle decoration within glass */}
          <div className="absolute bottom-[-40px] right-[-40px] w-64 h-64 bg-white/[0.02] rounded-full blur-3xl pointer-events-none" />
          
          <div className="flex justify-center relative z-10">
            <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-teal-300 shadow-sm">
              <Quote className="w-5 h-5" />
            </div>
          </div>

          {/* Large, beautiful Display Typography statement */}
          <blockquote className="space-y-6 md:space-y-8 max-w-3xl mx-auto relative z-10">
            <p className="text-base sm:text-lg md:text-xl font-medium leading-relaxed tracking-tight text-slate-100 font-sans italic">
              "Meaningful impact comes from combining expertise with curiosity, ownership, and the courage to challenge conventional thinking."
            </p>
            <p className="text-base sm:text-lg md:text-xl font-medium leading-relaxed tracking-tight text-slate-100 font-sans italic">
              "I believe great outcomes are created when analytical rigor is balanced with creativity, collaboration, and a commitment to continuous improvement."
            </p>
            <p className="text-base sm:text-lg md:text-xl font-medium leading-relaxed tracking-tight text-slate-100 font-sans italic">
              "Excellence is not a qualification or title—it is a mindset that shapes every responsibility and every opportunity to contribute."
            </p>
          </blockquote>

          <div className="space-y-1 relative z-10">
            <span className="text-[10px] font-mono tracking-widest text-teal-400 uppercase font-bold">Manasi Badgujar</span>
            <p className="text-[9px] font-mono tracking-wider text-slate-500 uppercase">Chartered Accountant</p>
          </div>
        </div>

      </div>
    </section>
  );
}
