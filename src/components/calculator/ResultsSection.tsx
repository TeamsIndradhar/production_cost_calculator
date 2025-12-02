'use client';

import { motion } from 'framer-motion';
import { CostResults, PROFIT_FIELD } from '@/lib/types';
import { formatCurrency, formatNumber } from '@/lib/calculations';
import { InputField } from '@/components/ui/InputField';
import { Sparkles, Target, TrendingUp, Wallet, Receipt } from 'lucide-react';

interface ResultsSectionProps {
  results: CostResults | null;
  productionQuantity: number;
  desiredProfitPercent: number;
  onProfitChange: (value: number) => void;
}

export function ResultsSection({ results, productionQuantity, desiredProfitPercent, onProfitChange }: ResultsSectionProps) {
  const hasValidData = results !== null;
  
  // Calculate total batch selling price
  const totalBatchSellingPrice = hasValidData ? results.recommendedSellingPrice * productionQuantity : 0;

  return (
    <div className="bg-white rounded-xl sm:rounded-2xl border border-slate-200/80 shadow-sm shadow-slate-200/50 overflow-hidden">
      {/* Header */}
      <div className="px-4 sm:px-5 py-3 sm:py-4 border-b border-slate-100 bg-gradient-to-r from-orange-50/50 to-white">
        <div className="flex items-center gap-2 sm:gap-3">
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className="p-1.5 sm:p-2 bg-[#E8712C]/10 rounded-lg sm:rounded-xl"
          >
            <Target className="w-4 h-4 text-[#E8712C]" />
          </motion.div>
          <div>
            <h2 className="text-xs sm:text-sm font-semibold text-slate-800">Pricing & Profit</h2>
            <p className="text-[8px] sm:text-[10px] text-slate-500 uppercase tracking-wider">Set Your Margin</p>
          </div>
        </div>
      </div>

      <div className="p-3 sm:p-4 lg:p-5 space-y-3 sm:space-y-4">
        {/* Profit Input */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="p-3 sm:p-4 rounded-lg sm:rounded-xl bg-gradient-to-br from-orange-50 to-amber-50/50 border border-orange-100 overflow-visible"
        >
          <div className="w-full min-w-0">
            <InputField
              label={PROFIT_FIELD.label}
              value={desiredProfitPercent}
              onChange={onProfitChange}
              placeholder={PROFIT_FIELD.placeholder}
              suffix={PROFIT_FIELD.suffix}
              tooltip={PROFIT_FIELD.tooltip}
              highlight
            />
          </div>
        </motion.div>

        {hasValidData ? (
          <>
            {/* Cost Per Piece */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="p-2.5 sm:p-3 rounded-lg sm:rounded-xl bg-slate-50 border border-slate-100"
            >
              <p className="text-[9px] sm:text-[10px] text-slate-500 uppercase tracking-wider mb-1">Cost Per Piece</p>
              <p className="text-sm sm:text-lg font-bold text-slate-800">{formatCurrency(results.totalCostPerPiece)}</p>
            </motion.div>

            {/* Selling Price Per Piece - Featured */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="relative p-4 sm:p-5 rounded-xl sm:rounded-2xl overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#3D5A73] to-[#4a6d8a]" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.1),transparent_50%)]" />
              
              <div className="relative">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0">
                  <div>
                    <p className="text-[9px] sm:text-xs text-white/70 mb-1">Selling Price/Piece</p>
                    <p className="text-lg sm:text-2xl font-bold text-white">{formatCurrency(results.recommendedSellingPrice)}</p>
                  </div>
                  <div className="sm:text-right">
                    <p className="text-[9px] sm:text-xs text-white/70 mb-1">Profit/Piece</p>
                    <p className="text-sm sm:text-lg font-semibold text-white">{formatCurrency(results.profitPerPiece)}</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Total Batch Selling Price - NEW */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="relative p-4 sm:p-5 rounded-xl sm:rounded-2xl overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-500" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.15),transparent_50%)]" />
              
              <div className="relative">
                <div className="flex items-start gap-2 sm:gap-3 mb-2">
                  <div className="p-1.5 sm:p-2 bg-white/20 rounded-lg flex-shrink-0">
                    <Receipt className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] sm:text-xs text-white/90 font-medium leading-tight">Total Batch Selling Price</p>
                    <p className="text-[8px] sm:text-[10px] text-white/60 truncate">{formatNumber(productionQuantity)} pcs × {formatCurrency(results.recommendedSellingPrice)}</p>
                  </div>
                </div>
                <p className="text-xl sm:text-3xl font-bold text-white">{formatCurrency(totalBatchSellingPrice)}</p>
              </div>
            </motion.div>

            {/* Total Batch Profit */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
              className="relative p-4 sm:p-5 rounded-xl sm:rounded-2xl overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#E8712C] via-[#f08040] to-[#f59e0b]" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.15),transparent_50%)]" />
              
              <div className="relative">
                <div className="flex items-start gap-2 sm:gap-3 mb-2 sm:mb-3">
                  <motion.div 
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                    className="p-1.5 sm:p-2 bg-white/20 rounded-lg flex-shrink-0"
                  >
                    <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                  </motion.div>
                  <div className="min-w-0">
                    <p className="text-[10px] sm:text-xs text-white/90 font-medium leading-tight">Your Batch Profit</p>
                    <p className="text-[8px] sm:text-[10px] text-white/60">{formatNumber(productionQuantity)} pieces</p>
                  </div>
                </div>
                <p className="text-xl sm:text-3xl font-bold text-white">{formatCurrency(results.totalBatchProfit)}</p>
              </div>
            </motion.div>
          </>
        ) : (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center h-32 sm:h-40 text-slate-400 text-xs text-center"
          >
            <Wallet className="w-8 h-8 mb-2 text-slate-300" />
            <p>Enter production quantity<br />to see results</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
