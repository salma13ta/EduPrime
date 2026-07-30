"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronRight, Star } from "lucide-react";
import { ROUTES } from "@/lib/routes";

const centers = [
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
];

export default function TopCentersSection() {
    return (
        <section id="centers" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
            <div className="mb-12 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                    <h2 className="text-gray-600 text-3xl font-black sm:text-4xl">
                        Top Learning <span className="text-purple-400">Centers</span>
                    </h2>
                    <p className="mt-1 text-sm text-gray-400">World-class facilities for exceptional learning experiences</p>
                </div>
                <Link href={ROUTES.CENTERS} className="flex items-center gap-1.5 self-start rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold transition-all hover:bg-white/10 sm:self-auto">
                    View All <ChevronRight className="h-4 w-4" />
                </Link>
            </div>

            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.12 } } }}
                className="grid grid-cols-1 gap-6 md:grid-cols-3"
            >
                {centers.map((center) => (
                    <motion.div
                        key={center.name}
                        variants={{ hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0 } }}
                        whileHover={{ y: -6 }}
                        className="flex flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-[#131625]/80 transition-all hover:border-purple-500/40"
                    >
                        <div className="relative h-48 overflow-hidden">
                            <Image src={center.img} alt={center.name} width={600} height={400} className="h-full w-full object-cover" />
                            <div className="absolute right-3 top-3 flex items-center gap-1 rounded-full border border-emerald-500/40 bg-emerald-500/20 px-2.5 py-1 text-xs font-bold text-emerald-400 backdrop-blur-md">
                                <Star className="h-3 w-3 fill-emerald-400" /> {center.rating}
                            </div>
                        </div>

                        <div className="p-5">
                            <h3 className="text-lg font-bold text-white">{center.name}</h3>
                            <p className="mt-1 text-xs text-gray-400">
                                📍 {center.location} • {center.students}
                            </p>
                            <div className="mt-4 flex flex-wrap gap-2">
                                {center.tags.map((tag) => (
                                    <span key={tag} className="rounded-full border border-cyan-500/20 bg-cyan-500/10 px-3 py-1 text-[10px] font-semibold text-cyan-300">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                ))}
            </motion.div>
        </section>
    );
}
