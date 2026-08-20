'use client';

import {
  useCallback,
  useEffect,
  useState,
} from 'react';

import CommentForm from '@/components/ContactForm';

interface Comment {
  id: string;
  postId: string;
  name: string;
  email: string;
  content: string;
  createdAt: string;
}

const POST_ID = 'blog-post-1';

export default function CommentsPage() {
  const [comments, setComments] =
    useState<Comment[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState('');

  const loadComments =
    useCallback(async () => {
      setLoading(true);
      setError('');

      try {
        const res = await fetch(
          `/api/comments?postId=${encodeURIComponent(
            POST_ID
          )}`,
          {
            cache: 'no-store',
          }
        );

        if (!res.ok) {
          throw new Error(
            'โหลดความคิดเห็นไม่สำเร็จ'
          );
        }

        const data = await res.json();

        setComments(data.comments ?? []);
      } catch {
        setError(
          'ไม่สามารถโหลดความคิดเห็นได้'
        );
      } finally {
        setLoading(false);
      }
    }, []);

  useEffect(() => {
    loadComments();
  }, [loadComments]);

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <section className="relative overflow-hidden rounded-3xl border border-zinc-200/90 bg-white p-8 sm:p-12 shadow-[0_10px_30px_-15px_rgba(0,0,0,0.05)]">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-zinc-200 bg-zinc-100/80 px-3 py-0.5 text-xs font-semibold text-zinc-700">
            <span className="h-1.5 w-1.5 rounded-full bg-zinc-900" />
            Comments & Discussion
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-950">
            ระบบความคิดเห็น (Comments)
          </h1>
          <p className="text-sm sm:text-base text-zinc-500 max-w-2xl">
            ตัวอย่างระบบความคิดเห็นและการส่งข้อมูลผ่าน API แบบเรียลไทม์ เชื่อมต่อกับ Next.js API Routes และ Layered Service
          </p>
        </div>

        <div className="mt-8 grid gap-4 border-t border-zinc-100 pt-6 sm:grid-cols-3">
          <div className="rounded-2xl border border-zinc-100 bg-zinc-50/80 p-4">
            <p className="text-xs font-bold uppercase tracking-wider text-zinc-800">
              Controlled Form
            </p>
            <p className="mt-1 text-xs text-zinc-500">
              จัดการ Input State ด้วย React Hooks
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-100 bg-zinc-50/80 p-4">
            <p className="text-xs font-bold uppercase tracking-wider text-zinc-800">
              RESTful Endpoint
            </p>
            <p className="mt-1 text-xs text-zinc-500">
              ส่งและรับข้อมูลผ่าน JSON API
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-100 bg-zinc-50/80 p-4">
            <p className="text-xs font-bold uppercase tracking-wider text-zinc-800">
              Session Validation
            </p>
            <p className="mt-1 text-xs text-zinc-500">
              ตรวจสอบสิทธิ์การใช้งานผ่าน Cookie
            </p>
          </div>
        </div>
      </section>

      {/* Form and List Grid */}
      <div className="grid gap-8 lg:grid-cols-[1.1fr_1.4fr] lg:items-start">
        <div>
          <CommentForm
            postId={POST_ID}
            onCommentAdded={loadComments}
          />
        </div>

        {/* Comments Feed */}
        <section className="rounded-3xl border border-zinc-200/90 bg-white p-6 sm:p-8 shadow-[0_10px_30px_-15px_rgba(0,0,0,0.05)]">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3 border-b border-zinc-100 pb-4">
            <div>
              <h2 className="text-lg font-bold text-zinc-950">
                ความคิดเห็นทั้งหมด
              </h2>
              <p className="text-xs text-zinc-400">
                แสดงผลเรียงจากใหม่ไปเก่า
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1 font-mono text-xs font-bold text-zinc-800">
                {comments.length} รายการ
              </span>

              <button
                type="button"
                onClick={loadComments}
                disabled={loading}
                className="rounded-xl border border-zinc-200 bg-white px-3 py-1 text-xs font-semibold text-zinc-700 transition hover:bg-zinc-50 disabled:opacity-50 cursor-pointer"
              >
                ↻ โหลดใหม่
              </button>
            </div>
          </div>

          {loading && (
            <div className="rounded-2xl border border-zinc-100 bg-zinc-50 p-6 text-center text-xs text-zinc-500">
              กำลังโหลดข้อมูลความคิดเห็น...
            </div>
          )}

          {error && (
            <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-xs font-semibold text-red-700">
              {error}
            </div>
          )}

          {!loading && !error && comments.length === 0 && (
            <div className="rounded-2xl border border-dashed border-zinc-200 bg-zinc-50/50 p-8 text-center">
              <p className="text-sm font-semibold text-zinc-800">
                ยังไม่มีความคิดเห็นในระบบ
              </p>
              <p className="mt-1 text-xs text-zinc-500">
                เป็นคนแรกที่ส่งความคิดเห็นผ่านฟอร์มด้านข้างได้เลย
              </p>
            </div>
          )}

          {!loading && comments.length > 0 && (
            <div className="space-y-3">
              {comments.map((comment) => (
                <article
                  key={comment.id}
                  className="rounded-2xl border border-zinc-200/80 bg-white p-4 shadow-xs transition hover:border-zinc-300"
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2.5">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-950 text-xs font-bold text-white">
                        {comment.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <h3 className="font-bold text-zinc-900 text-xs">
                          {comment.name}
                        </h3>
                        <p className="text-[11px] text-zinc-400">
                          {comment.email}
                        </p>
                      </div>
                    </div>

                    <time className="font-mono text-[11px] text-zinc-400">
                      {new Date(comment.createdAt).toLocaleString('th-TH')}
                    </time>
                  </div>

                  <div className="mt-3 rounded-xl border border-zinc-100 bg-zinc-50/70 p-3 text-xs leading-relaxed text-zinc-700 whitespace-pre-wrap">
                    {comment.content}
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}