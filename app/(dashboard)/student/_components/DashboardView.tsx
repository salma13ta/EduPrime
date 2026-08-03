'use client';

import React from 'react';
import WelcomeBanner from './WelcomeBanner';
import StatCards from './StatCards';
import PerformanceSection from './PerformanceSection';
import CoursesAndSidebar from './CoursesAndSidebar';

export default function DashboardView() {
  const firstName = 'Alex';

  return (
    <div className="space-y-6">
      <WelcomeBanner firstName={firstName} />
      <StatCards />
      <PerformanceSection />
      <CoursesAndSidebar firstName={firstName} />
    </div>
  );
}