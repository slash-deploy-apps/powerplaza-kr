'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { authClient } from '~/server/better-auth/client';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSignIn(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await authClient.signIn.email({ email, password });
      if (res.error) {
        setError('이메일 또는 비밀번호가 올바르지 않습니다.');
      } else {
        router.push('/admin/dashboard');
      }
    } catch {
      setError('로그인에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setLoading(false);
    }
  }
  return (
    <div className="min-h-screen bg-[#0F2240] flex items-center justify-center p-4">
      {/* 배경 그리드 패턴 */}
      <div className="absolute inset-0 opacity-[0.04]" style={{
        backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 40px, #fff 40px, #fff 41px), repeating-linear-gradient(90deg, transparent, transparent 40px, #fff 40px, #fff 41px)'
      }} />

      <div className="relative w-full max-w-md">
        {/* 로고 */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-[#F08C00] rounded-[6px] flex items-center justify-center">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
              </svg>
            </div>
            <span className="text-2xl font-bold text-white tracking-tight">PowerPlaza</span>
          </div>
          <p className="text-[#8891A8] text-sm">관리자 포털</p>
        </div>

        {/* 카드 */}
        <div className="bg-white rounded-[8px] shadow-2xl overflow-hidden">
          {/* 헤더 */}
          <div className="px-8 pt-8 pb-6 border-b border-[#D8DCE8]">
            <h2 className="text-lg font-semibold text-[#0F2240]">로그인</h2>
            <p className="text-sm text-[#636D87] mt-1">관리자 계정으로 로그인하세요</p>
          </div>

          {/* 폼 */}
          <div className="p-8">
            <form onSubmit={handleSignIn} className="space-y-5">
              <div className="space-y-1.5">
                <Label htmlFor="email" className="text-xs font-medium text-[#454D63] uppercase tracking-wide">이메일</Label>
                <Input id="email" type="email" placeholder="admin@powerplaza.co.kr" value={email} onChange={(e) => setEmail(e.target.value)} className="h-11 bg-[#F4F5F8] border-[#D8DCE8] focus:bg-white focus:border-[#2654A0] rounded-[6px]" required />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="password" className="text-xs font-medium text-[#454D63] uppercase tracking-wide">비밀번호</Label>
                <Input id="password" type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} className="h-11 bg-[#F4F5F8] border-[#D8DCE8] focus:bg-white focus:border-[#2654A0] rounded-[6px]" required />
              </div>
              {error && (
                <div className="flex items-center gap-2 bg-[#FEE2E2] border border-[#C42B2B]/20 rounded-[6px] px-3 py-2.5">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#C42B2B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                  <p className="text-xs text-[#C42B2B]">{error}</p>
                </div>
              )}
              <Button type="submit" disabled={loading} className="w-full h-11 bg-[#F08C00] hover:bg-[#D47200] text-white font-medium rounded-[6px] transition-colors">
                {loading ? <span className="flex items-center gap-2"><svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>로그인 중...</span> : '로그인'}
              </Button>
            </form>
          </div>
        </div>

        <p className="text-center text-[#636D87] text-xs mt-6">© 2024 PowerPlaza. 관리자 전용 페이지입니다.</p>
      </div>
    </div>
  );
}