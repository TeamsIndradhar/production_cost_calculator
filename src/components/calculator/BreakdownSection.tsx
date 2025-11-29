'use client';

import { motion } from 'framer-motion';
import { CostBreakdown } from '@/lib/types';
import { formatCurrency } from '@/lib/calculations';
import { PieChart } from 'lucide-react';

interface BreakdownSectionProps {
  breakdown: CostBreakdown | null;
}

const breakdownItems = [
  { key: 'rawMaterialPerPiece', label: 'Raw Material', color: '#3D5A73' },
  { key: 'labourPerPiece', label: 'Labour', color: '#E8712C' },
  { key: 'machinePerPiece', label: 'Machine', color: '#14b8a6' },
  { key: 'overheadPerPiece', label: 'Overhead', color: '#8b5cf6' },
  { key: 'packagingPerPiece', label: 'Packaging', color: '#ec4899' },
  { key: 'adminPerPiece', label: 'Admin', color: '#6366f1' },
  { key: 'otherPerPiece', label: 'Other', color: '#94a3b8' },
] as const;

export function BreakdownSection({ breakdown }: BreakdownSectionProps) {
  const total = breakdown?.totalCostPerPiece || 0;

  return (
    <div className="bg-white rounded-xl sm:rounded-2xl border border-slate-200/80 shadow-sm shadow-slate-200/50 h-full">
      {/* Header */}
      <div className="px-4 sm:px-5 py-3 sm:py-4 border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="p-1.5 sm:p-2 bg-[#E8712C]/10 rounded-lg sm:rounded-xl">
            <PieChart className="w-4 h-4 text-[#E8712C]" />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-slate-800">Breakdown</h2>
            <p className="text-[9px] sm:text-[10px] text-slate-500 uppercase tracking-wider">Per Piece</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-3 sm:p-4">
        {!breakdown ? (
          <div className="flex items-center justify-center h-32 sm:h-48 text-slate-400 text-xs text-center">
            Enter quantity to<br />see breakdown
          </div>
        ) : (
          <div className="space-y-2.5 sm:space-y-3">
            {breakdownItems.map((item, index) => {
              const value = breakdown[item.key];
              const percentage = total > 0 ? (value / total) * 100 : 0;

              return (
                <motion.div
                  key={item.key}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * index, duration: 0.3 }}
                >
                  <div className="flex items-center justify-between mb-1 sm:mb-1.5">
                    <div className="flex items-center gap-1.5 sm:gap-2">
                      <div 
                        className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full flex-shrink-0" 
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="text-[11px] sm:text-xs text-slate-600">{item.label}</span>
                    </div>
                    <span className="text-[11px] sm:text-xs font-semibold text-slate-800 tabular-nums">
                      {formatCurrency(value)}
                    </span>
                  </div>
                  <div className="h-1 sm:h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${percentage}%` }}
                      transition={{ duration: 0.5, delay: 0.05 * index }}
                      className="h-full rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                  </div>
                </motion.div>
              );
            })}

            {/* Total */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="pt-3 sm:pt-4 mt-3 sm:mt-4 border-t border-slate-100"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] sm:text-xs font-semibold text-slate-500 uppercase tracking-wider">Total</span>
                <span className="text-lg sm:text-xl font-bold text-[#3D5A73]">{formatCurrency(total)}</span>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}
