# Sanctuary Portal — Production Deployment Guide

## ✅ What Was Fixed (V1-Stable Hardening)

| Issue | Before | After |
|---|---|---|
| Model name | `gemini-3-flash-preview` (doesn't exist) | `gemini-2.0-flash` (stable v1) |
| API key security | Exposed in frontend bundle via `process.env` | Moved to serverless `/api/analyze.js` |
| React bundling | `esm.sh` URL aliases broke Vercel's Node.js build | Standard npm imports |
| Font | Playfair Display | Merriweather (legal-grade serif) |
| Watermark | External imgur image (fails when blocked) | CSS text `CONFIDENTIAL` — always renders |
| Timeout | None — Vercel's 10s kill switch crashed silently | 7-second `Promise.race()` with graceful fallback |
| Logo pathing | `https://imgur.com/...` absolute URL | `/logo.png` relative path from `/public` |

---

## 📁 File Structure

```
your-repo/
├── api/
│   └── analyze.js          ← Serverless function (Gemini API lives here)
├── public/
│   └── logo.png            ← Add your logo here
├── src/
│   ├── App.tsx             ← Main app (patched)
│   ├── constants.tsx       ← Unchanged
│   ├── index.css           ← Merriweather + watermark (patched)
│   └── main.tsx            ← Unchanged
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts          ← esm.sh aliases removed (patched)
└── netlify.toml
```

---

## 🚀 Vercel Deployment Steps

### 1. Add your logo
Place your logo file at `public/logo.png`. If you don't have one, the header will gracefully hide the image.

### 2. Push all files to GitHub
Replace the 4 patched files in your repo:
- `api/analyze.js` ← **new file, must be created**
- `src/App.tsx`
- `src/index.css`
- `vite.config.ts`

### 3. Set the Environment Variable in Vercel
- Go to your project on vercel.com
- **Settings → Environment Variables**
- Add: `GEMINI_API_KEY` = your key from aistudio.google.com
- Apply to: Production, Preview, Development

### 4. Deploy
Vercel auto-deploys on push. Or click **Redeploy** in the dashboard.

---

## 🔑 API Key Security
Your `GEMINI_API_KEY` now lives **only** on Vercel's servers.
The frontend calls `/api/analyze` — a serverless function that runs in Node.js.
The key never appears in the browser bundle. ✅

---

## ⚡ Timeout Behavior
If Gemini takes longer than 7 seconds, users see:
> *"Complexity High: Deep Analysis in Progress. Please stay on this page."*

This prevents Vercel's 10-second function kill from showing a blank/error screen.
