import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Sparkles, Check, Shield, Rocket, Gift, Heart } from 'lucide-react';

const benefits = [
  { icon: Gift, text: 'Free beta testing access' },
  { icon: Sparkles, text: 'First month premium free when app is ready' },
  { icon: Shield, text: 'Fully refundable – zero risk' },
  { icon: Heart, text: 'Helps the founder kick-start production' },
];

export default function PrePurchase() {
  return (
    <div className="min-h-screen font-poppins flex flex-col" style={{ background: '#0A0A0A' }}>
      {/* Top bar */}
      <div className="flex items-center justify-between px-4 sm:px-6 py-4 border-b border-white/5">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-md flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg, #7C3AED, #EC4899)' }}>
            <Sparkles className="w-3.5 h-3.5 text-white" />
          </div>
          <span className="text-white font-bold">Vibe Hype</span>
        </Link>
        <Link
          to="/"
          className="flex items-center gap-2 text-sm font-medium text-gray-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>
      </div>

      {/* Content */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-lg text-center"
        >
          {/* Glowing orb */}
          <div className="relative mx-auto w-20 h-20 mb-8">
            <div className="absolute inset-0 rounded-full opacity-50 blur-xl"
              style={{ background: 'linear-gradient(135deg, #7C3AED, #EC4899)' }} />
            <div className="relative w-20 h-20 rounded-full flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #7C3AED, #EC4899)' }}>
              <Rocket className="w-9 h-9 text-white" />
            </div>
          </div>

          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-3" style={{ letterSpacing: '-1px' }}>
            Pre-Purchase for Only{' '}
            <span className="bg-clip-text text-transparent"
              style={{ backgroundImage: 'linear-gradient(90deg, #7C3AED, #EC4899)' }}>
              $1.99
            </span>
          </h1>
          <p className="text-lg mb-10" style={{ color: '#A1A1AA' }}>
            Be an early supporter and get exclusive perks.
          </p>

          {/* Benefits */}
          <div className="space-y-4 mb-10">
            {benefits.map((b, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + i * 0.1 }}
                className="flex items-center gap-4 p-4 rounded-xl border border-white/5 bg-white/[0.02] text-left"
              >
                <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: 'linear-gradient(135deg, rgba(124,58,237,0.2), rgba(236,72,153,0.2))' }}>
                  <b.icon className="w-5 h-5 text-purple-400" />
                </div>
                <span className="text-base font-medium text-white">{b.text}</span>
                <Check className="w-5 h-5 text-green-400 ml-auto flex-shrink-0" />
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="w-full py-4 text-lg font-bold text-white rounded-lg hover:opacity-90 transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-purple-500/25"
            style={{ background: 'linear-gradient(90deg, #7C3AED, #EC4899)', borderRadius: '8px' }}
            onClick={() => window.open('https://www.paypal.com/ncp/payment/C5G5C9AXZYRMY', '_blank')}
          >
            Pre-Purchase Now – $1.99
          </motion.button>
          <p className="mt-4 text-sm" style={{ color: '#71717A' }}>
            Secure payment • Fully refundable • Cancel anytime
          </p>
        </motion.div>
      </div>
    </div>
  );
}