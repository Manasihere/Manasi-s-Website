/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BookOpen, Languages, Award, Sparkles, Terminal } from "lucide-react";
import { motion } from "motion/react";

export default function Learning() {
  const certifications = [
    {
      title: "Bond Mathematics & Introduction to Indian Treasury Markets",
      organization: "FIMMDA (Fixed Income Money Market and Derivatives Association of India)",
      date: "2025",
      tag: "Specialized Course"
    },
    {
      title: "Certificate Course on Foreign Exchange Operations",
      organization: "Indian Institute of Banking & Finance (IIBF)",
      date: "2026",
      tag: "Treasury Course"
    }
  ];

  const languages = [
    { name: "English", level: "Fluent" },
    { name: "Hindi", level: "Fluent" },
    { name: "Marathi", level: "Native" },
    { name: "Japanese", level: "Basic" }
  ];

  return (
    <section id="learning" className="py-24 relative overflow-hidden bg-slate-950 border-t border-slate-900/60">
      
      {/* Decorative ambient gradients */}
      <div className="absolute top-1/3 left-0 w-80 h-80 rounded-full bg-teal-500/3 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        <div className="space-y-2 text-center mb-16">
          <span className="text-[10px] font-mono tracking-widest text-teal-400 uppercase font-semibold">Continuous Development</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-100 font-sans">
            Learning & Development
          </h2>
          <p className="text-xs text-slate-400 max-w-md mx-auto">
            Acquiring specialized market expertise, global communications capacity, and technical literacy.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Certifications */}
          <div className="lg:col-span-7 space-y-5">
            <div className="flex items-center gap-2 mb-2">
              <Award className="w-4.5 h-4.5 text-slate-400" />
              <h4 className="text-sm font-bold text-slate-200 uppercase tracking-wider">Qualifications & Certifications</h4>
            </div>

            <div className="space-y-4">
              {certifications.map((cert, idx) => (
                <div
                  key={idx}
                  className="glass-panel glass-panel-hover p-5 rounded-xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3"
                >
                  <div className="space-y-1">
                    <span className="inline-block text-[9px] font-mono font-bold text-teal-400 uppercase px-2 py-0.5 rounded bg-badge-bg border border-badge-border">
                      {cert.tag}
                    </span>
                    <h5 className="text-sm font-bold text-slate-100 tracking-tight leading-snug">{cert.title}</h5>
                    <p className="text-xs text-slate-400 font-medium">{cert.organization}</p>
                  </div>
                  <div className="text-[11px] font-mono text-slate-400 px-3 py-1 bg-badge-bg border border-badge-border rounded-lg">
                    {cert.date}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Languages & Future Philosophy */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Languages Grid */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Languages className="w-4.5 h-4.5 text-slate-400" />
                <h4 className="text-sm font-bold text-slate-200 uppercase tracking-wider">Languages</h4>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {languages.map((lang, idx) => (
                  <div key={idx} className="glass-panel p-4 rounded-xl">
                    <span className="text-xs font-bold text-slate-200 block">{lang.name}</span>
                    <span className="text-[10px] font-mono text-teal-400 mt-1 block">{lang.level}</span>
                  </div>
                ))}
              </div>
            </div>

             {/* AI / Tech Philosophy Spotlight */}
            <div className="glass-panel p-6 rounded-2xl bg-gradient-to-br from-white/[0.02] to-transparent shadow-md relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
                <Terminal className="w-16 h-16 text-teal-400" />
              </div>
              
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-xl bg-teal-500/10 border border-teal-500/20 text-teal-300">
                  <Sparkles className="w-4.5 h-4.5" />
                </div>
                <div className="space-y-2 relative z-10">
                  <h5 className="text-xs font-bold uppercase tracking-wider text-slate-200 font-sans">Continuous Horizon Expansion</h5>
                  <p className="text-xs leading-relaxed text-slate-300 font-normal">
                    "Beyond formal qualifications, I actively explore artificial intelligence, automation, business research, emerging technologies, and language learning to broaden my perspective and strengthen problem-solving capabilities."
                  </p>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
