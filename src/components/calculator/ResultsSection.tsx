'use client';

import { motion } from 'framer-motion';
import { CostResults, CostInputs, PROFIT_FIELD } from '@/lib/types';
import { formatCurrency, formatPercent, formatNumber } from '@/lib/calculations';
import { InputField } from '@/components/ui/InputField';
import { TrendingUp, Sparkles, Target } from 'lucide-react';

interface ResultsSectionProps {
  results: CostResults | null;
  inputs: CostInputs;
  onProfitChange: (value: number) => void;
}

export function ResultsSection({ results, inputs, onProfitChange }: ResultsSectionProps) {
  const hasValidData = results !== null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="relative bg-slate-800/50 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden"
    >
      {/* Glow effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-blue-500/5" />

      {/* Header */}
      <div className="relative px-5 py-4 border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-emerald-500/10 rounded-lg">
            <Target className="w-4 h-4 text-emerald-400" />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-white">Pricing & Profit</h2>
            <p className="text-[10px] text-slate-500 uppercase tracking-wider">Set Your Margin</p>
          </div>
        </div>
      </div>

      <div className="relative p-5 space-y-4">
        {/* Profit Input */}
        <div className="p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/20">
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

        {hasValidData ? (
          <>
            {/* Key Metrics */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                <p className="text-[10px] text-slate-500 uppercase tracking-wider mb-1">Cost/Piece</p>
                <p className="text-base font-bold text-white">{formatCurrency(results.totalCostPerPiece)}</p>
              </div>
              <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                <p className="text-[10px] text-slate-500 uppercase tracking-wider mb-1">Margin</p>
                <p className="text-base font-bold text-white">{formatPercent(results.grossMarginPercent)}</p>
              </div>
            </div>

            {/* Selling Price - Featured */}
            <motion.div
              initial={{ scale: 0.98 }}
              animate={{ scale: 1 }}
              className="relative p-5 rounded-xl overflow-hidden"
            >
              {/* Gradient background */}
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-500" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.15),transparent_50%)]" />
              
              <div className="relative">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-white/70 mb-1">Selling Price</p>
                    <p className="text-2xl font-bold text-white">{formatCurrency(results.recommendedSellingPrice)}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-white/70 mb-1">Profit/Piece</p>
                    <p className="text-lg font-semibold text-white">{formatCurrency(results.profitPerPiece)}</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Total Batch Profit */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="relative p-5 rounded-xl overflow-hidden"
            >
              {/* Gradient background */}
              <div className="absolute inset-0 bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-600" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.1),transparent_50%)]" />
              
              <div className="relative">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-white/10 rounded-lg">
                    <Sparkles className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="text-xs text-white/80">Total Batch Profit</p>
                    <p className="text-[10px] text-white/50">{formatNumber(inputs.productionQuantity)} pieces</p>
                  </div>
                </div>
                <p className="text-3xl font-bold text-white">{formatCurrency(results.totalBatchProfit)}</p>
              </div>
            </motion.div>
          </>
        ) : (
          <div className="flex items-center justify-center h-40 text-slate-500 text-xs text-center">
            Enter production quantity<br />to see results
          </div>
        )}
      </div>
    </motion.div>
  );
}
