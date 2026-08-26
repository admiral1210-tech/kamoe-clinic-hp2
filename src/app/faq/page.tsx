import type { Metadata } from 'next';
import { Phone, Mail } from 'lucide-react';

import { Hero } from '@/components/widgets/hero';
import { FaqAccordionList } from '@/components/ui/faq-accordion-list';
import { JsonLd } from '@/components/json-ld';
import { buildMetadata } from '@/lib/seo';
import {
  clinicalHeroSubtitleClass,
  clinicalHeroTaglineClass,
  clinicalHeroTitleClass,
  ctaHeroPrimaryClass,
  ctaHeroSecondaryClass,
} from '~/constants/clinical-page-ui';
import { CLINIC_GENERAL_FAQ, buildClinicGeneralFaqJsonLd } from '~/data/faq-general';

export const metadata: Metadata = buildMetadata({
  title: 'よくあるご質問（FAQ）｜訪問診療・かもめクリニック（大阪市）',
  ignoreTitleTemplate: true,
  description:
    '訪問診療の対象・費用・エリア・精神科・在支診1・施設入居など、よくあるご質問にお答えします。お電話06-4301-7871でもご相談いただけます。',
  path: '/faq',
  ogImage: { url: 'https://kamome-clinic.net/images/top/slider02.jpg', width: 1400, height: 500 },
});

const jsonLdBreadcrumb = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'トップページ', item: 'https://kamome-clinic.net/' },
    { '@type': 'ListItem', position: 2, name: 'よくあるご質問', item: 'https://kamome-clinic.net/faq' },
  ],
};

const jsonLdWebPage = {
  '@context': 'https://schema.org',
  '@type': 'MedicalWebPage',
  '@id': 'https://kamome-clinic.net/faq',
  name: 'よくあるご質問｜かもめクリニック',
  url: 'https://kamome-clinic.net/faq',
  isPartOf: { '@type': 'WebSite', '@id': 'https://kamome-clinic.net/#website' },
  about: { '@type': 'MedicalClinic', '@id': 'https://kamome-clinic.net/#clinic', name: 'かもめクリニック' },
};

export default function FaqPage() {
  return (
    <>
      <JsonLd data={jsonLdBreadcrumb} />
      <JsonLd data={buildClinicGeneralFaqJsonLd()} />
      <JsonLd data={jsonLdWebPage} />

      <Hero
        tagline="よくあるご質問"
        taglineClass={clinicalHeroTaglineClass}
        titleClass={clinicalHeroTitleClass}
        subtitleClass={clinicalHeroSubtitleClass}
        title={
          <>
            訪問診療について
            <br />
            気になることを
            <br />
            まとめました
          </>
        }
        subtitle="費用・対応エリア・精神科・在支診1など、よくいただくご質問にお答えします。解決しない場合はお気軽にご連絡ください。"
      />

      <section className="bg-gray-50 py-10 md:py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mx-auto max-w-3xl">
            <FaqAccordionList
              items={CLINIC_GENERAL_FAQ.map(({ q, answerHtml }) => ({ title: q, description: answerHtml }))}
            />
          </div>

          <div className="mx-auto mt-10 max-w-3xl rounded-2xl border border-gray-100 bg-white p-6 text-center shadow-sm">
            <p className="mb-4 text-sm font-medium text-gray-700 md:text-base">
              解決しない場合は、お電話・フォームでご相談ください。
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <a href="tel:0643017871" className={`inline-flex ${ctaHeroPrimaryClass}`}>
                <Phone className="h-5 w-5" /> 06-4301-7871
              </a>
              <a href="/renkei" className={`inline-flex ${ctaHeroSecondaryClass}`}>
                <Mail className="h-5 w-5" /> フォームで相談
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
