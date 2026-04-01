import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sparkles, User, ArrowRight } from 'lucide-react';

export default function Navbar({ joined, onJoinWaitlist }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id) => {
    setMobileOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const links = [
    { label: 'Features', id: 'features' },
    { label: 'How it Works', id: 'howitworks' },
    { label: 'Benefits', id: 'benefits' },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 font-poppins ${
          scrolled ? 'bg-black/90 backdrop-blur-xl border-b border-white/5' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, #7C3AED, #EC4899)' }}>
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <span className="text-white font-bold text-xl tracking-tight">Vibe Hype</span>
            </Link>

            <div className="hidden md:flex items-center gap-8">
              {links.map((l) => (
                <button
                  key={l.id}
                  onClick={() => scrollTo(l.id)}
                  className="text-gray-300 hover:text-white transition-colors text-base font-medium tracking-wide"
                >
                  {l.label}
                </button>
              ))}
            </div>

            <div className="hidden md:flex items-center gap-3">
              <AnimatePresence mode="wait">
                {!joined ? (
                  <motion.div
                    key="waitlist-btn"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <div className="relative p-[2px] rounded-lg"
                      style={{ background: 'linear-gradient(90deg, #7C3AED, #EC4899)', boxShadow: '0 0 16px 3px rgba(124,58,237,0.3), 0 0 32px 5px rgba(236,72,153,0.15)' }}>
                      <button
                        onClick={() => scrollTo('waitlist')}
                        className="px-5 py-2 text-sm font-semibold text-white rounded-md hover:opacity-90 transition-all bg-[#0A0A0A]"
                      >
                        Join Waitlist
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="survey-btn"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-3"
                  >
                    <Link
                      to="/survey"
                      className="group flex items-center gap-2 px-5 py-2 text-sm font-semibold text-white rounded-lg hover:opacity-90 transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-purple-500/25"
                      style={{ background: 'linear-gradient(90deg, #7C3AED, #EC4899)' }}
                    >
                      Do Survey (34s)
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                    <div className="w-9 h-9 rounded-full flex items-center justify-center border border-white/20"
                      style={{ background: 'linear-gradient(135deg, rgba(124,58,237,0.3), rgba(236,72,153,0.3))' }}>
                      <User className="w-4 h-4 text-white" />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <button
              className="md:hidden text-white p-2"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-black/95 backdrop-blur-xl pt-20 px-6 md:hidden font-poppins"
          >
            <div className="flex flex-col gap-6">
              {links.map((l) => (
                <button
                  key={l.id}
                  onClick={() => scrollTo(l.id)}
                  className="text-white text-2xl font-semibold text-left"
                >
                  {l.label}
                </button>
              ))}
              <hr className="border-white/10" />
              {!joined ? (
                <button
                  onClick={() => { setMobileOpen(false); scrollTo('waitlist'); }}
                  className="px-6 py-3 text-base font-semibold text-white rounded-lg text-center"
                  style={{ background: 'linear-gradient(90deg, #7C3AED, #EC4899)' }}
                >
                  Join Waitlist
                </button>
              ) : (
                <Link
                  to="/survey"
                  onClick={() => setMobileOpen(false)}
                  className="px-6 py-3 text-base font-semibold text-white rounded-lg text-center"
                  style={{ background: 'linear-gradient(90deg, #7C3AED, #EC4899)' }}
                >
                  Do Survey (34s)
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}