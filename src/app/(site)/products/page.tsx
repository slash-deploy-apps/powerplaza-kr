import Link from 'next/link';
import { api } from '~/trpc/server';
import { ProductCard } from '~/components/site/product-card';
import { CategorySidebar } from '~/components/site/category-sidebar';

type Props = {
  searchParams: Promise<{ categoryId?: string }>;
};

export default async function ProductsPage({ searchParams }: Props) {
  const params = await searchParams;
  const categoryId = params.categoryId;

  const [categories, { items: products }] = await Promise.all([
    api.category.list(),
    api.product.list({ categoryId, page: 1, limit: 48 }),
  ]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      {/* Page header */}
      <div className="mb-6">
        <p className="text-xs font-semibold uppercase tracking-wide text-[#636D87] mb-1">제품 목록</p>
        <h1 className="text-2xl font-bold text-[#0F2240]">Volker Power 제품</h1>
      </div>

      <div className="flex gap-8">
        {/* Sidebar */}
        <div className="hidden md:block w-56 flex-shrink-0">
          <div className="bg-white border border-[#D8DCE8] rounded-[6px] p-2">
            <CategorySidebar categories={categories} activeCategoryId={categoryId} />
          </div>
        </div>

        {/* Product grid */}
        <div className="flex-1">
          {/* Mobile category filter */}
          <div className="md:hidden mb-4 flex gap-2 overflow-x-auto pb-2">
            <Link
              href="/products"
              className={`flex-shrink-0 px-3 py-1.5 rounded-full text-sm border ${ !categoryId ? 'bg-[#0F2240] text-white border-[#0F2240]' : 'border-[#D8DCE8] text-[#334155]' }`}
            >
              전체
            </Link>
            {categories.map((cat) => (
              <Link
                key={cat.id}
                href={`/products?categoryId=${cat.id}`}
                className={`flex-shrink-0 px-3 py-1.5 rounded-full text-sm border ${ categoryId === cat.id ? 'bg-[#0F2240] text-white border-[#0F2240]' : 'border-[#D8DCE8] text-[#334155]' }`}
              >
                {cat.name}
            </Link>
            ))}
          </div>

          {products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 text-[#636D87]">
              <p className="text-lg">등록된 제품이 없습니다.</p>
              <Link href="/products" className="text-[#2654A0] text-sm mt-2 inline-block hover:underline">전체 제품 보기</Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}