'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiCheck, 
  FiArrowLeft, 
  FiBookOpen,
  FiLock,
  FiShield
} from 'react-icons/fi';

const steps = [
  { id: 1, name: 'Center' },
  { id: 2, name: 'Teacher' },
  { id: 3, name: 'Subject' },
  { id: 4, name: 'Time' },
  { id: 5, name: 'Payment' },
  { id: 6, name: 'Confirm' },
];

const centersData = [
  { id: 'c1', name: 'EduPlex Nasr City', rating: 4.8, distance: '2.3 km', students: '180 students', image: 'https://images.unsplash.com/photo-1562774053-701939374585?w=400&auto=format&fit=crop&q=80' },
  { id: 'c2', name: 'EduPlex Maadi', rating: 4.6, distance: '5.1 km', students: '145 students', image: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=400&auto=format&fit=crop&q=80' },
  { id: 'c3', name: 'EduPlex Alexandria', rating: 4.9, distance: '180 km', students: '167 students', image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400&auto=format&fit=crop&q=80' },
];

const teachersData = [
  { id: 't1', name: 'Dr. Ahmed Hassan', subject: 'Mathematics', rating: 4.9, fee: '850', avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80' },
  { id: 't2', name: 'Ms. Sara Nour', subject: 'Physics', rating: 4.7, fee: '720', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80' },
  { id: 't3', name: 'Mr. Karim Sayed', subject: 'Chemistry', rating: 4.8, fee: '780', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80' },
];

const subjectsData = ['Advanced Calculus', 'Linear Algebra', 'Statistics', 'Differential Equations'];

const timeSlots = [
  { time: '09:00', status: 'available' },
  { time: '10:00', status: 'booked' },
  { time: '11:00', status: 'available' },
  { time: '12:00', status: 'booked' },
  { time: '14:00', status: 'available' },
  { time: '15:00', status: 'available' },
  { time: '16:00', status: 'booked' },
  { time: '18:00', status: 'available' },
  { time: '19:00', status: 'available' },
  { time: '20:00', status: 'booked' },
];

export default function BookAClassView() {
  const [currentStep, setCurrentStep] = useState(1);
  
  const [bookingData, setBookingData] = useState({
    center: null as null | typeof centersData[0],
    teacher: null as null | typeof teachersData[0],
    subject: '',
    date: '',
    time: '',
    paymentMethod: 'Visa / Mastercard',
  });

  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, 7));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

  const walletBalance = 340;
  const sessionFee = Number(bookingData.teacher?.fee || 0);
  const hasEnoughWallet = walletBalance >= sessionFee;

  return (
    <div className="w-full text-slate-100 font-sans space-y-6 pb-16">
      
      {/* Top Header & Stepper */}
      {currentStep < 7 && (
        <div className="flex flex-col gap-6">
          <div>
            <h1 className="text-2xl lg:text-3xl font-extrabold text-white tracking-tight">
              Book a Session
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Complete all steps to reserve your learning slot
            </p>
          </div>

          {/* Stepper Bar */}
          <div className="grid grid-cols-6 gap-2 w-full max-w-4xl py-2">
            {steps.map((step) => {
              const isCompleted = currentStep > step.id;
              const isCurrent = currentStep === step.id;
              return (
                <div key={step.id} className="flex flex-col items-center relative">
                  <div className="flex items-center w-full justify-center">
                    {step.id > 1 && (
                      <div className={`absolute left-0 right-1/2 top-4 h-0.5 -z-10 transition-colors ${isCompleted || isCurrent ? 'bg-cyan-400' : 'bg-slate-800'}`} />
                    )}
                    <motion.div
                      initial={false}
                      animate={{
                        scale: isCurrent ? 1.1 : 1,
                        backgroundColor: isCompleted || isCurrent ? '#06b6d4' : '#151a28',
                      }}
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border transition-all ${
                        isCompleted || isCurrent 
                          ? 'border-cyan-400 text-slate-950 shadow-lg shadow-cyan-500/30' 
                          : 'border-slate-800 text-slate-500 bg-[#111522]'
                      }`}
                    >
                      {isCompleted ? <FiCheck className="text-slate-950 font-black" /> : step.id}
                    </motion.div>
                    {step.id < 6 && (
                      <div className={`absolute left-1/2 right-0 top-4 h-0.5 -z-10 transition-colors ${isCompleted ? 'bg-cyan-400' : 'bg-slate-800'}`} />
                    )}
                  </div>
                  <span className={`text-[10px] font-bold mt-2 uppercase tracking-wider ${isCurrent ? 'text-cyan-400' : 'text-slate-500'}`}>
                    {step.name}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Main Container */}
      {currentStep === 7 ? (
        <div className="w-full max-w-2xl mx-auto pt-4">
          <AnimatePresence mode="wait">
            <motion.div 
              key="success"
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              className="bg-[#111522] border border-slate-800/80 rounded-3xl p-8 text-center space-y-6 shadow-2xl"
            >
              <div className="w-16 h-16 rounded-full bg-cyan-400/20 border border-cyan-400 flex items-center justify-center mx-auto text-cyan-400 text-2xl shadow-lg shadow-cyan-500/30">
                <FiCheck />
              </div>
              <div>
                <h2 className="text-2xl font-black text-white">Booking Confirmed! 🎉</h2>
                <p className="text-xs text-slate-400 mt-1">
                  Your session with {bookingData.teacher?.name} has been booked for {bookingData.time} on {bookingData.date}
                </p>
              </div>

              <div className="bg-[#151a28] border border-slate-800 rounded-2xl p-4 text-left space-y-3 text-xs">
                <div className="flex justify-between"><span className="text-slate-400">Teacher</span><span className="font-bold text-white">{bookingData.teacher?.name}</span></div>
                <div className="flex justify-between"><span className="text-slate-400">Subject</span><span className="font-bold text-white">{bookingData.subject}</span></div>
                <div className="flex justify-between"><span className="text-slate-400">Center</span><span className="font-bold text-white">{bookingData.center?.name}</span></div>
                <div className="flex justify-between"><span className="text-slate-400">Time</span><span className="font-bold text-white">{bookingData.time}</span></div>
                <div className="flex justify-between"><span className="text-slate-400">Payment Method</span><span className="font-bold text-indigo-400">{bookingData.paymentMethod}</span></div>
                <div className="flex justify-between"><span className="text-slate-400">Amount Paid</span><span className="font-bold text-indigo-400">{bookingData.teacher?.fee} EGP</span></div>
                <div className="flex justify-between"><span className="text-slate-400">Booking ID</span><span className="font-bold text-cyan-400">#EDU-2026-7823</span></div>
              </div>

              <div className="flex gap-4 justify-center pt-2">
                <button onClick={() => { setCurrentStep(1); setBookingData({ center: null, teacher: null, subject: '', date: '', time: '', paymentMethod: 'Visa / Mastercard' }); }} className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition">
                  Book Another
                </button>
                <button onClick={() => alert("Redirecting to My Sessions...")} className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-lg transition">
                  View My Sessions
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* Left/Main Steps Content */}
          <div className="lg:col-span-2 space-y-6">
            <AnimatePresence mode="wait">
              
              {/* Step 1: Choose Center */}
              {currentStep === 1 && (
                <motion.div key="step1" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="space-y-4">
                  <h2 className="text-base font-bold text-white mb-2">Choose a Learning Center</h2>
                  {centersData.map((center) => {
                    const isSelected = bookingData.center?.id === center.id;
                    return (
                      <motion.div
                        key={center.id}
                        whileHover={{ scale: 1.01 }}
                        onClick={() => setBookingData({ ...bookingData, center })}
                        className={`cursor-pointer p-4 rounded-3xl border flex flex-col sm:flex-row items-center justify-between gap-4 transition-all ${
                          isSelected ? 'bg-[#141a29] border-cyan-400 ring-1 ring-cyan-400/40 shadow-xl' : 'bg-[#111522] border-slate-800/80 hover:border-slate-700'
                        }`}
                      >
                        <div className="flex items-center gap-4 w-full sm:w-auto">
                          <img src={center.image} alt={center.name} className="w-24 h-16 rounded-2xl object-cover" />
                          <div>
                            <h3 className="font-bold text-white text-sm">{center.name}</h3>
                            <p className="text-xs text-slate-400 mt-1">⭐ {center.rating} · 📍 {center.distance} · 👨‍🎓 {center.students}</p>
                          </div>
                        </div>
                        <button 
                          onClick={(e) => { e.stopPropagation(); setBookingData({ ...bookingData, center }); nextStep(); }}
                          className={`w-full sm:w-auto px-6 py-2 rounded-xl text-xs font-bold transition ${
                            isSelected ? 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/30' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                          }`}
                        >
                          Select ›
                        </button>
                      </motion.div>
                    );
                  })}
                </motion.div>
              )}

              {/* Step 2: Choose Teacher */}
              {currentStep === 2 && (
                <motion.div key="step2" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="space-y-4">
                  <h2 className="text-base font-bold text-white mb-2">Choose Your Teacher</h2>
                  {teachersData.map((teacher) => {
                    const isSelected = bookingData.teacher?.id === teacher.id;
                    return (
                      <motion.div
                        key={teacher.id}
                        whileHover={{ scale: 1.01 }}
                        onClick={() => setBookingData({ ...bookingData, teacher })}
                        className={`cursor-pointer p-4 rounded-3xl border flex items-center justify-between gap-4 transition-all ${
                          isSelected ? 'bg-[#141a29] border-cyan-400 ring-1 ring-cyan-400/40 shadow-xl' : 'bg-[#111522] border-slate-800/80 hover:border-slate-700'
                        }`}
                      >
                        <div className="flex items-center gap-4">
                          <img src={teacher.avatar} alt={teacher.name} className="w-12 h-12 rounded-2xl object-cover border border-indigo-500/30" />
                          <div>
                            <h3 className="font-bold text-white text-sm">{teacher.name}</h3>
                            <p className="text-xs text-indigo-400">{teacher.subject}</p>
                            <p className="text-[11px] text-amber-400 mt-0.5">⭐ {teacher.rating}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="text-sm font-black text-indigo-400">{teacher.fee}</span>
                          <span className="text-[10px] text-slate-500 block">EGP / month</span>
                        </div>
                      </motion.div>
                    );
                  })}
                  <div className="flex justify-between pt-4">
                    <button onClick={prevStep} className="flex items-center gap-2 text-xs text-slate-400 hover:text-white font-semibold"><FiArrowLeft /> Back</button>
                    <button 
                      disabled={!bookingData.teacher} 
                      onClick={nextStep} 
                      className={`px-6 py-2.5 rounded-xl text-xs font-bold transition ${bookingData.teacher ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30 hover:bg-indigo-500' : 'bg-slate-800 text-slate-500 cursor-not-allowed'}`}
                    >
                      Continue ›
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Step 3: Choose Subject */}
              {currentStep === 3 && (
                <motion.div key="step3" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="space-y-4">
                  <h2 className="text-base font-bold text-white mb-2">Select Subject</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {subjectsData.map((subj, idx) => {
                      const isSelected = bookingData.subject === subj;
                      return (
                        <motion.div
                          key={idx}
                          whileHover={{ scale: 1.02 }}
                          onClick={() => setBookingData({ ...bookingData, subject: subj })}
                          className={`cursor-pointer p-6 rounded-3xl border flex items-center gap-4 transition-all ${
                            isSelected ? 'bg-[#141a29] border-cyan-400 shadow-xl' : 'bg-[#111522] border-slate-800/80 hover:border-slate-700'
                          }`}
                        >
                          <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-400"><FiBookOpen /></div>
                          <h3 className="font-bold text-white text-sm">{subj}</h3>
                        </motion.div>
                      );
                    })}
                  </div>
                  <div className="flex justify-between pt-4">
                    <button onClick={prevStep} className="flex items-center gap-2 text-xs text-slate-400 hover:text-white font-semibold"><FiArrowLeft /> Back</button>
                    <button 
                      disabled={!bookingData.subject}
                      onClick={nextStep} 
                      className={`px-6 py-2.5 rounded-xl text-xs font-bold transition ${bookingData.subject ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30 hover:bg-indigo-500' : 'bg-slate-800 text-slate-500 cursor-not-allowed'}`}
                    >
                      Continue ›
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Step 4: Choose Date & Time */}
              {currentStep === 4 && (
                <motion.div key="step4" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="space-y-6">
                  <h2 className="text-base font-bold text-white mb-2">Choose Date & Time</h2>
                  
                  <div className="bg-[#111522] border border-slate-800/80 rounded-3xl p-6 shadow-2xl">
                    <div className="flex justify-between items-center mb-6">
                      <span className="text-xs font-bold text-slate-400">‹</span>
                      <h3 className="text-sm font-bold text-white">July 2025</h3>
                      <span className="text-xs font-bold text-slate-400">›</span>
                    </div>
                    <div className="grid grid-cols-7 gap-2 text-center text-xs">
                      {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => <span key={i} className="text-slate-500 font-bold">{d}</span>)}
                      {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => {
                        const dateStr = `July ${day}`;
                        const isSelected = bookingData.date === dateStr;
                        return (
                          <div 
                            key={day} 
                            onClick={() => setBookingData({ ...bookingData, date: dateStr })}
                            className={`p-2 rounded-xl cursor-pointer font-bold transition ${isSelected ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-300 hover:bg-slate-800/50'}`}
                          >
                            {day}
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-sm font-bold text-white">Available Time Slots</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {timeSlots.map((slot, idx) => {
                        const isSelected = bookingData.time === slot.time;
                        const isBooked = slot.status === 'booked';
                        return (
                          <button
                            key={idx}
                            disabled={isBooked}
                            onClick={() => setBookingData({ ...bookingData, time: slot.time })}
                            className={`p-3 rounded-2xl border text-xs font-bold transition-all ${
                              isBooked ? 'bg-[#0d1017] border-slate-900 text-slate-600 cursor-not-allowed' : isSelected ? 'bg-indigo-600 border-indigo-400 text-white shadow-lg' : 'bg-[#111522] border-slate-800 text-slate-300 hover:border-slate-700'
                            }`}
                          >
                            {slot.time}
                            {isBooked && <span className="block text-[9px] font-normal text-slate-600">Booked</span>}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="flex justify-between pt-4">
                    <button onClick={prevStep} className="flex items-center gap-2 text-xs text-slate-400 hover:text-white font-semibold"><FiArrowLeft /> Back</button>
                    <button 
                      disabled={!bookingData.date || !bookingData.time}
                      onClick={nextStep} 
                      className={`px-6 py-2.5 rounded-xl text-xs font-bold transition ${bookingData.date && bookingData.time ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30 hover:bg-indigo-500' : 'bg-slate-800 text-slate-500 cursor-not-allowed'}`}
                    >
                      Continue ›
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Step 5: Payment Method (Dynamic Policy & UI per method) */}
              {currentStep === 5 && (
                <motion.div key="step5" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="space-y-6">
                  <h2 className="text-base font-bold text-white mb-2">Payment Method</h2>
                  
                  <div className="space-y-3">
                    {[
                      { name: 'Visa / Mastercard', desc: 'Secure card payment', icon: '💳' },
                      { name: 'Apple Pay', desc: 'Instant via Face ID / Touch ID', icon: '' },
                      { name: 'Google Pay', desc: 'Pay with your Google account', icon: '🔵' },
                      { name: 'EduPlex Wallet', desc: `${walletBalance} EGP available`, icon: '🛡️' },
                    ].map((pay, idx) => {
                      const isSelected = bookingData.paymentMethod === pay.name;
                      return (
                        <div 
                          key={idx}
                          onClick={() => setBookingData({ ...bookingData, paymentMethod: pay.name })}
                          className={`cursor-pointer p-4 rounded-3xl border flex items-center justify-between transition-all ${
                            isSelected ? 'bg-[#141a29] border-cyan-400 shadow-xl' : 'bg-[#111522] border-slate-800/80 hover:border-slate-700'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <span className="text-xl">{pay.icon}</span>
                            <div>
                              <h4 className="font-bold text-white text-xs">{pay.name}</h4>
                              <p className="text-[10px] text-slate-400">{pay.desc}</p>
                            </div>
                          </div>
                          <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${isSelected ? 'border-cyan-400 bg-cyan-400/20' : 'border-slate-700'}`}>
                            {isSelected && <div className="w-2.5 h-2.5 bg-cyan-400 rounded-full" />}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Dynamic UI Policy & Inputs based on selected Payment Method */}
                  <div className="bg-[#111522] border border-slate-800/80 rounded-3xl p-6 space-y-4">
                    
                    {/* 1. Visa / Mastercard Fields & Policy */}
                    {bookingData.paymentMethod === 'Visa / Mastercard' && (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                        <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                          <h3 className="text-xs font-bold text-white uppercase tracking-wider">Card Details</h3>
                          <span className="text-[10px] text-cyan-400">2.5% gateway fee applied</span>
                        </div>
                        <input type="text" placeholder="4242 4242 4242 4242" className="w-full bg-[#151a28] border border-slate-800 rounded-xl p-3 text-xs text-white outline-none focus:border-indigo-500" />
                        <div className="grid grid-cols-2 gap-4">
                          <input type="text" placeholder="12/27" className="w-full bg-[#151a28] border border-slate-800 rounded-xl p-3 text-xs text-white outline-none focus:border-indigo-500" />
                          <input type="password" placeholder="..." className="w-full bg-[#151a28] border border-slate-800 rounded-xl p-3 text-xs text-white outline-none focus:border-indigo-500" />
                        </div>
                        <input type="text" placeholder="Cardholder Name" className="w-full bg-[#151a28] border border-slate-800 rounded-xl p-3 text-xs text-white outline-none focus:border-indigo-500" />
                        <p className="text-[10px] text-slate-400 bg-indigo-500/10 p-3 rounded-xl border border-indigo-500/20">
                          ℹ️ **Visa Policy:** Fully refundable up to 24 hours before session start time. Instant confirmation.
                        </p>
                      </motion.div>
                    )}

                    {/* 2. Apple Pay Policy & Quick Checkout Box */}
                    {bookingData.paymentMethod === 'Apple Pay' && (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4 text-center py-4">
                        <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center mx-auto text-2xl text-white"></div>
                        <div>
                          <h4 className="text-sm font-bold text-white">Express Checkout with Apple Pay</h4>
                          <p className="text-xs text-slate-400 mt-1">You will be prompted to authorize via Touch ID or Face ID.</p>
                        </div>
                        <p className="text-[10px] text-slate-400 bg-cyan-500/10 p-3 rounded-xl border border-cyan-500/20 text-left">
                          ℹ️ **Apple Pay Policy:** Fast-track processing. Direct charge to your default Apple Wallet card with zero extra gateway fees.
                        </p>
                      </motion.div>
                    )}

                    {/* 3. Google Pay Policy & Quick Checkout Box */}
                    {bookingData.paymentMethod === 'Google Pay' && (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4 text-center py-4">
                        <div className="w-14 h-14 rounded-full bg-blue-500/20 flex items-center justify-center mx-auto text-2xl text-blue-400">🔵</div>
                        <div>
                          <h4 className="text-sm font-bold text-white">Express Checkout with Google Pay</h4>
                          <p className="text-xs text-slate-400 mt-1">Secure payment using your saved Google account payment methods.</p>
                        </div>
                        <p className="text-[10px] text-slate-400 bg-blue-500/10 p-3 rounded-xl border border-blue-500/20 text-left">
                          ℹ️ **Google Pay Policy:** Automatic currency conversion and instant secure verification backed by Google security.
                        </p>
                      </motion.div>
                    )}

                    {/* 4. EduPlex Wallet Policy & Balance Check */}
                    {bookingData.paymentMethod === 'EduPlex Wallet' && (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                        <div className="flex justify-between items-center bg-[#151a28] p-4 rounded-2xl border border-slate-800">
                          <div>
                            <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Wallet Balance</span>
                            <span className="text-lg font-black text-white">{walletBalance} EGP</span>
                          </div>
                          <div>
                            <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Session Fee</span>
                            <span className="text-lg font-black text-indigo-400">{sessionFee} EGP</span>
                          </div>
                        </div>

                        {hasEnoughWallet ? (
                          <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs flex items-center gap-2">
                            <FiCheck /> Sufficient balance available. Instant cashback 5% will be rewarded!
                          </div>
                        ) : (
                          <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs flex items-center gap-2">
                            <FiShield /> Insufficient balance. Please top up your wallet or choose another payment method.
                          </div>
                        )}

                        <p className="text-[10px] text-slate-400 bg-[#151a28] p-3 rounded-xl border border-slate-800">
                          ℹ️ **Wallet Policy:** Instant fee deduction with 0% extra fees. Wallet refunds are instantly credited back if canceled 12 hours prior.
                        </p>
                      </motion.div>
                    )}

                  </div>

                  <div className="flex justify-between pt-4">
                    <button onClick={prevStep} className="flex items-center gap-2 text-xs text-slate-400 hover:text-white font-semibold"><FiArrowLeft /> Back</button>
                    <motion.button 
                      whileHover={{ scale: 1.02 }} 
                      whileTap={{ scale: 0.98 }} 
                      disabled={bookingData.paymentMethod === 'EduPlex Wallet' && !hasEnoughWallet}
                      onClick={nextStep} 
                      className={`px-8 py-3 rounded-xl text-xs font-bold shadow-xl transition ${
                        bookingData.paymentMethod === 'EduPlex Wallet' && !hasEnoughWallet 
                          ? 'bg-slate-800 text-slate-500 cursor-not-allowed' 
                          : 'bg-indigo-600 text-white shadow-indigo-600/30 hover:bg-indigo-500'
                      }`}
                    >
                      Continue to Review
                    </motion.button>
                  </div>
                </motion.div>
              )}

              {/* Step 6: Review & Confirm */}
              {currentStep === 6 && (
                <motion.div key="step6" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="space-y-6">
                  <h2 className="text-base font-bold text-white mb-2">Review & Confirm</h2>
                  
                  <div className="bg-[#111522] border border-slate-800/80 rounded-3xl p-6 shadow-2xl space-y-4 text-xs">
                    <h3 className="text-sm font-bold text-white pb-3 border-b border-slate-800">Booking Summary</h3>
                    
                    {[
                      { label: 'Center', val: bookingData.center?.name || 'Not selected' },
                      { label: 'Teacher', val: bookingData.teacher?.name || 'Not selected' },
                      { label: 'Subject', val: bookingData.subject || 'Not selected' },
                      { label: 'Date', val: bookingData.date || 'Not selected' },
                      { label: 'Time', val: bookingData.time || 'Not selected' },
                      { label: 'Payment Method', val: bookingData.paymentMethod },
                    ].map((item, idx) => (
                      <div key={idx} className="flex justify-between py-2 border-b border-slate-800/50">
                        <span className="text-slate-400">{item.label}</span>
                        <span className="font-bold text-white">{item.val}</span>
                      </div>
                    ))}

                    <div className="flex justify-between pt-2 text-sm font-black">
                      <span className="text-white">Total</span>
                      <span className="text-indigo-400">{bookingData.teacher?.fee || '0'} EGP</span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center pt-4">
                    <button onClick={prevStep} className="flex items-center gap-2 text-xs text-slate-400 hover:text-white font-semibold"><FiArrowLeft /> Back</button>
                    <motion.button 
                      whileHover={{ scale: 1.02 }} 
                      whileTap={{ scale: 0.98 }} 
                      onClick={nextStep} 
                      className="w-full sm:w-auto px-8 py-3 rounded-xl bg-indigo-600 text-white text-xs font-bold shadow-xl shadow-indigo-600/30 hover:bg-indigo-500"
                    >
                      Confirm & Pay {bookingData.teacher?.fee || '0'} EGP
                    </motion.button>
                  </div>
                  <div className="text-center text-[10px] text-slate-500 flex items-center justify-center gap-1">
                    <FiLock /> Secured by 256-bit SSL encryption
                  </div>
                </motion.div>
              )}

            </AnimatePresence>
          </div>

          {/* Right Column: Dynamic Session Summary */}
          <div className="bg-[#111522] border border-slate-800/80 rounded-3xl p-6 shadow-2xl space-y-6 lg:sticky lg:top-6">
            <h3 className="text-sm font-bold text-white">Session Summary</h3>
            
            <div className="space-y-3 text-xs">
              
              <div className="bg-[#151a28] border border-slate-800 rounded-2xl p-3 space-y-1">
                <span className="text-[10px] text-slate-500 uppercase tracking-wider block font-bold">Center</span>
                <span className={`font-bold ${bookingData.center ? 'text-white' : 'text-slate-600 italic'}`}>
                  {bookingData.center ? bookingData.center.name : 'Select a center...'}
                </span>
              </div>

              {bookingData.teacher && (
                <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="bg-[#151a28] border border-slate-800 rounded-2xl p-3 flex items-center gap-3">
                  <img src={bookingData.teacher.avatar} alt="" className="w-8 h-8 rounded-xl object-cover" />
                  <div>
                    <span className="font-bold text-white block">{bookingData.teacher.name}</span>
                    <span className="text-[10px] text-indigo-400">{bookingData.teacher.subject}</span>
                  </div>
                </motion.div>
              )}

              {bookingData.subject && (
                <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="bg-[#151a28] border border-slate-800 rounded-2xl p-3 space-y-1">
                  <span className="text-[10px] text-slate-500 uppercase tracking-wider block font-bold">Subject</span>
                  <span className="font-bold text-white">{bookingData.subject}</span>
                </motion.div>
              )}

              {bookingData.date && bookingData.time && (
                <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="bg-[#151a28] border border-slate-800 rounded-2xl p-3 space-y-1">
                  <span className="text-[10px] text-slate-500 uppercase tracking-wider block font-bold">Schedule</span>
                  <span className="font-bold text-white">{bookingData.date} - {bookingData.time}</span>
                </motion.div>
              )}

              <div className="bg-[#151a28] border border-slate-800 rounded-2xl p-3 space-y-1">
                <span className="text-[10px] text-slate-500 uppercase tracking-wider block font-bold">Payment Policy</span>
                <span className="font-bold text-cyan-400 text-[11px] block">{bookingData.paymentMethod}</span>
              </div>

            </div>

            <div className="pt-4 border-t border-slate-800 flex justify-between items-center">
              <span className="text-xs text-slate-400">Monthly fee</span>
              <span className="text-xl font-black text-indigo-400">
                {bookingData.teacher ? `${bookingData.teacher.fee} EGP` : '0 EGP'}
              </span>
            </div>

            <div className="space-y-2 text-[10px] text-slate-400 pt-2 border-t border-slate-800">
              <div className="flex items-center gap-2">⚡ First session free trial</div>
              <div className="flex items-center gap-2">🛡️ 100% money-back guarantee</div>
            </div>
          </div>

        </div>
      )}

    </div>
  );
}