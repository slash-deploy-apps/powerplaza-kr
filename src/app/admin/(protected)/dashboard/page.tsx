import { api } from '~/trpc/server';
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card';
import { Badge } from '~/components/ui/badge';

export default async function AdminDashboardPage() {
  const [productData, inquiryStats, recentInquiries] = await Promise.all([
    api.product.adminList({ page: 1, limit: 1 }),
    api.inquiry.stats(),
    api.inquiry.list({ page: 1, limit: 5 }),
  ]);

  const statusLabel: Record<string, string> = {
    new: '신규',
    read: '확인완료',
    replied: '답변완료',
  };
  const statusVariant: Record<string, 'default' | 'secondary' | 'outline'> = {
    new: 'default',
    read: 'secondary',
    replied: 'outline',
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-[#0F2240]">대시보드</h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">전체 제품</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-[#0F2240]">{productData.total}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">신규 문의</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-amber-500">{inquiryStats.newCount}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">전체 문의</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-[#0F2240]">{inquiryStats.total}</p>
          </CardContent>
        </Card>
      </div>

      <div>
        <h3 className="text-base font-semibold mb-3">최근 문의</h3>
        {recentInquiries.length === 0 ? (
          <Card><p className="py-6 text-center text-gray-400">문의가 없습니다.</p></Card>
        ) : (
          <div className="space-y-2">
            {recentInquiries.map((inq) => (
              <Card key={inq.id}>
                <div className="flex items-center justify-between gap-2 p-3 md:p-4">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant={statusVariant[inq.status ?? 'new']}>
                        {statusLabel[inq.status ?? 'new']}
                      </Badge>
                      <span className="text-xs text-gray-400">{inq.createdAt?.slice(0, 10)}</span>
                    </div>
                    <p className="text-sm font-medium truncate">{inq.company} · {inq.name}</p>
                    <p className="text-xs text-gray-500 truncate">{inq.productName ?? '-'}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}