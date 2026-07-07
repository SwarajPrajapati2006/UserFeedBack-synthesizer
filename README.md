# User Feedback Synthesizer - Backend

An intelligent, rule-based, and AI-powered backend designed for a hackathon. This system collects user feedback, processes it through an offline analytical pipeline (sentiment, clustering, urgency, duplicate detection, priority scoring), and layers a Google Gemini API summarization engine on top. Access is secured using a custom JWT-based authentication system.

---

## 🚀 Key Features

### 1. Offline Feedback Processing Pipeline
Whenever feedback is submitted, the backend automatically runs a multi-stage analysis pipeline without external API calls:
*   **Sentiment Analysis:** Categorizes feedback as *Positive*, *Neutral*, or *Negative* alongside a numeric score using the offline `sentiment` package.
*   **Urgency Detection:** Identifies critical issues based on a rule-based checklist of urgent keywords (e.g., `crash`, `broken`, `refund`, `urgent`).
*   **Theme Clustering:** Dynamically groups feedback into categories: `Bug`, `Pricing`, `UX`, `Onboarding`, `Performance`, or `General`.
*   **Word-Overlap Deduplication:** Uses a basic Jaccard word-overlap similarity check (threshold > 0.7) to identify and link near-duplicate comments back to their original entry (`isDuplicateOf`).
*   **Priority Math:** Calculates a dynamic priority score between `0.0` and `1.0` using the formula:
    $$\text{Priority} = (\text{Frequency} \times 0.4) + (\text{Normalized Negative Sentiment} \times 0.4) + (\text{Urgency Score} \times 0.2)$$
    *(where Frequency is based on the feedback density in that cluster)*
*   **Action Tagging:** Maps priority scores to labels: `"Fix Now"`, `"Research"`, `"Nice to Have"`, or `"Low Priority"`.

### 2. JWT-Based Authentication
*   Fully secure signup and login using **JWT (JSON Web Tokens)** and **Bcrypt** for password hashing.
*   Secure endpoints: Only authenticated users can submit feedback or request summaries.
*   Tracks ownership by binding feedback directly to a user using the `createdBy` property.

### 3. AI-Powered Summaries (Gemini API)
*   Integrates Google's **Gemini 1.5 Flash** (via `@google/generative-ai`) to summarize multiple feedback entries for a given product.
*   Generates a concise, 3-5 sentence report outlining core user grievances and positive highlights.

---

## 📁 Directory Structure

```text
Backend/
├── src/
│   ├── config/
│   │   └── db.js               # MongoDB connection
│   ├── controllers/
│   │   ├── authController.js     # User signup, login, profile fetch
│   │   ├── feedbackController.js # Feedback creation & metrics queries
│   │   └── summaryController.js  # Gemini AI summary endpoint
│   ├── middlewares/
│   │   ├── authMiddleware.js     # JWT verification middleware
│   │   ├── errorHandler.js       # Centralized error handler
│   │   ├── validateAuth.js       # Auth payload check
│   │   └── validateFeedback.js   # Feedback text validation
│   ├── models/
│   │   ├── Feedback.js           # Feedback Schema
│   │   └── User.js               # User Schema
│   ├── routes/
│   │   ├── authRoutes.js         # /api/auth routes
│   │   ├── feedbackRoutes.js     # /api/feedback routes
│   │   └── summaryRoutes.js      # /api/summary routes
│   ├── services/
│   │   ├── clusterService.js     # Keyword cluster matching
│   │   ├── geminiService.js      # Google AI Studio API wrapper
│   │   ├── priorityService.js    # Urgency & Priority calculations
│   │   └── sentimentService.js   # Offline sentiment wrapper
│   ├── utils/
│   │   └── duplicateChecker.js   # Jaccard similarity checker
│   └── app.js                  # Express middleware & routes mounting
├── .env                        # Local configurations (ignored by git)
├── package.json                # Project dependencies
└── server.js                   # Entry point
```

---

## ⚙️ Setup Instructions

1.  **Clone the Repository** and navigate to the `Backend` directory:
    ```bash
    cd Backend
    ```

2.  **Install Dependencies:**
    ```bash
    npm install
    ```

3.  **Environment Setup:**
    Create a `.env` file inside `Backend/src/` with the following variables:
    ```env
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=some_long_secure_string_here
    GEMINI_API_KEY=your_google_ai_studio_api_key
    PORT=3000
    ```

4.  **Run Development Server:**
    ```bash
    npx nodemon server.js
    ```

---

## 🔌 API Documentation

### Auth Endpoints (`/api/auth`)
*   `POST /signup` - Registers a new user. Expects: `{ name, email, password }`
*   `POST /login` - Login. Expects: `{ email, password }`. Returns a JWT token.
*   `GET /me` - Fetches authenticated user info. *Requires Bearer Token.*

### Feedback Endpoints (`/api/feedback`)
*   `POST /` - Processes and creates feedback. *Requires Bearer Token.* Expects: `{ text, source, productName }`
*   `GET /` - Fetches all feedback entries sorted by newest first.
*   `GET /shortlist` - Fetches top 10 unique, non-duplicate feedback entries sorted by priority score.
*   `GET /clusters` - Returns aggregation analytics of feedback counts and average sentiments grouped by cluster.
*   `GET /trend` - Returns a daily trend showing how average sentiment shifts over time.

### Summary Endpoints (`/api/summary`)
*   `POST /generate` - Generates a 3-5 sentence summary of feedback comments. *Requires Bearer Token.* Expects: `{ productName }` or `{ feedbackIds: [...] }`.