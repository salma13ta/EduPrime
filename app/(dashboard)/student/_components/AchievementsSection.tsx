'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Zap, Star, ShieldCheck, Flame, Sparkles, Target, Award, Lock, Activity, TrendingUp } from 'lucide-react';

interface Achievement {
  id: string;
  title: string;
  description: string;
  category: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  glowColor: string;
  borderCol: string;
  xp: string;
  date: string;
  badge: string;
}

interface LockedAchievement {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  current: string;
  progress: number;
  reward: string;
}

const unlockedAchievements: Achievement[] = [
  {
    id: '1',
    title: 'First Week Champion',
    description: 'Completed all weekly academic modules with a 100% score and record speed.',
    category: 'Academic Excellence',
    icon: Trophy,
    color: 'from-amber-400 to-orange-500',
    glowColor: 'rgba(245, 158, 11, 0.25)',
    borderCol: 'border-amber-500/40',
    xp: '+500 XP',
    date: '2 days ago',
    badge: 'Legendary Gold',
  },
  {
    id: '2',
    title: '7-Day Streak Master',
    description: 'Logged in and studied consistently for 7 days straight without a single break.',
    category: 'Consistency & Habit',
    icon: Flame,
    color: 'from-purple-500 to-pink-600',
    glowColor: 'rgba(168, 85, 247, 0.25)',
    borderCol: 'border-purple-500/40',
    xp: '+350 XP',
    date: 'Today',
    badge: 'Active Streak 🔥',
  },
  {
    id: '3',
    title: 'Exam Wizard',
    description: 'Achieved an outstanding score above 95% in your last three core exams.',
    category: 'Performance',
    icon: Zap,
    color: 'from-emerald-400 to-teal-600',
    glowColor: 'rgba(16, 185, 129, 0.25)',
    borderCol: 'border-emerald-500/40',
    xp: '+800 XP',
    date: '1 week ago',
    badge: 'Honors Grade',
  },
  {
    id: '4',
    title: 'Community Mentor',
    description: 'Contributed 25+ helpful answers and discussions supporting fellow students.',
    category: 'Collaboration',
    icon: Star,
    color: 'from-blue-400 to-indigo-600',
    glowColor: 'rgba(59, 130, 246, 0.25)',
    borderCol: 'border-blue-500/40',
    xp: '+400 XP',
    date: '1 month ago',
    badge: 'Top Contributor',
  }
];

const lockedAchievements: LockedAchievement[] = [
  {
    id: 'l1',
    title: 'Course Grandmaster',
    description: 'Complete 5 full courses with a final pass rate above 90% to unlock this rare badge.',
    icon: Target,
    current: '3 / 5 Courses',
    progress: 60,
    reward: '+1,200 XP'
  },
  {
    id: 'l2',
    title: 'Elite Code Architect',
    description: 'Submit 10 advanced practical projects and pass senior instructor code reviews.',
    icon: ShieldCheck,
    current: '7 / 10 Projects',
    progress: 70,
    reward: '+1,500 XP'
  }
];

