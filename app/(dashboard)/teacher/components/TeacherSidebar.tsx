'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { 
  LayoutDashboard, Video, FileText, GraduationCap, User, 
  Building2, BarChart2, ShieldCheck, Users, Calendar, 
  CreditCard, MessageSquare, Settings, LogOut, Menu, X, PanelLeftClose, PanelLeft
} from 'lucide-react';

interface Props {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
  isCollapsed: boolean;
  setIsCollapsed: (val: boolean) => void;
  teacherProfile: { name: string; title: string; avatar: string };
}

export const navGroups = [
  {
    group: 'TEACHING',
    items: [
      { name: 'Teacher Dashboard', icon: LayoutDashboard },
      { name: 'Video Platform', icon: Video },
      { name: 'Homework', icon: FileText, badge: '3' },
      { name: 'Online Exam', icon: GraduationCap },
      { name: 'Teacher Profile', icon: User },
    ]
  },
  {
    group: 'ADMIN',
    items: [
      { name: 'Admin Center', icon: Building2 },
      { name: 'Analytics', icon: BarChart2 },
      { name: 'Center Profile', icon: ShieldCheck },
    ]
  },
  {
    group: 'FAMILY',
    items: [
      { name: 'Parent View', icon: Users },
      { name: 'Book a Class', icon: Calendar },
      { name: 'Payments', icon: CreditCard },
    ]
  },
  {
    group: 'COMMS',
    items: [
      { name: 'Messages', icon: MessageSquare, badge: '5' },
    ]
  }
];

