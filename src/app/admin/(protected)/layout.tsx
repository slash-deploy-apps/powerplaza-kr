import { redirect } from 'next/navigation';
import { getSession } from '~/server/better-auth/server';
import { AdminShell } from '~/components/admin/shell';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession();

  if (!session) {
    redirect('/admin/login');
  }

  return <AdminShell>{children}</AdminShell>;
}