"""
Decision API Routes
Endpoints for decision decomposition
"""
from fastapi import APIRouter, HTTPException

from app.schemas.models import DecomposeRequest, DecisionDecomposition
from app.agents.decomposer import run_decomposer
from app.orchestrator import run_full_analysis

router = APIRouter()


@router.post("/decompose", response_model=DecisionDecomposition)
async def decompose_decision(request: DecomposeRequest):
    """
    Decompose a decision into structured components
    
    This runs only the first agent (Decision Decomposer)
    """
    try:
        result = run_decomposer(request.decision, request.context)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/analyze")
async def full_analysis(request: DecomposeRequest):
    """
    Run the complete multi-agent analysis pipeline
    
    This chains all 5 agents together:
    1. Decomposer → 2. Adversarial → 3. Experiments → 4. Confidence → 5. Stakeholder
    """
    try:
        result = run_full_analysis(request.decision, request.context)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
