"""
Experiments API Routes
Endpoints for experiment planning
"""
from fastapi import APIRouter, HTTPException

from app.schemas.models import ExperimentRequest, ExperimentPlan
from app.agents.experiment_planner import run_experiment_planner

router = APIRouter()


@router.post("/plan", response_model=ExperimentPlan)
async def plan_experiments(request: ExperimentRequest):
    """
    Generate experiment plans from decomposition and scenarios
    
    This runs the Experiment Planner agent
    """
    try:
        result = run_experiment_planner(request.decomposition, request.scenarios)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
