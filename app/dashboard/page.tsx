'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
}

export default function DashboardPage() {
  const router = useRouter();
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  async function handleLogout() {
    try {
      await fetch('/api/logout', {
        method: 'POST',
      });
    } catch {
      // ignore
    }

    router.replace('/login');
    router.refresh();
  }

  async function loadMessages() {
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/contact', {
        method: 'GET',
        cache: 'no-store',
      });

      if (!res.ok) {
        throw new Error('โหลดข้อมูลไม่สำเร็จ');
      }

      const data = await res.json();

      setMessages(data.messages ?? []);
    } catch {
      setError('ไม่สามารถโหลดข้อความได้');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadMessages();
  }, []);

  return (
    <div className="space-y-8">
      {/* Dashboard Top Header */}
      <section className="relative overflow-hidden rounded-3xl border border-zinc-200/90 bg-white p-8 sm:p-12 shadow-[0_10px_30px_-15px_rgba(0,0,0,0.05)]">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 rounded-full border border-zinc-200 bg-zinc-100/80 px-3 py-0.5 text-xs font-semibold text-zinc-700">
              <span className="h-1.5 w-1.5 rounded-full bg-zinc-900" />
              Administrator Control Panel
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-950">
              Admin Dashboard
            </h1>
            <p className="text-xs sm:text-sm text-zinc-500">
              กล่องข้อความและรายการติดต่อจากผู้ใช้งานที่บันทึกในฐานข้อมูล
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              type="button"
              onClick={loadMessages}
              disabled={loading}
              className="inline-flex items-center justify-center rounded-xl border border-zinc-200 bg-white px-4 py-2 text-xs font-semibold text-zinc-800 shadow-xs transition hover:bg-zinc-50 disabled:opacity-50 cursor-pointer"
            >
              ↻ โหลดข้อมูลใหม่
            </button>
            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex items-center justify-center rounded-xl bg-zinc-950 px-4 py-2 text-xs font-semibold text-white shadow-xs transition hover:bg-zinc-800 cursor-pointer"
            >
              ออกจากระบบ
            </button>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="mt-8 grid gap-4 border-t border-zinc-100 pt-6 sm:grid-cols-3">
          <div className="rounded-2xl border border-zinc-100 bg-zinc-50/80 p-5">
            <p className="text-xs font-bold uppercase tracking-wider text-zinc-500">
              จำนวนข้อความทั้งหมด
            </p>
            <p className="mt-2 font-mono text-3xl font-black text-zinc-950">
              {messages.length}
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-100 bg-zinc-50/80 p-5">
            <p className="text-xs font-bold uppercase tracking-wider text-zinc-500">
              สถานะฐานข้อมูล
            </p>
            <div className="mt-2 flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
              <span className="font-semibold text-zinc-900 text-sm">Prisma ORM Connected</span>
            </div>
          </div>

          <div className="rounded-2xl border border-zinc-100 bg-zinc-50/80 p-5">
            <p className="text-xs font-bold uppercase tracking-wider text-zinc-500">
              ระบบรักษาความปลอดภัย
            </p>
            <div className="mt-2 flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-zinc-900" />
              <span className="font-semibold text-zinc-900 text-sm">HTTP-Only Cookie Session</span>
            </div>
          </div>
        </div>
      </section>

      {/* Messages Feed */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-zinc-950">
            รายการข้อความล่าสุด (Recent Messages)
          </h2>
          <span className="font-mono text-xs text-zinc-400">
            TOTAL: {messages.length}
          </span>
        </div>

        {loading && (
          <div className="rounded-3xl border border-zinc-200/80 bg-white p-12 text-center shadow-xs">
            <div className="mx-auto mb-3 h-7 w-7 animate-spin rounded-full border-3 border-zinc-200 border-t-zinc-900" />
            <p className="text-xs font-semibold text-zinc-500">กำลังโหลดรายการข้อความ...</p>
          </div>
        )}

        {error && (
          <div className="rounded-3xl border border-red-200 bg-red-50 p-6 text-center text-xs font-semibold text-red-700">
            {error}
          </div>
        )}

        {!loading && !error && messages.length === 0 && (
          <div className="rounded-3xl border border-dashed border-zinc-200 bg-white p-12 text-center shadow-xs">
            <p className="text-sm font-semibold text-zinc-800">
              ยังไม่มีข้อความส่งเข้ามาในระบบ
            </p>
            <p className="mt-1 text-xs text-zinc-500">
              เมื่อมีผู้ใช้กรอกแบบฟอร์มติดต่อ ข้อมูลจะปรากฏที่นี่แบบเรียลไทม์
            </p>
          </div>
        )}

        {!loading && messages.length > 0 && (
          <div className="space-y-4">
            {messages.map((item) => (
              <article
                key={item.id}
                className="rounded-3xl border border-zinc-200/80 bg-white p-6 sm:p-8 shadow-xs transition hover:border-zinc-300"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-100 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-950 text-xs font-bold text-white">
                      {item.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h3 className="font-bold text-zinc-950 text-sm">
                        {item.name}
                      </h3>
                      <p className="font-mono text-xs text-zinc-500">
                        {item.email}
                      </p>
                    </div>
                  </div>

                  <time className="font-mono text-xs text-zinc-400">
                    {new Date(item.createdAt).toLocaleString('th-TH')}
                  </time>
                </div>

                <div className="mt-4 rounded-2xl border border-zinc-100 bg-zinc-50/70 p-5 text-sm leading-relaxed text-zinc-700 whitespace-pre-line">
                  {item.message}
                </div>

                <div className="mt-4 flex items-center justify-between text-[11px] font-mono text-zinc-400">
                  <span>ID: {item.id}</span>
                  <span className="rounded-md border border-zinc-200 bg-white px-2 py-0.5 text-zinc-600">
                    STATUS: RECEIVED
                  </span>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}