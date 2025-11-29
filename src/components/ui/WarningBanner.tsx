'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, X } from 'lucide-react';
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
            className="flex items-center gap-3 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 backdrop-blur-xl"
          >
            <AlertCircle className="w-4 h-4 flex-shrink-0 text-red-400" />
            <p className="flex-1 text-sm text-red-300">
              {warning.message}
            </p>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
