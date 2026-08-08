"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useApp } from "@/app/context/AppContext";
import { 
  FiUsers, FiUserPlus, FiAward, FiDollarSign, 
  FiCreditCard, FiBookOpen, FiSearch, FiX, FiCheckCircle, 
  FiAlertCircle, FiActivity, FiUser 
} from "react-icons/fi";

export default function CenterStudentsView() {
  const context = useApp() as any;

  const [localStudents, setLocalStudents] = useState([
    {
      id: 1,
      name: "Youssef Ahmed",
      email: "youssef@student.com",
      level: "Advanced (الثانوية العامة)",
      teachers: ["Dr. John Doe (Math)", "Prof. Sarah Smith (Physics)"],
      paymentStatus: "Paid",
      paymentMethod: "Credit Card",
      tuitionFee: "$500",
      performance: "95%"
    },
    {
      id: 2,
      name: "Mariam Khaled",
      email: "mariam@student.com",
      level: "Intermediate (الصف الثاني الثانوي)",
      teachers: ["Dr. John Doe (Math)"],
      paymentStatus: "Pending",
      paymentMethod: "Cash / Instapay",
      tuitionFee: "$350",
      performance: "88%"
    },
    {
      id: 3,
      name: "Omar Zizo",
      email: "omar@student.com",
      level: "Beginner (الصف الأول الثانوي)",
      teachers: ["Prof. Sarah Smith (Physics)", "Dr. Michael Vance (Chemistry)"],
      paymentStatus: "Paid",
      paymentMethod: "Bank Transfer",
      tuitionFee: "$400",
      performance: "91%"
    }
  ]);

  const students = context?.students?.length > 0 ? context.students : localStudents;
  const setStudents = context?.setStudents || setLocalStudents;

  const teachers = context?.teachers || [
    { id: 1, name: "Dr. John Doe", subject: "Mathematics" },
    { id: 2, name: "Prof. Sarah Smith", subject: "Physics" },
    { id: 3, name: "Dr. Michael Vance", subject: "Chemistry" }
  ];

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStudent, setSelectedStudent] = useState<any | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    level: "Intermediate",
    paymentStatus: "Paid",
    paymentMethod: "Credit Card",
    tuitionFee: "$450",
    selectedTeacherIds: [] as string[],
  });

  const filteredStudents = (students || []).filter((s: any) => 
    s.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.level?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleTeacherToggle = (teacherLabel: string) => {
    setFormData(prev => {
      const exists = prev.selectedTeacherIds.includes(teacherLabel);
      if (exists) {
        return { ...prev, selectedTeacherIds: prev.selectedTeacherIds.filter(t => t !== teacherLabel) };
      } else {
        return { ...prev, selectedTeacherIds: [...prev.selectedTeacherIds, teacherLabel] };
      }
    });
  };

  const handleSaveStudent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;

    const newStudent = {
      id: Date.now(),
      name: formData.name,
      email: formData.email,
      level: formData.level,
      teachers: formData.selectedTeacherIds.length > 0 ? formData.selectedTeacherIds : ["Dr. John Doe (Math)"],
      paymentStatus: formData.paymentStatus,
      paymentMethod: formData.paymentMethod,
      tuitionFee: formData.tuitionFee,
      performance: "92%",
    };

    setStudents((prev: any[]) => [...prev, newStudent]);
    setIsModalOpen(false);
    setFormData({
      name: "",
      email: "",
      level: "Intermediate",
      paymentStatus: "Paid",
      paymentMethod: "Credit Card",
      tuitionFee: "$450",
      selectedTeacherIds: [],
    });
  };

  const handleDeleteStudent = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm("Are you sure you want to remove this student from the center?")) {
      setStudents((prev: any[]) => prev.filter((s: any) => s.id !== id));
      if (selectedStudent?.id === id) setSelectedStudent(null);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6 max-w-7xl mx-auto pb-12"
    >
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-[#131b2e] border border-gray-800 p-6 rounded-2xl shadow-xl">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-indigo-600/20 border border-indigo-500/30 text-indigo-400 rounded-2xl flex items-center justify-center text-xl shadow-inner">
            <FiUsers />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white tracking-wide">Center Students & Subscriptions</h2>
            <p className="text-xs text-gray-400">Detailed tracking of student levels, payments, methods, and assigned center teachers</p>
          </div>
        </div>

        <motion.button
          onClick={() => setIsModalOpen(true)}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-2.5 rounded-xl text-xs font-semibold shadow-lg shadow-indigo-600/30 transition flex items-center justify-center gap-2 cursor-pointer"
        >
          <FiUserPlus className="text-sm" />
          <span>Register New Student</span>
        </motion.button>
      </div>

      {/* Analytics Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-[#131b2e] border border-gray-800 p-5 rounded-2xl shadow-md flex items-center justify-between">
          <div>
            <p className="text-[11px] text-gray-400 font-medium">Total Center Students</p>
            <h3 className="text-xl font-bold text-white mt-1">{students.length} Students</h3>
          </div>
          <div className="p-3 bg-indigo-600/10 text-indigo-400 rounded-xl border border-indigo-500/20">
            <FiActivity className="text-lg" />
          </div>
        </div>

        <div className="bg-[#131b2e] border border-gray-800 p-5 rounded-2xl shadow-md flex items-center justify-between">
          <div>
            <p className="text-[11px] text-gray-400 font-medium">Completed Payments</p>
            <h3 className="text-xl font-bold text-emerald-400 mt-1">
              {students.filter((s: any) => s.paymentStatus === "Paid" || s.paymentStatus === "Completed").length} Paid
            </h3>
          </div>
          <div className="p-3 bg-emerald-600/10 text-emerald-400 rounded-xl border border-emerald-500/20">
            <FiCheckCircle className="text-lg" />
          </div>
        </div>

        <div className="bg-[#131b2e] border border-gray-800 p-5 rounded-2xl shadow-md flex items-center justify-between">
          <div>
            <p className="text-[11px] text-gray-400 font-medium">Pending Payments</p>
            <h3 className="text-xl font-bold text-amber-400 mt-1">
              {students.filter((s: any) => s.paymentStatus === "Pending").length} Pending
            </h3>
          </div>
          <div className="p-3 bg-amber-600/10 text-amber-400 rounded-xl border border-amber-500/20">
            <FiAlertCircle className="text-lg" />
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#131b2e]/60 border border-gray-800/80 p-4 rounded-2xl">
        <div className="relative w-full sm:w-80">
          <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
          <input 
            type="text"
            placeholder="Search by name, email, or level..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#1a233a] border border-gray-800 rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 transition shadow-inner"
          />
        </div>
        <div className="text-xs text-gray-400 font-medium">
          Showing <span className="text-indigo-400 font-bold">{filteredStudents.length}</span> of students
        </div>
      </div>

      {/* Students Cards Grid */}
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { staggerChildren: 0.08 } }
        }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {filteredStudents.map((student: any) => {
          const isPaid = student.paymentStatus === "Paid" || student.paymentStatus === "Completed";
          const studentTeachers = student.teachers || ["Dr. John Doe"];

          return (
            <motion.div
              key={student.id}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 }
              }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              onClick={() => setSelectedStudent(student)}
              className="bg-[#131b2e] border border-gray-800/90 rounded-2xl p-6 shadow-xl flex flex-col justify-between group cursor-pointer relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full blur-2xl group-hover:bg-indigo-500/10 transition duration-500 pointer-events-none" />

              <div>
                {/* Top Info */}
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 bg-indigo-600/20 text-indigo-300 rounded-full flex items-center font-bold justify-center border border-indigo-500/30 text-sm shadow-inner">
                      {student.name?.charAt(0) || "S"}
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-white group-hover:text-indigo-300 transition">{student.name}</h3>
                      <p className="text-[11px] text-gray-400">{student.email || "student@academy.com"}</p>
                    </div>
                  </div>

                  <button 
                    onClick={(e) => handleDeleteStudent(student.id, e)}
                    className="p-1.5 text-gray-400 hover:text-red-400 transition rounded-lg hover:bg-gray-800 cursor-pointer"
                    title="Delete Student"
                  >
                    <FiX className="text-xs" />
                  </button>
                </div>

                {/* Level & Fee Bar */}
                <div className="grid grid-cols-2 gap-3 mb-3 bg-[#1a233a]/60 p-3 rounded-xl border border-gray-800">
                  <div className="flex items-center gap-2">
                    <FiAward className="text-indigo-400 text-xs" />
                    <div>
                      <h4 className="text-xs font-bold text-white truncate max-w-[120px]">{student.level || "Intermediate"}</h4>
                      <p className="text-[10px] text-gray-400">Academic Level</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <FiDollarSign className="text-emerald-400 text-xs" />
                    <div>
                      <h4 className="text-xs font-bold text-emerald-400">{student.tuitionFee || "$450"}</h4>
                      <p className="text-[10px] text-gray-400">Tuition Fee</p>
                    </div>
                  </div>
                </div>

                {/* Assigned Teachers List */}
                <div className="mb-4 bg-[#1a233a]/40 p-3 rounded-xl border border-gray-800/80">
                  <span className="text-[10px] text-gray-400 block mb-1.5">Enrolled Center Teachers ({studentTeachers.length}):</span>
                  <div className="flex flex-wrap gap-1.5">
                    {studentTeachers.map((tName: string, idx: number) => (
                      <span key={idx} className="text-[10px] bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 px-2 py-0.5 rounded-md flex items-center gap-1">
                        <FiUser className="text-[9px]" /> {tName}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Payment Method */}
                <div className="flex items-center justify-between py-2.5 border-t border-gray-800/80 mb-2 px-1">
                  <span className="text-[11px] text-gray-400 flex items-center gap-1.5">
                    <FiCreditCard className="text-amber-400" /> Payment Method:
                  </span>
                  <span className="text-xs text-white font-medium">{student.paymentMethod || "Credit Card"}</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <span className={`text-[10px] font-semibold px-2.5 py-1 rounded-full border flex items-center gap-1 ${
                  isPaid 
                    ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" 
                    : "bg-amber-500/10 text-amber-400 border-amber-500/20"
                }`}>
                  {isPaid ? <FiCheckCircle /> : <FiAlertCircle />} {student.paymentStatus || "Paid"}
                </span>
                <span className="text-xs text-indigo-400 font-semibold group-hover:underline">
                  View Full Profile &rarr;
                </span>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Detailed Student Modal */}
      <AnimatePresence>
        {selectedStudent && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 0.6 }} 
              exit={{ opacity: 0 }}
              onClick={() => setSelectedStudent(null)}
              className="absolute inset-0 bg-black backdrop-blur-sm" 
            />
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 15 }} 
              animate={{ scale: 1, opacity: 1, y: 0 }} 
              exit={{ scale: 0.95, opacity: 0, y: 15 }}
              className="relative bg-[#131b2e] border border-gray-800 rounded-2xl p-6 sm:p-8 w-full max-w-lg shadow-2xl z-10 space-y-6 max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between pb-4 border-b border-gray-800">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-indigo-600 text-white rounded-2xl flex items-center justify-center font-bold text-lg shadow-lg">
                    {selectedStudent.name?.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">{selectedStudent.name}</h3>
                    <p className="text-xs text-indigo-400">{selectedStudent.email}</p>
                  </div>
                </div>
                <button 
                  onClick={() => setSelectedStudent(null)}
                  className="text-gray-400 hover:text-white p-1.5 rounded-lg bg-[#1a233a] border border-gray-800 cursor-pointer"
                >
                  <FiX className="text-base" />
                </button>
              </div>

              {/* Stats Overview */}
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-[#1a233a] p-3 rounded-xl border border-gray-800 text-center">
                  <p className="text-[10px] text-gray-400">Level</p>
                  <h4 className="text-xs font-bold text-white mt-1 truncate">{selectedStudent.level}</h4>
                </div>
                <div className="bg-[#1a233a] p-3 rounded-xl border border-gray-800 text-center">
                  <p className="text-[10px] text-gray-400">Tuition Fee</p>
                  <h4 className="text-xs font-bold text-emerald-400 mt-1">{selectedStudent.tuitionFee}</h4>
                </div>
                <div className="bg-[#1a233a] p-3 rounded-xl border border-gray-800 text-center">
                  <p className="text-[10px] text-gray-400">Performance</p>
                  <h4 className="text-xs font-bold text-amber-400 mt-1">{selectedStudent.performance || "92%"}</h4>
                </div>
              </div>

              {/* Payment Method Details */}
              <div className="bg-[#1a233a]/60 border border-gray-800 p-4 rounded-xl space-y-2">
                <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <FiCreditCard className="text-indigo-400" /> Payment & Subscription Details
                </h4>
                <div className="flex justify-between text-xs py-1">
                  <span className="text-gray-400">Payment Status:</span>
                  <span className="text-emerald-400 font-bold">{selectedStudent.paymentStatus}</span>
                </div>
                <div className="flex justify-between text-xs py-1 border-t border-gray-800">
                  <span className="text-gray-400">Payment Method:</span>
                  <span className="text-white font-medium">{selectedStudent.paymentMethod}</span>
                </div>
              </div>

              {/* Assigned Teachers */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <FiBookOpen className="text-indigo-400" /> Center Teachers Enrolled ({selectedStudent.teachers?.length || 0})
                </h4>
                <div className="space-y-2">
                  {(selectedStudent.teachers || []).map((teacherName: string, idx: number) => (
                    <div key={idx} className="bg-[#1a233a] border border-gray-800 p-3 rounded-xl flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-indigo-600/20 text-indigo-300 flex items-center justify-center font-bold text-xs border border-indigo-500/30">
                          {teacherName.charAt(0)}
                        </div>
                        <div>
                          <h5 className="font-bold text-white">{teacherName}</h5>
                          <p className="text-[10px] text-gray-400">Certified Center Teacher</p>
                        </div>
                      </div>
                      <span className="text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-1 rounded-md font-semibold">
                        Active
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 flex justify-end border-t border-gray-800">
                <button 
                  onClick={() => setSelectedStudent(null)}
                  className="px-5 py-2.5 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-xl text-xs font-semibold transition cursor-pointer"
                >
                  Close Profile
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Modal: Register New Student */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 0.6 }} 
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-black backdrop-blur-sm" 
            />
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 15 }} 
              animate={{ scale: 1, opacity: 1, y: 0 }} 
              exit={{ scale: 0.95, opacity: 0, y: 15 }}
              className="relative bg-[#131b2e] border border-gray-800 rounded-2xl p-6 sm:p-8 w-full max-w-md shadow-2xl z-10 space-y-5 max-h-[95vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between pb-4 border-b border-gray-800">
                <div>
                  <h3 className="text-base font-bold text-white">Register New Student</h3>
                  <p className="text-xs text-gray-400">Link student to center teachers, set level and payment method</p>
                </div>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="text-gray-400 hover:text-white p-1.5 rounded-lg bg-[#1a233a] border border-gray-800 cursor-pointer"
                >
                  <FiX className="text-base" />
                </button>
              </div>

              <form onSubmit={handleSaveStudent} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1.5">Full Name</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Youssef Ahmed"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-[#1a233a] border border-gray-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1.5">Email Address</label>
                  <input 
                    type="email" 
                    placeholder="student@academy.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-[#1a233a] border border-gray-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1.5">Academic Level</label>
                    <select
                      value={formData.level}
                      onChange={(e) => setFormData({ ...formData, level: e.target.value })}
                      className="w-full bg-[#1a233a] border border-gray-800 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500"
                    >
                      <option value="Beginner (Grade 10)">Beginner (Grade 10)</option>
                      <option value="Intermediate (Grade 11)">Intermediate (Grade 11)</option>
                      <option value="Advanced (Grade 12)">Advanced (Grade 12)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1.5">Tuition Fee</label>
                    <input 
                      type="text" 
                      placeholder="$450"
                      value={formData.tuitionFee}
                      onChange={(e) => setFormData({ ...formData, tuitionFee: e.target.value })}
                      className="w-full bg-[#1a233a] border border-gray-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1.5">Payment Method</label>
                    <select
                      value={formData.paymentMethod}
                      onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                      className="w-full bg-[#1a233a] border border-gray-800 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500"
                    >
                      <option value="Credit Card">Credit Card</option>
                      <option value="PayPal">PayPal</option>
                      <option value="Bank Transfer">Bank Transfer</option>
                      <option value="Cash / Instapay">Cash / Instapay</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1.5">Payment Status</label>
                    <select
                      value={formData.paymentStatus}
                      onChange={(e) => setFormData({ ...formData, paymentStatus: e.target.value })}
                      className="w-full bg-[#1a233a] border border-gray-800 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500"
                    >
                      <option value="Paid">Paid</option>
                      <option value="Pending">Pending</option>
                    </select>
                  </div>
                </div>

                {/* Select Teachers Selection */}
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-2">Select Center Teachers for Student:</label>
                  <div className="space-y-1.5 max-h-36 overflow-y-auto bg-[#1a233a] p-3 rounded-xl border border-gray-800">
                    {teachers.map((t: any) => {
                      const teacherLabel = `${t.name} (${t.subject})`;
                      const isSelected = formData.selectedTeacherIds.includes(teacherLabel);
                      return (
                        <div 
                          key={t.id || t.name}
                          onClick={() => handleTeacherToggle(teacherLabel)}
                          className={`flex items-center justify-between p-2 rounded-lg cursor-pointer text-xs transition ${
                            isSelected ? "bg-indigo-600/20 border border-indigo-500/40 text-white" : "hover:bg-gray-800/50 text-gray-300"
                          }`}
                        >
                          <span>{t.name} <span className="text-[10px] text-gray-400">({t.subject})</span></span>
                          <span className={`w-4 h-4 rounded flex items-center justify-center text-[10px] border ${
                            isSelected ? "bg-indigo-600 border-indigo-500 text-white" : "border-gray-600"
                          }`}>
                            {isSelected ? "✓" : ""}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="pt-4 flex justify-end gap-3 border-t border-gray-800">
                  <button 
                    type="button" 
                    onClick={() => setIsModalOpen(false)}
                    className="px-5 py-2.5 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-xl text-xs font-semibold transition cursor-pointer"
                  >
                    Cancel
                  </button>
                  <motion.button 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold shadow-lg shadow-indigo-600/30 transition cursor-pointer"
                  >
                    Save Student
                  </motion.button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}