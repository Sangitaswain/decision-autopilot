import { GoogleGenAI, Type, Schema } from "@google/genai";
import { DecisionAnalysis, ScenarioAnalysis, ExperimentPlan, SynthesizerAnalysis, StakeholderAnalysis } from "../types";

const DECOMPOSER_INSTRUCTION = `You are a Gemini 3 Marathon Agent named "Decision Decomposer".

Your role is to act as the first reasoning component in an autonomous decision orchestration system called "Decision Autopilot".

Your task is to take a high-stakes human decision and optional supporting context (notes, documents, or extracted text) and decompose it into structured components that downstream agents can reason over.

This is NOT a conversational assistant.
This is NOT a chatbot.
You must reason step-by-step internally and return a strict machine-readable output.

====================
INPUT
====================
You will receive:
1. A decision statement written in natural language.
2. Optional context text (may be empty or partial).

====================
OUTPUT REQUIREMENTS
====================
You MUST return ONLY valid, raw JSON.
Do NOT include:
- Headings
- Bullet points
- Tables
- Explanations
- Markdown
- UI-friendly formatting
- Labels or titles

If you output anything other than pure JSON, the response will be rejected.

Your output must be directly parseable by a backend system using JSON.parse().

OUTPUT FORMAT (STRICT):

You MUST output a single JSON object and nothing else.

The response MUST start with '{' and end with '}'.

No text is allowed before or after the JSON.

If a field has no data, return an empty array or null.

DO NOT summarize your output in natural language.

The JSON schema MUST follow this exact structure:

{
  "decision_summary": "<one sentence neutral restatement of the decision>",
  "claims": [
    "<key factual or strategic claim made by the decision>",
    "<another claim>"
  ],
  "kpis": [
    {
      "name": "<metric name>",
      "baseline": "<current value or null if unknown>",
      "target": "<desired value or null if unknown>",
      "time_horizon": "<time period if mentioned>"
    }
  ],
  "assumptions": [
    {
      "text": "<assumption statement>",
      "type": "explicit | implicit",
      "impact_level": "low | medium | high",
      "uncertainty_level": "low | medium | high"
    }
  ],
  "dependencies": [
    "<resource, capability, constraint, or external dependency>"
  ],
  "risks": [
    "<early identifiable risk inferred from the decision>"
  ],
  "evidence": [
    "<exact quote or sentence taken from the provided context text>"
  ],
  "thought_signature": [
    "Step 1: Interpreted the decision intent",
    "Step 2: Extracted measurable claims and KPIs",
    "Step 3: Identified implicit assumptions and risks"
  ]
}

====================
REASONING RULES
====================
- Use THINKING LEVEL: QUICK to extract claims and KPIs.
- Use THINKING LEVEL: DEEP to surface implicit assumptions and risks.
- If information is missing, do NOT hallucinate numbers. Use null.
- If no context is provided, return an empty evidence array.
- Prioritize assumptions that could materially change the outcome.
- Be neutral and analytical. Do not give advice or recommendations.

====================
PURPOSE
====================
Your output will be consumed by downstream agents responsible for:
- Adversarial scenario generation
- Simulation planning
- Action and experiment design

Therefore, clarity, structure, and completeness are critical.`;

const SCENARIO_INSTRUCTION = `You are the Adversarial Scenario Generator agent in a multi-agent decision system.

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
}`;

const EXPERIMENT_PLANNER_INSTRUCTION = `You are a Gemini 3 Marathon Agent acting as an Experiment Planner inside a multi-agent decision orchestration system called "Decision Autopilot".

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
}`;

const SYNTHESIZER_INSTRUCTION = `You are a Gemini 3 Marathon Agent acting as the Confidence Synthesizer in a multi-agent decision orchestration system called "Decision Autopilot".

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
}`;

const STAKEHOLDER_INSTRUCTION = `You are a Gemini 3 Marathon Agent acting as the "Stakeholder Simulator" in the "Decision Autopilot" system.

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
}`;

const analysisSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    decision_summary: { type: Type.STRING, description: "One sentence neutral restatement of the decision" },
    claims: { 
      type: Type.ARRAY, 
      items: { type: Type.STRING },
      description: "Key factual or strategic claims made by the decision"
    },
    kpis: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          name: { type: Type.STRING },
          baseline: { type: Type.STRING, nullable: true },
          target: { type: Type.STRING, nullable: true },
          time_horizon: { type: Type.STRING, nullable: true }
        }
      },
      description: "Measurable metrics associated with the decision"
    },
    assumptions: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          text: { type: Type.STRING },
          type: { type: Type.STRING, enum: ["explicit", "implicit"] },
          impact_level: { type: Type.STRING, enum: ["low", "medium", "high"] },
          uncertainty_level: { type: Type.STRING, enum: ["low", "medium", "high"] }
        }
      },
      description: "Underlying assumptions, prioritized by impact and uncertainty"
    },
    dependencies: { 
      type: Type.ARRAY, 
      items: { type: Type.STRING },
      description: "Resource, capability, constraint, or external dependencies"
    },
    risks: { 
      type: Type.ARRAY, 
      items: { type: Type.STRING },
      description: "Early identifiable risks inferred from the decision" 
    },
    evidence: { 
      type: Type.ARRAY, 
      items: { type: Type.STRING },
      description: "Exact quotes or sentences taken from the provided context text"
    },
    thought_signature: { 
      type: Type.ARRAY, 
      items: { type: Type.STRING },
      description: "Trace of the internal reasoning steps taken"
    }
  },
  required: ["decision_summary", "claims", "kpis", "assumptions", "dependencies", "risks", "evidence", "thought_signature"]
};

const scenarioSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    scenarios: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          id: { type: Type.STRING },
          severity: { type: Type.STRING, enum: ["LOW", "HIGH", "CRITICAL"] },
          description: { type: Type.STRING },
          triggered_by: { type: Type.ARRAY, items: { type: Type.STRING } },
          impacted_kpis: { type: Type.ARRAY, items: { type: Type.STRING } },
          early_warning_signals: { type: Type.ARRAY, items: { type: Type.STRING } }
        },
        required: ["id", "severity", "description", "triggered_by", "impacted_kpis", "early_warning_signals"]
      }
    },
    thought_signature: { 
      type: Type.ARRAY, 
      items: { type: Type.STRING }
    }
  },
  required: ["scenarios"]
};

const experimentSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    experiments: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          scenario_id: { type: Type.STRING },
          severity: { type: Type.STRING, enum: ["HIGH", "CRITICAL"] },
          objective: { type: Type.STRING },
          experiment_design: { type: Type.STRING },
          duration: { type: Type.STRING },
          required_resources: {
            type: Type.OBJECT,
            properties: {
              time_commitment: { type: Type.STRING },
              budget: { type: Type.STRING },
              tools: { type: Type.ARRAY, items: { type: Type.STRING } }
            },
            required: ["time_commitment", "budget", "tools"]
          },
          success_criteria: { type: Type.ARRAY, items: { type: Type.STRING } },
          failure_signals: { type: Type.ARRAY, items: { type: Type.STRING } },
          decision_rule: { type: Type.STRING }
        },
        required: ["scenario_id", "severity", "objective", "experiment_design", "duration", "required_resources", "success_criteria", "failure_signals", "decision_rule"]
      }
    },
    overall_guidance: {
      type: Type.OBJECT,
      properties: {
        experiment_ordering_rationale: { type: Type.STRING },
        recommended_starting_point: { type: Type.STRING }
      },
      required: ["experiment_ordering_rationale", "recommended_starting_point"]
    }
  },
  required: ["experiments", "overall_guidance"]
};

const synthesizerSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    final_verdict: { type: Type.STRING, enum: ["PROCEED", "DELAY", "ABORT"] },
    confidence_score: { type: Type.NUMBER },
    top_unresolved_risks: { type: Type.ARRAY, items: { type: Type.STRING } },
    required_preconditions: { type: Type.ARRAY, items: { type: Type.STRING } },
    rationale: { type: Type.STRING },
    suggested_next_action: { type: Type.STRING }
  },
  required: ["final_verdict", "confidence_score", "top_unresolved_risks", "required_preconditions", "rationale", "suggested_next_action"]
};

const stakeholderSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    stakeholders: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          role: { type: Type.STRING },
          sentiment: { type: Type.STRING, enum: ["SUPPORTIVE", "SKEPTICAL", "OPPOSED", "NEUTRAL"] },
          key_concern_or_motivation: { type: Type.STRING },
          simulated_quote: { type: Type.STRING },
          alignment_score: { type: Type.NUMBER }
        },
        required: ["role", "sentiment", "key_concern_or_motivation", "simulated_quote", "alignment_score"]
      }
    },
    consensus_prediction: { type: Type.STRING },
    political_friction_points: { type: Type.ARRAY, items: { type: Type.STRING } }
  },
  required: ["stakeholders", "consensus_prediction", "political_friction_points"]
};

const getAiClient = () => {
  if (!process.env.API_KEY) {
    throw new Error("API Key is missing. Please check your environment configuration.");
  }
  return new GoogleGenAI({ apiKey: process.env.API_KEY });
};

const cleanJsonOutput = (text: string) => {
  let cleaned = text.trim();
  if (cleaned.startsWith("```json")) {
    cleaned = cleaned.replace(/^```json\s*/, "").replace(/\s*```$/, "");
  } else if (cleaned.startsWith("```")) {
    cleaned = cleaned.replace(/^```\s*/, "").replace(/\s*```$/, "");
  }
  return cleaned;
};

