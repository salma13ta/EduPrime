'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Users, DollarSign, TrendingUp, GraduationCap, Calendar, Star,
  RefreshCw, Download, Plus, Filter, MapPin, ArrowUpRight,
  Building2, CheckCircle2, BarChart3, Search, CreditCard, ArrowRight, X, Edit3, Trash2
} from 'lucide-react';

export default function AdminCenterView() {
  const [activeTab, setActiveTab] = useState('Overview');
  const [hoveredMonth, setHoveredMonth] = useState<string | null>('Feb');

  // Modals & Actions States
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedBranchToManage, setSelectedBranchToManage] = useState<{
    id: number;
    name: string;
    location: string;
    status: string;
    students: number;
    teachers: number;
    revenue: string;
    rating: string;
  } | null>(null);
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncMessage, setSyncMessage] = useState<string | null>(null);

  // --- Data States ---
  const [branches, setBranches] = useState([
    { id: 1, name: 'Nasr City Branch', location: 'Cairo', status: 'ACTIVE', students: 180, teachers: 12, revenue: '48K EGP', rating: '4.8★' },
    { id: 2, name: 'Maadi Branch', location: 'Cairo', status: 'ACTIVE', students: 145, teachers: 9, revenue: '38K EGP', rating: '4.6★' },
    { id: 3, name: 'Alexandria Branch', location: 'Alexandria', status: 'ACTIVE', students: 167, teachers: 11, revenue: '45K EGP', rating: '4.9★' },
  ]);

  const [newBranchData, setNewBranchData] = useState({
    name: '',
    location: '',
    students: '',
    teachers: '',
    revenue: ''
  });

  const stats = [
    { label: 'Total Students', sub: 'Across 3 branches', val: '492', badge: '+8%', icon: Users, iconBg: 'bg-purple-500/10 text-purple-400' },
    { label: 'Total Revenue', sub: 'This month', val: 'EGP 128K', badge: '+18%', icon: DollarSign, iconBg: 'bg-cyan-500/10 text-cyan-400' },
    { label: 'Net Profit', sub: 'After expenses', val: 'EGP 58K', badge: '+12%', icon: TrendingUp, iconBg: 'bg-emerald-500/10 text-emerald-400' },
    { label: 'Active Teachers', sub: '4 on leave', val: '32', badge: '+3%', icon: GraduationCap, iconBg: 'bg-purple-500/10 text-purple-400' },
    { label: 'Bookings', sub: 'This week', val: '147', badge: '+22%', icon: Calendar, iconBg: 'bg-amber-500/10 text-amber-400' },
    { label: 'Avg Rating', sub: 'All branches', val: '4.8★', badge: '+5%', icon: Star, iconBg: 'bg-rose-500/10 text-rose-400' },
  ];

  const alerts = [
    { text: 'New enrollment pending approval', time: '5m ago', color: 'bg-amber-400' },
    { text: 'Maadi branch payment collected', time: '20m ago', color: 'bg-emerald-400' },
    { text: 'Teacher Dr. Lina requested leave', time: '1h ago', color: 'bg-purple-400' },
    { text: 'Monthly report ready for download', time: '2h ago', color: 'bg-cyan-400' },
    { text: 'QR attendance sync completed', time: '3h ago', color: 'bg-emerald-400' },
  ];

  const teachers = [
    { name: 'Dr. Ahmed Hassan', subject: 'Mathematics', students: 67, rating: '4.9★', salary: '8,500 EGP/mo', status: 'Active', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80' },
    { name: 'Ms. Sara Nour', subject: 'Physics', students: 54, rating: '4.7★', salary: '7,200 EGP/mo', status: 'Active', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80' },
    { name: 'Mr. Karim Sayed', subject: 'Chemistry', students: 48, rating: '4.8★', salary: '7,800 EGP/mo', status: 'Active', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80' },
    { name: 'Dr. Lina Farouk', subject: 'Biology', students: 61, rating: '4.6★', salary: '8,000 EGP/mo', status: 'On Leave', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80' },
  ];

  const transactions = [
    { name: 'Omar Khalil', date: 'Jul 23', method: 'Visa', amount: '1,200 EGP', status: 'PAID' },
    { name: 'Nour Ahmed', date: 'Jul 23', method: 'Wallet', amount: '950 EGP', status: 'PAID' },
    { name: 'Yasmin Said', date: 'Jul 22', method: 'Cash', amount: '1,450 EGP', status: 'PAID' },
    { name: 'Hassan Ali', date: 'Jul 22', method: 'Visa', amount: '850 EGP', status: 'PENDING' },
    { name: 'Rania Omar', date: 'Jul 21', method: 'Wallet', amount: '1,100 EGP', status: 'OVERDUE' },
  ];

  const reports = [
    { title: 'Monthly Revenue Report', desc: 'Detailed breakdown by branch, teacher, and subject', date: 'Jul 2025', icon: BarChart3, iconBg: 'bg-emerald-500/10 text-emerald-400' },
    { title: 'Student Attendance Report', desc: 'QR attendance logs with daily and weekly summaries', date: 'Jul 2025', icon: CheckCircle2, iconBg: 'bg-emerald-500/10 text-emerald-400' },
    { title: 'Teacher Performance Report', desc: 'Ratings, student feedback, and class completion rates', date: 'Jul 2025', icon: Star, iconBg: 'bg-amber-500/10 text-amber-400' },
    { title: 'Expense Analysis Report', desc: 'Cost breakdown by branch, salary, and operations', date: 'Jul 2025', icon: DollarSign, iconBg: 'bg-rose-500/10 text-rose-400' },
    { title: 'Enrollment Trends Report', desc: 'New student registration trends and dropout analysis', date: 'Jul 2025', icon: TrendingUp, iconBg: 'bg-cyan-500/10 text-cyan-400' },
    { title: 'Booking & Schedule Report', desc: 'Class utilization, peak hours, and capacity analysis', date: 'Jun 2025', icon: Calendar, iconBg: 'bg-purple-500/10 text-purple-400' },
  ];

  // Dynamic Button Title matching the active tab
  const getButtonTitle = () => {
    switch (activeTab) {
      case 'Branches': return '+ Add Branch';
      case 'Teachers': return '+ Add Teacher';
      case 'Payments': return '+ Add Transaction';
      case 'Reports': return ' Create Report';
      default: return '+ Add Branch';
    }
  };

  // --- Action Handlers ---

  // 1. Sync QR Functionality
  const handleSyncQR = () => {
    setIsSyncing(true);
    setSyncMessage(null);
    setTimeout(() => {
      setIsSyncing(false);
      setSyncMessage('QR Attendance Synced Successfully!');
      setTimeout(() => setSyncMessage(null), 3000);
    }, 1500);
  };

  // 2. Export CSV Functionality
  const handleExportCSV = () => {
    const csvHeader = "Branch Name,Location,Status,Students,Teachers,Revenue,Rating\n";
    const csvRows = branches.map(b => `"${b.name}","${b.location}","${b.status}",${b.students},${b.teachers},"${b.revenue}","${b.rating}"`).join("\n");
    const blob = new Blob([csvHeader + csvRows], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `EduPlex_Branches_Report_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  // 3. Add Branch Submit Handler
  const handleCreateBranch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBranchData.name || !newBranchData.location) return;

    const newBranch = {
      id: Date.now(),
      name: newBranchData.name,
      location: newBranchData.location,
      status: 'ACTIVE',
      students: Number(newBranchData.students) || 0,
      teachers: Number(newBranchData.teachers) || 0,
      revenue: newBranchData.revenue ? `${newBranchData.revenue}K EGP` : '0K EGP',
      rating: '5.0★'
    };

    setBranches([...branches, newBranch]);
    setNewBranchData({ name: '', location: '', students: '', teachers: '', revenue: '' });
    setIsAddModalOpen(false);
  };

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto p-3 sm:p-6 font-sans text-white relative selection:bg-purple-500 selection:text-white bg-[#0a0814] min-h-screen">

      {/* Toast Notification for Sync */}
      <AnimatePresence>
        {syncMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-5 right-5 z-50 bg-emerald-500/90 text-white px-4 py-2.5 rounded-xl shadow-lg border border-emerald-400 flex items-center gap-2 text-xs font-bold backdrop-blur-md"
          >
            <CheckCircle2 className="w-4 h-4" />
            {syncMessage}
          </motion.div>
        )}
      </AnimatePresence>

      {/* 1. Header Section */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-white/5 pb-5">
        <div>
          <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-gray-400">
            Learning Center Administration
          </span>
          <h1 className="text-xl sm:text-3xl font-extrabold text-white mt-0.5">EduPlex Admin Center</h1>
          <p className="text-xs text-gray-400 mt-1">
            {branches.length} branches • 492 students • <span className="text-gray-300">Last synced 2 minutes ago</span>
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          {/* Sync QR Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleSyncQR}
            disabled={isSyncing}
            className="px-3.5 py-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-xs font-medium text-gray-300 flex items-center gap-2 transition-all cursor-pointer disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-purple-400 ${isSyncing ? 'animate-spin' : ''}`} />
            <span className="hidden sm:inline">{isSyncing ? 'Syncing...' : 'Sync QR'}</span>
          </motion.button>

          {/* Export Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleExportCSV}
            className="px-3.5 py-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-xs font-medium text-gray-300 flex items-center gap-2 transition-all cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-purple-400" />
            <span className="hidden sm:inline">Export</span>
          </motion.button>

          {/* Add Action Button */}
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setIsAddModalOpen(true)}
            className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-xs font-bold text-white flex items-center gap-2 shadow-lg shadow-purple-600/30 transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            {getButtonTitle()}
          </motion.button>
        </div>
      </div>

      {/* 2. Top Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-3 sm:gap-4">
        {stats.map((st, i) => {
          const Icon = st.icon;
          return (
            <motion.div
              key={i}
              whileHover={{ y: -3 }}
              className="p-3.5 sm:p-4 rounded-2xl bg-[#110f22] border border-white/5 space-y-3 relative overflow-hidden group shadow-md"
            >
              <div className="flex items-center justify-between">
                <div className={`p-2 sm:p-2.5 rounded-xl ${st.iconBg}`}>
                  <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <span className="text-[10px] sm:text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-lg border border-emerald-500/20 flex items-center gap-0.5">
                  <ArrowUpRight className="w-3 h-3" /> {st.badge}
                </span>
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-black text-white tracking-tight">{st.val}</h3>
                <p className="text-xs font-bold text-gray-200 mt-0.5">{st.label}</p>
                <p className="text-[10px] text-gray-400">{st.sub}</p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* 3. Navigation Tabs Bar */}
      <div className="flex items-center gap-1 sm:gap-2 p-1 bg-white/[0.02] border border-white/5 rounded-2xl w-fit overflow-x-auto max-w-full">
        {['Overview', 'Branches', 'Teachers', 'Payments', 'Reports'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`relative px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${activeTab === tab ? 'text-white' : 'text-gray-400 hover:text-white'
              }`}
          >
            {activeTab === tab && (
              <motion.div
                layoutId="activeTabBadge"
                className="absolute inset-0 bg-purple-600/30 border border-purple-500/30 rounded-xl"
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              />
            )}
            <span className="relative z-10">{tab}</span>
          </button>
        ))}
      </div>

      {/* 4. Tab Contents with Framer Motion */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.25 }}
          className="space-y-6"
        >
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'Overview' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Financial Overview Large Chart */}
                <div className="lg:col-span-2 p-4 sm:p-6 rounded-3xl bg-[#110f22] border border-white/5 space-y-4 flex flex-col justify-between">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <h2 className="text-sm sm:text-base font-bold text-white">Financial Overview</h2>
                      <p className="text-xs text-gray-400">Revenue, expenses & net profit</p>
                    </div>
                    <div className="flex items-center gap-4 text-[11px] text-gray-400">
                      <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-purple-500"></span> Revenue</span>
                      <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-rose-400"></span> Expenses</span>
                      <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span> Profit</span>
                    </div>
                  </div>

                  <div className="relative h-56 sm:h-64 w-full pt-4">
                    {hoveredMonth === 'Feb' && (
                      <div className="absolute top-2 left-[15%] sm:left-[18%] bg-[#18152e] border border-purple-500/40 p-2.5 rounded-xl shadow-xl text-[11px] space-y-1 z-10 pointer-events-none">
                        <p className="font-bold text-purple-300">Feb</p>
                        <p className="text-purple-400 font-semibold">Revenue: 92,000 EGP</p>
                        <p className="text-rose-400 font-semibold">Expenses: 55,000 EGP</p>
                        <p className="text-emerald-400 font-semibold">Profit: 37,000 EGP</p>
                      </div>
                    )}

                    <svg className="w-full h-full overflow-visible" viewBox="0 0 500 150" preserveAspectRatio="none">
                      <defs>
                        <linearGradient id="gradRevenue" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#a855f7" stopOpacity="0.25" />
                          <stop offset="100%" stopColor="#a855f7" stopOpacity="0" />
                        </linearGradient>
                      </defs>

                      <path d="M 0,80 Q 100,95 200,60 T 400,30 T 500,35 L 500,150 L 0,150 Z" fill="url(#gradRevenue)" />

                      <motion.path
                        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1 }}
                        d="M 0,80 Q 100,95 200,60 T 400,30 T 500,35" fill="none" stroke="#a855f7" strokeWidth="3"
                      />
                      <motion.path
                        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1, delay: 0.2 }}
                        d="M 0,110 Q 100,115 200,95 T 400,85 T 500,88" fill="none" stroke="#fb7185" strokeWidth="2"
                      />
                      <motion.path
                        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1, delay: 0.4 }}
                        d="M 0,125 Q 100,130 200,110 T 400,98 T 500,102" fill="none" stroke="#34d399" strokeWidth="2"
                      />

                      <circle cx="100" cy="88" r="4" fill="#ffffff" stroke="#a855f7" strokeWidth="2" />
                      <circle cx="100" cy="113" r="4" fill="#ffffff" stroke="#fb7185" strokeWidth="2" />
                      <line x1="100" y1="20" x2="100" y2="140" stroke="#ffffff" strokeWidth="1" strokeDasharray="3 3" opacity="0.2" />
                    </svg>

                    <div className="flex justify-between text-[10px] sm:text-xs text-gray-500 font-medium mt-2 px-1">
                      {['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'].map((m) => (
                        <span key={m} className={`cursor-pointer ${hoveredMonth === m ? 'text-purple-400 font-bold' : ''}`} onMouseEnter={() => setHoveredMonth(m)}>
                          {m}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Growth & Alerts */}
                <div className="space-y-6 flex flex-col justify-between">
                  <div className="p-4 sm:p-5 rounded-3xl bg-[#110f22] border border-white/5 space-y-2">
                    <h3 className="text-xs sm:text-sm font-bold text-white">Student Growth</h3>
                    <p className="text-[10px] text-gray-400">Total enrollment trend</p>
                    <div className="h-20 w-full pt-2">
                      <svg className="w-full h-full" viewBox="0 0 200 50" preserveAspectRatio="none">
                        <path d="M 0,40 Q 50,38 100,35 T 200,15" fill="none" stroke="#06b6d4" strokeWidth="2.5" />
                      </svg>
                    </div>
                  </div>

                  <div className="p-4 sm:p-5 rounded-3xl bg-[#110f22] border border-white/5 space-y-3 flex-1">
                    <div className="flex justify-between items-center border-b border-white/5 pb-2.5">
                      <h3 className="text-xs sm:text-sm font-bold text-white">Alerts</h3>
                      <span className="text-[10px] font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30 px-2 py-0.5 rounded-full">
                        5 new
                      </span>
                    </div>

                    <div className="space-y-2.5 max-h-48 overflow-y-auto pr-1">
                      {alerts.map((al, idx) => (
                        <div key={idx} className="flex items-start gap-2.5 text-xs">
                          <span className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${al.color}`} />
                          <div className="flex-1">
                            <p className="text-gray-200 text-[11px] leading-tight">{al.text}</p>
                            <span className="text-[9px] text-gray-500">{al.time}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

              </div>

              {/* Branch Performance Grid */}
              <div className="p-4 sm:p-6 rounded-3xl bg-[#110f22] border border-white/5 space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-sm sm:text-base font-bold text-white">Branch Performance</h2>
                    <p className="text-xs text-gray-400">Live operational overview per location</p>
                  </div>
                  <button className="px-3 py-1.5 rounded-xl bg-white/[0.04] border border-white/10 text-xs font-semibold text-gray-300 flex items-center gap-1.5 hover:bg-white/[0.08] transition-all cursor-pointer">
                    <Filter className="w-3.5 h-3.5" /> Filter
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                  {branches.map((br) => (
                    <div key={br.id} className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-purple-500/30 transition-all space-y-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-xs sm:text-sm font-bold text-white">{br.name}</h3>
                          <p className="text-[10px] text-gray-400 flex items-center gap-1 mt-0.5">
                            <MapPin className="w-3 h-3 text-gray-500" /> {br.location}
                          </p>
                        </div>
                        <span className="px-2 py-0.5 rounded-md text-[9px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                          {br.status}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-2 pt-1">
                        <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/5">
                          <p className="text-sm font-black text-white">{br.students}</p>
                          <p className="text-[10px] text-gray-400">Students</p>
                        </div>
                        <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/5">
                          <p className="text-sm font-black text-cyan-400">{br.teachers}</p>
                          <p className="text-[10px] text-gray-400">Teachers</p>
                        </div>
                        <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/5">
                          <p className="text-sm font-black text-emerald-400">{br.revenue}</p>
                          <p className="text-[10px] text-gray-400">Revenue</p>
                        </div>
                        <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/5">
                          <p className="text-sm font-black text-amber-400">{br.rating}</p>
                          <p className="text-[10px] text-gray-400">Rating</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: BRANCHES */}
          {activeTab === 'Branches' && (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
              {branches.map((br) => (
                <motion.div
                  key={br.id}
                  whileHover={{ y: -3 }}
                  className="rounded-3xl bg-[#110f22] border border-white/5 overflow-hidden flex flex-col justify-between shadow-lg"
                >
                  <div className="h-32 bg-gradient-to-br from-purple-900/30 via-indigo-900/10 to-transparent p-4 relative flex items-center justify-between border-b border-white/5">
                    <Building2 className="w-12 h-12 text-purple-400/40" />
                    <span className="px-2.5 py-1 rounded-lg text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      {br.status}
                    </span>
                  </div>

                  <div className="p-5 space-y-4">
                    <div>
                      <h3 className="text-base font-bold text-white">{br.name}</h3>
                      <p className="text-xs text-gray-400 flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3.5 h-3.5 text-gray-500" /> {br.location}
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-2.5">
                      <div className="p-3 rounded-2xl bg-white/[0.02] border border-white/5">
                        <p className="text-base font-black text-white">{br.students}</p>
                        <p className="text-[11px] text-gray-400">Students</p>
                      </div>
                      <div className="p-3 rounded-2xl bg-white/[0.02] border border-white/5">
                        <p className="text-base font-black text-cyan-400">{br.teachers}</p>
                        <p className="text-[11px] text-gray-400">Teachers</p>
                      </div>
                      <div className="p-3 rounded-2xl bg-white/[0.02] border border-white/5">
                        <p className="text-base font-black text-emerald-400">{br.revenue}</p>
                        <p className="text-[11px] text-gray-400">Revenue</p>
                      </div>
                      <div className="p-3 rounded-2xl bg-white/[0.02] border border-white/5">
                        <p className="text-base font-black text-amber-400">{br.rating}</p>
                        <p className="text-[11px] text-gray-400">Rating</p>
                      </div>
                    </div>

                    <button
                      onClick={() => setSelectedBranchToManage(br)}
                      className="w-full py-2.5 rounded-xl bg-purple-600/20 hover:bg-purple-600/30 border border-purple-500/30 text-purple-300 text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      Manage Branch <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {/* TAB 3: TEACHERS */}
          {activeTab === 'Teachers' && (
            <div className="p-5 sm:p-6 rounded-3xl bg-[#110f22] border border-white/5 space-y-5">
              <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3">
                <h2 className="text-base font-bold text-white">Teaching Staff</h2>
                <div className="relative">
                  <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    placeholder="Search teacher..."
                    className="bg-white/[0.04] border border-white/10 rounded-xl pl-9 pr-3 py-1.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {teachers.map((tc, idx) => (
                  <motion.div key={idx} whileHover={{ y: -2 }} className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3.5">
                      <img src={tc.avatar} alt={tc.name} className="w-12 h-12 rounded-2xl object-cover border border-purple-500/20" />
                      <div>
                        <h3 className="text-sm font-bold text-white">{tc.name}</h3>
                        <p className="text-xs text-purple-400 font-medium">{tc.subject}</p>
                        <div className="flex items-center gap-3 text-[11px] text-gray-400 mt-1">
                          <span><strong>{tc.students}</strong> Students</span>
                          <span><strong>{tc.rating}</strong> Rating</span>
                          <span className="text-emerald-400 font-semibold">{tc.salary}</span>
                        </div>
                      </div>
                    </div>
                    <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold whitespace-nowrap ${tc.status === 'Active' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                      }`}>
                      {tc.status}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: PAYMENTS */}
          {activeTab === 'Payments' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

              <div className="lg:col-span-2 p-5 sm:p-6 rounded-3xl bg-[#110f22] border border-white/5 space-y-4">
                <h2 className="text-base font-bold text-white">Recent Transactions</h2>
                <div className="space-y-2.5">
                  {transactions.map((tr, idx) => (
                    <motion.div key={idx} whileHover={{ x: 2 }} className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/5 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-3">
                        <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-400">
                          <CreditCard className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="font-bold text-white">{tr.name}</p>
                          <p className="text-[10px] text-gray-400">{tr.date} • {tr.method}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-extrabold text-white">{tr.amount}</p>
                        <span className={`text-[9px] font-bold tracking-wider ${tr.status === 'PAID' ? 'text-emerald-400' : tr.status === 'PENDING' ? 'text-amber-400' : 'text-rose-400'
                          }`}>
                          {tr.status}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <div className="p-5 rounded-3xl bg-[#110f22] border border-white/5 space-y-3">
                  <div>
                    <p className="text-xs text-gray-400">Collected Today</p>
                    <h3 className="text-2xl font-black text-emerald-400">18,500 EGP</h3>
                  </div>
                  <div className="pt-2 border-t border-white/5">
                    <p className="text-xs text-gray-400">Pending</p>
                    <h4 className="text-lg font-bold text-amber-400">4,200 EGP</h4>
                  </div>
                  <div className="pt-2 border-t border-white/5">
                    <p className="text-xs text-gray-400">Overdue</p>
                    <h4 className="text-lg font-bold text-rose-400">2,100 EGP</h4>
                  </div>
                </div>

                <div className="p-5 rounded-3xl bg-[#110f22] border border-white/5 space-y-4">
                  <h3 className="text-sm font-bold text-white">Payment Methods</h3>

                  <div className="space-y-3 text-xs">
                    <div>
                      <div className="flex justify-between text-gray-300 mb-1">
                        <span>Visa</span>
                        <span className="font-bold">45%</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-white/5 overflow-hidden">
                        <motion.div initial={{ width: 0 }} animate={{ width: '45%' }} transition={{ duration: 0.8 }} className="h-full bg-purple-500" />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-gray-300 mb-1">
                        <span>Wallet</span>
                        <span className="font-bold">32%</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-white/5 overflow-hidden">
                        <motion.div initial={{ width: 0 }} animate={{ width: '32%' }} transition={{ duration: 0.8 }} className="h-full bg-cyan-400" />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-gray-300 mb-1">
                        <span>Cash</span>
                        <span className="font-bold">23%</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-white/5 overflow-hidden">
                        <motion.div initial={{ width: 0 }} animate={{ width: '23%' }} transition={{ duration: 0.8 }} className="h-full bg-emerald-400" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* TAB 5: REPORTS */}
          {activeTab === 'Reports' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {reports.map((rp, idx) => {
                const Icon = rp.icon;
                return (
                  <motion.div key={idx} whileHover={{ y: -2 }} className="p-5 rounded-3xl bg-[#110f22] border border-white/5 flex items-start justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <div className={`p-3 rounded-2xl ${rp.iconBg}`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <div className="space-y-1">
                        <h3 className="text-sm font-bold text-white">{rp.title}</h3>
                        <p className="text-xs text-gray-400">{rp.desc}</p>
                        <span className="text-[10px] text-gray-500 inline-block pt-1">{rp.date}</span>
                      </div>
                    </div>
                    <button
                      onClick={handleExportCSV}
                      className="p-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-gray-300 border border-white/10 transition-all cursor-pointer"
                    >
                      <Download className="w-4 h-4" />
                    </button>
                  </motion.div>
                );
              })}
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* MODAL 1: ADD BRANCH / ACTION */}
      <AnimatePresence>
        {isAddModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[#141126] border border-purple-500/20 rounded-3xl p-6 w-full max-w-md space-y-5 shadow-2xl relative"
            >
              <div className="flex items-center justify-between border-b border-white/5 pb-3">
                <h3 className="text-base font-bold text-white">{getButtonTitle()}</h3>
                <button onClick={() => setIsAddModalOpen(false)} className="text-gray-400 hover:text-white">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleCreateBranch} className="space-y-4">
                <div>
                  <label className="text-xs text-gray-400 mb-1 block">Branch Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Heliopolis Branch"
                    value={newBranchData.name}
                    onChange={(e) => setNewBranchData({ ...newBranchData, name: e.target.value })}
                    className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
                  />
                </div>

                <div>
                  <label className="text-xs text-gray-400 mb-1 block">Location / City</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Cairo"
                    value={newBranchData.location}
                    onChange={(e) => setNewBranchData({ ...newBranchData, location: e.target.value })}
                    className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs text-gray-400 mb-1 block">Initial Students</label>
                    <input
                      type="number"
                      placeholder="0"
                      value={newBranchData.students}
                      onChange={(e) => setNewBranchData({ ...newBranchData, students: e.target.value })}
                      className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-400 mb-1 block">Initial Teachers</label>
                    <input
                      type="number"
                      placeholder="0"
                      value={newBranchData.teachers}
                      onChange={(e) => setNewBranchData({ ...newBranchData, teachers: e.target.value })}
                      className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs text-gray-400 mb-1 block">Monthly Revenue (EGP in K)</label>
                  <input
                    type="text"
                    placeholder="e.g. 35"
                    value={newBranchData.revenue}
                    onChange={(e) => setNewBranchData({ ...newBranchData, revenue: e.target.value })}
                    className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
                  />
                </div>

                <div className="flex gap-3 pt-3">
                  <button
                    type="button"
                    onClick={() => setIsAddModalOpen(false)}
                    className="flex-1 py-2 rounded-xl bg-white/[0.04] text-xs font-semibold text-gray-400 hover:bg-white/[0.08]"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2 rounded-xl bg-purple-600 text-xs font-bold text-white hover:bg-purple-500 shadow-md shadow-purple-600/30"
                  >
                    Save Branch
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* MODAL 2: MANAGE BRANCH */}
      <AnimatePresence>
        {selectedBranchToManage && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[#141126] border border-purple-500/20 rounded-3xl p-6 w-full max-w-lg space-y-5 shadow-2xl relative"
            >
              <div className="flex items-center justify-between border-b border-white/5 pb-3">
                <div className="flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-purple-400" />
                  <h3 className="text-base font-bold text-white">{selectedBranchToManage.name}</h3>
                </div>
                <button onClick={() => setSelectedBranchToManage(null)} className="text-gray-400 hover:text-white">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4 text-xs">
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 bg-white/[0.02] border border-white/5 rounded-xl">
                    <p className="text-gray-400">Location</p>
                    <p className="font-bold text-white mt-0.5">{selectedBranchToManage.location}</p>
                  </div>
                  <div className="p-3 bg-white/[0.02] border border-white/5 rounded-xl">
                    <p className="text-gray-400">Status</p>
                    <p className="font-bold text-emerald-400 mt-0.5">{selectedBranchToManage.status}</p>
                  </div>
                  <div className="p-3 bg-white/[0.02] border border-white/5 rounded-xl">
                    <p className="text-gray-400">Active Students</p>
                    <p className="font-bold text-white mt-0.5">{selectedBranchToManage.students}</p>
                  </div>
                  <div className="p-3 bg-white/[0.02] border border-white/5 rounded-xl">
                    <p className="text-gray-400">Assigned Teachers</p>
                    <p className="font-bold text-cyan-400 mt-0.5">{selectedBranchToManage.teachers}</p>
                  </div>
                </div>

                <div className="p-3 bg-white/[0.02] border border-white/5 rounded-xl flex items-center justify-between">
                  <div>
                    <p className="text-gray-400">Monthly Revenue</p>
                    <p className="font-extrabold text-emerald-400 text-sm mt-0.5">{selectedBranchToManage.revenue}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-right">Rating</p>
                    <p className="font-extrabold text-amber-400 text-sm mt-0.5">{selectedBranchToManage.rating}</p>
                  </div>
                </div>

                <div className="space-y-2 pt-2 border-t border-white/5">
                  <button className="w-full py-2.5 rounded-xl bg-purple-600/20 hover:bg-purple-600/30 text-purple-300 font-bold border border-purple-500/30 flex items-center justify-center gap-2">
                    <Edit3 className="w-3.5 h-3.5" /> Edit Branch Details
                  </button>
                  <button
                    onClick={() => {
                      setBranches(branches.filter(b => b.id !== selectedBranchToManage.id));
                      setSelectedBranchToManage(null);
                    }}
                    className="w-full py-2.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 font-bold border border-rose-500/20 flex items-center justify-center gap-2"
                  >
                    <Trash2 className="w-3.5 h-3.5" /> Delete Branch
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}