import { notFound } from 'next/navigation';
import { api } from '~/trpc/server';
import { ProductForm } from '~/components/admin/product-form';

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [product, categories] = await Promise.all([
    api.product.byId({ id }),
    api.category.list(),
  ]);

  if (!product) notFound();

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-[#0F2240]">제품 수정</h2>
      <ProductForm categories={categories} initialValues={product} />
    </div>
  );
}