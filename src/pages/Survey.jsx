import { supabase } from '../supabaseClient';
import React, { useState, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Sparkles } from 'lucide-react';
import SurveyStep from '../components/survey/SurveyStep';
import SurveyComplete from '../components/survey/SurveyComplete';
import { toast } from 'sonner';

const saveSurveyData = async (payload) => { 
  // 1. Try to get the real logged-in user from Supabase
  const { data: { user } } = await supabase.auth.getUser(); 
  let finalUserId;

  if (user) {
    finalUserId = user.id;
  } else {
    // 2. If no logged-in user, use/create a persistent anonymous user ID via localStorage
    let anonymousId = localStorage.getItem('anonymous_id');
    if (!anonymousId) {
      anonymousId = crypto.randomUUID();
      localStorage.setItem('anonymous_id', anonymousId);
    }
    finalUserId = anonymousId;
  }

  // 3. Save all the survey answers to the user_answers table
  const records = payload.map(item => ({ 
    user_id: finalUserId, 
    question_id: item.question_id, 
    answer: item.answer 
  })); 

  const { error } = await supabase 
    .from('user_answers') 
    .insert(records); 

  if (error) { 
    console.error('❌ Supabase save error:', error); 
    throw error; 
  } else { 
    console.log('✅ Survey persisted to Supabase user_answers table for user:', finalUserId); 
  } 
}; 

const surveyConfig = [
  {
    id: 1,
    headline: 'Let\'s get to know you',
    question: 'What best describes your role?',
    type: 'single',
    field: 'role',
    otherField: 'role_other',
    options: [
      'SaaS / App founder',
      'Solo indie hacker / bootstrapped founder',
      'Product marketer / Growth lead',
      'Marketing manager (in-house at SaaS company)',
      'Agency/freelancer (specializing in SaaS)',
      'Developer building & marketing their own app',
      'Other',
    ],
  },
  {
    id: 2,
    headline: 'Helps us tailor the energy',
    question: 'What\'s your age group?',
    type: 'single',
    field: 'age_group',
    options: ['18–24', '25–34', '35–44', '45+'],
  },
  {
    id: 3,
    headline: 'Where should we help you shine?',
    question: 'Where are you marketing your App/SaaS right now?',
    type: 'multi',
    field: 'marketing_channels',
    otherField: 'marketing_channels_other',
    options: [
      'LinkedIn', 'X (Twitter)', 'Product Hunt', 'Indie Hackers',
      'TikTok / Instagram', 'YouTube', 'Email',
      'Paid ads (Google/Meta)', 'App stores', 'Other',
    ],
  },
  {
    id: 4,
    headline: 'So we know your playground',
    question: 'Your product type?',
    type: 'single',
    field: 'product_type',
    otherField: 'product_type_other',
    options: ['B2B SaaS', 'Consumer app', 'Mobile app', 'Web app', 'AI tool', 'Dev tool', 'Other'],
  },
  {
    id: 5,
    headline: 'What stage are you crushing?',
    question: 'Current focus stage?',
    type: 'single',
    field: 'focus_stage',
    options: ['Pre-launch (waitlist)', 'MVP launch', 'Growth & acquisition', 'Retention & expansion', 'All of the above'],
  },
  {
    id: 6,
    headline: 'Be brutally honest – this unlocks real help',
    question: 'What\'s the biggest marketing headache for your App/SaaS right now?',
    type: 'text',
    field: 'biggest_headache',
    options: ['E.g., posts get no engagement, don\'t know where my audience hangs out, too many tools…'],
  },
  {
    id: 7,
    headline: 'Which superpower will 10x your marketing first?',
    question: 'Which is the best feature in Vibe Hype that you think will help you the most?',
    type: 'single',
    field: 'best_feature',
    otherField: 'best_feature_other',
    options: [
      'Audience Spotter (finds who wants your app & where they rant)',
      'Hook Maker & Ready Posts (instant scroll-stopping content)',
      'Auto Poster (schedules across platforms so you stay consistent)',
      'Competitor Watcher (steals winning ideas ethically)',
      'Results Tracker (daily insights on what actually grows sign-ups)',
      '24/7 Marketing Buddy (chat expert trained on your app)',
      'Other',
    ],
  },
  {
    id: 8,
    headline: 'Dream big – help us build the future of vibe marketing',
    question: 'Tell us what features we can add that can make your marketing more vibe?',
    type: 'text',
    field: 'dream_features',
    options: ['E.g., better Reddit thread finder, viral video script generator, tone matcher for my brand…'],
  },
];

