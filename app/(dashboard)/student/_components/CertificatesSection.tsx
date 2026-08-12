'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Award, 
  Calendar, 
  Download, 
  ExternalLink, 
  Search, 
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  X,
  Copy,
  Check
} from 'lucide-react';

interface Certificate {
  id: string;
  title: string;
  issuer: string;
  category: 'Professional' | 'Academic' | 'Online Course';
  dateEarned: string;
  credentialId: string;
  badgeColor: string;
  format: string;
}

const mockCertificates: Certificate[] = [
  {
    id: 'cert-1',
    title: 'AWS Certified Solutions Architect',
    issuer: 'Amazon Web Services',
    category: 'Professional',
    dateEarned: 'May 2026',
    credentialId: 'AWS-SA-883920',
    badgeColor: 'from-amber-500 to-orange-600',
    format: 'Self-paced professional exam'
  },
  {
    id: 'cert-2',
    title: 'Project Management Professional (PMP)',
    issuer: 'Project Management Institute',
    category: 'Professional',
    dateEarned: 'March 2026',
    credentialId: 'PMP-992104',
    badgeColor: 'from-purple-500 to-indigo-600',
    format: 'Industry Standard Certification'
  },
  {
    id: 'cert-3',
    title: 'Post-Graduate Diploma in Data Science',
    issuer: 'Global Tech University',
    category: 'Academic',
    dateEarned: 'January 2026',
    credentialId: 'GTU-DS-4412',
    badgeColor: 'from-cyan-500 to-blue-600',
    format: 'Structured academic module'
  },
  {
    id: 'cert-4',
    title: 'Google Career Certificates - UX Design',
    issuer: 'Coursera / Google',
    category: 'Online Course',
    dateEarned: 'December 2025',
    credentialId: 'GCX-77382-X',
    badgeColor: 'from-emerald-500 to-teal-600',
    format: 'Hands-on projects with employer consortium'
  }
];

const topPlatforms = [
  { name: 'Coursera', bestFor: 'University-backed credentials & tech skills', format: 'Self-paced video courses with graded assignments' },
  { name: 'edX', bestFor: 'MicroBachelors & MicroMasters from top universities', format: 'Structured academic modules' },
  { name: 'LinkedIn Learning', bestFor: 'Career-specific micro-credentials', format: 'Short video modules with badges for your profile' },
  { name: 'Google Career Certificates', bestFor: 'Job-ready IT, Data, and UX skills', format: 'Hands-on projects with employer consortium hiring' }
];

