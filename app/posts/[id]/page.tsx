// app/posts/[id]/page.tsx

import Link from "next/link";
import type { Metadata, ResolvingMetadata } from "next";

interface Post {
  id: number;
  title: string;
  body: string;
}

type Props = {
  params: Promise<{
    id: string;
  }>;
};

async function getPost(id: string): Promise<Post> {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${id}`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("ไม่พบบทความ");
  }

  return res.json();
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { id } = await params;
  const post = await getPost(id);

  return {
    title: `${post.title} — Modern Minimalist Blog`,
    description: post.body.slice(0, 160),
  };
}

export default async function PostDetail({
  params,
}: Props) {
  const { id } = await params;
  const post = await getPost(id);

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      {/* Navigation Breadcrumb */}
      <div>
        <Link
          href="/posts"
          className="inline-flex items-center gap-2 text-xs font-semibold text-zinc-500 dark:text-zinc-400 dark:text-zinc-500 transition hover:text-zinc-950 dark:text-zinc-50"
        >
          <span>←</span>
          <span>ย้อนกลับไปหน้ารวมบทความ</span>
        </Link>
      </div>

      {/* Main Article Container */}
      <article className="overflow-hidden rounded-3xl border border-zinc-200/90 dark:border-zinc-800/90 bg-white p-8 sm:p-12 shadow-[0_10px_30px_-15px_rgba(0,0,0,0.05)]">
        <header className="border-b border-zinc-100 dark:border-zinc-800 pb-8">
          <div className="flex flex-wrap items-center gap-3 text-xs font-semibold text-zinc-500 dark:text-zinc-400 dark:text-zinc-500">
            <span className="rounded-md border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-100 px-2.5 py-1 font-mono text-zinc-800 dark:text-zinc-200">
              ARTICLE #{post.id}
            </span>
            <span>•</span>
            <span>หมวดหมู่: Web Development</span>
            <span>•</span>
            <span>เวลาอ่าน 3 นาที</span>
          </div>

          <h1 className="mt-4 text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-zinc-950 dark:text-zinc-50 capitalize leading-[1.25]">
            {post.title}
          </h1>

          <div className="mt-6 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-950 dark:bg-zinc-100 text-xs font-bold text-white dark:text-zinc-950">
              MB
            </div>
            <div>
              <p className="text-xs font-bold text-zinc-900 dark:text-zinc-100">ทีมเขียนบทความ My Blog</p>
              <p className="text-[11px] text-zinc-400 dark:text-zinc-500">Next.js & Software Engineering</p>
            </div>
          </div>
        </header>

        {/* Content Body */}
        <div className="py-8">
          <p className="text-base sm:text-lg leading-relaxed text-zinc-700 dark:text-zinc-300 whitespace-pre-line first-letter:float-left first-letter:mr-3 first-letter:text-5xl first-letter:font-black first-letter:text-zinc-950 dark:text-zinc-50">
            {post.body}
          </p>

          <p className="mt-6 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400 dark:text-zinc-500">
            การพัฒนาเว็บสมัยใหม่จำเป็นต้องคำนึงถึงโครงสร้างแบบแยกส่วน (Modular Architecture), ความปลอดภัยในการเข้าถึงข้อมูล (Type-Safety), และประสิทธิภาพในการเรนเดอร์ (Optimized Server-side Rendering) เพื่อมอบประสบการณ์ที่ดีที่สุดแก่ผู้ใช้งาน
          </p>
        </div>

        {/* Footer Actions */}
        <footer className="border-t border-zinc-100 dark:border-zinc-800 pt-6 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-zinc-100 dark:bg-zinc-800 px-3 py-1 text-xs font-medium text-zinc-700 dark:text-zinc-300">#Nextjs16</span>
            <span className="rounded-full bg-zinc-100 dark:bg-zinc-800 px-3 py-1 text-xs font-medium text-zinc-700 dark:text-zinc-300">#TypeScript</span>
            <span className="rounded-full bg-zinc-100 dark:bg-zinc-800 px-3 py-1 text-xs font-medium text-zinc-700 dark:text-zinc-300">#Prisma</span>
          </div>

          <Link
            href="/posts"
            className="inline-flex items-center justify-center rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white px-4 py-2 text-xs font-semibold text-zinc-800 dark:text-zinc-200 transition hover:bg-zinc-50 dark:hover:bg-zinc-800 dark:bg-zinc-100"
          >
            ดูบทความอื่น ๆ →
          </Link>
        </footer>
      </article>
    </div>
  );
}
