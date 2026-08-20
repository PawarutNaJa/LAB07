import "./globals.css";
import type { Metadata } from "next";
import Navbar from '@/components/Navbar';

export const metadata: Metadata = {
  title: {
    template: "%s | Minimalist Blog",
    default: "Minimalist Blog — Next.js & Server Architecture",
  },
  description: "บล็อกส่วนตัว ดีไซน์ทันสมัย โทนขาว-เทา-ดำ สร้างด้วย Next.js + TypeScript + Prisma",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th" className="scroll-smooth">
      <body className="bg-zinc-50 text-zinc-900 antialiased selection:bg-zinc-900 selection:text-white">
        <div className="relative min-h-screen flex flex-col justify-between">
          {/* Subtle background ambient overlay */}
          <div className="pointer-events-none fixed inset-0 z-[-1] bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.05),rgba(255,255,255,0))]" />

          <Navbar />

          <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 sm:px-6 lg:px-8">
            {children}
          </main>

          <footer className="border-t border-zinc-200/80 bg-white/70 py-8 text-center text-sm text-zinc-500 backdrop-blur-md">
            <div className="mx-auto max-w-6xl px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <span className="inline-block h-2 w-2 rounded-full bg-zinc-900" />
                <span className="font-semibold text-zinc-800">MY BLOG</span>
                <span className="text-zinc-400">|</span>
                <span>Server-Side Development</span>
              </div>
              <p className="text-xs text-zinc-500">
                © 2026 Developed with Next.js 16 • TypeScript • Prisma ORM
              </p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}