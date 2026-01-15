import React from 'react';
import { SynthesizerAnalysis, Verdict } from '../types';
import { AlertOctagon, CheckCircle2, PauseCircle, ShieldAlert, ArrowRightCircle } from 'lucide-react';

interface ConfidenceSummaryProps {
  synthesis: SynthesizerAnalysis;
}

export const ConfidenceSummary: React.FC<ConfidenceSummaryProps> = ({ synthesis }) => {
  const verdictConfig: Record<Verdict, { color: string; icon: React.ReactNode; bg: string }> = {
    PROCEED: {
      color: "text-emerald-400",
      bg: "bg-emerald-950/40 border-emerald-800/50",
      icon: <CheckCircle2 className="w-12 h-12 text-emerald-400" />
    },
    DELAY: {
      color: "text-amber-400",
      bg: "bg-amber-950/40 border-amber-800/50",
      icon: <PauseCircle className="w-12 h-12 text-amber-400" />
    },
    ABORT: {
      color: "text-red-500",
      bg: "bg-red-950/40 border-red-800/50",
      icon: <AlertOctagon className="w-12 h-12 text-red-500" />
    }
  };

  const config = verdictConfig[synthesis.final_verdict];

  // Calculate ring stroke for score
  const radius = 30;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (synthesis.confidence_score / 100) * circumference;

  return (
    <div className="animate-fade-in-up space-y-8">
      
      {/* Hero Banner */}
      <div className={`relative overflow-hidden rounded-3xl p-8 border ${config.bg} flex flex-col md:flex-row items-center justify-between gap-8`}>
        {/* Verdict */}
        <div className="flex items-center gap-6 z-10">
          <div className="p-4 bg-slate-900/50 rounded-2xl shadow-xl backdrop-blur-sm border border-white/5">
            {config.icon}
          </div>
          <div>
            <div className="text-xs font-mono text-slate-400 uppercase tracking-widest mb-1">Final Verdict</div>
            <h2 className={`text-5xl font-black tracking-tight ${config.color}`}>
              {synthesis.final_verdict}
            </h2>
          </div>
        </div>

        {/* Confidence Score Circle */}
        <div className="relative flex items-center justify-center z-10">
          <svg className="transform -rotate-90 w-32 h-32">
            <circle
              className="text-slate-800"
              strokeWidth="8"
              stroke="currentColor"
              fill="transparent"
              r={radius}
              cx="64"
              cy="64"
            />
            <circle
              className={config.color}
              strokeWidth="8"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              stroke="currentColor"
              fill="transparent"
              r={radius}
              cx="64"
              cy="64"
            />
          </svg>
          <div className="absolute flex flex-col items-center">
            <span className={`text-3xl font-bold ${config.color}`}>{synthesis.confidence_score}%</span>
            <span className="text-[10px] uppercase text-slate-500 font-bold">Confidence</span>
          </div>
        </div>

        {/* Background Glow */}
        <div className={`absolute -right-20 -top-20 w-96 h-96 ${config.color.replace('text-', 'bg-')}/10 blur-[100px] rounded-full`}></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Rationale & Action */}
        <div className="space-y-6">
          <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-800">
            <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider mb-3">Decision Rationale</h3>
            <p className="text-slate-400 leading-relaxed text-sm">
              {synthesis.rationale}
            </p>
          </div>

          <div className="bg-indigo-950/20 rounded-xl p-6 border border-indigo-900/50">
            <h3 className="text-sm font-bold text-indigo-400 uppercase tracking-wider mb-3 flex items-center gap-2">
              <ArrowRightCircle className="w-4 h-4" />
              Suggested Next Action
            </h3>
            <p className="text-indigo-200 font-medium text-lg leading-snug">
              {synthesis.suggested_next_action}
            </p>
          </div>
        </div>

        {/* Risks & Preconditions */}
        <div className="space-y-6">
           {/* Unresolved Risks */}
          <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-800">
            <h3 className="text-sm font-bold text-red-400 uppercase tracking-wider mb-3 flex items-center gap-2">
              <ShieldAlert className="w-4 h-4" />
              Top Unresolved Risks
            </h3>
            <ul className="space-y-3">
              {synthesis.top_unresolved_risks.map((risk, i) => (
                <li key={i} className="flex gap-3 text-slate-300 text-sm">
                  <span className="text-red-500/50 font-mono mt-0.5">0{i+1}</span>
                  {risk}
                </li>
              ))}
            </ul>
          </div>

          {/* Required Preconditions */}
          {synthesis.required_preconditions.length > 0 && (
             <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-800">
                <h3 className="text-sm font-bold text-amber-400 uppercase tracking-wider mb-3">
                  Required Preconditions
                </h3>
                <ul className="space-y-2">
                  {synthesis.required_preconditions.map((cond, i) => (
                    <li key={i} className="flex gap-2 text-sm text-slate-400">
                      <span className="text-amber-500 font-bold">•</span>
                      {cond}
                    </li>
                  ))}
                </ul>
             </div>
          )}
        </div>

      </div>
    </div>
  );
};