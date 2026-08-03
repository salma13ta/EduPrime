'use client';

import React, { useState, useEffect } from 'react';
import { Search, Bell } from 'lucide-react';
import StudentSidebar from './_components/StudentSidebar';
import WelcomeBanner from './_components/WelcomeBanner';
import StatCards from './_components/StatCards';
import PerformanceSection from './_components/PerformanceSection';
import CoursesAndSidebar from './_components/CoursesAndSidebar';
import SettingsView from './_components/SettingsView';
import NotificationsModal from './_components/NotificationsModal';

export default function StudentDashboardPage() {
  const [user, setUser] = useState({
    name: 'Alex Johnson',
    email: 'alex@example.com',
    role: 'student',
  });

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  useEffect(() => {
    const savedUser = localStorage.getItem('eduprime_user');
    if (savedUser) {
      try {
        const parsed = JSON.parse(savedUser);
        if (parsed.name) setUser(parsed);
      } catch (e) {
        console.error('Error loading user', e);
      }
    }
  }, []);

  const firstName = user.name.split(' ')[0] || 'Student';

  return (
    <div className="min-h-screen bg-[#08070d] text-white flex flex-col md:flex-row font-sans selection:bg-purple-500 selection:text-white relative">
      
      {/* Dynamic Notifications Panel */}
      <NotificationsModal
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
      />

      {/* Sidebar Component */}
      <StudentSidebar
        user={user}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        onOpenNotifications={() => setIsNotificationsOpen(true)}
      />

      {/* Main Area */}
      <main className="flex-1 p-4 md:p-8 space-y-6 overflow-x-hidden">
        
        {/* Top Header Bar */}
        <div className="hidden md:flex items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Search courses, assignments..."
              className="w-full pl-10 pr-4 py-2.5 bg-[#12101e] border border-white/10 rounded-xl text-xs text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 transition-all"
            />
          </div>

          <div className="flex items-center gap-3">
            <button 
              onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
              className="relative p-2.5 bg-[#12101e] border border-white/10 rounded-xl text-gray-300 hover:text-white transition-all cursor-pointer"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-purple-500 rounded-full animate-ping" />
            </button>
            <div 
              onClick={() => setActiveTab('Settings')}
              className="w-9 h-9 rounded-xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center font-bold text-xs text-purple-300 cursor-pointer hover:scale-105 transition-all"
            >
              {firstName.charAt(0)}
            </div>
          </div>
        </div>

        {/* Dynamic Views Rendering */}
        {activeTab === 'Dashboard' && (
          <>
            <WelcomeBanner firstName={firstName} />
            <StatCards />
            <PerformanceSection />
            <CoursesAndSidebar firstName={firstName} />
          </>
        )}

        {activeTab === 'Settings' && (
          <SettingsView user={user} setUser={setUser} setActiveTab={setActiveTab} />
        )}

        {activeTab !== 'Dashboard' && activeTab !== 'Settings' && (
          <div className="p-8 rounded-3xl bg-[#110f1e] border border-white/5 min-h-[450px] flex flex-col items-center justify-center text-center space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-purple-600/10 border border-purple-500/20 flex items-center justify-center text-purple-400 font-bold text-lg mb-2">
              {activeTab.charAt(0)}
            </div>
            <h2 className="text-xl font-bold text-white">{activeTab} Section</h2>
            <p className="text-xs text-gray-400 max-w-md">
              هذه الشاشة مجهزة للتفاعل السريع مع زر <span className="text-purple-400 font-bold">{activeTab}</span>.
            </p>
          </div>
        )}

      </main>
    </div>
  );
}