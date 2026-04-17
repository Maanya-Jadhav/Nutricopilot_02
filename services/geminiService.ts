import { GoogleGenAI, Type } from '@google/genai';
import { AnalysisResult } from '../types';

export const analyzeIngredients = async (input: { text?: string, imageBase64?: string }): Promise<AnalysisResult> => {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    const ai = new GoogleGenAI({ apiKey });
    const contents: any[] = [];
    
    if (input.text) {
        contents.push("Food label ingredients string: " + input.text);
    }
    
    if (input.imageBase64) {
        let mimeType = 'image/png';
        let data = input.imageBase64;
        
        if (data.startsWith('data:')) {
            const matches = data.match(/^data:(image\/[a-zA-Z]+);base64,(.*)$/);
            if (matches && matches.length === 3) {
                mimeType = matches[1];
                data = matches[2];
            }
        }
        
        contents.push({
            inlineData: {
                data,
                mimeType
            }
        });
    }

    if (contents.length === 0) {
        throw new Error("No input provided for analysis.");
    }

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents,
            config: {
                systemInstruction: `You are an expert nutritionist and health coach decision engine. Analyze the provided ingredients list or food label image.
1. Determine the likely intent of the person scanning this (e.g., "Parent checking for kids", "General wellness", "Weight management", "Checking for additives").
2. Provide a brief summary of the healthiness.
3. Assign a verdict ('Excellent', 'Good', 'Fair', 'Poor', 'Avoid').
4. Calculate a healthScore between 0 and 100.
5. Determine processingLevel ('Unprocessed', 'Minimally Processed', 'Processed', 'Ultra-Processed').
6. Extract keyInsights with a type ('positive', 'negative', 'neutral') and a short text.
7. Explain realistic trade-offs of eating this product.
8. State any uncertainty if the label is blurry, missing amounts, or vague.`,
                responseMimeType: 'application/json',
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        intent: { type: Type.STRING },
                        summary: { type: Type.STRING },
                        verdict: { type: Type.STRING, enum: ['Excellent', 'Good', 'Fair', 'Poor', 'Avoid'] },
                        healthScore: { type: Type.NUMBER },
                        processingLevel: { type: Type.STRING, enum: ['Unprocessed', 'Minimally Processed', 'Processed', 'Ultra-Processed'] },
                        keyInsights: {
                            type: Type.ARRAY,
                            items: {
                                type: Type.OBJECT,
                                properties: {
                                    type: { type: Type.STRING, enum: ['positive', 'negative', 'neutral'] },
                                    text: { type: Type.STRING }
                                },
                                required: ['type', 'text']
                            }
                        },
                        tradeOffs: { type: Type.STRING },
                        uncertainty: { type: Type.STRING }
                    },
                    required: ['intent', 'summary', 'verdict', 'healthScore', 'processingLevel', 'keyInsights', 'tradeOffs', 'uncertainty']
                }
            }
        });

        if (!response.text) {
            throw new Error("API returned no content.");
        }

        const data: AnalysisResult = JSON.parse(response.text);
        return data;

    } catch (error) {
        console.error("Gemini analysis error:", error);
        throw new Error("Failed to analyze ingredients. Make sure your API key is correct.");
    }
};
