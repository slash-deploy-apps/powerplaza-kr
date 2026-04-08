# Tasks: PowerPlaza × Volker Power 사이트

## Status: IN PROGRESS

---

## Phase 1: 프로젝트 기반 설정

- [ ] T1: 보일러플레이트 클론 및 npm install 완료
- [ ] T2: Tailwind 커스텀 색상 토큰 설정 (primary, accent, neutral 팔레트)
- [ ] T3: Pretendard + IBM Plex Mono 폰트 설정
- [ ] T4: Drizzle 스키마 작성 (products, categories, inquiries 테이블)
- [ ] T5: DB 마이그레이션 실행 및 seed 데이터 삽입

## Phase 2: tRPC 라우터 구현

- [ ] T6: category router (list, create)
- [ ] T7: product router (list, bySlug, featured, create, update, delete)
- [ ] T8: inquiry router (submit, list, markRead)
- [ ] T9: Admin auth middleware (tRPC procedure에 세션 체크)

## Phase 3: 공개 사이트 UI

- [ ] T10: Navbar 컴포넌트 (네이비 배경, 로고, 메뉴, 견적문의 CTA)
- [ ] T11: Footer 컴포넌트 (4컬럼, 회사정보, 사업자등록번호)
- [ ] T12: Homepage — Hero 섹션 + 주요 제품 (featured)
- [ ] T13: ProductCard 컴포넌트 (이미지, 시리즈뱃지, 모델번호, 사양 4개 그리드)
- [ ] T14: 제품 목록 페이지 (카테고리 사이드바 + 제품 그리드)
- [ ] T15: 제품 상세 페이지 (이미지, 전체 사양표, 인증뱃지, 견적문의 버튼)
- [ ] T16: 견적 문의 폼 페이지 (제품 pre-fill, 폼 제출, 성공 메시지)
- [ ] T17: 회사 소개 페이지 (About PowerPlaza)

## Phase 4: 관리자 페이지

- [ ] T18: Admin 로그인 페이지 (better-auth)
- [ ] T19: Admin 대시보드 (통계 요약: 제품수, 문의수)
- [ ] T20: Admin 제품 목록 (테이블, 편집/삭제 버튼)
- [ ] T21: Admin 제품 등록/수정 폼
- [ ] T22: Admin 문의 목록 (읽음/안읽음, 상세보기)

## Phase 5: 검증 및 마무리

- [ ] T23: 타입체크 (tsc --noEmit) 오류 수정
- [ ] T24: 빌드 통과 확인 (npm run build)
- [ ] T25: 반응형 확인 (모바일/태블릿 레이아웃)
- [ ] T26: 초기 관리자 계정 seed (admin@powerplaza.co.kr / 초기 비밀번호)

---

## File Allowlists per Phase

### Phase 1–2 (Backend/Config)
- `tailwind.config.ts`
- `src/styles/globals.css`
- `src/server/db/schema.ts`
- `src/server/db/index.ts`
- `src/server/db/seed.ts`
- `src/server/trpc/router/product.ts`
- `src/server/trpc/router/category.ts`
- `src/server/trpc/router/inquiry.ts`
- `src/server/trpc/index.ts`
- `src/lib/auth.ts`
- `drizzle.config.ts`

### Phase 3 (Public Site)
- `src/app/(site)/page.tsx`
- `src/app/(site)/about/page.tsx`
- `src/app/(site)/products/page.tsx`
- `src/app/(site)/products/[slug]/page.tsx`
- `src/app/(site)/inquiry/page.tsx`
- `src/app/(site)/layout.tsx`
- `src/components/site/navbar.tsx`
- `src/components/site/footer.tsx`
- `src/components/site/hero.tsx`
- `src/components/site/product-card.tsx`
- `src/components/site/product-grid.tsx`
- `src/components/site/category-sidebar.tsx`
- `src/components/site/inquiry-form.tsx`

### Phase 4 (Admin)
- `src/app/admin/**`
- `src/components/admin/**`
- `src/middleware.ts`
