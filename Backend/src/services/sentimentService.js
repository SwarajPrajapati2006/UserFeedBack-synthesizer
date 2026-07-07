const Sentiment = require('sentiment');

// Initialize the sentiment analyzer
const sentimentAnalyzer = new Sentiment();

/**
 * Analyzes the sentiment of a given text
 * @param {string} text - The feedback text to analyze
 * @returns {object} - Returns the numeric score and a descriptive label
 */
const analyzeSentiment = (text) => {
    // Calculate the sentiment score using the 'sentiment' package
    const result = sentimentAnalyzer.analyze(text);
    const score = result.score;
    
    // Determine the label based on the score
    let label = 'Neutral';
    if (score > 0) {
        label = 'Positive';
    } else if (score < 0) {
        label = 'Negative';
    }

    return {
        score,
        label
    };
};

module.exports = {
    analyzeSentiment
};
