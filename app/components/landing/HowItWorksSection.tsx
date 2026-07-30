"use client";

import { motion } from "framer-motion";
import { BookOpen, Lock, Search, Trophy } from "lucide-react";

const steps = [
    { step: "STEP 01", title: "Create Account", desc: "Sign up free in under 30 seconds. No credit card required.", icon: Lock },
    { step: "STEP 02", title: "Find Your Teacher", desc: "Browse profiles, read reviews, and book a trial session.", icon: Search },
    { step: "STEP 03", title: "Start Learning", desc: "Attend live sessions, watch recordings, complete assignments.", icon: BookOpen },
    { step: "STEP 04", title: "Track Progress", desc: "Monitor growth with AI-powered analytics and certificates.", icon: Trophy },
];

export default function HowItWorksSection() {
    return (
        <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
            <h2 className="text-gray-600 text-center text-3xl font-black sm:text-5xl">
                How It <span className="text-purple-400">Works</span>
            </h2>
            <p className="mt-2 text-center text-sm text-gray-400">Get started in minutes — no setup, no complexity</p>

            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.12 } } }}
                className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
            >
                {steps.map((step) => (
                    <motion.div
                        key={step.step}
                        variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}
                        className="relative flex flex-col items-center rounded-2xl border border-white/10 bg-[#131625]/80 p-6 text-center"
                    >
                        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl border border-purple-500/20 bg-purple-500/10 text-purple-400">
                            <step.icon className="h-6 w-6" />
                        </div>
                        <span className="text-[10px] font-bold tracking-widest text-purple-400">{step.step}</span>
                        <h3 className="mt-1 text-base font-bold text-white">{step.title}</h3>
                        <p className="mt-2 text-xs leading-relaxed text-gray-400">{step.desc}</p>
                    </motion.div>
                ))}
            </motion.div>
        </section>
    );
}
