"use client";

import { motion } from "framer-motion";
import { Calculator, Code2, Dumbbell, FlaskConical, HeartPulse, Languages, Music, Palette } from "lucide-react";

const subjects = [
    { title: "Mathematics", courses: "1,240 courses", icon: Calculator, color: "text-purple-400 bg-purple-500/10" },
    { title: "Sciences", courses: "980 courses", icon: FlaskConical, color: "text-blue-400 bg-blue-500/10" },
    { title: "Languages", courses: "1,560 courses", icon: Languages, color: "text-cyan-400 bg-cyan-500/10" },
    { title: "Technology", courses: "720 courses", icon: Code2, color: "text-emerald-400 bg-emerald-500/10" },
    { title: "Music", courses: "440 courses", icon: Music, color: "text-amber-400 bg-amber-500/10" },
    { title: "Arts", courses: "360 courses", icon: Palette, color: "text-rose-400 bg-rose-500/10" },
    { title: "Health", courses: "280 courses", icon: HeartPulse, color: "text-pink-400 bg-pink-500/10" },
    { title: "Sports", courses: "190 courses", icon: Dumbbell, color: "text-teal-400 bg-teal-500/10" },
];

export default function SubjectsSection() {
    return (
        <section id="courses" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
            <div className="mb-16 text-center">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-gray-600 text-3xl font-black tracking-tight sm:text-5xl"
                >
                    Explore <span className="text-purple-400">Every Subject</span>
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-3 text-sm text-gray-400 sm:text-base"
                >
                    From core academics to creative arts — find expert guidance in every field.
                </motion.p>
            </div>

            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={{
                    hidden: { opacity: 0 },
                    visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
                }}
                className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6 lg:grid-cols-4"
            >
                {subjects.map((subject) => (
                    <motion.div
                        key={subject.title}
                        variants={{ hidden: { opacity: 0, scale: 0.9 }, visible: { opacity: 1, scale: 1 } }}
                        whileHover={{ scale: 1.03 }}
                        className="flex flex-col items-center rounded-2xl border border-white/10 bg-[#131625]/80 p-5 text-center transition-all hover:border-purple-500/50"
                    >
                        <div className={`mb-3 flex h-12 w-12 items-center justify-center rounded-2xl ${subject.color} transition-transform group-hover:scale-110`}>
                            <subject.icon className="h-6 w-6" />
                        </div>
                        <h4 className="text-base font-bold text-white">{subject.title}</h4>
                        <p className="mt-1 text-xs text-gray-400">{subject.courses}</p>
                    </motion.div>
                ))}
            </motion.div>
        </section>
    );
}
