'use client';

import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { 
  FileText, Clock, AlertTriangle, CheckCircle, Upload, 
  Eye, Download, Plus, File, X 
} from 'lucide-react';

export default function HomeworkManagementView() {
  const [selectedAssignment, setSelectedAssignment] = useState(1);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [submissions, setSubmissions] = useState([
    { id: 1, name: 'Sara Ahmed', time: 'Jul 24, 10:30 AM', score: 47, maxScore: 50, note: 'Excellent work! Clear steps.', status: 'Graded', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80' },
    { id: 2, name: 'Omar Khalil', time: 'Jul 24, 2:15 PM', score: 38, maxScore: 50, note: 'Good effort, Q14 needs revision.', status: 'Graded', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80' },
    { id: 3, name: 'Lina Hassan', time: 'Jul 25, 8:00 AM', score: 0, maxScore: 50, note: '', status: 'Pending', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80' },
    { id: 4, name: 'Nour Fadel', time: 'Not submitted', score: 0, maxScore: 50, note: '', status: 'Missing', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80' },
  ]);

  const assignments = [
    { id: 1, title: 'Derivatives Problem Set', subject: 'Calculus', due: 'Jul 25, 2025', submitted: 18, total: 24, status: 'Active', badgeColor: 'bg-purple-500/20 text-purple-300 border-purple-500/30' },
    { id: 2, title: 'Wave Motion Analysis', subject: 'Physics', due: 'Jul 26, 2025', submitted: 10, total: 18, status: 'Active', badgeColor: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30' },
    { id: 3, title: 'Organic Reactions Essay', subject: 'Chemistry', due: 'Jul 23, 2025', submitted: 31, total: 31, status: 'Completed', badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' },
  ];

  const handleScoreChange = (id: number, val: number) => {
    setSubmissions(prev => prev.map(s => s.id === id ? { ...s, score: val, status: 'Graded' } : s));
  };

  // معالجة اختيار الملفات برمجياً
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadedFile(e.target.files[0]);
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
      setUploadedFile(e.dataTransfer.files[0]);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6 max-w-7xl mx-auto"
    >
      {/* Header Stat Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Assignments', val: '5', icon: FileText, color: 'text-purple-400 bg-purple-500/10' },
          { label: 'Pending Grading', val: '2', icon: Clock, color: 'text-amber-400 bg-amber-500/10' },
          { label: 'Overdue', val: '1', icon: AlertTriangle, color: 'text-rose-400 bg-rose-500/10' },
          { label: 'Completed', val: '1', icon: CheckCircle, color: 'text-emerald-400 bg-emerald-500/10' },
        ].map((card, i) => {
          const Icon = card.icon;
          return (
            <div key={i} className="p-4 rounded-2xl bg-[#110f22] border border-white/5 flex items-center gap-3">
              <div className={`p-3 rounded-xl ${card.color}`}>
                <Icon className="w-5 h-5" />
              </div>
              <div>
                <p className="text-lg font-extrabold text-white">{card.val}</p>
                <p className="text-[11px] text-gray-400">{card.label}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Homework List */}
        <div className="space-y-3">
          <div className="flex justify-between items-center mb-1">
            <h3 className="text-sm font-bold text-white">Assignments</h3>
            <button className="px-3 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-xs font-bold text-white flex items-center gap-1 shadow-lg shadow-purple-600/30 transition-all cursor-pointer">
              <Plus className="w-3.5 h-3.5" /> New
            </button>
          </div>

          {assignments.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedAssignment(item.id)}
              className={`p-4 rounded-2xl border transition-all cursor-pointer space-y-2 ${
                selectedAssignment === item.id 
                  ? 'bg-[#18152e] border-purple-500/50 shadow-xl' 
                  : 'bg-[#110f22] border-white/5 hover:border-white/20'
              }`}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="text-xs font-bold text-white">{item.title}</h4>
                  <p className="text-[10px] text-gray-400">{item.subject} • Due {item.due}</p>
                </div>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${item.badgeColor}`}>
                  {item.status}
                </span>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-[10px] text-gray-400">
                  <span>{item.submitted}/{item.total} Submitted</span>
                  <span>{Math.round((item.submitted/item.total)*100)}%</span>
                </div>
                <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-purple-500 rounded-full" style={{ width: `${(item.submitted/item.total)*100}%` }} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Student Submissions List & Grading */}
        <div className="lg:col-span-2 space-y-4">
          <div className="p-5 rounded-3xl bg-[#110f22] border border-white/5 space-y-4">
            <h3 className="text-sm font-bold text-white border-b border-white/5 pb-3">Student Submissions</h3>

            <div className="space-y-3">
              {submissions.map((sub) => (
                <div key={sub.id} className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <img src={sub.avatar} alt={sub.name} className="w-9 h-9 rounded-xl object-cover" />
                    <div>
                      <h4 className="text-xs font-bold text-white">{sub.name}</h4>
                      <p className="text-[10px] text-gray-400">{sub.time}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    {sub.status !== 'Missing' ? (
                      <div className="flex items-center gap-2">
                        <input
                          type="number"
                          value={sub.score}
                          onChange={(e) => handleScoreChange(sub.id, parseInt(e.target.value) || 0)}
                          className="w-12 py-1 px-2 text-center text-xs font-bold bg-white/5 border border-white/10 rounded-lg text-emerald-400 focus:border-purple-500 outline-none"
                        />
                        <span className="text-xs text-gray-400">/{sub.maxScore}</span>
                      </div>
                    ) : (
                      <span className="px-2.5 py-1 rounded-lg bg-rose-500/10 text-rose-400 border border-rose-500/20 text-[10px] font-bold">
                        Missing
                      </span>
                    )}

                    <div className="flex items-center gap-1">
                      <button className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300">
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                      <button className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300">
                        <Download className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Upload Resources Dropzone (Interactive & Responsive) */}
          <div className="space-y-2">
            <div 
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`relative p-6 rounded-3xl bg-[#110f22] border-2 border-dashed transition-all cursor-pointer text-center space-y-2 ${
                isDragging 
                  ? 'border-purple-500 bg-purple-500/10 scale-[0.99]' 
                  : 'border-purple-500/30 hover:border-purple-500/60'
              }`}
            >
              <input 
                ref={fileInputRef}
                type="file" 
                accept=".pdf,.docx,.mp4,.zip" 
                onChange={handleFileSelect}
                className="hidden" 
              />
              <Upload className="w-6 h-6 text-purple-400 mx-auto" />
              <h4 className="text-xs font-bold text-white">Drag & drop files or click to browse</h4>
              <p className="text-[10px] text-gray-400">Supports PDF, DOCX, MP4, ZIP — max 100 MB</p>
            </div>

            {/* معاينة الملف بعد رفعه */}
            {uploadedFile && (
              <div className="p-3 bg-[#110f22] border border-purple-500/30 rounded-2xl flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-purple-500/20 text-purple-400">
                    <File className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white truncate max-w-[200px] sm:max-w-[300px]">{uploadedFile.name}</p>
                    <p className="text-[10px] text-gray-400">{(uploadedFile.size / (1024 * 1024)).toFixed(2)} MB</p>
                  </div>
                </div>
                <button 
                  onClick={() => setUploadedFile(null)}
                  className="p-1.5 rounded-xl hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>

      </div>
    </motion.div>
  );
}