'use client';

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  User, Bell, Shield, Palette, Save, CheckCircle2,
  Camera, Lock, Smartphone, Key, Moon, Sun, Monitor, Check
} from 'lucide-react';

interface TeacherProfile {
  name: string;
  title: string;
  email: string;
  phone: string;
  bio: string;
  avatar: string;
}

interface Props {
  teacherProfile: TeacherProfile;
  setTeacherProfile: React.Dispatch<React.SetStateAction<TeacherProfile>>;
}

// Variants للتحكم بحركة محتوى التبويبات
const tabContentVariants = {
  hidden: { opacity: 0, x: 20, scale: 0.98 },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: { type: 'spring', stiffness: 300, damping: 25 }
  },
  exit: { opacity: 0, x: -20, scale: 0.98, transition: { duration: 0.15 } }
};

export default function TeacherSettingsView({ teacherProfile, setTeacherProfile }: Props) {
  const [activeSubTab, setActiveSubTab] = useState('profile');
  const [saved, setSaved] = useState(false);
  const [formState, setFormState] = useState<TeacherProfile>({ ...teacherProfile });
  const avatarInputRef = useRef<HTMLInputElement>(null);

  // إعدادات إضافية للتجربة التفاعلية
  const [notifications, setNotifications] = useState({ email: true, push: true, sms: false });
  const [theme, setTheme] = useState<'dark' | 'light' | 'system'>('dark');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setTeacherProfile(formState);
    setSaved(true);
    setTimeout(() => setSaved(false), 3500);
  };

  // رفع صورة جديدة برابط مؤقت
  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const imageUrl = URL.createObjectURL(file);
      setFormState((prev) => ({ ...prev, avatar: imageUrl }));
    }
  };

  const tabs = [
    { id: 'profile', label: 'Profile Info', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security & Auth', icon: Shield },
    { id: 'appearance', label: 'Appearance', icon: Palette },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.3 }}
      className="space-y-6 max-w-5xl mx-auto px-2 sm:px-4"
    >
      {/* Title Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/5">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">Teacher Settings</h1>
          <p className="text-xs text-gray-400 mt-0.5">Manage your profile, preferences, and notifications</p>
        </div>

        {/* Live Saved Alert Banner */}
        <AnimatePresence>
          {saved && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold shadow-lg shadow-emerald-500/10"
            >
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>Profile Updated Live Across Dashboard!</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Main Grid Section */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-start">

        {/* Navigation Tabs (Horizontal on Mobile / Vertical on Desktop) */}
        <div className="flex md:flex-col overflow-x-auto no-scrollbar gap-1.5 p-1 bg-white/[0.02] md:bg-transparent rounded-2xl border border-white/5 md:border-none">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeSubTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveSubTab(tab.id)}
                className={`relative flex items-center gap-2.5 px-4 py-3 rounded-xl sm:rounded-2xl text-xs font-semibold transition-all whitespace-nowrap cursor-pointer shrink-0 md:w-full ${isActive
                    ? 'text-purple-300 font-bold'
                    : 'text-gray-400 hover:bg-white/5 hover:text-white'
                  }`}
              >
                {/* Active Tab Highlighting Animation */}
                {isActive && (
                  <motion.div
                    layoutId="activeSettingTab"
                    className="absolute inset-0 bg-purple-600/20 border border-purple-500/40 rounded-xl sm:rounded-2xl shadow-lg shadow-purple-900/20"
                    transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                  />
                )}
                <Icon className="w-4 h-4 relative z-10 shrink-0" />
                <span className="relative z-10">{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Content Area */}
        <div className="md:col-span-3">
          <form onSubmit={handleSave} className="p-4 sm:p-6 rounded-3xl bg-[#110f22] border border-white/5 space-y-6 shadow-xl">
            <AnimatePresence mode="wait">

              {/* --- TAB 1: PROFILE INFO --- */}
              {activeSubTab === 'profile' && (
                <motion.div
                  key="profile"
                  variants={tabContentVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="space-y-5"
                >
                  {/* Avatar Upload */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pb-5 border-b border-white/5">
                    <input
                      type="file"
                      ref={avatarInputRef}
                      onChange={handleAvatarChange}
                      accept="image/*"
                      className="hidden"
                    />
                    <div
                      onClick={() => avatarInputRef.current?.click()}
                      className="relative group cursor-pointer shrink-0"
                    >
                      <img
                        src={formState.avatar}
                        alt="Avatar"
                        className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover ring-2 ring-purple-500/40 shadow-md group-hover:opacity-80 transition-all"
                      />
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="absolute inset-0 bg-black/60 rounded-2xl flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity gap-1"
                      >
                        <Camera className="w-5 h-5 text-purple-300" />
                        <span className="text-[9px] text-white font-medium">Change</span>
                      </motion.div>
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-white">{formState.name}</h3>
                      <p className="text-[11px] text-gray-400 mt-0.5">Click photo to update. Allowed formats: JPG, PNG (Max 2MB)</p>
                    </div>
                  </div>

                  {/* Form Input Fields */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-semibold text-gray-300">Full Name</label>
                      <input
                        type="text"
                        value={formState.name}
                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-white/5 border border-white/10 rounded-xl text-xs text-white focus:border-purple-500 focus:bg-purple-500/5 outline-none transition-all"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[11px] font-semibold text-gray-300">Professional Title</label>
                      <input
                        type="text"
                        value={formState.title}
                        onChange={(e) => setFormState({ ...formState, title: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-white/5 border border-white/10 rounded-xl text-xs text-white focus:border-purple-500 focus:bg-purple-500/5 outline-none transition-all"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[11px] font-semibold text-gray-300">Email Address</label>
                      <input
                        type="email"
                        value={formState.email}
                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-white/5 border border-white/10 rounded-xl text-xs text-white focus:border-purple-500 focus:bg-purple-500/5 outline-none transition-all"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[11px] font-semibold text-gray-300">Phone Number</label>
                      <input
                        type="text"
                        value={formState.phone}
                        onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-white/5 border border-white/10 rounded-xl text-xs text-white focus:border-purple-500 focus:bg-purple-500/5 outline-none transition-all"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[11px] font-semibold text-gray-300">Bio & Experience Summary</label>
                    <textarea
                      rows={3}
                      value={formState.bio}
                      onChange={(e) => setFormState({ ...formState, bio: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-white/5 border border-white/10 rounded-xl text-xs text-white focus:border-purple-500 focus:bg-purple-500/5 outline-none resize-none transition-all"
                    />
                  </div>
                </motion.div>
              )}

              {/* --- TAB 2: NOTIFICATIONS --- */}
              {activeSubTab === 'notifications' && (
                <motion.div
                  key="notifications"
                  variants={tabContentVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="space-y-4"
                >
                  <h3 className="text-xs font-bold text-gray-300 uppercase tracking-wider">Notification Preferences</h3>
                  <div className="space-y-3">
                    {[
                      { key: 'email', title: 'Email Notifications', desc: 'Receive daily performance digests and student quiz updates.' },
                      { key: 'push', title: 'Browser Push Alerts', desc: 'Get real-time browser alerts when a student submits an exam.' },
                      { key: 'sms', title: 'SMS Security Alerts', desc: 'Receive instant text notifications for security logins.' }
                    ].map((item) => (
                      <div key={item.key} className="flex items-center justify-between p-3.5 rounded-2xl bg-white/[0.02] border border-white/5">
                        <div className="pr-4">
                          <p className="text-xs font-bold text-white">{item.title}</p>
                          <p className="text-[10px] text-gray-400 mt-0.5">{item.desc}</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => setNotifications({ ...notifications, [item.key]: !notifications[item.key as keyof typeof notifications] })}
                          className={`w-11 h-6 rounded-full transition-colors relative p-1 cursor-pointer shrink-0 ${notifications[item.key as keyof typeof notifications] ? 'bg-purple-600' : 'bg-white/10'
                            }`}
                        >
                          <motion.div
                            layout
                            className="w-4 h-4 bg-white rounded-full shadow-md"
                            animate={{ x: notifications[item.key as keyof typeof notifications] ? 20 : 0 }}
                            transition={{ type: "spring", stiffness: 500, damping: 30 }}
                          />
                        </button>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* --- TAB 3: SECURITY & AUTH --- */}
              {activeSubTab === 'security' && (
                <motion.div
                  key="security"
                  variants={tabContentVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="space-y-4"
                >
                  <h3 className="text-xs font-bold text-gray-300 uppercase tracking-wider">Password & Authentication</h3>
                  <div className="space-y-3">
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-semibold text-gray-300">Current Password</label>
                      <input type="password" placeholder="••••••••" className="w-full px-3.5 py-2.5 bg-white/5 border border-white/10 rounded-xl text-xs text-white focus:border-purple-500 outline-none" />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="space-y-1.5">
                        <label className="text-[11px] font-semibold text-gray-300">New Password</label>
                        <input type="password" placeholder="••••••••" className="w-full px-3.5 py-2.5 bg-white/5 border border-white/10 rounded-xl text-xs text-white focus:border-purple-500 outline-none" />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[11px] font-semibold text-gray-300">Confirm Password</label>
                        <input type="password" placeholder="••••••••" className="w-full px-3.5 py-2.5 bg-white/5 border border-white/10 rounded-xl text-xs text-white focus:border-purple-500 outline-none" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* --- TAB 4: APPEARANCE --- */}
              {activeSubTab === 'appearance' && (
                <motion.div
                  key="appearance"
                  variants={tabContentVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="space-y-4"
                >
                  <h3 className="text-xs font-bold text-gray-300 uppercase tracking-wider">Dashboard Theme</h3>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { id: 'dark', label: 'Dark Mode', icon: Moon },
                      { id: 'light', label: 'Light Mode', icon: Sun },
                      { id: 'system', label: 'System', icon: Monitor },
                    ].map((mode) => {
                      const Icon = mode.icon;
                      const isSelected = theme === mode.id;
                      return (
                        <button
                          key={mode.id}
                          type="button"
                          onClick={() => setTheme(mode.id as 'dark' | 'light' | 'system')}
                          className={`p-3.5 rounded-2xl border flex flex-col items-center gap-2 transition-all cursor-pointer ${isSelected
                              ? 'bg-purple-600/20 border-purple-500 text-purple-300 font-bold shadow-lg shadow-purple-900/20'
                              : 'bg-white/[0.02] border-white/5 text-gray-400 hover:text-white'
                            }`}
                        >
                          <Icon className="w-5 h-5" />
                          <span className="text-xs">{mode.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </motion.div>
              )}

            </AnimatePresence>

            {/* Submit / Save Button */}
            <div className="pt-4 border-t border-white/5 flex justify-end">
              <motion.button
                whileHover={{ scale: 1.03, boxShadow: "0px 10px 25px rgba(147, 51, 234, 0.4)" }}
                whileTap={{ scale: 0.96 }}
                type="submit"
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-xs font-bold text-white shadow-lg shadow-purple-600/30 transition-all cursor-pointer"
              >
                <Save className="w-4 h-4" /> Save Changes
              </motion.button>
            </div>
          </form>
        </div>

      </div>
    </motion.div>
  );
}