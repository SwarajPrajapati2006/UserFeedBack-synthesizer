# User Feedback Synthesizer - Backend

This is the backend for the **User Feedback Synthesizer**, built for a hackathon. It automatically analyzes incoming user feedback without using external AI APIs.

## Features

- **Sentiment Analysis**: Evaluates feedback as Positive, Neutral, or Negative using the offline `sentiment` package.
- **Urgency Detection**: Uses keyword matching to detect urgent issues (e.g., "crash", "broken", "refund").
- **Clustering**: Classifies feedback into themes (Bug, Pricing, UX, Onboarding, Performance, General).
- **Duplicate Detection**: Identifies near-duplicate feedback using a word-overlap similarity algorithm (Jaccard similarity > 0.7).
- **Priority Scoring**: Calculates a dynamic priority score based on frequency, negative sentiment, and urgency.
- **Action Tags**: Assigns an actionable tag ("Fix Now", "Research", "Nice to Have", "Low Priority") based on the priority score.

## Folder Structure

```
Backend/
├── src/
│   ├── config/
│   │   └── db.js               # MongoDB connection
│   ├── controllers/
│   │   └── feedbackController.js # Route logic
│   ├── middlewares/
│   │   ├── errorHandler.js       # Centralized error handling
│   │   └── validateFeedback.js   # Input validation
│   ├── models/
│   │   └── Feedback.js           # Mongoose Schema
│   ├── routes/
│   │   └── feedbackRoutes.js     # API Endpoints
│   ├── services/
│   │   ├── clusterService.js     # Rule-based classification
│   │   ├── priorityService.js    # Urgency, priority, and action tags
│   │   └── sentimentService.js   # Sentiment analysis wrapper
│   ├── utils/
│   │   └── duplicateChecker.js   # Word-overlap duplicate check
│   └── app.js                    # Express app setup
├── .env                        # Environment variables
├── package.json
└── server.js                   # Entry point
```

## Setup & Running

1. Install dependencies:
   ```bash
   npm install
   ```

2. Make sure your `.env` file is set up with your MongoDB connection string and optional port:
   ```env
   MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/UserFeedBackSynthesizer
   PORT=3000
   ```

3. Run the development server:
   ```bash
   npm run dev
   # or
   npx nodemon server.js
   ```

## API Endpoints

All endpoints are prefixed with `/api/feedback`.

- `POST /` - Submit new feedback (expects `{ "text": "...", "source": "..." }`)
- `GET /` - Retrieve all feedback, sorted newest first
- `GET /shortlist` - Retrieve the top 10 unique (non-duplicate) feedback items with the highest priority
- `GET /clusters` - Retrieve statistics on feedback grouped by cluster (count & average sentiment)
- `GET /trend` - Retrieve average sentiment trends over time grouped by day
