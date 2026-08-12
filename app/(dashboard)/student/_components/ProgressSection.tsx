'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Target,
  Brain,
  Calendar,
  Award,
  TrendingUp,
  Sparkles,
  BookOpen,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

interface Skill {
  name: string;
  value: number;
  category: string;
}

interface Insight {
  type: 'strength' | 'warning' | 'tip';
  text: string;
}

interface Note {
  teacher: string;
  note: string;
  date: string;
}

interface TermData {
  overallScore: number;
  attendanceRate: number;
  completedQuizzes: number;
  totalHours: number;
  rankInCenter: string;
  skills: Skill[];
  aiInsights: Insight[];
  centerNotes: Note[];
}

const ACADEMIC_DATA: Record<'Term 1' | 'Term 2', TermData> = {
  'Term 1': {
    overallScore: 91,
    attendanceRate: 96,
    completedQuizzes: 24,
    totalHours: 48,
    rankInCenter: '3 / 120',
    skills: [
      { name: 'Advanced Calculus', value: 94, category: 'Mathematics' },
      { name: 'Organic Chemistry', value: 82, category: 'Science' },
      { name: 'Physics Mechanics', value: 89, category: 'Science' },
      { name: 'English Literature', value: 91, category: 'Languages' },
    ],
    aiInsights: [
      { type: 'strength', text: 'Your performance in Mathematics places you in the top 3% of the center this month.' },
      { type: 'warning', text: 'Consider reviewing organic chemistry reaction mechanisms before the upcoming mock exam.' },
      { type: 'tip', text: 'Problem-solving speed improved by 15% thanks to extra practice sessions.' }
    ],
    centerNotes: [
      { teacher: 'Dr. Sarah Chen', note: 'Excellent active participation during the Calculus lecture.', date: 'Yesterday' },
      { teacher: 'Prof. James Lee', note: 'Please submit your laboratory report on time.', date: '3 days ago' }
    ]
  },
  'Term 2': {
    overallScore: 88,
    attendanceRate: 92,
    completedQuizzes: 18,
    totalHours: 36,
    rankInCenter: '7 / 120',
    skills: [
      { name: 'Linear Algebra', value: 88, category: 'Mathematics' },
      { name: 'Quantum Physics', value: 85, category: 'Science' },
      { name: 'Data Structures', value: 90, category: 'Technology' },
      { name: 'Composition', value: 86, category: 'Languages' },
    ],
    aiInsights: [
      { type: 'strength', text: 'Strong grasp of algorithmic concepts and data structure logic.' },
      { type: 'warning', text: 'Early morning lecture attendance rate dropped slightly this week.' },
      { type: 'tip', text: 'Try practicing more mock tests for advanced physics modules.' }
    ],
    centerNotes: [
      { teacher: 'Dr. Ahmed Ali', note: 'Notable progress in coding assignments and logic design.', date: '2 days ago' }
    ]
  }
};

