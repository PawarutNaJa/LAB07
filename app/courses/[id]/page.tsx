// app/courses/[id]/page.tsx

import Link from "next/link";
import type { Metadata } from "next";

interface CourseDetail {
  name: string;
  desc: string;
  instructor: string;
  credits?: number;
}

const courseData: Record<string, CourseDetail> = {
  "0214321": {
    name: "Web App Design & Dev",
    desc: "ศึกษาการพัฒนาเว็บแอปพลิเคชันสมัยใหม่ด้วย Next.js, React, Server Components, API Routes และ Prisma ORM",
    instructor: "อ.สิรินดา",
    credits: 3,
  },
  "0214101": {
    name: "Programming Fundamentals",
    desc: "หลักการเขียนโปรแกรมคอมพิวเตอร์พื้นฐาน โครงสร้างข้อมูลเบื้องต้น และตรรกะการแก้ปัญหาด้วย C/C++",
    instructor: "อ.ประจำ",
    credits: 3,
  },
  "0214201": {
    name: "Data Structures",
    desc: "โครงสร้างข้อมูลแบบเชิงเส้นและไม่เชิงเส้น อัลกอริทึมการค้นหาและการจัดเรียงข้อมูล",
    instructor: "อ.ผู้สอน",
    credits: 3,
  },
};

export default async function CourseDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const course = courseData[id];

  if (!course) {
    return (
      <div className="mx-auto max-w-2xl text-center py-16">
        <div className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm">
          <p className="text-3xl">🔍</p>
          <h1 className="mt-4 text-xl font-bold text-zinc-950">ไม่พบรายวิชา {id}</h1>
          <p className="mt-2 text-sm text-zinc-500">กรุณาตรวจสอบรหัสวิชาใหม่อีกครั้ง</p>
          <div className="mt-6">
            <Link
              href="/courses"
              className="inline-flex items-center justify-center rounded-xl bg-zinc-950 px-5 py-2.5 text-xs font-semibold text-white shadow-xs hover:bg-zinc-800"
            >
              ← กลับไปหน้ารวมวิชา
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div>
        <Link
          href="/courses"
          className="inline-flex items-center gap-2 text-xs font-semibold text-zinc-500 transition hover:text-zinc-950"
        >
          <span>←</span>
          <span>ย้อนกลับไปหน้ารวมวิชา</span>
        </Link>
      </div>

      <article className="rounded-3xl border border-zinc-200/90 bg-white p-8 sm:p-12 shadow-[0_10px_30px_-15px_rgba(0,0,0,0.05)]">
        <div className="flex items-center gap-2 text-xs font-mono font-semibold text-zinc-500">
          <span className="rounded-md border border-zinc-200 bg-zinc-50 px-2.5 py-1 text-zinc-900">
            COURSE #{id}
          </span>
          <span>•</span>
          <span>{course.credits ?? 3} หน่วยกิต</span>
        </div>

        <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-zinc-950 sm:text-4xl">
          {course.name}
        </h1>

        <div className="mt-6 rounded-2xl border border-zinc-100 bg-zinc-50/80 p-6">
          <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-500">คำอธิบายรายวิชา</h2>
          <p className="mt-2 text-base leading-relaxed text-zinc-700">
            {course.desc}
          </p>
        </div>

        <div className="mt-6 flex items-center justify-between border-t border-zinc-100 pt-6 text-sm text-zinc-600">
          <div>
            <span className="font-semibold text-zinc-900">อาจารย์ผู้สอน:</span> {course.instructor}
          </div>
          <Link
            href="/courses"
            className="rounded-xl border border-zinc-200 bg-white px-4 py-2 text-xs font-semibold text-zinc-800 transition hover:bg-zinc-50"
          >
            ดูวิชาอื่น ๆ →
          </Link>
        </div>
      </article>
    </div>
  );
}