import { GoogleGenAI } from "@google/genai";
import { ref } from 'vue';

// The client gets the API key from the environment variable `GEMINI_API_KEY`.
const ai = new GoogleGenAI({
  apiKey: import.meta.env.VITE_GEMINI_API_KEY || ''
});

export function useLLM(systemInstruction?: string) {
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  const generateResponse = async (prompt: string = "Explain how AI works in a few words") => {
    try {
      isLoading.value = true;
      error.value = null;

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
          systemInstruction: systemInstruction || "You are a helpful assistant.",
        }
      });

      console.log('Gemini response:', response.text);
      return response.text;
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'An error occurred';
      console.error('Error calling Gemini:', error.value);
      return null;
    } finally {
      isLoading.value = false;
    }
  };

  return {
    generateResponse,
    isLoading,
    error
  };
}
