'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Shield, BookOpen, GraduationCap, LogOut, Check, Save } from 'lucide-react';

interface Props {
  user: { name: string; email: string; role: string };
  setUser: React.Dispatch<React.SetStateAction<{ name: string; email: string; role: string }>>;
  setActiveTab: (tab: string) => void;
}

export default function SettingsView({ user, setUser, setActiveTab }: Props) {
  const [formData, setFormData] = useState({ name: user.name, email: user.email });
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setUser((prev) => ({ ...prev, name: formData.name, email: formData.email }));
    localStorage.setItem('eduprime_user', JSON.stringify({ ...user, ...formData }));
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const handleLogout = () => {
    localStorage.removeItem('eduprime_user');
    window.location.reload();
  };

  const courses = [
    { title: 'Advanced Calculus', code: 'MATH-301', score: '92%', grade: 'A' },
    { title: 'Organic Chemistry', code: 'CHEM-204', score: '88%', grade: 'A-' },
    { title: 'Quantum Physics', code: 'PHYS-402', score: '79%', grade: 'B+' },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6 max-w-5xl"
    >
      <div>
        <h1 className="text-2xl font-bold">Account & Profile Settings</h1>
        <p className="text-xs text-gray-400">إدارة معلوماتك الشخصية، معايرة كورساتك ودرجاتك، وحالة الحساب</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Personal Details Form */}
        <div className="lg:col-span-2 space-y-6">
          <form onSubmit={handleSave} className="p-6 rounded-3xl bg-[#110f22] border border-purple-500/20 space-y-5 shadow-xl">
            <h3 className="text-sm font-bold text-white flex items-center gap-2 border-b border-white/5 pb-3">
              <User className="w-4 h-4 text-purple-400" /> General Information
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
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white focus:border-purple-500 outline-none"
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
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white focus:border-purple-500 outline-none"
                  />
                </div>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between">
              <span className="text-[11px] text-gray-400 flex items-center gap-1">
                <Shield className="w-3.5 h-3.5 text-emerald-400" /> Account Security Active
              </span>
              <button
                type="submit"
                className="px-5 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl text-xs font-bold text-white flex items-center gap-2 shadow-lg shadow-purple-600/30 hover:brightness-110 transition-all cursor-pointer"
              >
                {saved ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
                {saved ? 'Saved!' : 'Save Changes'}
              </button>
            </div>
          </form>

          {/* Enrolled Courses & Academic Scores */}
          <div className="p-6 rounded-3xl bg-[#110f22] border border-purple-500/20 space-y-4 shadow-xl">
            <h3 className="text-sm font-bold text-white flex items-center gap-2 border-b border-white/5 pb-3">
              <GraduationCap className="w-4 h-4 text-purple-400" /> Enrolled Courses & Overall Scores
            </h3>

            <div className="space-y-3">
              {courses.map((c, i) => (
                <div key={i} className="p-3.5 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-purple-600/20 text-purple-300">
                      <BookOpen className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white">{c.title}</h4>
                      <p className="text-[10px] text-gray-400">{c.code}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-bold text-cyan-300">{c.score}</span>
                    <span className="text-xs font-black px-2.5 py-1 rounded-lg bg-purple-500/20 text-purple-300 border border-purple-500/30">
                      {c.grade}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Action Panel */}
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-[#110f22] border border-purple-500/20 space-y-5 shadow-xl text-center flex flex-col items-center">
            {/* الأفاتار المعالج لتجنب تداخل الشعار الناتيج عن زوائد البيئة */}
            <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-purple-600 to-fuchsia-600 flex items-center justify-center font-bold text-2xl shadow-xl border-2 border-white/10 relative z-10">
              {user.name.charAt(0)}
            </div>
            <div>
              <h3 className="text-base font-bold text-white">{user.name}</h3>
              <p className="text-xs text-gray-400">{user.email}</p>
              <span className="inline-block mt-2 px-3 py-1 rounded-full bg-purple-600/20 border border-purple-500/30 text-[10px] font-bold text-purple-300 uppercase">
                {user.role}
              </span>
            </div>

            <button
              onClick={handleLogout}
              className="w-full py-3 rounded-2xl bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer mt-4"
            >
              <LogOut className="w-4 h-4" /> Sign Out from Account
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}