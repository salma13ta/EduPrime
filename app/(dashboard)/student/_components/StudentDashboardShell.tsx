'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FileText, 
  Upload, 
  CheckCircle2, 
  Clock, 
  Timer, 
  Award, 
  AlertCircle, 
  Sparkles, 
  Laptop, 
  MapPin, 
  Flame, 
  ChevronRight,
  ShieldAlert,
  Zap
} from 'lucide-react';

interface TaskItem {
  id: string;
  title: string;
  course: string;
  type: 'online_homework' | 'center_homework' | 'online_quiz' | 'center_exam';
  deadline: string;
  duration?: string;
  status: 'pending' | 'submitted' | 'graded';
  grade?: string;
  description: string;
}

const hybridTasksData: TaskItem[] = [
  {
    id: 't-1',
    title: 'Weekly Digital Assignment #3: Kinematics Calculations',
    course: 'Physics for High School',
    type: 'online_homework',
    deadline: '2026-06-15T23:59:59',
    status: 'pending',
    description: 'Automatic grading enabled upon submission. Solve all 15 algorithmic vectors.'
  },
  {
    id: 't-2',
    title: 'Physical Center Sheet Delivery (Sheet #2)',
    course: 'Organic Chemistry Masterclass',
    type: 'center_homework',
    deadline: '2026-06-18T16:00:00',
    status: 'pending',
    description: 'Handwritten mechanism sheet to be reviewed directly by Prof. Tarek at the hub.'
  },
  {
    id: 't-3',
    title: '15-Min Concept Quiz: Reaction Rates',
    course: 'Organic Chemistry Masterclass',
    type: 'online_quiz',
    deadline: '2026-06-14T20:00:00',
    duration: '15 mins',
    status: 'submitted',
    grade: '14/15',
    description: 'Timed online quiz testing quick recall of hydrocarbon isomerism.'
  },
  {
    id: 't-4',
    title: 'Mid-Month Comprehensive Examination',
    course: 'Pure Mathematics: Calculus',
    type: 'center_exam',
    deadline: '2026-06-25T14:00:00',
    status: 'pending',
    description: 'Mandatory onsite exam inside Alpha Center Hall B. Bring your geometry set.'
  }
];

