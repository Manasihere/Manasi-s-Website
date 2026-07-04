/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from "react";
import { Send, Sparkles, AlertCircle, HelpCircle, Bot, X, MessageSquare } from "lucide-react";
import { ChatMessage } from "../types.js";
import { motion, AnimatePresence } from "motion/react";

export default function AIChatRepresentative() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "init-1",
      sender: "assistant",
      text: "Hello! I am Manasi's AI Representative. I can provide direct, specific, and structured answers about her expertise, career achievements, and professional qualifications. Feel free to use the suggested topics below or enter your own question.",
      date: new Date().toISOString()
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);

  const suggestedPrompts = [
    "What kind of roles is Manasi targeting next?",
    "What industries has she worked with?",
    "What leadership experiences has she had?",
    "What are her key strengths?",
    "Why is she interested in business analysis and advisory?",
    "What technologies is she currently learning?",
    "What was her most impactful articleship experience?",
    "What does she enjoy outside work?"
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isLoading, isOpen]);

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim() || isLoading) return;

    setError(null);
    const userMessage: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: "user",
      text: textToSend,
      date: new Date().toISOString()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMessage].map(m => ({
            sender: m.sender,
            text: m.text
          }))
        })
      });

      if (!response.ok) {
        throw new Error("Could not connect to the portfolio representative server.");
      }

      const data = await response.json();
      const aiMessage: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: "assistant",
        text: data.text || "I was able to process your inquiry, but received an empty response. How else may I assist you today?",
        date: new Date().toISOString()
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (err: any) {
      console.error(err);
      setError("Unable to get AI response. Please try again or use the Contact Form.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSendMessage(inputValue);
  };

  return (
    <>
      {/* Floating Glassmorphic FAB Toggle */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          id="ai-representative-fab"
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 px-4 py-3 rounded-full bg-slate-900/85 hover:bg-slate-900/95 text-teal-300 hover:text-teal-200 border border-teal-500/30 hover:border-teal-400/50 shadow-lg backdrop-blur-md hover:shadow-teal-500/10 transition-all duration-300 cursor-pointer group"
          title="Ask Manasi's AI Representative"
        >
          <div className="relative">
            <Bot className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 border border-slate-950 rounded-full animate-pulse" />
          </div>
          <span className="text-xs font-bold font-sans tracking-wide pr-1 hidden sm:inline-block">
            Ask Manasi's AI
          </span>
        </button>
      </div>

      {/* Drawer Overlay Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              id="ai-drawer-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 cursor-pointer"
            />

            {/* Slide-out Panel */}
            <motion.div
              id="ai-drawer-panel"
              ref={drawerRef}
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 220 }}
              className="fixed right-0 top-0 h-full w-full max-w-md bg-slate-950 border-l border-white/10 shadow-2xl z-50 flex flex-col focus:outline-none"
              role="dialog"
              aria-modal="true"
              aria-labelledby="ai-drawer-title"
            >
              {/* Top ambient glow decoration */}
              <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-teal-500/5 blur-[80px] pointer-events-none" />

              {/* Panel Header */}
              <div className="px-6 py-5 bg-slate-950/90 border-b border-white/5 flex items-center justify-between relative z-10">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-teal-500/10 border border-teal-500/20 text-teal-300">
                    <Bot className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 id="ai-drawer-title" className="text-sm font-extrabold text-slate-100 tracking-tight">
                      Manasi's AI Assistant
                    </h3>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      <span className="text-[9px] font-mono text-teal-400 uppercase tracking-widest">
                        Professional representative
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-slate-200 border border-white/5 transition-all cursor-pointer"
                  title="Close panel"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Chat Log Viewport */}
              <div className="flex-1 overflow-y-auto px-6 py-6 space-y-4 relative z-10">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-2xl px-4 py-3 text-xs leading-relaxed shadow-md ${
                        msg.sender === "user"
                          ? "bg-teal-500 text-slate-950 rounded-tr-none font-medium"
                          : "bg-slate-900/90 text-slate-200 border border-white/5 rounded-tl-none font-normal"
                      }`}
                    >
                      <p className="whitespace-pre-line">{msg.text}</p>
                      <span
                        className={`block text-[9px] mt-1.5 font-mono text-right ${
                          msg.sender === "user" ? "text-slate-950/60" : "text-slate-500"
                        }`}
                      >
                        {new Date(msg.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  </div>
                ))}

                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-slate-900/90 text-slate-200 border border-white/5 rounded-2xl rounded-tl-none px-4 py-3 shadow-md">
                      <div className="flex items-center gap-1.5 py-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                        <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                        <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                      </div>
                    </div>
                  </div>
                )}

                {error && (
                  <div className="flex items-center gap-2 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-300 text-[11px]">
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    <p>{error}</p>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Sticky Suggested Questions Bar */}
              {!isLoading && (
                <div className="px-6 py-4 border-t border-white/5 bg-slate-950/80 relative z-10">
                  <div className="flex items-center gap-1.5 mb-2.5">
                    <HelpCircle className="w-3.5 h-3.5 text-teal-400" />
                    <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400">
                      Explore Professional Details
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2 max-h-[140px] overflow-y-auto pr-1">
                    {suggestedPrompts.map((prompt, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSendMessage(prompt)}
                        className="text-[10px] font-medium text-slate-300 bg-slate-900 hover:bg-teal-500/10 hover:text-teal-300 border border-white/5 hover:border-teal-500/30 rounded-lg px-2.5 py-1.5 text-left transition-all duration-200 cursor-pointer"
                      >
                        {prompt}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Footer Chat Input Form */}
              <form
                onSubmit={handleFormSubmit}
                className="px-6 py-4 bg-slate-950 border-t border-white/5 flex items-center gap-3 relative z-10"
              >
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ask a strategic or technical question..."
                  className="flex-1 bg-slate-900 text-slate-100 placeholder-slate-500 border border-white/5 focus:border-teal-500/40 focus:outline-none rounded-xl px-4 py-3 text-xs transition-colors"
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  disabled={!inputValue.trim() || isLoading}
                  className="p-3 bg-teal-500 hover:bg-teal-400 disabled:bg-slate-900 text-slate-950 disabled:text-slate-600 rounded-xl transition-all duration-200 cursor-pointer flex-shrink-0"
                  title="Submit Inquiry"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
