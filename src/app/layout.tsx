import '~/styles/globals.css';

import { type Metadata } from 'next';

import { TRPCReactProvider } from '~/trpc/react';

export const metadata: Metadata = {
  title: '파워프라자 | Volker Power 국내 공식 공급',
  description: 'Volker Power 순정사인파 인버터 및 전원공급장치 국내 공식 공급. 파워프라자에서 CE/RoHS 인증 제품을 믿고 구매하세요.',
  icons: [{ rel: 'icon', url: '/favicon.ico' }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko">
      <body>
        <TRPCReactProvider>{children}</TRPCReactProvider>
      </body>
    </html>
  );
}
