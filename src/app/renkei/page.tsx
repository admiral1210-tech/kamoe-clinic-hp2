import type { Metadata } from 'next';

import { Hero } from '@/components/widgets/hero';
import { PageSectionHeading } from '@/components/ui/page-section-heading';
import { PageTocNav } from '@/components/ui/page-toc-nav';
import { Features } from '@/components/widgets/features';
import { Steps } from '@/components/widgets/steps';
import { FAQs } from '@/components/widgets/faqs';
import { RenkeiStaffStrip } from '@/components/pages/renkei/renkei-staff-strip';
import { RenkeiContactDetailSection } from '@/components/pages/renkei/renkei-contact-detail-section';
import { resolveIcon } from '@/components/ui/icon-map';
import { JsonLd } from '@/components/json-ld';
import { buildMetadata } from '@/lib/seo';
import {
  clinicalAnchorScrollMargin,
  clinicalHeroSubtitleClass,
  clinicalHeroTaglineClass,
  clinicalHeroTextBlockPadding,
  clinicalHeroTitleClass,
  clinicalSectionHeadline,
} from '~/constants/clinical-page-ui';
import { KAMOME_BRANCH_COUNT } from '~/data/branches';
import { GROUP_STATS, STATS_PERIOD_NOTE } from '~/data/clinic-stats';
import { renkeiFaqEntries } from '~/data/faq-renkei';
import { buildFaqPageJsonLd, faqEntriesToWidgetItems } from '~/utils/seo-faq';

export const metadata: Metadata = buildMetadata({
  title: 'ご家族・医療・介護関係者の方へ｜地域医療連携｜かもめクリニック（大阪市）',
  ignoreTitleTemplate: true,
  description: `ケアマネジャー・MSW・病院スタッフの方へ。かもめクリニックの地域医療連携部（06-4301-7883）が窓口を一括対応。精神科医8名体制（専門医3名常勤）・在支診1届出。状況により当日〜早期の訪問開始を目指します。大阪市内${KAMOME_BRANCH_COUNT}院体制で原則市内全域対応します（エリア外は要相談）。`,
  path: '/renkei',
  ogImage: { url: 'https://kamome-clinic.net/images/top/slider02.jpg', width: 1400, height: 500 },
});

const jsonLdBreadcrumb = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'トップページ', item: 'https://kamome-clinic.net/' },
    { '@type': 'ListItem', position: 2, name: 'ご家族・医療・介護関係者の方へ', item: 'https://kamome-clinic.net/renkei' },
  ],
};

const strengths = [
  {
    icon: 'tabler:brain',
    title: '精神科医8名体制（専門医3名常勤・精神保健指定医在籍）',
    description:
      'うつ病・統合失調症・双極性障害・認知症・依存症など精神疾患を抱える患者さまも専門医が対応。外来通院が困難なケースに強みがあります。',
  },
  {
    icon: 'tabler:clock-24',
    title: '24時間365日の緊急往診体制',
    description:
      '在支診1として夜間・休日も緊急往診に対応。急変時の受け皿として、担当ケアマネ・施設スタッフへの迅速な連絡体制を整えています。',
  },
  {
    icon: 'tabler:map-pin',
    title: `大阪市内${KAMOME_BRANCH_COUNT}院・原則市内全域対応`,
    description: `港区・西淀川区・住之江区ほか市内に${KAMOME_BRANCH_COUNT}拠点。対応エリアの確認は地域医療連携部が一括で行います。エリア外は要相談のため、まずご相談ください。`,
  },
  {
    icon: 'tabler:building-hospital',
    title: `${GROUP_STATS.facilityCount}への訪問実績`,
    description: `有料老人ホーム・グループホーム・特別養護老人ホーム・サービス付き高齢者向け住宅など${GROUP_STATS.facilityCount}に対応（${STATS_PERIOD_NOTE}）。施設担当医としての連携も可能です。`,
  },
  {
    icon: 'tabler:baby-carriage',
    title: '医療ケア児・NICU退院後支援',
    description:
      '小児科専門医・小児循環器専門医が在籍。人工呼吸器・経管栄養・気管切開など医療的ケアが必要なお子さまの在宅移行を支援します。',
  },
  {
    icon: 'tabler:heart',
    title: 'ご本人の意向を最優先に、看取りまで寄り添います',
    description: `終末期のご本人・ご家族への丁寧なケアと関係各所との連携を大切にしています。グループ全体で年間${GROUP_STATS.annualDeathCount}の在宅看取りを実施しています（${STATS_PERIOD_NOTE}）。`,
  },
];

const targets = [
  { icon: 'tabler:wheelchair', text: '通院困難な高齢者・障がいのある方' },
  { icon: 'tabler:home-shield', text: '外出困難な精神疾患の方（うつ病・統合失調症・認知症など）' },
  { icon: 'tabler:baby-carriage', text: '医療的ケアが必要なお子さま（NICU退院後含む）' },
  { icon: 'tabler:bed', text: '退院後に在宅療養に移行される方' },
  { icon: 'tabler:building-store', text: '施設入居中で定期的な医師の往診が必要な方' },
  { icon: 'tabler:stethoscope', text: '緩和ケア・看取りを希望される方とそのご家族' },
];

const jsonLdFAQ = buildFaqPageJsonLd(renkeiFaqEntries);
const renkeiFaqWidgetItems = faqEntriesToWidgetItems(renkeiFaqEntries);

