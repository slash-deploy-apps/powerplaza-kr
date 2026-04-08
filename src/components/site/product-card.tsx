import Image from 'next/image';
import Link from 'next/link';

type ProductCardProps = {
  product: {
    id: string;
    slug: string;
    name: string;
    modelNo: string;
    categoryId: string;
    imageUrl?: string | null;
    specInputVoltage?: string | null;
    specOutputVoltage?: string | null;
    specPowerW?: string | null;
    specFormFactor?: string | null;
    categories?: { name: string } | null;
  };
};

function PowerPlugIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none" className="w-16 h-16 text-[#B0BCCE]">
      <rect x="24" y="4" width="4" height="12" rx="2" fill="currentColor" />
      <rect x="36" y="4" width="4" height="12" rx="2" fill="currentColor" />
      <path d="M16 16h32v12a16 16 0 01-32 0V16z" fill="currentColor" opacity="0.3" />
      <path d="M30 28v16" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <path d="M24 44h16" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

export function ProductCard({ product }: ProductCardProps) {
  const specs = [
    { label: '입력 전압', value: product.specInputVoltage },
    { label: '입력 전압', value: product.specOutputVoltage },
    { label: '출력', value: product.specPowerW ? `${product.specPowerW}W` : null },
    { label: '폼팩터', value: product.specFormFactor },
  ];

  return (
    <div className="bg-white border border-[#D8DCE8] rounded-[6px] hover:border-[#B5BCD0] transition-colors overflow-hidden flex flex-col">
      {/* Image */}
      <div className="relative aspect-[4/3] bg-[#F4F5F8] overflow-hidden">
        {product.imageUrl ? (
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            className="object-contain p-4"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <PowerPlugIcon />
          </div>
        )}
      </div>

      <div className="p-4 flex flex-col flex-1">
        {/* Series badge */}
        {product.categories?.name && (
          <span className="inline-block mb-2 bg-[#D4E2F5] text-[#162F55] text-xs px-2 py-0.5 rounded-[4px] w-fit">
            {product.categories.name}
          </span>
        )}

        {/* Model number */}
        <p className="font-mono font-medium text-sm text-[#636D87] mb-0.5">{product.modelNo}</p>

        {/* Name */}
        <h3 className="text-[#131720] font-semibold text-base mb-3 line-clamp-2 flex-1">{product.name}</h3>

        {/* Spec grid */}
        <div className="grid grid-cols-2 gap-x-3 gap-y-2 mb-4 pb-4 border-b border-[#F4F5F8]">
          {specs.map((spec) => (
            <div key={spec.label}>
              <p className="text-[10px] uppercase tracking-wide text-[#636D87] font-medium">{spec.label}</p>
              <p className="font-mono text-sm text-[#131720]">{spec.value ?? '—'}</p>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <Link
            href={`/inquiry?product=${product.slug}&name=${encodeURIComponent(product.name)}`}
            className="flex-1 bg-[#F08C00] text-white text-xs font-semibold px-3 py-2 rounded-[6px] hover:bg-[#D47200] transition-colors text-center"
          >
            견적 문의
          </Link>
          <Link
            href={`/products/${product.slug}`}
            className="flex-1 border border-[#D8DCE8] text-[#2654A0] text-xs font-medium px-3 py-2 rounded-[6px] hover:bg-[#F4F5F8] transition-colors text-center"
          >
            자세히 보기
          </Link>
        </div>
      </div>
    </div>
  );
}