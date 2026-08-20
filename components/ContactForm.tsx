'use client';

import { useState } from 'react';

interface CommentFormProps {
  postId: string;
  onCommentAdded?: () => void;
}

type FormStatus =
  | 'idle'
  | 'sending'
  | 'success'
  | 'error';

export default function CommentForm({
  postId,
  onCommentAdded,
}: CommentFormProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const [status, setStatus] =
    useState<FormStatus>('idle');

  const nameValid = name.trim().length >= 2;

  const emailValid =
    email.includes('@') &&
    email.includes('.') &&
    email.trim().length >= 5;

  const contentValid =
    content.trim().length >= 5 &&
    content.trim().length <= 300;

  const isValid =
    nameValid &&
    emailValid &&
    contentValid;

  function validate() {
    if (!nameValid) {
      return 'กรุณากรอกชื่ออย่างน้อย 2 ตัวอักษร';
    }

    if (!emailValid) {
      return 'กรุณากรอกอีเมลให้ถูกต้อง';
    }

    if (content.trim().length < 5) {
      return 'ข้อความต้องมีอย่างน้อย 5 ตัวอักษร';
    }

    if (content.trim().length > 300) {
      return 'ข้อความต้องไม่เกิน 300 ตัวอักษร';
    }

    return '';
  }

  function resetStatus() {
    setError('');
    setStatus('idle');
  }

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    const validationError = validate();

    if (validationError) {
      setError(validationError);
      setStatus('error');
      return;
    }

    setError('');
    setStatus('sending');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          postId,
          name,
          email,
          message: content,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(
          data.error ?? 'ส่งข้อความไม่สำเร็จ'
        );
        setStatus('error');
        return;
      }

      setStatus('success');
      setName('');
      setEmail('');
      setContent('');

      onCommentAdded?.();
    } catch {
      setError('ไม่สามารถเชื่อมต่อกับ Server ได้');
      setStatus('error');
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="overflow-hidden rounded-3xl border border-zinc-200/90 bg-white shadow-[0_10px_30px_-15px_rgba(0,0,0,0.05)]"
    >
      <div className="bg-zinc-950 px-8 py-7 text-white">
        <div className="inline-flex items-center gap-1.5 rounded-full bg-zinc-800/80 px-3 py-0.5 text-xs font-semibold text-zinc-300">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
          Direct Message / Contact Form
        </div>
        <h2 className="mt-3 text-2xl font-bold tracking-tight">
          ส่งข้อความถึงเรา
        </h2>
        <p className="mt-1 text-xs text-zinc-400">
          กรอกข้อมูลให้ครบถ้วนเพื่อส่งข้อความบันทึกลงระบบฐานข้อมูล
        </p>
      </div>

      <div className="space-y-5 p-8">
        <div>
          <label
            htmlFor="comment-name"
            className="mb-2 block text-xs font-bold uppercase tracking-wider text-zinc-700"
          >
            ชื่อผู้ติดต่อ
          </label>

          <input
            id="comment-name"
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              resetStatus();
            }}
            placeholder="กรอกชื่อของคุณ"
            className={`w-full rounded-xl border bg-white px-4 py-2.5 text-sm text-zinc-900 outline-none transition focus:ring-2 ${
              name.length > 0 && !nameValid
                ? 'border-red-400 focus:border-red-500 focus:ring-red-100'
                : 'border-zinc-200 focus:border-zinc-900 focus:ring-zinc-200'
            }`}
          />

          {name.length > 0 && !nameValid && (
            <p className="mt-1 text-xs text-red-600">
              ชื่อต้องมีอย่างน้อย 2 ตัวอักษร
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="comment-email"
            className="mb-2 block text-xs font-bold uppercase tracking-wider text-zinc-700"
          >
            อีเมล
          </label>

          <input
            id="comment-email"
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              resetStatus();
            }}
            placeholder="example@email.com"
            className={`w-full rounded-xl border bg-white px-4 py-2.5 text-sm text-zinc-900 outline-none transition focus:ring-2 ${
              email.length > 0 && !emailValid
                ? 'border-red-400 focus:border-red-500 focus:ring-red-100'
                : 'border-zinc-200 focus:border-zinc-900 focus:ring-zinc-200'
            }`}
          />

          <div className="mt-1.5 flex items-center justify-between gap-3 text-xs">
            <p className="text-zinc-400">
              อีเมลสำหรับติดต่อกลับ
            </p>

            {email.length > 0 && (
              <span
                className={`font-medium ${
                  emailValid
                    ? 'text-zinc-700'
                    : 'text-red-600'
                }`}
              >
                {emailValid
                  ? '✓ รูปแบบอีเมลถูกต้อง'
                  : '✗ รูปแบบอีเมลไม่ถูกต้อง'}
              </span>
            )}
          </div>
        </div>

        <div>
          <label
            htmlFor="comment-content"
            className="mb-2 block text-xs font-bold uppercase tracking-wider text-zinc-700"
          >
            เนื้อหาข้อความ
          </label>

          <textarea
            id="comment-content"
            value={content}
            onChange={(e) => {
              setContent(e.target.value);
              resetStatus();
            }}
            placeholder="เขียนข้อความหรือข้อเสนอแนะที่ต้องการส่ง..."
            rows={5}
            maxLength={300}
            className={`w-full resize-y rounded-xl border bg-white px-4 py-2.5 text-sm text-zinc-900 outline-none transition focus:ring-2 ${
              content.length > 0 && !contentValid
                ? 'border-red-400 focus:border-red-500 focus:ring-red-100'
                : 'border-zinc-200 focus:border-zinc-900 focus:ring-zinc-200'
            }`}
          />

          <div className="mt-1.5 flex items-center justify-between text-xs text-zinc-400">
            <span>อย่างน้อย 5 ตัวอักษร</span>
            <span className="font-mono">
              {content.length}/300 ตัวอักษร
            </span>
          </div>
        </div>

        {error && (
          <div
            role="alert"
            className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-xs font-semibold text-red-700"
          >
            {error}
          </div>
        )}

        {status === 'success' && (
          <div className="rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-xs font-semibold text-zinc-900">
            ✓ ส่งข้อความสำเร็จแล้ว ข้อความถูกบันทึกเรียบร้อย
          </div>
        )}

        <button
          type="submit"
          disabled={
            !isValid ||
            status === 'sending'
          }
          className={`w-full rounded-xl py-3 text-xs font-bold uppercase tracking-wider text-white transition cursor-pointer ${
            isValid && status !== 'sending'
              ? 'bg-zinc-950 hover:bg-zinc-800 shadow-sm active:scale-[0.99]'
              : 'cursor-not-allowed bg-zinc-200 text-zinc-400'
          }`}
        >
          {status === 'sending'
            ? 'กำลังส่งข้อความ...'
            : 'ส่งข้อความทันที →'}
        </button>
      </div>
    </form>
  );
}