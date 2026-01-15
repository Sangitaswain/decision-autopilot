export interface KPI {
  name: string;
  baseline: string | null;
  target: string | null;
  time_horizon: string | null;
}

export enum ImpactLevel {
  Low = 'low',
  Medium = 'medium',
  High = 'high'
}

export enum UncertaintyLevel {
  Low = 'low',
  Medium = 'medium',
  High = 'high'
}

export enum AssumptionType {
  Explicit = 'explicit',
  Implicit = 'implicit'
}

export interface Assumption {
  text: string;
  type: AssumptionType;
  impact_level: ImpactLevel;
  uncertainty_level: UncertaintyLevel;
}

export interface DecisionAnalysis {
  decision_summary: string;
  claims: string[];
  kpis: KPI[];
  assumptions: Assumption[];
  dependencies: string[];
  risks: string[];
  evidence: string[];
  thought_signature: string[];
}

export interface DecomposeRequest {
  decision: string;
  context: string;
}

export type Severity = 'LOW' | 'HIGH' | 'CRITICAL';

export interface AdversarialScenario {
  id: string;
  severity: Severity;
  description: string;
  triggered_by: string[];
  impacted_kpis: string[];
  early_warning_signals: string[];
}

export interface ScenarioAnalysis {
  scenarios: AdversarialScenario[];
  // We keep thought_signature in the schema to maintain thinking visibility, 
  // even if not explicitly in the prompt text example.
  thought_signature?: string[];
}

export interface ExperimentResources {
  time_commitment: string;
  budget: string;
  tools: string[];
}

export interface Experiment {
  scenario_id: string;
  severity: 'HIGH' | 'CRITICAL';
  objective: string;
  experiment_design: string;
  duration: string;
  required_resources: ExperimentResources;
  success_criteria: string[];
  failure_signals: string[];
  decision_rule: string;
}

export interface ExperimentPlan {
  experiments: Experiment[];
  overall_guidance: {
    experiment_ordering_rationale: string;
    recommended_starting_point: string;
  };
}

export type Verdict = 'PROCEED' | 'DELAY' | 'ABORT';

export interface SynthesizerAnalysis {
  final_verdict: Verdict;
  confidence_score: number;
  top_unresolved_risks: string[];
  required_preconditions: string[];
  rationale: string;
  suggested_next_action: string;
}

export type Sentiment = 'SUPPORTIVE' | 'SKEPTICAL' | 'OPPOSED' | 'NEUTRAL';

export interface StakeholderReaction {
  role: string;
  sentiment: Sentiment;
  key_concern_or_motivation: string;
  simulated_quote: string;
  alignment_score: number; // 0-100
}

export interface StakeholderAnalysis {
  stakeholders: StakeholderReaction[];
  consensus_prediction: string;
  political_friction_points: string[];
}

// Full analysis response from the orchestrator
export interface FullAnalysisResponse {
  decomposition: DecisionAnalysis;
  scenarios: ScenarioAnalysis;
  experiments: ExperimentPlan;
  synthesis: SynthesizerAnalysis;
  stakeholders?: StakeholderAnalysis;
}