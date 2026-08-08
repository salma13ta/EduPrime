"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AppProvider, useApp } from "@/app/context/AppContext";

import AdminSidebar from "./components/AdminSidebar";
import AdminHeaderBar from "./components/AdminHeaderBar";

import DashboardView from "./components/dashboard";
import BranchesView from "./components/branches";
import TeachersView from "./components/teachers";
import StudentsView from "./components/students";
import SchedulesView from "./components/schedules";
import PaymentsView from "./components/payments";
import RevenueView from "./components/revenue";
import AnalyticsView from "./components/analytics";
import ReportsView from "./components/reports";
import NotificationsView from "./components/notifications";
import QrAttendanceView from "./components/qr-attendance";
import SupportView from "./components/support";
import SettingsView from "./components/settings";

function AdminDashboardContent() {
  const [activeTab, setActiveTab] = useState("Dashboard");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { systemSettings } = useApp();

  const renderActiveComponent = () => {
    switch (activeTab.toLowerCase()) {
      case "dashboard": return <DashboardView />;
      case "branches": return <BranchesView />;
      case "teachers": return <TeachersView />;
      case "students": return <StudentsView />;
      case "schedules": return <SchedulesView />;
      case "payments": return <PaymentsView />;
      case "revenue": return <RevenueView />;
      case "analytics": return <AnalyticsView />;
      case "reports": return <ReportsView />;
      case "notifications": return <NotificationsView />;
      case "qr attendance": return <QrAttendanceView />;
      case "support": return <SupportView />;
      case "settings": return <SettingsView />;
      default: return <DashboardView />;
    }
  };

  return (
    // الحاوية الرئيسية تأخذ ارتفاع الشاشة بالكامل وتمنع خروج المحتوى خارجها
    <div className={`flex h-screen w-screen overflow-hidden ${systemSettings.themeMode === 'light' ? 'bg-gray-100 text-gray-900' : 'bg-[#0b0f19] text-gray-100'} font-sans antialiased transition-colors duration-300`}>
      
      {/* 1. السايدبار ثابت ولا يتحرك أبداً مع الاسكرول */}
      <AdminSidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        mobileMenuOpen={mobileMenuOpen} 
        setMobileMenuOpen={setMobileMenuOpen} 
      />

      {/* منطقة المحتوى بجانب السايدبار */}
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
        
        {/* 2. الهيدر ثابت في أعلى المحتوى */}
        <AdminHeaderBar 
          setActiveTab={setActiveTab} 
          setMobileMenuOpen={setMobileMenuOpen} 
        />

        {/* 3. المحتوى الداخلي هو الوحيد الذي يحتوي على Scrollbar ويسكرول براحته */}
        <main className="flex-1 overflow-y-auto custom-scrollbar p-4 sm:p-6 md:p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 15, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -15, filter: "blur(4px)" }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="space-y-6 md:space-y-8 pb-20"
            >
              {renderActiveComponent()}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}

export default function AdminDashboardPage() {
  return (
    <AppProvider>
      <AdminDashboardContent />
    </AppProvider>
  );
}