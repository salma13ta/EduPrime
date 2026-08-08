"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FiShield, FiUsers, FiLock, FiUnlock, FiAlertTriangle, 
  FiMapPin, FiClock, FiRadio, FiX, FiCheckCircle, FiUser, FiEdit3, FiSave, FiActivity,
  FiDollarSign, FiTrendingUp, FiBarChart2, FiPieChart, FiCheck, FiArrowUpRight, FiLayers
} from "react-icons/fi";

const initialSessions = [
  { 
    id: 1, 
    title: "3rd Secondary - Calculus", 
    teacher: "Dr. Ahmed", 
    room: "Hall A", 
    time: "02:00 PM", 
    crowd: 85, 
    capacity: 200,
    locked: false, 
    alerts: 0,
    notes: "Heavy student flow at main entrance. Ensure QR code verification.",
    sessionFee: 50,
    paidStudentsCount: 170,
    qrVerifiedCount: 165,
    weeklyTrend: [120, 140, 150, 165, 170]
  },
  { 
    id: 2, 
    title: "2nd Secondary - Physics", 
    teacher: "Ms. Sara", 
    room: "Hall B", 
    time: "04:00 PM", 
    crowd: 40, 
    capacity: 150,
    locked: true, 
    alerts: 0,
    notes: "Waiting for teacher arrival to prep the lab.",
    sessionFee: 40,
    paidStudentsCount: 60,
    qrVerifiedCount: 58,
    weeklyTrend: [45, 50, 52, 55, 60]
  },
  { 
    id: 3, 
    title: "1st Secondary - Chemistry", 
    teacher: "Dr. Michael", 
    room: "Hall C", 
    time: "06:00 PM", 
    crowd: 95, 
    capacity: 120,
    locked: false, 
    alerts: 1,
    notes: "High density alert near corridor. Security dispatch required.",
    sessionFee: 45,
    paidStudentsCount: 114,
    qrVerifiedCount: 110,
    weeklyTrend: [90, 98, 105, 110, 114]
  },
];

