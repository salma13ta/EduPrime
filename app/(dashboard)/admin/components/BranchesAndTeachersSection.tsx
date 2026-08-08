"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useApp } from "@/app/context/AppContext";
import { FiPlus, FiCode, FiUserPlus, FiFilter, FiDownload, FiCheckCircle } from "react-icons/fi";

export default function BranchesAndTeachersSection() {
  const { branches, teachers, addBranch, addTeacher, triggerQRGeneration, markAllNotificationsRead, notifications } = useApp();
  
  // حالات التحكم في النوافذ المنزلقة (Modals)
  const [isBranchModalOpen, setIsBranchModalOpen] = useState(false);
  const [isTeacherModalOpen, setIsTeacherModalOpen] = useState(false);

  // فورم إضافة فرع
  const [branchForm, setBranchForm] = useState({ name: "", location: "", revenue: "$15.0k" });
  // فورم إضافة معلم
  const [teacherForm, setTeacherForm] = useState({ name: "", subject: "" });

  const handleBranchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!branchForm.name || !branchForm.location) return;
    addBranch(branchForm);
    setBranchForm({ name: "", location: "", revenue: "$15.0k" });
    setIsBranchModalOpen(false);
  };

  const handleTeacherSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!teacherForm.name || !teacherForm.subject) return;
    addTeacher(teacherForm);
    setTeacherForm({ name: "", subject: "" });
    setIsTeacherModalOpen(false);
  };

  const handleFilterClick = () => {
    alert("🔍 Filtering active analytics and records...");
  };

  const handleDownloadClick = () => {
    alert("📥 Exporting analytics report as CSV/PDF...");
  };

  return (
    <div className="space-y-6">
        
      {/* أزرار الفلتر والتحميل (Filter & Download) */}
      <div className="flex items-center justify-end gap-2">
        <motion.button 
          onClick={handleFilterClick}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="p-2 bg-[#131b2e] hover:bg-[#1a233a] border border-gray-800 text-gray-300 rounded-xl text-xs transition cursor-pointer"
          title="Filter Data"
        >
          <FiFilter />
        </motion.button>
        <motion.button 
          onClick={handleDownloadClick}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="p-2 bg-[#131b2e] hover:bg-[#1a233a] border border-gray-800 text-gray-300 rounded-xl text-xs transition cursor-pointer"
          title="Download Report"
        >
          <FiDownload />
        </motion.button>
      </div>

      {/* Grid الفروع والمعلمين */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* قسم الفروع */}
        <div className="bg-[#131b2e] border border-gray-800 rounded-2xl p-6 shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-white">Branches Overview</h3>
            <motion.button 
              onClick={() => setIsBranchModalOpen(true)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-indigo-600/20 hover:bg-indigo-600 text-indigo-400 hover:text-white border border-indigo-500/30 px-3 py-1.5 rounded-xl text-xs font-semibold transition cursor-pointer flex items-center gap-1.5"
            >
              <FiPlus />
              <span>Add Branch</span>
            </motion.button>
          </div>
          
          <div className="space-y-3">
            {branches.map((branch) => (
              <div key={branch.id} className="bg-[#1a233a] p-4 rounded-xl border border-gray-800/80 flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-white">{branch.name}</h4>
                  <p className="text-[10px] text-gray-400">{branch.location}</p>
                  <div className="flex gap-3 mt-2 text-[10px] text-gray-300">
                    <span>{branch.students} Students</span>
                    <span>•</span>
                    <span>{branch.teachers} Teachers</span>
                  </div>
                </div>
                <span className="text-emerald-400 font-bold text-xs bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-emerald-500/20">
                  {branch.revenue}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* قسم المعلمين (Hire Teacher) */}
        <div className="bg-[#131b2e] border border-gray-800 rounded-2xl p-6 shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-white">Teachers</h3>
            <motion.button 
              onClick={() => setIsTeacherModalOpen(true)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-indigo-600/20 hover:bg-indigo-600 text-indigo-400 hover:text-white border border-indigo-500/30 px-3 py-1.5 rounded-xl text-xs font-semibold transition cursor-pointer flex items-center gap-1.5"
            >
              <FiUserPlus />
              <span>Hire Teacher</span>
            </motion.button>
          </div>

          <div className="space-y-3">
            {teachers.map((teacher) => (
              <div key={teacher.id} className="bg-[#1a233a] p-4 rounded-xl border border-gray-800/80 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-indigo-500/20 text-indigo-300 rounded-full flex items-center font-bold justify-center border border-indigo-500/30 text-xs">
                    {teacher.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">{teacher.name}</h4>
                    <p className="text-[10px] text-gray-400">{teacher.subject} • {teacher.students} students</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-amber-400 font-bold text-xs">★ {teacher.rating}</span>
                  <p className="text-[9px] text-emerald-400 capitalize">{teacher.status}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>


      {/* Modal إضافة فرع جديد */}
      <AnimatePresence>
        {isBranchModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 0.6 }} 
              exit={{ opacity: 0 }}
              onClick={() => setIsBranchModalOpen(false)}
              className="absolute inset-0 bg-black backdrop-blur-sm" 
            />
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }} 
              animate={{ scale: 1, opacity: 1 }} 
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative bg-[#131b2e] border border-gray-800 rounded-2xl p-6 w-full max-w-md shadow-2xl z-10 space-y-4"
            >
              <h3 className="text-sm font-bold text-white">Add New Branch</h3>
              <form onSubmit={handleBranchSubmit} className="space-y-3">
                <div>
                  <label className="block text-[11px] text-gray-400 mb-1">Branch Name</label>
                  <input 
                    type="text" 
                    placeholder="e.g. North Campus"
                    value={branchForm.name}
                    onChange={(e) => setBranchForm({ ...branchForm, name: e.target.value })}
                    className="w-full bg-[#1a233a] border border-gray-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-gray-400 mb-1">Location / City</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Bronx, NY"
                    value={branchForm.location}
                    onChange={(e) => setBranchForm({ ...branchForm, location: e.target.value })}
                    className="w-full bg-[#1a233a] border border-gray-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-gray-400 mb-1">Initial Revenue</label>
                  <input 
                    type="text" 
                    placeholder="e.g. $15.0k"
                    value={branchForm.revenue}
                    onChange={(e) => setBranchForm({ ...branchForm, revenue: e.target.value })}
                    className="w-full bg-[#1a233a] border border-gray-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                    required
                  />
                </div>
                <div className="flex justify-end gap-2 pt-2">
                  <button 
                    type="button" 
                    onClick={() => setIsBranchModalOpen(false)}
                    className="px-4 py-2 bg-gray-800 text-gray-300 rounded-xl text-xs hover:bg-gray-700 transition"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs hover:bg-indigo-500 transition font-semibold"
                  >
                    Save Branch
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Modal توظيف معلم جديد (Hire Teacher) */}
      <AnimatePresence>
        {isTeacherModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 0.6 }} 
              exit={{ opacity: 0 }}
              onClick={() => setIsTeacherModalOpen(false)}
              className="absolute inset-0 bg-black backdrop-blur-sm" 
            />
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }} 
              animate={{ scale: 1, opacity: 1 }} 
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative bg-[#131b2e] border border-gray-800 rounded-2xl p-6 w-full max-w-md shadow-2xl z-10 space-y-4"
            >
              <h3 className="text-sm font-bold text-white">Hire New Teacher</h3>
              <form onSubmit={handleTeacherSubmit} className="space-y-3">
                <div>
                  <label className="block text-[11px] text-gray-400 mb-1">Teacher Full Name</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Dr. Michael Scott"
                    value={teacherForm.name}
                    onChange={(e) => setTeacherForm({ ...teacherForm, name: e.target.value })}
                    className="w-full bg-[#1a233a] border border-gray-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-gray-400 mb-1">Subject Specialty</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Chemistry & Biology"
                    value={teacherForm.subject}
                    onChange={(e) => setTeacherForm({ ...teacherForm, subject: e.target.value })}
                    className="w-full bg-[#1a233a] border border-gray-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                    required
                  />
                </div>
                <div className="flex justify-end gap-2 pt-2">
                  <button 
                    type="button" 
                    onClick={() => setIsTeacherModalOpen(false)}
                    className="px-4 py-2 bg-gray-800 text-gray-300 rounded-xl text-xs hover:bg-gray-700 transition"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs hover:bg-indigo-500 transition font-semibold"
                  >
                    Confirm Hire
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}