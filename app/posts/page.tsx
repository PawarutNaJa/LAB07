// app/posts/page.tsx

import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "บทความทั้งหมด",
  description: "รวมบทความทั้งหมดในบล็อก",
};

interface Post {
  id: number;
  title: string;
  body: string;
}

export default async function PostsPage() {
  const res = await fetch(
    "https://jsonplaceholder.typicode.com/posts?_limit=10",
    {
      cache: "no-store",
    }
  );

  const posts: Post[] = await res.json();

  return (
    <main className="p-12">
      <h1 className="text-3xl font-bold text-blue-900 mb-6">
        บทความทั้งหมด
      </h1>

      <div className="space-y-4">
        {posts.map((post: Post) => (
          <Link
            key={post.id}
            href={`/posts/${post.id}`}
            className="block p-4 bg-white rounded-lg border border-gray-200 shadow-sm"
          >
            <h2 className="font-bold text-blue-800">
              {post.title}
            </h2>

            <p className="mt-2 text-gray-600">
              {post.body.slice(0, 100)}...
            </p>
          </Link>
        ))}
      </div>
    </main>
  );
}