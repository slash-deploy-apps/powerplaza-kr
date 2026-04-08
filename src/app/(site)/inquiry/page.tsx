'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useState, Suspense } from 'react';
import { api } from '~/trpc/react';

function InquiryForm() {
  const searchParams = useSearchParams();
  const productSlug = searchParams.get('product') ?? '';
  const productName = searchParams.get('name') ?? '';

  const [form, setForm] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    productName: productName,
    quantity: '',
    message: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [success, setSuccess] = useState(false);

  const submitMutation = api.inquiry.submit.useMutation({
    onSuccess: () => setSuccess(true),
    onError: (err) => {
      setErrors({ form: err.message });
    },
  });

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = '담당자명을 입력해주세요.';
    if (!form.company.trim()) e.company = '회사명을 입력해주세요.';
    if (!form.email.trim() || !/^[^@]+@[^@]+\.[^@]+$/.test(form.email)) e.email = '올바른 이메일 주소를 입력해주세요.';
    if (!form.message.trim()) e.message = '요청사항을 입력해주세요.';
    return e;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    submitMutation.mutate({
      name: form.name,
      company: form.company,
      email: form.email,
      phone: form.phone || undefined,
      productId: productSlug || undefined,
      productName: form.productName || undefined,
      quantity: form.quantity || undefined,
      message: form.message,
    });
  };

  if (success) {
    return (
      <div className="bg-white border border-[#D8DCE8] rounded-[6px] p-8 text-center">
        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-lg font-semibold text-[#0F2240] mb-2">견적 문의가 접수되었습니다.</h2>
        <p className="text-[#636D87] text-sm">빠른 시일 내에 연락드리겠습니다. 감사합니다.</p>
        <Link href="/" className="mt-4 inline-block text-[#2654A0] text-sm hover:underline">홈으로 돌아가기</Link>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {productName && (
        <div className="flex items-center gap-2 bg-[#EEF2F9] border border-[#D5E0F0] rounded-[6px] px-3 py-2">
          <span className="text-xs text-[#2654A0] font-medium">선택된 제품:</span>
          <span className="text-sm text-[#162F55] font-semibold">{productName}</span>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-medium text-[#334155] mb-1.5">담당자명 <span className="text-[#F08C00]">*</span></label>
          <input
            type="text"
            value={form.name}
            onChange={(e) => setForm(f => ({ ...f, name: e.target.value }))}
            placeholder="홍길동"
            className="w-full px-3 py-2 border border-[#D8DCE8] rounded-[6px] text-sm focus:outline-none focus:border-[#2654A0] focus:ring-1 focus:ring-[#2654A0]"
          />
          {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
        </div>
        <div>
          <label className="block text-xs font-medium text-[#334155] mb-1.5">회사명 <span className="text-[#F08C00]">*</span></label>
          <input
            type="text"
            value={form.company}
            onChange={(e) => setForm(f => ({ ...f, company: e.target.value }))}
            placeholder="주식회사 ABC"
            className="w-full px-3 py-2 border border-[#D8DCE8] rounded-[6px] text-sm focus:outline-none focus:border-[#2654A0] focus:ring-1 focus:ring-[#2654A0]"
          />
          {errors.company && <p className="text-xs text-red-500 mt-1">{errors.company}</p>}
        </div>
        <div>
          <label className="block text-xs font-medium text-[#334155] mb-1.5">이메일 <span className="text-[#F08C00]">*</span></label>
          <input
            type="email"
            value={form.email}
            onChange={(e) => setForm(f => ({ ...f, email: e.target.value }))}
            placeholder="you@company.com"
            className="w-full px-3 py-2 border border-[#D8DCE8] rounded-[6px] text-sm focus:outline-none focus:border-[#2654A0] focus:ring-1 focus:ring-[#2654A0]"
          />
          {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
        </div>
        <div>
          <label className="block text-xs font-medium text-[#334155] mb-1.5">연락처</label>
          <input
            type="tel"
            value={form.phone}
            onChange={(e) => setForm(f => ({ ...f, phone: e.target.value }))}
            placeholder="+82-10-0000-0000"
            className="w-full px-3 py-2 border border-[#D8DCE8] rounded-[6px] text-sm focus:outline-none focus:border-[#2654A0] focus:ring-1 focus:ring-[#2654A0]"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-[#334155] mb-1.5">제품명</label>
          <input
            type="text"
            value={form.productName}
            onChange={(e) => setForm(f => ({ ...f, productName: e.target.value }))}
            placeholder="관심 제품명"
            className="w-full px-3 py-2 border border-[#D8DCE8] rounded-[6px] text-sm focus:outline-none focus:border-[#2654A0] focus:ring-1 focus:ring-[#2654A0]"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-[#334155] mb-1.5">수량</label>
          <input
            type="text"
            value={form.quantity}
            onChange={(e) => setForm(f => ({ ...f, quantity: e.target.value }))}
            placeholder="10대"
            className="w-full px-3 py-2 border border-[#D8DCE8] rounded-[6px] text-sm focus:outline-none focus:border-[#2654A0] focus:ring-1 focus:ring-[#2654A0]"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-medium text-[#334155] mb-1.5">요청사항 <span className="text-[#F08C00]">*</span></label>
        <textarea
          value={form.message}
          onChange={(e) => setForm(f => ({ ...f, message: e.target.value }))}
          placeholder="사용 환경, 요구 사항 등을 상세히 적어주세요."
          rows={5}
          className="w-full px-3 py-2 border border-[#D8DCE8] rounded-[6px] text-sm focus:outline-none focus:border-[#2654A0] focus:ring-1 focus:ring-[#2654A0] resize-none"
        />
        {errors.message && <p className="text-xs text-red-500 mt-1">{errors.message}</p>}
      </div>

      {errors.form && <p className="text-sm text-red-500">{errors.form}</p>}

      <button
        type="submit"
        disabled={submitMutation.isPending}
        className="w-full bg-[#F08C00] text-white font-semibold py-3 rounded-[6px] hover:bg-[#D47200] transition-colors disabled:opacity-60"
      >
        {submitMutation.isPending ? '접수 중...' : '견적 문의 제출'}
      </button>
    </form>
  );
}

export default function InquiryPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <div className="mb-8">
        <p className="text-xs font-semibold uppercase tracking-wide text-[#636D87] mb-1">견적 문의</p>
        <h1 className="text-2xl font-bold text-[#0F2240]">Volker Power 제품 견적 문의</h1>
        <p className="text-sm text-[#636D87] mt-2">제품명과 수량, 사용 환경을 알려주시면 48시간 이내 회신합니다.</p>
      </div>
      <div className="bg-white border border-[#D8DCE8] rounded-[6px] p-6">
        <Suspense fallback={<div className="text-sm text-[#636D87]">불러오는 중...</div>}>
          <InquiryForm />
        </Suspense>
      </div>
    </div>
  );
}