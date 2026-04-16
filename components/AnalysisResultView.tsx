import React from 'react';
import { AnalysisResult } from '../types';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

interface AnalysisResultViewProps {
  result: AnalysisResult;
  onReset: () => void;
}

const AnalysisResultView: React.FC<AnalysisResultViewProps> = ({ result, onReset }) => {
  const getVerdictColor = (verdict: string) => {
    switch (verdict) {
      case 'Excellent': return 'text-emerald-500 bg-emerald-50 border-emerald-200';
      case 'Good': return 'text-teal-500 bg-teal-50 border-teal-200';
      case 'Fair': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'Poor': return 'text-orange-500 bg-orange-50 border-orange-200';
      case 'Avoid': return 'text-red-500 bg-red-50 border-red-200';
      default: return 'text-slate-500 bg-slate-50 border-slate-200';
    }
  };

  const getVerdictTheme = (verdict: string) => {
    switch (verdict) {
      case 'Excellent': return '#10b981';
      case 'Good': return '#14b8a6';
      case 'Fair': return '#ca8a04';
      case 'Poor': return '#f97316';
      case 'Avoid': return '#ef4444';
      default: return '#64748b';
    }
  };

  const pieData = [
    { name: 'Score', value: result.healthScore },
    { name: 'Empty', value: 100 - result.healthScore }
  ];
  const pieColors = [getVerdictTheme(result.verdict), '#e2e8f0'];

  return (
    <div className="w-full max-w-5xl animate-fade-in-up space-y-6">
      <div className="flex justify-between items-center bg-white/60 backdrop-blur-md px-6 py-4 rounded-2xl border border-white/50 shadow-sm">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Scan Complete</h2>
          <p className="text-sm text-slate-500 mt-1">Intent matched: <span className="font-semibold text-emerald-600">{result.intent}</span></p>
        </div>
        <button 
          onClick={onReset}
          className="px-5 py-2.5 bg-slate-800 text-white font-medium rounded-xl hover:bg-slate-700 transition shadow-lg shadow-slate-800/20"
        >
          New Scan
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Main Verdict Card */}
        <div className="md:col-span-1 bg-white p-6 rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/50 flex flex-col items-center justify-center text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-emerald-100 to-transparent rounded-bl-full opacity-50"></div>
          <h3 className="text-slate-500 font-semibold mb-4 z-10">Health Score</h3>
          
          <div className="w-48 h-48 relative z-10">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  startAngle={180}
                  endAngle={0}
                  dataKey="value"
                  stroke="none"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={pieColors[index % pieColors.length]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center -mt-8">
              <span className="text-5xl font-black text-slate-800 tracking-tighter">{result.healthScore}</span>
              <span className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">/ 100</span>
            </div>
          </div>

          <div className={`mt-2 px-6 py-2 rounded-full border font-bold tracking-wide uppercase text-sm ${getVerdictColor(result.verdict)} z-10`}>
            {result.verdict}
          </div>
        </div>

        {/* Summary Details */}
        <div className="md:col-span-2 flex flex-col gap-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex-grow">
             <h3 className="text-lg font-bold text-slate-800 mb-3 border-b border-slate-100 pb-3">Nutritional Summary</h3>
             <p className="text-slate-600 leading-relaxed text-lg">{result.summary}</p>
             
             <div className="mt-6 flex flex-wrap gap-3">
                 <div className="bg-slate-50 px-4 py-2 rounded-lg border border-slate-100 text-sm">
                     <span className="text-slate-500 block text-xs uppercase tracking-wider font-semibold mb-1">Processing Level</span>
                     <span className="font-bold text-slate-700">{result.processingLevel}</span>
                 </div>
                 {result.uncertainty && result.uncertainty.toLowerCase() !== "none" && (
                    <div className="bg-yellow-50 px-4 py-2 rounded-lg border border-yellow-100 text-sm flex-1">
                        <span className="text-yellow-600 block text-xs uppercase tracking-wider font-semibold mb-1">AI Note</span>
                        <span className="font-medium text-yellow-800 line-clamp-2">{result.uncertainty}</span>
                    </div>
                 )}
             </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
         <div className="bg-white p-6 justify-center rounded-3xl border border-slate-100 shadow-sm">
            <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center space-x-2">
                <svg className="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                <span>Key Insights</span>
            </h3>
            <div className="space-y-3">
                {result.keyInsights.map((insight, idx) => (
                    <div key={idx} className="flex items-start space-x-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
                        <div className="mt-0.5">
                            {insight.type === 'positive' && <div className="w-2 h-2 rounded-full bg-emerald-500 mt-1.5" />}
                            {insight.type === 'negative' && <div className="w-2 h-2 rounded-full bg-red-400 mt-1.5" />}
                            {insight.type === 'neutral' && <div className="w-2 h-2 rounded-full bg-slate-300 mt-1.5" />}
                        </div>
                        <p className="text-slate-700 text-sm leading-relaxed">{insight.text}</p>
                    </div>
                ))}
            </div>
         </div>

         <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex flex-col">
            <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center space-x-2">
                <svg className="w-5 h-5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                <span>Health Trade-offs</span>
            </h3>
            <div className="bg-indigo-50/50 p-5 rounded-2xl border border-indigo-100 flex-grow content-center">
               <p className="text-indigo-900/80 leading-relaxed font-medium">
                   {result.tradeOffs}
               </p>
            </div>
         </div>
      </div>
    </div>
  );
};

export default AnalysisResultView;
