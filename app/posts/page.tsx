// app/posts/page.tsx

import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "บทความทั้งหมด — Modern Minimalist Blog",
  description: "คลังบทความดิจิทัล สถาปัตยกรรมเซิร์ฟเวอร์ และเทคโนโลยีเว็บสมัยใหม่",
};

interface Post {
  id: number;
  title: string;
  body: string;
}

export default async function PostsPage() {
  const res = await fetch(
    "https://jsonplaceholder.typicode.com/posts?_limit=10",
    {
      cache: "no-store",
    }
  );

  const posts: Post[] = await res.json();

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <section className="relative overflow-hidden rounded-3xl border border-zinc-200/90 bg-white p-8 sm:p-12 shadow-[0_10px_30px_-15px_rgba(0,0,0,0.05)]">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-1.5 rounded-full border border-zinc-200 bg-zinc-100/80 px-3 py-0.5 text-xs font-semibold text-zinc-700">
              <span className="h-1.5 w-1.5 rounded-full bg-zinc-900" />
              Articles & Technical Writings
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-950">
              บทความทั้งหมด (All Posts)
            </h1>
            <p className="text-sm sm:text-base text-zinc-500 max-w-xl">
              รวมบทความความรู้ด้านการพัฒนาเว็บ การออกแบบสถาปัตยกรรมซอฟต์แวร์ และประสบการณ์ปฏิบัติการ
            </p>
          </div>

          <div className="flex items-center gap-3 font-mono text-xs text-zinc-500">
            <span className="rounded-full border border-zinc-200 bg-zinc-50 px-3.5 py-1.5 font-bold text-zinc-800">
              {posts.length} ARTICLES
            </span>
          </div>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="grid gap-4 sm:grid-cols-2">
        {posts.map((post: Post) => (
          <Link
            key={post.id}
            href={`/posts/${post.id}`}
            className="group flex flex-col justify-between rounded-2xl border border-zinc-200/80 bg-white p-6 shadow-xs transition-all duration-200 hover:-translate-y-0.5 hover:border-zinc-400 hover:shadow-sm"
          >
            <div>
              <div className="flex items-center justify-between text-xs font-medium text-zinc-400">
                <span className="font-mono text-zinc-500">POST #{post.id}</span>
                <span>อ่าน 3 นาที</span>
              </div>

              <h2 className="mt-3 text-lg font-bold text-zinc-900 group-hover:text-zinc-950 transition capitalize line-clamp-2">
                {post.title}
              </h2>

              <p className="mt-2 text-sm leading-relaxed text-zinc-500 line-clamp-3">
                {post.body}
              </p>
            </div>

            <div className="mt-5 flex items-center justify-between border-t border-zinc-100 pt-4 text-xs font-semibold text-zinc-900">
              <span className="text-zinc-500 font-normal">Next.js & API</span>
              <span className="group-hover:translate-x-0.5 transition-transform">
                อ่านต่อ →
              </span>
            </div>
          </Link>
        ))}
      </section>
    </div>
  );
}