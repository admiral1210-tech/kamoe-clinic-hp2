import type { Metadata } from 'next';

import { Hero } from '@/components/widgets/hero';
import { PageSectionHeading } from '@/components/ui/page-section-heading';
import { Features } from '@/components/widgets/features';
import { FAQs } from '@/components/widgets/faqs';
import { ClinicalPageClosing } from '@/components/widgets/clinical-page-closing';
import { resolveIcon } from '@/components/ui/icon-map';
import { JsonLd } from '@/components/json-ld';
import { buildMetadata } from '@/lib/seo';
import {
  clinicalHeroSectionPadding,
  clinicalHeroSubtitleClass,
  clinicalHeroTaglineClass,
  clinicalHeroTitleClass,
  clinicalSectionHeadline,
} from '~/constants/clinical-page-ui';
import { CLINIC_CONTACT } from '~/data/clinic-contact';
import { zaishin1BenefitCards, zaishin1Comparison, zaishin1FeatureStats, zaishin1JujitsuKasan } from '~/data/zaishin1-content';
import { zaishin1FaqEntries } from '~/data/faq-zaishin1';
import { buildFaqPageJsonLd, faqEntriesToWidgetItems } from '~/utils/seo-faq';

export const metadata: Metadata = buildMetadata({
  title: '在支診1届出クリニック｜急変・看取りまで24時間対応｜かもめクリニック',
  ignoreTitleTemplate: true,
  description:
    'かもめクリニックは機能強化型在宅療養支援診療所（在支診1）として、急変時の24時間緊急往診・連携病院への入院手配・在宅看取りまで一貫した体制を整えています。ケアマネジャー・MSW・ご家族のご相談を受け付けています。',
  path: '/zaishin1',
  ogImage: { url: 'https://kamome-clinic.net/images/top/slider02.jpg', width: 1400, height: 500 },
});

const jsonLdBreadcrumb = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'トップページ', item: 'https://kamome-clinic.net/' },
    {
      '@type': 'ListItem',
      position: 2,
      name: '機能強化型在宅療養支援診療所（在支診1）とは',
      item: 'https://kamome-clinic.net/zaishin1',
    },
  ],
};

const jsonLdFAQ = buildFaqPageJsonLd(zaishin1FaqEntries);
const zaishin1FaqWidgetItems = faqEntriesToWidgetItems(zaishin1FaqEntries);

const jsonLdSpeakable = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': 'https://kamome-clinic.net/zaishin1',
  name: '在支診1届出クリニック｜急変・看取りまで24時間対応｜かもめクリニック',
  speakable: { '@type': 'SpeakableSpecification', cssSelector: ['h1', 'h2'] },
  url: 'https://kamome-clinic.net/zaishin1',
};

const heroActions = [
  { variant: 'primary' as const, href: CLINIC_CONTACT.telHref, text: '電話する', icon: 'tabler:phone' },
  { variant: 'secondary' as const, href: '/renkei', text: '問い合わせ', icon: 'tabler:clipboard-list' },
];