export default function CertificatesSection() {
  const [filter, setFilter] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // States للتحكم في الأزرار التفاعلية
  const [selectedCertToVerify, setSelectedCertToVerify] = useState<Certificate | null>(null);
  const [isCopied, setIsCopied] = useState(false);
  const [downloadingId, setDownloadingId] = useState<string | null>(null);

  const filteredCertificates = mockCertificates.filter(cert => {
    const matchesFilter = filter === 'All' || cert.category === filter;
    const matchesSearch = cert.title.toLowerCase().includes(searchQuery.toLowerCase()) || cert.issuer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleDownload = (cert: Certificate) => {
    setDownloadingId(cert.id);
    setTimeout(() => {
      setDownloadingId(null);
      alert(`تم تحميل شهادة "${cert.title}" بنجاح بصيغة PDF!`);
    }, 1200);
  };

  const handleCopyId = (id: string) => {
    navigator.clipboard.writeText(id);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="w-full space-y-8 font-sans text-white pb-12 relative">
      
      {/* Banner */}
      <motion.div 
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-[#141225] via-[#1b1436] to-[#0e0c1a] p-6 sm:p-8 rounded-[2.5rem] border border-purple-500/25 shadow-2xl relative overflow-hidden"
      >
        <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 space-y-2">
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight">Your Earned Certificates</h2>
          <p className="text-xs sm:text-sm text-gray-400 max-w-xl leading-relaxed">
            Access and manage your professional certifications, academic diplomas, and online course credentials in one secure place.
          </p>
        </div>
      </motion.div>

      {/* Filters & Search */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
          {['All', 'Professional', 'Academic', 'Online Course'].map(category => (
            <button
              key={category}
              onClick={() => setFilter(category)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap border ${
                filter === category 
                  ? 'bg-purple-600 border-purple-400 text-white shadow-md shadow-purple-600/30' 
                  : 'bg-[#12101f] border-white/10 text-gray-400 hover:text-white'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search certificates..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#12101f] border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white focus:outline-none focus:border-purple-500 transition-all"
          />
        </div>
      </div>

      {/* Grid of Certificates */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredCertificates.map((cert, index) => (
          <motion.div
            key={cert.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-[#12101f] border border-white/10 hover:border-purple-500/40 p-6 rounded-[2rem] shadow-xl flex flex-col justify-between space-y-6 relative overflow-hidden group"
          >
            <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${cert.badgeColor}`} />
            
            <div className="space-y-3">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-gray-300 text-[11px] font-bold">
                  {cert.category}
                </span>
                <span className="text-xs text-gray-400 flex items-center gap-1 font-semibold">
                  <Calendar className="w-3.5 h-3.5 text-purple-400" /> {cert.dateEarned}
                </span>
              </div>

              <h3 className="text-base font-black text-white group-hover:text-purple-300 transition-colors">
                {cert.title}
              </h3>
              <p className="text-xs text-purple-400 font-semibold">{cert.issuer}</p>
              <p className="text-[11px] text-gray-400">{cert.format}</p>
            </div>

            <div className="pt-4 border-t border-white/5 flex items-center justify-between flex-wrap gap-3">
              <span className="text-[11px] text-gray-500 font-mono">ID: {cert.credentialId}</span>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => handleDownload(cert)}
                  disabled={downloadingId === cert.id}
                  className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition-all cursor-pointer border border-white/10 disabled:opacity-50" 
                  title="Download PDF"
                >
                  <Download className={`w-3.5 h-3.5 ${downloadingId === cert.id ? 'animate-bounce text-purple-400' : ''}`} />
                </button>
                <button 
                  onClick={() => setSelectedCertToVerify(cert)}
                  className="px-3.5 py-2 rounded-xl bg-purple-600/20 hover:bg-purple-600/30 text-purple-300 border border-purple-500/30 text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <span>Verify</span>
                  <ExternalLink className="w-3 h-3" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Top Platforms Table Section */}
      <div className="bg-[#12101f] border border-white/10 rounded-[2.5rem] p-6 sm:p-8 space-y-6 shadow-xl">
        <div className="space-y-1">
          <h3 className="text-lg font-black text-white flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-purple-400" /> Top Platforms to Earn Certificates
          </h3>
          <p className="text-xs text-gray-400">Recommended platforms and providers for industry-recognized credentials.</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-white/10 text-gray-400">
                <th className="py-3 px-4 font-bold">Platform</th>
                <th className="py-3 px-4 font-bold">Best For</th>
                <th className="py-3 px-4 font-bold">Typical Format</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-gray-300">
              {topPlatforms.map((platform, idx) => (
                <tr key={idx} className="hover:bg-white/5 transition-colors">
                  <td className="py-3.5 px-4 font-extrabold text-white">{platform.name}</td>
                  <td className="py-3.5 px-4 text-purple-300">{platform.bestFor}</td>
                  <td className="py-3.5 px-4 text-gray-400">{platform.format}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Verify Modal النافذة المنبثقة للتحقق من الشهادة */}
      <AnimatePresence>
        {selectedCertToVerify && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-[#141225] border border-purple-500/30 w-full max-w-md rounded-[2rem] p-6 sm:p-8 space-y-6 shadow-2xl relative"
            >
              <button 
                onClick={() => setSelectedCertToVerify(null)}
                className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white flex items-center justify-center transition-all cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="space-y-2">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-4">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-black text-white">Certificate Verified</h3>
                <p className="text-xs text-gray-400">This credential has been officially verified on the blockchain/issuer registry.</p>
              </div>

              <div className="bg-[#0b0a12] p-4 rounded-2xl border border-white/10 space-y-3">
                <div>
                  <span className="text-[10px] text-gray-400 block font-bold">CERTIFICATE TITLE</span>
                  <span className="text-xs font-extrabold text-white">{selectedCertToVerify.title}</span>
                </div>
                <div>
                  <span className="text-[10px] text-gray-400 block font-bold">ISSUING ORGANIZATION</span>
                  <span className="text-xs font-extrabold text-purple-300">{selectedCertToVerify.issuer}</span>
                </div>
                <div>
                  <span className="text-[10px] text-gray-400 block font-bold">ISSUE DATE</span>
                  <span className="text-xs font-extrabold text-gray-300">{selectedCertToVerify.dateEarned}</span>
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-white/5">
                  <div>
                    <span className="text-[10px] text-gray-400 block font-bold">CREDENTIAL ID</span>
                    <span className="text-xs font-mono text-cyan-400">{selectedCertToVerify.credentialId}</span>
                  </div>
                  <button 
                    onClick={() => handleCopyId(selectedCertToVerify.credentialId)}
                    className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition-all cursor-pointer border border-white/10 flex items-center gap-1.5 text-xs font-bold"
                  >
                    {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{isCopied ? 'Copied' : 'Copy ID'}</span>
                  </button>
                </div>
              </div>

              <button
                onClick={() => setSelectedCertToVerify(null)}
                className="w-full py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-extrabold text-xs shadow-lg shadow-purple-600/30 transition-all cursor-pointer"
              >
                Close Verification
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}