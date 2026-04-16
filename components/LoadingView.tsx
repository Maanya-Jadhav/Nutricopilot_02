import React, { useEffect, useState } from 'react';

const loadingPhrases = [
  "Scanning ingredient list...",
  "Cross-referencing health databases...",
  "Evaluating additive risks...",
  "Calculating nutritional trade-offs...",
  "Finalizing health verdict..."
];

const LoadingView: React.FC = () => {
  const [phraseIndex, setPhraseIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPhraseIndex(prev => (prev + 1) % loadingPhrases.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full flex justify-center py-20">
      <div className="relative flex flex-col items-center">
        {/* Animated Orbits */}
        <div className="w-32 h-32 relative flex flex-col items-center justify-center">
          <div className="absolute inset-0 border-4 border-transparent border-t-emerald-500 rounded-full animate-spin" style={{ animationDuration: '3s' }}></div>
          <div className="absolute inset-2 border-4 border-transparent border-t-teal-400 rounded-full animate-spin" style={{ animationDuration: '2s', animationDirection: 'reverse' }}></div>
          <div className="absolute inset-4 border-4 border-transparent border-t-cyan-300 rounded-full animate-spin" style={{ animationDuration: '1.5s' }}></div>

          {/* Core */}
          <div className="w-8 h-8 bg-gradient-to-tr from-emerald-400 to-teal-500 rounded-full shadow-lg shadow-emerald-500/50 animate-pulse"></div>
        </div>

        <h3 className="mt-8 text-xl font-bold tracking-tight text-slate-800">AI is reasoning...</h3>
        <p className="text-slate-500 mt-2 min-w-[250px] text-center h-6 overflow-hidden transition-all duration-300 ease-in-out">
          {loadingPhrases[phraseIndex]}
        </p>
      </div>
    </div>
  );
};

export default LoadingView;
