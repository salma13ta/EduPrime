'use client';

import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, 
  Mail, 
  Shield, 
  BookOpen, 
  GraduationCap, 
  LogOut, 
  Check, 
  Save, 
  Star, 
  Calendar, 
  Award, 
  Clock, 
  Image as ImageIcon
} from 'lucide-react';

interface Props {
  user: { name: string; email: string; role: string };
  setUser: React.Dispatch<React.SetStateAction<{ name: string; email: string; role: string }>>;
  setActiveTab: (tab: string) => void;
}

export default function SettingsView({ user, setUser, setActiveTab }: Props) {
  const router = useRouter();
  const [formData, setFormData] = useState({ name: user.name, email: user.email });
  const [saved, setSaved] = useState(false);
  const [activeSubTab, setActiveSubTab] = useState<'overview' | 'courses' | 'schedule' | 'reviews' | 'gallery'>('overview');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setUser((prev) => ({ ...prev, name: formData.name, email: formData.email }));
    localStorage.setItem('eduprime_user', JSON.stringify({ ...user, ...formData }));
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const handleLogout = () => {
    localStorage.removeItem('eduprime_user');
    router.push('/');
  };

  const courses = [
    { title: 'Advanced Calculus Mastery', code: 'MATH-301', score: '92%', grade: 'A', students: '847 students', level: 'Advanced' },
    { title: 'Organic Chemistry Core', code: 'CHEM-204', score: '88%', grade: 'A-', students: '620 students', level: 'Intermediate' },
    { title: 'Quantum Physics Advanced', code: 'PHYS-402', score: '79%', grade: 'B+', students: '510 students', level: 'Advanced' },
  ];

  const scheduleSlots = [
    { day: 'Mon', times: ['9:00 AM', '11:00 AM', '2:00 PM'] },
    { day: 'Tue', times: ['10:00 AM', '3:00 PM'] },
    { day: 'Wed', times: ['9:00 AM', '1:00 PM', '4:00 PM'] },
    { day: 'Thu', times: ['11:00 AM', '2:00 PM'] },
    { day: 'Fri', times: ['9:00 AM', '12:30 PM'] },
  ];

  const galleryImages = [
    'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=600',
    'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=600',
    'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&q=80&w=600',
    'https://images.unsplash.com/photo-1513258496099-48168024aec0?auto=format&fit=crop&q=80&w=600',
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="space-y-8 max-w-7xl mx-auto pb-12"
    >
      {/* Top Profile Header Banner */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="bg-[#110f22] p-6 md:p-8 rounded-3xl border border-purple-500/20 shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden"
      >
        <div className="absolute -right-20 -top-20 w-64 h-64 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex items-center gap-5 z-10">
          <div className="relative">
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-3xl bg-gradient-to-tr from-purple-600 to-fuchsia-600 flex items-center justify-center font-black text-3xl text-white shadow-xl border-2 border-white/10">
              {user.name.charAt(0)}
            </div>
            <div className="absolute bottom-0 right-0 w-4 h-4 rounded-full bg-emerald-500 border-2 border-[#110f22]" />
          </div>
          
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h1 className="text-xl md:text-2xl font-black text-white tracking-tight">{user.name}</h1>
              <span className="px-2.5 py-0.5 rounded-full bg-purple-600/20 text-purple-300 border border-purple-500/30 text-[10px] font-bold uppercase">
                {user.role}
              </span>
            </div>
            <p className="text-xs text-gray-400">{user.email}</p>
            <p className="text-[11px] text-gray-400 flex items-center gap-3 pt-1">
              <span className="flex items-center gap-1"><Shield className="w-3.5 h-3.5 text-emerald-400" /> Verified Student</span>
              <span>•</span>
              <span className="text-purple-300 font-medium">EduPrime Academy Hub</span>
            </p>
          </div>
        </div>

        {/* Quick Stats Widgets */}
        <div className="flex items-center gap-3 z-10 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
          <div className="bg-white/5 border border-white/5 px-4 py-3 rounded-2xl text-center min-w-[90px]">
            <span className="block text-base font-black text-white">4.9</span>
            <span className="text-[10px] text-gray-400 font-medium">GPA Rating</span>
          </div>
          <div className="bg-white/5 border border-white/5 px-4 py-3 rounded-2xl text-center min-w-[90px]">
            <span className="block text-base font-black text-purple-400">24</span>
            <span className="text-[10px] text-gray-400 font-medium">Completed</span>
          </div>
          <div className="bg-white/5 border border-white/5 px-4 py-3 rounded-2xl text-center min-w-[90px]">
            <span className="block text-base font-black text-cyan-400">12</span>
            <span className="text-[10px] text-gray-400 font-medium">Certificates</span>
          </div>
        </div>
      </motion.div>

      {/* Navigation Tabs */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="flex items-center gap-2 bg-[#110f22] p-2 rounded-2xl border border-purple-500/20 overflow-x-auto"
      >
        {[
          { id: 'overview', label: 'Overview', icon: User },
          { id: 'courses', label: 'Enrolled Courses', icon: BookOpen },
          { id: 'schedule', label: 'Schedule', icon: Calendar },
          { id: 'reviews', label: 'Reviews & Feedback', icon: Star },
          { id: 'gallery', label: 'Gallery', icon: ImageIcon },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeSubTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveSubTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
                isActive 
                  ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30' 
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </motion.div>

      {/* Main Grid Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Dynamic Center Panel */}
        <div className="lg:col-span-8 space-y-6">
          <AnimatePresence mode="wait">
            
            {/* OVERVIEW TAB */}
            {activeSubTab === 'overview' && (
              <motion.div
                key="overview"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="space-y-6"
              >
                <form onSubmit={handleSave} className="p-6 md:p-8 rounded-3xl bg-[#110f22] border border-purple-500/20 space-y-5 shadow-xl">
                  <h3 className="text-sm font-bold text-white flex items-center gap-2 border-b border-white/5 pb-3">
                    <User className="w-4 h-4 text-purple-400" /> Edit Personal Information
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-semibold text-gray-400">Full Name</label>
                      <div className="relative">
                        <User className="w-4 h-4 text-gray-500 absolute left-3 top-3.5" />
                        <input
                          type="text"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white focus:border-purple-500 outline-none transition-all"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[11px] font-semibold text-gray-400">Email Address</label>
                      <div className="relative">
                        <Mail className="w-4 h-4 text-gray-500 absolute left-3 top-3.5" />
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white focus:border-purple-500 outline-none transition-all"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="pt-2 flex items-center justify-between">
                    <span className="text-[11px] text-gray-400 flex items-center gap-1">
                      <Shield className="w-3.5 h-3.5 text-emerald-400" /> Secure Data Encryption
                    </span>
                    <button
                      type="submit"
                      className="px-5 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl text-xs font-bold text-white flex items-center gap-2 shadow-lg shadow-purple-600/30 hover:brightness-110 transition-all cursor-pointer"
                    >
                      {saved ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
                      {saved ? 'Saved Successfully!' : 'Save Changes'}
                    </button>
                  </div>
                </form>

                <div className="p-6 md:p-8 rounded-3xl bg-[#110f22] border border-purple-500/20 space-y-4 shadow-xl">
                  <h3 className="text-sm font-bold text-white flex items-center gap-2 border-b border-white/5 pb-3">
                    <Award className="w-4 h-4 text-amber-400" /> Academic Achievements & Certificates
                  </h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-4 rounded-2xl bg-white/5 border border-white/5 flex items-start gap-3">
                      <div className="p-3 rounded-xl bg-amber-500/10 text-amber-400 shrink-0">
                        <Award className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-white">Top Achiever 2026</h4>
                        <p className="text-[10px] text-gray-400 mt-0.5">EduPrime Excellence Award</p>
                      </div>
                    </div>

                    <div className="p-4 rounded-2xl bg-white/5 border border-white/5 flex items-start gap-3">
                      <div className="p-3 rounded-xl bg-purple-500/10 text-purple-400 shrink-0">
                        <GraduationCap className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-white">Advanced Mathematics</h4>
                        <p className="text-[10px] text-gray-400 mt-0.5">MIT Certified Track, 2025</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* COURSES TAB */}
            {activeSubTab === 'courses' && (
              <motion.div
                key="courses"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="space-y-4"
              >
                <div className="p-6 md:p-8 rounded-3xl bg-[#110f22] border border-purple-500/20 space-y-4 shadow-xl">
                  <h3 className="text-sm font-bold text-white flex items-center gap-2 border-b border-white/5 pb-3">
                    <GraduationCap className="w-4 h-4 text-purple-400" /> Enrolled Courses & Scores
                  </h3>

                  <div className="grid grid-cols-1 gap-3">
                    {courses.map((c, i) => (
                      <div key={i} className="p-4 rounded-2xl bg-white/5 border border-white/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:border-purple-500/30 transition-all">
                        <div className="flex items-center gap-3">
                          <div className="p-3 rounded-xl bg-purple-600/20 text-purple-300">
                            <BookOpen className="w-5 h-5" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="text-xs font-bold text-white">{c.title}</h4>
                              <span className="text-[9px] px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30 font-semibold">{c.level}</span>
                            </div>
                            <p className="text-[10px] text-gray-400 mt-0.5">{c.code} • {c.students}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end border-t sm:border-t-0 pt-2 sm:pt-0 border-white/5">
                          <span className="text-xs font-bold text-cyan-300">{c.score}</span>
                          <span className="text-xs font-black px-3 py-1 rounded-xl bg-purple-500/20 text-purple-300 border border-purple-500/30">
                            Grade: {c.grade}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* SCHEDULE TAB */}
            {activeSubTab === 'schedule' && (
              <motion.div
                key="schedule"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="space-y-4"
              >
                <div className="p-6 md:p-8 rounded-3xl bg-[#110f22] border border-purple-500/20 space-y-4 shadow-xl">
                  <h3 className="text-sm font-bold text-white flex items-center gap-2 border-b border-white/5 pb-3">
                    <Calendar className="w-4 h-4 text-cyan-400" /> Weekly Live Study Schedule
                  </h3>

                  <div className="space-y-3">
                    {scheduleSlots.map((slot, idx) => (
                      <div key={idx} className="p-4 rounded-2xl bg-white/5 border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-xl bg-purple-600/20 text-purple-300 font-black text-xs flex items-center justify-center border border-purple-500/30">
                            {slot.day}
                          </div>
                          <span className="text-xs text-gray-300 font-medium">Assigned Interactive Classes & Tutoring</span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {slot.times.map((t, i) => (
                            <span key={i} className="px-3 py-1 rounded-lg bg-[#08070d] border border-white/10 text-[11px] font-bold text-purple-300 flex items-center gap-1.5">
                              <Clock className="w-3 h-3 text-cyan-400" /> {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* REVIEWS TAB */}
            {activeSubTab === 'reviews' && (
              <motion.div
                key="reviews"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="space-y-4"
              >
                <div className="p-6 md:p-8 rounded-3xl bg-[#110f22] border border-purple-500/20 space-y-4 shadow-xl">
                  <h3 className="text-sm font-bold text-white flex items-center gap-2 border-b border-white/5 pb-3">
                    <Star className="w-4 h-4 text-amber-400" /> Mentor & Instructor Feedback
                  </h3>

                  <div className="space-y-3">
                    {[
                      { teacher: 'Dr. Sarah Chen', text: 'Exceptional analytical skills demonstrated during advanced calculus sessions.', date: 'Yesterday' },
                      { teacher: 'Prof. James Lee', text: 'Great proactive attitude in organic chemistry labs and problem solving.', date: '3 days ago' },
                    ].map((rev, idx) => (
                      <div key={idx} className="p-4 rounded-2xl bg-white/5 border border-white/5 space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-purple-300">{rev.teacher}</span>
                          <div className="flex items-center gap-1 text-amber-400">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className="w-3 h-3 fill-current" />
                            ))}
                          </div>
                        </div>
                        <p className="text-xs text-gray-300 italic">"{rev.text}"</p>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* GALLERY TAB */}
            {activeSubTab === 'gallery' && (
              <motion.div
                key="gallery"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="space-y-4"
              >
                <div className="p-6 md:p-8 rounded-3xl bg-[#110f22] border border-purple-500/20 space-y-4 shadow-xl">
                  <h3 className="text-sm font-bold text-white flex items-center gap-2 border-b border-white/5 pb-3">
                    <ImageIcon className="w-4 h-4 text-purple-400" /> Student Campus Gallery
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {galleryImages.map((img, idx) => (
                      <div key={idx} className="rounded-2xl overflow-hidden border border-white/10 h-44 relative group">
                        <img src={img} alt="Campus" className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                          <span className="text-[10px] text-white font-semibold">EduPrime Learning Environment</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>

        {/* Right Sidebar Action Card */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="lg:col-span-4 space-y-6"
        >
          <div className="p-6 rounded-3xl bg-[#110f22] border border-purple-500/20 space-y-5 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-600/10 rounded-full blur-2xl pointer-events-none" />
            
            <div className="text-center pb-2 border-b border-white/5">
              <span className="text-2xl font-black text-white">Student Hub</span>
              <p className="text-xs text-gray-400 mt-1">Active Membership Portal</p>
            </div>

            <div className="space-y-3">
              {[
                'Free resource library access',
                'Priority 24/7 AI tutor support',
                'Advanced performance analytics',
                'Customized learning pathway',
              ].map((perk, i) => (
                <div key={i} className="flex items-center gap-2.5 text-xs text-gray-300">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{perk}</span>
                </div>
              ))}
            </div>

            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[11px] text-gray-300 font-medium">Session Status</span>
              </div>
              <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/20">Online</span>
            </div>

            <button
              onClick={handleLogout}
              className="w-full py-3 rounded-2xl bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg"
            >
              <LogOut className="w-4 h-4" /> Sign Out from Account
            </button>
          </div>
        </motion.div>

      </div>
    </motion.div>
  );
}