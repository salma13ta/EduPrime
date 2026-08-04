'use client';

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Award, Clock, CheckCircle2, AlertCircle, Plus, FileText,
  Upload, Eye, Download, Search, Filter, Trash2, File, X, Sparkles, Check, XCircle
} from 'lucide-react';

// إعدادات الأنيميشن للحاويات
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 300, damping: 24 }
  }
};

interface SubmissionDetail {
  q: string;
  answer: string;
  correct: boolean;
}

interface Submission {
  id: number;
  name: string;
  score: number;
  max: number;
  timeSpent: string;
  status: string;
  avatar: string;
  details: SubmissionDetail[];
}

export default function OnlineExamView() {
  const [selectedExam, setSelectedExam] = useState(1);
  const [activeTab, setActiveTab] = useState<'all' | 'active' | 'upcoming' | 'completed'>('all');
  const [uploadedMedia, setUploadedMedia] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const mediaInputRef = useRef<HTMLInputElement>(null);

  // State للـ Modal الخاص برؤية تفاصيل إجابة الطالب
  const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null);

  // إحصائيات سريعة
  const stats = [
    { label: 'Active Exams', val: '3', icon: Clock, color: 'text-purple-400 bg-purple-500/10 border-purple-500/20' },
    { label: 'Avg. Score', val: '84%', icon: Award, color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20' },
    { label: 'Pending Grading', val: '12', icon: AlertCircle, color: 'text-amber-400 bg-amber-500/10 border-amber-500/20' },
    { label: 'Total Completed', val: '48', icon: CheckCircle2, color: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20' },
  ];

  // قائمة الامتحانات
  const exams = [
    { id: 1, title: 'Calculus Midterm Evaluation', subject: 'Mathematics', duration: '60 mins', questions: 25, totalStudents: 32, completedCount: 28, status: 'Active', badgeColor: 'bg-purple-500/20 text-purple-300 border-purple-500/30' },
    { id: 2, title: 'Quantum Mechanics Quiz #2', subject: 'Physics', duration: '30 mins', questions: 15, totalStudents: 28, completedCount: 10, status: 'Active', badgeColor: 'bg-purple-500/20 text-purple-300 border-purple-500/30' },
    { id: 3, title: 'Organic Chemistry Finals', subject: 'Chemistry', duration: '90 mins', questions: 40, totalStudents: 45, completedCount: 0, status: 'Upcoming', badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/30' },
    { id: 4, title: 'Vectors & Matrices Test', subject: 'Mathematics', duration: '45 mins', questions: 20, totalStudents: 32, completedCount: 32, status: 'Completed', badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' },
  ];

  // نتايج الطلاب مع تفاصيل الأسئلة للمعاينة
  const [studentResults, setStudentResults] = useState([
    {
      id: 1,
      name: 'Sara Ahmed',
      score: 95,
      max: 100,
      timeSpent: '42 mins',
      status: 'Passed',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80',
      details: [
        { q: 'Q1: Integrate ∫ x² dx', answer: 'x³/3 + C', correct: true },
        { q: 'Q2: Derivative of sin(x)', answer: 'cos(x)', correct: true },
        { q: 'Q3: Find the limit as x->0 of sin(x)/x', answer: '1', correct: true },
        { q: 'Q4: Evaluate ∫ e^x dx', answer: 'e^x + C', correct: true },
      ]
    },
    {
      id: 2,
      name: 'Omar Khalil',
      score: 88,
      max: 100,
      timeSpent: '50 mins',
      status: 'Passed',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80',
      details: [
        { q: 'Q1: Integrate ∫ x² dx', answer: 'x³/3 + C', correct: true },
        { q: 'Q2: Derivative of sin(x)', answer: '-cos(x)', correct: false },
        { q: 'Q3: Find the limit as x->0 of sin(x)/x', answer: '1', correct: true },
      ]
    },
    {
      id: 3,
      name: 'Lina Hassan',
      score: 62,
      max: 100,
      timeSpent: '58 mins',
      status: 'Needs Review',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80',
      details: [
        { q: 'Q1: Integrate ∫ x² dx', answer: '2x', correct: false },
        { q: 'Q2: Derivative of sin(x)', answer: 'cos(x)', correct: true },
        { q: 'Q3: Find the limit as x->0 of sin(x)/x', answer: '0', correct: false },
      ]
    },
  ]);

  // تصدير النتائج CSV
  const handleExportPDF = () => {
    const currentExamTitle = exams.find(e => e.id === selectedExam)?.title || 'Exam Results';
    const csvContent = "data:text/csv;charset=utf-8,"
      + ["Student Name,Score,Max Score,Time Spent,Status"]
        .concat(studentResults.map(s => `"${s.name}",${s.score},${s.max},"${s.timeSpent}","${s.status}"`))
        .join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `${currentExamTitle.replace(/\s+/g, '_')}_Results.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Drag & Drop Handlers
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadedMedia(e.target.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setUploadedMedia(e.dataTransfer.files[0]);
    }
  };

  const filteredExams = exams.filter(item => {
    if (activeTab === 'all') return true;
    return item.status.toLowerCase() === activeTab.toLowerCase();
  });

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="space-y-6 max-w-7xl mx-auto p-2 relative"
    >
      {/* Header Section */}
      <motion.div
        variants={itemVariants}
        className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/5 pb-4"
      >
        <div>
          <h1 className="text-xl font-bold text-white flex items-center gap-2">
            <motion.div
              animate={{ rotate: [0, 15, -15, 0], scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            >
              <Sparkles className="w-5 h-5 text-purple-400" />
            </motion.div>
            Online Exam Center
          </h1>
          <p className="text-xs text-gray-400 mt-1">
            Create, manage online exams, upload question media & track live student performance.
          </p>
        </div>

        <motion.button
          whileHover={{ scale: 1.05, boxShadow: "0px 10px 25px rgba(147, 51, 234, 0.4)" }}
          whileTap={{ scale: 0.95 }}
          className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-xs font-bold text-white flex items-center justify-center gap-2 shadow-lg shadow-purple-600/30 transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" /> Create New Exam
        </motion.button>
      </motion.div>

      {/* Stats Section */}
      <motion.div variants={itemVariants} className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((st, i) => {
          const Icon = st.icon;
          return (
            <motion.div
              key={i}
              whileHover={{ y: -5, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 400 }}
              className="p-4 rounded-2xl bg-[#110f22] border border-white/5 flex items-center gap-3 shadow-sm hover:border-purple-500/30 transition-colors"
            >
              <div className={`p-3 rounded-xl border ${st.color}`}>
                <Icon className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xl font-black text-white">{st.val}</p>
                <p className="text-[11px] text-gray-400 font-medium">{st.label}</p>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Exams Directory */}
        <motion.div variants={itemVariants} className="space-y-4">
          <div className="p-4 rounded-3xl bg-[#110f22] border border-white/5 space-y-3">
            <div className="flex justify-between items-center">
              <h3 className="text-xs font-bold text-white">Exams Directory</h3>
              <span className="text-[10px] bg-white/5 text-gray-400 px-2 py-0.5 rounded-md">
                {filteredExams.length} Available
              </span>
            </div>

            {/* Tabs */}
            <div className="flex gap-1 p-1 bg-white/[0.03] rounded-xl border border-white/5 text-[10px] font-semibold text-gray-400">
              {(['all', 'active', 'upcoming', 'completed'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`relative flex-1 py-1 rounded-lg capitalize transition-colors ${activeTab === tab ? 'text-white' : 'hover:text-white'
                    }`}
                >
                  {activeTab === tab && (
                    <motion.div
                      layoutId="activeTabBadge"
                      className="absolute inset-0 bg-purple-600 rounded-lg shadow-md"
                      transition={{ type: "spring", stiffness: 500, damping: 35 }}
                    />
                  )}
                  <span className="relative z-10">{tab}</span>
                </button>
              ))}
            </div>

            {/* Exam Items List */}
            <div className="space-y-2 max-h-[500px] overflow-y-auto pr-1">
              <AnimatePresence mode="popLayout">
                {filteredExams.map((exam) => {
                  const percentage = Math.round((exam.completedCount / exam.totalStudents) * 100);
                  const isSelected = selectedExam === exam.id;

                  return (
                    <motion.div
                      key={exam.id}
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setSelectedExam(exam.id)}
                      className={`p-3.5 rounded-2xl border transition-all cursor-pointer space-y-2.5 ${isSelected
                        ? 'bg-[#18152e] border-purple-500/50 shadow-lg shadow-purple-900/10'
                        : 'bg-white/[0.02] border-white/5 hover:border-white/15'
                        }`}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="text-xs font-bold text-white">{exam.title}</h4>
                          <p className="text-[10px] text-gray-400 mt-0.5">{exam.subject} • {exam.duration}</p>
                        </div>
                        <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold border ${exam.badgeColor}`}>
                          {exam.status}
                        </span>
                      </div>

                      <div className="space-y-1">
                        <div className="flex justify-between text-[10px] text-gray-400">
                          <span>Progress ({exam.completedCount}/{exam.totalStudents})</span>
                          <span>{percentage}%</span>
                        </div>
                        <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${percentage}%` }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            className="h-full bg-purple-500 rounded-full"
                          />
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>

        {/* Exam Resources & Submissions */}
        <motion.div variants={itemVariants} className="lg:col-span-2 space-y-5">

          {/* File Drag & Drop Upload Zone */}
          <div className="p-5 rounded-3xl bg-[#110f22] border border-white/5 space-y-4">
            <div className="flex justify-between items-center border-b border-white/5 pb-3">
              <h3 className="text-xs font-bold text-white flex items-center gap-2">
                <FileText className="w-4 h-4 text-purple-400" /> Exam Resources & Question Attachments
              </h3>
              <span className="text-[10px] text-gray-400">Attach diagrams, MP4 explanations or PDFs</span>
            </div>

            <motion.div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => mediaInputRef.current?.click()}
              animate={{
                scale: isDragging ? 1.02 : 1,
                borderColor: isDragging ? 'rgba(168, 85, 247, 1)' : 'rgba(168, 85, 247, 0.3)',
                backgroundColor: isDragging ? 'rgba(168, 85, 247, 0.12)' : 'rgba(168, 85, 247, 0.02)'
              }}
              whileHover={{ scale: 1.005, borderColor: 'rgba(168, 85, 247, 0.6)' }}
              className="p-6 rounded-2xl border-2 border-dashed transition-all cursor-pointer text-center space-y-2"
            >
              <input
                ref={mediaInputRef}
                type="file"
                accept=".pdf,.docx,.mp4,.png,.jpg,.zip"
                onChange={handleFileSelect}
                className="hidden"
              />
              <motion.div
                animate={{ y: isDragging ? -5 : 0 }}
                transition={{ repeat: isDragging ? Infinity : 0, repeatType: "reverse", duration: 0.5 }}
              >
                <Upload className="w-6 h-6 text-purple-400 mx-auto" />
              </motion.div>
              <h4 className="text-xs font-bold text-white">Drag & drop exam assets or click to browse</h4>
              <p className="text-[10px] text-gray-400">Supports PDF, DOCX, MP4, Audio, ZIP — max 100 MB</p>
            </motion.div>

            {/* Uploaded File Details */}
            <AnimatePresence>
              {uploadedMedia && (
                <motion.div
                  initial={{ opacity: 0, height: 0, y: -10 }}
                  animate={{ opacity: 1, height: 'auto', y: 0 }}
                  exit={{ opacity: 0, height: 0, y: -10 }}
                  className="p-3 bg-white/[0.03] border border-purple-500/30 rounded-2xl flex items-center justify-between overflow-hidden"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-xl bg-purple-500/20 text-purple-400">
                      <File className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-white truncate max-w-[200px] sm:max-w-[320px]">{uploadedMedia.name}</p>
                      <p className="text-[10px] text-gray-400">{(uploadedMedia.size / (1024 * 1024)).toFixed(2)} MB</p>
                    </div>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.2, rotate: 90 }}
                    whileTap={{ scale: 0.8 }}
                    onClick={() => setUploadedMedia(null)}
                    className="p-1.5 rounded-xl hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Student Submissions List */}
          <div className="p-5 rounded-3xl bg-[#110f22] border border-white/5 space-y-4">
            <div className="flex justify-between items-center border-b border-white/5 pb-3">
              <h3 className="text-xs font-bold text-white">Live Student Submissions</h3>
              <div className="flex items-center gap-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleExportPDF}
                  className="p-2 px-3 rounded-xl bg-purple-600/20 hover:bg-purple-600 border border-purple-500/30 hover:border-purple-500 text-purple-300 hover:text-white transition-all text-xs font-bold flex items-center gap-1.5 shadow-sm cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" /> Export PDF
                </motion.button>
              </div>
            </div>

            <div className="space-y-3">
              {studentResults.map((st, idx) => (
                <motion.div
                  key={st.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={{ scale: 1.01, backgroundColor: "rgba(255, 255, 255, 0.04)" }}
                  className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-purple-500/30 transition-all"
                >
                  <div className="flex items-center gap-3">
                    <img src={st.avatar} alt={st.name} className="w-9 h-9 rounded-xl object-cover ring-2 ring-purple-500/20" />
                    <div>
                      <h4 className="text-xs font-bold text-white">{st.name}</h4>
                      <p className="text-[10px] text-gray-400">Duration: {st.timeSpent}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <span className="text-xs font-extrabold text-emerald-400">{st.score}</span>
                      <span className="text-xs text-gray-400"> / {st.max}</span>
                    </div>

                    <span className={`px-2 py-0.5 rounded-lg text-[10px] font-bold ${st.status === 'Passed'
                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                      : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                      }`}>
                      {st.status}
                    </span>

                    <motion.button
                      whileHover={{ scale: 1.15 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setSelectedSubmission(st)}
                      className="p-2 rounded-xl bg-white/5 hover:bg-purple-600/30 text-gray-300 hover:text-purple-300 border border-white/5 hover:border-purple-500/40 transition-all cursor-pointer"
                      title="View Submission Details"
                    >
                      <Eye className="w-3.5 h-3.5" />
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

        </motion.div>

      </div>

      {/* Submission Review Modal */}
      <AnimatePresence>
        {selectedSubmission && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop Blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedSubmission(null)}
              className="absolute inset-0 bg-black/70 backdrop-blur-md"
            />

            {/* Modal Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 30 }}
              transition={{ type: "spring", stiffness: 350, damping: 25 }}
              className="relative z-10 bg-[#110f22] border border-purple-500/30 rounded-3xl p-6 max-w-lg w-full space-y-5 shadow-2xl"
            >
              <div className="flex justify-between items-center border-b border-white/10 pb-3">
                <div className="flex items-center gap-3">
                  <img src={selectedSubmission.avatar} alt={selectedSubmission.name} className="w-10 h-10 rounded-xl object-cover ring-2 ring-purple-500/40" />
                  <div>
                    <h3 className="text-sm font-bold text-white">{selectedSubmission.name}</h3>
                    <p className="text-xs text-gray-400">Submitted in {selectedSubmission.timeSpent}</p>
                  </div>
                </div>
                <motion.button
                  whileHover={{ rotate: 90 }}
                  onClick={() => setSelectedSubmission(null)}
                  className="p-1.5 rounded-xl hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                >
                  <X className="w-4 h-4" />
                </motion.button>
              </div>

              {/* Score summary */}
              <div className="flex items-center justify-between p-3 rounded-2xl bg-white/[0.03] border border-white/5">
                <span className="text-xs text-gray-400">Total Score Received:</span>
                <span className="text-sm font-black text-emerald-400">{selectedSubmission.score} / {selectedSubmission.max}</span>
              </div>

              {/* Questions details list */}
              <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                <h4 className="text-xs font-bold text-gray-300">Answer sheet review:</h4>
                {selectedSubmission.details?.map((item: SubmissionDetail, idx: number) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="p-3 rounded-xl bg-white/[0.02] border border-white/5 text-xs space-y-1"
                  >
                    <p className="font-semibold text-white">{item.q}</p>
                    <div className="flex justify-between items-center text-[11px]">
                      <span className="text-gray-400">Student&apos;s answer: <code className="text-purple-300 font-mono">{item.answer}</code></span>
                      {item.correct ? (
                        <span className="flex items-center gap-1 text-emerald-400 font-bold"><Check className="w-3.5 h-3.5" /> Correct</span>
                      ) : (
                        <span className="flex items-center gap-1 text-rose-400 font-bold"><XCircle className="w-3.5 h-3.5" /> Incorrect</span>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Action */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedSubmission(null)}
                className="w-full py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 font-bold text-xs text-white transition-all shadow-lg shadow-purple-600/30 cursor-pointer"
              >
                Close Review
              </motion.button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </motion.div>
  );
}