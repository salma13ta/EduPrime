'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Flame, Play, Sparkles } from 'lucide-react';

export default function WelcomeBanner({ firstName }: { firstName: string }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="relative rounded-3xl bg-gradient-to-r from-purple-900/40 via-[#15122b] to-[#110f22] border border-purple-500/30 p-6 md:p-8 overflow-hidden shadow-2xl"
    >
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.15, 0.25, 0.15] 
        }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -right-10 -bottom-10 w-60 h-60 bg-purple-600 rounded-full blur-3xl pointer-events-none" 
      />
      
      <div className="relative z-10 space-y-4 max-w-2xl">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold"
        >
          <Flame className="w-3.5 h-3.5 fill-emerald-400 animate-pulse" />
          <span>7-Day Streak!</span>
        </motion.div>

        <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
          Good afternoon, <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-300 to-fuchsia-400">{firstName}!</span> 👋
        </h1>

        <p className="text-xs md:text-sm text-gray-300 leading-relaxed">
          You have <strong className="text-purple-300">3 classes</strong> today and <strong className="text-fuchsia-300">2 assignments</strong> due. Keep up the great work!
        </p>

        <div className="flex flex-wrap items-center gap-3 pt-2">
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-5 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl text-xs font-bold text-white shadow-lg shadow-purple-600/30 flex items-center gap-2 cursor-pointer"
          >
            <Play className="w-3.5 h-3.5 fill-white" />
            <span>Continue Learning</span>
          </motion.button>
          
          <motion.button 
            whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.1)" }}
            whileTap={{ scale: 0.95 }}
            className="px-5 py-2.5 bg-white/5 border border-white/10 rounded-xl text-xs font-semibold text-gray-200 transition-all flex items-center gap-2 cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            <span>Take Practice Exam</span>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}