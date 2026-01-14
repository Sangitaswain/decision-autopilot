import React, { useState } from 'react';
import { InputForm } from './components/InputForm';
import { Dashboard } from './components/Dashboard';
import { decomposeDecision } from './services/gemini';
import { DecisionAnalysis } from './types';
import { AlertCircle } from 'lucide-react';

const App: React.FC = () => {
  const [analysis, setAnalysis] = useState<DecisionAnalysis | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async (decision: string, context: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await decomposeDecision(decision, context);
      setAnalysis(result);
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred while analyzing the decision.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setAnalysis(null);
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
              <h4 className="font-semibold text-red-400">Analysis Failed</h4>
              <p className="text-sm mt-1 opacity-90">{error}</p>
            </div>
          </div>
        )}

        {!analysis ? (
          <InputForm onAnalyze={handleAnalyze} isLoading={isLoading} />
        ) : (
          <Dashboard analysis={analysis} onReset={handleReset} />
        )}
      </div>
    </div>
  );
};

export default App;