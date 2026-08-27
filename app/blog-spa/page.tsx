'use client';

import {
  Suspense,
  useEffect,
  useMemo,
  useState,
  type ChangeEvent,
} from 'react';

import {
  useRouter,
  useSearchParams,
} from 'next/navigation';

import type { ExternalItem } from '@/lib/external';
import { StaggerContainer, FadeIn, HoverCard } from '@/components/MotionWrappers';
import TextReveal from '@/components/TextReveal';

type Source = 'products' | 'news';

function BlogSpaContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const sourceFromUrl: Source =
    searchParams.get('source') === 'news'
      ? 'news'
      : 'products';

  const keywordFromUrl =
    searchParams.get('q') ?? '';

  const selectedIdFromUrl =
    searchParams.get('item');

  const [source, setSource] =
    useState<Source>(sourceFromUrl);

  const [keyword, setKeyword] =
    useState<string>(keywordFromUrl);

  const [selectedId, setSelectedId] =
    useState<string | null>(selectedIdFromUrl);

  const [items, setItems] =
    useState<ExternalItem[]>([]);

  const [isLoading, setIsLoading] =
    useState<boolean>(true);

  const [error, setError] =
    useState<string>('');

  const [retryCount, setRetryCount] =
    useState<number>(0);

  useEffect(() => {
    setSource(sourceFromUrl);
    setKeyword(keywordFromUrl);
    setSelectedId(selectedIdFromUrl);
  }, [
    sourceFromUrl,
    keywordFromUrl,
    selectedIdFromUrl,
  ]);

  useEffect(() => {
    const controller = new AbortController();

    async function loadItems() {
      setIsLoading(true);
      setError('');
      setItems([]);

      try {
        const response = await fetch(
          `/api/aggregate?source=${source}`,
          {
            signal: controller.signal,
          },
        );

        const data: {
          source?: Source;
          external?: ExternalItem[];
          error?: string;
        } = await response.json();

        if (!response.ok) {
          throw new Error(
            data.error ||
              'ไม่สามารถโหลดข้อมูลได้',
          );
        }

        setItems(data.external ?? []);
      } catch (fetchError) {
        if (
          fetchError instanceof Error &&
          fetchError.name === 'AbortError'
        ) {
          return;
        }

        console.error(fetchError);

        setError(
          fetchError instanceof Error
            ? fetchError.message
            : 'เกิดข้อผิดพลาดในการโหลดข้อมูล',
        );

        setItems([]);
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    }

    loadItems();

    return () => {
      controller.abort();
    };
  }, [source, retryCount]);

  const filteredItems = useMemo(() => {
    const searchText =
      keyword.trim().toLowerCase();

    if (searchText === '') {
      return items;
    }

    return items.filter((item) => {
      const title =
        item.title?.toLowerCase() ?? '';

      const subtitle =
        item.subtitle?.toLowerCase() ?? '';

      return (
        title.includes(searchText) ||
        subtitle.includes(searchText)
      );
    });
  }, [items, keyword]);

  const selectedItem = useMemo(() => {
    if (selectedId === null) {
      return null;
    }

    return (
      items.find(
        (item) =>
          String(item.id) === selectedId,
      ) ?? null
    );
  }, [items, selectedId]);

  function createUrl(
    nextSource: Source,
    nextKeyword: string,
    nextSelectedId: string | null,
  ) {
    const params = new URLSearchParams();

    params.set('source', nextSource);

    if (nextKeyword.trim() !== '') {
      params.set('q', nextKeyword);
    }

    if (nextSelectedId !== null) {
      params.set('item', nextSelectedId);
    }

    return `/blog-spa?${params.toString()}`;
  }

  function selectSource(nextSource: Source) {
    setSource(nextSource);
    setSelectedId(null);

    router.push(
      createUrl(nextSource, keyword, null),
    );
  }

  function handleSearch(
    event: ChangeEvent<HTMLInputElement>,
  ) {
    const nextKeyword = event.target.value;

    setKeyword(nextKeyword);
    setSelectedId(null);

    router.replace(
      createUrl(source, nextKeyword, null),
    );
  }

  function openDetail(itemId: string) {
    setSelectedId(itemId);

    router.push(
      createUrl(source, keyword, itemId),
    );
  }

  function closeDetail() {
    setSelectedId(null);

    router.push(
      createUrl(source, keyword, null),
    );
  }

  function clearSearch() {
    setKeyword('');
    setSelectedId(null);

    router.replace(
      createUrl(source, '', null),
    );
  }

  return (
    <StaggerContainer className="space-y-8">
      {/* Header Banner */}
      <FadeIn>
      <section className="relative overflow-hidden rounded-3xl border border-zinc-200/90 dark:border-zinc-800/90 bg-white/60 dark:bg-zinc-900/60 backdrop-blur-xl p-8 sm:p-12 shadow-[0_10px_30px_-15px_rgba(0,0,0,0.05)]">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-zinc-200 dark:border-zinc-800 bg-zinc-100/80 dark:bg-zinc-800/80 px-3 py-0.5 text-xs font-semibold text-zinc-700 dark:text-zinc-300">
            <span className="h-1.5 w-1.5 rounded-full bg-zinc-900 dark:bg-zinc-100" />
            Client-Side Aggregator
          </div>
          <TextReveal 
            text="Blog Aggregator & SPA Feed"
            className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-950 dark:text-zinc-50"
            as="h1"
          />
          <p className="text-sm sm:text-base text-zinc-500 dark:text-zinc-400 dark:text-zinc-500 max-w-2xl">
            ดึงข้อมูลจากภายนอก (FakeStore / Hacker News) ผ่าน Next.js API Routes พร้อมระบบค้นหาและเปิดดูรายละเอียดแบบ Single Page Application
          </p>
        </div>

        {/* Source Toggle Pills & Search */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-between sm:items-center border-t border-zinc-100 dark:border-zinc-800 pt-6">
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => selectSource('products')}
              className={`rounded-full px-5 py-2 text-xs font-semibold shadow-xs transition-all cursor-pointer ${
                source === 'products'
                  ? 'bg-zinc-950 dark:bg-zinc-100 text-white dark:text-zinc-950'
                  : 'border border-zinc-200 dark:border-zinc-800 bg-white/60 dark:bg-zinc-900/60 backdrop-blur-xl text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 dark:bg-zinc-800 hover:text-zinc-950 dark:text-zinc-50'
              }`}
            >
              🛍️ สินค้า (Products)
            </button>

            <button
              type="button"
              onClick={() => selectSource('news')}
              className={`rounded-full px-5 py-2 text-xs font-semibold shadow-xs transition-all cursor-pointer ${
                source === 'news'
                  ? 'bg-zinc-950 dark:bg-zinc-100 text-white dark:text-zinc-950'
                  : 'border border-zinc-200 dark:border-zinc-800 bg-white/60 dark:bg-zinc-900/60 backdrop-blur-xl text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 dark:bg-zinc-800 hover:text-zinc-950 dark:text-zinc-50'
              }`}
            >
              📰 ข่าวไอที (Tech News)
            </button>
          </div>

          <div className="relative w-full sm:w-80">
            <input
              id="search"
              type="search"
              value={keyword}
              onChange={handleSearch}
              placeholder="ค้นหาชื่อหรือเนื้อหา..."
              className="w-full rounded-full border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-100 px-4 py-2 text-xs text-zinc-900 dark:text-zinc-100 outline-none transition focus:border-zinc-900 focus:bg-white/60 dark:bg-zinc-900/60 backdrop-blur-xl focus:ring-2 focus:ring-zinc-200"
            />
          </div>
        </div>
      </section>
      </FadeIn>

      {/* Loading State */}
      {isLoading && (
        <div className="rounded-3xl border border-zinc-200/80 dark:border-zinc-800/80 bg-white/60 dark:bg-zinc-900/60 backdrop-blur-xl p-12 text-center shadow-xs">
          <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-3 border-zinc-200 dark:border-zinc-800 border-t-zinc-900" />
          <p className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 dark:text-zinc-500">
            กำลังโหลดข้อมูลจาก External API...
          </p>
        </div>
      )}

      {/* Error State */}
      {!isLoading && error && (
        <div className="rounded-3xl border border-red-200 bg-red-50 p-8 text-center">
          <h2 className="text-sm font-bold text-red-800">
            เกิดข้อผิดพลาดในการโหลดข้อมูล
          </h2>
          <p className="mt-1 text-xs text-red-600">
            {error}
          </p>
          <button
            type="button"
            onClick={() => setRetryCount((count) => count + 1)}
            className="mt-4 inline-flex rounded-xl bg-red-600 px-4 py-2 text-xs font-semibold text-white dark:text-zinc-950 hover:bg-red-700 cursor-pointer"
          >
            ลองใหม่อีกครั้ง
          </button>
        </div>
      )}

      {/* Empty State */}
      {!isLoading && !error && items.length === 0 && (
        <div className="rounded-3xl border border-zinc-200/80 dark:border-zinc-800/80 bg-white/60 dark:bg-zinc-900/60 backdrop-blur-xl p-12 text-center shadow-xs">
          <p className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">
            ไม่มีข้อมูลในหมวดนี้
          </p>
        </div>
      )}

      {/* Search Not Found State */}
      {!isLoading && !error && items.length > 0 && filteredItems.length === 0 && (
        <div className="rounded-3xl border border-dashed border-zinc-200 dark:border-zinc-800 bg-white/60 dark:bg-zinc-900/60 backdrop-blur-xl p-12 text-center shadow-xs">
          <p className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">
            ไม่พบผลการค้นหา “{keyword}”
          </p>
          <button
            type="button"
            onClick={clearSearch}
            className="mt-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-100 px-4 py-2 text-xs font-semibold text-zinc-800 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 dark:bg-zinc-800 cursor-pointer"
          >
            ล้างคำค้นหา
          </button>
        </div>
      )}

      {/* Grid of Items */}
      {!isLoading && !error && filteredItems.length > 0 && (
        <StaggerContainer className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredItems.map((item) => (
            <FadeIn key={item.id}>
              <HoverCard className="h-full">
                <button
                  type="button"
                  onClick={() => openDetail(String(item.id))}
                  className="group w-full h-full flex flex-col justify-between overflow-hidden rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80 bg-white/60 dark:bg-zinc-900/60 backdrop-blur-xl text-left shadow-xs transition duration-200 hover:-translate-y-0.5 hover:border-zinc-400 dark:hover:border-zinc-600 hover:shadow-sm cursor-pointer"
                >
              <div>
                {item.image ? (
                  <div className="flex h-48 items-center justify-center bg-white/60 dark:bg-zinc-900/60 backdrop-blur-xl p-5 border-b border-zinc-100 dark:border-zinc-800">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="h-full w-full object-contain transition duration-200 group-hover:scale-105"
                    />
                  </div>
                ) : (
                  <div className="flex h-36 items-center justify-center bg-zinc-50 dark:bg-zinc-100 text-4xl border-b border-zinc-100 dark:border-zinc-800">
                    📰
                  </div>
                )}

                <div className="p-5">
                  <span className="font-mono text-[11px] text-zinc-400 dark:text-zinc-500">
                    #{item.id}
                  </span>
                  <h2 className="mt-1 line-clamp-2 text-sm font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-zinc-950 dark:text-zinc-50 transition">
                    {item.title}
                  </h2>
                  <p className="mt-1.5 line-clamp-2 text-xs text-zinc-500 dark:text-zinc-400 dark:text-zinc-500 leading-relaxed">
                    {item.subtitle || 'ไม่มีรายละเอียด'}
                  </p>
                </div>
              </div>

                <div className="border-t border-zinc-100 dark:border-zinc-800 px-5 py-3 text-xs font-semibold text-zinc-900 dark:text-zinc-100 flex items-center justify-between">
                  <span>{source === 'products' ? 'ดูสินค้า' : 'อ่านข่าว'}</span>
                  <span className="group-hover:translate-x-0.5 transition-transform">→</span>
                </div>
              </button>
            </HoverCard>
          </FadeIn>
          ))}
        </StaggerContainer>
      )}

      {/* Slide-over Detail Drawer */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 flex justify-end bg-zinc-950 dark:bg-zinc-100/40 backdrop-blur-xs">
          <button
            type="button"
            aria-label="ปิดรายละเอียด"
            onClick={closeDetail}
            className="absolute inset-0 cursor-default"
          />

          <aside className="relative z-10 h-full w-full max-w-lg overflow-y-auto bg-white/60 dark:bg-zinc-900/60 backdrop-blur-xl p-6 sm:p-8 shadow-2xl border-l border-zinc-200 dark:border-zinc-800">
            <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800 pb-5">
              <div className="flex items-center gap-2">
                <span className="flex h-2 w-2 rounded-full bg-zinc-900 dark:bg-zinc-100" />
                <h2 className="text-sm font-bold uppercase tracking-wider text-zinc-950 dark:text-zinc-50">
                  รายละเอียดข้อมูล
                </h2>
              </div>

              <button
                type="button"
                onClick={closeDetail}
                className="rounded-full border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-100 px-3 py-1 text-xs font-semibold text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 dark:bg-zinc-800 cursor-pointer"
              >
                ปิด ✕
              </button>
            </div>

            {selectedItem.image ? (
              <div className="my-6 flex h-64 items-center justify-center rounded-2xl border border-zinc-100 dark:border-zinc-800 bg-white/60 dark:bg-zinc-900/60 backdrop-blur-xl p-6">
                <img
                  src={selectedItem.image}
                  alt={selectedItem.title}
                  className="h-full w-full object-contain"
                />
              </div>
            ) : (
              <div className="my-6 flex h-40 items-center justify-center rounded-2xl bg-zinc-50 dark:bg-zinc-100 text-5xl">
                📰
              </div>
            )}

            <div className="space-y-4">
              <span className="inline-block rounded-full bg-zinc-100 dark:bg-zinc-800 px-3 py-1 font-mono text-xs font-semibold text-zinc-800 dark:text-zinc-200">
                {source === 'products' ? 'PRODUCT ITEM' : 'NEWS ITEM'}
              </span>

              <h3 className="text-xl font-bold text-zinc-950 dark:text-zinc-50">
                {selectedItem.title}
              </h3>

              <div className="rounded-2xl border border-zinc-100 dark:border-zinc-800 bg-zinc-50/70 p-5 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
                {selectedItem.subtitle || 'ไม่มีรายละเอียดเพิ่มเติม'}
              </div>

              <p className="font-mono text-xs text-zinc-400 dark:text-zinc-500 pt-4">
                Identifier: {selectedItem.id}
              </p>
            </div>
          </aside>
        </div>
      )}
    </StaggerContainer>
  );
}

export default function BlogSpaPage() {
  return (
    <Suspense
      fallback={
        <div className="rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white/60 dark:bg-zinc-900/60 backdrop-blur-xl p-12 text-center">
          <p className="text-xs text-zinc-500 dark:text-zinc-400 dark:text-zinc-500 font-semibold">
            กำลังเตรียมหน้า SPA Feed...
          </p>
        </div>
      }
    >
      <BlogSpaContent />
    </Suspense>
  );
}
