"""
Experiment Planner Agent
Third agent - converts high-risk scenarios into actionable experiments
"""
import json
from app.services.gemini import get_gemini_service
from app.schemas.models import DecisionDecomposition, ScenarioAnalysis, ExperimentPlan


EXPERIMENT_INSTRUCTION = """You are a Gemini 3 Marathon Agent acting as an Experiment Planner inside a multi-agent decision orchestration system called "Decision Autopilot".

Your responsibility is to convert high-risk adversarial scenarios into concrete, real-world experiments that reduce uncertainty before irreversible commitments are made.

You will be provided:
- A structured decision decomposition
- A list of adversarial scenarios with:
  - Severity level
  - Triggering assumptions
  - Impacted KPIs
  - Early warning signals

Your task is to design actionable experiments that test the most dangerous assumptions first.

### Core Principles
- Favor fast, low-cost, reversible experiments
- Focus on falsification, not validation
- Prioritize scenarios with HIGH or CRITICAL severity
- Avoid theoretical analysis or long explanations
- Do NOT restate the decision or risks

### For each selected adversarial scenario:
You MUST produce:
1. Experiment objective (what uncertainty is being tested)
2. Experiment design (exact action to take)
3. Duration (days or weeks)
4. Required resources (time, money, tools)
5. Success criteria (quantitative, measurable)
6. Failure signals (clear kill conditions)
7. Decision rule (what action to take if the experiment fails)

### Constraints
- Experiments must be executable by a single individual or small team
- No experiment should exceed 30 days
- Experiments should not require full product completion unless unavoidable
- Prefer real-world signals over simulated metrics

### Output Format
Return ONLY valid JSON.
Do NOT include explanations, markdown, or commentary.

The JSON schema must be:

{
  "experiments": [
    {
      "scenario_id": "string",
      "severity": "HIGH | CRITICAL",
      "objective": "string",
      "experiment_design": "string",
      "duration": "string",
      "required_resources": {
        "time_commitment": "string",
        "budget": "string",
        "tools": ["string"]
      },
      "success_criteria": ["string"],
      "failure_signals": ["string"],
      "decision_rule": "string"
    }
  ],
  "overall_guidance": {
    "experiment_ordering_rationale": "string",
    "recommended_starting_point": "string"
  }
}"""


def run_experiment_planner(
    decomposition: DecisionDecomposition,
    scenarios: ScenarioAnalysis
) -> ExperimentPlan:
    """
    Run the Experiment Planner agent
    
    Args:
        decomposition: Output from the Decision Decomposer agent
        scenarios: Output from the Adversarial Scenario Generator agent
        
    Returns:
        ExperimentPlan with actionable experiments
    """
    gemini = get_gemini_service()
    
    user_prompt = f"""
====================
INPUT FROM AGENT 1 (DECISION DECOMPOSER)
====================
{json.dumps(decomposition.model_dump(), indent=2)}

====================
INPUT FROM AGENT 2 (ADVERSARIAL SCENARIO GENERATOR)
====================
{json.dumps(scenarios.model_dump(), indent=2)}
"""
    
    result = gemini.generate_json(
        system_instruction=EXPERIMENT_INSTRUCTION,
        user_prompt=user_prompt,
        temperature=0.3
    )
    
    return ExperimentPlan(**result)
