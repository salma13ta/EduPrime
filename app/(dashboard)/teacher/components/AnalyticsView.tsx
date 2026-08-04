'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Users, DollarSign, TrendingUp, Star,
  RefreshCw, Download, HelpCircle,
  CheckCircle2, X, Activity, Target
} from 'lucide-react';

interface HeatmapCell {
  id: number;
  rate: string;
  group: string;
  status: 'high' | 'medium' | 'low';
}

export default function AnalyticsView() {
  const [activeTab, setActiveTab] = useState('Revenue');
  const [timeRange, setTimeRange] = useState('7m');

  const [isRefreshing, setIsRefreshing] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [hoveredChartMonth, setHoveredChartMonth] = useState<string | null>('Jun');
  const [hoveredSubject, setHoveredSubject] = useState<string | null>(null);
  const [selectedHeatmapCell, setSelectedHeatmapCell] = useState<HeatmapCell | null>(null);
  const [showHelpModal, setShowHelpModal] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);

  const [multiplier, setMultiplier] = useState(1);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      showToast('تم تحديث البيانات المباشرة بنجاح!');
    }, 1000);
  };

  const handleTimeRangeChange = (range: string) => {
    setTimeRange(range);
    let m = 1;
    if (range === '1m') m = 0.3;
    if (range === '3m') m = 0.65;
    if (range === '7m') m = 1;
    if (range === '1y') m = 1.8;
    setMultiplier(m);
    showToast(`تم تصفية البيانات للفترة: ${range}`);
  };

  const handleExportData = (type: string) => {
    setShowExportModal(false);
    showToast(`تم تصدير تقرير (${type}) بصيغة CSV بنجاح!`);
  };

  const subjectsData = [
    { name: 'Mathematics', percent: 42, bg: 'bg-purple-500' },
    { name: 'Physics', percent: 28, bg: 'bg-cyan-500' },
    { name: 'Chemistry', percent: 18, bg: 'bg-emerald-500' },
    { name: 'Biology', percent: 12, bg: 'bg-amber-500' },
  ];

  const heatmapCells: HeatmapCell[] = [
    { id: 1, rate: '90%', group: 'Math Group A', status: 'high' },
    { id: 2, rate: '88%', group: 'Physics Group B', status: 'medium' },
    { id: 3, rate: '95%', group: 'Chemistry Group A', status: 'high' },
    { id: 4, rate: '82%', group: 'Biology Group A', status: 'medium' },
    { id: 5, rate: '78%', group: 'Math Adv Group', status: 'low' },
    { id: 6, rate: '92%', group: 'Math Group B', status: 'high' },
    { id: 7, rate: '94%', group: 'Physics Group A', status: 'high' },
    { id: 8, rate: '87%', group: 'Chemistry Group B', status: 'medium' },
    { id: 9, rate: '91%', group: 'Biology Group B', status: 'high' },
    { id: 10, rate: '85%', group: 'Science Group A', status: 'medium' },
    { id: 11, rate: '85%', group: 'Math Revision', status: 'medium' },
    { id: 12, rate: '89%', group: 'Physics Adv', status: 'medium' },
    { id: 13, rate: '92%', group: 'Chem Lab Group', status: 'high' },
    { id: 14, rate: '94%', group: 'Bio Practice', status: 'high' },
    { id: 15, rate: '96%', group: 'Final Review', status: 'high' },
  ];

  return (
    <div className="space-y-6 text-gray-200 font-sans relative dir-ltr pb-12 bg-[#0b0914] min-h-screen p-6">

      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            className="fixed top-5 right-6 z-50 bg-[#161329] text-white px-4 py-2.5 rounded-2xl shadow-2xl border border-purple-500/30 flex items-center gap-3 backdrop-blur-md text-xs font-semibold"
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            {toastMessage}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header Controls Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-purple-400">BUSINESS INTELLIGENCE</span>
          <h1 className="text-2xl font-black text-white tracking-tight mt-0.5">Analytics Dashboard</h1>
          <p className="text-xs text-gray-400 mt-0.5">
            Real-time insights across all branches • <span className="text-purple-400 font-medium">Updated 2 min ago</span>
          </p>
        </div>

        {/* Time Filter & Top Action Buttons */}
        <div className="flex items-center gap-2">
          <div className="flex items-center bg-[#131022] border border-white/10 rounded-xl p-1">
            {['1m', '3m', '7m', '1y'].map((range) => (
              <button
                key={range}
                onClick={() => handleTimeRangeChange(range)}
                className={`px-3 py-1 text-xs font-bold rounded-lg transition-all cursor-pointer ${timeRange === range
                  ? 'bg-purple-600 text-white shadow-md shadow-purple-600/40'
                  : 'text-gray-400 hover:text-white'
                  }`}
              >
                {range}
              </button>
            ))}
          </div>

          <button
            onClick={() => setShowExportModal(true)}
            className="px-3.5 py-1.5 bg-[#131022] hover:bg-white/10 border border-white/10 rounded-xl text-xs font-semibold text-gray-300 flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-purple-400" /> Export
          </button>

          <button
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="px-3.5 py-1.5 bg-[#131022] hover:bg-white/10 border border-white/10 rounded-xl text-xs font-semibold text-gray-300 flex items-center gap-1.5 transition-all cursor-pointer disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-purple-400 ${isRefreshing ? 'animate-spin' : ''}`} /> Refresh
          </button>
        </div>
      </div>

      {/* 6 Top Stat Cards Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3.5">
        {[
          { label: 'Total Revenue', val: `${Math.round(128000 * multiplier).toLocaleString()} EGP`, badge: '↗ 18%', icon: DollarSign, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
          { label: 'Active Students', val: `${Math.round(492 * multiplier)}`, badge: '↗ 8%', icon: Users, color: 'text-purple-400', bg: 'bg-purple-500/10' },
          { label: 'Avg Rating', val: '4.8★', badge: '↗ 5%', icon: Star, color: 'text-amber-400', bg: 'bg-amber-500/10' },
          { label: 'New This Month', val: `${Math.round(29 * multiplier)}`, badge: '↗ 12%', icon: TrendingUp, color: 'text-cyan-400', bg: 'bg-cyan-500/10' },
          { label: 'Retention Rate', val: '94%', badge: '↗ 2%', icon: Target, color: 'text-indigo-400', bg: 'bg-indigo-500/10' },
          { label: 'Avg Session Score', val: '87%', badge: '↗ 4%', icon: Activity, color: 'text-rose-400', bg: 'bg-rose-500/10' },
        ].map((card, i) => {
          const Icon = card.icon;
          return (
            <motion.div
              key={i}
              whileHover={{ y: -3, scale: 1.01 }}
              onClick={() => showToast(`البيانات: ${card.label}`)}
              className="p-4 rounded-2xl bg-[#131022] border border-white/5 hover:border-purple-500/30 transition-all cursor-pointer space-y-3 shadow-lg group relative overflow-hidden"
            >
              <div className="flex items-center justify-between">
                <div className={`p-2 rounded-xl ${card.bg} ${card.color}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-1.5 py-0.5 rounded-md">
                  {card.badge}
                </span>
              </div>
              <div>
                <h3 className="text-xl font-extrabold text-white tracking-tight group-hover:text-purple-300 transition-colors">{card.val}</h3>
                <p className="text-[11px] text-gray-400 mt-0.5">{card.label}</p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Sub Tab Navigation */}
      <div className="flex items-center gap-2 border-b border-white/5 pb-2">
        {['Revenue', 'Students', 'Teachers', 'Performance'].map((tab) => (
          <button
            key={tab}
            onClick={() => {
              setActiveTab(tab);
              showToast(`التبويب النشط: ${tab}`);
            }}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${activeTab === tab
              ? 'bg-purple-600/20 border border-purple-500/40 text-purple-300 shadow-md'
              : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Interactive Main Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Revenue vs Target Line Chart */}
        <div className="lg:col-span-2 p-6 rounded-3xl bg-[#131022] border border-white/5 space-y-4 relative flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-white">Revenue vs Target</h2>
              <p className="text-xs text-gray-400">Monthly performance against goals</p>
            </div>
            <div className="flex items-center gap-4 text-xs font-medium text-gray-400">
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-purple-500"></span> Revenue</span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-indigo-400/40"></span> Target</span>
            </div>
          </div>

          <div className="relative h-64 w-full pt-6">
            {hoveredChartMonth && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="absolute top-2 left-1/2 -translate-x-1/2 bg-[#1b1732] border border-purple-500/40 px-3 py-2 rounded-xl shadow-2xl text-[11px] space-y-0.5 z-10 backdrop-blur-md pointer-events-none"
              >
                <p className="font-bold text-purple-300">{hoveredChartMonth} Performance</p>
                <p className="text-purple-400">Revenue: <span className="font-bold text-white">EGP 128,000</span></p>
                <p className="text-indigo-300">Target: <span className="font-bold text-white">EGP 110,000</span></p>
              </motion.div>
            )}

            <svg className="w-full h-full overflow-visible" viewBox="0 0 500 150" preserveAspectRatio="none">
              <defs>
                <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
                </linearGradient>
              </defs>

              <path d="M 0,90 Q 125,85 250,70 T 500,60" fill="none" stroke="#6366f1" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.6" />
              <path d="M 0,100 Q 125,80 250,50 T 500,40 L 500,150 L 0,150 Z" fill="url(#chartGrad)" />
              <motion.path
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.2, ease: "easeInOut" }}
                d="M 0,100 Q 125,80 250,50 T 500,40"
                fill="none"
                stroke="#8b5cf6"
                strokeWidth="3"
              />
              <circle cx="415" cy="42" r="5" fill="#ffffff" stroke="#8b5cf6" strokeWidth="3" />
            </svg>

            <div className="flex justify-between text-xs text-gray-400 font-medium mt-2 px-1 border-t border-white/5 pt-2">
              {['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'].map((m) => (
                <span
                  key={m}
                  onMouseEnter={() => setHoveredChartMonth(m)}
                  className={`cursor-pointer transition-colors hover:text-purple-400 ${hoveredChartMonth === m ? 'text-purple-300 font-bold underline' : ''}`}
                >
                  {m}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Revenue by Subject Donut Chart */}
        <div className="p-6 rounded-3xl bg-[#131022] border border-white/5 space-y-4 flex flex-col justify-between">
          <div>
            <h2 className="text-base font-bold text-white">Revenue by Subject</h2>
            <p className="text-xs text-gray-400">Contribution percentage</p>
          </div>

          <div className="relative w-44 h-44 mx-auto flex items-center justify-center">
            <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 36 36">
              <path strokeDasharray="42, 100" strokeDashoffset="0" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#8b5cf6" strokeWidth="4.5" />
              <path strokeDasharray="28, 100" strokeDashoffset="-42" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#06b6d4" strokeWidth="4.5" />
              <path strokeDasharray="18, 100" strokeDashoffset="-70" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#10b981" strokeWidth="4.5" />
              <path strokeDasharray="12, 100" strokeDashoffset="-88" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#f59e0b" strokeWidth="4.5" />
            </svg>

            <div className="absolute text-center">
              <p className="text-xs text-gray-400 font-medium">Total</p>
              <p className="text-lg font-black text-white">100%</p>
            </div>
          </div>

          <div className="space-y-2 pt-2 border-t border-white/5">
            {subjectsData.map((sub, idx) => (
              <div
                key={idx}
                onMouseEnter={() => setHoveredSubject(sub.name)}
                onMouseLeave={() => setHoveredSubject(null)}
                onClick={() => showToast(`مادة: ${sub.name} بنسبة ${sub.percent}%`)}
                className={`flex items-center justify-between text-xs p-1.5 rounded-lg transition-all cursor-pointer ${hoveredSubject === sub.name ? 'bg-white/10' : 'hover:bg-white/5'
                  }`}
              >
                <div className="flex items-center gap-2">
                  <span className={`w-2.5 h-2.5 rounded-full ${sub.bg}`}></span>
                  <span className="text-gray-300 font-semibold">{sub.name}</span>
                </div>
                <span className="font-extrabold text-white">{sub.percent}%</span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Attendance Heatmap Section */}
      <div className="p-6 rounded-3xl bg-[#131022] border border-white/5 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-base font-bold text-white">Attendance Heatmap</h2>
            <p className="text-xs text-gray-400">Daily attendance rate per group (weeks × groups)</p>
          </div>
          <div className="flex items-center gap-3 text-xs text-gray-400">
            <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded bg-emerald-600"></span> &gt;90% High</span>
            <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded bg-indigo-700"></span> 80-90% Mid</span>
            <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded bg-amber-800"></span> &lt;80% Low</span>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          {heatmapCells.map((cell) => {
            const isSelected = selectedHeatmapCell?.id === cell.id;
            const bgStyle =
              cell.status === 'high' ? 'bg-emerald-700/60 hover:bg-emerald-600 border-emerald-500/30' :
                cell.status === 'medium' ? 'bg-indigo-800/60 hover:bg-indigo-700 border-indigo-500/30' :
                  'bg-amber-900/60 hover:bg-amber-800 border-amber-500/30';

            return (
              <motion.div
                key={cell.id}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  setSelectedHeatmapCell(cell);
                  showToast(`${cell.group}: نسبة الحضور ${cell.rate}`);
                }}
                className={`h-28 rounded-2xl border p-3 flex flex-col justify-between cursor-pointer transition-all ${bgStyle} ${isSelected ? 'ring-2 ring-purple-400 shadow-xl' : ''
                  }`}
              >
                <span className="text-[10px] font-bold text-white/70 uppercase">GROUP DATA</span>
                <div className="text-center">
                  <span className="text-2xl font-black text-white">{cell.rate}</span>
                </div>
                <span className="text-[10px] text-white/80 font-medium truncate">{cell.group}</span>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Floating Help Icon */}
      <button
        onClick={() => setShowHelpModal(true)}
        className="fixed bottom-6 right-6 w-11 h-11 rounded-full bg-purple-600 hover:bg-purple-500 text-white flex items-center justify-center shadow-2xl shadow-purple-600/50 transition-all cursor-pointer border border-purple-400/40 z-30"
      >
        <HelpCircle className="w-5 h-5" />
      </button>

      {/* Export Modal */}
      <AnimatePresence>
        {showExportModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[#161329] border border-purple-500/30 rounded-3xl p-6 w-full max-w-md space-y-4 shadow-2xl relative"
            >
              <div className="flex items-center justify-between border-b border-white/5 pb-3">
                <h3 className="text-base font-bold text-white">تصدير البيانات</h3>
                <button onClick={() => setShowExportModal(false)} className="text-gray-400 hover:text-white cursor-pointer">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="space-y-2">
                <button
                  onClick={() => handleExportData('تقارير الإيرادات')}
                  className="w-full p-3 rounded-2xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/5 text-left text-xs font-bold text-white flex items-center justify-between cursor-pointer"
                >
                  <span>EGP Revenue & Financial Stats</span>
                  <Download className="w-4 h-4 text-purple-400" />
                </button>
                <button
                  onClick={() => handleExportData('سجل الحضور')}
                  className="w-full p-3 rounded-2xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/5 text-left text-xs font-bold text-white flex items-center justify-between cursor-pointer"
                >
                  <span>Attendance Heatmap Log</span>
                  <Download className="w-4 h-4 text-emerald-400" />
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Help Modal */}
      <AnimatePresence>
        {showHelpModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[#161329] border border-purple-500/30 rounded-3xl p-6 w-full max-w-md space-y-4 shadow-2xl relative"
            >
              <div className="flex items-center justify-between border-b border-white/5 pb-3">
                <h3 className="text-base font-bold text-white">إرشادات الشاشة</h3>
                <button onClick={() => setShowHelpModal(false)} className="text-gray-400 hover:text-white cursor-pointer">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="space-y-2 text-xs text-gray-300 leading-relaxed">
                <p>• <strong>الفلترة الزمنية:</strong> أزرار (1m, 3m, 7m, 1y) تقوم بتعديل وإعادة حساب الأرقام تلقائياً.</p>
                <p>• <strong>الرسوم البيانية:</strong> تحرك بالماوس فوق النقاط لرؤية تفاصيل الشهر أو المادة الدراسية.</p>
                <p>• <strong>الخريطة الحرارية:</strong> اضغط على أي مربع لمعاينة تفاصيل حضور المجموعة.</p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}