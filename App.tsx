import React, { useState } from 'react';
import { AppState, AnalysisResult } from './types';
import { analyzeIngredients } from './services/geminiService.ts';
import InputSection from './components/InputSection.tsx';
import AnalysisResultView from './components/AnalysisResultView.tsx';
import LoadingView from './components/LoadingView.tsx';

const App: React.FC = () => {
  const [state, setState] = useState<AppState>({
    status: 'idle',
    result: null,
    error: null,
    imagePreview: null,
    textInput: '',
  });

  const handleAnalyze = async (text?: string, imageBase64?: string) => {
    setState(prev => ({ ...prev, status: 'analyzing', error: null }));

    try {
      const result = await analyzeIngredients({ text, imageBase64 });
      setState({
        status: 'success',
        result,
        error: null,
        imagePreview: null,
        textInput: text || ''
      });
    } catch (err: any) {
      setState(prev => ({
        ...prev,
        status: 'error',
        error: err.message || "Something went wrong"
      }));
    }
  };

  const reset = () => {
    setState({
      status: 'idle',
      result: null,
      error: null,
      imagePreview: null,
      textInput: ''
    });
  };

  return (
    <div className="min-h-screen flex flex-col items-center p-4 md:p-6 lg:p-8">
      {/* Navbar */}
      <nav className="w-full max-w-6xl flex justify-between items-center mb-8 md:mb-16 glass-panel rounded-2xl px-6 py-4 border border-white/50 shadow-sm sticky top-4 z-40">
        <div className="flex items-center space-x-3 cursor-pointer" onClick={reset}>
          <div className="bg-gradient-to-tr from-emerald-500 to-teal-600 p-2.5 rounded-xl shadow-lg shadow-emerald-500/20">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          </div>
          <div>
            <span className="font-bold text-xl tracking-tight text-slate-800 block leading-none">NutriCoPilot</span>
            <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest">AI Decision Engine</span>
          </div>
        </div>
      </nav>

      <main className="w-full max-w-5xl flex-grow flex flex-col items-center justify-center relative z-10">
        {state.status === 'idle' && (
          <InputSection onAnalyze={handleAnalyze} isLoading={false} />
        )}

        {state.status === 'analyzing' && (
          <LoadingView />
        )}

        {state.status === 'success' && state.result && (
          <AnalysisResultView result={state.result} onReset={reset} />
        )}

        {state.status === 'error' && (
          <div className="text-center space-y-6 max-w-md animate-fade-in-up">
            <div className="bg-white p-8 rounded-3xl border border-red-100 shadow-xl shadow-red-500/5">
              <div className="w-16 h-16 bg-red-50 text-red-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
              <h3 className="font-bold text-xl text-gray-900 mb-2">Analysis Failed</h3>
              <p className="text-gray-500">{state.error}</p>
            </div>
            <button onClick={reset} className="px-8 py-3 bg-white border border-gray-200 text-gray-600 font-semibold rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all shadow-sm">
              Try Again
            </button>
          </div>
        )}
      </main>

      <footer className="mt-16 text-center text-slate-400 text-xs py-6">
        <p>AI-Generated advice. Consult a professional for medical needs.</p>
      </footer>
    </div>
  );
};

export default App;