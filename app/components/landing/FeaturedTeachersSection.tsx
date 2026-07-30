"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronRight, Star } from "lucide-react";
import { ROUTES } from "@/lib/routes";

const teachers = [
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
];

export default function FeaturedTeachersSection() {
    return (
        <section id="teachers" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
            <div className="mb-12 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                    <h2 className="text-gray-600 text-3xl font-black sm:text-4xl">
                        Featured <span className="text-purple-400">Teachers</span>
                    </h2>
                    <p className="mt-1 text-sm text-gray-400">Handpicked experts with proven track records</p>
                </div>
                <Link href={ROUTES.TEACHERS} className="flex items-center gap-1.5 self-start rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold transition-all hover:bg-white/10 sm:self-auto">
                    View All <ChevronRight className="h-4 w-4" />
                </Link>
            </div>

            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.12 } } }}
                className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
            >
                {teachers.map((teacher) => (
                    <motion.div
                        key={teacher.name}
                        variants={{ hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0 } }}
                        whileHover={{ y: -6 }}
                        className="flex flex-col justify-between rounded-2xl border border-white/10 bg-[#131625]/80 p-5 transition-all hover:border-purple-500/40"
                    >
                        <div>
                            <div className="mb-4 flex items-start justify-between">
                                <div className="flex items-center gap-3">
                                    <Image src={teacher.img} alt={teacher.name} width={48} height={48} className="h-12 w-12 rounded-full border border-purple-500/30 object-cover" />
                                    <div>
                                        <h3 className="text-sm font-bold text-white">{teacher.name}</h3>
                                        <p className="text-xs text-gray-400">{teacher.subject}</p>
                                    </div>
                                </div>
                                <span className={`rounded-full border px-2 py-0.5 text-[10px] font-bold ${teacher.badgeColor}`}>
                                    {teacher.badge}
                                </span>
                            </div>

                            <div className="my-3 grid grid-cols-3 gap-2 border-y border-white/5 py-3 text-center">
                                <div>
                                    <div className="flex items-center justify-center gap-1 text-xs font-bold text-white">
                                        <Star className="h-3 w-3 fill-amber-400 text-amber-400" /> {teacher.rating}
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
                            <div className="my-3 flex items-center justify-between">
                                <div className="flex items-center text-xs text-amber-400">{"★".repeat(5)}</div>
                                <div className="text-right">
                                    <span className="text-base font-extrabold text-white">{teacher.price}</span>
                                    <span className="text-[10px] text-gray-400">/hr</span>
                                </div>
                            </div>
                            <button className="w-full rounded-xl bg-purple-600 px-2.5 py-2.5 text-xs font-medium text-white shadow-md shadow-purple-600/20 transition-all hover:bg-purple-500">
                                Book Session
                            </button>
                        </div>
                    </motion.div>
                ))}
            </motion.div>
        </section>
    );
}
