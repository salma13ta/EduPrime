"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { BookOpen, ChevronRight, Search, Sparkles, Star, Users } from "lucide-react";
import { ROUTES } from "@/lib/routes";

export default function HeroSection() {
    return (
        <section className="relative flex min-h-screen items-center justify-center px-4 py-20 text-white sm:px-6">
            <div className="absolute top-0 left-1/2 h-[200px] w-[75vw] max-w-[800px] -translate-x-1/2 rounded-full bg-purple-600/15 blur-[140px] pointer-events-none sm:h-[260px] sm:w-[75vw]" />
            <div className="absolute top-[38%] right-0 h-[220px] w-[220px] rounded-full bg-blue-600/10 blur-[160px] pointer-events-none sm:h-[300px] sm:w-[300px]" />

            <div className="relative mx-auto w-full max-w-7xl text-center">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mb-6 inline-flex max-w-full items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[10px] text-gray-300 backdrop-blur-md transition-all hover:border-purple-500/50 sm:mb-8 sm:gap-2.5 sm:px-3.5 sm:text-xs"
                >
                    <span className="rounded-full bg-purple-600 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-white sm:text-[10px]">
                        NEW
                    </span>
                    <span className="truncate">AI-powered learning paths now available</span>
                    <ChevronRight className="h-3.5 w-3.5 shrink-0 text-gray-400" />
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="mx-auto max-w-4xl text-4xl font-black leading-[0.96] tracking-[-0.06em] text-white sm:text-5xl md:text-7xl"
                >
                    Learn From The <br />
                    <span className="bg-linear-to-r from-purple-400 via-indigo-300 to-cyan-400 bg-clip-text text-transparent">
                        World&apos;s Best
                    </span>{" "}
                    Teachers.
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="mx-auto mt-5 max-w-xl px-2 text-sm leading-relaxed text-gray-400 sm:mt-6 sm:text-base lg:text-lg"
                >
                    Connect with expert teachers, discover top learning centers, and unlock your full potential with our AI-powered educational platform.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="mx-auto mt-8 flex max-w-2xl flex-col items-center gap-3 rounded-2xl border border-white/10 bg-[#131625]/90 p-2 shadow-2xl transition-all focus-within:border-purple-500/60 sm:mt-10 sm:flex-row sm:gap-2"
                >
                    <div className="flex w-full items-center gap-2">
                        <Search className="ml-3 h-5 w-5 shrink-0 text-gray-400 sm:ml-3" />
                        <input
                            type="text"
                            placeholder="Search teachers, subjects, centers..."
                            className="w-full border-none bg-transparent text-sm text-white placeholder-gray-500 focus:outline-none sm:text-sm"
                        />
                    </div>
                    <button className="w-full shrink-0 rounded-xl bg-purple-600 px-6 py-3 text-sm font-medium text-white transition-all hover:bg-purple-500 sm:w-auto">
                        Search
                    </button>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="mt-7 flex flex-wrap items-center justify-center gap-3 sm:mt-8 sm:gap-4"
                >
                    <Link
                        href={ROUTES.COURSES}
                        className="flex w-full items-center justify-center gap-2 rounded-xl bg-purple-600 px-6 py-3.5 text-sm font-semibold text-white shadow-xl shadow-purple-600/30 transition-all hover:bg-purple-500 active:scale-95 sm:w-auto sm:px-8"
                    >
                        <BookOpen className="h-4 w-4" /> Start Learning
                    </Link>
                    <Link
                        href={ROUTES.WATCH_VIDEO("intro")}
                        className="flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white transition-all hover:bg-white/10 sm:w-auto sm:px-8"
                    >
                        Watch Demo
                    </Link>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className="relative mx-auto mt-12 max-w-4xl overflow-hidden rounded-3xl border border-white/10 bg-[#131625]/60 p-2 shadow-2xl backdrop-blur-sm sm:mt-16 sm:p-4"
                >
                    <div className="relative aspect-video overflow-hidden rounded-2xl bg-linear-to-br from-purple-900/30 to-slate-900">
                        <Image
                            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=1200"
                            alt="Students Studying"
                            width={1200}
                            height={675}
                            className="h-full w-full object-cover opacity-80"
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-[#0b0d17] via-transparent to-transparent" />
                    </div>

                    <motion.div
                        animate={{ y: [0, -8, 0] }}
                        transition={{ repeat: Number.POSITIVE_INFINITY, duration: 4, ease: "easeInOut" }}
                        className="absolute top-6 left-6 hidden items-center gap-3 rounded-2xl border border-white/10 bg-[#1c1f30]/90 px-4 py-2.5 shadow-xl backdrop-blur-md sm:flex"
                    >
                        <div className="rounded-xl bg-amber-500/20 p-2 text-amber-400">
                            <Users className="h-4 w-4" />
                        </div>
                        <span className="text-xs font-bold text-white">50K+ Students</span>
                    </motion.div>

                    <motion.div
                        animate={{ y: [0, -10, 0] }}
                        transition={{ repeat: Number.POSITIVE_INFINITY, duration: 5, delay: 1, ease: "easeInOut" }}
                        className="absolute top-8 right-6 hidden items-center gap-2 rounded-2xl border border-amber-500/30 bg-[#1c1f30]/90 px-4 py-2.5 shadow-xl backdrop-blur-md sm:flex"
                    >
                        <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                        <span className="text-xs font-bold text-white">4.9 Rating</span>
                    </motion.div>

                    <motion.div
                        animate={{ y: [0, -8, 0] }}
                        transition={{ repeat: Number.POSITIVE_INFINITY, duration: 4.5, delay: 0.5, ease: "easeInOut" }}
                        className="absolute bottom-10 left-8 hidden items-center gap-3 rounded-2xl border border-white/10 bg-[#1c1f30]/90 px-4 py-2.5 shadow-xl backdrop-blur-md sm:flex"
                    >
                        <div className="rounded-xl bg-purple-500/20 p-2 text-purple-400">
                            <Users className="h-4 w-4" />
                        </div>
                        <span className="text-xs font-bold text-white">2400 Teachers</span>
                    </motion.div>

                    <motion.div
                        animate={{ y: [0, -12, 0] }}
                        transition={{ repeat: Number.POSITIVE_INFINITY, duration: 4.8, delay: 1.5, ease: "easeInOut" }}
                        className="absolute bottom-8 right-8 hidden items-center gap-3 rounded-2xl border border-emerald-500/30 bg-[#1c1f30]/90 px-4 py-2.5 shadow-xl backdrop-blur-md sm:flex"
                    >
                        <div className="rounded-full bg-emerald-500/20 p-1.5 text-emerald-400">
                            <Sparkles className="h-4 w-4" />
                        </div>
                        <span className="text-xs font-bold text-white">98% Pass Rate</span>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
