"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const testimonials = [
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
];

export default function TestimonialsSection() {
    return (
        <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
            <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-gray-600 mb-16 text-center text-3xl font-black tracking-tight sm:text-5xl"
            >
                Loved By <span className="text-purple-400">Thousands</span>
            </motion.h2>

            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.12 } } }}
                className="grid grid-cols-1 gap-6 text-left sm:grid-cols-2 lg:grid-cols-4"
            >
                {testimonials.map((item) => (
                    <motion.div
                        key={item.author}
                        variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}
                        className="flex flex-col justify-between rounded-2xl border border-white/10 bg-[#131625]/80 p-5"
                    >
                        <div>
                            <div className="mb-3 flex text-sm text-amber-400">{"★".repeat(5)}</div>
                            <p className="text-xs leading-relaxed text-gray-300">“{item.quote}”</p>
                        </div>
                        <div className="mt-6 flex items-center gap-3 border-t border-white/5 pt-4">
                            <Image src={item.img} alt={item.author} width={36} height={36} className="h-9 w-9 rounded-full object-cover" />
                            <div>
                                <h4 className="text-xs font-bold text-white">{item.author}</h4>
                                <p className="text-[10px] text-gray-500">{item.role}</p>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </motion.div>
        </section>
    );
}
