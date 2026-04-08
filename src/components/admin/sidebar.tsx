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

export function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    await authClient.signOut();
    router.push('/admin/login');
  }

  return (
    <aside className="flex w-56 flex-col bg-[#0F2240] text-white">
      <div className="px-6 py-5 border-b border-white/10">
        <span className="font-bold text-lg tracking-tight">PowerPlaza</span>
      </div>
      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
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
  );
}