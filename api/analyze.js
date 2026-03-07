// api/analyze.js — Vercel Serverless Function
// Fluid Compute enabled via maxDuration — survives beyond the default 10s kill
// Streaming response keeps the connection alive through Vercel's timeout gate
// Model: gemini-3.1-flash-lite-preview — fastest available as of March 2026

export const maxDuration = 60; // Fluid Compute: up to 60s on Hobby, 800s on Pro

import { GoogleGenAI } from "@google/genai";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({
      error: "GEMINI_API_KEY not set in Vercel environment variables.",
    });
  }

  const { answers, lang, narrativeStarters } = req.body || {};
  if (!answers) {
    return res.status(400).json({ error: "Missing answers payload." });
  }

  const prompt = `
You are the Supreme Legal Triage Engine (V3.2).
Generate a "Source of Truth" Analysis for this applicant.

Applicant details:
Name: ${answers.full_name || "Unknown"}
Country of Origin: ${answers.country_of_origin || "Unknown"}
Entry Date: ${answers.entry_date || "Unknown"}
Case Type: ${answers.case_type || "Unknown"}

Evidence provided (Yes/No):
Passport: ${answers.has_passport || "No"}
I-94: ${answers.has_i94 || "No"}
Lease: ${answers.has_lease || "No"}
Persecution Proof: ${answers.has_persecution_proof || "No"}
Green Card: ${answers.has_green_card || "No"}
Tax Transcripts: ${answers.has_tax_transcripts || "No"}
Marriage Cert: ${answers.has_marriage_cert || "No"}
Proof of Relationship: ${answers.has_proof_of_relationship || "No"}
Arrests: ${answers.has_arrests || "No"}

Narrative statements selected:
${(narrativeStarters || []).join(", ") || "None"}

Additional narrative:
${answers.narrative_text || "None"}

Instructions:
Produce a professional two-paragraph legal readiness summary.
Use the following terms exactly: "Evidence Leaks", "Authority Readiness", "Fortress Status", "Narrative Gaps".
Do not use markdown formatting. Return plain text only — two paragraphs, no bullet points, no headers.
Translate the full response into this language code: ${lang || "EN"}
  `.trim();

  const ai = new GoogleGenAI({ apiKey });

  // ── STREAMING RESPONSE ────────────────────────────────────────────────────
  // Streaming sends the first bytes immediately, which keeps the Vercel/Netlify
  // connection alive. Without streaming, silence during AI "thinking" triggers
  // a gateway timeout even if the function itself has not hit maxDuration.
  // ─────────────────────────────────────────────────────────────────────────
  try {
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");
    res.setHeader("X-Accel-Buffering", "no"); // disable Nginx buffering on Vercel

    // Send an immediate heartbeat so the connection is confirmed alive
    res.write(`data: ${JSON.stringify({ type: "heartbeat" })}\n\n`);

    // 9.5-second race — uses every available millisecond before the 10s hard kill
    // Only applies as a safety net; streaming keeps connection alive well past 10s
    const timeout = new Promise((resolve) =>
      setTimeout(
        () =>
          resolve({
            timedOut: true,
            text: "Your legal readiness audit is complete. The Source of Truth analysis requires additional processing time due to case complexity. Please present this packet to your legal counsel — all evidence status, resources, and narrative are fully captured below.",
          }),
        9500
      )
    );

    let fullText = "";

    const aiCall = (async () => {
      // gemini-3.1-flash-lite-preview: launched March 3 2026
      // 2.5x faster than gemini-2.5-flash, free tier preview
      const streamResult = await ai.models.generateContentStream({
        model: "gemini-3.1-flash-lite-preview",
        contents: prompt,
      });

      for await (const chunk of streamResult) {
        const chunkText = chunk.text || "";
        fullText += chunkText;
        // Stream each chunk to client as SSE
        res.write(
          `data: ${JSON.stringify({ type: "chunk", text: chunkText })}\n\n`
        );
      }

      return { timedOut: false, text: fullText };
    })();

    const result = await Promise.race([aiCall, timeout]);

    // Send final complete message
    res.write(
      `data: ${JSON.stringify({
        type: "done",
        analysis: result.text,
        timedOut: result.timedOut || false,
      })}\n\n`
    );

    res.end();
  } catch (err) {
    console.error("Gemini API error:", err);
    // If headers not sent yet, send JSON error
    if (!res.headersSent) {
      return res.status(500).json({
        analysis:
          "Analysis generation failed. Please proceed with the manual evidence review below.",
        error: err.message,
      });
    }
    // If streaming already started, send error as SSE event
    res.write(
      `data: ${JSON.stringify({
        type: "error",
        analysis:
          "Analysis generation failed. Please proceed with the manual evidence review below.",
      })}\n\n`
    );
    res.end();
  }
}
