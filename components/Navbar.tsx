'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { motion, useScroll, useSpring } from 'framer-motion';
import { ThemeToggle } from '@/components/ThemeToggle';

const primaryLinks = [
  { href: '/', label: 'หน้าแรก' },
  { href: '/posts', label: 'บทความ' },
  { href: '/users', label: 'ผู้ใช้งาน' },
  { href: '/blog-spa', label: 'SPA Feed' },
  { href: '/courses', label: 'รายวิชา' },
  { href: '/about', label: 'เกี่ยวกับเรา' },
  { href: '/contact', label: 'ติดต่อเรา' },
  { href: '/dashboard', label: 'Dashboard' },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  async function fetchSession() {
    try {
      const res = await fetch('/api/session', {
        method: 'GET',
        cache: 'no-store',
      });

      if (!res.ok) {
        throw new Error('ไม่สามารถอ่านสถานะเซสชัน');
      }

      const data = await res.json();
      setLoggedIn(Boolean(data.loggedIn));
    } catch {
      setLoggedIn(false);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchSession();
    setMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleVisibility = () => {
      if (document.visibilityState === 'visible') {
        fetchSession();
      }
    };

    document.addEventListener('visibilitychange', handleVisibility);
    window.addEventListener('focus', handleVisibility);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibility);
      window.removeEventListener('focus', handleVisibility);
    };
  }, []);

  async function handleLogout() {
    try {
      await fetch('/api/logout', {
        method: 'POST',
      });
    } catch {
      // ignore
    }

    setLoggedIn(false);
    router.push('/');
    router.refresh();
  }

  return (
    <div className="sticky top-4 z-50 px-4">
      <header className="relative mx-auto max-w-6xl rounded-full border border-white/60 dark:border-zinc-800/60 border-b-zinc-200/50 bg-white/60 dark:bg-zinc-900/60 backdrop-blur-xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.08)] transition-all overflow-hidden">
        {/* Scroll Progress Bar */}
        <motion.div 
          className="absolute top-0 left-0 right-0 h-[2px] bg-zinc-950 dark:bg-zinc-100 origin-left z-50"
          style={{ scaleX }}
        />
        
        <div className="flex items-center justify-between px-4 py-2.5 sm:px-6">
        {/* Brand Logo */}
        <div className="flex items-center gap-6 lg:gap-8">
          <Link
            href="/"
            className="group flex items-center gap-2.5 transition"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-950 dark:bg-zinc-100 text-xs font-black tracking-tighter text-white dark:text-zinc-950 shadow-sm transition group-hover:scale-105">
              MB
            </span>
            <span className="font-mono text-sm font-bold tracking-wider text-zinc-950 dark:text-zinc-50">
              MYBLOG<span className="text-zinc-400 dark:text-zinc-500">.</span>
            </span>
          </Link>

        {/* Navigation links - Desktop */}
        <nav className="hidden lg:flex items-center gap-1 relative">
          {primaryLinks.map((link) => {
            const isActive = pathname === link.href;

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative rounded-full px-3 py-1.5 text-xs font-medium transition-colors duration-200 ${
                  isActive ? 'text-white dark:text-zinc-950' : 'text-zinc-600 dark:text-zinc-400 dark:text-zinc-500 hover:text-zinc-950 dark:text-zinc-50'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="active-nav"
                    className="absolute inset-0 bg-zinc-950 dark:bg-zinc-100 rounded-full shadow-xs"
                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                    style={{ zIndex: -1 }}
                  />
                )}
                {link.label}
              </Link>
            );
          })}
        </nav>
        </div>

        {/* Action Buttons & Mobile Toggle */}
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Link
            href="/login"
            className="inline-flex items-center justify-center rounded-full border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 dark:bg-zinc-100 px-3.5 py-1.5 text-xs font-semibold text-zinc-800 dark:text-zinc-200 dark:text-zinc-200 shadow-xs transition hover:border-zinc-300 dark:hover:border-zinc-600 dark:hover:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800 dark:bg-zinc-100 dark:hover:bg-zinc-900 dark:bg-zinc-100"
          >
            เข้าสู่ระบบ
          </Link>

          <button
            type="button"
            onClick={handleLogout}
            disabled={!loggedIn && !loading}
            className={`inline-flex items-center justify-center rounded-full px-3.5 py-1.5 text-xs font-semibold transition ${
              loggedIn
                ? 'bg-zinc-950 dark:bg-zinc-100 text-white dark:text-zinc-950 shadow-xs hover:bg-zinc-800 dark:hover:bg-zinc-200 cursor-pointer'
                : 'cursor-not-allowed bg-zinc-100 dark:bg-zinc-800 text-zinc-400 dark:text-zinc-500'
            } ${loading ? 'opacity-70' : ''}`}
          >
            ออกจากระบบ
          </button>

          {/* Mobile hamburger button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 dark:bg-zinc-800 lg:hidden"
            aria-label="Toggle menu"
          >
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {mobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile navigation drawer */}
      {mobileMenuOpen && (
        <div className="mx-auto mt-2 max-w-6xl overflow-hidden rounded-2xl border border-white/60 dark:border-zinc-800/60 bg-white/60 dark:bg-zinc-900/60 px-4 py-3 backdrop-blur-xl lg:hidden shadow-lg">
          <nav className="flex flex-col gap-1">
            {primaryLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`rounded-lg px-3 py-2 text-sm font-medium ${
                    isActive
                      ? 'bg-zinc-950 dark:bg-zinc-100 text-white dark:text-zinc-950'
                      : 'text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 dark:bg-zinc-800'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>
      )}
      </header>
    </div>
  );
}

