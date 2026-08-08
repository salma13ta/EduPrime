'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function Revenue() {
  return (
    <div className="space-y-6">
      <div className="bg-[#12161F] p-6 rounded-2xl border border-gray-800/80 shadow-xl">
        <h2 className="text-xl font-black text-white mb-2">Revenue & Financial Analytics</h2>
        <p className="text-xs text-gray-400 mb-6">Detailed breakdown of incoming cash flows and operational costs.</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="p-4 rounded-xl bg-gray-900/40 border border-gray-800">
            <span className="text-xs text-gray-400">Net Profit</span>
            <h3 className="text-xl font-bold text-emerald-400 mt-1">$39,000</h3>
          </div>
          <div className="p-4 rounded-xl bg-gray-900/40 border border-gray-800">
            <span className="text-xs text-gray-400">Total Invoiced</span>
            <h3 className="text-xl font-bold text-purple-400 mt-1">$73,000</h3>
          </div>
          <div className="p-4 rounded-xl bg-gray-900/40 border border-gray-800">
            <span className="text-xs text-gray-400">Pending Payments</span>
            <h3 className="text-xl font-bold text-amber-400 mt-1">$4,200</h3>
          </div>
        </div>
      </div>
    </div>
  );
}