const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
    text: {
        type: String,
        required: [true, 'Feedback text is required'],
        trim: true
    },
    source: {
        type: String,
        default: 'Web'
    },
    // Name of the product this feedback belongs to (used for summary grouping)
    productName: {
        type: String,
        default: 'General',
        trim: true
    },
    sentimentLabel: {
        type: String,
        enum: ['Positive', 'Neutral', 'Negative'],
        default: 'Neutral'
    },
    sentimentScore: {
        type: Number,
        default: 0
    },
    urgencyScore: {
        type: Number,
        default: 0
    },
    cluster: {
        type: String,
        enum: ['Bug', 'Pricing', 'UX', 'Onboarding', 'Performance', 'General'],
        default: 'General'
    },
    priorityScore: {
        type: Number,
        default: 0
    },
    actionTag: {
        type: String,
        enum: ['Fix Now', 'Research', 'Nice to Have', 'Low Priority'],
        default: 'Low Priority'
    },
    isDuplicateOf: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Feedback',
        default: null
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {
    timestamps: true // Automatically adds createdAt and updatedAt
});

module.exports = mongoose.model('Feedback', feedbackSchema);
