"use client";

import React from "react";
import StatsOverviewGrid from "./StatsOverviewGrid";
import RevenueAndMixSection from "./RevenueAndMixSection";
import BranchesAndTeachersSection from "./BranchesAndTeachersSection";
import BookingsAndNotificationsSection from "./BookingsAndNotificationsSection";

export default function DashboardView() {
  return (
    <div className="space-y-6 md:space-y-8">
      <StatsOverviewGrid />
      <RevenueAndMixSection />
      <BranchesAndTeachersSection />
      <BookingsAndNotificationsSection />
    </div>
  );
}