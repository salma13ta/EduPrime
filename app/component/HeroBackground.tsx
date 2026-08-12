"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";

function FloatingWrapper({ children, className, duration = 4, delay = 0 }: { children: ReactNode; className?: string; duration?: number; delay?: number }) {
  return (
    <motion.div
      className={`absolute ${className}`}
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ 
        opacity: { duration: 0.6, delay },
        scale: { duration: 0.6, delay },
        y: { repeat: Infinity, duration, delay, ease: "easeInOut" }
      }}
      animate={{ y: [0, -12, 0] }}
    >
      {children}
    </motion.div>
  );
}

export default function GamifiedBadges() {
  return (
    <div className="relative bg-[#0B0E14] w-full h-[85vh] md:h-screen overflow-hidden flex items-center justify-center">

      {/* ================= الشارات العائمة (متجاوبة تماماً مع Media Queries للشاشات المختلفة) ================= */}
      <div className="absolute inset-0 pointer-events-none p-4 md:p-8">
        
        {/* 1. شارة بث مباشر Live */}
        <FloatingWrapper 
          className="top-[12%] left-[5%] sm:left-[10%] md:top-[20%] md:left-[12%] scale-75 sm:scale-90 md:scale-100 origin-top-left" 
          duration={4} 
          delay={0}
        >
          <div className="flex items-center gap-2 bg-[#1c1f30]/90 border border-red-500/40 px-3.5 py-2 rounded-2xl shadow-2xl backdrop-blur-md">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
            </span>
            <span className="text-xs font-bold text-white whitespace-nowrap">Live Physics Class</span>
          </div>
        </FloatingWrapper>

        {/* 2. شارة تقييم معلم Top Rated */}
        <FloatingWrapper 
          className="top-[12%] right-[5%] sm:right-[10%] md:top-[15%] md:right-[15%] scale-75 sm:scale-90 md:scale-100 origin-top-right" 
          duration={5} 
          delay={0.2}
        >
          <div className="flex items-center gap-2 bg-[#1c1f30]/90 border border-amber-500/40 px-3.5 py-2 rounded-2xl shadow-2xl backdrop-blur-md">
            <span className="text-amber-400 text-sm">⭐ 4.9</span>
            <span className="text-xs font-medium text-gray-200 whitespace-nowrap">Top Rated Tutor</span>
          </div>
        </FloatingWrapper>

        {/* 3. شارة إتمام مسار 🏆 */}
        <FloatingWrapper 
          className="bottom-[15%] left-[5%] sm:left-[8%] md:bottom-[25%] md:left-[8%] scale-75 sm:scale-90 md:scale-100 origin-bottom-left" 
          duration={6} 
          delay={0.4}
        >
          <div className="flex items-center gap-3 bg-[#1c1f30]/90 border border-purple-500/40 p-3 rounded-2xl shadow-2xl backdrop-blur-md">
            <div className="w-8 h-8 rounded-xl bg-purple-500/25 flex items-center justify-center text-purple-400 text-base shrink-0">🏆</div>
            <div>
              <p className="text-[10px] text-gray-300">Completed</p>
              <p className="text-xs font-bold text-white whitespace-nowrap">Math Masterclass</p>
            </div>
          </div>
        </FloatingWrapper>

        {/* 4. إحصائية طلاب ملهمة */}
        <FloatingWrapper 
          className="bottom-[15%] right-[5%] sm:right-[8%] md:bottom-[20%] md:right-[12%] scale-75 sm:scale-90 md:scale-100 origin-bottom-right" 
          duration={4.5} 
          delay={0.6}
        >
          <div className="flex items-center gap-3 bg-[#1c1f30]/90 border border-emerald-500/40 p-3 rounded-2xl shadow-2xl backdrop-blur-md">
            <div className="w-8 h-8 rounded-full bg-emerald-500/25 flex items-center justify-center text-emerald-400 font-bold text-xs shrink-0">+98%</div>
            <div>
              <p className="text-xs font-bold text-white whitespace-nowrap">Pass Rate</p>
              <p className="text-[10px] text-gray-300">In final exams</p>
            </div>
          </div>
        </FloatingWrapper>

      </div>

      {/* ================= حاجز تجميلي خفيف جداً ================= */}
      <div className="absolute inset-0 bg-[#0B0E14]/5 backdrop-blur-[0.2px] pointer-events-none" />

    </div>
  );
}