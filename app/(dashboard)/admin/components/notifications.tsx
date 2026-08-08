'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function Notifications() {
  const notifs = [
    { title: 'Payment received from Emma T.', time: '2 min ago', type: 'success', icon: '💰' },
    { title: 'New student registration: Mike P.', time: '15 min ago', type: 'info', icon: '🎓' },
    { title: 'Teacher James absence reported', time: '1 hr ago', type: 'warning', icon: '⚠️' },
    { title: 'Monthly report ready to download', time: '3 hrs ago', type: 'success', icon: '📊' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between bg-[#12161F]/60 p-6 rounded-2xl border border-gray-800/80">
        <div>
          <h2 className="text-xl font-black text-white">System Notifications</h2>
          <p className="text-xs text-gray-400 mt-1">Real-time alerts and financial logs</p>
        </div>
        <button className="text-xs text-purple-400 hover:underline font-bold">Mark all read</button>
      </div>

      <div className="space-y-3">
        {notifs.map((n, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.08 }}
            className="bg-[#12161F] p-4 rounded-xl border border-gray-800/80 flex items-center justify-between shadow-md"
          >
            <div className="flex items-center gap-3">
              <span className="text-xl bg-gray-800/80 p-2.5 rounded-xl">{n.icon}</span>
              <div>
                <h4 className="text-xs font-bold text-white">{n.title}</h4>
                <p className="text-[10px] text-gray-400 mt-0.5">{n.time}</p>
              </div>
            </div>
            <span className="w-2 h-2 rounded-full bg-purple-500"></span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}