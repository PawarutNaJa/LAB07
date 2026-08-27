import Link from 'next/link';
import type { Metadata } from 'next';
import { StaggerContainer, FadeIn, HoverCard, ScrollIndicator } from '@/components/MotionWrappers';
import TextReveal from '@/components/TextReveal';

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
    <StaggerContainer className="space-y-12">
      {/* Hero Section */}
      <FadeIn>
        <section className="relative overflow-hidden rounded-3xl border border-zinc-200/90 dark:border-zinc-800/90 bg-white/60 dark:bg-zinc-900/60 backdrop-blur-xl p-8 sm:p-12 shadow-[0_10px_30px_-15px_rgba(0,0,0,0.05)]">
          <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr] lg:items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-zinc-200 dark:border-zinc-800 bg-zinc-100/80 dark:bg-zinc-800/80 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-zinc-800 dark:text-zinc-200">
                <span className="h-1.5 w-1.5 rounded-full bg-zinc-900 dark:bg-zinc-100" />
                Single Page Application & Data Aggregator
              </div>

              <TextReveal 
                text="ระบบดึงข้อมูล & SPA Live Feed"
                className="text-4xl font-extrabold tracking-tight text-zinc-950 dark:text-zinc-50 sm:text-5xl lg:text-6xl leading-[1.15]"
                as="h1"
              />

              <p className="text-base sm:text-lg leading-relaxed text-zinc-600 dark:text-zinc-400 dark:text-zinc-500">
                สัมผัสความลื่นไหลในการแสดงผลข้อมูลผ่าน <strong>Single Page Application (SPA)</strong> ที่ดึงข้อมูลข่าวสารและสินค้าจากภายนอกแบบเรียลไทม์ผ่าน API พร้อมระบบค้นหาและคัดกรองข้อมูลโดยไม่ต้องโหลดหน้าเว็บใหม่
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3.5 pt-2">
                <HoverCard>
                  <Link
                    href="/posts"
                    className="inline-flex items-center justify-center rounded-xl bg-zinc-950 dark:bg-zinc-100 px-6 py-3 text-sm font-semibold text-white dark:text-zinc-950 shadow-xs transition hover:bg-zinc-800 dark:hover:bg-zinc-200"
                  >
                    อ่านบทความทั้งหมด →
                  </Link>
                </HoverCard>
                <HoverCard>
                  <Link
                    href="/blog-spa"
                    className="inline-flex items-center justify-center rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white/60 dark:bg-zinc-900/60 backdrop-blur-xl px-6 py-3 text-sm font-semibold text-zinc-800 dark:text-zinc-200 shadow-xs transition hover:bg-zinc-50 dark:hover:bg-zinc-800 dark:bg-zinc-100 hover:border-zinc-300 dark:hover:border-zinc-600"
                  >
                    SPA Live Feed
                  </Link>
                </HoverCard>
                <HoverCard>
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white/60 dark:bg-zinc-900/60 backdrop-blur-xl px-6 py-3 text-sm font-semibold text-zinc-800 dark:text-zinc-200 shadow-xs transition hover:bg-zinc-50 dark:hover:bg-zinc-800 dark:bg-zinc-100 hover:border-zinc-300 dark:hover:border-zinc-600"
                  >
                    ติดต่อเรา
                  </Link>
                </HoverCard>
              </div>

              {/* Tech Stack Pills */}
              <div className="border-t border-zinc-100 dark:border-zinc-800 pt-6 flex flex-wrap items-center gap-2.5 text-xs font-medium text-zinc-500 dark:text-zinc-400 dark:text-zinc-500">
                <span className="font-semibold text-zinc-700 dark:text-zinc-300">Tech Stack:</span>
                <HoverCard className="rounded-md border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-100 px-2.5 py-1 text-zinc-700 dark:text-zinc-300">Next.js 16</HoverCard>
                <HoverCard className="rounded-md border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-100 px-2.5 py-1 text-zinc-700 dark:text-zinc-300">TypeScript 5</HoverCard>
                <HoverCard className="rounded-md border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-100 px-2.5 py-1 text-zinc-700 dark:text-zinc-300">Prisma ORM</HoverCard>
                <HoverCard className="rounded-md border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-100 px-2.5 py-1 text-zinc-700 dark:text-zinc-300">PostgreSQL</HoverCard>
                <HoverCard className="rounded-md border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-100 px-2.5 py-1 text-zinc-700 dark:text-zinc-300">TailwindCSS 4</HoverCard>
              </div>
            </div>

            {/* Recent Posts Side Card */}
            <div className="rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80 bg-zinc-50/80 dark:bg-zinc-900/80 p-6 shadow-inner">
              <div className="flex items-center justify-between border-b border-zinc-200/70 dark:border-zinc-800/70 pb-4">
                <h2 className="text-xs font-bold uppercase tracking-widest text-zinc-500 dark:text-zinc-400 dark:text-zinc-500">
                  บทความล่าสุด
                </h2>
                <Link
                  href="/posts"
                  className="text-xs font-semibold text-zinc-800 dark:text-zinc-200 hover:underline"
                >
                  ดูทั้งหมด ({posts.length}) →
                </Link>
              </div>

              <StaggerContainer className="mt-4 space-y-3">
                {posts.map((post: Post) => (
                  <FadeIn key={post.id}>
                    <HoverCard>
                      <Link
                        href={`/posts/${post.id}`}
                        className="group block rounded-xl border border-zinc-200/70 dark:border-zinc-800/70 bg-white/60 dark:bg-zinc-900/60 backdrop-blur-xl p-4 transition-all duration-200 hover:border-zinc-400 dark:hover:border-zinc-600 hover:shadow-xs"
                      >
                        <div className="flex items-center gap-2 text-[11px] font-medium text-zinc-400 dark:text-zinc-500">
                          <span className="font-mono text-zinc-500 dark:text-zinc-400 dark:text-zinc-500">#{post.id}</span>
                          <span>•</span>
                          <span>เทคโนโลยีเว็บ</span>
                        </div>
                        <h3 className="mt-1 font-semibold text-zinc-900 dark:text-zinc-100 group-hover:text-zinc-950 dark:text-zinc-50 transition line-clamp-1 text-sm">
                          {post.title}
                        </h3>
                        <p className="mt-1.5 text-xs leading-relaxed text-zinc-500 dark:text-zinc-400 dark:text-zinc-500 line-clamp-2">
                          {post.body}
                        </p>
                      </Link>
                    </HoverCard>
                  </FadeIn>
                ))}
              </StaggerContainer>
            </div>
          </div>
          
          <ScrollIndicator />
        </section>
      </FadeIn>

      {/* Feature Highlights Grid */}
      <StaggerContainer className="grid gap-6 sm:grid-cols-3">
        <FadeIn>
          <HoverCard className="h-full rounded-3xl border border-zinc-200/80 dark:border-zinc-800/80 bg-white/60 dark:bg-zinc-900/60 backdrop-blur-xl p-8 shadow-xs transition hover:border-zinc-300 dark:hover:border-zinc-600">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-950 dark:bg-zinc-100 text-white dark:text-zinc-950 font-bold text-xs font-mono">
              01
            </div>
            <h3 className="mt-5 font-bold text-zinc-950 dark:text-zinc-50 text-base">
              3-Tier Architecture
            </h3>
            <p className="mt-2 text-xs sm:text-sm leading-relaxed text-zinc-500 dark:text-zinc-400 dark:text-zinc-500">
              แยกความรับผิดชอบชัดเจนระหว่าง Controller (Routing), Service (Business Logic & Validation) และ Model (Data Layer)
            </p>
          </HoverCard>
        </FadeIn>

        <FadeIn>
          <HoverCard className="h-full rounded-3xl border border-zinc-200/80 dark:border-zinc-800/80 bg-white/60 dark:bg-zinc-900/60 backdrop-blur-xl p-8 shadow-xs transition hover:border-zinc-300 dark:hover:border-zinc-600">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-950 dark:bg-zinc-100 text-white dark:text-zinc-950 font-bold text-xs font-mono">
              02
            </div>
            <h3 className="mt-5 font-bold text-zinc-950 dark:text-zinc-50 text-base">
              Centralized Error Handling
            </h3>
            <p className="mt-2 text-xs sm:text-sm leading-relaxed text-zinc-500 dark:text-zinc-400 dark:text-zinc-500">
              Wrapper ดักจับ Error รวมศูนย์และ Custom Error Classes รองรับ HTTP Status Code 400, 404, 500 อย่างแม่นยำ
            </p>
          </HoverCard>
        </FadeIn>

        <FadeIn>
          <HoverCard className="h-full rounded-3xl border border-zinc-200/80 dark:border-zinc-800/80 bg-white/60 dark:bg-zinc-900/60 backdrop-blur-xl p-8 shadow-xs transition hover:border-zinc-300 dark:hover:border-zinc-600">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-950 dark:bg-zinc-100 text-white dark:text-zinc-950 font-bold text-xs font-mono">
              03
            </div>
            <h3 className="mt-5 font-bold text-zinc-950 dark:text-zinc-50 text-base">
              Prisma Database Integration
            </h3>
            <p className="mt-2 text-xs sm:text-sm leading-relaxed text-zinc-500 dark:text-zinc-400 dark:text-zinc-500">
              เชื่อมต่อฐานข้อมูลจริงผ่าน Prisma ORM พร้อม Schema Migration, Seeding และการดักจับ Database Constraint Errors
            </p>
          </HoverCard>
        </FadeIn>
      </StaggerContainer>

      {/* Quick Access Modules Navigation */}
      <FadeIn>
        <section className="rounded-3xl border border-zinc-200/80 dark:border-zinc-800/80 bg-white/60 dark:bg-zinc-900/60 backdrop-blur-xl p-8 sm:p-10 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-100 dark:border-zinc-800 pb-6">
            <div>
              <h2 className="text-xl font-bold text-zinc-950 dark:text-zinc-50">
                สำรวจโมดูลทั้งหมดในระบบ (Explore Features)
              </h2>
              <p className="mt-1 text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 dark:text-zinc-500">
                เข้าถึงทุกหน้าและฟังก์ชันของเว็บได้อย่างสะดวกรวดเร็ว
              </p>
            </div>
          </div>

          <StaggerContainer className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <FadeIn>
              <HoverCard>
                <Link
                  href="/posts"
                  className="block group rounded-2xl border border-zinc-200/70 dark:border-zinc-800/70 bg-zinc-50/60 dark:bg-zinc-900/60 p-5 transition hover:bg-white/60 dark:bg-zinc-900/60 backdrop-blur-xl hover:border-zinc-400 dark:hover:border-zinc-600 hover:shadow-xs"
                >
                  <span className="text-xl">📄</span>
                  <h3 className="mt-3 font-bold text-zinc-900 dark:text-zinc-100 text-sm group-hover:text-zinc-950 dark:text-zinc-50">
                    บทความ (Posts)
                  </h3>
                  <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400 dark:text-zinc-500">
                    อ่านบทความเทคโนโลยีและงานวิจัย
                  </p>
                </Link>
              </HoverCard>
            </FadeIn>

            <FadeIn>
              <HoverCard>
                <Link
                  href="/users"
                  className="block group rounded-2xl border border-zinc-200/70 dark:border-zinc-800/70 bg-zinc-50/60 dark:bg-zinc-900/60 p-5 transition hover:bg-white/60 dark:bg-zinc-900/60 backdrop-blur-xl hover:border-zinc-400 dark:hover:border-zinc-600 hover:shadow-xs"
                >
                  <span className="text-xl">👥</span>
                  <h3 className="mt-3 font-bold text-zinc-900 dark:text-zinc-100 text-sm group-hover:text-zinc-950 dark:text-zinc-50">
                    ผู้ใช้งาน (Users)
                  </h3>
                  <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400 dark:text-zinc-500">
                    ทำเนียบสมาชิกและข้อมูลบริษัท
                  </p>
                </Link>
              </HoverCard>
            </FadeIn>

            <FadeIn>
              <HoverCard>
                <Link
                  href="/blog-spa"
                  className="block group rounded-2xl border border-zinc-200/70 dark:border-zinc-800/70 bg-zinc-50/60 dark:bg-zinc-900/60 p-5 transition hover:bg-white/60 dark:bg-zinc-900/60 backdrop-blur-xl hover:border-zinc-400 dark:hover:border-zinc-600 hover:shadow-xs"
                >
                  <span className="text-xl">⚡</span>
                  <h3 className="mt-3 font-bold text-zinc-900 dark:text-zinc-100 text-sm group-hover:text-zinc-950 dark:text-zinc-50">
                    SPA Aggregator
                  </h3>
                  <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400 dark:text-zinc-500">
                    ฟีดสินค้าและข่าวสารแบบ Client-side
                  </p>
                </Link>
              </HoverCard>
            </FadeIn>

            <FadeIn>
              <HoverCard>
                <Link
                  href="/dashboard"
                  className="block group rounded-2xl border border-zinc-200/70 dark:border-zinc-800/70 bg-zinc-50/60 dark:bg-zinc-900/60 p-5 transition hover:bg-white/60 dark:bg-zinc-900/60 backdrop-blur-xl hover:border-zinc-400 dark:hover:border-zinc-600 hover:shadow-xs"
                >
                  <span className="text-xl">📊</span>
                  <h3 className="mt-3 font-bold text-zinc-900 dark:text-zinc-100 text-sm group-hover:text-zinc-950 dark:text-zinc-50">
                    Dashboard
                  </h3>
                  <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400 dark:text-zinc-500">
                    จัดการข้อความและตรวจสอบระบบ
                  </p>
                </Link>
              </HoverCard>
            </FadeIn>
          </StaggerContainer>
        </section>
      </FadeIn>
    </StaggerContainer>
  );
}
