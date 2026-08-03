'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, BookOpen, Clock, Award } from 'lucide-react';

export default function StatCards() {
  const stats = [
    { label: 'Overall Score', val: '88%', change: '+4%', icon: TrendingUp, color: 'text-purple-400' },
    { label: 'Courses Active', val: '4', change: '+1', icon: BookOpen, color: 'text-fuchsia-400' },
    { label: 'Hours Studied', val: '124h', change: '+12h', icon: Clock, color: 'text-cyan-400' },
    { label: 'Achievements', val: '12', change: '+2', icon: Award, color: 'text-emerald-400' },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
      {stats.map((stat, idx) => {
        const Icon = stat.icon;
        return (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: idx * 0.1 }}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
            className="p-4 rounded-2xl bg-[#110f1e] border border-white/5 flex flex-col justify-between space-y-3 shadow-lg hover:border-purple-500/30 transition-colors"
          >
            <div className="flex items-center justify-between">
              <div className={`p-2 rounded-xl bg-white/5 border border-white/10 ${stat.color}`}>
                <Icon className="w-4 h-4" />
              </div>
              <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/20">
                ↑ {stat.change}
              </span>
            </div>
            <div>
              <h3 className="text-xl md:text-2xl font-black text-white">{stat.val}</h3>
              <p className="text-[11px] text-gray-400 mt-0.5">{stat.label}</p>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}