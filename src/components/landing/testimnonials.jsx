import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const testimonials = [
  {
    handle: '@indiealex42',
    avatar: 'IA',
    badge: '+300% engagement',
    text: 'This concept is exactly what I\'ve been dying for. Pre-purchased the $1.99 monthly in seconds. Can\'t wait for launch – it\'s gonna kill my "post into the void" problem forever. Already feeling less stressed just knowing it\'s coming 🔥',
  },
  {
    handle: '@sarahcodes_',
    avatar: 'SC',
    badge: '+250% reach',
    text: 'Saw the page and got goosebumps – this is the vibe marketing tool we all need. Bought early bird monthly right away. So excited for autopilot posts that actually sound like me. No more guessing what to say or where to post. Let\'s gooo!',
  },
  {
    handle: '@devonbuilds',
    avatar: 'DB',
    badge: '+400% sign-ups',
    text: 'Pre-purchased because the pain points hit home hard. Super pumped for release – this thing will finally solve my problem of juggling 10 tools for one marketing task nightmare. Counting days till I can turn it on and chill.',
  },
  {
    handle: '@mike_the_maker',
    avatar: 'MM',
    badge: '10x productivity',
    text: 'Loving the energy already. Snagged the $1.99/mo pre-purchase instantly. Excited as hell for it to drop – it\'s gonna end my daily manual research + posting grind.',
  },
  {
    handle: '@hitensapra11',
    avatar: 'HS',
    badge: 'Stress-free marketing',
    text: 'Coding was hard then it becomes vibe coding now it\'s easy and stress free. Marketing is hard and this app is converting it into vibe marketing to make it easy and stress free. Love the app.',
  },
];

export default function Testimonials() {
  return (
    <section className="py-24 px-4 sm:px-6 font-poppins" style={{ background: '#050505' }}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-white" style={{ letterSpacing: '-1px', lineHeight: 1.1 }}>
            Founders Who Love{' '}
            <span className="bg-clip-text text-transparent"
              style={{ backgroundImage: 'linear-gradient(90deg, #7C3AED, #EC4899)' }}>
              Vibe Hype
            </span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="p-6 rounded-2xl border border-white/5 bg-white/[0.02] hover:border-purple-500/20 transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white"
                  style={{ background: 'linear-gradient(135deg, #7C3AED, #EC4899)' }}>
                  {t.avatar}
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">{t.handle}</p>
                  <div className="flex gap-1 mt-0.5">
                    {[...Array(5)].map((_, j) => (
                      <Star key={j} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </div>
                <span className="ml-auto text-xs font-semibold px-2.5 py-1 rounded-full"
                  style={{ background: 'linear-gradient(90deg, rgba(124,58,237,0.2), rgba(236,72,153,0.2))', color: '#C084FC' }}>
                  {t.badge}
                </span>
              </div>
              <p className="text-sm leading-relaxed" style={{ color: '#D1D5DB' }}>
                "{t.text}"
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}