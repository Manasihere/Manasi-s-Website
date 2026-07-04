/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Briefcase, Award, CheckCircle, TrendingUp, Users, ShieldCheck, Target, Layers, ArrowUpRight, Sparkles } from "lucide-react";
import { motion } from "motion/react";

export default function Journey() {
  const industries = [
    "Banking", "FMCG", "NGOs", "Real Estate", 
    "Taxation", "Audit", "Business Advisory", "Project Finance"
  ];

  return (
    <section id="journey" className="py-24 relative overflow-hidden bg-slate-950 border-t border-slate-900/60">
      
      {/* Soft elegant ambient glows */}
      <div className="absolute top-1/3 left-[-10%] w-[500px] h-[500px] rounded-full bg-teal-500/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-[-10%] w-[400px] h-[400px] rounded-full bg-emerald-500/5 blur-[100px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        
        <div className="space-y-2 text-center mb-16">
          <span className="text-[10px] font-mono tracking-widest text-teal-400 uppercase">Career History</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-100 font-sans">
            Professional Journey
          </h2>
          <p className="text-xs text-slate-400 max-w-md mx-auto">
            A premium record of strategic leadership, rigorous financial capability, and multi-industry advisory experience.
          </p>
        </div>

        {/* Timeline container */}
        <div className="relative border-l border-white/10 ml-4 md:ml-6 space-y-16">
          
          {/* 1. Axis Bank (Manager - Treasury Operations) */}
          <div className="relative pl-8 md:pl-10 group">
            
            {/* Timeline node icon */}
            <div className="absolute -left-4 md:-left-5 top-0 w-8 h-8 rounded-full bg-slate-950 border border-white/10 flex items-center justify-center text-teal-300 group-hover:border-teal-400 group-hover:text-teal-200 transition-colors shadow-lg z-10">
              <Briefcase className="w-4 h-4" />
            </div>

            {/* Date Tag */}
            <div className="text-[10px] font-mono tracking-widest uppercase text-teal-400 mb-1 flex items-center gap-2">
              <span>March 2025 – September 2026</span>
              <span className="w-1.5 h-1.5 rounded-full bg-teal-500/40" />
              <span className="text-slate-500 font-normal">Treasury Experience</span>
            </div>

            {/* Main Content card */}
            <div className="glass-panel glass-panel-hover p-6 rounded-2xl hover:shadow-xl transition-all space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-100 tracking-tight">Manager – Treasury Operations</h3>
                  <p className="text-xs text-teal-300/80 font-medium">Axis Bank</p>
                </div>
                <div className="inline-flex self-start sm:self-center items-center gap-1 px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-[9px] font-mono text-slate-300 uppercase">
                  Treasury & Financial Markets
                </div>
              </div>

              {/* Focus Statement */}
              <p className="text-xs leading-relaxed text-slate-300">
                A pivotal role that significantly strengthened financial discipline, analytical thinking, investment understanding, and deep exposure to financial markets. Developed advanced capabilities in managing large-scale treasury and investment strategies, rather than back-office routines.
              </p>

              {/* Grid of professional exposure items */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                <div className="space-y-1.5 p-3 rounded-xl bg-white/[0.02] border border-white/5">
                  <span className="text-[10px] font-mono text-teal-400 uppercase font-semibold flex items-center gap-1.5">
                    <TrendingUp className="w-3.5 h-3.5" /> Investment & Valuation
                  </span>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    Direct exposure to sophisticated investment management and financial instruments. Provided analytical valuation support, managed comprehensive investment accounting processes, and ensured precise valuation of corporate resources.
                  </p>
                </div>

                <div className="space-y-1.5 p-3 rounded-xl bg-white/[0.02] border border-white/5">
                  <span className="text-[10px] font-mono text-teal-400 uppercase font-semibold flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5" /> Compliance & Risk
                  </span>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    Maintained high risk awareness to safeguard institutional resources while meeting strict financial reporting standards. Navigated the regulatory framework of financial markets seamlessly.
                  </p>
                </div>

                <div className="space-y-1.5 p-3 rounded-xl bg-white/[0.02] border border-white/5 md:col-span-2">
                  <span className="text-[10px] font-mono text-teal-400 uppercase font-semibold flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5" /> Innovation & Coordination
                  </span>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    Spearheaded strategic process improvement initiatives that optimized Treasury workflows. Facilitated active cross-functional coordination with multiple business segments to harmonize reporting pipelines.
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* 2. Bhadade Lahoti and Company (Article Assistant) */}
          <div className="relative pl-8 md:pl-10 group">
            
            {/* Timeline node icon */}
            <div className="absolute -left-4 md:-left-5 top-0 w-8 h-8 rounded-full bg-slate-950 border border-white/10 flex items-center justify-center text-teal-300 group-hover:border-teal-400 group-hover:text-teal-200 transition-colors shadow-lg z-10">
              <Award className="w-4 h-4" />
            </div>

            {/* Date Tag */}
            <div className="text-[10px] font-mono tracking-widest uppercase text-teal-400 mb-1 flex items-center gap-2">
              <span>2021 – 2024</span>
              <span className="w-1.5 h-1.5 rounded-full bg-teal-500/40" />
              <span className="text-slate-500 font-normal">Formative Articleship Experience</span>
            </div>

            {/* Main Content card - Highlighted visually with subtle gradient border */}
            <div className="glass-panel glass-panel-hover p-6 rounded-2xl hover:shadow-xl transition-all space-y-5 border-l-2 border-l-teal-500/30">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-teal-400/10 border border-teal-400/20 text-teal-300 text-[9px] font-mono uppercase tracking-wider mb-2">
                    Cornerstone Professional Exposure
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-100 tracking-tight">Article Assistant</h3>
                  <p className="text-xs text-teal-300/80 font-medium">Bhadade Lahoti and Company</p>
                </div>
                <div className="text-xs font-mono text-slate-400 bg-white/5 border border-white/10 px-3 py-1 rounded-lg self-start sm:self-center">
                  3 Years Full-Time
                </div>
              </div>

              {/* Narrative Summary of Articleship */}
              <p className="text-xs leading-relaxed text-slate-300">
                A highly comprehensive, formative experience that served as the foundation of my technical and analytical ability. Built extensive professional maturity by taking on high levels of ownership and responsibility from an early stage, mastering the client management lifecycle, and solving complex financial problems.
              </p>

              {/* Industry Focus Badges Grid */}
              <div className="space-y-2">
                <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold block">
                  Broad exposure across diverse business functions & industries:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {industries.map((industry, index) => (
                    <span 
                      key={index} 
                      className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-slate-200 text-xs font-medium hover:border-teal-500/30 hover:bg-teal-500/5 transition-all cursor-default"
                    >
                      {industry}
                    </span>
                  ))}
                </div>
              </div>

              {/* Professional Insights bullet grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 pt-1 text-xs">
                <div className="flex gap-2.5 items-start">
                  <div className="mt-1 p-1 rounded-md bg-white/5 border border-white/10 text-teal-300 flex-shrink-0">
                    <Target className="w-3 h-3" />
                  </div>
                  <div className="space-y-0.5">
                    <span className="font-bold text-slate-200 block">Diverse Business Models</span>
                    <span className="text-slate-400 text-[11px] leading-relaxed">
                      Developed a practical, operational grasp of differing economic drivers, cost structures, and cash flow cycles across several corporate sectors.
                    </span>
                  </div>
                </div>

                <div className="flex gap-2.5 items-start">
                  <div className="mt-1 p-1 rounded-md bg-white/5 border border-white/10 text-teal-300 flex-shrink-0">
                    <Users className="w-3 h-3" />
                  </div>
                  <div className="space-y-0.5">
                    <span className="font-bold text-slate-200 block">Direct Executive Interaction</span>
                    <span className="text-slate-400 text-[11px] leading-relaxed">
                      Interacted directly with client management teams, business owners, and corporate stakeholders to advise, gather audit evidence, and present findings.
                    </span>
                  </div>
                </div>

                <div className="flex gap-2.5 items-start">
                  <div className="mt-1 p-1 rounded-md bg-white/5 border border-white/10 text-teal-300 flex-shrink-0">
                    <ShieldCheck className="w-3 h-3" />
                  </div>
                  <div className="space-y-0.5">
                    <span className="font-bold text-slate-200 block">Complex Assignments</span>
                    <span className="text-slate-400 text-[11px] leading-relaxed">
                      Sought out and successfully solved multi-faceted tax litigation, complex statutory audits, and independent business evaluation problems.
                    </span>
                  </div>
                </div>

                <div className="flex gap-2.5 items-start">
                  <div className="mt-1 p-1 rounded-md bg-white/5 border border-white/10 text-teal-300 flex-shrink-0">
                    <CheckCircle className="w-3 h-3" />
                  </div>
                  <div className="space-y-0.5">
                    <span className="font-bold text-slate-200 block">Early Ownership Mindset</span>
                    <span className="text-slate-400 text-[11px] leading-relaxed">
                      Assumed direct accountability for end-to-end assignment execution and client deliverables, showing high ownership and analytical vigor.
                    </span>
                  </div>
                </div>
              </div>

              {/* DEDICATED LEADERSHIP HIGHLIGHT BOX */}
              <div className="p-4 rounded-xl bg-gradient-to-br from-teal-500/10 to-transparent border border-teal-500/20 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-2 opacity-5 pointer-events-none">
                  <Sparkles className="w-12 h-12 text-teal-300" />
                </div>
                <div className="flex gap-3 items-start">
                  <div className="p-1.5 rounded-lg bg-teal-400/20 border border-teal-400/30 text-teal-200 flex-shrink-0">
                    <Sparkles className="w-4 h-4 animate-pulse" />
                  </div>
                  <div className="space-y-1">
                    <span className="text-[9px] font-mono uppercase tracking-widest text-teal-400 font-bold block">
                      Dedicated Leadership Spotlight
                    </span>
                    <p className="text-xs font-semibold text-slate-100 leading-snug">
                      "Led a business expansion initiative for a client during articleship, coordinating team efforts, conducting research and analysis, contributing strategic inputs, and supporting execution. This experience strengthened leadership, collaboration, communication, and business problem-solving capabilities."
                    </p>
                  </div>
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
