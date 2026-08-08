"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useApp } from "@/app/context/AppContext";
import { 
  FiUsers, FiUserPlus, FiStar, FiBookOpen, FiCheckCircle, 
  FiDollarSign, FiActivity, FiSearch, FiX, FiPlus, 
  FiTrendingUp, FiBarChart2, FiCheckSquare, FiSquare 
} from "react-icons/fi";

export default function TeachersView() {
  const { teachers, setTeachers } = useApp();
  
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTeacher, setSelectedTeacher] = useState<any | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [taskTitle, setTaskTitle] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    subject: "",
    students: "45",
    engagedStudents: "38",
    revenue: "$4,200",
    rating: "4.9",
    status: "active",
  });

  const filteredTeachers = (teachers || []).filter((t: any) => 
    t.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.subject?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSaveTeacher = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.subject) return;

    const newTeacher = {
      id: Date.now(),
      name: formData.name,
      subject: formData.subject,
      students: Number(formData.students) || 40,
      engagedStudents: Number(formData.engagedStudents) || 35,
      revenue: formData.revenue || "$3,500",
      rating: Number(formData.rating) || 4.8,
      status: formData.status,
      monthlyPerformance: [
        { month: "Jan", students: 28, revenue: 2400 },
        { month: "Feb", students: 32, revenue: 2800 },
        { month: "Mar", students: 30, revenue: 2600 },
        { month: "Apr", students: 38, revenue: 3400 },
        { month: "May", students: 42, revenue: 3900 },
        { month: "Jun", students: 45, revenue: 4200 },
      ],
      tasks: [
        { id: 1, title: "Upload Course Materials & Lectures", completed: true },
        { id: 2, title: "Evaluate Student Quiz Results", completed: false },
      ],
    };

    setTeachers((prev: any) => [...prev, newTeacher]);
    setIsModalOpen(false);
    setFormData({ name: "", subject: "", students: "45", engagedStudents: "38", revenue: "$4,200", rating: "4.9", status: "active" });
  };

  const handleDeleteTeacher = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm("Are you sure you want to remove this instructor?")) {
      setTeachers((prev: any) => prev.filter((t: any) => t.id !== id));
      if (selectedTeacher?.id === id) setSelectedTeacher(null);
    }
  };

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!taskTitle || !selectedTeacher) return;

    const newTask = { id: Date.now(), title: taskTitle, completed: false };
    const updatedTasks = [...(selectedTeacher.tasks || []), newTask];
    const updatedTeacher = { ...selectedTeacher, tasks: updatedTasks };

    setSelectedTeacher(updatedTeacher);
    setTeachers((prev: any) => prev.map((t: any) => t.id === selectedTeacher.id ? updatedTeacher : t));
    setTaskTitle("");
    setIsTaskModalOpen(false);
  };

  const toggleTaskCompletion = (taskId: number) => {
    const updatedTasks = selectedTeacher.tasks.map((task: any) => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    const updatedTeacher = { ...selectedTeacher, tasks: updatedTasks };
    setSelectedTeacher(updatedTeacher);
    setTeachers((prev: any) => prev.map((t: any) => t.id === selectedTeacher.id ? updatedTeacher : t));
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
            <h2 className="text-lg font-bold text-white tracking-wide">Instructors Revenue & Engagement Hub</h2>
            <p className="text-xs text-gray-400">Track individual teacher performance, student engagement metrics, and generated revenue</p>
          </div>
        </div>

        <motion.button
          onClick={() => setIsModalOpen(true)}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-2.5 rounded-xl text-xs font-semibold shadow-lg shadow-indigo-600/30 transition flex items-center justify-center gap-2 cursor-pointer"
        >
          <FiUserPlus className="text-sm" />
          <span>Add New Instructor</span>
        </motion.button>
      </div>

      {/* Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#131b2e]/60 border border-gray-800/80 p-4 rounded-2xl">
        <div className="relative w-full sm:w-80">
          <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
          <input 
            type="text"
            placeholder="Search instructor name or subject..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#1a233a] border border-gray-800 rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 transition shadow-inner"
          />
        </div>
        <div className="text-xs text-gray-400 font-medium">
          Total Instructors: <span className="text-indigo-400 font-bold">{filteredTeachers.length}</span>
        </div>
      </div>

      {/* Teachers Cards Grid */}
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { staggerChildren: 0.08 } }
        }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {filteredTeachers.map((teacher: any) => {
          const totalStud = teacher.students || 40;
          const engagedStud = teacher.engagedStudents || Math.round(totalStud * 0.85);
          const engagementRate = Math.round((engagedStud / totalStud) * 100);

          return (
            <motion.div
              key={teacher.id}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 }
              }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              onClick={() => setSelectedTeacher({ ...teacher, engagedStudents: engagedStud })}
              className="bg-[#131b2e] border border-gray-800/90 rounded-2xl p-6 shadow-xl flex flex-col justify-between group cursor-pointer relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full blur-2xl group-hover:bg-indigo-500/10 transition duration-500 pointer-events-none" />

              <div>
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 bg-indigo-600/20 text-indigo-300 rounded-full flex items-center font-bold justify-center border border-indigo-500/30 text-sm shadow-inner">
                      {teacher.name?.charAt(0) || "T"}
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-white group-hover:text-indigo-300 transition">{teacher.name}</h3>
                      <p className="text-[11px] text-gray-400">{teacher.subject}</p>
                    </div>
                  </div>

                  <button 
                    onClick={(e) => handleDeleteTeacher(teacher.id, e)}
                    className="p-1.5 text-gray-400 hover:text-red-400 transition rounded-lg hover:bg-gray-800 cursor-pointer"
                    title="Remove Teacher"
                  >
                    <FiX className="text-xs" />
                  </button>
                </div>

                {/* Engagement Bar */}
                <div className="mb-4 bg-[#1a233a]/60 p-3 rounded-xl border border-gray-800">
                  <div className="flex justify-between text-[11px] mb-1.5">
                    <span className="text-gray-400">Student Engagement</span>
                    <span className="text-emerald-400 font-bold">{engagementRate}% ({engagedStud}/{totalStud})</span>
                  </div>
                  <div className="w-full bg-gray-800 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-emerald-500 h-full rounded-full transition-all duration-500" style={{ width: `${engagementRate}%` }} />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 py-3 border-y border-gray-800/80 mb-4 bg-[#1a233a]/40 px-3 rounded-xl">
                  <div className="flex items-center gap-2">
                    <FiUsers className="text-indigo-400 text-xs" />
                    <div>
                      <h4 className="text-xs font-bold text-white">{totalStud} Enrolled</h4>
                      <p className="text-[10px] text-gray-400">Total Students</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <FiDollarSign className="text-emerald-400 text-xs" />
                    <div>
                      <h4 className="text-xs font-bold text-emerald-400">{teacher.revenue || "$3,800"}</h4>
                      <p className="text-[10px] text-gray-400">Revenue</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <span className="text-[10px] font-semibold px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 flex items-center gap-1">
                  <FiStar className="text-xs" /> {teacher.rating || 4.9}
                </span>
                <span className="text-xs text-indigo-400 font-semibold group-hover:underline flex items-center gap-1">
                  View Analytics & Work →
                </span>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Individual Teacher Deep Analytics Modal (Chart, Students, Revenue, Tasks) */}
      <AnimatePresence>
        {selectedTeacher && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 0.6 }} 
              exit={{ opacity: 0 }}
              onClick={() => setSelectedTeacher(null)}
              className="absolute inset-0 bg-black backdrop-blur-sm" 
            />
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 15 }} 
              animate={{ scale: 1, opacity: 1, y: 0 }} 
              exit={{ scale: 0.95, opacity: 0, y: 15 }}
              className="relative bg-[#131b2e] border border-gray-800 rounded-2xl p-6 sm:p-8 w-full max-w-2xl shadow-2xl z-10 space-y-6 max-h-[95vh] overflow-y-auto custom-scrollbar"
            >
              <div className="flex items-center justify-between pb-4 border-b border-gray-800">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-indigo-600 text-white rounded-2xl flex items-center justify-center font-bold text-lg shadow-lg shadow-indigo-600/30">
                    {selectedTeacher.name?.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">{selectedTeacher.name}</h3>
                    <p className="text-xs text-indigo-400">{selectedTeacher.subject} Department • Performance & Revenue Profile</p>
                  </div>
                </div>
                <button 
                  onClick={() => setSelectedTeacher(null)}
                  className="text-gray-400 hover:text-white p-1.5 rounded-lg bg-[#1a233a] border border-gray-800 cursor-pointer"
                >
                  <FiX className="text-base" />
                </button>
              </div>

              {/* Quick Metrics Grid */}
              <div className="grid grid-cols-4 gap-3">
                <div className="bg-[#1a233a] p-3 rounded-xl border border-gray-800 text-center">
                  <p className="text-[10px] text-gray-400">Total Students</p>
                  <h4 className="text-sm font-bold text-white mt-1">{selectedTeacher.students}</h4>
                </div>
                <div className="bg-[#1a233a] p-3 rounded-xl border border-gray-800 text-center">
                  <p className="text-[10px] text-gray-400">Active / Engaged</p>
                  <h4 className="text-sm font-bold text-emerald-400 mt-1">{selectedTeacher.engagedStudents}</h4>
                </div>
                <div className="bg-[#1a233a] p-3 rounded-xl border border-gray-800 text-center">
                  <p className="text-[10px] text-gray-400">Revenue</p>
                  <h4 className="text-sm font-bold text-indigo-400 mt-1">{selectedTeacher.revenue}</h4>
                </div>
                <div className="bg-[#1a233a] p-3 rounded-xl border border-gray-800 text-center">
                  <p className="text-[10px] text-gray-400">Rating</p>
                  <h4 className="text-sm font-bold text-amber-400 mt-1">★ {selectedTeacher.rating}</h4>
                </div>
              </div>

              {/* Mini Chart simulation like the user requested */}
              <div className="bg-[#1a233a]/60 border border-gray-800 p-5 rounded-2xl space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-bold text-white flex items-center gap-2">
                      <FiBarChart2 className="text-indigo-400" /> Monthly Growth & Revenue Simulation
                    </h4>
                    <p className="text-[10px] text-gray-400">Performance tracking over the last 6 months</p>
                  </div>
                  <span className="text-[10px] bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-2 py-1 rounded-md">Live Data</span>
                </div>

                <div className="grid grid-cols-6 gap-2 pt-4 items-end h-32 border-b border-gray-800 pb-2">
                  {(selectedTeacher.monthlyPerformance || [
                    { month: "Jan", revenue: 2000 },
                    { month: "Feb", revenue: 2300 },
                    { month: "Mar", revenue: 2600 },
                    { month: "Apr", revenue: 3100 },
                    { month: "May", revenue: 3600 },
                    { month: "Jun", revenue: 4200 },
                  ]).map((item: any, idx: number) => {
                    const heightPercent = Math.min(100, Math.max(30, (item.revenue / 5000) * 100));
                    return (
                      <div key={idx} className="flex flex-col items-center gap-1.5 h-full justify-end">
                        <div className="w-full bg-indigo-600/80 hover:bg-indigo-500 rounded-t-md transition-all duration-300 relative group" style={{ height: `${heightPercent}%` }}>
                          <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-black/90 text-white text-[9px] px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap z-20">
                            ${item.revenue}
                          </div>
                        </div>
                        <span className="text-[10px] text-gray-400">{item.month}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Tasks & Work Management */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-white tracking-wide uppercase flex items-center gap-1.5">
                    <FiCheckSquare className="text-indigo-400" /> Instructor Tasks & Work Log
                  </h4>
                  <button 
                    onClick={() => setIsTaskModalOpen(true)}
                    className="text-[11px] font-semibold text-indigo-400 hover:text-indigo-300 bg-indigo-600/10 px-3 py-1.5 rounded-xl border border-indigo-500/20 transition flex items-center gap-1 cursor-pointer"
                  >
                    <FiPlus /> Add Task
                  </button>
                </div>

                <div className="space-y-2">
                  {selectedTeacher.tasks && selectedTeacher.tasks.length > 0 ? (
                    selectedTeacher.tasks.map((task: any) => (
                      <div 
                        key={task.id} 
                        onClick={() => toggleTaskCompletion(task.id)}
                        className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition ${
                          task.completed 
                            ? "bg-emerald-950/20 border-emerald-500/30 text-emerald-300" 
                            : "bg-[#1a233a] border-gray-800 text-gray-200"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-base text-indigo-400">
                            {task.completed ? <FiCheckCircle className="text-emerald-400" /> : <FiSquare className="text-gray-500" />}
                          </span>
                          <span className={`text-xs font-medium ${task.completed ? "line-through text-gray-400" : ""}`}>
                            {task.title}
                          </span>
                        </div>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${task.completed ? "bg-emerald-500/10 text-emerald-400" : "bg-gray-800 text-gray-400"}`}>
                          {task.completed ? "Done" : "Pending"}
                        </span>
                      </div>
                    ))
                  ) : (
                    <p className="text-xs text-gray-500 text-center py-4">No tasks assigned to this instructor yet.</p>
                  )}
                </div>
              </div>

              <div className="pt-4 flex justify-end border-t border-gray-800">
                <button 
                  onClick={() => setSelectedTeacher(null)}
                  className="px-5 py-2.5 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-xl text-xs font-semibold transition cursor-pointer"
                >
                  Close Analytics
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Modal إضافة معلم جديد */}
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
              className="relative bg-[#131b2e] border border-gray-800 rounded-2xl p-6 sm:p-8 w-full max-w-md shadow-2xl z-10 space-y-6"
            >
              <div className="flex items-center justify-between pb-4 border-b border-gray-800">
                <div>
                  <h3 className="text-base font-bold text-white">Add New Instructor</h3>
                  <p className="text-xs text-gray-400">Register instructor details, student capacity & revenue</p>
                </div>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="text-gray-400 hover:text-white p-1.5 rounded-lg bg-[#1a233a] border border-gray-800 cursor-pointer"
                >
                  <FiX className="text-base" />
                </button>
              </div>

              <form onSubmit={handleSaveTeacher} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1.5">Instructor Name</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Dr. Michael Vance"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-[#1a233a] border border-gray-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1.5">Subject / Department</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Artificial Intelligence"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full bg-[#1a233a] border border-gray-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1.5">Total Students</label>
                    <input 
                      type="number" 
                      placeholder="45"
                      value={formData.students}
                      onChange={(e) => setFormData({ ...formData, students: e.target.value })}
                      className="w-full bg-[#1a233a] border border-gray-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1.5">Engaged Students</label>
                    <input 
                      type="number" 
                      placeholder="38"
                      value={formData.engagedStudents}
                      onChange={(e) => setFormData({ ...formData, engagedStudents: e.target.value })}
                      className="w-full bg-[#1a233a] border border-gray-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1.5">Monthly Revenue</label>
                    <input 
                      type="text" 
                      placeholder="$4,200"
                      value={formData.revenue}
                      onChange={(e) => setFormData({ ...formData, revenue: e.target.value })}
                      className="w-full bg-[#1a233a] border border-gray-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1.5">Rating</label>
                    <input 
                      type="number" 
                      step="0.1"
                      max="5"
                      placeholder="4.9"
                      value={formData.rating}
                      onChange={(e) => setFormData({ ...formData, rating: e.target.value })}
                      className="w-full bg-[#1a233a] border border-gray-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500"
                    />
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
                    Save Instructor
                  </motion.button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Modal إضافة مهمة */}
      <AnimatePresence>
        {isTaskModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 0.6 }} 
              exit={{ opacity: 0 }}
              onClick={() => setIsTaskModalOpen(false)}
              className="absolute inset-0 bg-black backdrop-blur-sm" 
            />
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }} 
              animate={{ scale: 1, opacity: 1 }} 
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative bg-[#131b2e] border border-gray-800 rounded-2xl p-6 w-full max-w-sm shadow-2xl z-10 space-y-4"
            >
              <h3 className="text-sm font-bold text-white">Assign Task</h3>
              <form onSubmit={handleAddTask} className="space-y-3">
                <div>
                  <label className="block text-[11px] text-gray-400 mb-1">Task Details</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Prepare Monthly Progress Sheet"
                    value={taskTitle}
                    onChange={(e) => setTaskTitle(e.target.value)}
                    className="w-full bg-[#1a233a] border border-gray-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                    required
                  />
                </div>
                <div className="flex justify-end gap-2 pt-2">
                  <button 
                    type="button" 
                    onClick={() => setIsTaskModalOpen(false)}
                    className="px-4 py-2 bg-gray-800 text-gray-300 rounded-xl text-xs hover:bg-gray-700 transition cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs hover:bg-indigo-500 transition font-semibold cursor-pointer"
                  >
                    Assign
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}