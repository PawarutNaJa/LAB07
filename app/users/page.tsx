import LikeButton from "@/components/LikeButton";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "รายชื่อผู้ใช้งาน — Modern Minimalist Blog",
  description: "ทำเนียบสมาชิกและผู้ใช้งานในระบบ สไตล์โมเดิร์น ขาว-เทา-ดำ",
};

interface User {
  id: number;
  name: string;
  email: string;
  company: {
    name: string;
  };
}

export default async function UsersPage() {
  const res = await fetch(
    "https://jsonplaceholder.typicode.com/users",
    {
      cache: "no-store",
    }
  );

  const users: User[] = await res.json();

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <section className="relative overflow-hidden rounded-3xl border border-zinc-200/90 bg-white p-8 sm:p-12 shadow-[0_10px_30px_-15px_rgba(0,0,0,0.05)]">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-1.5 rounded-full border border-zinc-200 bg-zinc-100/80 px-3 py-0.5 text-xs font-semibold text-zinc-700">
              <span className="h-1.5 w-1.5 rounded-full bg-zinc-900" />
              Member Directory
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-950">
              ทำเนียบผู้ใช้งาน (Users)
            </h1>
            <p className="text-sm sm:text-base text-zinc-500 max-w-xl">
              รายชื่อผู้ใช้งานและสมาชิกในระบบ เชื่อมต่อและดึงข้อมูลจาก API แบบ Server-side Rendering
            </p>
          </div>

          <div className="flex items-center gap-3">
            <LikeButton />
          </div>
        </div>
      </section>

      {/* Users Grid */}
      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {users.map((user: User) => (
          <div
            key={user.id}
            className="group flex flex-col justify-between rounded-2xl border border-zinc-200/80 bg-white p-6 shadow-xs transition hover:-translate-y-0.5 hover:border-zinc-300 hover:shadow-sm"
          >
            <div>
              <div className="flex items-center gap-3.5">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-zinc-950 text-xs font-bold text-white shadow-xs">
                  {user.name.slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <h2 className="font-bold text-zinc-950 text-base group-hover:text-zinc-800 transition">
                    {user.name}
                  </h2>
                  <p className="font-mono text-xs text-zinc-400">
                    ID: #{user.id}
                  </p>
                </div>
              </div>

              <div className="mt-4 space-y-1.5 rounded-xl border border-zinc-100 bg-zinc-50/70 p-3 text-xs text-zinc-600">
                <p className="flex items-center gap-1.5">
                  <span className="text-zinc-400 font-mono">MAIL:</span>
                  <span className="font-medium text-zinc-800">{user.email}</span>
                </p>
                <p className="flex items-center gap-1.5">
                  <span className="text-zinc-400 font-mono">ORG:</span>
                  <span className="text-zinc-700">{user.company.name}</span>
                </p>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between text-[11px] font-medium text-zinc-400">
              <span className="inline-flex items-center gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-zinc-400" />
                Active Member
              </span>
              <span className="font-mono">JSONPlaceholder</span>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}