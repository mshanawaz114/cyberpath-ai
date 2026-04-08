# 🛡️ CyberPath AI

> **AI-powered cybersecurity career roadmap generator — built for Fort Worth's cyber workforce development initiative.**

[![HackFW 2026](https://img.shields.io/badge/HackFW-2026-blue)](https://fwtx.devpost.com)
[![React](https://img.shields.io/badge/React-TypeScript-61dafb)](https://reactjs.org)
[![Python](https://img.shields.io/badge/Python-Flask-green)](https://flask.palletsprojects.com)
[![Groq](https://img.shields.io/badge/Groq-LLaMA3.3-orange)](https://groq.com)

---

## 🎯 What is CyberPath AI?

CyberPath AI bridges the gap between where people are and where they need to be to land a cybersecurity job in Fort Worth, Texas. Users answer a 3-step skills assessment and receive a fully personalized, AI-generated career roadmap — including learning phases, certifications, and Fort Worth-specific local resources.

**The problem:** Fort Worth needs more cybersecurity talent, but most people don't know where to start.  
**The solution:** A 3-minute assessment that produces a clear, actionable, personalized path to a cyber career.

---

## ✨ Features

- **3-Step Skills Assessment** — Experience level, current skills, and target role
- **AI-Generated Roadmap** — Powered by Groq LLaMA 3.3 70B with structured JSON output
- **Readiness Score** — Visual indicator showing how close you are to job-ready
- **Phase-by-Phase Learning Plan** — Broken into digestible phases with free and paid resources
- **Certification Roadmap** — Ranked by priority with cost estimates
- **Fort Worth Local Resources** — TCC, UTA, local employers, DA cyber initiatives
- **Quick Wins** — Immediate actions you can start today

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React + TypeScript |
| Backend | Python + Flask |
| AI | Groq API (LLaMA 3.3 70B) |
| Data Analysis | NumPy + Pandas |
| API | REST (Flask-CORS) |
| Styling | Custom CSS (dark theme) |

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- Python 3.9+
- Groq API key (free at [console.groq.com](https://console.groq.com))

### 1. Clone the repo
```bash
git clone https://github.com/mshanawaz114/cyberpath-ai.git
cd cyberpath-ai
```

### 2. Set up the backend
```bash
cd backend
python3 -m venv venv
source venv/bin/activate        # Windows: venv\Scripts\activate
pip install -r requirements.txt

# Add your Groq API key
cp .env.example .env
# Edit .env and add: GROQ_API_KEY=your_key_here

python app.py
```
Backend runs on `http://localhost:8080`

### 3. Set up the frontend
```bash
cd frontend
npm install
npm start
```
Frontend runs on `http://localhost:3000`

---

## 📸 How It Works

1. **Step 1** — Select your experience level and share your background
2. **Step 2** — Choose the skills you already have
3. **Step 3** — Pick your target cybersecurity role
4. **Roadmap** — Get your personalized AI-generated career plan instantly

---

## 📁 Project Structure

---

## 🔑 Environment Variables

Create a `.env` file in the `backend/` directory:
Get your free Groq API key at [console.groq.com](https://console.groq.com)

---

## 🏆 Hackathon

Built for **HackFW 2026** — Fort Worth DA: Fostering Cyber Workforce Development  
Theme: Convergent Technology · Track: Machine Learning / AI

---

## 👤 Team

- **Shahnawaz Mohammed** — [@mshanawaztech](https://devpost.com/mshanawaztech)

---

## 📄 License

MIT License
