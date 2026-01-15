import React, { useRef } from 'react';
import { AlertTriangle, CheckCircle2, Target, Network, ScrollText, Fingerprint, RefreshCcw, Bot, ArrowDown, FlaskConical, Scale, Users } from 'lucide-react';
import { DecisionAnalysis, Assumption, ImpactLevel, UncertaintyLevel, ScenarioAnalysis, ExperimentPlan, SynthesizerAnalysis, StakeholderAnalysis } from '../types';
import { AssumptionMatrix } from './AssumptionMatrix';
import { ScenarioList } from './ScenarioList';
import { ExperimentList } from './ExperimentList';
import { ConfidenceSummary } from './ConfidenceSummary';
import { StakeholderReactions } from './StakeholderReactions';

interface DashboardProps {
  analysis: DecisionAnalysis;
  scenarios: ScenarioAnalysis | null;
  experiments: ExperimentPlan | null;
  synthesis: SynthesizerAnalysis | null;
  stakeholders: StakeholderAnalysis | null;
  onReset: () => void;
  onGenerateScenarios: () => void;
  onGenerateExperiments: () => void;
  onSynthesizeConfidence: () => void;
  onSimulateStakeholders: () => void;
  isGeneratingScenarios: boolean;
  isGeneratingExperiments: boolean;
  isSynthesizing: boolean;
  isSimulatingStakeholders: boolean;
}