export default function HomeworkHubSection() {
  const [tasks, setTasks] = useState<TaskItem[]>(hybridTasksData);
  const [activeTab, setActiveTab] = useState<'all' | 'online' | 'center'>('all');
  const [selectedTask, setSelectedTask] = useState<TaskItem | null>(null);
  const [uploading, setUploading] = useState(false);

  // تصفية المهام بناءً على التبويب
  const filteredTasks = tasks.filter(task => {
    if (activeTab === 'online') return task.type.includes('online');
    if (activeTab === 'center') return task.type.includes('center');
    return true;
  });

  return (
    <div className="space-y-8 font-sans text-white relative pb-12">
      
      {/* هيدر القسم بتصميم شبكي تفاعلي مختلف */}
      <div className="relative bg-gradient-to-br from-[#120f24] via-[#1a1438] to-[#0a0814] p-8 rounded-[2.5rem] border border-purple-500/30 shadow-[0_0_50px_rgba(168,85,247,0.15)] overflow-hidden">
        <div className="absolute -right-10 -bottom-10 w-72 h-72 bg-gradient-to-br from-cyan-500/10 to-pink-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-[11px] font-bold tracking-wide uppercase">
              <Sparkles className="w-3.5 h-3.5" /> Interactive Assessment Engine
            </div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              Homework & Quizzes Hybrid Hub
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 max-w-xl leading-relaxed">
              Manage instant digital auto-graded assignments alongside mandatory physical center sheets and synchronized onsite examinations.
            </p>
          </div>

          {/* تبويبات التصفية السريعة (بين الإلكتروني والسنتر) */}
          <div className="flex items-center gap-2 bg-[#08070d]/80 p-2 rounded-2xl border border-white/10 backdrop-blur-md self-start md:self-auto shadow-inner">
            {(['all', 'online', 'center'] as const).map(tab => (
              <motion.button
                key={tab}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold capitalize transition-all cursor-pointer ${
                  activeTab === tab
                    ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-600/40'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {tab === 'all' ? 'All Tasks' : tab === 'online' ? '⚡ Digital (Online)' : '📍 Center (Physical)'}
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      {/* بطاقات المهام بتصميم غير تقليدي (Card Stagger & Color Coding) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredTasks.map((task, index) => {
          const isOnline = task.type.includes('online');
          
          return (
            <motion.div
              key={task.id}
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
              whileHover={{ y: -5, scale: 1.01 }}
              className={`relative p-6 rounded-[2rem] border backdrop-blur-xl transition-all flex flex-col justify-between space-y-6 shadow-2xl overflow-hidden ${
                isOnline 
                  ? 'bg-gradient-to-b from-[#10162f]/90 to-[#12101f] border-cyan-500/30 hover:border-cyan-400/60 shadow-[0_0_30px_rgba(6,182,212,0.1)]' 
                  : 'bg-gradient-to-b from-[#25101f]/90 to-[#12101f] border-pink-500/30 hover:border-pink-400/60 shadow-[0_0_30px_rgba(236,72,153,0.1)]'
              }`}
            >
              {/* شريط تمييز جانبي اللون حسب النوع */}
              <div className={`absolute top-0 left-0 right-0 h-1.5 ${isOnline ? 'bg-gradient-to-r from-cyan-400 to-blue-500' : 'bg-gradient-to-r from-pink-500 to-rose-500'}`} />

              <div className="space-y-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <div className={`w-10 h-10 rounded-2xl flex items-center justify-center border ${
                      isOnline ? 'bg-cyan-500/10 border-cyan-500/30 text-cyan-400' : 'bg-pink-500/10 border-pink-500/30 text-pink-400'
                    }`}>
                      {isOnline ? <Laptop className="w-5 h-5" /> : <MapPin className="w-5 h-5" />}
                    </div>
                    <div>
                      <span className={`text-[10px] font-extrabold uppercase tracking-widest ${isOnline ? 'text-cyan-400' : 'text-pink-400'}`}>
                        {task.type === 'online_homework' ? 'Digital Auto-Graded HW' : task.type === 'center_homework' ? 'Physical Center Sheet' : task.type === 'online_quiz' ? 'Timed 15-Min Quiz' : 'Onsite Center Exam'}
                      </span>
                      <h4 className="text-base font-extrabold text-white mt-0.5">{task.title}</h4>
                    </div>
                  </div>

                  {task.status === 'graded' || task.status === 'submitted' ? (
                    <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[11px] font-bold flex items-center gap-1 shrink-0">
                      <CheckCircle2 className="w-3.5 h-3.5" /> {task.grade ? `Score: ${task.grade}` : 'Submitted'}
                    </span>
                  ) : (
                    <span className="px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-[11px] font-bold flex items-center gap-1 shrink-0 animate-pulse">
                      <Clock className="w-3.5 h-3.5" /> Pending
                    </span>
                  )}
                </div>

                <p className="text-xs text-gray-300 leading-relaxed">
                  {task.description}
                </p>

                {/* تفاصيل الكورس والوقت */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-2 text-[11px] text-gray-400 border-t border-white/5">
                  <span className="font-semibold text-gray-300">Course: {task.course}</span>
                  {task.duration && (
                    <span className="flex items-center gap-1 text-purple-300 font-bold bg-purple-500/10 px-2.5 py-1 rounded-lg border border-purple-500/20">
                      <Timer className="w-3.5 h-3.5" /> {task.duration} Duration
                    </span>
                  )}
                </div>
              </div>

              {/* زر التفاعل أو رفع الواجب */}
              <div className="pt-2 flex items-center justify-between gap-4">
                <div className="text-[11px] text-gray-400">
                  <span className="text-[10px] block text-gray-500 uppercase">Deadline / Date:</span>
                  <span className="font-bold text-white">{new Date(task.deadline).toLocaleString()}</span>
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedTask(task)}
                  className={`px-5 py-2.5 rounded-xl font-extrabold text-xs transition-all cursor-pointer flex items-center gap-2 shadow-lg ${
                    isOnline 
                      ? 'bg-cyan-500 hover:bg-cyan-400 text-black shadow-cyan-500/30' 
                      : 'bg-pink-600 hover:bg-pink-500 text-white shadow-pink-600/30'
                  }`}
                >
                  <span>{task.type.includes('quiz') || task.type.includes('exam') ? 'Start Exam' : 'Submit / View'}</span>
                  <ChevronRight className="w-4 h-4" />
                </motion.button>
              </div>

            </motion.div>
          );
        })}
      </div>

      {/* نافذة التفاعل المرتجل (Modal) لرفع الواجب أو بدء الكويز */}
      <AnimatePresence>
        {selectedTask && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-xl p-4">
            <motion.div
              initial={{ scale: 0.85, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.85, opacity: 0, y: 20 }}
              className="bg-[#12101f] border border-purple-500/40 w-full max-w-lg rounded-[2rem] p-6 sm:p-8 space-y-6 shadow-[0_0_60px_rgba(168,85,247,0.3)] relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-48 h-48 bg-purple-600/20 rounded-full blur-2xl pointer-events-none" />

              <div className="flex items-center justify-between pb-4 border-b border-white/10 relative z-10">
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-purple-400">Task Submission Center</span>
                  <h3 className="text-lg font-black text-white mt-0.5">{selectedTask.title}</h3>
                </div>
                <button 
                  onClick={() => setSelectedTask(null)}
                  className="w-9 h-9 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-all cursor-pointer border border-white/10"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-4 relative z-10 text-xs text-gray-300">
                <p>{selectedTask.description}</p>

                {selectedTask.type.includes('online_homework') && (
                  <div className="space-y-3 pt-2">
                    <label className="block font-bold text-white">Upload Solution PDF / Image:</label>
                    <div className="border-2 border-dashed border-cyan-500/40 bg-cyan-500/5 rounded-2xl p-6 text-center space-y-2 cursor-pointer hover:bg-cyan-500/10 transition-all">
                      <Upload className="w-8 h-8 text-cyan-400 mx-auto" />
                      <p className="text-xs font-bold text-white">Click to browse or drag your homework file</p>
                      <p className="text-[10px] text-gray-400">Supports PDF, PNG, JPG up to 25MB</p>
                    </div>
                  </div>
                )}

                {selectedTask.type.includes('quiz') && (
                  <div className="bg-purple-600/10 border border-purple-500/30 p-4 rounded-2xl space-y-2 text-center">
                    <Zap className="w-8 h-8 text-purple-400 mx-auto animate-bounce" />
                    <h4 className="text-sm font-bold text-white">Ready to start the 15-Minute Timer?</h4>
                    <p className="text-[11px] text-gray-300">Once initialized, the countdown cannot be paused. Instant grading applies.</p>
                  </div>
                )}

                {selectedTask.type.includes('center') && (
                  <div className="bg-pink-600/10 border border-pink-500/30 p-4 rounded-2xl space-y-2">
                    <MapPin className="w-5 h-5 text-pink-400" />
                    <h4 className="text-sm font-bold text-white">Physical Hub Submission Instruction</h4>
                    <p className="text-[11px] text-gray-300">Deliver your physical paper sheet directly to the teaching assistant during your next visit to the center for manual grading stamp.</p>
                  </div>
                )}
              </div>

              <div className="pt-4 border-t border-white/10 flex justify-end gap-3 relative z-10">
                <button
                  onClick={() => setSelectedTask(null)}
                  className="px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 font-bold text-xs transition-all cursor-pointer border border-white/10"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    setTasks(tasks.map(t => t.id === selectedTask.id ? { ...t, status: 'submitted', grade: 'Pending Review' } : t));
                    setSelectedTask(null);
                  }}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-extrabold text-xs shadow-lg shadow-purple-600/30 cursor-pointer"
                >
                  Confirm & Submit
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}