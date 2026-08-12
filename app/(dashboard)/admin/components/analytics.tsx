"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FiUsers, 
  FiCheckSquare, 
  FiTrendingUp, 
  FiClock,
  FiSearch,
  FiAlertCircle,
  FiCheckCircle,
  FiX
} from "react-icons/fi";

interface Teacher {
  id: number;
  name: string;
  subject: string;
  retention: string;
  attendance: string;
  complaints: number;
  status: string;
  note?: string;
}

// بيانات عامة ومبدئية للتحليلات
const analyticsData = {
  overall: {
    retentionRate: "92%",
    taskCompletion: "84%",
    gradeGrowth: "+18%",
    responseSpeed: "1.4 hrs",
  },
  teachers: [
    { id: 1, name: "Alex Johnson", subject: "Mathematics", retention: "95%", attendance: "98%", complaints: 1, status: "Excellent", note: "Outstanding performance." },
    { id: 2, name: "Sarah Smith", subject: "Physics", retention: "88%", attendance: "90%", complaints: 4, status: "Needs Review", note: "Frequent student complaints on response time." },
    { id: 3, name: "Michael Brown", subject: "Chemistry", retention: "91%", attendance: "94%", complaints: 2, status: "Very Good", note: "Stable and consistent." },
  ] as Teacher[]
};

