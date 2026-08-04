'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    FiMessageSquare,
    FiCreditCard,
    FiCalendar,
    FiAward,
    FiBookOpen,
    FiClock
} from 'react-icons/fi';

const studentsData = [
    {
        id: 1,
        name: "Omar Hassan",
        grade: "Grade 10 - Science Track",
        avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80",
        attendance: "94%",
        avgGrade: "88%",
        rank: "#3",
        sessions: 8,
        subjects: [
            { name: "Mathematics", score: 92, teacher: "Dr. Ahmed Hassan", color: "from-indigo-500 to-indigo-400" },
            { name: "Physics", score: 85, teacher: "Ms. Sara Nour", color: "from-cyan-400 to-cyan-500" },
            { name: "Chemistry", score: 88, teacher: "Mr. Karim Sayed", color: "from-emerald-400 to-emerald-500" },
        ],
        homeworks: [
            { title: "Calculus Derivatives Set", subject: "Calculus", due: "Due Jul 25", status: "Submitted" },
            { title: "Physics Wave Problems", subject: "Physics", due: "Due Jul 28", status: "Pending" }
        ],
        payments: [
            { title: "Omar - Calculus July", date: "Jul 1", amount: "850 EGP", status: "PAID" },
            { title: "Omar - August 2025", date: "Next Due: Aug 1", amount: "850 EGP", status: "UPCOMING" }
        ]
    },
    {
        id: 2,
        name: "Hana Hassan",
        grade: "Grade 8 - Math & Science",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
        attendance: "98%",
        avgGrade: "95%",
        rank: "#1",
        sessions: 10,
        subjects: [
            { name: "Mathematics", score: 92, teacher: "Dr. Ahmed Hassan", color: "from-indigo-500 to-indigo-400" },
            { name: "Physics", score: 85, teacher: "Ms. Sara Nour", color: "from-cyan-400 to-cyan-500" },
            { name: "Chemistry", score: 88, teacher: "Mr. Karim Sayed", color: "from-emerald-400 to-emerald-500" },
        ],
        homeworks: [
            { title: "Linear Equations", subject: "Algebra", due: "Due Jul 24", status: "47/50 Graded" }
        ],
        payments: [
            { title: "Hana - Algebra July", date: "Jul 1", amount: "720 EGP", status: "PAID" },
            { title: "Hana - August 2025", date: "Next Due: Aug 1", amount: "720 EGP", status: "UPCOMING" }
        ]
    },
    {
        id: 3,
        name: "Ziad Hassan",
        grade: "Grade 5 - General",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
        attendance: "90%",
        avgGrade: "82%",
        rank: "#6",
        sessions: 6,
        subjects: [
            { name: "Arabic", score: 85, teacher: "Mr. Tarek Amin", color: "from-amber-500 to-amber-400" },
            { name: "Math", score: 80, teacher: "Ms. Hoda Youssef", color: "from-indigo-500 to-indigo-400" },
            { name: "Science", score: 81, teacher: "Dr. Nabil Fawzy", color: "from-emerald-400 to-emerald-500" },
        ],
        homeworks: [
            { title: "Arabic Grammar Sheet", subject: "Arabic", due: "Due Jul 27", status: "Pending" }
        ],
        payments: [
            { title: "Ziad - General July", date: "Jul 1", amount: "650 EGP", status: "PAID" },
            { title: "Ziad - August 2025", date: "Next Due: Aug 1", amount: "650 EGP", status: "UPCOMING" }
        ]
    }
];

