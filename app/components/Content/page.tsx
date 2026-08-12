"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion, type Variants } from "framer-motion";
import {
  BookOpen,
  Search,
  Star,
  Users,
  Award,
  Globe2,
  ChevronRight,
  ChevronDown,
  Sparkles,
  Calculator,
  FlaskConical,
  Languages,
  Code2,
  Music,
  Palette,
  HeartPulse,
  Dumbbell,
  CheckCircle2,
  Lock,
  Trophy,
} from "lucide-react";
import { ROUTES } from "@/lib/routes";

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const sectionReveal: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

export default function EduPrimeLanding() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const prefersReducedMotion = useReducedMotion();

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const floatingTransition = prefersReducedMotion
    ? { duration: 0 }
    : { duration: 4, repeat: Infinity, ease: "easeInOut" as const };

  return (
    <div className="text-white font-sans selection:bg-purple-500 selection:text-white overflow-x-hidden relative pb-28">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[75vw] max-w-[800px] h-[260px] sm:h-[400px] bg-purple-600/15 blur-[140px] pointer-events-none rounded-full" />
      <div className="absolute top-[40%] right-0 w-[70vw] max-w-[500px] h-[70vw] max-h-[500px] bg-blue-600/10 blur-[160px] pointer-events-none rounded-full" />

      <section className="relative pt-10 pb-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center sm:pt-12 md:pt-20 md:pb-16">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex max-w-full items-center justify-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-[10px] sm:text-sm text-gray-300 mb-7 sm:mb-8 hover:border-purple-500/50 transition-all cursor-pointer"
        >
          <span className="px-2 py-0.5 rounded-full bg-purple-600 text-white font-bold text-[9px] sm:text-[10px] uppercase tracking-wider">
            NEW
          </span>
          <span className="truncate">AI-powered learning paths now available</span>
          <ChevronRight className="w-3.5 h-3.5 text-gray-400 shrink-0" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-6xl md:text-7xl font-black tracking-[-0.06em] text-white leading-[0.96] max-w-4xl mx-auto max-sm:text-[2.6rem]"
        >
          Learn From The <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-indigo-300 to-cyan-400">
            World&apos;s Best
          </span>{" "}
          Teachers.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-5 text-sm sm:text-lg text-gray-400 max-w-xl mx-auto leading-relaxed sm:mt-6 max-sm:px-2"
        >
          Connect with expert teachers, discover top learning centers, and unlock your full potential with our AI-powered educational platform.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-8 max-w-2xl mx-auto bg-[#131625]/90 border border-white/10 rounded-2xl p-2 flex items-center gap-2 shadow-2xl focus-within:border-purple-500/60 transition-all sm:mt-10 max-sm:flex-col max-sm:rounded-xl max-sm:p-3 max-sm:gap-3"
        >
          <div className="flex w-full items-center gap-2 max-sm:w-full">
            <Search className="w-5 h-5 text-gray-400 ml-3 shrink-0 max-sm:ml-0" />
            <input
              type="text"
              placeholder="Search teachers, subjects, centers..."
              className="w-full bg-transparent border-none text-sm text-white placeholder-gray-500 focus:outline-none max-sm:text-center"
            />
          </div>
          <button className="px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-medium text-sm transition-all shrink-0 w-full sm:w-auto">
            Search
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-7 flex flex-wrap items-center justify-center gap-3 sm:gap-4 sm:mt-8"
        >
          <Link
            href={ROUTES.COURSES}
            className="px-6 py-3.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-sm shadow-xl shadow-purple-600/30 flex items-center gap-2 transition-all active:scale-95 max-sm:w-full max-sm:justify-center sm:px-8"
          >
            <BookOpen className="w-4 h-4" /> Start Learning
          </Link>
          <Link
            href={ROUTES.WATCH_VIDEO("intro")}
            className="px-6 py-3.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold text-sm flex items-center gap-2 transition-all max-sm:w-full max-sm:justify-center sm:px-8"
          >
            Watch Demo
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-12 relative max-w-4xl mx-auto rounded-3xl overflow-hidden border border-white/10 bg-[#131625]/60 p-2 shadow-2xl backdrop-blur-sm sm:mt-16 sm:p-4"
        >
          <div className="relative rounded-2xl overflow-hidden aspect-[16/9] bg-gradient-to-br from-purple-900/30 to-slate-900">
            <Image
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=1200"
              alt="Students Studying"
              width={1200}
              height={675}
              className="w-full h-full object-cover opacity-80"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0b0d17] via-transparent to-transparent" />
          </div>

          <motion.div
            animate={prefersReducedMotion ? { y: 0 } : { y: [0, -8, 0] }}
            transition={floatingTransition}
            className="absolute top-6 left-6 hidden sm:flex items-center gap-3 bg-[#1c1f30]/90 border border-white/10 px-4 py-2.5 rounded-2xl shadow-xl backdrop-blur-md"
          >
            <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400">
              <Users className="w-4 h-4" />
            </div>
            <span className="text-xs font-bold text-white">50K+ Students</span>
          </motion.div>

          <motion.div
            animate={prefersReducedMotion ? { y: 0 } : { y: [0, -10, 0] }}
            transition={{ ...floatingTransition, delay: 1 }}
            className="absolute top-8 right-6 hidden sm:flex items-center gap-2 bg-[#1c1f30]/90 border border-amber-500/30 px-4 py-2.5 rounded-2xl shadow-xl backdrop-blur-md"
          >
            <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
            <span className="text-xs font-bold text-white">4.9 Rating</span>
          </motion.div>

          <motion.div
            animate={prefersReducedMotion ? { y: 0 } : { y: [0, -8, 0] }}
            transition={{ ...floatingTransition, delay: 0.5 }}
            className="absolute bottom-10 left-8 hidden sm:flex items-center gap-3 bg-[#1c1f30]/90 border border-white/10 px-4 py-2.5 rounded-2xl shadow-xl backdrop-blur-md"
          >
            <div className="p-2 rounded-xl bg-purple-500/20 text-purple-400">
              <Users className="w-4 h-4" />
            </div>
            <span className="text-xs font-bold text-white">2400 Teachers</span>
          </motion.div>

          <motion.div
            animate={prefersReducedMotion ? { y: 0 } : { y: [0, -12, 0] }}
            transition={{ ...floatingTransition, delay: 1.5 }}
            className="absolute bottom-8 right-8 hidden sm:flex items-center gap-3 bg-[#1c1f30]/90 border border-emerald-500/30 px-4 py-2.5 rounded-2xl shadow-xl backdrop-blur-md"
          >
            <div className="p-1.5 rounded-full bg-emerald-500/20 text-emerald-400">
              <Sparkles className="w-4 h-4" />
            </div>
            <span className="text-xs font-bold text-white">98% Pass Rate</span>
          </motion.div>
        </motion.div>
      </section>

      <section className="py-12 border-y border-white/5 bg-white/1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xs font-semibold tracking-widest text-gray-500 uppercase mb-8">
            Trusted by students at
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 sm:gap-12 opacity-60 text-gray-400 font-bold text-base sm:text-xl">
            {[
              "Stanford",
              "Oxford",
              "MIT",
              "Apple",
              "Amazon",
              "UNESCO",
              "Coursera",
              "Microsoft",
              "Google",
              "Harvard",
            ].map((brand, idx) => (
              <span key={idx} className="hover:opacity-100 hover:text-white transition-all cursor-default">
                {brand}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2, margin: "-80px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {[
            { value: "50,000+", label: "Active Students", icon: Users, color: "text-purple-400" },
            { value: "2,400+", label: "Expert Teachers", icon: Award, color: "text-blue-400" },
            { value: "380+", label: "Learning Centers", icon: BookOpen, color: "text-indigo-400" },
            { value: "65+", label: "Countries", icon: Globe2, color: "text-cyan-400" },
          ].map((stat, idx) => (
            <motion.div
              key={idx}
              variants={fadeInUp}
              whileHover={{ y: -6 }}
              className="bg-[#131625]/70 border border-white/10 rounded-2xl p-6 text-center hover:border-purple-500/40 transition-all shadow-xl"
            >
              <div className="w-12 h-12 mx-auto rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-4">
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              <h3 className="text-3xl font-black text-white tracking-tight">{stat.value}</h3>
              <p className="text-sm text-gray-400 mt-1">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      <section id="courses" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2
            variants={sectionReveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            className="text-3xl sm:text-5xl font-black tracking-tight"
          >
            Explore <span className="text-purple-400">Every Subject</span>
          </motion.h2>
          <motion.p
            variants={sectionReveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            className="text-gray-400 mt-3 text-sm sm:text-base"
          >
            From core academics to creative arts — find expert guidance in every field.
          </motion.p>
        </div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2, margin: "-50px" }}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6"
        >
          {[
            { title: "Mathematics", courses: "1,240 courses", icon: Calculator, color: "text-purple-400 bg-purple-500/10" },
            { title: "Sciences", courses: "980 courses", icon: FlaskConical, color: "text-blue-400 bg-blue-500/10" },
            { title: "Languages", courses: "1,560 courses", icon: Languages, color: "text-cyan-400 bg-cyan-500/10" },
            { title: "Technology", courses: "720 courses", icon: Code2, color: "text-emerald-400 bg-emerald-500/10" },
            { title: "Music", courses: "440 courses", icon: Music, color: "text-amber-400 bg-amber-500/10" },
            { title: "Arts", courses: "360 courses", icon: Palette, color: "text-rose-400 bg-rose-500/10" },
            { title: "Health", courses: "280 courses", icon: HeartPulse, color: "text-pink-400 bg-pink-500/10" },
            { title: "Sports", courses: "190 courses", icon: Dumbbell, color: "text-teal-400 bg-teal-500/10" },
          ].map((sub, idx) => (
            <motion.div
              key={idx}
              variants={scaleIn}
              whileHover={{ scale: 1.03 }}
              className="bg-[#131625]/80 border border-white/10 rounded-2xl p-5 flex flex-col items-center text-center hover:border-purple-500/50 transition-all cursor-pointer group"
            >
              <div className={`w-12 h-12 rounded-2xl ${sub.color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                <sub.icon className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-white text-base">{sub.title}</h4>
              <p className="text-xs text-gray-400 mt-1">{sub.courses}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      <section id="teachers" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <div>
            <h2 className="text-3xl sm:text-4xl font-black">
              Featured <span className="text-purple-400">Teachers</span>
            </h2>
            <p className="text-gray-400 text-sm mt-1">Handpicked experts with proven track records</p>
          </div>
          <Link href={ROUTES.TEACHERS} className="self-start sm:self-auto px-4 py-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-xs font-semibold flex items-center gap-1.5 transition-all">
            View All <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {[
            {
              name: "Dr. Sarah Chen",
              subject: "Mathematics",
              rating: 4.9,
              reviews: 847,
              students: "1,240",
              price: "$85",
              badge: "Top Rated",
              badgeColor: "bg-purple-500/20 text-purple-300 border-purple-500/30",
              img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=300",
            },
            {
              name: "James Morrison",
              subject: "Physics",
              rating: 4.8,
              reviews: 612,
              students: "980",
              price: "$75",
              badge: "Expert",
              badgeColor: "bg-blue-500/20 text-blue-300 border-blue-500/30",
              img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=300",
            },
            {
              name: "Layla Hassan",
              subject: "English Literature",
              rating: 4.9,
              reviews: 1024,
              students: "1,580",
              price: "$65",
              badge: "Popular",
              badgeColor: "bg-amber-500/20 text-amber-300 border-amber-500/30",
              img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=300",
            },
            {
              name: "Marcus Rivera",
              subject: "Chemistry",
              rating: 4.7,
              reviews: 439,
              students: "760",
              price: "$80",
              badge: "New",
              badgeColor: "bg-cyan-500/20 text-cyan-300 border-cyan-500/30",
              img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300",
            },
          ].map((teacher, idx) => (
            <motion.div
              key={idx}
              variants={fadeInUp}
              whileHover={{ y: -6 }}
              className="bg-[#131625]/80 border border-white/10 rounded-2xl p-5 flex flex-col justify-between hover:border-purple-500/40 transition-all"
            >
              <div>
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <Image src={teacher.img} alt={teacher.name} width={48} height={48} className="w-12 h-12 rounded-full object-cover border border-purple-500/30" />
                    <div>
                      <h3 className="font-bold text-white text-sm">{teacher.name}</h3>
                      <p className="text-xs text-gray-400">{teacher.subject}</p>
                    </div>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${teacher.badgeColor}`}>
                    {teacher.badge}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2 py-3 border-y border-white/5 text-center my-3">
                  <div>
                    <div className="flex items-center justify-center gap-1 text-xs font-bold text-white">
                      <Star className="w-3 h-3 text-amber-400 fill-amber-400" /> {teacher.rating}
                    </div>
                    <span className="text-[10px] text-gray-500">Rating</span>
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">{teacher.reviews}</div>
                    <span className="text-[10px] text-gray-500">Reviews</span>
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">{teacher.students}</div>
                    <span className="text-[10px] text-gray-500">Students</span>
                  </div>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between my-3">
                  <div className="flex items-center text-amber-400 text-xs">{"★".repeat(5)}</div>
                  <div className="text-right">
                    <span className="text-base font-extrabold text-white">{teacher.price}</span>
                    <span className="text-[10px] text-gray-400">/hr</span>
                  </div>
                </div>
                <button className="w-full py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-medium text-xs transition-all shadow-md shadow-purple-600/20">
                  Book Session
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      <section id="centers" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <div>
            <h2 className="text-3xl sm:text-4xl font-black">
              Top Learning <span className="text-purple-400">Centers</span>
            </h2>
            <p className="text-gray-400 text-sm mt-1">World-class facilities for exceptional learning experiences</p>
          </div>
          <Link href={ROUTES.CENTERS} className="self-start sm:self-auto px-4 py-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-xs font-semibold flex items-center gap-1.5 transition-all">
            View All <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {[
            {
              name: "Apex Learning Hub",
              location: "New York",
              students: "2,400 students",
              tags: ["Math", "Science", "English"],
              rating: "4.9",
              img: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=500",
            },
            {
              name: "Bright Minds Academy",
              location: "London",
              students: "1,800 students",
              tags: ["Coding", "Art", "Music"],
              rating: "4.8",
              img: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=500",
            },
            {
              name: "Scholar Elite",
              location: "Dubai",
              students: "3,200 students",
              tags: ["SAT", "IELTS", "GRE"],
              rating: "4.9",
              img: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&q=80&w=500",
            },
          ].map((center, idx) => (
            <motion.div
              key={idx}
              variants={fadeInUp}
              whileHover={{ y: -6 }}
              className="bg-[#131625]/80 border border-white/10 rounded-2xl overflow-hidden hover:border-purple-500/40 transition-all flex flex-col justify-between"
            >
              <div className="relative h-48 overflow-hidden">
                <Image src={center.img} alt={center.name} width={600} height={400} className="w-full h-full object-cover" />
                <div className="absolute top-3 right-3 bg-emerald-500/20 border border-emerald-500/40 backdrop-blur-md px-2.5 py-1 rounded-full text-emerald-400 text-xs font-bold flex items-center gap-1">
                  <Star className="w-3 h-3 fill-emerald-400" /> {center.rating}
                </div>
              </div>

              <div className="p-5">
                <h3 className="text-lg font-bold text-white">{center.name}</h3>
                <p className="text-xs text-gray-400 mt-1">
                  📍 {center.location} • {center.students}
                </p>
                <div className="flex flex-wrap gap-2 mt-4">
                  {center.tags.map((tag, tIdx) => (
                    <span key={tIdx} className="px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-[10px] font-semibold">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.h2
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-3xl sm:text-5xl font-black tracking-tight mb-16"
        >
          Loved By <span className="text-purple-400">Thousands</span>
        </motion.h2>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left"
        >
          {[
            {
              quote: "My daughter's grades improved dramatically within just two months. The teachers are incredibly dedicated.",
              author: "Emma Thompson",
              role: "Parent",
              img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200",
            },
            {
              quote: "I went from struggling with calculus to acing my exams. The video lessons and interactive exercises are top-tier.",
              author: "Alex Kim",
              role: "Student",
              img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200",
            },
            {
              quote: "EduPrime has transformed how I run my classes. The analytics and automated homework tracking save me hours.",
              author: "Priya Patel",
              role: "Teacher",
              img: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=200",
            },
            {
              quote: "Managing 500+ students has never been easier. QR attendance, payment tracking, and reporting are exactly what we needed.",
              author: "David Chen",
              role: "Center Admin",
              img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200",
            },
          ].map((t, idx) => (
            <motion.div
              key={idx}
              variants={fadeInUp}
              className="bg-[#131625]/80 border border-white/10 rounded-2xl p-5 flex flex-col justify-between"
            >
              <div>
                <div className="flex text-amber-400 mb-3 text-sm">{"★".repeat(5)}</div>
                <p className="text-xs text-gray-300 leading-relaxed">“{t.quote}”</p>
              </div>
              <div className="flex items-center gap-3 mt-6 pt-4 border-t border-white/5">
                <Image src={t.img} alt={t.author} width={36} height={36} className="w-9 h-9 rounded-full object-cover" />
                <div>
                  <h4 className="text-xs font-bold text-white">{t.author}</h4>
                  <p className="text-[10px] text-gray-500">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl sm:text-5xl font-black">
          How It <span className="text-purple-400">Works</span>
        </h2>
        <p className="text-gray-400 mt-2 text-sm">Get started in minutes — no setup, no complexity</p>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-16"
        >
          {[
            { step: "STEP 01", title: "Create Account", desc: "Sign up free in under 30 seconds. No credit card required.", icon: Lock },
            { step: "STEP 02", title: "Find Your Teacher", desc: "Browse profiles, read reviews, and book a trial session.", icon: Search },
            { step: "STEP 03", title: "Start Learning", desc: "Attend live sessions, watch recordings, complete assignments.", icon: BookOpen },
            { step: "STEP 04", title: "Track Progress", desc: "Monitor growth with AI-powered analytics and certificates.", icon: Trophy },
          ].map((st, idx) => (
            <motion.div
              key={idx}
              variants={fadeInUp}
              className="bg-[#131625]/80 border border-white/10 rounded-2xl p-6 flex flex-col items-center text-center relative"
            >
              <div className="w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center mb-4">
                <st.icon className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-bold text-purple-400 tracking-widest">{st.step}</span>
              <h3 className="font-bold text-white text-base mt-1">{st.title}</h3>
              <p className="text-xs text-gray-400 mt-2 leading-relaxed">{st.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      <section id="pricing" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl sm:text-5xl font-black">
          Simple, Transparent <span className="text-purple-400">Pricing</span>
        </h2>
        <p className="text-gray-400 mt-2 text-sm">Start free, scale as you grow. Cancel anytime.</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 text-left items-stretch">
          <div className="bg-[#131625]/80 border border-white/10 rounded-3xl p-8 flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-bold text-white">Starter</h3>
              <p className="text-xs text-gray-400 mt-1">Perfect for individual students</p>
              <div className="my-6">
                <span className="text-4xl font-black text-white">$29</span>
                <span className="text-xs text-gray-400">/month</span>
              </div>
              <ul className="space-y-3 text-xs text-gray-300">
                {["5 courses/month", "HD video lessons", "Practice tests", "Email support", "Mobile app"].map((f, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-purple-400" /> {f}
                  </li>
                ))}
              </ul>
            </div>
            <button className="w-full mt-8 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold text-xs transition-all">
              Get Started
            </button>
          </div>

          <div className="bg-[#181c2e] border-2 border-purple-500 rounded-3xl p-8 flex flex-col justify-between relative shadow-2xl shadow-purple-600/20">
            <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-purple-600 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              Most Popular
            </span>
            <div>
              <h3 className="text-xl font-bold text-white">Pro</h3>
              <p className="text-xs text-gray-400 mt-1">Most popular for serious learners</p>
              <div className="my-6">
                <span className="text-4xl font-black text-white">$79</span>
                <span className="text-xs text-gray-400">/month</span>
              </div>
              <ul className="space-y-3 text-xs text-gray-300">
                {[
                  "Unlimited courses",
                  "4K video lessons",
                  "Live sessions (10/mo)",
                  "Priority support",
                  "AI tutor",
                  "Analytics dashboard",
                  "Certificates",
                ].map((f, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-purple-400" /> {f}
                  </li>
                ))}
              </ul>
            </div>
            <button className="w-full mt-8 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs shadow-lg shadow-purple-600/30 transition-all">
              Get Started
            </button>
          </div>

          <div className="bg-[#131625]/80 border border-white/10 rounded-3xl p-8 flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-bold text-white">Center</h3>
              <p className="text-xs text-gray-400 mt-1">For learning centers & schools</p>
              <div className="my-6">
                <span className="text-4xl font-black text-white">$299</span>
                <span className="text-xs text-gray-400">/month</span>
              </div>
              <ul className="space-y-3 text-xs text-gray-300">
                {[
                  "Up to 500 students",
                  "All Pro features",
                  "Custom branding",
                  "QR attendance",
                  "Admin dashboard",
                  "API access",
                  "Dedicated manager",
                ].map((f, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-purple-400" /> {f}
                  </li>
                ))}
              </ul>
            </div>
            <button className="w-full mt-8 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold text-xs transition-all">
              Get Started
            </button>
          </div>
        </div>
      </section>

      <section className="py-20 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl sm:text-4xl font-black mb-12">
          Frequently Asked <span className="text-purple-400">Questions</span>
        </h2>

        <div className="space-y-4 text-left">
          {[
            {
              q: "How do I find the right teacher?",
              a: "You can filter teachers by subject, price, ratings, and availability. Watch their intro videos or book a trial session.",
            },
            {
              q: "Can I cancel my subscription anytime?",
              a: "Yes, you can cancel or change your plan at any time directly from your account dashboard with zero penalties.",
            },
            {
              q: "Are the certificates recognized?",
              a: "Yes! EduPrime certificates are verified on the blockchain and recognized by top educational partner institutions.",
            },
            {
              q: "How does the online exam system work?",
              a: "Exams are proctored automatically using secure AI monitoring, providing instant feedback and grading breakdown.",
            },
            {
              q: "What payment methods do you accept?",
              a: "We accept all major credit/debit cards, PayPal, Apple Pay, and Google Pay securely through Stripe.",
            },
          ].map((faq, idx) => (
            <div key={idx} className="bg-[#131625]/80 border border-white/10 rounded-2xl overflow-hidden transition-all">
              <button
                onClick={() => toggleFaq(idx)}
                className="w-full p-5 flex items-center justify-between text-left text-sm font-bold text-white hover:text-purple-400 transition-colors"
              >
                <span>{faq.q}</span>
                <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${openFaq === idx ? "rotate-180" : ""}`} />
              </button>
              <AnimatePresence>
                {openFaq === idx && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="px-5 pb-5 text-xs text-gray-400 leading-relaxed border-t border-white/5 pt-3"
                  >
                    {faq.a}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
