const express = require('express');
const router = express.Router();
const {
    createFeedback,
    getAllFeedback,
    getShortlist,
    getClusters,
    getTrend
} = require('../controllers/feedbackController');
const validateFeedback = require('../middlewares/validateFeedback');
const { protect } = require('../middlewares/authMiddleware');

// @route   POST /api/feedback
// @desc    Run full pipeline and create feedback
// @access  Private
router.post('/', protect, validateFeedback, createFeedback);

// @route   GET /api/feedback
// @desc    Get all feedback
router.get('/', getAllFeedback);

// @route   GET /api/feedback/shortlist
// @desc    Get top 10 non-duplicate feedback sorted by priority
router.get('/shortlist', getShortlist);

// @route   GET /api/feedback/clusters
// @desc    Get aggregation of feedback by cluster
router.get('/clusters', getClusters);

// @route   GET /api/feedback/trend
// @desc    Get average sentiment trend over time
router.get('/trend', getTrend);

module.exports = router;
