// app/posts/error.tsx
'use client';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorProps) {
  return (
    <div className="flex min-h-[50vh] items-center justify-center p-6 text-center">
      <div className="w-full max-w-md rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-zinc-100 text-2xl text-zinc-900">
          ⚠️
        </div>
        <h2 className="mt-4 text-xl font-bold text-zinc-950">เกิดข้อผิดพลาดในการโหลดข้อมูล</h2>
        <p className="mt-2 text-sm text-zinc-500">{error.message || 'ไม่สามารถติดต่อกับเซิร์ฟเวอร์ได้ในขณะนี้'}</p>
        <div className="mt-6">
          <button
            onClick={(): void => reset()}
            className="inline-flex items-center justify-center rounded-xl bg-zinc-950 px-6 py-2.5 text-xs font-semibold text-white shadow-xs transition hover:bg-zinc-800"
          >
            ลองใหม่อีกครั้ง
          </button>
        </div>
      </div>
    </div>
  );
}