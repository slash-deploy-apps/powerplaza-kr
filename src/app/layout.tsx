import '~/styles/globals.css';

import { type Metadata } from 'next';

import { TRPCReactProvider } from '~/trpc/react';

export const metadata: Metadata = {
  title: 'Volker Power | Global Inverter Manufacturer',
  description: 'Volker Power - 순정사인파 인버터, UPS 인버터, 하이브리드 태양광 인버터, 마이크로 인버터, PCBA 모듈. 117개국 수출, CE/RoHS/ISO9001 인증. 싱가포르 본사 직접 운영.',
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
