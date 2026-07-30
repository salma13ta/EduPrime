"use client";

import { CheckCircle2 } from "lucide-react";

const plans = [
    {
        name: "Starter",
        description: "Perfect for individual students",
        price: "$29",
        features: ["5 courses/month", "HD video lessons", "Practice tests", "Email support", "Mobile app"],
        accent: false,
    },
    {
        name: "Pro",
        description: "Most popular for serious learners",
        price: "$79",
        features: [
            "Unlimited courses",
            "4K video lessons",
            "Live sessions (10/mo)",
            "Priority support",
            "AI tutor",
            "Analytics dashboard",
            "Certificates",
        ],
        accent: true,
    },
    {
        name: "Center",
        description: "For learning centers & schools",
        price: "$299",
        features: [
            "Up to 500 students",
            "All Pro features",
            "Custom branding",
            "QR attendance",
            "Admin dashboard",
            "API access",
            "Dedicated manager",
        ],
        accent: false,
    },
];

export default function PricingSection() {
    return (
        <section id="pricing" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
            <h2 className="text-gray-600 text-center text-3xl font-black sm:text-5xl">
                Simple, Transparent <span className="text-purple-400">Pricing</span>
            </h2>
            <p className="mt-2 text-center text-sm text-gray-400">Start free, scale as you grow. Cancel anytime.</p>

            <div className="mt-16 grid grid-cols-1 items-stretch gap-8 text-left md:grid-cols-3">
                {plans.map((plan) => (
                    <div
                        key={plan.name}
                        className={`flex flex-col justify-between rounded-3xl border p-8 ${plan.accent
                                ? "border-2 border-purple-500 bg-[#181c2e] shadow-2xl shadow-purple-600/20"
                                : "border-white/10 bg-[#131625]/80"
                            }`}
                    >
                        {plan.accent && (
                            <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-purple-600 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
                                Most Popular
                            </span>
                        )}
                        <div>
                            <h3 className="text-xl font-bold text-white">{plan.name}</h3>
                            <p className="mt-1 text-xs text-gray-400">{plan.description}</p>
                            <div className="my-6">
                                <span className="text-4xl font-black text-white">{plan.price}</span>
                                <span className="text-xs text-gray-400">/month</span>
                            </div>
                            <ul className="space-y-3 text-xs text-gray-300">
                                {plan.features.map((feature) => (
                                    <li key={feature} className="flex items-center gap-2">
                                        <CheckCircle2 className="h-4 w-4 text-purple-400" /> {feature}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <button className={`mt-8 w-full rounded-xl py-3 text-xs font-semibold transition-all ${plan.accent ? "bg-purple-600 text-white shadow-lg shadow-purple-600/30 hover:bg-purple-500" : "border border-white/10 bg-white/5 text-white hover:bg-white/10"}`}>
                            Get Started
                        </button>
                    </div>
                ))}
            </div>
        </section>
    );
}
