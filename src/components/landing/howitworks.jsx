import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Sparkles, Play, Rocket } from 'lucide-react';
import { Link } from 'react-router-dom';

const steps = [
  {
    icon: MessageSquare,
    number: '01',
    title: 'Describe',
    items: [
      'Describe your app in normal words',
      'Tell us who you\'re targeting and what problems it solves',
      'Paste your SaaS link or set your app/SaaS tone',
      'One-time setup — Vibe Hype learns your brand forever',
    ],
  },
  {
    icon: Sparkles,
    number: '02',
    title: 'Generate',
    items: [
      'Vibe Hype will find real people who need your app right now',
      'Spots where they\'re talking about it — Reddit, X, TikTok & more',
      'Generates hooks, captions, scripts & hashtags instantly',
      'Picks the perfect platform and best posting times for you',
    ],
  },
  {
    icon: Play,
    number: '03',
    title: 'Decide',
    items: [
      'Get ready-to-post content and decide exactly what goes live',
      'Hit "Post Now" for instant fire or "Schedule" your week',
      'Or upload & schedule your own content effortlessly',
      'Full control you approve, Vibe Hype execute',
    ],
  },
  {
    icon: Rocket,
    number: '04',
    title: 'Scale',
    items: [
      'Autopilot agents spot new trends every few days',
      'Make fresh, engaging, on-brand content automatically',
      'Post automatically at peak times across perfect platforms',
      'Track every piece of content with daily/weekly/monthly insights',
      'Strategy auto-fixes for next week based on today\'s real growth',
    ],
  },
];

export default function HowItWorks() {
  return (
    <section id="howitworks" className="py-24 px-4 sm:px-6 font-poppins" style={{ background: '#0A0A0A' }}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-6"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-white" style={{ letterSpacing: '-1px', lineHeight: 1.1 }}>
            Turn Your Headache Marketing Into{' '}
            <span className="bg-clip-text text-transparent"
              style={{ backgroundImage: 'linear-gradient(90deg, #7C3AED, #EC4899)' }}>
              Vibe Marketing
            </span>{' '}
            in Seconds
          </h2>
          <p className="mt-4 text-lg max-w-xl mx-auto" style={{ color: '#A1A1AA' }}>
            Turn stressful guesswork into chill, automatic vibe growth.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
          {steps.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="relative p-6 rounded-2xl border border-white/5 bg-white/[0.02]"
            >
              <div className="flex items-center gap-3 mb-5">
                <span className="text-3xl font-bold bg-clip-text text-transparent"
                  style={{ backgroundImage: 'linear-gradient(90deg, #7C3AED, #EC4899)' }}>
                  {s.number}
                </span>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ background: 'rgba(124,58,237,0.15)' }}>
                  <s.icon className="w-5 h-5 text-purple-400" />
                </div>
              </div>
              <h3 className="text-2xl font-semibold text-white mb-4">{s.title}</h3>
              <ul className="space-y-2">
                {s.items.map((item, j) => (
                  <li key={j} className="flex items-start gap-2 text-sm" style={{ color: '#A1A1AA' }}>
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0"
                      style={{ background: 'linear-gradient(90deg, #7C3AED, #EC4899)' }} />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-16 text-center"
        >
          <Link
            to="/survey"
            className="inline-flex items-center gap-2 px-10 py-4 text-lg font-semibold text-white rounded-lg hover:opacity-90 transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-purple-500/20"
            style={{ background: 'linear-gradient(90deg, #7C3AED, #EC4899)', borderRadius: '8px' }}
          >
            Join the Waitlist for Free – No Card Needed
          </Link>
        </motion.div>
      </div>
    </section>
  );
}