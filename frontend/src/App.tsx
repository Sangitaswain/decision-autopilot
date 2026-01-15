import React, { useState } from 'react';
import { InputForm } from './components/InputForm';
import { Dashboard } from './components/Dashboard';
import { decomposeDecision } from './features/decision/decisionApi';
import { generateScenarios } from './features/adversarial/scenarioApi';
import { generateExperiments } from './features/experiments/experimentApi';
import { synthesizeConfidence, simulateStakeholders } from './features/verdict/verdictApi';
import { DecisionAnalysis, ScenarioAnalysis, ExperimentPlan, SynthesizerAnalysis, StakeholderAnalysis } from './types';
import { AlertCircle } from 'lucide-react';

const App: React.FC = () => {
  const [analysis, setAnalysis] = useState<DecisionAnalysis | null>(null);
  const [scenarios, setScenarios] = useState<ScenarioAnalysis | null>(null);
  const [experiments, setExperiments] = useState<ExperimentPlan | null>(null);
  const [synthesis, setSynthesis] = useState<SynthesizerAnalysis | null>(null);
  const [stakeholders, setStakeholders] = useState<StakeholderAnalysis | null>(null);

  const [isDecomposing, setIsDecomposing] = useState(false);
  const [isGeneratingScenarios, setIsGeneratingScenarios] = useState(false);
  const [isGeneratingExperiments, setIsGeneratingExperiments] = useState(false);
  const [isSynthesizing, setIsSynthesizing] = useState(false);
  const [isSimulatingStakeholders, setIsSimulatingStakeholders] = useState(false);

  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async (decision: string, context: string) => {
    setIsDecomposing(true);
    setScenarios(null);
    setExperiments(null);
    setSynthesis(null);
    setStakeholders(null);
    setError(null);
    try {
      const result = await decomposeDecision(decision, context);
      setAnalysis(result);
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred while analyzing the decision.");
    } finally {
      setIsDecomposing(false);
    }
  };

  const handleGenerateScenarios = async () => {
    if (!analysis) return;

    setIsGeneratingScenarios(true);
    setError(null);
    try {
      const result = await generateScenarios(analysis);
      setScenarios(result);
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred while generating scenarios.");
    } finally {
      setIsGeneratingScenarios(false);
    }
  };

  const handleGenerateExperiments = async () => {
    if (!analysis || !scenarios) return;

    setIsGeneratingExperiments(true);
    setError(null);
    try {
      const result = await generateExperiments(analysis, scenarios);
      setExperiments(result);
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred while generating experiments.");
    } finally {
      setIsGeneratingExperiments(false);
    }
  };

  const handleSynthesizeConfidence = async () => {
    if (!analysis || !scenarios || !experiments) return;

    setIsSynthesizing(true);
    setError(null);
    try {
      const result = await synthesizeConfidence(analysis, scenarios, experiments);
      setSynthesis(result);
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred while synthesizing confidence.");
    } finally {
      setIsSynthesizing(false);
    }
  };

  const handleSimulateStakeholders = async () => {
    if (!analysis || !synthesis) return;

    setIsSimulatingStakeholders(true);
    setError(null);
    try {
      const result = await simulateStakeholders(analysis, synthesis);
      setStakeholders(result);
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred while simulating stakeholders.");
    } finally {
      setIsSimulatingStakeholders(false);
    }
  };

  const handleReset = () => {
    setAnalysis(null);
    setScenarios(null);
    setExperiments(null);
    setSynthesis(null);
    setStakeholders(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 selection:bg-indigo-500/30">
      {/* Background decoration */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-900/10 blur-[100px] rounded-full"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-900/10 blur-[100px] rounded-full"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8 md:py-12">
        <header className="mb-12 text-center">
          <div className="inline-flex items-center justify-center px-3 py-1 mb-4 rounded-full bg-slate-900 border border-slate-700 text-xs font-mono text-indigo-400">
            DECISION_AUTOPILOT_v1.0
          </div>
        </header>

        {error && (
          <div className="max-w-4xl mx-auto mb-8 bg-red-900/20 border border-red-800 text-red-200 p-4 rounded-lg flex items-start gap-3">
            <AlertCircle className="w-5 h-5 mt-0.5 text-red-500" />
            <div>
              <h4 className="font-semibold text-red-400">System Error</h4>
              <p className="text-sm mt-1 opacity-90">{error}</p>
            </div>
          </div>
        )}

        {!analysis ? (
          <InputForm onAnalyze={handleAnalyze} isLoading={isDecomposing} />
        ) : (
          <Dashboard
            analysis={analysis}
            scenarios={scenarios}
            experiments={experiments}
            synthesis={synthesis}
            stakeholders={stakeholders}
            onReset={handleReset}
            onGenerateScenarios={handleGenerateScenarios}
            onGenerateExperiments={handleGenerateExperiments}
            onSynthesizeConfidence={handleSynthesizeConfidence}
            onSimulateStakeholders={handleSimulateStakeholders}
            isGeneratingScenarios={isGeneratingScenarios}
            isGeneratingExperiments={isGeneratingExperiments}
            isSynthesizing={isSynthesizing}
            isSimulatingStakeholders={isSimulatingStakeholders}
          />
        )}
      </div>
    </div>
  );
};

export default App;