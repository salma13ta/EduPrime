"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, GraduationCap, ChevronRight, LogOut } from "lucide-react";
import { ROUTES } from "@/lib/routes";

type UserRole = "student" | "teacher" | "parent" | "admin" | "guest";

type AuthUser = {
  name?: string;
  email?: string;
  role?: string;
};

const PUBLIC_NAV_LINKS = [
  { label: "Features", href: ROUTES.FeaturesSection },
  { label: "Teachers", href: ROUTES.TeachersSection },
  { label: "Centers", href: ROUTES.CentersSection },
  { label: "Pricing", href: ROUTES.PricingSection },
  { label: "FAQ", href: ROUTES.FAQSection },
];

const PUBLIC_DOCK_ITEMS = [
  { label: "Landing", href: ROUTES.HOME },
  { label: "Auth", href: ROUTES.LOGIN },
  { label: "Student", href: ROUTES.STUDENT.DASHBOARD },
  { label: "Profile", href: ROUTES.PROFILE },
];

const getDashboardNavLinks = (role: UserRole) => {
  if (role === "student") {
    return [
      { label: "Dashboard", href: ROUTES.STUDENT.DASHBOARD },
      { label: "Courses", href: ROUTES.COURSES },
      { label: "Exams", href: "/student" },
      { label: "Profile", href: ROUTES.PROFILE },
    ];
  }

  return [
    { label: "Dashboard", href: ROUTES.STUDENT.DASHBOARD },
    { label: "Courses", href: ROUTES.COURSES },
    { label: "Profile", href: ROUTES.PROFILE },
  ];
};

const getDashboardDockItems = (role: UserRole) => {
  if (role === "student") {
    return [
      { label: "Dashboard", href: ROUTES.STUDENT.DASHBOARD },
      { label: "Courses", href: ROUTES.COURSES },
      { label: "Exams", href: "/student" },
      { label: "Profile", href: ROUTES.PROFILE },
    ];
  }

  return [
    { label: "Dashboard", href: ROUTES.STUDENT.DASHBOARD },
    { label: "Courses", href: ROUTES.COURSES },
    { label: "Profile", href: ROUTES.PROFILE },
  ];
};

