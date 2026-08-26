import type { Metadata } from 'next';

import { Hero } from '@/components/widgets/hero';
import { Features } from '@/components/widgets/features';
import { Content } from '@/components/widgets/content';
import { FAQs } from '@/components/widgets/faqs';
import { ClinicalPageClosing } from '@/components/widgets/clinical-page-closing';
import { PageTocNav } from '@/components/ui/page-toc-nav';
import { resolveIcon } from '@/components/ui/icon-map';
import { JsonLd } from '@/components/json-ld';
import { buildMetadata } from '@/lib/seo';
import { CLINIC_CONTACT } from '~/data/clinic-contact';
import { seikeigekaFaqEntries } from '~/data/faq-seikeigeka';
import { seikeigekaMedicalConditionsJsonLd } from '~/data/medical-conditions-seikeigeka';
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
  title: '整形外科の訪問診療｜関節注射・骨粗しょう症・身体障害者手帳｜大阪市｜かもめクリニック',
  ignoreTitleTemplate: true,
  description:
    '整形外科の訪問診療（大阪市）。かもめクリニックがご自宅・施設へ。関節注射（膝・肩・ヒアルロン酸・ステロイド）・骨粗しょう症管理・骨折後フォロー・リハビリ指示書・補装具・転倒予防。身体障害者手帳（肢体不自由）の診断書も。',
  path: '/seikeigeka',
  ogImage: { url: 'https://kamome-clinic.net/images/top/slider02.jpg', width: 1400, height: 500 },
});

const jsonLdBreadcrumb = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'トップページ', item: 'https://kamome-clinic.net/' },
    { '@type': 'ListItem', position: 2, name: '整形外科の訪問診療', item: 'https://kamome-clinic.net/seikeigeka' },
  ],
};

const jsonLdFAQ = buildFaqPageJsonLd(seikeigekaFaqEntries);
const seikeigekaFaqWidgetItems = faqEntriesToWidgetItems(seikeigekaFaqEntries);
const jsonLdConditions = seikeigekaMedicalConditionsJsonLd();

const jsonLdSpeakable = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': 'https://kamome-clinic.net/seikeigeka',
  name: '整形外科の訪問診療｜大阪市｜かもめクリニック',
  speakable: { '@type': 'SpeakableSpecification', cssSelector: ['h1'] },
  url: 'https://kamome-clinic.net/seikeigeka',
};

const heroActions = [
  { variant: 'primary' as const, href: CLINIC_CONTACT.telHref, text: '電話する', icon: 'tabler:phone' },
  { variant: 'secondary' as const, href: '/renkei', text: '問い合わせ', icon: 'tabler:clipboard-list' },
];

const taishoItems = [
  { icon: 'tabler:wheelchair', text: '膝・股関節の痛みで外出が困難な方' },
  { icon: 'tabler:bone', text: '骨折・手術後に退院してご自宅で療養中の方' },
  { icon: 'tabler:activity', text: '骨粗しょう症の治療・注射を継続したい方' },
  { icon: 'tabler:body-scan', text: '腰部脊柱管狭窄症・腰痛で歩行が難しい方' },
  { icon: 'tabler:accessible', text: '肢体不自由で身体障害者手帳の取得を考えている方' },
  { icon: 'tabler:walk', text: '転倒が怖い・転倒後にリハビリをしたい方' },
];

const diseaseItems = [
  {
    title: '変形性膝関節症',
    descriptionSummary: '膝の痛みや腫れを、ご自宅で注射・薬・装具指導まで継続できます。',
    description:
      '膝の軟骨がすり減り、痛みや腫れが生じる疾患。定期的なヒアルロン酸注射・鎮痛薬の調整・装具指導をご自宅で継続できます。通院が困難な方でも訪問診療で治療を継続しやすくなります。',
    icon: 'tabler:run',
  },
  {
    title: '変形性股関節症・変形性腰椎症',
    descriptionSummary: '股関節・腰の慢性の痛みを、在宅で薬とリハ指示などまとめて管理します。',
    description:
      '股関節・腰椎の変形による慢性疼痛。薬物療法の継続管理・日常生活動作のアドバイス・リハビリ指示書の発行により、自宅での生活の質を維持します。',
    icon: 'tabler:body-scan',
  },
  {
    title: '骨粗しょう症・圧迫骨折・大腿骨頸部骨折',
    descriptionSummary: '骨がもろくなる病気とその骨折。在宅でも薬・注射で骨密度管理に取り組みます。',
    description:
      '骨密度の低下による骨折は在宅患者に非常に多い疾患です。骨粗しょう症治療薬の内服・注射（デノスマブ・テリパラチド等）による骨密度管理と、再骨折リスク低減を目標とした継続的な治療管理を行います。',
    icon: 'tabler:bone',
  },
  {
    title: '腰部脊柱管狭窄症・腰椎椎間板ヘルニア',
    descriptionSummary: '腰・足のしびれや痛み。通院が難しくても、薬の調整を訪問で続けられます。',
    description:
      '間欠性跛行・下肢しびれ・腰痛など。通院が困難な方を対象に、薬物療法（鎮痛薬・神経障害性疼痛薬）の継続調整を訪問で行い、歩行能力の維持をサポートします。',
    icon: 'tabler:activity',
  },
  {
    title: '人工関節置換術後（膝・股関節）',
    descriptionSummary: '手術後の痛み・リハ・感染の兆候などを、自宅でフォローします。',
    description:
      '疼痛管理・リハビリ進捗の確認・感染徴候の早期発見・次の受診タイミングの判断をご自宅で行います。術後も安心して在宅生活を続けられるよう支えます。',
    icon: 'tabler:heart-handshake',
  },
  {
    title: '肢体不自由（脳卒中後遺症・外傷後遺症）',
    descriptionSummary: '手帳の診断書、訪問リハの指示、装具の処方などを訪問の流れで対応します。',
    description:
      '脳卒中後の麻痺・骨折後の機能障害など肢体に不自由のある方。身体障害者手帳の取得に必要な診断書発行から、訪問リハビリの指示・補装具の処方まで対応します。',
    icon: 'tabler:accessible',
  },
];

