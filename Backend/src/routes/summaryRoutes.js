const express = require('express');
const router = express.Router();
const { generateFeedbackSummary } = require('../controllers/summaryController');
const { protect } = require('../middlewares/authMiddleware');

// @route   POST /api/summary/generate
// @desc    Generate an AI summary of feedback for a given product or list of IDs
// @access  Private (logged-in users only)
router.post('/generate', protect, generateFeedbackSummary);

module.exports = router;
