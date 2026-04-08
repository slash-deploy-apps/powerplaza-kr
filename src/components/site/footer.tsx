import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-[#0C0F14] text-[#8897AD]">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* 회사소개 */}
          <div>
            <div className="mb-3">
              <span className="text-white font-bold text-lg">PowerPlaza</span>
              <span className="block text-[#4D7CC5] text-xs mt-0.5">파워프라자</span>
            </div>
            <p className="text-xs leading-relaxed">
              순정사인파 인버터 및 SMPS 전문업체<br />
              Volker Power 국내 공식 공급 파트너
            </p>
          </div>

          {/* 제품 */}
          <div>
            <h4 className="text-white text-sm font-semibold mb-3">제품</h4>
            <ul className="space-y-2 text-xs">
              <li><Link href="/products" className="hover:text-white transition-colors">전체 제품</Link></li>
              <li><Link href="/products?categoryId=inverter" className="hover:text-white transition-colors">순정사인파 인버터</Link></li>
              <li><Link href="/products?categoryId=smps" className="hover:text-white transition-colors">SMPS 전원공급장치</Link></li>
              <li><Link href="/products?categoryId=charger" className="hover:text-white transition-colors">배터리 충전기</Link></li>
            </ul>
          </div>

          {/* 고객지원 */}
          <div>
            <h4 className="text-white text-sm font-semibold mb-3">고객지원</h4>
            <ul className="space-y-2 text-xs">
              <li><Link href="/inquiry" className="hover:text-white transition-colors">견적 문의</Link></li>
              <li><Link href="/about" className="hover:text-white transition-colors">회사 소개</Link></li>
            </ul>
          </div>

          {/* 연락처 */}
          <div>
            <h4 className="text-white text-sm font-semibold mb-3">연락처</h4>
            <ul className="space-y-2 text-xs">
              <li>Email: info@powerplaza.co.kr</li>
              <li>Tel: 02-0000-0000</li>
              <li>서울특별시 구로구</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-[#1E293B] text-xs text-[#4A5568]">
          <p>파워프라자 | 사업자등록번호: 000-00-00000 | 대표: 파워프라자 | &copy; 2024 PowerPlaza. All rights reserved.</p>
          <p className="mt-1">Volker Power 국내 공식 공급 파트너 | 제품 문의: info@powerplaza.co.kr</p>
        </div>
      </div>
    </footer>
  );
}