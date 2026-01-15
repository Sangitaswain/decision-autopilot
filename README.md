# Decision Autopilot

> A multi-agent decision orchestration system powered by Google Gemini

## 🧠 What is this?

Decision Autopilot helps you analyze high-stakes decisions by running them through a pipeline of 5 specialized AI agents:

1. **Decomposer** - Extracts claims, KPIs, assumptions, and risks
2. **Adversarial** - Generates failure scenarios and warning signals  
3. **Experiment Planner** - Designs experiments to test risky assumptions
4. **Confidence Synthesizer** - Produces PROCEED/DELAY/ABORT verdict
5. **Stakeholder Simulator** - Predicts organizational reactions

## 🏗️ Architecture

```
decision-autopilot/
├── frontend/          # React + TypeScript UI
│   └── src/
│       ├── features/  # Feature-based organization (mirrors agents)
│       ├── components/
│       └── api/
├── backend/           # FastAPI orchestrator
│   └── app/
│       ├── agents/    # 👈 One file per AI agent
│       ├── api/
│       ├── schemas/
│       └── orchestrator.py
├── docs/              # Architecture documentation
└── infra/             # Environment config
```

## 🚀 Quick Start

### Backend
```bash
cd backend
pip install -r requirements.txt

# Set your Gemini API key
echo "GEMINI_API_KEY=your_key_here" > .env

# Run the server
uvicorn app.main:app --reload
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

## 📚 Documentation

- [Architecture Overview](docs/architecture.md)
- [Agent Flow](docs/agent-flow.md)

## 🔑 Environment Variables

Copy `infra/env.example` to `.env` and configure:

| Variable | Description |
|----------|-------------|
| `GEMINI_API_KEY` | Your Google Gemini API key |
| `VITE_API_BASE_URL` | Backend URL (default: http://localhost:8000) |

## 📄 License

MIT
