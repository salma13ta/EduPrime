"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sun, GraduationCap, ChevronRight } from "lucide-react";
import { ROUTES } from "@/lib/routes";

// تعريف مسارات شريط الـ Dock السفلي بناءً على شجرة المجلدات في مشروعك
const DOCK_ITEMS = [
    { label: "Landing", href: "/" },
    { label: "Auth", href: "/auth/login" },
    { label: "Student", href: "/student" },
    { label: "Teacher", href: "/teacher" },
    { label: "Admin", href: "/admin" },
    { label: "Parent", href: "/parent" },
    { label: "Profile", href: "/profile" },
    { label: "Booking", href: "/booking" },
    { label: "Exam", href: "/exam" },
    { label: "Video", href: "/video" },
];

export default function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const pathname = usePathname();

    return (
        <>
            {/* ================= 1. Top Navbar (الناف بار العلوي) ================= */}
            <header className="fixed top-0 z-50 w-full bg-[#0b0d17]/80 backdrop-blur-xl border-b border-white/5 transition-all" dir="ltr">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between flex-row">
                    
                    {/* اللوجو */}
                    <Link href={ROUTES.HOME} className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-500 flex items-center justify-center shadow-lg shadow-purple-500/30">
                            <GraduationCap className="w-6 h-6 text-white" />
                        </div>
                        <span className="text-xl font-bold tracking-tight text-white">
                            Edu<span className="text-purple-400">Prime</span>
                        </span>
                    </Link>

                    {/* روابط التنقل الرئيسية */}
                    <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-300">
                        <Link href={ROUTES.TEACHERS} className="hover:text-white transition-colors">
                            Teachers
                        </Link>
                        <Link href={ROUTES.CENTERS} className="hover:text-white transition-colors">
                            Centers
                        </Link>
                        <Link href={ROUTES.COURSES} className="hover:text-white transition-colors">
                            Courses
                        </Link>
                        <Link href={ROUTES.PRICING} className="hover:text-white transition-colors">
                            Pricing
                        </Link>
                    </nav>

                    {/* أزرار الحساب والدخول */}
                    <div className="hidden md:flex items-center gap-4">
                        <button className="p-2.5 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 text-gray-300 hover:text-white transition-all">
                            <Sun className="w-4 h-4" />
                        </button>
                        <Link
                            href={ROUTES.LOGIN}
                            className="px-5 py-2.5 text-sm font-medium text-gray-300 hover:text-white transition-colors"
                        >
                            Sign In
                        </Link>
                        <Link
                            href={ROUTES.REGISTER}
                            className="px-5 py-2.5 text-sm font-medium text-white bg-purple-600 hover:bg-purple-500 rounded-xl shadow-lg shadow-purple-600/30 hover:shadow-purple-500/50 transition-all active:scale-95"
                        >
                            Get Started
                        </Link>
                    </div>

                    {/* زر الهواتف */}
                    <div className="flex md:hidden items-center gap-3">
                        <button className="p-2 rounded-lg bg-white/5 border border-white/10 text-gray-300">
                            <Sun className="w-4 h-4" />
                        </button>
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="p-2.5 text-gray-300 hover:text-white rounded-xl bg-white/5 border border-white/10"
                        >
                            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>

                {/* قائمة الموبايل المنسدلة من الأعلى */}
                <AnimatePresence>
                    {mobileMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="md:hidden border-b border-white/10 bg-[#0b0d17]/95 backdrop-blur-2xl px-4 pt-2 pb-6 space-y-4"
                        >
                            <div className="flex flex-col gap-3 font-medium text-gray-300">
                                <Link
                                    href={ROUTES.TEACHERS}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="py-2 hover:text-purple-400 transition-colors flex items-center justify-between"
                                >
                                    <span>Teachers</span>
                                    <ChevronRight className="w-4 h-4" />
                                </Link>
                                <Link
                                    href={ROUTES.CENTERS}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="py-2 hover:text-purple-400 transition-colors flex items-center justify-between"
                                >
                                    <span>Centers</span>
                                    <ChevronRight className="w-4 h-4" />
                                </Link>
                                <Link
                                    href={ROUTES.COURSES}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="py-2 hover:text-purple-400 transition-colors flex items-center justify-between"
                                >
                                    <span>Courses</span>
                                    <ChevronRight className="w-4 h-4" />
                                </Link>
                                <Link
                                    href={ROUTES.PRICING}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="py-2 hover:text-purple-400 transition-colors flex items-center justify-between"
                                >
                                    <span>Pricing</span>
                                    <ChevronRight className="w-4 h-4" />
                                </Link>
                            </div>
                            <div className="pt-4 border-t border-white/10 flex flex-col gap-3">
                                <Link 
                                    href={ROUTES.LOGIN} 
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="w-full py-2.5 text-sm font-medium text-center text-gray-300 rounded-xl bg-white/5"
                                >
                                    Sign In
                                </Link>
                                <Link 
                                    href={ROUTES.REGISTER} 
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="w-full py-2.5 text-sm font-medium text-center text-white bg-purple-600 rounded-xl shadow-lg shadow-purple-600/30"
                                >
                                    Get Started
                                </Link>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </header>

            {/* ================= 2. Floating Bottom Navigation Dock (الشريط السفلي) ================= */}
            <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 max-w-[92vw] sm:max-w-max" dir="ltr">
                <nav className="flex items-center gap-1.5 p-2 rounded-full bg-[#121524]/80 backdrop-blur-xl border border-white/10 shadow-2xl overflow-x-auto scrollbar-none">
                    {DOCK_ITEMS.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.label}
                                href={item.href}
                                className={`relative px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-300 ${
                                    isActive
                                        ? "text-white bg-gradient-to-r from-purple-600 to-indigo-600 shadow-md shadow-purple-500/25"
                                        : "text-gray-400 hover:text-white hover:bg-white/5"
                                }`}
                            >
                                {item.label}
                            </Link>
                        );
                    })}

                    <div className="h-4 w-[1px] bg-white/10 mx-1 shrink-0" />

                    <button className="p-1.5 rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition-colors shrink-0">
                        <Sun className="w-3.5 h-3.5" />
                    </button>
                </nav>
            </div>
        </>
    );
}