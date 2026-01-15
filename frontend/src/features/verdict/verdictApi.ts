/**
 * Verdict Feature API
 * Handles confidence synthesis and stakeholder simulation
 */
import { post } from '../../api/client';
import type {
    DecisionAnalysis,
    ScenarioAnalysis,
    ExperimentPlan,
    SynthesizerAnalysis,
    StakeholderAnalysis,
} from '../../types';

/**
 * Synthesize confidence verdict from all agent outputs
 */
export async function synthesizeConfidence(
    decomposition: DecisionAnalysis,
    scenarios: ScenarioAnalysis,
    experiments: ExperimentPlan
): Promise<SynthesizerAnalysis> {
    return post<SynthesizerAnalysis>('/api/verdict/synthesize', {
        decomposition,
        scenarios,
        experiments,
    });
}

/**
 * Simulate stakeholder reactions
 */
export async function simulateStakeholders(
    decomposition: DecisionAnalysis,
    synthesis: SynthesizerAnalysis
): Promise<StakeholderAnalysis> {
    return post<StakeholderAnalysis>('/api/verdict/stakeholders', {
        decomposition,
        synthesis,
    });
}
