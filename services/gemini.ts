import { GoogleGenAI, Type, Schema } from "@google/genai";
import { DecisionAnalysis, ScenarioAnalysis } from "../types";

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

// Exact prompt from requirements
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
    // We add thought_signature to the schema to force the model to output its reasoning,
    // even though the prompt doesn't explicitly mandate it. This helps with the "Thinking Level".
    thought_signature: { 
      type: Type.ARRAY, 
      items: { type: Type.STRING }
    }
  },
  required: ["scenarios"]
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

  // We explicitly pass the context from Agent 1 to Agent 2
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