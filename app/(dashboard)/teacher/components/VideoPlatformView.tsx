'use client';

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Play, Pause, Volume2, VolumeX, Maximize, Heart,
  CheckCircle2, Clock, Eye, Sparkles, ChevronRight, BookOpen, User,
  ThumbsUp, Share2, Bookmark, Plus, Download, Send, Check
} from 'lucide-react';

// Variants for Framer Motion Stagger & Reveal Animations
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 }
  }
} as const;

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring' as const, stiffness: 300, damping: 24 }
  }
} as const;

const initialCourseData = {
  courseTitle: "Advanced Calculus",
  instructor: "Dr. Ahmed Hassan",
  totalCompleted: "2/8 completed",
  totalDuration: "226 min total",
  lessons: [
    { id: 1, title: "1. Introduction to Derivatives", duration: "24:30", views: "2,840 views", thumbnail: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=300&q=80", videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4", isActive: false },
    { id: 2, title: "2. Chain Rule Explained", duration: "31:15", views: "2,210 views", thumbnail: "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=300&q=80", videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4", isActive: false },
    { id: 3, title: "3. Product & Quotient Rule", duration: "28:45", views: "1,950 views", thumbnail: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=300&q=80", videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4", likes: 247, isActive: true },
    { id: 4, title: "4. Implicit Differentiation", duration: "22:10", views: "1,680 views", thumbnail: "https://images.unsplash.com/photo-1596495578065-6e0763fa1178?w=300&q=80", videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4", isActive: false },
    { id: 5, title: "5. Related Rates Problems", duration: "35:00", views: "1,420 views", thumbnail: "https://images.unsplash.com/photo-1543269865-cbf427effbad?w=300&q=80", videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4", isActive: false },
    { id: 6, title: "6. L'Hôpital's Rule", duration: "19:55", views: "1,890 views", thumbnail: "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=300&q=80", videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4", isActive: false },
    { id: 7, title: "7. Optimization Problems", duration: "41:20", views: "1,650 views", thumbnail: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=300&q=80", videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4", isActive: false },
    { id: 8, title: "8. Mean Value Theorem", duration: "26:40", views: "1,320 views", thumbnail: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=300&q=80", videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4", isActive: false }
  ]
};

const initialResources = [
  { id: 1, name: "Lecture Slides - Derivatives.pdf", size: "2.4 MB", type: "PDF" },
  { id: 2, name: "Practice Problems Set 5.pdf", size: "1.1 MB", type: "PDF" },
  { id: 3, name: "Formula Sheet.pdf", size: "0.8 MB", type: "PDF" },
  { id: 4, name: "Video Transcript.txt", size: "48 KB", type: "TXT" },
];

const continueWatchingData = [
  { title: "Product & Quotient Rule", instructor: "Dr. Ahmed Hassan", progress: 65, duration: "28:45", thumbnail: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=400&q=80" },
  { title: "Wave Superposition", instructor: "Ms. Sara Nour", progress: 40, duration: "35:18", thumbnail: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400&q=80" },
  { title: "Organic Chemistry Lab", instructor: "Mr. Karim Sayed", progress: 22, duration: "44:00", thumbnail: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=400&q=80" }
];

export default function VideoPlatformView() {
  const [course, setCourse] = useState(initialCourseData);
  const [activeLesson, setActiveLesson] = useState(
    initialCourseData.lessons.find((l) => l.isActive) || initialCourseData.lessons[0]
  );

  // Dynamic States & Interactivity
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [likes, setLikes] = useState(activeLesson.likes || 247);
  const [hasLiked, setHasLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [activeTab, setActiveTab] = useState<'Notes' | 'Comments' | 'Resources'>('Notes');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const [notes, setNotes] = useState([
    { id: 1, time: "03:24", content: "Chain rule: d/dx[f(g(x))] = f'(g(x)) × g'(x)" },
    { id: 2, time: "08:15", content: "Remember: outer function derivative times inner derivative" },
    { id: 3, time: "15:40", content: "Example: d/dx[sin(x²)] = cos(x²) × 2x" },
    { id: 4, time: "21:00", content: "Practice problems on page 142 of textbook" }
  ]);
  const [newNote, setNewNote] = useState('');

  const [comments, setComments] = useState([
    { id: 1, author: "Sara Ahmed", timeAgo: "2h ago", text: "The explanation at 15:40 was super clear, thank you!", likes: 6, avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80" },
    { id: 2, author: "Omar Khalil", timeAgo: "4h ago", text: "Can you make a video on implicit differentiation next?", likes: 12, avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80" },
    { id: 3, author: "Lina Hassan", timeAgo: "6h ago", text: "This cleared up so much confusion from class. 5 stars!", likes: 15, avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80" }
  ]);
  const [newComment, setNewComment] = useState('');

  const videoRef = useRef<HTMLVideoElement>(null);

  // Toast System
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleSelectLesson = (lesson: typeof activeLesson) => {
    setActiveLesson(lesson);
    setCourse((prev) => ({
      ...prev,
      lessons: prev.lessons.map((l) => ({ ...l, isActive: l.id === lesson.id })),
    }));
    setLikes(lesson.likes || 247);
    setHasLiked(false);
    setIsPlaying(true);
    setTimeout(() => videoRef.current?.play().catch(() => { }), 100);
  };

  const togglePlay = () => {
    if (videoRef.current) {
      isPlaying ? videoRef.current.pause() : videoRef.current.play();
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleLike = () => {
    setLikes((prev) => (hasLiked ? prev - 1 : prev + 1));
    setHasLiked(!hasLiked);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title: activeLesson.title, url: window.location.href });
      } catch (err) { }
    } else {
      navigator.clipboard.writeText(window.location.href);
      showToast("Link copied to clipboard! 📋");
    }
  };

  const handleToggleSave = () => {
    setIsSaved(!isSaved);
    showToast(!isSaved ? "Saved to your bookmarks! 🔖" : "Removed from bookmarks");
  };

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNote.trim()) return;

    let formattedTime = "00:00";
    if (videoRef.current) {
      const current = videoRef.current.currentTime;
      const mins = Math.floor(current / 60).toString().padStart(2, '0');
      const secs = Math.floor(current % 60).toString().padStart(2, '0');
      formattedTime = `${mins}:${secs}`;
    }

    setNotes([{ id: Date.now(), time: formattedTime, content: newNote }, ...notes]);
    setNewNote('');
    showToast(`Note added at ${formattedTime} 📝`);
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    setComments([
      {
        id: Date.now(),
        author: "You",
        timeAgo: "Just now",
        text: newComment,
        likes: 0,
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&q=80"
      },
      ...comments
    ]);
    setNewComment('');
    showToast("Comment posted successfully! 💬");
  };

  const handleDownloadResource = (fileName: string) => {
    showToast(`Downloading ${fileName}... 📥`);
    const blob = new Blob([`Content of ${fileName}`], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6 max-w-[1600px] mx-auto text-white p-2 sm:p-4 font-sans relative"
    >
      {/* Toast Notification with Smooth Motion */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -30, scale: 0.85 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            className="fixed top-6 right-6 z-50 px-5 py-3 rounded-2xl bg-purple-600/90 text-white font-bold text-xs shadow-2xl border border-purple-400/30 flex items-center gap-2.5 backdrop-blur-md"
          >
            <Sparkles className="w-4 h-4 text-cyan-300 animate-spin" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header Banner with Gradient Glow */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 sm:p-6 rounded-3xl bg-[#110f22] border border-white/5 relative overflow-hidden shadow-2xl"
      >
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-0 right-0 w-96 h-96 bg-purple-600/15 rounded-full blur-3xl pointer-events-none"
        />

        <div className="space-y-1.5 z-10">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30 text-xs font-bold flex items-center gap-1.5 shadow-sm">
              <BookOpen className="w-3.5 h-3.5" /> Video Course
            </span>
            <span className="text-xs text-gray-400 font-medium flex items-center gap-1">
              <User className="w-3.5 h-3.5 text-purple-400" /> {course.instructor}
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-black text-white tracking-tight">{course.courseTitle}</h1>
        </div>

        <div className="flex flex-wrap items-center gap-3 z-10">
          <motion.div whileHover={{ scale: 1.05 }} className="p-3 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            <div>
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Progress</p>
              <p className="text-xs font-black text-white">{course.totalCompleted}</p>
            </div>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }} className="p-3 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center gap-3">
            <Clock className="w-5 h-5 text-cyan-400" />
            <div>
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Duration</p>
              <p className="text-xs font-black text-white">{course.totalDuration}</p>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Left Section (Player & Interactions) */}
        <div className="lg:col-span-2 space-y-6">

          {/* Animated Video Player */}
          <motion.div
            initial={{ scale: 0.98, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="relative rounded-3xl overflow-hidden bg-black border border-white/10 group shadow-2xl"
          >
            <video
              ref={videoRef}
              src={activeLesson.videoUrl}
              poster={activeLesson.thumbnail}
              className="w-full aspect-video object-cover cursor-pointer"
              onClick={togglePlay}
              onEnded={() => setIsPlaying(false)}
            />

            {/* Hover Controls Bar */}
            <motion.div
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent flex flex-col justify-between p-4 pointer-events-none"
            >
              <div className="flex justify-between items-center pointer-events-auto">
                <span className="px-3 py-1 bg-black/60 backdrop-blur-md rounded-xl text-xs font-bold text-white border border-white/10 truncate max-w-[80%]">
                  {activeLesson.title}
                </span>
              </div>

              <div className="flex items-center justify-between pointer-events-auto bg-black/60 backdrop-blur-md p-2.5 sm:p-3 rounded-2xl border border-white/10 shadow-lg">
                <div className="flex items-center gap-2 sm:gap-3">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={togglePlay}
                    className="p-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white transition-all shadow-lg shadow-purple-600/40 cursor-pointer"
                  >
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-white ml-0.5" />}
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={toggleMute}
                    className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-all cursor-pointer"
                  >
                    {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                  </motion.button>

                  <span className="text-xs font-bold text-gray-300">{activeLesson.duration}</span>
                </div>

                <div className="flex items-center gap-2">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={handleLike}
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-xl border text-xs font-bold transition-all cursor-pointer ${hasLiked
                        ? 'bg-rose-500/20 text-rose-400 border-rose-500/30'
                        : 'bg-white/10 text-gray-300 border-white/10 hover:bg-white/20'
                      }`}
                  >
                    <Heart className={`w-3.5 h-3.5 ${hasLiked ? 'fill-rose-400' : ''}`} />
                    <span>{likes}</span>
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => videoRef.current?.requestFullscreen()}
                    className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-all cursor-pointer"
                  >
                    <Maximize className="w-4 h-4" />
                  </motion.button>
                </div>
              </div>
            </motion.div>

            {/* Play Button Pulsing Overlay */}
            {!isPlaying && (
              <motion.button
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.9 }}
                onClick={togglePlay}
                className="absolute inset-0 m-auto w-16 h-16 rounded-full bg-purple-600/90 text-white flex items-center justify-center shadow-2xl shadow-purple-600/70 cursor-pointer border border-white/20 backdrop-blur-md"
              >
                <Play className="w-7 h-7 fill-white ml-1" />
              </motion.button>
            )}
          </motion.div>

          {/* Lesson Actions (Share, Save, Like) */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5 pb-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-white">{activeLesson.title}</h2>
              <div className="flex items-center gap-4 text-xs text-gray-400 mt-1">
                <span className="flex items-center gap-1 font-medium"><Eye className="w-3.5 h-3.5 text-purple-400" /> {activeLesson.views}</span>
                <span className="flex items-center gap-1 font-medium"><Clock className="w-3.5 h-3.5 text-cyan-400" /> {activeLesson.duration}</span>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              {/* Like Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.85 }}
                onClick={handleLike}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${hasLiked
                    ? 'bg-purple-600/20 text-purple-300 border-purple-500/40 shadow-lg'
                    : 'bg-white/[0.04] text-gray-300 border-white/10 hover:bg-white/[0.08]'
                  }`}
              >
                <ThumbsUp className={`w-4 h-4 ${hasLiked ? 'text-purple-400' : ''}`} />
                <span>{likes}</span>
              </motion.button>

              {/* Share Button (Activated) */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.85 }}
                onClick={handleShare}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-white/[0.04] text-gray-300 border border-white/10 hover:bg-white/[0.08] active:bg-purple-600/30 transition-all cursor-pointer"
              >
                <Share2 className="w-4 h-4 text-cyan-400" />
                <span>Share</span>
              </motion.button>

              {/* Save Button (Activated) */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.85 }}
                onClick={handleToggleSave}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${isSaved
                    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 shadow-lg'
                    : 'bg-white/[0.04] text-gray-300 border-white/10 hover:bg-white/[0.08]'
                  }`}
              >
                {isSaved ? <Check className="w-4 h-4 text-emerald-400" /> : <Bookmark className="w-4 h-4 text-amber-400" />}
                <span>{isSaved ? 'Saved' : 'Save'}</span>
              </motion.button>
            </div>
          </div>

          {/* Continue Watching Section */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-purple-400" /> Continue Watching
            </h3>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
            >
              {continueWatchingData.map((cw, idx) => (
                <motion.div
                  key={idx}
                  variants={itemVariants}
                  whileHover={{ y: -6, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 400 }}
                  className="p-3 rounded-2xl bg-[#110f22] border border-white/5 space-y-3 relative group overflow-hidden cursor-pointer shadow-xl"
                >
                  <div className="relative h-32 rounded-xl overflow-hidden border border-white/10">
                    <img src={cw.thumbnail} alt={cw.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-black/30 group-hover:bg-black/0 transition-colors" />

                    <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded-md bg-black/80 backdrop-blur-sm text-[10px] font-bold text-gray-300 border border-white/10">
                      {cw.duration}
                    </span>

                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <motion.span whileHover={{ scale: 1.2 }} className="w-10 h-10 rounded-full bg-purple-600/90 text-white flex items-center justify-center shadow-lg">
                        <Play className="w-4 h-4 fill-white ml-0.5" />
                      </motion.span>
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
                      <div className="h-full bg-purple-500 rounded-r-full" style={{ width: `${cw.progress}%` }} />
                    </div>
                  </div>

                  <div>
                    <h4 className="text-xs font-bold text-white truncate">{cw.title}</h4>
                    <p className="text-[11px] text-gray-400 mt-0.5">{cw.instructor}</p>
                    <span className="text-[10px] font-bold text-purple-400 mt-1 block">{cw.progress}% complete</span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Dynamic Tabs (Notes / Comments / Resources) */}
          <div className="p-5 sm:p-6 rounded-3xl bg-[#110f22] border border-white/5 space-y-5 shadow-2xl">
            {/* Animated Tab Selector */}
            <div className="flex items-center gap-2 p-1 bg-white/[0.02] border border-white/5 rounded-2xl w-fit">
              {(['Notes', 'Comments', 'Resources'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`relative px-5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${activeTab === tab ? 'text-purple-300' : 'text-gray-400 hover:text-white'
                    }`}
                >
                  {activeTab === tab && (
                    <motion.div
                      layoutId="activeTabGlow"
                      className="absolute inset-0 bg-purple-600/30 border border-purple-500/40 rounded-xl shadow-md"
                      transition={{ type: "spring", stiffness: 500, damping: 35 }}
                    />
                  )}
                  <span className="relative z-10">{tab}</span>
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              {/* TAB 1: NOTES (+ Button Animated) */}
              {activeTab === 'Notes' && (
                <motion.div
                  key="notes"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-4"
                >
                  <form onSubmit={handleAddNote} className="flex items-center gap-3">
                    <input
                      type="text"
                      value={newNote}
                      onChange={(e) => setNewNote(e.target.value)}
                      placeholder="Add a note at current timestamp..."
                      className="flex-1 px-4 py-3 rounded-2xl bg-white/[0.03] border border-white/10 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 transition-all"
                    />
                    <motion.button
                      whileHover={{ scale: 1.1, rotate: 90 }}
                      whileTap={{ scale: 0.85 }}
                      type="submit"
                      className="p-3 rounded-2xl bg-purple-600 hover:bg-purple-500 text-white shadow-lg shadow-purple-600/40 transition-all cursor-pointer shrink-0"
                    >
                      <Plus className="w-5 h-5" />
                    </motion.button>
                  </form>

                  <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-3">
                    {notes.map((note) => (
                      <motion.div
                        key={note.id}
                        variants={itemVariants}
                        whileHover={{ x: 6, backgroundColor: "rgba(255, 255, 255, 0.04)" }}
                        className="p-3.5 sm:p-4 rounded-2xl bg-white/[0.02] border border-white/5 flex items-start gap-3.5 transition-all"
                      >
                        <span className="px-2.5 py-1 rounded-lg bg-purple-500/10 text-purple-300 border border-purple-500/20 text-[11px] font-mono font-bold shrink-0 mt-0.5">
                          {note.time}
                        </span>
                        <p className="text-xs sm:text-sm text-gray-300 font-medium leading-relaxed flex-1">
                          {note.content}
                        </p>
                      </motion.div>
                    ))}
                  </motion.div>
                </motion.div>
              )}

              {/* TAB 2: COMMENTS (Post Button Animated) */}
              {activeTab === 'Comments' && (
                <motion.div
                  key="comments"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-4"
                >
                  <form onSubmit={handleAddComment} className="flex items-center gap-3">
                    <input
                      type="text"
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      placeholder="Add a comment..."
                      className="flex-1 px-4 py-3 rounded-2xl bg-white/[0.03] border border-white/10 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 transition-all"
                    />
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.9 }}
                      type="submit"
                      className="px-5 py-3 rounded-2xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold shadow-lg shadow-purple-600/40 transition-all cursor-pointer shrink-0 flex items-center gap-1.5"
                    >
                      <span>Post</span>
                      <Send className="w-3.5 h-3.5" />
                    </motion.button>
                  </form>

                  <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-3">
                    {comments.map((comment) => (
                      <motion.div key={comment.id} variants={itemVariants} className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/5 flex gap-3">
                        <img src={comment.avatar} alt={comment.author} className="w-8 h-8 rounded-full object-cover shrink-0 mt-0.5 border border-white/10" />
                        <div className="flex-1 space-y-1">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-white">{comment.author}</span>
                            <span className="text-[10px] text-gray-500">{comment.timeAgo}</span>
                          </div>
                          <p className="text-xs text-gray-300 leading-relaxed">{comment.text}</p>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                </motion.div>
              )}

              {/* TAB 3: RESOURCES (Download Icon Animated) */}
              {activeTab === 'Resources' && (
                <motion.div
                  key="resources"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-3"
                >
                  <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-3">
                    {initialResources.map((res) => (
                      <motion.div
                        key={res.id}
                        variants={itemVariants}
                        whileHover={{ scale: 1.01, x: 4 }}
                        className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-purple-500/30 transition-all flex items-center justify-between group"
                      >
                        <div className="flex items-center gap-3">
                          <span className="px-2.5 py-1 rounded-lg bg-purple-500/20 text-purple-300 border border-purple-500/30 text-[10px] font-black tracking-wider">
                            {res.type}
                          </span>
                          <div>
                            <h4 className="text-xs font-bold text-white group-hover:text-purple-300 transition-colors">{res.name}</h4>
                            <span className="text-[10px] text-gray-400">{res.size}</span>
                          </div>
                        </div>

                        <motion.button
                          whileHover={{ scale: 1.2, y: -2 }}
                          whileTap={{ scale: 0.85 }}
                          onClick={() => handleDownloadResource(res.name)}
                          className="p-2.5 rounded-xl bg-white/[0.04] hover:bg-purple-600/30 text-gray-400 hover:text-white border border-white/10 hover:border-purple-500/40 transition-all cursor-pointer shadow-md"
                        >
                          <Download className="w-4 h-4 text-purple-300" />
                        </motion.button>
                      </motion.div>
                    ))}
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>

        {/* Right Section: Interactive Playlist */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="p-5 rounded-3xl bg-[#110f22] border border-white/5 space-y-4 flex flex-col h-full shadow-2xl"
        >
          <div className="flex items-center justify-between border-b border-white/5 pb-3">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-purple-400 animate-pulse" /> Course Playlist
            </h3>
            <span className="text-[11px] font-bold text-purple-400 bg-purple-500/10 px-2.5 py-0.5 rounded-full border border-purple-500/20">
              {course.lessons.length} Lessons
            </span>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-2.5 overflow-y-auto max-h-[720px] pr-1 custom-scrollbar"
          >
            {course.lessons.map((lesson) => {
              const isActive = activeLesson.id === lesson.id;
              return (
                <motion.div
                  key={lesson.id}
                  variants={itemVariants}
                  whileHover={{ scale: 1.02, x: 4 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleSelectLesson(lesson)}
                  className={`p-2.5 rounded-2xl border flex items-center gap-3 transition-all cursor-pointer relative overflow-hidden ${isActive
                      ? 'bg-purple-600/25 border-purple-500/60 shadow-lg shadow-purple-900/40'
                      : 'bg-white/[0.02] border-white/5 hover:border-white/20'
                    }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeLessonGlow"
                      className="absolute inset-0 bg-purple-500/10 border-l-4 border-purple-500 pointer-events-none"
                    />
                  )}

                  <div className="relative w-24 h-16 rounded-xl overflow-hidden shrink-0 border border-white/10">
                    <img src={lesson.thumbnail} alt={lesson.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      {isActive ? (
                        <motion.span animate={{ scale: [1, 1.15, 1] }} transition={{ repeat: Infinity, duration: 1.5 }} className="p-1.5 rounded-full bg-purple-600 text-white shadow-md">
                          <Play className="w-3.5 h-3.5 fill-white ml-0.5" />
                        </motion.span>
                      ) : (
                        <Play className="w-4 h-4 text-white/80 opacity-0 group-hover:opacity-100 transition-opacity" />
                      )}
                    </div>
                  </div>

                  <div className="flex-1 min-w-0 space-y-1">
                    <h4 className={`text-xs font-bold truncate ${isActive ? 'text-purple-300' : 'text-white'}`}>
                      {lesson.title}
                    </h4>
                    <div className="flex items-center gap-2 text-[10px] text-gray-400">
                      <span>{lesson.duration}</span>
                      <span>•</span>
                      <span>{lesson.views}</span>
                    </div>
                  </div>

                  <ChevronRight className={`w-4 h-4 shrink-0 ${isActive ? 'text-purple-400' : 'text-gray-600'}`} />
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>

      </div>
    </motion.div>
  );
}