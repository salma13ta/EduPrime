'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// استدعاء المكونات الجانبية والشاشات
import TeacherSidebar from './components/TeacherSidebar';
import TeacherDashboardView from './components/TeacherDashboardView';
import VideoPlatformView from './components/VideoPlatformView';
import HomeworkManagementView from './components/HomeworkManagementView';
import TeacherSettingsView from './components/TeacherSettingsView';
import OnlineExamView from './components/OnlineExamView';
import AdminCenterView from './components/AdminCenterView'; 
import AnalyticsView from './components/AnalyticsView'; 
import CenterProfileView from './components/CenterProfileView';
import ParentPortalView from './components/ParentPortalView';
import BookAClassView from './components/BookAClassView';
import PaymentsAndBillingView from './components/PaymentsAndBillingView';
import MessagesView from './components/MessagesView'; // 👈 1. استدعاء شاشة المراسلات والـ Chat الجديدة

export default function TeacherPage() {
  const [activeTab, setActiveTab] = useState('Teacher Dashboard');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Global Profile State
  const [teacherProfile, setTeacherProfile] = useState({
    name: 'Dr. Ahmed Hassan',
    title: 'Senior Mathematics & Calculus Specialist',
    email: 'ahmed.hassan@eduprime.com',
    phone: '+20 100 123 4567',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&q=80',
    bio: 'Over 12 years of teaching Advanced Calculus and Linear Algebra for high school and university levels.',
  });

  // Global Dynamic Stats State
  const [stats, setStats] = useState({
    totalStudents: 247,
    monthlyRevenue: 21400,
    classesToday: 4,
    homeworkDue: 28,
  });

  // Real-time Formatted Date
  const [currentFormattedDate, setCurrentFormattedDate] = useState('');

  useEffect(() => {
    const updateDate = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      };
      setCurrentFormattedDate(now.toLocaleDateString('en-US', options).toUpperCase());
    };
    updateDate();
  }, []);

  return (
    <div className="min-h-screen bg-[#08070d] text-white flex flex-col md:flex-row font-sans selection:bg-purple-500 selection:text-white">
      {/* Sidebar With Toggle Collapse Functionality */}
      <TeacherSidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
        teacherProfile={teacherProfile}
      />

      {/* Main Dynamic View Content */}
      <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-x-hidden min-w-0 transition-all duration-300">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
          >
            {/* 1. Teacher Dashboard View */}
            {activeTab === 'Teacher Dashboard' && (
              <TeacherDashboardView
                teacherProfile={teacherProfile}
                formattedDate={currentFormattedDate}
                stats={stats}
                setStats={setStats}
                setActiveTab={setActiveTab}
              />
            )}

            {/* 2. Video Platform View */}
            {activeTab === 'Video Platform' && <VideoPlatformView />}

            {/* 3. Homework View */}
            {activeTab === 'Homework' && <HomeworkManagementView />}

            {/* 4. Online Exam View */}
            {activeTab === 'Online Exam' && <OnlineExamView />}

            {/* 5. Admin Center View */}
            {activeTab === 'Admin Center' && <AdminCenterView />}

            {/* 6. Analytics View */}
            {activeTab === 'Analytics' && <AnalyticsView />}

            {/* 7. Center Profile View */}
            {activeTab === 'Center Profile' && <CenterProfileView />}

            {/* 8. Parent View */}
            {(activeTab === 'Parent View' || activeTab === 'Parent Portal') && <ParentPortalView />}

            {/* 9. Book a Class View */}
            {(activeTab === 'Book a Class' || activeTab === 'Book a Session') && <BookAClassView />}

            {/* 10. Payments & Billing View */}
            {activeTab === 'Payments' && <PaymentsAndBillingView />}

            {/* 11. Messages View (👈 الشاشة الجديدة للمراسلات والدردشة المتكاملة) */}
            {activeTab === 'Messages' && <MessagesView />}

            {/* 12. Settings / Profile View */}
            {(activeTab === 'Settings' || activeTab === 'Teacher Profile') && (
              <TeacherSettingsView
                teacherProfile={teacherProfile}
                setTeacherProfile={setTeacherProfile}
              />
            )}

            {/* 13. Fallback View for Other Navigation Items */}
            {activeTab !== 'Teacher Dashboard' &&
              activeTab !== 'Video Platform' &&
              activeTab !== 'Homework' &&
              activeTab !== 'Online Exam' &&
              activeTab !== 'Admin Center' &&
              activeTab !== 'Analytics' &&
              activeTab !== 'Center Profile' &&
              activeTab !== 'Parent View' &&
              activeTab !== 'Parent Portal' &&
              activeTab !== 'Book a Class' &&
              activeTab !== 'Book a Session' &&
              activeTab !== 'Payments' &&
              activeTab !== 'Messages' &&
              activeTab !== 'Settings' &&
              activeTab !== 'Teacher Profile' && (
                <div className="p-8 rounded-3xl bg-[#110f22] border border-white/5 min-h-[400px] flex flex-col items-center justify-center text-center space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-purple-600/20 text-purple-400 flex items-center justify-center font-black text-xl">
                    {activeTab[0]}
                  </div>
                  <h2 className="text-base font-bold text-white">{activeTab} Module</h2>
                  <p className="text-xs text-gray-400 max-w-sm">
                    Connected live to global state. Current user: {teacherProfile.name}
                  </p>
                </div>
              )}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}