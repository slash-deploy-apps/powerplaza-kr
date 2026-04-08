# Page Design: Company Introduction (회사소개)

## Layout Structure

```
┌─────────────────────────────────────────────────┐
│ NAVIGATION BAR                                  │
├─────────────────────────────────────────────────┤
│ PAGE HERO (primary-800 bg, shorter: 280px)      │
│                                                 │
│  "회사소개"                                      │
│  "1993년부터 산업용 전원공급장치의               │
│   전문기업으로 성장해 온 파워프라자"                 │
├─────────────────────────────────────────────────┤
│                                                 │
│ COMPANY OVERVIEW (content width)                │
│                                                 │
│ ┌─────────────────┐  ┌──────────────────────┐  │
│ │                 │  │ 파워프라자는 1993년    │  │
│ │ [회사 이미지]    │  │ 설립 이래 30년 이상   │  │
│ │                 │  │ 전원공급장치 전문     │  │
│ │ (6 columns)     │  │ 기업으로 성장해     │  │
│ │                 │  │ 왔습니다...           │  │
│ └─────────────────┘  │ (6 columns)            │  │
│                     └──────────────────────┘  │
│                                                 │
├─────────────────────────────────────────────────┤
│ STATS BAR (4 columns, full-width accent-50 bg)  │
│                                                 │
│ ┌────────┐  ┌────────┐  ┌────────┐  ┌────────┐    │
│ │32년+   │  │1,000+ │  │KC인증  │  │당일    │    │
│ │업력    │  │고객사  │  │제품    │  │출고    │    │
│ └────────┘  └────────┘  └────────┘  └────────┘    │
├─────────────────────────────────────────────────┤
│ BUSINESS AREAS (surface-canvas)                 │
│                                                 │
│ "사업영역"                                       │
│                                                 │
│ ┌───────────────┐  ┌───────────────┐  ┌──────────┐ │
│ │ DC-DC 컨버터   │  │ AC-DC 컨버터   │  │ EV 부품   │ │
│ │ [icon]        │  │ [icon]        │  │ [icon]   │ │
│ │ 설명 텍스트     │  │ 설명 텍스트     │  │ 설명     │ │
│ └───────────────┘  └───────────────┘  └──────────┘ │
├─────────────────────────────────────────────────┤
│ HISTORY TIMELINE (alternating layout)           │
│                                                 │
│ "연혁"                                           │
│                                                 │
│ 1993 --- 회사 설립                                 │
│ 2000 --- Volker Power 독점 계약                 │
│ 2010 --- KC 인증 최다 제품 보유                 │
│ 2020 --- EV 부품 사업 진출                     │
│ 2024 --- 창립 32주년                            │
├─────────────────────────────────────────────────┤
│ CERTIFICATIONS (surface-card)                   │
│                                                 │
│ "인증 현황"                                      │
│ [KC] [CE] [UL] [ISO 9001] [ISO 14001]          │
│ 각 인증 마크 아이콘 + 설명 텍스트                  │
├─────────────────────────────────────────────────┤
│ LOCATION MAP (full-width)                       │
│                                                 │
│ "찾아오시는 길"                                   │
│ [네이버 지도 임베드]                             │
│ 주소: 서울 금천구 서부샛길 648, 1401호          │
├─────────────────────────────────────────────────┤
│ FOOTER                                          │
└─────────────────────────────────────────────────┘
```

## Page Hero
- Shorter than homepage hero: 280px
- Same dark gradient background
- Page title (Display) + subtitle (Body, `neutral-300`)
- No CTA buttons, no product image

## Company Overview
- 6+6 column split: image left, text right
- Company image: office/building photo or product showcase
- Text: H2 section title + Body paragraphs
- Mention key facts: established 1993, Volker Power official distributor, 32+ years

## Stats Bar
- Full-width `accent-50` background
- 4 stat items centered
- Number: Display typography, `primary-800`
- Label: Body Small, `neutral-600`
- Icons: Lucide, 28px, `accent-500`

## History Timeline
- Vertical timeline: center line 2px `neutral-200`
- Year markers: `primary-500` circle (12px), H3 typography
- Events alternate left/right of center line
- Each event: year + brief description in Body
- Mobile: single column, all left-aligned

## Certifications Grid
- Horizontal row of certification cards
- Each card: cert icon/image (48px) + cert name (H3) + brief description (Body Small)
- Card: `surface-card` with border
- Grid: 4-5 items in a row, wrap on smaller screens

## Location Map
- Embedded map (static image or Naver/Kakao map embed)
- Below: address, phone, fax in a clean 2-column layout
- Labels: Label typography
- Values: Body / Data typography
