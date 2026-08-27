import CommentForm from '@/components/ContactForm';
import type { Metadata } from 'next';
import { StaggerContainer, FadeIn, HoverCard } from '@/components/MotionWrappers';
import TextReveal from '@/components/TextReveal';

export const metadata: Metadata = {
  title: 'ติดต่อเรา — Modern Minimalist Blog',
  description: 'ส่งข้อความและติดต่อทีมงานผู้พัฒนา สไตล์โมเดิร์น ขาว-เทา-ดำ',
};

export default function ContactPage() {
  return (
    <StaggerContainer className="space-y-8">
      <section className="grid gap-8 lg:grid-cols-[1.1fr_1.4fr] lg:items-start">
        {/* Left Information Card */}
        <FadeIn>
          <div className="rounded-3xl border border-zinc-200/90 dark:border-zinc-800/90 bg-white/60 dark:bg-zinc-900/60 backdrop-blur-xl p-8 sm:p-10 shadow-[0_10px_30px_-15px_rgba(0,0,0,0.05)]">
            <div className="inline-flex items-center gap-1.5 rounded-full border border-zinc-200 dark:border-zinc-800 bg-zinc-100/80 dark:bg-zinc-800/80 px-3 py-0.5 text-xs font-semibold text-zinc-700 dark:text-zinc-300">
              <span className="h-1.5 w-1.5 rounded-full bg-zinc-900 dark:bg-zinc-100" />
              Get in Touch
            </div>

            <TextReveal 
              text="มีคำถามหรือต้องการติดต่อเรา?"
              className="mt-4 text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-950 dark:text-zinc-50"
              as="h1"
            />

            <p className="mt-3 text-sm sm:text-base leading-relaxed text-zinc-600 dark:text-zinc-400 dark:text-zinc-500">
              เราพร้อมรับฟังทุกข้อเสนอแนะ ติดตามข้อคิดเห็น และตอบกลับทุกข้อซักถามผ่านระบบจัดการข้อความ
            </p>

            <StaggerContainer className="mt-8 space-y-4">
              <FadeIn>
                <HoverCard>
                  <div className="rounded-2xl border border-zinc-100 dark:border-zinc-800 bg-zinc-50/80 dark:bg-zinc-900/80 p-5">
                    <p className="text-xs font-bold uppercase tracking-wider text-zinc-900 dark:text-zinc-100">
                      ⚡ ระบบประมวลผลทันที
                    </p>
                    <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400 dark:text-zinc-500 leading-relaxed">
                      ข้อความจะถูกส่งผ่าน Layered Service และบันทึกเข้าฐานข้อมูล PostgreSQL อย่างปลอดภัย
                    </p>
                  </div>
                </HoverCard>
              </FadeIn>

              <FadeIn>
                <HoverCard>
                  <div className="rounded-2xl border border-zinc-100 dark:border-zinc-800 bg-zinc-50/80 dark:bg-zinc-900/80 p-5">
                    <p className="text-xs font-bold uppercase tracking-wider text-zinc-900 dark:text-zinc-100">
                      🛡️ การตรวจสอบความถูกต้อง (Validation)
                    </p>
                    <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400 dark:text-zinc-500 leading-relaxed">
                      ระบบมีการตรวจสอบ Email Format และความยาวข้อความทั้งฝั่ง Client และ Server-side
                    </p>
                  </div>
                </HoverCard>
              </FadeIn>
            </StaggerContainer>
          </div>
        </FadeIn>

        {/* Right Contact Form */}
        <FadeIn delay={0.2}>
          <div>
            <CommentForm postId="blog-post-1" />
          </div>
        </FadeIn>
      </section>
    </StaggerContainer>
  );
}
