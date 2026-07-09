const express = require('express');
const cors = require('cors');
const app = express();

// ──────────────────────────────────────────────────────────────
// CORS Configuration
// Uses FRONTEND_URL from .env to whitelist the React dev server.
// Falls back to localhost:5173 if not set.
// ──────────────────────────────────────────────────────────────
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true
}));

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