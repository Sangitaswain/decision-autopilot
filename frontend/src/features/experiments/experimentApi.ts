/**
 * Experiments Feature API
 * Handles experiment planning
 */
import { post } from '../../api/client';
import type { DecisionAnalysis, ScenarioAnalysis, ExperimentPlan } from '../../types';

/**
 * Generate experiment plans from decomposition and scenarios
 */
export async function generateExperiments(
    decomposition: DecisionAnalysis,
    scenarios: ScenarioAnalysis
): Promise<ExperimentPlan> {
    return post<ExperimentPlan>('/api/experiments/plan', {
        decomposition,
        scenarios,
    });
}
