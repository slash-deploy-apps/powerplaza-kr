# Page Design: Product Catalog (제품 목록)

## Layout Structure

```
┌─────────────────────────────────────────────────┐
│ NAVIGATION BAR                                  │
├─────────────────────────────────────────────────┤
│ BREADCRUMB (surface-canvas)                     │
│ 홈 > 제품 > DC-DC 컨버터                        │
├──────────┬──────────────────────────────────────┤
│ SIDEBAR  │ CONTENT                              │
│ (3 col)  │ (9 col)                              │
│          │                                      │
│ DC-DC    │ ┌─────────────────────────────────┐  │
│ ● SP     │ │ FILTER BAR                      │  │
│   VPS6   │ │ [입력전압 ▾] [출력전압 ▾]       │  │
│   LPS6   │ │ [출력전력 ▾] [정렬: 인기순 ▾]   │  │
│   P      │ └─────────────────────────────────┘  │
│   SPT    │                                      │
│   PT     │ "DC-DC 컨버터" — 24개 제품           │
│   ...    │                                      │
│          │ ┌──────┐ ┌──────┐ ┌──────┐           │
│ AC-DC    │ │ Spec │ │ Spec │ │ Spec │           │
│   SF     │ │ Grid │ │ Grid │ │ Grid │           │
│   CFS    │ │ Card │ │ Card │ │ Card │           │
│   FS     │ └──────┘ └──────┘ └──────┘           │
│   NF     │ ┌──────┐ ┌──────┐ ┌──────┐           │
│   C      │ │ Spec │ │ Spec │ │ Spec │           │
│          │ │ Grid │ │ Grid │ │ Grid │           │
│ EV 부품  │ │ Card │ │ Card │ │ Card │           │
│   OBC    │ └──────┘ └──────┘ └──────┘           │
│   PDU    │                                      │
│   BMS    │ [← 이전] [1] [2] [3] [다음 →]       │
│          │                                      │
├──────────┴──────────────────────────────────────┤
│ FOOTER                                          │
└─────────────────────────────────────────────────┘
```

## Sidebar
- Sticky (follows scroll), max-height viewport with overflow-y auto
- Category group titles: H3, `primary-800`, `space-4` bottom margin
- Active series: `primary-500` text, `primary-50` background, 3px left accent bar `primary-500`
- Inactive series: `neutral-700` text, hover → `neutral-50` bg
- Collapse/expand per category group with Lucide ChevronDown icon
- Bottom of sidebar: small text link "전체 제품 보기"

## Filter Bar
- Horizontal row of dropdown selects
- Each select: inset input style (`neutral-100` bg, `neutral-200` border)
- Dropdown options: `surface-card` with `neutral-200` border, 6px border-radius
- Active filter: shows as pill/chip below filter bar with × close button
- Chip style: `primary-100` bg, `primary-700` text, 4px border-radius

## Product Grid
- 3 columns within 9-col content area (desktop)
- 2 columns (tablet), 1 column (mobile)
- Gap: `space-4` (24px)
- Uses the Spec Grid Card from system.md

## Pagination
- Centered below product grid
- Page numbers: 40px × 40px, `neutral-700` text
- Active page: `primary-500` bg, white text, 6px radius
- Hover: `neutral-50` bg
- Previous/Next: ghost buttons with arrow icons
- Show total count: "24개 중 1-12"

## Empty State
- When no products match filters
- Centered: line illustration + "검색 결과가 없습니다" + "필터 초기화" secondary button

## Mobile Behavior
- Sidebar collapses into a horizontal scrollable category strip at top
- Filter bar becomes a single "필터" button that opens a bottom sheet
- Product grid: single column
