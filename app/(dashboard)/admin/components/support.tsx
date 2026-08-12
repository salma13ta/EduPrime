"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FiUsers, 
  FiUserPlus, 
  FiSearch, 
  FiPhone, 
  FiBook, 
  FiPercent, 
  FiLayers, 
  FiCheckCircle, 
  FiX, 
  FiFileText 
} from "react-icons/fi";

interface Student {
  id: number;
  name: string;
  phone: string;
  parentPhone: string;
  group: string;
  documentsVerified: boolean;
}

interface Teacher {
  id: number;
  name: string;
  subject: string;
  schedule: string;
  compensationType: "Percentage (60%)" | "Fixed Salary";
}

const initialStudents: Student[] = [
  { id: 1, name: "Youssef Ahmed", phone: "01012345678", parentPhone: "01298765432", group: "Math - Group A", documentsVerified: true },
  { id: 2, name: "Mariam Ali", phone: "01123456789", parentPhone: "01587654321", group: "Physics - Group B", documentsVerified: false }
];

const initialTeachers: Teacher[] = [
  { id: 1, name: "Dr. Khaled Mohamed", subject: "Mathematics", schedule: "Mon, Wed (4-6 PM)", compensationType: "Percentage (60%)" },
  { id: 2, name: "Eng. Sara Hassan", subject: "Physics", schedule: "Tue, Thu (2-4 PM)", compensationType: "Fixed Salary" }
];

