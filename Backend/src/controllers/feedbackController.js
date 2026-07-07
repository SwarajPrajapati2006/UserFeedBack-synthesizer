const Feedback = require('../models/Feedback');
const { analyzeSentiment } = require('../services/sentimentService');
const { classifyCluster } = require('../services/clusterService');
const { calculateUrgency, calculatePriority, determineActionTag } = require('../services/priorityService');
const { findDuplicate } = require('../utils/duplicateChecker');

/**
 * POST /api/feedback
 * Runs the full feedback synthesis pipeline
 */
const createFeedback = async (req, res, next) => {
    try {
        const { text, source, productName } = req.body;

        // 1. Analyze Sentiment
        const { score: sentimentScore, label: sentimentLabel } = analyzeSentiment(text);

        // 2. Classify into Cluster
        const cluster = classifyCluster(text);

        // 3. Calculate Urgency
        const urgencyScore = calculateUrgency(text);

        // 4. Duplicate Check
        // Fetch recent feedback to compare against (e.g., last 100 to save memory)
        const recentFeedback = await Feedback.find().sort({ createdAt: -1 }).limit(100);
        const duplicateId = findDuplicate(text, recentFeedback);

        // 5. Calculate Priority
        // Get count of existing feedback in the same cluster
        const clusterFrequency = await Feedback.countDocuments({ cluster });
        const priorityScore = calculatePriority(clusterFrequency, sentimentScore, urgencyScore);

        // 6. Determine Action Tag
        const actionTag = determineActionTag(priorityScore);

        // 7. Save to Database
        const newFeedback = new Feedback({
            text,
            source,
            productName,
            sentimentLabel,
            sentimentScore,
            urgencyScore,
            cluster,
            priorityScore,
            actionTag,
            isDuplicateOf: duplicateId,
            createdBy: req.user.id // Attached from auth middleware
        });

        const savedFeedback = await newFeedback.save();

        res.status(201).json({
            success: true,
            data: savedFeedback
        });
    } catch (error) {
        next(error); // Pass to centralized error handler
    }
};

/**
 * GET /api/feedback
 * Returns all feedback sorted by newest first
 */
const getAllFeedback = async (req, res, next) => {
    try {
        const feedbacks = await Feedback.find().sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            count: feedbacks.length,
            data: feedbacks
        });
    } catch (error) {
        next(error);
    }
};

/**
 * GET /api/feedback/shortlist
 * Returns top 10 non-duplicate feedback sorted by priorityScore descending
 */
const getShortlist = async (req, res, next) => {
    try {
        const shortlist = await Feedback.find({ isDuplicateOf: null })
            .sort({ priorityScore: -1 })
            .limit(10);
            
        res.status(200).json({
            success: true,
            count: shortlist.length,
            data: shortlist
        });
    } catch (error) {
        next(error);
    }
};

/**
 * GET /api/feedback/clusters
 * MongoDB aggregation grouping by cluster with count + average sentiment
 */
const getClusters = async (req, res, next) => {
    try {
        const clusterStats = await Feedback.aggregate([
            {
                $group: {
                    _id: '$cluster',
                    count: { $sum: 1 },
                    averageSentiment: { $avg: '$sentimentScore' }
                }
            },
            {
                $sort: { count: -1 } // Sort by most frequent cluster
            }
        ]);

        res.status(200).json({
            success: true,
            data: clusterStats
        });
    } catch (error) {
        next(error);
    }
};

/**
 * GET /api/feedback/trend
 * MongoDB aggregation grouping by date with average sentiment per day
 */
const getTrend = async (req, res, next) => {
    try {
        const trendData = await Feedback.aggregate([
            {
                // Group by the date portion of createdAt
                $group: {
                    _id: {
                        $dateToString: { format: '%Y-%m-%d', date: '$createdAt' }
                    },
                    averageSentiment: { $avg: '$sentimentScore' },
                    count: { $sum: 1 }
                }
            },
            {
                $sort: { _id: 1 } // Sort chronologically (oldest first)
            }
        ]);

        res.status(200).json({
            success: true,
            data: trendData
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    createFeedback,
    getAllFeedback,
    getShortlist,
    getClusters,
    getTrend
};
