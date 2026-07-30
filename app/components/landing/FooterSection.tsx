"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, GraduationCap } from "lucide-react";

export default function FooterSection() {
    return (
        <footer className="relative bg-[#0b0d17] text-gray-400 pt-20 pb-12 overflow-hidden border-t border-white/5">
            {/* 1. CTA Banner Section (Start Your Learning Journey Today) */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="relative rounded-3xl p-8 sm:p-12 md:p-16 text-center overflow-hidden border border-white/10 bg-gradient-to-b from-purple-900/40 via-[#131625] to-[#131625] shadow-2xl"
                >
                    {/* Background Glow Effect */}
                    <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-purple-600/20 rounded-full blur-[120px] pointer-events-none" />

                    <h2 className="text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight mb-6 relative z-10 leading-tight">
                        Start Your Learning Journey <br />
                        Today
                    </h2>

                    <p className="text-sm sm:text-lg text-gray-300 max-w-xl mx-auto mb-8 relative z-10">
                        Join 50,000+ students already transforming their futures.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10">
                        <Link
                            href="/register"
                            className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-sm shadow-lg shadow-purple-600/30 flex items-center justify-center gap-2 transition-all active:scale-95"
                        >
                            Get Started Free <ArrowRight className="w-4 h-4" />
                        </Link>
                        <Link
                            href="#contact"
                            className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold text-sm transition-all"
                        >
                            Talk to Sales
                        </Link>
                    </div>
                </motion.div>
            </div>

            {/* 2. Main Footer Links Grid */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 md:grid-cols-5 gap-8 lg:gap-12 pb-16 border-b border-white/5">
                    {/* EduPrime Brand Info (Spans 2 columns on small screens) */}
                    <div className="col-span-2">
                        <Link href="/" className="flex items-center gap-2.5 mb-4 group w-fit">
                            <div className="p-2 rounded-xl bg-purple-600 text-white group-hover:scale-105 transition-transform">
                                <GraduationCap className="w-6 h-6" />
                            </div>
                            <span className="text-xl font-bold text-white tracking-tight">EduPrime</span>
                        </Link>
                        <p className="text-xs sm:text-sm text-gray-400 max-w-sm leading-relaxed">
                            The world&apos;s most advanced educational platform connecting students with expert teachers and top learning centers.
                        </p>
                    </div>

                    {/* Platform Links */}
                    <div>
                        <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-4">Platform</h3>
                        <ul className="space-y-2.5 text-xs sm:text-sm">
                            <li><Link href="/teachers" className="hover:text-white transition-colors">Find Teachers</Link></li>
                            <li><Link href="/centers" className="hover:text-white transition-colors">Learning Centers</Link></li>
                            <li><Link href="/courses" className="hover:text-white transition-colors">Online Courses</Link></li>
                            <li><Link href="/courses" className="hover:text-white transition-colors">Live Sessions</Link></li>
                            <li><Link href="/courses" className="hover:text-white transition-colors">Practice Tests</Link></li>
                        </ul>
                    </div>

                    {/* Company Links */}
                    <div>
                        <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-4">Company</h3>
                        <ul className="space-y-2.5 text-xs sm:text-sm">
                            <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
                            <li><Link href="/careers" className="hover:text-white transition-colors">Careers</Link></li>
                            <li><Link href="/blog" className="hover:text-white transition-colors">Blog</Link></li>
                            <li><Link href="/press" className="hover:text-white transition-colors">Press</Link></li>
                            <li><Link href="/partners" className="hover:text-white transition-colors">Partners</Link></li>
                        </ul>
                    </div>

                    {/* Support & Legal (Combined under 2 columns on mobile) */}
                    <div>
                        <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-4">Support</h3>
                        <ul className="space-y-2.5 text-xs sm:text-sm mb-6">
                            <li><Link href="/help" className="hover:text-white transition-colors">Help Center</Link></li>
                            <li><Link href="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
                            <li><Link href="/status" className="hover:text-white transition-colors">Status</Link></li>
                            <li><Link href="/community" className="hover:text-white transition-colors">Community</Link></li>
                            <li><Link href="/safety" className="hover:text-white transition-colors">Safety</Link></li>
                        </ul>
                    </div>
                </div>

                {/* 3. Bottom Copyright & Social Networks */}
                <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
                    <p>© 2026 EduPrime. All rights reserved.</p>

                    <div className="flex items-center gap-6">
                        <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">Twitter</a>
                        <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">LinkedIn</a>
                        <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">Instagram</a>
                        <a href="https://youtube.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">YouTube</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}