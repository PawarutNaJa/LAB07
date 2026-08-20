// app/posts/loading.tsx
export default function Loading() {
  return (
    <div className="space-y-6">
      <div className="h-44 w-full rounded-3xl border border-zinc-200/80 bg-white p-8 animate-pulse">
        <div className="h-5 w-32 rounded-full bg-zinc-200" />
        <div className="mt-4 h-8 w-72 rounded-lg bg-zinc-300" />
        <div className="mt-2 h-4 w-96 rounded-md bg-zinc-100" />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {[...Array(6)].map((_, i: number) => (
          <div
            key={i}
            className="flex flex-col justify-between rounded-2xl border border-zinc-200/80 bg-white p-6 animate-pulse"
          >
            <div>
              <div className="flex justify-between">
                <div className="h-3 w-16 rounded bg-zinc-200" />
                <div className="h-3 w-12 rounded bg-zinc-100" />
              </div>
              <div className="mt-4 h-5 w-4/5 rounded bg-zinc-300" />
              <div className="mt-3 space-y-2">
                <div className="h-3 w-full rounded bg-zinc-100" />
                <div className="h-3 w-5/6 rounded bg-zinc-100" />
              </div>
            </div>
            <div className="mt-6 flex justify-between border-t border-zinc-100 pt-4">
              <div className="h-3 w-20 rounded bg-zinc-200" />
              <div className="h-3 w-14 rounded bg-zinc-200" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}