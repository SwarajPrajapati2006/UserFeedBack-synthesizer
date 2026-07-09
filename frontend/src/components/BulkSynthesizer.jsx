import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Plus, X, AlertCircle } from 'lucide-react';
import { GlassCard } from './ui/GlassCard';
import { useTypewriter } from '../hooks/useTypewriter';
import { api } from '../api/endpoints';
import toast from 'react-hot-toast';

// ──────────────────────────────────────────────────────────────
// FRAMER-MOTION ANIMATION VARIANTS (for hackathon judges)
//
// containerVariants: Controls the staggered entrance of child cards.
//   - staggerChildren: 0.15s delay between each child's animation
//   - delayChildren: 0.3s pause before the first child starts
//
// cardVariants: Each problem card slides up 20px and fades in.
//   The stagger from the parent creates a cascading "waterfall" effect.
// ──────────────────────────────────────────────────────────────
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
            delayChildren: 0.3,
        },
    },
};

const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.4, ease: 'easeOut' },
    },
};

// ──────────────────────────────────────────────────────────────
// Severity configuration — maps severity levels to colors
// ──────────────────────────────────────────────────────────────
const severityConfig = {
    high: {
        dot: 'bg-rose-500',
        badge: 'bg-rose-500/20 text-rose-400 border-rose-500/30',
        label: 'High',
    },
    medium: {
        dot: 'bg-amber-500',
        badge: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
        label: 'Medium',
    },
    low: {
        dot: 'bg-emerald-500',
        badge: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
        label: 'Low',
    },
};

// ──────────────────────────────────────────────────────────────
// PULSING SPARKLE — infinite scale/opacity animation loop
// Used during the loading state to show the AI is "thinking"
// ──────────────────────────────────────────────────────────────
const PulsingSparkle = () => (
    <motion.div
        animate={{
            scale: [1, 1.3, 1],
            opacity: [0.7, 1, 0.7],
        }}
        transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'easeInOut',
        }}
    >
        <Sparkles size={20} className="text-violet-400" />
    </motion.div>
);

