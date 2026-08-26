import type { Metadata } from 'next';
import Link from 'next/link';

import { buildMetadata } from '@/lib/seo';
import { ctaHeroPrimaryClass } from '~/constants/clinical-page-ui';

export const metadata: Metadata = buildMetadata({
  title: 'ページが見つかりません（404）｜かもめクリニック',
  ignoreTitleTemplate: true,
  path: '/404',
  noindex: true,
});

const links = [
  { href: '/', label: 'トップページ' },
  { href: '/houmon-shinryo', label: '訪問診療について' },
  { href: '/cost', label: '費用・保険' },
  { href: '/renkei', label: 'ご相談・お問い合わせ' },
  { href: '/faq', label: 'よくあるご質問' },
];

export default function NotFound() {
  return (
    <section className="flex h-full items-center p-16">
      <div className="container mx-auto my-8 flex flex-col items-center justify-center px-5">
        <div className="max-w-lg text-center">
          <h1 className="mb-6 text-9xl font-bold">
            <span className="sr-only">エラー</span>
            <span className="text-primary">404</span>
          </h1>
          <p className="mb-3 text-2xl font-semibold md:text-3xl">お探しのページが見つかりません</p>
          <p className="mb-8 mt-2 text-base text-muted dark:text-slate-400">
            URLが変更または削除された可能性があります。
            <br />
            以下のリンクからご希望のページをお探しください。
          </p>
          <ul className="mx-auto mb-8 max-w-xs space-y-2 text-left">
            {links.map(({ href, label }) => (
              <li key={href}>
                <Link href={href} className="text-sm font-medium text-primary underline hover:opacity-80">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
          <Link href="/" className={ctaHeroPrimaryClass}>
            トップページへ戻る
          </Link>
        </div>
      </div>
    </section>
  );
}
