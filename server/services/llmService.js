const { GoogleGenAI } = require('@google/genai');

const callLLM = async (prompt) => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    
    // gemini-2.5-flash is extremely fast, capable, and has a generous free tier.
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        systemInstruction: "You are an expert software engineer providing precise, helpful code reviews. Output only the requested assessment.",
        temperature: 0.2, // Low temperature for more deterministic, focused analysis
      }
    });

    return response.text;
  } catch (error) {
    console.error("LLM Service Error:", error.message);
    throw new Error("Failed to process request with AI provider.");
  }
};

module.exports = { callLLM };
