import Link from 'next/link';
import { api } from '~/trpc/server';
import { ProductCard } from '~/components/site/product-card';

export default async function HomePage() {
  const featured = await api.product.featured();

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#0F2240] to-[#0A1628] py-20 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 text-center md:text-left">
            <div className="inline-block bg-[#162F55] text-[#7B9DD3] text-xs font-medium px-3 py-1 rounded-[4px] mb-4 tracking-wide">
              Volker Power 수입 전문 유통사
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-4">
              Volker Power<br />
              <span className="text-[#F08C00]">정품 인버터</span>
            </h1>
            <p className="text-[#A8BFE2] text-lg mb-8">
              순정사인파 인버터 국내 공식 공급<br />
              CE/RoHS 인증, 빠른 견적 응대
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
              <Link
                href="/products"
                className="border border-white text-white font-semibold px-6 py-3 rounded-[6px] hover:bg-white hover:text-[#0F2240] transition-colors text-center"
              >
                제품 보기
              </Link>
              <Link
                href="/inquiry"
                className="bg-[#F08C00] text-white font-semibold px-6 py-3 rounded-[6px] hover:bg-[#D47200] transition-colors text-center"
              >
                견적 문의
              </Link>
            </div>
          </div>

          <div className="flex-shrink-0 flex items-center justify-center w-64 h-64 bg-[#162F55] rounded-[12px]">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" fill="none" className="w-40 h-40">
              <rect x="20" y="30" width="80" height="60" rx="4" fill="#1E4380" stroke="#4D7CC5" strokeWidth="2" />
              <rect x="30" y="40" width="60" height="40" rx="2" fill="#0F2240" />
              <line x1="40" y1="55" x2="80" y2="55" stroke="#F08C00" strokeWidth="2" strokeLinecap="round" />
              <line x1="40" y1="63" x2="65" y2="63" stroke="#4D7CC5" strokeWidth="2" strokeLinecap="round" />
              <circle cx="75" cy="63" r="3" fill="#F08C00" />
              <rect x="50" y="90" width="20" height="6" rx="2" fill="#4D7CC5" />
              <rect x="55" y="96" width="10" height="4" rx="1" fill="#2654A0" />
            </svg>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="bg-[#0F2240] border-t border-[#162F55] py-4 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          {[
            { value: '30+', label: '연간 공급 제품' },
            { value: 'CE/RoHS', label: '인증 완료' },
            { value: '48H', label: '견적 응답' },
            { value: '1993', label: 'Volker Power 설립' },
          ].map((stat) => (
            <div key={stat.label}>
              <p className="font-mono font-medium text-[#F08C00] text-lg">{stat.value}</p>
              <p className="text-[#7B9DD3] text-xs">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-[#636D87] mb-1">주요 제품</p>
              <h2 className="text-2xl font-bold text-[#0F2240]">Volker Power 제품군</h2>
            </div>
            <Link href="/products" className="text-[#2654A0] text-sm font-medium hover:underline">전체 보기</Link>
          </div>

          {featured.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {featured.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 text-[#636D87]">
              <p>제품을 등록하는 중입니다.</p>
              <Link href="/products" className="text-[#2654A0] text-sm mt-2 inline-block hover:underline">제품 보기</Link>
            </div>
          )}
        </div>
      </section>

      {/* Why PowerPlaza */}
      <section className="py-16 px-4 bg-white border-t border-[#D8DCE8]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-xs font-semibold uppercase tracking-wide text-[#636D87] mb-1">우리를 선택하는 이유</p>
            <h2 className="text-2xl font-bold text-[#0F2240]">왜 파워프라자인가</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: '공식 파트너십',
                desc: 'Volker Power 제품의 정품 수입 유통사입니다. 제품 신뢰성과 품질을 보장합니다.',
              },
              {
                title: 'CE/RoHS 인증',
                desc: '유럽 CE 인증 및 RoHS 환경 규제를 준수한 안전한 제품만 공급합니다.',
              },
              {
                title: '빠른 견적 응대',
                desc: '검토 요청시 48시간 이내 응답, 보다 빠른 납품 스케줄링을 제공합니다.',
              },
            ].map((item) => (
              <div key={item.title} className="border border-[#D8DCE8] rounded-[6px] p-6">
                <div className="w-10 h-10 bg-[#EEF2F9] rounded-[6px] mb-4 flex items-center justify-center">
                  <div className="w-3 h-3 rounded-full bg-[#2654A0]" />
                </div>
                <h3 className="font-semibold text-[#0F2240] mb-2">{item.title}</h3>
                <p className="text-sm text-[#4A5568] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-14 px-4 bg-[#0F2240]">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-white mb-3">Volker Power 제품 견적을 원하시나요?</h2>
          <p className="text-[#A8BFE2] mb-6">제품명, 수량, 사용 환경을 알려주시면 빠르게 회신하겠습니다.</p>
          <Link
            href="/inquiry"
            className="inline-block bg-[#F08C00] text-white font-semibold px-8 py-3 rounded-[6px] hover:bg-[#D47200] transition-colors"
          >
            견적 문의하기
          </Link>
        </div>
      </section>
    </div>
  );
}