"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, GraduationCap, ChevronRight } from "lucide-react";
import { ROUTES } from "@/lib/routes";

// تعريف مسارات شريط الـ Dock السفلي
const DOCK_ITEMS = [
  { label: "Landing", href: "/" },
  { label: "Auth", href: ROUTES.LOGIN },
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
  const [loadingTarget, setLoadingTarget] = useState<string | null>(null);
  const pathname = usePathname();

  const handleTransitionStart = (target: string) => {
    setLoadingTarget(target);
  };

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
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            <Link
              href={ROUTES.FeaturesSection}
              className="relative text-gray-300 transition-all duration-300 hover:text-white after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-0 after:rounded-full after:bg-gradient-to-r after:from-purple-400 after:to-indigo-400 after:transition-all after:duration-300 hover:after:w-full"
            >
              Features
            </Link>
            <Link
              href={ROUTES.TeachersSection}
              className="relative text-gray-300 transition-all duration-300 hover:text-white after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:rounded-full after:bg-gradient-to-r after:from-purple-400 after:to-indigo-400 after:transition-all after:duration-300 hover:after:w-full"
            >
              Teachers
            </Link>
            <Link
              href={ROUTES.CentersSection}
              className="relative text-gray-300 transition-all duration-300 hover:text-white after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:rounded-full after:bg-gradient-to-r after:from-purple-400 after:to-indigo-400 after:transition-all after:duration-300 hover:after:w-full"
            >
              Centers
            </Link>
            <Link
              href={ROUTES.PricingSection}
              className="relative text-gray-300 transition-all duration-300 hover:text-white after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:rounded-full after:bg-gradient-to-r after:from-purple-400 after:to-indigo-400 after:transition-all after:duration-300 hover:after:w-full"
            >
              Pricing
            </Link>
            <Link
              href={ROUTES.FAQSection}
              className="relative text-gray-300 transition-all duration-300 hover:text-white after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:rounded-full after:bg-gradient-to-r after:from-purple-400 after:to-indigo-400 after:transition-all after:duration-300 hover:after:w-full"
            >
              FAQ
            </Link>
          </nav>

          {/* أزرار الحساب والدخول */}
          <div className="hidden md:flex items-center gap-4">
            <motion.div
              animate={loadingTarget === 'Sign In' ? { scale: 0.97, opacity: 0.9 } : { scale: 1, opacity: 1 }}
              whileHover={{ y: -2, scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
            >
              <Link
                href={ROUTES.LOGIN}
                onClick={() => handleTransitionStart('Sign In')}
                className="relative inline-flex items-center justify-center px-5 py-2.5 text-sm font-medium text-gray-300 rounded-xl transition-all duration-300 hover:text-white hover:bg-white/10"
              >
                <span className="relative z-10 inline-flex items-center gap-2">
                  {loadingTarget === 'Sign In' && <span className="h-2 w-2 animate-pulse rounded-full bg-purple-400" />}
                  {loadingTarget === 'Sign In' ? 'Loading...' : 'Sign In'}
                </span>
              </Link>
            </motion.div>

            <motion.div
              animate={loadingTarget === 'Get Started' ? { scale: 0.97, opacity: 0.9, rotate: -1 } : { scale: 1, opacity: 1, rotate: 0 }}
              whileHover={{ y: -2, scale: 1.03, rotate: -1 }}
              whileTap={{ scale: 0.96 }}
            >
              <Link
                href={ROUTES.REGISTER}
                onClick={() => handleTransitionStart('Get Started')}
                className="relative inline-flex items-center justify-center overflow-hidden rounded-xl bg-gradient-to-r from-purple-600 via-fuchsia-600 to-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-purple-600/30 transition-all duration-300 before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r before:from-white/10 before:via-white/20 before:to-white/10 before:transition before:duration-700 hover:shadow-purple-500/50 hover:before:translate-x-full"
              >
                <span className="relative z-10 inline-flex items-center gap-2">
                  {loadingTarget === 'Get Started' && <span className="h-2 w-2 animate-pulse rounded-full bg-white" />}
                  {loadingTarget === 'Get Started' ? 'Loading...' : 'Get Started'}
                </span>
              </Link>
            </motion.div>
          </div>

          {/* زر الهواتف */}
          <div className="flex md:hidden items-center gap-3">
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
              className="md:hidden border-b border-white/10 bg-[#0b0d17]/95 backdrop-blur-2xl px-4 pt-2 pb-6 space-y-4 overflow-hidden"
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
                  onClick={() => {
                    handleTransitionStart('Sign In');
                    setMobileMenuOpen(false);
                  }}
                  className="w-full py-2.5 text-sm font-medium text-center text-gray-300 rounded-xl bg-white/5"
                >
                  Sign In
                </Link>
                <Link
                  href={ROUTES.REGISTER}
                  onClick={() => {
                    handleTransitionStart('Get Started');
                    setMobileMenuOpen(false);
                  }}
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
        </nav>
      </div>
    </>
  );
}