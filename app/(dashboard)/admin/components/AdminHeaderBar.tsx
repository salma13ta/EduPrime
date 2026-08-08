"use client";

import React from "react";
import { motion } from "framer-motion";
import { useApp } from "@/app/context/AppContext";
import { FiSearch, FiFileText, FiUserPlus, FiBell, FiMenu } from "react-icons/fi";

interface AdminHeaderBarProps {
  setActiveTab: (tab: string) => void;
  setMobileMenuOpen: (open: boolean) => void;
}

export default function AdminHeaderBar({ setActiveTab, setMobileMenuOpen }: AdminHeaderBarProps) {
  const { systemSettings } = useApp();

  return (
    <motion.header 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="h-20 bg-[#0b0f19]/90 backdrop-blur-md border-b border-gray-800/80 px-4 sm:px-6 md:px-8 flex items-center justify-between sticky top-0 z-30"
    >
      {/* Left side: Hamburger for mobile + Live Hub Info */}
      <div className="flex items-center gap-3">
        <button 
          onClick={() => setMobileMenuOpen(true)}
          className="lg:hidden p-2.5 bg-[#131b2e] border border-gray-800 text-gray-200 rounded-xl hover:bg-indigo-600 hover:text-white transition cursor-pointer"
        >
          <FiMenu className="text-lg" />
        </button>

        <div className="hidden md:flex items-center gap-2 text-xs text-indigo-400 font-semibold bg-indigo-950/40 border border-indigo-500/20 px-3 py-1.5 rounded-full shadow-inner">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>{systemSettings.hubName}</span>
          <span className="text-gray-500">•</span>
          <span className="text-gray-300">{systemSettings.branchesCount} Branches</span>
          <span className="text-gray-500">•</span>
          <span className="text-gray-300">{systemSettings.studentsCount} Students</span>
          <span className="text-gray-500">•</span>
          <span className="text-gray-400">{systemSettings.currentDate}</span>
        </div>
      </div>


      {/* Right Actions */}
      <div className="flex items-center gap-2 sm:gap-3">
        <motion.button 
          onClick={() => setActiveTab("Reports")}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="hidden sm:flex items-center gap-2 bg-[#131b2e] hover:bg-[#1a233a] border border-gray-800 text-gray-300 px-3.5 py-2 rounded-xl text-xs font-semibold transition cursor-pointer shadow-sm"
        >
          <FiFileText className="text-indigo-400" />
          <span>Report</span>
        </motion.button>

        <motion.button 
          onClick={() => setActiveTab("Students")}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-3 sm:px-4 py-2 rounded-xl text-xs font-semibold shadow-lg shadow-indigo-600/30 transition cursor-pointer"
        >
          <FiUserPlus />
          <span className="hidden xs:inline">Add Student</span>
        </motion.button>

        <motion.div 
          onClick={() => setActiveTab("Notifications")}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="w-9 h-9 bg-[#131b2e] border border-gray-800 rounded-xl flex items-center justify-center text-gray-300 hover:text-white cursor-pointer transition relative shrink-0 shadow-sm"
        >
          <FiBell className="text-sm" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-indigo-500 rounded-full animate-ping"></span>
        </motion.div>
      </div>
    </motion.header>
  );
}