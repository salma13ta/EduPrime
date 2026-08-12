"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FiCode, 
  FiCheckCircle, 
  FiAlertTriangle, 
  FiUserCheck, 
  FiSearch, 
  FiX,
  FiSmartphone,
  FiActivity,
  FiCreditCard,
  FiClock,
  FiUser,
  FiBookOpen
} from "react-icons/fi";

interface AttendanceRecord {
  id: number;
  studentName: string;
  teacherName: string;
  subject: string;
  groupName: string;
  paymentStatus: "Paid" | "Unpaid" | "Subscription Active";
  attendanceTime: string;
  method: "QR Dynamic" | "Static ID Card" | "Manual";
  ticketPrice: number;
}

const initialAttendanceData: AttendanceRecord[] = [
  {
    id: 1,
    studentName: "Liam Smith",
    teacherName: "Alex Johnson",
    subject: "Mathematics",
    groupName: "Group A (Mon/Wed)",
    paymentStatus: "Subscription Active",
    attendanceTime: "04:15 PM",
    method: "QR Dynamic",
    ticketPrice: 100
  },
  {
    id: 2,
    studentName: "Emma Watson",
    teacherName: "Sarah Smith",
    subject: "Physics",
    groupName: "Group B (Tue/Thu)",
    paymentStatus: "Unpaid",
    attendanceTime: "04:18 PM",
    method: "Static ID Card",
    ticketPrice: 150
  },
  {
    id: 3,
    studentName: "Noah Brown",
    teacherName: "David Miller",
    subject: "Chemistry",
    groupName: "Group C (Sat/Sun)",
    paymentStatus: "Paid",
    attendanceTime: "04:25 PM",
    method: "Manual",
    ticketPrice: 120
  }
];

