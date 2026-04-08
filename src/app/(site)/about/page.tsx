import Link from 'next/link';

export default function AboutPage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-[#0F2240] py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <p className="text-xs font-semibold uppercase tracking-wide text-[#7B9DD3] mb-2">회사 소개</p>
          <h1 className="text-3xl font-bold text-white mb-3">Volker Power 소개</h1>
          <p className="text-[#A8BFE2] max-w-xl">117개국에 수출하는 글로벌 인버터 제조기업 Volker Power의 공식 온라인 카탈로그입니다. 순정사인파 인버터, UPS 인버터, 하이브리드 인버터, 마이크로 인버터, PCBA 모듈까지 다양한 제품군을 제공합니다.</p>
        </div>
      </section>

      {/* About PowerPlaza */}
      <section className="py-14 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          <div>
            <h2 className="text-xl font-bold text-[#0F2240] mb-4">Volker Power는</h2>
            <p className="text-sm text-[#4A5568] leading-relaxed mb-4">
              VOLKER POWER PTE. LTD.는 싱가포르에 본사를 둔 전력 변환 기술 전문 기업으로, 순정사인파 인버터, UPS 인버터 충전기, 하이브리드 태양광 인버터, 마이크로 인버터, 인버터 PCBA 등 폭넓은 제품군을 생산합니다.
            </p>
            <p className="text-sm text-[#4A5568] leading-relaxed mb-4">
              117개국 이상에 제품을 수출하며, 가정용 태양광 인버터, 하이브리드 인버터 및 관련 전력 변환 솔루션을 전문으로 합니다. 6,000㎡ 규모의 제조 시설을 보유하고 있으며, OEM/ODM 서비스도 제공합니다.
            </p>
            <p className="text-sm text-[#4A5568] leading-relaxed">
              500W부터 10.2kW까지 다양한 출력 등급의 제품을 CE, RoHS, ISO9001 인증으로 글로벌 품질을 보장합니다.
            </p>
          </div>
          <div className="space-y-4">
            {[
              { year: '2018', text: 'VOLKER POWER PTE. LTD. 싱가포르 법인 설립, 글로벌 수출 허브 구축' },
              { year: '2020', text: 'CE, RoHS 인증 획득, ISO9001/14001/45001 품질경영시스템 구축' },
              { year: '2024', text: '117개국 수출 달성, 6,000㎡ 제조시설 확장' },
              { year: '2025', text: '온라인 제품 카탈로그 및 글로벌 견적 서비스 론칭' },
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
            <p className="text-xs font-semibold uppercase tracking-wide text-[#636D87] mb-1">Volker Power</p>
            <h2 className="text-xl font-bold text-[#0F2240]">왜 Volker Power인가</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: '글로벌 수출 실적', desc: '117개국 이상에 제품을 수출하며 검증된 품질과 신뢰성을 자랑합니다. 순정사인파 인버터 기술을 선도하는 기업입니다.' },
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
              <li>Email: admin@volkerpower.com</li>
              <li>Tel: +65 8285-8965</li>
              <li>주소: 266A South Bridge Road #02-01, Singapore 058815</li>
              <li>영업시간: 월~금 09:00 ~ 18:00 (SGT)</li>
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