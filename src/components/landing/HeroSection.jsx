import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, ArrowRight } from 'lucide-react';
import ParticleBackground from './particlebackground';
import { Link } from 'react-router-dom';
import { supabase } from '@/supabaseClient';
import { toast } from 'sonner';

export default function HeroSection({ joined, onJoined }) {
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleJoinWaitlist = async () => {
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      toast.error('Please enter a valid email address');
      return;
    }

    setSubmitting(true);
    try {
      // The user wants to insert into auth.users. 
      // signInWithOtp is the most secure way to handle this on the client.
      // It handles duplicate checking and insertion automatically.
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: window.location.origin,
        }
      });

      if (error) {
        if (error.status === 429) {
          toast.error('Too many attempts. Please try again later.');
        } else {
          toast.error(error.message || 'Failed to join waitlist. Please try again.');
        }
        return;
      }

      toast.success('You\'re on the hype list! Check your email to confirm. 🔥');
      setEmail('');
      if (onJoined) onJoined();
    } catch (err) {
      console.error('Waitlist error:', err);
      toast.error('An unexpected error occurred. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden font-poppins"
      style={{ background: '#0A0A0A' }}>
      <ParticleBackground />
      
      {/* Gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-20 blur-3xl"
        style={{ background: 'radial-gradient(circle, #7C3AED 0%, transparent 70%)' }} />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full opacity-15 blur-3xl"
        style={{ background: 'radial-gradient(circle, #EC4899 0%, transparent 70%)' }} />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center pt-24 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm mb-8">
            <Zap className="w-4 h-4 text-purple-400" />
            <span className="text-sm font-medium text-gray-300">Love building but hate marketing? You are at right place.</span>
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="text-5xl sm:text-5xl md:text-6xl lg:text-[4.5rem] font-bold text-white leading-tight break-words"
          style={{ letterSpacing: '-2px', lineHeight: 1.1 }}
        >
          93% Of App/Saas{' '}
          <span className="bg-clip-text text-transparent inline-block"
            style={{ backgroundImage: 'linear-gradient(90deg, #7C3AED, #EC4899)' }}>
            Fails
          </span>{' '}
          Due To Bad Marketing. Don't Be One Of{' '}
          <span className="bg-clip-text text-transparent inline-block"
            style={{ backgroundImage: 'linear-gradient(90deg, #EC4899, #7C3AED)' }}>
            Them.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-6 text-sm sm:text-base md:text-lg max-w-2xl mx-auto opacity-80"
          style={{ color: '#D1D5DB', lineHeight: 1.6 }}
        >
        Your AI marketing co-pilot. It finds your potential customers in live conversations, creates actionable strategies, writes posts that sound exactly like you, posts and schedules them automatically, gives you analytics, and tells you exactly what to change to grow. It will make your app marketing on autopilot.

        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45 }}
          className="mt-10 flex flex-col items-center justify-center gap-4 px-4"
        >
          <AnimatePresence mode="wait">
            {!joined ? (
              <motion.div
                key="email-input"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="relative p-[1px] rounded-xl w-full max-w-md"
                style={{ background: 'linear-gradient(90deg, #7C3AED, #EC4899)', boxShadow: '0 0 24px 2px rgba(124,58,237,0.25)' }}
              >
                <div className="flex flex-col sm:flex-row items-stretch gap-0 rounded-[10px] overflow-hidden bg-[#0A0A0A]">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="flex-1 px-4 py-4 bg-transparent text-white placeholder-gray-500 focus:outline-none text-base min-w-0"
                    onKeyDown={(e) => e.key === 'Enter' && handleJoinWaitlist()}
                  />
                  <button
                    onClick={handleJoinWaitlist}
                    disabled={submitting}
                    className="px-6 py-4 text-white font-semibold text-base hover:opacity-90 transition-all sm:whitespace-nowrap"
                    style={{ background: 'linear-gradient(90deg, #7C3AED, #EC4899)' }}
                  >
                    {submitting ? '...' : 'Join the Hype List'}
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="survey-btn"
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: 'backOut' }}
              >
                <Link
                  to="/survey"
                  className="inline-flex items-center gap-2 px-8 py-4 text-white font-semibold text-base rounded-xl hover:opacity-90 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-purple-500/30"
                  style={{ background: 'linear-gradient(90deg, #7C3AED, #EC4899)', boxShadow: '0 0 32px 6px rgba(124,58,237,0.35), 0 0 64px 10px rgba(236,72,153,0.2)' }}
                >
                  Do Survey (34s)
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mt-6 text-sm font-medium"
          style={{ color: '#A1A1AA' }}
        >
          ⚡ 246 app/SaaS founders ready for vibe marketing.
                 We will not spam you( Pinky Promise )
        </motion.p>
      </div>
    </section>
  );
}