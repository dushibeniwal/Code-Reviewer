const { callLLM } = require('../services/llmService');

const syntaxAgent = async (code, language) => {
  const prompt = `You are a code syntax analyzer. Given the following ${language} code, identify all syntax errors, potential bugs, and undefined variables. Be specific about line-level issues. Code: ${code}`;
  
  try {
    return await callLLM(prompt);
  } catch (error) {
    return "Error detecting syntax issues. " + error.message;
  }
};

module.exports = { syntaxAgent };
