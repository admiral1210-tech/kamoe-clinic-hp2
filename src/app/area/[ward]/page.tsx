import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { Hero } from '@/components/widgets/hero';
import { Features } from '@/components/widgets/features';
import { FAQs } from '@/components/widgets/faqs';
import { resolveIcon } from '@/components/ui/icon-map';
import { JsonLd } from '@/components/json-ld';
import { buildMetadata } from '@/lib/seo';
import { getBranchFoundingDate } from '~/data/clinic-meta';
import { KAMOME_BRANCHES, kamomeBranchTagSuffix } from '~/data/branches';
import { GROUP_STATS, STATS_PERIOD_NOTE } from '~/data/clinic-stats';
import {
  clinicalHeroSubtitleClass,
  clinicalHeroTaglineClass,
  clinicalHeroTitleClass,
} from '~/constants/clinical-page-ui';

type WardAccessSite = { label: string; detail: string; href: string };
type WardFaq = { title: string; description: string };

type WardProps = {
  name: string;
  name_kana: string;
  description: string;
  access?: string;
  tel: string;
  areas: string[];
  branchIndex?: number;
  accessSites?: WardAccessSite[];
  wardFaq: WardFaq;
};

const WARD_PROPS: Record<string, WardProps> = {
  'minato-ku': {
    name: '港区',
    name_kana: 'みなとく',
    description:
      '大阪市港区の訪問診療はかもめクリニック（本院）が担当。港区・弁天町・朝潮橋エリアのご自宅・施設へ医師が訪問します。',
    access: '本院：港区夕凪2丁目16-9 icrossAMポートビル4F-B',
    tel: '06-4301-7871',
    areas: ['港区全域', '弁天町', '朝潮橋', '磯路', '市岡', '波除', '福崎', '田中'],
    branchIndex: 0,
    wardFaq: {
      title: '弁天町・朝潮橋周辺から訪問診療を始めるにはどうすればよいですか？',
      description:
        '港区担当のかもめクリニック本院（港区夕凪2丁目16-9 icrossAMポートビル4F-B）へお電話（06-4301-7871）またはお問い合わせフォームでご連絡ください。弁天町・朝潮橋・磯路・市岡・波除・福崎・田中エリアのご自宅・老人ホーム・施設へ医師が定期訪問します。ご状況により異なりますが、目安として初回相談から最短1週間程度で訪問診療を開始できます。',
    },
  },
  'nishiyodogawa-ku': {
    name: '西淀川区',
    name_kana: 'にしよどがわく',
    description:
      '大阪市西淀川区の訪問診療はかもめクリニック第4院が担当。姫島・千舟・佃・大和田エリアのご自宅・施設へ医師が訪問します。',
    access: '第4院：西淀川区柏里1丁目16-15',
    tel: '06-7506-9565',
    areas: ['西淀川区全域', '姫島', '千舟', '佃', '大和田', '御幣島', '福町', '柏里'],
    branchIndex: 3,
    wardFaq: {
      title: '西淀川区（姫島・千舟・御幣島周辺）の担当院はどこですか？',
      description:
        '西淀川区担当のかもめクリニック第4院（西淀川区柏里1丁目16-15）が対応します。お電話（06-7506-9565）またはお問い合わせフォームでご相談ください。姫島・千舟・佃・大和田・御幣島・福町・柏里エリアのご自宅・グループホーム・特別養護老人ホームへの訪問診療実績があります。施設への新規導入もお気軽にご相談ください。',
    },
  },
  'suminoe-ku': {
    name: '住之江区',
    name_kana: 'すみのえく',
    description:
      '大阪市住之江区の訪問診療はかもめクリニック第5院が担当。北加賀屋・住之江公園・南港エリアのご自宅・施設へ医師が訪問します。',
    accessSites: [
      {
        label: '第5院',
        detail: '住之江区北加賀屋2-12-6',
        href: 'https://kamome-clinic5.net/',
      },
    ],
    tel: '06-4301-7871',
    areas: ['住之江区全域', '北加賀屋', '南港', '住之江公園', '千躰', '浜口', '粉浜'],
    branchIndex: 4,
    wardFaq: {
      title: '北加賀屋・南港・住之江公園周辺の担当院はどこですか？',
      description:
        '住之江区担当のかもめクリニック第5院（住之江区北加賀屋2-12-6）が対応します。北加賀屋・南港・住之江公園・千躰・浜口・粉浜エリアのご自宅・施設への訪問診療が可能です。お電話（06-4301-7871）またはかもめクリニック5のウェブサイト（kamome-clinic5.net）からご相談いただけます。',
    },
  },
  'taisho-ku': {
    name: '大正区',
    name_kana: 'たいしょうく',
    description:
      '大阪市大正区の訪問診療はかもめクリニックが対応。大正区全域のご自宅・施設へ医師が訪問します。まずはご相談ください。',
    access: '担当院：地域医療連携部（06-4301-7883）にご相談ください',
    tel: '06-4301-7883',
    areas: ['大正区全域', '泉尾', '三軒家', '南恩加島', '北恩加島', '平尾', '鶴町'],
    wardFaq: {
      title: '大正区（泉尾・三軒家・鶴町周辺）への訪問診療はどこに相談すればよいですか？',
      description:
        '大正区全域の担当院については地域医療連携部（06-4301-7883）がご案内します。泉尾・三軒家・南恩加島・北恩加島・平尾・鶴町エリアのご自宅・老人ホーム・グループホームへの訪問診療に対応しています。ご家族やケアマネジャーからのご相談も受け付けています。',
    },
  },
  'naniwa-ku': {
    name: '浪速区',
    name_kana: 'なにわく',
    description:
      '大阪市浪速区の訪問診療はかもめクリニックが対応。難波・恵美須・桜川エリアのご自宅・施設へ医師が訪問します。',
    access: '担当院：地域医療連携部（06-4301-7883）にご相談ください',
    tel: '06-4301-7883',
    areas: ['浪速区全域', '難波', '恵美須', '桜川', '幸町', '敷津'],
    wardFaq: {
      title: '難波・恵美須・桜川周辺のマンションや施設への訪問診療も対応できますか？',
      description:
        'はい、集合住宅（マンション・アパート）への訪問診療にも対応しています。浪速区担当については地域医療連携部（06-4301-7883）にてご案内します。難波・恵美須・桜川・幸町・敷津エリアのご自宅・施設・グループホームへの訪問実績があります。お気軽にご相談ください。',
    },
  },
  'sumiyoshi-ku': {
    name: '住吉区',
    name_kana: 'すみよしく',
    description:
      '大阪市住吉区の訪問診療はかもめクリニック第8院が担当。長居・我孫子・苅田・帝塚山エリアのご自宅・施設へ医師が訪問します。',
    accessSites: [
      {
        label: '第8院',
        detail: '住吉区千躰2-2-39 ホリビル3階',
        href: 'https://kamome-clinic7.net/',
      },
    ],
    access: '担当院：地域医療連携部（06-4301-7883）にご相談ください',
    tel: '06-4301-7883',
    areas: ['住吉区全域', '長居', '我孫子', '苅田', '帝塚山', '杉本', '遠里小野', '墨江'],
    branchIndex: 5,
    wardFaq: {
      title: '住吉区（長居・我孫子・苅田・帝塚山周辺）の担当院はどこですか？',
      description:
        '住吉区担当のかもめクリニック第8院（住吉区千躰2-2-39 ホリビル3階）が対応します。長居・我孫子・苅田・帝塚山・杉本・遠里小野・墨江エリアのご自宅・施設への訪問診療が可能です。お電話（06-4301-7883）またはかもめクリニック7のウェブサイト（kamome-clinic7.net）からご相談いただけます。',
    },
  },
  'higashisumiyoshi-ku': {
    name: '東住吉区',
    name_kana: 'ひがしすみよしく',
    description:
      '大阪市東住吉区の訪問診療はかもめクリニック第3院が担当。針中野・駒川・今川・矢田エリアのご自宅・施設へ医師が訪問します。',
    access: '担当院：地域医療連携部（06-4301-7883）にご相談ください',
    tel: '06-4301-7883',
    areas: ['東住吉区全域', '針中野', '駒川', '今川', '矢田', '湯里', '山坂', '鷹合'],
    branchIndex: 2,
    wardFaq: {
      title: '東住吉区（針中野・駒川・今川・矢田周辺）の担当院はどこですか？',
      description:
        '東住吉区担当のかもめクリニック第3院が対応します。針中野・駒川・今川・矢田・湯里・山坂・鷹合エリアのご自宅・老人ホーム・施設への訪問診療が可能です。詳しくは地域医療連携部（06-4301-7883）へお電話またはお問い合わせフォームでご連絡ください。ケアマネジャー様からのご紹介も歓迎しています。',
    },
  },
};

