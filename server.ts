/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import { ContactMessage, ResumeRequest } from "./src/types.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize Gemini SDK lazily to prevent server crashes if API key is missing.
let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.warn("WARNING: GEMINI_API_KEY environment variable is not set. Chat features will run in mock mode.");
    }
    aiClient = new GoogleGenAI({
      apiKey: apiKey || "MOCK_KEY",
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiClient;
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // In-Memory Database pre-populated with professional, realistic data
  let contactMessages: ContactMessage[] = [
    {
      id: "msg-1",
      name: "Siddharth Mehta",
      email: "siddharth@mehtapartners.in",
      subject: "Synergy in FP&A Advisory Advisory opportunity",
      message: "Hi Manasi, I read your strategic profile. Your blend of treasury discipline at Axis Bank and articleship breadth (Audit, NGO, FMCG) is impressive. We are looking for high-potential professionals for our corporate advisory wing. Let me know if you are open to a brief conversation.",
      date: new Date(Date.now() - 3600000 * 24 * 3).toISOString(), // 3 days ago
      read: false
    },
    {
      id: "msg-2",
      name: "Rohan Deshmukh",
      email: "r.deshmukh@tata-corp.com",
      subject: "Treasury and Process Automation Consultation",
      message: "Hi Manasi, saw your post on automating Axis Bank reconciliation operations. We are driving a similar project in our corporate finance team and would love to hear your experience on managing cross-functional alignment.",
      date: new Date(Date.now() - 3600000 * 5).toISOString(), // 5 hours ago
      read: true
    }
  ];

  let resumeRequests: ResumeRequest[] = [
    {
      id: "req-1",
      name: "Ananya Iyer",
      company: "Everstone Capital",
      designation: "Investment Director",
      email: "aiyer@everstonecap.com",
      purpose: "Evaluating prospective candidates for FP&A / Investment Operations team.",
      date: new Date(Date.now() - 3600000 * 24 * 2).toISOString(), // 2 days ago
      status: 'pending'
    },
    {
      id: "req-2",
      name: "Milind Shinde",
      company: "KPMG India",
      designation: "Partner - Strategy & Deals Advisory",
      email: "mshinde@kpmg.com",
      purpose: "Discussing potential advisory roles in our corporate finance division.",
      date: new Date(Date.now() - 3600000 * 48).toISOString(), // 2 days ago
      status: 'approved'
    }
  ];

  // API Routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", mode: process.env.NODE_ENV || "development" });
  });

  // POST admin login
  app.post("/api/admin/login", (req, res) => {
    const { passcode } = req.body;
    const correctPasscode = process.env.ADMIN_PASSCODE || "Website@123";
    if (passcode === correctPasscode) {
      res.json({ success: true, token: "secure-admin-token-12345" });
    } else {
      res.status(401).json({ error: "Invalid administrative passcode. Access denied." });
    }
  });

  // GET submissions (Secured view for portfolio dashboard demo)
  app.get("/api/submissions", (req, res) => {
    const authHeader = req.headers.authorization;
    if (authHeader !== "Bearer secure-admin-token-12345") {
      return res.status(401).json({ error: "Unauthorized access" });
    }
    res.json({
      contactMessages,
      resumeRequests
    });
  });

  // POST contact form submission
  app.post("/api/contact", (req, res) => {
    const { name, email, subject, message } = req.body;
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const newMessage: ContactMessage = {
      id: `msg-${Date.now()}`,
      name,
      email,
      subject,
      message,
      date: new Date().toISOString(),
      read: false
    };

    contactMessages.unshift(newMessage);
    res.status(201).json({ success: true, message: "Message received successfully", data: newMessage });
  });

  // POST resume request
  app.post("/api/resume-request", (req, res) => {
    const { name, company, designation, email, purpose } = req.body;
    if (!name || !company || !designation || !email || !purpose) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const newRequest: ResumeRequest = {
      id: `req-${Date.now()}`,
      name,
      company,
      designation,
      email,
      purpose,
      date: new Date().toISOString(),
      status: 'pending'
    };

    resumeRequests.unshift(newRequest);
    res.status(201).json({ success: true, message: "Resume request submitted successfully", data: newRequest });
  });

  // POST approve/decline resume request (for interactive demo dashboard)
  app.post("/api/resume-request/:id/status", (req, res) => {
    const authHeader = req.headers.authorization;
    if (authHeader !== "Bearer secure-admin-token-12345") {
      return res.status(401).json({ error: "Unauthorized access" });
    }

    const { id } = req.params;
    const { status } = req.body;

    if (status !== 'approved' && status !== 'declined' && status !== 'pending') {
      return res.status(400).json({ error: "Invalid status value" });
    }

    const reqItem = resumeRequests.find(r => r.id === id);
    if (!reqItem) {
      return res.status(404).json({ error: "Request not found" });
    }

    reqItem.status = status;
    res.json({ success: true, data: reqItem });
  });

  // POST mark message as read
  app.post("/api/contact/:id/read", (req, res) => {
    const authHeader = req.headers.authorization;
    if (authHeader !== "Bearer secure-admin-token-12345") {
      return res.status(401).json({ error: "Unauthorized access" });
    }

    const { id } = req.params;
    const { read } = req.body;

    const msg = contactMessages.find(m => m.id === id);
    if (!msg) {
      return res.status(404).json({ error: "Message not found" });
    }

    msg.read = read;
    res.json({ success: true, data: msg });
  });

  // POST Gemini Chat Representative Route
  app.post("/api/chat", async (req, res) => {
    const { messages } = req.body;
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: "Messages array is required" });
    }

    // Guard against missing API key
    if (!process.env.GEMINI_API_KEY) {
      console.warn("GEMINI_API_KEY is not set. Responding with fallback professional AI message.");
      return res.json({
        text: `I am Manasi's AI Professional Representative. Manasi Badgujar is a qualified Chartered Accountant (Nov 2024) based in Mumbai. She cleared both groups of CA Final simultaneously, holds B.Com (2022) and secured exemptions in Advanced Financial Management (Final) and Cost & Management Accounting (Intermediate). She served as Manager of Treasury Operations at Axis Bank (March 2025 – September 2026), where she gained deep exposure to investment management, valuation support, and financial markets. She also had an intensive 3-year articleship at Bhadade Lahoti & Co., auditing across banking, FMCG, and real estate, and leading a major client business expansion initiative. She is pursuing high-potential opportunities in corporate finance, FP&A, consulting, and strategy. How else can I assist you?`
      });
    }

    try {
      const ai = getGeminiClient();

      // System Instruction to position Manasi as a strategic problem solver, business partner, and future leader
      const systemInstruction = `You are an AI Professional Representative for Manasi Badgujar, a highly analytical and strategic Chartered Accountant based in Mumbai, India.

Your objective is to represent Manasi, communicating her professional values, analytical rigor, leadership potential, and deep business interest. Position her as a proactive, forward-thinking finance leader, rather than a back-office operations specialist.

Key professional profile facts:
1. Academic Credentials: Qualified as a Chartered Accountant in November 2024, clearing both groups of CA Final simultaneously. Achieved academic exemptions in Advanced Financial Management (AFM) in CA Final and Cost and Management Accounting (CMA) in CA Intermediate. Scored distinction-level (70%) in CA CPT/Foundation. Completed ICITSS - Information Technology training covering Advanced Excel and tech-enabled processes. Graduated with a B.Com in 2022 from North Maharashtra University.
2. Axis Bank Experience (March 2025 – September 2026): Served as Manager – Treasury Operations. This experience strengthened financial discipline, analytical thinking, investment understanding, and deep exposure to financial markets. Key focus areas: Investment management exposure, financial instruments, investment accounting, valuation support, financial reporting, regulatory framework, process improvement initiatives, cross-functional coordination, and risk awareness. Avoid framing this as a routine operational role.
3. Articleship Experience (2021 – 2024) at Bhadade Lahoti and Company: Highly detailed and formative 3-year articleship providing broad exposure across multiple sectors: Banking, FMCG, NGOs, Real Estate, Taxation, Audit, Business Advisory, and Project Finance. Highlight client management, operational insights, independent problem-solving, and early ownership. Includes a key leadership spotlight: "Led a business expansion initiative for a client during articleship, coordinating team efforts, conducting research and analysis, contributing strategic inputs, and supporting execution. This experience strengthened leadership, collaboration, communication, and business problem-solving capabilities."
4. Certifications & Languages: Completed "Bond Mathematics & Introduction to Indian Treasury Markets" (FIMMDA, 2025) and "Certificate Course on Foreign Exchange Operations" (IIBF, 2026). Languages: English, Hindi, Marathi, and Japanese (Basic).
5. Continuous Learning Note: "Beyond formal qualifications, I actively explore artificial intelligence, automation, business research, emerging technologies, and language learning to broaden my perspective and strengthen problem-solving capabilities."
6. Creating Positive Impact Note: "A genuine underlying desire to create positive impact, beginning with continuous self-improvement and extending through meaningful contributions to teams, organizations, and society."

Core Response Style Guidelines (STRICT):
- Responses MUST be fast, extremely direct, concise, specific, and highly informative.
- Keep answers very short and crisp (ideally under 100-120 words).
- ABSOLUTELY NO motivational speeches, philosophical essays, or generic AI-generated fluff.
- Avoid flowery language or self-praise. Present facts with professional maturity and strategic value.
- Speak in the third person as her AI representative (e.g., "Manasi served as...", "She has exposure to...").
- If asked about her resume or contact information, direct the user to the relevant forms/sections of her portfolio.`;

      // Map incoming client-side messages structure to the format expected by @google/genai SDK
      // Client format: { sender: 'user'|'assistant', text: string }
      // SDK format: { role: 'user'|'model', parts: [{ text: string }] }
      const sdkContents = messages.map(msg => ({
        role: msg.sender === 'user' ? 'user' : 'model',
        parts: [{ text: msg.text }]
      }));

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: sdkContents,
        config: {
          systemInstruction,
          temperature: 0.7,
        },
      });

      res.json({ text: response.text });
    } catch (err: any) {
      console.error("Gemini API Error:", err);
      res.status(500).json({ error: "Failed to generate AI response", details: err.message });
    }
  });

  // Serve static assets in production, otherwise mount Vite
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT} in ${process.env.NODE_ENV || "development"} mode`);
  });
}

startServer();
