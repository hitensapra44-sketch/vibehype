import React from 'react';
import { motion } from 'framer-motion';
import { UserX, HelpCircle, Layers, BarChart3, Clock, RefreshCw } from 'lucide-react';

const problems = [
  {
    icon: UserX,
    text: "You have no clue who your real target audience is, where they are, or who they even are",
  },
  {
    icon: HelpCircle,
    text: "You don't know what to post, where to post it, or who you're even posting for",
  },
  {
    icon: Layers,
    text: "You're juggling 10+ apps and tools for one simple marketing task",
  },
  {
    icon: BarChart3,
    text: "You don;t have detailed analytics to see whats working and whats not",
  },
  {
    icon: Clock,
    text: "Marketing takes too much manual work like research, create, post and analyze",
  },
  {
    icon: RefreshCw,
    text: "You don't know what to change in your strategy based on this week's or month's growth",
  },
];

export default function ProblemSection() {
  return (
    <section className="py-24 px-4 sm:px-6 font-poppins" style={{ background: '#0A0A0A' }}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-white" style={{ letterSpacing: '-1px', lineHeight: 1.1 }}>
            Problems You Are Facing That{' '}
            <span className="bg-clip-text text-transparent"
              style={{ backgroundImage: 'linear-gradient(90deg, #7C3AED, #EC4899)' }}>
              Our App Solves
            </span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {problems.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative group p-6 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/10 transition-all duration-300"
            >
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: 'linear-gradient(135deg, rgba(124,58,237,0.05), rgba(236,72,153,0.05))' }} />
              <div className="relative">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: 'linear-gradient(135deg, rgba(124,58,237,0.15), rgba(236,72,153,0.15))' }}>
                  <p.icon className="w-6 h-6 text-purple-400" />
                </div>
                <p className="text-base leading-relaxed" style={{ color: '#D1D5DB' }}>
                  {p.text}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}