'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Play } from 'lucide-react';

export default function CoursesView() {
  const courses = [
    { title: 'Advanced Calculus', instructor: 'Dr. Sarah Chen', progress: 78, category: 'Math' },
    { title: 'Organic Chemistry', instructor: 'Prof. James Lee', progress: 45, category: 'Science' },
    { title: 'English Literature', instructor: 'Ms. Layla Hassan', progress: 92, category: 'English' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">My Courses</h1>
        <p className="text-xs text-gray-400">Manage and continue your active learning paths</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {courses.map((course, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="p-5 rounded-2xl bg-[#110f1e] border border-white/5 space-y-4 hover:border-purple-500/40 transition-colors"
          >
            <div className="flex justify-between items-start">
              <div>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-400 font-semibold border border-purple-500/20">
                  {course.category}
                </span>
                <h3 className="text-base font-bold text-white mt-2">{course.title}</h3>
                <p className="text-xs text-gray-400">{course.instructor}</p>
              </div>
              <button className="p-3 bg-purple-600 rounded-xl hover:bg-purple-500 transition-all cursor-pointer">
                <Play className="w-4 h-4 fill-white" />
              </button>
            </div>

            <div className="space-y-1.5 pt-2 border-t border-white/5">
              <div className="flex justify-between text-xs text-gray-400">
                <span>Progress</span>
                <span className="text-white font-bold">{course.progress}%</span>
              </div>
              <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                <div className="h-full bg-purple-500 rounded-full" style={{ width: `${course.progress}%` }} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}