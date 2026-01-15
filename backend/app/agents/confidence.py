"""
Confidence Synthesizer Agent
Fourth agent - produces the final PROCEED/DELAY/ABORT verdict
"""
import json
from app.services.gemini import get_gemini_service
from app.schemas.models import (
    DecisionDecomposition,
    ScenarioAnalysis,
    ExperimentPlan,
    SynthesizerAnalysis
)


SYNTHESIZER_INSTRUCTION = """You are a Gemini 3 Marathon Agent acting as the Confidence Synthesizer in a multi-agent decision orchestration system called "Decision Autopilot".

Your responsibility is to synthesize outputs from previous agents and determine whether the decision should be:
- PROCEED
- DELAY
- ABORT

You will be provided with:
- A structured decision decomposition
- A list of adversarial scenarios with severity and early warning signals
- A set of proposed experiments with success and failure criteria

You must evaluate:
- Remaining unresolved assumptions
- Severity-weighted downside risk
- Reversibility of the decision
- Whether proposed experiments sufficiently reduce uncertainty

### Decision Logic
Use the following principles:
- Prefer DELAY over PROCEED if high-severity risks remain untested
- Recommend ABORT if failure scenarios include irreversible harm with high likelihood
- Recommend PROCEED only if the majority of critical assumptions are testable or already validated
- Penalize decisions with asymmetric downside (large loss, small upside)

### Required Outputs
You MUST produce:
1. Final decision verdict
2. Confidence score (0–100)
3. Top unresolved risks (max 3)
4. Preconditions required before proceeding (if any)
5. Clear rationale explaining the verdict in plain language
6. Suggested next action (execute experiments, proceed, or abandon)

### Constraints
- Do NOT restate all risks or experiments
- Do NOT hedge excessively
- Be decisive and explicit
- Avoid motivational or emotional language

### Output Format
Return ONLY valid JSON.
Do NOT include explanations, markdown, or commentary.

The JSON schema must be:

{
  "final_verdict": "PROCEED | DELAY | ABORT",
  "confidence_score": number,
  "top_unresolved_risks": ["string"],
  "required_preconditions": ["string"],
  "rationale": "string",
  "suggested_next_action": "string"
}"""


def run_confidence_synthesizer(
    decomposition: DecisionDecomposition,
    scenarios: ScenarioAnalysis,
    experiments: ExperimentPlan
) -> SynthesizerAnalysis:
    """
    Run the Confidence Synthesizer agent
    
    Args:
        decomposition: Output from the Decision Decomposer agent
        scenarios: Output from the Adversarial Scenario Generator agent
        experiments: Output from the Experiment Planner agent
        
    Returns:
        SynthesizerAnalysis with final verdict
    """
    gemini = get_gemini_service()
    
    user_prompt = f"""
====================
INPUT FROM AGENT 1 (DECOMPOSER)
====================
{json.dumps(decomposition.model_dump(), indent=2)}

====================
INPUT FROM AGENT 2 (ADVERSARIAL)
====================
{json.dumps(scenarios.model_dump(), indent=2)}

====================
INPUT FROM AGENT 3 (EXPERIMENT PLANNER)
====================
{json.dumps(experiments.model_dump(), indent=2)}
"""
    
    result = gemini.generate_json(
        system_instruction=SYNTHESIZER_INSTRUCTION,
        user_prompt=user_prompt,
        temperature=0.1  # Very low temperature for decisive verdict
    )
    
    return SynthesizerAnalysis(**result)
