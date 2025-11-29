'use client';

import { motion } from 'framer-motion';
import { CostResults, CostInputs, PROFIT_FIELD } from '@/lib/types';
import { formatCurrency, formatPercent, formatNumber } from '@/lib/calculations';
import { InputField } from '@/components/ui/InputField';
import { Sparkles, Target } from 'lucide-react';

interface ResultsSectionProps {
  results: CostResults | null;
  inputs: CostInputs;
  onProfitChange: (value: number) => void;
}

export function ResultsSection({ results, inputs, onProfitChange }: ResultsSectionProps) {
  const hasValidData = results !== null;

  return (
    <div className="bg-white rounded-xl sm:rounded-2xl border border-slate-200/80 shadow-sm shadow-slate-200/50">
      {/* Header */}
      <div className="px-4 sm:px-5 py-3 sm:py-4 border-b border-slate-100 bg-gradient-to-r from-orange-50/50 to-white">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="p-1.5 sm:p-2 bg-[#E8712C]/10 rounded-lg sm:rounded-xl">
            <Target className="w-4 h-4 text-[#E8712C]" />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-slate-800">Pricing & Profit</h2>
            <p className="text-[9px] sm:text-[10px] text-slate-500 uppercase tracking-wider">Set Your Margin</p>
          </div>
        </div>
      </div>

      <div className="p-3 sm:p-4 lg:p-5 space-y-3 sm:space-y-4">
        {/* Profit Input */}
        <div className="p-3 sm:p-4 rounded-lg sm:rounded-xl bg-gradient-to-br from-orange-50 to-amber-50/50 border border-orange-100 overflow-visible">
          <div className="w-full min-w-0">
            <InputField
              label={PROFIT_FIELD.label}
              value={inputs.desiredProfitPercent}
              onChange={onProfitChange}
              placeholder={PROFIT_FIELD.placeholder}
              suffix={PROFIT_FIELD.suffix}
              tooltip={PROFIT_FIELD.tooltip}
              highlight
            />
          </div>
        </div>

        {hasValidData ? (
          <>
            {/* Key Metrics */}
            <div className="grid grid-cols-2 gap-2 sm:gap-3">
              <div className="p-2.5 sm:p-3 rounded-lg sm:rounded-xl bg-slate-50 border border-slate-100">
                <p className="text-[9px] sm:text-[10px] text-slate-500 uppercase tracking-wider mb-0.5 sm:mb-1">Cost/Piece</p>
                <p className="text-sm sm:text-base font-bold text-slate-800">{formatCurrency(results.totalCostPerPiece)}</p>
              </div>
              <div className="p-2.5 sm:p-3 rounded-lg sm:rounded-xl bg-slate-50 border border-slate-100">
                <p className="text-[9px] sm:text-[10px] text-slate-500 uppercase tracking-wider mb-0.5 sm:mb-1">Gross Margin</p>
                <p className="text-sm sm:text-base font-bold text-slate-800">{formatPercent(results.grossMarginPercent)}</p>
              </div>
            </div>

            {/* Selling Price - Featured */}
            <motion.div
              initial={{ scale: 0.98 }}
              animate={{ scale: 1 }}
              className="relative p-4 sm:p-5 rounded-lg sm:rounded-xl overflow-hidden"
            >
              {/* Gradient background */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#3D5A73] to-[#4a6d8a]" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.1),transparent_50%)]" />
              
              <div className="relative">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[10px] sm:text-xs text-white/70 mb-0.5 sm:mb-1">Selling Price</p>
                    <p className="text-xl sm:text-2xl font-bold text-white">{formatCurrency(results.recommendedSellingPrice)}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] sm:text-xs text-white/70 mb-0.5 sm:mb-1">Profit/Piece</p>
                    <p className="text-base sm:text-lg font-semibold text-white">{formatCurrency(results.profitPerPiece)}</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Total Batch Profit */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="relative p-4 sm:p-5 rounded-lg sm:rounded-xl overflow-hidden"
            >
              {/* Gradient background */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#E8712C] via-[#f08040] to-[#f59e0b]" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.15),transparent_50%)]" />
              
              <div className="relative">
                <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                  <div className="p-1.5 sm:p-2 bg-white/20 rounded-lg">
                    <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
                  </div>
                  <div>
                    <p className="text-[11px] sm:text-xs text-white/90 font-medium">Total Batch Profit</p>
                    <p className="text-[9px] sm:text-[10px] text-white/60">{formatNumber(inputs.productionQuantity)} pieces</p>
                  </div>
                </div>
                <p className="text-2xl sm:text-3xl font-bold text-white">{formatCurrency(results.totalBatchProfit)}</p>
              </div>
            </motion.div>
          </>
        ) : (
          <div className="flex items-center justify-center h-32 sm:h-40 text-slate-400 text-xs text-center">
            Enter production quantity<br />to see results
          </div>
        )}
      </div>
    </div>
  );
}
