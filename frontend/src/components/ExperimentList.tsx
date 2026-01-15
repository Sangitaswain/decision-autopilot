import React from 'react';
import { Beaker, Clock, DollarSign, CheckCircle2, AlertOctagon, ArrowRight, Wrench } from 'lucide-react';
import { ExperimentPlan } from '../types';

interface ExperimentListProps {
  plan: ExperimentPlan;
}

export const ExperimentList: React.FC<ExperimentListProps> = ({ plan }) => {
  return (
    <div className="animate-fade-in-up">
      {/* Guidance Section */}
      <div className="bg-emerald-950/20 border border-emerald-900/50 rounded-xl p-5 mb-8">
        <h3 className="text-emerald-400 font-bold mb-2 flex items-center gap-2">
          <Beaker className="w-5 h-5" />
          Strategic Guidance
        </h3>
        <p className="text-slate-300 text-sm mb-3">
          <span className="font-semibold text-emerald-500/80">Recommendation: </span>
          {plan.overall_guidance.recommended_starting_point}
        </p>
        <p className="text-slate-400 text-xs italic">
          Rationale: {plan.overall_guidance.experiment_ordering_rationale}
        </p>
      </div>

      <div className="space-y-8">
        {plan.experiments.map((exp, index) => (
          <div key={index} className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-600 to-cyan-600 rounded-2xl opacity-20 group-hover:opacity-40 transition duration-500 blur"></div>
            <div className="relative bg-slate-900 border border-slate-700 rounded-xl p-6 hover:border-emerald-500/30 transition-colors">
              
              {/* Header */}
              <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-6 border-b border-slate-800 pb-4">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="px-2 py-0.5 rounded text-[10px] uppercase font-bold border bg-slate-800 text-slate-400 border-slate-700">
                      Target: Scenario {exp.scenario_id}
                    </span>
                    <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold border ${exp.severity === 'CRITICAL' ? 'bg-red-900/30 text-red-400 border-red-800' : 'bg-orange-900/30 text-orange-400 border-orange-800'}`}>
                      {exp.severity} RISK
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-1">{exp.experiment_design}</h3>
                  <p className="text-emerald-400 text-sm font-mono">{exp.objective}</p>
                </div>
                
                <div className="flex items-center gap-4 text-sm text-slate-400 bg-slate-950/50 px-4 py-2 rounded-lg border border-slate-800">
                  <div className="flex items-center gap-1.5" title="Duration">
                    <Clock className="w-4 h-4 text-emerald-500" />
                    <span>{exp.duration}</span>
                  </div>
                  <div className="w-px h-4 bg-slate-700"></div>
                  <div className="flex items-center gap-1.5" title="Budget">
                    <DollarSign className="w-4 h-4 text-emerald-500" />
                    <span>{exp.required_resources.budget}</span>
                  </div>
                </div>
              </div>

              {/* Grid Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                
                {/* Left Column: Requirements & Success */}
                <div className="space-y-6">
                  <div>
                    <h4 className="text-xs uppercase tracking-wider font-bold text-slate-500 mb-3 flex items-center gap-2">
                      <Wrench className="w-3 h-3" />
                      Required Resources
                    </h4>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {exp.required_resources.tools.map((tool, i) => (
                        <span key={i} className="bg-slate-800 text-slate-300 px-2 py-1 rounded text-xs border border-slate-700">
                          {tool}
                        </span>
                      ))}
                    </div>
                    <p className="text-xs text-slate-400">Time Commitment: {exp.required_resources.time_commitment}</p>
                  </div>

                  <div>
                    <h4 className="text-xs uppercase tracking-wider font-bold text-slate-500 mb-3 flex items-center gap-2">
                      <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                      Success Criteria
                    </h4>
                    <ul className="space-y-2">
                      {exp.success_criteria.map((criteria, i) => (
                        <li key={i} className="flex gap-2 text-sm text-slate-300">
                          <span className="text-emerald-500 font-bold">•</span>
                          {criteria}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Right Column: Failure & Decision Rule */}
                <div className="space-y-6">
                  <div>
                    <h4 className="text-xs uppercase tracking-wider font-bold text-slate-500 mb-3 flex items-center gap-2">
                      <AlertOctagon className="w-3 h-3 text-red-500" />
                      Failure Signals (Kill Conditions)
                    </h4>
                    <ul className="space-y-2">
                      {exp.failure_signals.map((signal, i) => (
                        <li key={i} className="flex gap-2 text-sm text-slate-300">
                          <span className="text-red-500 font-bold">×</span>
                          {signal}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
                    <h4 className="text-xs uppercase tracking-wider font-bold text-slate-400 mb-2">
                      If Experiment Fails:
                    </h4>
                    <div className="flex gap-2 items-start text-sm text-white">
                      <ArrowRight className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                      {exp.decision_rule}
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};