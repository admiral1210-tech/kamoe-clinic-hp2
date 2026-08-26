import type { Metadata } from 'next';

import { Hero } from '@/components/widgets/hero';
import { Features } from '@/components/widgets/features';
import { Content } from '@/components/widgets/content';
import { FAQs } from '@/components/widgets/faqs';
import { PageSectionHeading } from '@/components/ui/page-section-heading';
import { CostSimulator } from '@/components/widgets/cost-simulator';
import { resolveIcon } from '@/components/ui/icon-map';
import { JsonLd } from '@/components/json-ld';
import { buildMetadata } from '@/lib/seo';
import { costFaqEntries } from '~/data/faq-cost';
import {
  clinicalHeroSubtitleClass,
  clinicalHeroTaglineClass,
  clinicalHeroTitleClass,
  clinicalSectionHeadline,
} from '~/constants/clinical-page-ui';
import { buildFaqPageJsonLd, faqEntriesToWidgetItems } from '~/utils/seo-faq';

export const metadata: Metadata = buildMetadata({
  title: '訪問診療の費用・料金・保険適用｜かもめクリニック（大阪市）',
  ignoreTitleTemplate: true,
  description:
    'かもめクリニックの訪問診療にかかる費用・料金の目安。医療保険・後期高齢者医療・生活保護への対応、自己負担額の目安をわかりやすく解説します。',
  path: '/cost',
  ogImage: { url: 'https://kamome-clinic.net/images/top/slider02.jpg', width: 1400, height: 500 },
});

const jsonLdBreadcrumb = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'トップページ', item: 'https://kamome-clinic.net/' },
    { '@type': 'ListItem', position: 2, name: '訪問診療の費用・保険', item: 'https://kamome-clinic.net/cost' },
  ],
};

const jsonLdFAQ = buildFaqPageJsonLd(costFaqEntries);
const costFaqWidgetItems = faqEntriesToWidgetItems(costFaqEntries);

const jsonLdSpeakable = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': 'https://kamome-clinic.net/cost',
  name: '訪問診療の費用・料金・保険適用｜かもめクリニック',
  speakable: { '@type': 'SpeakableSpecification', cssSelector: ['h1', 'h2'] },
  url: 'https://kamome-clinic.net/cost',
};

const kaigoInfoItems = [
  {
    icon: 'tabler:heart-handshake',
    title: '訪問診療は医療保険・介護保険は介護サービスに',
    body: '医師による訪問診療は医療保険が適用されます。介護保険は訪問介護・訪問看護・デイサービスなどの介護サービスに使用します。訪問診療と介護保険サービスは別々の制度のため、両方を組み合わせてご利用いただけます。',
  },
  {
    icon: 'tabler:clipboard-list',
    title: 'ケアプランとの関係',
    body: 'ケアマネジャーが作成するケアプランには、介護保険サービスが記載されます。訪問診療はケアプランとは別に、医師と患者さまの間で診療計画を作成します。ケアマネジャーと当院で情報を共有し、連携して支援します。',
  },
  {
    icon: 'tabler:info-circle',
    title: '介護保険の申請がまだの方もご相談ください',
    body: '介護保険の申請がまだの方や、ケアマネジャーがお決まりでない方も、当院でご相談いただけます。申請手続きについてのご案内も行っています。お電話またはお問い合わせフォームでお気軽にどうぞ。',
  },
];

