"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";

function FloatingWrapper({ children, className, duration = 4, delay = 0 }: { children: ReactNode; className?: string; duration?: number; delay?: number }) {
  return (
    <motion.div
      className={`absolute ${className}`}
      animate={{ y: [0, -15, 0] }}
      transition={{ repeat: Infinity, duration, delay, ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  );
}

export default function GamifiedBadges() {
  return (
    <div className="relative bg-[#0B0E14] w-full h-screen overflow-hidden flex items-center justify-center">

      {/* ================= 1. الشارات العائمة (بوضوح أعلى) ================= */}
      <div className="absolute inset-0 pointer-events-none">
        {/* 1. شارة بث مباشر Live */}
        <FloatingWrapper className="top-[20%] left-[12%]" duration={4} delay={0}>
          <div className="flex items-center gap-2 bg-[#1c1f30]/90 border border-red-500/40 px-4 py-2 rounded-2xl shadow-xl backdrop-blur-md">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
            </span>
            <span className="text-xs font-bold text-white">Live Physics Class</span>
          </div>
        </FloatingWrapper>

        {/* 2. شارة تقييم معلم Top Rated */}
        <FloatingWrapper className="top-[15%] right-[15%]" duration={5} delay={1}>
          <div className="flex items-center gap-2 bg-[#1c1f30]/90 border border-amber-500/40 px-4 py-2 rounded-2xl shadow-xl backdrop-blur-md">
            <span className="text-amber-400 text-sm">⭐ 4.9</span>
            <span className="text-xs font-medium text-gray-200">Top Rated Tutor</span>
          </div>
        </FloatingWrapper>

        {/* 3. شارة إتمام مسار 🏆 */}
        <FloatingWrapper className="bottom-[25%] left-[8%]" duration={6} delay={0.5}>
          <div className="flex items-center gap-3 bg-[#1c1f30]/90 border border-purple-500/40 p-3 rounded-2xl shadow-xl backdrop-blur-md">
            <div className="w-8 h-8 rounded-xl bg-purple-500/25 flex items-center justify-center text-purple-400 text-lg">🏆</div>
            <div>
              <p className="text-[10px] text-gray-300">Completed</p>
              <p className="text-xs font-bold text-white">Math Masterclass</p>
            </div>
          </div>
        </FloatingWrapper>

        {/* 4. إحصائية طلاب ملهمة */}
        <FloatingWrapper className="bottom-[20%] right-[12%]" duration={4.5} delay={1.5}>
          <div className="flex items-center gap-3 bg-[#1c1f30]/90 border border-emerald-500/40 p-3 rounded-2xl shadow-xl backdrop-blur-md">
            <div className="w-8 h-8 rounded-full bg-emerald-500/25 flex items-center justify-center text-emerald-400 font-bold text-xs">+98%</div>
            <div>
              <p className="text-xs font-bold text-white">Pass Rate</p>
              <p className="text-[10px] text-gray-300">In final exams</p>
            </div>
          </div>
        </FloatingWrapper>
      </div>

      {/* ================= 2. الحاجز الشفاف (تم تقليله لظهور الشارات بوضوح) ================= */}
      <div className="absolute inset-0 bg-[#0B0E14]/10 backdrop-blur-[0.5px] pointer-events-none" />

    </div>
  );
}