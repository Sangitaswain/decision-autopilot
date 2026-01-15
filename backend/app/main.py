"""
Decision Autopilot - FastAPI Backend
Multi-agent decision orchestration system
"""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

from app.api import decision, adversarial, experiments, verdict

load_dotenv()

app = FastAPI(
    title="Decision Autopilot API",
    description="Multi-agent decision orchestration system",
    version="1.0.0"
)

# CORS middleware for frontend connection
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register API routers
app.include_router(decision.router, prefix="/api/decision", tags=["Decision"])
app.include_router(adversarial.router, prefix="/api/adversarial", tags=["Adversarial"])
app.include_router(experiments.router, prefix="/api/experiments", tags=["Experiments"])
app.include_router(verdict.router, prefix="/api/verdict", tags=["Verdict"])


@app.get("/")
async def root():
    return {
        "name": "Decision Autopilot API",
        "version": "1.0.0",
        "agents": [
            "decomposer",
            "adversarial",
            "experiment_planner",
            "confidence",
            "stakeholder"
        ]
    }


@app.get("/health")
async def health_check():
    return {"status": "healthy"}
