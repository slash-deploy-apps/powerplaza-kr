import { redirect } from 'next/navigation';
import { getSession } from '~/server/better-auth/server';
import { AdminSidebar } from '~/components/admin/sidebar';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession();

  if (!session) {
    redirect('/admin/login');
  }

  return (
    <div className="flex h-screen bg-[#F9FAFB]">
      <AdminSidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <header className="border-b bg-white px-6 py-4">
          <h1 className="text-lg font-semibold text-[#0F2240]">Volker Power 관리자</h1>
        </header>
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}