export default function ParentPortalView() {
    const [selectedStudent, setSelectedStudent] = useState(studentsData[1]); // Hana الافتراضية
    const [activeTab, setActiveTab] = useState('overview');
    const [messageModal, setMessageModal] = useState(false);
    const [isPaid, setIsPaid] = useState(false);

    return (
        <div className="w-full text-slate-100 font-sans space-y-6 pb-12">

            {/* 1. Top Header Area */}
            <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-6">
                <div>
                    <span className="text-[10px] font-black tracking-widest text-indigo-400 uppercase">PARENT PORTAL</span>
                    <h1 className="text-2xl lg:text-3xl font-extrabold text-white tracking-tight mt-0.5">
                        Welcome, Fatma Hassan
                    </h1>
                    <p className="text-xs text-slate-400 mt-0.5">
                        2 children enrolled · 2 unread messages
                    </p>
                </div>

                {/* Action Buttons Top Right */}
                <div className="flex items-center gap-3 w-full xl:w-auto">
                    <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => setMessageModal(true)}
                        className="flex-1 xl:flex-none flex items-center justify-center gap-2 bg-[#151a28] hover:bg-[#1b2133] border border-slate-800 text-slate-200 px-4 py-2.5 rounded-xl text-xs font-semibold shadow-lg transition"
                    >
                        <FiMessageSquare className="text-indigo-400" />
                        Message Teacher
                    </motion.button>

                    <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => setActiveTab('payments')}
                        className="flex-1 xl:flex-none flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-2.5 rounded-xl text-xs font-semibold shadow-lg shadow-indigo-600/30 transition"
                    >
                        <FiCreditCard />
                        Pay Fees
                    </motion.button>
                </div>
            </div>

            {/* 2. Children Selector Cards (Omar & Hana & Ziad) with Real Images */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {studentsData.map((student) => {
                    const isSelected = selectedStudent.id === student.id;
                    return (
                        <motion.div
                            key={student.id}
                            whileHover={{ y: -2 }}
                            onClick={() => setSelectedStudent(student)}
                            className={`cursor-pointer p-4 rounded-2xl border transition-all duration-300 ${isSelected
                                ? "bg-[#141a29] border-cyan-400 ring-1 ring-cyan-400/40 shadow-xl shadow-cyan-500/10"
                                : "bg-[#111522] border-slate-800/80 hover:border-slate-700"
                                }`}
                        >
                            <div className="flex items-center gap-3">
                                <img
                                    src={student.avatar}
                                    alt={student.name}
                                    className="w-10 h-10 rounded-xl object-cover border border-indigo-500/30"
                                />
                                <div>
                                    <h3 className="font-bold text-white text-xs lg:text-sm">{student.name}</h3>
                                    <p className="text-[10px] text-cyan-300 font-medium">{student.grade}</p>
                                </div>
                            </div>
                        </motion.div>
                    );
                })}
            </div>

            {/* 3. Metrics Cards Bar */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <motion.div whileHover={{ y: -2 }} className="bg-[#111522] border border-slate-800/80 rounded-2xl p-5 shadow-xl">
                    <div className="flex items-center justify-between text-slate-400 mb-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider">Attendance Rate</span>
                        <FiCalendar className="text-indigo-400 text-sm" />
                    </div>
                    <div className="text-3xl font-black text-white">{selectedStudent.attendance}</div>
                    <span className="text-[10px] text-slate-500 mt-1 block">Attendance Rate</span>
                </motion.div>

                <motion.div whileHover={{ y: -2 }} className="bg-[#111522] border border-slate-800/80 rounded-2xl p-5 shadow-xl">
                    <div className="flex items-center justify-between text-slate-400 mb-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider">Average Grade</span>
                        <FiBookOpen className="text-cyan-400 text-sm" />
                    </div>
                    <div className="text-3xl font-black text-white">{selectedStudent.avgGrade}</div>
                    <span className="text-[10px] text-slate-500 mt-1 block">Average Grade</span>
                </motion.div>

                <motion.div whileHover={{ y: -2 }} className="bg-[#111522] border border-slate-800/80 rounded-2xl p-5 shadow-xl">
                    <div className="flex items-center justify-between text-slate-400 mb-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider">Class Rank</span>
                        <FiAward className="text-amber-400 text-sm" />
                    </div>
                    <div className="text-3xl font-black text-white">{selectedStudent.rank}</div>
                    <span className="text-[10px] text-slate-500 mt-1 block">Class Rank</span>
                </motion.div>

                <motion.div whileHover={{ y: -2 }} className="bg-[#111522] border border-slate-800/80 rounded-2xl p-5 shadow-xl">
                    <div className="flex items-center justify-between text-slate-400 mb-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider">Sessions This Month</span>
                        <FiClock className="text-emerald-400 text-sm" />
                    </div>
                    <div className="text-3xl font-black text-white">{selectedStudent.sessions}</div>
                    <span className="text-[10px] text-slate-500 mt-1 block">Sessions This Month</span>
                </motion.div>
            </div>

            {/* 4. Tabs Bar */}
            <div className="flex items-center gap-1 bg-[#111522] p-1.5 rounded-xl border border-slate-800/80 w-fit">
                {['overview', 'grades', 'homework', 'payments'].map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-4 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all ${activeTab === tab
                            ? "bg-indigo-600 text-white shadow-md"
                            : "text-slate-400 hover:text-white"
                            }`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* 5. Main Dynamic Layout */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={activeTab + selectedStudent.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                >
                    {activeTab === 'overview' && (
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                            <div className="lg:col-span-2 space-y-6">

                                {/* Grade Performance Card */}
                                <div className="bg-[#111522] border border-slate-800/80 rounded-3xl p-6 shadow-2xl">
                                    <h3 className="text-base font-bold text-white mb-0.5">Grade Performance</h3>
                                    <p className="text-xs text-slate-400 mb-6">Both children compared over 5 months</p>

                                    <div className="h-44 w-full relative">
                                        <svg className="w-full h-32 overflow-visible">
                                            <motion.path
                                                initial={{ pathLength: 0 }}
                                                animate={{ pathLength: 1 }}
                                                transition={{ duration: 1 }}
                                                d="M 0,50 Q 150,30 300,40 T 700,20" fill="none" stroke="#22d3ee" strokeWidth="3"
                                            />
                                            <motion.path
                                                initial={{ pathLength: 0 }}
                                                animate={{ pathLength: 1 }}
                                                transition={{ duration: 1, delay: 0.2 }}
                                                d="M 0,80 Q 150,60 300,90 T 700,60" fill="none" stroke="#818cf8" strokeWidth="3"
                                            />
                                        </svg>
                                        <div className="flex justify-between text-[10px] text-slate-500 font-bold px-2 border-t border-slate-800 pt-3">
                                            <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span><span>Jul</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Attendance by Week Card */}
                                <div className="bg-[#111522] border border-slate-800/80 rounded-3xl p-6 shadow-2xl">
                                    <h3 className="text-base font-bold text-white mb-0.5">Attendance by Week</h3>
                                    <p className="text-xs text-slate-400 mb-6">Sessions attended out of 5</p>

                                    <div className="grid grid-cols-4 gap-4 items-end h-36 pt-4 border-b border-slate-800 pb-2">
                                        {[
                                            { w: "W1", h1: "80%", h2: "90%" },
                                            { w: "W2", h1: "60%", h2: "100%" },
                                            { w: "W3", h1: "80%", h2: "80%" },
                                            { w: "W4", h1: "40%", h2: "90%" },
                                        ].map((item, idx) => (
                                            <div key={idx} className="flex flex-col items-center h-full justify-end gap-2">
                                                <div className="flex items-end gap-1.5 w-full justify-center h-28">
                                                    <motion.div initial={{ height: 0 }} animate={{ height: item.h1 }} transition={{ duration: 0.5, delay: idx * 0.1 }} className="w-3.5 rounded-t-lg bg-indigo-400"></motion.div>
                                                    <motion.div initial={{ height: 0 }} animate={{ height: item.h2 }} transition={{ duration: 0.5, delay: idx * 0.15 }} className="w-3.5 rounded-t-lg bg-cyan-400"></motion.div>
                                                </div>
                                                <span className="text-[10px] text-slate-400 font-bold">{item.w}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                            </div>

                            {/* Right Column */}
                            <div className="space-y-6">

                                {/* Teacher Messages */}
                                <div className="bg-[#111522] border border-slate-800/80 rounded-3xl p-6 shadow-2xl">
                                    <div className="flex justify-between items-center mb-4">
                                        <h3 className="text-sm font-bold text-white">Teacher Messages</h3>
                                        <span className="bg-rose-500/20 text-rose-400 text-[9px] font-bold px-2 py-0.5 rounded-full border border-rose-500/30">2 new</span>
                                    </div>
                                    <div className="space-y-3 text-xs">
                                        <div className="p-3 rounded-2xl bg-[#151a28] border border-slate-800">
                                            <div className="flex justify-between font-bold text-white mb-1">
                                                <span>Dr. Ahmed Hassan</span>
                                                <span className="text-[10px] text-slate-500 font-normal">30m</span>
                                            </div>
                                            <p className="text-[11px] text-slate-400">Omar showed great improvement this week!</p>
                                        </div>
                                        <div className="p-3 rounded-2xl bg-[#151a28] border border-slate-800">
                                            <div className="flex justify-between font-bold text-white mb-1">
                                                <span>Ms. Sara Nour</span>
                                                <span className="text-[10px] text-slate-500 font-normal">2h</span>
                                            </div>
                                            <p className="text-[11px] text-slate-400">Please remind Omar to bring his workbook.</p>
                                        </div>
                                        <div className="p-3 rounded-2xl bg-[#151a28] border border-slate-800">
                                            <div className="flex justify-between font-bold text-white mb-1">
                                                <span>Mr. Karim Sayed</span>
                                                <span className="text-[10px] text-slate-500 font-normal">1d</span>
                                            </div>
                                            <p className="text-[11px] text-slate-400">Hana scored 95% on her midterm! Excellent work.</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Upcoming */}
                                <div className="bg-[#111522] border border-slate-800/80 rounded-3xl p-6 shadow-2xl">
                                    <h3 className="text-sm font-bold text-white mb-4">Upcoming</h3>
                                    <div className="space-y-3 text-xs">
                                        <div className="flex items-center justify-between p-3 rounded-2xl bg-[#151a28] border border-slate-800">
                                            <span className="font-semibold text-white flex items-center gap-2">
                                                <span className="w-2 h-2 rounded-full bg-rose-500"></span> Omar&apos;s Calculus Exam
                                            </span>
                                            <span className="text-[10px] text-slate-400">Jul 28</span>
                                        </div>
                                        <div className="flex items-center justify-between p-3 rounded-2xl bg-[#151a28] border border-slate-800">
                                            <span className="font-semibold text-white flex items-center gap-2">
                                                <span className="w-2 h-2 rounded-full bg-cyan-400"></span> Hana&apos;s Science Project
                                            </span>
                                            <span className="text-[10px] text-slate-400">Jul 30</span>
                                        </div>
                                        <div className="flex items-center justify-between p-3 rounded-2xl bg-[#151a28] border border-slate-800">
                                            <span className="font-semibold text-white flex items-center gap-2">
                                                <span className="w-2 h-2 rounded-full bg-indigo-500"></span> Parent-Teacher Meeting
                                            </span>
                                            <span className="text-[10px] text-slate-400">Aug 2</span>
                                        </div>
                                        <div className="flex items-center justify-between p-3 rounded-2xl bg-[#151a28] border border-slate-800">
                                            <span className="font-semibold text-white flex items-center gap-2">
                                                <span className="w-2 h-2 rounded-full bg-amber-400"></span> Monthly Payment Due
                                            </span>
                                            <span className="text-[10px] text-slate-400">Aug 1</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Student's Subjects */}
                                <div className="bg-[#111522] border border-slate-800/80 rounded-3xl p-6 shadow-2xl">
                                    <h3 className="text-sm font-bold text-white mb-4">{selectedStudent.name}&apos;s Subjects</h3>
                                    <div className="space-y-4">
                                        {selectedStudent.subjects.map((sub, idx) => (
                                            <div key={idx} className="space-y-1.5">
                                                <div className="flex justify-between text-xs font-semibold">
                                                    <span className="text-white">{sub.name} <span className="text-[10px] text-slate-500 block font-normal">{sub.teacher}</span></span>
                                                    <span className="text-indigo-400 font-extrabold text-sm">{sub.score}%</span>
                                                </div>
                                                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                                                    <motion.div
                                                        initial={{ width: 0 }}
                                                        animate={{ width: `${sub.score}%` }}
                                                        transition={{ duration: 0.8 }}
                                                        className={`bg-gradient-to-r ${sub.color} h-full rounded-full`}
                                                    ></motion.div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                            </div>

                        </div>
                    )}

                    {/* Grades Tab */}
                    {activeTab === 'grades' && (
                        <div className="bg-[#111522] border border-slate-800/80 rounded-3xl p-8 shadow-2xl space-y-6">
                            <h3 className="text-lg font-bold text-white">Academic Grades - {selectedStudent.name}</h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {selectedStudent.subjects.map((sub, idx) => (
                                    <div key={idx} className="p-6 rounded-2xl bg-[#151a28] border border-slate-800 text-center space-y-2">
                                        <h4 className="text-sm font-bold text-white">{sub.name}</h4>
                                        <div className="text-4xl font-black text-indigo-400">{sub.score}%</div>
                                        <p className="text-xs text-slate-400">{sub.teacher}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Homework Tab */}
                    {activeTab === 'homework' && (
                        <div className="bg-[#111522] border border-slate-800/80 rounded-3xl p-8 shadow-2xl space-y-6">
                            <h3 className="text-lg font-bold text-white">Homework Status - {selectedStudent.name}</h3>
                            <div className="space-y-3">
                                {selectedStudent.homeworks.map((hw, idx) => (
                                    <div key={idx} className="flex justify-between items-center p-4 rounded-2xl bg-[#151a28] border border-slate-800 text-xs">
                                        <div>
                                            <span className="text-indigo-400 font-bold">{hw.subject}</span>
                                            <h4 className="font-bold text-white mt-0.5">{hw.title}</h4>
                                            <span className="text-slate-500">{hw.due}</span>
                                        </div>
                                        <span className="px-3 py-1 bg-indigo-500/20 text-indigo-300 rounded-xl font-bold border border-indigo-500/30">
                                            {hw.status}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Payments Tab */}
                    {activeTab === 'payments' && (
                        <div className="bg-[#111522] border border-slate-800/80 rounded-3xl p-8 shadow-2xl space-y-6">
                            <div className="flex justify-between items-center">
                                <h3 className="text-lg font-bold text-white">Payment Management</h3>
                                <motion.button
                                    whileHover={{ scale: 1.03 }}
                                    whileTap={{ scale: 0.97 }}
                                    onClick={() => setIsPaid(true)}
                                    className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-lg shadow-indigo-600/30"
                                >
                                    {isPaid ? "Paid Successfully ✓" : "Pay All Dues"}
                                </motion.button>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {selectedStudent.payments.map((pay, idx) => (
                                    <div key={idx} className="p-5 rounded-2xl bg-[#151a28] border border-slate-800 flex justify-between items-center text-xs">
                                        <div>
                                            <span className="text-slate-400">{pay.date}</span>
                                            <h4 className="font-bold text-white mt-0.5">{pay.title}</h4>
                                            <span className="text-sm font-extrabold text-indigo-400 mt-1 block">{pay.amount}</span>
                                        </div>
                                        <span className={`px-3 py-1 rounded-xl font-bold ${isPaid || pay.status === 'PAID' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'
                                            }`}>
                                            {isPaid ? 'PAID' : pay.status}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </motion.div>
            </AnimatePresence>

            {/* Message Modal */}
            {messageModal && (
                <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <motion.div
                        initial={{ scale: 0.95, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="bg-[#111522] border border-slate-800 w-full max-w-md rounded-3xl p-6 shadow-2xl"
                    >
                        <h3 className="text-base font-bold text-white mb-1">Message Teacher</h3>
                        <p className="text-xs text-slate-400 mb-4">Send a direct note regarding {selectedStudent.name}.</p>

                        <label className="text-[11px] font-semibold text-slate-300 block mb-1">Select Teacher</label>
                        <select className="w-full bg-[#151a28] border border-slate-800 text-slate-200 rounded-xl p-3 text-xs mb-4 outline-none focus:border-indigo-500">
                            {selectedStudent.subjects.map((sub, idx) => (
                                <option key={idx}>{sub.teacher} ({sub.name})</option>
                            ))}
                        </select>

                        <label className="text-[11px] font-semibold text-slate-300 block mb-1">Your Message</label>
                        <textarea
                            rows={4}
                            placeholder="Type your inquiry here..."
                            className="w-full bg-[#151a28] border border-slate-800 text-slate-200 rounded-xl p-3 text-xs mb-4 outline-none focus:border-indigo-500 resize-none"
                        ></textarea>

                        <div className="flex justify-end gap-3">
                            <button
                                onClick={() => setMessageModal(false)}
                                className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 text-slate-300 hover:bg-slate-700"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => {
                                    alert("Message sent successfully!");
                                    setMessageModal(false);
                                }}
                                className="px-5 py-2 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg"
                            >
                                Send Message
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}

        </div>
    );
}