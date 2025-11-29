'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Info } from 'lucide-react';

interface InputFieldProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  placeholder?: string;
  prefix?: string;
  suffix?: string;
  tooltip?: string;
  highlight?: boolean;
}

export function InputField({
  label,
  value,
  onChange,
  placeholder,
  prefix,
  suffix,
  tooltip,
  highlight = false,
}: InputFieldProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/,/g, '');
    const numValue = parseFloat(rawValue) || 0;
    onChange(numValue);
  };

  return (
    <div className="group">
      <div className="flex items-center justify-between mb-2 h-4">
        <label className={`text-[11px] font-medium uppercase tracking-wider truncate ${
          highlight ? 'text-emerald-400' : 'text-slate-500'
        }`}>
          {label}
        </label>
        {tooltip && (
          <div className="relative">
            <Info
              className="w-3 h-3 text-slate-600 cursor-help hover:text-slate-400 transition-colors"
              onMouseEnter={() => setShowTooltip(true)}
              onMouseLeave={() => setShowTooltip(false)}
            />
            <AnimatePresence>
              {showTooltip && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: 5 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 5 }}
                  className="absolute z-50 right-0 top-5 w-44 p-2.5 text-xs text-slate-300 bg-slate-900 rounded-lg shadow-xl border border-white/10"
                >
                  {tooltip}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>

      <motion.div
        animate={{
          boxShadow: isFocused 
            ? highlight 
              ? '0 0 0 2px rgba(16, 185, 129, 0.2)' 
              : '0 0 0 2px rgba(59, 130, 246, 0.2)'
            : '0 0 0 0px transparent'
        }}
        className={`
          relative flex items-center h-11 rounded-xl transition-all duration-200
          ${isFocused 
            ? highlight 
              ? 'bg-emerald-500/10 border-emerald-500/50' 
              : 'bg-white/10 border-white/20'
            : highlight
              ? 'bg-emerald-500/5 border-emerald-500/20 hover:bg-emerald-500/10'
              : 'bg-white/5 border-white/10 hover:bg-white/10'
          }
          border
        `}
      >
        {prefix && (
          <span className="pl-3 text-sm text-slate-500 font-medium select-none">
            {prefix}
          </span>
        )}
        <input
          type="text"
          inputMode="decimal"
          value={value === 0 ? '' : value.toLocaleString('en-IN')}
          onChange={handleChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder || '0'}
          className={`
            w-full px-3 text-right text-sm font-semibold
            bg-transparent outline-none
            ${highlight ? 'text-emerald-400' : 'text-white'}
            placeholder:text-slate-600 placeholder:font-normal
            ${prefix ? 'pl-1' : ''}
            ${suffix ? 'pr-1' : ''}
          `}
        />
        {suffix && (
          <span className="pr-3 text-sm text-slate-500 font-medium select-none whitespace-nowrap">
            {suffix}
          </span>
        )}
      </motion.div>
    </div>
  );
}
