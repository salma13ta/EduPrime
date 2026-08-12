'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Upload, CheckCircle2, MapPin, Laptop, Sparkles, ChevronRight, AlertCircle } from 'lucide-react';

export default function HomeworkView() {
  const [filter, setFilter] = useState<'All' | 'online' | 'center'>('All');
  const [tasks, setTasks] = useState([
    {
      id: '1',
      title: 'Calculus Problem Set 7 (Auto-Graded)',
      subject: 'Mathematics',
      due: 'Today, 11:59 PM',
      type: 'online',
      status: 'Pending',
      urgent: true,
      desc: 'Solve problems 1 through 15 directly. Your score will be calculated instantly upon submission.'
    },
    {
      id: '2',
      title: 'Essay: The Great Gatsby Analysis',
      subject: 'English Literature',
      due: 'Tomorrow, 5:00 PM',
      type: 'online',
      status: 'Pending',
      urgent: false,
      desc: 'Upload your essay draft in PDF format for automated review and grading.'
    },
    {
      id: '3',
      title: 'Physics Practical Sheet Delivery',
      subject: 'Advanced Physics',
      due: 'Saturday, 04:00 PM',
      type: 'center',
      status: 'Pending',
      urgent: false,
      desc: 'Hand in your physical paper sheet directly to the instructor at the center hall.'
    }
  ]);

  const [activeTask, setActiveTask] = useState<any>(null);

  const visibleTasks = tasks.filter(item => {
    if (filter === 'online') return item.type === 'online';
    if (filter === 'center') return item.type === 'center';
    return true;
  });

  return (
    <div className="space-y-6 text-white pb-10">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gradient-to-r from-[#141225] via-[#1a1435] to-[#0f0c1b] p-6 rounded-3xl border border-purple-500/20 shadow-lg">
        <div>

          <h1 className="text-xl sm:text-2xl font-bold tracking-tight">Homework & Tasks</h1>
          <p className="text-xs text-gray-400 mt-0.5">Keep track of your deadlines, whether digital online or physical center sheets.</p>
        </div>

        {/* Quick Filters */}
        <div className="flex items-center gap-1 bg-[#09080e] p-1 rounded-2xl border border-white/10 self-start sm:self-auto">
          {(['All', 'online', 'center'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                filter === tab 
                  ? 'bg-purple-600 text-white shadow-md' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {tab === 'All' ? 'All' : tab === 'online' ? '⚡ Digital' : '📍 Center'}
            </button>
          ))}
        </div>
      </div>

      {/* Task List */}
      <div className="space-y-3">
        {visibleTasks.map((item, index) => {
          const isDigital = item.type === 'online';

          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.005 }}
              className={`p-5 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative overflow-hidden ${
                isDigital 
                  ? 'bg-[#10152a]/90 border-cyan-500/25 hover:border-cyan-400/50 shadow-[0_0_15px_rgba(6,182,212,0.06)]' 
                  : 'bg-[#22101f]/90 border-pink-500/25 hover:border-pink-400/50 shadow-[0_0_15px_rgba(236,72,153,0.06)]'
              }`}
            >
              {/* Color stripe for quick visual differentiation */}
              <div className={`absolute top-0 left-0 bottom-0 w-1.5 ${isDigital ? 'bg-cyan-400' : 'bg-pink-500'}`} />

              <div className="flex items-start gap-3.5 pl-2">
                <div className={`p-2.5 rounded-xl border mt-0.5 ${
                  isDigital ? 'bg-cyan-500/10 border-cyan-500/30 text-cyan-400' : 'bg-pink-500/10 border-pink-500/30 text-pink-400'
                }`}>
                  {isDigital ? <Laptop className="w-5 h-5" /> : <MapPin className="w-5 h-5" />}
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className={`text-[10px] font-bold uppercase ${isDigital ? 'text-cyan-400' : 'text-pink-400'}`}>
                      {isDigital ? 'Digital Assignment' : 'Physical Center Sheet'}
                    </span>
                    {item.urgent && (
                      <span className="px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 text-[10px] font-semibold flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" /> Urgent
                      </span>
                    )}
                  </div>
                  <h3 className="text-sm font-bold text-white">{item.title}</h3>
                  <p className="text-xs text-gray-400">{item.subject} • <span className="text-gray-300 font-medium">{item.due}</span></p>
                </div>
              </div>

              <div className="flex items-center gap-2.5 self-end sm:self-auto">
                <span className={`text-xs px-3 py-1 rounded-full font-medium border ${
                  item.status === 'Submitted' 
                    ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' 
                    : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                }`}>
                  {item.status === 'Submitted' ? 'Submitted' : 'Pending'}
                </span>

                <button
                  onClick={() => setActiveTask(item)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1 ${
                    isDigital 
                      ? 'bg-cyan-500 hover:bg-cyan-400 text-black shadow-sm' 
                      : 'bg-pink-600 hover:bg-pink-500 text-white shadow-sm'
                  }`}
                >
                  <span>Details</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Task Details / Submission Modal */}
      <AnimatePresence>
        {activeTask && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-[#12101f] border border-purple-500/30 w-full max-w-md rounded-2xl p-6 space-y-5 shadow-2xl relative"
            >
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <div>
                  <span className="text-[10px] text-purple-400 font-bold uppercase">Task Management</span>
                  <h3 className="text-base font-bold text-white mt-0.5">{activeTask.title}</h3>
                </div>
                <button 
                  onClick={() => setActiveTask(null)}
                  className="w-7 h-7 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white flex items-center justify-center transition-all cursor-pointer text-xs"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-3 text-xs text-gray-300">
                <p className="leading-relaxed text-gray-200">{activeTask.desc}</p>

                <div className="bg-[#09080e] p-3.5 rounded-xl border border-white/5 flex items-center justify-between text-gray-400">
                  <span>Subject: <strong className="text-white">{activeTask.subject}</strong></span>
                  <span>Deadline: <strong className="text-amber-400">{activeTask.due}</strong></span>
                </div>

                {activeTask.type === 'online' ? (
                  <div className="space-y-2 pt-1">
                    <label className="block font-semibold text-white">Upload Solution File:</label>
                    <div className="border-2 border-dashed border-cyan-500/30 bg-cyan-500/5 rounded-xl p-5 text-center space-y-1.5 cursor-pointer hover:bg-cyan-500/10 transition-all">
                      <Upload className="w-5 h-5 text-cyan-400 mx-auto" />
                      <p className="text-xs font-semibold text-white">Click to select solution file (PDF or Image)</p>
                      <p className="text-[10px] text-gray-400">Automated grading will trigger upon upload</p>
                    </div>
                  </div>
                ) : (
                  <div className="bg-pink-600/10 border border-pink-500/20 p-3.5 rounded-xl space-y-1">
                    <span className="text-pink-400 font-bold block text-[11px]">Center Submission Notice</span>
                    <p className="text-[11px] text-gray-300">This is a physical paper task. It must be handed directly to the instructor or assistant during your next visit to the center hall.</p>
                  </div>
                )}
              </div>

              <div className="pt-3 border-t border-white/10 flex justify-end gap-2.5">
                <button
                  onClick={() => setActiveTask(null)}
                  className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 font-semibold text-xs transition-all cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    setTasks(tasks.map(t => t.id === activeTask.id ? { ...t, status: 'Submitted' } : t));
                    setActiveTask(null);
                  }}
                  className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-md transition-all cursor-pointer"
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