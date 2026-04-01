const express = require('express');
const router = express.Router();
const Review = require('../models/Review');
const { syntaxAgent } = require('../agents/syntaxAgent');
const { optimizationAgent } = require('../agents/optimizationAgent');
const { complexityAgent } = require('../agents/complexityAgent');
const { explanationAgent } = require('../agents/explanationAgent');

router.post('/', async (req, res) => {
  const { code, language } = req.body;

  // 1. Input Validation
  if (!code || typeof code !== 'string' || !code.trim()) {
    return res.status(400).json({ error: "Code input cannot be empty." });
  }

  const supportedLanguages = ['Java', 'JavaScript', 'C++'];
  if (!supportedLanguages.includes(language)) {
    return res.status(400).json({ error: `Unsupported language. Use one of: ${supportedLanguages.join(', ')}` });
  }

  try {
    // 2. Parallel Processing (Syntax, Optimization, Complexity)
    const [syntaxResult, optimizationResult, complexityResult] = await Promise.all([
      syntaxAgent(code, language),
      optimizationAgent(code, language),
      complexityAgent(code, language)
    ]);

    // 3. Explanation generation (depends on previous results)
    const explanationResult = await explanationAgent(syntaxResult, optimizationResult, complexityResult);

    const responsePayload = {
      syntax: syntaxResult,
      optimization: optimizationResult,
      complexity: complexityResult,
      explanation: explanationResult
    };

    // 4. Save to Database
    const newReview = new Review({
      code,
      language,
      response: responsePayload
    });

    await newReview.save();

    // 5. Send back to client
    return res.status(200).json(responsePayload);

  } catch (error) {
    console.error("Error processing review route:", error);
    return res.status(500).json({ error: "Failed to process the code review. Please try again later." });
  }
});

router.get('/history', async (req, res) => {
  try {
    const reviews = await Review.find().sort({ timestamp: -1 }).limit(20);
    return res.status(200).json(reviews);
  } catch (error) {
    console.error("Error fetching review history:", error);
    return res.status(500).json({ error: "Failed to fetch review history." });
  }
});

module.exports = router;