const servicesItems = [
  {
    title: '関節注射（ヒアルロン酸・ステロイド）',
    descriptionSummary: '膝・肩・手指などの注射を自宅・施設で。痛みのコントロールを途切れさせません。',
    description:
      '膝・肩・手指・足首などへの関節注射をご自宅で実施。痛みのコントロールを切らさず継続できます。注射の頻度・種類は状態に合わせて調整します。',
    icon: 'tabler:needle',
  },
  {
    title: '骨粗しょう症の薬物治療・注射管理',
    descriptionSummary: 'ビスホスホネート・デノスマブ・テリパラチドなど、訪問で継続管理します。',
    description:
      'ビスホスホネート内服・デノスマブ（6か月ごと皮下注射）・テリパラチドなど、骨粗しょう症治療薬の継続管理を訪問で行います。骨折予防に直結する重要な治療です。',
    icon: 'tabler:bone',
  },
  {
    title: '骨折後・術後の在宅フォロー',
    descriptionSummary: '退院後の痛み・創部・服薬・次の受診のタイミングまで、在宅で支えます。',
    description:
      '退院後の疼痛管理・創部確認・服薬調整・次の受診タイミングの判断まで担います。再骨折リスク低減を目的とした生活指導も行い、ご家族の不安もともに考えます。',
    icon: 'tabler:home-heart',
  },
  {
    title: 'リハビリ指示書の作成',
    descriptionSummary: '訪問PT・OT・STに必要な指示書を、病態に合わせて詳しく書きます。',
    description:
      '訪問リハビリ（PT・OT・ST）を利用するには医師の指示書が必要です。整形外科の専門知識をもとに、リハビリの目標・方法・禁忌事項を詳細に記載します。',
    icon: 'tabler:clipboard-list',
  },
  {
    title: '補装具・介護用品の処方・意見書作成',
    descriptionSummary: '装具・車いす・杖などの処方と意見書で、福祉申請の書類もサポートします。',
    description:
      '短下肢装具・車椅子・コルセット・歩行補助具などの処方・意見書を作成。区役所の福祉用具申請をスムーズに進められるよう書類面でサポートします。',
    icon: 'tabler:wheelchair',
  },
  {
    title: '転倒リスク評価と予防指導',
    descriptionSummary: '薬・筋力・住環境・補助具まで、転びにくい工夫をまとめて提案します。',
    description:
      '転倒リスクの高い薬（降圧薬・睡眠薬など）の見直し、筋力・バランス評価、住環境改善の提言（手すり・段差・照明）、歩行器・杖の選択指導を行います。',
    icon: 'tabler:shield-check',
  },
  {
    title: '腰痛・神経障害性疼痛の薬物管理',
    descriptionSummary: '狭窄症・ヘルニアなどによる痛み・しびれに、飲み薬を訪問で調整します。',
    description:
      '脊柱管狭窄症・椎間板ヘルニアによる下肢しびれ・疼痛に対し、プレガバリン・デュロキセチン・NSAIDsなどを継続処方・調整。QOLの維持をサポートします。',
    icon: 'tabler:pill',
  },
  {
    title: '身体障害者手帳（肢体不自由）の診断書発行',
    descriptionSummary: '指定医が訪問の診察で診断書を作成。手続きの案内も行います。',
    description:
      '指定医が訪問診察の中で診断書を作成。手帳取得により医療費助成（マル障）・福祉サービス・税の減免が受けられます。申請手続きのご案内も行います。',
    icon: 'tabler:file-certificate',
  },
];

