'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Users, DollarSign, Star, Clock, BookOpen, CheckCircle,
  Upload, Plus, ChevronDown, X, Book, Video, Activity
} from 'lucide-react';

interface TeacherProfile {
  name: string;
}

interface DashboardStats {
  totalStudents: number;
  monthlyRevenue: number;
  classesToday: number;
  homeworkDue: number;
}

interface Props {
  teacherProfile: TeacherProfile;
  formattedDate: string;
  stats: DashboardStats;
  setStats: React.Dispatch<React.SetStateAction<DashboardStats>>;
  setActiveTab: (tab: string) => void;
}

// Subject Split Donut Chart Data
const subjectData = [
  { name: 'Maths', percentage: 35, color: '#8b5cf6' },
  { name: 'Physics', percentage: 28, color: '#3b82f6' },
  { name: 'Chemistry', percentage: 22, color: '#06b6d4' },
  { name: 'Biology', percentage: 15, color: '#10b981' },
];

// Attendance Bar Chart Data
const attendanceData = [
  { day: 'Mon', present: 85, absent: 15 },
  { day: 'Tue', present: 92, absent: 8 },
  { day: 'Wed', present: 78, absent: 22 },
  { day: 'Thu', present: 95, absent: 5 },
  { day: 'Fri', present: 88, absent: 12 },
];

