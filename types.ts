export interface AnalysisResult {
  intent: string;
  summary: string;
  verdict: 'Excellent' | 'Good' | 'Fair' | 'Poor' | 'Avoid';
  healthScore: number;
  processingLevel: 'Unprocessed' | 'Minimally Processed' | 'Processed' | 'Ultra-Processed';
  keyInsights: {
    type: 'positive' | 'negative' | 'neutral';
    text: string;
  }[];
  tradeOffs: string;
  uncertainty: string;
}

export interface AppState {
  status: 'idle' | 'analyzing' | 'success' | 'error';
  result: AnalysisResult | null;
  error: string | null;
  imagePreview: string | null;
  textInput: string;
}
