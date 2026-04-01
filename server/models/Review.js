const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  code: { type: String, required: true },
  language: { type: String, required: true },
  response: { type: Object, required: true },
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Review', reviewSchema);
