'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Calculator, ArrowLeftRight } from 'lucide-react';

export function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-40" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-orange-100/40 via-transparent to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-blue-100/40 via-transparent to-transparent rounded-full blur-3xl" />
      </div>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-4 sm:px-6 py-8 sm:py-12">
        <div className="w-full max-w-3xl">
          {/* Logo & Title Section */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-8 sm:mb-12"
          >
            {/* Logo */}
            <div className="flex justify-center mb-6">
              <div className="relative w-20 h-20 sm:w-24 sm:h-24">
                <Image
                  src="/logo.png"
                  alt="Indradhar Consultancy"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </div>

            {/* Company Name */}
            <h2 className="text-lg sm:text-xl font-semibold text-[#3D5A73] mb-2">
              Indradhar Consultancy
            </h2>

            {/* App Title */}
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-800 mb-4">
              Production Cost Calculation
            </h1>

            {/* Welcome Message */}
            <p className="text-sm sm:text-base text-slate-600 max-w-xl mx-auto leading-relaxed">
              Streamline your manufacturing cost analysis with precision. 
              Calculate per-piece costs from batch totals, or determine batch totals from per-piece values — 
              all with just a few clicks.
            </p>
          </motion.div>

          {/* Option Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6"
          >
            {/* Option A: Batch → Per-piece */} 
            <Link href="/batch-to-perpiece">
              <motion.div
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="group relative p-6 sm:p-8 bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg hover:border-[#3D5A73]/30 transition-all duration-300 cursor-pointer"
              >
                {/* Icon */}
                <div className="w-12 h-12 sm:w-14 sm:h-14 mb-4 rounded-xl bg-[#3D5A73]/10 flex items-center justify-center group-hover:bg-[#3D5A73]/20 transition-colors">
                  <Calculator className="w-6 h-6 sm:w-7 sm:h-7 text-[#3D5A73]" />
                </div>

                {/* Title */}
                <h3 className="text-lg sm:text-xl font-bold text-slate-800 mb-2 group-hover:text-[#3D5A73] transition-colors">
                  Batch → Per-piece
                </h3>

                {/* Description */}
                <p className="text-sm text-slate-500 mb-4">
                  Enter batch totals (raw material, labour, machine hours, etc.) and calculate the per-piece cost breakdown.
                </p>

                {/* Arrow */}
                <div className="flex items-center text-[#3D5A73] font-medium text-sm">
                  <span>Calculate Now</span>
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.div>
            </Link>

            {/* Option B: Per-piece → Batch */}
            <Link href="/perpiece-to-batch">
              <motion.div
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="group relative p-6 sm:p-8 bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg hover:border-[#E8712C]/30 transition-all duration-300 cursor-pointer"
              >
                {/* Icon */}
                <div className="w-12 h-12 sm:w-14 sm:h-14 mb-4 rounded-xl bg-[#E8712C]/10 flex items-center justify-center group-hover:bg-[#E8712C]/20 transition-colors">
                  <ArrowLeftRight className="w-6 h-6 sm:w-7 sm:h-7 text-[#E8712C]" />
                </div>

                {/* Title */}
                <h3 className="text-lg sm:text-xl font-bold text-slate-800 mb-2 group-hover:text-[#E8712C] transition-colors">
                  Per-piece → Batch
                </h3>

                {/* Description */}
                <p className="text-sm text-slate-500 mb-4">
                  Enter per-piece costs, set profit margin, then enter batch quantity to calculate batch totals and profits.
                </p>

                {/* Arrow */}
                <div className="flex items-center text-[#E8712C] font-medium text-sm">
                  <span>Calculate Now</span>
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.div>
            </Link>
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
