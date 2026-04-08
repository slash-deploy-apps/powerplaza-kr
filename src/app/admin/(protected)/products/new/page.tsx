import { api } from '~/trpc/server';
import { ProductForm } from '~/components/admin/product-form';

export default async function NewProductPage() {
  const categories = await api.category.list();

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-[#0F2240]">새 제품 등록</h2>
      <ProductForm categories={categories} />
    </div>
  );
}