export default function SeikeigekaPage() {
  return (
    <>
      <JsonLd data={jsonLdBreadcrumb} />
      <JsonLd data={jsonLdFAQ} />
      {jsonLdConditions.map((c) => (
        <JsonLd key={c.name} data={c} />
      ))}
      <JsonLd data={jsonLdSpeakable} />

      <Hero
        tagline="整形外科 訪問診療｜大阪市"
        taglineClass={clinicalHeroTaglineClass}
        titleClass={clinicalHeroTitleClass}
        subtitleClass={clinicalHeroSubtitleClass}
        sectionPaddingClass={clinicalHeroSectionPadding}
        textBlockPaddingClass={clinicalHeroTextBlockPadding}
        actions={heroActions}
        title={
          <>
            膝・腰・骨折のお悩みを
            <br />
            <span className="text-primary dark:text-blue-300">ご自宅で</span>診ます
          </>
        }
        subtitle={
          <>
            <strong>関節注射・骨粗しょう症治療・骨折後フォロー</strong>をご自宅・施設で行います。
            <br className="hidden sm:inline" />
            身体障害者手帳（肢体不自由）の診断書発行にも対応しています。
            <br className="hidden sm:inline" />
            通院が難しくなっても、整形外科の治療を継続できます。
          </>
        }
      />

      <PageTocNav
        ariaLabel="このページの目次"
        items={[
          { href: '#taisho', label: '対象' },
          { href: '#diseases', label: '対応疾患' },
          { href: '#services', label: 'できること' },
          { href: '#fracture-prevention', label: '骨折予防' },
          { href: '#faq', label: 'よくある質問' },
        ]}
      />

      <section id="taisho" className="scroll-mt-32 py-14 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="mb-8 max-w-3xl mx-auto text-center">
            <p className="text-base font-bold uppercase tracking-wide text-primary">対象</p>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mt-2">こんな方にご利用いただいています</h2>
            <p className="mt-4 text-xl text-muted dark:text-slate-400">
              「整形外科には通えないけれど、治療は続けたい」というご希望にお応えします。
            </p>
          </div>
          <div className="grid sm:grid-cols-2 gap-3">
            {taishoItems.map(({ icon, text }) => {
              const Icon = resolveIcon(icon);
              return (
                <div
                  key={text}
                  className="bg-gray-50 dark:bg-slate-800 rounded-xl border border-gray-100 dark:border-slate-700 px-5 py-4 flex items-center gap-3"
                >
                  {Icon && <Icon className="w-6 h-6 text-primary shrink-0" />}
                  <p className="text-gray-800 dark:text-gray-200 text-base font-medium leading-snug">{text}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <Features
        id="diseases"
        scrollMarginClass={clinicalAnchorScrollMargin}
        tagline="対応疾患"
        title="整形外科訪問診療で対応できる主な疾患"
        subtitle="慢性疾患の継続管理から骨折後の在宅フォローまで、整形外科専門医が訪問します。"
        classes={{ headline: { ...clinicalSectionHeadline } }}
        items={diseaseItems}
      />

      <Features
        variant="cards"
        id="services"
        scrollMarginClass={clinicalAnchorScrollMargin}
        tagline="できること"
        title="訪問整形外科だからできる8つのこと"
        subtitle="訪問整形外科では「継続性」と「生活環境に即した対応」に取り組んでいます。"
        classes={{ headline: { ...clinicalSectionHeadline }, container: 'max-w-7xl mx-auto' }}
        columns={2}
        numberedTitles={true}
        items={servicesItems}
      />

      <Content
        id="fracture-prevention"
        scrollMarginClass={clinicalAnchorScrollMargin}
        tagline="骨折予防"
        title="骨粗しょう症治療と骨折リスク低減こそ、訪問整形外科の使命"
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
            title: '在宅患者の多くが骨粗しょう症を抱えている',
            description:
              '75歳以上の女性の約半数が骨粗しょう症といわれています。特に大腿骨頸部骨折は「寝たきりの入口」となるため、在宅での継続治療が極めて重要です。',
          },
          {
            title: '治療の継続により、骨折リスクの低減が期待できます',
            description:
              '通院が難しくなっても、骨粗しょう症治療薬の注射・内服を訪問で継続できます。一度骨折すると次の骨折リスクが高まることが知られており、退院後の早期から治療を再開・継続することが、在宅生活を続けるうえで重要です。具体的な薬剤・治療内容は<a href="#services" class="text-primary underline underline-offset-2 hover:text-secondary">「できること」をご覧ください</a>。',
          },
        ]}
        bg={<div className="absolute inset-0 bg-blue-50 dark:bg-transparent" />}
        content='<h3 class="text-2xl font-bold tracking-tight sm:text-3xl mb-2">骨折リスクを下げることが、在宅生活を守ること</h3>'
      />

      <FAQs
        id="faq"
        scrollMarginClass={clinicalAnchorScrollMargin}
        title="整形外科訪問診療に関するよくある質問"
        tagline="FAQ"
        classes={{ container: 'max-w-7xl', headline: { ...clinicalSectionHeadline } }}
        items={seikeigekaFaqWidgetItems}
      />

      <ClinicalPageClosing />
    </>
  );
}
