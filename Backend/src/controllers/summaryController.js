const Feedback = require('../models/Feedback');
const { generateSummary } = require('../services/geminiService');

/**
 * POST /api/summary/generate
 * Accepts either feedbackIds (array) or productName (string) in req.body
 * Fetches those feedbacks from DB, sends to Gemini, and returns a summary
 *
 * CACHING NOTE: For production or to avoid re-calling the API for the same data,
 * you could store the generated summary in a "Summary" collection in MongoDB,
 * keyed by productName + a hash of feedbackIds. For this hackathon, we skip caching
 * to keep the code simple. If the judges ask, mention this as a future improvement.
 */
const generateFeedbackSummary = async (req, res, next) => {
    try {
        const { feedbackIds, productName } = req.body;

        // --- Step 1: Validate input --- 
        if (!feedbackIds && !productName) {
            res.status(400);
            return next(new Error('Please provide either feedbackIds (array) or productName'));
        }

        let feedbackDocs = [];

        if (feedbackIds && Array.isArray(feedbackIds) && feedbackIds.length > 0) {
            // --- Path A: Fetch by specific feedback IDs ---
            feedbackDocs = await Feedback.find({
                _id: { $in: feedbackIds }
            })
            .limit(15) // Hard limit to avoid excessive token usage
            .select('text productName'); // Only fetch fields we need

        } else if (productName) {
            // --- Path B: Fetch latest feedback by product name ---
            feedbackDocs = await Feedback.find({ productName })
                .sort({ createdAt: -1 }) // Get newest feedback first
                .limit(10)              // 10 entries is ideal for a meaningful summary
                .select('text productName');
        }

        // Check if we found any feedback to summarize
        if (feedbackDocs.length === 0) {
            res.status(404);
            return next(new Error('No feedback found for the given input. Cannot generate summary.'));
        }

        // --- Step 2: Extract just the text strings ---
        const feedbackTexts = feedbackDocs.map(doc => doc.text);

        // --- Step 3: Call Gemini API via our service ---
        const summary = await generateSummary(feedbackTexts);

        // --- Step 4: Send the response ---
        res.status(200).json({
            success: true,
            productName: productName || 'Various Products',
            feedbackCount: feedbackDocs.length,
            summary
        });

    } catch (error) {
        next(error); // Pass to centralized error handler
    }
};

module.exports = { generateFeedbackSummary };
