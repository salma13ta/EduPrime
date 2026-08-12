'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Clock,
  CheckCircle2,
  AlertTriangle,
  Flag,
  ChevronRight,
  ChevronLeft,
  Sparkles,
  RotateCcw,
  ArrowLeft,
  Calculator,
  Maximize2,
  Minimize2,
  BookOpen,
  Calendar,
  XCircle
} from 'lucide-react';

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
}

interface Exam {
  id: string;
  title: string;
  subject: string;
  durationMinutes: number;
  totalQuestions: number;
  type: 'mid_month' | 'concept_quiz';
  date: string;
  questions: Question[];
}

const availableExams: Exam[] = [
  {
    id: 'exam-1',
    title: 'Advanced Calculus — Final Exam',
    subject: 'Pure Mathematics',
    durationMinutes: 30,
    totalQuestions: 5,
    type: 'mid_month',
    date: 'July 23, 2026',
    questions: [
      { id: 1, question: "Find the derivative of f(x) = 3x^4 - 2x^3 + 5x - 7", options: ["f'(x) = 12x^3 - 6x^2 + 5", "f'(x) = 12x^3 - 6x^2 - 5", "f'(x) = 12x^4 - 6x^3 + 5", "f'(x) = 3x^3 - 2x^2 + 5"], correctAnswer: 0 },
      { id: 2, question: "Evaluate the integral ∫(2x + 3)dx", options: ["x^2 + 3x + C", "2x^2 + 3x + C", "x^2 + C", "2x + 3"], correctAnswer: 0 },
      { id: 3, question: "What is the limit of (sin x)/x as x approaches 0?", options: ["0", "1", "Infinity", "Undefined"], correctAnswer: 1 },
      { id: 4, question: "Which of the following is the chain rule formula?", options: ["(f g)' = f'g + fg'", "(f(g(x)))' = f'(g(x)) * g'(x)", "f'(x) / g'(x)", "None of the above"], correctAnswer: 1 },
      { id: 5, question: "Find the second derivative of y = sin(x)", options: ["cos(x)", "-sin(x)", "-cos(x)", "sin(x)"], correctAnswer: 1 }
    ]
  },
  {
    id: 'exam-2',
    title: 'Organic Chemistry — 15 Min Concept Quiz',
    subject: 'Chemistry',
    durationMinutes: 15,
    totalQuestions: 3,
    type: 'concept_quiz',
    date: 'Monthly Assessment',
    questions: [
      { id: 1, question: "What is the functional group of alcohols?", options: ["-COOH", "-OH", "-CHO", "-NH2"], correctAnswer: 1 },
      { id: 2, question: "Which molecule is an alkane?", options: ["C2H4", "C2H2", "C2H6", "C6H6"], correctAnswer: 2 },
      { id: 3, question: "Benzene ring formula is:", options: ["C6H12", "C6H6", "C5H10", "C6H14"], correctAnswer: 1 }
    ]
  }
];

