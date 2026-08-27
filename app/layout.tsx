import "./globals.css";
import type { Metadata } from "next";
import Navbar from '@/components/Navbar';
import InteractiveBackground from '@/components/InteractiveBackground';
import CustomCursor from '@/components/CustomCursor';

import { ThemeProvider } from "@/components/ThemeProvider";

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
    <html lang="th" className="scroll-smooth" suppressHydrationWarning>
      <body className="bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 antialiased selection:bg-zinc-900 dark:selection:bg-white selection:text-white dark:selection:text-zinc-900 transition-colors duration-300">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <CustomCursor />
          <div className="relative min-h-screen flex flex-col justify-between">
            {/* Subtle background ambient overlay with glassmorphism orbs */}
            <div className="pointer-events-none fixed inset-0 z-[-1] bg-zinc-50 dark:bg-zinc-950 transition-colors duration-300">
              {/* Glowing orb 1 */}
              <div className="absolute top-[-10%] left-[-10%] h-[50vh] w-[50vw] rounded-full bg-zinc-200/50 dark:bg-zinc-800/50 blur-[120px] transition-colors duration-300" />
              {/* Glowing orb 2 */}
              <div className="absolute bottom-[-10%] right-[-10%] h-[60vh] w-[60vw] rounded-full bg-zinc-300/30 dark:bg-zinc-900/30 blur-[150px] transition-colors duration-300" />
            </div>
            
            <InteractiveBackground />

            <Navbar />

            <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 sm:px-6 lg:px-8">
              {children}
            </main>

            <footer className="border-t border-zinc-200/80 dark:border-zinc-800/80 bg-white/60 dark:bg-zinc-950/60 backdrop-blur-xl/70 py-8 text-center text-sm text-zinc-500 dark:text-zinc-400 backdrop-blur-md transition-colors duration-300">
              <div className="mx-auto max-w-6xl px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <span className="inline-block h-2 w-2 rounded-full bg-zinc-900 dark:bg-zinc-100 transition-colors duration-300" />
                  <span className="font-semibold text-zinc-800 dark:text-zinc-200 transition-colors duration-300">MY BLOG</span>
                  <span className="text-zinc-400 dark:text-zinc-600 transition-colors duration-300">|</span>
                  <span>Server-Side Development</span>
                </div>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  © 2026 Developed with Next.js 16 • TypeScript • Prisma ORM
                </p>
              </div>
            </footer>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
