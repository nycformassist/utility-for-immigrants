// /api/analyze.js — Vercel Serverless Function
// All Gemini API calls happen here. GEMINI_API_KEY never touches the frontend bundle.

import { GoogleGenAI } from "@google/genai";

export default async function handler(req, res) {
  // Only allow POST
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: "API key not configured on server." });
  }

  const { answers, lang, narrativeStarters } = req.body;

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
    ${(narrativeStarters || []).join(", ")}
    
    Additional narrative:
    ${answers.narrative_text || "None"}
    
    Instructions:
    Produce a professional two-paragraph summary of the case strength and immediate legal priorities.
    Use the following terms exactly: "Evidence Leaks", "Authority Readiness", "Fortress Status", "Narrative Gaps".
    Do not use markdown formatting. Return the two paragraphs as plain text only.
    Translate the response into the following language code: ${lang || "EN"}
  `;

  try {
    const ai = new GoogleGenAI({ apiKey });

    // 7-second race — prevents Vercel's 10s kill switch from silently crashing
    const timeoutPromise = new Promise((resolve) =>
      setTimeout(
        () =>
          resolve({
            timedOut: true,
            text: "Complexity High: Deep Analysis in Progress. Please stay on this page.",
          }),
        7000
      )
    );

    const aiPromise = ai.models
      .generateContent({
        model: "gemini-2.0-flash",  // stable v1 model — gemini-3.x does not exist
        contents: prompt,
      })
      .then((response) => ({ timedOut: false, text: response.text || "" }));

    const result = await Promise.race([aiPromise, timeoutPromise]);

    return res.status(200).json({ analysis: result.text, timedOut: result.timedOut });
  } catch (error) {
    console.error("Gemini API Error:", error);
    return res.status(500).json({
      error: "Analysis generation failed.",
      analysis:
        "Analysis generation failed due to a system error. Please proceed with the manual review.",
    });
  }
}
