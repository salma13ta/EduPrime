"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FiDollarSign, 
  FiPercent, 
  FiFileText, 
  FiCheckCircle, 
  FiSearch, 
  FiPlus, 
  FiX, 
  FiShield,
  FiCalendar
} from "react-icons/fi";

interface RevenueRecord {
  id: number;
  teacherName: string;
  subject: string;
  studentsCount: number;
  ticketPrice: number;
  centerShareType: "percentage" | "fixed";
  centerShareValue: number; // e.g., 25% or 15 EGP per student
  paymentType: "Per Class" | "Monthly Subscription";
  attendanceMethod: "QR Barcode" | "Manual";
  totalRevenue: number;
  centerEarnings: number;
  teacherEarnings: number;
  date: string;
}

const initialRevenueData: RevenueRecord[] = [
  {
    id: 1,
    teacherName: "Alex Johnson",
    subject: "Mathematics",
    studentsCount: 40,
    ticketPrice: 100,
    centerShareType: "percentage",
    centerShareValue: 25, // 25%
    paymentType: "Per Class",
    attendanceMethod: "QR Barcode",
    totalRevenue: 4000,
    centerEarnings: 1000,
    teacherEarnings: 3000,
    date: "2026-06-08"
  },
  {
    id: 2,
    teacherName: "Sarah Smith",
    subject: "Physics",
    studentsCount: 30,
    ticketPrice: 150,
    centerShareType: "fixed",
    centerShareValue: 20, // 20 fixed per student
    paymentType: "Monthly Subscription",
    attendanceMethod: "QR Barcode",
    totalRevenue: 4500,
    centerEarnings: 600,
    teacherEarnings: 3900,
    date: "2026-06-08"
  }
];

