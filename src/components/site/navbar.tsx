'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { href: '/', label: '홈' },
  { href: '/products', label: '제품소개' },
  { href: '/about', label: '회사소개' },
  { href: '/inquiry', label: '견적문의' },
];

export function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-[#0F2240] h-16 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 h-full flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex flex-col leading-tight">
          <span className="text-white font-bold text-xl tracking-tight" style={{ fontFamily: 'Pretendard Variable, Pretendard, sans-serif' }}>
            Volker Power
          </span>
          <span className="text-[#7B9DD3] text-[10px] tracking-wide">Global Inverter Manufacturer</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors ${ pathname === link.href ? 'text-white underline underline-offset-4 decoration-[#F08C00]' : 'text-[#A8BFE2] hover:text-white' }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* CTA */}
        <div className="hidden md:flex items-center">
          <Link
            href="/inquiry"
            className="bg-[#F08C00] text-white text-sm font-semibold px-4 py-2 rounded-[6px] hover:bg-[#D47200] transition-colors"
          >
            견적 문의
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden text-white p-1"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="메뉴 토글"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#0A1628] border-t border-[#162F55] px-4 pb-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className={`block py-3 text-sm font-medium border-b border-[#162F55] last:border-0 ${ pathname === link.href ? 'text-[#F08C00]' : 'text-[#A8BFE2]' }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/inquiry"
            onClick={() => setMenuOpen(false)}
            className="mt-3 block bg-[#F08C00] text-white text-sm font-semibold px-4 py-2 rounded-[6px] text-center hover:bg-[#D47200] transition-colors"
          >
            견적 문의
          </Link>
        </div>
      )}
    </header>
  );
}