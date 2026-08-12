'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BookOpen, 
  MapPin, 
  Video, 
  Play, 
  CheckCircle2, 
  Clock, 
  GraduationCap, 
  Sparkles, 
  X, 
  ArrowRight,
  Filter,
  Award,
  Users,
  ShieldCheck,
  ChevronRight,
  Flame
} from 'lucide-react';

interface Lecture {
  id: string;
  title: string;
  duration: string;
  centerDate: string;
  onlineDate: string;
  isCompleted: boolean;
}

interface Course {
  id: string;
  title: string;
  instructor: string;
  center: string;
  progress: number;
  category: string;
  nextSession: string;
  type: 'Hybrid' | 'Online Center' | 'Physical Center';
  imageGradient: string;
  description: string;
  totalStudents: number;
  rating: number;
  lectures: Lecture[];
}

const coursesData: Course[] = [
  {
    id: '1',
    title: 'Physics for High School - Advanced Mechanics & Dynamics',
    instructor: 'Dr. Ahmed El-Sherif',
    center: 'Opera Educational Center (Mansoura - Hall A)',
    progress: 68,
    category: 'Physics',
    nextSession: 'Saturday - 04:00 PM',
    type: 'Hybrid',
    imageGradient: 'from-purple-600/40 via-indigo-600/30 to-fuchsia-600/40',
    description: 'Comprehensive high-school physics covering Newtonian mechanics, rotational dynamics, momentum conservation, and rigorous problem-solving simulations.',
    totalStudents: 340,
    rating: 4.9,
    lectures: [
      { id: 'l1', title: 'Lecture 1: Kinematics & Vector Resolution in 2D', duration: '2h 15m', centerDate: 'Sat, Oct 10 - 04:00 PM', onlineDate: 'Sun, Oct 11 - 08:00 PM', isCompleted: true },
      { id: 'l2', title: 'Lecture 2: Newton’s Laws & Friction Coefficients', duration: '2h 30m', centerDate: 'Sat, Oct 17 - 04:00 PM', onlineDate: 'Sun, Oct 18 - 08:00 PM', isCompleted: true },
      { id: 'l3', title: 'Lecture 3: Work, Energy Theorems & Power Systems', duration: '2h 45m', centerDate: 'Sat, Oct 24 - 04:00 PM', onlineDate: 'Sun, Oct 25 - 08:00 PM', isCompleted: false },
      { id: 'l4', title: 'Lecture 4: Momentum Conservation & Elastic Collisions', duration: '2h 20m', centerDate: 'Sat, Oct 31 - 04:00 PM', onlineDate: 'Sun, Nov 01 - 08:00 PM', isCompleted: false },
    ]
  },
  {
    id: '2',
    title: 'Organic Chemistry Masterclass & Reaction Mechanisms',
    instructor: 'Prof. Tarek Mahmoud',
    center: 'El-Salam Science Hub (Mansoura)',
    progress: 42,
    category: 'Chemistry',
    nextSession: 'Sunday - 06:00 PM',
    type: 'Hybrid',
    imageGradient: 'from-fuchsia-600/40 via-purple-600/30 to-indigo-600/40',
    description: 'Master organic synthesis, hydrocarbon isomerism, functional group transformations, and interactive digital lab experiment modules.',
    totalStudents: 285,
    rating: 4.8,
    lectures: [
      { id: 'lc1', title: 'Lecture 1: Introduction to Alkanes & Isomerism', duration: '1h 50m', centerDate: 'Sun, Oct 11 - 06:00 PM', onlineDate: 'Mon, Oct 12 - 09:00 PM', isCompleted: true },
      { id: 'lc2', title: 'Lecture 2: Alkenes, Alkynes & Electrophilic Addition', duration: '2h 10m', centerDate: 'Sun, Oct 18 - 06:00 PM', onlineDate: 'Mon, Oct 19 - 09:00 PM', isCompleted: false },
      { id: 'lc3', title: 'Lecture 3: Aromatic Hydrocarbons & Benzene Rings', duration: '2h 25m', centerDate: 'Sun, Oct 25 - 06:00 PM', onlineDate: 'Mon, Oct 26 - 09:00 PM', isCompleted: false },
    ]
  },
  {
    id: '3',
    title: 'Pure Mathematics: Calculus & Analytical Geometry',
    instructor: 'Dr. Maged Gaber',
    center: 'Alpha Center for Excellence',
    progress: 85,
    category: 'Mathematics',
    nextSession: 'Monday - 02:00 PM',
    type: 'Physical Center',
    imageGradient: 'from-indigo-600/40 via-purple-600/30 to-pink-600/40',
    description: 'Advanced calculus covering limits, derivatives of transcendental functions, curve sketching, and complex algebraic integrations.',
    totalStudents: 410,
    rating: 5.0,
    lectures: [
      { id: 'lm1', title: 'Lecture 1: Limits & Continuity of Complex Functions', duration: '2h 00m', centerDate: 'Mon, Oct 12 - 02:00 PM', onlineDate: 'Tue, Oct 13 - 07:00 PM', isCompleted: true },
      { id: 'lm2', title: 'Lecture 2: Chain Rule & Implicit Differentiation', duration: '2h 15m', centerDate: 'Mon, Oct 19 - 02:00 PM', onlineDate: 'Tue, Oct 20 - 07:00 PM', isCompleted: true },
      { id: 'lm3', title: 'Lecture 3: Applications of Derivatives & Optimization', duration: '2h 30m', centerDate: 'Mon, Oct 26 - 02:00 PM', onlineDate: 'Tue, Oct 27 - 07:00 PM', isCompleted: true },
    ]
  },
];

