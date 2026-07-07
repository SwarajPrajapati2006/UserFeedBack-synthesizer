/**
 * Calculates word-overlap similarity between two texts.
 * Uses a basic Jaccard similarity approach (intersection / union of words).
 * 
 * @param {string} text1 - First text
 * @param {string} text2 - Second text
 * @returns {number} - Similarity score between 0 and 1
 */
const calculateSimilarity = (text1, text2) => {
    // Tokenize text into words, removing punctuation and converting to lowercase
    const getWords = (text) => {
        return text.toLowerCase().replace(/[^\w\s]/g, '').split(/\s+/).filter(word => word.length > 0);
    };

    const words1 = new Set(getWords(text1));
    const words2 = new Set(getWords(text2));

    if (words1.size === 0 && words2.size === 0) return 1.0;
    if (words1.size === 0 || words2.size === 0) return 0.0;

    // Calculate intersection (common words)
    let intersectionCount = 0;
    for (const word of words1) {
        if (words2.has(word)) {
            intersectionCount++;
        }
    }

    // Calculate union (total unique words)
    const unionCount = new Set([...words1, ...words2]).size;

    return intersectionCount / unionCount;
};

/**
 * Checks if the new text is a duplicate of any existing feedback
 * @param {string} newText - The new feedback text
 * @param {Array} existingFeedback - Array of existing feedback documents
 * @returns {string|null} - Returns the ID of the duplicate feedback, or null if no duplicate
 */
const findDuplicate = (newText, existingFeedback) => {
    const THRESHOLD = 0.7;

    for (const feedback of existingFeedback) {
        const similarity = calculateSimilarity(newText, feedback.text);
        if (similarity > THRESHOLD) {
            return feedback._id; // Match found
        }
    }

    return null; // No duplicate found
};

module.exports = {
    findDuplicate,
    calculateSimilarity // exported for testing purposes
};
