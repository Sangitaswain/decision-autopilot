"""
Stakeholder Simulator Agent
Fifth agent - predicts organizational reactions to the decision
"""
import json
from app.services.gemini import get_gemini_service
from app.schemas.models import (
    DecisionDecomposition,
    SynthesizerAnalysis,
    StakeholderAnalysis
)


STAKEHOLDER_INSTRUCTION = """You are a Gemini 3 Marathon Agent acting as the "Stakeholder Simulator" in the "Decision Autopilot" system.

Your role is to predict the political and organizational reaction to a decision by simulating the perspectives of key corporate archetypes (CEO, CFO, CTO, Product Lead, Legal).

You will be provided with the decision decomposition and the final confidence verdict.

### Task
1. Adopt the persona of 4 distinct, relevant stakeholders based on the context of the decision.
2. Predict their sentiment (SUPPORTIVE, SKEPTICAL, OPPOSED, NEUTRAL).
3. Generate a realistic "hot take" quote they might say in a private meeting.
4. Estimate their alignment score (0-100).
5. Predict the overall consensus and friction points.

### Constraints
- Be realistic about corporate politics.
- The CFO should care about cost/risk.
- The CTO should care about technical debt/feasibility.
- The CEO should care about vision/growth.
- Return ONLY valid JSON.

### Output Format
{
  "stakeholders": [
    {
      "role": "string",
      "sentiment": "SUPPORTIVE | SKEPTICAL | OPPOSED | NEUTRAL",
      "key_concern_or_motivation": "string",
      "simulated_quote": "string",
      "alignment_score": number
    }
  ],
  "consensus_prediction": "string",
  "political_friction_points": ["string"]
}"""


def run_stakeholder_simulator(
    decomposition: DecisionDecomposition,
    synthesis: SynthesizerAnalysis
) -> StakeholderAnalysis:
    """
    Run the Stakeholder Simulator agent
    
    Args:
        decomposition: Output from the Decision Decomposer agent
        synthesis: Output from the Confidence Synthesizer agent
        
    Returns:
        StakeholderAnalysis with predicted reactions
    """
    gemini = get_gemini_service()
    
    user_prompt = f"""
====================
DECISION INPUT
====================
{json.dumps(decomposition.model_dump(), indent=2)}

====================
CONFIDENCE VERDICT
====================
{json.dumps(synthesis.model_dump(), indent=2)}
"""
    
    result = gemini.generate_json(
        system_instruction=STAKEHOLDER_INSTRUCTION,
        user_prompt=user_prompt,
        temperature=0.5  # Slightly higher for personality
    )
    
    return StakeholderAnalysis(**result)
