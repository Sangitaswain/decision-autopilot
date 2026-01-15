"""
Agent Orchestrator
Chains agents together in the decision analysis pipeline
"""
from app.agents.decomposer import run_decomposer
from app.agents.adversarial import run_adversarial
from app.agents.experiment_planner import run_experiment_planner
from app.agents.confidence import run_confidence_synthesizer
from app.agents.stakeholder import run_stakeholder_simulator
from app.schemas.models import FullAnalysisResponse


def run_full_analysis(decision: str, context: str = "") -> FullAnalysisResponse:
    """
    Run the complete multi-agent analysis pipeline
    
    Pipeline:
    1. Decomposer: Extract structured components from the decision
    2. Adversarial: Generate failure scenarios  
    3. Experiments: Design tests for risky assumptions
    4. Confidence: Produce PROCEED/DELAY/ABORT verdict
    5. Stakeholder: Predict organizational reactions
    
    Args:
        decision: The decision statement to analyze
        context: Optional supporting context
        
    Returns:
        FullAnalysisResponse with all agent outputs
    """
    # Agent 1: Decompose the decision
    decomposition = run_decomposer(decision, context)
    
    # Agent 2: Generate adversarial scenarios
    scenarios = run_adversarial(decomposition)
    
    # Agent 3: Plan experiments
    experiments = run_experiment_planner(decomposition, scenarios)
    
    # Agent 4: Synthesize confidence verdict
    synthesis = run_confidence_synthesizer(decomposition, scenarios, experiments)
    
    # Agent 5: Simulate stakeholder reactions
    stakeholders = run_stakeholder_simulator(decomposition, synthesis)
    
    return FullAnalysisResponse(
        decomposition=decomposition,
        scenarios=scenarios,
        experiments=experiments,
        synthesis=synthesis,
        stakeholders=stakeholders
    )
