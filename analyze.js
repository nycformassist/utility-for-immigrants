// api/analyze.js — Vercel Serverless Function
// Gemini API lives here. GEMINI_API_KEY never reaches the browser bundle.

import { GoogleGenAI } from "@google/genai";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: "GEMINI_API_KEY not set in Vercel environment variables." });
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
Produce a professional two-paragraph summary of the case strength and immediate legal priorities.
Use the following terms exactly: "Evidence Leaks", "Authority Readiness", "Fortress Status", "Narrative Gaps".
Do not use markdown formatting. Return the two paragraphs as plain text only.
Translate the response into the following language code: ${lang || "EN"}
  `.trim();

  try {
    const ai = new GoogleGenAI({ apiKey });

    // ── 7-SECOND RACE — beats Vercel/Netlify 10s kill switch ──────────────────
    // If Gemini is slow, we return a graceful Complexity Handshake message
    // instead of letting the platform kill the function and return a System Error.
    const timeout = new Promise((resolve) =>
      setTimeout(() => resolve({
        timedOut: true,
        text: "Complexity High: Deep Analysis in Progress. Your evidence audit and priority table below are complete — please present this packet to your legal counsel for the full Source of Truth review.",
      }), 7000)
    );

    const aiCall = ai.models
      .generateContent({
        model: "gemini-2.0-flash",   // v1 stable — gemini-3.x / v1beta are not valid in production
        contents: prompt,
      })
      .then((r) => ({ timedOut: false, text: r.text || "" }));

    const result = await Promise.race([aiCall, timeout]);

    return res.status(200).json({
      analysis: result.text,
      timedOut: result.timedOut || false,
    });

  } catch (err) {
    console.error("Gemini API error:", err);
    return res.status(500).json({
      analysis: "Analysis generation failed due to a system error. Please proceed with the manual review.",
      error: err.message,
    });
  }
}
