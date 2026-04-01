import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check } from 'lucide-react';

export default function SurveyStep({
  step,
  totalSteps,
  headline,
  question,
  type, // 'single' | 'multi' | 'text'
  options,
  value,
  onChange,
  showOtherInput,
  otherValue,
  onOtherChange,
}) {
  const progress = ((step) / totalSteps) * 100;

  return (
    <motion.div
      key={step}
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }}
      transition={{ duration: 0.35 }}
      className="w-full"
    >
      {/* Progress */}
      <div className="mb-8">
        <div className="flex items-center justify-between text-sm mb-2" style={{ color: '#A1A1AA' }}>
          <span>Step {step}/{totalSteps}</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
          <motion.div
            className="h-full rounded-full"
            style={{ background: 'linear-gradient(90deg, #7C3AED, #EC4899)' }}
            initial={{ width: `${((step - 1) / totalSteps) * 100}%` }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.4 }}
          />
        </div>
      </div>

      {/* Headline */}
      <p className="text-sm font-medium mb-2" style={{ color: '#A1A1AA' }}>{headline}</p>
      <h2 className="text-2xl sm:text-3xl font-bold text-white mb-8" style={{ letterSpacing: '-0.5px' }}>
        {question}
      </h2>

      {/* Options */}
      {type === 'single' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {options.map((opt) => {
            const selected = value === opt;
            return (
              <button
                key={opt}
                onClick={() => onChange(opt)}
                className={`relative p-4 rounded-xl border text-left text-sm font-medium transition-all duration-200 ${
                  selected
                    ? 'border-purple-500 bg-purple-500/10 text-white'
                    : 'border-white/10 bg-white/[0.02] text-gray-300 hover:border-white/20 hover:bg-white/[0.04]'
                }`}
              >
                {selected && (
                  <div className="absolute top-3 right-3 w-5 h-5 rounded-full flex items-center justify-center"
                    style={{ background: 'linear-gradient(90deg, #7C3AED, #EC4899)' }}>
                    <Check className="w-3 h-3 text-white" />
                  </div>
                )}
                {opt}
              </button>
            );
          })}
        </div>
      )}

      {type === 'multi' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {options.map((opt) => {
            const arr = Array.isArray(value) ? value : [];
            const selected = arr.includes(opt);
            return (
              <button
                key={opt}
                onClick={() => {
                  if (selected) {
                    onChange(arr.filter((v) => v !== opt));
                  } else {
                    onChange([...arr, opt]);
                  }
                }}
                className={`relative p-4 rounded-xl border text-left text-sm font-medium transition-all duration-200 ${
                  selected
                    ? 'border-purple-500 bg-purple-500/10 text-white'
                    : 'border-white/10 bg-white/[0.02] text-gray-300 hover:border-white/20 hover:bg-white/[0.04]'
                }`}
              >
                {selected && (
                  <div className="absolute top-3 right-3 w-5 h-5 rounded-full flex items-center justify-center"
                    style={{ background: 'linear-gradient(90deg, #7C3AED, #EC4899)' }}>
                    <Check className="w-3 h-3 text-white" />
                  </div>
                )}
                {opt}
              </button>
            );
          })}
        </div>
      )}

      {type === 'text' && (
        <textarea
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          placeholder={options?.[0] || 'Type your answer...'}
          rows={5}
          maxLength={500}
          className="w-full p-4 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder-gray-600 resize-none focus:outline-none focus:border-purple-500 text-base transition-colors"
        />
      )}

      {/* Other input */}
      <AnimatePresence>
        {showOtherInput && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            <input
              type="text"
              value={otherValue || ''}
              onChange={(e) => onOtherChange(e.target.value)}
              placeholder="Please specify..."
              className="mt-3 w-full p-4 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-purple-500 text-sm transition-colors"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}