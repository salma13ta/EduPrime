'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  GraduationCap,
  School,
  Users,
  ShieldAlert,
  Eye,
  EyeOff,
  Star,
  CheckCircle2,
  Sparkles,
  Loader2,
  X,
  Lock,
  KeyRound,
  ArrowRight,
  Mail
} from 'lucide-react';

type UserRole = 'student' | 'teacher' | 'parent' | 'admin';

const ROLE_ROUTES: Record<UserRole, string> = {
  student: '/student',
  teacher: '/teacher',
  parent: '/parent',
  admin: '/admin',
};

// أيقونات مزودي الخدمة المخصصة
const GoogleIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24">
    <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z" />
    <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.11-6.72-4.96H1.26v3.13C3.29 21.39 7.37 24 12 24z" />
    <path fill="#FBBC05" d="M5.28 14.24c-.25-.72-.38-1.49-.38-2.24s.13-1.52.38-2.24V6.63H1.26C.46 8.24 0 10.06 0 12s.46 3.76 1.26 5.37l4.02-3.13z" />
    <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.37 0 3.29 2.61 1.26 6.63l4.02 3.13c.95-2.85 3.6-4.96 6.72-4.96z" />
  </svg>
);

const FacebookIcon = () => (
  <svg className="w-5 h-5 fill-[#1877F2]" viewBox="0 0 24 24">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

const AppleIcon = () => (
  <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24">
    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.13c.63-.76 1.07-1.82.95-2.88-.93.04-2.08.62-2.74 1.39-.59.68-1.11 1.77-.97 2.82 1.05.08 2.13-.57 2.76-1.33z" />
  </svg>
);

export default function AuthPage() {
  const router = useRouter();
  const [isSignUp, setIsSignUp] = useState(false);
  const [role, setRole] = useState<UserRole>('student');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // حالة المودال والتفاعل مع OAuth
  const [activeSocialModal, setActiveSocialModal] = useState<string | null>(null);
  const [socialUserEmail, setSocialUserEmail] = useState('');

  // حالة مودال نسيت كلمة المرور
  const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [isSendingReset, setIsSendingReset] = useState(false);
  const [resetSent, setResetSent] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [transitionStage, setTransitionStage] = useState<'idle' | 'loading' | 'success' | 'portal'>('idle');
  const [authProvider, setAuthProvider] = useState<string>('Email');
  const timeoutRef = useRef<number | null>(null);

  const isFormValid = isSignUp
    ? fullName.trim() !== '' && email.trim() !== '' && password.length >= 6
    : email.trim() !== '' && password.length >= 6;

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const waitFor = (ms: number) =>
    new Promise<void>((resolve) => {
      timeoutRef.current = window.setTimeout(() => {
        timeoutRef.current = null;
        resolve();
      }, ms);
    });

  // معالجة طلب استعادة كلمة المرور
  const handleForgotPasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resetEmail.trim()) return;

    setIsSendingReset(true);
    await waitFor(1200); // محاكاة إرسال البريد
    setIsSendingReset(false);
    setResetSent(true);
  };

  const closeForgotPasswordModal = () => {
    setIsForgotPasswordOpen(false);
    setResetSent(false);
    setResetEmail('');
  };

  // تنفيذ تسجيل الدخول النهائي
  const executeAuth = async (providerName: string, userEmailInput: string) => {
    setActiveSocialModal(null);
    setAuthProvider(providerName);
    setIsSubmitting(true);
    setTransitionStage('loading');

    try {
      const derivedName = userEmailInput.split('@')[0] || `${providerName} User`;
      const userData = {
        name: fullName || derivedName,
        email: userEmailInput,
        role,
        provider: providerName,
      };

      localStorage.setItem('eduprime_user', JSON.stringify(userData));

      await waitFor(900);
      setTransitionStage('success');

      await waitFor(600);
      setTransitionStage('portal');

      await waitFor(400);
      const destination = ROLE_ROUTES[role] || '/student';
      router.replace(destination);
    } catch (error) {
      console.error('Auth error:', error);
      setTransitionStage('idle');
      setIsSubmitting(false);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return;
    executeAuth('Email', email);
  };

  const openSocialAuthModal = (provider: string) => {
    setActiveSocialModal(provider);
    if (provider === 'Google') setSocialUserEmail('student.demo@gmail.com');
    if (provider === 'Apple') setSocialUserEmail('user.apple@icloud.com');
    if (provider === 'Facebook') setSocialUserEmail('facebook.user@fb.com');
  };

  return (
    <div className="relative min-h-screen bg-[#08070d] text-white overflow-hidden font-sans select-none">

      {/* 🔑 Forgot Password Modal */}
      <AnimatePresence>
        {isForgotPasswordOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[130] flex items-center justify-center bg-black/80 backdrop-blur-md p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="relative w-full max-w-md bg-[#12101f] border border-purple-500/30 rounded-3xl p-6 shadow-2xl shadow-purple-900/40 overflow-hidden"
            >
              <button
                onClick={closeForgotPasswordModal}
                className="absolute top-4 right-4 p-2 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-all"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex flex-col items-center text-center mt-2">
                <div className="w-14 h-14 rounded-2xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center mb-4 text-purple-400">
                  <KeyRound className="w-7 h-7" />
                </div>

                <h3 className="text-xl font-bold text-white">
                  {resetSent ? 'Check Your Email' : 'Forgot Password?'}
                </h3>
                <p className="text-xs text-gray-400 mt-1 max-w-xs">
                  {resetSent
                    ? `We sent a password reset link to ${resetEmail}`
                    : "No worries! Enter your email address and we'll send you a reset link."}
                </p>

                {!resetSent ? (
                  <form onSubmit={handleForgotPasswordSubmit} className="w-full mt-6 space-y-4 text-left">
                    <div>
                      <label className="text-[11px] text-gray-400 mb-1 block">Registered Email</label>
                      <div className="relative">
                        <input
                          type="email"
                          required
                          value={resetEmail}
                          onChange={(e) => setResetEmail(e.target.value)}
                          placeholder="name@example.com"
                          className="w-full px-4 py-3 pl-10 rounded-xl bg-[#0a0912] border border-white/10 text-xs text-white focus:border-purple-500 focus:outline-none"
                        />
                        <Mail className="w-4 h-4 text-gray-500 absolute left-3 top-3.5" />
                      </div>
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      disabled={isSendingReset || !resetEmail.trim()}
                      type="submit"
                      className="w-full py-3 bg-gradient-to-r from-purple-600 via-fuchsia-600 to-indigo-600 rounded-xl text-xs font-bold shadow-lg shadow-purple-600/30 text-white flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      {isSendingReset ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <>
                          <span>Send Reset Link</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </>
                      )}
                    </motion.button>
                  </form>
                ) : (
                  <div className="w-full mt-6">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={closeForgotPasswordModal}
                      className="w-full py-3 bg-purple-600/20 border border-purple-500/40 rounded-xl text-xs font-bold text-purple-300 hover:bg-purple-600/30 transition-all"
                    >
                      Back to Sign In
                    </motion.button>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 🌐 Custom OAuth Simulation Modal */}
      <AnimatePresence>
        {activeSocialModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[120] flex items-center justify-center bg-black/80 backdrop-blur-md p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="relative w-full max-w-md bg-[#12101f] border border-purple-500/30 rounded-3xl p-6 shadow-2xl shadow-purple-900/40 overflow-hidden"
            >
              <button
                onClick={() => setActiveSocialModal(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-all"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex flex-col items-center text-center mt-2">
                <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-4 shadow-inner">
                  {activeSocialModal === 'Google' && <GoogleIcon />}
                  {activeSocialModal === 'Apple' && <AppleIcon />}
                  {activeSocialModal === 'Facebook' && <FacebookIcon />}
                </div>

                <h3 className="text-xl font-bold text-white">
                  Continue with {activeSocialModal}
                </h3>
                <p className="text-xs text-gray-400 mt-1 max-w-xs">
                  Choose your account to sign in to <span className="text-purple-400 font-semibold">EduPrime</span> as <span className="text-white capitalize font-bold">{role}</span>.
                </p>

                <div className="w-full mt-6 space-y-3">
                  <div className="p-3.5 bg-[#1a172c] border border-purple-500/30 rounded-2xl flex items-center justify-between text-left hover:border-purple-500 transition-all cursor-pointer">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center text-sm font-bold text-white shadow-md">
                        {socialUserEmail.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="text-xs font-bold text-white capitalize">{activeSocialModal} Account</p>
                        <p className="text-[11px] text-gray-400">{socialUserEmail}</p>
                      </div>
                    </div>
                    <CheckCircle2 className="w-5 h-5 text-purple-400" />
                  </div>

                  <div className="text-left mt-2">
                    <label className="text-[11px] text-gray-400 mb-1 block">Or enter custom provider email:</label>
                    <input
                      type="email"
                      value={socialUserEmail}
                      onChange={(e) => setSocialUserEmail(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#0a0912] border border-white/10 text-xs text-white focus:border-purple-500 focus:outline-none"
                    />
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => executeAuth(activeSocialModal, socialUserEmail)}
                  className="w-full mt-6 py-3 bg-gradient-to-r from-purple-600 via-fuchsia-600 to-indigo-600 rounded-xl text-xs font-bold shadow-lg shadow-purple-600/30 text-white flex items-center justify-center gap-2"
                >
                  <Lock className="w-3.5 h-3.5" />
                  <span>Authorize & Continue</span>
                </motion.button>

                <p className="text-[10px] text-gray-500 mt-4">
                  By continuing, you allow EduPrime to receive your profile info.
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 🔮 أنميشن الترانزيشن */}
      <AnimatePresence>
        {isSubmitting && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-[#08070d]/90 backdrop-blur-2xl"
          >
            <motion.div
              animate={{
                scale: transitionStage === 'portal' ? [1, 2.5, 30] : [0.8, 1.2, 1],
                opacity: transitionStage === 'portal' ? [0.6, 1, 1] : [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: transitionStage === 'portal' ? 0.6 : 2,
                repeat: transitionStage === 'portal' ? 0 : Infinity,
                ease: 'easeInOut',
              }}
              className="absolute w-[500px] h-[500px] rounded-full bg-gradient-to-r from-purple-600/30 via-fuchsia-600/30 to-indigo-600/30 blur-3xl"
            />

            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 30 }}
              animate={{
                scale: transitionStage === 'portal' ? 1.5 : 1,
                opacity: transitionStage === 'portal' ? 0 : 1,
                y: 0
              }}
              className="relative z-10 flex flex-col items-center p-10 rounded-3xl bg-[#110f1d]/90 border border-purple-500/30 shadow-[0_0_80px_rgba(168,85,247,0.25)] text-center max-w-sm w-full mx-4"
            >
              <AnimatePresence mode="wait">
                {transitionStage === 'loading' && (
                  <motion.div
                    key="loading"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="flex flex-col items-center"
                  >
                    <div className="relative flex items-center justify-center mb-6">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                        className="w-16 h-16 rounded-full border-2 border-transparent border-t-purple-500 border-r-fuchsia-500"
                      />
                      <Sparkles className="w-6 h-6 text-purple-400 absolute animate-pulse" />
                    </div>

                    <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-purple-200 to-gray-300">
                      Connecting {authProvider}...
                    </h3>
                    <p className="mt-2 text-xs text-purple-300/80 font-medium capitalize">
                      Opening {role} Dashboard...
                    </p>

                    <div className="mt-6 w-48 h-1.5 bg-white/5 rounded-full overflow-hidden border border-white/10 p-0.5">
                      <motion.div
                        className="h-full bg-gradient-to-r from-purple-500 via-fuchsia-500 to-indigo-500 rounded-full"
                        initial={{ width: '0%' }}
                        animate={{ width: '100%' }}
                        transition={{ duration: 0.8, ease: 'easeInOut' }}
                      />
                    </div>
                  </motion.div>
                )}

                {(transitionStage === 'success' || transitionStage === 'portal') && (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center"
                  >
                    <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center mb-4 text-emerald-400 shadow-[0_0_30px_rgba(16,185,129,0.3)]">
                      <CheckCircle2 className="w-10 h-10" />
                    </div>

                    <h3 className="text-xl font-bold text-white">Authenticated</h3>
                    <p className="mt-1 text-xs text-emerald-400 font-medium capitalize">
                      Redirecting to {role} area...
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 🌌 المحتوى الرئيسي */}
      <motion.div
        animate={{
          scale: isSubmitting ? 0.95 : 1,
          filter: isSubmitting ? 'blur(10px)' : 'blur(0px)',
          opacity: isSubmitting ? 0.4 : 1
        }}
        transition={{ duration: 0.4 }}
        className="min-h-screen flex"
      >
        {/* Left Hero */}
        <div className="hidden lg:flex flex-1 flex-col justify-between p-12 relative bg-gradient-to-br from-[#0e0c19] via-[#08070d] to-[#120a21]">
          <div className="relative w-full max-w-xl mx-auto my-auto flex flex-col items-center text-center">
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -top-12 right-10 bg-[#161324]/80 backdrop-blur-md border border-white/10 px-4 py-2 rounded-2xl text-left shadow-xl"
            >
              <p className="text-xs font-bold text-white">Sarah K.</p>
              <p className="text-[11px] text-purple-400">Scored 98% in Math!</p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
              className="w-24 h-24 bg-gradient-to-tr from-purple-600 to-indigo-500 rounded-3xl flex items-center justify-center shadow-2xl shadow-purple-500/20 mb-8 border border-white/10 cursor-pointer"
            >
              <GraduationCap className="w-14 h-14 text-white" />
            </motion.div>

            <h1 className="text-4xl font-extrabold tracking-tight text-white mb-4">
              Unlock Your Full Potential
            </h1>
            <p className="text-gray-400 text-sm max-w-md leading-relaxed mb-10">
              Join 50,000+ learners who have transformed their lives through world-class education.
            </p>

            <div className="grid grid-cols-3 gap-4 w-full max-w-md mt-4">
              {[
                { title: '50K+', sub: 'Students' },
                { title: '4.9', sub: 'Rating', icon: true },
                { title: '98%', sub: 'Success' }
              ].map((stat, idx) => (
                <div
                  key={idx}
                  className="bg-[#13111c] border border-white/5 p-4 rounded-2xl text-center"
                >
                  <h3 className="text-xl font-bold text-white flex items-center justify-center gap-1">
                    {stat.title}
                    {stat.icon && <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />}
                  </h3>
                  <p className="text-[11px] text-gray-400 mt-0.5">{stat.sub}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Form */}
        <div className="w-full lg:w-[480px] bg-[#0c0b12] border-l border-white/5 p-8 flex flex-col justify-between overflow-y-auto">
          <div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 bg-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-purple-600/30">
                  <GraduationCap className="w-5 h-5 text-white" />
                </div>
                <span className="font-bold text-lg">EduPrime</span>
              </div>

              <div className="bg-[#15131d] p-1 rounded-xl border border-white/5 flex gap-1">
                <button
                  type="button"
                  onClick={() => setIsSignUp(false)}
                  className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all ${!isSignUp ? 'bg-purple-600 text-white shadow-md' : 'text-gray-400 hover:text-white'}`}
                >
                  Sign In
                </button>
                <button
                  type="button"
                  onClick={() => setIsSignUp(true)}
                  className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all ${isSignUp ? 'bg-purple-600 text-white shadow-md' : 'text-gray-400 hover:text-white'}`}
                >
                  Sign Up
                </button>
              </div>
            </div>

            <div className="my-6">
              <h2 className="text-2xl font-bold">{isSignUp ? 'Create your account' : 'Welcome back 👋'}</h2>
              <p className="text-gray-400 text-xs mt-1">
                {isSignUp ? 'Start your learning journey today' : 'Sign in to continue learning'}
              </p>
            </div>

            {/* Role Buttons */}
            <div className="mb-5 space-y-1.5">
              <label className="text-xs text-gray-400">Select Role</label>
              <div className="grid grid-cols-4 gap-2">
                {[
                  { id: 'student', label: 'Student', icon: GraduationCap },
                  { id: 'teacher', label: 'Teacher', icon: School },
                  { id: 'parent', label: 'Parent', icon: Users },
                  { id: 'admin', label: 'Admin', icon: ShieldAlert },
                ].map((item) => {
                  const Icon = item.icon;
                  const active = role === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setRole(item.id as UserRole)}
                      className={`flex flex-col items-center justify-center py-2.5 rounded-xl border text-[11px] gap-1 transition-all ${active
                        ? 'border-purple-500 bg-purple-500/20 text-purple-300 font-bold shadow-[0_0_15px_rgba(168,85,247,0.2)]'
                        : 'border-white/5 bg-[#14121c] text-gray-400 hover:border-white/10 hover:text-gray-200'
                        }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Social Logins */}
            <div className="grid grid-cols-3 gap-2.5 mb-5">
              {[
                { name: 'Google', icon: GoogleIcon },
                { name: 'Apple', icon: AppleIcon },
                { name: 'Facebook', icon: FacebookIcon },
              ].map((provider) => {
                const Icon = provider.icon;
                return (
                  <motion.button
                    key={provider.name}
                    type="button"
                    whileHover={{ scale: 1.03, backgroundColor: 'rgba(255,255,255,0.08)' }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => openSocialAuthModal(provider.name)}
                    className="py-2.5 px-3 bg-[#14121c] border border-white/10 rounded-xl text-xs text-gray-200 hover:border-purple-500/50 transition-all font-medium flex items-center justify-center gap-2 shadow-sm"
                  >
                    <Icon />
                    <span>{provider.name}</span>
                  </motion.button>
                );
              })}
            </div>

            <div className="relative flex items-center justify-center mb-5">
              <div className="border-t border-white/10 w-full" />
              <span className="bg-[#0c0b12] px-3 text-[10px] text-gray-500 uppercase absolute">or continue with email</span>
            </div>

            {/* Form */}
            <form onSubmit={handleFormSubmit} className="space-y-4">
              {isSignUp && (
                <div>
                  <label className="text-xs text-gray-300 mb-1 block">Full Name</label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Alex Johnson"
                    className="w-full px-4 py-3 rounded-xl bg-[#14121c] border border-white/10 text-xs text-white focus:border-purple-500 focus:outline-none"
                  />
                </div>
              )}

              <div>
                <label className="text-xs text-gray-300 mb-1 block">Email address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="alex@example.com"
                  className="w-full px-4 py-3 rounded-xl bg-[#14121c] border border-white/10 text-xs text-white focus:border-purple-500 focus:outline-none"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-xs text-gray-300">Password</label>
                  {!isSignUp && (
                    <button
                      type="button"
                      onClick={() => {
                        setResetEmail(email); // تعبئة الإيميل المكتوب تلقائياً
                        setIsForgotPasswordOpen(true);
                      }}
                      className="text-[11px] text-purple-400 hover:underline cursor-pointer"
                    >
                      Forgot password?
                    </button>
                  )}
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full px-4 py-3 rounded-xl bg-[#14121c] border border-white/10 text-xs text-white focus:border-purple-500 focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3.5 text-gray-500 hover:text-white"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: isFormValid && !isSubmitting ? 1.02 : 1 }}
                whileTap={{ scale: isFormValid && !isSubmitting ? 0.97 : 1 }}
                disabled={!isFormValid || isSubmitting}
                type="submit"
                className={`w-full py-3.5 rounded-xl text-xs font-bold transition-all shadow-lg flex items-center justify-center gap-2 ${isFormValid && !isSubmitting
                  ? 'bg-gradient-to-r from-purple-600 via-fuchsia-600 to-indigo-600 text-white shadow-purple-600/30 cursor-pointer'
                  : 'bg-white/10 text-gray-500 cursor-not-allowed opacity-50'
                  }`}
              >
                {isSubmitting ? (
                  <Loader2 className="w-4 h-4 animate-spin text-white" />
                ) : (
                  <span>{isSignUp ? `Create ${role} Account` : `Sign In as ${role}`}</span>
                )}
              </motion.button>
            </form>
          </div>

          <p className="text-center text-xs text-gray-400 mt-6">
            {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
            <button type="button" onClick={() => setIsSignUp(!isSignUp)} className="text-purple-400 font-semibold hover:underline">
              {isSignUp ? 'Sign In' : 'Sign up free'}
            </button>
          </p>
        </div>
      </motion.div>
    </div>
  );
}