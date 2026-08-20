'use client';

import { useState } from 'react';

export default function WarmupPage() {
  const [text, setText] = useState('');

  return (
    <div className="mx-auto max-w-xl space-y-8">
      <section className="rounded-3xl border border-zinc-200/90 bg-white p-8 shadow-[0_10px_30px_-15px_rgba(0,0,0,0.05)]">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-zinc-200 bg-zinc-100/80 px-3 py-0.5 text-xs font-semibold text-zinc-700">
            <span className="h-1.5 w-1.5 rounded-full bg-zinc-900" />
            React State Playground
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-zinc-950">
            ทดลอง Controlled Input
          </h1>
          <p className="text-xs sm:text-sm text-zinc-500">
            ทดสอบการผูก state แบบ Two-way data binding ด้วย React useState
          </p>
        </div>

        <div className="mt-8 space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-zinc-600 mb-2">
              พิมพ์ข้อความทดสอบ
            </label>
            <input
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="ลองพิมพ์ข้อความที่นี่..."
              className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-900 outline-none transition focus:border-zinc-900 focus:ring-2 focus:ring-zinc-200"
            />
          </div>

          <div className="rounded-2xl border border-zinc-100 bg-zinc-50/80 p-5">
            <p className="text-xs font-bold uppercase tracking-wider text-zinc-500">
              ข้อความที่ได้จาก State:
            </p>
            <p className="mt-2 text-base font-semibold text-zinc-900">
              {text ? text : <span className="text-zinc-400 font-normal">ยังไม่ได้พิมพ์ข้อความ...</span>}
            </p>
            <p className="mt-2 text-xs font-mono text-zinc-400">
              ความยาว: {text.length} ตัวอักษร
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}