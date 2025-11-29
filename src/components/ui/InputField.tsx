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
      <div className="flex items-center justify-between mb-1.5 sm:mb-2 min-h-[16px]">
        <label className={`text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider truncate ${
          highlight ? 'text-[#E8712C]' : 'text-slate-500'
        }`}>
          {label}
        </label>
        {tooltip && (
          <div className="relative hidden sm:block">
            <Info
              className="w-3 h-3 text-slate-400 cursor-help hover:text-[#3D5A73] transition-colors"
              onMouseEnter={() => setShowTooltip(true)}
              onMouseLeave={() => setShowTooltip(false)}
            />
            <AnimatePresence>
              {showTooltip && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: 5 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 5 }}
                  className="absolute z-50 right-0 top-5 w-44 sm:w-48 p-2.5 sm:p-3 text-[11px] sm:text-xs text-slate-600 bg-white rounded-lg sm:rounded-xl shadow-xl border border-slate-200"
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
              ? '0 0 0 2px rgba(232, 113, 44, 0.15)' 
              : '0 0 0 2px rgba(61, 90, 115, 0.1)'
            : '0 0 0 0px transparent'
        }}
        className={`
          relative flex items-center h-10 sm:h-11 rounded-lg sm:rounded-xl transition-all duration-200
          ${isFocused 
            ? highlight 
              ? 'bg-orange-50 border-[#E8712C]' 
              : 'bg-slate-50 border-[#3D5A73]'
            : highlight
              ? 'bg-orange-50/50 border-orange-200 hover:border-[#E8712C]/50'
              : 'bg-slate-50/80 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
          }
          border
        `}
      >
        {prefix && (
          <span className="pl-2.5 sm:pl-3 text-xs sm:text-sm text-slate-400 font-medium select-none">
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
            w-full px-2 sm:px-3 text-right text-xs sm:text-sm font-semibold
            bg-transparent outline-none
            ${highlight ? 'text-[#E8712C]' : 'text-slate-800'}
            placeholder:text-slate-300 placeholder:font-normal
            ${prefix ? 'pl-0.5 sm:pl-1' : ''}
            ${suffix ? 'pr-0.5 sm:pr-1' : ''}
          `}
        />
        {suffix && (
          <span className="pr-2.5 sm:pr-3 text-xs sm:text-sm text-slate-400 font-medium select-none whitespace-nowrap">
            {suffix}
          </span>
        )}
      </motion.div>
    </div>
  );
}
