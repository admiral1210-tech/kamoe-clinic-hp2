import type { Metadata } from 'next';
import { Phone } from 'lucide-react';

import { Hero } from '@/components/widgets/hero';
import { OsakaWardGrid } from '@/components/widgets/osaka-ward-grid';
import { JsonLd } from '@/components/json-ld';
import { buildMetadata } from '@/lib/seo';
import {
  clinicalHeroSubtitleClass,
  clinicalHeroTaglineClass,
  clinicalHeroTitleClass,
  ctaHeroPrimaryClass,
} from '~/constants/clinical-page-ui';
import { KAMOME_BRANCH_COUNT } from '~/data/branches';

export const metadata: Metadata = buildMetadata({
  title: '訪問診療の対応エリア（大阪市）｜かもめクリニック',
  ignoreTitleTemplate: true,
  description: `大阪市24区全域で訪問診療・緊急往診に対応。${KAMOME_BRANCH_COUNT}院体制で市内をカバーします。区ごとの案内ページ・地域医療連携部（06-4301-7883）をご利用ください。`,
  path: '/area-osaka',
  ogImage: { url: 'https://kamome-clinic.net/images/top/slider02.jpg', width: 1400, height: 500 },
});

const jsonLdBreadcrumb = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'トップページ', item: 'https://kamome-clinic.net/' },
    { '@type': 'ListItem', position: 2, name: '大阪市の対応エリア', item: 'https://kamome-clinic.net/area-osaka' },
  ],
};

const jsonLdWebPage = {
  '@context': 'https://schema.org',
  '@type': 'MedicalWebPage',
  '@id': 'https://kamome-clinic.net/area-osaka',
  name: '訪問診療の対応エリア（大阪市）｜かもめクリニック',
  url: 'https://kamome-clinic.net/area-osaka',
  description: `かもめクリニックは大阪市24区全域で訪問診療・緊急往診に対応しています。市内${KAMOME_BRANCH_COUNT}院体制でカバーし、詳細は地域医療連携部（06-4301-7883）までお問い合わせください。`,
  isPartOf: { '@type': 'WebSite', '@id': 'https://kamome-clinic.net/#website' },
  about: { '@type': 'MedicalClinic', '@id': 'https://kamome-clinic.net/#clinic', name: 'かもめクリニック' },
};

export default function AreaOsakaPage() {
  return (
    <>
      <JsonLd data={jsonLdBreadcrumb} />
      <JsonLd data={jsonLdWebPage} />

      <Hero
        tagline="訪問診療エリア"
        taglineClass={clinicalHeroTaglineClass}
        titleClass={clinicalHeroTitleClass}
        subtitleClass={clinicalHeroSubtitleClass}
        title="大阪市の対応エリア"
        subtitle={
          <>
            <strong>訪問診療</strong>および<strong>緊急往診</strong>の対象エリアは、大阪市の
            <strong>24区すべて</strong>です。<strong>{KAMOME_BRANCH_COUNT}院体制</strong>
            で市内全域をカバーしています。各区のご相談・担当院の調整は地域医療連携部（06-4301-7883）へお気軽にどうぞ。
          </>
        }
      />

      <section className="bg-gray-50 py-10 dark:bg-slate-800 md:py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <p className="mb-3 text-center text-xs text-gray-500 dark:text-gray-400">大阪市24区（市の区並び順）</p>
          <div className="mb-8">
            <OsakaWardGrid />
          </div>

          <div className="mx-auto max-w-3xl rounded-2xl border border-blue-100 bg-white p-6 text-center dark:border-slate-700 dark:bg-slate-900">
            <p className="mx-auto mb-4 max-w-prose text-sm text-gray-600 dark:text-gray-400">
              大阪市外のご相談や、担当院の調整なども地域医療連携部がお受けします。まずはお気軽にどうぞ。
            </p>
            <a href="tel:0643017883" className={`inline-flex gap-2 ${ctaHeroPrimaryClass}`}>
              <Phone className="h-4 w-4 shrink-0" /> エリア・連携のご相談 06-4301-7883
            </a>
            <p className="mt-4">
              <a href="/houmon-shinryo" className="text-sm font-bold text-primary hover:underline">
                訪問診療とは・ご利用の流れ
              </a>
              <span className="mx-2 text-gray-300 dark:text-gray-600">|</span>
              <a href="/about#access" className="text-sm font-bold text-primary hover:underline">
                各院のアクセス
              </a>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