const getDashboardHomePath = (role: UserRole) => {
  if (role === "student") {
    return ROUTES.STUDENT.DASHBOARD;
  }

  return ROUTES.STUDENT.DASHBOARD;
};

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [loadingTarget, setLoadingTarget] = useState<string | null>(null);
  const [user, setUser] = useState<AuthUser | null>(null);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const syncAuthState = () => {
      if (typeof window === "undefined") return;

      try {
        const stored = localStorage.getItem("eduprime_user");
        if (!stored) {
          setUser(null);
          return;
        }

        const parsed = JSON.parse(stored) as AuthUser;
        setUser(parsed.email ? parsed : null);
      } catch {
        setUser(null);
      }
    };

    syncAuthState();
    window.addEventListener("storage", syncAuthState);
    window.addEventListener("focus", syncAuthState);

    return () => {
      window.removeEventListener("storage", syncAuthState);
      window.removeEventListener("focus", syncAuthState);
    };
  }, [pathname]);

  const handleTransitionStart = (target: string) => {
    setLoadingTarget(target);
  };

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("eduprime_user");
      setUser(null);
    }

    router.push(ROUTES.HOME);
  };

  const isAuthenticated = Boolean(user?.email);
  const role = (user?.role?.toLowerCase() as UserRole | undefined) ?? "guest";
  const displayName = user?.name?.split(" ")[0] || "User";
  const navLinks = isAuthenticated ? getDashboardNavLinks(role) : PUBLIC_NAV_LINKS;
  const dockItems = isAuthenticated ? getDashboardDockItems(role) : PUBLIC_DOCK_ITEMS;
  const homeHref = isAuthenticated ? getDashboardHomePath(role) : ROUTES.HOME;

  return (
    <>
      <header className="fixed top-0 z-50 w-full bg-[#0b0d17]/80 backdrop-blur-xl border-b border-white/5 transition-all overflow-x-hidden" dir="ltr">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between flex-row gap-3">
          <Link href={homeHref} className="flex min-w-0 items-center gap-2.5 sm:gap-3 cursor-pointer hover:opacity-80 transition-opacity">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-linear-to-tr from-purple-600 to-indigo-500 flex items-center justify-center shadow-lg shadow-purple-500/30 shrink-0">
              <GraduationCap className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
            </div>
            <span className="text-base sm:text-xl font-bold tracking-tight text-white truncate">
              Edu<span className="text-purple-400">Prime</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="relative text-gray-300 transition-all duration-300 hover:text-white after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-0 after:rounded-full after:bg-linear-to-r after:from-purple-400 after:to-indigo-400 after:transition-all after:duration-300 hover:after:w-full"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-2 lg:gap-4">
            {isAuthenticated ? (
              <>
                <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-2.5 py-1.5 lg:px-3 lg:py-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-600/20 text-sm font-semibold text-purple-200">
                    {displayName.charAt(0).toUpperCase()}
                  </div>
                  <div className="text-left">
                    <p className="text-xs font-semibold text-white">{displayName}</p>
                    <p className="text-[10px] capitalize text-gray-400">{role}</p>
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="rounded-xl border border-white/10 bg-white/5 p-2.5 text-gray-300 transition-all hover:text-white"
                >
                  <LogOut className="h-4 w-4" />
                </button>
              </>
            ) : (
              <>
                <motion.div
                  animate={loadingTarget === "Sign In" ? { scale: 0.97, opacity: 0.9 } : { scale: 1, opacity: 1 }}
                  whileHover={{ y: -2, scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <Link
                    href={ROUTES.LOGIN}
                    onClick={() => handleTransitionStart("Sign In")}
                    className="relative inline-flex items-center justify-center px-5 py-2.5 text-sm font-medium text-gray-300 rounded-xl transition-all duration-300 hover:text-white hover:bg-white/10"
                  >
                    <span className="relative z-10 inline-flex items-center gap-2">
                      {loadingTarget === "Sign In" && <span className="h-2 w-2 animate-pulse rounded-full bg-purple-400" />}
                      {loadingTarget === "Sign In" ? "Loading..." : "Sign In"}
                    </span>
                  </Link>
                </motion.div>

                <motion.div
                  animate={loadingTarget === "Get Started" ? { scale: 0.97, opacity: 0.9, rotate: -1 } : { scale: 1, opacity: 1, rotate: 0 }}
                  whileHover={{ y: -2, scale: 1.03, rotate: -1 }}
                  whileTap={{ scale: 0.96 }}
                >
                  <Link
                    href={ROUTES.REGISTER}
                    onClick={() => handleTransitionStart("Get Started")}
                    className="relative inline-flex items-center justify-center overflow-hidden rounded-xl bg-linear-to-r from-purple-600 via-fuchsia-600 to-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-purple-600/30 transition-all duration-300 before:absolute before:inset-0 before:-translate-x-full before:bg-linear-to-r before:from-white/10 before:via-white/20 before:to-white/10 before:transition before:duration-700 hover:shadow-purple-500/50 hover:before:translate-x-full"
                  >
                    <span className="relative z-10 inline-flex items-center gap-2">
                      {loadingTarget === "Get Started" && <span className="h-2 w-2 animate-pulse rounded-full bg-white" />}
                      {loadingTarget === "Get Started" ? "Loading..." : "Get Started"}
                    </span>
                  </Link>
                </motion.div>
              </>
            )}
          </div>

          <div className="flex md:hidden items-center gap-2 shrink-0">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-gray-300 hover:text-white rounded-xl bg-white/5 border border-white/10"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-b border-white/10 bg-[#0b0d17]/95 backdrop-blur-2xl px-4 pt-2 pb-6 space-y-4 overflow-hidden"
            >
              <div className="flex flex-col gap-3 font-medium text-gray-300">
                {navLinks.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="py-2 hover:text-purple-400 transition-colors flex items-center justify-between"
                  >
                    <span>{link.label}</span>
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                ))}
              </div>

              <div className="pt-4 border-t border-white/10 flex flex-col gap-3">
                {isAuthenticated ? (
                  <button
                    onClick={() => {
                      handleLogout();
                      setMobileMenuOpen(false);
                    }}
                    className="w-full py-2.5 text-sm font-medium text-center text-gray-300 rounded-xl bg-white/5"
                  >
                    Logout
                  </button>
                ) : (
                  <>
                    <Link
                      href={ROUTES.LOGIN}
                      onClick={() => {
                        handleTransitionStart("Sign In");
                        setMobileMenuOpen(false);
                      }}
                      className="w-full py-2.5 text-sm font-medium text-center text-gray-300 rounded-xl bg-white/5"
                    >
                      Sign In
                    </Link>
                    <Link
                      href={ROUTES.REGISTER}
                      onClick={() => {
                        handleTransitionStart("Get Started");
                        setMobileMenuOpen(false);
                      }}
                      className="w-full py-2.5 text-sm font-medium text-center text-white bg-purple-600 rounded-xl shadow-lg shadow-purple-600/30"
                    >
                      Get Started
                    </Link>
                  </>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
      {/*///////////////// //navbar dack/////////////////////////////// */}
      {/* <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 max-w-[92vw] sm:max-w-max" dir="ltr">
        <nav className="flex items-center gap-1.5 p-2 rounded-full bg-[#121524]/80 backdrop-blur-xl border border-white/10 shadow-2xl overflow-x-auto scrollbar-none">
          {dockItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.label}
                href={item.href}
                className={`relative px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-300 ${isActive
                  ? "text-white bg-linear-to-r from-purple-600 to-indigo-600 shadow-md shadow-purple-500/25"
                  : "text-gray-400 hover:text-white hover:bg-white/5"
                  }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div> */}
    </>
  );
}