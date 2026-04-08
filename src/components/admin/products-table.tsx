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

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b bg-gray-50 text-left">
            <th className="px-4 py-3 font-medium text-gray-600">이미지</th>
            <th className="px-4 py-3 font-medium text-gray-600">제품명</th>
            <th className="px-4 py-3 font-medium text-gray-600">모델번호</th>
            <th className="px-4 py-3 font-medium text-gray-600">게시여부</th>
            <th className="px-4 py-3 font-medium text-gray-600">등록일</th>
            <th className="px-4 py-3 font-medium text-gray-600">액션</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.id} className="border-b last:border-0 hover:bg-gray-50">
              <td className="px-4 py-3">
                {p.imageUrl ? (
                  <img src={p.imageUrl} alt={p.name} className="h-10 w-10 rounded object-cover" />
                ) : (
                  <div className="h-10 w-10 rounded bg-gray-100" />
                )}
              </td>
              <td className="px-4 py-3 font-medium">{p.name}</td>
              <td className="px-4 py-3 font-mono text-xs text-gray-600">{p.modelNo}</td>
              <td className="px-4 py-3">
                <Badge variant={p.isPublished ? 'default' : 'secondary'}>
                  {p.isPublished ? '게시' : '미게시'}
                </Badge>
              </td>
              <td className="px-4 py-3 text-gray-500">{p.createdAt?.slice(0, 10)}</td>
              <td className="px-4 py-3">
                <div className="flex gap-2">
                  <Link href={`/admin/products/${p.id}/edit`} className="inline-flex items-center rounded-[min(var(--radius-md),12px)] border border-border bg-background px-2.5 py-1 text-[0.8rem] font-medium hover:bg-muted">수정</Link>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(p.id, p.name)}
                    disabled={deleteMutation.isPending}
                  >
                    삭제
                  </Button>
                </div>
              </td>
            </tr>
          ))}
          {products.length === 0 && (
            <tr>
              <td colSpan={6} className="px-4 py-6 text-center text-gray-400">등록된 제품이 없습니다.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}