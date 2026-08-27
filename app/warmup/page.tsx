'use client';

import { useState } from 'react';

export default function WarmupPage() {
  const [text, setText] = useState('');

  return (
    <div className="mx-auto max-w-xl space-y-8">
      <section className="rounded-3xl border border-zinc-200/90 dark:border-zinc-800/90 bg-white/60 dark:bg-zinc-900/60 backdrop-blur-xl p-8 shadow-[0_10px_30px_-15px_rgba(0,0,0,0.05)]">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-zinc-200 dark:border-zinc-800 bg-zinc-100/80 dark:bg-zinc-800/80 px-3 py-0.5 text-xs font-semibold text-zinc-700 dark:text-zinc-300">
            <span className="h-1.5 w-1.5 rounded-full bg-zinc-900 dark:bg-zinc-100" />
            React State Playground
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-zinc-950 dark:text-zinc-50">
            ทดลอง Controlled Input
          </h1>
          <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 dark:text-zinc-500">
            ทดสอบการผูก state แบบ Two-way data binding ด้วย React useState
          </p>
        </div>

        <div className="mt-8 space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-zinc-600 dark:text-zinc-400 dark:text-zinc-500 mb-2">
              พิมพ์ข้อความทดสอบ
            </label>
            <input
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="ลองพิมพ์ข้อความที่นี่..."
              className="w-full rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white/60 dark:bg-zinc-900/60 backdrop-blur-xl px-4 py-3 text-sm text-zinc-900 dark:text-zinc-100 outline-none transition focus:border-zinc-900 focus:ring-2 focus:ring-zinc-200"
            />
          </div>

          <div className="rounded-2xl border border-zinc-100 dark:border-zinc-800 bg-zinc-50/80 dark:bg-zinc-900/80 p-5">
            <p className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 dark:text-zinc-500">
              ข้อความที่ได้จาก State:
            </p>
            <p className="mt-2 text-base font-semibold text-zinc-900 dark:text-zinc-100">
              {text ? text : <span className="text-zinc-400 dark:text-zinc-500 font-normal">ยังไม่ได้พิมพ์ข้อความ...</span>}
            </p>
            <p className="mt-2 text-xs font-mono text-zinc-400 dark:text-zinc-500">
              ความยาว: {text.length} ตัวอักษร
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
