/**
 * Validation Middleware for Feedback
 * Ensures the 'text' field exists and isn't empty before proceeding to the controller
 */
const validateFeedback = (req, res, next) => {
    const { text } = req.body;

    if (!text || typeof text !== 'string' || text.trim() === '') {
        res.status(400); // Bad Request
        return next(new Error('Feedback text is required and cannot be empty'));
    }

    // If valid, move to the next middleware/controller
    next();
};

module.exports = validateFeedback;
