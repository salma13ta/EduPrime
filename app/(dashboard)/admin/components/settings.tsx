"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useApp } from "@/app/context/AppContext";
import { FiSave, FiSettings, FiMoon, FiBell, FiGlobe, FiUser } from "react-icons/fi";

export default function SettingsView() {
  const { adminProfile, setAdminProfile, systemSettings, setSystemSettings } = useApp();

  const [formData, setFormData] = useState({
    name: adminProfile.name,
    email: adminProfile.email,
    avatar: adminProfile.avatar,
    hubName: systemSettings.hubName,
    themeMode: systemSettings.themeMode,
    currency: systemSettings.currency,
  });

  const [savedMessage, setSavedMessage] = useState(false);

  const handleChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    // تحديث الحالة العامة لتعكس التغييرات في الشريط الجانبي وكل الشاشات
    setAdminProfile((prev: any) => ({
      ...prev,
      name: formData.name,
      email: formData.email,
      avatar: formData.avatar,
    }));
    setSystemSettings({
      hubName: formData.hubName,
      themeMode: formData.themeMode,
      currency: formData.currency,
    });

    setSavedMessage(true);
    setTimeout(() => setSavedMessage(false), 3000);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto bg-[#131b2e] border border-gray-800/80 rounded-2xl p-6 sm:p-8 shadow-xl"
    >
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-800">
        <div className="p-3 bg-indigo-600/20 text-indigo-400 rounded-xl border border-indigo-500/30">
          <FiSettings className="text-xl" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-white">System & Profile Settings</h2>
          <p className="text-xs text-gray-400">Manage your profile details and platform global preferences</p>
        </div>
      </div>

      {savedMessage && (
        <div className="mb-6 p-4 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs rounded-xl font-semibold flex items-center justify-between">
          <span>Changes saved successfully and updated across the sidebar and platform!</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        {/* Profile Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-2">Admin Name</label>
            <input 
              type="text" 
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
              className="w-full bg-[#1a233a] border border-gray-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-2">Email Address</label>
            <input 
              type="email" 
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
              className="w-full bg-[#1a233a] border border-gray-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-300 mb-2">Avatar Image URL</label>
          <input 
            type="text" 
            value={formData.avatar}
            onChange={(e) => handleChange("avatar", e.target.value)}
            className="w-full bg-[#1a233a] border border-gray-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500"
          />
        </div>

        {/* Platform Hub Name */}
        <div>
          <label className="block text-xs font-semibold text-gray-300 mb-2">Platform / Hub Name</label>
          <input 
            type="text" 
            value={formData.hubName}
            onChange={(e) => handleChange("hubName", e.target.value)}
            className="w-full bg-[#1a233a] border border-gray-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500"
          />
        </div>

        {/* Theme Mode */}
        <div className="flex items-center justify-between p-4 bg-[#1a233a]/50 border border-gray-800 rounded-xl">
          <div className="flex items-center gap-3">
            <FiMoon className="text-indigo-400 text-lg" />
            <div>
              <h4 className="text-xs font-bold text-white">Theme Appearance</h4>
              <p className="text-[11px] text-gray-400">Choose between dark and light themes</p>
            </div>
          </div>
          <select 
            value={formData.themeMode}
            onChange={(e) => handleChange("themeMode", e.target.value)}
            className="bg-[#131b2e] border border-gray-800 text-white text-xs rounded-lg px-3 py-2 focus:outline-none focus:border-indigo-500"
          >
            <option value="dark">Dark Mode</option>
            <option value="light">Light Mode</option>
          </select>
        </div>

        {/* Currency */}
        <div className="flex items-center justify-between p-4 bg-[#1a233a]/50 border border-gray-800 rounded-xl">
          <div className="flex items-center gap-3">
            <FiGlobe className="text-indigo-400 text-lg" />
            <div>
              <h4 className="text-xs font-bold text-white">Default Currency</h4>
              <p className="text-[11px] text-gray-400">Set tracking currency</p>
            </div>
          </div>
          <select 
            value={formData.currency}
            onChange={(e) => handleChange("currency", e.target.value)}
            className="bg-[#131b2e] border border-gray-800 text-white text-xs rounded-lg px-3 py-2 focus:outline-none focus:border-indigo-500"
          >
            <option value="USD ($)">USD ($)</option>
            <option value="EUR (€)">EUR (€)</option>
            <option value="GBP (£)">GBP (£)</option>
          </select>
        </div>

        {/* Save Button */}
        <div className="pt-4 flex justify-end">
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-6 py-2.5 rounded-xl text-xs shadow-lg shadow-indigo-600/30 transition flex items-center gap-2 cursor-pointer"
          >
            <FiSave />
            <span>Save Configurations</span>
          </motion.button>
        </div>
      </form>
    </motion.div>
  );
}