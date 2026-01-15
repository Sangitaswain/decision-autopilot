import React from 'react';
import { StakeholderAnalysis, Sentiment } from '../types';
import { MessageSquareQuote, Users, ThumbsUp, ThumbsDown, Minus, HelpCircle, Zap } from 'lucide-react';

interface StakeholderReactionsProps {
  analysis: StakeholderAnalysis;
}

const SentimentIcon: React.FC<{ sentiment: Sentiment }> = ({ sentiment }) => {
  switch (sentiment) {
    case 'SUPPORTIVE': return <ThumbsUp className="w-4 h-4 text-emerald-400" />;
    case 'OPPOSED': return <ThumbsDown className="w-4 h-4 text-red-400" />;
    case 'SKEPTICAL': return <HelpCircle className="w-4 h-4 text-orange-400" />;
    case 'NEUTRAL': return <Minus className="w-4 h-4 text-slate-400" />;
  }
};

const getSentimentColor = (sentiment: Sentiment) => {
  switch (sentiment) {
    case 'SUPPORTIVE': return "border-emerald-500/50 bg-emerald-950/20";
    case 'OPPOSED': return "border-red-500/50 bg-red-950/20";
    case 'SKEPTICAL': return "border-orange-500/50 bg-orange-950/20";
    case 'NEUTRAL': return "border-slate-500/50 bg-slate-900/40";
  }
};

export const StakeholderReactions: React.FC<StakeholderReactionsProps> = ({ analysis }) => {
  return (
    <div className="animate-fade-in-up">
      <div className="bg-rose-950/20 border border-rose-900/50 rounded-xl p-5 mb-8">
        <h3 className="text-rose-400 font-bold mb-2 flex items-center gap-2">
          <Users className="w-5 h-5" />
          Consensus Prediction
        </h3>
        <p className="text-slate-200 text-lg font-medium leading-relaxed mb-4">
          {analysis.consensus_prediction}
        </p>
        <div className="flex flex-wrap gap-2">
            {analysis.political_friction_points.map((point, i) => (
                <span key={i} className="text-xs flex items-center gap-1 bg-rose-950/40 px-2 py-1 rounded text-rose-200 border border-rose-900/50">
                    <Zap className="w-3 h-3" />
                    {point}
                </span>
            ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {analysis.stakeholders.map((person, index) => (
          <div key={index} className={`relative rounded-xl p-6 border ${getSentimentColor(person.sentiment)} transition-transform hover:scale-[1.01]`}>
            <div className="flex justify-between items-start mb-4">
                <div>
                    <h4 className="text-xl font-bold text-white">{person.role}</h4>
                    <div className="flex items-center gap-2 mt-1">
                        <SentimentIcon sentiment={person.sentiment} />
                        <span className="text-xs font-mono uppercase tracking-wider text-slate-400">{person.sentiment}</span>
                    </div>
                </div>
                <div className="flex flex-col items-end">
                    <span className={`text-2xl font-bold ${person.alignment_score > 70 ? 'text-emerald-400' : person.alignment_score < 40 ? 'text-red-400' : 'text-orange-400'}`}>
                        {person.alignment_score}%
                    </span>
                    <span className="text-[10px] uppercase text-slate-500">Alignment</span>
                </div>
            </div>

            <div className="relative bg-black/20 rounded-lg p-4 mb-3 italic text-slate-300 text-sm">
                <MessageSquareQuote className="absolute -top-2 -left-2 w-6 h-6 text-slate-600 bg-slate-900 rounded-full p-1" />
                "{person.simulated_quote}"
            </div>

            <p className="text-xs text-slate-500 mt-2">
                <span className="font-bold text-slate-400">Main Motivation: </span>
                {person.key_concern_or_motivation}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};