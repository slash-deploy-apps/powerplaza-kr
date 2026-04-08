'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { authClient } from '~/server/better-auth/client';
import { useRouter } from 'next/navigation';

const navItems = [
  { href: '/admin/dashboard', label: '대시보드' },
  { href: '/admin/products', label: '제품 관리' },
  { href: '/admin/inquiries', label: '문의 관리' },
];

export function AdminSidebar({ open, onClose }: { open: boolean; onClose: () => void }) {
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    await authClient.signOut();
    router.push('/admin/login');
  }

  return (
    <>
      {/* 모바일 오버레이 */}
      {open && (
        <div className="fixed inset-0 z-40 bg-black/50 md:hidden" onClick={onClose} />
      )}

      {/* 사이드바 */}
      <aside
        className={
          'fixed top-0 left-0 z-50 h-full w-64 flex flex-col bg-[#0F2240] text-white transition-transform duration-200 md:static md:z-auto md:h-auto md:translate-x-0 md:w-56 ' +
          (open ? 'translate-x-0' : '-translate-x-full')
        }
      >
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
          <span className="font-bold text-lg tracking-tight">Volker Power</span>
          <button onClick={onClose} className="md:hidden text-white/70 hover:text-white">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12" /></svg>
          </button>
        </div>
        <nav className="flex-1 px-3 py-4 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className={[
                'block px-3 py-2 rounded text-sm transition-colors',
                pathname.startsWith(item.href)
                  ? 'bg-white/20 text-white font-medium'
                  : 'text-white/70 hover:bg-white/10 hover:text-white',
              ].join(' ')}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="px-3 py-4 border-t border-white/10">
          <button
            onClick={handleLogout}
            className="w-full px-3 py-2 rounded text-sm text-white/70 hover:bg-white/10 hover:text-white transition-colors text-left"
          >
            로그아웃
          </button>
        </div>
      </aside>
    </>
  );
}