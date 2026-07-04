/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from "react";
import { Mail, Send, FileText, CheckCircle, AlertCircle, Linkedin, X, MessageSquare, Shield, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface ContactFormsProps {
  onSubmissionSuccess?: () => void;
}

export default function ContactForms({ onSubmissionSuccess }: ContactFormsProps) {
  // Modal states
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);
  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);

  // Message Form States
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactSubject, setContactSubject] = useState("");
  const [contactMessage, setContactMessage] = useState("");
  const [contactSubmitting, setContactSubmitting] = useState(false);
  const [contactSuccess, setContactSuccess] = useState(false);
  const [contactError, setContactError] = useState<string | null>(null);

  // Resume Form States
  const [resumeName, setResumeName] = useState("");
  const [resumeCompany, setResumeCompany] = useState("");
  const [resumeDesignation, setResumeDesignation] = useState("");
  const [resumeEmail, setResumeEmail] = useState("");
  const [resumePurpose, setResumePurpose] = useState("");
  const [resumeSubmitting, setResumeSubmitting] = useState(false);
  const [resumeSuccess, setResumeSuccess] = useState(false);
  const [resumeError, setResumeError] = useState<string | null>(null);

  // Keyboard accessibility (ESC to close modals)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsResumeModalOpen(false);
        setIsMessageModalOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate empty fields
    if (!contactName.trim() || !contactEmail.trim() || !contactSubject.trim() || !contactMessage.trim()) {
      setContactError("Please fill in all required fields.");
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(contactEmail)) {
      setContactError("Please enter a valid email address.");
      return;
    }

    setContactSubmitting(true);
    setContactError(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: contactName,
          email: contactEmail,
          subject: contactSubject,
          message: contactMessage
        })
      });

      if (response.ok) {
        setContactSuccess(true);
        setContactName("");
        setContactEmail("");
        setContactSubject("");
        setContactMessage("");
        if (onSubmissionSuccess) onSubmissionSuccess();
      } else {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.error || "Unable to send message at this time. Please try again.");
      }
    } catch (err: any) {
      setContactError(err.message || "An unexpected error occurred. Please try again.");
    } finally {
      setContactSubmitting(false);
    }
  };

  const handleResumeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate empty fields
    if (!resumeName.trim() || !resumeCompany.trim() || !resumeDesignation.trim() || !resumeEmail.trim() || !resumePurpose.trim()) {
      setResumeError("Please fill in all required fields.");
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(resumeEmail)) {
      setResumeError("Please enter a valid email address.");
      return;
    }

    setResumeSubmitting(true);
    setResumeError(null);

    try {
      const response = await fetch("/api/resume-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: resumeName,
          company: resumeCompany,
          designation: resumeDesignation,
          email: resumeEmail,
          purpose: resumePurpose
        })
      });

      if (response.ok) {
        setResumeSuccess(true);
        setResumeName("");
        setResumeCompany("");
        setResumeDesignation("");
        setResumeEmail("");
        setResumePurpose("");
        if (onSubmissionSuccess) onSubmissionSuccess();
      } else {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.error || "Unable to submit request at this time. Please try again.");
      }
    } catch (err: any) {
      setResumeError(err.message || "An unexpected error occurred. Please try again.");
    } finally {
      setResumeSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden bg-slate-950 border-t border-slate-900/60">
      
      {/* Background Ambience styling */}
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] rounded-full bg-teal-500/5 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] rounded-full bg-indigo-500/5 blur-[150px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="space-y-3 text-center mb-16">
          <span className="text-[10px] font-mono tracking-widest text-teal-400 uppercase font-semibold">Strategic Collaboration</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-100 font-sans">
            Let's Connect
          </h2>
          <p className="text-xs text-slate-400 max-w-lg mx-auto">
            I am always open to meaningful conversations about corporate finance, business strategy, advisory options, and career opportunities.
          </p>
        </div>

        {/* Centralized Glassmorphic Premium Contact Hub */}
        <div className="glass-panel border border-badge-border bg-badge-bg backdrop-blur-md rounded-3xl p-8 sm:p-10 shadow-2xl relative overflow-hidden group max-w-2xl mx-auto">
          
          <div className="absolute -right-12 -bottom-12 w-48 h-48 rounded-full bg-teal-500/5 blur-3xl pointer-events-none group-hover:bg-teal-500/10 transition-colors duration-500" />
          
          <div className="space-y-8 flex flex-col items-center text-center">
            
            {/* Email Display block */}
            <div className="space-y-2">
              <div className="inline-flex p-3 rounded-2xl bg-teal-500/10 border border-teal-500/20 text-teal-300 mb-2">
                <Mail className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-mono tracking-widest text-slate-500 uppercase block">Professional Inquiries</span>
              <a 
                href="mailto:ca.manasi.badgujar@gmail.com" 
                className="text-lg sm:text-xl font-extrabold text-slate-200 hover:text-teal-300 font-sans tracking-tight transition-colors duration-300"
              >
                ca.manasi.badgujar@gmail.com
              </a>
            </div>

            <div className="w-full h-px bg-badge-bg" />

            {/* Premium Action Grid */}
            <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-4">
              
              {/* Connect on LinkedIn Button */}
              <a
                href="https://www.linkedin.com/in/manasi-badgujar"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-5 py-3.5 rounded-2xl bg-slate-900 hover:bg-slate-850 text-slate-200 hover:text-teal-300 border border-badge-border hover:border-teal-500/20 shadow-md transition-all duration-300 font-sans text-xs font-bold uppercase tracking-wider cursor-pointer group"
              >
                <Linkedin className="w-4 h-4 text-teal-400 group-hover:scale-110 transition-transform" />
                <span>Connect</span>
              </a>

              {/* Request Resume Button */}
              <button
                onClick={() => {
                  setResumeSuccess(false);
                  setIsResumeModalOpen(true);
                }}
                className="flex items-center justify-center gap-2 px-5 py-3.5 rounded-2xl bg-slate-900 hover:bg-slate-850 text-slate-200 hover:text-teal-300 border border-badge-border hover:border-teal-500/20 shadow-md transition-all duration-300 font-sans text-xs font-bold uppercase tracking-wider cursor-pointer group"
              >
                <FileText className="w-4 h-4 text-teal-400 group-hover:scale-110 transition-transform" />
                <span>Request Resume</span>
              </button>

              {/* Send Message Button */}
              <button
                onClick={() => {
                  setContactSuccess(false);
                  setIsMessageModalOpen(true);
                }}
                className="flex items-center justify-center gap-2 px-5 py-3.5 rounded-2xl bg-teal-500 hover:bg-teal-400 text-slate-950 shadow-lg hover:shadow-teal-500/10 transition-all duration-300 font-sans text-xs font-bold uppercase tracking-wider cursor-pointer group"
              >
                <Send className="w-3.5 h-3.5 text-slate-950 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                <span>Send Message</span>
              </button>

            </div>

          </div>
        </div>

      </div>

      {/* ----------------- REQUEST RESUME MODAL ----------------- */}
      <AnimatePresence>
        {isResumeModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsResumeModalOpen(false)}
              className="absolute inset-0 bg-black/70 backdrop-blur-sm cursor-pointer"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ type: "spring", damping: 25, stiffness: 350 }}
              className="relative w-full max-w-lg bg-slate-950 border border-badge-border rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden focus:outline-none"
              role="dialog"
              aria-modal="true"
            >
              {/* Corner Glow decoration */}
              <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-teal-500/5 blur-2xl pointer-events-none" />

              {/* Header */}
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-badge-border">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-teal-500/10 border border-teal-500/20 text-teal-300">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-extrabold text-slate-100 uppercase tracking-wider font-sans">
                      Request Resume
                    </h3>
                    <p className="text-[9px] font-mono text-slate-400 uppercase tracking-widest mt-0.5">
                      Secure Access Credentials
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setIsResumeModalOpen(false)}
                  className="p-1.5 rounded-lg bg-badge-bg hover:bg-badge-hover text-slate-400 hover:text-slate-200 border border-badge-border transition-all cursor-pointer"
                  title="Close modal"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Form Content / Success state */}
              <AnimatePresence mode="wait">
                {resumeSuccess ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="py-12 text-center space-y-4"
                  >
                    <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 flex items-center justify-center mx-auto">
                      <CheckCircle className="w-7 h-7 animate-pulse" />
                    </div>
                    <div className="space-y-1.5">
                      <h4 className="font-bold text-slate-100 text-sm">Transmission Complete</h4>
                      <p className="text-xs text-slate-300 max-w-sm mx-auto leading-relaxed font-normal">
                        Thank you for your interest. Your request has been received and I will respond shortly.
                      </p>
                    </div>
                    <button
                      onClick={() => setIsResumeModalOpen(false)}
                      className="px-5 py-2.5 bg-badge-bg hover:bg-badge-hover border border-badge-border text-slate-300 text-xs font-semibold rounded-xl cursor-pointer transition-colors"
                    >
                      Done
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleResumeSubmit}
                    className="space-y-4 text-xs text-left"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="font-mono text-[9px] uppercase text-slate-400 font-semibold tracking-wider">Full Name</label>
                        <input
                          type="text"
                          required
                          value={resumeName}
                          onChange={(e) => setResumeName(e.target.value)}
                          placeholder="e.g. Anand Sharma"
                          className="w-full bg-badge-bg border border-badge-border rounded-xl px-3.5 py-2.5 placeholder-slate-600 text-slate-200 focus:border-teal-500/40 focus:outline-none transition-colors"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="font-mono text-[9px] uppercase text-slate-400 font-semibold tracking-wider">Business Email</label>
                        <input
                          type="email"
                          required
                          value={resumeEmail}
                          onChange={(e) => setResumeEmail(e.target.value)}
                          placeholder="anand@sharmacapital.com"
                          className="w-full bg-badge-bg border border-badge-border rounded-xl px-3.5 py-2.5 placeholder-slate-600 text-slate-200 focus:border-teal-500/40 focus:outline-none transition-colors"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="font-mono text-[9px] uppercase text-slate-400 font-semibold tracking-wider">Company</label>
                        <input
                          type="text"
                          required
                          value={resumeCompany}
                          onChange={(e) => setResumeCompany(e.target.value)}
                          placeholder="Sharma Advisory Partners"
                          className="w-full bg-badge-bg border border-badge-border rounded-xl px-3.5 py-2.5 placeholder-slate-600 text-slate-200 focus:border-teal-500/40 focus:outline-none transition-colors"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="font-mono text-[9px] uppercase text-slate-400 font-semibold tracking-wider">Designation</label>
                        <input
                          type="text"
                          required
                          value={resumeDesignation}
                          onChange={(e) => setResumeDesignation(e.target.value)}
                          placeholder="Managing Director"
                          className="w-full bg-badge-bg border border-badge-border rounded-xl px-3.5 py-2.5 placeholder-slate-600 text-slate-200 focus:border-teal-500/40 focus:outline-none transition-colors"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="font-mono text-[9px] uppercase text-slate-400 font-semibold tracking-wider">Purpose of Request</label>
                      <textarea
                        required
                        rows={3}
                        value={resumePurpose}
                        onChange={(e) => setResumePurpose(e.target.value)}
                        placeholder="Evaluating professional backgrounds for leadership consulting or corporate advisory options..."
                        className="w-full bg-badge-bg border border-badge-border rounded-xl px-3.5 py-2.5 placeholder-slate-600 text-slate-200 focus:border-teal-500/40 focus:outline-none transition-colors resize-none"
                      />
                    </div>

                    {resumeError && (
                      <div className="flex items-center gap-2 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-300 text-[10px]">
                        <AlertCircle className="w-4 h-4 flex-shrink-0" />
                        <p>{resumeError}</p>
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={resumeSubmitting}
                      className="w-full py-3 bg-teal-500 hover:bg-teal-400 text-slate-950 font-extrabold rounded-xl tracking-wider uppercase transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md text-xs"
                    >
                      {resumeSubmitting ? (
                        <span className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <>
                          <FileText className="w-4 h-4" />
                          Submit Resume Request
                        </>
                      )}
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ----------------- SEND MESSAGE MODAL ----------------- */}
      <AnimatePresence>
        {isMessageModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMessageModalOpen(false)}
              className="absolute inset-0 bg-black/70 backdrop-blur-sm cursor-pointer"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ type: "spring", damping: 25, stiffness: 350 }}
              className="relative w-full max-w-lg bg-slate-950 border border-badge-border rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden focus:outline-none"
              role="dialog"
              aria-modal="true"
            >
              {/* Corner Glow decoration */}
              <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-teal-500/5 blur-2xl pointer-events-none" />

              {/* Header */}
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-badge-border">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-teal-500/10 border border-teal-500/20 text-teal-300">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-extrabold text-slate-100 uppercase tracking-wider font-sans">
                      Send Message
                    </h3>
                    <p className="text-[9px] font-mono text-slate-400 uppercase tracking-widest mt-0.5">
                      Direct Communication Channel
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setIsMessageModalOpen(false)}
                  className="p-1.5 rounded-lg bg-badge-bg hover:bg-badge-hover text-slate-400 hover:text-slate-200 border border-badge-border transition-all cursor-pointer"
                  title="Close modal"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Form Content / Success state */}
              <AnimatePresence mode="wait">
                {contactSuccess ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="py-12 text-center space-y-4"
                  >
                    <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 flex items-center justify-center mx-auto">
                      <CheckCircle className="w-7 h-7 animate-pulse" />
                    </div>
                    <div className="space-y-1.5">
                      <h4 className="font-bold text-slate-100 text-sm">Message Transmitted</h4>
                      <p className="text-xs text-slate-300 max-w-sm mx-auto leading-relaxed font-normal">
                        Thank you for your message. I will get back to you soon.
                      </p>
                    </div>
                    <button
                      onClick={() => setIsMessageModalOpen(false)}
                      className="px-5 py-2.5 bg-badge-bg hover:bg-badge-hover border border-badge-border text-slate-300 text-xs font-semibold rounded-xl cursor-pointer transition-colors"
                    >
                      Done
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleContactSubmit}
                    className="space-y-4 text-xs text-left"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="font-mono text-[9px] uppercase text-slate-400 font-semibold tracking-wider">Name</label>
                        <input
                          type="text"
                          required
                          value={contactName}
                          onChange={(e) => setContactName(e.target.value)}
                          placeholder="e.g. Milind Shinde"
                          className="w-full bg-badge-bg border border-badge-border rounded-xl px-3.5 py-2.5 placeholder-slate-600 text-slate-200 focus:border-teal-500/40 focus:outline-none transition-colors"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="font-mono text-[9px] uppercase text-slate-400 font-semibold tracking-wider">Email Address</label>
                        <input
                          type="email"
                          required
                          value={contactEmail}
                          onChange={(e) => setContactEmail(e.target.value)}
                          placeholder="milind@shindeconsulting.com"
                          className="w-full bg-badge-bg border border-badge-border rounded-xl px-3.5 py-2.5 placeholder-slate-600 text-slate-200 focus:border-teal-500/40 focus:outline-none transition-colors"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="font-mono text-[9px] uppercase text-slate-400 font-semibold tracking-wider">Subject</label>
                      <input
                        type="text"
                        required
                        value={contactSubject}
                        onChange={(e) => setContactSubject(e.target.value)}
                        placeholder="Discussion regarding strategic consulting advisory..."
                        className="w-full bg-badge-bg border border-badge-border rounded-xl px-3.5 py-2.5 placeholder-slate-600 text-slate-200 focus:border-teal-500/40 focus:outline-none transition-colors"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="font-mono text-[9px] uppercase text-slate-400 font-semibold tracking-wider">Message</label>
                      <textarea
                        required
                        rows={4}
                        value={contactMessage}
                        onChange={(e) => setContactMessage(e.target.value)}
                        placeholder="Write your message here..."
                        className="w-full bg-badge-bg border border-badge-border rounded-xl px-3.5 py-2.5 placeholder-slate-600 text-slate-200 focus:border-teal-500/40 focus:outline-none transition-colors resize-none"
                      />
                    </div>

                    {contactError && (
                      <div className="flex items-center gap-2 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-300 text-[10px]">
                        <AlertCircle className="w-4 h-4 flex-shrink-0" />
                        <p>{contactError}</p>
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={contactSubmitting}
                      className="w-full py-3 bg-white hover:bg-slate-100 text-slate-950 font-extrabold rounded-xl tracking-wider uppercase transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md text-xs"
                    >
                      {contactSubmitting ? (
                        <span className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          Send Message
                        </>
                      )}
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
}
