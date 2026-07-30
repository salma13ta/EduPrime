"use client";

import { motion } from "framer-motion";

const BRANDS = [
  "Stanford",
  "Oxford",
  "MIT",
  "Apple",
  "Amazon",
  "UNESCO",
  "Coursera",
  "Microsoft",
  "Google",
  "Harvard",
];

export default function TrustedBrandsSection() {
  return (
    <section className="py-12 border-y border-white/5 bg-white/[0.01] overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
        <p className="mb-8 text-xs font-semibold uppercase tracking-widest text-gray-500">
          Trusted by students at
        </p>

        {/* الشريط المتحرك */}
        <div className="relative flex w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          <motion.div
            className="flex flex-nowrap items-center gap-12 shrink-0 pr-12"
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              ease: "linear",
              duration: 20, // غير الرقم ده لو عايزه أسرع أو أبطأ
              repeat: Infinity,
            }}
          >
            {/* القائمة المزدوجة لضمان استمرارية الدوران (Infinite Loop) */}
            {[...BRANDS, ...BRANDS].map((brand, idx) => (
              <span
                key={idx}
                className="cursor-default text-base font-bold text-gray-400 opacity-60 transition-all hover:opacity-100 hover:text-white sm:text-xl whitespace-nowrap"
              >
                {brand}
              </span>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}