'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '~/trpc/react';
import { Badge } from '~/components/ui/badge';
import { Button } from '~/components/ui/button';

type Inquiry = {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string | null;
  productName: string | null;
  quantity: string | null;
  message: string;
  status: string | null;
  createdAt: string | null;
};

const STATUS_LABEL: Record<string, string> = {
  new: '신규',
  read: '확인완료',
  replied: '답변완료',
};

type StatusKey = 'new' | 'read' | 'replied';

const STATUS_VARIANT: Record<StatusKey, 'default' | 'secondary' | 'outline'> = {
  new: 'default',
  read: 'secondary',
  replied: 'outline',
};

export function InquiriesTable({ inquiries }: { inquiries: Inquiry[] }) {
  const router = useRouter();
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const markRead = api.inquiry.markRead.useMutation({ onSuccess: () => router.refresh() });

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b bg-gray-50 text-left">
            <th className="px-4 py-3 font-medium text-gray-600">접수일</th>
            <th className="px-4 py-3 font-medium text-gray-600">회사명</th>
            <th className="px-4 py-3 font-medium text-gray-600">담당자</th>
            <th className="px-4 py-3 font-medium text-gray-600">이메일</th>
            <th className="px-4 py-3 font-medium text-gray-600">제품</th>
            <th className="px-4 py-3 font-medium text-gray-600">수량</th>
            <th className="px-4 py-3 font-medium text-gray-600">상태</th>
            <th className="px-4 py-3 font-medium text-gray-600">액션</th>
          </tr>
        </thead>
        <tbody>
          {inquiries.map((inq) => (
            <>
              <tr
                key={inq.id}
                className="border-b hover:bg-gray-50 cursor-pointer"
                onClick={() => setExpandedId(expandedId === inq.id ? null : inq.id)}
              >
                <td className="px-4 py-3 text-gray-500">{inq.createdAt?.slice(0, 10)}</td>
                <td className="px-4 py-3">{inq.company}</td>
                <td className="px-4 py-3">{inq.name}</td>
                <td className="px-4 py-3 text-gray-600">{inq.email}</td>
                <td className="px-4 py-3">{inq.productName ?? '-'}</td>
                <td className="px-4 py-3">{inq.quantity ?? '-'}</td>
                <td className="px-4 py-3">
                  <Badge variant={STATUS_VARIANT[(inq.status as StatusKey) ?? 'new']}>
                    {STATUS_LABEL[inq.status ?? 'new']}
                  </Badge>
                </td>
                <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
                  <div className="flex gap-1">
                    {inq.status === 'new' && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => markRead.mutate({ id: inq.id, status: 'read' })}
                        disabled={markRead.isPending}
                      >
                        확인
                      </Button>
                    )}
                    {inq.status !== 'replied' && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => markRead.mutate({ id: inq.id, status: 'replied' })}
                        disabled={markRead.isPending}
                      >
                        답변완료
                      </Button>
                    )}
                  </div>
                </td>
              </tr>
              {expandedId === inq.id && (
                <tr key={`${inq.id}-detail`} className="border-b bg-blue-50">
                  <td colSpan={8} className="px-4 py-3">
                    <div className="space-y-1">
                      <p className="text-xs text-gray-500">연락처: {inq.phone ?? '-'}</p>
                      <p className="text-sm whitespace-pre-wrap">{inq.message}</p>
                    </div>
                  </td>
                </tr>
              )}
            </>
          ))}
          {inquiries.length === 0 && (
            <tr>
              <td colSpan={8} className="px-4 py-6 text-center text-gray-400">문의가 없습니다.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}