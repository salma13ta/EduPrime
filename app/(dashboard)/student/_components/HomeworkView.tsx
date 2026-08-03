'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FileText } from 'lucide-react';

export default function HomeworkView() {
  const homeworks = [
    { title: 'Calculus Problem Set 7', subject: 'Mathematics', due: 'Today, 11:59 PM', status: 'Pending', urgent: true },
    { title: 'Essay: The Great Gatsby Analysis', subject: 'English', due: 'Tomorrow, 5:00 PM', status: 'Pending', urgent: false },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Homework & Assignments</h1>
        <p className="text-xs text-gray-400">Keep track of pending deadlines</p>
      </div>

      <div className="space-y-3">
        {homeworks.map((hw, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="p-4 rounded-2xl bg-[#110f1e] border border-white/5 flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div className={`p-2.5 rounded-xl ${hw.urgent ? 'bg-amber-500/10 text-amber-400' : 'bg-purple-500/10 text-purple-400'}`}>
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">{hw.title}</h3>
                <p className="text-xs text-gray-400">{hw.subject} • {hw.due}</p>
              </div>
            </div>
            <span className="text-xs px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 font-bold">
              {hw.status}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}