'use client';

import { useState } from 'react';
import {
  GraduationCap, LayoutDashboard, BookOpen, Calendar, Video, FileText,
  Award, TrendingUp, MessageSquare, CreditCard, Settings, Search, Bell,
  Play, Clock, LogOut
} from 'lucide-react';

export default function StudentDashboard() {
  const [user] = useState(() => {
    if (typeof window === 'undefined') {
      return { name: 'Alex', email: 'alex@example.com' };
    }

    const saved = localStorage.getItem('eduprime_user');
    if (!saved) {
      return { name: 'Alex', email: 'alex@example.com' };
    }

    try {
      return JSON.parse(saved);
    } catch {
      return { name: 'Alex', email: 'alex@example.com' };
    }
  });

  return (
    <div className="min-h-screen bg-[#08070d] text-white flex font-sans select-none">

      {/* 🗂️ Left Sidebar */}
      <aside className="w-64 bg-[#0c0b12] border-r border-white/5 p-4 flex flex-col justify-between hidden md:flex">

        <div className="space-y-6">
          {/* Logo */}
          <div className="flex items-center gap-3 px-2">
            <div className="w-8 h-8 bg-purple-600 rounded-xl flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="font-bold text-sm tracking-wide">EduPrime</h1>
              <p className="text-[10px] text-gray-400">Student Portal</p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1">
            {[
              { label: 'Dashboard', icon: LayoutDashboard, active: true },
              { label: 'My Courses', icon: BookOpen },
              { label: 'Schedule', icon: Calendar },
              { label: 'Video Library', icon: Video },
              { label: 'Homework', icon: FileText, badge: '3' },
              { label: 'Exams', icon: FileText },
              { label: 'Certificates', icon: Award },
              { label: 'Achievements', icon: Award },
              { label: 'Progress', icon: TrendingUp },
              { label: 'Messages', icon: MessageSquare, badge: '5' },
              { label: 'Payments', icon: CreditCard },
              { label: 'Settings', icon: Settings },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.label}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs transition-all ${item.active
                      ? 'bg-purple-600/20 text-purple-300 font-semibold border border-purple-500/30'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                    }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className="bg-purple-600 text-white text-[9px] px-1.5 py-0.5 rounded-full font-bold">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* User Card Bottom */}
        <div className="bg-[#14121c] p-3 rounded-2xl border border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-purple-500/20 text-purple-300 rounded-full flex items-center justify-center font-bold text-xs border border-purple-500/30">
              {user.name.charAt(0)}
            </div>
            <div className="overflow-hidden">
              <p className="text-xs font-bold truncate">{user.name}</p>
              <p className="text-[10px] text-gray-500 truncate">{user.email}</p>
            </div>
          </div>
          <button className="text-gray-400 hover:text-red-400"><LogOut className="w-4 h-4" /></button>
        </div>

      </aside>

      {/* 💻 Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0">

        {/* Top Navigation Bar */}
        <header className="h-16 px-8 border-b border-white/5 flex items-center justify-between bg-[#0c0b12]">
          <div className="relative w-72">
            <Search className="w-4 h-4 text-gray-500 absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Search courses, assignments..."
              className="w-full bg-[#14121c] border border-white/5 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
            />
          </div>

          <div className="flex items-center gap-3">
            <button className="p-2 bg-[#14121c] border border-white/5 rounded-xl relative text-gray-400 hover:text-white">
              <Bell className="w-4 h-4" />
              <span className="w-2 h-2 bg-red-500 rounded-full absolute top-1.5 right-1.5"></span>
            </button>
            <div className="w-8 h-8 rounded-full bg-purple-600 border border-white/10 flex items-center justify-center text-xs font-bold">
              {user.name.charAt(0)}
            </div>
          </div>
        </header>

        {/* Dashboard Main Grid Body */}
        <div className="flex-1 p-8 overflow-y-auto space-y-6">

          {/* Welcome Banner */}
          <div className="bg-gradient-to-r from-[#1b1035] via-[#120d24] to-[#0c0b12] border border-purple-500/20 p-6 rounded-3xl relative overflow-hidden flex justify-between items-center">
            <div className="space-y-2 max-w-lg z-10">
              <span className="bg-emerald-500/20 text-emerald-400 text-[11px] px-3 py-1 rounded-full border border-emerald-500/30 font-semibold">
                🔥 7-Day Streak!
              </span>
              <h2 className="text-2xl font-bold pt-1">Good afternoon, {user.name}! 👋</h2>
              <p className="text-xs text-gray-400">You have 3 classes today and 2 assignments due. Keep up the great work!</p>

              <div className="flex gap-3 pt-2">
                <button className="bg-purple-600 hover:bg-purple-500 px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 shadow-lg shadow-purple-600/30">
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Continue Learning</span>
                </button>
                <button className="bg-white/5 hover:bg-white/10 border border-white/10 px-5 py-2.5 rounded-xl text-xs font-medium text-gray-300">
                  Take Practice Exam
                </button>
              </div>
            </div>
          </div>

          {/* 4 Stat Cards Row */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-[#0f0e17] border border-white/5 p-4 rounded-2xl">
              <div className="flex items-center justify-between">
                <div className="p-2 bg-purple-500/10 rounded-xl text-purple-400"><TrendingUp className="w-4 h-4" /></div>
                <span className="text-xs text-emerald-400 font-semibold">↑ +4%</span>
              </div>
              <h3 className="text-2xl font-bold mt-3">88%</h3>
              <p className="text-xs text-gray-500">Overall Score</p>
            </div>

            <div className="bg-[#0f0e17] border border-white/5 p-4 rounded-2xl">
              <div className="flex items-center justify-between">
                <div className="p-2 bg-indigo-500/10 rounded-xl text-indigo-400"><BookOpen className="w-4 h-4" /></div>
                <span className="text-xs text-emerald-400 font-semibold">↑ +1</span>
              </div>
              <h3 className="text-2xl font-bold mt-3">4</h3>
              <p className="text-xs text-gray-500">Courses Active</p>
            </div>

            <div className="bg-[#0f0e17] border border-white/5 p-4 rounded-2xl">
              <div className="flex items-center justify-between">
                <div className="p-2 bg-blue-500/10 rounded-xl text-blue-400"><Clock className="w-4 h-4" /></div>
                <span className="text-xs text-emerald-400 font-semibold">↑ +12h</span>
              </div>
              <h3 className="text-2xl font-bold mt-3">124h</h3>
              <p className="text-xs text-gray-500">Hours Studied</p>
            </div>

            <div className="bg-[#0f0e17] border border-white/5 p-4 rounded-2xl">
              <div className="flex items-center justify-between">
                <div className="p-2 bg-emerald-500/10 rounded-xl text-emerald-400"><Award className="w-4 h-4" /></div>
                <span className="text-xs text-emerald-400 font-semibold">↑ +2</span>
              </div>
              <h3 className="text-2xl font-bold mt-3">12</h3>
              <p className="text-xs text-gray-500">Achievements</p>
            </div>
          </div>

          {/* Academic Performance Graph & Subject Scores Split */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            {/* Academic Performance Curve Mockup */}
            <div className="lg:col-span-2 bg-[#0f0e17] border border-white/5 p-6 rounded-3xl flex flex-col justify-between">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-sm">Academic Performance</h3>
                <span className="text-xs bg-white/5 px-3 py-1 rounded-lg border border-white/5 text-gray-400">This Year</span>
              </div>

              {/* Vector SVG Curved Graph */}
              <div className="w-full h-48 relative flex items-end">
                <svg className="w-full h-full overflow-visible" viewBox="0 0 500 150">
                  <path
                    d="M 0 120 Q 120 100, 250 60 T 500 20"
                    fill="none"
                    stroke="#7c3aed"
                    strokeWidth="3"
                  />
                  <circle cx="0" cy="120" r="4" fill="#7c3aed" />
                  <circle cx="125" cy="100" r="4" fill="#7c3aed" />
                  <circle cx="250" cy="60" r="4" fill="#7c3aed" />
                  <circle cx="500" cy="20" r="4" fill="#7c3aed" />
                </svg>
              </div>

              <div className="flex justify-between text-[11px] text-gray-500 pt-4 border-t border-white/5">
                <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span><span>Jul</span>
              </div>
            </div>

            {/* Subject Scores Progress Bars */}
            <div className="bg-[#0f0e17] border border-white/5 p-6 rounded-3xl space-y-4">
              <h3 className="font-bold text-sm">Subject Scores</h3>

              {[
                { subject: 'Math', percent: 88, color: 'bg-purple-600' },
                { subject: 'Science', percent: 76, color: 'bg-indigo-500' },
                { subject: 'English', percent: 92, color: 'bg-cyan-500' },
                { subject: 'History', percent: 71, color: 'bg-amber-500' },
              ].map((item) => (
                <div key={item.subject} className="space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-300">{item.subject}</span>
                    <span className="font-bold text-white">{item.percent}%</span>
                  </div>
                  <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
                    <div className={`h-full ${item.color} rounded-full`} style={{ width: `${item.percent}%` }}></div>
                  </div>
                </div>
              ))}
            </div>

          </div>

        </div>

      </main>
    </div>
  );
}