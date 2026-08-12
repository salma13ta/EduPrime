'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Video, 
  CheckCircle2, 
  AlertCircle, 
  BookOpen, 
  Download, 
  ExternalLink,
  Flame,
  Check,
  X
} from 'lucide-react';

interface ScheduleItem {
  id: string;
  lectureNumber: number;
  title: string;
  topic: string;
  centerLocation: string;
  centerDateTime: string;
  onlineDateTime: string;
  status: 'completed' | 'upcoming' | 'live';
  homeworkAssigned: boolean;
  homeworkSubmitted: boolean;
  notesUrl?: string;
}

const hybridScheduleData: ScheduleItem[] = [
  {
    id: 'sch-1',
    lectureNumber: 1,
    title: 'Kinematics & Vector Resolution in 2D',
    topic: 'Analyzing projectile motion and component vectors in physical centers.',
    centerLocation: 'Opera Educational Center (Mansoura - Hall A)',
    centerDateTime: 'Sat, Oct 10, 2026 - 04:00 PM',
    onlineDateTime: 'Sun, Oct 11, 2026 - 08:00 PM',
    status: 'completed',
    homeworkAssigned: true,
    homeworkSubmitted: true,
    notesUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', // رابط PDF تجريبي حقيقي
  },
  {
    id: 'sch-2',
    lectureNumber: 2,
    title: 'Newton’s Laws & Friction Coefficients',
    topic: 'Dynamic equilibrium, kinetic/static friction formulas, and lab simulation.',
    centerLocation: 'Opera Educational Center (Mansoura - Hall A)',
    centerDateTime: 'Sat, Oct 17, 2026 - 04:00 PM',
    onlineDateTime: 'Sun, Oct 18, 2026 - 08:00 PM',
    status: 'completed',
    homeworkAssigned: true,
    homeworkSubmitted: true,
    notesUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
  },
  {
    id: 'sch-3',
    lectureNumber: 3,
    title: 'Work, Energy Theorems & Power Systems',
    topic: 'Conservative vs non-conservative forces and mechanical energy preservation.',
    centerLocation: 'Opera Educational Center (Mansoura - Hall A)',
    centerDateTime: 'Sat, Oct 24, 2026 - 04:00 PM',
    onlineDateTime: 'Sun, Oct 25, 2026 - 08:00 PM',
    status: 'live',
    homeworkAssigned: true,
    homeworkSubmitted: false,
    notesUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
  },
  {
    id: 'sch-4',
    lectureNumber: 4,
    title: 'Momentum Conservation & Elastic Collisions',
    topic: 'Impulse-momentum theorem, 1D and 2D collision vector equations.',
    centerLocation: 'Opera Educational Center (Mansoura - Hall A)',
    centerDateTime: 'Sat, Oct 31, 2026 - 04:00 PM',
    onlineDateTime: 'Sun, Nov 01, 2026 - 08:00 PM',
    status: 'upcoming',
    homeworkAssigned: false,
    homeworkSubmitted: false,
  },
];