export default function Survey() {
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [showComplete, setShowComplete] = useState(false);
  const navigate = useNavigate();

  const handleDone = useCallback(() => {
    navigate('/pre-purchase');
  }, [navigate]);

  const current = surveyConfig[step - 1];
  const hasOther = current.otherField && (
    current.type === 'single'
      ? answers[current.field] === 'Other'
      : Array.isArray(answers[current.field]) && answers[current.field].includes('Other')
  );

  const canNext = () => {
    const val = answers[current.field];
    if (current.type === 'text') return val && val.trim().length > 0;
    if (current.type === 'multi') return Array.isArray(val) && val.length > 0;
    return !!val;
  };

  const handleNext = async () => {
    if (!canNext()) return;
    if (step < surveyConfig.length) {
      setStep(step + 1);
    } else {
      setSubmitting(true); 
      try { 
        const payload = surveyConfig.map(c => { 
          const val = answers[c.field]; 
          let text = Array.isArray(val) ? val.join(', ') : (val || ''); 
          if (c.otherField && answers[c.otherField]) text += ` (Other: ${answers[c.otherField]})`; 
          return { question_id: c.id, answer: text.trim() }; 
        }).filter(p => p.answer !== ''); 
 
        await saveSurveyData(payload); 
        
        toast.success('Survey submitted successfully! 🔥'); 
        navigate('/pre-purchase'); 
      } catch (err) { 
        console.error('❌ Submission error:', err); 
        toast.error('Failed to save answers. Please try again.'); 
      } finally { 
        setSubmitting(false); 
      } 
    }
  };

  if (showComplete) return <SurveyComplete onDone={handleDone} />;
<div className="w-full max-w-md mx-auto px-4"></div>
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
        <Link to="/" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">
          Back to Home
        </Link>
      </div>

      {/* Survey content */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 py-12">
        <div className="w-full max-w-md mx-auto px-4">
          <AnimatePresence mode="wait">
            <SurveyStep
              key={step}
              step={step}
              totalSteps={surveyConfig.length}
              headline={current.headline}
              question={current.question}
              type={current.type}
              options={current.options}
              value={answers[current.field]}
              onChange={(val) => setAnswers({ ...answers, [current.field]: val })}
              showOtherInput={hasOther}
              otherValue={answers[current.otherField]}
              onOtherChange={(val) => setAnswers({ ...answers, [current.otherField]: val })}
            />
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-10">
            <button
              onClick={() => step > 1 && setStep(step - 1)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-all ${
                step > 1
                  ? 'text-gray-300 border border-white/10 hover:bg-white/5'
                  : 'text-gray-600 cursor-not-allowed'
              }`}
              disabled={step === 1}
            >
              <ArrowLeft className="w-4 h-4" /> Back
            </button>

            <button
              onClick={handleNext}
              disabled={!canNext() || submitting}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-purple-500/20 ${
                canNext() ? 'opacity-100' : 'opacity-40 cursor-not-allowed'
              }`}
              style={{ background: 'linear-gradient(90deg, #7C3AED, #EC4899)', borderRadius: '8px' }}
            >
              {submitting ? 'Submitting...' : step === surveyConfig.length ? 'Finish' : 'Next'}
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}