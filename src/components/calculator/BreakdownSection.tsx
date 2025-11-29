'use client';

import { motion } from 'framer-motion';
import { CostBreakdown } from '@/lib/types';
import { formatCurrency } from '@/lib/calculations';
import { PieChart } from 'lucide-react';

interface BreakdownSectionProps {
  breakdown: CostBreakdown | null;
}

const breakdownItems = [
  { key: 'rawMaterialPerPiece', label: 'Raw Material', color: '#3b82f6' },
  { key: 'labourPerPiece', label: 'Labour', color: '#8b5cf6' },
  { key: 'machinePerPiece', label: 'Machine', color: '#f97316' },
  { key: 'overheadPerPiece', label: 'Overhead', color: '#14b8a6' },
  { key: 'packagingPerPiece', label: 'Packaging', color: '#ec4899' },
  { key: 'adminPerPiece', label: 'Admin', color: '#6366f1' },
  { key: 'otherPerPiece', label: 'Other', color: '#64748b' },
] as const;

export function BreakdownSection({ breakdown }: BreakdownSectionProps) {
  const total = breakdown?.totalCostPerPiece || 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="relative bg-slate-800/50 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden h-full"
    >
      {/* Glow effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-blue-500/5" />

      {/* Header */}
      <div className="relative px-5 py-4 border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-purple-500/10 rounded-lg">
            <PieChart className="w-4 h-4 text-purple-400" />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-white">Breakdown</h2>
            <p className="text-[10px] text-slate-500 uppercase tracking-wider">Per Piece</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="relative p-4">
        {!breakdown ? (
          <div className="flex items-center justify-center h-48 text-slate-500 text-xs text-center">
            Enter quantity to<br />see breakdown
          </div>
        ) : (
          <div className="space-y-3">
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
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-1.5 h-1.5 rounded-full" 
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="text-xs text-slate-400">{item.label}</span>
                    </div>
                    <span className="text-xs font-medium text-white tabular-nums">
                      {formatCurrency(value)}
                    </span>
                  </div>
                  <div className="h-1 bg-white/5 rounded-full overflow-hidden">
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
              className="pt-3 mt-3 border-t border-white/10"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">Total</span>
                <span className="text-lg font-bold text-white">{formatCurrency(total)}</span>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