export default function ExamsHubSection() {
  const [selectedExam, setSelectedExam] = useState<Exam | null>(null);
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<{ [key: number]: number }>({});
  const [flaggedQuestions, setFlaggedQuestions] = useState<{ [key: number]: boolean }>({});
  const [timeLeft, setTimeLeft] = useState(0);
  const [examSubmitted, setExamSubmitted] = useState(false);

  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);
  const [calcInput, setCalcInput] = useState('');
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    if (!selectedExam || examSubmitted) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          setExamSubmitted(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [selectedExam, examSubmitted]);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => { });
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  const handleCalcPress = (value: string) => {
    setCalcInput(prev => prev + value);
  };

  const handleCalcClear = () => {
    setCalcInput('');
  };

  const handleCalcEvaluate = () => {
    try {
      const expression = calcInput.replace(/×/g, '*').replace(/÷/g, '/');
      if (!expression) {
        setCalcInput('0');
        return;
      }

      const result = new Function(`"use strict"; return (${expression});`)();
      setCalcInput(String(result));
    } catch {
      setCalcInput('Error');
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSelectOption = (qId: number, optIdx: number) => {
    setUserAnswers(prev => ({ ...prev, [qId]: optIdx }));
  };

  const toggleFlag = (qId: number) => {
    setFlaggedQuestions(prev => ({ ...prev, [qId]: !prev[qId] }));
  };

  const calculateScore = () => {
    if (!selectedExam) return 0;
    let correctCount = 0;
    selectedExam.questions.forEach(q => {
      if (userAnswers[q.id] === q.correctAnswer) correctCount++;
    });
    return Math.round((correctCount / selectedExam.questions.length) * 100);
  };

  const beginExam = (exam: Exam) => {
    setSelectedExam(exam);
    setCurrentQIndex(0);
    setUserAnswers({});
    setFlaggedQuestions({});
    setExamSubmitted(false);
    setTimeLeft(exam.durationMinutes * 60);
    setIsCalculatorOpen(false);
  };

  const resetExamState = () => {
    setSelectedExam(null);
    setCurrentQIndex(0);
    setUserAnswers({});
    setFlaggedQuestions({});
    setExamSubmitted(false);
    setTimeLeft(0);
    setIsCalculatorOpen(false);
  };

  // 1. الواجهة الرئيسية (قائمة الامتحانات داخل لوحة التحكم)
  if (!selectedExam) {
    return (
      <div className="w-full space-y-8 font-sans text-white pb-12">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-[#141225] via-[#1b1436] to-[#0e0c1a] p-6 sm:p-8 rounded-[2.5rem] border border-purple-500/25 shadow-2xl relative overflow-hidden"
        >
          <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 space-y-2">
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight">Exams & Monthly Assessments</h1>
            <p className="text-xs sm:text-sm text-gray-400 max-w-xl leading-relaxed">
              Choose an active exam or monthly quiz below. Timed evaluation environments equipped with instant performance analytics.
            </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {availableExams.map((exam, index) => (
            <motion.div
              key={exam.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -4 }}
              className="bg-[#12101f] border border-white/10 hover:border-purple-500/50 p-6 sm:p-8 rounded-[2rem] shadow-xl flex flex-col justify-between space-y-6 relative overflow-hidden group"
            >
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-indigo-500" />

              <div className="space-y-4">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <span className="px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-bold">
                    {exam.subject}
                  </span>
                  <span className="text-xs text-gray-400 flex items-center gap-1 font-semibold">
                    <Calendar className="w-3.5 h-3.5 text-purple-400" /> {exam.date}
                  </span>
                </div>

                <h3 className="text-lg font-black text-white group-hover:text-purple-300 transition-colors">
                  {exam.title}
                </h3>

                <div className="flex items-center gap-4 text-xs text-gray-400 pt-2 border-t border-white/5 flex-wrap">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-cyan-400" /> {exam.durationMinutes} Minutes
                  </span>
                  <span className="flex items-center gap-1">
                    <BookOpen className="w-3.5 h-3.5 text-pink-400" /> {exam.totalQuestions} Questions
                  </span>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => beginExam(exam)}
                className="w-full py-3 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-extrabold text-xs shadow-lg shadow-purple-600/30 transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Start Assessment</span>
                <ChevronRight className="w-4 h-4" />
              </motion.button>
            </motion.div>
          ))}
        </div>
      </div>
    );
  }

  // 2. شاشة عرض النتيجة بعد إنهاء الامتحان
  if (examSubmitted) {
    const finalScore = calculateScore();
    const flaggedCount = Object.values(flaggedQuestions).filter(Boolean).length;
    const correctCount = selectedExam.questions.filter(q => userAnswers[q.id] === q.correctAnswer).length;

    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="w-full space-y-8 font-sans text-white pb-12 max-w-4xl mx-auto px-4"
      >
        <div className="bg-[#12101f] border border-purple-500/30 p-8 rounded-[2.5rem] text-center space-y-6 shadow-[0_0_50px_rgba(168,85,247,0.15)] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

          <motion.div
            initial={{ scale: 0, rotate: -20 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
            className="w-20 h-20 rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center mx-auto text-red-400 shadow-[0_0_30px_rgba(239,68,68,0.3)]"
          >
            <AlertTriangle className="w-10 h-10" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-2"
          >
            <h2 className="text-3xl font-black text-white">Keep Practicing 💪</h2>
            <p className="text-xs text-gray-400">{selectedExam.title} • {selectedExam.date}</p>
          </motion.div>

          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.4, type: "spring" }}
            className="text-5xl font-black bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent py-2"
          >
            {finalScore}%
          </motion.div>
          <p className="text-xs text-gray-400">{correctCount} out of {selectedExam.totalQuestions} questions correct</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-[#12101f] p-5 rounded-3xl border border-white/10 text-center space-y-1">
            <Clock className="w-5 h-5 text-cyan-400 mx-auto mb-2" />
            <span className="text-xs text-gray-400 block">Time Taken</span>
            <span className="text-base font-extrabold">{formatTime(selectedExam.durationMinutes * 60 - timeLeft)}</span>
          </div>
          <div className="bg-[#12101f] p-5 rounded-3xl border border-white/10 text-center space-y-1">
            <Sparkles className="w-5 h-5 text-purple-400 mx-auto mb-2" />
            <span className="text-xs text-gray-400 block">Accuracy</span>
            <span className="text-base font-extrabold">{finalScore}%</span>
          </div>
          <div className="bg-[#12101f] p-5 rounded-3xl border border-white/10 text-center space-y-1">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 mx-auto mb-2" />
            <span className="text-xs text-gray-400 block">Correct</span>
            <span className="text-base font-extrabold">{correctCount}</span>
          </div>
          <div className="bg-[#12101f] p-5 rounded-3xl border border-white/10 text-center space-y-1">
            <Flag className="w-5 h-5 text-pink-400 mx-auto mb-2" />
            <span className="text-xs text-gray-400 block">Flagged</span>
            <span className="text-base font-extrabold">{flaggedCount}</span>
          </div>
        </div>

        <div className="bg-[#12101f] border border-white/10 rounded-[2rem] p-6 space-y-4">
          <h3 className="text-sm font-black text-white">Question Analysis Breakdown</h3>
          <div className="space-y-2.5">
            {selectedExam.questions.map((q, idx) => {
              const isCorrect = userAnswers[q.id] === q.correctAnswer;
              return (
                <div key={q.id} className="p-3.5 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between text-xs gap-4">
                  <span className="font-semibold text-gray-300 truncate">Q{idx + 1}: {q.question}</span>
                  {isCorrect ? (
                    <span className="flex items-center gap-1 text-emerald-400 font-bold shrink-0">
                      <CheckCircle2 className="w-4 h-4" /> Correct
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-red-400 font-bold shrink-0">
                      <XCircle className="w-4 h-4" /> Incorrect
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex items-center justify-center gap-4 pt-4 flex-wrap">
          <button
            onClick={resetExamState}
            className="px-6 py-3 rounded-2xl bg-white/5 hover:bg-white/10 text-gray-300 font-bold text-xs transition-all cursor-pointer border border-white/10 flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Dashboard
          </button>
          <button
            onClick={() => {
              setExamSubmitted(false);
              setUserAnswers({});
              setTimeLeft(selectedExam.durationMinutes * 60);
            }}
            className="px-6 py-3 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-extrabold text-xs shadow-lg shadow-purple-600/30 transition-all cursor-pointer flex items-center gap-2"
          >
            <RotateCcw className="w-4 h-4" /> Retake Exam
          </button>
        </div>
      </motion.div>
    );
  }

  // 3. واجهة الامتحان التفاعلية الاحترافية (تغطي الشاشة بالكامل بمعزل عن الـ Sidebar الأساسي)
  const currentQuestion = selectedExam.questions[currentQIndex];
  const answeredCount = Object.keys(userAnswers).length;
  const progressPercent = ((currentQIndex + 1) / selectedExam.questions.length) * 100;
  const isLastQuestion = currentQIndex === selectedExam.questions.length - 1;

  return (
    <div className="fixed inset-0 z-50 bg-[#08070d] text-white flex flex-col font-sans overflow-y-auto p-4 sm:p-6 lg:p-8">

      {/* رأس شاشة الامتحان */}
      <div className="max-w-7xl mx-auto w-full flex items-center justify-between pb-4 sm:pb-6 border-b border-white/10 gap-4 flex-wrap">
        <div className="space-y-1">
          <h2 className="text-base sm:text-xl font-black text-white">{selectedExam.title}</h2>
          <p className="text-xs text-gray-400">{answeredCount} of {selectedExam.questions.length} answered</p>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          <div className="px-4 py-2 rounded-full bg-[#161326] border border-purple-500/30 text-emerald-400 font-extrabold text-xs flex items-center gap-2 shadow-inner">
            <Clock className="w-4 h-4" /> {formatTime(timeLeft)}
          </div>

          <button
            onClick={() => setIsCalculatorOpen(true)}
            className="p-2.5 rounded-xl bg-[#12101f] border border-white/10 text-gray-300 hover:text-purple-400 hover:border-purple-500/40 transition-all cursor-pointer shadow-sm"
            title="Open Calculator"
          >
            <Calculator className="w-4 h-4" />
          </button>

          <button
            onClick={toggleFullscreen}
            className="p-2.5 rounded-xl bg-[#12101f] border border-white/10 text-gray-300 hover:text-purple-400 hover:border-purple-500/40 transition-all cursor-pointer shadow-sm"
            title={isFullscreen ? "Exit Fullscreen" : "Fullscreen Mode"}
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4 text-purple-400" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* المحتوى الرئيسي للاسئلة والـ Navigator */}
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-4 gap-6 sm:gap-8 pt-6 flex-1">

        <div className="lg:col-span-3 space-y-6">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <span className="text-xs font-bold px-3 py-1 rounded-lg bg-purple-600/20 border border-purple-500/30 text-purple-300">
              Question {currentQIndex + 1} of {selectedExam.questions.length}
            </span>

            <button
              onClick={() => toggleFlag(currentQuestion.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all flex items-center gap-1.5 cursor-pointer ${flaggedQuestions[currentQuestion.id]
                  ? 'bg-amber-500/20 border-amber-500/40 text-amber-400'
                  : 'bg-[#12101f] border-white/10 text-gray-400 hover:text-white'
                }`}
            >
              <Flag className="w-3.5 h-3.5" /> {flaggedQuestions[currentQuestion.id] ? 'Flagged' : 'Flag Question'}
            </button>
          </div>

          <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-purple-500 to-cyan-400"
              animate={{ width: `${progressPercent}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>

          <div className="bg-[#12101f] border border-white/10 p-6 sm:p-8 rounded-[2rem] shadow-xl">
            <h3 className="text-base sm:text-lg font-bold text-white leading-relaxed">
              {currentQuestion.question}
            </h3>
          </div>

          <div className="space-y-3">
            {currentQuestion.options.map((option, optIdx) => {
              const isSelected = userAnswers[currentQuestion.id] === optIdx;

              return (
                <motion.div
                  key={optIdx}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => handleSelectOption(currentQuestion.id, optIdx)}
                  className={`p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer flex items-center gap-4 ${isSelected
                      ? 'bg-purple-600/20 border-purple-500 text-white shadow-[0_0_20px_rgba(168,85,247,0.2)]'
                      : 'bg-[#12101f]/80 border-white/10 text-gray-300 hover:border-white/30'
                    }`}
                >
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs border shrink-0 ${isSelected ? 'bg-purple-600 border-purple-400 text-white' : 'bg-white/5 border-white/10 text-gray-400'
                    }`}>
                    {String.fromCharCode(65 + optIdx)}
                  </div>
                  <span className="text-sm font-medium leading-relaxed">{option}</span>
                </motion.div>
              );
            })}
          </div>

          <div className="flex items-center justify-between pt-4">
            <button
              disabled={currentQIndex === 0}
              onClick={() => setCurrentQIndex(prev => Math.max(0, prev - 1))}
              className={`px-5 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition-all ${currentQIndex === 0 ? 'opacity-40 cursor-not-allowed bg-white/5 text-gray-500' : 'bg-[#12101f] border border-white/10 text-white hover:bg-white/10 cursor-pointer'
                }`}
            >
              <ChevronLeft className="w-4 h-4" /> Previous
            </button>

            {isLastQuestion ? (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setExamSubmitted(true)}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-extrabold text-xs shadow-lg shadow-emerald-600/30 transition-all cursor-pointer flex items-center gap-2"
              >
                <span>Finish & Submit Exam</span>
                <CheckCircle2 className="w-4 h-4" />
              </motion.button>
            ) : (
              <button
                onClick={() => setCurrentQIndex(prev => Math.min(selectedExam.questions.length - 1, prev + 1))}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-extrabold text-xs shadow-lg shadow-purple-600/30 transition-all cursor-pointer flex items-center gap-2"
              >
                <span>Next</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* لوحة التنقل الجانبية للأسئلة */}
        <div className="bg-[#12101f] border border-white/10 p-6 rounded-[2rem] space-y-6 h-fit">
          <div>
            <h4 className="text-sm font-extrabold text-white">Question Navigator</h4>
            <p className="text-[11px] text-gray-400 mt-0.5">Jump directly to any question</p>
          </div>

          <div className="grid grid-cols-5 gap-2.5">
            {selectedExam.questions.map((q, idx) => {
              const isCurrent = currentQIndex === idx;
              const isAnswered = userAnswers[q.id] !== undefined;
              const isFlagged = flaggedQuestions[q.id];

              return (
                <button
                  key={q.id}
                  onClick={() => setCurrentQIndex(idx)}
                  className={`w-10 h-10 rounded-xl font-bold text-xs transition-all flex items-center justify-center cursor-pointer border ${isCurrent
                      ? 'bg-purple-600 border-purple-400 text-white shadow-md shadow-purple-600/40'
                      : isFlagged
                        ? 'bg-amber-500/20 border-amber-500/40 text-amber-400'
                        : isAnswered
                          ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-400'
                          : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10'
                    }`}
                >
                  {idx + 1}
                </button>
              );
            })}
          </div>

          <div className="space-y-2.5 pt-4 border-t border-white/10 text-[11px] text-gray-400">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-md bg-purple-600" /> Current
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-md bg-emerald-500/40 border border-emerald-500/60" /> Answered
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-md bg-amber-500/40 border border-amber-500/60" /> Flagged
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-md bg-white/10" /> Unanswered
            </div>
          </div>
        </div>

      </div>

      {/* نافذة الآلة الحاسبة التفاعلية */}
      <AnimatePresence>
        {isCalculatorOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-[#12101f] border border-purple-500/30 w-full max-w-xs rounded-3xl p-5 space-y-4 shadow-2xl"
            >
              <div className="flex items-center justify-between pb-2 border-b border-white/10">
                <div className="flex items-center gap-1.5 text-purple-400 text-xs font-bold">
                  <Calculator className="w-4 h-4" /> Exam Calculator
                </div>
                <button
                  onClick={() => setIsCalculatorOpen(false)}
                  className="w-6 h-6 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white flex items-center justify-center transition-all cursor-pointer text-xs"
                >
                  ✕
                </button>
              </div>

              <div className="bg-[#09080e] border border-white/10 p-3 rounded-2xl text-right text-xl font-mono tracking-wider text-cyan-400 min-h-[50px] flex items-center justify-end overflow-x-auto">
                {calcInput || '0'}
              </div>

              <div className="grid grid-cols-4 gap-2 text-xs font-bold">
                <button onClick={handleCalcClear} className="p-3 rounded-xl bg-red-500/20 text-red-400 border border-red-500/30 hover:bg-red-500/30 transition-all col-span-2">C</button>
                <button onClick={() => handleCalcPress('÷')} className="p-3 rounded-xl bg-purple-600/20 text-purple-300 border border-purple-500/30 hover:bg-purple-600/30 transition-all">÷</button>
                <button onClick={() => handleCalcPress('×')} className="p-3 rounded-xl bg-purple-600/20 text-purple-300 border border-purple-500/30 hover:bg-purple-600/30 transition-all">×</button>

                <button onClick={() => handleCalcPress('7')} className="p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all">7</button>
                <button onClick={() => handleCalcPress('8')} className="p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all">8</button>
                <button onClick={() => handleCalcPress('9')} className="p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all">9</button>
                <button onClick={() => handleCalcPress('-')} className="p-3 rounded-xl bg-purple-600/20 text-purple-300 border border-purple-500/30 hover:bg-purple-600/30 transition-all">-</button>

                <button onClick={() => handleCalcPress('4')} className="p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all">4</button>
                <button onClick={() => handleCalcPress('5')} className="p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all">5</button>
                <button onClick={() => handleCalcPress('6')} className="p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all">6</button>
                <button onClick={() => handleCalcPress('+')} className="p-3 rounded-xl bg-purple-600/20 text-purple-300 border border-purple-500/30 hover:bg-purple-600/30 transition-all">+</button>

                <button onClick={() => handleCalcPress('1')} className="p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all">1</button>
                <button onClick={() => handleCalcPress('2')} className="p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all">2</button>
                <button onClick={() => handleCalcPress('3')} className="p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all">3</button>
                <button onClick={handleCalcEvaluate} className="p-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white transition-all row-span-2 flex items-center justify-center font-black">=</button>

                <button onClick={() => handleCalcPress('0')} className="p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all col-span-2">0</button>
                <button onClick={() => handleCalcPress('.')} className="p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all">.</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}