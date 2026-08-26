import { Noto_Sans_JP } from 'next/font/google';
import './globals.css';

import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { FloatingCta } from '@/components/floating-cta';
import { JsonLd } from '@/components/json-ld';
import { buildMetadata } from '@/lib/seo';
import { buildOrganizationJsonLd } from '@/lib/organization-jsonld';

const notoSansJP = Noto_Sans_JP({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '900'],
  variable: '--aw-font-noto-sans-jp',
  display: 'swap',
});

export const metadata = buildMetadata();

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja" className={notoSansJP.variable}>
      <head>
        <meta name="color-scheme" content="light" />
        <JsonLd data={buildOrganizationJsonLd()} />
      </head>
      <body>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[9999] focus:rounded focus:bg-primary focus:px-4 focus:py-2 focus:text-white focus:outline-none focus:ring-2 focus:ring-white"
        >
          メインコンテンツへスキップ
        </a>
        <SiteHeader />
        <main id="main-content">{children}</main>
        <SiteFooter />
        <FloatingCta />
      </body>
    </html>
  );
}
