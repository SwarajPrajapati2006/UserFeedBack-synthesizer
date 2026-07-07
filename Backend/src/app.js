const express = require('express');
const cors = require('cors');
const app = express();

// Middleware
app.use(cors()); // Allow cross-origin requests
app.use(express.json()); // Parse JSON payloads

// Import Routes
const feedbackRoutes = require('./routes/feedbackRoutes');
const authRoutes = require('./routes/authRoutes');
const summaryRoutes = require('./routes/summaryRoutes');

// Mount Routes
app.use('/api/feedback', feedbackRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/summary', summaryRoutes);

// Centralized Error Handling Middleware (must be at the end)
const errorHandler = require('./middlewares/errorHandler');
app.use(errorHandler);

module.exports = app;