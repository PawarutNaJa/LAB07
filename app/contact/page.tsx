import CommentForm from '@/components/ContactForm';

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.16),_transparent_45%)] px-4 py-10 sm:px-6 lg:px-8">
      <section className="mx-auto flex max-w-6xl flex-col gap-8 lg:flex-row lg:items-start">
        <div className="w-full rounded-[2rem] border border-slate-200 bg-white/80 p-8 shadow-[0_30px_80px_-35px_rgba(37,99,235,0.4)] backdrop-blur-sm lg:w-[42%]">
          <div className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-700">
            ✉️ ติดต่อเรา
          </div>

          <h1 className="mt-5 text-3xl font-semibold text-slate-900 sm:text-4xl">
            มีคำถามหรืออยากฝากข้อความถึงเรา?
          </h1>

          <p className="mt-4 text-lg leading-8 text-slate-600">
            เราพร้อมรับฟังความคิดเห็นและช่วยตอบทุกคำถามของคุณอย่างเป็นกันเองและรวดเร็ว
          </p>

          <div className="mt-8 space-y-3">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-sm font-semibold text-slate-800">⚡ ตอบกลับเร็ว</p>
              <p className="mt-1 text-sm text-slate-600">เราจะรีบติดต่อกลับให้คุณโดยเร็วที่สุด</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-sm font-semibold text-slate-800">💬 สื่อสารอย่างตรงไปตรงมา</p>
              <p className="mt-1 text-sm text-slate-600">กรอกข้อมูลให้ครบเพื่อให้ทีมของเราตอบคุณได้ตรงจุด</p>
            </div>
          </div>
        </div>

        <div className="w-full lg:w-[58%]">
          <CommentForm postId="blog-post-1" />
        </div>
      </section>
    </main>
  );
}