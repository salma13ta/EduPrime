import type { Metadata } from 'next';
import './globals.css';
import HeroBackground from './component/HeroBackground';
import Header from './components/Header';

export const metadata: Metadata = {
  title: 'EDUPRIME - منصة التعليم الذكية',
  description: 'منصة تعليمية متكاملة',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" dir="ltr">
      <body className="text-white min-h-screen relative antialiased selection:bg-purple-500 selection:text-white overflow-x-hidden">
        {/* 🌟 الخلفية التفاعلية لجميع صفحات المشروع */}
        <div className="fixed inset-0 z-0 pointer-events-none">
          <HeroBackground />
        </div>

        {/* شريط التنقل الثابت */}
        <Header />

        {/* محتوى الصفحات المتغير (children) */}
        <div className="relative z-10 pt-20">
          {children}
        </div>
      </body>
    </html>
  );
}
