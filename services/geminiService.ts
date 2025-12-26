
import { GoogleGenAI, Type } from "@google/genai";
import { BlogPost } from "../types";

// Only call this if an error occurs to avoid pre-emptive blocking by the environment
const handleKeyError = async () => {
  if (typeof window !== 'undefined' && window.aistudio) {
    try {
      await window.aistudio.openSelectKey();
    } catch (e) {
      console.error("Failed to open key dialog", e);
    }
  }
};

export const generateDesignInsights = async (): Promise<BlogPost[]> => {
  // Always create a new instance right before making an API call to ensure it uses the most up-to-date API key
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: "Generate 3 premium design trend blog posts for a luxury design agency in 2025. Include title, short summary, and category. Language: Korean.",
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              id: { type: Type.INTEGER },
              date: { type: Type.STRING },
              category: { type: Type.STRING },
              title: { type: Type.STRING },
              summary: { type: Type.STRING },
              image: { type: Type.STRING }
            },
            required: ["id", "date", "category", "title", "summary", "image"]
          }
        }
      }
    });

    // Access .text property directly as per Gemini API best practices
    return JSON.parse(response.text || '[]');
  } catch (e: any) {
    // If the request fails with an error indicating key issues, prompt for key selection
    if (e.message?.includes("Requested entity was not found.") || e.message?.includes("API_KEY")) {
      await handleKeyError();
    }
    console.error("Failed to generate insights", e);
    return [];
  }
};
