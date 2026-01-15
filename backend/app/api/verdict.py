"""
Verdict API Routes
Endpoints for confidence synthesis and stakeholder simulation
"""
from fastapi import APIRouter, HTTPException

from app.schemas.models import (
    SynthesizeRequest,
    SynthesizerAnalysis,
    StakeholderRequest,
    StakeholderAnalysis
)
from app.agents.confidence import run_confidence_synthesizer
from app.agents.stakeholder import run_stakeholder_simulator

router = APIRouter()


@router.post("/synthesize", response_model=SynthesizerAnalysis)
async def synthesize_confidence(request: SynthesizeRequest):
    """
    Synthesize a confidence verdict from all previous agent outputs
    
    This runs the Confidence Synthesizer agent
    """
    try:
        result = run_confidence_synthesizer(
            request.decomposition,
            request.scenarios,
            request.experiments
        )
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/stakeholders", response_model=StakeholderAnalysis)
async def simulate_stakeholders(request: StakeholderRequest):
    """
    Simulate stakeholder reactions to the decision
    
    This runs the Stakeholder Simulator agent
    """
    try:
        result = run_stakeholder_simulator(
            request.decomposition,
            request.synthesis
        )
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
