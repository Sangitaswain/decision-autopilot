import React from 'react';
import { ResponsiveContainer, ScatterChart, Scatter, XAxis, YAxis, ZAxis, Tooltip, Cell, ReferenceLine } from 'recharts';
import { Assumption, ImpactLevel, UncertaintyLevel } from '../types';

interface AssumptionMatrixProps {
  assumptions: Assumption[];
}

export const AssumptionMatrix: React.FC<AssumptionMatrixProps> = ({ assumptions }) => {
  const mapLevelToNumber = (level: string) => {
    switch (level) {
      case 'low': return 1;
      case 'medium': return 2;
      case 'high': return 3;
      default: return 1;
    }
  };

  const data = assumptions.map((a, index) => ({
    ...a,
    x: mapLevelToNumber(a.uncertainty_level), // X axis: Uncertainty
    y: mapLevelToNumber(a.impact_level),      // Y axis: Impact
    z: 1, // Size
    id: index
  }));

  // Jitter points slightly so they don't perfectly overlap
  const jitteredData = data.map(d => ({
    ...d,
    x: d.x + (Math.random() - 0.5) * 0.4,
    y: d.y + (Math.random() - 0.5) * 0.4,
  }));

  return (
    <div className="h-[300px] w-full bg-slate-900/50 rounded-lg p-4 relative">
      <div className="absolute top-2 left-2 text-xs font-bold text-slate-500 z-10">IMPACT</div>
      <div className="absolute bottom-2 right-2 text-xs font-bold text-slate-500 z-10">UNCERTAINTY</div>
      
      <ResponsiveContainer width="100%" height="100%">
        <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
          <XAxis 
            type="number" 
            dataKey="x" 
            name="Uncertainty" 
            domain={[0.5, 3.5]} 
            ticks={[1, 2, 3]} 
            tickFormatter={(val) => {
               if(val === 1) return 'Low';
               if(val === 2) return 'Med';
               if(val === 3) return 'High';
               return '';
            }}
            stroke="#64748b"
            tick={{ fill: '#94a3b8', fontSize: 12 }}
          />
          <YAxis 
            type="number" 
            dataKey="y" 
            name="Impact" 
            domain={[0.5, 3.5]} 
            ticks={[1, 2, 3]}
            tickFormatter={(val) => {
               if(val === 1) return 'Low';
               if(val === 2) return 'Med';
               if(val === 3) return 'High';
               return '';
            }}
            stroke="#64748b"
            tick={{ fill: '#94a3b8', fontSize: 12 }}
          />
          <ZAxis type="number" dataKey="z" range={[100, 100]} />
          <Tooltip 
            cursor={{ strokeDasharray: '3 3' }}
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                const data = payload[0].payload as Assumption;
                return (
                  <div className="bg-slate-800 border border-slate-600 p-3 rounded shadow-xl text-xs max-w-xs z-50">
                    <p className="font-semibold text-white mb-1">{data.text}</p>
                    <div className="flex gap-2">
                      <span className="text-indigo-300">Impact: {data.impact_level}</span>
                      <span className="text-emerald-300">Uncertainty: {data.uncertainty_level}</span>
                    </div>
                  </div>
                );
              }
              return null;
            }}
          />
          {/* Quadrant Lines */}
          <ReferenceLine x={2} stroke="#334155" strokeDasharray="3 3" />
          <ReferenceLine y={2} stroke="#334155" strokeDasharray="3 3" />
          
          <Scatter data={jitteredData} fill="#8884d8">
            {jitteredData.map((entry, index) => {
              // Color coding based on severity
              let color = '#3b82f6'; // Default Blue (Low/Low)
              if (entry.y >= 2.5 && entry.x >= 2.5) color = '#ef4444'; // Red (High/High - Critical)
              else if (entry.y >= 2.5 || entry.x >= 2.5) color = '#f59e0b'; // Orange (High Mixed)
              else if (entry.y > 1.5 || entry.x > 1.5) color = '#10b981'; // Green (Medium)
              
              return <Cell key={`cell-${index}`} fill={color} stroke="#fff" strokeWidth={2} />;
            })}
          </Scatter>
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  );
};