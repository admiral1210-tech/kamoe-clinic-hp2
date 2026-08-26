import type { Metadata } from 'next';

import { Hero } from '@/components/widgets/hero';
import { Features } from '@/components/widgets/features';
import { FAQs } from '@/components/widgets/faqs';
import { ClinicalPageClosing } from '@/components/widgets/clinical-page-closing';
import { PageTocNav } from '@/components/ui/page-toc-nav';
import { PageSectionHeading } from '@/components/ui/page-section-heading';
import { resolveIcon } from '@/components/ui/icon-map';
import { JsonLd } from '@/components/json-ld';
import { buildMetadata } from '@/lib/seo';
import { CLINIC_CONTACT } from '~/data/clinic-contact';
import {
  joseikinFlowSteps,
  joseikinJoseiFeatureItems,
  joseikinPointItems,
  joseikinShindanshoFeatureItems,
} from '~/data/joseikin-content';
import { joseikinFaqEntries } from '~/data/faq-joseikin';
import {
  clinicalAnchorScrollMargin,
  clinicalHeroSectionPadding,
  clinicalHeroSubtitleClass,
  clinicalHeroTaglineClass,
  clinicalHeroTextBlockPadding,
  clinicalHeroTitleClass,
  clinicalSectionHeadline,
} from '~/constants/clinical-page-ui';
import { buildFaqPageJsonLd, faqEntriesToWidgetItems } from '~/utils/seo-faq';

export const metadata: Metadata = buildMetadata({
  title: '医療費助成・診断書のご案内｜かもめクリニック（大阪市）',
  ignoreTitleTemplate: true,
  description:
    'かもめクリニックでは自立支援医療（精神通院）・身体障害者手帳・障害年金・難病医療など各種診断書の発行に対応。乳幼児医療費助成・高額療養費・公害・原爆など医療費助成制度の案内も行っています。',
  path: '/joseikin',
  ogImage: { url: 'https://kamome-clinic.net/images/top/slider02.jpg', width: 1400, height: 500 },
});

const jsonLdBreadcrumb = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'トップページ', item: 'https://kamome-clinic.net/' },
    { '@type': 'ListItem', position: 2, name: '医療費助成・診断書', item: 'https://kamome-clinic.net/joseikin' },
  ],
};

const jsonLdFAQ = buildFaqPageJsonLd(joseikinFaqEntries);
const joseikinFaqWidgetItems = faqEntriesToWidgetItems(joseikinFaqEntries);

const heroActions = [
  { variant: 'primary' as const, href: CLINIC_CONTACT.telHref, text: '電話する', icon: 'tabler:phone' },
  { variant: 'secondary' as const, href: '/renkei', text: '問い合わせ', icon: 'tabler:clipboard-list' },
];

