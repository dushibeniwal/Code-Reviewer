const { callLLM } = require('../services/llmService');

const complexityAgent = async (code, language) => {
  const prompt = `You are an algorithms expert. Analyze this ${language} code and provide: 1) Time complexity in Big-O notation with explanation, 2) Space complexity in Big-O notation with explanation.
IMPORTANT: You MUST include the exact final time and space complexity classes in brackets anywhere in your response like this exactly: [TIME: O(N)] and [SPACE: O(1)]. Use standard variants like O(1), O(log N), O(N), O(N log N), O(N^2), etc.
Code: ${code}`;
  
  try {
    return await callLLM(prompt);
  } catch (error) {
    return "Error calculating complexity. " + error.message;
  }
};

module.exports = { complexityAgent };
