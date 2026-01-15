/**
 * Decision Feature API
 * Handles decision decomposition and full analysis
 */
import { post } from '../../api/client';
import type { DecisionAnalysis, FullAnalysisResponse } from '../../types';

/**
 * Decompose a decision into structured components
 */
export async function decomposeDecision(
    decision: string,
    context: string
): Promise<DecisionAnalysis> {
    return post<DecisionAnalysis>('/api/decision/decompose', {
        decision,
        context,
    });
}

/**
 * Run the full multi-agent analysis pipeline
 */
export async function runFullAnalysis(
    decision: string,
    context: string
): Promise<FullAnalysisResponse> {
    return post<FullAnalysisResponse>('/api/decision/analyze', {
        decision,
        context,
    });
}
