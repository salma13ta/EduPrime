'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Play, AlertCircle, CheckCircle2 } from 'lucide-react';

export default function CoursesAndSidebar({ firstName }: { firstName: string }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      
      {/* Courses List */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="lg:col-span-2 p-5 rounded-3xl bg-[#110f1e] border border-white/5 space-y-4 shadow-xl"
      >
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-white">My Courses</h3>
          <button className="text-[11px] text-purple-400 hover:underline">View All</button>
        </div>

        <div className="space-y-3">
          {[
            { title: 'Advanced Calculus', teacher: 'Dr. Sarah Chen', pct: 78, time: 'Today 3:00 PM', color: 'bg-purple-500' },
            { title: 'Organic Chemistry', teacher: 'Prof. James Lee', pct: 45, time: 'Tomorrow 10:00 AM', color: 'bg-fuchsia-500' },
            { title: 'English Literature', teacher: 'Ms. Layla Hassan', pct: 92, time: 'Wed 2:00 PM', color: 'bg-cyan-400' },
          ].map((course, idx) => (
            <motion.div 
              key={idx}
              whileHover={{ scale: 1.01, backgroundColor: "rgba(255,255,255,0.03)" }}
              className="p-3.5 rounded-2xl bg-[#161426] border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center shrink-0">
                  <BookOpen className="w-5 h-5 text-purple-400" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">{course.title}</h4>
                  <p className="text-[11px] text-gray-400">{course.teacher}</p>
                </div>
              </div>

              <div className="flex items-center justify-between sm:justify-end gap-4 w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-white/5">
                <div className="text-right w-24">
                  <span className="text-[10px] text-gray-400 block">{course.time}</span>
                  <div className="w-full h-1.5 bg-white/10 rounded-full mt-1 overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: `${course.pct}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8 }}
                      className={`h-full rounded-full ${course.color}`} 
                    />
                  </div>
                </div>
                <motion.button 
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-2 rounded-xl bg-purple-600 text-white hover:bg-purple-500 transition-all cursor-pointer"
                >
                  <Play className="w-3.5 h-3.5 fill-white" />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Side Widgets */}
      <div className="space-y-6">
        
        {/* Homework */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="p-5 rounded-3xl bg-[#110f1e] border border-white/5 space-y-3 shadow-xl"
        >
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white">Homework</h3>
            <span className="px-2 py-0.5 text-[10px] bg-amber-500/10 text-amber-400 border border-amber-500/20 rounded-md font-bold">
              3 Pending
            </span>
          </div>

          <div className="space-y-2.5">
            {[
              { title: 'Calculus Problem Set 7', sub: 'Math', due: 'Due Today', alert: true },
              { title: 'Essay: The Great Gatsby', sub: 'English', due: 'Due Tomorrow', alert: false },
            ].map((hw, i) => (
              <motion.div 
                key={i} 
                whileHover={{ x: 4 }}
                className="p-3 rounded-xl bg-[#161426] border border-white/5 flex items-center justify-between"
              >
                <div className="flex items-center gap-2.5">
                  {hw.alert ? (
                    <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
                  ) : (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  )}
                  <div>
                    <p className="text-xs font-bold text-white">{hw.title}</p>
                    <p className="text-[10px] text-gray-400">{hw.sub}</p>
                  </div>
                </div>
                <span className="text-[10px] text-gray-400 bg-white/5 px-2 py-1 rounded-lg">
                  {hw.due}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Leaderboard */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="p-5 rounded-3xl bg-[#110f1e] border border-white/5 space-y-3 shadow-xl"
        >
          <h3 className="text-sm font-bold text-white">Leaderboard</h3>
          
          <div className="space-y-2">
            {[
              { rank: 1, name: 'Emma W.', score: '9,840', isYou: false },
              { rank: 2, name: `${firstName} (You)`, score: '9,620', isYou: true },
              { rank: 3, name: 'Sara J.', score: '9,410', isYou: false },
            ].map((userRank, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.02 }}
                className={`p-2.5 rounded-xl flex items-center justify-between text-xs transition-all ${
                  userRank.isYou 
                    ? 'bg-purple-600/20 border border-purple-500/40 text-purple-200' 
                    : 'bg-[#161426] text-gray-300'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className={`w-5 h-5 rounded-full flex items-center justify-center font-bold text-[10px] ${
                    userRank.rank === 1 ? 'bg-amber-400 text-black' : userRank.rank === 2 ? 'bg-slate-300 text-black' : 'bg-amber-700 text-white'
                  }`}>
                    {userRank.rank}
                  </span>
                  <span className="font-semibold">{userRank.name}</span>
                </div>
                <span className="font-bold text-white">{userRank.score} pts</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </div>
  );
}