export const Dashboard: React.FC<DashboardProps> = ({ 
  analysis, 
  scenarios, 
  experiments,
  synthesis,
  stakeholders,
  onReset, 
  onGenerateScenarios,
  onGenerateExperiments,
  onSynthesizeConfidence,
  onSimulateStakeholders,
  isGeneratingScenarios,
  isGeneratingExperiments,
  isSynthesizing,
  isSimulatingStakeholders
}) => {
  const scenariosRef = useRef<HTMLDivElement>(null);
  const experimentsRef = useRef<HTMLDivElement>(null);
  const synthesisRef = useRef<HTMLDivElement>(null);
  const stakeholdersRef = useRef<HTMLDivElement>(null);

  const handleScrollToScenarios = () => {
    onGenerateScenarios();
    setTimeout(() => {
      scenariosRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleScrollToExperiments = () => {
    onGenerateExperiments();
    setTimeout(() => {
      experimentsRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleScrollToSynthesis = () => {
    onSynthesizeConfidence();
    setTimeout(() => {
      synthesisRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleScrollToStakeholders = () => {
    onSimulateStakeholders();
    setTimeout(() => {
        stakeholdersRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <div className="w-full max-w-7xl mx-auto pb-20">
      {/* Orchestrator Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 animate-fade-in-up">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Decision Autopilot Analysis</h1>
          <p className="text-slate-400 mt-1 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            Orchestrating autonomous agents
          </p>
        </div>
        <button 
          onClick={onReset}
          className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg border border-slate-700 transition-colors"
        >
          <RefreshCcw className="w-4 h-4" />
          New Decision
        </button>
      </div>

      {/* AGENT 1 SECTION */}
      <div className="border border-slate-800 rounded-2xl overflow-hidden mb-8 relative">
        <div className="bg-slate-900/80 px-6 py-3 border-b border-slate-800 flex justify-between items-center">
            <div className="flex items-center gap-2 text-indigo-400 font-mono text-sm font-bold tracking-wider">
                <Bot className="w-4 h-4" />
                AGENT 1 | DECISION DECOMPOSER
            </div>
            <span className="text-xs text-emerald-500 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> Complete
            </span>
        </div>

        <div className="p-6 bg-slate-900/30">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Column 1: Summary & Claims */}
                <div className="space-y-6 lg:col-span-1">
                {/* Summary Card */}
                <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 shadow-sm">
                    <h3 className="text-sm uppercase tracking-wider font-semibold text-slate-400 mb-4 flex items-center gap-2">
                    <ScrollText className="w-4 h-4" />
                    Decision Summary
                    </h3>
                    <p className="text-lg text-white font-medium leading-relaxed">
                    {analysis.decision_summary}
                    </p>
                </div>

                {/* Claims Card */}
                <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 shadow-sm">
                    <h3 className="text-sm uppercase tracking-wider font-semibold text-slate-400 mb-4 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4" />
                    Strategic Claims
                    </h3>
                    <ul className="space-y-3">
                    {analysis.claims.map((claim, idx) => (
                        <li key={idx} className="flex gap-3 text-slate-300 text-sm">
                        <span className="text-indigo-400 font-bold mt-0.5">•</span>
                        {claim}
                        </li>
                    ))}
                    </ul>
                </div>

                {/* Evidence Card */}
                {analysis.evidence.length > 0 && (
                    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 shadow-sm">
                    <h3 className="text-sm uppercase tracking-wider font-semibold text-slate-400 mb-4 flex items-center gap-2">
                        <ScrollText className="w-4 h-4" />
                        Supporting Evidence
                    </h3>
                    <ul className="space-y-3">
                        {analysis.evidence.map((ev, idx) => (
                        <li key={idx} className="bg-slate-900/50 p-3 rounded border-l-2 border-indigo-500 text-slate-400 text-xs italic">
                            "{ev}"
                        </li>
                        ))}
                    </ul>
                    </div>
                )}
                </div>

                {/* Column 2: KPIs & Assumptions */}
                <div className="space-y-6 lg:col-span-1">
                {/* KPIs */}
                <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 shadow-sm">
                    <h3 className="text-sm uppercase tracking-wider font-semibold text-slate-400 mb-4 flex items-center gap-2">
                    <Target className="w-4 h-4" />
                    Measurable KPIs
                    </h3>
                    <div className="space-y-4">
                    {analysis.kpis.map((kpi, idx) => (
                        <div key={idx} className="bg-slate-900 rounded-lg p-4 border border-slate-700/50">
                        <div className="text-indigo-400 font-semibold mb-2">{kpi.name}</div>
                        <div className="grid grid-cols-2 gap-2 text-xs">
                            <div>
                            <span className="block text-slate-500">Baseline</span>
                            <span className="text-slate-300">{kpi.baseline || "N/A"}</span>
                            </div>
                            <div className="text-right">
                            <span className="block text-slate-500">Target</span>
                            <span className="text-emerald-400 font-bold">{kpi.target || "N/A"}</span>
                            </div>
                        </div>
                        {kpi.time_horizon && (
                            <div className="mt-2 pt-2 border-t border-slate-800 text-xs text-slate-500 flex justify-between">
                            <span>Time Horizon</span>
                            <span>{kpi.time_horizon}</span>
                            </div>
                        )}
                        </div>
                    ))}
                    {analysis.kpis.length === 0 && (
                        <p className="text-slate-500 text-sm italic">No specific KPIs identified.</p>
                    )}
                    </div>
                </div>

                {/* Assumptions Matrix */}
                <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 shadow-sm">
                    <h3 className="text-sm uppercase tracking-wider font-semibold text-slate-400 mb-4 flex items-center gap-2">
                    <Fingerprint className="w-4 h-4" />
                    Assumptions Landscape
                    </h3>
                    <AssumptionMatrix assumptions={analysis.assumptions} />
                    
                    <div className="mt-6 space-y-3 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
                    {analysis.assumptions.map((assump, idx) => (
                        <div key={idx} className="text-xs border-b border-slate-700/50 last:border-0 pb-2 last:pb-0">
                        <div className="flex justify-between mb-1">
                            <span className={`uppercase font-bold text-[10px] px-1.5 py-0.5 rounded 
                            ${assump.type === 'explicit' ? 'bg-blue-900/30 text-blue-400' : 'bg-purple-900/30 text-purple-400'}`}>
                            {assump.type}
                            </span>
                            <div className="flex gap-2">
                            <span className={`text-[10px] ${assump.impact_level === ImpactLevel.High ? 'text-red-400 font-bold' : 'text-slate-500'}`}>
                                Imp: {assump.impact_level}
                            </span>
                            <span className={`text-[10px] ${assump.uncertainty_level === UncertaintyLevel.High ? 'text-orange-400 font-bold' : 'text-slate-500'}`}>
                                Unc: {assump.uncertainty_level}
                            </span>
                            </div>
                        </div>
                        <p className="text-slate-300">{assump.text}</p>
                        </div>
                    ))}
                    </div>
                </div>
                </div>

                {/* Column 3: Risks, Dependencies & Thoughts */}
                <div className="space-y-6 lg:col-span-1">
                {/* Risks */}
                <div className="bg-slate-800 rounded-xl p-6 border border-red-900/30 shadow-sm relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-red-500/5 blur-[50px] rounded-full"></div>
                    <h3 className="text-sm uppercase tracking-wider font-semibold text-red-400 mb-4 flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4" />
                    Identified Risks
                    </h3>
                    <ul className="space-y-3">
                    {analysis.risks.map((risk, idx) => (
                        <li key={idx} className="flex gap-3 text-slate-300 text-sm">
                        <span className="text-red-500 font-bold mt-0.5">!</span>
                        {risk}
                        </li>
                    ))}
                    </ul>
                </div>

                {/* Dependencies */}
                <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 shadow-sm">
                    <h3 className="text-sm uppercase tracking-wider font-semibold text-slate-400 mb-4 flex items-center gap-2">
                    <Network className="w-4 h-4" />
                    Dependencies
                    </h3>
                    <div className="flex flex-wrap gap-2">
                    {analysis.dependencies.map((dep, idx) => (
                        <span key={idx} className="px-3 py-1 bg-slate-900 text-slate-300 text-xs rounded-full border border-slate-700">
                        {dep}
                        </span>
                    ))}
                    </div>
                </div>

                {/* Thought Signature */}
                <div className="bg-slate-900/80 rounded-xl p-6 border border-slate-800">
                    <h3 className="text-xs uppercase tracking-wider font-bold text-slate-600 mb-3">Agent 1 Thought Process</h3>
                    <ul className="space-y-2">
                    {analysis.thought_signature.map((thought, idx) => (
                        <li key={idx} className="text-xs text-slate-500 font-mono flex gap-2">
                        <span className="text-slate-700">{idx + 1}.</span>
                        {thought}
                        </li>
                    ))}
                    </ul>
                </div>
                </div>
            </div>
        </div>
      </div>

      {/* TRIGGER ZONE 1 */}
      <div className="flex flex-col items-center justify-center -my-4 relative z-10">
         <div className="h-8 w-px bg-slate-700"></div>
         {!scenarios && (
             <button
             onClick={handleScrollToScenarios}
             disabled={isGeneratingScenarios}
             className={`
               group relative flex items-center justify-center gap-4 px-8 py-4 
               bg-slate-900 hover:bg-slate-800 text-white rounded-2xl border border-indigo-500/50
               shadow-[0_0_30px_-5px_rgba(79,70,229,0.3)] transition-all active:scale-95
               disabled:opacity-70 disabled:cursor-not-allowed w-full max-w-2xl
             `}
           >
             <div className="flex flex-col items-start text-left">
                <span className="text-xs font-mono text-indigo-400 font-bold tracking-widest mb-1">NEXT STEP</span>
                <span className="font-bold text-lg">Run Adversarial Stress Test</span>
             </div>
             
             {isGeneratingScenarios ? (
                <div className="w-8 h-8 ml-auto border-2 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin" />
             ) : (
                <div className="ml-auto bg-indigo-600 p-2 rounded-lg group-hover:bg-indigo-500 transition-colors">
                    <ArrowDown className="w-5 h-5" />
                </div>
             )}
           </button>
         )}
         <div className="h-8 w-px bg-slate-700"></div>
      </div>

      {/* AGENT 2 SECTION */}
      <div ref={scenariosRef} className="scroll-mt-8">
        {scenarios && (
            <div className="border border-indigo-900/50 rounded-2xl overflow-hidden mb-8 relative animate-fade-in-up">
                 <div className="bg-slate-900/80 px-6 py-3 border-b border-indigo-900/50 flex justify-between items-center bg-gradient-to-r from-slate-900 to-indigo-950/30">
                    <div className="flex items-center gap-2 text-indigo-300 font-mono text-sm font-bold tracking-wider">
                        <Bot className="w-4 h-4" />
                        AGENT 2 | ADVERSARIAL SCENARIO GENERATOR
                    </div>
                    {experiments && (
                        <span className="text-xs text-emerald-500 flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3" /> Complete
                        </span>
                    )}
                </div>
                <div className="p-6 bg-slate-900/30">
                    <p className="text-slate-400 mb-6 max-w-3xl">
                        This agent has stress-tested the assumptions provided by Agent 1. It operates pessimistically to identify potential failure modes.
                    </p>
                    <ScenarioList scenarios={scenarios} />
                </div>
            </div>
        )}
      </div>

      {/* TRIGGER ZONE 2 */}
      {scenarios && (
        <div className="flex flex-col items-center justify-center -my-4 relative z-10">
          <div className="h-8 w-px bg-slate-700"></div>
          {!experiments && (
              <button
              onClick={handleScrollToExperiments}
              disabled={isGeneratingExperiments}
              className={`
                group relative flex items-center justify-center gap-4 px-8 py-4 
                bg-slate-900 hover:bg-slate-800 text-white rounded-2xl border border-emerald-500/50
                shadow-[0_0_30px_-5px_rgba(16,185,129,0.3)] transition-all active:scale-95
                disabled:opacity-70 disabled:cursor-not-allowed w-full max-w-2xl
              `}
            >
              <div className="flex flex-col items-start text-left">
                  <span className="text-xs font-mono text-emerald-400 font-bold tracking-widest mb-1">FINAL STEP</span>
                  <span className="font-bold text-lg">Design Validation Experiments</span>
              </div>
              
              {isGeneratingExperiments ? (
                  <div className="w-8 h-8 ml-auto border-2 border-emerald-500/30 border-t-emerald-500 rounded-full animate-spin" />
              ) : (
                  <div className="ml-auto bg-emerald-600 p-2 rounded-lg group-hover:bg-emerald-500 transition-colors">
                      <FlaskConical className="w-5 h-5" />
                  </div>
              )}
            </button>
          )}
          <div className="h-8 w-px bg-slate-700"></div>
        </div>
      )}

      {/* AGENT 3 SECTION */}
      <div ref={experimentsRef} className="scroll-mt-8">
        {experiments && (
            <div className="border border-emerald-900/50 rounded-2xl overflow-hidden mb-8 relative animate-fade-in-up">
                 <div className="bg-slate-900/80 px-6 py-3 border-b border-emerald-900/50 flex justify-between items-center bg-gradient-to-r from-slate-900 to-emerald-950/30">
                    <div className="flex items-center gap-2 text-emerald-300 font-mono text-sm font-bold tracking-wider">
                        <Bot className="w-4 h-4" />
                        AGENT 3 | EXPERIMENT PLANNER
                    </div>
                    {synthesis && (
                        <span className="text-xs text-emerald-500 flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3" /> Complete
                        </span>
                    )}
                </div>
                <div className="p-6 bg-slate-900/30">
                    <p className="text-slate-400 mb-6 max-w-3xl">
                      This agent has designed specific, actionable experiments to test the critical risks identified by Agent 2.
                    </p>
                    <ExperimentList plan={experiments} />
                </div>
            </div>
        )}
      </div>

       {/* TRIGGER ZONE 3 (Synthesis) */}
       {experiments && (
        <div className="flex flex-col items-center justify-center -my-4 relative z-10">
          <div className="h-8 w-px bg-slate-700"></div>
          {!synthesis && (
              <button
              onClick={handleScrollToSynthesis}
              disabled={isSynthesizing}
              className={`
                group relative flex items-center justify-center gap-4 px-8 py-4 
                bg-slate-900 hover:bg-slate-800 text-white rounded-2xl border border-amber-500/50
                shadow-[0_0_30px_-5px_rgba(245,158,11,0.3)] transition-all active:scale-95
                disabled:opacity-70 disabled:cursor-not-allowed w-full max-w-2xl
              `}
            >
              <div className="flex flex-col items-start text-left">
                  <span className="text-xs font-mono text-amber-400 font-bold tracking-widest mb-1">EXECUTIVE SUMMARY</span>
                  <span className="font-bold text-lg">Synthesize Final Verdict</span>
              </div>
              
              {isSynthesizing ? (
                  <div className="w-8 h-8 ml-auto border-2 border-amber-500/30 border-t-amber-500 rounded-full animate-spin" />
              ) : (
                  <div className="ml-auto bg-amber-600 p-2 rounded-lg group-hover:bg-amber-500 transition-colors">
                      <Scale className="w-5 h-5" />
                  </div>
              )}
            </button>
          )}
          <div className="h-8 w-px bg-slate-700"></div>
        </div>
      )}

      {/* AGENT 4 SECTION */}
      <div ref={synthesisRef} className="scroll-mt-8">
        {synthesis && (
            <div className="border border-amber-900/50 rounded-2xl overflow-hidden mb-8 relative animate-fade-in-up">
                 <div className="bg-slate-900/80 px-6 py-3 border-b border-amber-900/50 flex justify-between items-center bg-gradient-to-r from-slate-900 to-amber-950/30">
                    <div className="flex items-center gap-2 text-amber-300 font-mono text-sm font-bold tracking-wider">
                        <Bot className="w-4 h-4" />
                        AGENT 4 | CONFIDENCE SYNTHESIZER
                    </div>
                    {stakeholders && (
                        <span className="text-xs text-emerald-500 flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3" /> Complete
                        </span>
                    )}
                </div>
                <div className="p-6 bg-slate-900/30">
                    <p className="text-slate-400 mb-6 max-w-3xl">
                      Final executive synthesis based on decomposition, risks, and proposed experiments.
                    </p>
                    <ConfidenceSummary synthesis={synthesis} />
                </div>
            </div>
        )}
      </div>

      {/* TRIGGER ZONE 4 (Stakeholders) */}
      {synthesis && (
        <div className="flex flex-col items-center justify-center -my-4 relative z-10">
          <div className="h-8 w-px bg-slate-700"></div>
          {!stakeholders && (
              <button
              onClick={handleScrollToStakeholders}
              disabled={isSimulatingStakeholders}
              className={`
                group relative flex items-center justify-center gap-4 px-8 py-4 
                bg-slate-900 hover:bg-slate-800 text-white rounded-2xl border border-rose-500/50
                shadow-[0_0_30px_-5px_rgba(244,63,94,0.3)] transition-all active:scale-95
                disabled:opacity-70 disabled:cursor-not-allowed w-full max-w-2xl
              `}
            >
              <div className="flex flex-col items-start text-left">
                  <span className="text-xs font-mono text-rose-400 font-bold tracking-widest mb-1">HUMAN LAYER</span>
                  <span className="font-bold text-lg">Simulate Stakeholder Reactions</span>
              </div>
              
              {isSimulatingStakeholders ? (
                  <div className="w-8 h-8 ml-auto border-2 border-rose-500/30 border-t-rose-500 rounded-full animate-spin" />
              ) : (
                  <div className="ml-auto bg-rose-600 p-2 rounded-lg group-hover:bg-rose-500 transition-colors">
                      <Users className="w-5 h-5" />
                  </div>
              )}
            </button>
          )}
          <div className="h-8 w-px bg-slate-700"></div>
        </div>
      )}

      {/* AGENT 5 SECTION */}
      <div ref={stakeholdersRef} className="scroll-mt-8">
        {stakeholders && (
            <div className="border border-rose-900/50 rounded-2xl overflow-hidden mb-8 relative animate-fade-in-up">
                 <div className="bg-slate-900/80 px-6 py-3 border-b border-rose-900/50 flex justify-between items-center bg-gradient-to-r from-slate-900 to-rose-950/30">
                    <div className="flex items-center gap-2 text-rose-300 font-mono text-sm font-bold tracking-wider">
                        <Bot className="w-4 h-4" />
                        AGENT 5 | STAKEHOLDER SIMULATOR
                    </div>
                </div>
                <div className="p-6 bg-slate-900/30">
                    <p className="text-slate-400 mb-6 max-w-3xl">
                      Simulated reactions from key political players within the organization.
                    </p>
                    <StakeholderReactions analysis={stakeholders} />
                </div>
            </div>
        )}
      </div>

    </div>
  );
};