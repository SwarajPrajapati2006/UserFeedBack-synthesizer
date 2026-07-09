const { GoogleGenerativeAI } = require('@google/generative-ai');

// Lazy-initialize the Gemini client to ensure dotenv has loaded
let genAI = null;
const getGenAI = () => {
    if (!genAI) {
        if (!process.env.GEMINI_API_KEY) {
            throw new Error('GEMINI_API_KEY is not set in environment variables');
        }
        genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    }
    return genAI;
};

/**
 * Generates a STRUCTURED summary of multiple feedback texts using Gemini AI.
 * Returns an object with:
 *   - summary: a 3-5 sentence paragraph
 *   - keyProblems: array of { problem, severity } objects
 *
 * HACKATHON NOTE: We ask Gemini to respond with pure JSON (no markdown fences).
 * If parsing fails, we gracefully fall back to { summary: rawText, keyProblems: [] }
 * so the frontend never breaks.
 *
 * @param {string[]} feedbackTexts - Array of feedback strings from users
 * @returns {{ summary: string, keyProblems: Array<{ problem: string, severity: string }> }}
 */
const generateSummary = async (feedbackTexts) => {
    // Guard: ensure we have something to summarize
    if (!feedbackTexts || feedbackTexts.length === 0) {
        throw new Error('No feedback texts provided to summarize');
    }

    // Format the feedback list as a numbered list for the prompt
    const feedbackList = feedbackTexts
        .map((text, index) => `${index + 1}. "${text}"`)
        .join('\n');

    // ──────────────────────────────────────────────────────────────
    // STRUCTURED JSON PROMPT
    // We instruct Gemini to respond ONLY with valid JSON.
    // This lets us parse the response and extract both a human-readable
    // summary AND a structured list of key problems with severity levels.
    // ──────────────────────────────────────────────────────────────
    const prompt = `You are an expert product analyst. Here are ${feedbackTexts.length} user feedback comments about a product:

${feedbackList}

Analyze these feedback entries and respond ONLY with valid JSON (no markdown fences, no extra text). Use this exact structure:

{
  "summary": "A 3-5 sentence paragraph summarizing the overall sentiment, common themes, main pain points, and any positives users mention. Write in plain language as if reporting to a product manager.",
  "keyProblems": [
    { "problem": "Short description of a specific issue users are facing", "severity": "high" },
    { "problem": "Another issue", "severity": "medium" },
    { "problem": "A minor issue", "severity": "low" }
  ]
}

Rules:
- severity must be one of: "high", "medium", "low"
- Include 2-6 key problems based on what users mention
- high = critical/blocking issues, medium = annoying but workable, low = minor complaints
- If feedback is mostly positive, still identify areas for improvement
- Respond with ONLY the JSON object, nothing else`;

    try {
        // Use the free-tier compatible Gemini 1.5 Flash model
        const model = getGenAI().getGenerativeModel({ model: 'gemini-1.5-flash' });

        // Send the prompt to Gemini
        const result = await model.generateContent(prompt);

        // Extract the text from Gemini's response
        const response = result.response;
        const rawText = response.text();

        // ──────────────────────────────────────────────────────────
        // SAFE JSON PARSING WITH FALLBACK
        // Sometimes Gemini wraps its response in ```json ... ``` fences
        // even when told not to. We strip those before parsing.
        // If parsing still fails, we return the raw text as the summary
        // with an empty keyProblems array — the frontend handles this.
        // ──────────────────────────────────────────────────────────
        try {
            // Strip markdown code fences if Gemini added them anyway
            let cleanedText = rawText.trim();
            if (cleanedText.startsWith('```')) {
                cleanedText = cleanedText
                    .replace(/^```(?:json)?\s*\n?/, '')  // Remove opening fence
                    .replace(/\n?\s*```$/, '');            // Remove closing fence
            }

            const parsed = JSON.parse(cleanedText);

            // Validate the parsed structure has what we expect
            return {
                summary: parsed.summary || rawText,
                keyProblems: Array.isArray(parsed.keyProblems) ? parsed.keyProblems : []
            };
        } catch (parseError) {
            // JSON parsing failed — graceful fallback
            console.warn('Gemini response was not valid JSON, using raw text as summary:', parseError.message);
            return {
                summary: rawText,
                keyProblems: []
            };
        }

    } catch (error) {
        // Handle specific Gemini API error types
        if (error.message && error.message.includes('API_KEY_INVALID')) {
            throw new Error('Invalid Gemini API Key. Please check your GEMINI_API_KEY in .env');
        }
        if (error.message && error.message.includes('RESOURCE_EXHAUSTED')) {
            throw new Error('Gemini API rate limit hit. Please wait a moment and try again.');
        }
        // Re-throw any other errors
        throw new Error(`Gemini API Error: ${error.message}`);
    }
};

module.exports = { generateSummary };
