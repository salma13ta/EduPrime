'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function PerformanceSection() {
  // نقاط الرسم البياني لتحديد موقع النقطة والـ Tooltip عند الـ Hover
  const chartData = [
    { month: 'Jan', x: 0, y: 110, score: '65%' },
    { month: 'Feb', x: 80, y: 90, score: '72%' },
    { month: 'Mar', x: 160, y: 100, score: '70%' },
    { month: 'Apr', x: 240, y: 75, score: '82%' },
    { month: 'May', x: 320, y: 50, score: '88%' },
    { month: 'Jun', x: 410, y: 35, score: '91%' },
    { month: 'Jul', x: 500, y: 20, score: '95%' },
  ];

  const [hoveredPoint, setHoveredPoint] = useState<typeof chartData[0] | null>(null);

  // حساب أقرب نقطة على المنحنى بناءً على حركة الماوس
  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const mouseX = ((e.clientX - rect.left) / rect.width) * 500;

    let closest = chartData[0];
    let minDiff = Math.abs(mouseX - chartData[0].x);

    chartData.forEach((pt) => {
      const diff = Math.abs(mouseX - pt.x);
      if (diff < minDiff) {
        minDiff = diff;
        closest = pt;
      }
    });

    setHoveredPoint(closest);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      
      {/* Chart Card */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="lg:col-span-2 p-5 rounded-3xl bg-[#110f1e] border border-white/5 flex flex-col justify-between shadow-xl relative overflow-hidden"
      >
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-bold text-white">Academic Performance</h3>
            <p className="text-[11px] text-gray-400">Hover over the chart to inspect your progress</p>
          </div>
          <span className="text-[10px] bg-purple-600/20 text-purple-300 border border-purple-500/30 px-2.5 py-1 rounded-lg">
            This Year
          </span>
        </div>

        {/* Animated SVG Path with Interactive Hover Effect */}
        <div className="w-full h-48 flex items-end pt-4 pb-2 relative">
          <svg 
            className="w-full h-full overflow-visible cursor-crosshair" 
            viewBox="0 0 500 150"
            onMouseMove={handleMouseMove}
            onMouseLeave={() => setHoveredPoint(null)}
          >
            <defs>
              {/* Tonal Gradient for Chart Line */}
              <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#8b5cf6" />
                <stop offset="50%" stopColor="#d946ef" />
                <stop offset="100%" stopColor="#22d3ee" />
              </linearGradient>

              {/* Glowing Effect Filter */}
              <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="6" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Main Path */}
            <motion.path
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              d="M 0 110 Q 80 80, 160 100 T 320 50 T 500 20"
              fill="none"
              stroke="url(#lineGrad)"
              strokeWidth="4"
              strokeLinecap="round"
            />

            {/* Static Points on Chart */}
            {chartData.map((pt, i) => (
              <circle key={i} cx={pt.x} cy={pt.y} r="3.5" className="fill-purple-400/40" />
            ))}

            {/* Dynamic Interactive Glow & Tracker */}
            <AnimatePresence>
              {hoveredPoint && (
                <g>
                  {/* Vertical Guideline */}
                  <motion.line
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.3 }}
                    exit={{ opacity: 0 }}
                    x1={hoveredPoint.x}
                    y1="0"
                    x2={hoveredPoint.x}
                    y2="150"
                    stroke="#a855f7"
                    strokeWidth="1.5"
                    strokeDasharray="4 4"
                  />

                  {/* Outer Pulsing Glow Circle */}
                  <motion.circle
                    layoutId="glowCircle"
                    cx={hoveredPoint.x}
                    cy={hoveredPoint.y}
                    r="12"
                    fill="#d946ef"
                    opacity="0.3"
                    filter="url(#glow)"
                  />

                  {/* Active Highlighted Pointer Dot */}
                  <motion.circle
                    layoutId="activeDot"
                    cx={hoveredPoint.x}
                    cy={hoveredPoint.y}
                    r="6"
                    className="fill-cyan-300 stroke-white stroke-2"
                    transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                  />
                </g>
              )}
            </AnimatePresence>
          </svg>

          {/* Floating Tooltip Box */}
          <AnimatePresence>
            {hoveredPoint && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 5, scale: 0.8 }}
                transition={{ duration: 0.15 }}
                style={{
                  left: `${(hoveredPoint.x / 500) * 100}%`,
                  top: `${(hoveredPoint.y / 150) * 100}%`,
                }}
                className="absolute -translate-x-1/2 -translate-y-12 pointer-events-none z-20"
              >
                <div className="bg-[#1e1a38] border border-purple-500/50 text-white px-2.5 py-1 rounded-xl shadow-xl flex items-center gap-1.5 backdrop-blur-md">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                  <span className="text-[10px] font-medium text-gray-300">{hoveredPoint.month}:</span>
                  <span className="text-xs font-bold text-cyan-300">{hoveredPoint.score}</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="flex justify-between text-[10px] text-gray-500 pt-2 border-t border-white/5">
          {chartData.map((d, i) => (
            <span key={i} className={hoveredPoint?.month === d.month ? "text-purple-400 font-bold" : ""}>
              {d.month}
            </span>
          ))}
        </div>
      </motion.div>

      {/* Progress Bars Card */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="p-5 rounded-3xl bg-[#110f1e] border border-white/5 space-y-4 shadow-xl"
      >
        <h3 className="text-sm font-bold text-white">Subject Scores</h3>
        
        <div className="space-y-3">
          {[
            { subject: 'Math', pct: 88, color: 'bg-purple-500' },
            { subject: 'Science', pct: 76, color: 'bg-fuchsia-500' },
            { subject: 'English', pct: 92, color: 'bg-cyan-400' },
            { subject: 'History', pct: 71, color: 'bg-amber-400' },
          ].map((sub, i) => (
            <div key={i} className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-gray-300 font-medium">{sub.subject}</span>
                <span className="font-bold text-white">{sub.pct}%</span>
              </div>
              <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden p-0.5 border border-white/5">
                <motion.div 
                  initial={{ width: 0 }}
                  whileInView={{ width: `${sub.pct}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: i * 0.15 }}
                  className={`h-full rounded-full ${sub.color}`} 
                />
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}