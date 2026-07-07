/**
 * Calculates urgency based on specific keywords
 * @param {string} text - The feedback text
 * @returns {number} - Urgency score (0 or 1)
 */
const calculateUrgency = (text) => {
    const lowercaseText = text.toLowerCase();
    const urgentKeywords = ['crash', 'broken', 'refund', 'urgent', 'error', 'bug', 'fail', 'down', 'not working'];
    
    for (const keyword of urgentKeywords) {
        if (lowercaseText.includes(keyword)) {
            return 1; // High urgency
        }
    }
    
    return 0; // Normal urgency
};

/**
 * Calculates priority score based on frequency, sentiment, and urgency
 * @param {number} clusterFrequency - Count of feedback in the same cluster
 * @param {number} sentimentScore - The raw sentiment score
 * @param {number} urgencyScore - The calculated urgency score
 * @returns {number} - The final priority score between 0 and 1
 */
const calculatePriority = (clusterFrequency, sentimentScore, urgencyScore) => {
    // frequency = min(count of feedback in same cluster / 10, 1)
    const frequency = Math.min(clusterFrequency / 10, 1);
    
    // Normalize negative sentiment (assuming worst score is around -5 for typical short feedback)
    // If score is positive or 0, normalizedNegativeSentiment is 0
    // If score is negative, map it to 0-1 range. Example: -5 -> 1.0
    let normalizedNegativeSentiment = 0;
    if (sentimentScore < 0) {
        // Cap the max negative impact at -5
        const cappedScore = Math.max(sentimentScore, -5);
        normalizedNegativeSentiment = Math.abs(cappedScore) / 5;
    }

    // priority = (frequency * 0.4) + (normalizedNegativeSentiment * 0.4) + (urgencyScore * 0.2)
    const priority = (frequency * 0.4) + (normalizedNegativeSentiment * 0.4) + (urgencyScore * 0.2);
    
    // Ensure priority stays within 0 to 1 bounds
    return Math.min(Math.max(priority, 0), 1);
};

/**
 * Determines the action tag based on the priority score
 * @param {number} priorityScore - The calculated priority score
 * @returns {string} - The action tag
 */
const determineActionTag = (priorityScore) => {
    if (priorityScore >= 0.7) return 'Fix Now';
    if (priorityScore >= 0.4) return 'Research';
    if (priorityScore >= 0.2) return 'Nice to Have';
    return 'Low Priority';
};

module.exports = {
    calculateUrgency,
    calculatePriority,
    determineActionTag
};