export const decomposeDecision = async (
  decision: string,
  context: string
): Promise<DecisionAnalysis> => {
  const ai = getAiClient();
  
  const userPrompt = `
====================
INPUT
====================
Decision Statement:
${decision}

Context:
${context || "No additional context provided."}
`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: userPrompt,
      config: {
        systemInstruction: DECOMPOSER_INSTRUCTION,
        responseMimeType: "application/json",
        responseSchema: analysisSchema,
        temperature: 0.2,
      },
    });

    if (!response.text) {
      throw new Error("No response received from Gemini.");
    }

    return JSON.parse(cleanJsonOutput(response.text)) as DecisionAnalysis;
  } catch (error) {
    console.error("Error decomposing decision:", error);
    throw error;
  }
};

export const generateScenarios = async (
  analysis: DecisionAnalysis
): Promise<ScenarioAnalysis> => {
  const ai = getAiClient();

  const userPrompt = `
====================
INPUT FROM AGENT 1 (DECISION DECOMPOSER)
====================
${JSON.stringify(analysis, null, 2)}
`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview", 
      contents: userPrompt,
      config: {
        systemInstruction: SCENARIO_INSTRUCTION,
        responseMimeType: "application/json",
        responseSchema: scenarioSchema,
        temperature: 0.4, 
      },
    });

    if (!response.text) {
      throw new Error("No response received from Gemini.");
    }

    return JSON.parse(cleanJsonOutput(response.text)) as ScenarioAnalysis;
  } catch (error) {
    console.error("Error generating scenarios:", error);
    throw error;
  }
};

export const generateExperiments = async (
  analysis: DecisionAnalysis,
  scenarios: ScenarioAnalysis
): Promise<ExperimentPlan> => {
  const ai = getAiClient();

  const userPrompt = `
====================
INPUT FROM AGENT 1 (DECISION DECOMPOSER)
====================
${JSON.stringify(analysis, null, 2)}

====================
INPUT FROM AGENT 2 (ADVERSARIAL SCENARIO GENERATOR)
====================
${JSON.stringify(scenarios, null, 2)}
`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: userPrompt,
      config: {
        systemInstruction: EXPERIMENT_PLANNER_INSTRUCTION,
        responseMimeType: "application/json",
        responseSchema: experimentSchema,
        temperature: 0.3,
      },
    });

    if (!response.text) {
      throw new Error("No response received from Gemini.");
    }

    return JSON.parse(cleanJsonOutput(response.text)) as ExperimentPlan;
  } catch (error) {
    console.error("Error generating experiments:", error);
    throw error;
  }
};

export const synthesizeConfidence = async (
  analysis: DecisionAnalysis,
  scenarios: ScenarioAnalysis,
  experiments: ExperimentPlan
): Promise<SynthesizerAnalysis> => {
  const ai = getAiClient();

  const userPrompt = `
====================
INPUT FROM AGENT 1 (DECOMPOSER)
====================
${JSON.stringify(analysis, null, 2)}

====================
INPUT FROM AGENT 2 (ADVERSARIAL)
====================
${JSON.stringify(scenarios, null, 2)}

====================
INPUT FROM AGENT 3 (EXPERIMENT PLANNER)
====================
${JSON.stringify(experiments, null, 2)}
`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: userPrompt,
      config: {
        systemInstruction: SYNTHESIZER_INSTRUCTION,
        responseMimeType: "application/json",
        responseSchema: synthesizerSchema,
        temperature: 0.1, // Very low temperature for decisive verdict
      },
    });

    if (!response.text) {
      throw new Error("No response received from Gemini.");
    }

    return JSON.parse(cleanJsonOutput(response.text)) as SynthesizerAnalysis;
  } catch (error) {
    console.error("Error synthesizing confidence:", error);
    throw error;
  }
};

export const simulateStakeholders = async (
  analysis: DecisionAnalysis,
  synthesis: SynthesizerAnalysis
): Promise<StakeholderAnalysis> => {
  const ai = getAiClient();

  const userPrompt = `
====================
DECISION INPUT
====================
${JSON.stringify(analysis, null, 2)}

====================
CONFIDENCE VERDICT
====================
${JSON.stringify(synthesis, null, 2)}
`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: userPrompt,
      config: {
        systemInstruction: STAKEHOLDER_INSTRUCTION,
        responseMimeType: "application/json",
        responseSchema: stakeholderSchema,
        temperature: 0.5, // Slightly higher for personality
      },
    });

    if (!response.text) {
      throw new Error("No response received from Gemini.");
    }

    return JSON.parse(cleanJsonOutput(response.text)) as StakeholderAnalysis;
  } catch (error) {
    console.error("Error simulating stakeholders:", error);
    throw error;
  }
};