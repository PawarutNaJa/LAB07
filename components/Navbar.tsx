'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';

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
    <header className="sticky top-0 z-50 w-full border-b border-zinc-200/90 bg-white/85 backdrop-blur-md transition-colors">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <div className="flex items-center gap-6 lg:gap-8">
          <Link
            href="/"
            className="group flex items-center gap-2.5 transition"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-950 text-xs font-black tracking-tighter text-white shadow-sm transition group-hover:scale-105">
              MB
            </span>
            <span className="font-mono text-sm font-bold tracking-wider text-zinc-950">
              MYBLOG<span className="text-zinc-400">.</span>
            </span>
          </Link>

          {/* Navigation links - Desktop */}
          <nav className="hidden lg:flex items-center gap-1">
            {primaryLinks.map((link) => {
              const isActive = pathname === link.href;

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`rounded-full px-3 py-1.5 text-xs font-medium transition-all duration-150 ${
                    isActive
                      ? 'bg-zinc-950 text-white shadow-xs'
                      : 'text-zinc-600 hover:bg-zinc-100 hover:text-zinc-950'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Action Buttons & Mobile Toggle */}
        <div className="flex items-center gap-2">
          <Link
            href="/login"
            className="inline-flex items-center justify-center rounded-full border border-zinc-200 bg-white px-3.5 py-1.5 text-xs font-semibold text-zinc-800 shadow-xs transition hover:border-zinc-300 hover:bg-zinc-50"
          >
            เข้าสู่ระบบ
          </Link>

          <button
            type="button"
            onClick={handleLogout}
            disabled={!loggedIn && !loading}
            className={`inline-flex items-center justify-center rounded-full px-3.5 py-1.5 text-xs font-semibold transition ${
              loggedIn
                ? 'bg-zinc-950 text-white shadow-xs hover:bg-zinc-800 cursor-pointer'
                : 'cursor-not-allowed bg-zinc-100 text-zinc-400'
            } ${loading ? 'opacity-70' : ''}`}
          >
            ออกจากระบบ
          </button>

          {/* Mobile hamburger button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-zinc-200 text-zinc-700 hover:bg-zinc-100 lg:hidden"
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
        <div className="border-t border-zinc-200 bg-white px-4 py-3 lg:hidden">
          <nav className="flex flex-col gap-1">
            {primaryLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`rounded-lg px-3 py-2 text-sm font-medium ${
                    isActive
                      ? 'bg-zinc-950 text-white'
                      : 'text-zinc-700 hover:bg-zinc-100'
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
  );
}

