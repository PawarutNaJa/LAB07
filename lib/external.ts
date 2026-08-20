export interface ExternalItem {
  id: string;
  title: string;
  subtitle?: string;
  image?: string;
}

interface FakeStoreProduct {
  id: number;
  title: string;
  price: number;
  category: string;
  image?: string;
}

interface AlgoliaHit {
  objectID: string;
  title?: string;
  points?: number;
  author?: string;
}

export async function fetchExternal(
  source: 'products' | 'news',
): Promise<ExternalItem[]> {
  if (source === 'products') {
    const response = await fetch(
      'https://fakestoreapi.com/products?limit=8',
      {
        cache: 'no-store',
      },
    );

    if (!response.ok) {
      throw new Error('ไม่สามารถโหลดข้อมูลสินค้าได้');
    }

    const items: FakeStoreProduct[] = await response.json();

    return items.map((product) => ({
      id: String(product.id),
      title: product.title,
      subtitle: `$${product.price} • ${product.category}`,
      image: product.image,
    }));
  }

  const response = await fetch(
    'https://hn.algolia.com/api/v1/search?tags=story&hitsPerPage=8',
    {
      cache: 'no-store',
    },
  );

  if (!response.ok) {
    throw new Error('ไม่สามารถโหลดข้อมูลข่าวได้');
  }

  const data: { hits?: AlgoliaHit[] } = await response.json();

  return (data.hits ?? []).map((news) => ({
    id: String(news.objectID),
    title: news.title || 'ไม่มีชื่อข่าว',
    subtitle: `${news.points ?? 0} คะแนน • โดย ${news.author ?? 'ไม่ทราบชื่อ'}`,
  }));
}