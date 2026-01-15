"""
Adversarial API Routes
Endpoints for adversarial scenario generation
"""
from fastapi import APIRouter, HTTPException

from app.schemas.models import ScenarioRequest, ScenarioAnalysis
from app.agents.adversarial import run_adversarial

router = APIRouter()


@router.post("/generate", response_model=ScenarioAnalysis)
async def generate_scenarios(request: ScenarioRequest):
    """
    Generate adversarial scenarios from a decision decomposition
    
    This runs the Adversarial Scenario Generator agent
    """
    try:
        result = run_adversarial(request.decomposition)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