export default function AchievementsSection() {
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const filteredAchievements = selectedFilter === 'All' 
    ? unlockedAchievements 
    : unlockedAchievements.filter(item => item.category.toLowerCase().includes(selectedFilter.toLowerCase()));

  return (
    <section className="w-full py-12 px-4 sm:px-6 lg:px-8 bg-[#08070d] text-white font-sans relative overflow-hidden">
      
      {/* Background Interactive Lighting Effects */}
      <motion.div 
        animate={{ scale: [1, 1.25, 1], opacity: [0.05, 0.12, 0.05] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-purple-600/10 rounded-full blur-[140px] pointer-events-none" 
      />

      <div className="max-w-7xl mx-auto space-y-12 relative z-10">
        
        {/* Hero Interactive Header Banner with Scroll-Linked Entry */}
        <motion.div 
          initial={{ opacity: 0, y: 40, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="relative p-6 sm:p-10 rounded-[2.5rem] bg-gradient-to-br from-[#1b1734] via-[#12101f] to-[#0a0812] border border-purple-500/30 overflow-hidden shadow-2xl"
        >
          {/* Floating Neon Orbs */}
          <motion.div 
            animate={{ x: [0, 40, 0], y: [0, -25, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -right-16 -top-16 w-72 h-72 bg-purple-600/20 rounded-full blur-[90px] pointer-events-none" 
          />
          <motion.div 
            animate={{ x: [0, -30, 0], y: [0, 20, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
            className="absolute -left-10 -bottom-10 w-60 h-60 bg-blue-600/20 rounded-full blur-[80px] pointer-events-none" 
          />

          <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <div className="space-y-3 max-w-2xl">              
              <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight leading-tight">
                Mastery Analytics & Hall of Fame 🚀
              </h2>
              
              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed font-medium">
                Real-time algorithmic tracking of your academic momentum, XP gains, and cognitive growth trajectories across all enrolled modules.
              </p>
            </div>

            {/* XP & Level Badge Counter Widget with Micro-Interaction */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              whileHover={{ scale: 1.03, y: -2 }}
              className="flex items-center gap-4 bg-[#08070d]/70 border border-white/10 p-5 rounded-3xl backdrop-blur-xl shadow-2xl relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-500 to-orange-500 flex items-center justify-center text-white shadow-lg shadow-amber-500/30 flex-shrink-0 relative z-10">
                <Award className="w-7 h-7 animate-pulse" />
              </div>
              <div className="relative z-10">
                <span className="text-[11px] text-gray-400 font-bold uppercase tracking-wider block">Total Earned XP</span>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-black text-white">4,850 XP</span>
                  <span className="text-xs text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">Lvl 14</span>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* 📊 Advanced AI Analytics & Growth Sparkline Graph Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="p-6 sm:p-8 rounded-[2.5rem] bg-[#12101f] border border-white/10 relative overflow-hidden shadow-2xl space-y-6"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center text-purple-400">
                <Activity className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">Cognitive & XP Growth Trajectory</h3>
                <p className="text-xs text-gray-400">Algorithmic velocity over the last 8 study cycles</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                <TrendingUp className="w-3.5 h-3.5" /> +28.4% Velocity Boost
              </span>
            </div>
          </div>

          {/* Interactive Animated Sparkline Chart Matrix */}
          <div className="pt-4 pb-2">
            <div className="h-44 sm:h-52 w-full flex items-end justify-between gap-2 sm:gap-4 px-2 relative">
              {/* Background Grid Lines */}
              <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-20">
                <div className="w-full border-b border-white/20" />
                <div className="w-full border-b border-white/20" />
                <div className="w-full border-b border-white/20" />
              </div>

              {[35, 55, 42, 68, 75, 60, 88, 95].map((heightVal, idx) => (
                <div key={idx} className="flex-1 flex flex-col items-center gap-3 h-full justify-end relative group z-10">
                  {/* Floating Value Tooltip on Hover */}
                  <div className="absolute -top-10 opacity-0 group-hover:opacity-150 transition-all duration-300 transform scale-75 group-hover:scale-100 bg-purple-600 text-white text-[10px] font-bold py-1 px-2.5 rounded-lg shadow-xl whitespace-nowrap pointer-events-none">
                    Cycle 0{idx + 1}: {heightVal * 12} XP
                  </div>

                  {/* Animated Bar Column */}
                  <motion.div
                    initial={{ height: 0 }}
                    whileInView={{ height: `${heightVal}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: idx * 0.08, ease: [0.22, 1, 0.36, 1] }}
                    whileHover={{ scaleY: 1.03, transition: { duration: 0.2 } }}
                    className="w-full max-w-[42px] bg-gradient-to-t from-purple-700 via-indigo-600 to-pink-500 rounded-t-xl shadow-lg shadow-purple-900/40 relative overflow-hidden cursor-pointer"
                  >
                    <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </motion.div>
                  <span className="text-[10px] text-gray-400 font-bold">W{idx + 1}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Interactive Category Filter Pills */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex items-center gap-2.5 overflow-x-auto pb-2 scrollbar-none"
        >
          {['All', 'Academic Excellence', 'Consistency', 'Performance', 'Collaboration'].map((cat, idx) => {
            const isActive = selectedFilter === cat;
            return (
              <motion.button
                key={idx}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedFilter(cat)}
                className={`px-5 py-2.5 rounded-2xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer relative ${
                  isActive 
                    ? 'text-white shadow-xl shadow-purple-600/30 bg-purple-600 border border-purple-400/50' 
                    : 'bg-[#12101f] text-gray-400 hover:text-white border border-white/5 hover:border-white/15'
                }`}
              >
                {cat === 'All' && '✨ '}
                {cat}
              </motion.button>
            );
          })}
        </motion.div>

        {/* Unlocked Achievements Grid with Staggered Scroll Animations */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-gray-200 uppercase tracking-wider flex items-center gap-2">
              <Trophy className="w-4 h-4 text-amber-400" /> Unlocked Badges & Honors
            </h3>
            <span className="text-xs text-purple-400 font-bold bg-purple-500/10 px-3 py-1 rounded-full border border-purple-500/20">
              {filteredAchievements.length} / 6 Unlocked
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredAchievements.map((item, index) => {
              const IconComp = item.icon;
              const isHovered = hoveredCard === item.id;

              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  onHoverStart={() => setHoveredCard(item.id)}
                  onHoverEnd={() => setHoveredCard(null)}
                  whileHover={{ y: -6, transition: { duration: 0.2 } }}
                  className={`p-6 sm:p-7 rounded-[2rem] bg-[#12101f] border ${item.borderCol} relative overflow-hidden group shadow-2xl flex flex-col justify-between space-y-5`}
                >
                  {/* Dynamic Mouse Hover Glow Layer */}
                  <div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{ background: `radial-gradient(circle at 80% 20%, ${item.glowColor}, transparent 70%)` }}
                  />

                  <div className="flex items-start justify-between gap-4 relative z-10">
                    <div className="flex items-center gap-4">
                      <motion.div 
                        animate={{ rotate: isHovered ? [0, -10, 10, 0] : 0 }}
                        transition={{ duration: 0.5 }}
                        className={`w-14 h-14 rounded-2xl bg-gradient-to-tr ${item.color} flex items-center justify-center text-white shadow-xl shadow-purple-900/30 flex-shrink-0`}
                      >
                        <IconComp className="w-7 h-7" />
                      </motion.div>
                      <div>
                        <span className="text-[11px] font-bold text-purple-400 uppercase tracking-wider block mb-0.5">{item.category}</span>
                        <h4 className="text-lg font-black text-white group-hover:text-purple-300 transition-colors">{item.title}</h4>
                      </div>
                    </div>
                    <span className="text-[11px] font-bold bg-white/5 border border-white/10 px-3 py-1 rounded-full text-gray-300 whitespace-nowrap backdrop-blur-md">
                      {item.date}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-gray-300 leading-relaxed relative z-10 font-medium">
                    {item.description}
                  </p>

                  <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs relative z-10">
                    <span className="px-3.5 py-1.5 rounded-xl bg-purple-500/15 text-purple-300 font-bold border border-purple-500/30 shadow-sm">
                      {item.badge}
                    </span>
                    <span className="text-amber-400 font-black tracking-wide bg-amber-500/10 px-3 py-1.5 rounded-xl border border-amber-500/20">
                      {item.xp}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Locked Achievements / Upcoming Challenges Section */}
        <div className="space-y-4 pt-6">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-gray-200 uppercase tracking-wider flex items-center gap-2">
              <Lock className="w-4 h-4 text-purple-400" /> Upcoming Quests & Locked Badges
            </h3>
            <span className="text-xs text-gray-400">Complete requirements to claim</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {lockedAchievements.map((locked, index) => {
              const LockIcon = locked.icon;
              return (
                <motion.div 
                  key={locked.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                  whileHover={{ scale: 1.01 }}
                  className="p-6 sm:p-7 rounded-[2rem] bg-[#0d0b16] border border-white/10 relative overflow-hidden flex flex-col justify-between space-y-5 opacity-90 hover:opacity-100 transition-all shadow-xl group"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 flex-shrink-0 group-hover:border-purple-500/30 transition-colors">
                        <LockIcon className="w-7 h-7 text-gray-400 group-hover:text-purple-400 transition-colors" />
                      </div>
                      <div>
                        <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block mb-0.5">Locked Milestone</span>
                        <h4 className="text-lg font-bold text-white">{locked.title}</h4>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-black text-purple-400 bg-purple-500/10 px-3 py-1 rounded-full border border-purple-500/20 block mb-1">
                        {locked.current}
                      </span>
                      <span className="text-[10px] text-amber-400 font-bold">{locked.reward}</span>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
                    {locked.description}
                  </p>

                  {/* Animated Progress Bar */}
                  <div className="space-y-2 pt-2">
                    <div className="flex justify-between text-xs font-bold text-gray-300">
                      <span>Quest Progress</span>
                      <span className="text-purple-400 font-black">{locked.progress}%</span>
                    </div>
                    <div className="w-full h-3 bg-white/5 rounded-full overflow-hidden p-0.5 border border-white/10">
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: `${locked.progress}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
                        className="h-full bg-gradient-to-r from-purple-600 via-indigo-500 to-pink-500 rounded-full shadow-lg shadow-purple-500/50"
                      />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}