import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  BarChart2,
  Brain,
  CheckCircle2,
  Hash,
  Shield,
  Sparkles,
  Zap,
} from 'lucide-react';

const navItems = ['Product', 'Pipeline', 'Insights'];

const features = [
  {
    icon: Brain,
    title: 'Sentiment Engine',
    desc: 'Reads emotional tone, confidence, and urgency across every review.',
    accent: 'from-brandBlue to-cyan-400',
  },
  {
    icon: Hash,
    title: 'Theme Clustering',
    desc: 'Groups messy comments into product areas your team can act on.',
    accent: 'from-violet-500 to-brandPurple',
  },
  {
    icon: Zap,
    title: 'Priority Shortlist',
    desc: 'Scores the loudest customer pain so you know what to fix first.',
    accent: 'from-rose-500 to-violet-500',
  },
  {
    icon: BarChart2,
    title: 'Trend Analytics',
    desc: 'Shows whether launches, patches, and experiments improved sentiment.',
    accent: 'from-cyan-400 to-emerald-500',
  },
  {
    icon: Sparkles,
    title: 'AI Summaries',
    desc: 'Turns long review dumps into crisp decision briefs for your demo.',
    accent: 'from-brandPurple to-cyan-400',
  },
  {
    icon: Shield,
    title: 'Duplicate Control',
    desc: 'Detects repeated feedback so one issue does not distort the roadmap.',
    accent: 'from-amber-500 to-brandBlue',
  },
];

const steps = [
  { label: 'Capture', text: 'Paste reviews, tickets, social comments, or survey answers.' },
  { label: 'Synthesize', text: 'AI extracts sentiment, urgency, cluster, and priority.' },
  { label: 'Decide', text: 'Use the shortlist and trend charts to plan the next release.' },
];

const fadeUp = {
  hidden: { opacity: 0, y: 26 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  }),
};

function BrandMark({ compact = false }) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-full border border-white/25 bg-frost shadow-[0_16px_45px_rgba(82,104,255,0.32)]">
        <img src="/traige-logo.png" alt="Traige logo" className="h-14 w-14 object-cover object-center" />
      </div>
      {!compact && (
        <div>
          <div className="font-display text-lg font-bold tracking-[0.18em] text-white">TRAIGE</div>
          <div className="text-[10px] font-semibold uppercase tracking-[0.34em] text-textMuted">Since 2026</div>
        </div>
      )}
    </div>
  );
}