export default function RenkeiPage() {
  return (
    <>
      <JsonLd data={jsonLdBreadcrumb} />
      <JsonLd data={jsonLdFAQ} />

      <Hero
        tagline="ご家族・医療・介護関係者の方へ"
        taglineClass={clinicalHeroTaglineClass}
        titleClass={clinicalHeroTitleClass}
        subtitleClass={`${clinicalHeroSubtitleClass} mb-3 md:mb-4`}
        imageContainerClass="max-w-7xl w-full"
        textBlockPaddingClass={clinicalHeroTextBlockPadding}
        title={
          <>
            24時間体制・{KAMOME_BRANCH_COUNT}院連携の
            <br />
            <span className="text-primary dark:text-blue-300">在宅医療パートナー</span>
          </>
        }
        subtitle={
          <>
            ご家族・ケアマネジャー・MSW・病院スタッフの方からのご紹介・ご連絡をお待ちしています。
            <br className="hidden sm:inline" />
            地域医療連携部が窓口を一括対応し、状況に応じて早期の訪問開始を目指します。
          </>
        }
        image={
          <>
            <div className="relative left-1/2 w-screen max-w-[100vw] -ml-[50vw] mt-2 md:mt-3 pointer-events-auto">
              <PageTocNav
                ariaLabel="このページの目次"
                items={[
                  { href: '#renkei-staff', label: '連携部スタッフ' },
                  { href: '#renkei-contact-detail', label: '連絡先詳細' },
                  { href: '#renkei-strengths', label: '在宅医療体制' },
                  { href: '#renkei-targets', label: '受け入れ対象' },
                  { href: '#renkei-flow', label: '紹介の流れ' },
                  { href: '#renkei-faq', label: 'よくある質問' },
                ]}
              />
            </div>
            <div className="mt-4 md:mt-6 space-y-0 text-left overflow-x-clip">
              <RenkeiStaffStrip />
              <RenkeiContactDetailSection />
            </div>
          </>
        }
      />

      <Features
        variant="cards"
        id="renkei-strengths"
        tagline="連携のポイント"
        title="かもめクリニックの在宅医療体制"
        subtitle="精神科・小児科・看取りまで対応する在宅医療グループです。難しいケースもまずはご相談ください。"
        classes={{ headline: { ...clinicalSectionHeadline }, container: 'max-w-7xl mx-auto' }}
        items={strengths}
        columns={3}
      />

      <section id="renkei-targets" className={`py-14 bg-blue-50 border-y border-blue-100 ${clinicalAnchorScrollMargin}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <PageSectionHeading
            tagline="対象"
            title="受け入れ可能な患者さまの例"
            subtitle="複数疾患をお持ちの方・難しい状態の方も、まずはお気軽にご相談ください。"
          />
          <div className="grid sm:grid-cols-2 gap-3">
            {targets.map(({ icon, text }) => {
              const Icon = resolveIcon(icon);
              return (
                <div
                  key={text}
                  className="bg-white dark:bg-slate-900 rounded-xl border border-gray-100 dark:border-slate-700 px-5 py-4 flex items-center gap-3"
                >
                  {Icon && <Icon className="w-6 h-6 text-primary shrink-0" aria-hidden="true" />}
                  <p className="text-gray-800 dark:text-gray-200 text-sm font-medium">{text}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <Steps
        id="renkei-flow"
        scrollMarginClass={clinicalAnchorScrollMargin}
        tagline="ご紹介の流れ"
        title="スムーズな訪問開始に向けた紹介の流れ"
        items={[
          {
            title: 'STEP 1　地域医療連携部へご連絡',
            description:
              'TEL 06-4301-7883（平日・祝日9:00〜17:00）またはFAX・フォームから患者さまの基本情報（住所・状態・診療科）をお伝えください。紹介状がなくてもご相談いただけます。',
            icon: 'tabler:phone',
          },
          {
            title: 'STEP 2　担当エリア・拠点の確認',
            description: `患者さまのご住所・状態を確認し、${KAMOME_BRANCH_COUNT}院のうち最適な拠点と担当医を決定します。対応可否を速やかにご連絡します。`,
            icon: 'tabler:map-search',
          },
          {
            title: 'STEP 3　患者さま・ご家族への説明',
            description:
              'ご本人・ご家族に訪問診療の内容・費用・スケジュールをご説明します。担当ケアマネジャーとの情報共有も行います。',
            icon: 'tabler:users',
          },
          {
            title: 'STEP 4　初回訪問・訪問診療スタート',
            description:
              '担当医が初回訪問し、診療計画・訪問スケジュール・緊急時の連絡方法をご説明。月2回の定期訪問診療がスタートします。',
            icon: 'tabler:home-heart',
          },
        ]}
        classes={{
          container: 'max-w-7xl mx-auto',
          headline: {
            ...clinicalSectionHeadline,
            container: `${clinicalSectionHeadline.container} text-left rtl:text-right md:mx-0`,
          },
        }}
      />

      <FAQs
        id="renkei-faq"
        scrollMarginClass={clinicalAnchorScrollMargin}
        title="よくある質問（ご家族・医療・介護関係者の方へ）"
        tagline="FAQ"
        classes={{ container: 'max-w-7xl', headline: { ...clinicalSectionHeadline } }}
        items={renkeiFaqWidgetItems}
      />
    </>
  );
}
