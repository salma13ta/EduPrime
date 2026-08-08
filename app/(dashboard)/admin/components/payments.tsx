"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FiDollarSign, FiCheckCircle, FiAlertCircle, FiCreditCard, 
  FiSmartphone, FiShield, FiBell, FiUserX, FiLock, FiArrowRight 
} from "react-icons/fi";

const initialPayments = [
  { id: 1, student: "Omar Ahmed", amount: 500, status: "Paid", method: "Cash", date: "2026-08-08" },
  { id: 2, student: "Sara Yasser", amount: 450, status: "Pending", method: "Vodafone", date: "2026-08-08" },
  { id: 3, student: "Khaled Mohamed", amount: 500, status: "Unpaid", method: "None", date: "2026-08-08" },
  { id: 4, student: "Mona Adel", amount: 450, status: "Unpaid", method: "None", date: "2026-08-08" },
];

export default function AdvancedPaymentsDashboard() {
  const [payments, setPayments] = useState(initialPayments);

  const verifyPayment = (id: number) => {
    setPayments(prev => prev.map(p => p.id === id ? { ...p, status: "Paid", method: "Verified" } : p));
  };

  const unpaidLogs = payments.filter(p => p.status === "Unpaid" || p.status === "Pending");
  const paidLogs = payments.filter(p => p.status === "Paid");

  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-[#050810] min-h-screen text-white font-sans selection:bg-indigo-500 selection:text-white">
      
      {/* Header مع أنيميشن هبوط سلس */}
      <motion.div 
        initial={{ opacity: 0, y: -25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-[#0d1321] p-6 rounded-3xl border border-gray-800 shadow-2xl relative overflow-hidden"
      >
        {/* خلفية جمالية مضيئة */}
        <div className="absolute -right-10 -top-10 w-40 h-40 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div>
          <h1 className="text-xl sm:text-2xl font-bold flex items-center gap-3">
            <FiCreditCard className="text-indigo-500 text-2xl" /> Financial & Security Gateway
          </h1>
          <p className="text-gray-400 text-xs mt-1">Real-time payment verification and unpaid student restriction logs</p>
        </div>

        <motion.div 
          animate={{ scale: [1, 1.03, 1] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="bg-red-500/10 border border-red-500/20 px-4 py-2 rounded-2xl text-red-400 text-xs font-bold flex items-center gap-2 shadow-lg shadow-red-500/5"
        >
          <FiUserX className="text-sm" /> 
          <span>{unpaidLogs.length} Restricted Students</span>
        </motion.div>
      </motion.div>

      {/* قسم لوجات المتأخرين (Security Alert Logs) مع AnimatePresence للحركة الاحترافية */}
      <div className="mb-10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xs font-bold text-red-400 uppercase tracking-wider flex items-center gap-2">
            <FiAlertCircle className="text-base animate-bounce" /> Security Alerts: Unpaid & Restricted Access Logs
          </h2>
          <span className="text-[10px] text-gray-500 bg-gray-900 px-2.5 py-1 rounded-full border border-gray-800">
            Live Monitoring
          </span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <AnimatePresence>
            {unpaidLogs.map((log) => (
              <motion.div 
                key={`log-${log.id}`}
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, x: 50, scale: 0.8 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                className="bg-[#0d1321] border border-red-500/30 p-4 rounded-2xl flex items-center justify-between shadow-2xl relative overflow-hidden group"
              >
                {/* خط تنبيه أحمر متحرك بالخلفية */}
                <motion.div 
                  animate={{ opacity: [0.4, 0.9, 0.4] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                  className="absolute left-0 top-0 bottom-0 w-1.5 bg-red-500 shadow-[0_0_10px_#ef4444]"
                />

                <div className="pl-3">
                  <div className="flex items-center gap-2">
                    <p className="font-bold text-sm text-white">{log.student}</p>
                    <span className="text-[9px] bg-red-500/20 text-red-400 px-2 py-0.5 rounded-full font-bold border border-red-500/30 animate-pulse">
                      Blocked
                    </span>
                  </div>
                  <p className="text-[11px] text-gray-400 mt-1">
                    Due: <strong className="text-white">${log.amount}</strong> • Type: <span className="text-amber-400">{log.status}</span>
                  </p>
                </div>

                <div>
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => verifyPayment(log.id)}
                    className="bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 border border-emerald-500/40 px-3.5 py-2 rounded-xl text-[10px] font-bold transition cursor-pointer flex items-center gap-1.5 shadow-lg shadow-emerald-500/10"
                  >
                    <FiCheckCircle className="text-xs" /> Mark Paid
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {unpaidLogs.length === 0 && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="col-span-full bg-emerald-500/10 border border-emerald-500/20 p-6 rounded-2xl text-center text-emerald-400 flex flex-col items-center justify-center gap-2"
            >
              <FiCheckCircle className="text-3xl" />
              <p className="font-bold text-sm">All students have cleared their payments! No restrictions.</p>
            </motion.div>
          )}
        </div>
      </div>

      {/* القائمة الرئيسية للمدفوعات */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider">All Payment Records & Gate Status</h2>
      </div>

      <div className="space-y-4">
        {payments.map((p, index) => (
          <motion.div 
            key={p.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1, duration: 0.4 }}
            whileHover={{ y: -2, transition: { duration: 0.2 } }}
            className="bg-[#0d1321] p-5 rounded-2xl border border-gray-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xl relative overflow-hidden"
          >
            <div className="flex items-center gap-4">
              <div className={`p-3 rounded-2xl transition-colors duration-500 ${p.status === 'Paid' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'}`}>
                {p.status === 'Paid' ? <FiCheckCircle className="text-xl" /> : <FiLock className="text-xl" />}
              </div>
              <div>
                <p className="font-bold text-sm text-white flex items-center gap-2">
                  {p.student}
                  {p.status === 'Paid' && (
                    <motion.span 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="text-[9px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full"
                    >
                      Verified
                    </motion.span>
                  )}
                </p>
                <p className="text-[10px] text-gray-500 mt-0.5">{p.method} • {p.date}</p>
              </div>
            </div>

            <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto">
              <span className="text-base font-bold text-indigo-400 font-mono">${p.amount}</span>
              
              <AnimatePresence mode="wait">
                {p.status === 'Paid' ? (
                  <motion.span 
                    key="paid-badge"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="px-3.5 py-2 rounded-xl text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center gap-1.5 shadow-md shadow-emerald-500/10"
                  >
                    <FiShield /> Gate Access Granted
                  </motion.span>
                ) : (
                  <motion.button 
                    key="unpaid-btn"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => verifyPayment(p.id)}
                    className="px-4 py-2 rounded-xl text-[10px] font-bold bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/30 flex items-center gap-2 transition cursor-pointer shadow-md shadow-red-500/10"
                  >
                    <FiSmartphone /> Verify & Unlock
                  </motion.button>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}