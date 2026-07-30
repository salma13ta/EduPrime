"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
    {
        q: "How do I find the right teacher?",
        a: "You can filter teachers by subject, price, ratings, and availability. Watch their intro videos or book a trial session.",
    },
    {
        q: "Can I cancel my subscription anytime?",
        a: "Yes, you can cancel or change your plan at any time directly from your account dashboard with zero penalties.",
    },
    {
        q: "Are the certificates recognized?",
        a: "Yes! EduPrime certificates are verified on the blockchain and recognized by top educational partner institutions.",
    },
    {
        q: "How does the online exam system work?",
        a: "Exams are proctored automatically using secure AI monitoring, providing instant feedback and grading breakdown.",
    },
    {
        q: "What payment methods do you accept?",
        a: "We accept all major credit/debit cards, PayPal, Apple Pay, and Google Pay securely through Stripe.",
    },
];

export default function FAQSection() {
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    return (
        <section className="mx-auto max-w-3xl px-4 py-20 sm:px-6 lg:px-8">
            <h2 className="text-gray-600 mb-12 text-center text-3xl font-black sm:text-4xl">
                Frequently Asked <span className="text-purple-400">Questions</span>
            </h2>

            <div className="space-y-4 text-left">
                {faqs.map((faq, index) => (
                    <div key={faq.q} className="overflow-hidden rounded-2xl border border-white/10 bg-[#131625]/80 transition-all">
                        <button
                            onClick={() => setOpenFaq(openFaq === index ? null : index)}
                            className="flex w-full items-center justify-between p-5 text-left text-sm font-bold text-white transition-colors hover:text-purple-400"
                        >
                            <span>{faq.q}</span>
                            <ChevronDown className={`h-4 w-4 text-gray-400 transition-transform ${openFaq === index ? "rotate-180" : ""}`} />
                        </button>
                        <AnimatePresence>
                            {openFaq === index && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="border-t border-white/5 px-5 pb-5 pt-3 text-xs leading-relaxed text-gray-400"
                                >
                                    {faq.a}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                ))}
            </div>
        </section>
    );
}
