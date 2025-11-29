'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle } from 'lucide-react';
import { Warning } from '@/lib/types';

interface WarningBannerProps {
  warnings: Warning[];
}

export function WarningBanner({ warnings }: WarningBannerProps) {
  if (warnings.length === 0) return null;

  return (
    <div className="space-y-2">
      <AnimatePresence mode="popLayout">
        {warnings.map((warning) => (
          <motion.div
            key={warning.message}
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl bg-red-50 border border-red-200 shadow-sm"
          >
            <AlertCircle className="w-4 h-4 flex-shrink-0 text-red-500" />
            <p className="flex-1 text-xs sm:text-sm text-red-700">
              {warning.message}
            </p>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
