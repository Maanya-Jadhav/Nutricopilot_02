# 🥗 NutriCoPilot – AI Food Label Reasoning Engine

NutriCoPilot is an AI-native web application that transforms complex food ingredient labels into meaningful health insights.  
Unlike traditional OCR tools, NutriCoPilot acts as a **decision-support system**, analyzing ingredient synergy, inferring user intent, and highlighting real health trade-offs in real time.

**Link**-https://nutricopilot-112180359347.us-west1.run.app/

---

## 🚀 Features

- 📸 **Multimodal Analysis** – Accepts both food label images and raw ingredient text.
- 🧠 **Reasoning Engine** – Goes beyond extraction to explain *why* ingredients matter together.
- 🎯 **Intent Detection** – Infers whether the user is a weight-loss seeker, parent, fitness enthusiast, etc.
- 📊 **Health Score Dashboard** – Visual radial gauge with verdicts like *Excellent*, *Good*, or *Avoid*.
- 🪟 **AI-Native UI** – Glassmorphism, bento-grid layouts, and psychologically optimized loading states.
- 🧩 **Schema-Enforced AI Output** – Predictable JSON responses with zero frontend breakage.

---

## 🏗️ Tech Stack

### Frontend
- React 19 (ES Modules)
- TypeScript (Strict typing)
- Tailwind CSS
- Recharts
- No-bundler setup using `esm.sh`

### AI Engine
- Google Gemini API – `gemini-flash-latest`
- Multimodal reasoning (Image + Text)
- Controlled JSON generation with schema validation

---

## 🧠 Architecture Overview


---

## 🔍 How It Works

1. User uploads a food label image or pastes ingredients.
2. The app encodes the input and sends it to Gemini.
3. Gemini performs OCR + reasoning in a single pass.
4. Output is validated against a strict TypeScript schema.
5. Results are visualized in a bento-style dashboard.

---

## 📂 Project Structure


---

## 🛣️ Roadmap

- 📱 Progressive Web App (Offline Camera Access)
- 👤 Personalized Health Profiles (Diabetic, Fitness, Kids)
- 🗂️ Scan History & Local Caching
- 🌐 API layer for mobile integration

---

## ⚙️ Setup

```bash
git clone https://github.com/your-username/nutricopilot.git
cd nutricopilot
npm install
npm run dev
VITE_GEMINI_API_KEY=your_api_key_here

