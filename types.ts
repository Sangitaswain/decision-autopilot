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