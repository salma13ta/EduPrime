"use client";

import React from "react";
import { motion } from "framer-motion";
import { FiCode } from "react-icons/fi";

const subjects = [
  { name: "Mathematics", percentage: "32%", color: "bg-indigo-500" },
  { name: "Sciences", percentage: "24%", color: "bg-purple-500" },
  { name: "Languages", percentage: "22%", color: "bg-cyan-500" },
  { name: "Arts", percentage: "14%", color: "bg-amber-500" },
  { name: "Technology", percentage: "8%", color: "bg-emerald-500" },
];

const chartBars = [
  { month: "Jan", rev: "75%", exp: "45%" },
  { month: "Feb", rev: "80%", exp: "40%" },
  { month: "Mar", rev: "70%", exp: "35%" },
  { month: "Apr", rev: "90%", exp: "48%" },
  { month: "May", rev: "95%", exp: "50%" },
  { month: "Jun", rev: "100%", exp: "45%" },
  { month: "Jul", rev: "110%", exp: "55%" },
];

export default function RevenueAndMixSection() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Revenue vs Expenses Chart */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="lg:col-span-2 bg-[#131b2e] border border-gray-800/80 rounded-2xl p-5 sm:p-6 shadow-xl flex flex-col justify-between"
      >
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-6">
          <div>
            <h3 className="text-sm font-bold text-white">Revenue vs Expenses</h3>
            <p className="text-xs text-gray-400">Monthly financial performance</p>
          </div>
          <div className="flex items-center gap-4 text-xs font-medium">
            <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 bg-emerald-500 rounded-full"></span><span className="text-gray-300">Revenue</span></div>
            <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 bg-rose-500 rounded-full"></span><span className="text-gray-300">Expenses</span></div>
          </div>
        </div>

        {/* Custom Pure CSS Bar Chart with animation */}
        <div className="h-56 flex items-end justify-between gap-2 sm:gap-4 pt-8 px-1 sm:px-2 border-b border-gray-800 pb-2 overflow-x-auto">
          {chartBars.map((bar, idx) => (
            <div key={idx} className="flex-1 flex flex-col items-center h-full justify-end gap-2 min-w-[32px]">
              <div className="w-full flex justify-center items-end gap-1 h-full">
                <motion.div 
                  initial={{ height: 0 }}
                  animate={{ height: bar.rev }}
                  transition={{ duration: 0.6, delay: idx * 0.05 }}
                  className="w-3 bg-emerald-500 rounded-t-md hover:bg-emerald-400 transition-all"
                ></motion.div>
                <motion.div 
                  initial={{ height: 0 }}
                  animate={{ height: bar.exp }}
                  transition={{ duration: 0.6, delay: idx * 0.05 + 0.1 }}
                  className="w-3 bg-rose-500/80 rounded-t-md hover:bg-rose-400 transition-all"
                ></motion.div>
              </div>
              <span className="text-[10px] sm:text-[11px] text-gray-400">{bar.month}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Subject Mix Donut / Legend */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="bg-[#131b2e] border border-gray-800/80 rounded-2xl p-5 sm:p-6 shadow-xl flex flex-col justify-between"
      >
        <div>
          <h3 className="text-sm font-bold text-white mb-1">Subject Mix</h3>
          <p className="text-xs text-gray-400 mb-6">Distribution of enrolled subjects</p>
        </div>

        <div className="flex justify-center my-2">
          <motion.div 
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="w-32 h-32 rounded-full border-8 border-indigo-500 border-t-purple-500 border-r-cyan-500 border-b-amber-500 flex items-center justify-center shadow-lg"
          >
            <div className="w-20 h-20 bg-[#131b2e] rounded-full flex flex-col items-center justify-center">
              <span className="text-xs font-bold text-white">Mix</span>
              <span className="text-[10px] text-gray-400">100%</span>
            </div>
          </motion.div>
        </div>

        <div className="space-y-2 mt-4">
          {subjects.map((subj, idx) => (
            <div key={idx} className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${subj.color}`}></span>
                <span className="text-gray-300">{subj.name}</span>
              </div>
              <span className="font-semibold text-white">{subj.percentage}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* QR Attendance Quick Card */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
        className="bg-[#131b2e] border border-gray-800/80 rounded-2xl p-5 sm:p-6 shadow-xl flex flex-col justify-between lg:col-span-3 xl:col-span-1"
      >
        <div className="text-center">
          <div className="w-12 h-12 bg-indigo-600/20 border border-indigo-500/30 rounded-2xl flex items-center justify-center mx-auto mb-3 text-indigo-400">
            <FiCode className="text-2xl" />
          </div>
          <h3 className="text-sm font-bold text-white">QR Attendance</h3>
          <p className="text-[11px] text-gray-400 mt-1">Generate QR codes for instant attendance tracking</p>
        </div>

        <div className="my-6">
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-2.5 rounded-xl text-xs shadow-lg shadow-indigo-600/30 transition flex items-center justify-center gap-2"
          >
            <FiCode />
            <span>Generate QR</span>
          </motion.button>
        </div>

        <div className="text-center pt-3 border-t border-gray-800">
          <h4 className="text-2xl font-black text-white">91%</h4>
          <p className="text-[10px] text-gray-400 uppercase tracking-widest mt-0.5">Today's attendance</p>
        </div>
      </motion.div>
    </div>
  );
}