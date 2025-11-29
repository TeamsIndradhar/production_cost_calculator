'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
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

interface TooltipStyle {
  top?: number;
  left?: number;
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
  const [tooltipStyle, setTooltipStyle] = useState<TooltipStyle>({});
  const infoRef = useRef<SVGSVGElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/,/g, '');
    const numValue = parseFloat(rawValue) || 0;
    onChange(numValue);
  };

  // Calculate optimal tooltip position using fixed positioning for viewport-aware placement
  const calculatePosition = useCallback(() => {
    if (!infoRef.current) return;

    const iconRect = infoRef.current.getBoundingClientRect();
    const tooltipWidth = 220;
    const tooltipHeight = 80;
    const gap = 10;
    const viewportPadding = 16;

    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    // Calculate icon center
    const iconCenterX = iconRect.left + iconRect.width / 2;
    const iconBottom = iconRect.bottom;
    const iconTop = iconRect.top;

    // Determine vertical position (prefer below)
    const spaceBelow = viewportHeight - iconBottom - gap;
    const showAbove = spaceBelow < tooltipHeight + viewportPadding;

    // Calculate top position
    let topPosition: number;
    if (showAbove) {
      topPosition = iconTop - tooltipHeight - gap;
    } else {
      topPosition = iconBottom + gap;
    }

    // Calculate horizontal position - try to center on icon, but clamp to viewport
    let leftPosition = iconCenterX - tooltipWidth / 2;
    
    // Clamp to viewport boundaries
    if (leftPosition < viewportPadding) {
      leftPosition = viewportPadding;
    } else if (leftPosition + tooltipWidth > viewportWidth - viewportPadding) {
      leftPosition = viewportWidth - tooltipWidth - viewportPadding;
    }

    setTooltipStyle({
      top: topPosition,
      left: leftPosition,
    });
  }, []);

  useEffect(() => {
    if (showTooltip) {
      // Small delay to ensure DOM is ready
      requestAnimationFrame(calculatePosition);
      window.addEventListener('resize', calculatePosition);
      window.addEventListener('scroll', calculatePosition, true);
    }
    return () => {
      window.removeEventListener('resize', calculatePosition);
      window.removeEventListener('scroll', calculatePosition, true);
    };
  }, [showTooltip, calculatePosition]);

  return (
    <div className="group min-w-0 w-full">
      <div className="flex items-center justify-between mb-1.5 sm:mb-2 min-h-[16px] gap-2">
        <label className={`text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider ${
          highlight ? 'text-[#E8712C]' : 'text-slate-500'
        }`} style={{ wordBreak: 'keep-all' }}>
          {label}
        </label>
        {tooltip && (
          <div className="relative flex-shrink-0">
            <Info
              ref={infoRef}
              className="w-3.5 h-3.5 text-slate-400 cursor-help hover:text-[#3D5A73] transition-colors"
              onMouseEnter={() => setShowTooltip(true)}
              onMouseLeave={() => setShowTooltip(false)}
              onClick={() => setShowTooltip(!showTooltip)}
            />
            <AnimatePresence>
              {showTooltip && (
                <motion.div
                  ref={tooltipRef}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.15, ease: 'easeOut' }}
                  style={{
                    position: 'fixed',
                    top: tooltipStyle.top,
                    left: tooltipStyle.left,
                    width: 220,
                  }}
                  className="z-[9999] p-3 text-xs text-slate-600 bg-white rounded-xl shadow-2xl border border-slate-200"
                  onMouseEnter={() => setShowTooltip(true)}
                  onMouseLeave={() => setShowTooltip(false)}
                >
                  <div className="leading-relaxed">{tooltip}</div>
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
          relative flex items-center h-10 sm:h-11 rounded-lg sm:rounded-xl transition-all duration-200 w-full min-w-0
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
          <span className="pl-2 sm:pl-3 text-[11px] sm:text-sm text-slate-400 font-medium select-none flex-shrink-0">
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
            flex-1 min-w-0 px-1.5 sm:px-2 text-right text-xs sm:text-sm font-semibold
            bg-transparent outline-none
            ${highlight ? 'text-[#E8712C]' : 'text-slate-800'}
            placeholder:text-slate-300 placeholder:font-normal
          `}
        />
        {suffix && (
          <span className="pr-2 sm:pr-3 text-[11px] sm:text-sm text-slate-400 font-medium select-none whitespace-nowrap flex-shrink-0">
            {suffix}
          </span>
        )}
      </motion.div>
    </div>
  );
}
