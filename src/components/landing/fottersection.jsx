import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '@/supabaseClient';
import { toast } from 'sonner';

export default function FooterSection({ joined, onJoined }) {
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      toast.error('Please enter a valid email address');
      return;
    }

    setSubmitting(true);
    try {
      // Use signInWithOtp for waitlist signup.
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
    <footer id="waitlist" className="font-poppins" style={{ background: '#000000' }}>
      {/* Email Signup */}
      <div className="py-20 px-4 sm:px-6">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-2" style={{ letterSpacing: '-1px' }}>
              Ready to Make Your Brand{' '}
              <span className="bg-clip-text text-transparent"
                style={{ backgroundImage: 'linear-gradient(90deg, #7C3AED, #EC4899)' }}>
                Impossible to Ignore?
              </span>
            </h2>
            <p className="text-base mb-8" style={{ color: '#A1A1AA' }}>
              {joined ? "You're already on the list! Start your survey above." : "Get early access + free viral template pack"}
            </p>

            {!joined && (
              <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
                  placeholder="your@email.com"
                  className="flex-1 px-5 py-3.5 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 text-base transition-colors"
                />
                <button
                  onClick={handleSubmit}
                  disabled={submitting}
                  className="flex items-center justify-center gap-2 px-6 py-3.5 font-semibold text-white rounded-lg hover:opacity-90 transition-all hover:-translate-y-0.5"
                  style={{ background: 'linear-gradient(90deg, #7C3AED, #EC4899)', borderRadius: '8px' }}
                >
                  {submitting ? '...' : 'Join the Hype List'}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </motion.div>
        </div>
      </div>

      {/* Footer Links */}
      <div className="border-t border-white/5 py-8 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-md flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #7C3AED, #EC4899)' }}>
              <Sparkles className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="text-white font-bold text-lg">Vibe Hype</span>
          </Link>

          <div className="flex items-center gap-6 text-sm" style={{ color: '#A1A1AA' }}>
            <button onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}>
              Features
            </button>
            <button onClick={() => document.getElementById('howitworks')?.scrollIntoView({ behavior: 'smooth' })}>
              How it Works
            </button>
            <button onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}>
              Pricing
            </button>
          </div>

          <p className="text-sm" style={{ color: '#71717A' }}>
            © 2026 Vibe Hype. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}