import type { Metadata } from 'next';

import { Hero } from '@/components/widgets/hero';
import { Features } from '@/components/widgets/features';
import { Steps } from '@/components/widgets/steps';
import { ClinicalPageClosing } from '@/components/widgets/clinical-page-closing';
import { resolveIcon } from '@/components/ui/icon-map';
import { JsonLd } from '@/components/json-ld';
import { buildMetadata } from '@/lib/seo';
import {
  clinicalHeroSectionPadding,
  clinicalHeroSubtitleClass,
  clinicalHeroTaglineClass,
  clinicalHeroTextBlockPadding,
  clinicalHeroTitleClass,
  clinicalSectionHeadline,
} from '~/constants/clinical-page-ui';
import {
  HOMMON_SHINRYO_FLOW_HOW_TO,
  houmonShinryoFlowHowToSteps,
  houmonShinryoFlowStepsItems,
} from '~/data/flows/houmon-shinryo-flow';
import { KAMOME_BRANCH_COUNT } from '~/data/branches';
import { getCumulativePatientsDisplay, getCumulativeVisitsDisplay } from '~/data/clinic-meta';
import { STATS_PERIOD_NOTE } from '~/data/clinic-stats';

const PAGE_TITLE = '訪問診療とは・ご利用の流れ｜かもめクリニック（大阪市）';

export const metadata: Metadata = buildMetadata({
  title: PAGE_TITLE,
  ignoreTitleTemplate: true,
  description:
    '訪問診療の定義・往診との違い・対象となる方・保険適用の概要を解説。ご利用開始までの流れ（お電話・お問い合わせフォームから定期訪問まで）をご案内します。',
  path: '/houmon-shinryo',
  ogImage: { url: 'https://kamome-clinic.net/images/top/slider02.jpg', width: 1400, height: 500 },
});

const jsonLdBreadcrumb = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'トップページ', item: 'https://kamome-clinic.net/' },
    { '@type': 'ListItem', position: 2, name: '訪問診療とは', item: 'https://kamome-clinic.net/houmon-shinryo' },
  ],
};

const jsonLdHowTo = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: HOMMON_SHINRYO_FLOW_HOW_TO.name,
  description: HOMMON_SHINRYO_FLOW_HOW_TO.description,
  totalTime: HOMMON_SHINRYO_FLOW_HOW_TO.totalTime,
  step: houmonShinryoFlowHowToSteps(),
};

const jsonLdWebPage = {
  '@context': 'https://schema.org',
  '@type': 'MedicalWebPage',
  '@id': 'https://kamome-clinic.net/houmon-shinryo',
  name: PAGE_TITLE,
  url: 'https://kamome-clinic.net/houmon-shinryo',
  description:
    '訪問診療は、医師がご自宅や入居施設へ定期的に伺う計画的な医療です。往診（急変時）とは異なります。大阪市のかもめクリニックでは健康保険・介護保険適用の訪問診療と24時間緊急往診に対応しています。',
  isPartOf: { '@type': 'WebSite', '@id': 'https://kamome-clinic.net/#website' },
  about: { '@type': 'MedicalClinic', '@id': 'https://kamome-clinic.net/#clinic', name: 'かもめクリニック' },
};

const overviewItems = [
  {
    icon: 'tabler:calendar-repeat',
    title: '定期訪問（月2回が基本）',
    body: '医師が計画的に訪問し、診察・処方・検査を行います。基本は月2回の定期訪問で、病状の変化を継続的に把握し、悪化を未然に防ぎます。',
  },
  {
    icon: 'tabler:shield-check',
    title: '健康保険・介護保険が適用',
    body: '後期高齢者（1割負担）では、月額5,000〜8,000円が目安です。生活保護の方は、自己負担ゼロで受けられます。',
  },
  {
    icon: 'tabler:home-heart',
    title: '往診との違い',
    body: '「往診」は急変時の臨時対応、「訪問診療」は計画的で継続的な医療です。かもめクリニックは、どちらにも対応しています。',
  },
  {
    icon: 'tabler:users',
    title: '対象となる方',
    body: '高齢・障がい・精神疾患、医療的ケアが必要なお子さまなど、外出や通院が困難な方が対象です。紹介状がなくても、まずご相談いただけます。',
  },
];

const ArrowRight = resolveIcon('tabler:arrow-right');

const statItems = [
  { label: '開院', value: '2017', unit: '年' },
  { label: '患者数（グループ全体）', value: getCumulativePatientsDisplay(), unit: '' },
  { label: '年間診察（グループ全体）', value: getCumulativeVisitsDisplay(), unit: '' },
  { label: '大阪市内', value: String(KAMOME_BRANCH_COUNT), unit: '院' },
];

