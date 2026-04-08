# Page Design: Homepage (홈)

## Layout Structure

```
┌─────────────────────────────────────────────────┐
│ NAVIGATION BAR (primary-800, 64px)              │
│ [Logo] [제품소개] [회사소개] [고객지원] [견적문의]│
├─────────────────────────────────────────────────┤
│ HERO SECTION (full-width, primary-800→900 grad) │
│                                                 │
│   "산업용 전원공급장치의                          │
│    믿을 수 있는 파트너"                          │
│                                                 │
│   Volker Power 정품 수입 | 기술지원 | 신속배송   │
│                                                 │
│   [제품 보기]  [견적 문의]                        │
│                                     [product    │
│                                      hero img]  │
├─────────────────────────────────────────────────┤
│ TRUST BAR (surface-card, centered, horizontal)  │
│  ┌──────┐  ┌──────┐  ┌──────┐  ┌──────┐        │
│  │32년+ │  │KC인증│  │당일  │  │기술  │        │
│  │업력  │  │제품  │  │출고  │  │지원  │        │
│  └──────┘  └──────┘  └──────┘  └──────┘        │
├─────────────────────────────────────────────────┤
│ PRODUCT CATEGORIES (surface-canvas)             │
│                                                 │
│  "제품 카테고리"                                 │
│                                                 │
│  ┌─────────┐  ┌─────────┐  ┌─────────┐         │
│  │ DC-DC   │  │ AC-DC   │  │ EV      │         │
│  │ 컨버터  │  │ 컨버터  │  │ 부품    │         │
│  │ [image] │  │ [image] │  │ [image] │         │
│  │ 24개+   │  │ 12개+   │  │ 5개+    │         │
│  └─────────┘  └─────────┘  └─────────┘         │
├─────────────────────────────────────────────────┤
│ FEATURED PRODUCTS (surface-canvas)              │
│                                                 │
│  "인기 제품"                    [전체보기 →]     │
│                                                 │
│  ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐           │
│  │ Spec │ │ Spec │ │ Spec │ │ Spec │           │
│  │ Grid │ │ Grid │ │ Grid │ │ Grid │           │
│  │ Card │ │ Card │ │ Card │ │ Card │           │
│  └──────┘ └──────┘ └──────┘ └──────┘           │
├─────────────────────────────────────────────────┤
│ COMPANY INTRO (surface-card)                    │
│                                                 │
│  [PowerPlaza building/office photo]             │
│                                                 │
│  "파워프라자는 1993년 설립 이래..."               │
│  Volker Power 공식 수입원으로서...               │
│                                                 │
│  [회사소개 보기 →]                                │
├─────────────────────────────────────────────────┤
│ QUICK INQUIRY (accent-50 background)            │
│                                                 │
│  "원하시는 제품을 찾지 못하셨나요?"              │
│  "전문 상담원이 최적의 제품을 추천해 드립니다"    │
│                                                 │
│  [제품명/모델명 입력]  [연락처 입력]  [문의하기]  │
├─────────────────────────────────────────────────┤
│ FOOTER (neutral-950)                            │
└─────────────────────────────────────────────────┘
```

## Hero Section Details
- Height: `480px` desktop, `360px` mobile
- Product image: single Volker Power converter unit, high-quality photo
- Image position: right 40% of hero, vertically centered
- Text: left-aligned within content container
- Gradient: `linear-gradient(135deg, primary-800 0%, primary-900 100%)`
- Subtle ambient glow behind product image: radial gradient of `accent-500` at 8% opacity

## Trust Bar Details
- 4 items in a row, centered
- Each item: icon (Lucide, 24px, `primary-500`) + number/label
- Number: H3 typography, `primary-800`
- Label: Body Small, `neutral-500`
- Container: `surface-card` with 1px `neutral-200` border, `space-6` padding
- Positioned to overlap hero by `-40px` (negative margin top)

## Category Cards
- 3 cards in a row
- Card: `surface-card`, border, `border-radius: 6px`
- Image: category representative product photo, 16:9 ratio
- Title: H3, `primary-800`
- Count badge: `primary-100` bg, `primary-700` text, Label typography
- Hover: entire card acts as link, border shifts to `primary-300`

## Quick Inquiry Strip
- Background: `accent-50`
- Layout: headline + inline form (3 fields + button in a row)
- Mobile: stacked vertically
- This is NOT the full inquiry form — it's a quick-contact strip
