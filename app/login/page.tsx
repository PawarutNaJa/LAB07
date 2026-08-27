'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import TextReveal from '@/components/TextReveal';

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (!res.ok) {
        setError('อีเมลหรือรหัสผ่านไม่ถูกต้อง');
        setLoading(false);
        return;
      }

      router.replace('/dashboard');
      router.refresh();
    } catch {
      setError('เกิดข้อผิดพลาดในการเชื่อมต่อ');
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-[75vh] items-center justify-center px-4 py-8">
      <div className="w-full max-w-md overflow-hidden rounded-3xl border border-zinc-200/90 dark:border-zinc-800/90 bg-white/60 dark:bg-zinc-900/60 backdrop-blur-xl shadow-[0_10px_30px_-15px_rgba(0,0,0,0.05)]">
        {/* Header */}
        <div className="bg-zinc-950 dark:bg-zinc-100 px-8 py-8 text-white dark:text-zinc-950">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-zinc-800/80 px-3 py-0.5 text-xs font-semibold text-zinc-300">
            <span className="h-1.5 w-1.5 rounded-full bg-zinc-400" />
            Security & Authentication
          </div>
          <TextReveal 
            text="เข้าสู่ระบบ (Sign In)"
            className="mt-4 text-2xl sm:text-3xl font-extrabold tracking-tight"
            as="h1"
          />
          <p className="mt-1.5 text-xs text-zinc-400 dark:text-zinc-500">
            ใช้บัญชีแอดมินเพื่อเข้าสู่ Dashboard และจัดการข้อมูล
          </p>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="space-y-5 p-8">
          <div>
            <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
              อีเมลบัญชีผู้ใช้
            </label>
            <input
              type="email"
              placeholder="admin@example.com"
              className="w-full rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white/60 dark:bg-zinc-900/60 backdrop-blur-xl px-4 py-2.5 text-sm text-zinc-900 dark:text-zinc-100 outline-none transition focus:border-zinc-900 focus:ring-2 focus:ring-zinc-200 hover:border-zinc-400 dark:hover:border-zinc-600"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
              รหัสผ่าน
            </label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white/60 dark:bg-zinc-900/60 backdrop-blur-xl px-4 py-2.5 text-sm text-zinc-900 dark:text-zinc-100 outline-none transition focus:border-zinc-900 focus:ring-2 focus:ring-zinc-200 hover:border-zinc-400 dark:hover:border-zinc-600"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && (
            <div className="rounded-xl border border-red-200 bg-red-50 p-3 text-xs font-semibold text-red-700">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-zinc-950 dark:bg-zinc-100 py-3 text-xs font-bold uppercase tracking-wider text-white dark:text-zinc-950 shadow-sm transition hover:bg-zinc-800 dark:hover:bg-zinc-200 disabled:cursor-not-allowed disabled:bg-zinc-200 disabled:text-zinc-400 dark:text-zinc-500 cursor-pointer active:scale-[0.99]"
          >
            {loading ? 'กำลังเข้าสู่ระบบ...' : 'เข้าสู่ระบบทันที →'}
          </button>

          <div className="border-t border-zinc-100 dark:border-zinc-800 pt-4 text-center">
            <Link
              href="/"
              className="text-xs text-zinc-500 dark:text-zinc-400 dark:text-zinc-500 hover:text-zinc-950 dark:text-zinc-50 hover:underline transition-colors"
            >
              ← กลับสู่หน้าแรก
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
