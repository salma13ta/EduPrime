'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, BookOpen, Calendar, FileText, 
  GraduationCap, Award, Star, TrendingUp, MessageSquare, 
  CreditCard, Settings, LogOut, Bell, Menu, X 
} from 'lucide-react';

interface Props {
  user: { name: string; email: string; role: string };
  activeTab: string;
  setActiveTab: (tab: string) => void;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
  onOpenNotifications: () => void;
}

export const navItems = [
  { name: 'Dashboard', icon: LayoutDashboard },
  { name: 'My Courses', icon: BookOpen },
  { name: 'Schedule', icon: Calendar },
  { name: 'Homework', icon: FileText, badge: '3' },
  { name: 'Exams', icon: GraduationCap },
  { name: 'Certificates', icon: Award },
  { name: 'Achievements', icon: Star },
  { name: 'Progress', icon: TrendingUp },
  { name: 'Messages', icon: MessageSquare, badge: '5' },
  { name: 'Payments', icon: CreditCard },
  { name: 'Settings', icon: Settings },
];

export default function StudentSidebar({ 
  user, activeTab, setActiveTab, mobileMenuOpen, setMobileMenuOpen, onOpenNotifications 
}: Props) {
  const firstName = user.name.split(' ')[0] || 'Student';

  return (
    <>
      {/* 📱 Mobile Top Header Navigation */}
      <div className="md:hidden flex items-center justify-between p-4 bg-[#0c0a18]/90 backdrop-blur-xl border-b border-white/10 sticky top-0 z-40">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 bg-gradient-to-tr from-purple-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-purple-600/30">
            <GraduationCap className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="font-bold text-sm">EduPrime</h1>
            <p className="text-[10px] text-purple-400 capitalize">{user.role} Portal</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button 
            onClick={onOpenNotifications}
            className="relative p-2 rounded-xl bg-white/5 border border-white/10 text-gray-300"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-purple-500 rounded-full animate-ping" />
          </button>
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl bg-purple-600/20 border border-purple-500/30 text-purple-300"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* 📱 Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#0a0914] border-b border-white/10 overflow-hidden sticky top-[61px] z-30 px-4 py-3 space-y-1"
          >
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.name;
              return (
                <button
                  key={item.name}
                  onClick={() => {
                    setActiveTab(item.name);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-purple-600 text-white font-bold shadow-lg shadow-purple-600/30'
                      : 'text-gray-400 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4" />
                    <span>{item.name}</span>
                  </div>
                  {item.badge && (
                    <span className="px-2 py-0.5 text-[10px] bg-purple-500/30 text-purple-300 border border-purple-500/40 rounded-full font-bold">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>

      {/* 🖥️ Desktop Navigation Sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-[#0a0914] border-r border-white/5 p-5 justify-between shrink-0 min-h-screen sticky top-0 h-screen overflow-y-auto z-20">
        <div className="space-y-6">
          <div className="flex items-center gap-3 px-2">
            <div className="w-10 h-10 bg-gradient-to-tr from-purple-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-purple-600/30">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="font-bold text-base tracking-wide">EduPrime</h2>
              <p className="text-[11px] text-purple-400 capitalize">{user.role} Portal</p>
            </div>
          </div>

          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.name;
              return (
                <button
                  key={item.name}
                  onClick={() => setActiveTab(item.name)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                    isActive
                      ? 'bg-purple-600/20 border border-purple-500/40 text-purple-300 font-semibold shadow-inner'
                      : 'text-gray-400 hover:bg-white/5 hover:text-white border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4" />
                    <span>{item.name}</span>
                  </div>
                  {item.badge && (
                    <span className="px-2 py-0.5 text-[10px] bg-purple-600 text-white rounded-full font-bold">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* 👤 Protected Clean Profile Footer Component (No Overlaps) */}
        <div className="p-3 bg-[#121020] border border-white/10 rounded-2xl flex items-center justify-between relative overflow-hidden">
          <div 
            onClick={() => setActiveTab('Settings')}
            className="flex items-center gap-3 min-w-0 cursor-pointer flex-1"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-purple-500 to-fuchsia-500 flex items-center justify-center font-bold text-xs shadow-md shrink-0 border border-white/10">
              {firstName.charAt(0)}
            </div>
            <div className="truncate">
              <p className="text-xs font-bold text-white truncate">{user.name}</p>
              <p className="text-[10px] text-gray-400 truncate">{user.email}</p>
            </div>
          </div>
          
          <button 
            onClick={() => setActiveTab('Settings')}
            className="text-gray-400 hover:text-red-400 transition-colors p-2 rounded-xl hover:bg-white/5 shrink-0 cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </aside>
    </>
  );
}