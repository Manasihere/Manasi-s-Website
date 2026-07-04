/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Compass, BookOpen, Activity, Heart } from "lucide-react";
import { motion } from "motion/react";

export default function About() {
  const values = [
    {
      icon: <Compass className="w-5 h-5 text-teal-300" />,
      title: "Business-Centric Finance",
      description: "Believing that finance is more than just reporting. It is a tool to translate operations into strategy, helping organizations evaluate choices and navigate growth securely."
    },
    {
      icon: <BookOpen className="w-5 h-5 text-teal-300" />,
      title: "Active Learning & Curiosity",
      description: "A continuous drive to explore unfamiliar fields—from treasury market dynamics and currency risk to process automation, macroeconomics, and modern enterprise software."
    },
    {
      icon: <Activity className="w-5 h-5 text-teal-300" />,
      title: "Process Optimization",
      description: "Finding opportunities to streamline complex tasks, standardizing financial data flows, and implementing technology to let finance teams focus on strategic analysis rather than manual tasks."
    },
    {
      icon: <Heart className="w-5 h-5 text-teal-300" />,
      title: "Ownership & Collaboration",
      description: "Taking deep pride in complete project execution, adapting swiftly, and valuing diverse operational team perspectives to achieve meaningful long-term corporate value."
    }
  ];

  return (
    <section id="about" className="py-24 relative overflow-hidden bg-slate-950 border-t border-slate-900/60">
      
      {/* Decorative subtle ambient glows */}
      <div className="absolute top-1/3 right-0 w-80 h-80 rounded-full bg-teal-500/3 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Heading & Narrative */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-2">
              <span className="text-[10px] font-mono tracking-widest text-teal-400 uppercase">Core Perspective</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-100 font-sans">
                Beyond the Numbers
              </h2>
            </div>
            
            <div className="space-y-4 text-sm sm:text-base leading-relaxed text-slate-300">
              <p>
                To me, finance is the nervous system of an organization. It is where operations, market dynamics, 
                and corporate strategy converge. I have always believed that professional credibility is built 
                on analytical precision, but true value is created when you step back to understand the business behind those numbers.
              </p>
              <p>
                My professional path is driven by deep curiosity and an ownership mindset. I thrive when faced with unfamiliar 
                challenges, whether that means supporting Axis Bank treasury valuations or standardizing processes across diverse 
                sectors like banking, FMCG, and NGOs. 
              </p>
              <p>
                I am focused on positioning myself as a strategic business partner. I enjoy translating complex financial details 
                into actionable insights that support budgeting, corporate decisions, and sustainable operations, ensuring every action 
                aligns with the organization's long-term direction.
              </p>
            </div>
          </div>

          {/* Right Column: Values Grid */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5 pt-4 lg:pt-0">
            {values.map((val, idx) => (
              <div
                key={idx}
                className="glass-panel glass-panel-hover p-6 rounded-2xl flex flex-col justify-between space-y-4 shadow-sm"
              >
                <div className="p-2.5 rounded-xl bg-badge-bg border border-badge-border w-11 h-11 flex items-center justify-center">
                  {val.icon}
                </div>
                <div className="space-y-2">
                  <h4 className="text-sm font-bold text-slate-200 tracking-tight">{val.title}</h4>
                  <p className="text-xs leading-relaxed text-slate-400">{val.description}</p>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
