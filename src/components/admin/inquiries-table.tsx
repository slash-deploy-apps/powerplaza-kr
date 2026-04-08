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

  if (inquiries.length === 0) {
    return <p className="py-6 text-center text-gray-400">문의가 없습니다.</p>;
  }

  return (
    <div className="space-y-3">
      {inquiries.map((inq) => {
        const isExpanded = expandedId === inq.id;
        return (
          <div key={inq.id} className="border rounded-lg bg-white overflow-hidden">
            {/* 카드 헤더 - 항상 보임 */}
            <button
              className="w-full text-left px-4 py-3 flex items-center justify-between gap-2 hover:bg-gray-50"
              onClick={() => setExpandedId(isExpanded ? null : inq.id)}
            >
              <div className="flex items-center gap-3 min-w-0">
                <Badge variant={STATUS_VARIANT[(inq.status as StatusKey) ?? 'new']}>
                  {STATUS_LABEL[inq.status ?? 'new']}
                </Badge>
                <div className="min-w-0">
                  <p className="text-sm font-medium truncate">{inq.company}</p>
                  <p className="text-xs text-gray-500">{inq.name} · {inq.createdAt?.slice(0, 10)}</p>
                </div>
              </div>
              <svg className={`w-4 h-4 text-gray-400 transition-transform flex-shrink-0 ${isExpanded ? 'rotate-180' : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6" /></svg>
            </button>

            {/* 확장 영역 */}
            {isExpanded && (
              <div className="px-4 pb-4 space-y-3 border-t bg-gray-50/50">
                <div className="pt-3 grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                  <div><span className="text-gray-500">이메일:</span> <span className="break-all">{inq.email}</span></div>
                  <div><span className="text-gray-500">연락처:</span> {inq.phone ?? '-'}</div>
                  <div><span className="text-gray-500">제품:</span> {inq.productName ?? '-'}</div>
                  <div><span className="text-gray-500">수량:</span> {inq.quantity ?? '-'}</div>
                </div>
                <div className="text-sm bg-white rounded-md p-3 border">
                  <p className="text-gray-500 text-xs mb-1">요청사항</p>
                  <p className="whitespace-pre-wrap">{inq.message}</p>
                </div>
                <div className="flex gap-2">
                  {inq.status === 'new' && (
                    <Button size="sm" variant="outline" onClick={() => markRead.mutate({ id: inq.id, status: 'read' })} disabled={markRead.isPending}>확인</Button>
                  )}
                  {inq.status !== 'replied' && (
                    <Button size="sm" variant="outline" onClick={() => markRead.mutate({ id: inq.id, status: 'replied' })} disabled={markRead.isPending}>답변완료</Button>
                  )}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}