# Design: PowerPlaza × Volker Power 사이트

## Architecture

### Stack
- **Frontend**: Next.js 15 (App Router), React 19
- **Styling**: Tailwind CSS + shadcn/ui
- **API**: tRPC (type-safe server/client)
- **Auth**: better-auth (admin only)
- **DB**: SQLite + Drizzle ORM
- **Runtime**: Node.js (npm)

### Directory Structure
```
src/
  app/
    (site)/              # Public site
      page.tsx           # Homepage (hero + featured products)
      about/page.tsx     # 회사 소개
      products/
        page.tsx         # 제품 목록 (카테고리 사이드바)
        [slug]/page.tsx  # 제품 상세
      inquiry/page.tsx   # 견적 문의 폼
    admin/               # Admin area (auth-protected)
      login/page.tsx
      dashboard/page.tsx
      products/
        page.tsx         # 제품 목록 관리
        new/page.tsx     # 제품 등록
        [id]/edit/page.tsx
      inquiries/page.tsx # 문의 목록
    api/
      auth/[...all]/     # better-auth handler
      trpc/[trpc]/       # tRPC handler
  server/
    db/
      schema.ts          # Drizzle schema
      index.ts
    trpc/
      router/
        product.ts       # 제품 CRUD
        inquiry.ts       # 문의 저장/조회
        category.ts      # 카테고리
      index.ts
  lib/
    auth.ts              # better-auth config
    auth-client.ts
  components/
    site/
      navbar.tsx
      footer.tsx
      hero.tsx
      product-card.tsx
      product-grid.tsx
      category-sidebar.tsx
      inquiry-form.tsx
    admin/
      admin-nav.tsx
      product-form.tsx
    ui/                  # shadcn components
```

## Data Model

### products
```sql
CREATE TABLE products (
  id          TEXT PRIMARY KEY,          -- cuid
  slug        TEXT UNIQUE NOT NULL,      -- URL-friendly
  name        TEXT NOT NULL,             -- 제품명 (한국어)
  name_en     TEXT,                      -- 영문명
  model_no    TEXT NOT NULL,             -- 모델번호 (e.g. SPS15-48)
  category_id TEXT NOT NULL,
  description TEXT,                      -- 한국어 설명
  image_url   TEXT,                      -- 이미지 URL (Volker CDN or uploaded)
  
  -- Specs (JSON for flexibility)
  specs       TEXT,                      -- JSON: { input_voltage, output_voltage, power_w, ... }
  
  -- Key display specs (denormalized for card display)
  spec_input_voltage   TEXT,             -- e.g. "DC 12V/24V/48V"
  spec_output_voltage  TEXT,             -- e.g. "AC 220V"
  spec_power_w         TEXT,             -- e.g. "1000W"
  spec_form_factor     TEXT,             -- e.g. "Pure Sine Wave"
  
  certifications TEXT,                   -- JSON: ["CE", "RoHS"]
  features       TEXT,                   -- JSON: ["순정사인파", "LCD 디스플레이"]
  
  is_featured    INTEGER DEFAULT 0,
  is_published   INTEGER DEFAULT 1,
  sort_order     INTEGER DEFAULT 0,
  
  created_at  TEXT DEFAULT (datetime('now')),
  updated_at  TEXT DEFAULT (datetime('now'))
);
```

### categories
```sql
CREATE TABLE categories (
  id          TEXT PRIMARY KEY,
  slug        TEXT UNIQUE NOT NULL,
  name        TEXT NOT NULL,             -- 카테고리명 (한국어)
  name_en     TEXT,
  sort_order  INTEGER DEFAULT 0,
  created_at  TEXT DEFAULT (datetime('now'))
);
```

### inquiries
```sql
CREATE TABLE inquiries (
  id          TEXT PRIMARY KEY,
  product_id  TEXT,                      -- nullable (일반 문의 가능)
  product_name TEXT,                     -- 스냅샷
  
  name        TEXT NOT NULL,             -- 담당자 이름
  company     TEXT NOT NULL,             -- 회사명
  email       TEXT NOT NULL,
  phone       TEXT,
  quantity    TEXT,                      -- 수량 (텍스트로, 유연하게)
  message     TEXT NOT NULL,             -- 요청사항
  
  status      TEXT DEFAULT 'new',       -- 'new' | 'read' | 'replied'
  created_at  TEXT DEFAULT (datetime('now'))
);
```

### users (better-auth managed)
- better-auth가 자동 관리 (user, session, account 테이블)

## API Design (tRPC)

### product router
- `product.list({ categoryId?, search?, page?, limit? })` → products[]
- `product.bySlug({ slug })` → product
- `product.featured()` → product[] (is_featured=1)
- `product.create(...)` → product [admin only]
- `product.update(id, ...)` → product [admin only]
- `product.delete(id)` → void [admin only]

### category router
- `category.list()` → categories[]
- `category.create(...)` [admin only]

### inquiry router
- `inquiry.submit({ ... })` → inquiry (public)
- `inquiry.list({ status?, page? })` → inquiries[] [admin only]
- `inquiry.markRead(id)` [admin only]

## UI Design System Reference
→ See `.slash/workspace/design/system.md` for full design tokens, typography, colors, and component patterns.

### Key Design Tokens Summary
- **Primary**: `#2654A0` (navy blue)
- **Accent CTA**: `#F08C00` (amber orange)
- **Canvas**: `#F9FAFB`
- **Card**: `#FFFFFF` with `1px border #D8DCE8`
- **Nav bg**: `#0F2240`
- **Footer bg**: `#0C0F14`
- **Font**: Pretendard (Korean) + IBM Plex Mono (specs/model numbers)
- **Border radius**: 6px

## Seed Data
Initial seed 할 카테고리 및 제품 (Volker Power 기준):
- 카테고리: "전원 인버터", "UPS 인버터 충전기", "인버터 PCBA", "하이브리드 태양광 인버터"
- 샘플 제품 5–8개 (각 카테고리 1–2개씩)
