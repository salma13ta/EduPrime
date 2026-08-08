"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FiShield, FiUsers, FiLock, FiUnlock, FiAlertTriangle, 
  FiMapPin, FiClock, FiRadio, FiX, FiCheckCircle, FiUser, FiEdit3, FiSave, FiActivity 
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
    notes: "Heavy student flow at main entrance. Ensure QR code verification."
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
    notes: "Waiting for teacher arrival to prep the lab."
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
    notes: "High density alert near corridor. Security dispatch required."
  },
];

export default function AdvancedSecurityDashboard() {
  const [sessions, setSessions] = useState(initialSessions);
  const [activeSession, setActiveSession] = useState<any>(null);
  const [isEditingNotes, setIsEditingNotes] = useState(false);
  const [tempNotes, setTempNotes] = useState("");

  const handleOpenDrawer = (session: any) => {
    setActiveSession(session);
    setTempNotes(session.notes);
    setIsEditingNotes(false);
  };

  const handleSaveNotes = () => {
    setSessions(prev => prev.map(s => s.id === activeSession.id ? { ...s, notes: tempNotes } : s));
    setActiveSession({ ...activeSession, notes: tempNotes });
    setIsEditingNotes(false);
  };

  const toggleLock = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setSessions(prev => prev.map(s => s.id === id ? { ...s, locked: !s.locked } : s));
  };

  const triggerAlert = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setSessions(prev => prev.map(s => s.id === id ? { ...s, alerts: s.alerts + 1 } : s));
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-[#050810] min-h-screen text-white font-sans selection:bg-indigo-500 selection:text-white overflow-x-hidden">
      
      {/* Header مع أنيميشن هبوط سلس وتوهج */}
      <motion.div 
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-[#0d1321] p-6 rounded-3xl border border-gray-800 shadow-2xl relative overflow-hidden"
      >
        <div className="absolute -right-12 -top-12 w-48 h-48 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div>
          <h1 className="text-xl sm:text-2xl font-bold flex items-center gap-3">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            >
              <FiShield className="text-indigo-500 text-2xl" />
            </motion.div>
            Center Security & Operations Center
          </h1>
          <p className="text-gray-400 text-xs mt-1">Real-time scheduling tracking, crowd control, and emergency response</p>
        </div>

        <motion.div 
          animate={{ scale: [1, 1.02, 1] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 px-4 py-2 rounded-2xl text-emerald-400 text-xs font-bold shadow-lg shadow-emerald-500/5"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
          System Online & Secure
        </motion.div>
      </motion.div>

      {/* Main Grid Layout مع Stagger Animation للبطاقات */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {sessions.map((session, index) => (
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
            {/* تأثير إضاءة خلفية عند وجود تنبيهات */}
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
              <div className="flex items-center gap-2">
                <FiUser className="text-emerald-400 text-xs" />
                <span>Teacher: <strong className="text-white">{session.teacher}</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <FiMapPin className="text-amber-400 text-xs" />
                <span>Location: <strong className="text-white">{session.room}</strong></span>
              </div>
            </div>

            {/* Crowd Density Bar مع أنيميشن تعبئة */}
            <div className="mb-5">
              <div className="flex justify-between text-[11px] mb-1.5 font-medium text-gray-400">
                <span>Crowd Density</span> 
                <span className={session.crowd > 80 ? "text-red-400 font-bold animate-pulse" : "text-white"}>
                  {session.crowd}% ({session.capacity} Max)
                </span>
              </div>
              <div className="h-2 bg-gray-900 rounded-full overflow-hidden p-0.5 border border-gray-800">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${session.crowd}%` }}
                  transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                  className={`h-full rounded-full ${session.crowd > 80 ? 'bg-gradient-to-r from-red-600 to-rose-500 shadow-[0_0_8px_#ef4444]' : 'bg-gradient-to-r from-indigo-600 to-indigo-400'}`} 
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
                    ? 'bg-red-500/20 text-red-400 border border-red-500/30 shadow-red-500/5' 
                    : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 shadow-emerald-500/5'
                }`}
              >
                {session.locked ? <FiLock className="animate-pulse" /> : <FiUnlock />} 
                {session.locked ? "Hall Locked" : "Hall Open"}
              </motion.button>
              
              <motion.button 
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.95 }}
                onClick={(e) => triggerAlert(session.id, e)}
                className="bg-amber-500/20 text-amber-400 border border-amber-500/30 py-2.5 rounded-xl text-[11px] font-bold flex items-center justify-center gap-2 hover:bg-amber-500/30 transition cursor-pointer shadow-lg shadow-amber-500/5"
              >
                <FiAlertTriangle className={session.alerts > 0 ? "animate-bounce" : ""} /> 
                Alert ({session.alerts})
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Side Detail Drawer مع حركات متطورة */}
      <AnimatePresence>
        {activeSession && (
          <div className="fixed inset-0 z-50 flex justify-end">
            {/* خلفية مع تدرج وفلتر ضبابي */}
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 0.7 }} 
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setActiveSession(null)}
              className="absolute inset-0 bg-[#050810]/80 backdrop-blur-md" 
            />

            {/* الـ Drawer الجانبي */}
            <motion.div 
              initial={{ x: "100%", opacity: 0.5 }} 
              animate={{ x: 0, opacity: 1 }} 
              exit={{ x: "100%", opacity: 0 }}
              transition={{ type: "spring", damping: 30, stiffness: 280 }}
              className="relative w-full sm:w-[460px] bg-[#0d1321] border-l border-gray-800 p-6 sm:p-8 shadow-[-10px_0_40px_rgba(0,0,0,0.8)] z-10 flex flex-col justify-between overflow-y-auto"
            >
              <div>
                <div className="flex justify-between items-center pb-4 mb-6 border-b border-gray-800">
                  <div>
                    <span className="text-[10px] text-indigo-400 uppercase tracking-widest font-bold flex items-center gap-1.5">
                      <FiActivity className="animate-spin text-xs" /> Security Operations Log
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
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Current Status:</span>
                      <span className={`font-bold px-2 py-0.5 rounded-md ${activeSession.locked ? 'bg-red-500/10 text-red-400 border border-red-500/20' : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'}`}>
                        {activeSession.locked ? 'Locked / Closed' : 'Active / Open'}
                      </span>
                    </div>
                  </div>

                  {/* قسم الملاحظات الأمنية القابلة للتعديل */}
                  <motion.div 
                    layout
                    className="bg-amber-500/10 border border-amber-500/20 p-4 rounded-2xl text-amber-300 shadow-lg"
                  >
                    <div className="flex justify-between items-center mb-2">
                      <p className="font-bold flex items-center gap-1.5">
                        <FiAlertTriangle className="text-amber-400 animate-pulse" /> Security Field Notes:
                      </p>
                      {!isEditingNotes ? (
                        <motion.button 
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setIsEditingNotes(true)}
                          className="text-[10px] bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 px-2.5 py-1 rounded-lg flex items-center gap-1 transition cursor-pointer font-bold shadow-sm"
                        >
                          <FiEdit3 /> Edit Notes
                        </motion.button>
                      ) : (
                        <motion.button 
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={handleSaveNotes}
                          className="text-[10px] bg-emerald-500/20 hover:bg-emerald-500/35 text-emerald-300 px-2.5 py-1 rounded-lg flex items-center gap-1 transition cursor-pointer font-bold shadow-sm"
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
                        <motion.div
                          key="edit-notes"
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -5 }}
                        >
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

              {/* Action Buttons inside Drawer */}
              <div className="pt-6 border-t border-gray-800 space-y-3">
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-3 bg-[#141d31] hover:bg-gray-800 border border-gray-700/80 rounded-xl text-xs font-bold transition cursor-pointer shadow-lg"
                >
                  Verify Student QR Entry Log
                </motion.button>
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
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