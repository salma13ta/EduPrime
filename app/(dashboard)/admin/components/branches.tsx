"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useApp } from "@/app/context/AppContext";
import { 
  FiGrid as GridIcon, 
  FiPlus as PlusIcon, 
  FiMapPin as PinIcon, 
  FiUsers as UsersIcon, 
  FiEdit3 as EditIcon, 
  FiTrash2 as TrashIcon, 
  FiSearch as SearchIcon, 
  FiX as CloseIcon,
  FiUserCheck as TeacherIcon
} from "react-icons/fi";

export default function BranchesView() {
  const { branches, setBranches, setSystemSettings } = useApp();
  
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBranch, setEditingBranch] = useState<any | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    location: "",
    students: "",
    teachers: "",
    revenue: "",
  });

  const filteredBranches = branches.filter((branch) => 
    branch.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    branch.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleOpenAddModal = () => {
    setEditingBranch(null);
    setFormData({ name: "", location: "", students: "0", teachers: "0", revenue: "$0.0k" });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (branch: any) => {
    setEditingBranch(branch);
    setFormData({
      name: branch.name,
      location: branch.location,
      students: branch.students.toString(),
      teachers: branch.teachers.toString(),
      revenue: branch.revenue,
    });
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.location) return;

    if (editingBranch) {
      setBranches((prev) =>
        prev.map((b) => (b.id === editingBranch.id ? { ...b, ...formData, students: Number(formData.students), teachers: Number(formData.teachers) } : b))
      );
    } else {
      const newBranch = {
        id: Date.now(),
        name: formData.name,
        location: formData.location,
        students: Number(formData.students) || 0,
        teachers: Number(formData.teachers) || 0,
        revenue: formData.revenue || "$10.0k",
      };
      setBranches((prev) => [...prev, newBranch]);
      setSystemSettings((prev: any) => ({ ...prev, branchesCount: prev.branchesCount + 1 }));
    }

    setIsModalOpen(false);
  };

  const handleDeleteBranch = (id: number) => {
    if (confirm("Are you sure you want to delete this branch? This will update system metrics.")) {
      setBranches((prev) => prev.filter((b) => b.id !== id));
      setSystemSettings((prev: any) => ({ ...prev, branchesCount: Math.max(1, prev.branchesCount - 1) }));
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6 max-w-7xl mx-auto"
    >
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-[#131b2e] border border-gray-800 p-6 rounded-2xl shadow-xl">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-indigo-600/20 border border-indigo-500/30 text-indigo-400 rounded-2xl flex items-center justify-center text-xl shadow-inner">
            <GridIcon />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white tracking-wide">Branches Management</h2>
            <p className="text-xs text-gray-400">Manage all institute campuses, active student capacities, and local revenues</p>
          </div>
        </div>

        <motion.button
          onClick={handleOpenAddModal}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-2.5 rounded-xl text-xs font-semibold shadow-lg shadow-indigo-600/30 transition flex items-center justify-center gap-2 cursor-pointer"
        >
          <PlusIcon className="text-sm" />
          <span>Add New Branch</span>
        </motion.button>
      </div>

      {/* Search & Stats Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#131b2e]/60 border border-gray-800/80 p-4 rounded-2xl">
        <div className="relative w-full sm:w-80">
          <SearchIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
          <input 
            type="text"
            placeholder="Search branch name or location..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#1a233a] border border-gray-800 rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 transition shadow-inner"
          />
        </div>
        <div className="text-xs text-gray-400 font-medium">
          Showing <span className="text-indigo-400 font-bold">{filteredBranches.length}</span> active campuses
        </div>
      </div>

      {/* Branches Grid */}
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { staggerChildren: 0.08 } }
        }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {filteredBranches.map((branch) => (
          <motion.div
            key={branch.id}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 }
            }}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            className="bg-[#131b2e] border border-gray-800/90 rounded-2xl p-6 shadow-xl flex flex-col justify-between group relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full blur-2xl group-hover:bg-indigo-500/10 transition duration-500 pointer-events-none" />

            <div>
              <div className="flex items-start justify-between gap-3 mb-4">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-400 bg-indigo-950/60 border border-indigo-500/20 px-2.5 py-1 rounded-full">
                    Campus ID: #{branch.id.toString().slice(-4)}
                  </span>
                  <h3 className="text-base font-bold text-white mt-2 group-hover:text-indigo-300 transition">{branch.name}</h3>
                </div>
                
                <div className="flex items-center gap-1 bg-[#1a233a] p-1 rounded-xl border border-gray-800">
                  <button 
                    onClick={() => handleOpenEditModal(branch)}
                    className="p-1.5 text-gray-400 hover:text-indigo-400 transition rounded-lg hover:bg-gray-800 cursor-pointer"
                    title="Edit Branch"
                  >
                    <EditIcon className="text-xs" />
                  </button>
                  <button 
                    onClick={() => handleDeleteBranch(branch.id)}
                    className="p-1.5 text-gray-400 hover:text-red-400 transition rounded-lg hover:bg-gray-800 cursor-pointer"
                    title="Delete Branch"
                  >
                    <TrashIcon className="text-xs" />
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs text-gray-400 mb-6">
                <PinIcon className="text-indigo-400 shrink-0" />
                <span className="truncate">{branch.location}</span>
              </div>

              <div className="grid grid-cols-2 gap-3 py-3 border-y border-gray-800/80 mb-4 bg-[#1a233a]/40 px-3 rounded-xl">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 bg-indigo-600/10 text-indigo-400 rounded-lg">
                    <UsersIcon className="text-xs" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">{branch.students}</h4>
                    <p className="text-[10px] text-gray-400">Students</p>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <div className="p-2 bg-emerald-600/10 text-emerald-400 rounded-lg">
                    <TeacherIcon className="text-xs" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">{branch.teachers}</h4>
                    <p className="text-[10px] text-gray-400">Teachers</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="text-[11px] text-gray-400 font-medium">Monthly Revenue</span>
              <span className="text-emerald-400 font-bold text-sm bg-emerald-500/10 px-3 py-1 rounded-xl border border-emerald-500/20">
                {branch.revenue}
              </span>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Modal إضافة أو تعديل فرع */}
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
              className="relative bg-[#131b2e] border border-gray-800 rounded-2xl p-6 sm:p-8 w-full max-w-lg shadow-2xl z-10 space-y-6"
            >
              <div className="flex items-center justify-between pb-4 border-b border-gray-800">
                <div>
                  <h3 className="text-base font-bold text-white">
                    {editingBranch ? "Edit Branch Details" : "Add New Campus Branch"}
                  </h3>
                  <p className="text-xs text-gray-400">Configure branch capacity and location credentials</p>
                </div>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="text-gray-400 hover:text-white p-1.5 rounded-lg bg-[#1a233a] border border-gray-800"
                >
                  <CloseIcon className="text-base" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1.5">Branch / Campus Name</label>
                  <input 
                    type="text" 
                    placeholder="e.g. North District Campus"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-[#1a233a] border border-gray-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1.5">Location / Address</label>
                  <input 
                    type="text" 
                    placeholder="e.g. 5th Avenue, New York"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full bg-[#1a233a] border border-gray-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1.5">Students Capacity</label>
                    <input 
                      type="number" 
                      placeholder="e.g. 150"
                      value={formData.students}
                      onChange={(e) => setFormData({ ...formData, students: e.target.value })}
                      className="w-full bg-[#1a233a] border border-gray-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1.5">Teachers Assigned</label>
                    <input 
                      type="number" 
                      placeholder="e.g. 12"
                      value={formData.teachers}
                      onChange={(e) => setFormData({ ...formData, teachers: e.target.value })}
                      className="w-full bg-[#1a233a] border border-gray-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1.5">Monthly Revenue</label>
                  <input 
                    type="text" 
                    placeholder="e.g. $18.5k"
                    value={formData.revenue}
                    onChange={(e) => setFormData({ ...formData, revenue: e.target.value })}
                    className="w-full bg-[#1a233a] border border-gray-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500"
                  />
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
                    {editingBranch ? "Save Changes" : "Create Branch"}
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