export default function Landing() {
  return (
    <div className="min-h-screen overflow-hidden bg-background text-textMain">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:76px_76px] [mask-image:radial-gradient(circle_at_50%_18%,black,transparent_76%)]" />
        <motion.div
          animate={{ x: [0, 45, 0], y: [0, -28, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute left-[-14%] top-[-18%] h-[44rem] w-[44rem] rounded-full bg-brandBlue/24 blur-[150px]"
        />
        <motion.div
          animate={{ x: [0, -34, 0], y: [0, 42, 0] }}
          transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute right-[-16%] top-[8%] h-[42rem] w-[42rem] rounded-full bg-brandPurple/22 blur-[150px]"
        />
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-frost/10 to-transparent" />
      </div>

      <nav className="relative z-20 px-4 py-5">
        <div className="mx-auto flex max-w-7xl items-center justify-between rounded-full border border-white/15 bg-white/[0.075] px-4 py-3 shadow-glass backdrop-blur-2xl sm:px-5">
          <BrandMark />
          <div className="hidden items-center rounded-full border border-white/10 bg-black/15 p-1 md:flex">
            {navItems.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="rounded-full px-5 py-2 text-xs font-bold uppercase tracking-[0.18em] text-textMuted transition-colors hover:bg-white/10 hover:text-white"
              >
                {item}
              </a>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <Link to="/login" className="hidden rounded-full px-4 py-2 text-sm font-bold text-textMuted transition-colors hover:text-white sm:inline-flex">
              Sign In
            </Link>
            <Link to="/login" className="primary-button px-5 py-2.5">
              Launch App
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </nav>

      <main className="relative z-10">
        <section id="product" className="mx-auto grid min-h-[calc(100vh-96px)] max-w-7xl items-center gap-12 px-4 pb-12 pt-10 sm:px-6 lg:grid-cols-[1.04fr_0.96fr] lg:px-8 lg:pt-4">
          <div>
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.075] px-4 py-2 text-sm font-semibold text-cyan-100 shadow-glass backdrop-blur-xl"
            >
              <Sparkles size={16} className="text-cyan-300" />
              AI feedback intelligence for product teams
            </motion.div>

            <motion.h1
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              custom={1}
              className="font-display text-5xl font-bold leading-[0.98] tracking-normal text-white sm:text-6xl lg:text-7xl"
            >
              TRAIGE turns feedback chaos into a{' '}
              <span className="brand-gradient-text bg-[length:200%_100%] animate-shimmer">clear product signal.</span>
            </motion.h1>

            <motion.p
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              custom={2}
              className="mt-7 max-w-2xl text-lg leading-8 text-textMuted"
            >
              A glassy, AI-powered dashboard that analyzes user comments, detects priority issues, clusters themes, and gives your hackathon judges a crisp story from raw feedback to action.
            </motion.p>

            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              custom={3}
              className="mt-9 flex flex-col gap-3 sm:flex-row"
            >
              <Link to="/login" className="primary-button">
                Start Synthesizing
                <ArrowRight size={18} />
              </Link>
              <a
                href="#pipeline"
                className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/[0.065] px-6 py-3 text-sm font-bold text-white backdrop-blur-xl transition-all hover:bg-white/12"
              >
                See the Pipeline
              </a>
            </motion.div>

            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              custom={4}
              className="mt-11 grid max-w-2xl grid-cols-3 gap-3"
            >
              {[
                ['6-stage', 'analysis flow'],
                ['AI', 'summaries'],
                ['Live', 'dashboard'],
              ].map(([value, label]) => (
                <div key={label} className="rounded-2xl border border-white/12 bg-white/[0.06] p-4 backdrop-blur-xl">
                  <div className="font-display text-2xl font-bold text-white">{value}</div>
                  <div className="mt-1 text-xs font-semibold uppercase tracking-[0.16em] text-textMuted">{label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
            className="relative"
          >
            <div className="absolute -inset-10 rounded-full bg-gradient-to-br from-brandBlue/30 via-cyan-400/10 to-brandPurple/30 blur-3xl" />
            <div className="relative overflow-hidden rounded-[2rem] border border-white/18 bg-white/[0.08] p-4 shadow-glass backdrop-blur-2xl">
              <div className="rounded-[1.4rem] border border-white/12 bg-background/45 p-5">
                <div className="mb-5 flex items-center justify-between">
                  <BrandMark compact />
                  <span className="rounded-full border border-emerald-400/25 bg-emerald-400/10 px-3 py-1 text-xs font-bold text-emerald-200">Live Analysis</span>
                </div>
                <div className="space-y-3">
                  {[
                    ['Checkout Bug', 'Fix Now', '92%', 'text-rose-300'],
                    ['Dark Mode Request', 'Plan Next', '68%', 'text-cyan-200'],
                    ['Pricing Confusion', 'Investigate', '74%', 'text-amber-200'],
                  ].map(([title, action, score, color], i) => (
                    <motion.div
                      key={title}
                      animate={{ y: [0, i === 1 ? -5 : 5, 0] }}
                      transition={{ duration: 5 + i, repeat: Infinity, ease: 'easeInOut' }}
                      className="rounded-2xl border border-white/12 bg-white/[0.075] p-4"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <div className="font-bold text-white">{title}</div>
                          <div className="mt-1 text-sm text-textMuted">Clustered from customer reviews</div>
                        </div>
                        <div className={`font-display text-2xl font-bold ${color}`}>{score}</div>
                      </div>
                      <div className="mt-4 flex items-center justify-between">
                        <span className="rounded-full border border-white/12 bg-white/10 px-3 py-1 text-xs font-bold text-white">{action}</span>
                        <CheckCircle2 size={18} className="text-cyan-300" />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        <section id="pipeline" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="mb-10 max-w-3xl">
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.22em] text-cyan-200">Pipeline</p>
            <h2 className="font-display text-3xl font-bold text-white sm:text-5xl">Built to impress and useful after the demo.</h2>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {steps.map((step, i) => (
              <motion.div
                key={step.label}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-60px' }}
                variants={fadeUp}
                custom={i}
                className="glass-panel p-6"
              >
                <div className="mb-7 font-display text-6xl font-bold text-white/10">0{i + 1}</div>
                <h3 className="text-xl font-bold text-white">{step.label}</h3>
                <p className="mt-3 leading-7 text-textMuted">{step.text}</p>
              </motion.div>
            ))}
          </div>
        </section>

        <section id="insights" className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
          <div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <p className="mb-3 text-sm font-bold uppercase tracking-[0.22em] text-cyan-200">Insights</p>
              <h2 className="font-display text-3xl font-bold text-white sm:text-5xl">Every screen has a purpose.</h2>
            </div>
            <Link to="/login" className="primary-button self-start md:self-auto">
              Open Dashboard
              <ArrowRight size={18} />
            </Link>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-40px' }}
                variants={fadeUp}
                custom={i}
                className="glass-panel group p-6 hover:-translate-y-1 hover:bg-white/[0.105]"
              >
                <div className={`mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${feature.accent} shadow-glow transition-transform duration-300 group-hover:scale-105`}>
                  <feature.icon size={22} className="text-white" />
                </div>
                <h3 className="text-lg font-bold text-white">{feature.title}</h3>
                <p className="mt-3 leading-7 text-textMuted">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>
      </main>

      <footer className="relative z-10 border-t border-white/10 px-4 py-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 text-sm text-textMuted sm:flex-row">
          <BrandMark />
          <span>Built for Hack-Arambh 2026 by Swaraj Prajapati.</span>
        </div>
      </footer>
    </div>
  );
}
