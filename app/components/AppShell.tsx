'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import HeroBackground from '@/app/component/HeroBackground';
import Header from './Header';

export default function AppShell({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const syncAuthState = () => {
            if (typeof window === 'undefined') return;

            try {
                const stored = localStorage.getItem('eduprime_user');
                setIsAuthenticated(Boolean(stored));
            } catch {
                setIsAuthenticated(false);
            }
        };

        syncAuthState();

        window.addEventListener('storage', syncAuthState);
        window.addEventListener('focus', syncAuthState);
        return () => {
            window.removeEventListener('storage', syncAuthState);
            window.removeEventListener('focus', syncAuthState);
        };
    }, [pathname]);

    const authRoutes = ['/login', '/register'];
    const protectedRoutes = ['/student', '/teacher', '/parent', '/admin'];
    const shouldShowHeader = !authRoutes.includes(pathname) && !protectedRoutes.some((route) => pathname.startsWith(route));
    const contentPadding = shouldShowHeader ? 'pt-16 sm:pt-20' : 'pt-0';

    return (
        <>
            <div className="fixed inset-0 z-0 pointer-events-none">
                <HeroBackground />
            </div>

            {shouldShowHeader ? <Header /> : null}

            <div className={`relative z-10 ${contentPadding}`}>
                {children}
            </div>
        </>
    );
}
