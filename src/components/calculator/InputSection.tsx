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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative bg-slate-800/50 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden"
    >
      {/* Glow effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-emerald-500/5" />
      
      {/* Header */}
      <div className="relative px-6 py-5 border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-500/10 rounded-lg">
            <Layers className="w-5 h-5 text-blue-400" />
          </div>
          <div>
            <h2 className="text-base font-semibold text-white">Production Costs</h2>
            <p className="text-xs text-slate-500 mt-0.5">Enter your batch totals</p>
          </div>
        </div>
      </div>

      {/* Inputs Grid */}
      <div className="relative p-5">
        <div className="grid grid-cols-2 xl:grid-cols-3 gap-4">
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
    </motion.div>
  );
}
