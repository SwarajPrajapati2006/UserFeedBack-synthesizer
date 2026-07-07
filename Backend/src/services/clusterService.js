/**
 * Classifies feedback into a theme/cluster based on keywords
 * @param {string} text - The feedback text
 * @returns {string} - The cluster name
 */
const classifyCluster = (text) => {
    const lowercaseText = text.toLowerCase();

    // Define keywords for each cluster
    const clusters = {
        Bug: ['bug', 'error', 'crash', 'fail', 'broken', 'not working', 'glitch', 'issue', 'stuck'],
        Pricing: ['price', 'cost', 'expensive', 'cheap', 'refund', 'money', 'pay', 'billing', 'subscription'],
        UX: ['ui', 'ux', 'interface', 'design', 'hard to use', 'confusing', 'ugly', 'layout', 'navigation'],
        Onboarding: ['signup', 'register', 'login', 'onboarding', 'tutorial', 'getting started', 'setup'],
        Performance: ['slow', 'lag', 'loading', 'freeze', 'fast', 'speed', 'performance']
    };

    // Check for matches
    for (const [clusterName, keywords] of Object.entries(clusters)) {
        for (const keyword of keywords) {
            if (lowercaseText.includes(keyword)) {
                return clusterName;
            }
        }
    }

    // Default cluster if no keywords match
    return 'General';
};

module.exports = {
    classifyCluster
};