export default function AdminQRAttendance() {
  const [records, setRecords] = useState<AttendanceRecord[]>(initialAttendanceData);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterTab, setFilterTab] = useState<"All" | "Unpaid" | "Active">("All");
  const [showScannerModal, setShowScannerModal] = useState(false);

  const [scanStudentName, setScanStudentName] = useState("");
  const [scanTeacherName, setScanTeacherName] = useState("Alex Johnson");
  const [scanSubject, setScanSubject] = useState("Mathematics");
  const [scanPaymentStatus, setScanPaymentStatus] = useState<"Paid" | "Unpaid" | "Subscription Active">("Paid");
  const [scanMethod, setScanMethod] = useState<"QR Dynamic" | "Static ID Card" | "Manual">("QR Dynamic");
  const [scanTicketPrice, setScanTicketPrice] = useState(100);

  const filteredRecords = records.filter(r => {
    const matchesSearch = r.studentName.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          r.teacherName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          r.subject.toLowerCase().includes(searchQuery.toLowerCase());
    if (filterTab === "Unpaid") return matchesSearch && r.paymentStatus === "Unpaid";
    if (filterTab === "Active") return matchesSearch && r.paymentStatus !== "Unpaid";
    return matchesSearch;
  });

  const handleSimulateScan = (e: React.FormEvent) => {
    e.preventDefault();
    if (!scanStudentName) return;

    const newEntry: AttendanceRecord = {
      id: Date.now(),
      studentName: scanStudentName,
      teacherName: scanTeacherName,
      subject: scanSubject,
      groupName: "Express Gate Group",
      paymentStatus: scanPaymentStatus,
      attendanceTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      method: scanMethod,
      ticketPrice: scanTicketPrice
    };

    setRecords([newEntry, ...records]);
    setShowScannerModal(false);
    setScanStudentName("");
  };

  return (
    <div className="p-4 md:p-8 space-y-8 bg-[#090a0f] min-h-screen text-slate-100" dir="ltr">
      
      {/* Top Banner Dashboard Style */}
      <div className="relative overflow-hidden bg-gradient-to-r from-indigo-950/60 via-[#181b25] to-[#12151f] p-6 md:p-8 rounded-3xl border border-indigo-500/20 shadow-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none"></div>
        
        <div className="space-y-2 z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 text-xs font-semibold border border-indigo-500/20">
            <FiActivity className="animate-pulse" /> Live Access Control & Financial Node
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">Smart Attendance Command</h1>
          <p className="text-sm text-slate-400 max-w-xl">Monitor gate check-ins, instantaneous subscription validations, and revenue metrics in a unified layout.</p>
        </div>

        <motion.button 
          whileHover={{ scale: 1.03, boxShadow: "0 0 25px rgba(99, 102, 241, 0.4)" }}
          whileTap={{ scale: 0.97 }}
          onClick={() => setShowScannerModal(true)}
          className="z-10 flex items-center gap-2.5 px-6 py-3.5 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white rounded-2xl text-sm font-semibold shadow-xl transition-all"
        >
          <FiCode size={20} /> Open Gate Scanner
        </motion.button>
      </div>

      {/* Quick Metrics Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="bg-[#131620] p-5 rounded-2xl border border-slate-800/80 shadow-lg flex items-center gap-4">
          <div className="w-14 h-14 bg-blue-500/10 text-blue-400 rounded-2xl flex items-center justify-center text-2xl shadow-inner">
            <FiUserCheck />
          </div>
          <div>
            <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Checked-In Today</p>
            <h3 className="text-2xl font-black text-white mt-0.5">{records.length} <span className="text-xs font-normal text-slate-400">Students</span></h3>
          </div>
        </div>

        <div className="bg-[#131620] p-5 rounded-2xl border border-slate-800/80 shadow-lg flex items-center gap-4">
          <div className="w-14 h-14 bg-emerald-500/10 text-emerald-400 rounded-2xl flex items-center justify-center text-2xl shadow-inner">
            <FiCheckCircle />
          </div>
          <div>
            <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Active & Paid Entries</p>
            <h3 className="text-2xl font-black text-emerald-400 mt-0.5">{records.filter(r => r.paymentStatus !== "Unpaid").length} <span className="text-xs font-normal text-slate-400">Verified</span></h3>
          </div>
        </div>

        <div className="bg-[#131620] p-5 rounded-2xl border border-slate-800/80 shadow-lg flex items-center gap-4">
          <div className="w-14 h-14 bg-rose-500/10 text-rose-400 rounded-2xl flex items-center justify-center text-2xl shadow-inner">
            <FiAlertTriangle />
          </div>
          <div>
            <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Unpaid Payment Flags</p>
            <h3 className="text-2xl font-black text-rose-400 mt-0.5">{records.filter(r => r.paymentStatus === "Unpaid").length} <span className="text-xs font-normal text-slate-400">Alerts</span></h3>
          </div>
        </div>
      </div>

      {/* Control Filters & Search Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-[#131620] p-4 rounded-2xl border border-slate-800/80">
        <div className="flex items-center gap-2 w-full sm:w-auto">
          {(["All", "Active", "Unpaid"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setFilterTab(tab)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                filterTab === tab 
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30' 
                  : 'bg-[#1b1f2e] text-slate-400 hover:text-white'
              }`}
            >
              {tab === "All" ? "All Entries" : tab === "Active" ? "Verified Passes" : "Payment Alerts"}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-80">
          <FiSearch className="absolute left-3.5 top-3 text-slate-400 text-sm" />
          <input 
            type="text" 
            placeholder="Filter by name, teacher, subject..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 text-xs bg-[#1b1f2e] border border-slate-700/60 text-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-slate-400"
          />
        </div>
      </div>

      {/* Cards Grid Layout (Instead of Traditional Table) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {filteredRecords.length > 0 ? (
            filteredRecords.map((record, index) => (
              <motion.div
                key={record.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="bg-[#131620] border border-slate-800/80 rounded-3xl p-6 shadow-xl flex flex-col justify-between space-y-4 relative overflow-hidden group"
              >
                {/* Top status indicator line */}
                <div className={`absolute top-0 left-0 right-0 h-1.5 ${
                  record.paymentStatus === 'Unpaid' ? 'bg-rose-500' : 'bg-emerald-500'
                }`} />

                <div className="flex justify-between items-start pt-2">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-indigo-500/10 text-indigo-400 rounded-2xl flex items-center justify-center font-bold text-lg border border-indigo-500/20">
                      {record.studentName.charAt(0)}
                    </div>
                    <div>
                      <h3 className="font-bold text-white text-base group-hover:text-indigo-400 transition-colors">{record.studentName}</h3>
                      <p className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                        <FiClock size={11} /> {record.attendanceTime} &bull; <span className="text-slate-300 font-medium">{record.method}</span>
                      </p>
                    </div>
                  </div>

                  <span className="text-sm font-black text-white bg-[#1b1f2e] px-3 py-1.5 rounded-xl border border-slate-700/50">
                    ${record.ticketPrice}
                  </span>
                </div>

                <div className="bg-[#181c2b] p-3.5 rounded-2xl space-y-2 border border-slate-800/50">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400 flex items-center gap-1.5"><FiBookOpen size={13} /> Subject</span>
                    <span className="font-semibold text-slate-200">{record.subject}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400 flex items-center gap-1.5"><FiUser size={13} /> Instructor</span>
                    <span className="font-semibold text-slate-200">{record.teacherName}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-800/60">
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-semibold ${
                    record.paymentStatus === 'Unpaid' 
                      ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20' 
                      : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                  }`}>
                    {record.paymentStatus === 'Unpaid' ? <FiAlertTriangle size={12} /> : <FiCheckCircle size={12} />}
                    {record.paymentStatus}
                  </span>

                  <span className="text-[11px] text-slate-400 font-medium bg-[#1b1f2e] px-2.5 py-1 rounded-lg">
                    {record.groupName}
                  </span>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full py-16 text-center bg-[#131620] rounded-3xl border border-slate-800/80">
              <p className="text-slate-400 text-sm">No gate check-in records matching your criteria.</p>
            </div>
          )}
        </AnimatePresence>
      </div>

      {/* Interactive Simulator Modal */}
      <AnimatePresence>
        {showScannerModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-[#131620] border border-slate-800 p-6 md:p-8 rounded-3xl w-full max-w-lg shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto"
            >
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-indigo-500/10 text-indigo-400 rounded-2xl flex items-center justify-center text-xl border border-indigo-500/20">
                    <FiSmartphone />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">Gate Scanner Simulation</h3>
                    <p className="text-xs text-slate-400">Scan digital passes & instantly check payment statuses.</p>
                  </div>
                </div>
                <button onClick={() => setShowScannerModal(false)} className="text-slate-400 hover:text-white p-2 rounded-xl hover:bg-[#1b1f2e]">
                  <FiX size={20} />
                </button>
              </div>

              <form onSubmit={handleSimulateScan} className="space-y-4 text-xs md:text-sm">
                <div>
                  <label className="block text-slate-400 font-medium mb-1.5">Student Full Name</label>
                  <input 
                    type="text" 
                    required
                    value={scanStudentName} 
                    onChange={(e) => setScanStudentName(e.target.value)} 
                    placeholder="e.g. Alexander Wright"
                    className="w-full p-3 bg-[#1b1f2e] border border-slate-700/60 rounded-2xl text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-400 font-medium mb-1.5">Teacher Name</label>
                    <input 
                      type="text" 
                      required
                      value={scanTeacherName} 
                      onChange={(e) => setScanTeacherName(e.target.value)} 
                      className="w-full p-3 bg-[#1b1f2e] border border-slate-700/60 rounded-2xl text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 font-medium mb-1.5">Subject</label>
                    <input 
                      type="text" 
                      required
                      value={scanSubject} 
                      onChange={(e) => setScanSubject(e.target.value)} 
                      className="w-full p-3 bg-[#1b1f2e] border border-slate-700/60 rounded-2xl text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-400 font-medium mb-1.5">Financial & Sub Status</label>
                    <select 
                      value={scanPaymentStatus} 
                      onChange={(e) => setScanPaymentStatus(e.target.value as any)}
                      className="w-full p-3 bg-[#1b1f2e] border border-slate-700/60 rounded-2xl text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                      <option value="Paid">Paid (Per Session)</option>
                      <option value="Subscription Active">Subscription Active</option>
                      <option value="Unpaid">Unpaid (⚠️ Raise Alert)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-slate-400 font-medium mb-1.5">Scan Method</label>
                    <select 
                      value={scanMethod} 
                      onChange={(e) => setScanMethod(e.target.value as any)}
                      className="w-full p-3 bg-[#1b1f2e] border border-slate-700/60 rounded-2xl text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                      <option value="QR Dynamic">QR Dynamic App</option>
                      <option value="Static ID Card">Static ID Card</option>
                      <option value="Manual">Manual Override</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-slate-400 font-medium mb-1.5">Class Fee / Ticket Price ($)</label>
                  <input 
                    type="number" 
                    required
                    min={0}
                    value={scanTicketPrice} 
                    onChange={(e) => setScanTicketPrice(Number(e.target.value))} 
                    className="w-full p-3 bg-[#1b1f2e] border border-slate-700/60 rounded-2xl text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
                  <button 
                    type="button" 
                    onClick={() => setShowScannerModal(false)}
                    className="px-5 py-3 bg-[#1b1f2e] text-slate-300 hover:bg-slate-800 rounded-2xl font-semibold transition-colors"
                  >
                    Cancel
                  </button>
                  <motion.button 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-violet-600 text-white hover:from-indigo-500 hover:to-violet-500 rounded-2xl font-semibold shadow-xl shadow-indigo-600/30 transition-all"
                  >
                    Process Check-In
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