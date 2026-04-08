'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '~/trpc/react';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';
import { Textarea } from '~/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '~/components/ui/select';

type Category = { id: string; name: string };

type ProductValues = {
  id?: string | null;
  slug: string;
  name: string;
  nameEn?: string | null;
  modelNo: string;
  categoryId: string;
  description?: string | null;
  imageUrl?: string | null;
  specInputVoltage?: string | null;
  specOutputVoltage?: string | null;
  specPowerW?: string | null;
  specFormFactor?: string | null;
  specs?: string | null;
  certifications?: string | null;
  features?: string | null;
  isFeatured?: boolean | null;
  isPublished?: boolean | null;
  sortOrder?: number | null;
};

export function ProductForm({
  categories,
  initialValues,
}: {
  categories: Category[];
  initialValues?: ProductValues;
}) {
  const router = useRouter();
  const isEdit = !!initialValues?.id;

  const [values, setValues] = useState<ProductValues>(
    initialValues ?? {
      slug: '',
      name: '',
      nameEn: '',
      modelNo: '',
      categoryId: '',
      description: '',
      imageUrl: '',
      specInputVoltage: '',
      specOutputVoltage: '',
      specPowerW: '',
      specFormFactor: '',
      specs: '',
      certifications: '',
      features: '',
      isFeatured: false,
      isPublished: true,
      sortOrder: 0,
    },
  );
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const createMutation = api.product.create.useMutation({
    onSuccess: () => router.push('/admin/products'),
    onError: (e) => { setError(e.message); setLoading(false); },
  });
  const updateMutation = api.product.update.useMutation({
    onSuccess: () => router.push('/admin/products'),
    onError: (e) => { setError(e.message); setLoading(false); },
  });

  function set(field: keyof ProductValues, value: string | boolean | number | null) {
    setValues((prev) => ({ ...prev, [field]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);
    const sanitize = (v: string | null | undefined) => v ?? undefined;
    const sanitizeBool = (v: boolean | null | undefined) => v ?? undefined;
    const sanitizeNum = (v: number | null | undefined) => v ?? undefined;
    const payload = {
      slug: values.slug,
      name: values.name,
      nameEn: sanitize(values.nameEn),
      modelNo: values.modelNo,
      categoryId: values.categoryId,
      description: sanitize(values.description),
      imageUrl: sanitize(values.imageUrl),
      specInputVoltage: sanitize(values.specInputVoltage),
      specOutputVoltage: sanitize(values.specOutputVoltage),
      specPowerW: sanitize(values.specPowerW),
      specFormFactor: sanitize(values.specFormFactor),
      specs: sanitize(values.specs),
      certifications: sanitize(values.certifications),
      features: sanitize(values.features),
      isFeatured: sanitizeBool(values.isFeatured),
      isPublished: sanitizeBool(values.isPublished),
      sortOrder: sanitizeNum(values.sortOrder),
    };
    if (isEdit) {
      updateMutation.mutate({ ...payload, id: initialValues?.id ?? '' });
    } else {
      createMutation.mutate(payload);
    }
  }

  const certList = ['CE', 'RoHS', 'KC'];
  const selectedCerts = values.certifications ? values.certifications.split(',').map((c) => c.trim()).filter(Boolean) : [];

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <Label>제품명 *</Label>
          <Input value={values.name} onChange={(e) => set('name', e.target.value)} required />
        </div>
        <div className="space-y-1">
          <Label>영문명</Label>
          <Input value={values.nameEn ?? ''} onChange={(e) => set('nameEn', e.target.value)} />
        </div>
        <div className="space-y-1">
          <Label>Slug *</Label>
          <Input value={values.slug} onChange={(e) => set('slug', e.target.value)} required className="font-mono text-sm" />
        </div>
        <div className="space-y-1">
          <Label>모델번호 *</Label>
          <Input value={values.modelNo} onChange={(e) => set('modelNo', e.target.value)} required className="font-mono text-sm" />
        </div>
        <div className="space-y-1">
          <Label>카테고리 *</Label>
          <Select value={values.categoryId} onValueChange={(v) => set('categoryId', v)}>
            <SelectTrigger>
              <SelectValue placeholder="카테고리 선택" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((c) => (
                <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-1">
          <Label>이미지 URL</Label>
          <Input value={values.imageUrl ?? ''} onChange={(e) => set('imageUrl', e.target.value)} placeholder="https://..." />
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-3 text-gray-700">주요 사양</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <Label>입력전압</Label>
            <Input value={values.specInputVoltage ?? ''} onChange={(e) => set('specInputVoltage', e.target.value)} placeholder="e.g. 85-264VAC" />
          </div>
          <div className="space-y-1">
            <Label>출력전압</Label>
            <Input value={values.specOutputVoltage ?? ''} onChange={(e) => set('specOutputVoltage', e.target.value)} placeholder="e.g. 12V" />
          </div>
          <div className="space-y-1">
            <Label>출력용량 (W)</Label>
            <Input value={values.specPowerW ?? ''} onChange={(e) => set('specPowerW', e.target.value)} placeholder="e.g. 100W" />
          </div>
          <div className="space-y-1">
            <Label>형태</Label>
            <Input value={values.specFormFactor ?? ''} onChange={(e) => set('specFormFactor', e.target.value)} placeholder="e.g. DIN Rail" />
          </div>
        </div>
      </div>

      <div className="space-y-1">
        <Label>전체 사양 (JSON)</Label>
        <Textarea
          value={values.specs ?? ''}
          onChange={(e) => set('specs', e.target.value)}
          rows={4}
          placeholder='{"efficiency": "90%", ...}'
          className="font-mono text-sm"
        />
      </div>

      <div className="space-y-1">
        <Label>제품 설명</Label>
        <Textarea value={values.description ?? ''} onChange={(e) => set('description', e.target.value)} rows={4} />
      </div>

      <div className="space-y-1">
        <Label>주요 기능 (한 줄씩 입력)</Label>
        <Textarea value={values.features ?? ''} onChange={(e) => set('features', e.target.value)} rows={4} placeholder="효율적인 전력 변환&#10;소형 디자인" />
      </div>

      <div className="space-y-2">
        <Label>인증</Label>
        <div className="flex gap-4">
          {certList.map((cert) => (
            <label key={cert} className="flex items-center gap-2 text-sm cursor-pointer">
              <input
                type="checkbox"
                checked={selectedCerts.includes(cert)}
                onChange={(e) => {
                  const next = e.target.checked
                    ? [...selectedCerts, cert]
                    : selectedCerts.filter((c) => c !== cert);
                  set('certifications', next.join(', '));
                }}
              />
              {cert}
            </label>
          ))}
        </div>
      </div>

      <div className="flex gap-6">
        <label className="flex items-center gap-2 text-sm cursor-pointer">
          <input type="checkbox" checked={values.isFeatured ?? false} onChange={(e) => set('isFeatured', e.target.checked)} />
          주목 제품
        </label>
        <label className="flex items-center gap-2 text-sm cursor-pointer">
          <input type="checkbox" checked={values.isPublished ?? true} onChange={(e) => set('isPublished', e.target.checked)} />
          게시 여부
        </label>
      </div>

      <div className="space-y-1">
        <Label>정렬 순서</Label>
        <Input type="number" value={values.sortOrder ?? 0} onChange={(e) => set('sortOrder', parseInt(e.target.value, 10))} className="w-24" />
      </div>

      {error && <p className="text-sm text-red-500">{error}</p>}

      <div className="flex gap-3">
        <Button type="submit" disabled={loading}>
          {loading ? '저장 중...' : isEdit ? '수정' : '등록'}
        </Button>
        <Button type="button" variant="outline" onClick={() => router.push('/admin/products')} disabled={loading}>
          취소
        </Button>
      </div>
    </form>
  );
}