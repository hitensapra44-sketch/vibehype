import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, ArrowRight } from 'lucide-react';
import ParticleBackground from './particlebackground';
import { Link } from 'react-router-dom';
import { supabase } from '@/supabaseClient';
import { toast } from 'sonner';

export default function HeroSection({ joined, onJoined, onValidateEmail }) {
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleJoinWaitlist = async () => {
    // Enhanced Validation
    const finalEmail = onValidateEmail ? onValidateEmail(email) : email;
    if (!finalEmail) return;

    setSubmitting(true);
    try {
      // The user wants to insert into auth.users. 
      // signInWithOtp is the most secure way to handle this on the client.
      // It handles duplicate checking and insertion automatically.
      const { error } = await supabase.auth.signInWithOtp({
        email: finalEmail,
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
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden font-poppins bg-transparent">
      <ParticleBackground />

      {/* Gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-10 blur-3xl"
        style={{ background: 'radial-gradient(circle, #b55933 0%, transparent 70%)' }} />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full opacity-5 blur-3xl"
        style={{ background: 'radial-gradient(circle, #9e4a2a 0%, transparent 70%)' }} />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center pt-24 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm mb-8">
            <Zap className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-text-secondary">Love Building But Hate Marketing? You Are in Right Place.</span>
          </div>
        </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight break-words"
            style={{ letterSpacing: '-2px', lineHeight: 1.1 }}
          >
            93% Of App/Saas{' '}
            <span className="text-primary inline-block">
              Fails
            </span>{' '}
            Due To Bad Marketing. Don't Be One Of{' '}
            <span className="text-primary inline-block">
              Them.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-6 text-xs sm:text-sm md:text-base max-w-full mx-auto text-text-secondary"
            style={{ lineHeight: 1.4 }}
          >
            Vibe Hype an AI marketing co-pilot. it finds real people already talking about your problem, figures out exactly what to say to them, builds you a clear strategy, writes posts that sound like you not a robot, schedules and posts everything automatically, tracks what is working, and tells you exactly what to change to keep growing. This is app marketing on autopilot.
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
                className="relative p-[1px] rounded-xl w-full max-w-md bg-border-muted overflow-hidden shadow-lg shadow-primary/10"
              >
                <div className="flex flex-col sm:flex-row items-stretch gap-0 rounded-[10px] overflow-hidden bg-bg-surface border border-border-muted">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="flex-1 px-4 py-4 bg-transparent text-text-primary placeholder-text-secondary/50 focus:outline-none text-base min-w-0"
                    onKeyDown={(e) => e.key === 'Enter' && handleJoinWaitlist()}
                  />
                  <button
                    onClick={handleJoinWaitlist}
                    disabled={submitting}
                    className="px-6 py-4 text-white font-semibold text-base bg-primary hover:bg-primary-hover transition-all duration-200 sm:whitespace-nowrap"
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
                   className="inline-flex items-center gap-2 px-8 py-4 text-white font-semibold text-base rounded-xl bg-primary hover:bg-primary-hover transition-all duration-200 hover:-translate-y-0.5 shadow-lg shadow-primary/20"
                 >
                   {typeof window !== 'undefined' && localStorage.getItem('pre_purchase_email_confirmed') === 'true' ? (
                     <span style={{ whiteSpace: 'pre-line' }}>
                       Thank you for pre pre-purchasing. As a pre-purchase customer, you will receive the following exclusive benefits:
                       
                       · Early beta access upon launch of Vibe Hype
                       · Community access
                       · Early access to full Agentic Mode
                       · Unlimited Agentic Mode + priority support for the first month
                       · Personal brand voice setup + upgraded analytics
                       
                       Please note that all of the above features will be available for the first month after the app goes live.
                     </span>
                   ) : (
                     <>
                       Do Survey (34s)
                       <ArrowRight className="w-4 h-4" />
                     </>
                   )}
                 </Link>
               </motion.div>
             )}
          </AnimatePresence>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mt-6 text-sm font-medium text-text-secondary"
        >
          ⚡ 246 app/SaaS founders ready for vibe marketing.
          We will not spam you( Pinky Promise )
        </motion.p>
      </div>
    </section>
  );
}
