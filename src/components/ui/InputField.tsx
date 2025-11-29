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
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
  transform?: string;
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

  // Calculate optimal tooltip position with pixel-perfect boundary detection
  const calculatePosition = useCallback(() => {
    if (!infoRef.current) return;

    const iconRect = infoRef.current.getBoundingClientRect();
    const tooltipWidth = 200; // slightly larger than w-48 for safety
    const tooltipHeight = 100; // approximate max height
    const gap = 8; // gap between icon and tooltip
    const viewportPadding = 12; // minimum distance from viewport edge

    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    // Calculate icon center position
    const iconCenterX = iconRect.left + iconRect.width / 2;
    const iconTop = iconRect.top;
    const iconBottom = iconRect.bottom;

    // Determine vertical position (prefer below, use above if not enough space)
    const spaceBelow = viewportHeight - iconBottom - gap;
    const spaceAbove = iconTop - gap;
    const showAbove = spaceBelow < tooltipHeight && spaceAbove > spaceBelow;

    // Calculate horizontal position to keep tooltip within viewport
    let leftPosition = iconCenterX - tooltipWidth / 2;
    
    // Clamp to viewport boundaries
    if (leftPosition < viewportPadding) {
      leftPosition = viewportPadding;
    } else if (leftPosition + tooltipWidth > viewportWidth - viewportPadding) {
      leftPosition = viewportWidth - tooltipWidth - viewportPadding;
    }

    // Convert to position relative to the icon's parent (the relative div)
    const parentRect = infoRef.current.parentElement?.getBoundingClientRect();
    if (!parentRect) return;

    const relativeLeft = leftPosition - parentRect.left;

    const style: TooltipStyle = {
      left: `${relativeLeft}px`,
    };

    if (showAbove) {
      style.bottom = `${gap + iconRect.height}px`;
    } else {
      style.top = `${gap + iconRect.height}px`;
    }

    setTooltipStyle(style);
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
    <div className="group">
      <div className="flex items-center justify-between mb-1.5 sm:mb-2 min-h-[16px]">
        <label className={`text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider truncate ${
          highlight ? 'text-[#E8712C]' : 'text-slate-500'
        }`}>
          {label}
        </label>
        {tooltip && (
          <div className="relative">
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
                  initial={{ opacity: 0, y: tooltipStyle.top ? -4 : 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: tooltipStyle.top ? -4 : 4 }}
                  transition={{ duration: 0.15, ease: 'easeOut' }}
                  style={tooltipStyle}
                  className="absolute z-[9999] w-[200px] p-3 text-xs text-slate-600 bg-white rounded-xl shadow-2xl border border-slate-200"
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