export default function AdvancedVisualDashboard() {
  const [sessions, setSessions] = useState(initialSessions);
  const [activeSession, setActiveSession] = useState<any>(null);
  
  const [isEditingNotes, setIsEditingNotes] = useState(false);
  const [tempNotes, setTempNotes] = useState("");

  const [isVerifyingQR, setIsVerifyingQR] = useState(false);
  const [verificationMessage, setVerificationMessage] = useState("");
  const [activeMainTab, setActiveMainTab] = useState<"operations" | "analytics">("operations");

  const handleOpenDrawer = (session: any) => {
    setActiveSession(session);
    setTempNotes(session.notes);
    setIsEditingNotes(false);
    setVerificationMessage("");
  };

  const handleSaveNotes = () => {
    setSessions(prev => prev.map(s => s.id === activeSession.id ? { ...s, notes: tempNotes } : s));
    setActiveSession({ ...activeSession, notes: tempNotes });
    setIsEditingNotes(false);
  };

  const toggleLock = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setSessions(prev => prev.map(s => s.id === id ? { ...s, locked: !s.locked } : s));
    if (activeSession && activeSession.id === id) {
      setActiveSession((prev: any) => ({ ...prev, locked: !prev.locked }));
    }
  };

  const triggerAlert = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setSessions(prev => prev.map(s => s.id === id ? { ...s, alerts: s.alerts + 1 } : s));
    if (activeSession && activeSession.id === id) {
      setActiveSession((prev: any) => ({ ...prev, alerts: prev.alerts + 1 }));
    }
  };

  const handleVerifyStudentQR = () => {
    setIsVerifyingQR(true);
    setTimeout(() => {
      setSessions(prev => prev.map(s => {
        if (s.id === activeSession.id) {
          const updatedVerified = s.qrVerifiedCount + 1;
          const updatedPaid = s.paidStudentsCount + 1;
          const newCrowd = Math.min(100, Math.round((updatedVerified / s.capacity) * 100));
          const updatedTrend = [...s.weeklyTrend];
          updatedTrend[updatedTrend.length - 1] = updatedPaid;
          return {
            ...s,
            qrVerifiedCount: updatedVerified,
            paidStudentsCount: updatedPaid,
            crowd: newCrowd,
            weeklyTrend: updatedTrend
          };
        }
        return s;
      }));

      setActiveSession((prev: any) => {
        const updatedVerified = prev.qrVerifiedCount + 1;
        const newCrowd = Math.min(100, Math.round((updatedVerified / prev.capacity) * 100));
        return {
          ...prev,
          qrVerifiedCount: updatedVerified,
          paidStudentsCount: prev.paidStudentsCount + 1,
          crowd: newCrowd
        };
      });

      setIsVerifyingQR(false);
      setVerificationMessage("Student QR verified & revenue instantly updated!");
      setTimeout(() => setVerificationMessage(""), 3000);
    }, 600);
  };

  const totalCenterRevenue = sessions.reduce((acc, curr) => acc + (curr.paidStudentsCount * curr.sessionFee), 0);
  const totalVerifiedStudents = sessions.reduce((acc, curr) => acc + curr.qrVerifiedCount, 0);

  // حساب أقصى قيمة للرسم البياني لتحديد المقاسات النسبية بدقة
  const maxRevenueGraphValue = Math.max(...sessions.map(s => s.paidStudentsCount * s.sessionFee)) * 1.2;

  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-[#050810] min-h-screen text-white font-sans selection:bg-indigo-500 selection:text-white overflow-x-hidden" dir="ltr">
      
      {/* Header الرئيسي */}
      <motion.div 
        initial={{ opacity: 0, y: -25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="mb-8 bg-[#0d1321] p-6 sm:p-8 rounded-3xl border border-gray-800 shadow-2xl relative overflow-hidden"
      >
        <div className="absolute -left-10 -top-10 w-48 h-48 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="bg-indigo-500/20 text-indigo-400 text-xs px-3 py-1 rounded-full font-bold border border-indigo-500/30 flex items-center gap-1">
                <FiShield /> Center Intelligence Suite
              </span>
              <span className="bg-emerald-500/20 text-emerald-400 text-xs px-3 py-1 rounded-full font-bold border border-emerald-500/30 flex items-center gap-1">
                <FiDollarSign /> Live Financial Sync
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white">
              Visual Security & Revenue Command Center
            </h1>
            <p className="text-gray-400 text-xs sm:text-sm mt-1 max-w-2xl">
              Advanced graphical analytics, crowd density meters, and instant financial transaction tracing for educational centers.
            </p>
          </div>

          <div className="flex bg-[#141d31] p-1.5 rounded-2xl border border-gray-800 w-full sm:w-auto">
            <button
              onClick={() => setActiveMainTab("operations")}
              className={`flex-1 sm:flex-none px-4 py-2.5 rounded-xl text-xs font-bold transition cursor-pointer flex items-center justify-center gap-2 ${
                activeMainTab === "operations" ? "bg-indigo-600 text-white shadow-lg" : "text-gray-400 hover:text-white"
              }`}
            >
              <FiActivity /> Operations Grid
            </button>
            <button
              onClick={() => setActiveMainTab("analytics")}
              className={`flex-1 sm:flex-none px-4 py-2.5 rounded-xl text-xs font-bold transition cursor-pointer flex items-center justify-center gap-2 ${
                activeMainTab === "analytics" ? "bg-indigo-600 text-white shadow-lg" : "text-gray-400 hover:text-white"
              }`}
            >
              <FiBarChart2 /> Visual Analytics & Charts
            </button>
          </div>
        </div>

        {/* المؤشرات العلوية */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6 pt-6 border-t border-gray-800">
          <div className="bg-[#141d31] p-4 rounded-2xl border border-gray-800 flex items-center justify-between">
            <div>
              <p className="text-[11px] text-gray-400 uppercase font-medium">Total Center Revenue</p>
              <h3 className="text-lg font-bold text-emerald-400 font-mono mt-0.5">${totalCenterRevenue.toLocaleString()}</h3>
            </div>
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center border border-emerald-500/20">
              <FiDollarSign className="text-lg" />
            </div>
          </div>

          <div className="bg-[#141d31] p-4 rounded-2xl border border-gray-800 flex items-center justify-between">
            <div>
              <p className="text-[11px] text-gray-400 uppercase font-medium">Verified Attendees</p>
              <h3 className="text-lg font-bold text-indigo-300 font-mono mt-0.5">{totalVerifiedStudents} Students</h3>
            </div>
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center border border-indigo-500/20">
              <FiUsers className="text-lg" />
            </div>
          </div>

          <div className="bg-[#141d31] p-4 rounded-2xl border border-gray-800 flex items-center justify-between sm:col-span-2 lg:col-span-1">
            <div>
              <p className="text-[11px] text-gray-400 uppercase font-medium">Active Security Flags</p>
              <h3 className="text-lg font-bold text-amber-400 font-mono mt-0.5">
                {sessions.reduce((acc, curr) => acc + curr.alerts, 0)} Alerts
              </h3>
            </div>
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center border border-amber-500/20">
              <FiAlertTriangle className="text-lg" />
            </div>
          </div>
        </div>
      </motion.div>

      {/* المحتوى الرئيسي المتغير */}
      <AnimatePresence mode="wait">
        {activeMainTab === "operations" ? (
          <motion.div 
            key="ops-grid"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
          >
            {sessions.map((session, index) => {
              const sessionRevenue = session.paidStudentsCount * session.sessionFee;
              return (
                <motion.div 
                  key={session.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.15, duration: 0.5, ease: "easeOut" }}
                  whileHover={{ y: -6, scale: 1.01, transition: { duration: 0.2 } }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleOpenDrawer(session)}
                  className={`p-6 rounded-3xl border transition-colors ${
                    session.locked ? 'border-red-500/40 bg-[#0d1321]' : 'border-gray-800 bg-[#0d1321]'
                  } shadow-2xl relative overflow-hidden cursor-pointer group`}
                >
                  {session.alerts > 0 && (
                    <motion.div 
                      animate={{ opacity: [0.2, 0.6, 0.2] }} 
                      transition={{ repeat: Infinity, duration: 1.2 }} 
                      className="absolute inset-0 bg-red-500/15 pointer-events-none border-2 border-red-500 rounded-3xl" 
                    />
                  )}

                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <span className="text-[10px] text-indigo-400 font-bold uppercase tracking-wider">{session.room}</span>
                      <h3 className="text-sm font-bold text-white group-hover:text-indigo-300 transition mt-0.5">{session.title}</h3>
                    </div>
                    <span className="text-xs bg-gray-900 text-gray-300 px-2.5 py-1 rounded-xl font-mono flex items-center gap-1 border border-gray-800">
                      <FiClock className="text-indigo-400 text-[10px]" /> {session.time}
                    </span>
                  </div>

                  <div className="space-y-2 mb-4 text-xs text-gray-400 bg-[#141d31] p-3 rounded-2xl border border-gray-800/80">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <FiUser className="text-emerald-400 text-xs" />
                        <span>Teacher: <strong className="text-white">{session.teacher}</strong></span>
                      </div>
                      <span className="text-emerald-400 font-mono font-bold">${sessionRevenue} Rev</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FiMapPin className="text-amber-400 text-xs" />
                      <span>Location: <strong className="text-white">{session.room}</strong> (Fee: ${session.sessionFee})</span>
                    </div>
                  </div>

                  <div className="mb-5">
                    <div className="flex justify-between text-[11px] mb-1.5 font-medium text-gray-400">
                      <span>Crowd & QR Verified ({session.qrVerifiedCount}/{session.capacity})</span> 
                      <span className={session.crowd > 80 ? "text-red-400 font-bold animate-pulse" : "text-white"}>
                        {session.crowd}%
                      </span>
                    </div>
                    <div className="h-2.5 bg-gray-900 rounded-full overflow-hidden p-0.5 border border-gray-800">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${session.crowd}%` }}
                        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                        className={`h-full rounded-full ${session.crowd > 80 ? 'bg-gradient-to-r from-red-600 to-rose-500' : 'bg-gradient-to-r from-indigo-600 to-indigo-400'}`} 
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3" onClick={(e) => e.stopPropagation()}>
                    <motion.button 
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={(e) => toggleLock(session.id, e)}
                      className={`py-2.5 rounded-xl text-[11px] font-bold transition flex items-center justify-center gap-2 cursor-pointer shadow-lg ${
                        session.locked 
                          ? 'bg-red-500/20 text-red-400 border border-red-500/30' 
                          : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                      }`}
                    >
                      {session.locked ? <FiLock className="animate-pulse" /> : <FiUnlock />} 
                      {session.locked ? "Hall Locked" : "Hall Open"}
                    </motion.button>
                    
                    <motion.button 
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={(e) => triggerAlert(session.id, e)}
                      className="bg-amber-500/20 text-amber-400 border border-amber-500/30 py-2.5 rounded-xl text-[11px] font-bold flex items-center justify-center gap-2 hover:bg-amber-500/30 transition cursor-pointer shadow-lg"
                    >
                      <FiAlertTriangle className={session.alerts > 0 ? "animate-bounce" : ""} /> 
                      Alert ({session.alerts})
                    </motion.button>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        ) : (
          /* واجهة الرسوم البيانية البانية الواضحة (Visual Bar Charts & Analytics) */
          <motion.div 
            key="analytics-view"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            {/* قسم الرسم البياني الباني للإيرادات لكل حصة */}
            <div className="bg-[#0d1321] border border-gray-800 p-6 sm:p-8 rounded-3xl shadow-xl">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <FiBarChart2 className="text-indigo-400" /> Revenue Comparison Chart per Hall & Session
                  </h3>
                  <p className="text-xs text-gray-400 mt-0.5">Visual representation of total financial earnings generated per lecture room.</p>
                </div>
                <span className="text-xs bg-[#141d31] text-emerald-400 font-mono font-bold px-3 py-1.5 rounded-xl border border-gray-800">
                  Live Bar Graph
                </span>
              </div>

              {/* تصميم الرسم البياني الباني (Bar Chart) بوضوح تام */}
              <div className="space-y-4 pt-4 border-t border-gray-800/80">
                {sessions.map((session) => {
                  const currentRevenue = session.paidStudentsCount * session.sessionFee;
                  const barPercentage = Math.min(100, (currentRevenue / maxRevenueGraphValue) * 100);
                  return (
                    <div key={session.id} className="bg-[#141d31] p-4 rounded-2xl border border-gray-800 space-y-2">
                      <div className="flex justify-between items-center text-xs">
                        <div className="flex items-center gap-2">
                          <span className="w-2.5 h-2.5 rounded-full bg-indigo-500"></span>
                          <span className="font-bold text-white">{session.title} ({session.room})</span>
                        </div>
                        <span className="font-mono font-bold text-emerald-400 text-sm">${currentRevenue.toLocaleString()}</span>
                      </div>

                      {/* العمود الباني للرسم */}
                      <div className="h-4 bg-gray-900 rounded-full overflow-hidden p-0.5 border border-gray-800 flex items-center">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${barPercentage}%` }}
                          transition={{ duration: 1, ease: "easeOut" }}
                          className="h-full rounded-full bg-gradient-to-r from-indigo-600 via-indigo-400 to-emerald-400 shadow-lg"
                        />
                      </div>

                      <div className="flex justify-between text-[11px] text-gray-400">
                        <span>Teacher: {session.teacher}</span>
                        <span>{session.paidStudentsCount} Paid Students (${session.sessionFee} each)</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* قسم إضافي يوضح الكثافة الطلابية كرسم باني أفقي */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-[#0d1321] border border-gray-800 p-6 rounded-3xl shadow-xl">
                <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
                  <FiLayers className="text-indigo-400" /> Hall Crowd Density Metrics
                </h3>
                <div className="space-y-4">
                  {sessions.map((s) => (
                    <div key={s.id} className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-300 font-bold">{s.room} - {s.title}</span>
                        <span className="font-mono text-indigo-300">{s.crowd}% Density</span>
                      </div>
                      <div className="h-2 bg-gray-900 rounded-full overflow-hidden border border-gray-800">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${s.crowd}%` }}
                          transition={{ duration: 0.8 }}
                          className={`h-full rounded-full ${s.crowd > 80 ? 'bg-red-500' : 'bg-indigo-500'}`}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-[#0d1321] border border-gray-800 p-6 rounded-3xl shadow-xl flex flex-col justify-between">
                <div>
                  <h3 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
                    <FiTrendingUp className="text-emerald-400" /> Financial Distribution Overview
                  </h3>
                  <p className="text-xs text-gray-400 mb-4">Breakdown of center revenue allocation across operational sectors.</p>
                </div>
                <div className="space-y-3">
                  <div className="bg-[#141d31] p-3 rounded-xl border border-gray-800 flex justify-between items-center text-xs">
                    <span className="text-gray-300">Teacher Payouts (50%)</span>
                    <span className="font-mono font-bold text-indigo-400">${(totalCenterRevenue * 0.5).toLocaleString()}</span>
                  </div>
                  <div className="bg-[#141d31] p-3 rounded-xl border border-gray-800 flex justify-between items-center text-xs">
                    <span className="text-gray-300">Security & Staff (25%)</span>
                    <span className="font-mono font-bold text-emerald-400">${(totalCenterRevenue * 0.25).toLocaleString()}</span>
                  </div>
                  <div className="bg-[#141d31] p-3 rounded-xl border border-gray-800 flex justify-between items-center text-xs">
                    <span className="text-gray-300">Operations & Utilities (25%)</span>
                    <span className="font-mono font-bold text-amber-400">${(totalCenterRevenue * 0.25).toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Side Detail Drawer */}
      <AnimatePresence>
        {activeSession && (
          <div className="fixed inset-0 z-50 flex justify-end">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 0.7 }} 
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setActiveSession(null)}
              className="absolute inset-0 bg-[#050810]/80 backdrop-blur-md" 
            />

            <motion.div 
              initial={{ x: "100%", opacity: 0.5 }} 
              animate={{ x: 0, opacity: 1 }} 
              exit={{ x: "100%", opacity: 0 }}
              transition={{ type: "spring", damping: 30, stiffness: 280 }}
              className="relative w-full sm:w-[480px] bg-[#0d1321] border-l border-gray-800 p-6 sm:p-8 shadow-[-10px_0_40px_rgba(0,0,0,0.8)] z-10 flex flex-col justify-between overflow-y-auto"
            >
              <div>
                <div className="flex justify-between items-center pb-4 mb-6 border-b border-gray-800">
                  <div>
                    <span className="text-[10px] text-indigo-400 uppercase tracking-widest font-bold flex items-center gap-1.5">
                      <FiActivity className="animate-spin text-xs" /> Security & Revenue Log
                    </span>
                    <h2 className="font-bold text-base text-white mt-1">{activeSession.title}</h2>
                  </div>
                  <motion.button 
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setActiveSession(null)}
                    className="text-gray-400 hover:text-white p-2 rounded-xl bg-[#141d31] border border-gray-800 cursor-pointer shadow-md"
                  >
                    <FiX className="text-base" />
                  </motion.button>
                </div>
                
                <div className="space-y-4 text-xs">
                  <div className="bg-[#141d31] p-4 rounded-2xl border border-gray-800 space-y-3 shadow-inner">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Assigned Teacher:</span>
                      <span className="font-bold text-white">{activeSession.teacher}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Location Hall:</span>
                      <span className="font-bold text-indigo-300">{activeSession.room}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Schedule Time:</span>
                      <span className="font-bold text-amber-400">{activeSession.time}</span>
                    </div>
                    <div className="flex justify-between items-center border-t border-gray-800 pt-2">
                      <span className="text-gray-400">Session Revenue Generated:</span>
                      <span className="font-bold text-emerald-400 font-mono text-sm">
                        ${activeSession.paidStudentsCount * activeSession.sessionFee} (${activeSession.sessionFee}/student)
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">QR Verified Attendees:</span>
                      <span className="font-bold text-indigo-300 font-mono">
                        {activeSession.qrVerifiedCount} / {activeSession.capacity}
                      </span>
                    </div>
                  </div>

                  {verificationMessage && (
                    <motion.div 
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-emerald-500/20 border border-emerald-500/30 p-3 rounded-xl text-emerald-300 text-center font-bold flex items-center justify-center gap-2"
                    >
                      <FiCheckCircle /> {verificationMessage}
                    </motion.div>
                  )}

                  <motion.div layout className="bg-amber-500/10 border border-amber-500/20 p-4 rounded-2xl text-amber-300 shadow-lg">
                    <div className="flex justify-between items-center mb-2">
                      <p className="font-bold flex items-center gap-1.5">
                        <FiAlertTriangle className="text-amber-400 animate-pulse" /> Security Field Notes:
                      </p>
                      {!isEditingNotes ? (
                        <motion.button 
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setIsEditingNotes(true)}
                          className="text-[10px] bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 px-2.5 py-1 rounded-lg flex items-center gap-1 transition cursor-pointer font-bold"
                        >
                          <FiEdit3 /> Edit Notes
                        </motion.button>
                      ) : (
                        <motion.button 
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={handleSaveNotes}
                          className="text-[10px] bg-emerald-500/20 hover:bg-emerald-500/35 text-emerald-300 px-2.5 py-1 rounded-lg flex items-center gap-1 transition cursor-pointer font-bold"
                        >
                          <FiSave /> Save
                        </motion.button>
                      )}
                    </div>

                    <AnimatePresence mode="wait">
                      {!isEditingNotes ? (
                        <motion.p 
                          key="view-notes"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="text-[11px] text-amber-200/90 leading-relaxed mt-1"
                        >
                          {activeSession.notes}
                        </motion.p>
                      ) : (
                        <motion.div key="edit-notes" initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }}>
                          <textarea 
                            value={tempNotes}
                            onChange={(e) => setTempNotes(e.target.value)}
                            className="w-full bg-[#050810] border border-amber-500/40 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-amber-400 mt-1 resize-none h-24 shadow-inner"
                            placeholder="Type new security observations..."
                          />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </div>
              </div>

              <div className="pt-6 border-t border-gray-800 space-y-3">
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleVerifyStudentQR}
                  disabled={isVerifyingQR}
                  className="w-full py-3 bg-[#141d31] hover:bg-gray-800 border border-gray-700/80 rounded-xl text-xs font-bold transition cursor-pointer shadow-lg flex items-center justify-center gap-2 text-indigo-300"
                >
                  <FiCheck className={`text-emerald-400 ${isVerifyingQR ? "animate-spin" : ""}`} />
                  {isVerifyingQR ? "Verifying QR & Collecting Fee..." : "Verify Student QR Entry & Collect Fee"}
                </motion.button>
                
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => alert(`Broadcast sent successfully to Center Security Team for ${activeSession.title}!`)}
                  className="w-full py-3 bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/30 transition cursor-pointer"
                >
                  <FiRadio className="animate-pulse" /> Broadcast to Center Security Team
                </motion.button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}