import Link from 'next/link';
import { api } from '~/trpc/server';
import { Card } from '~/components/ui/card';

import { ProductsTable } from '~/components/admin/products-table';

export default async function AdminProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page: pageStr } = await searchParams;
  const page = parseInt(pageStr ?? '1', 10);
  const data = await api.product.adminList({ page, limit: 20 });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-[#0F2240]">제품 관리</h2>
        <Link href="/admin/products/new" className="inline-flex items-center rounded-lg bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/80">새 제품 등록</Link>
      </div>
      <Card>
        <ProductsTable products={data.items} />
      </Card>
      {data.total > 20 && (
        <div className="flex justify-center gap-2">
          {page > 1 && (
            <Link href={`/admin/products?page=${page - 1}`} className="inline-flex items-center rounded-lg border border-border bg-background px-2.5 py-1 text-[0.8rem] font-medium hover:bg-muted">이전</Link>
          )}
          <span className="px-3 py-1 text-sm text-gray-600">
            {page} / {Math.ceil(data.total / 20)}
          </span>
          {page < Math.ceil(data.total / 20) && (
            <Link href={`/admin/products?page=${page + 1}`} className="inline-flex items-center rounded-lg border border-border bg-background px-2.5 py-1 text-[0.8rem] font-medium hover:bg-muted">다음</Link>
          )}
        </div>
      )}
    </div>
  );
}