export default function CoursesView() {
  const [filter, setFilter] = useState<'All' | 'Hybrid' | 'Physical Center'>('All');
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isPlayingStream, setIsPlayingStream] = useState(false);

  const filteredCourses = coursesData.filter(course => {
    if (filter === 'All') return true;
    return course.type === filter;
  });

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className="space-y-8 font-sans pb-12"
    >
      
      {/* Header & Advanced Filter Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-gradient-to-r from-[#12101f] via-[#16132a] to-[#0f0d1a] p-6 sm:p-8 rounded-3xl border border-purple-500/20 shadow-[0_0_40px_rgba(168,85,247,0.1)] relative overflow-hidden">
        <div className="absolute -right-20 -top-20 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
            <BookOpen className="w-7 h-7 text-purple-400" />
            <span>My Enrolled Courses</span>
          </h2>
          <p className="text-xs sm:text-sm text-gray-400 max-w-xl">
            Seamlessly track your physical center attendance, stream digital lectures, and monitor weekly progress in real-time.
          </p>
        </div>

        {/* Filter Switcher with Glow Motion */}
        <div className="relative z-10 flex items-center gap-1.5 bg-[#08070d] p-1.5 rounded-2xl border border-white/10 self-start md:self-auto shadow-inner">
          {(['All', 'Hybrid', 'Physical Center'] as const).map((tab) => (
            <motion.button
              key={tab}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setFilter(tab)}
              className={`relative px-4 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                filter === tab 
                  ? 'text-white shadow-md' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {filter === tab && (
                <motion.div
                  layoutId="activeTabIndicator"
                  className="absolute inset-0 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl -z-10 shadow-lg shadow-purple-600/30"
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}
              {tab}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Courses Grid with 3D Depth & Staggered Entry */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((course, index) => (
          <motion.div
            key={course.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.12, duration: 0.5, ease: "easeOut" }}
            whileHover={{ y: -8, scale: 1.02, rotateX: 1, rotateY: -1 }}
            style={{ perspective: 1000 }}
            className="group relative bg-[#12101f] border border-white/10 rounded-3xl p-6 flex flex-col justify-between space-y-6 shadow-2xl hover:border-purple-500/50 transition-all overflow-hidden"
          >
            {/* Ambient background glow inside card */}
            <div className={`absolute -top-24 -right-24 w-52 h-52 bg-gradient-to-br ${course.imageGradient} rounded-full blur-3xl pointer-events-none group-hover:scale-135 transition-transform duration-700`} />

            <div className="relative z-10 space-y-4">
              <div>
                <h3 className="text-base sm:text-lg font-extrabold text-white group-hover:text-purple-300 transition-colors leading-snug">
                  {course.title}
                </h3>
                <div className="flex items-center gap-2 text-xs text-gray-300 mt-2.5 font-medium">
                  <GraduationCap className="w-4 h-4 text-purple-400" />
                  <span>{course.instructor}</span>
                </div>
              </div>

              <div className="flex items-center gap-2.5 text-[11px] text-gray-300 bg-[#0a0910] p-3.5 rounded-2xl border border-white/5 shadow-inner">
                <MapPin className="w-4 h-4 text-fuchsia-400 shrink-0" />
                <span className="truncate">{course.center}</span>
              </div>

              {/* Progress Bar with Liquid Animation */}
              <div className="space-y-2 pt-1">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-gray-400">Course Progress</span>
                  <span className="text-purple-400 font-bold">{course.progress}%</span>
                </div>
                <div className="w-full h-2.5 bg-white/5 rounded-full overflow-hidden p-0.5 border border-white/5 shadow-inner">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${course.progress}%` }}
                    transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
                    className="h-full bg-gradient-to-r from-purple-500 via-fuchsia-500 to-indigo-500 rounded-full shadow-[0_0_12px_rgba(168,85,247,0.6)]" 
                  />
                </div>
              </div>
            </div>

            {/* Card Action Footer */}
            <div className="relative z-10 pt-4 border-t border-white/10 flex items-center justify-between gap-3">
              <div className="text-[11px] text-gray-400">
                <span className="block text-[9px] text-gray-500 uppercase tracking-wide">Next Session:</span>
                <span className="font-bold text-white flex items-center gap-1 mt-0.5">
                  <Clock className="w-3 h-3 text-purple-400" />
                  {course.nextSession}
                </span>
              </div>

              <motion.button
                whileHover={{ scale: 1.1, backgroundColor: 'rgba(168,85,247,1)' }}
                whileTap={{ scale: 0.92 }}
                onClick={() => {
                  setSelectedCourse(course);
                  setIsPlayingStream(false);
                  setIsPreviewOpen(true);
                }}
                className="px-4 py-2.5 rounded-2xl bg-purple-600/20 border border-purple-500/40 text-purple-300 hover:text-white transition-all cursor-pointer shadow-md flex items-center gap-2 group/btn"
              >
                <span className="text-xs font-bold">Open Hub</span>
                <Play className="w-3.5 h-3.5 fill-current group-hover/btn:translate-x-0.5 transition-transform" />
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Comprehensive Hybrid Course Hub Modal */}
      <AnimatePresence>
        {isPreviewOpen && selectedCourse && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-xl p-4 overflow-y-auto">
            <motion.div 
              initial={{ scale: 0.85, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.85, opacity: 0, y: 30 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="relative w-full max-w-4xl bg-gradient-to-br from-[#12101f] via-[#0d0b17] to-[#1a1333] border border-purple-500/40 rounded-3xl p-6 sm:p-10 shadow-[0_0_80px_rgba(168,85,247,0.25)] overflow-hidden my-auto max-h-[90vh] overflow-y-auto"
            >
              {/* Background ambient lighting */}
              <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600/15 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-600/15 rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10 space-y-8">
                {/* Modal Top Header */}
                <div className="flex items-start justify-between gap-4 pb-6 border-b border-white/10">
                  <div className="space-y-2">
                    <h2 className="text-xl sm:text-2xl font-extrabold text-white leading-tight">
                      {selectedCourse.title}
                    </h2>
                    <p className="text-xs text-gray-300 leading-relaxed max-w-2xl">
                      {selectedCourse.description}
                    </p>
                  </div>

                  <motion.button 
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => {
                      setIsPreviewOpen(false);
                      setIsPlayingStream(false);
                    }}
                    className="text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 p-3 rounded-2xl cursor-pointer transition-all border border-white/10 shrink-0 shadow-lg"
                  >
                    <X className="w-5 h-5" />
                  </motion.button>
                </div>

                {/* Quick Stats Grid inside Modal */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="bg-[#0a0910] p-4 rounded-2xl border border-white/5 space-y-1">
                    <span className="text-[10px] text-gray-400 block font-medium">Lead Instructor</span>
                    <span className="text-xs font-bold text-white flex items-center gap-1">
                      <GraduationCap className="w-3.5 h-3.5 text-purple-400" />
                      {selectedCourse.instructor}
                    </span>
                  </div>

                  <div className="bg-[#0a0910] p-4 rounded-2xl border border-white/5 space-y-1">
                    <span className="text-[10px] text-gray-400 block font-medium">Physical Center</span>
                    <span className="text-xs font-bold text-white flex items-center gap-1 truncate">
                      <MapPin className="w-3.5 h-3.5 text-fuchsia-400 shrink-0" />
                      <span className="truncate">{selectedCourse.center}</span>
                    </span>
                  </div>

                  <div className="bg-[#0a0910] p-4 rounded-2xl border border-white/5 space-y-1">
                    <span className="text-[10px] text-gray-400 block font-medium">Active Enrollees</span>
                    <span className="text-xs font-bold text-white flex items-center gap-1">
                      <Users className="w-3.5 h-3.5 text-indigo-400" />
                      {selectedCourse.totalStudents} Students
                    </span>
                  </div>

                  <div className="bg-[#0a0910] p-4 rounded-2xl border border-white/5 space-y-1">
                    <span className="text-[10px] text-gray-400 block font-medium">Course Rating</span>
                    <span className="text-xs font-bold text-amber-400 flex items-center gap-1">
                      ⭐ {selectedCourse.rating} / 5.0
                    </span>
                  </div>
                </div>

                {/* Interactive Video Stream Simulator */}
                <div className="space-y-3">
                  <h4 className="text-sm font-bold text-white flex items-center gap-2">
                    <Video className="w-4 h-4 text-purple-400" />
                    <span>Live Stream & Lecture Preview Player</span>
                  </h4>
                  
                  <div className="aspect-video w-full bg-black/95 rounded-3xl overflow-hidden border border-white/15 flex items-center justify-center relative shadow-[0_0_50px_rgba(0,0,0,0.8)]">
                    {!isPlayingStream ? (
                      <>
                        <div className="absolute inset-0 bg-gradient-to-tr from-purple-900/30 via-transparent to-indigo-900/30 pointer-events-none" />
                        <div className="text-center space-y-3 p-6 z-10">
                          <motion.div 
                            whileHover={{ scale: 1.15 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setIsPlayingStream(true)}
                            className="w-20 h-20 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 border border-purple-400/50 flex items-center justify-center mx-auto text-white shadow-xl shadow-purple-600/40 cursor-pointer"
                          >
                            <Play className="w-8 h-8 fill-white ml-1" />
                          </motion.div>
                          <div>
                            <p className="text-sm font-bold text-white">Click to Initialize Secure HD Stream</p>
                            <p className="text-[11px] text-gray-400 mt-1">Broadcasting live from {selectedCourse.center}</p>
                          </div>
                        </div>
                      </>
                    ) : (
                      <video 
                        src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" 
                        controls 
                        autoPlay 
                        className="w-full h-full object-cover"
                        onEnded={() => setIsPlayingStream(false)}
                      />
                    )}
                  </div>
                </div>

                {/* Lecture Matrix Section */}
                <div className="space-y-4">
                  <h4 className="text-sm font-bold text-white flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-purple-400" />
                    <span>Hybrid Curriculum & Schedule Matrix</span>
                  </h4>

                  <div className="space-y-3">
                    {selectedCourse.lectures.map((lec, i) => (
                      <motion.div 
                        key={lec.id}
                        initial={{ opacity: 0, x: -15 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.08 }}
                        className="p-4 sm:p-5 rounded-2xl bg-[#161326] border border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-md hover:border-purple-500/40 transition-all"
                      >
                        <div className="flex items-start gap-3.5">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-0.5 border ${lec.isCompleted ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-400' : 'bg-purple-500/20 border-purple-500/40 text-purple-300'}`}>
                            {lec.isCompleted ? <CheckCircle2 className="w-4 h-4" /> : <Flame className="w-4 h-4" />}
                          </div>
                          <div>
                            <h5 className="text-xs sm:text-sm font-bold text-white">{lec.title}</h5>
                            <div className="flex flex-wrap items-center gap-3 text-[11px] text-gray-300 mt-1.5">
                              <span className="flex items-center gap-1 bg-black/30 px-2.5 py-1 rounded-lg border border-white/5">
                                <MapPin className="w-3 h-3 text-fuchsia-400" /> Center: {lec.centerDate}
                              </span>
                              <span className="flex items-center gap-1 bg-black/30 px-2.5 py-1 rounded-lg border border-white/5">
                                <Video className="w-3 h-3 text-indigo-400" /> Online: {lec.onlineDate}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 self-end md:self-auto">
                          <span className="text-[10px] px-3 py-1 rounded-full bg-white/5 border border-white/10 text-gray-300 font-semibold">
                            {lec.duration}
                          </span>
                          <button 
                            onClick={() => setIsPlayingStream(true)}
                            className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs transition-all cursor-pointer shadow-md"
                          >
                            {lec.isCompleted ? 'Review Session' : 'Join Live'}
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Modal Footer Controls */}
                <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="text-xs text-gray-400 flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-purple-400" />
                    <span>All attendance records and homework submissions are encrypted & synced.</span>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => {
                      setIsPreviewOpen(false);
                      setIsPlayingStream(false);
                    }}
                    className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-purple-600/30 cursor-pointer"
                  >
                    Close Hub
                  </motion.button>
                </div>

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </motion.div>
  );
}