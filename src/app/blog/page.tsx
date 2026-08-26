import type { Metadata } from 'next';
import { Newspaper } from 'lucide-react';

import { Hero } from '@/components/widgets/hero';
import { Note } from '@/components/widgets/note';
import { JsonLd } from '@/components/json-ld';
import { buildMetadata } from '@/lib/seo';
import { clinicalHeroSubtitleClass, clinicalHeroTaglineClass, clinicalHeroTitleClass } from '~/constants/clinical-page-ui';
import { MIGRATION_START, OLD_BLOG_URL } from '~/data/site-policy';

export const metadata: Metadata = buildMetadata({
  title: 'お知らせ・ブログ｜かもめクリニック（大阪市）',
  ignoreTitleTemplate: true,
  description:
    'かもめクリニックのお知らせ・ブログ記事一覧。診療体制・休診・採用・地域連携などの最新情報を掲載しています。',
  path: '/blog',
  ogImage: { url: 'https://kamome-clinic.net/images/top/slider02.jpg', width: 1400, height: 500 },
});

const jsonLdBreadcrumb = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'トップページ', item: 'https://kamome-clinic.net/' },
    { '@type': 'ListItem', position: 2, name: 'お知らせ・ブログ', item: 'https://kamome-clinic.net/blog' },
  ],
};

const linkClass =
  'text-primary underline font-semibold hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1 rounded';

export default function BlogPage() {
  return (
    <>
      <JsonLd data={jsonLdBreadcrumb} />

      <Hero
        tagline="お知らせ・ブログ"
        taglineClass={clinicalHeroTaglineClass}
        titleClass={clinicalHeroTitleClass}
        subtitleClass={clinicalHeroSubtitleClass}
        title="お知らせ・ブログ"
        subtitle="院長コラム・スタッフ記事・診療体制のお知らせなど、かもめクリニックの最新情報をお届けします。"
      />

      <Note
        icon="tabler:archive"
        title={`${MIGRATION_START}以前の過去記事について`}
        description={
          <p className="m-0 sm:ml-1 sm:inline">
            過去の記事は
            <a href={OLD_BLOG_URL} className={linkClass} target="_blank" rel="noopener noreferrer">
              旧サイトのブログ（アーカイブ）
            </a>
            でご覧いただけます。新しいお知らせ・情報発信はこのページで掲載しています。
          </p>
        }
      />

      <section className="bg-white py-12 md:py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <div className="py-16 text-center">
            <Newspaper className="mx-auto mb-4 h-12 w-12 text-gray-300" aria-hidden="true" />
            <p className="m-0 text-lg text-gray-500">現在、新規記事を作成中です。</p>
            <p className="m-0 mt-2 text-sm text-gray-400">
              過去の記事は
              <a href={OLD_BLOG_URL} className={linkClass} target="_blank" rel="noopener noreferrer">
                旧サイトのブログ
              </a>
              でご覧いただけます。
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