const WARD_TO_BRANCH_KEY: Record<string, Parameters<typeof getBranchFoundingDate>[0]> = {
  'minato-ku': 'main',
  'nishiyodogawa-ku': 'branch4',
  'suminoe-ku': 'branch5',
  'sumiyoshi-ku': 'branch8',
  'higashisumiyoshi-ku': 'branch3',
};

export function generateStaticParams() {
  return Object.keys(WARD_PROPS).map((ward) => ({ ward }));
}

type PageParams = { ward: string };

export async function generateMetadata({ params }: { params: Promise<PageParams> }): Promise<Metadata> {
  const { ward } = await params;
  const props = WARD_PROPS[ward];
  if (!props) return {};

  return buildMetadata({
    title: `${props.name}の訪問診療｜かもめクリニック（大阪市）`,
    description: props.description,
    ignoreTitleTemplate: true,
    path: `/area/${ward}`,
    ogImage: { url: 'https://kamome-clinic.net/images/top/slider02.jpg', width: 1400, height: 500 },
  });
}

export default async function WardPage({ params }: { params: Promise<PageParams> }) {
  const { ward } = await params;
  const props = WARD_PROPS[ward];
  if (!props) notFound();

  const { name, description, access, tel, areas, accessSites, branchIndex, wardFaq } = props;

  const branch = branchIndex !== undefined ? kamomeBranchTagSuffix(KAMOME_BRANCHES[branchIndex]) : '担当院';
  const branchFoundingDate = WARD_TO_BRANCH_KEY[ward] ? getBranchFoundingDate(WARD_TO_BRANCH_KEY[ward]) : undefined;

  const jsonLdBreadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'トップページ', item: 'https://kamome-clinic.net/' },
      {
        '@type': 'ListItem',
        position: 2,
        name: `大阪市${name}の訪問診療`,
        item: `https://kamome-clinic.net/area/${ward}`,
      },
    ],
  };

  const jsonLdClinic = {
    '@context': 'https://schema.org',
    '@type': 'MedicalClinic',
    name: `かもめクリニック（${name}担当）`,
    description,
    areaServed: { '@type': 'City', name: `大阪市${name}` },
    telephone: tel,
    ...(branchFoundingDate ? { foundingDate: branchFoundingDate } : {}),
    parentOrganization: {
      '@type': 'MedicalClinic',
      '@id': 'https://kamome-clinic.net/#clinic',
      name: 'かもめクリニック',
    },
  };

  const jsonLdFaq = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: `${name}の訪問診療の費用はいくらですか？`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `健康保険・介護保険が適用されます。月2〜3回の定期訪問で、3割負担の方の目安は月額1万円前後です。75歳以上の後期高齢者は1割・2割または3割負担でさらに軽減されます。生活保護の方は自己負担ゼロで受けられます。`,
        },
      },
      {
        '@type': 'Question',
        name: `${name}でかもめクリニックに相談するにはどうすればよいですか？`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `お電話（${tel}）またはお問い合わせフォームでご相談ください。受付は平日・祝日9:00〜17:00、お問い合わせフォームは24時間受付しています。患者さまご本人・ご家族・ケアマネジャー・医療機関の方、どなたでもご相談いただけます。`,
        },
      },
      {
        '@type': 'Question',
        name: `${name}の老人ホーム・グループホームにも訪問診療は可能ですか？`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `はい。有料老人ホーム・グループホーム・特別養護老人ホームなど施設への訪問診療も行っています。大阪市全域で約50施設の実績があります。施設への新規導入をご検討の場合は地域医療連携部（06-4301-7883）までご相談ください。`,
        },
      },
      {
        '@type': 'Question',
        name: `${name}で精神科・認知症の訪問診療も受けられますか？`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `はい。かもめクリニックは精神科専門医が3名常勤し、非常勤を含め計8名の精神科医が在籍し、精神保健指定医も在籍する訪問診療クリニックです。うつ病・統合失調症・認知症・BPSD（徘徊・暴言・妄想）など精神科疾患にも対応しています。内科と精神科を一体的に診療できます。`,
        },
      },
      {
        '@type': 'Question',
        name: '訪問診療を始めるにはどんな手続きが必要ですか？',
        acceptedAnswer: {
          '@type': 'Answer',
          text: `まずはお電話またはお問い合わせフォームでご連絡ください。ご状況をお聞きした上で、初回訪問の日程を調整します。紹介状がなくても始められます。入院中の方は退院前からのご相談も可能です。`,
        },
      },
      {
        '@type': 'Question',
        name: wardFaq.title,
        acceptedAnswer: {
          '@type': 'Answer',
          text: wardFaq.description,
        },
      },
    ],
  };

  return (
    <>
      <JsonLd data={jsonLdBreadcrumb} />
      <JsonLd data={jsonLdClinic} />
      <JsonLd data={jsonLdFaq} />

      <Hero
        tagline={`大阪市${name}の訪問診療`}
        taglineClass={clinicalHeroTaglineClass}
        titleClass={clinicalHeroTitleClass}
        subtitleClass={clinicalHeroSubtitleClass}
        title={
          <>
            大阪市<span className="text-accent dark:text-white highlight">{name}</span>の<br />
            訪問診療専門クリニック
          </>
        }
        subtitle={
          <>
            かもめクリニック{branch}が<strong>{name}全域</strong>を担当。<br className="hidden sm:inline" />
            内科・精神科・小児科に対応し、ご自宅・老人ホーム・グループホームへ医師が定期訪問します。
            <br className="hidden sm:inline" />
            <strong>在支診1届出・24時間365日対応。</strong>
          </>
        }
      />

      {/* 担当エリア */}
      <section className="py-12 bg-gray-50 dark:bg-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
              {name}の訪問診療対応エリア
            </h2>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              以下のエリアに対応しています。エリア外もお気軽にご相談ください。
            </p>
          </div>
          <div className="flex flex-wrap gap-3 justify-center">
            {areas.map((area) => {
              const MapPinIcon = resolveIcon('tabler:map-pin');
              return (
                <span
                  key={area}
                  className="bg-white dark:bg-slate-900 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 font-bold px-4 py-2 rounded-xl text-sm inline-flex items-center"
                >
                  {MapPinIcon && <MapPinIcon className="w-4 h-4 inline mr-1" />}
                  {area}
                </span>
              );
            })}
          </div>
          <div className="mt-6 bg-white dark:bg-slate-900 rounded-2xl p-5 border border-blue-100 dark:border-slate-700 text-center">
            <p className="text-sm text-gray-500 mb-1">担当拠点</p>
            {accessSites?.length ? (
              <div className="space-y-2">
                {accessSites.map((site) => {
                  const ExternalLinkIcon = resolveIcon('tabler:external-link');
                  return (
                    <p key={site.label} className="font-bold text-gray-800 dark:text-white">
                      <a
                        href={site.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline inline-flex items-center justify-center gap-1 flex-wrap"
                      >
                        {site.label}：{site.detail}
                        {ExternalLinkIcon && <ExternalLinkIcon className="w-4 h-4 shrink-0 opacity-80" />}
                      </a>
                    </p>
                  );
                })}
                {access ? (
                  <p className="text-sm font-normal text-gray-700 dark:text-gray-300 mt-2 leading-relaxed">
                    {access}
                  </p>
                ) : null}
              </div>
            ) : (
              <p className="font-bold text-gray-800 dark:text-white">{access}</p>
            )}
          </div>
        </div>
      </section>

      <Features
        variant="cards"
        tagline="かもめクリニックの特徴"
        title={`${name}でのかもめクリニックの特徴`}
        items={[
          {
            title: '在支診1（機能強化型）の施設基準届出',
            description:
              '機能強化型在宅療養支援診療所の施設基準を満たしています。24時間365日・看取り実績など厳しい基準をクリア。',
            icon: 'tabler:certificate',
          },
          {
            title: '内科・精神科・小児科に対応',
            description: '1つのクリニックで内科疾患も精神科疾患も小児科疾患も診療可能。複数の専門医が連携します。',
            icon: 'tabler:stethoscope',
          },
          {
            title: '精神科医8名体制（専門医3名常勤・精神保健指定医在籍）',
            description: '常勤3名の精神科専門医を含め計8名の精神科医が、認知症・うつ病・統合失調症など精神疾患を持つ患者さまの在宅医療に対応。',
            icon: 'tabler:brain',
          },
          {
            title: '24時間365日の緊急往診',
            description: '夜間・休日の急変時も担当医へ連絡できる体制。在支診1として365日対応を義務付けられています。',
            icon: 'tabler:clock-24',
          },
          {
            title: `年間看取り${GROUP_STATS.annualDeathCount}の実績`,
            description: `グループ全体で年間${GROUP_STATS.annualDeathCount}の在宅看取り実績（${STATS_PERIOD_NOTE}）。最期まで住み慣れた場所で過ごせるよう支えます。`,
            icon: 'tabler:heart',
          },
          {
            title: `${GROUP_STATS.facilityCount}への訪問診療実績`,
            description: `有料老人ホーム・グループホーム・特養など${name}を含む大阪市全域の${GROUP_STATS.facilityCount}に対応（${STATS_PERIOD_NOTE}）。`,
            icon: 'tabler:building-community',
          },
        ]}
        bg={<div className="absolute inset-0 bg-white dark:bg-transparent" />}
      />

      {/* よくある質問 */}
      <FAQs
        id="faq"
        tagline="FAQ"
        title={`${name}の訪問診療 よくあるご質問`}
        classes={{ container: 'max-w-6xl' }}
        items={[
          {
            title: `${name}の訪問診療の費用はいくらですか？`,
            description: `健康保険・介護保険が適用されます。月2〜3回の定期訪問で、3割負担の方の目安は月額1万円前後です。75歳以上の後期高齢者は1割・2割または3割負担でさらに軽減されます。生活保護の方は自己負担ゼロで受けられます。詳しくは費用・保険のページ（/cost）またはお電話でご確認ください。`,
          },
          {
            title: `${name}でかもめクリニックに相談するにはどうすればよいですか？`,
            description: `お電話（${tel}）またはお問い合わせフォームでご相談ください。受付は平日・祝日9:00〜17:00、お問い合わせフォームは24時間受付しています。患者さまご本人・ご家族・ケアマネジャー・医療機関の方、どなたでもご相談いただけます。`,
          },
          {
            title: `${name}の老人ホーム・グループホームにも訪問診療は可能ですか？`,
            description: `はい。有料老人ホーム・グループホーム・特別養護老人ホームなど施設への訪問診療も行っています。大阪市全域で約50施設の実績があります。施設への新規導入をご検討の場合は地域医療連携部（06-4301-7883）までご相談ください。`,
          },
          {
            title: `${name}で精神科・認知症の訪問診療も受けられますか？`,
            description: `はい。かもめクリニックは精神科専門医が3名常勤し、非常勤を含め計8名の精神科医が在籍し、精神保健指定医も在籍しています。うつ病・統合失調症・認知症・BPSD（徘徊・暴言・妄想）など精神科疾患にも対応しています。内科と精神科を一体的に診療できます。`,
          },
          {
            title: '訪問診療を始めるにはどんな手続きが必要ですか？',
            description: `まずはお電話またはお問い合わせフォームでご連絡ください。ご状況をお聞きした上で、初回訪問の日程を調整します。紹介状がなくても始められます。入院中の方は退院前からのご相談も可能です。ケアマネジャー様からのご連絡もお待ちしています。`,
          },
          {
            title: wardFaq.title,
            description: wardFaq.description,
          },
        ]}
      />
    </>
  );
}
