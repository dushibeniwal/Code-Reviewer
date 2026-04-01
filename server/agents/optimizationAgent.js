const { callLLM } = require('../services/llmService');

const optimizationAgent = async (code, language) => {
  const prompt = `You are a code optimization expert. Analyze this ${language} code for performance issues, redundant logic, and inefficiencies. Suggest specific improvements with reasoning. Code: ${code}`;
  
  try {
    return await callLLM(prompt);
  } catch (error) {
    return "Error generating optimization suggestions. " + error.message;
  }
};

module.exports = { optimizationAgent };
