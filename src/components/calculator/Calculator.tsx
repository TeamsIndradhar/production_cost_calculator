'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CostInputs, DEFAULT_INPUTS, EMPTY_INPUTS } from '@/lib/types';
import { calculateBreakdown, calculateResults, generateWarnings } from '@/lib/calculations';
import { InputSection } from './InputSection';
import { BreakdownSection } from './BreakdownSection';
import { ResultsSection } from './ResultsSection';
import { WarningBanner } from '@/components/ui/WarningBanner';
import { RotateCcw, Zap } from 'lucide-react';

export function Calculator() {
  const [inputs, setInputs] = useState<CostInputs>(DEFAULT_INPUTS);

  const handleInputChange = (key: keyof CostInputs, value: number) => {
    setInputs(prev => ({ ...prev, [key]: value }));
  };

  const handleProfitChange = (value: number) => {
    setInputs(prev => ({ ...prev, desiredProfitPercent: value }));
  };

  const handleReset = () => {
    setInputs(EMPTY_INPUTS);
  };

  // Calculate breakdown and results
  const breakdown = useMemo(() => calculateBreakdown(inputs), [inputs]);
  const results = useMemo(() => calculateResults(inputs, breakdown), [inputs, breakdown]);
  const warnings = useMemo(() => generateWarnings(inputs), [inputs]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-900 to-slate-800">
      {/* Ambient background effects */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-slate-800/50 to-transparent rounded-full" />
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-2xl bg-slate-900/80 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <motion.div 
                initial={{ rotate: -10 }}
                animate={{ rotate: 0 }}
                className="relative"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-xl blur-lg opacity-50" />
                <div className="relative p-2.5 bg-gradient-to-br from-blue-500 to-emerald-500 rounded-xl">
                  <Zap className="w-5 h-5 text-white" />
                </div>
              </motion.div>
              <div>
                <h1 className="text-lg font-bold text-white tracking-tight">
                  CostCalc
                </h1>
                <p className="text-[10px] text-slate-500 uppercase tracking-widest">
                  Pro Edition
                </p>
              </div>
            </div>

            {/* Reset Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleReset}
              className="group flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-xl transition-all duration-200"
            >
              <RotateCcw className="w-4 h-4 group-hover:rotate-[-45deg] transition-transform duration-300" />
              Reset All
            </motion.button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Warnings */}
        <AnimatePresence>
          {warnings.length > 0 && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mb-6"
            >
              <WarningBanner warnings={warnings} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Calculator Layout */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
          {/* Input Section */}
          <div className="xl:col-span-5">
            <InputSection inputs={inputs} onInputChange={handleInputChange} />
          </div>

          {/* Breakdown Section */}
          <div className="xl:col-span-3">
            <BreakdownSection breakdown={breakdown} />
          </div>

          {/* Results Section */}
          <div className="xl:col-span-4">
            <ResultsSection 
              results={results} 
              inputs={inputs} 
              onProfitChange={handleProfitChange}
            />
          </div>
        </div>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-12 text-center"
        >
          <p className="text-xs text-slate-600">
            Precision cost analysis for modern manufacturers
          </p>
        </motion.footer>
      </main>
    </div>
  );
}
