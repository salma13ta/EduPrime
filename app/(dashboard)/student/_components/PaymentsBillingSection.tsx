'use client';

import React, { useState, useEffect } from 'react';
import { 
    ShieldCheck, Lock, CreditCard, 
    Calendar, CheckCircle2, Clock, AlertCircle, 
    ChevronRight, X, Download, Sparkles, ArrowUpRight, Check, Loader2 
} from 'lucide-react';

interface PaymentItem {
    id: string;
    title: string;
    amount: number;
    date: string;
    status: 'paid' | 'pending' | 'review';
    invoiceNumber: string;
    method?: string;
}

const initialPaymentsData: PaymentItem[] = [
    { id: '1', title: 'Advanced Mathematics - Term 1', amount: 450, date: '2026-01-15', status: 'paid', invoiceNumber: 'INV-2026-001', method: 'Visa ending in 4242' },
    { id: '2', title: 'Physics & Mechanics - Lab Fee', amount: 200, date: '2026-02-10', status: 'paid', invoiceNumber: 'INV-2026-042', method: 'Mastercard ending in 8812' },
    { id: '3', title: 'Computer Science - React Masterclass', amount: 350, date: '2026-03-01', status: 'review', invoiceNumber: 'INV-2026-089', method: 'Bank Transfer' },
    { id: '4', title: 'Advanced Mathematics - Term 2 (Next)', amount: 450, date: '2026-04-15', status: 'pending', invoiceNumber: 'INV-2026-110' },
];

