import React, { useState } from 'react';
import { useSummary } from '../hooks/useSummary';
import { GlassCard } from '../components/ui/GlassCard';
import { EmptyState } from '../components/ui/EmptyState';
import { Sparkles, Loader2, AlertTriangle, FileText, Database } from 'lucide-react';
import toast from 'react-hot-toast';
import { cn } from '../utils/cn';

export default function AISummary() {
  const [activeTab, setActiveTab] = useState('db'); // 'db' or 'raw'
  const [productName, setProductName] = useState('');
  const [rawReviews, setRawReviews] = useState('');
  const [summaryResult, setSummaryResult] = useState(null);
  
  const mutation = useSummary();

  const handleGenerate = (e) => {
    e.preventDefault();
    setSummaryResult(null);
    
    if (activeTab === 'db') {
      if (!productName.trim()) {
        toast.error('Please enter a product name');
        return;
      }
      mutation.mutate({ productName: productName.trim() }, {
        onSuccess: (data) => {
          setSummaryResult(data);
        },
        onError: (err) => {
          toast.error(err.response?.data?.message || 'Failed to generate summary');
        }
      });
    } else {
      if (!rawReviews.trim()) {
        toast.error('Please paste some reviews');
        return;
      }
      const reviewsArray = rawReviews
        .split('\n')
        .map(r => r.trim())
        .filter(r => r.length > 0);

      if (reviewsArray.length < 2) {
        toast.error('Please provide at least 2 reviews (one per line)');
        return;
      }

      mutation.mutate({ productName: 'Custom Reviews List', reviews: reviewsArray }, {
        onSuccess: (data) => {
          setSummaryResult(data);
        },
        onError: (err) => {
          toast.error(err.response?.data?.message || 'Failed to generate summary');
        }
      });
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-violet-500/20 text-violet-400 flex items-center justify-center">
            <Sparkles size={20} />
          </div>
          AI Summary
        </h1>
        <p className="text-textMuted">
          Generate an AI-powered summary of user feedback. Powered by Grok (if key is set) or Gemini.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-borderLight mb-6 gap-2">
        <button
          onClick={() => { setActiveTab('db'); setSummaryResult(null); }}
          className={cn(
            "flex items-center gap-2 border-b-2 px-4 py-2.5 text-sm font-medium transition-all",
            activeTab === 'db'
              ? "border-violet-500 text-white"
              : "border-transparent text-textMuted hover:text-white"
          )}
        >
          <Database size={16} />
          DB Product Lookup
        </button>
        <button
          onClick={() => { setActiveTab('raw'); setSummaryResult(null); }}
          className={cn(
            "flex items-center gap-2 border-b-2 px-4 py-2.5 text-sm font-medium transition-all",
            activeTab === 'raw'
              ? "border-violet-500 text-white"
              : "border-transparent text-textMuted hover:text-white"
          )}
        >
          <FileText size={16} />
          Paste Raw Reviews
        </button>
      </div>

      <GlassCard className="p-6">
        <form onSubmit={handleGenerate} className="flex flex-col gap-4">
          {activeTab === 'db' ? (
            <div className="flex-grow">
              <label className="block text-sm font-medium text-textMuted mb-1">Product Name</label>
              <input
                type="text"
                required
                value={productName}
                onChange={e => setProductName(e.target.value)}
                className="w-full bg-background/50 border border-borderLight rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-colors"
                placeholder="e.g. Mobile App v2"
              />
            </div>
          ) : (
            <div className="flex-grow">
              <label className="block text-sm font-medium text-textMuted mb-1">Paste Reviews (One per line, min 2)</label>
              <textarea
                required
                rows={6}
                value={rawReviews}
                onChange={e => setRawReviews(e.target.value)}
                className="w-full bg-background/50 border border-borderLight rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-colors resize-none"
                placeholder="Paste your reviews here&#10;Checkout crash on promo code...&#10;App is too slow..."
              />
            </div>
          )}
          <div className="flex justify-end mt-2">
            <button
              type="submit"
              disabled={mutation.isPending}
              className="bg-violet-600 hover:bg-violet-500 text-white font-medium rounded-lg px-6 py-2.5 transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2 min-w-[160px] justify-center whitespace-nowrap"
            >
              {mutation.isPending ? (
                <>
                  <Loader2 className="animate-spin" size={18} />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles size={18} />
                  Generate Summary
                </>
              )}
            </button>
          </div>
        </form>
      </GlassCard>

      {mutation.isPending && (
        <GlassCard className="p-8 text-center">
          <Loader2 className="animate-spin mx-auto mb-4 text-violet-400" size={32} />
          <p className="text-textMuted">Calling AI to analyze feedback...</p>
          <p className="text-xs text-textMuted mt-1">This typically takes 2-5 seconds.</p>
        </GlassCard>
      )}

      {summaryResult && (
        <GlassCard className="p-8 border-violet-500/20 animate-slow-float">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles size={18} className="text-violet-400" />
            <h3 className="text-lg font-bold text-white">Summary for "{summaryResult.productName}"</h3>
          </div>
          <div className="text-xs text-textMuted mb-4">
            Based on {summaryResult.feedbackCount} feedback entries
          </div>
          <div className="bg-background/40 rounded-xl p-6 border border-borderLight mb-6">
            <p className="text-textMain leading-relaxed text-base whitespace-pre-wrap">
              {summaryResult.summary}
            </p>
          </div>

          {/* Key Problems List */}
          {Array.isArray(summaryResult.keyProblems) && summaryResult.keyProblems.length > 0 && (
            <div>
              <h4 className="text-sm font-semibold text-textMuted uppercase tracking-wider mb-3">Detected Issues</h4>
              <div className="grid gap-3 sm:grid-cols-2">
                {summaryResult.keyProblems.map((prob, i) => (
                  <div key={i} className="flex items-start gap-3 p-3.5 rounded-xl bg-background/50 border border-borderLight">
                    <span className={cn(
                      "mt-1 w-2.5 h-2.5 rounded-full shrink-0",
                      prob.severity === 'high' ? 'bg-rose-500 shadow-[0_0_12px_rgba(244,63,94,0.5)]' :
                      prob.severity === 'medium' ? 'bg-amber-500 shadow-[0_0_12px_rgba(245,158,11,0.5)]' :
                      'bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.5)]'
                    )} />
                    <div>
                      <div className="text-sm font-medium text-white">{prob.problem}</div>
                      <div className="text-xs text-textMuted capitalize">{prob.severity} severity</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </GlassCard>
      )}

      {mutation.isError && !summaryResult && (
        <EmptyState 
          icon={AlertTriangle} 
          title="Summary generation failed" 
          message={mutation.error?.response?.data?.message || "Check your API keys and ensure you have feedback entries."} 
        />
      )}

      {!mutation.isPending && !summaryResult && !mutation.isError && (
        <EmptyState 
          icon={Sparkles} 
          title="Ready to summarize" 
          message={activeTab === 'db' 
            ? "Enter a product name and hit Generate. We'll find its reviews in the DB and summarize them."
            : "Paste multiple reviews (one per line) and hit Generate. We'll summarize them directly."
          } 
        />
      )}
    </div>
  );
}
