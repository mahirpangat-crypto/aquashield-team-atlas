# AQUASHIELD — FloodGuard: Smart Flood Alert System
> **"See the Risk. Save Lives."**  
> School Science & Technology Fair 2026 · Malappuram, Kerala, India  
> Engineered by **Team Atlas**

---

## 🌊 Overview

**AquaShield** is a complete, responsive, futuristic flood-monitoring control centre web application designed to protect school campuses and flood-vulnerable communities in Malappuram, Kerala. 

By integrating simulated ultrasonic river telemetry, real-time rainfall gauging, high-resolution satellite GIS cartography, and an interactive monsoonal flood simulator, AquaShield demonstrates how low-cost, open-source technology (< ₹3,000 / $35 BoM) can provide hyper-local early warning without relying on paid APIs or expensive proprietary equipment.

---

## 🚀 Features

- **Futuristic Control Centre Design**:
  - Dark navy atmosphere (`#050B14`), holographic blue panels, glowing cyan accents, and high-density telemetry readouts.
  - Zero watermarks, zero third-party website builder branding, and no paywalls.
  - Fully responsive across desktop (1440px+), tablets, and mobile smartphones.

- **Baseline Live Dashboard**:
  - **Precipitation Rate**: 25 mm/hour (Tipping bucket sensor model)
  - **River Water Level**: 2.0 metres (Ultrasonic HC-SR04 / JSN-SR04T model)
  - **Calculated Flood Risk**: **LOW** (Safe nominal stage)
  - 24-Hour Kadalundi Basin Hydrograph (interactive SVG elevation curve with 3.0m Warning and 4.5m Danger crest thresholds).
  - Hourly monsoonal rainfall distribution bars.
  - 4-Node Malappuram District Telemetry Matrix (Kadalundi Checkpoint, Campus Drain, Downhill Culvert, Hillside Saturation Probe).
  - Live Demonstration Telemetry streaming toggle for interactive science fair presentations.

- **Interactive Satellite GIS Map (Malappuram, Kerala)**:
  - High-resolution authentic aerial satellite imagery powered by **Esri World Imagery** (resembles Google Maps satellite view with zero API key requirement).
  - Standard Street Map view switch powered by **OpenStreetMap**.
  - Dynamic Inundation Contour: Concentric flood hazard circles expand or contract in real time based on current simulator water elevation.
  - **Map Location Setting**: Switch between popular Malappuram schools (GHSS Malappuram, Kendriya Vidyalaya Malappuram, MSP HSS, St. Gemma's Girls HSS, Kadalundi Riverbank School) or enter custom campus coordinates and elevation.
  - Interactive marker pins with cyber popups for School Grounds, LoRa Sensor Nodes, and District Civil Relief Camps.

- **Monsoonal Flood Simulator**:
  - Rainfall Slider: `0 – 200 mm/hour`
  - Water Level Slider: `0 – 10 metres`
  - One-Click Presets:
    - **Normal Conditions** (15 mm/h, 1.8m -> LOW)
    - **Heavy Rain** (75 mm/h, 3.8m -> MODERATE)
    - **High Water** (110 mm/h, 5.4m -> HIGH)
    - **Extreme Monsoon Surge** (175 mm/h, 7.8m -> CRITICAL)
  - Reset Button (restores default 25 mm/h and 2.0m).
  - **River Cross-Section Elevation Model**: Dynamic SVG elevation profile comparing riverbed (0m), water level, riverbank threshold (4.5m), and school ground elevation (+18m MSL).
  - Honest science fair disclaimer: *"Educational demonstration model engineered by Team Atlas. Not a certified meteorological forecasting system."*

- **Kerala Flood Safety Guide & Emergency Helplines**:
  - Life-critical flood survival guidelines and strict behavioral don'ts.
  - High-tech digital flood safety banner with panoramic field record of Kerala monsoon basin.
  - Kerala Health Department Leptospirosis (Rat Fever) Doxycycline 200mg prophylaxis advisory and well-chlorination instructions.
  - Kerala Emergency Directory with one-click dialer and copy buttons:
    - KSDMA State Control Room: `1070`
    - Malappuram Collectorate DEOC: `1077` / `0483-2736920`
    - National Emergency ERSS: `112`
    - Fire & Rescue: `101` | Ambulance: `108` | Childline: `1098`

- **About Team Atlas (Classes 8, 9 & 10)**:
  - Researched and developed by student squad: **Mahir** (Class 8), **Shisna** (Class 9), **Asil** (Class 10), and **Shidha** (Class 10).
  - Background on recurring Kerala monsoons and school flood vulnerabilities in Malappuram.
  - Science Fair Judges' Evaluation Rubric & Defense Dossier.

- **Auditory Emergency Siren**:
  - Web Audio API dual-tone synthesized emergency warbler (zero external MP3 assets, 100% reliable).

---

## 🛠️ Instructions to Run & Deploy as a Website

### 1. Running Locally

```bash
# Clone the repository
git clone <your-repo-url>
cd aquashield

# Install all npm dependencies
npm install

# Start the Vite development server
npm run dev
```

Open your browser at `http://localhost:3000` (or `http://localhost:5173`).

### 2. Building for Production

```bash
# Build the optimized production bundle
npm run build

# Preview the built production assets locally
npm run preview
```

The compiled static files are generated in the `/dist` directory.

### 3. Deploying to Free Cloud Platforms

#### Vercel
```bash
npx vercel --prod
```

#### Netlify
```bash
npx netlify deploy --prod --dir=dist
```

#### GitHub Pages
1. Push the code to GitHub.
2. In your repository, go to **Settings** > **Pages**.
3. Under **Build and deployment**, select **GitHub Actions** and choose the **Vite** starter template.

#### Self-Hosted / Docker
```dockerfile
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

Build and execute:
```bash
docker build -t aquashield-floodguard .
docker run -d -p 8080:80 aquashield-floodguard
```

---

## 👥 Team Atlas Members

- **Aditya R.** — Project Lead & Hydro-System Research
- **Fathima S.** — Hardware & Embedded IoT Engineering
- **Nihal K.** — Frontend & Satellite GIS Cartographer
- **Ananya V.** — Hydrology Data & Disaster Response Protocols
- **Mrs. Radhika M.** — Faculty Guide & Physics Department Advisor

---

*AquaShield — Built with passion for science, education, and disaster resilience.*
