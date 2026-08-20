import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'หน้าแรก — Modern Minimalist Blog',
  description: 'บล็อกดิจิทัลและบันทึกสถาปัตยกรรมเซิร์ฟเวอร์ ออกแบบในสไตล์โมเดิร์น ขาว-เทา-ดำ',
};

interface Post {
  id: number;
  title: string;
  body: string;
}

async function getRecentPosts(): Promise<Post[]> {
  try {
    const res = await fetch(
      'https://jsonplaceholder.typicode.com/posts?_limit=3',
      { cache: 'no-store' }
    );
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

export default async function Home() {
  const posts: Post[] = await getRecentPosts();

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl border border-zinc-200/90 bg-white p-8 sm:p-12 shadow-[0_10px_30px_-15px_rgba(0,0,0,0.05)]">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr] lg:items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-zinc-100/80 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-zinc-800">
              <span className="h-1.5 w-1.5 rounded-full bg-zinc-900" />
              Digital Journal & Full-Stack Portal
            </div>

            <h1 className="text-4xl font-extrabold tracking-tight text-zinc-950 sm:text-5xl lg:text-6xl leading-[1.15]">
              สถาปัตยกรรมเว็บ & บล็อกดิจิทัลร่วมสมัย
            </h1>

            <p className="text-base sm:text-lg leading-relaxed text-zinc-600">
              สัมผัสประสบการณ์เว็บยุคใหม่ด้วย <strong>Next.js 16</strong>, สถาปัตยกรรมเซิร์ฟเวอร์แบบ 3 ชั้น (Controller → Service → Model) และการจัดการฐานข้อมูลด้วย <strong>Prisma ORM</strong> ภายใต้ดีไซน์แบบ Minimalist Monochrome ขาว-เทา-ดำ
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3.5 pt-2">
              <Link
                href="/posts"
                className="inline-flex items-center justify-center rounded-xl bg-zinc-950 px-6 py-3 text-sm font-semibold text-white shadow-xs transition hover:bg-zinc-800"
              >
                อ่านบทความทั้งหมด →
              </Link>
              <Link
                href="/blog-spa"
                className="inline-flex items-center justify-center rounded-xl border border-zinc-200 bg-white px-6 py-3 text-sm font-semibold text-zinc-800 shadow-xs transition hover:bg-zinc-50 hover:border-zinc-300"
              >
                SPA Live Feed
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-xl border border-zinc-200 bg-white px-6 py-3 text-sm font-semibold text-zinc-800 shadow-xs transition hover:bg-zinc-50 hover:border-zinc-300"
              >
                ติดต่อเรา
              </Link>
            </div>

            {/* Tech Stack Pills */}
            <div className="border-t border-zinc-100 pt-6 flex flex-wrap items-center gap-2.5 text-xs font-medium text-zinc-500">
              <span className="font-semibold text-zinc-700">Tech Stack:</span>
              <span className="rounded-md border border-zinc-200 bg-zinc-50 px-2.5 py-1 text-zinc-700">Next.js 16</span>
              <span className="rounded-md border border-zinc-200 bg-zinc-50 px-2.5 py-1 text-zinc-700">TypeScript 5</span>
              <span className="rounded-md border border-zinc-200 bg-zinc-50 px-2.5 py-1 text-zinc-700">Prisma ORM</span>
              <span className="rounded-md border border-zinc-200 bg-zinc-50 px-2.5 py-1 text-zinc-700">PostgreSQL</span>
              <span className="rounded-md border border-zinc-200 bg-zinc-50 px-2.5 py-1 text-zinc-700">TailwindCSS 4</span>
            </div>
          </div>

          {/* Recent Posts Side Card */}
          <div className="rounded-2xl border border-zinc-200/80 bg-zinc-50/80 p-6 shadow-inner">
            <div className="flex items-center justify-between border-b border-zinc-200/70 pb-4">
              <h2 className="text-xs font-bold uppercase tracking-widest text-zinc-500">
                บทความล่าสุด
              </h2>
              <Link
                href="/posts"
                className="text-xs font-semibold text-zinc-800 hover:underline"
              >
                ดูทั้งหมด ({posts.length}) →
              </Link>
            </div>

            <div className="mt-4 space-y-3">
              {posts.map((post: Post) => (
                <Link
                  key={post.id}
                  href={`/posts/${post.id}`}
                  className="group block rounded-xl border border-zinc-200/70 bg-white p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-zinc-400 hover:shadow-xs"
                >
                  <div className="flex items-center gap-2 text-[11px] font-medium text-zinc-400">
                    <span className="font-mono text-zinc-500">#{post.id}</span>
                    <span>•</span>
                    <span>เทคโนโลยีเว็บ</span>
                  </div>
                  <h3 className="mt-1 font-semibold text-zinc-900 group-hover:text-zinc-950 transition line-clamp-1 text-sm">
                    {post.title}
                  </h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-zinc-500 line-clamp-2">
                    {post.body}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Feature Highlights Grid */}
      <section className="grid gap-6 sm:grid-cols-3">
        <div className="rounded-3xl border border-zinc-200/80 bg-white p-8 shadow-xs transition hover:border-zinc-300">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-950 text-white font-bold text-xs font-mono">
            01
          </div>
          <h3 className="mt-5 font-bold text-zinc-950 text-base">
            3-Tier Architecture
          </h3>
          <p className="mt-2 text-xs sm:text-sm leading-relaxed text-zinc-500">
            แยกความรับผิดชอบชัดเจนระหว่าง Controller (Routing), Service (Business Logic & Validation) และ Model (Data Layer)
          </p>
        </div>

        <div className="rounded-3xl border border-zinc-200/80 bg-white p-8 shadow-xs transition hover:border-zinc-300">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-950 text-white font-bold text-xs font-mono">
            02
          </div>
          <h3 className="mt-5 font-bold text-zinc-950 text-base">
            Centralized Error Handling
          </h3>
          <p className="mt-2 text-xs sm:text-sm leading-relaxed text-zinc-500">
            Wrapper ดักจับ Error รวมศูนย์และ Custom Error Classes รองรับ HTTP Status Code 400, 404, 500 อย่างแม่นยำ
          </p>
        </div>

        <div className="rounded-3xl border border-zinc-200/80 bg-white p-8 shadow-xs transition hover:border-zinc-300">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-950 text-white font-bold text-xs font-mono">
            03
          </div>
          <h3 className="mt-5 font-bold text-zinc-950 text-base">
            Prisma Database Integration
          </h3>
          <p className="mt-2 text-xs sm:text-sm leading-relaxed text-zinc-500">
            เชื่อมต่อฐานข้อมูลจริงผ่าน Prisma ORM พร้อม Schema Migration, Seeding และการดักจับ Database Constraint Errors
          </p>
        </div>
      </section>

      {/* Quick Access Modules Navigation */}
      <section className="rounded-3xl border border-zinc-200/80 bg-white p-8 sm:p-10 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-100 pb-6">
          <div>
            <h2 className="text-xl font-bold text-zinc-950">
              สำรวจโมดูลทั้งหมดในระบบ (Explore Features)
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-zinc-500">
              เข้าถึงทุกหน้าและฟังก์ชันของเว็บได้อย่างสะดวกรวดเร็ว
            </p>
          </div>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Link
            href="/posts"
            className="group rounded-2xl border border-zinc-200/70 bg-zinc-50/60 p-5 transition hover:bg-white hover:border-zinc-400 hover:shadow-xs"
          >
            <span className="text-xl">📄</span>
            <h3 className="mt-3 font-bold text-zinc-900 text-sm group-hover:text-zinc-950">
              บทความ (Posts)
            </h3>
            <p className="mt-1 text-xs text-zinc-500">
              อ่านบทความเทคโนโลยีและงานวิจัย
            </p>
          </Link>

          <Link
            href="/users"
            className="group rounded-2xl border border-zinc-200/70 bg-zinc-50/60 p-5 transition hover:bg-white hover:border-zinc-400 hover:shadow-xs"
          >
            <span className="text-xl">👥</span>
            <h3 className="mt-3 font-bold text-zinc-900 text-sm group-hover:text-zinc-950">
              ผู้ใช้งาน (Users)
            </h3>
            <p className="mt-1 text-xs text-zinc-500">
              ทำเนียบสมาชิกและข้อมูลบริษัท
            </p>
          </Link>

          <Link
            href="/blog-spa"
            className="group rounded-2xl border border-zinc-200/70 bg-zinc-50/60 p-5 transition hover:bg-white hover:border-zinc-400 hover:shadow-xs"
          >
            <span className="text-xl">⚡</span>
            <h3 className="mt-3 font-bold text-zinc-900 text-sm group-hover:text-zinc-950">
              SPA Aggregator
            </h3>
            <p className="mt-1 text-xs text-zinc-500">
              ฟีดสินค้าและข่าวสารแบบ Client-side
            </p>
          </Link>

          <Link
            href="/dashboard"
            className="group rounded-2xl border border-zinc-200/70 bg-zinc-50/60 p-5 transition hover:bg-white hover:border-zinc-400 hover:shadow-xs"
          >
            <span className="text-xl">📊</span>
            <h3 className="mt-3 font-bold text-zinc-900 text-sm group-hover:text-zinc-950">
              Dashboard
            </h3>
            <p className="mt-1 text-xs text-zinc-500">
              จัดการข้อความและตรวจสอบระบบ
            </p>
          </Link>
        </div>
      </section>
    </div>
  );
}