'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

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
      <div className="w-full max-w-md overflow-hidden rounded-3xl border border-zinc-200/90 bg-white shadow-[0_10px_30px_-15px_rgba(0,0,0,0.05)]">
        {/* Header */}
        <div className="bg-zinc-950 px-8 py-8 text-white">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-zinc-800/80 px-3 py-0.5 text-xs font-semibold text-zinc-300">
            <span className="h-1.5 w-1.5 rounded-full bg-zinc-400" />
            Security & Authentication
          </div>
          <h1 className="mt-4 text-2xl sm:text-3xl font-extrabold tracking-tight">
            เข้าสู่ระบบ (Sign In)
          </h1>
          <p className="mt-1.5 text-xs text-zinc-400">
            ใช้บัญชีแอดมินเพื่อเข้าสู่ Dashboard และจัดการข้อมูล
          </p>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="space-y-5 p-8">
          <div>
            <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-zinc-700">
              อีเมลบัญชีผู้ใช้
            </label>
            <input
              type="email"
              placeholder="admin@example.com"
              className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-2.5 text-sm text-zinc-900 outline-none transition focus:border-zinc-900 focus:ring-2 focus:ring-zinc-200"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-zinc-700">
              รหัสผ่าน
            </label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-2.5 text-sm text-zinc-900 outline-none transition focus:border-zinc-900 focus:ring-2 focus:ring-zinc-200"
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
            className="w-full rounded-xl bg-zinc-950 py-3 text-xs font-bold uppercase tracking-wider text-white shadow-sm transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:bg-zinc-200 disabled:text-zinc-400 cursor-pointer active:scale-[0.99]"
          >
            {loading ? 'กำลังเข้าสู่ระบบ...' : 'เข้าสู่ระบบทันที →'}
          </button>

          <div className="border-t border-zinc-100 pt-4 text-center">
            <Link
              href="/"
              className="text-xs text-zinc-500 hover:text-zinc-950 hover:underline"
            >
              ← กลับสู่หน้าแรก
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}