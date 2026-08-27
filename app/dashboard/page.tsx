'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { StaggerContainer, FadeIn, HoverCard } from '@/components/MotionWrappers';
import TextReveal from '@/components/TextReveal';

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
    <StaggerContainer className="space-y-8">
      {/* Dashboard Top Header */}
      <FadeIn>
        <section className="relative overflow-hidden rounded-3xl border border-zinc-200/90 dark:border-zinc-800/90 bg-white/60 dark:bg-zinc-900/60 backdrop-blur-xl p-8 sm:p-12 shadow-[0_10px_30px_-15px_rgba(0,0,0,0.05)]">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 rounded-full border border-zinc-200 dark:border-zinc-800 bg-zinc-100/80 dark:bg-zinc-800/80 px-3 py-0.5 text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                <span className="h-1.5 w-1.5 rounded-full bg-zinc-900 dark:bg-zinc-100" />
                Administrator Control Panel
              </div>
              <TextReveal 
                text="Admin Dashboard"
                className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-950 dark:text-zinc-50"
                as="h1"
              />
              <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 dark:text-zinc-500">
                กล่องข้อความและรายการติดต่อจากผู้ใช้งานที่บันทึกในฐานข้อมูล
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
              <HoverCard>
                <button
                  type="button"
                  onClick={loadMessages}
                  disabled={loading}
                  className="inline-flex items-center justify-center rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white/60 dark:bg-zinc-900/60 backdrop-blur-xl px-4 py-2 text-xs font-semibold text-zinc-800 dark:text-zinc-200 shadow-xs transition hover:bg-zinc-50 dark:hover:bg-zinc-800 dark:bg-zinc-100 disabled:opacity-50 cursor-pointer"
                >
                  ↻ โหลดข้อมูลใหม่
                </button>
              </HoverCard>
              <HoverCard>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="inline-flex items-center justify-center rounded-xl bg-zinc-950 dark:bg-zinc-100 px-4 py-2 text-xs font-semibold text-white dark:text-zinc-950 shadow-xs transition hover:bg-zinc-800 dark:hover:bg-zinc-200 cursor-pointer"
                >
                  ออกจากระบบ
                </button>
              </HoverCard>
            </div>
          </div>

          {/* Metrics Grid */}
          <div className="mt-8 grid gap-4 border-t border-zinc-100 dark:border-zinc-800 pt-6 sm:grid-cols-3">
            <div className="rounded-2xl border border-zinc-100 dark:border-zinc-800 bg-zinc-50/80 dark:bg-zinc-900/80 p-5 transition hover:-translate-y-0.5 hover:shadow-sm">
              <p className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 dark:text-zinc-500">
                จำนวนข้อความทั้งหมด
              </p>
              <p className="mt-2 font-mono text-3xl font-black text-zinc-950 dark:text-zinc-50">
                {messages.length}
              </p>
            </div>

            <div className="rounded-2xl border border-zinc-100 dark:border-zinc-800 bg-zinc-50/80 dark:bg-zinc-900/80 p-5 transition hover:-translate-y-0.5 hover:shadow-sm">
              <p className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 dark:text-zinc-500">
                สถานะฐานข้อมูล
              </p>
              <div className="mt-2 flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
                <span className="font-semibold text-zinc-900 dark:text-zinc-100 text-sm">Prisma ORM Connected</span>
              </div>
            </div>

            <div className="rounded-2xl border border-zinc-100 dark:border-zinc-800 bg-zinc-50/80 dark:bg-zinc-900/80 p-5 transition hover:-translate-y-0.5 hover:shadow-sm">
              <p className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 dark:text-zinc-500">
                ระบบรักษาความปลอดภัย
              </p>
              <div className="mt-2 flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-zinc-900 dark:bg-zinc-100" />
                <span className="font-semibold text-zinc-900 dark:text-zinc-100 text-sm">HTTP-Only Cookie Session</span>
              </div>
            </div>
          </div>
        </section>
      </FadeIn>

      {/* Messages Feed */}
      <section className="space-y-4">
        <FadeIn>
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-zinc-950 dark:text-zinc-50">
              รายการข้อความล่าสุด (Recent Messages)
            </h2>
            <span className="font-mono text-xs text-zinc-400 dark:text-zinc-500">
              TOTAL: {messages.length}
            </span>
          </div>
        </FadeIn>

        {loading && (
          <FadeIn>
            <div className="rounded-3xl border border-zinc-200/80 dark:border-zinc-800/80 bg-white/60 dark:bg-zinc-900/60 backdrop-blur-xl p-12 text-center shadow-xs">
              <div className="mx-auto mb-3 h-7 w-7 animate-spin rounded-full border-3 border-zinc-200 dark:border-zinc-800 border-t-zinc-900" />
              <p className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 dark:text-zinc-500">กำลังโหลดรายการข้อความ...</p>
            </div>
          </FadeIn>
        )}

        {error && (
          <FadeIn>
            <div className="rounded-3xl border border-red-200 bg-red-50 p-6 text-center text-xs font-semibold text-red-700">
              {error}
            </div>
          </FadeIn>
        )}

        {!loading && !error && messages.length === 0 && (
          <FadeIn>
            <div className="rounded-3xl border border-dashed border-zinc-200 dark:border-zinc-800 bg-white/60 dark:bg-zinc-900/60 backdrop-blur-xl p-12 text-center shadow-xs">
              <p className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">
                ยังไม่มีข้อความส่งเข้ามาในระบบ
              </p>
              <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400 dark:text-zinc-500">
                เมื่อมีผู้ใช้กรอกแบบฟอร์มติดต่อ ข้อมูลจะปรากฏที่นี่แบบเรียลไทม์
              </p>
            </div>
          </FadeIn>
        )}

        {!loading && messages.length > 0 && (
          <StaggerContainer className="space-y-4">
            {messages.map((item) => (
              <FadeIn key={item.id}>
                <HoverCard>
                  <article className="rounded-3xl border border-zinc-200/80 dark:border-zinc-800/80 bg-white/60 dark:bg-zinc-900/60 backdrop-blur-xl p-6 sm:p-8 shadow-xs transition hover:border-zinc-300 dark:hover:border-zinc-600">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-100 dark:border-zinc-800 pb-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-950 dark:bg-zinc-100 text-xs font-bold text-white dark:text-zinc-950">
                          {item.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <h3 className="font-bold text-zinc-950 dark:text-zinc-50 text-sm">
                            {item.name}
                          </h3>
                          <p className="font-mono text-xs text-zinc-500 dark:text-zinc-400 dark:text-zinc-500">
                            {item.email}
                          </p>
                        </div>
                      </div>

                      <time className="font-mono text-xs text-zinc-400 dark:text-zinc-500">
                        {new Date(item.createdAt).toLocaleString('th-TH')}
                      </time>
                    </div>

                    <div className="mt-4 rounded-2xl border border-zinc-100 dark:border-zinc-800 bg-zinc-50/70 p-5 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300 whitespace-pre-line">
                      {item.message}
                    </div>

                    <div className="mt-4 flex items-center justify-between text-[11px] font-mono text-zinc-400 dark:text-zinc-500">
                      <span>ID: {item.id}</span>
                      <span className="rounded-md border border-zinc-200 dark:border-zinc-800 bg-white/60 dark:bg-zinc-900/60 backdrop-blur-xl px-2 py-0.5 text-zinc-600 dark:text-zinc-400 dark:text-zinc-500">
                        STATUS: RECEIVED
                      </span>
                    </div>
                  </article>
                </HoverCard>
              </FadeIn>
            ))}
          </StaggerContainer>
        )}
      </section>
    </StaggerContainer>
  );
}