export default function JoseikinPage() {
  return (
    <>
      <JsonLd data={jsonLdBreadcrumb} />
      <JsonLd data={jsonLdFAQ} />

      <Hero
        tagline="医療費助成・診断書｜大阪市の訪問診療"
        taglineClass={clinicalHeroTaglineClass}
        titleClass={clinicalHeroTitleClass}
        subtitleClass={clinicalHeroSubtitleClass}
        sectionPaddingClass={clinicalHeroSectionPadding}
        textBlockPaddingClass={clinicalHeroTextBlockPadding}
        actions={heroActions}
        title={
          <>
            医療費助成・
            <br />
            <span className="text-primary dark:text-blue-300">診断書</span>のご案内
          </>
        }
        subtitle={
          <>
            かもめクリニックでは<strong>診断書の作成・発行</strong>に幅広く対応しています。
            <br className="hidden sm:inline" />
            医療費助成制度をうまく活用し、継続的な医療を無理なく受けていただけるようサポートします。
          </>
        }
      />

      <PageTocNav
        ariaLabel="このページの目次"
        items={[
          { href: '#first-visit', label: 'はじめての方へ' },
          { href: '#shindansho', label: '診断書の種類' },
          { href: '#nagare', label: '発行の流れ' },
          { href: '#josei', label: '助成制度' },
          { href: '#points', label: '利用のポイント' },
          { href: '#faq', label: 'よくある質問' },
        ]}
      />

      <section
        id="first-visit"
        className={`not-prose border-y border-gray-100 bg-gray-50 py-10 ${clinicalAnchorScrollMargin}`}
      >
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="mb-3 text-center text-xl font-bold font-heading text-heading md:text-2xl">
            はじめての方へ（ご家族の方も）
          </h2>
          <p className="mb-6 text-center text-sm leading-relaxed text-gray-600 dark:text-gray-300 md:text-base">
            診断書の種類や申請先は制度ごとに異なります。まずはお電話またはフォームで、必要な書類と大まかな流れをご案内します。
          </p>
          <ol className="mb-6 list-decimal space-y-2 pl-5 text-sm text-gray-800 dark:text-gray-200 md:text-base">
            <li>
              お電話（
              <a href={CLINIC_CONTACT.telHref} className="font-semibold text-primary underline">
                {CLINIC_CONTACT.telDisplay}
              </a>
              ）または
              <a href="/renkei" className="font-semibold text-primary underline">
                お問い合わせフォーム
              </a>
              で、必要な診断書または利用を検討している助成制度、申請の目安時期をお知らせください（{CLINIC_CONTACT.hoursPrimary}）。
            </li>
            <li>当院での対応可否・お持ちいただく書類の目安をご案内します。</li>
            <li>診察・書類作成の日程を調整し、完成後の受け取り方法をご説明します。</li>
          </ol>
          <p className="text-center text-xs leading-relaxed text-gray-500 dark:text-gray-400">
            文書料・紹介状の要否などは個別に説明します。詳しくは
            <a href="/faq" className="text-primary underline">
              よくある質問（サイト全体）
            </a>
            もご覧ください。
          </p>
        </div>
      </section>

      <Features
        id="shindansho"
        scrollMarginClass={clinicalAnchorScrollMargin}
        tagline="診断書"
        title="発行できる診断書の種類"
        subtitle="訪問診療の中で必要な書類作成も一括対応します。申請期限がある場合はお早めにご相談ください。"
        classes={{ headline: { ...clinicalSectionHeadline } }}
        items={joseikinShindanshoFeatureItems}
      />

      <section
        id="nagare"
        className="scroll-mt-32 border-y border-blue-100 bg-blue-50 py-14 dark:border-slate-700 dark:bg-slate-800"
      >
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <PageSectionHeading tagline="流れ" title="診断書発行の流れ" subtitle="申請期限がある場合は余裕をもってご依頼ください" />
          <ol className="m-0 list-none space-y-4 pl-0">
            {joseikinFlowSteps.map(({ step, title, body }) => (
              <li
                key={step}
                className="flex gap-4 rounded-xl border border-gray-100 bg-white px-5 py-4 dark:border-slate-700 dark:bg-slate-900"
              >
                <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary text-sm font-black text-white">
                  {step}
                </span>
                <div>
                  <h3 className="mb-1 text-base font-bold leading-snug font-heading text-heading">{title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{body}</p>
                </div>
              </li>
            ))}
          </ol>
          <p className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
            ※ 診断書の文書料は別途費用がかかります。書類の種類により異なりますので、診察時にご案内します。
          </p>
        </div>
      </section>

      <Features
        variant="cards"
        id="josei"
        scrollMarginClass={clinicalAnchorScrollMargin}
        tagline="助成制度"
        title="ご利用いただける医療費助成制度"
        subtitle="各制度の申請・手続きに関するご相談も承ります。まずはお気軽にお問い合わせください。"
        classes={{ headline: { ...clinicalSectionHeadline }, container: 'max-w-7xl mx-auto' }}
        columns={2}
        items={joseikinJoseiFeatureItems}
      />

      <section id="points" className="scroll-mt-32 bg-page py-14 dark:bg-slate-900">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <PageSectionHeading tagline="ポイント" title="制度を利用する際のポイント" />
          <ul className="m-0 list-none space-y-4 pl-0">
            {joseikinPointItems.map(({ icon, title, body }) => {
              const Icon = resolveIcon(icon);
              return (
                <li
                  key={title}
                  className="flex gap-4 rounded-xl border border-gray-100 bg-white px-5 py-4 dark:border-slate-700 dark:bg-slate-900"
                >
                  {Icon && <Icon className="mt-0.5 h-7 w-7 shrink-0 text-primary" aria-hidden="true" />}
                  <div>
                    <h3 className="mb-1 text-base font-bold leading-snug font-heading text-heading">{title}</h3>
                    <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400">{body}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <FAQs
        id="faq"
        scrollMarginClass={clinicalAnchorScrollMargin}
        title="医療費助成・診断書に関するよくある質問"
        tagline="FAQ"
        classes={{ container: 'max-w-7xl', headline: { ...clinicalSectionHeadline } }}
        items={joseikinFaqWidgetItems}
      />

      <ClinicalPageClosing />
    </>
  );
}
