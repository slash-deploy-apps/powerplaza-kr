import Link from 'next/link';

type Category = {
  id: string;
  name: string;
  slug: string;
};

type CategorySidebarProps = {
  categories: Category[];
  activeCategoryId?: string;
};

export function CategorySidebar({ categories, activeCategoryId }: CategorySidebarProps) {
  return (
    <aside className="w-full">
      <h2 className="text-xs font-semibold uppercase tracking-wide text-[#636D87] mb-2 px-3">카테고리</h2>
      <ul>
        <li>
          <Link
            href="/products"
            className={`flex items-center px-3 py-2.5 text-sm rounded-[6px] transition-colors ${ !activeCategoryId ? 'text-[#2654A0] font-semibold bg-[#EEF2F9] border-l-[3px] border-[#F08C00]' : 'text-[#334155] hover:bg-[#F4F5F8]' }`}
          >
            전체
          </Link>
        </li>
        {categories.map((cat) => (
          <li key={cat.id}>
            <Link
              href={`/products?categoryId=${cat.id}`}
              className={`flex items-center px-3 py-2.5 text-sm rounded-[6px] transition-colors ${ activeCategoryId === cat.id ? 'text-[#2654A0] font-semibold bg-[#EEF2F9] border-l-[3px] border-[#F08C00]' : 'text-[#334155] hover:bg-[#F4F5F8]' }`}
            >
              {cat.name}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}