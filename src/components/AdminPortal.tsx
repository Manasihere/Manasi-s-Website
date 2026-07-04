/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { Lock, Check, X, Mail, FileText, ChevronRight, Eye, EyeOff, AlertCircle, RefreshCw } from "lucide-react";
import { ContactMessage, ResumeRequest } from "../types.js";
import { motion, AnimatePresence } from "motion/react";

interface AdminPortalProps {
  onClose: () => void;
  // Callback to trigger re-fetches in contact form if needed
  onRefreshTrigger?: () => void;
}

export default function AdminPortal({ onClose, onRefreshTrigger }: AdminPortalProps) {
  const [passcode, setPasscode] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [contactMessages, setContactMessages] = useState<ContactMessage[]>([]);
  const [resumeRequests, setResumeRequests] = useState<ResumeRequest[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const fetchSubmissions = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/submissions");
      if (response.ok) {
        const data = await response.json();
        setContactMessages(data.contactMessages || []);
        setResumeRequests(data.resumeRequests || []);
      }
    } catch (err) {
      console.error("Failed to load submissions", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchSubmissions();
    }
  }, [isAuthenticated, refreshKey]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode === "admin123") {
      setIsAuthenticated(true);
      setError(null);
    } else {
      setError("Invalid administrative passcode. Please try again.");
    }
  };

  const updateRequestStatus = async (id: string, status: 'approved' | 'declined') => {
    try {
      const response = await fetch(`/api/resume-request/${id}/status`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status })
      });
      if (response.ok) {
        setResumeRequests(prev =>
          prev.map(req => req.id === id ? { ...req, status } : req)
        );
        if (onRefreshTrigger) onRefreshTrigger();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const toggleMessageRead = async (id: string, currentRead: boolean) => {
    try {
      const response = await fetch(`/api/contact/${id}/read`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ read: !currentRead })
      });
      if (response.ok) {
        setContactMessages(prev =>
          prev.map(msg => msg.id === id ? { ...msg, read: !currentRead } : msg)
        );
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
      <div className="w-full max-w-5xl bg-slate-900 border border-slate-800 rounded-2xl shadow-[0_32px_80px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="px-6 py-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-teal-500/10 border border-teal-500/20">
              <Lock className="w-5 h-5 text-teal-300" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-100">Administrative Portal</h3>
              <p className="text-[10px] font-mono text-slate-400">Secure Audit & Submission Panel</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-800 transition-colors text-xs cursor-pointer"
          >
            Close Portal
          </button>
        </div>

        {/* Login Page */}
        {!isAuthenticated ? (
          <div className="flex-1 flex flex-col items-center justify-center p-8 max-w-md mx-auto">
            <form onSubmit={handleLogin} className="w-full space-y-4">
              <div className="text-center space-y-2 mb-6">
                <div className="w-12 h-12 rounded-full bg-slate-950 flex items-center justify-center mx-auto border border-slate-800">
                  <Lock className="w-5 h-5 text-slate-400" />
                </div>
                <h4 className="text-sm font-semibold text-slate-200">Enter Access Key</h4>
                <p className="text-xs text-slate-400">
                  Enter administrative passcode to view active resume requests and message submissions.
                </p>
                <div className="inline-block px-2.5 py-1 text-[10px] font-mono bg-teal-500/10 border border-teal-500/20 text-teal-300 rounded mt-2">
                  Passcode Hint: <span className="font-semibold select-all">admin123</span>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-mono uppercase tracking-wider text-slate-400">Security Passcode</label>
                <input
                  type="password"
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm focus:border-teal-500/40 focus:outline-none transition-colors text-center text-slate-100 font-mono"
                  autoFocus
                />
              </div>

              {error && (
                <div className="flex items-center gap-2 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-300 text-[11px]">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <p>{error}</p>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-2.5 bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold rounded-xl text-xs tracking-wider uppercase transition-colors shadow-lg cursor-pointer"
              >
                Verify Authorization
              </button>
            </form>
          </div>
        ) : (
          /* Submissions Portal Dashboard */
          <div className="flex-1 overflow-y-auto p-6 space-y-8">
            
            {/* Top Stats or Refresh Bar */}
            <div className="flex items-center justify-between pb-2 border-b border-slate-800/50">
              <div className="flex gap-4 text-xs font-mono">
                <div className="text-slate-400">
                  Pending Resumes: <span className="text-amber-400 font-bold">{resumeRequests.filter(r => r.status === 'pending').length}</span>
                </div>
                <div className="text-slate-400">
                  Unread Messages: <span className="text-teal-400 font-bold">{contactMessages.filter(m => !m.read).length}</span>
                </div>
              </div>
              <button
                onClick={() => setRefreshKey(prev => prev + 1)}
                disabled={isLoading}
                className="flex items-center gap-1.5 text-xs text-teal-300 hover:text-teal-200 transition-colors cursor-pointer"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
                Refresh Data
              </button>
            </div>

            {/* Resume Requests Panel */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <FileText className="w-4.5 h-4.5 text-slate-400" />
                <h4 className="text-sm font-bold text-slate-200 uppercase tracking-wider">Resume Verification Requests</h4>
              </div>

              {resumeRequests.length === 0 ? (
                <div className="p-8 text-center border border-dashed border-slate-800 rounded-xl">
                  <p className="text-xs text-slate-500">No resume requests received yet.</p>
                </div>
              ) : (
                <div className="overflow-x-auto border border-slate-800/80 rounded-xl bg-slate-950/40">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-950 border-b border-slate-800/80 text-[10px] font-mono uppercase text-slate-400">
                        <th className="px-5 py-3">Applicant / Organization</th>
                        <th className="px-5 py-3">Purpose of Request</th>
                        <th className="px-5 py-3">Requested Date</th>
                        <th className="px-5 py-3 text-center">Status</th>
                        <th className="px-5 py-3 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-900 text-xs">
                      {resumeRequests.map((req) => (
                        <tr key={req.id} className="hover:bg-slate-900/40 transition-colors">
                          <td className="px-5 py-4 space-y-1">
                            <div className="font-semibold text-slate-100">{req.name}</div>
                            <div className="text-[10px] text-slate-400">
                              {req.designation} at <span className="text-slate-300 font-medium">{req.company}</span>
                            </div>
                            <div className="text-[10px] font-mono text-slate-500">{req.email}</div>
                          </td>
                          <td className="px-5 py-4 text-slate-300 max-w-xs truncate" title={req.purpose}>
                            {req.purpose}
                          </td>
                          <td className="px-5 py-4 font-mono text-[11px] text-slate-400">
                            {new Date(req.date).toLocaleDateString()} at {new Date(req.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </td>
                          <td className="px-5 py-4 text-center">
                            <span
                              className={`inline-block px-2 py-0.5 rounded text-[10px] font-semibold uppercase ${
                                req.status === "approved"
                                  ? "bg-green-500/10 text-green-400 border border-green-500/20"
                                  : req.status === "declined"
                                  ? "bg-red-500/10 text-red-400 border border-red-500/20"
                                  : "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                              }`}
                            >
                              {req.status}
                            </span>
                          </td>
                          <td className="px-5 py-4 text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              {req.status !== 'approved' && (
                                <button
                                  onClick={() => updateRequestStatus(req.id, 'approved')}
                                  className="p-1 rounded bg-green-500/10 hover:bg-green-500/20 text-green-400 hover:text-green-300 border border-green-500/20 transition-all cursor-pointer"
                                  title="Approve / Send Resume"
                                >
                                  <Check className="w-3.5 h-3.5" />
                                </button>
                              )}
                              {req.status !== 'declined' && (
                                <button
                                  onClick={() => updateRequestStatus(req.id, 'declined')}
                                  className="p-1 rounded bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 border border-red-500/20 transition-all cursor-pointer"
                                  title="Decline"
                                >
                                  <X className="w-3.5 h-3.5" />
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* Contact Messages Panel */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Mail className="w-4.5 h-4.5 text-slate-400" />
                <h4 className="text-sm font-bold text-slate-200 uppercase tracking-wider">Direct Communications</h4>
              </div>

              {contactMessages.length === 0 ? (
                <div className="p-8 text-center border border-dashed border-slate-800 rounded-xl">
                  <p className="text-xs text-slate-500">No contact messages received yet.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {contactMessages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`p-5 rounded-xl border transition-colors ${
                        msg.read
                          ? "bg-slate-900/40 border-slate-850 text-slate-300"
                          : "bg-slate-900/90 border-slate-800 text-slate-100 shadow-sm shadow-teal-500/5"
                      }`}
                    >
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-3">
                        <div className="space-y-0.5">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-slate-200 text-sm">{msg.name}</span>
                            {!msg.read && (
                              <span className="inline-block w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
                            )}
                          </div>
                          <p className="text-[10px] font-mono text-slate-400">{msg.email}</p>
                        </div>
                        <div className="flex items-center gap-4 text-[10px] text-slate-500 font-mono">
                          <span>{new Date(msg.date).toLocaleString()}</span>
                          <button
                            onClick={() => toggleMessageRead(msg.id, msg.read)}
                            className="flex items-center gap-1.5 text-teal-400 hover:text-teal-300 transition-colors bg-slate-950/60 border border-slate-800 hover:border-teal-500/30 px-2.5 py-1 rounded cursor-pointer"
                          >
                            {msg.read ? (
                              <>
                                <EyeOff className="w-3 h-3" />
                                Mark Unread
                              </>
                            ) : (
                              <>
                                <Eye className="w-3 h-3" />
                                Mark Read
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                      <div className="space-y-2 border-t border-slate-950 pt-3">
                        <h5 className="font-semibold text-slate-200 text-xs">{msg.subject}</h5>
                        <p className="text-xs leading-relaxed text-slate-300 whitespace-pre-wrap">{msg.message}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