export default function AdminRevenue() {
  const [records, setRecords] = useState<RevenueRecord[]>(initialRevenueData);
  const [searchQuery, setSearchQuery] = useState("");
  const [showModal, setShowModal] = useState(false);

  // Form States لإضافة حركة مالية جديدة
  const [teacherName, setTeacherName] = useState("");
  const [subject, setSubject] = useState("");
  const [studentsCount, setStudentsCount] = useState<number>(0);
  const [ticketPrice, setTicketPrice] = useState<number>(0);
  const [centerShareType, setCenterShareType] = useState<"percentage" | "fixed">("percentage");
  const [centerShareValue, setCenterShareValue] = useState<number>(25);
  const [paymentType, setPaymentType] = useState<"Per Class" | "Monthly Subscription">("Per Class");
  const [attendanceMethod, setAttendanceMethod] = useState<"QR Barcode" | "Manual">("QR Barcode");

  // تصفية السجلات بالبحث
  const filteredRecords = records.filter(r => 
    r.teacherName.toLowerCase().includes(searchQuery.toLowerCase()) || 
    r.subject.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // الحسابات واللوجيك المالي
  const handleAddRecord = (e: React.FormEvent) => {
    e.preventDefault();
    const total = studentsCount * ticketPrice;
    let centerEarnings = 0;

    if (centerShareType === "percentage") {
      centerEarnings = (total * centerShareValue) / 100;
    } else {
      centerEarnings = studentsCount * centerShareValue;
    }

    const teacherEarnings = total - centerEarnings;

    const newRecord: RevenueRecord = {
      id: Date.now(),
      teacherName,
      subject,
      studentsCount,
      ticketPrice,
      centerShareType,
      centerShareValue,
      paymentType,
      attendanceMethod,
      totalRevenue: total,
      centerEarnings,
      teacherEarnings,
      date: new Date().toISOString().split('T')[0]
    };

    setRecords([newRecord, ...records]);
    setShowModal(false);
    // Reset Form
    setTeacherName("");
    setSubject("");
    setStudentsCount(0);
    setTicketPrice(0);
  };

  // إجماليات الخزنة واليومية
  const totalCenterDailyRevenue = records.reduce((acc, curr) => acc + curr.centerEarnings, 0);
  const totalGrossRevenue = records.reduce((acc, curr) => acc + curr.totalRevenue, 0);

  return (
    <div className="p-4 md:p-8 space-y-6 bg-[#0f1117] min-h-screen text-slate-100" dir="ltr">
      
      {/* Header Section */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-[#181b25] p-6 rounded-2xl border border-slate-800/60 shadow-lg"
      >
        <div>
          <h1 className="text-2xl font-bold text-white tracking-wide">Revenue & Financial Auditing</h1>
          <p className="text-sm text-slate-400 mt-1">Manage core financial movements, center shares, teacher settlements, and daily reconciliation.</p>
        </div>
        
        <motion.button 
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs md:text-sm font-medium shadow-lg shadow-indigo-600/30 transition-all"
        >
          <FiPlus size={16} /> Add Financial Entry
        </motion.button>
      </motion.div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-[#181b25] p-5 rounded-2xl border border-slate-800/60 shadow-lg flex items-center justify-between"
        >
          <div>
            <p className="text-xs text-slate-400 font-medium">Total Gross Collection</p>
            <h3 className="text-2xl font-bold text-white mt-1">${totalGrossRevenue.toLocaleString()}</h3>
            <span className="text-xs text-emerald-400 font-medium mt-1 inline-block">All student transactions</span>
          </div>
          <div className="w-12 h-12 bg-emerald-500/10 text-emerald-400 rounded-xl flex items-center justify-center text-xl">
            <FiDollarSign />
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-[#181b25] p-5 rounded-2xl border border-slate-800/60 shadow-lg flex items-center justify-between"
        >
          <div>
            <p className="text-xs text-slate-400 font-medium">Center Net Share (Vault)</p>
            <h3 className="text-2xl font-bold text-white mt-1">${totalCenterDailyRevenue.toLocaleString()}</h3>
            <span className="text-xs text-indigo-400 font-medium mt-1 inline-block">Daily reconciliation ready</span>
          </div>
          <div className="w-12 h-12 bg-indigo-500/10 text-indigo-400 rounded-xl flex items-center justify-center text-xl">
            <FiShield />
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-[#181b25] p-5 rounded-2xl border border-slate-800/60 shadow-lg flex items-center justify-between"
        >
          <div>
            <p className="text-xs text-slate-400 font-medium">Active Audit Status</p>
            <h3 className="text-2xl font-bold text-emerald-400 mt-1">Balanced</h3>
            <span className="text-xs text-slate-400 font-medium mt-1 inline-block">No shortages detected</span>
          </div>
          <div className="w-12 h-12 bg-blue-500/10 text-blue-400 rounded-xl flex items-center justify-center text-xl">
            <FiCheckCircle />
          </div>
        </motion.div>
      </div>

      {/* Main Table Container */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.99 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="bg-[#181b25] rounded-2xl border border-slate-800/60 shadow-lg overflow-hidden"
      >
        <div className="p-5 border-b border-slate-800/60 flex flex-col sm:flex-row justify-between items-center gap-4">
          <h2 className="text-lg font-bold text-white">Daily Settlement & Teacher Accounts</h2>
          
          <div className="relative w-full sm:w-72">
            <FiSearch className="absolute left-3 top-3 text-slate-400 text-sm" />
            <input 
              type="text" 
              placeholder="Search teacher or subject..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs md:text-sm bg-[#222634] border border-slate-700/60 text-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-slate-400"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#222634]/50 text-slate-400 text-xs font-semibold uppercase tracking-wider">
                <th className="py-3 px-6">Teacher / Subject</th>
                <th className="py-3 px-6">Students & Type</th>
                <th className="py-3 px-6">Attendance Mode</th>
                <th className="py-3 px-6">Ticket Price</th>
                <th className="py-3 px-6">Center Share</th>
                <th className="py-3 px-6">Teacher Net</th>
                <th className="py-3 px-6">Total Gross</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/40 text-sm">
              <AnimatePresence>
                {filteredRecords.length > 0 ? (
                  filteredRecords.map((record, index) => (
                    <motion.tr 
                      key={record.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 10 }}
                      transition={{ delay: index * 0.08 }}
                      whileHover={{ backgroundColor: "rgba(34, 38, 52, 0.4)" }}
                      className="transition-colors"
                    >
                      <td className="py-4 px-6">
                        <p className="font-semibold text-slate-200">{record.teacherName}</p>
                        <span className="text-xs text-slate-400">{record.subject}</span>
                      </td>
                      <td className="py-4 px-6">
                        <span className="text-slate-200 font-medium">{record.studentsCount} Students</span>
                        <p className="text-xs text-indigo-400">{record.paymentType}</p>
                      </td>
                      <td className="py-4 px-6">
                        <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-800 text-slate-300">
                          {record.attendanceMethod}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-slate-300">${record.ticketPrice}</td>
                      <td className="py-4 px-6 text-indigo-400 font-medium">
                        ${record.centerEarnings} ({record.centerShareType === 'percentage' ? `${record.centerShareValue}%` : `$${record.centerShareValue} fixed`})
                      </td>
                      <td className="py-4 px-6 text-emerald-400 font-medium">${record.teacherEarnings}</td>
                      <td className="py-4 px-6 font-bold text-white">${record.totalRevenue}</td>
                    </motion.tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="text-center py-8 text-slate-500 text-sm">
                      No financial records found.
                    </td>
                  </tr>
                )}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Modal لإضافة حركة مالية جديدة */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-[#181b25] border border-slate-800 p-6 rounded-2xl w-full max-w-lg shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto"
            >
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-bold text-white">New Financial & Attendance Entry</h3>
                <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-white">
                  <FiX size={20} />
                </button>
              </div>

              <form onSubmit={handleAddRecord} className="space-y-4 text-xs md:text-sm">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-400 mb-1">Teacher Name</label>
                    <input 
                      type="text" 
                      required
                      value={teacherName} 
                      onChange={(e) => setTeacherName(e.target.value)} 
                      placeholder="e.g. John Doe"
                      className="w-full p-2.5 bg-[#222634] border border-slate-700 rounded-xl text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1">Subject</label>
                    <input 
                      type="text" 
                      required
                      value={subject} 
                      onChange={(e) => setSubject(e.target.value)} 
                      placeholder="e.g. Chemistry"
                      className="w-full p-2.5 bg-[#222634] border border-slate-700 rounded-xl text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-400 mb-1">Actual Students Count</label>
                    <input 
                      type="number" 
                      required
                      min={1}
                      value={studentsCount || ""} 
                      onChange={(e) => setStudentsCount(Number(e.target.value))} 
                      placeholder="e.g. 35"
                      className="w-full p-2.5 bg-[#222634] border border-slate-700 rounded-xl text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1">Ticket / Subscription Price ($)</label>
                    <input 
                      type="number" 
                      required
                      min={1}
                      value={ticketPrice || ""} 
                      onChange={(e) => setTicketPrice(Number(e.target.value))} 
                      placeholder="e.g. 100"
                      className="w-full p-2.5 bg-[#222634] border border-slate-700 rounded-xl text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-400 mb-1">Center Share System</label>
                    <select 
                      value={centerShareType} 
                      onChange={(e) => setCenterShareType(e.target.value as any)}
                      className="w-full p-2.5 bg-[#222634] border border-slate-700 rounded-xl text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                      <option value="percentage">Percentage (%)</option>
                      <option value="fixed">Fixed Amount per Student</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1">Share Value ({centerShareType === 'percentage' ? '%' : '$'})</label>
                    <input 
                      type="number" 
                      required
                      value={centerShareValue} 
                      onChange={(e) => setCenterShareValue(Number(e.target.value))} 
                      className="w-full p-2.5 bg-[#222634] border border-slate-700 rounded-xl text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-400 mb-1">Payment Type</label>
                    <select 
                      value={paymentType} 
                      onChange={(e) => setPaymentType(e.target.value as any)}
                      className="w-full p-2.5 bg-[#222634] border border-slate-700 rounded-xl text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                      <option value="Per Class">Per Class</option>
                      <option value="Monthly Subscription">Monthly Subscription</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1">Attendance Tracking</label>
                    <select 
                      value={attendanceMethod} 
                      onChange={(e) => setAttendanceMethod(e.target.value as any)}
                      className="w-full p-2.5 bg-[#222634] border border-slate-700 rounded-xl text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                      <option value="QR Barcode">QR Barcode</option>
                      <option value="Manual">Manual Entry</option>
                    </select>
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-4">
                  <button 
                    type="button" 
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 bg-slate-800 text-slate-300 hover:bg-slate-700 rounded-xl font-medium"
                  >
                    Cancel
                  </button>
                  <motion.button 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="px-4 py-2 bg-indigo-600 text-white hover:bg-indigo-500 rounded-xl font-medium shadow-lg shadow-indigo-600/30"
                  >
                    Save Entry & Calculate
                  </motion.button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}