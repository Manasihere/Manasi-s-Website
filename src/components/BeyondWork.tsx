/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Compass, Palette, BookOpen, Heart } from "lucide-react";
import { motion } from "motion/react";

export default function BeyondWork() {
  const categories = [
    {
      icon: <Compass className="w-5 h-5 text-teal-300" />,
      title: "Nature & Observation",
      description: "Finding inspiration through nature, wildlife, and bird watching. Observing the patterns and details of the natural world fosters mindfulness, focus, and a curious perspective on structural systems."
    },
    {
      icon: <Palette className="w-5 h-5 text-teal-300" />,
      title: "Creativity & Artistry",
      description: "Engaging in drawing, singing, and origami as creative outlets. These deliberate activities encourage extreme patience, spatial perspective, structure, and artistic imagination."
    },
    {
      icon: <BookOpen className="w-5 h-5 text-teal-300" />,
      title: "Lifelong Learning",
      description: "Exploring new experiences, macroeconomic ideas, modern technologies, and diverse professional disciplines. Believing that continuous growth comes from crossing traditional boundaries."
    },
    {
      icon: <Heart className="w-5 h-5 text-teal-300" />,
      title: "Creating Positive Impact",
      description: "A genuine underlying desire to create positive impact, beginning with continuous self-improvement and extending through meaningful contributions to teams, organizations, and society."
    }
  ];

  return (
    <section id="beyond-work" className="py-24 relative overflow-hidden bg-slate-950 border-t border-slate-900/60">
      
      {/* Soft background light */}
      <div className="absolute top-1/4 right-1/4 w-80 h-80 rounded-full bg-slate-900/45 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        <div className="space-y-2 text-center mb-16">
          <span className="text-[10px] font-mono tracking-widest text-teal-400 uppercase font-semibold">Diverse Perspectives</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-100 font-sans">
            The Human Side
          </h2>
          <p className="text-xs text-slate-400 max-w-md mx-auto">
            Exploring the balance of analytical discipline, creative imagination, and human curiosity.
          </p>
        </div>

        {/* 4 Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {categories.map((item, idx) => (
            <div
              key={idx}
              className="glass-panel glass-panel-hover p-6 rounded-2xl flex flex-col sm:flex-row items-start gap-4"
            >
              <div className="p-3 rounded-xl bg-badge-bg border border-badge-border flex-shrink-0">
                {item.icon}
              </div>
              <div className="space-y-2">
                <h4 className="text-base font-bold text-slate-200 tracking-tight">{item.title}</h4>
                <p className="text-xs leading-relaxed text-slate-400 font-normal">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
