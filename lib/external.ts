export interface ExternalItem {
  id: string;
  title: string;
  subtitle?: string;
  image?: string;
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

    const items = await response.json();

    return items.map((product: any) => ({
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

  const data = await response.json();

  return (data.hits ?? []).map((news: any) => ({
    id: String(news.objectID),
    title: news.title || 'ไม่มีชื่อข่าว',
    subtitle: `${news.points ?? 0} คะแนน • โดย ${news.author ?? 'ไม่ทราบชื่อ'}`,
  }));
}