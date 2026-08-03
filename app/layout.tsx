import type { Metadata } from 'next';
import './globals.css';
import AppShell from './components/AppShell';

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
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
