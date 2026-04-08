# Page Design: Product Detail (제품 상세)

## Layout Structure

```
┌─────────────────────────────────────────────────┐
│ NAVIGATION BAR                                  │
├─────────────────────────────────────────────────┤
│ BREADCRUMB                                      │
│ 홈 > 제품 > DC-DC 컨버터 > SP-series > SPS15-48│
├─────────────────────────────────────────────────┤
│                                                 │
│ ┌────────────────┐  ┌──────────────────────┐    │
│ │                │  │ PRODUCT INFO         │    │
│ │  PRODUCT       │  │                      │    │
│ │  IMAGE         │  │ Badge: "DC-DC"       │    │
│ │                │  │ Model: SPS15-48      │    │
│ │  (5 columns)   │  │ Title: 15W Single    │    │
│ │                │  │   Output DC-DC       │    │
│ │  [gallery      │  │   Converter          │    │
│ │   thumbs]      │  │                      │    │
│ │                │  │ ┌──────────────────┐  │    │
│ └────────────────┘  │ │ KEY SPECS        │  │    │
│                     │ │ Input: 18~75VDC  │  │    │
│                     │ │ Output: 48VDC    │  │    │
│                     │ │ Power: 15W       │  │    │
│                     │ │ Isolation: 1.5kV │  │    │
│                     │ │ Efficiency: 87%  │  │    │
│                     │ │ Size: SIP package │  │    │
│                     │ └──────────────────┘  │    │
│                     │                      │    │
│                     │ Certifications:      │    │
│                     │ [KC] [CE] [UL]       │    │
│                     │                      │    │
│                     │ [견적 문의]  [PDF ↓]  │    │
│                     │ (7 columns)          │    │
│                     └──────────────────────┘    │
│                                                 │
├─────────────────────────────────────────────────┤
│ TABS: [사양] [특징] [다운로드] [관련제품]        │
├─────────────────────────────────────────────────┤
│                                                 │
│ FULL SPECIFICATION TABLE                        │
│ ┌──────────────────┬───────────────────────┐    │
│ │ Parameter        │ Value                 │    │
│ ├──────────────────┼───────────────────────┤    │
│ │ Input Voltage    │ 18 ~ 75 VDC           │    │
│ │ Output Voltage   │ 48 VDC                │    │
│ │ Output Current   │ 0.313A                │    │
│ │ Output Power     │ 15W                   │    │
│ │ Ripple & Noise   │ 100mVp-p             │    │
│ │ Efficiency       │ 87%                   │    │
│ │ Isolation        │ 1500VDC               │    │
│ │ Operating Temp   │ -40°C ~ +85°C        │    │
│ │ Dimensions       │ 31.8×9.4×12.5mm      │    │
│ │ Weight           │ 10g                   │    │
│ └──────────────────┴───────────────────────┘    │
│                                                 │
├─────────────────────────────────────────────────┤
│ RELATED PRODUCTS                                │
│ ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐            │
│ │ Card │ │ Card │ │ Card │ │ Card │            │
│ └──────┘ └──────┘ └──────┘ └──────┘            │
├─────────────────────────────────────────────────┤
│ FOOTER                                          │
└─────────────────────────────────────────────────┘
```

## Product Image Gallery
- Main image: 4:3 ratio, `surface-inset` (#ECEEF4) background
- Object-fit: contain (show full product, not cropped)
- Thumbnail strip below: 4-5 thumbs, 64×48px each, `neutral-200` border
- Active thumb: `primary-500` border, 2px
- Click to swap main image
- No zoom on V1 (not necessary for industrial products — engineers want clarity, not zoom)

## Key Specs Block
- Background: `surface-inset` (`neutral-100`)
- Border-radius: 6px
- Internal layout: 2-column label-value pairs
- Labels: Label typography (12px, `neutral-500`, uppercase tracking)
- Values: Data typography (IBM Plex Mono, 14px, `neutral-900`)
- Dividers: 1px `neutral-200` between rows
- Padding: `space-4` (24px)

## Certification Badges
- Inline row of grayscale certification mark images
- Size: 28px height, auto width
- Gap: `space-2` (12px)
- Hover: transition to color (200ms)
- Tooltip on hover showing full name ("KC 인증", "CE Marking")

## CTA Area
- Primary CTA: "견적 문의" (accent-500, lg size)
- Secondary: "데이터시트 다운로드" with Download icon (secondary button)
- Both full-width stacked on mobile
- On desktop: side-by-side

## Tab Navigation
- Horizontal tabs, bottom-border style
- Inactive: `neutral-500` text, no bottom border
- Active: `primary-500` text, 2px bottom border `primary-500`
- Hover: `neutral-700` text
- Content area below with `space-6` (36px) top padding

## Specification Table
- Full-width within content area
- Uses the Specification Table pattern from system.md
- All values in IBM Plex Mono for alignment
- Units always included
- Group related specs with subtle section headers

## Related Products
- Horizontal scroll on mobile, 4-col grid on desktop
- Same Spec Grid Card component as product listing
- Title: H2 "관련 제품"
