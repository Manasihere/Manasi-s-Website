/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BarChart3, PieChart, Landmark, ShieldCheck, Cpu, Briefcase, FileSpreadsheet, Compass } from "lucide-react";
import { motion } from "motion/react";

export default function Expertise() {
  const skills = [
    {
      icon: <BarChart3 className="w-5 h-5 text-teal-300" />,
      title: "Financial Analysis",
      description: "Evaluating financial information, ratios, and trends to assess historical performance, predict outcomes, and support strategic business choices."
    },
    {
      icon: <PieChart className="w-5 h-5 text-teal-300" />,
      title: "FP&A",
      description: "Driving collaborative budgeting, predictive forecasting, rigorous variance analysis, and operational decision-support frameworks."
    },
    {
      icon: <Landmark className="w-5 h-5 text-teal-300" />,
      title: "Corporate Finance",
      description: "Supporting corporate structuring, working capital management, funding models, and capital allocation strategies to maximize enterprise value."
    },
    {
      icon: <FileSpreadsheet className="w-5 h-5 text-teal-300" />,
      title: "Project Finance",
      description: "Conducting economic evaluations, building project feasibility models, assessing cash-flow sensitivities, and supporting funding reviews."
    },
    {
      icon: <Compass className="w-5 h-5 text-teal-300" />,
      title: "Investment Analysis",
      description: "Assessing performance, reviewing financial instruments, evaluating underlying security valuations, and quantifying associated risks."
    },
    {
      icon: <Briefcase className="w-5 h-5 text-teal-300" />,
      title: "Business Advisory",
      description: "Diagnosing corporate challenges, conducting industry analysis, and creating structured, practical strategies to resolve complex bottlenecks."
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-teal-300" />,
      title: "Regulatory Compliance",
      description: "Ensuring deep compliance with tax laws, financial standards (Ind AS/IFRS), and banking regulations to guard corporate operations against risks."
    },
    {
      icon: <Cpu className="w-5 h-5 text-teal-300" />,
      title: "Process Improvement & Automation",
      description: "Spotting manual gaps, streamlining daily reconciliation workflows, and designing automated data loops using modern software and systems."
    }
  ];

  return (
    <section id="expertise" className="py-24 relative overflow-hidden bg-slate-950 border-t border-slate-900/60">
      
      {/* Decorative ambient background blur */}
      <div className="absolute top-1/2 left-1/4 w-96 h-96 rounded-full bg-slate-800/20 blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        <div className="space-y-2 text-center mb-16">
          <span className="text-[10px] font-mono tracking-widest text-teal-400 uppercase font-semibold">Strategic Value Pillars</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-100 font-sans">
            Areas of Expertise
          </h2>
          <p className="text-xs text-slate-400 max-w-md mx-auto">
            Durable, strategic skillsets built across core financial frameworks, audit structures, and banking systems.
          </p>
        </div>

        {/* 8 Glass Card Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {skills.map((skill, idx) => (
            <div
              key={idx}
              className="glass-panel glass-panel-hover p-6 rounded-2xl flex flex-col justify-between space-y-5"
            >
              <div className="space-y-3">
                <div className="p-2 rounded-xl bg-badge-bg border border-badge-border w-10 h-10 flex items-center justify-center">
                  {skill.icon}
                </div>
                <h4 className="text-sm font-bold text-slate-200 tracking-tight">{skill.title}</h4>
              </div>
              <p className="text-xs leading-relaxed text-slate-400 font-normal">
                {skill.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
