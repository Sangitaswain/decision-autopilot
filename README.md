<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>


# Decision Autopilot 🚀

Decision Autopilot is an autonomous decision-simulation system that helps users reason through high-stakes decisions by exposing assumptions, stress-testing scenarios, and generating verified action plans.

It uses **Gemini 3 via Google AI Studio** as a multi-step reasoning engine rather than a conversational chatbot.

---

## 🧠 What It Does

1. Accepts a complex decision (career, startup, product, etc.)
2. Decomposes the decision into claims, KPIs, and assumptions
3. Generates adversarial scenarios that could cause failure
4. Runs lightweight simulations to estimate possible outcomes
5. Produces prioritized experiments and execution runbooks
6. Re-evaluates confidence after experiment results (verification loop)

---

## 🛠 Tech Stack

### Frontend
- React (Vite)
- Tailwind CSS

### Backend
- Python + FastAPI
- NumPy (Monte Carlo simulation)

### AI Layer
- Google Gemini 3
- Google AI Studio (Build tab)
- Marathon Agents
- Thinking Levels
- Thought Signatures

### Data & Storage
- Supabase (Postgres + Storage)

### Integrations
- Google Sheets API (experiment export)

---

## ⚠️ Disclaimer

Decision Autopilot does **not** provide professional, medical, legal, or financial advice.  
It is a reasoning and simulation tool designed to explore assumptions and consequences.

---

## ▶️ Running Locally (Demo Mode)

### Backend
```bash
cd backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/1CnLpK1rthZ693rJ5UP4LwD2tGYe-B__g

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`
