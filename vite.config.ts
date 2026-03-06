import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');
  return {
    plugins: [react(), tailwindcss()],
    define: {
      // API key is NO LONGER injected into the bundle.
      // It lives only in Vercel's environment variables, read by /api/analyze.js server-side.
      // Keeping this as undefined so any accidental direct usage fails loudly.
      'process.env.GEMINI_API_KEY': JSON.stringify(undefined),
    },
    resolve: {
      alias: {
        // ✅ FIX: Removed esm.sh URL aliases for react/react-dom.
        // Those URLs work in AI Studio's browser sandbox but break Vercel's Node.js build step.
        // Standard npm react/react-dom from package.json is correct for production.
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR disabled in AI Studio. Do not modify.
      hmr: process.env.DISABLE_HMR !== 'true',
    },
  };
});