export default function TeacherDashboardView({ teacherProfile, formattedDate, stats, setStats, setActiveTab }: Props) {
  const [activeSubTab, setActiveSubTab] = useState('Overview');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newClassTitle, setNewClassTitle] = useState('');
  const [newClassTime, setNewClassTime] = useState('02:00 PM');

  const [todayClasses, setTodayClasses] = useState([
    { id: 1, title: 'Advanced Calculus', time: '09:00 AM • 90 min • Room A3', students: '24', isLive: true, type: 'book' },
    { id: 2, title: 'Quantum Physics', time: '11:30 AM • 60 min • Online', students: '18', isLive: false, type: 'video' },
    { id: 3, title: 'Organic Chemistry', time: '02:00 PM • 75 min • Room B1', students: '31', isLive: false, type: 'book' },
    { id: 4, title: 'Cell Biology', time: '04:30 PM • 60 min • Lab 2', students: '22', isLive: false, type: 'book' },
  ]);

  const [liveActivities] = useState([
    { id: 1, text: 'Sara Ahmed submitted homework for Calculus', time: '2m ago', color: 'bg-emerald-500' },
    { id: 2, text: 'New enrollment: Yasmin Saad in Physics', time: '15m ago', color: 'bg-purple-500' },
    { id: 3, text: 'Omar Khalil scored 94% on Midterm Exam', time: '1h ago', color: 'bg-amber-500' },
    { id: 4, text: 'Payment received: 850 EGP from Hassan family', time: '2h ago', color: 'bg-blue-500' },
  ]);

  const handleCreateClass = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newClassTitle) return;
    const created = {
      id: Date.now(),
      title: newClassTitle,
      time: `${newClassTime} • 60 min • Room C1`,
      students: '15',
      isLive: false,
      type: 'book',
    };
    setTodayClasses([created, ...todayClasses]);
    setStats((prev) => ({ ...prev, classesToday: prev.classesToday + 1 }));
    setNewClassTitle('');
    setIsModalOpen(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6 max-w-[1500px] mx-auto text-white"
    >
      {/* Top Banner Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
            {formattedDate || 'WEDNESDAY, JULY 23, 2025'}
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-white mt-1 flex items-center gap-2">
            Good morning, <span className="text-purple-400">{teacherProfile.name.split(' ')[0] || 'Dr. Hassan'}</span> 👋
          </h1>
          <p className="text-xs text-gray-400 mt-0.5">
            You have {stats.classesToday} classes today and 3 pending homework submissions
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setActiveTab('Homework')}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-xs font-bold text-gray-200 transition-all cursor-pointer"
          >
            <Upload className="w-3.5 h-3.5" /> Upload Content
          </button>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-xs font-bold text-white shadow-lg shadow-purple-600/30 transition-all cursor-pointer active:scale-95"
          >
            <Plus className="w-4 h-4" /> New Class
          </button>
        </div>
      </div>

      {/* Dynamic Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {[
          { title: 'Total Students', val: stats.totalStudents, sub: 'Active this month', change: '+12%', color: 'text-purple-400', icon: Users },
          { title: 'Monthly Revenue', val: `${stats.monthlyRevenue.toLocaleString()}`, sub: 'EGP this month', change: '+18%', color: 'text-cyan-400', icon: DollarSign },
          { title: 'Avg Rating', val: '4.9', sub: 'From 183 reviews', change: '+0.2', color: 'text-amber-400', icon: Star },
          { title: 'Classes Today', val: stats.classesToday, sub: 'Next at 9:00 AM', change: '+1', color: 'text-indigo-400', icon: Clock },
          { title: 'Homework Due', val: stats.homeworkDue, sub: 'Submissions pending', change: '-3', color: 'text-rose-400', icon: BookOpen },
          { title: 'Attendance', val: '91%', sub: 'This week', change: '+4%', color: 'text-emerald-400', icon: CheckCircle },
        ].map((card, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            className="p-3.5 rounded-2xl bg-[#110f22] border border-white/5 space-y-2 relative overflow-hidden group shadow-lg"
          >
            <div className="flex items-center justify-between">
              <div className={`p-2 rounded-xl bg-white/5 ${card.color}`}>
                <card.icon className="w-4 h-4" />
              </div>
              <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded-full border border-emerald-500/20">
                ↗ {card.change}
              </span>
            </div>
            <div>
              <h2 className="text-xl font-black text-white tracking-tight">{card.val}</h2>
              <p className="text-[10px] font-bold text-gray-300 mt-0.5">{card.title}</p>
              <p className="text-[9px] text-gray-500">{card.sub}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Sub Tabs */}
      <div className="flex items-center gap-1 p-1 bg-[#110f22] border border-white/5 rounded-2xl w-fit">
        {['Overview', 'Classes', 'Students', 'Messages'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveSubTab(tab)}
            className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${activeSubTab === tab
              ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30'
              : 'text-gray-400 hover:text-white'
              }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Grid Layout matching images */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Revenue Overview (Area Line Chart) */}
        <div className="lg:col-span-2 p-5 rounded-3xl bg-[#110f22] border border-white/5 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-white">Revenue Overview</h3>
              <p className="text-[10px] text-gray-400">Monthly earnings & student growth</p>
            </div>
            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-[11px] font-bold text-gray-300">
              Last 7 months <ChevronDown className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="relative h-64 w-full pt-4">
            <svg className="w-full h-full overflow-visible" viewBox="0 0 750 200">
              <defs>
                <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.0" />
                </linearGradient>
              </defs>
              <line x1="50" y1="160" x2="720" y2="160" stroke="rgba(255,255,255,0.08)" strokeDasharray="4 4" />

              {/* Animated Path */}
              <motion.path
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.5, ease: 'easeInOut' }}
                d="M 50 130 C 100 120, 130 70, 155 70 C 200 70, 230 100, 260 100 C 310 100, 340 60, 365 60 C 420 60, 440 40, 470 40 C 520 40, 540 20, 575 20 C 630 20, 650 30, 680 30 L 680 160 L 50 160 Z"
                fill="url(#chartGradient)"
              />
              <motion.path
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.5, ease: 'easeInOut' }}
                d="M 50 130 C 100 120, 130 70, 155 70 C 200 70, 230 100, 260 100 C 310 100, 340 60, 365 60 C 420 60, 440 40, 470 40 C 520 40, 540 20, 575 20 C 630 20, 650 30, 680 30"
                fill="none"
                stroke="#a855f7"
                strokeWidth="3"
              />

              {/* Tooltip Point Marker */}
              <line x1="155" y1="20" x2="155" y2="160" stroke="#a855f7" strokeWidth="1.5" strokeDasharray="3 3" />
              <circle cx="155" cy="70" r="5" fill="#00f2fe" stroke="#ffffff" strokeWidth="2" />

              {['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'].map((m, i) => (
                <text key={i} x={155 + i * 105} y="180" fill="#9ca3af" fontSize="11" textAnchor="middle">{m}</text>
              ))}
            </svg>

            {/* Static Card Tooltip matching Image */}
            <div className="absolute top-[10%] left-[12%] bg-[#0d0b1a] border border-purple-500/40 p-2.5 rounded-xl shadow-2xl z-10 text-[11px] space-y-0.5">
              <p className="font-bold text-gray-300">Feb</p>
              <p className="font-extrabold text-purple-400">revenue: <span className="text-white">14,200 EGP</span></p>
              <p className="font-bold text-cyan-400">students: <span className="text-white">48</span></p>
            </div>
          </div>
        </div>

        {/* Animated Donut Chart (Subject Split) */}
        <div className="p-5 rounded-3xl bg-[#110f22] border border-white/5 space-y-4 flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold text-white">Subject Split</h3>
            <p className="text-[10px] text-gray-400">Student distribution by subject</p>
          </div>

          <div className="flex items-center justify-center my-2 relative">
            <svg className="w-40 h-40 transform -rotate-90" viewBox="0 0 36 36">
              {/* Animated Donut Slices */}
              <motion.circle
                cx="18" cy="18" r="14"
                fill="none" stroke="#8b5cf6" strokeWidth="5"
                strokeDasharray="35 100" strokeDashoffset="0"
                initial={{ strokeDasharray: "0 100" }}
                animate={{ strokeDasharray: "35 100" }}
                transition={{ duration: 1 }}
              />
              <motion.circle
                cx="18" cy="18" r="14"
                fill="none" stroke="#3b82f6" strokeWidth="5"
                strokeDasharray="28 100" strokeDashoffset="-35"
                initial={{ strokeDasharray: "0 100" }}
                animate={{ strokeDasharray: "28 100" }}
                transition={{ duration: 1, delay: 0.2 }}
              />
              <motion.circle
                cx="18" cy="18" r="14"
                fill="none" stroke="#06b6d4" strokeWidth="5"
                strokeDasharray="22 100" strokeDashoffset="-63"
                initial={{ strokeDasharray: "0 100" }}
                animate={{ strokeDasharray: "22 100" }}
                transition={{ duration: 1, delay: 0.4 }}
              />
              <motion.circle
                cx="18" cy="18" r="14"
                fill="none" stroke="#10b981" strokeWidth="5"
                strokeDasharray="15 100" strokeDashoffset="-85"
                initial={{ strokeDasharray: "0 100" }}
                animate={{ strokeDasharray: "15 100" }}
                transition={{ duration: 1, delay: 0.6 }}
              />
            </svg>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs">
            {subjectData.map((s) => (
              <div key={s.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: s.color }} />
                  <span className="text-gray-300 text-[11px] font-medium">{s.name}</span>
                </div>
                <span className="font-bold text-white text-[11px]">{s.percentage}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Today's Classes */}
        <div className="lg:col-span-2 p-5 rounded-3xl bg-[#110f22] border border-white/5 space-y-3">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-bold text-white">Today&apos;s Classes</h3>
            <button className="text-xs text-purple-400 font-bold hover:underline">View All &gt;</button>
          </div>

          <div className="space-y-2.5">
            {todayClasses.map((cls) => (
              <motion.div
                key={cls.id}
                whileHover={{ x: 3 }}
                className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/5 flex items-center justify-between hover:border-purple-500/30 transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-purple-600/10 text-purple-400 border border-purple-500/20">
                    {cls.type === 'video' ? <Video className="w-4 h-4" /> : <Book className="w-4 h-4" />}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">{cls.title}</h4>
                    <p className="text-[10px] text-gray-400">{cls.time}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-[10px] text-gray-400 font-bold">{cls.students} <span className="text-[9px] font-normal">students</span></span>
                  {cls.isLive && (
                    <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[9px] font-bold border border-emerald-500/30 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> LIVE
                    </span>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right Column: Bar Chart & Live Activity */}
        <div className="space-y-5">
          {/* Animated Bar Chart (Attendance This Week) */}
          <div className="p-5 rounded-3xl bg-[#110f22] border border-white/5 space-y-4">
            <h3 className="text-sm font-bold text-white">Attendance This Week</h3>

            <div className="flex items-end justify-between h-36 pt-4 px-2">
              {attendanceData.map((d, i) => (
                <div key={d.day} className="flex flex-col items-center gap-2 h-full justify-end">
                  <div className="flex items-end gap-1 h-full">
                    {/* Animated Present Bar */}
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: `${d.present}%` }}
                      transition={{ duration: 0.8, delay: i * 0.1 }}
                      className="w-3.5 bg-purple-600 rounded-t-sm"
                    />
                    {/* Animated Absent Bar */}
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: `${d.absent}%` }}
                      transition={{ duration: 0.8, delay: i * 0.1 + 0.2 }}
                      className="w-3.5 bg-rose-500/40 rounded-t-sm"
                    />
                  </div>
                  <span className="text-[10px] text-gray-400 font-bold">{d.day}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Live Activity Stream */}
          <div className="p-5 rounded-3xl bg-[#110f22] border border-white/5 space-y-3">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Activity className="w-4 h-4 text-purple-400" /> Live Activity
            </h3>

            <div className="space-y-3">
              {liveActivities.map((act) => (
                <div key={act.id} className="flex items-start gap-2.5">
                  <span className={`w-2 h-2 rounded-full mt-1 shrink-0 ${act.color}`} />
                  <div>
                    <p className="text-[11px] text-gray-200 font-medium leading-tight">{act.text}</p>
                    <span className="text-[9px] text-gray-500">{act.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* New Class Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-[#110f22] border border-white/10 rounded-3xl p-6 max-w-md w-full space-y-4 shadow-2xl"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <h3 className="text-base font-bold text-white">Create New Live Class</h3>
                <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-white">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleCreateClass} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-xs text-gray-300 font-semibold">Class Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Advanced Calculus Tutorial"
                    value={newClassTitle}
                    onChange={(e) => setNewClassTitle(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-white/5 border border-white/10 rounded-xl text-xs text-white outline-none focus:border-purple-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs text-gray-300 font-semibold">Scheduled Time</label>
                  <input
                    type="text"
                    value={newClassTime}
                    onChange={(e) => setNewClassTime(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-white/5 border border-white/10 rounded-xl text-xs text-white outline-none focus:border-purple-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-purple-600 hover:bg-purple-500 rounded-xl text-xs font-bold text-white shadow-lg shadow-purple-600/30 transition-all cursor-pointer"
                >
                  Confirm & Schedule Class
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}