// ──────────────────────────────────────────────────────────────
// RESULT PANEL — shows typewriter summary + animated problem cards
// This is the "wow factor" component for the hackathon demo.
// ──────────────────────────────────────────────────────────────
const ResultPanel = ({ data }) => {
    const [showProblems, setShowProblems] = useState(false);

    // useTypewriter reveals the summary text char-by-char.
    // When it finishes (onComplete), we trigger the problems section.
    const { displayText, isTyping } = useTypewriter(
        data?.summary || '',
        18,
        useCallback(() => setShowProblems(true), [])
    );

    const problems = data?.keyProblems || [];

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
        >
            <GlassCard className="p-6 border-violet-500/20">
                {/* Summary header */}
                <div className="flex items-center gap-2 mb-1">
                    <Sparkles size={18} className="text-violet-400" />
                    <h3 className="text-lg font-bold text-white">AI Synthesis</h3>
                </div>
                <p className="text-xs text-textMuted mb-4">
                    Based on {data?.feedbackCount || 0} reviews for "{data?.productName}"
                </p>

                {/* ── Typewriter summary ── */}
                <div className="bg-background/40 rounded-xl p-5 border border-borderLight mb-6">
                    <p className="text-textMain leading-relaxed text-base whitespace-pre-wrap">
                        {displayText}
                        {/* Blinking cursor while typing */}
                        {isTyping && (
                            <motion.span
                                animate={{ opacity: [1, 0] }}
                                transition={{ duration: 0.6, repeat: Infinity }}
                                className="text-violet-400 font-bold"
                            >
                                |
                            </motion.span>
                        )}
                    </p>
                </div>

                {/* ── Key problems section (appears after typewriter finishes) ── */}
                <AnimatePresence>
                    {showProblems && problems.length > 0 && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.4 }}
                        >
                            <motion.h4
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3 }}
                                className="text-sm font-semibold text-white mb-3 flex items-center gap-2"
                            >
                                <AlertCircle size={16} className="text-rose-400" />
                                Key problems detected
                            </motion.h4>

                            {/* Staggered problem cards */}
                            <motion.div
                                variants={containerVariants}
                                initial="hidden"
                                animate="visible"
                                className="space-y-2"
                            >
                                {problems.map((item, i) => {
                                    const config = severityConfig[item.severity] || severityConfig.low;
                                    return (
                                        <motion.div
                                            key={i}
                                            variants={cardVariants}
                                            className="flex items-center gap-3 p-3 rounded-lg bg-background/30 border border-borderLight"
                                        >
                                            {/* Severity dot */}
                                            <div className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${config.dot}`} />
                                            {/* Problem text */}
                                            <p className="text-sm text-textMain flex-1">{item.problem}</p>
                                            {/* Severity badge */}
                                            <span className={`text-xs font-medium px-2 py-0.5 rounded-full border ${config.badge}`}>
                                                {config.label}
                                            </span>
                                        </motion.div>
                                    );
                                })}
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </GlassCard>
        </motion.div>
    );
};

// ──────────────────────────────────────────────────────────────
// MAIN COMPONENT: BulkSynthesizer
// ──────────────────────────────────────────────────────────────
export default function BulkSynthesizer() {
    const [productName, setProductName] = useState('');
    const [reviews, setReviews] = useState(['', '', '']); // Start with 3 empty review inputs
    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState(null);

    const MAX_REVIEWS = 15;

    // Count how many non-empty reviews are filled
    const filledCount = reviews.filter(r => r.trim().length > 0).length;
    const canSynthesize = filledCount >= 2 && productName.trim().length > 0;

    const addReview = () => {
        if (reviews.length < MAX_REVIEWS) {
            setReviews([...reviews, '']);
        }
    };

    const removeReview = (index) => {
        if (reviews.length > 1) {
            setReviews(reviews.filter((_, i) => i !== index));
        }
    };

    const updateReview = (index, value) => {
        const updated = [...reviews];
        updated[index] = value;
        setReviews(updated);
    };

    const handleSynthesize = async () => {
        if (!canSynthesize) return;

        setIsLoading(true);
        setResult(null);

        try {
            // POST the non-empty review texts + product name to the backend
            const feedbackTexts = reviews.filter(r => r.trim().length > 0);
            const data = await api.summary.bulkSynthesize({
                productName: productName.trim(),
                feedbackTexts,
            });
            setResult(data);
        } catch (err) {
            toast.error(err.response?.data?.message || 'Synthesis failed — check your API key');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="space-y-4">
            <GlassCard className="p-6">
                {/* Header */}
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-brandBlue to-brandPurple flex items-center justify-center shadow-glow">
                        <Sparkles size={20} className="text-white" />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-white">Synthesize Feedback</h2>
                        <p className="text-sm text-textMuted">Paste multiple reviews and let AI find patterns</p>
                    </div>
                </div>

                {/* Product name input */}
                <div className="mb-5">
                    <label className="block text-sm font-medium text-textMuted mb-1.5">Product Name</label>
                    <input
                        type="text"
                        value={productName}
                        onChange={e => setProductName(e.target.value)}
                        className="field-glass"
                        placeholder="e.g. Mobile App v2, Checkout Flow"
                    />
                </div>

                {/* Dynamic review textareas */}
                <div className="space-y-3 mb-5">
                    <label className="block text-sm font-medium text-textMuted">
                        User Reviews ({filledCount} filled)
                    </label>
                    <AnimatePresence mode="popLayout">
                        {reviews.map((review, index) => (
                            <motion.div
                                key={index}
                                layout
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.2 }}
                                className="relative"
                            >
                                <textarea
                                    value={review}
                                    onChange={e => updateReview(index, e.target.value)}
                                    rows={2}
                                    className="field-glass pr-10 text-sm resize-none"
                                    placeholder={`Paste user review #${index + 1} here...`}
                                />
                                {/* Remove button */}
                                {reviews.length > 1 && (
                                    <button
                                        onClick={() => removeReview(index)}
                                        className="absolute top-2 right-2 p-1 rounded-md text-textMuted hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                                        title="Remove this review"
                                    >
                                        <X size={14} />
                                    </button>
                                )}
                            </motion.div>
                        ))}
                    </AnimatePresence>

                    {/* Add another review button */}
                    {reviews.length < MAX_REVIEWS && (
                        <button
                            onClick={addReview}
                            className="flex items-center gap-1.5 text-sm text-cyan-200 hover:text-white transition-colors font-semibold"
                        >
                            <Plus size={16} />
                            Add another review
                        </button>
                    )}
                </div>

                {/* Synthesize button */}
                <button
                    onClick={handleSynthesize}
                    disabled={!canSynthesize || isLoading}
                    className="primary-button w-full sm:w-auto"
                >
                    {isLoading ? (
                        <>
                            <PulsingSparkle />
                            <span>Analyzing reviews...</span>
                        </>
                    ) : (
                        <>
                            <Sparkles size={18} />
                            Synthesize with AI
                        </>
                    )}
                </button>
            </GlassCard>

            {/* Result panel — appears after API response */}
            <AnimatePresence>
                {result && <ResultPanel data={result} />}
            </AnimatePresence>
        </div>
    );
}
