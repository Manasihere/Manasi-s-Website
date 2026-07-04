/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { GraduationCap, Award, CheckCircle, ShieldCheck, Calendar, MapPin } from "lucide-react";
import { motion } from "motion/react";

export default function Education() {
  const credentials = [
    {
      type: "Professional Qualification",
      title: "Chartered Accountant",
      subtitle: "Qualified: November 2024",
      institution: "The Institute of Chartered Accountants of India (ICAI)",
      date: "November 2024",
      icon: <Award className="w-6 h-6 text-teal-300" />,
      primary: true,
      description: "Successfully qualified the highly demanding, multi-tiered ICAI examination process, demonstrating comprehensive expertise in strategic financial reporting, corporate law, auditing, governance, and financial management. This achievement is evidence of perseverance, discipline, analytical capability, and continuous professional growth.",
      highlights: [
        "Cleared both groups of CA Final simultaneously in the second attempt.",
        "Achieved exemption in Advanced Financial Management in CA Final.",
        "Achieved exemption in Cost and Management Accounting in CA Intermediate.",
        "Cleared CPT/Foundation examination with distinction-level performance, securing 70%.",
        "Successfully completed ICITSS – Information Technology, gaining strong practical exposure to Advanced Excel and technology-enabled business processes."
      ]
    },
    {
      type: "Foundational Degree",
      title: "Bachelor of Commerce (B.Com)",
      subtitle: "Completed: 2022",
      institution: "North Maharashtra University",
      date: "2022",
      icon: <GraduationCap className="w-6 h-6 text-teal-400" />,
      primary: false,
      description: "Acquired a comprehensive foundational academic understanding of commercial economics, cost accounting, business management, corporate laws, auditing, and taxation principles.",
      highlights: [
        "Focused on financial accounting and corporate management systems.",
        "Established core business and analytical foundations."
      ]
    },
    {
      type: "Higher Secondary Education",
      title: "Higher Secondary Education (Class XII)",
      subtitle: "Completed: 2019",
      institution: "Moolji Jaitha College (M.J. College)",
      date: "2019",
      icon: <GraduationCap className="w-6 h-6 text-slate-400" />,
      primary: false,
      description: "Completed secondary board commerce coursework with strong emphasis on trade, secretarial practices, economics, and mathematics.",
      highlights: [
        "Broad exposure to commerce, trade, and economic principles.",
        "Developed early analytical skills."
      ]
    },
    {
      type: "Secondary Education",
      title: "Secondary Education (Class X)",
      subtitle: "Completed: 2017",
      institution: "Orion State Board English Medium School, Jalgaon",
      date: "2017",
      icon: <GraduationCap className="w-6 h-6 text-slate-500" />,
      primary: false,
      description: "Successfully completed foundational secondary education under state board guidelines with an English medium curriculum.",
      highlights: [
        "Rigorous general science, mathematics, and language foundation.",
        "Active participant in extracurricular analytical competitions."
      ]
    }
  ];

  return (
    <section id="education" className="py-24 relative overflow-hidden bg-slate-950 border-t border-slate-900/60">
      
      {/* Dynamic backdrop elements matching theme */}
      <div className="absolute top-1/2 right-[-5%] w-[450px] h-[450px] rounded-full bg-teal-500/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] rounded-full bg-emerald-500/5 blur-[100px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="space-y-2 text-center mb-16">
          <span className="text-[10px] font-mono tracking-widest text-teal-400 uppercase">Academic & Professional Credentials</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-100 font-sans">
            Education
          </h2>
          <p className="text-xs text-slate-400 max-w-md mx-auto">
            A distinguished academic record combining professional expertise with rigorous commerce foundations.
          </p>
        </div>

        {/* Credentials Grid/List */}
        <div className="space-y-8">
          {credentials.map((item, idx) => (
            <div 
              key={idx}
              className={`glass-panel glass-panel-hover p-6 sm:p-8 rounded-3xl transition-all relative overflow-hidden ${
                item.primary 
                  ? "border border-teal-500/20 bg-gradient-to-br from-teal-500/[0.03] to-transparent shadow-[0_12px_40px_-15px_rgba(20,184,166,0.1)]" 
                  : "border border-badge-border bg-badge-bg"
              }`}
            >
              {/* Subtle background element for primary card */}
              {item.primary && (
                <div className="absolute top-[-30px] right-[-30px] w-48 h-48 bg-teal-500/5 rounded-full blur-2xl pointer-events-none" />
              )}

              <div className="flex flex-col sm:flex-row items-start gap-5 relative z-10">
                {/* Qualification Icon */}
                <div className={`p-3.5 rounded-2xl flex-shrink-0 flex items-center justify-center ${
                  item.primary 
                    ? "bg-teal-500/10 border border-teal-500/25 text-teal-300 shadow-inner" 
                    : "bg-badge-bg border border-badge-border text-slate-300"
                }`}>
                  {item.icon}
                </div>

                {/* Qualification Information */}
                <div className="flex-1 space-y-4">
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className={`text-[9px] font-mono tracking-widest uppercase font-bold px-2 py-0.5 rounded-md ${
                        item.primary 
                          ? "bg-teal-400/20 text-teal-200 border border-teal-400/25" 
                          : "bg-badge-bg text-slate-400 border border-badge-border"
                      }`}>
                        {item.type}
                      </span>
                      {item.primary && (
                        <span className="text-[9px] font-mono tracking-widest uppercase font-bold px-2 py-0.5 rounded-md bg-emerald-500/15 border border-emerald-500/20 text-emerald-300 flex items-center gap-1">
                          <CheckCircle className="w-2.5 h-2.5" /> Primary Credential
                        </span>
                      )}
                    </div>
                    
                    <h3 className={`text-lg sm:text-xl font-extrabold tracking-tight ${
                      item.primary ? "text-transparent bg-clip-text bg-gradient-to-r from-slate-100 via-teal-100 to-teal-300" : "text-slate-100"
                    }`}>
                      {item.title}
                    </h3>
                    
                    <p className="text-sm font-bold text-slate-200">{item.subtitle}</p>
                    <p className="text-xs text-slate-400 font-medium flex items-center gap-1.5 mt-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-500 flex-shrink-0" />
                      {item.institution}
                    </p>
                  </div>

                  {/* Description text */}
                  <p className="text-xs leading-relaxed text-slate-300 font-normal">
                    {item.description}
                  </p>

                  {/* Highlight bullets */}
                  <div className="pt-2 border-t border-badge-border">
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] text-slate-400">
                      {item.highlights.map((bullet, bIdx) => (
                        <li key={bIdx} className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-teal-500/50 flex-shrink-0" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Date Tag */}
                <div className="self-stretch sm:self-start flex sm:flex-col justify-between sm:items-end gap-1.5 mt-2 sm:mt-0 pt-4 sm:pt-0 border-t sm:border-t-0 border-badge-border sm:border-none">
                  <span className="text-[10px] font-mono text-slate-500 uppercase flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" /> Date Accomplished
                  </span>
                  <span className={`text-[11px] font-mono font-bold px-3 py-1 rounded-lg border ${
                    item.primary 
                      ? "bg-teal-500/10 border-teal-500/20 text-teal-300" 
                      : "bg-badge-bg border-badge-border text-slate-300"
                  }`}>
                    {item.date}
                  </span>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
