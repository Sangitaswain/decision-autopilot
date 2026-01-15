/**
 * Adversarial Feature API
 * Handles scenario generation
 */
import { post } from '../../api/client';
import type { DecisionAnalysis, ScenarioAnalysis } from '../../types';

/**
 * Generate adversarial scenarios from a decomposition
 */
export async function generateScenarios(
    decomposition: DecisionAnalysis
): Promise<ScenarioAnalysis> {
    return post<ScenarioAnalysis>('/api/adversarial/generate', {
        decomposition,
    });
}
