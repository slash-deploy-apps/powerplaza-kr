import Link from 'next/link';

export default function AboutPage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-[#0F2240] py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <p className="text-xs font-semibold uppercase tracking-wide text-[#7B9DD3] mb-2">회사 소개</p>
          <h1 className="text-3xl font-bold text-white mb-3">파워프라자 소개</h1>
          <p className="text-[#A8BFE2] max-w-xl">30년 이상의 노하우를 가진 순정사인파 인버터 전문업체, 파워프라자는 Volker Power의 신뢰할 수 있는 국내 공식 파트너입니다.</p>
        </div>
      </section>

      {/* About PowerPlaza */}
      <section className="py-14 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          <div>
            <h2 className="text-xl font-bold text-[#0F2240] mb-4">파워프라자는</h2>
            <p className="text-sm text-[#4A5568] leading-relaxed mb-4">
              파워프라자는 순정사인파 인버터와 SMPS 전원공급장치의 도소매업체로, 전력 변환 기술 분야에서 입증된 전문 기업입니다.
            </p>
            <p className="text-sm text-[#4A5568] leading-relaxed mb-4">
              저희는 다양한 산업 분야의 고객들에게 맞춤형 전원 솔루션을 제공하며, 머신, 에너지, 통신, 의료, 제조 등 폭넓은 영역에서 시스템 안정성을 높이고 있습니다.
            </p>
            <p className="text-sm text-[#4A5568] leading-relaxed">
              다양한 Volker Power 제품군을 통해 고객의 요구에 정확히 맞는 제품을 합리적 가격으로 공급하고 있습니다.
            </p>
          </div>
          <div className="space-y-4">
            {[
              { year: '1993', text: 'Volker Power GmbH 독일에서 설립, 순정사인파 1전원부터 주력' },
              { year: '2010', text: 'CE 참학, RoHS 환경 규제 준수 풍질 시스템 구축' },
              { year: '2020', text: '파워프라자, Volker Power 국내 공식 파트너십 체결' },
              { year: '2024', text: '온라인 제품 카탈로그 및 빠른 견적 서비스 론칭' },
            ].map((item) => (
              <div key={item.year} className="flex gap-4 items-start">
                <span className="font-mono text-sm font-medium text-[#2654A0] w-12 flex-shrink-0">{item.year}</span>
                <p className="text-sm text-[#4A5568]">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Volker Power Partnership */}
      <section className="py-14 px-4 bg-white border-t border-[#D8DCE8]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <p className="text-xs font-semibold uppercase tracking-wide text-[#636D87] mb-1">Volker Power 파트너십</p>
            <h2 className="text-xl font-bold text-[#0F2240]">파워프라자가 Volker Power를 선택한 이유</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: '30년 기술 이상', desc: '1993년 설립 이래 순정사인파 인버터 기술을 선도하는 Volker Power의 제품은 신뢰성과 성능으로 설증됩니다.' },
              { title: '다양한 제품군', desc: '500W부터 10kW까지, 다양한 출력 등급의 제품을 보유하여 어떤 요구사항에도 대응할 수 있습니다.' },
              { title: '글로벌 인증', desc: 'CE, RoHS 인증을 통해 안전성과 환경 규제 준수를 증명하였습니다.' },
            ].map((item) => (
              <div key={item.title} className="border border-[#D8DCE8] rounded-[6px] p-6">
                <h3 className="font-semibold text-[#0F2240] mb-2">{item.title}</h3>
                <p className="text-sm text-[#4A5568] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-14 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-xl font-bold text-[#0F2240] mb-6">인증 현황</h2>
          <div className="flex flex-wrap gap-3">
            {['CE', 'RoHS', 'ISO 9001', 'IP20', 'IP65'].map((cert) => (
              <span key={cert} className="px-4 py-2 border-2 border-[#2654A0] text-[#2654A0] font-semibold rounded-[6px] text-sm font-mono">
                {cert}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-14 px-4 bg-[#0F2240]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-xl font-bold text-white mb-4">연락처</h2>
            <ul className="space-y-2 text-sm text-[#A8BFE2]">
              <li>Email: info@powerplaza.co.kr</li>
              <li>Tel: 02-0000-0000</li>
              <li>주소: 서울특별시 구로구</li>
              <li>영업시간: 월리일 09:00 ~ 18:00</li>
            </ul>
          </div>
          <div className="flex items-center">
            <Link
              href="/inquiry"
              className="inline-block bg-[#F08C00] text-white font-semibold px-8 py-3 rounded-[6px] hover:bg-[#D47200] transition-colors"
            >
              견적 문의하기
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}