export default function HybridScheduleSection() {
  const [filter, setFilter] = useState<'All' | 'completed' | 'live' | 'upcoming'>('All');
  const [selectedItem, setSelectedItem] = useState<ScheduleItem | null>(null);

  const filteredSchedule = hybridScheduleData.filter(item => {
    if (filter === 'All') return true;
    return item.status === filter;
  });

  return (
    <div className="space-y-6 font-sans text-white relative">
      
      {/* الفلتر الرئيسي */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#12101f] p-6 rounded-3xl border border-purple-500/20 shadow-xl">
        <div className="space-y-1">
          <h3 className="text-xl font-extrabold flex items-center gap-2.5">
            <Calendar className="w-6 h-6 text-purple-400" />
            <span>Hybrid Schedule & Attendance Matrix</span>
          </h3>
          <p className="text-xs text-gray-400">
            Track your mandatory physical center sessions alongside digital online streaming dates.
          </p>
        </div>

        <div className="flex items-center gap-1.5 bg-[#08070d] p-1.5 rounded-2xl border border-white/10 self-start sm:self-auto">
          {(['All', 'completed', 'live', 'upcoming'] as const).map((tab) => (
            <motion.button
              key={tab}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setFilter(tab)}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold capitalize transition-all cursor-pointer ${
                filter === tab 
                  ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md shadow-purple-600/30' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {tab}
            </motion.button>
          ))}
        </div>
      </div>

      {/* قائمة الحصص */}
      <div className="space-y-4">
        {filteredSchedule.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.08 }}
            className={`relative p-6 rounded-3xl border transition-all bg-[#12101f]/90 backdrop-blur-md shadow-lg ${
              item.status === 'live' 
                ? 'border-purple-500 shadow-[0_0_30px_rgba(168,85,247,0.25)]' 
                : 'border-white/10 hover:border-purple-500/40'
            }`}
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-2xl flex items-center justify-center font-extrabold text-sm border shadow-inner ${
                  item.status === 'completed' 
                    ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-400' 
                    : item.status === 'live'
                    ? 'bg-purple-500/20 border-purple-500/40 text-purple-300 animate-pulse'
                    : 'bg-white/5 border-white/10 text-gray-400'
                }`}>
                  0{item.lectureNumber}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs uppercase tracking-wider text-purple-400 font-bold">Lecture {item.lectureNumber}</span>
                    {item.status === 'completed' && (
                      <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-bold flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" /> Completed
                      </span>
                    )}
                    {item.status === 'live' && (
                      <span className="px-2 py-0.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-[10px] font-bold flex items-center gap-1 animate-pulse">
                        <Flame className="w-3 h-3 text-fuchsia-400" /> Live Now
                      </span>
                    )}
                    {item.status === 'upcoming' && (
                      <span className="px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-gray-400 text-[10px] font-semibold">
                        Upcoming
                      </span>
                    )}
                  </div>
                  <h4 className="text-base sm:text-lg font-bold text-white mt-0.5">{item.title}</h4>
                </div>
              </div>

              {/* أزرار الإجراءات */}
              <div className="flex items-center gap-2.5 self-end md:self-auto">
                {item.notesUrl ? (
                  <a 
                    href={item.notesUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold flex items-center gap-1.5 transition-all text-gray-300 hover:text-white cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5 text-purple-400" /> Notes PDF
                  </a>
                ) : (
                  <span className="px-3 py-2 text-xs text-gray-600 bg-white/5 rounded-xl cursor-not-allowed">No Notes</span>
                )}
                
                <button 
                  onClick={() => setSelectedItem(item)}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs transition-all shadow-md shadow-purple-600/30 cursor-pointer flex items-center gap-1.5"
                >
                  <span>Hub Details</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* تفاصيل المواعيد */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
              <div className="bg-[#0a0910] p-4 rounded-2xl border border-white/5 space-y-2">
                <div className="flex items-center gap-1.5 text-fuchsia-400 text-xs font-bold">
                  <MapPin className="w-4 h-4" />
                  <span>Physical Center Session (Mandatory)</span>
                </div>
                <p className="text-xs text-white font-medium">{item.centerLocation}</p>
                <div className="flex items-center gap-1.5 text-gray-400 text-[11px]">
                  <Clock className="w-3.5 h-3.5 text-purple-400" />
                  <span>{item.centerDateTime}</span>
                </div>
              </div>

              <div className="bg-[#0a0910] p-4 rounded-2xl border border-white/5 space-y-2">
                <div className="flex items-center gap-1.5 text-indigo-400 text-xs font-bold">
                  <Video className="w-4 h-4" />
                  <span>Digital Online Stream & Revision</span>
                </div>
                <p className="text-xs text-gray-300">Secure HD broadcast playback accessible after center delivery.</p>
                <div className="flex items-center gap-1.5 text-gray-400 text-[11px]">
                  <Clock className="w-3.5 h-3.5 text-indigo-400" />
                  <span>{item.onlineDateTime}</span>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-white/5 flex flex-wrap items-center justify-between gap-3 text-xs text-gray-400">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-gray-300">Homework Status:</span>
                {item.homeworkSubmitted ? (
                  <span className="text-emerald-400 flex items-center gap-1 font-medium">
                    <Check className="w-3.5 h-3.5" /> Submitted & Graded
                  </span>
                ) : item.homeworkAssigned ? (
                  <span className="text-amber-400 flex items-center gap-1 font-medium">
                    <AlertCircle className="w-3.5 h-3.5" /> Pending Submission
                  </span>
                ) : (
                  <span className="text-gray-500">Not Assigned Yet</span>
                )}
              </div>
              <span className="text-[11px] text-gray-500 italic">Topic: {item.topic}</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* نافذة تفاصيل الحصة (Hub Details Modal) التي كانت ناقصة */}
      <AnimatePresence>
        {selectedItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-[#12101f] border border-purple-500/40 w-full max-w-lg rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl relative"
            >
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <h4 className="text-lg font-extrabold text-white">Lecture #{selectedItem.lectureNumber} Hub</h4>
                <button 
                  onClick={() => setSelectedItem(null)}
                  className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-all cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4 text-xs">
                <div>
                  <span className="text-purple-400 font-bold uppercase tracking-wide text-[10px]">Title</span>
                  <p className="text-base font-bold text-white mt-0.5">{selectedItem.title}</p>
                </div>

                <div>
                  <span className="text-purple-400 font-bold uppercase tracking-wide text-[10px]">Syllabus Topic</span>
                  <p className="text-gray-300 mt-0.5">{selectedItem.topic}</p>
                </div>

                <div className="bg-[#0a0910] p-4 rounded-2xl border border-white/5 space-y-2">
                  <span className="text-fuchsia-400 font-bold uppercase tracking-wide text-[10px]">Location & Center Timing</span>
                  <p className="text-white font-medium">{selectedItem.centerLocation}</p>
                  <p className="text-gray-400">{selectedItem.centerDateTime}</p>
                </div>

                <div className="bg-[#0a0910] p-4 rounded-2xl border border-white/5 space-y-2">
                  <span className="text-indigo-400 font-bold uppercase tracking-wide text-[10px]">Online Backup Stream</span>
                  <p className="text-gray-400">{selectedItem.onlineDateTime}</p>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 flex justify-end gap-3">
                {selectedItem.notesUrl && (
                  <a
                    href={selectedItem.notesUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2.5 rounded-xl bg-purple-600/20 border border-purple-500/40 text-purple-300 hover:text-white font-bold text-xs transition-all flex items-center gap-1.5"
                  >
                    <Download className="w-4 h-4" /> Download PDF
                  </a>
                )}
                <button
                  onClick={() => setSelectedItem(null)}
                  className="px-5 py-2.5 rounded-xl bg-purple-600 text-white font-bold text-xs hover:bg-purple-700 transition-all cursor-pointer"
                >
                  Done
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}