"use client";

import React, { createContext, useContext, useState } from "react";

interface AppContextType {
  adminProfile: any;
  setAdminProfile: React.Dispatch<React.SetStateAction<any>>;
  systemSettings: any;
  setSystemSettings: React.Dispatch<React.SetStateAction<any>>;
  branches: any[];
  setBranches: React.Dispatch<React.SetStateAction<any[]>>;
  teachers: any[];
  setTeachers: React.Dispatch<React.SetStateAction<any[]>>;
  notifications: any[];
  setNotifications: React.Dispatch<React.SetStateAction<any[]>>;
  students: any[];
  setStudents: React.Dispatch<React.SetStateAction<any[]>>;
  handleLogout: () => void;
  addBranch: (branch: { name: string; location: string; revenue: string }) => void;
  addTeacher: (teacher: { name: string; subject: string }) => void;
  markAllNotificationsRead: () => void;
  triggerQRGeneration: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [adminProfile, setAdminProfile] = useState({
    name: "Alex Johnson",
    email: "alex@example.com",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100",
    role: "Admin Panel",
  });

  const [systemSettings, setSystemSettings] = useState({
    hubName: "Apex Learning Hub",
    branchesCount: 3,
    studentsCount: 635,
    currentDate: "July 2026",
    themeMode: "dark",
    currency: "USD ($)",
  });

  const [branches, setBranches] = useState([
    { id: 1, name: "Downtown Campus", location: "Manhattan, NY", students: 240, teachers: 18, revenue: "$28.4k" },
    { id: 2, name: "East Side Hub", location: "Brooklyn, NY", students: 185, teachers: 14, revenue: "$19.8k" },
    { id: 3, name: "West Campus", location: "Queens, NY", students: 210, teachers: 15, revenue: "$22.1k" },
  ]);

  // بيانات المعلمين الشاملة للسنتر
  const [teachers, setTeachers] = useState([
    { id: 1, name: "Dr. John Doe", subject: "Mathematics", students: 124, rating: 4.9, status: "active" },
    { id: 2, name: "Prof. Sarah Smith", subject: "Physics", students: 98, rating: 4.8, status: "active" },
    { id: 3, name: "Dr. Michael Vance", subject: "Chemistry", students: 156, rating: 4.9, status: "active" },
  ]);

  // بيانات الطلاب الافتراضية مع تفاصيلهم الكاملة
  const [students, setStudents] = useState([
    {
      id: 1,
      name: "Youssef Ahmed",
      email: "youssef@student.com",
      level: "Advanced (الثانوية العامة)",
      teachers: ["Dr. John Doe (Mathematics)", "Prof. Sarah Smith (Physics)"],
      paymentStatus: "Paid",
      paymentMethod: "Credit Card",
      tuitionFee: "$500",
      performance: "95%"
    },
    {
      id: 2,
      name: "Mariam Khaled",
      email: "mariam@student.com",
      level: "Intermediate (الصف الثاني الثانوي)",
      teachers: ["Dr. John Doe (Mathematics)"],
      paymentStatus: "Pending",
      paymentMethod: "Cash / Instapay",
      tuitionFee: "$350",
      performance: "88%"
    },
    {
      id: 3,
      name: "Omar Zizo",
      email: "omar@student.com",
      level: "Beginner (الصف الأول الثانوي)",
      teachers: ["Prof. Sarah Smith (Physics)", "Dr. Michael Vance (Chemistry)"],
      paymentStatus: "Paid",
      paymentMethod: "Bank Transfer",
      tuitionFee: "$400",
      performance: "91%"
    }
  ]);

  const [notifications, setNotifications] = useState([
    { id: 1, title: "Payment received from Emma T.", time: "2 min ago", read: false },
    { id: 2, title: "New student registration in Downtown", time: "15 min ago", read: false },
  ]);

  const addBranch = (newBranch: { name: string; location: string; revenue: string }) => {
    setBranches((prev) => [
      ...prev,
      { id: Date.now(), ...newBranch, students: 0, teachers: 0 }
    ]);
    setSystemSettings((prev: any) => ({ ...prev, branchesCount: prev.branchesCount + 1 }));
  };

  const addTeacher = (newTeacher: { name: string; subject: string }) => {
    setTeachers((prev) => [
      ...prev,
      { id: Date.now(), ...newTeacher, students: 0, rating: 5.0, status: "active" }
    ]);
  };

  const markAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const triggerQRGeneration = () => {
    alert("✨ QR Attendance Code Generated Successfully for Today's Session!");
  };

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      window.history.back();
    }
  };

  return (
    <AppContext.Provider
      value={{
        adminProfile,
        setAdminProfile,
        systemSettings,
        setSystemSettings,
        branches,
        setBranches,
        teachers,
        setTeachers,
        notifications,
        setNotifications,
        students,
        setStudents,
        handleLogout,
        addBranch,
        addTeacher,
        markAllNotificationsRead,
        triggerQRGeneration,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
};