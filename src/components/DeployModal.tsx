import React, { useState } from 'react';
import { 
  Terminal, 
  Copy, 
  Check, 
  X, 
  ExternalLink, 
  Globe, 
  Server, 
  FileCode, 
  Cpu, 
  Layers 
} from 'lucide-react';

interface DeployModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DeployModal: React.FC<DeployModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'local' | 'cloud' | 'docker' | 'iot'>('local');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleCopy = (key: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="w-full max-w-2xl rounded-2xl holo-panel border border-cyan-500/40 shadow-2xl p-6 space-y-5 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-cyan-950 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
              <Terminal className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white font-sans">
                Run & Deploy AquaShield Website
              </h3>
              <p className="text-xs text-slate-400 font-mono">
                Team Atlas Science Fair Project Deployment Manual
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selector */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-900 rounded-lg border border-slate-800 text-xs font-mono">
          <button
            onClick={() => setActiveTab('local')}
            className={`px-3 py-1.5 rounded transition-colors cursor-pointer ${
              activeTab === 'local' ? 'bg-cyan-950 text-cyan-300 border border-cyan-500/40' : 'text-slate-400 hover:text-white'
            }`}
          >
            1. Local Machine (Node.js)
          </button>
          <button
            onClick={() => setActiveTab('cloud')}
            className={`px-3 py-1.5 rounded transition-colors cursor-pointer ${
              activeTab === 'cloud' ? 'bg-cyan-950 text-cyan-300 border border-cyan-500/40' : 'text-slate-400 hover:text-white'
            }`}
          >
            2. Free Cloud (Vercel / Netlify)
          </button>
          <button
            onClick={() => setActiveTab('docker')}
            className={`px-3 py-1.5 rounded transition-colors cursor-pointer ${
              activeTab === 'docker' ? 'bg-cyan-950 text-cyan-300 border border-cyan-500/40' : 'text-slate-400 hover:text-white'
            }`}
          >
            3. Docker Container
          </button>
          <button
            onClick={() => setActiveTab('iot')}
            className={`px-3 py-1.5 rounded transition-colors cursor-pointer ${
              activeTab === 'iot' ? 'bg-cyan-950 text-cyan-300 border border-cyan-500/40' : 'text-slate-400 hover:text-white'
            }`}
          >
            4. IoT Live Stream Setup
          </button>
        </div>

        {/* Tab 1: Local */}
        {activeTab === 'local' && (
          <div className="space-y-4 text-xs font-mono">
            <p className="text-slate-300 leading-relaxed font-sans">
              AquaShield is built using modern React, TypeScript, Vite, and Tailwind CSS. It requires Node.js 18+ and has zero paid API requirements.
            </p>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-slate-400">
                <span>Step 1: Install Dependencies</span>
                <button
                  onClick={() => handleCopy('c1', 'npm install')}
                  className="flex items-center gap-1 text-[11px] text-cyan-400 hover:text-cyan-300"
                >
                  {copiedKey === 'c1' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedKey === 'c1' ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
              <pre className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-cyan-300 overflow-x-auto">
                npm install
              </pre>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-slate-400">
                <span>Step 2: Start Development Server</span>
                <button
                  onClick={() => handleCopy('c2', 'npm run dev')}
                  className="flex items-center gap-1 text-[11px] text-cyan-400 hover:text-cyan-300"
                >
                  {copiedKey === 'c2' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedKey === 'c2' ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
              <pre className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-cyan-300 overflow-x-auto">
                npm run dev
              </pre>
              <div className="text-[11px] text-slate-400 font-sans">
                The control centre will open at <strong className="text-white">http://localhost:3000</strong> or <strong className="text-white">http://localhost:5173</strong> in your web browser.
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-slate-400">
                <span>Step 3: Compile Static Production Bundle</span>
                <button
                  onClick={() => handleCopy('c3', 'npm run build\nnpm run preview')}
                  className="flex items-center gap-1 text-[11px] text-cyan-400 hover:text-cyan-300"
                >
                  {copiedKey === 'c3' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedKey === 'c3' ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
              <pre className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-cyan-300 overflow-x-auto">
                npm run build{'\n'}npm run preview
              </pre>
            </div>
          </div>
        )}

        {/* Tab 2: Cloud */}
        {activeTab === 'cloud' && (
          <div className="space-y-4 text-xs font-mono">
            <p className="text-slate-300 leading-relaxed font-sans">
              You can deploy this website for free to any standard static hosting platform without configuring any environment variables or paying for mapping APIs.
            </p>

            <div className="space-y-2">
              <div className="text-slate-400">Option A: Deploy to Vercel</div>
              <pre className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-cyan-300 overflow-x-auto">
                npx vercel --prod
              </pre>
            </div>

            <div className="space-y-2">
              <div className="text-slate-400">Option B: Deploy to Netlify</div>
              <pre className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-cyan-300 overflow-x-auto">
                npx netlify deploy --prod --dir=dist
              </pre>
            </div>

            <div className="space-y-2">
              <div className="text-slate-400">Option C: GitHub Pages</div>
              <div className="text-[11px] text-slate-400 font-sans">
                Push to GitHub, enable GitHub Pages from the repository Settings &gt; Pages, and point it to the built <code>dist/</code> folder or use GitHub Actions for Vite.
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Docker */}
        {activeTab === 'docker' && (
          <div className="space-y-3 text-xs font-mono">
            <div className="text-slate-400">Dockerfile for Self-Hosted School Server:</div>
            <pre className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-cyan-300 overflow-x-auto text-[11px]">
{`# Multi-stage production build
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]`}
            </pre>
            <div className="text-[11px] text-slate-400 font-sans">
              Build and run locally: <code className="text-cyan-400">docker build -t aquashield . &amp;&amp; docker run -p 8080:80 aquashield</code>
            </div>
          </div>
        )}

        {/* Tab 4: IoT */}
        {activeTab === 'iot' && (
          <div className="space-y-3 text-xs font-mono">
            <div className="text-slate-400">Connecting Real-world ESP32 Telemetry:</div>
            <p className="text-slate-300 leading-relaxed font-sans text-xs">
              For schools connecting real physical ESP32 or LoRa sensors, the node transmits a lightweight JSON payload over Wi-Fi or HTTP gateway:
            </p>
            <pre className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-cyan-300 overflow-x-auto text-[11px]">
{`POST /api/telemetry HTTP/1.1
Host: your-school-domain.org
Content-Type: application/json

{
  "nodeId": "node-01",
  "waterLevel": 2.14,
  "rainfall": 25.0,
  "battery": 94,
  "timestamp": 1776550800
}`}
            </pre>
            <div className="text-[11px] text-slate-400 font-sans">
              The built-in AquaShield engine recalculates risk classifications and updates the GIS contour ring in real time upon packet reception.
            </div>
          </div>
        )}

        <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
          <div className="text-[11px] text-slate-500 font-mono">
            No API keys required · Leaflet &amp; Esri World Imagery
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs font-mono transition-colors cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
