"""
Adversarial Scenario Generator Agent
Second agent - stress-tests decisions with failure scenarios
"""
import json
from app.services.gemini import get_gemini_service
from app.schemas.models import DecisionDecomposition, ScenarioAnalysis


SCENARIO_INSTRUCTION = """You are the Adversarial Scenario Generator agent in a multi-agent decision system.

INPUT:
You receive structured JSON output from the Decision Decomposer agent, including:
- Strategic claims
- Assumptions (explicit and implicit)
- KPIs
- Constraints and dependencies

TASK:
Stress-test the decision by generating adversarial scenarios that could cause failure.

For each scenario:
- Describe the failure mode clearly
- Identify which assumptions it breaks
- Map impact to specific KPIs
- Assign severity (LOW | HIGH | CRITICAL)
- Provide early warning signals that can be observed in real life

RULES:
- Do NOT repeat decomposition
- Do NOT give advice
- Do NOT generate conclusions
- Operate pessimistically
- Return structured JSON ONLY

OUTPUT FORMAT:
{
  "scenarios": [
    {
      "id": "S1",
      "severity": "HIGH",
      "description": "...",
      "triggered_by": ["assumption_id"],
      "impacted_kpis": ["KPI name"],
      "early_warning_signals": ["signal 1", "signal 2"]
    }
  ]
}"""


def run_adversarial(decomposition: DecisionDecomposition) -> ScenarioAnalysis:
    """
    Run the Adversarial Scenario Generator agent
    
    Args:
        decomposition: Output from the Decision Decomposer agent
        
    Returns:
        ScenarioAnalysis with adversarial scenarios
    """
    gemini = get_gemini_service()
    
    user_prompt = f"""
====================
INPUT FROM AGENT 1 (DECISION DECOMPOSER)
====================
{json.dumps(decomposition.model_dump(), indent=2)}
"""
    
    result = gemini.generate_json(
        system_instruction=SCENARIO_INSTRUCTION,
        user_prompt=user_prompt,
        temperature=0.4  # Higher temperature for creative scenarios
    )
    
    return ScenarioAnalysis(**result)
