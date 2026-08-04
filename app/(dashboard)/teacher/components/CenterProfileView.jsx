'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Building2, 
  Star, 
  MapPin, 
  Users, 
  Clock, 
  Phone, 
  Mail, 
  Image as ImageIcon, 
  GraduationCap, 
  BookOpen, 
  MessageSquare, 
  Tag 
} from 'lucide-react';

export default function CenterProfileView() {
  const [activeSubTab, setActiveSubTab] = useState('About');

  const tabs = ['About', 'Gallery', 'Teachers', 'Courses', 'Reviews', 'Pricing'];

  return (
    <div className="space-y-6 pb-12">
      {/* Hero Banner Section with University Background */}
      <div className="relative w-full h-64 sm:h-80 rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
        {/* Background Image with Dark Overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center filter brightness-50"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1200&q=80')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#08070d] via-[#08070d]/40 to-transparent" />

        {/* Center Info Overlay */}
        <div className="absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
          <div className="flex items-center gap-4">
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-purple-600 flex items-center justify-center text-white shadow-xl border-2 border-white/20 overflow-hidden shrink-0"
            >
              <Building2 className="w-10 h-10" />
            </motion.div>
            
            <div>
              <motion.h1 
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="text-2xl sm:text-3xl font-black text-white tracking-wide"
              >
                EduPlex Nasr City
              </motion.h1>
              
              <motion.div 
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="flex flex-wrap items-center gap-3 mt-2 text-xs sm:text-sm text-gray-300"
              >
                <span className="flex items-center gap-1 bg-amber-500/20 text-amber-400 px-2.5 py-1 rounded-lg border border-amber-500/30 font-semibold">
                  <Star className="w-3.5 h-3.5 fill-amber-400" /> 4.8 <span className="text-gray-400 font-normal">(230 reviews)</span>
                </span>
                <span className="flex items-center gap-1 text-gray-300">
                  <MapPin className="w-3.5 h-3.5 text-purple-400" /> Nasr City, Cairo
                </span>
                <span className="flex items-center gap-1 text-gray-300">
                  <Users className="w-3.5 h-3.5 text-purple-400" /> 180 students
                </span>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none border-b border-white/10">
        {tabs.map((tab) => {
          const isActive = activeSubTab === tab;
          return (
            <button
              key={tab}
              onClick={() => setActiveSubTab(tab)}
              className={`relative px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 shrink-0 ${
                isActive ? 'text-white' : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="activePill"
                  className="absolute inset-0 bg-purple-600 rounded-xl shadow-lg shadow-purple-600/30"
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
              <span className="relative z-10">{tab}</span>
            </button>
          );
        })}
      </div>

      {/* Content Area with Animation */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeSubTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-6"
        >
          {activeSubTab === 'About' && (
            <>
              {/* About Us Card */}
              <div className="lg:col-span-2 p-6 sm:p-8 rounded-3xl bg-[#110f22] border border-white/10 shadow-xl space-y-4">
                <h2 className="text-lg font-bold text-white">About Us</h2>
                <p className="text-sm text-gray-300 leading-relaxed">
                  EduPlex Nasr City is a premier educational center founded in 2018, specializing in STEM education for students from Grade 7 through University level. With state-of-the-art facilities, highly qualified teachers, and a student-first approach, we have helped over 2,000 students achieve their academic dreams.
                </p>
              </div>

              {/* Quick Info Card */}
              <div className="p-6 sm:p-8 rounded-3xl bg-[#110f22] border border-white/10 shadow-xl space-y-5">
                <h2 className="text-lg font-bold text-white">Quick Info</h2>
                
                <div className="space-y-4 text-xs sm:text-sm text-gray-300">
                  <div className="flex items-start gap-3">
                    <Clock className="w-4 h-4 text-purple-400 mt-0.5 shrink-0" />
                    <div>
                      <p className="font-semibold text-white">HOURS</p>
                      <p className="text-gray-400">Sun–Thu: 8AM–9PM · Fri–Sat: 10AM–8PM</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Phone className="w-4 h-4 text-purple-400 mt-0.5 shrink-0" />
                    <div>
                      <p className="font-semibold text-white">PHONE</p>
                      <p className="text-gray-400">+20 100 123 4567</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Mail className="w-4 h-4 text-purple-400 mt-0.5 shrink-0" />
                    <div>
                      <p className="font-semibold text-white">EMAIL</p>
                      <p className="text-gray-400">nasrcity@eduplex.eg</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-purple-400 mt-0.5 shrink-0" />
                    <div>
                      <p className="font-semibold text-white">ADDRESS</p>
                      <p className="text-gray-400">12 El-Nasr St., Nasr City, Cairo</p>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Placeholder for other tabs */}
          {activeSubTab !== 'About' && (
            <div className="lg:col-span-3 p-12 rounded-3xl bg-[#110f22] border border-white/10 text-center space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-purple-600/20 text-purple-400 mx-auto flex items-center justify-center font-bold">
                {activeSubTab[0]}
              </div>
              <h3 className="text-base font-bold text-white">{activeSubTab} Module</h3>
              <p className="text-xs text-gray-400">Content for {activeSubTab} is currently loading and syncing with database.</p>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}