export default function ProgressSection({ completionRate = 91 }: { completionRate?: number }) {
  const [selectedTerm, setSelectedTerm] = useState<'Term 1' | 'Term 2'>('Term 1');
  const currentData = ACADEMIC_DATA[selectedTerm];
  const displayedCompletion = completionRate ?? currentData.overallScore;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="w-full space-y-6"
    >
      {/* Header & Controller */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-[#110f1e] p-6 rounded-3xl border border-white/5 shadow-xl">
        <div>
          <div className="flex items-center gap-2 mb-1">
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">AI Performance Report</h2>
          <p className="text-gray-400 text-xs mt-1">Real-time tracking of your academic progress, attendance, and insights.</p>
        </div>

        <div className="bg-[#08070d] p-1.5 rounded-2xl border border-white/5 flex gap-1">
          {(['Term 1', 'Term 2'] as const).map((term) => (
            <button
              key={term}
              onClick={() => setSelectedTerm(term)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${selectedTerm === term
                  ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30'
                  : 'text-gray-400 hover:text-white'
                }`}
            >
              {term}
            </button>
          ))}
        </div>
      </div>

      {/* Stats Overview Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Overall Score', value: `${currentData.overallScore}%`, icon: TrendingUp, color: 'text-cyan-400', bg: 'bg-cyan-500/10' },
          { label: 'Center Attendance', value: `${currentData.attendanceRate}%`, icon: Calendar, color: 'text-purple-400', bg: 'bg-purple-500/10' },
          { label: 'Quizzes Completed', value: currentData.completedQuizzes, icon: CheckCircle2, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
          { label: 'Center Rank', value: currentData.rankInCenter, icon: Award, color: 'text-amber-400', bg: 'bg-amber-500/10' },
        ].map((metric, index) => (
          <motion.div
            key={metric.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -3 }}
            className="p-5 rounded-3xl bg-[#110f1e] border border-white/5 flex items-center justify-between shadow-lg"
          >
            <div>
              <p className="text-[11px] text-gray-400 font-medium mb-1">{metric.label}</p>
              <h4 className="text-xl font-black text-white">{metric.value}</h4>
            </div>
            <div className={`p-3.5 rounded-2xl ${metric.bg} ${metric.color}`}>
              <metric.icon className="w-5 h-5" />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* Doughnut Chart Panel */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-4 p-6 rounded-3xl bg-[#110f1e] border border-white/5 flex flex-col items-center justify-between shadow-xl"
        >
          <div className="w-full flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-purple-400" /> Completion Rate
            </h3>
            <span className="text-[10px] text-purple-300 bg-purple-600/20 px-2.5 py-1 rounded-lg border border-purple-500/30">
              Live
            </span>
          </div>

          <div className="relative w-44 h-44 flex items-center justify-center my-4">
            <svg className="w-full h-full -rotate-90">
              <circle cx="88" cy="88" r="72" stroke="currentColor" strokeWidth="12" className="text-white/5 fill-none" />
              <motion.circle
                key={selectedTerm + currentData.overallScore}
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: displayedCompletion / 100 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                cx="88" cy="88" r="72"
                stroke="url(#customGrad)"
                strokeWidth="12"
                strokeLinecap="round"
                className="fill-none"
              />
              <defs>
                <linearGradient id="customGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#8b5cf6" />
                  <stop offset="100%" stopColor="#22d3ee" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute flex flex-col items-center">
              <span className="text-3xl font-black text-white">{displayedCompletion}%</span>
              <span className="text-[10px] text-gray-400 mt-0.5">Status</span>
            </div>
          </div>

          <div className="w-full bg-purple-950/20 border border-purple-500/20 rounded-2xl p-3 flex items-center gap-3">
            <motion.div
              animate={{ scale: [1, 1.2, 1], opacity: [0.6, 1, 0.6] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_10px_#22d3ee]"
            />
            <p className="text-[11px] text-purple-200 font-medium">AI monitoring active & operational.</p>
          </div>
        </motion.div>

        {/* Competency Bars Panel */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-8 p-6 rounded-3xl bg-[#110f1e] border border-white/5 flex flex-col justify-between shadow-xl"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Brain className="w-4 h-4 text-purple-400" /> Subject Competency
            </h3>
            <span className="text-xs text-gray-400">Evaluated metrics</span>
          </div>

          <div className="space-y-5">
            {currentData.skills.map((skill, index) => (
              <div key={skill.name} className="space-y-2">
                <div className="flex justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="text-gray-200 font-semibold">{skill.name}</span>
                    <span className="text-[10px] text-gray-500 bg-white/5 px-2 py-0.5 rounded-md">{skill.category}</span>
                  </div>
                  <span className="text-purple-400 font-bold">{skill.value}%</span>
                </div>
                <div className="h-2.5 w-full bg-white/5 rounded-full overflow-hidden p-0.5 border border-white/5">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.value}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, delay: index * 0.15, ease: "easeOut" }}
                    className="h-full rounded-full bg-gradient-to-r from-purple-600 to-cyan-400"
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Bottom Insights & Notes Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* AI Insights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="p-6 rounded-3xl bg-[#110f1e] border border-white/5 shadow-xl space-y-4"
        >
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-400" /> AI Recommendations
          </h3>
          <div className="space-y-3">
            {currentData.aiInsights.map((insight, idx) => (
              <div key={idx} className="p-3.5 bg-[#171427] border border-white/5 rounded-2xl flex items-start gap-3">
                <div className="mt-0.5 shrink-0">
                  {insight.type === 'strength' && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                  {insight.type === 'warning' && <AlertCircle className="w-4 h-4 text-amber-400" />}
                  {insight.type === 'tip' && <Sparkles className="w-4 h-4 text-purple-400" />}
                </div>
                <p className="text-xs text-gray-300 leading-relaxed">{insight.text}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Instructor Notes */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="p-6 rounded-3xl bg-[#110f1e] border border-white/5 shadow-xl space-y-4"
        >
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-cyan-400" /> Instructors Feedback
          </h3>
          <div className="space-y-3">
            {currentData.centerNotes.map((item, idx) => (
              <div key={idx} className="p-3.5 bg-[#171427] border border-white/5 rounded-2xl flex flex-col justify-between space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-purple-300">{item.teacher}</span>
                  <span className="text-[10px] text-gray-500">{item.date}</span>
                </div>
                <p className="text-xs text-gray-300 italic">"{item.note}"</p>
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </motion.div>
  );
}