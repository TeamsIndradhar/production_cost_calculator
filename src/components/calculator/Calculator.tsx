'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { BatchInputs, EMPTY_BATCH_INPUTS } from '@/lib/types';
import { calculateBreakdown, calculateResults, generateWarnings } from '@/lib/calculations';
import { InputSection } from './InputSection';
import { BreakdownSection } from './BreakdownSection';
import { ResultsSection } from './ResultsSection';
import { WarningBanner } from '@/components/ui/WarningBanner';
import { RotateCcw, Home } from 'lucide-react';

export function Calculator() {
  // Start with empty inputs
  const [inputs, setInputs] = useState<BatchInputs>(EMPTY_BATCH_INPUTS);

  const handleInputChange = (key: keyof BatchInputs, value: number) => {
    setInputs(prev => ({ ...prev, [key]: value }));
  };

  const handleProfitChange = (value: number) => {
    setInputs(prev => ({ ...prev, desiredProfitPercent: value }));
  };

  const handleReset = () => {
    setInputs(EMPTY_BATCH_INPUTS);
  };

  // Calculate breakdown and results
  const breakdown = useMemo(() => calculateBreakdown(inputs), [inputs]);
  const results = useMemo(() => calculateResults(inputs, breakdown), [inputs, breakdown]);
  const warnings = useMemo(() => generateWarnings(inputs), [inputs]);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Subtle background pattern */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-40" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-orange-100/40 via-transparent to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-blue-100/40 via-transparent to-transparent rounded-full blur-3xl" />
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/90 border-b border-slate-200/60 shadow-sm">
        <div className="max-w-7xl mx-auto px-3 sm:px-6">
          <div className="flex items-center justify-between h-14 sm:h-16 gap-2">
            {/* Logo & Branding */}
            <Link href="/" className="flex-1 min-w-0">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity"
              >
                <div className="relative w-7 h-7 sm:w-10 sm:h-10 flex-shrink-0">
                  <Image
                    src="/logo.png"
                    alt="Indradhar Consultancy"
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
                <div className="border-l border-slate-200 pl-2 min-w-0 flex-1">
                  <h1 className="text-[11px] sm:text-base font-bold text-[#3D5A73] tracking-tight leading-tight line-clamp-1">
                    Cost Calculator
                  </h1>
                  <p className="text-[8px] sm:text-[10px] text-slate-500 uppercase tracking-wider font-medium">
                    Batch → Per-piece
                  </p>
                </div>
              </motion.div>
            </Link>

            {/* Action Buttons */}
            <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
              <Link href="/">
                <motion.button
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="group flex items-center justify-center p-2 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium text-slate-600 hover:text-[#3D5A73] bg-white hover:bg-slate-50 border border-slate-200 hover:border-[#3D5A73]/30 rounded-lg sm:rounded-xl shadow-sm hover:shadow transition-all duration-200 focus:outline-none"
                >
                  <Home className="w-4 h-4" />
                  <span className="hidden sm:inline sm:ml-2">Home</span>
                </motion.button>
              </Link>
              <motion.button
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleReset}
                className="group flex items-center justify-center p-2 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium text-slate-600 hover:text-[#E8712C] bg-white hover:bg-slate-50 border border-slate-200 hover:border-[#E8712C]/30 rounded-lg sm:rounded-xl shadow-sm hover:shadow transition-all duration-200 focus:outline-none"
              >
                <RotateCcw className="w-4 h-4 group-hover:rotate-[-45deg] transition-transform duration-300" />
                <span className="hidden sm:inline sm:ml-2">Reset</span>
              </motion.button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content - flex-1 to push footer down */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-3 sm:px-6 py-4 sm:py-6 lg:py-8 overflow-x-hidden">
        {/* Warnings */}
        <AnimatePresence>
          {warnings.length > 0 && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mb-4 sm:mb-6"
            >
              <WarningBanner warnings={warnings} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Calculator Layout - Stack on mobile, 2-col on tablet, 3-col on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-12 gap-4 sm:gap-5 lg:gap-6">
          {/* Input Section - Full width on mobile, full on tablet, 5 cols on desktop */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, type: "spring", stiffness: 100 }}
            className="md:col-span-2 xl:col-span-5"
          >
            <InputSection inputs={inputs} onInputChange={handleInputChange} />
          </motion.div>

          {/* Breakdown Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
            className="md:col-span-1 xl:col-span-3"
          >
            <BreakdownSection breakdown={breakdown} />
          </motion.div>

          {/* Results Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 100 }}
            className="md:col-span-1 xl:col-span-4"
          >
            <ResultsSection 
              results={results} 
              productionQuantity={inputs.productionQuantity}
              desiredProfitPercent={inputs.desiredProfitPercent}
              onProfitChange={handleProfitChange}
            />
          </motion.div>
        </div>
      </main>

      {/* Footer - Always at bottom */}
      <footer className="py-4 sm:py-5 border-t border-slate-200/60 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 text-[10px] sm:text-xs text-slate-400 text-center">
            <span>Powered by <span className="font-semibold text-[#3D5A73]">Indradhar Consultancy</span></span>
            <span className="hidden sm:inline text-[#E8712C]">–</span>
            <span>Precision cost analysis for manufacturers</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
