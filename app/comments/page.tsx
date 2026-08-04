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
    <main className="min-h-screen bg-slate-100 px-4 py-10">
      <div className="mx-auto max-w-4xl">
        <section className="mb-8 overflow-hidden rounded-2xl bg-white shadow-lg">
          <div className="bg-gradient-to-r from-blue-800 to-indigo-800 px-7 py-8 text-white">
            <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-blue-200">
              Blog Aggregator Workshop
            </p>

            <h1 className="text-3xl font-bold md:text-4xl">
              การพัฒนา Web Application ด้วย Next.js
            </h1>

            <p className="mt-4 max-w-3xl leading-7 text-blue-100">
              หน้านี้เป็นตัวอย่างระบบความคิดเห็น
              ผู้ใช้งานต้องเข้าสู่ระบบก่อนจึงจะเปิดหน้าและส่งความคิดเห็นได้
            </p>
          </div>

          <div className="grid gap-4 border-t border-slate-200 p-6 text-sm text-slate-600 md:grid-cols-3">
            <div className="rounded-xl bg-slate-50 p-4">
              <p className="font-semibold text-slate-800">
                Controlled Form
              </p>
              <p className="mt-1">
                ควบคุมค่าด้วย useState
              </p>
            </div>

            <div className="rounded-xl bg-slate-50 p-4">
              <p className="font-semibold text-slate-800">
                POST API
              </p>
              <p className="mt-1">
                ส่งข้อมูลไปยัง Server จริง
              </p>
            </div>

            <div className="rounded-xl bg-slate-50 p-4">
              <p className="font-semibold text-slate-800">
                Authentication
              </p>
              <p className="mt-1">
                ป้องกันหน้าด้วย Cookie
              </p>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <CommentForm
            postId={POST_ID}
            onCommentAdded={loadComments}
          />
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-lg">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">
                ความคิดเห็นทั้งหมด
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                ความคิดเห็นล่าสุดจะแสดงอยู่ด้านบน
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="rounded-full bg-blue-100 px-4 py-2 font-semibold text-blue-700">
                {comments.length} ความคิดเห็น
              </span>

              <button
                type="button"
                onClick={loadComments}
                disabled={loading}
                className="rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
              >
                โหลดใหม่
              </button>
            </div>
          </div>

          {loading && (
            <div className="rounded-xl bg-slate-50 p-5 text-center text-slate-500">
              กำลังโหลดความคิดเห็น...
            </div>
          )}

          {error && (
            <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-red-700">
              {error}
            </div>
          )}

          {!loading &&
            !error &&
            comments.length === 0 && (
              <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center">
                <p className="text-lg font-semibold text-slate-700">
                  ยังไม่มีความคิดเห็น
                </p>

                <p className="mt-1 text-slate-500">
                  เริ่มแสดงความคิดเห็นเป็นคนแรกได้เลย
                </p>
              </div>
            )}

          {!loading &&
            comments.length > 0 && (
              <div className="space-y-4">
                {comments.map((comment) => (
                  <article
                    key={comment.id}
                    className="rounded-2xl border border-slate-200 bg-white p-5 transition hover:-translate-y-0.5 hover:shadow-md"
                  >
                    <div className="mb-4 flex flex-wrap items-start justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-xl font-bold text-blue-700">
                          {comment.name
                            .charAt(0)
                            .toUpperCase()}
                        </div>

                        <div>
                          <h3 className="font-bold text-slate-900">
                            {comment.name}
                          </h3>

                          <p className="text-sm text-slate-500">
                            {comment.email}
                          </p>
                        </div>
                      </div>

                      <time className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-500">
                        {new Date(
                          comment.createdAt
                        ).toLocaleString(
                          'th-TH'
                        )}
                      </time>
                    </div>

                    <div className="rounded-xl bg-slate-50 p-4">
                      <p className="whitespace-pre-wrap leading-7 text-slate-700">
                        {comment.content}
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            )}
        </section>
      </div>
    </main>
  );
}