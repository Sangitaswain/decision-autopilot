import React from 'react';
import { TrendingUp, Activity, Eye, ShieldAlert } from 'lucide-react';
import { ScenarioAnalysis, Severity } from '../types';

interface ScenarioListProps {
  scenarios: ScenarioAnalysis;
}

const SeverityBadge: React.FC<{ severity: Severity }> = ({ severity }) => {
  const colors = {
    LOW: "bg-blue-900/30 text-blue-400 border-blue-800",
    HIGH: "bg-orange-900/30 text-orange-400 border-orange-800",
    CRITICAL: "bg-red-900/30 text-red-400 border-red-800"
  };

  return (
    <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold border ${colors[severity]}`}>
      {severity}
    </span>
  );
};

export const ScenarioList: React.FC<ScenarioListProps> = ({ scenarios }) => {
  return (
    <div className="animate-fade-in-up">
      <div className="grid grid-cols-1 gap-6">
        {scenarios.scenarios.map((scenario) => (
          <div 
            key={scenario.id} 
            className="bg-slate-900/60 border border-slate-700/60 rounded-xl p-5 hover:border-indigo-500/50 transition-colors group relative overflow-hidden"
          >
             {/* Subtle gradient background for high severity */}
             {scenario.severity === 'CRITICAL' && (
                <div className="absolute top-0 right-0 w-64 h-64 bg-red-500/5 blur-[80px] rounded-full pointer-events-none"></div>
             )}

            <div className="flex flex-col md:flex-row gap-4 justify-between items-start mb-4 relative z-10">
              <div className="flex items-center gap-3">
                <span className="font-mono text-slate-500 text-sm bg-slate-800 px-2 py-1 rounded">#{scenario.id}</span>
                <SeverityBadge severity={scenario.severity} />
              </div>
            </div>

            <h3 className="text-lg font-semibold text-slate-200 mb-3 group-hover:text-white transition-colors relative z-10">
              {scenario.description}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6 pt-6 border-t border-slate-800/50 relative z-10">
              
              {/* Triggered By */}
              <div>
                <h4 className="text-xs uppercase tracking-wider font-bold text-slate-500 mb-2 flex items-center gap-1.5">
                  <Activity className="w-3 h-3" />
                  Triggered By
                </h4>
                <ul className="space-y-1">
                  {scenario.triggered_by.map((trigger, i) => (
                    <li key={i} className="text-sm text-slate-400 leading-snug break-words">
                        <span className="text-indigo-500 mr-1">↳</span>
                        {trigger}
                    </li>
                  ))}
                </ul>
              </div>

              {/* KPIs Affected */}
              <div>
                <h4 className="text-xs uppercase tracking-wider font-bold text-slate-500 mb-2 flex items-center gap-1.5">
                  <TrendingUp className="w-3 h-3" />
                  Impact on KPIs
                </h4>
                <div className="flex flex-wrap gap-2">
                  {scenario.impacted_kpis.map((kpi, i) => (
                    <span key={i} className="px-2 py-1 bg-slate-800 text-slate-300 text-xs rounded border border-slate-700/50">
                      {kpi}
                    </span>
                  ))}
                </div>
              </div>

              {/* Warning Signals */}
              <div>
                <h4 className="text-xs uppercase tracking-wider font-bold text-slate-500 mb-2 flex items-center gap-1.5">
                  <Eye className="w-3 h-3" />
                  Early Warning Signals
                </h4>
                <ul className="space-y-1">
                  {scenario.early_warning_signals.map((signal, i) => (
                    <li key={i} className="text-sm text-amber-500/80 leading-snug italic">
                      ⚠ "{signal}"
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>

      {scenarios.thought_signature && scenarios.thought_signature.length > 0 && (
          <div className="mt-8 bg-slate-900/80 rounded-xl p-6 border border-slate-800">
            <h3 className="text-xs uppercase tracking-wider font-bold text-slate-600 mb-3">Agent 2 Thought Process</h3>
            <ul className="space-y-2">
            {scenarios.thought_signature.map((thought, idx) => (
                <li key={idx} className="text-xs text-slate-500 font-mono flex gap-2">
                <span className="text-slate-700">{idx + 1}.</span>
                {thought}
                </li>
            ))}
            </ul>
        </div>
      )}
    </div>
  );
};