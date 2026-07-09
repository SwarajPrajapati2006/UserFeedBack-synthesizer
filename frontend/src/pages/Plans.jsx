import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ChevronDown } from 'lucide-react';
import toast from 'react-hot-toast';

const Plans = () => {
  const [isYearly, setIsYearly] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  const handleAction = () => {
    toast('Coming soon for hackathon demo!', { 
      icon: '🚀',
      style: {
        background: 'rgba(255, 255, 255, 0.04)',
        backdropFilter: 'blur(24px)',
        border: '1px solid rgba(255,255,255,0.14)',
        color: '#f1f1f4',
        borderRadius: '16px',
      }
    });
  };

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const plans = [
    {
      name: 'FREE',
      price: '$0',
      features: [
        '50 feedback entries/month',
        'Sentiment scoring',
        'Theme clustering',
        'Priority shortlist (limited to top 5)',
      ],
      buttonText: 'Get started',
      buttonStyle: 'outline',
    },
    {
      name: 'PRO',
      popular: true,
      price: isYearly ? '$15' : '$29',
      features: [
        'Everything in Free',
        'Unlimited feedback entries',
        'AI-powered bulk summarization (Gemini)',
        'Full priority shortlist + trend charts',
        'CSV export',
      ],
      buttonText: 'Upgrade to Pro',
      buttonStyle: 'solid',
    },
    {
      name: 'TEAM',
      price: isYearly ? '$79' : '$149',
      features: [
        'Everything in Pro',
        'Multiple team members / shared dashboards',
        'Slack & email integrations',
        'Priority support',
      ],
      buttonText: 'Start Team trial',
      buttonStyle: 'outline',
    },
    {
      name: 'ENTERPRISE',
      price: 'Custom',
      features: [
        'Everything in Team',
        'SSO login',
        'Custom integrations (Jira, Zendesk, Intercom)',
        'Dedicated account manager',
        'On-premise deployment option',
      ],
      buttonText: 'Contact sales',
      buttonStyle: 'outline',
    }
  ];

  const faqs = [
    {
      q: 'Can I cancel anytime?',
      a: 'Yes, you can cancel your subscription at any time. Your plan will remain active until the end of your billing period.',
    },
    {
      q: 'What happens after my free tier limit?',
      a: 'Once you exceed 50 feedback entries on the free tier, new entries will be queued. You can upgrade to Pro to unlock them immediately.',
    },
    {
      q: 'Do you offer a discount for startups?',
      a: 'Yes! We offer a 50% discount for early-stage startups. Contact our sales team with your details to apply.',
    },
    {
      q: 'Is there a free trial for Team?',
      a: 'Absolutely. You can start a 14-day free trial of the Team plan to see if it fits your collaborative workflow.',
    },
  ];

  return (
    <div className="relative min-h-screen bg-background text-textMain overflow-hidden">
      
      {/* Background Blobs (Using Brand Colors) */}
      <div className="absolute top-40 -left-20 w-96 h-96 bg-brandPurple rounded-full mix-blend-screen filter blur-[128px] opacity-20 animate-slow-float" />
      <div className="absolute top-40 -right-20 w-96 h-96 bg-cyan-400 rounded-full mix-blend-screen filter blur-[128px] opacity-10 animate-slow-float" style={{ animationDelay: '2s' }} />
      <div className="absolute -bottom-32 left-1/2 w-96 h-96 bg-brandBlue rounded-full mix-blend-screen filter blur-[128px] opacity-15 animate-slow-float" style={{ animationDelay: '4s' }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 z-10">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-6 font-display"
          >
            Plans built for how your team works
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-textMuted mb-8"
          >
            Start free. Upgrade when feedback becomes too much to read manually.
          </motion.p>
          
          {/* Toggle */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center justify-center gap-4"
          >
            <span className={`text-sm font-bold ${!isYearly ? 'text-white' : 'text-textMuted'}`}>Monthly</span>
            <button 
              onClick={() => setIsYearly(!isYearly)}
              className="relative inline-flex h-7 w-14 items-center rounded-full bg-white/[0.1] border border-white/[0.1] transition-colors focus:outline-none focus:ring-2 focus:ring-brandPurple focus:ring-offset-2 focus:ring-offset-background"
            >
              <span className={`inline-block h-5 w-5 transform rounded-full bg-brandPurple shadow-sm transition-transform ${isYearly ? 'translate-x-7' : 'translate-x-1'}`} />
            </button>
            <span className={`text-sm font-bold flex items-center ${isYearly ? 'text-white' : 'text-textMuted'}`}>
              Yearly <span className="ml-2 inline-flex items-center rounded-full bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 text-xs font-bold text-emerald-400">-20%</span>
            </span>
          </motion.div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 xl:gap-8 mb-24">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index + 0.3 }}
              className={`relative flex flex-col rounded-2xl border p-8 transition-all duration-300 backdrop-blur-md
                ${plan.popular 
                  ? 'bg-white/[0.04] border-brandPurple/30 shadow-glow' 
                  : 'bg-white/[0.02] border-white/[0.03] hover:bg-white/[0.04] hover:border-white/[0.06] hover:-translate-y-1'}`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-0 right-0 flex justify-center">
                  <span className="bg-brandPurple text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest shadow-lg shadow-brandPurple/20">
                    Most Popular
                  </span>
                </div>
              )}
              
              <div className="mb-6">
                <h3 className="text-xs font-bold text-brandPurple tracking-widest uppercase mb-2">{plan.name}</h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold text-white">{plan.price}</span>
                  {plan.price !== 'Custom' && (
                    <span className="text-sm font-medium text-textMuted">/month</span>
                  )}
                </div>
              </div>

              <ul className="flex-1 space-y-4 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Check className={`w-5 h-5 shrink-0 ${plan.popular ? 'text-brandPurple' : 'text-emerald-400'}`} />
                    <span className="text-sm text-textMuted leading-snug">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={handleAction}
                className={`w-full py-3 px-4 rounded-xl font-bold transition-all duration-300 flex items-center justify-center
                  ${plan.buttonStyle === 'solid' 
                    ? 'bg-brandPurple hover:brightness-110 text-white shadow-[0_0_20px_rgba(138,91,244,0.3)] hover:shadow-[0_0_30px_rgba(138,91,244,0.5)] hover:-translate-y-0.5' 
                    : 'bg-white/[0.03] border border-white/[0.1] text-textMain hover:bg-white/[0.08] hover:border-white/[0.2]'}`}
              >
                {plan.buttonText}
              </button>
            </motion.div>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto mb-24">
          <h2 className="text-2xl font-bold text-center text-white mb-8 font-display">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div 
                key={index} 
                className="bg-white/[0.02] backdrop-blur-md border border-white/[0.03] hover:border-white/[0.1] rounded-2xl overflow-hidden transition-all duration-300"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
                >
                  <span className="text-textMain font-semibold text-sm">{faq.q}</span>
                  <ChevronDown 
                    className={`w-5 h-5 text-textMuted transition-transform duration-300 ${openFaq === index ? 'rotate-180 text-white' : ''}`}
                  />
                </button>
                <AnimatePresence>
                  {openFaq === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="p-6 pt-0 text-textMuted text-sm leading-relaxed border-t border-white/[0.02]">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto relative group overflow-hidden rounded-3xl p-10 text-center"
        >
          <div className="absolute inset-0 bg-white/[0.02] border border-white/[0.05] backdrop-blur-xl rounded-3xl" />
          <div className="absolute inset-0 bg-gradient-to-br from-brandPurple/10 to-cyan-400/5 opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
          
          <div className="relative z-10">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 font-display">
              Still deciding? Start free, no credit card required.
            </h2>
            <p className="text-textMuted mb-8 max-w-xl mx-auto">
              Experience the power of automated feedback synthesis instantly. Join other forward-thinking teams using Triage.
            </p>
            <button
              onClick={handleAction}
              className="primary-button"
            >
              Create free account
            </button>
          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default Plans;
