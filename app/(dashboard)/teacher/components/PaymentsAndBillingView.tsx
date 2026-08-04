'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    FiCheck,
    FiSearch,
    FiFilter,
    FiDownload,
    FiLock,
    FiShield,
    FiStar,
    FiFileText,
    FiCreditCard,
    FiDollarSign,
    FiClock,
    FiCheckCircle
} from 'react-icons/fi';

type PaymentMethod = 'Visa / Mastercard' | 'Apple Pay' | 'Google Pay' | 'Wallet';

export default function PaymentsAndBillingView() {
    const [activeTab, setActiveTab] = useState<'Plans' | 'Wallet' | 'History' | 'Invoices'>('Plans');
    const [selectedPlan, setSelectedPlan] = useState<'Basic' | 'Pro' | 'Elite'>('Pro');
    const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('Visa / Mastercard');

    // Wallet State
    const [walletBalance, setWalletBalance] = useState(1240);
    const [topUpAmount, setTopUpAmount] = useState('500');

    // Search & Filters for History
    const [searchQuery, setSearchQuery] = useState('');
    const [historyFilter, setHistoryFilter] = useState('All');

    // Transaction History Mock Data
    const [transactions, setTransactions] = useState([
        { id: 'TXN-001', desc: 'Advanced Calculus - July', amount: '850 EGP', date: 'Jul 1, 2025', method: 'Visa', status: 'Paid' },
        { id: 'TXN-002', desc: 'Physics Package - July', amount: '720 EGP', date: 'Jul 1, 2025', method: 'Wallet', status: 'Paid' },
        { id: 'TXN-003', desc: 'Exam Prep Bundle', amount: '450 EGP', date: 'Jun 28, 2025', method: 'Visa', status: 'Paid' },
        { id: 'TXN-004', desc: 'Chemistry - June', amount: '780 EGP', date: 'Jun 1, 2025', method: 'Apple Pay', status: 'Paid' },
        { id: 'TXN-005', desc: 'Study Materials', amount: '120 EGP', date: 'May 25, 2025', method: 'Visa', status: 'Paid' },
        { id: 'TXN-006', desc: 'Biology - June', amount: '650 EGP', date: 'Jun 1, 2025', method: 'Visa', status: 'Refunded' },
    ]);

    // Invoices Mock Data
    const invoices = [
        { title: 'Invoice - July 2025', details: '1570 EGP - 2 sessions', date: 'Jul 1, 2025' },
        { title: 'Invoice - June 2025', details: '1430 EGP - 2 sessions', date: 'Jun 1, 2025' },
        { title: 'Invoice - May 2025', details: '1200 EGP - 2 sessions', date: 'May 1, 2025' },
        { title: 'Invoice - April 2025', details: '980 EGP - 2 sessions', date: 'Apr 1, 2025' },
    ];

    const handleTopUp = () => {
        const val = Number(topUpAmount);
        if (val > 0) {
            setWalletBalance(prev => prev + val);
            setTransactions(prev => [
                { id: `TXN-00${prev.length + 1}`, desc: `Top-up via ${paymentMethod}`, amount: `+${val} EGP`, date: 'Today', method: paymentMethod, status: 'Paid' },
                ...prev
            ]);
            alert(`Successfully added ${val} EGP to your wallet!`);
        }
    };

    const handleSubscribe = () => {
        alert(`Successfully subscribed to the ${selectedPlan} Plan using ${paymentMethod}!`);
    };

    return (
        <div className="w-full text-slate-100 font-sans space-y-6 pb-16">

            {/* Header & Subtitle */}
            <div>
                <h1 className="text-2xl lg:text-3xl font-extrabold text-white tracking-tight">
                    Payments & Billing
                </h1>
                <p className="text-xs text-slate-400 mt-1">
                    Manage subscriptions, wallet balance, and payment history
                </p>
            </div>

            {/* Top Overview Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

                {/* Wallet Balance Card */}
                <div className="bg-[#111522] border border-slate-800/80 rounded-3xl p-5 shadow-xl space-y-3">
                    <div className="w-9 h-9 rounded-2xl bg-rose-500/10 flex items-center justify-center text-rose-500 font-bold border border-rose-500/20">
                        🛡️
                    </div>
                    <div>
                        <h3 className="text-xl font-black text-white">{walletBalance} EGP</h3>
                        <span className="text-[11px] text-slate-400 block mt-0.5">Wallet Balance</span>
                        <span className="text-[10px] text-emerald-400 block mt-1">Available</span>
                    </div>
                </div>

                {/* This Month Subscriptions Card */}
                <div className="bg-[#111522] border border-slate-800/80 rounded-3xl p-5 shadow-xl space-y-3">
                    <div className="w-9 h-9 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-indigo-400 font-bold border border-indigo-500/20">
                        📅
                    </div>
                    <div>
                        <h3 className="text-xl font-black text-white">1,570 EGP</h3>
                        <span className="text-[11px] text-slate-400 block mt-0.5">This Month</span>
                        <span className="text-[10px] text-slate-500 block mt-1">2 subscriptions</span>
                    </div>
                </div>

                {/* Saved Total Card */}
                <div className="bg-[#111522] border border-slate-800/80 rounded-3xl p-5 shadow-xl space-y-3">
                    <div className="w-9 h-9 rounded-2xl bg-amber-500/10 flex items-center justify-center text-amber-400 font-bold border border-amber-500/20">
                        💰
                    </div>
                    <div>
                        <h3 className="text-xl font-black text-white">340 EGP</h3>
                        <span className="text-[11px] text-slate-400 block mt-0.5">Saved Total</span>
                        <span className="text-[10px] text-slate-500 block mt-1">vs individual sessions</span>
                    </div>
                </div>

                {/* Active Plan Card */}
                <div className="bg-[#111522] border border-slate-800/80 rounded-3xl p-5 shadow-xl space-y-3">
                    <div className="w-9 h-9 rounded-2xl bg-amber-400/10 flex items-center justify-center text-amber-400 font-bold border border-amber-400/20">
                        ★
                    </div>
                    <div>
                        <h3 className="text-xl font-black text-white">Pro Plan</h3>
                        <span className="text-[11px] text-slate-400 block mt-0.5">Active Plan</span>
                        <span className="text-[10px] text-cyan-400 block mt-1">Renews Aug 1</span>
                    </div>
                </div>

            </div>

            {/* Navigation Tabs */}
            <div className="flex gap-2 bg-[#111522] p-1.5 rounded-2xl border border-slate-800/80 w-fit">
                {(['Plans', 'Wallet', 'History', 'Invoices'] as const).map((tab) => {
                    const isActive = activeTab === tab;
                    return (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-5 py-2 rounded-xl text-xs font-bold transition-all ${isActive
                                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                                : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                                }`}
                        >
                            {tab}
                        </button>
                    );
                })}
            </div>

            {/* Tab Content 1: Plans & Subscriptions */}
            {activeTab === 'Plans' && (
                <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                        {/* Basic Plan */}
                        <motion.div
                            whileHover={{ scale: 1.01 }}
                            onClick={() => setSelectedPlan('Basic')}
                            className={`cursor-pointer bg-[#111522] border rounded-3xl p-6 space-y-6 relative transition-all ${selectedPlan === 'Basic' ? 'border-cyan-400 ring-1 ring-cyan-400/40 shadow-2xl bg-[#141a29]' : 'border-slate-800/80'
                                }`}
                        >
                            <div className="w-10 h-10 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-indigo-400 border border-indigo-500/20">
                                <FiStar />
                            </div>
                            <div>
                                <h3 className="text-base font-bold text-white">Basic</h3>
                                <div className="mt-2 flex items-baseline gap-1">
                                    <span className="text-3xl font-black text-white">350</span>
                                    <span className="text-xs text-slate-400">EGP / month</span>
                                </div>
                            </div>
                            <div className="space-y-3 text-xs text-slate-300 pt-2 border-t border-slate-800/80">
                                <div className="flex items-center gap-2">✓ 4 sessions/month</div>
                                <div className="flex items-center gap-2">✓ 1 subject</div>
                                <div className="flex items-center gap-2">✓ Video recordings</div>
                                <div className="flex items-center gap-2">✓ Homework access</div>
                            </div>
                        </motion.div>

                        {/* Pro Plan (Most Popular) */}
                        <motion.div
                            whileHover={{ scale: 1.01 }}
                            onClick={() => setSelectedPlan('Pro')}
                            className={`cursor-pointer bg-[#111522] border rounded-3xl p-6 space-y-6 relative transition-all ${selectedPlan === 'Pro' ? 'border-cyan-400 ring-1 ring-cyan-400/40 shadow-2xl bg-[#141a29]' : 'border-slate-800/80'
                                }`}
                        >
                            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-cyan-400 text-slate-950 font-bold text-[10px] px-3 py-1 rounded-full uppercase tracking-wider shadow-md">
                                Most Popular
                            </div>
                            <div className="w-10 h-10 rounded-2xl bg-cyan-500/10 flex items-center justify-center text-cyan-400 border border-cyan-500/20">
                                ⚡
                            </div>
                            <div>
                                <h3 className="text-base font-bold text-white">Pro</h3>
                                <div className="mt-2 flex items-baseline gap-1">
                                    <span className="text-3xl font-black text-white">750</span>
                                    <span className="text-xs text-slate-400">EGP / month</span>
                                </div>
                            </div>
                            <div className="space-y-3 text-xs text-slate-300 pt-2 border-t border-slate-800/80">
                                <div className="flex items-center gap-2">✓ 8 sessions/month</div>
                                <div className="flex items-center gap-2">✓ All subjects</div>
                                <div className="flex items-center gap-2">✓ Live Q&A sessions</div>
                                <div className="flex items-center gap-2">✓ Exam prep materials</div>
                                <div className="flex items-center gap-2">✓ Priority scheduling</div>
                            </div>
                        </motion.div>

                        {/* Elite Plan */}
                        <motion.div
                            whileHover={{ scale: 1.01 }}
                            onClick={() => setSelectedPlan('Elite')}
                            className={`cursor-pointer bg-[#111522] border rounded-3xl p-6 space-y-6 relative transition-all ${selectedPlan === 'Elite' ? 'border-cyan-400 ring-1 ring-cyan-400/40 shadow-2xl bg-[#141a29]' : 'border-slate-800/80'
                                }`}
                        >
                            <div className="w-10 h-10 rounded-2xl bg-amber-500/10 flex items-center justify-center text-amber-400 border border-amber-500/20">
                                👑
                            </div>
                            <div>
                                <h3 className="text-base font-bold text-white">Elite</h3>
                                <div className="mt-2 flex items-baseline gap-1">
                                    <span className="text-3xl font-black text-white">1400</span>
                                    <span className="text-xs text-slate-400">EGP / month</span>
                                </div>
                            </div>
                            <div className="space-y-3 text-xs text-slate-300 pt-2 border-t border-slate-800/80">
                                <div className="flex items-center gap-2">✓ Unlimited sessions</div>
                                <div className="flex items-center gap-2">✓ All subjects</div>
                                <div className="flex items-center gap-2">✓ Dedicated teacher</div>
                                <div className="flex items-center gap-2">✓ Parent portal</div>
                                <div className="flex items-center gap-2">✓ 1-on-1 attention</div>
                                <div className="flex items-center gap-2">✓ Guaranteed results</div>
                            </div>
                        </motion.div>

                    </div>

                    {/* Payment Method & Order Summary Section */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

                        {/* Payment Methods Selection */}
                        <div className="lg:col-span-2 bg-[#111522] border border-slate-800/80 rounded-3xl p-6 space-y-6">
                            <h3 className="text-base font-bold text-white">Payment Method</h3>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {[
                                    { name: 'Visa / Mastercard', desc: 'Secure card payment', icon: '💳' },
                                    { name: 'Apple Pay', desc: 'Instant via Face ID', icon: '' },
                                    { name: 'Google Pay', desc: 'Pay via Google account', icon: '🔵' },
                                    { name: 'Wallet', desc: `${walletBalance} EGP available`, icon: '🛡️' },
                                ].map((pay, idx) => {
                                    const isSelected = paymentMethod === pay.name;
                                    return (
                                        <div
                                            key={idx}
                                            onClick={() => setPaymentMethod(pay.name)}
                                            className={`cursor-pointer p-4 rounded-2xl border flex items-center justify-between transition-all ${isSelected ? 'bg-[#151a28] border-cyan-400 ring-1 ring-cyan-400/40 shadow-lg' : 'bg-[#151a28]/50 border-slate-800 hover:border-slate-700'
                                                }`}
                                        >
                                            <div className="flex items-center gap-3">
                                                <span className="text-xl">{pay.icon}</span>
                                                <div>
                                                    <h4 className="font-bold text-white text-xs">{pay.name}</h4>
                                                    <p className="text-[10px] text-slate-400">{pay.desc}</p>
                                                </div>
                                            </div>
                                            <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${isSelected ? 'border-cyan-400 bg-cyan-400/20' : 'border-slate-700'}`}>
                                                {isSelected && <div className="w-2 h-2 bg-cyan-400 rounded-full" />}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Conditional Inputs for Visa */}
                            {paymentMethod === 'Visa / Mastercard' && (
                                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4 pt-2">
                                    <input type="text" placeholder="4242 4242 4242 4242" className="w-full bg-[#151a28] border border-slate-800 rounded-xl p-3 text-xs text-white outline-none focus:border-indigo-500" />
                                    <div className="grid grid-cols-2 gap-4">
                                        <input type="text" placeholder="12/27" className="w-full bg-[#151a28] border border-slate-800 rounded-xl p-3 text-xs text-white outline-none focus:border-indigo-500" />
                                        <input type="password" placeholder="..." className="w-full bg-[#151a28] border border-slate-800 rounded-xl p-3 text-xs text-white outline-none focus:border-indigo-500" />
                                    </div>
                                    <input type="text" placeholder="Ahmed Hassan" className="w-full bg-[#151a28] border border-slate-800 rounded-xl p-3 text-xs text-white outline-none focus:border-indigo-500" />
                                </motion.div>
                            )}
                        </div>

                        {/* Order Summary Box */}
                        <div className="bg-[#111522] border border-slate-800/80 rounded-3xl p-6 shadow-2xl space-y-6">
                            <h3 className="text-sm font-bold text-white">Order Summary</h3>

                            <div className="bg-[#151a28] border border-slate-800 rounded-2xl p-4 space-y-1">
                                <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold">⚡ {selectedPlan} Plan</div>
                                <p className="text-[10px] text-slate-400">Monthly subscription</p>
                            </div>

                            <div className="space-y-3 text-xs">
                                <div className="flex justify-between"><span className="text-slate-400">Subtotal</span><span className="font-bold text-white">{selectedPlan === 'Basic' ? 350 : selectedPlan === 'Pro' ? 750 : 1400} EGP</span></div>
                                <div className="flex justify-between"><span className="text-slate-400">First month discount</span><span className="font-bold text-emerald-400">-50 EGP</span></div>
                            </div>

                            <div className="pt-4 border-t border-slate-800 flex justify-between items-center">
                                <span className="text-xs font-bold text-white">Total</span>
                                <span className="text-xl font-black text-cyan-400">
                                    {selectedPlan === 'Basic' ? 300 : selectedPlan === 'Pro' ? 700 : 1350} EGP
                                </span>
                            </div>

                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={handleSubscribe}
                                className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-400 to-indigo-600 text-slate-950 font-black text-xs shadow-lg shadow-cyan-500/20 hover:opacity-90 transition"
                            >
                                🔒 Subscribe Now
                            </motion.button>

                            <div className="text-center text-[10px] text-slate-500">
                                Secured · Cancel anytime · No hidden fees
                            </div>
                        </div>

                    </div>
                </div>
            )}

            {/* Tab Content 2: Wallet */}
            {activeTab === 'Wallet' && (
                <div className="space-y-6">
                    <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-400 rounded-3xl p-8 text-white relative overflow-hidden shadow-2xl">
                        <div className="relative z-10 space-y-4">
                            <span className="text-xs uppercase tracking-widest bg-black/20 px-3 py-1 rounded-full w-fit block font-bold">EduPlex Wallet</span>
                            <div>
                                <h2 className="text-4xl font-black">{walletBalance} EGP</h2>
                                <p className="text-xs text-white/80 mt-1">Last topped up: Jul 10, 2025</p>
                            </div>
                        </div>
                        <div className="absolute right-6 bottom-6 text-6xl opacity-20">💳</div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-2 bg-[#111522] border border-slate-800/80 rounded-3xl p-6 space-y-4">
                            <h3 className="text-base font-bold text-white">Top Up Wallet</h3>
                            <div className="grid grid-cols-4 gap-3">
                                {['200 EGP', '500 EGP', '1000 EGP', '2000 EGP'].map((amt, i) => {
                                    const num = amt.split(' ')[0];
                                    const isSelected = topUpAmount === num;
                                    return (
                                        <button
                                            key={i}
                                            onClick={() => setTopUpAmount(num)}
                                            className={`p-3 rounded-2xl border text-xs font-bold transition ${isSelected ? 'bg-indigo-600 border-indigo-400 text-white shadow-lg' : 'bg-[#151a28] border-slate-800 text-slate-300 hover:border-slate-700'}`}
                                        >
                                            {amt}
                                        </button>
                                    );
                                })}
                            </div>
                            <div className="flex gap-4">
                                <input
                                    type="text"
                                    value={topUpAmount}
                                    onChange={(e) => setTopUpAmount(e.target.value)}
                                    placeholder="Enter amount..."
                                    className="flex-1 bg-[#151a28] border border-slate-800 rounded-2xl p-3 text-xs text-white outline-none focus:border-indigo-500"
                                />
                                <button
                                    onClick={handleTopUp}
                                    className="px-6 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-lg shadow-indigo-600/30 transition"
                                >
                                    Add Funds
                                </button>
                            </div>
                        </div>

                        <div className="bg-[#111522] border border-slate-800/80 rounded-3xl p-6 space-y-4">
                            <h3 className="text-sm font-bold text-white">Wallet Benefits</h3>
                            <div className="space-y-3 text-xs text-slate-300">
                                <div className="flex gap-2">⚡ <b>Instant payments:</b> No card needed</div>
                                <div className="flex gap-2">🎁 <b>5% cashback:</b> On all top-ups</div>
                                <div className="flex gap-2">🛡️ <b>Secure balance:</b> Safe & encrypted</div>
                                <div className="flex gap-2">🌙 <b>Auto-renew:</b> Never miss a session</div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Tab Content 3: History */}
            {activeTab === 'History' && (
                <div className="bg-[#111522] border border-slate-800/80 rounded-3xl p-6 space-y-6">
                    <div className="flex flex-col sm:flex-row justify-between gap-4 items-center">
                        <h3 className="text-base font-bold text-white">Transaction History</h3>
                        <div className="flex gap-3 w-full sm:w-auto">
                            <div className="relative flex-1 sm:w-64">
                                <FiSearch className="absolute left-3 top-3 text-slate-500" />
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Search transactions..."
                                    className="w-full bg-[#151a28] border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white outline-none focus:border-indigo-500"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs">
                            <thead>
                                <tr className="border-b border-slate-800 text-slate-500 uppercase tracking-wider">
                                    <th className="pb-3 font-bold">Transaction ID</th>
                                    <th className="pb-3 font-bold">Description</th>
                                    <th className="pb-3 font-bold">Amount</th>
                                    <th className="pb-3 font-bold">Date</th>
                                    <th className="pb-3 font-bold">Method</th>
                                    <th className="pb-3 font-bold">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-800/60">
                                {transactions
                                    .filter(t => t.desc.toLowerCase().includes(searchQuery.toLowerCase()))
                                    .map((tx, idx) => (
                                        <tr key={idx} className="hover:bg-slate-800/20 transition">
                                            <td className="py-4 font-mono text-cyan-400">{tx.id}</td>
                                            <td className="py-4 font-bold text-white">{tx.desc}</td>
                                            <td className="py-4 font-black text-white">{tx.amount}</td>
                                            <td className="py-4 text-slate-400">{tx.date}</td>
                                            <td className="py-4 text-slate-300">{tx.method}</td>
                                            <td className="py-4">
                                                <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${tx.status === 'Paid' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'}`}>
                                                    {tx.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* Tab Content 4: Invoices */}
            {activeTab === 'Invoices' && (
                <div className="bg-[#111522] border border-slate-800/80 rounded-3xl p-6 space-y-4">
                    <h3 className="text-base font-bold text-white">Invoices</h3>
                    <div className="space-y-3">
                        {invoices.map((inv, idx) => (
                            <div key={idx} className="bg-[#151a28] border border-slate-800/80 rounded-2xl p-4 flex items-center justify-between gap-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-400"><FiFileText /></div>
                                    <div>
                                        <h4 className="font-bold text-white text-xs">{inv.title}</h4>
                                        <p className="text-[10px] text-slate-400">{inv.details}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">Paid</span>
                                    <button onClick={() => alert(`Downloading ${inv.title}...`)} className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold flex items-center gap-1.5 transition">
                                        <FiDownload /> PDF
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

        </div>
    );
}