export default function AdminAnalytics() {
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  
  const [teachersList, setTeachersList] = useState<Teacher[]>(analyticsData.teachers);
  const [activeTeacher, setActiveTeacher] = useState<Teacher | null>(null);
  const [adminNoteInput, setAdminNoteInput] = useState("");
  const [showModal, setShowModal] = useState(false);

  // منطق الفلترة والبحث المتقدم
  const filteredTeachers = teachersList.filter(teacher => {
    const matchesSearch = teacher.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          teacher.subject.toLowerCase().includes(searchQuery.toLowerCase());
    if (selectedFilter === "warning") return matchesSearch && teacher.complaints > 3;
    if (selectedFilter === "top") return matchesSearch && parseInt(teacher.retention) >= 90;
    return matchesSearch;
  });

  // حفظ الملاحظة الإدارية
  const handleSaveNote = () => {
    if (!activeTeacher) return;
    setTeachersList(prev => prev.map(t => t.id === activeTeacher.id ? { ...t, note: adminNoteInput } : t));
    setShowModal(false);
    setActiveTeacher(null);
    setAdminNoteInput("");
  };

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
          <h1 className="text-2xl font-bold text-white tracking-wide">Performance Analytics (KPIs)</h1>
          <p className="text-sm text-slate-400 mt-1">Deep insights into teacher commitment, academic performance, and satisfaction.</p>
        </div>
        
        {/* Interactive Filters */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          {["all", "top", "warning"].map((filter) => (
            <motion.button 
              key={filter}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedFilter(filter)}
              className={`px-4 py-2 text-xs md:text-sm rounded-xl font-medium transition-all ${
                selectedFilter === filter 
                  ? filter === "warning" ? 'bg-rose-600 text-white shadow-lg shadow-rose-600/30' : 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30' 
                  : 'bg-[#222634] text-slate-300 hover:bg-[#2a2f42]'
              }`}
            >
              {filter === "all" ? "All" : filter === "top" ? "Top Performers" : "Needs Intervention ⚠️"}
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* KPI Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { title: "Retention Rate", value: analyticsData.overall.retentionRate, sub: "↑ 2.4% vs last month", icon: <FiUsers />, color: "text-indigo-400", bg: "bg-indigo-500/10" },
          { title: "Task Completion", value: analyticsData.overall.taskCompletion, sub: "↑ Strong stability", icon: <FiCheckSquare />, color: "text-blue-400", bg: "bg-blue-500/10" },
          { title: "Grade Growth", value: analyticsData.overall.gradeGrowth, sub: "Notable academic boost", icon: <FiTrendingUp />, color: "text-emerald-400", bg: "bg-emerald-500/10" },
          { title: "Response Speed", value: analyticsData.overall.responseSpeed, sub: "Faster than target", icon: <FiClock />, color: "text-amber-400", bg: "bg-amber-500/10" },
        ].map((card, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: idx * 0.1 }}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            className="bg-[#181b25] p-5 rounded-2xl border border-slate-800/60 shadow-lg flex items-center justify-between relative overflow-hidden group"
          >
            <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-white/[0.02] rounded-full group-hover:scale-125 transition-transform duration-500 pointer-events-none" />
            <div>
              <p className="text-xs text-slate-400 font-medium">{card.title}</p>
              <h3 className="text-2xl font-bold text-white mt-1">{card.value}</h3>
              <span className="text-xs text-emerald-400 font-medium mt-1 inline-block">{card.sub}</span>
            </div>
            <div className={`w-12 h-12 ${card.bg} ${card.color} rounded-xl flex items-center justify-center text-xl`}>
              {card.icon}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Detailed Teachers Analytics Table */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.99 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="bg-[#181b25] rounded-2xl border border-slate-800/60 shadow-lg overflow-hidden"
      >
        <div className="p-5 border-b border-slate-800/60 flex flex-col sm:flex-row justify-between items-center gap-4">
          <h2 className="text-lg font-bold text-white">Teacher Commitment & Performance</h2>
          
          {/* Search Box */}
          <div className="relative w-full sm:w-72">
            <FiSearch className="absolute left-3 top-3 text-slate-400 text-sm" />
            <input 
              type="text" 
              placeholder="Search teacher or subject..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs md:text-sm bg-[#222634] border border-slate-700/60 text-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-slate-400 transition-all"
            />
          </div>
        </div>

        {/* Responsive Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#222634]/50 text-slate-400 text-xs font-semibold uppercase tracking-wider">
                <th className="py-3 px-6">Teacher</th>
                <th className="py-3 px-6">Subject</th>
                <th className="py-3 px-6">Retention Rate</th>
                <th className="py-3 px-6">Attendance</th>
                <th className="py-3 px-6">Complaints</th>
                <th className="py-3 px-6">Status & Notes</th>
                <th className="py-3 px-6 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/40 text-sm">
              <AnimatePresence>
                {filteredTeachers.length > 0 ? (
                  filteredTeachers.map((teacher, index) => (
                    <motion.tr 
                      key={teacher.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 10 }}
                      transition={{ delay: index * 0.08 }}
                      whileHover={{ backgroundColor: "rgba(34, 38, 52, 0.4)" }}
                      className="transition-colors"
                    >
                      <td className="py-4 px-6 font-semibold text-slate-200">{teacher.name}</td>
                      <td className="py-4 px-6 text-slate-400">{teacher.subject}</td>
                      <td className="py-4 px-6 font-medium text-emerald-400">{teacher.retention}</td>
                      <td className="py-4 px-6 text-slate-300">{teacher.attendance}</td>
                      <td className="py-4 px-6">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${teacher.complaints > 3 ? 'bg-rose-500/10 text-rose-400' : 'bg-slate-800 text-slate-300'}`}>
                          {teacher.complaints} complaints
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <div className="space-y-1">
                          <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium ${
                            teacher.status === 'Excellent' ? 'bg-emerald-500/10 text-emerald-400' : 
                            teacher.status === 'Needs Review' ? 'bg-rose-500/10 text-rose-400' : 'bg-blue-500/10 text-blue-400'
                          }`}>
                            {teacher.status === 'Excellent' && <FiCheckCircle />}
                            {teacher.status === 'Needs Review' && <FiAlertCircle />}
                            {teacher.status}
                          </span>
                          {teacher.note && <p className="text-xs text-slate-400 italic">Note: {teacher.note}</p>}
                        </div>
                      </td>
                      <td className="py-4 px-6 text-center">
                        <motion.button 
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => {
                            setActiveTeacher(teacher);
                            setAdminNoteInput(teacher.note || "");
                            setShowModal(true);
                          }}
                          className="px-3 py-1.5 bg-indigo-600/20 text-indigo-400 hover:bg-indigo-600 hover:text-white rounded-xl text-xs font-medium transition-all"
                        >
                          Add Note
                        </motion.button>
                      </td>
                    </motion.tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="text-center py-8 text-slate-500 text-sm">
                      No results match your search or filter.
                    </td>
                  </tr>
                )}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Interactive Modal */}
      <AnimatePresence>
        {showModal && activeTeacher && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-[#181b25] border border-slate-800 p-6 rounded-2xl w-full max-w-md shadow-2xl space-y-4"
            >
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-bold text-white">Administrative Note: {activeTeacher.name}</h3>
                <button 
                  onClick={() => setShowModal(false)}
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  <FiX size={20} />
                </button>
              </div>
              <p className="text-xs text-slate-400">Add direct feedback or action points for this teacher to be reviewed by admin management.</p>
              
              <textarea 
                rows={4}
                value={adminNoteInput}
                onChange={(e) => setAdminNoteInput(e.target.value)}
                placeholder="Type your notes here..."
                className="w-full p-3 text-sm bg-[#222634] border border-slate-700/60 text-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-slate-500"
              />

              <div className="flex justify-end gap-2 pt-2">
                <button 
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-slate-800 text-slate-300 hover:bg-slate-700 rounded-xl text-xs font-medium transition-all"
                >
                  Cancel
                </button>
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleSaveNote}
                  className="px-4 py-2 bg-indigo-600 text-white hover:bg-indigo-500 rounded-xl text-xs font-medium shadow-lg shadow-indigo-600/30 transition-all"
                >
                  Save Note
                </motion.button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}