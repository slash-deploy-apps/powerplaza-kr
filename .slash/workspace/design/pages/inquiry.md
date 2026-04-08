# Page Design: Quote Inquiry (견적 문의)

## Layout Structure

```
┌─────────────────────────────────────────────────┐
│ NAVIGATION BAR                                  │
├─────────────────────────────────────────────────┤
│                                                 │
│ PAGE HEADER                                     │
│ "견적 문의"                                      │
│ "필요하신 제품 정보를 입력해 주시면,                │
│  담당자가 빠른 시간 내에 연락드리겠습니다"       │
│                                                 │
├─────────────────────────┬───────────────────────┤
│ FORM (8 columns)            │ SIDEBAR (4 columns) │
│                             │                     │
│ ┌─────────────────────┐ │ ┌─────────────────┐ │
│ │ 제품 정보              │ │ │ 연락처 정보       │ │
│ │                     │ │ │                 │ │
│ │ [제품 카테고리 ▾]     │ │ │ ☎ 02-855-4955  │ │
│ │ [모델명/시리즈     ] │ │ │ ✉ ymwon@...    │ │
│ │ [필요 수량           ] │ │ │                 │ │
│ │ [필요 사양 입력     ] │ │ │ 영업시간:         │ │
│ │  Input V, Output V  │ │ │ 월~금 09:00-18:00│ │
│ │  Output W, etc.     │ │ │ 토/일/공휴일 휴무 │ │
│ │                     │ │ │                 │ │
│ ├─────────────────────┤ │ │ 주소:             │ │
│ │ 문의자 정보          │ │ │ 서울 금천구 ...  │ │
│ │                     │ │ └─────────────────┘ │
│ │ [회사명/기관명      ] │ │                     │
│ │ [담당자 성함         ] │ │ ┌─────────────────┐ │
│ │ [연락처              ] │ │ │ 빠른 문의?       │ │
│ │ [이메일              ] │ │ │                 │ │
│ │                     │ │ │ 전화로 문의하면  │ │
│ ├─────────────────────┤ │ │ 더 빠르게          │ │
│ │ 추가 요청사항          │ │ │ 답변받으실 수   │ │
│ │ [텍스트 입력 영역      ] │ │ │ 있습니다.        │ │
│ │                     │ │ │                 │ │
│ │ ☐ 개인정보 수집 동의 │ │ │ [전화 문의하기]    │ │
│ │                     │ │ └─────────────────┘ │
│ │ [견적 문의 제출하기]   │ │                     │
│ │ (accent-500, full)  │ │                     │
│ └─────────────────────┘ │                     │
│                             │                     │
├─────────────────────────┴───────────────────────┤
│ FOOTER                                          │
└─────────────────────────────────────────────────┘
```

## Form Sections
The form is split into logical groups with clear section headers.

### Section 1: 제품 정보
- Product category: Select dropdown (DC-DC / AC-DC / EV 부품)
- Model/Series name: Text input (pre-filled if coming from product page)
- Required quantity: Number input with stepper
- Required specs: Multi-line text area for custom voltage/wattage needs

### Section 2: 문의자 정보
- Company name: Text input (required)
- Contact name: Text input (required)
- Phone: Text input (required)
- Email: Text input (required)

### Section 3: 추가 요청사항
- Free-form textarea
- Privacy consent checkbox (required)

## Form Validation
- Inline validation: error messages appear below the field immediately
- Error style: `error-600` text, 13px, with Lucide AlertCircle icon
- Error input: `error-600` border, `error-100` background ring
- All required fields marked with `error-600` asterisk

## Success State
- After submission: form area replaced by success panel
- Success panel: `success-100` bg, `success-600` border-left 3px
- Checkmark icon + "견적 문의가 접수되었습니다" H3
- Body: "영업일 기준 24시간 이내 담당자가 연락드리겠습니다"
- Ghost button: "홈으로 돌아가기"

## Sidebar Contact Card
- Card style (`surface-card` with border)
- Phone number in Data typography (IBM Plex Mono, `primary-500`)
- Email as link
- Business hours in Body Small, `neutral-600`
- Address in Body Small
- Below: separate card for "quick phone inquiry" CTA

## Pre-fill from Product Page
- When user clicks "견적 문의" from a product detail page:
  - Category auto-selected
  - Model name pre-filled as a read-only chip: `primary-100` bg, `primary-700` text
  - Chip has × to clear and allow manual entry
