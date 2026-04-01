require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const reviewRoutes = require('./routes/review');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware Setup
app.use(cors());
app.use(express.json());

// Main Code Review Route
app.use('/api/review', reviewRoutes);

// Database Connection & Server Boot
const startServer = async () => {
  try {
    if (!process.env.MONGODB_URI) {
      console.warn("⚠️ Warning: MONGODB_URI is not defined in .env! Database connection will fail.");
    } else {
      await mongoose.connect(process.env.MONGODB_URI);
      console.log('✅ Connected to MongoDB');
    }

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });

  } catch (error) {
    console.error('❌ Failed to connect to MongoDB:', error.message);
    process.exit(1);
  }
};

startServer();
