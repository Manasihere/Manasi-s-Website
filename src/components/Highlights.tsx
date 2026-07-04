/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Award, Zap, Building2, TrendingUp, CheckCircle } from "lucide-react";
import { motion } from "motion/react";

export default function Highlights() {
  const achievements = [
    {
      icon: <Award className="w-5 h-5 text-teal-300" />,
      tag: "Leadership & Delivery",
      title: "Recognized as Best Manager",
      description: "Honored with the 'Best Manager' distinction during the peak Income Tax season in her articleship. Celebrated for driving extreme ownership, ensuring exceptional execution quality, leading junior peers, and guaranteeing strict, timely filings."
    },
    {
      icon: <Zap className="w-5 h-5 text-teal-300" />,
      tag: "Process Automation",
      title: "Workflow Automation Champion",
      description: "Spearheaded and supported critical automation and scripting initiatives that drastically optimized recurring reconciliations, reporting logs, and financial data structures, eliminating manual risk."
    },
    {
      icon: <Building2 className="w-5 h-5 text-teal-300" />,
      tag: "Sector Breadth",
      title: "Diverse Industrial Audits",
      description: "Cultivated a deep, practical grasp of various business models, operations, and cash cycles by managing audit and compliance engagements for entities across Banking, FMCG, NGOs, and Real Estate."
    },
    {
      icon: <TrendingUp className="w-5 h-5 text-teal-300" />,
      tag: "Capital Markets",
      title: "Treasury Investment Operations",
      description: "Acquired institutional-scale exposure managing treasury investment workflows, working with sophisticated financial instruments, supporting valuations, and managing compliance within massive transaction volumes."
    },
    {
      icon: <CheckCircle className="w-5 h-5 text-teal-300" />,
      tag: "Professional Caliber",
      title: "Rapid Corporate Advancement",
      description: "Earned consistent corporate appreciation at a top-tier private-sector bank for her immense adaptability, swift learning curves, strong corporate ownership, and commitment to long-term value creation."
    }
  ];

  return (
    <section id="highlights" className="py-24 relative overflow-hidden bg-slate-950 border-t border-slate-900/60">
      
      {/* Decorative ambient spots */}
      <div className="absolute bottom-1/4 right-0 w-80 h-80 rounded-full bg-emerald-500/3 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        <div className="space-y-2 text-center mb-16">
          <span className="text-[10px] font-mono tracking-widest text-teal-400 uppercase font-semibold">Impact Verification</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-100 font-sans">
            Professional Highlights
          </h2>
          <p className="text-xs text-slate-400 max-w-md mx-auto">
            Practical milestones demonstrating excellence, organizational problem-solving, and a focus on operational efficiency.
          </p>
        </div>

        {/* 5-card custom layout (2 columns grid with a span-2 feature for visual rhythm) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {achievements.map((item, idx) => {
            const isFeature = idx === 0;
            return (
              <div
                key={idx}
                className={`glass-panel glass-panel-hover p-6 rounded-2xl flex flex-col justify-between space-y-6 ${
                  isFeature ? "md:col-span-2 lg:col-span-2 bg-teal-500/[0.02]" : ""
                }`}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] font-mono tracking-widest uppercase text-teal-400 font-semibold px-2.5 py-1 rounded bg-white/5 border border-white/10">
                      {item.tag}
                    </span>
                    <div className="p-2 rounded-xl bg-white/5 border border-white/10">
                      {item.icon}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-base font-bold text-slate-200 tracking-tight">{item.title}</h4>
                    <p className="text-xs leading-relaxed text-slate-400 font-normal">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
