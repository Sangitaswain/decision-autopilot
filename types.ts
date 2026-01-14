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