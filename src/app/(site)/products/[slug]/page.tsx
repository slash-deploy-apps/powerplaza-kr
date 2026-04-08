import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { api } from '~/trpc/server';

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;
  const product = await api.product.bySlug({ slug });

  if (!product) notFound();

  const specs: Record<string, string | null | undefined> = {};
  if (product.specs) {
    try {
      const parsed = JSON.parse(product.specs) as Record<string, string>;
      Object.assign(specs, parsed);
    } catch { /* ignore malformed JSON */ }
  }

  const features: string[] = [];
  if (product.features) {
    try {
      const parsed = JSON.parse(product.features) as string[];
      features.push(...parsed);
    } catch {
      features.push(product.features);
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      {/* Breadcrumb */}
      <nav className="text-xs text-[#636D87] mb-6 flex items-center gap-1">
        <Link href="/" className="hover:text-[#2654A0]">홈</Link>
        <span>/</span>
        <Link href="/products" className="hover:text-[#2654A0]">제품</Link>
        <span>/</span>
        <span className="text-[#334155]">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Image */}
        <div className="md:col-span-5">
          <div className="relative aspect-square bg-[#F4F5F8] rounded-[6px] border border-[#D8DCE8] overflow-hidden">
            {product.imageUrl ? (
              <Image
                src={product.imageUrl}
                alt={product.name}
                fill
                className="object-contain p-8"
                sizes="(max-width: 768px) 100vw, 42vw"
                priority
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-[#B0BCCE]">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none" className="w-24 h-24">
                  <rect x="20" y="10" width="24" height="44" rx="4" fill="currentColor" opacity="0.3" />
                  <rect x="26" y="4" width="4" height="10" rx="2" fill="currentColor" />
                  <rect x="34" y="4" width="4" height="10" rx="2" fill="currentColor" />
                  <line x1="28" y1="38" x2="36" y2="38" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </div>
            )}
          </div>
        </div>

        {/* Details */}
        <div className="md:col-span-7">
          <p className="font-mono text-sm text-[#636D87] mb-1">{product.modelNo}</p>
          <h1 className="text-2xl font-bold text-[#0F2240] mb-3">{product.name}</h1>

          {/* Badges */}
          <div className="flex flex-wrap gap-2 mb-4">
            {product.certifications && (() => {
              try {
                const certs = JSON.parse(product.certifications) as string[];
                return certs.map((cert) => (
                  <span key={cert} className="text-xs px-2 py-0.5 rounded-[4px] bg-[#F4F5F8] border border-[#D8DCE8] text-[#334155]">{cert}</span>
                ));
              } catch {
                return <span className="text-xs px-2 py-0.5 rounded-[4px] bg-[#F4F5F8] border border-[#D8DCE8] text-[#334155]">{product.certifications}</span>;
              }
            })()}
          </div>

          {/* Key specs */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6 p-4 bg-[#F4F5F8] rounded-[6px]">
            {[
              { label: '입력 전압', value: product.specInputVoltage },
              { label: '출력 전압', value: product.specOutputVoltage },
              { label: '출력 전력', value: product.specPowerW ? `${product.specPowerW}W` : null },
              { label: '폼팩터', value: product.specFormFactor },
            ].map((spec) => (
              <div key={spec.label}>
                <p className="text-[10px] uppercase tracking-wide text-[#636D87] font-medium">{spec.label}</p>
                <p className="font-mono text-sm text-[#131720] font-medium">{spec.value ?? '—'}</p>
              </div>
            ))}
          </div>

          {/* Full spec table */}
          {Object.keys(specs).length > 0 && (
            <div className="mb-6">
              <h2 className="text-sm font-semibold text-[#0F2240] mb-2">상세 사양</h2>
              <table className="w-full text-sm border border-[#D8DCE8] rounded-[6px] overflow-hidden">
                <thead>
                  <tr className="bg-[#0F2240] text-white">
                    <th className="text-left px-4 py-2 font-medium text-xs uppercase tracking-wide">항목</th>
                    <th className="text-left px-4 py-2 font-medium text-xs uppercase tracking-wide">값</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(specs).map(([key, val], i) => (
                    <tr key={key} className={i % 2 === 0 ? 'bg-white' : 'bg-[#F9FAFB]'}>
                      <td className="px-4 py-2 text-[#636D87] text-xs uppercase tracking-wide">{key}</td>
                      <td className="px-4 py-2 font-mono text-[#131720]">{val ?? '—'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Features */}
          {features.length > 0 && (
            <div className="mb-6">
              <h2 className="text-sm font-semibold text-[#0F2240] mb-2">주요 특징</h2>
              <ul className="space-y-1.5">
                {features.map((feat, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-[#334155]">
                    <span className="mt-1 w-1.5 h-1.5 rounded-full bg-[#F08C00] flex-shrink-0" />
                    {feat}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Description */}
          {product.description && (
            <p className="text-sm text-[#4A5568] leading-relaxed mb-6">{product.description}</p>
          )}

          {/* CTA */}
          <Link
            href={`/inquiry?product=${product.slug}&name=${encodeURIComponent(product.name)}`}
            className="inline-block bg-[#F08C00] text-white font-semibold px-8 py-3 rounded-[6px] hover:bg-[#D47200] transition-colors text-lg"
          >
            견적 문의하기
          </Link>
        </div>
      </div>
    </div>
  );
}