export default function TeacherSidebar({ 
  activeTab, 
  setActiveTab, 
  mobileMenuOpen, 
  setMobileMenuOpen, 
  isCollapsed, 
  setIsCollapsed,
  teacherProfile 
}: Props) {
  const router = useRouter();

  const handleSignOut = () => {
    router.push('/');
  };

  return (
    <>
      {/* Mobile Top Nav */}
      <div className="md:hidden flex items-center justify-between p-4 bg-[#090814] border-b border-white/5 sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-purple-600 flex items-center justify-center font-bold text-white text-sm">E</div>
          <div>
            <h2 className="font-extrabold text-sm text-white">EduPlex</h2>
            <p className="text-[9px] text-gray-400 tracking-wider">LEARNING PLATFORM</p>
          </div>
        </div>
        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2 rounded-xl bg-white/5 text-gray-300">
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#090814] border-b border-white/10 px-4 py-4 space-y-4 fixed inset-x-0 top-[57px] z-40 max-h-[80vh] overflow-y-auto"
          >
            {navGroups.map((group) => (
              <div key={group.group} className="space-y-1">
                <span className="text-[10px] font-bold text-gray-500 px-3 tracking-widest">{group.group}</span>
                {group.items.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.name}
                      onClick={() => { setActiveTab(item.name); setMobileMenuOpen(false); }}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                        activeTab === item.name ? 'bg-purple-600 text-white font-bold' : 'text-gray-400 hover:text-white'
                      }`}
                    >
                      <div className="flex items-center gap-2.5"><Icon className="w-4 h-4" /><span>{item.name}</span></div>
                      {item.badge && <span className="px-1.5 py-0.5 text-[9px] bg-purple-500/30 text-purple-300 rounded-full">{item.badge}</span>}
                    </button>
                  );
                })}
              </div>
            ))}
            
            <div className="pt-2 border-t border-white/10">
              <button 
                onClick={handleSignOut} 
                className="w-full flex items-center gap-2 px-3 py-2 text-xs font-bold text-rose-400 hover:bg-rose-500/10 rounded-xl"
              >
                <LogOut className="w-4 h-4" /> Sign Out
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop Dynamic Collapsible Sidebar */}
      <motion.aside 
        animate={{ width: isCollapsed ? '76px' : '250px' }}
        transition={{ duration: 0.25, ease: 'easeInOut' }}
        className="hidden md:flex flex-col bg-[#090814] border-r border-white/10 p-3.5 justify-between shrink-0 h-screen sticky top-0 overflow-y-auto z-30 select-none"
      >
        <div className="space-y-5">
          {/* Header Brand & Toggle Button */}
          <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'justify-between'} px-1 py-1`}>
            {!isCollapsed && (
              <div className="flex items-center gap-2.5 overflow-hidden">
                <div className="w-8 h-8 shrink-0 rounded-xl bg-purple-600 flex items-center justify-center font-black text-base text-white shadow-lg shadow-purple-600/30">E</div>
                <div className="truncate">
                  <h2 className="font-black text-xs text-white tracking-wide truncate">EduPlex</h2>
                  <p className="text-[8px] font-bold text-purple-400 tracking-widest uppercase truncate">Learning Platform</p>
                </div>
              </div>
            )}

            <button 
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="p-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-all cursor-pointer shrink-0"
              title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
            >
              {isCollapsed ? <PanelLeft className="w-4 h-4" /> : <PanelLeftClose className="w-4 h-4" />}
            </button>
          </div>

          {/* Navigation Groups */}
          <nav className="space-y-4">
            {navGroups.map((group) => (
              <div key={group.group} className="space-y-1">
                {!isCollapsed && (
                  <p className="text-[9px] font-extrabold text-gray-500 px-3 tracking-widest uppercase">{group.group}</p>
                )}
                {group.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.name;
                  return (
                    <motion.button
                      key={item.name}
                      whileHover={{ scale: 1.01, x: isCollapsed ? 0 : 2 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setActiveTab(item.name)}
                      className={`w-full flex items-center ${isCollapsed ? 'justify-center' : 'justify-between'} px-2.5 py-2 rounded-xl text-xs transition-all duration-150 cursor-pointer ${
                        isActive 
                          ? 'bg-purple-600/20 text-purple-300 font-bold border border-purple-500/30 shadow-md shadow-purple-900/20' 
                          : 'text-gray-400 hover:bg-white/[0.04] hover:text-gray-200'
                      }`}
                      title={isCollapsed ? item.name : undefined}
                    >
                      <div className="flex items-center gap-2.5 truncate">
                        <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-purple-400' : 'text-gray-400'}`} />
                        {!isCollapsed && <span className="truncate">{item.name}</span>}
                      </div>
                      {!isCollapsed && item.badge && (
                        <span className="px-1.5 py-0.5 text-[9px] bg-purple-500/20 text-purple-300 font-bold rounded-full border border-purple-500/30 shrink-0">
                          {item.badge}
                        </span>
                      )}
                    </motion.button>
                  );
                })}
              </div>
            ))}
          </nav>
        </div>

        {/* User Profile Footer */}
        <div className="pt-3 border-t border-white/5 space-y-2">
          <div 
            onClick={() => setActiveTab('Teacher Profile')}
            className={`p-2 rounded-2xl bg-[#110f22] border border-white/5 flex items-center ${isCollapsed ? 'justify-center' : 'gap-2.5'} cursor-pointer hover:border-purple-500/30 transition-all`}
            title={isCollapsed ? teacherProfile?.name || 'Profile' : undefined}
          >
            <img 
              src={teacherProfile?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100'} 
              alt={teacherProfile?.name || 'User'} 
              className="w-8 h-8 rounded-xl object-cover ring-1 ring-purple-500/40 shrink-0" 
            />
            {!isCollapsed && (
              <div className="min-w-0 flex-1 truncate">
                <p className="text-xs font-bold text-white truncate">{teacherProfile?.name || 'Dr. Mohamed'}</p>
                <p className="text-[9px] text-gray-400 truncate">{teacherProfile?.title || 'Teacher Portal'}</p>
              </div>
            )}
          </div>

          {!isCollapsed && (
            <div className="flex items-center justify-between px-1 text-xs">
              <button 
                onClick={() => setActiveTab('Teacher Profile')} 
                className="flex items-center gap-1.5 text-gray-400 hover:text-white transition-colors cursor-pointer py-1 text-[11px]"
              >
                <Settings className="w-3.5 h-3.5" /> Settings
              </button>
              <button 
                onClick={handleSignOut} 
                className="flex items-center gap-1 text-rose-400/80 hover:text-rose-400 transition-colors cursor-pointer py-1 text-[11px]"
              >
                <LogOut className="w-3.5 h-3.5" /> Sign Out
              </button>
            </div>
          )}
        </div>
      </motion.aside>
    </>
  );
}