export default function CostPage() {
  return (
    <>
      <JsonLd data={jsonLdBreadcrumb} />
      <JsonLd data={jsonLdFAQ} />
      <JsonLd data={jsonLdSpeakable} />

      <Hero
        tagline="費用・保険｜大阪市の訪問診療"
        taglineClass={clinicalHeroTaglineClass}
        titleClass={clinicalHeroTitleClass}
        subtitleClass={clinicalHeroSubtitleClass}
        title={
          <>
            訪問診療の
            <br />
            <span className="text-primary dark:text-blue-300">費用・保険</span>について
          </>
        }
        subtitle={
          <>
            かもめクリニックの訪問診療は<strong>医療保険が適用</strong>されます。
            <br className="hidden sm:inline" />
            75歳以上の後期高齢者は1〜2割負担、生活保護の方は自己負担ゼロで受けられます。
          </>
        }
      />

      <Features
        tagline="保険について"
        title="訪問診療に適用できる保険制度"
        subtitle="複数の制度が組み合わさることで、自己負担を軽減できます"
        classes={{ headline: { ...clinicalSectionHeadline } }}
        items={[
          {
            title: '医療保険',
            description:
              '訪問診療の診察料・処方料・管理料などが医療保険の対象です。国民健康保険・社会保険・後期高齢者医療保険のいずれも適用されます。',
            icon: 'tabler:heart-handshake',
          },
          {
            title: '後期高齢者医療保険',
            description:
              '75歳以上の方は自動的に後期高齢者医療保険に加入します。所得に応じて1割・2割または3割負担となり、医療費の自己負担が軽減されます。',
            icon: 'tabler:user-heart',
          },
          {
            title: '高額療養費制度',
            description:
              '1か月の医療費自己負担が一定額を超えた場合、超過分が払い戻される制度です。70歳以上は自己負担限度額が低く設定されています。加入保険に申請が必要です。',
            icon: 'tabler:cash-banknote',
          },
          {
            title: '生活保護',
            description:
              '生活保護受給中の方は医療扶助が適用され、自己負担ゼロで訪問診療を受けられます。事前に福祉事務所で医療券を取得する必要があります。',
            icon: 'tabler:shield-check',
          },
          {
            title: '障害者医療費助成',
            description:
              '身体障害者手帳・精神障害者保健福祉手帳をお持ちの方は、自治体の医療費助成制度（マル障等）が適用される場合があります。お住まいの区役所にご確認ください。',
            icon: 'tabler:accessible',
          },
        ]}
      />

      <section id="simulator" className="scroll-mt-32 py-16 dark:bg-slate-800">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <PageSectionHeading
            tagline="シミュレーション"
            title="医療費シミュレーション"
            subtitle="4つの質問に答えるだけで、月々の自己負担の目安がわかります。"
          />
          <CostSimulator />
          <p className="mt-4 text-center text-sm text-gray-500">
            ※ 上記はあくまでも目安です。実際の費用は保険の種類・加算・処置内容により異なります。
          </p>
        </div>
      </section>

      <section className="bg-page py-10 md:py-14">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <PageSectionHeading
            tagline="介護保険との関係"
            title="訪問診療と介護保険サービスは別建てで利用できます"
            subtitle="介護保険の申請がまだの方や、ケアマネジャーが決まっていない方もご相談ください。"
          />
          <div className="space-y-4">
            {kaigoInfoItems.map(({ icon, title, body }) => {
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
        </div>
      </section>

      <Content
        tagline="費用の流れ"
        title="訪問診療費用の支払い方法"
        isReversed
        classes={{
          headline: {
            container: 'max-w-xl sm:mx-auto lg:max-w-2xl text-left sm:text-center',
            title: 'text-4xl md:text-5xl font-bold tracking-tighter mb-4 font-heading',
            subtitle: 'max-w-3xl mx-auto sm:text-center text-xl text-muted dark:text-slate-400',
          },
        }}
        items={[
          {
            title: '毎月の請求書でお支払い（口座振替）',
            description:
              '医療費は1ヶ月ごとに月末締めで計算し、翌月にご登録口座より自動振替にてお支払いいただきます。お支払いのために来院いただく必要はなく、口座振替手数料も当院が負担します。',
          },
          {
            title: '処方薬は保険薬局でお受け取り',
            description: '処方薬は保険薬局でお受け取りください。お薬代は薬局へ直接お支払いいただきます。',
          },
          {
            title: '費用の不明点はご相談ください',
            description:
              '費用についてのご不明点・ご不安はお電話（06-4301-7871）またはお問い合わせフォームでいつでもご相談いただけます。',
          },
        ]}
        content='<h3 class="text-2xl font-bold tracking-tight dark:text-white sm:text-3xl mb-2">費用についてのご不明点はお気軽に</h3>'
        bg={<div className="absolute inset-0 bg-blue-50 dark:bg-transparent" />}
      />

      <FAQs
        id="faq"
        title="費用・保険に関するよくある質問"
        tagline="FAQ"
        classes={{ container: 'max-w-6xl', headline: { ...clinicalSectionHeadline } }}
        items={costFaqWidgetItems}
      />
    </>
  );
}
