'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Bell, CheckCircle2, BookOpen, GraduationCap, Clock } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function NotificationsModal({ isOpen, onClose }: Props) {
  const notifications = [
    {
      id: 1,
      title: 'Assignment Graded',
      desc: 'Your Calculus Set #7 received a grade of 95/100.',
      time: '10m ago',
      icon: GraduationCap,
      color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
      unread: true,
    },
    {
      id: 2,
      title: 'New Quiz Available',
      desc: 'Physics Quiz #3 is now open for submission.',
      time: '1h ago',
      icon: BookOpen,
      color: 'text-purple-400 bg-purple-500/10 border-purple-500/20',
      unread: true,
    },
    {
      id: 3,
      title: 'System Maintenance',
      desc: 'EduPrime will be updated tonight at 02:00 AM.',
      time: '1d ago',
      icon: Clock,
      color: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
      unread: false,
    },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Drawer Dropdown Panel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: -20, x: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -20, x: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed top-16 right-4 md:right-8 w-[calc(100vw-2rem)] sm:w-96 bg-[#121022] border border-purple-500/20 rounded-3xl p-5 shadow-2xl z-50 space-y-4"
          >
            <div className="flex items-center justify-between pb-3 border-b border-white/5">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-purple-600/20 rounded-xl text-purple-400">
                  <Bell className="w-4 h-4" />
                </div>
                <h3 className="font-bold text-sm text-white">Notifications</h3>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-600 text-white font-bold">2 New</span>
              </div>
              <button 
                onClick={onClose}
                className="p-1.5 rounded-xl hover:bg-white/5 text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2.5 max-h-[380px] overflow-y-auto pr-1">
              {notifications.map((item) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.id}
                    whileHover={{ scale: 1.01 }}
                    className={`p-3.5 rounded-2xl border transition-all flex gap-3 ${
                      item.unread 
                        ? 'bg-[#18152e] border-purple-500/30 shadow-lg' 
                        : 'bg-white/[0.02] border-white/5 opacity-70'
                    }`}
                  >
                    <div className={`p-2.5 rounded-xl h-fit border ${item.color}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0 space-y-1">
                      <div className="flex justify-between items-center">
                        <h4 className="text-xs font-bold text-white truncate">{item.title}</h4>
                        <span className="text-[10px] text-gray-400">{item.time}</span>
                      </div>
                      <p className="text-[11px] text-gray-400 leading-snug">{item.desc}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            <button 
              onClick={onClose}
              className="w-full py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-semibold text-purple-300 border border-white/5 transition-all text-center flex items-center justify-center gap-2"
            >
              <CheckCircle2 className="w-3.5 h-3.5" /> Mark all as read
            </button>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}