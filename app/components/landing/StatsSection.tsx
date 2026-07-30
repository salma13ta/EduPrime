"use client";

import { motion } from "framer-motion";
import { Award, BookOpen, Globe2, Users } from "lucide-react";

const stats = [
    { value: "50,000+", label: "Active Students", icon: Users, color: "text-purple-400" },
    { value: "2,400+", label: "Expert Teachers", icon: Award, color: "text-blue-400" },
    { value: "380+", label: "Learning Centers", icon: BookOpen, color: "text-indigo-400" },
    { value: "65+", label: "Countries", icon: Globe2, color: "text-cyan-400" },
];

export default function StatsSection() {
    return (
        <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={{
                    hidden: { opacity: 0 },
                    visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
                }}
                className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
            >
                {stats.map((stat) => (
                    <motion.div
                        key={stat.label}
                        variants={{ hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0 } }}
                        whileHover={{ y: -6 }}
                        className="rounded-2xl border border-white/10 bg-[#131625]/70 p-6 text-center shadow-xl transition-all hover:border-purple-500/40"
                    >
                        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/5">
                            <stat.icon className={`h-6 w-6 ${stat.color}`} />
                        </div>
                        <h3 className="text-3xl font-black tracking-tight text-white">{stat.value}</h3>
                        <p className="mt-1 text-sm text-gray-400">{stat.label}</p>
                    </motion.div>
                ))}
            </motion.div>
        </section>
    );
}
