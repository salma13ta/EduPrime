"use client";

import React from "react";
import { motion } from "framer-motion";
import { FiDollarSign, FiUsers, FiBookOpen, FiCheckCircle, FiTrendingUp } from "react-icons/fi";

const stats = [
  { title: "Total Revenue", value: "$56K", change: "+22%", icon: <FiDollarSign className="text-emerald-400" />, positive: true },
  { title: "Active Students", value: "635", change: "+48", icon: <FiUsers className="text-indigo-400" />, positive: true },
  { title: "Teachers", value: "48", change: "+3", icon: <FiBookOpen className="text-purple-400" />, positive: true },
  { title: "Attendance", value: "91%", change: "+2%", icon: <FiCheckCircle className="text-blue-400" />, positive: true },
  { title: "Expenses", value: "$17K", change: "+6%", icon: <FiTrendingUp className="text-amber-400" />, positive: false },
];

export default function StatsOverviewGrid() {
  return (
    <div>
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="mb-4"
      >
        <h2 className="text-xl sm:text-2xl font-bold text-white tracking-wide flex items-center gap-2">
          Admin Dashboard ⚙️
        </h2>
        <p className="text-xs text-gray-400 mt-0.5">Apex Learning Hub • 3 Branches • 635 Students • July 2026</p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {stats.map((stat, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: idx * 0.05 }}
            whileHover={{ y: -3 }}
            className="bg-[#131b2e] border border-gray-800/80 rounded-2xl p-5 relative overflow-hidden shadow-lg hover:border-gray-700 transition"
          >
            <div className="flex justify-between items-center mb-3">
              <div className="p-2.5 bg-[#1b253f] rounded-xl border border-gray-800">
                {stat.icon}
              </div>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                stat.positive ? "bg-emerald-500/10 text-emerald-400" : "bg-rose-500/10 text-rose-400"
              }`}>
                {stat.change}
              </span>
            </div>
            <h3 className="text-2xl font-black text-white">{stat.value}</h3>
            <p className="text-xs text-gray-400 mt-1">{stat.title}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}