import React, { useState, useRef } from 'react';

interface InputSectionProps {
  onAnalyze: (text?: string, imageBase64?: string) => void;
  isLoading: boolean;
}

const InputSection: React.FC<InputSectionProps> = ({ onAnalyze, isLoading }) => {
  const [activeTab, setActiveTab] = useState<'text' | 'image'>('text');
  const [text, setText] = useState('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleTextSubmit = () => {
    if (text.trim() && !isLoading) {
      onAnalyze(text.trim(), undefined);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setImagePreview(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageSubmit = () => {
    if (imagePreview && !isLoading) {
      onAnalyze(undefined, imagePreview);
    }
  };

  const activeTabStyle = "text-emerald-700 bg-white shadow-sm font-semibold rounded-lg";
  const inactiveTabStyle = "text-slate-500 hover:text-slate-700 hover:bg-slate-50 rounded-lg";

  return (
    <div className="w-full max-w-2xl mx-auto bg-white/60 backdrop-blur-xl border border-white p-6 sm:p-8 rounded-3xl shadow-xl shadow-slate-200/50">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-extrabold text-slate-800 tracking-tight">What's in your food?</h2>
        <p className="text-slate-500 mt-2">Paste ingredients or snap a photo of the label.</p>
      </div>

      <div className="flex p-1 bg-slate-100/50 rounded-xl mb-6">
        <button
          onClick={() => setActiveTab('text')}
          className={`flex-1 py-2.5 transition-all text-sm ${activeTab === 'text' ? activeTabStyle : inactiveTabStyle}`}
        >
          Paste Text
        </button>
        <button
          onClick={() => setActiveTab('image')}
          className={`flex-1 py-2.5 transition-all text-sm ${activeTab === 'image' ? activeTabStyle : inactiveTabStyle}`}
        >
          Upload Image
        </button>
      </div>

      <div className="min-h-[250px] flex flex-col justify-between">
        {activeTab === 'text' && (
          <div className="flex flex-col h-full animate-fade-in-up">
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="e.g. Sugar, Corn Syrup, Modified Food Starch, Artificial Colors..."
              className="w-full flex-grow p-4 bg-white border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all resize-none custom-scrollbar"
              rows={6}
            />
            <button
              onClick={handleTextSubmit}
              disabled={!text.trim() || isLoading}
              className="mt-4 w-full py-3.5 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white rounded-xl font-bold tracking-wide shadow-lg shadow-emerald-500/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
               Analyze Ingredients
            </button>
          </div>
        )}

        {activeTab === 'image' && (
          <div className="flex flex-col h-full animate-fade-in-up">
            {!imagePreview ? (
              <div 
                onClick={() => fileInputRef.current?.click()}
                className="flex-grow flex flex-col items-center justify-center p-8 border-2 border-dashed border-slate-300 rounded-xl bg-slate-50 hover:bg-slate-100 cursor-pointer transition-colors"
              >
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm mb-4">
                  <svg className="w-8 h-8 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"></path>
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  </svg>
                </div>
                <p className="text-slate-600 font-medium">Click to upload label</p>
                <p className="text-slate-400 text-sm mt-1">PNG, JPG up to 5MB</p>
              </div>
            ) : (
              <div className="flex-grow flex flex-col items-center relative">
                 <img src={imagePreview} alt="Preview" className="max-h-[220px] object-contain rounded-xl border border-slate-200" />
                 <button 
                  onClick={() => setImagePreview(null)}
                  className="absolute -top-3 -right-3 bg-red-500 text-white rounded-full p-2 shadow-lg hover:bg-red-600 transition"
                 >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                 </button>
              </div>
            )}
            
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleImageUpload} 
              accept="image/*" 
              className="hidden" 
            />

            <button
              onClick={handleImageSubmit}
              disabled={!imagePreview || isLoading}
              className="mt-4 w-full py-3.5 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white rounded-xl font-bold tracking-wide shadow-lg shadow-emerald-500/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
               Analyze Label
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default InputSection;
