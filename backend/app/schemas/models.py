"""
Pydantic models for Decision Autopilot
These schemas define the data structures exchanged between agents
"""
from pydantic import BaseModel, Field
from typing import List, Optional
from enum import Enum


# ============== Enums ==============

class ImpactLevel(str, Enum):
    LOW = "low"
    MEDIUM = "medium"
    HIGH = "high"


class UncertaintyLevel(str, Enum):
    LOW = "low"
    MEDIUM = "medium"
    HIGH = "high"


class AssumptionType(str, Enum):
    EXPLICIT = "explicit"
    IMPLICIT = "implicit"


class Severity(str, Enum):
    LOW = "LOW"
    HIGH = "HIGH"
    CRITICAL = "CRITICAL"


class Verdict(str, Enum):
    PROCEED = "PROCEED"
    DELAY = "DELAY"
    ABORT = "ABORT"


class Sentiment(str, Enum):
    SUPPORTIVE = "SUPPORTIVE"
    SKEPTICAL = "SKEPTICAL"
    OPPOSED = "OPPOSED"
    NEUTRAL = "NEUTRAL"


# ============== Decision Decomposer Models ==============

class KPI(BaseModel):
    name: str
    baseline: Optional[str] = None
    target: Optional[str] = None
    time_horizon: Optional[str] = None


class Assumption(BaseModel):
    text: str
    type: AssumptionType
    impact_level: ImpactLevel
    uncertainty_level: UncertaintyLevel


class DecisionDecomposition(BaseModel):
    """Output from the Decision Decomposer agent"""
    decision_summary: str
    claims: List[str]
    kpis: List[KPI]
    assumptions: List[Assumption]
    dependencies: List[str]
    risks: List[str]
    evidence: List[str]
    thought_signature: List[str]


class DecomposeRequest(BaseModel):
    """Request to decompose a decision"""
    decision: str = Field(..., description="The decision statement to analyze")
    context: str = Field(default="", description="Optional supporting context")


# ============== Adversarial Scenario Models ==============

class AdversarialScenario(BaseModel):
    id: str
    severity: Severity
    description: str
    triggered_by: List[str]
    impacted_kpis: List[str]
    early_warning_signals: List[str]


class ScenarioAnalysis(BaseModel):
    """Output from the Adversarial Scenario Generator agent"""
    scenarios: List[AdversarialScenario]
    thought_signature: Optional[List[str]] = None


class ScenarioRequest(BaseModel):
    """Request to generate adversarial scenarios"""
    decomposition: DecisionDecomposition


# ============== Experiment Planner Models ==============

class ExperimentResources(BaseModel):
    time_commitment: str
    budget: str
    tools: List[str]


class Experiment(BaseModel):
    scenario_id: str
    severity: str  # HIGH or CRITICAL only
    objective: str
    experiment_design: str
    duration: str
    required_resources: ExperimentResources
    success_criteria: List[str]
    failure_signals: List[str]
    decision_rule: str


class ExperimentPlan(BaseModel):
    """Output from the Experiment Planner agent"""
    experiments: List[Experiment]
    overall_guidance: dict


class ExperimentRequest(BaseModel):
    """Request to generate experiments"""
    decomposition: DecisionDecomposition
    scenarios: ScenarioAnalysis


# ============== Confidence Synthesizer Models ==============

class SynthesizerAnalysis(BaseModel):
    """Output from the Confidence Synthesizer agent"""
    final_verdict: Verdict
    confidence_score: int = Field(..., ge=0, le=100)
    top_unresolved_risks: List[str]
    required_preconditions: List[str]
    rationale: str
    suggested_next_action: str


class SynthesizeRequest(BaseModel):
    """Request to synthesize confidence verdict"""
    decomposition: DecisionDecomposition
    scenarios: ScenarioAnalysis
    experiments: ExperimentPlan


# ============== Stakeholder Simulator Models ==============

class StakeholderReaction(BaseModel):
    role: str
    sentiment: Sentiment
    key_concern_or_motivation: str
    simulated_quote: str
    alignment_score: int = Field(..., ge=0, le=100)


class StakeholderAnalysis(BaseModel):
    """Output from the Stakeholder Simulator agent"""
    stakeholders: List[StakeholderReaction]
    consensus_prediction: str
    political_friction_points: List[str]


class StakeholderRequest(BaseModel):
    """Request to simulate stakeholder reactions"""
    decomposition: DecisionDecomposition
    synthesis: SynthesizerAnalysis


# ============== Orchestrator Models ==============

class FullAnalysisRequest(BaseModel):
    """Request for complete multi-agent analysis pipeline"""
    decision: str
    context: str = ""


class FullAnalysisResponse(BaseModel):
    """Complete analysis from all agents"""
    decomposition: DecisionDecomposition
    scenarios: ScenarioAnalysis
    experiments: ExperimentPlan
    synthesis: SynthesizerAnalysis
    stakeholders: Optional[StakeholderAnalysis] = None
