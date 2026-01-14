import React, { useState } from 'react';
import { ArrowRight, BrainCircuit, FileText } from 'lucide-react';

interface InputFormProps {
  onAnalyze: (decision: string, context: string) => void;
  isLoading: boolean;
}

export const InputForm: React.FC<InputFormProps> = ({ onAnalyze, isLoading }) => {
  const [decision, setDecision] = useState('');
  const [context, setContext] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (decision.trim()) {
      onAnalyze(decision, context);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-slate-800 rounded-xl border border-slate-700 shadow-2xl overflow-hidden">
      <div className="p-6 md:p-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <BrainCircuit className="w-8 h-8 text-indigo-400" />
            Decision Decomposer
          </h2>
          <p className="text-slate-400 mt-2">
            Enter a high-stakes decision to decompose it into claims, KPIs, risks, and assumptions.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="decision" className="block text-sm font-medium text-slate-300 mb-2">
              Decision Statement <span className="text-red-400">*</span>
            </label>
            <textarea
              id="decision"
              required
              value={decision}
              onChange={(e) => setDecision(e.target.value)}
              placeholder="e.g., We will migrate our entire legacy monolith to microservices on AWS within the next 18 months to improve scalability."
              className="w-full h-32 px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-slate-100 placeholder-slate-500 resize-none transition-all"
            />
          </div>

          <div>
            <label htmlFor="context" className="block text-sm font-medium text-slate-300 mb-2 flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Context (Optional)
            </label>
            <textarea
              id="context"
              value={context}
              onChange={(e) => setContext(e.target.value)}
              placeholder="Paste meeting notes, emails, strategic documents, or any supporting text here..."
              className="w-full h-48 px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-slate-100 placeholder-slate-500 resize-none transition-all"
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isLoading || !decision.trim()}
              className={`
                flex items-center gap-2 px-8 py-3 rounded-lg font-semibold text-white transition-all
                ${isLoading || !decision.trim() 
                  ? 'bg-slate-700 cursor-not-allowed text-slate-400' 
                  : 'bg-indigo-600 hover:bg-indigo-500 shadow-lg shadow-indigo-500/20 active:scale-95'}
              `}
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Decomposing...
                </>
              ) : (
                <>
                  Analyze Decision
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </div>
        </form>
      </div>
      
      {/* Footer / Tip */}
      <div className="bg-slate-900/50 px-6 py-4 border-t border-slate-700 text-sm text-slate-500 flex justify-between">
        <span>Powered by Gemini 3</span>
        <span>Thinking Mode: Deep</span>
      </div>
    </div>
  );
};