export default function AdminSubscribersHub() {
  const [activeTab, setActiveTab] = useState<"students" | "teachers" | "groups">("students");
  const [searchQuery, setSearchQuery] = useState("");
  const [students, setStudents] = useState<Student[]>(initialStudents);
  const [teachers, setTeachers] = useState<Teacher[]>(initialTeachers);
  
  // Modal states
  const [showAddStudentModal, setShowAddStudentModal] = useState(false);
  const [newStudentName, setNewStudentName] = useState("");
  const [newStudentPhone, setNewStudentPhone] = useState("");
  const [newParentPhone, setNewParentPhone] = useState("");
  const [newStudentGroup, setNewStudentGroup] = useState("Math - Group A");

  const filteredStudents = students.filter(s => s.name.toLowerCase().includes(searchQuery.toLowerCase()) || s.group.toLowerCase().includes(searchQuery.toLowerCase()));
  const filteredTeachers = teachers.filter(t => t.name.toLowerCase().includes(searchQuery.toLowerCase()) || t.subject.toLowerCase().includes(searchQuery.toLowerCase()));

  const handleAddStudent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStudentName) return;

    const newEntry: Student = {
      id: Date.now(),
      name: newStudentName,
      phone: newStudentPhone || "N/A",
      parentPhone: newParentPhone || "N/A",
      group: newStudentGroup,
      documentsVerified: true
    };

    setStudents([newEntry, ...students]);
    setShowAddStudentModal(false);
    setNewStudentName("");
    setNewStudentPhone("");
    setNewParentPhone("");
  };

  return (
    <div className="p-4 md:p-8 space-y-8 bg-[#090a0f] min-h-screen text-slate-100" dir="ltr">
      
      {/* Header section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-gradient-to-r from-slate-900 via-[#131620] to-[#181b25] p-6 md:p-8 rounded-3xl border border-slate-800 shadow-2xl">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs font-semibold border border-blue-500/20 mb-2">
            <FiUsers /> Admin Control Hub & Subscribers
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">Subscribers & Academic Profiles</h1>
          <p className="text-sm text-slate-400 mt-1">Manage student dossiers, teacher contracts, and group links seamlessly.</p>
        </div>

        <motion.button 
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setShowAddStudentModal(true)}
          className="flex items-center gap-2 px-5 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl text-sm font-semibold shadow-lg shadow-indigo-600/30 transition-all"
        >
          <FiUserPlus size={18} /> Add New Student
        </motion.button>
      </div>

      {/* Navigation Tabs */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-[#131620] p-4 rounded-2xl border border-slate-800/80">
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button
            onClick={() => setActiveTab("students")}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === "students" ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30' : 'bg-[#1b1f2e] text-slate-400 hover:text-white'
            }`}
          >
            Students Dossiers ({students.length})
          </button>
          <button
            onClick={() => setActiveTab("teachers")}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === "teachers" ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30' : 'bg-[#1b1f2e] text-slate-400 hover:text-white'
            }`}
          >
            Teachers Profiles ({teachers.length})
          </button>
          <button
            onClick={() => setActiveTab("groups")}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === "groups" ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30' : 'bg-[#1b1f2e] text-slate-400 hover:text-white'
            }`}
          >
            Group Links Matrix
          </button>
        </div>

        <div className="relative w-full sm:w-72">
          <FiSearch className="absolute left-3.5 top-3 text-slate-400 text-sm" />
          <input 
            type="text" 
            placeholder="Search records..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 text-xs bg-[#1b1f2e] border border-slate-700/60 text-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-slate-400"
          />
        </div>
      </div>

      {/* Content based on active tab */}
      <AnimatePresence mode="wait">
        {activeTab === "students" && (
          <motion.div 
            key="students"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredStudents.map((st) => (
              <div key={st.id} className="bg-[#131620] border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-indigo-500/10 text-indigo-400 rounded-2xl flex items-center justify-center font-bold text-lg border border-indigo-500/20">
                      {st.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="font-bold text-white text-base">{st.name}</h3>
                      <span className="text-xs text-indigo-400 font-medium">{st.group}</span>
                    </div>
                  </div>
                  <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-xl text-[10px] font-semibold ${
                    st.documentsVerified ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-amber-500/10 text-amber-400'
                  }`}>
                    <FiFileText size={10} /> {st.documentsVerified ? "Docs Verified" : "Pending Docs"}
                  </span>
                </div>

                <div className="bg-[#181c2b] p-3.5 rounded-2xl space-y-2 border border-slate-800/50 text-xs">
                  <div className="flex items-center justify-between text-slate-300">
                    <span className="text-slate-400 flex items-center gap-1.5"><FiPhone size={12} /> Student Phone</span>
                    <span className="font-mono">{st.phone}</span>
                  </div>
                  <div className="flex items-center justify-between text-slate-300">
                    <span className="text-slate-400 flex items-center gap-1.5"><FiPhone size={12} /> Parent Phone</span>
                    <span className="font-mono">{st.parentPhone}</span>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        )}

        {activeTab === "teachers" && (
          <motion.div 
            key="teachers"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredTeachers.map((tc) => (
              <div key={tc.id} className="bg-[#131620] border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-violet-500/10 text-violet-400 rounded-2xl flex items-center justify-center font-bold text-lg border border-violet-500/20">
                      {tc.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="font-bold text-white text-base">{tc.name}</h3>
                      <span className="text-xs text-slate-400 flex items-center gap-1"><FiBook size={12} /> {tc.subject}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-[#181c2b] p-3.5 rounded-2xl space-y-2 border border-slate-800/50 text-xs">
                  <div className="flex items-center justify-between text-slate-300">
                    <span className="text-slate-400">Available Schedule</span>
                    <span className="font-medium text-slate-200">{tc.schedule}</span>
                  </div>
                  <div className="flex items-center justify-between text-slate-300">
                    <span className="text-slate-400">Compensation Model</span>
                    <span className="font-semibold text-emerald-400 flex items-center gap-1"><FiPercent size={11} /> {tc.compensationType}</span>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        )}

        {activeTab === "groups" && (
          <motion.div 
            key="groups"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="bg-[#131620] border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4"
          >
            <h2 className="text-lg font-bold text-white flex items-center gap-2"><FiLayers className="text-indigo-400" /> Smart Groups & Instructor Link Matrix</h2>
            <p className="text-xs text-slate-400">Mapping active student cohorts directly with assigned center instructors and hall capacities.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="bg-[#181c2b] p-4 rounded-2xl border border-slate-800 space-y-2">
                <div className="flex justify-between items-center">
                  <h4 className="font-bold text-white text-sm">Math - Group A</h4>
                  <span className="text-xs bg-indigo-500/10 text-indigo-400 px-2.5 py-1 rounded-lg">24 Students</span>
                </div>
                <p className="text-xs text-slate-400">Instructor: Dr. Khaled Mohamed</p>
                <p className="text-xs text-slate-400">Hall: Room 102 (Capacity: 30)</p>
              </div>

              <div className="bg-[#181c2b] p-4 rounded-2xl border border-slate-800 space-y-2">
                <div className="flex justify-between items-center">
                  <h4 className="font-bold text-white text-sm">Physics - Group B</h4>
                  <span className="text-xs bg-indigo-500/10 text-indigo-400 px-2.5 py-1 rounded-lg">18 Students</span>
                </div>
                <p className="text-xs text-slate-400">Instructor: Eng. Sara Hassan</p>
                <p className="text-xs text-slate-400">Hall: Lab 2 (Capacity: 25)</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Add Student Modal */}
      <AnimatePresence>
        {showAddStudentModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-[#131620] border border-slate-800 p-6 md:p-8 rounded-3xl w-full max-w-lg shadow-2xl space-y-6"
            >
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-bold text-white">Register New Student Dossier</h3>
                <button onClick={() => setShowAddStudentModal(false)} className="text-slate-400 hover:text-white p-2 rounded-xl hover:bg-[#1b1f2e]">
                  <FiX size={20} />
                </button>
              </div>

              <form onSubmit={handleAddStudent} className="space-y-4 text-xs md:text-sm">
                <div>
                  <label className="block text-slate-400 font-medium mb-1.5">Student Full Name</label>
                  <input 
                    type="text" 
                    required
                    value={newStudentName} 
                    onChange={(e) => setNewStudentName(e.target.value)} 
                    placeholder="e.g. Omar Zaki"
                    className="w-full p-3 bg-[#1b1f2e] border border-slate-700/60 rounded-2xl text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-400 font-medium mb-1.5">Student Phone</label>
                    <input 
                      type="text" 
                      value={newStudentPhone} 
                      onChange={(e) => setNewStudentPhone(e.target.value)} 
                      placeholder="010xxxxxxxx"
                      className="w-full p-3 bg-[#1b1f2e] border border-slate-700/60 rounded-2xl text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 font-medium mb-1.5">Parent Phone</label>
                    <input 
                      type="text" 
                      value={newParentPhone} 
                      onChange={(e) => setNewParentPhone(e.target.value)} 
                      placeholder="012xxxxxxxx"
                      className="w-full p-3 bg-[#1b1f2e] border border-slate-700/60 rounded-2xl text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-400 font-medium mb-1.5">Assign Group</label>
                  <select 
                    value={newStudentGroup} 
                    onChange={(e) => setNewStudentGroup(e.target.value)}
                    className="w-full p-3 bg-[#1b1f2e] border border-slate-700/60 rounded-2xl text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="Math - Group A">Math - Group A</option>
                    <option value="Physics - Group B">Physics - Group B</option>
                    <option value="Chemistry - Group C">Chemistry - Group C</option>
                  </select>
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
                  <button 
                    type="button" 
                    onClick={() => setShowAddStudentModal(false)}
                    className="px-5 py-3 bg-[#1b1f2e] text-slate-300 hover:bg-slate-800 rounded-2xl font-semibold transition-colors"
                  >
                    Cancel
                  </button>
                  <motion.button 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="px-6 py-3 bg-indigo-600 text-white hover:bg-indigo-500 rounded-2xl font-semibold shadow-xl shadow-indigo-600/30 transition-all"
                  >
                    Save Dossier
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