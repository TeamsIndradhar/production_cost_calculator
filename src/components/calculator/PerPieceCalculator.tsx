'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { PerPieceInputs, EMPTY_PERPIECE_INPUTS, PERPIECE_COST_FIELDS, PROFIT_FIELD, QUANTITY_FIELD, BatchTotals, InputFieldConfig } from '@/lib/types';
import { calculatePerPieceCost, calculateSellingPrice, calculateBatchTotals, generateWarningsPerPiece, formatCurrency, formatNumber } from '@/lib/calculations';
import { InputField } from '@/components/ui/InputField';
import { WarningBanner } from '@/components/ui/WarningBanner';
import { RotateCcw, Home, Layers, Target, Sparkles, Package, Wallet, TrendingUp } from 'lucide-react';

export function PerPieceCalculator() {
  const [inputs, setInputs] = useState<PerPieceInputs>(EMPTY_PERPIECE_INPUTS);

  const handleInputChange = (key: string, value: number) => {
    setInputs(prev => ({ ...prev, [key]: value }));
  };

  const handleProfitChange = (value: number) => {
    setInputs(prev => ({ ...prev, desiredProfitPercent: value }));
  };

  const handleQuantityChange = (value: number) => {
    setInputs(prev => ({ ...prev, productionQuantity: value }));
  };

  const handleReset = () => {
    setInputs(EMPTY_PERPIECE_INPUTS);
  };

  // Step 1: Calculate total cost per piece (sum of all per-piece costs) - always available
  const breakdown = useMemo(() => calculatePerPieceCost(inputs), [inputs]);
  
  // Step 2: Calculate selling price from cost + profit margin - always available
  const pricing = useMemo(() => {
    return calculateSellingPrice(breakdown.totalCostPerPiece, inputs.desiredProfitPercent);
  }, [breakdown.totalCostPerPiece, inputs.desiredProfitPercent]);
  
  // Step 3: Calculate batch totals (only when quantity is entered)
  const batchTotals = useMemo(() => {
    return calculateBatchTotals(inputs, pricing.sellingPrice);
  }, [inputs, pricing.sellingPrice]);
  
  const warnings = useMemo(() => generateWarningsPerPiece(inputs), [inputs]);
  
  const hasPerPieceCosts = breakdown.totalCostPerPiece > 0;

  return (
    <div className="min-h-screen flex flex-col">
      {/* Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-40" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-orange-100/40 via-transparent to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-blue-100/40 via-transparent to-transparent rounded-full blur-3xl" />
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/90 border-b border-slate-200/60 shadow-sm">
        <div className="max-w-7xl mx-auto px-3 sm:px-6">
          <div className="flex items-center justify-between h-14 sm:h-16 gap-2">
            <Link href="/" className="flex-1 min-w-0">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity"
              >
                <div className="relative w-7 h-7 sm:w-10 sm:h-10 flex-shrink-0">
                  <Image src="/logo.png" alt="Indradhar Consultancy" fill className="object-contain" priority />
                </div>
                <div className="border-l border-slate-200 pl-2 min-w-0 flex-1">
                  <h1 className="text-[11px] sm:text-base font-bold text-[#3D5A73] tracking-tight leading-tight line-clamp-1">
                    Cost Calculator
                  </h1>
                  <p className="text-[8px] sm:text-[10px] text-[#E8712C] uppercase tracking-wider font-medium">
                    Per-piece → Batch
                  </p>
                </div>
              </motion.div>
            </Link>

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

      {/* Main Content */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-3 sm:px-6 py-4 sm:py-6 lg:py-8 overflow-x-hidden">
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

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-12 gap-4 sm:gap-5 lg:gap-6">
          {/* Per-Piece Costs Input Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, type: "spring", stiffness: 100 }}
            className="md:col-span-1 xl:col-span-4"
          >
            <div className="bg-white rounded-xl sm:rounded-2xl border border-slate-200/80 shadow-sm shadow-slate-200/50 overflow-hidden h-full">
              <div className="px-4 sm:px-5 py-3 sm:py-4 border-b border-slate-100 bg-gradient-to-r from-orange-50/50 to-white">
                <div className="flex items-center gap-2 sm:gap-3">
                  <motion.div 
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
                    className="p-1.5 sm:p-2 bg-[#E8712C]/10 rounded-lg sm:rounded-xl"
                  >
                    <Layers className="w-4 h-4 sm:w-5 sm:h-5 text-[#E8712C]" />
                  </motion.div>
                  <div>
                    <h2 className="text-xs sm:text-base font-semibold text-slate-800">Per-Piece Costs</h2>
                    <p className="text-[9px] sm:text-xs text-slate-500 mt-0.5">Step 1: Enter cost per piece</p>
                  </div>
                </div>
              </div>

              <div className="p-3 sm:p-4 lg:p-5">
                <div className="grid grid-cols-2 gap-x-3 gap-y-4 sm:gap-x-4 sm:gap-y-5">
                  {PERPIECE_COST_FIELDS.map((field: InputFieldConfig, index: number) => (
                    <motion.div
                      key={field.key}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.15 + index * 0.05, duration: 0.3, ease: "easeOut" }}
                    >
                      <InputField
                        label={field.label}
                        value={inputs[field.key as keyof PerPieceInputs] as number}
                        onChange={(value) => handleInputChange(field.key, value)}
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
          </motion.div>

          {/* Pricing Section - Profit Margin & Selling Price */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
            className="md:col-span-1 xl:col-span-4"
          >
            <div className="bg-white rounded-xl sm:rounded-2xl border border-slate-200/80 shadow-sm shadow-slate-200/50 overflow-hidden h-full">
              <div className="px-4 sm:px-5 py-3 sm:py-4 border-b border-slate-100 bg-gradient-to-r from-orange-50/50 to-white">
                <div className="flex items-center gap-2 sm:gap-3">
                  <motion.div 
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.3 }}
                    className="p-1.5 sm:p-2 bg-[#E8712C]/10 rounded-lg sm:rounded-xl"
                  >
                    <Target className="w-4 h-4 text-[#E8712C]" />
                  </motion.div>
                  <div>
                    <h2 className="text-xs sm:text-sm font-semibold text-slate-800">Pricing</h2>
                    <p className="text-[8px] sm:text-[10px] text-slate-500 uppercase tracking-wider">Step 2: Set profit margin</p>
                  </div>
                </div>
              </div>

              <div className="p-3 sm:p-4 lg:p-5 space-y-3 sm:space-y-4">
                {/* Profit Input */}
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35 }}
                  className="p-3 sm:p-4 rounded-xl bg-gradient-to-br from-orange-50 to-amber-50/50 border border-orange-100 overflow-visible"
                >
                  <div className="w-full min-w-0">
                    <InputField
                      label={PROFIT_FIELD.label}
                      value={inputs.desiredProfitPercent}
                      onChange={handleProfitChange}
                      placeholder={PROFIT_FIELD.placeholder}
                      suffix={PROFIT_FIELD.suffix}
                      tooltip={PROFIT_FIELD.tooltip}
                      highlight
                    />
                  </div>
                </motion.div>

                {/* Cost Per Piece */}
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="p-2.5 sm:p-3 rounded-xl bg-slate-50 border border-slate-100"
                >
                  <p className="text-[9px] sm:text-[10px] text-slate-500 uppercase tracking-wider mb-0.5 sm:mb-1">Cost Per Piece</p>
                  <p className="text-base sm:text-lg font-bold text-slate-800">
                    {hasPerPieceCosts ? formatCurrency(breakdown.totalCostPerPiece) : '—'}
                  </p>
                </motion.div>

                {/* Selling Price Per Piece */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.45, type: "spring", stiffness: 150 }}
                  className="relative p-4 sm:p-5 rounded-xl sm:rounded-2xl overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-[#3D5A73] to-[#4a6d8a]" />
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.1),transparent_50%)]" />
                  
                  <div className="relative">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0">
                      <div>
                        <p className="text-[9px] sm:text-xs text-white/70 mb-1">Selling Price/Piece</p>
                        <p className="text-lg sm:text-2xl font-bold text-white">
                          {hasPerPieceCosts ? formatCurrency(pricing.sellingPrice) : '—'}
                        </p>
                      </div>
                      <div className="sm:text-right">
                        <p className="text-[9px] sm:text-xs text-white/70 mb-1">Profit/Piece</p>
                        <p className="text-sm sm:text-lg font-semibold text-white">
                          {hasPerPieceCosts ? formatCurrency(pricing.profitPerPiece) : '—'}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Batch Calculation Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 100 }}
            className="md:col-span-2 xl:col-span-4"
          >
            <div className="bg-white rounded-xl sm:rounded-2xl border border-slate-200/80 shadow-sm shadow-slate-200/50 overflow-hidden h-full">
              <div className="px-4 sm:px-5 py-3 sm:py-4 border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white">
                <div className="flex items-center gap-2 sm:gap-3">
                  <motion.div 
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.4 }}
                    className="p-1.5 sm:p-2 bg-[#3D5A73]/10 rounded-lg sm:rounded-xl"
                  >
                    <Package className="w-4 h-4 text-[#3D5A73]" />
                  </motion.div>
                  <div>
                    <h2 className="text-xs sm:text-sm font-semibold text-slate-800">Batch Calculation</h2>
                    <p className="text-[8px] sm:text-[10px] text-slate-500 uppercase tracking-wider">Step 3: Enter quantity</p>
                  </div>
                </div>
              </div>

              <div className="p-3 sm:p-4 lg:p-5 space-y-3 sm:space-y-4">
                {/* Quantity Input */}
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="p-3 sm:p-4 rounded-xl bg-gradient-to-br from-slate-50 to-blue-50/50 border border-slate-200 overflow-visible"
                >
                  <div className="w-full min-w-0">
                    <InputField
                      label={QUANTITY_FIELD.label}
                      value={inputs.productionQuantity}
                      onChange={handleQuantityChange}
                      placeholder={QUANTITY_FIELD.placeholder}
                      suffix={QUANTITY_FIELD.suffix}
                      tooltip={QUANTITY_FIELD.tooltip}
                    />
                  </div>
                </motion.div>

                <AnimatePresence mode="wait">
                  {batchTotals ? (
                    <motion.div
                      key="results"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-3 sm:space-y-4"
                    >
                      {/* Batch Totals Breakdown */}
                      <BatchTotalsSection batchTotals={batchTotals} />

                      {/* Your Batch Profit - Featured */}
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2, type: "spring", stiffness: 150 }}
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
                              <p className="text-[8px] sm:text-[10px] text-white/60">{formatNumber(inputs.productionQuantity)} pieces</p>
                            </div>
                          </div>
                          <p className="text-xl sm:text-3xl font-bold text-white">{formatCurrency(batchTotals.totalBatchProfit)}</p>
                        </div>
                      </motion.div>
                    </motion.div>
                  ) : (
                    <motion.div 
                      key="empty"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex flex-col items-center justify-center h-32 sm:h-40 text-slate-400 text-xs text-center"
                    >
                      <Wallet className="w-8 h-8 mb-2 text-slate-300" />
                      <p>
                        {hasPerPieceCosts 
                          ? 'Enter batch quantity to see totals'
                          : 'Enter per-piece costs first'}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </div>
      </main>

      {/* Footer */}
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

// Batch Totals display component with user-friendly labels
function BatchTotalsSection({ batchTotals }: { batchTotals: BatchTotals }) {
  const items = [
    { key: 'rawMaterialTotal', label: 'Raw Material', color: '#3D5A73' },
    { key: 'labourTotal', label: 'Labour', color: '#E8712C' },
    { key: 'machineTotal', label: 'Machine', color: '#14b8a6' },
    { key: 'overheadsTotal', label: 'Overhead', color: '#8b5cf6' },
    { key: 'packagingTotal', label: 'Packaging', color: '#ec4899' },
    { key: 'adminTotal', label: 'Admin', color: '#6366f1' },
    { key: 'otherTotal', label: 'Other', color: '#94a3b8' },
  ] as const;

  // Filter out zero values for display
  const activeItems = items.filter(item => batchTotals[item.key] > 0);

  return (
    <div className="space-y-3">
      {/* Cost breakdown - collapsible grid */}
      {activeItems.length > 0 && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid grid-cols-2 gap-2"
        >
          {activeItems.map((item, index) => (
            <motion.div
              key={item.key}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.03 * index, duration: 0.2 }}
              className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-100 hover:bg-slate-100 transition-colors"
            >
              <div className="flex items-center gap-1.5">
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.05 * index, type: "spring" }}
                  className="w-2 h-2 rounded-full flex-shrink-0" 
                  style={{ backgroundColor: item.color }} 
                />
                <span className="text-[10px] sm:text-xs text-slate-600">{item.label}</span>
              </div>
              <span className="text-[10px] sm:text-xs font-semibold text-slate-800 tabular-nums">
                {formatCurrency(batchTotals[item.key])}
              </span>
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Summary cards */}
      <div className="space-y-2 pt-2 border-t border-slate-100">
        {/* Total Batch Cost Without Profit */}
        <motion.div 
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="p-3 rounded-xl bg-gradient-to-r from-slate-100 to-slate-50 border border-slate-200"
        >
          <div className="flex flex-col gap-1">
            <p className="text-[10px] sm:text-xs font-semibold text-slate-700 leading-tight">Total Batch Cost Without Profit</p>
            <p className="text-lg sm:text-xl font-bold text-slate-800">{formatCurrency(batchTotals.totalBatchCost)}</p>
          </div>
        </motion.div>

        {/* Total Batch Cost with Profit */}
        <motion.div 
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="p-3 rounded-xl bg-gradient-to-r from-emerald-100 to-green-50 border border-emerald-200"
        >
          <div className="flex flex-col gap-1">
            <p className="text-[10px] sm:text-xs font-semibold text-emerald-700 leading-tight">Total Batch Cost with Profit</p>
            <p className="text-lg sm:text-xl font-bold text-emerald-700">{formatCurrency(batchTotals.totalRevenue)}</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
