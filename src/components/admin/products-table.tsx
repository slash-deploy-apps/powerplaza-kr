'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { api } from '~/trpc/react';
import { Badge } from '~/components/ui/badge';
import { Button } from '~/components/ui/button';

type Product = {
  id: string;
  name: string;
  modelNo: string;
  categoryId: string;
  imageUrl: string | null;
  isPublished: boolean | null;
  createdAt: string | null;
};

export function ProductsTable({ products }: { products: Product[] }) {
  const router = useRouter();
  const deleteMutation = api.product.delete.useMutation({
    onSuccess: () => router.refresh(),
  });

  function handleDelete(id: string, name: string) {
    if (!confirm(`"${name}" 제품을 삭제하시겠습니까?`)) return;
    deleteMutation.mutate({ id });
  }

  if (products.length === 0) {
    return <p className="py-6 text-center text-gray-400">등록된 제품이 없습니다.</p>;
  }

  return (
    <div className="space-y-3">
      {products.map((p) => (
        <div key={p.id} className="border rounded-lg bg-white p-4 flex items-start gap-4">
          {/* 이미지 */}
          <div className="flex-shrink-0">
            {p.imageUrl ? (
              <img src={p.imageUrl} alt={p.name} className="h-12 w-12 md:h-14 md:w-14 rounded object-cover" />
            ) : (
              <div className="h-12 w-12 md:h-14 md:w-14 rounded bg-gray-100" />
            )}
          </div>
          {/* 정보 */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <p className="text-sm font-medium truncate">{p.name}</p>
              <Badge variant={p.isPublished ? 'default' : 'secondary'} className="flex-shrink-0">
                {p.isPublished ? '게시' : '미게시'}
              </Badge>
            </div>
            <p className="text-xs text-gray-500 font-mono">{p.modelNo}</p>
            <p className="text-xs text-gray-400 mt-1">{p.createdAt?.slice(0, 10)}</p>
          </div>
          {/* 액션 */}
          <div className="flex flex-col sm:flex-row gap-2 flex-shrink-0">
            <Link href={`/admin/products/${p.id}/edit`} className="inline-flex items-center justify-center rounded border border-border bg-background px-3 py-1.5 text-xs font-medium hover:bg-muted">수정</Link>
            <Button variant="destructive" size="sm" className="text-xs" onClick={() => handleDelete(p.id, p.name)} disabled={deleteMutation.isPending}>삭제</Button>
          </div>
        </div>
      ))}
    </div>
  );
}