export default function HoumonShinryoPage() {
  return (
    <>
      <JsonLd data={jsonLdBreadcrumb} />
      <JsonLd data={jsonLdHowTo} />
      <JsonLd data={jsonLdWebPage} />

      <Hero
        id="about-houmon"
        tagline="訪問診療について｜大阪市"
        taglineClass={clinicalHeroTaglineClass}
        titleClass={clinicalHeroTitleClass}
        subtitleClass={clinicalHeroSubtitleClass}
        sectionPaddingClass={clinicalHeroSectionPadding}
        textBlockPaddingClass={clinicalHeroTextBlockPadding}
        title="訪問診療とは"
        subtitle="医師がご自宅・施設へ定期的に伺う計画的な医療です。健康保険・介護保険が適用され、通院が難しい方も住み慣れた場所で診療を受けられます。"
      />

      <section
        className="scroll-mt-32 bg-page pb-8 pt-4 dark:bg-slate-900 md:pb-12 md:pt-6"
        aria-labelledby="houmon-overview-heading"
      >
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <h2
            id="houmon-overview-heading"
            className="mb-6 text-2xl font-bold font-heading tracking-tight text-heading md:text-3xl"
          >
            訪問診療の概要
          </h2>
          <div className="mb-8 space-y-4 rounded-2xl bg-blue-50 p-6 dark:bg-slate-800 md:p-8">
            <p className="text-lg leading-relaxed text-gray-800 dark:text-gray-200 md:text-xl">
              <strong>訪問診療</strong>
              とは、医師が患者さまのご自宅や入居施設へ定期的に伺い、診察・処方・血液検査・処置などを行う医療サービスです。
            </p>
            <p className="text-lg leading-relaxed text-gray-800 dark:text-gray-200 md:text-xl">
              通院が困難な方が、住み慣れた場所で継続的な医療を受けられるようにすることを目的としています。健康保険・介護保険が適用されます。
            </p>
          </div>
          <div className="mb-8 grid gap-4 sm:grid-cols-2">
            {overviewItems.map(({ icon, title, body }) => {
              const Icon = resolveIcon(icon);
              return (
                <div key={title} className="flex gap-4 rounded-xl border border-gray-100 bg-white p-5">
                  {Icon && <Icon className="mt-0.5 h-8 w-8 shrink-0 text-primary" aria-hidden="true" />}
                  <div>
                    <p className="mb-1 font-bold font-heading text-heading">{title}</p>
                    <p className="text-sm leading-relaxed text-muted">{body}</p>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="flex flex-wrap justify-center gap-3 text-sm">
            <a href="/cost" className="inline-flex items-center gap-1 font-bold text-primary hover:underline">
              {ArrowRight && <ArrowRight className="h-4 w-4" />}
              費用・保険について詳しく見る
            </a>
            <span className="text-gray-300 dark:text-gray-600">|</span>
            <a href="/faq" className="inline-flex items-center gap-1 font-bold text-primary hover:underline">
              {ArrowRight && <ArrowRight className="h-4 w-4" />}
              よくあるご質問
            </a>
          </div>
        </div>
      </section>

      <section className="bg-blue-50/60 py-8 md:py-10">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <p className="mb-4 text-center text-sm font-semibold text-gray-600">かもめクリニックの実績・体制</p>
          <dl className="grid grid-cols-2 gap-3 text-center sm:grid-cols-4">
            {statItems.map(({ label, value, unit }) => (
              <div key={label} className="rounded-xl border border-gray-100 bg-white px-3 py-4 shadow-sm">
                <dt className="mb-1 text-xs text-muted">{label}</dt>
                <dd className="text-xl font-black leading-tight tabular-nums text-heading">
                  {value}
                  {unit && <span className="text-sm font-semibold">{unit}</span>}
                </dd>
              </div>
            ))}
          </dl>
          <p className="mt-3 text-center text-xs text-gray-500">
            機能強化型在宅療養支援診療所（在支診1）の施設基準届出 ／ 精神科医8名体制（専門医3名常勤） ／ {STATS_PERIOD_NOTE}
          </p>
        </div>
      </section>

      <Steps
        id="flow"
        title="ご利用の流れ"
        subtitle="初めての方でも、お電話1本から訪問診療を始められます。紹介状がなくても、まずご相談ください。"
        classes={{
          container: 'max-w-5xl mx-auto',
          headline: { ...clinicalSectionHeadline, container: 'text-left rtl:text-right md:mx-0' },
        }}
        items={houmonShinryoFlowStepsItems()}
      />

      <Features
        variant="cards"
        id="targets"
        tagline="ご利用対象"
        title="こんな方がご利用いただけます"
        subtitle="通院が困難な方が主な対象です。保険診療の適用や受け入れ可否は状態・お住まいのエリアによって異なりますので、まずはご相談ください。"
        classes={{ headline: { ...clinicalSectionHeadline }, container: 'max-w-7xl mx-auto' }}
        columns={4}
        bg={<div className="absolute inset-0 bg-blue-50/50 dark:bg-transparent" />}
        items={[
          {
            title: '通院困難な高齢者・障がいのある方',
            description: '足腰が弱く通院が難しくなった方、寝たきりや車いすの方にも対応します。',
            icon: 'tabler:wheelchair',
          },
          {
            title: '外出困難な精神疾患の方',
            description: 'うつ病・統合失調症・認知症など、精神科専門医がご自宅へ直接伺います。',
            icon: 'tabler:home-shield',
          },
          {
            title: '医療ケアが必要なお子さま',
            description: '人工呼吸器・経管栄養など、医療的ケアが必要なお子さまのご自宅へ、小児科専門医が訪問します。',
            icon: 'tabler:baby-carriage',
          },
          {
            title: '退院後・施設入居中の方',
            description: '病院を退院されたあとの在宅療養中の方、老人ホーム・グループホームに入居中の方にも対応します。',
            icon: 'tabler:bed',
          },
        ]}
      />

      <div className="-mt-4 bg-white pb-8 text-center dark:bg-slate-900">
        <a href="/about" className="inline-flex items-center gap-1 text-sm font-bold text-primary hover:underline">
          クリニック紹介でもっと詳しく見る
          {ArrowRight && <ArrowRight className="h-4 w-4" />}
        </a>
      </div>

      <ClinicalPageClosing id="contact" />
    </>
  );
}
