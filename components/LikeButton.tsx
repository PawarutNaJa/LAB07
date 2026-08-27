// components/LikeButton.tsx
'use client';

import { useState } from 'react';

export default function LikeButton() {
  const [liked, setLiked] = useState<boolean>(false);
  const [count, setCount] = useState<number>(12);

  const handleLike = (): void => {
    setLiked((prev: boolean) => !prev);
    setCount((prev: number) => prev + (liked ? -1 : 1));
  };

  return (
    <button
      onClick={handleLike}
      className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold shadow-xs transition-all duration-200 cursor-pointer ${
        liked
          ? 'bg-zinc-950 dark:bg-zinc-100 text-white dark:text-zinc-950 hover:bg-zinc-800 dark:hover:bg-zinc-200 scale-105'
          : 'border border-zinc-200 dark:border-zinc-800 bg-white text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 dark:bg-zinc-100 hover:text-zinc-950 dark:text-zinc-50'
      }`}
    >
      <span className={`transition-transform duration-200 ${liked ? 'scale-125' : ''}`}>
        {liked ? '★' : '☆'}
      </span>
      <span>{count} ชื่นชอบ</span>
    </button>
  );
}