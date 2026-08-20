import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'เกี่ยวกับเรา — Modern Minimalist Blog',
  description: 'ข้อมูลผู้พัฒนาและเป้าหมายการพัฒนาเว็บแอปพลิเคชันร่วมสมัย',
};

export default function AboutPage() {
  return (
    <div className="space-y-10">
      {/* Header Profile Section */}
      <section className="relative overflow-hidden rounded-3xl border border-zinc-200/90 bg-white p-8 sm:p-12 shadow-[0_10px_30px_-15px_rgba(0,0,0,0.05)]">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div className="flex items-center gap-6">
            <div className="flex h-20 w-20 sm:h-24 sm:w-24 items-center justify-center rounded-2xl bg-zinc-950 text-2xl sm:text-3xl font-bold text-white shadow-md">
              DEV
            </div>
            <div className="space-y-1.5">
              <div className="inline-flex items-center gap-1.5 rounded-full border border-zinc-200 bg-zinc-100/80 px-3 py-0.5 text-xs font-semibold text-zinc-700">
                <span className="h-1.5 w-1.5 rounded-full bg-zinc-900" />
                Full-Stack Web Developer & Student
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-950">
                เกี่ยวกับฉัน (About Me)
              </h1>
              <p className="text-sm sm:text-base text-zinc-500">
                นักพัฒนาเว็บแอปพลิเคชันที่หลงใหลใน Minimalist Design & Clean Code
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-xl bg-zinc-950 px-5 py-2.5 text-sm font-semibold text-white shadow-xs transition hover:bg-zinc-800"
            >
              ติดต่อพูดคุย →
            </Link>
          </div>
        </div>
      </section>

      {/* Grid of Details */}
      <section className="grid gap-6 md:grid-cols-3">
        {/* Education Card */}
        <div className="rounded-2xl border border-zinc-200/80 bg-white p-6 shadow-xs">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-100 text-lg text-zinc-900">
            🎓
          </div>
          <h2 className="mt-4 text-base font-bold text-zinc-950">
            การศึกษา & สาขาวิชา
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-zinc-600">
            สาขาวิทยาการคอมพิวเตอร์ (Computer Science) มุ่งเน้นการออกแบบสถาปัตยกรรมซอฟต์แวร์และโครงสร้างข้อมูล
          </p>
        </div>

        {/* Favorite Subjects */}
        <div className="rounded-2xl border border-zinc-200/80 bg-white p-6 shadow-xs">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-100 text-lg text-zinc-900">
            📚
          </div>
          <h2 className="mt-4 text-base font-bold text-zinc-950">
            รายวิชาที่ชื่นชอบ
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-zinc-600">
            <strong>Web App Design & Development</strong> การสร้าง Full-Stack Application ด้วย Next.js, TypeScript และ Prisma ORM
          </p>
        </div>

        {/* Goals & Vision */}
        <div className="rounded-2xl border border-zinc-200/80 bg-white p-6 shadow-xs">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-100 text-lg text-zinc-900">
            🎯
          </div>
          <h2 className="mt-4 text-base font-bold text-zinc-950">
            เป้าหมาย (Core Goal)
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-zinc-600">
            พัฒนาเว็บแอปพลิเคชันระดับมืออาชีพที่โหลดเร็ว ปลอดภัย มี UX/UI ที่สวยงาม และรองรับการขยายตัว (Scalable)
          </p>
        </div>
      </section>

      {/* Technical Skills Section */}
      <section className="rounded-3xl border border-zinc-200/80 bg-white p-8 shadow-xs">
        <h2 className="text-xl font-bold tracking-tight text-zinc-950">
          ทักษะและเทคโนโลยีที่ใช้งาน (Tech Skills)
        </h2>
        <p className="mt-1 text-sm text-zinc-500">
          ชุดเครื่องมือและภาษาที่ใช้พัฒนาโปรเจกต์นี้
        </p>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-xl border border-zinc-200/70 bg-zinc-50/70 p-4">
            <span className="font-mono text-xs font-semibold text-zinc-500">FRAMEWORK</span>
            <p className="mt-1 font-bold text-zinc-900">Next.js 16 (App Router)</p>
            <p className="mt-1 text-xs text-zinc-500">Server Components & Actions</p>
          </div>

          <div className="rounded-xl border border-zinc-200/70 bg-zinc-50/70 p-4">
            <span className="font-mono text-xs font-semibold text-zinc-500">LANGUAGE</span>
            <p className="mt-1 font-bold text-zinc-900">TypeScript 5</p>
            <p className="mt-1 text-xs text-zinc-500">Strict Type Safety</p>
          </div>

          <div className="rounded-xl border border-zinc-200/70 bg-zinc-50/70 p-4">
            <span className="font-mono text-xs font-semibold text-zinc-500">DATABASE & ORM</span>
            <p className="mt-1 font-bold text-zinc-900">Prisma ORM + PostgreSQL</p>
            <p className="mt-1 text-xs text-zinc-500">Type-safe queries & migrations</p>
          </div>

          <div className="rounded-xl border border-zinc-200/70 bg-zinc-50/70 p-4">
            <span className="font-mono text-xs font-semibold text-zinc-500">STYLING</span>
            <p className="mt-1 font-bold text-zinc-900">TailwindCSS 4</p>
            <p className="mt-1 text-xs text-zinc-500">Modern Monochrome Design</p>
          </div>
        </div>
      </section>
    </div>
  );
}