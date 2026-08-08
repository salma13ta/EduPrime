"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useApp } from "@/app/context/AppContext";
import { 
  FiHome, FiGrid, FiUsers, FiBookOpen, FiCalendar, 
  FiDollarSign, FiTrendingUp, FiBarChart2, FiFileText, 
  FiBell, FiCode, FiHelpCircle, FiSettings, FiLogOut, FiMenu, FiX 
} from "react-icons/fi";

interface AdminSidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
}

const menuItems = [
  { name: "Dashboard", icon: <FiHome /> },
  { name: "Branches", icon: <FiGrid /> },
  { name: "Teachers", icon: <FiUsers /> },
  { name: "Students", icon: <FiBookOpen /> },
  { name: "Schedules", icon: <FiCalendar /> },
  { name: "Payments", icon: <FiDollarSign /> },
  { name: "Revenue", icon: <FiTrendingUp /> },
  { name: "Analytics", icon: <FiBarChart2 /> },
  { name: "Reports", icon: <FiFileText /> },
  { name: "Notifications", icon: <FiBell />, badge: "7" },
  { name: "QR Attendance", icon: <FiCode /> },
  { name: "Support", icon: <FiHelpCircle /> },
  { name: "Settings", icon: <FiSettings /> },
];

export default function AdminSidebar({ activeTab, setActiveTab, mobileMenuOpen, setMobileMenuOpen }: AdminSidebarProps) {
  const { adminProfile, systemSettings, handleLogout } = useApp();

  const sidebarContent = (
    <div className="flex flex-col h-full justify-between select-none bg-[#0e1320] text-gray-100">
      {/* Top Brand & Mobile Close */}
      <div className="p-6 flex items-center justify-between">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => { setActiveTab("Dashboard"); setMobileMenuOpen(false); }}>
          <div className="w-9 h-9 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-500/30">
            <FiHome className="text-lg" />
          </div>
          <div>
            <h1 className="font-bold text-sm tracking-wide text-white">{systemSettings.hubName}</h1>
            <p className="text-[10px] text-gray-400">{adminProfile.role}</p>
          </div>
        </div>
        <button 
          onClick={() => setMobileMenuOpen(false)}
          className="lg:hidden text-gray-400 hover:text-white p-2"
        >
          <FiX className="text-xl" />
        </button>
      </div>

      {/* Navigation Links with Stagger Animation */}
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { staggerChildren: 0.03 }
          }
        }}
        className="flex-1 px-4 space-y-1 overflow-y-auto custom-scrollbar"
      >
        {menuItems.map((item, index) => {
          const isActive = activeTab.toLowerCase() === item.name.toLowerCase();
          return (
            <motion.button
              key={index}
              variants={{
                hidden: { opacity: 0, x: -20 },
                visible: { opacity: 1, x: 0 }
              }}
              onClick={() => {
                setActiveTab(item.name);
                setMobileMenuOpen(false);
              }}
              whileHover={{ x: 6 }}
              whileTap={{ scale: 0.98 }}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                isActive 
                  ? "bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 shadow-md shadow-indigo-900/20" 
                  : "text-gray-400 hover:bg-[#151c2e] hover:text-gray-200"
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-base">{item.icon}</span>
                <span>{item.name}</span>
              </div>
              {item.badge && (
                <span className="bg-indigo-600 text-white text-[10px] px-2 py-0.5 rounded-full font-bold animate-pulse">
                  {item.badge}
                </span>
              )}
            </motion.button>
          );
        })}
      </motion.div>

      {/* User Profile Footer */}
      <div className="p-4 border-t border-gray-800/80">
        <div className="bg-[#151c2e] p-3 rounded-2xl border border-gray-800/60 flex items-center justify-between">
          <div className="flex items-center gap-3 min-w-0">
            <img 
              src={adminProfile.avatar} 
              alt="Admin" 
              className="w-9 h-9 rounded-full object-cover border border-indigo-500/40 shrink-0"
            />
            <div className="overflow-hidden">
              <h4 className="text-xs font-bold text-white truncate">{adminProfile.name}</h4>
              <p className="text-[10px] text-gray-400 truncate">{adminProfile.email}</p>
            </div>
          </div>
          <FiLogOut 
            onClick={handleLogout}
            title="Logout"
            className="text-gray-400 hover:text-red-400 cursor-pointer transition text-sm shrink-0" 
          />
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="w-64 border-r border-gray-800/80 hidden lg:block sticky top-0 h-screen shrink-0">
        {sidebarContent}
      </aside>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 lg:hidden flex">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-black backdrop-blur-sm"
            />
            <motion.div 
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="relative w-72 h-full bg-[#0e1320] shadow-2xl z-10 border-r border-gray-800"
            >
              {sidebarContent}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}