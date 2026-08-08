"use client";

import React from "react";
import { motion } from "framer-motion";
import { FiFilter, FiDownload, FiDollarSign, FiUser, FiAlertTriangle, FiFileText } from "react-icons/fi";

const bookings = [
  { student: "Emma T.", detail: "Dr. Chen • Math", time: "2:00 PM Today", price: "$85", status: "confirmed", color: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" },
  { student: "Alex K.", detail: "J. Morrison • Physics", time: "4:30 PM Today", price: "$75", status: "pending", color: "bg-amber-500/10 text-amber-400 border-amber-500/20" },
  { student: "Maria G.", detail: "L. Hassan • English", time: "10:00 AM Tomorrow", price: "$65", status: "confirmed", color: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" },
  { student: "James W.", detail: "M. Rivera • Chemistry", time: "11:30 AM Tue", price: "$80", status: "cancelled", color: "bg-rose-500/10 text-rose-400 border-rose-500/20" },
];

const notifications = [
  { title: "Payment received from Emma T.", time: "2 min ago", icon: <FiDollarSign className="text-emerald-400" /> },
  { title: "New student registration: Mike P.", time: "15 min ago", icon: <FiUser className="text-indigo-400" /> },
  { title: "Teacher James absence reported", time: "1 hr ago", icon: <FiAlertTriangle className="text-amber-400" /> },
  { title: "Monthly report ready to download", time: "3 hr ago", icon: <FiFileText className="text-blue-400" /> },
];

export default function BookingsAndNotificationsSection() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Recent Bookings */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
        className="lg:col-span-2 bg-[#131b2e] border border-gray-800/80 rounded-2xl p-5 sm:p-6 shadow-xl"
      >
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-sm font-bold text-white">Recent Bookings</h3>
          <div className="flex items-center gap-2">
            <button className="p-2 bg-[#1a233a] hover:bg-[#222e4d] border border-gray-800 rounded-xl text-gray-300 transition text-xs"><FiFilter /></button>
            <button className="p-2 bg-[#1a233a] hover:bg-[#222e4d] border border-gray-800 rounded-xl text-gray-300 transition text-xs"><FiDownload /></button>
          </div>
        </div>

        <div className="space-y-3.5">
          {bookings.map((booking, idx) => (
            <motion.div 
              key={idx}
              whileHover={{ scale: 1.01 }}
              className="bg-[#1a233a]/50 border border-gray-800/60 p-4 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3"
            >
              <div>
                <h4 className="text-xs font-bold text-white">{booking.student}</h4>
                <p className="text-[11px] text-gray-400 mt-0.5">{booking.detail}</p>
              </div>

              <div className="flex items-center justify-between sm:justify-end gap-4 sm:gap-6 border-t sm:border-t-0 pt-2 sm:pt-0 border-gray-800">
                <span className="text-[11px] text-gray-400">{booking.time}</span>
                <span className="text-xs font-bold text-white">{booking.price}</span>
                <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${booking.color}`}>
                  {booking.status}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Notifications */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.4 }}
        className="bg-[#131b2e] border border-gray-800/80 rounded-2xl p-5 sm:p-6 shadow-xl"
      >
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-sm font-bold text-white">Notifications</h3>
          <span className="text-[11px] text-indigo-400 cursor-pointer hover:underline">Mark all read</span>
        </div>

        <div className="space-y-3.5">
          {notifications.map((notif, idx) => (
            <motion.div 
              key={idx}
              whileHover={{ x: 3 }}
              className="bg-[#1a233a]/40 border border-gray-800/60 p-3.5 rounded-xl flex items-start gap-3"
            >
              <div className="p-2 bg-[#131b2e] rounded-xl border border-gray-800 shrink-0">
                {notif.icon}
              </div>
              <div className="min-w-0">
                <h4 className="text-xs font-bold text-gray-200 truncate">{notif.title}</h4>
                <span className="text-[10px] text-gray-500 mt-1 block">{notif.time}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}