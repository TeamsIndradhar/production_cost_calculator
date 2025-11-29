'use client';

import { motion } from 'framer-motion';
import { InputField } from '@/components/ui/InputField';
import { CostInputs, COST_INPUT_FIELDS } from '@/lib/types';
import { Layers } from 'lucide-react';

interface InputSectionProps {
  inputs: CostInputs;
  onInputChange: (key: keyof CostInputs, value: number) => void;
}

export function InputSection({ inputs, onInputChange }: InputSectionProps) {
  return (
    <div className="bg-white rounded-xl sm:rounded-2xl border border-slate-200/80 shadow-sm shadow-slate-200/50">
      {/* Header */}
      <div className="px-4 sm:px-6 py-3 sm:py-4 border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="p-1.5 sm:p-2 bg-[#3D5A73]/10 rounded-lg sm:rounded-xl">
            <Layers className="w-4 h-4 sm:w-5 sm:h-5 text-[#3D5A73]" />
          </div>
          <div>
            <h2 className="text-sm sm:text-base font-semibold text-slate-800">Production Costs</h2>
            <p className="text-[10px] sm:text-xs text-slate-500 mt-0.5">Enter your batch totals</p>
          </div>
        </div>
      </div>

      {/* Inputs Grid - 2 cols on mobile, 3 cols on larger screens */}
      <div className="p-3 sm:p-4 lg:p-5">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-3 gap-y-4 sm:gap-x-4 sm:gap-y-5">
          {COST_INPUT_FIELDS.map((field, index) => (
            <motion.div
              key={field.key}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.04, duration: 0.3 }}
            >
              <InputField
                label={field.label}
                value={inputs[field.key]}
                onChange={(value) => onInputChange(field.key, value)}
                placeholder={field.placeholder}
                prefix={field.prefix}
                suffix={field.suffix}
                tooltip={field.tooltip}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
