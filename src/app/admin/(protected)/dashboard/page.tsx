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
        <Card>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-gray-50 text-left">
                  <th className="px-4 py-3 font-medium text-gray-600">접수일</th>
                  <th className="px-4 py-3 font-medium text-gray-600">회사명</th>
                  <th className="px-4 py-3 font-medium text-gray-600">담당자</th>
                  <th className="px-4 py-3 font-medium text-gray-600">제품</th>
                  <th className="px-4 py-3 font-medium text-gray-600">상태</th>
                </tr>
              </thead>
              <tbody>
                {recentInquiries.map((inq) => (
                  <tr key={inq.id} className="border-b last:border-0 hover:bg-gray-50">
                    <td className="px-4 py-3 text-gray-500">{inq.createdAt?.slice(0, 10)}</td>
                    <td className="px-4 py-3">{inq.company}</td>
                    <td className="px-4 py-3">{inq.name}</td>
                    <td className="px-4 py-3">{inq.productName ?? '-'}</td>
                    <td className="px-4 py-3">
                      <Badge variant={statusVariant[inq.status ?? 'new']}>
                        {statusLabel[inq.status ?? 'new']}
                      </Badge>
                    </td>
                  </tr>
                ))}
                {recentInquiries.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-4 py-6 text-center text-gray-400">문의가 없습니다.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
}