export default function Zaishin1Page() {
  const CertificateIcon = resolveIcon('tabler:certificate');

  return (
    <>
      <JsonLd data={jsonLdBreadcrumb} />
      <JsonLd data={jsonLdFAQ} />
      <JsonLd data={jsonLdSpeakable} />

      <Hero
        tagline="在支診1（機能強化型）｜大阪市"
        taglineClass={clinicalHeroTaglineClass}
        titleClass={clinicalHeroTitleClass}
        subtitleClass={clinicalHeroSubtitleClass}
        sectionPaddingClass={clinicalHeroSectionPadding}
        actions={heroActions}
        title={
          <>
            <span className="inline-flex items-center gap-2 rounded-xl border border-primary/25 bg-primary/10 text-primary dark:text-blue-300 text-xs font-bold px-3 py-1.5 mb-3">
              {CertificateIcon && <CertificateIcon className="w-4 h-4 shrink-0" aria-hidden="true" />}
              厚生労働省 施設基準届出｜在支診1
            </span>
            <br />
            急変から、
            <br className="sm:hidden" />
            看取りまで、
            <br />
            <span className="text-primary dark:text-blue-300">対応できる体制を整えています。</span>
          </>
        }
        subtitle={
          <>
            在支診1とは、24時間緊急往診・入院手配体制・在宅看取り実績など、厚生労働省の施設基準（機能強化型）を満たしたクリニックのみが届出できる施設基準です。
            <strong className="text-heading">「届出をしている」ことよりも、それが患者さまに何をもたらすか</strong>
            をお伝えします。あわせて当院は「在宅医療充実体制加算」の算定医療機関です。
          </>
        }
      />

      <section className="py-16 bg-white dark:bg-slate-900 scroll-mt-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <PageSectionHeading
            tagline="在支診1だからできること"
            title="患者さまに届く、6つの安心"
            subtitle="在支診1の届出は「資格」ではなく「体制の証明」です。その体制が患者さまの日常にどう働くかをお伝えします。"
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {zaishin1BenefitCards.map(({ icon, title, description, badge }) => {
              const Icon = resolveIcon(icon);
              return (
                <div
                  key={title}
                  className="bg-gray-50 dark:bg-slate-800 rounded-2xl p-6 flex flex-col gap-3 border border-gray-100 dark:border-slate-700"
                >
                  <div className="flex items-start justify-between gap-2">
                    {Icon && <Icon className="w-8 h-8 text-primary dark:text-blue-300 shrink-0 mt-0.5" />}
                    <span className="text-xs font-bold text-primary dark:text-blue-300 bg-primary/10 dark:bg-blue-900/40 px-2.5 py-1 rounded-lg whitespace-nowrap">
                      {badge}
                    </span>
                  </div>
                  <h3 className="font-bold font-heading text-heading text-base leading-snug">{title}</h3>
                  <p className="text-sm text-muted leading-relaxed">{description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-14 bg-blue-50 dark:bg-slate-800 border-y border-blue-100 dark:border-slate-700 scroll-mt-32">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <PageSectionHeading tagline="施設基準" title="在支診1の施設基準に定められた要件" />
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-2 md:hidden" aria-hidden="true">
            表は横にスクロールできます
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <caption className="text-left text-sm text-gray-600 dark:text-gray-300 mb-3 px-1">
                {zaishin1Comparison.caption}
              </caption>
              <thead>
                <tr>
                  <th scope="col" className="text-left p-3 text-gray-500 font-normal w-2/5">
                    {zaishin1Comparison.columnScene}
                  </th>
                  <th
                    scope="col"
                    className="text-center p-3 font-bold text-primary dark:text-blue-300 bg-primary/10 dark:bg-blue-900/40 rounded-tl-lg w-[30%]"
                  >
                    {zaishin1Comparison.columnWith}
                  </th>
                  <th scope="col" className="text-center p-3 font-normal text-gray-500 w-[30%]">
                    {zaishin1Comparison.columnWithout}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-blue-100 dark:divide-slate-700">
                {zaishin1Comparison.rows.map(({ scene, withZaishin1, withoutExample }) => (
                  <tr key={scene} className="bg-white dark:bg-slate-900">
                    <th scope="row" className="p-3 text-gray-700 dark:text-gray-300 font-medium text-left align-top">
                      {scene}
                    </th>
                    <td className="p-3 text-center text-primary dark:text-blue-300 font-bold bg-primary/5 dark:bg-blue-900/20">
                      {withZaishin1}
                    </td>
                    <td className="p-3 text-center text-gray-400">{withoutExample}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 rounded-lg border border-blue-200 bg-white p-3 text-sm leading-relaxed text-gray-700 dark:border-slate-700 dark:bg-slate-900 dark:text-gray-300">
            {zaishin1Comparison.footnote}
          </p>
        </div>
      </section>

      <section className="py-14 bg-white dark:bg-slate-900 scroll-mt-32">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <PageSectionHeading tagline={zaishin1JujitsuKasan.tagline} title={zaishin1JujitsuKasan.title} />
          <div className="rounded-2xl border border-blue-100 bg-blue-50 p-6 md:p-8 dark:border-slate-700 dark:bg-slate-800">
            <p className="text-base leading-relaxed text-gray-700 dark:text-gray-300">{zaishin1JujitsuKasan.lead}</p>
            <p className="mt-4 text-base leading-relaxed text-gray-700 dark:text-gray-300">{zaishin1JujitsuKasan.body}</p>
          </div>
        </div>
      </section>

      <Features
        variant="cards"
        tagline="かもめクリニックの実績"
        title="在支診1を支える、数字と体制"
        classes={{ headline: { ...clinicalSectionHeadline }, container: 'max-w-7xl mx-auto' }}
        items={zaishin1FeatureStats}
        bg={<div className="absolute inset-0 bg-white dark:bg-transparent" />}
      />

      <FAQs
        id="faq"
        title="よくある疑問にお答えします"
        tagline="FAQ"
        subtitle="ケアマネジャー・MSW・ご家族からよくいただく質問です。"
        classes={{ container: 'max-w-7xl', headline: { ...clinicalSectionHeadline } }}
        items={zaishin1FaqWidgetItems}
      />

      <ClinicalPageClosing id="contact" />
    </>
  );
}
