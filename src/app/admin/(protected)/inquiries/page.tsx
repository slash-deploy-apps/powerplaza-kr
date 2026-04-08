import Link from 'next/link';
import { api } from '~/trpc/server';
import { Card } from '~/components/ui/card';
import { InquiriesTable } from '~/components/admin/inquiries-table';

type StatusFilter = 'new' | 'read' | 'replied' | undefined;

const TABS = [
  { label: '전체', value: undefined },
  { label: '신규', value: 'new' },
  { label: '확인완료', value: 'read' },
  { label: '답변완료', value: 'replied' },
] as const;

export default async function AdminInquiriesPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const { status: statusStr } = await searchParams;
  const status = (statusStr as StatusFilter) ?? undefined;

  const inquiries = await api.inquiry.list({ status, page: 1, limit: 50 });

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-[#0F2240]">문의 관리</h2>
      <div className="flex gap-1 border-b">
        {TABS.map((tab) => {
          const href = tab.value ? `/admin/inquiries?status=${tab.value}` : '/admin/inquiries';
          const isActive = status === tab.value;
          return (
            <Link
              key={tab.label}
              href={href}
              className={[
                'px-4 py-2 text-sm border-b-2 transition-colors',
                isActive ? 'border-[#0F2240] text-[#0F2240] font-medium' : 'border-transparent text-gray-500 hover:text-gray-700',
              ].join(' ')}
            >
              {tab.label}
            </Link>
          );
        })}
      </div>
      <Card>
        <InquiriesTable inquiries={inquiries} />
      </Card>
    </div>
  );
}