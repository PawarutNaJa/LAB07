// app/courses/page.tsx

import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "รายวิชาของฉัน — Modern Minimalist Blog",
  description: "หลักสูตรและรายวิชาด้านการพัฒนาเว็บและวิทยาการคอมพิวเตอร์",
};

interface Course {
  id: string;
  name: string;
  credits: number;
  instructor: string;
}

const courses: Course[] = [
  { id: "0214321", name: "Web App Design & Dev", credits: 3, instructor: "อ.สิรินดา" },
  { id: "0214101", name: "Programming Fundamentals", credits: 3, instructor: "อ.ประจำ" },
  { id: "0214201", name: "Data Structures", credits: 3, instructor: "อ.ผู้สอน" },
];

export default function Courses() {
  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <section className="relative overflow-hidden rounded-3xl border border-zinc-200/90 bg-white p-8 sm:p-12 shadow-[0_10px_30px_-15px_rgba(0,0,0,0.05)]">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-zinc-200 bg-zinc-100/80 px-3 py-0.5 text-xs font-semibold text-zinc-700">
            <span className="h-1.5 w-1.5 rounded-full bg-zinc-900" />
            Curriculum & Academic
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-950">
            รายวิชาของฉัน (Courses)
          </h1>
          <p className="text-sm sm:text-base text-zinc-500 max-w-xl">
            รายวิชาหลักที่ศึกษาในหลักสูตรวิทยาการคอมพิวเตอร์และการพัฒนาเว็บ
          </p>
        </div>
      </section>

      {/* Courses List */}
      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {courses.map((c: Course) => (
          <Link
            key={c.id}
            href={`/courses/${c.id}`}
            className="group flex flex-col justify-between rounded-2xl border border-zinc-200/80 bg-white p-6 shadow-xs transition hover:-translate-y-0.5 hover:border-zinc-400 hover:shadow-sm"
          >
            <div>
              <div className="flex items-center justify-between text-xs font-semibold">
                <span className="font-mono text-zinc-900 rounded-md border border-zinc-200 bg-zinc-50 px-2 py-0.5">
                  {c.id}
                </span>
                <span className="text-zinc-500">{c.credits} หน่วยกิต</span>
              </div>

              <h2 className="mt-4 font-bold text-zinc-950 text-lg group-hover:text-zinc-800 transition">
                {c.name}
              </h2>

              <p className="mt-2 text-xs text-zinc-500">
                ผู้สอน: {c.instructor}
              </p>
            </div>

            <div className="mt-6 flex items-center justify-between border-t border-zinc-100 pt-4 text-xs font-semibold text-zinc-900">
              <span className="text-zinc-400">ดูรายละเอียดวิชา</span>
              <span className="group-hover:translate-x-0.5 transition-transform">→</span>
            </div>
          </Link>
        ))}
      </section>
    </div>
  );
}