export default function PaymentsBillingSection() {
    const [payments, setPayments] = useState<PaymentItem[]>(initialPaymentsData);
    const [selectedInvoice, setSelectedInvoice] = useState<PaymentItem | null>(null);
    const [displayPaid, setDisplayPaid] = useState(0);
    const [displayRemaining, setDisplayRemaining] = useState(0);

    // تفاعلات الدفع الجديدة
    const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
    const [activeInvoiceToPay, setActiveInvoiceToPay] = useState<PaymentItem | null>(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [paymentSuccess, setPaymentSuccess] = useState(false);

    // Counter Animation on mount
    useEffect(() => {
        let startPaid = 0;
        const targetPaid = 650;
        let startRemaining = 0;
        const targetRemaining = 450;

        const duration = 1000;
        const steps = 30;
        const incrementPaid = targetPaid / steps;
        const incrementRemaining = targetRemaining / steps;
        const stepTime = duration / steps;

        const timer = setInterval(() => {
            startPaid += incrementPaid;
            startRemaining += incrementRemaining;
            if (startPaid >= targetPaid) {
                setDisplayPaid(targetPaid);
                setDisplayRemaining(targetRemaining);
                clearInterval(timer);
            } else {
                setDisplayPaid(Math.floor(startPaid));
                setDisplayRemaining(Math.floor(startRemaining));
            }
        }, stepTime);

        return () => clearInterval(timer);
    }, []);

    // دالة بدء عملية الدفع عند الضغط على Pay Now
    const handleInitiatePayment = (invoice: PaymentItem) => {
        setActiveInvoiceToPay(invoice);
        setIsProcessing(false);
        setPaymentSuccess(false);
        setIsCheckoutModalOpen(true);
        setSelectedInvoice(null); // غلق السلايدر الجانبي إن كان مفتوحاً
    };

    // دالة تنفيذ الدفع الوهمي (تفاعل حركي)
    const handleConfirmPayment = () => {
        setIsProcessing(true);
        setTimeout(() => {
            setIsProcessing(false);
            setPaymentSuccess(true);

            // تحديث حالة الفاتورة محلياً لتصبح مدفوعة Paid
            if (activeInvoiceToPay) {
                setPayments(prev => prev.map(item => 
                    item.id === activeInvoiceToPay.id ? { ...item, status: 'paid', method: 'Credit Card (Instant)' } : item
                ));
                setDisplayPaid(curr => curr + activeInvoiceToPay.amount);
                setDisplayRemaining(curr => Math.max(0, curr - activeInvoiceToPay.amount));
            }

            // إغلاق النافذة تلقائياً بعد ثانيتين
            setTimeout(() => {
                setIsCheckoutModalOpen(false);
                setPaymentSuccess(false);
            }, 2000);
        }, 1500);
    };

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            {/* Header & Secure Trust Signal */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#110f1e] border border-white/10 p-6 rounded-3xl shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />
                <div>
                    <h2 className="text-xl font-bold text-white flex items-center gap-2">
                        <span>Payments & Billing</span>
                        <span className="px-2.5 py-0.5 bg-purple-600/20 text-purple-400 text-[10px] rounded-full border border-purple-500/30">
                            Secure Portal
                        </span>
                    </h2>
                    <p className="text-xs text-gray-400 mt-1">Manage your tuition fees, view billing timelines, and download official academic invoices.</p>
                </div>
                <div className="flex items-center gap-2 bg-[#171426] border border-white/10 px-4 py-2.5 rounded-2xl shadow-inner">
                    <div className="w-8 h-8 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                        <Lock className="w-4 h-4" />
                    </div>
                    <div>
                        <p className="text-[10px] font-bold text-white flex items-center gap-1">
                            Secure Checkout <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                        </p>
                        <p className="text-[9px] text-gray-400">256-bit Bank Grade Encryption</p>
                    </div>
                </div>
            </div>

            {/* Smart Payment Alert */}
            <div className="bg-gradient-to-r from-purple-900/40 via-[#161326] to-[#110f1e] border border-purple-500/30 p-4 md:p-5 rounded-2xl shadow-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="flex items-center gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-purple-600/30 border border-purple-500/40 flex items-center justify-center text-purple-300 flex-shrink-0 animate-pulse">
                        <Sparkles className="w-5 h-5" />
                    </div>
                    <div>
                        <h4 className="text-xs font-bold text-white">Smart Early-Bird Discount Alert</h4>
                        <p className="text-xs text-purple-200 mt-0.5">
                            Based on your academic progress, you can pay your upcoming installment before <span className="underline font-bold">April 10, 2026</span> to receive a special 15% discount on your next course.
                        </p>
                    </div>
                </div>
                <button 
                    onClick={() => handleInitiatePayment(payments[3])}
                    className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold rounded-xl transition-all cursor-pointer shadow-lg shadow-purple-600/30 flex items-center gap-1.5 flex-shrink-0 hover:scale-105 active:scale-95"
                >
                    <span>Pay Installment Now</span>
                    <ArrowUpRight className="w-4 h-4" />
                </button>
            </div>

            {/* Finance Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-[#110f1e] border border-white/10 p-5 rounded-3xl shadow-lg relative overflow-hidden group hover:border-purple-500/40 transition-all">
                    <p className="text-xs text-gray-400 font-medium">Total Paid Amount</p>
                    <div className="mt-3 flex items-baseline gap-2">
                        <h3 className="text-3xl font-black text-[#d8b4fe] drop-shadow-[0_0_15px_rgba(216,180,254,0.4)]">
                            ${displayPaid}
                        </h3>
                        <span className="text-[10px] text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                            +100% Verified
                        </span>
                    </div>
                    <p className="text-[10px] text-gray-400 mt-2">Paid successfully across semesters</p>
                </div>

                <div className="bg-[#110f1e] border border-white/10 p-5 rounded-3xl shadow-lg relative overflow-hidden group hover:border-purple-500/40 transition-all">
                    <p className="text-xs text-gray-400 font-medium">Remaining Balance</p>
                    <div className="mt-3 flex items-baseline gap-2">
                        <h3 className="text-3xl font-black text-amber-200">
                            ${displayRemaining}
                        </h3>
                        <span className="text-[10px] text-amber-400 font-bold bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20">
                            Pending Due
                        </span>
                    </div>
                    <p className="text-[10px] text-gray-400 mt-2">Due on next scheduled invoice term</p>
                </div>

                <div className="bg-[#110f1e] border border-white/10 p-5 rounded-3xl shadow-lg relative overflow-hidden group hover:border-purple-500/40 transition-all">
                    <p className="text-xs text-gray-400 font-medium">Next Installment Date</p>
                    <div className="mt-3 flex items-baseline gap-2">
                        <h3 className="text-xl font-bold text-white">
                            April 15, 2026
                        </h3>
                    </div>
                    <p className="text-[10px] text-purple-400 mt-2 flex items-center gap-1 font-medium">
                        <Calendar className="w-3 h-3" /> Term 2 Final Milestone
                    </p>
                </div>
            </div>

            {/* Timeline Payment */}
            <div className="bg-[#110f1e] border border-white/10 p-6 rounded-3xl shadow-xl">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-sm font-bold text-white flex items-center gap-2">
                        <CreditCard className="w-4 h-4 text-purple-400" />
                        <span>Timeline Payment Flow</span>
                    </h3>
                    <span className="text-xs text-gray-400">Click any transaction for invoice details</span>
                </div>

                <div className="relative border-r md:border-r-0 md:border-t border-white/10 pt-4 md:pt-6 space-y-4 md:space-y-0 grid grid-cols-1 md:grid-cols-4 gap-4">
                    {payments.map((item) => {
                        const isPaid = item.status === 'paid';
                        const isReview = item.status === 'review';
                        
                        return (
                            <div 
                                key={item.id}
                                onClick={() => setSelectedInvoice(item)}
                                className={`bg-[#171426] border p-4 rounded-2xl cursor-pointer transition-all duration-200 hover:scale-[1.02] hover:bg-purple-600/10 relative group ${
                                    isPaid ? 'border-purple-500/30' : isReview ? 'border-amber-500/30' : 'border-white/10 border-dashed'
                                }`}
                            >
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-[10px] text-gray-400 font-mono">{item.invoiceNumber}</span>
                                    <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                                        isPaid ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' :
                                        isReview ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' :
                                        'bg-purple-600/20 text-purple-300 border border-purple-500/30'
                                    }`}>
                                        {isPaid ? <CheckCircle2 className="w-3.5 h-3.5" /> : isReview ? <Clock className="w-3.5 h-3.5" /> : <AlertCircle className="w-3.5 h-3.5" />}
                                    </span>
                                </div>
                                <h4 className="text-xs font-bold text-white truncate mb-1">{item.title}</h4>
                                <div className="flex items-center justify-between mt-3 pt-2 border-t border-white/5">
                                    <span className={`text-sm font-black ${isPaid ? 'text-[#d8b4fe]' : 'text-gray-300'}`}>
                                        ${item.amount}
                                    </span>
                                    <span className="text-[10px] text-gray-400 flex items-center gap-1 group-hover:text-purple-400 transition-colors">
                                        Details <ChevronRight className="w-3 h-3" />
                                    </span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Slide-in Drawer for Invoice Details */}
            {selectedInvoice && (
                <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex justify-end animate-in fade-in duration-200">
                    <div className="w-full max-w-md bg-[#141223] border-l border-white/15 h-full p-6 flex flex-col justify-between shadow-2xl animate-in slide-in-from-right duration-300">
                        <div className="space-y-6">
                            <div className="flex items-center justify-between pb-4 border-b border-white/10">
                                <div>
                                    <span className="text-[10px] font-mono text-purple-400 uppercase tracking-widest">Invoice Details</span>
                                    <h3 className="text-base font-bold text-white mt-0.5">{selectedInvoice.invoiceNumber}</h3>
                                </div>
                                <button 
                                    onClick={() => setSelectedInvoice(null)}
                                    className="p-2 text-gray-400 hover:text-white bg-white/5 rounded-xl cursor-pointer transition-all hover:bg-white/10"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </div>

                            <div className="space-y-4 text-xs">
                                <div className="bg-[#0f0d19] p-4 rounded-2xl border border-white/5 space-y-3">
                                    <div className="flex justify-between">
                                        <span className="text-gray-400">Item Description:</span>
                                        <span className="text-white font-bold text-right">{selectedInvoice.title}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-400">Scheduled Date:</span>
                                        <span className="text-white font-mono">{selectedInvoice.date}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-400">Payment Status:</span>
                                        <span className={`font-bold capitalize ${
                                            selectedInvoice.status === 'paid' ? 'text-emerald-400' :
                                            selectedInvoice.status === 'review' ? 'text-amber-400' : 'text-purple-400'
                                        }`}>
                                            {selectedInvoice.status === 'paid' ? 'Paid & Verified' : selectedInvoice.status === 'review' ? 'Under Review' : 'Pending Payment'}
                                        </span>
                                    </div>
                                    {selectedInvoice.method && (
                                        <div className="flex justify-between">
                                            <span className="text-gray-400">Payment Method:</span>
                                            <span className="text-gray-200">{selectedInvoice.method}</span>
                                        </div>
                                    )}
                                </div>

                                <div className="bg-purple-600/10 border border-purple-500/20 p-4 rounded-2xl flex items-center justify-between">
                                    <div>
                                        <p className="text-[10px] text-gray-400">Total Amount Due</p>
                                        <p className="text-lg font-black text-white">${selectedInvoice.amount}</p>
                                    </div>
                                    <div className="flex items-center gap-1 text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-lg border border-emerald-500/20">
                                        <ShieldCheck className="w-3.5 h-3.5" /> Secure
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="pt-4 border-t border-white/10 flex gap-3">
                            <button
                                onClick={() => {
                                    alert(`Downloading invoice ${selectedInvoice.invoiceNumber}...`);
                                }}
                                className="flex-1 py-3 bg-[#1c1930] hover:bg-purple-600/20 text-white font-bold rounded-xl text-xs transition-all cursor-pointer border border-white/10 flex items-center justify-center gap-2"
                            >
                                <Download className="w-4 h-4 text-purple-400" />
                                <span>Download PDF</span>
                            </button>
                            {selectedInvoice.status !== 'paid' && (
                                <button
                                    onClick={() => handleInitiatePayment(selectedInvoice)}
                                    className="flex-1 py-3 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-xl text-xs transition-all cursor-pointer shadow-lg shadow-purple-600/30 flex items-center justify-center gap-1.5"
                                >
                                    <Lock className="w-3.5 h-3.5" />
                                    <span>Pay Now</span>
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* نافذة إتمام الدفع التفاعلية (Checkout Modal) */}
            {isCheckoutModalOpen && activeInvoiceToPay && (
                <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
                    <div className="w-full max-w-md bg-[#141223] border border-white/15 rounded-3xl p-6 shadow-2xl relative animate-in zoom-in-95 duration-200">
                        <button 
                            onClick={() => !isProcessing && setIsCheckoutModalOpen(false)}
                            className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white bg-white/5 rounded-xl cursor-pointer transition-all"
                        >
                            <X className="w-4 h-4" />
                        </button>

                        <div className="text-center space-y-3 mb-6">
                            <div className="w-12 h-12 rounded-2xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center mx-auto text-purple-300">
                                <Lock className="w-6 h-6" />
                            </div>
                            <h3 className="text-lg font-bold text-white">Complete Secure Checkout</h3>
                            <p className="text-xs text-gray-400">You are paying for: <span className="text-white font-semibold">{activeInvoiceToPay.title}</span></p>
                        </div>

                        {paymentSuccess ? (
                            <div className="bg-emerald-500/10 border border-emerald-500/30 p-6 rounded-2xl text-center space-y-3 animate-in fade-in">
                                <div className="w-12 h-12 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/30">
                                    <Check className="w-6 h-6" />
                                </div>
                                <h4 className="text-sm font-bold text-emerald-300">Payment Successful!</h4>
                                <p className="text-xs text-gray-300">Your invoice <span className="font-mono text-white">{activeInvoiceToPay.invoiceNumber}</span> has been processed and verified securely.</p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                <div className="bg-[#0f0d19] p-4 rounded-2xl border border-white/5 space-y-3 text-xs">
                                    <div className="flex justify-between">
                                        <span className="text-gray-400">Invoice Ref:</span>
                                        <span className="font-mono text-white">{activeInvoiceToPay.invoiceNumber}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-400">Amount to Pay:</span>
                                        <span className="font-black text-purple-300 text-sm">${activeInvoiceToPay.amount}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-400">Payment Method:</span>
                                        <span className="text-white">Default Card (**** 4242)</span>
                                    </div>
                                </div>

                                <button
                                    onClick={handleConfirmPayment}
                                    disabled={isProcessing}
                                    className="w-full py-3.5 bg-purple-600 hover:bg-purple-500 disabled:opacity-50 text-white font-bold rounded-xl text-xs transition-all cursor-pointer shadow-lg shadow-purple-600/30 flex items-center justify-center gap-2"
                                >
                                    {isProcessing ? (
                                        <>
                                            <Loader2 className="w-4 h-4 animate-spin" />
                                            <span>Processing Secure Payment...</span>
                                        </>
                                    ) : (
                                        <>
                                            <ShieldCheck className="w-4 h-4 text-emerald-300" />
                                            <span>Confirm & Pay ${activeInvoiceToPay.amount}</span>
                                        </>
                                    )}
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}