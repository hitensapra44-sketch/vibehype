import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function CTASection() {
  return (
    <section id="pricing" className="py-24 px-4 sm:px-6 font-poppins" style={{ background: '#0A0A0A' }}>
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-white" style={{ letterSpacing: '-1px', lineHeight: 1.1 }}>
            Be First Now. Pay Less Later.{' '}
            <span className="bg-clip-text text-transparent"
              style={{ backgroundImage: 'linear-gradient(90deg, #7C3AED, #EC4899)' }}>
              Win Big Forever.
            </span>
          </h2>
          <p className="mt-4 text-lg" style={{ color: '#A1A1AA' }}>
            Ready to make that headache marketing into vibe marketing?
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <button
            onClick={() => document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' })}
            className="group px-10 py-4 text-lg font-semibold text-white rounded-lg flex items-center gap-2 hover:opacity-90 transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-purple-500/20"
            style={{ background: 'linear-gradient(90deg, #7C3AED, #EC4899)', borderRadius: '8px' }}
          >
            Join the Hype List
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}