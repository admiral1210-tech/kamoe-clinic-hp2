import Image from 'next/image';
import type { Metadata } from 'next';

import { Hero } from '@/components/widgets/hero';
import { Features } from '@/components/widgets/features';
import { FaqAccordionList } from '@/components/ui/faq-accordion-list';
import { PageTocNav } from '@/components/ui/page-toc-nav';
import { JsonLd } from '@/components/json-ld';
import { resolveIcon } from '@/components/ui/icon-map';
import { buildMetadata } from '@/lib/seo';
import { ctaHeroPrimaryClass, ctaHeroSecondaryClass } from '~/constants/clinical-page-ui';
import { KAMOME_BRANCHES, KAMOME_BRANCH_COUNT, type KamomeBranch } from '~/data/branches';
import {
  buildAggregateRating,
  buildNumberOfEmployees,
  getBranchFoundingDate,
  googleReview,
} from '~/data/clinic-meta';
import { GROUP_STATS } from '~/data/clinic-stats';
import { CLINIC_GENERAL_FAQ, CLINIC_GENERAL_FAQ_PREVIEW_COUNT } from '~/data/faq-general';
import { CLINIC_CONTACT, clinicPostalAddressJsonLd } from '~/data/clinic-contact';

const INSTAGRAM_QR_IMAGE_SRC = '/images/instagram_qr_kamome.png';

const HERO_HOME_TOP_IMAGE = { src: '/images/hero-home-top.jpg', width: 1024, height: 365 };

export const metadata: Metadata = buildMetadata({
  title:
    'かもめクリニック｜大阪市の訪問診療 内科・精神科・小児科｜2017年開院',
  ignoreTitleTemplate: true,
  description: `大阪市の機能強化型在宅療養支援診療所（在支診1）届出。2017年開院。グループ患者数${GROUP_STATS.patientCount}（2025年12月時点）・${GROUP_STATS.locationCount}。精神科医（常勤・非常勤含め${GROUP_STATS.psychiatristCount}名・専門医${GROUP_STATS.psychiatristFulltimeCount}名常勤）在籍。内科・精神科・小児科対応。夜間・休日の緊急往診も対応。健康保険・介護保険適用。`,
  ogImage: { url: HERO_HOME_TOP_IMAGE.src, width: HERO_HOME_TOP_IMAGE.width, height: HERO_HOME_TOP_IMAGE.height },
});

const instagramUrl = 'https://www.instagram.com/kamomeclinic/';

// ===== JSON-LD: 組織情報（機能強化型在支診1・foundingDate） =====
const jsonLdClinic = {
  '@context': 'https://schema.org',
  '@id': 'https://kamome-clinic.net/#clinic',
  '@type': ['MedicalClinic', 'LocalBusiness'],
  name: 'かもめクリニック',
  alternateName: 'Kamome Clinic',
  url: 'https://kamome-clinic.net',
  logo: 'https://kamome-clinic.net/images/common/header/logo.png',
  image: `https://kamome-clinic.net${HERO_HOME_TOP_IMAGE.src}`,
  foundingDate: '2017',
  description: `大阪市の機能強化型在宅療養支援診療所（在支診1）届出。精神科医（常勤・非常勤含め${GROUP_STATS.psychiatristCount}名・専門医${GROUP_STATS.psychiatristFulltimeCount}名常勤）在籍。内科・精神科・小児科対応。グループ患者数${GROUP_STATS.patientCount}（2025年12月時点）・${GROUP_STATS.locationCount}。グループ年間看取り${GROUP_STATS.annualDeathCount}（2025年実績）。`,
  telephone: CLINIC_CONTACT.telDisplay,
  faxNumber: '06-4301-7872',
  address: clinicPostalAddressJsonLd(),
  geo: { '@type': 'GeoCoordinates', latitude: 34.6623, longitude: 135.4474 },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '17:00',
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      opens: '00:00',
      closes: '23:59',
      description: '緊急往診（24時間365日対応）',
    },
  ],
  medicalSpecialty: [
    'https://schema.org/InternalMedicine',
    'https://schema.org/Psychiatry',
    'https://schema.org/Pediatrics',
  ],
  availableService: [
    { '@type': 'MedicalTherapy', name: '訪問診療（月2回定期）' },
    { '@type': 'MedicalTherapy', name: '24時間緊急往診' },
    { '@type': 'MedicalTherapy', name: '精神科訪問診療（精神科医8名体制・専門医3名常勤・精神保健指定医在籍）' },
    { '@type': 'MedicalTherapy', name: '医療ケア児訪問診療・NICU退院後支援' },
    { '@type': 'MedicalTherapy', name: '機能強化型在宅療養支援診療所（在支診1）の施設基準届出による夜間・休日の緊急往診対応' },
    { '@type': 'MedicalTherapy', name: `在宅看取り・ターミナルケア（グループ年間${GROUP_STATS.annualDeathCount}実績）` },
  ],
  contactPoint: [
    {
      '@type': 'ContactPoint',
      telephone: CLINIC_CONTACT.telDisplay,
      contactType: 'customer service',
      availableLanguage: 'Japanese',
      hoursAvailable: {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '17:00',
      },
    },
    {
      '@type': 'ContactPoint',
      telephone: '06-4301-7883',
      contactType: 'customer service',
      name: '地域医療連携部（医療・介護関係者専用）',
      availableLanguage: 'Japanese',
      hoursAvailable: {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '17:00',
      },
    },
  ],
  identifier: [
    { '@type': 'PropertyValue', propertyID: '保険医療機関コード', value: '0402898' },
    { '@type': 'PropertyValue', propertyID: '介護サービス事業者番号', value: '2710402898' },
  ],
  hasCredential: [
    {
      '@type': 'EducationalOccupationalCredential',
      credentialCategory: '施設基準',
      name: '機能強化型在宅療養支援診療所（在支診1）',
      recognizedBy: { '@type': 'GovernmentOrganization', name: '厚生労働省' },
    },
    {
      '@type': 'EducationalOccupationalCredential',
      credentialCategory: '施設基準',
      name: '在宅医療充実体制加算',
      recognizedBy: { '@type': 'GovernmentOrganization', name: '厚生労働省' },
    },
  ],
  numberOfEmployees: buildNumberOfEmployees(),
  ...(buildAggregateRating() ? { aggregateRating: buildAggregateRating() } : {}),
  sameAs: [
    'https://www.instagram.com/kamomeclinic/',
    'https://kamome-clinic.net',
    'https://kamome-clinic5.net/',
    'https://kamome-clinic7.net/',
  ],
  hasMap:
    'https://maps.google.com/maps?q=%E5%A4%A7%E9%98%AA%E5%B8%82%E6%B8%AF%E5%8C%BA%E5%A4%95%E5%87%AA2%E4%B8%81%E7%9B%AE16-9',
  privacyPolicy: 'https://kamome-clinic.net/privacy',
  priceRange: '保険適用（自己負担1〜3割）',
  areaServed: [
    '大阪市港区',
    '大阪市西淀川区',
    '大阪市住之江区',
    '大阪市西区',
    '大阪市大正区',
    '大阪市浪速区',
    '大阪市此花区',
    '大阪市淀川区',
    '大阪市北区',
    '大阪市都島区',
    '大阪市福島区',
    '大阪市中央区',
    '大阪市天王寺区',
    '大阪市阿倍野区',
    '大阪市東住吉区',
    '大阪市平野区',
    '大阪市住吉区',
    '大阪市東成区',
    '大阪市生野区',
    '大阪市旭区',
    '大阪市城東区',
    '大阪市鶴見区',
    '大阪市東淀川区',
    '大阪市西成区',
  ],
};

// ===== JSON-LD: 各支院（データは branches.ts から生成） =====
function stripPostalPrefix(addr: string): string {
  return addr.replace(/^〒[\d-]+\s*/, '');
}

function branchStreetForSchema(b: KamomeBranch): string {
  const a = b.address.trim();
  if (/^〒/.test(a) || a.includes('大阪市')) {
    return stripPostalPrefix(a);
  }
  return `${b.area}${b.address}`;
}

function telToSchemaOrg(jp: string): string {
  return '+81-' + jp.replace(/^0/, '');
}

const jsonLdBranches = KAMOME_BRANCHES.filter((b) => b.schemaBranchKey !== null).map((b) => {
  const key = b.schemaBranchKey!;
  const foundingDate = getBranchFoundingDate(key);
  return {
    '@context': 'https://schema.org',
    '@id': `https://kamome-clinic.net/#${key}`,
    '@type': 'MedicalClinic',
    name: b.name,
    parentOrganization: {
      '@type': 'MedicalClinic',
      '@id': 'https://kamome-clinic.net/#clinic',
      name: 'かもめクリニック',
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: branchStreetForSchema(b),
      addressLocality: b.area,
      addressRegion: '大阪府',
      addressCountry: 'JP',
    },
    telephone: telToSchemaOrg(b.tel),
    ...(b.fax ? { faxNumber: telToSchemaOrg(b.fax) } : {}),
    ...(foundingDate ? { foundingDate } : {}),
  };
});

// ===== JSON-LD: 医師情報（Physician） =====
const jsonLdPhysicians = [
  {
    name: '木下 啓太',
    jobTitle: '院長',
    spec: ['https://schema.org/InternalMedicine'],
    cert: '日本内科学会認定医・腎臓学会専門医・透析医学会専門医',
    slug: 'kinoshita',
  },
  {
    name: '石本 英之',
    jobTitle: '精神科専門医',
    spec: ['https://schema.org/Psychiatry'],
    cert: '精神保健指定医・医学博士・日本神経精神学会専門医',
    slug: 'ishimoto',
  },
  {
    name: '菅近 優',
    jobTitle: '精神科専門医・指導医',
    spec: ['https://schema.org/Psychiatry'],
    cert: '精神保健指定医・医学博士・指導医',
    slug: 'kanchika',
  },
  { name: '西田 宜代', jobTitle: '精神科専門医', spec: ['https://schema.org/Psychiatry'], cert: '精神保健指定医', slug: 'nishida' },
  { name: '河内 要', jobTitle: '第4院院長', spec: ['https://schema.org/Pediatrics'], cert: '小児科専門医（主な専門領域：新生児・循環器）', slug: 'kawachi' },
].map((d) => ({
  '@context': 'https://schema.org',
  '@type': 'Physician',
  name: d.name,
  jobTitle: d.jobTitle,
  medicalSpecialty: d.spec,
  description: d.cert,
  worksFor: { '@type': 'MedicalClinic', '@id': 'https://kamome-clinic.net/#clinic', name: 'かもめクリニック' },
  url: d.slug === 'kinoshita' ? 'https://kamome-clinic.net/about/kinoshita' : 'https://kamome-clinic.net/doctors',
}));

// ===== JSON-LD: WebSite =====
const jsonLdWebSite = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': 'https://kamome-clinic.net/#website',
  name: 'かもめクリニック',
  url: 'https://kamome-clinic.net',
  publisher: { '@type': 'MedicalClinic', '@id': 'https://kamome-clinic.net/#clinic' },
};

// ===== JSON-LD: BreadcrumbList =====
const jsonLdBreadcrumb = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [{ '@type': 'ListItem', position: 1, name: 'ホーム', item: 'https://kamome-clinic.net/' }],
};

// ===== JSON-LD: Speakable（音声検索対応） =====
const jsonLdSpeakable = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': 'https://kamome-clinic.net/',
  name: 'かもめクリニック 訪問診療',
  datePublished: '2017-04-01',
  dateModified: '2026-03-30',
  speakable: {
    '@type': 'SpeakableSpecification',
    cssSelector: ['#about-houmon', '#features', '#faq-preview'],
  },
  url: 'https://kamome-clinic.net',
};

const DEPARTMENTS = [
  {
    icon: 'tabler:stethoscope',
    title: '内科',
    desc: '慢性疾患の管理・処置・緩和ケア',
    href: '/naika',
  },
  {
    icon: 'tabler:brain',
    title: '精神科',
    desc: '精神科医8名体制（専門医3名常勤・精神保健指定医在籍）',
    href: '/seishinika',
  },
  {
    icon: 'tabler:baby-carriage',
    title: '小児科',
    desc: '医療ケア児の診療・NICU退院後支援',
    href: '/shoninka',
  },
  {
    icon: 'tabler:bone',
    title: '整形外科',
    desc: '関節注射・骨粗しょう症・骨折後ケア',
    href: '/seikeigeka',
  },
];

export default function HomePage() {
  const PhoneIcon = resolveIcon('tabler:phone');
  const MailIcon = resolveIcon('tabler:mail');
  const HomeHeartIcon = resolveIcon('tabler:home-heart');
  const ChevronDownIcon = resolveIcon('tabler:chevron-down');
  const ArrowRightIcon = resolveIcon('tabler:arrow-right');
  const BuildingHospitalIcon = resolveIcon('tabler:building-hospital');
  const ExternalLinkIcon = resolveIcon('tabler:external-link');
  const NewsIcon = resolveIcon('tabler:news');
  const MessagesIcon = resolveIcon('tabler:messages');
  const StarFilledIcon = resolveIcon('tabler:star-filled');

  return (
    <>
      <JsonLd data={jsonLdClinic} />
      {jsonLdBranches.map((b) => (
        <JsonLd key={b['@id']} data={b} />
      ))}
      {jsonLdPhysicians.map((p) => (
        <JsonLd key={p.url + p.name} data={p} />
      ))}
      <JsonLd data={jsonLdSpeakable} />
      <JsonLd data={jsonLdWebSite} />
      <JsonLd data={jsonLdBreadcrumb} />

      {/* ============================================================ Hero（画像先行・パノラマ／実績は常時表示） ================================================================ */}
      <Hero
        imageFirst
        imageContainerClass="max-w-6xl"
        titleClass="text-3xl md:text-4xl lg:text-[2.5rem] font-bold leading-snug tracking-tight mb-3 font-heading text-heading"
        tagline="大阪市の訪問診療｜24h体制"
        title={
          <>
            ご自宅・施設へ
            <br />
            <span className="text-primary">訪問診療</span>で支えます
          </>
        }
        image={
          <div className="w-full aspect-[4/3] md:aspect-[1024/365] overflow-hidden rounded-2xl shadow-lg ring-1 ring-black/5">
            <Image
              src={HERO_HOME_TOP_IMAGE.src}
              alt="かもめクリニックのスタッフ"
              width={HERO_HOME_TOP_IMAGE.width}
              height={HERO_HOME_TOP_IMAGE.height}
              className="h-full w-full object-cover object-[50%_42%] max-sm:object-[50%_40%]"
              priority
              fetchPriority="high"
            />
          </div>
        }
        actions={
          <>
            <a href="tel:0643017871" className={`${ctaHeroPrimaryClass} min-h-[44px]`}>
              {PhoneIcon && <PhoneIcon className="w-5 h-5" aria-hidden="true" />}
              お電話でのご相談
            </a>
            <a href="/renkei#renkei-contact-detail" className={`${ctaHeroSecondaryClass} min-h-[44px]`}>
              {MailIcon && <MailIcon className="w-5 h-5" aria-hidden="true" />}
              フォームで相談
            </a>
          </>
        }
        content={
          <div className="not-prose mt-5 mx-auto max-w-lg rounded-2xl border border-gray-200 bg-white/80 px-4 py-3 text-left">
            <p className="text-center text-sm font-semibold text-gray-700">グループ実績（2025年1〜12月）</p>
            <div className="mt-4 space-y-4 border-t border-gray-100 pt-4">
              <dl className="grid grid-cols-3 gap-2 rounded-xl border border-gray-200 bg-gray-50/80 px-2 py-3 text-center">
                <div>
                  <dt className="text-xs text-muted">年間診察件数</dt>
                  <dd className="text-base font-black text-heading tabular-nums">{GROUP_STATS.annualVisitCount}</dd>
                </div>
                <div>
                  <dt className="text-xs text-muted">年間患者数</dt>
                  <dd className="text-base font-black text-heading tabular-nums">{GROUP_STATS.patientCount}</dd>
                </div>
                <div>
                  <dt className="text-xs text-muted">年間看取り件数</dt>
                  <dd className="text-base font-black text-heading tabular-nums">{GROUP_STATS.annualDeathCount}</dd>
                </div>
              </dl>
              <p className="text-center text-sm text-default">厚生労働省 機能強化型在宅療養支援診療所（在支診1）施設基準届出</p>
              <p className="-mt-2 text-center text-xs text-muted">※2025年1〜12月グループ全体の集計値</p>
              {googleReview.ratingValue !== null && googleReview.reviewCount !== null && (
                <div className="flex justify-center">
                  <div className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-gray-50 px-4 py-2">
                    <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" aria-hidden="true">
                      <path
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        fill="#4285F4"
                      />
                      <path
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        fill="#34A853"
                      />
                      <path
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                        fill="#FBBC05"
                      />
                      <path
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        fill="#EA4335"
                      />
                    </svg>
                    <div className="text-left">
                      <p className="flex flex-wrap items-center gap-1 text-sm font-black text-heading">
                        <span>{googleReview.ratingValue}</span>
                        <span className="flex items-center gap-0.5" aria-label={`評価 ${googleReview.ratingValue} / 5`}>
                          {StarFilledIcon &&
                            Array.from({ length: Math.min(5, Math.round(googleReview.ratingValue ?? 0)) }).map((_, i) => (
                              <StarFilledIcon key={i} className="h-3.5 w-3.5 text-amber-400" />
                            ))}
                        </span>
                      </p>
                      <p className="text-sm text-gray-500">Googleレビュー {googleReview.reviewCount}件</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        }
      />

      <PageTocNav
        ariaLabel="このページの目次"
        items={[
          { href: '#about-houmon', label: '訪問診療とは' },
          { href: '#features', label: '当院の特徴' },
          { href: '#departments', label: '診療内容' },
          { href: '#trust', label: '信頼情報' },
          { href: '#faq', label: 'よくある質問' },
          { href: '/renkei', label: 'ご相談' },
        ]}
      />

      {/* 訪問診療とは（圧縮版・AEO定義維持） */}
      <section id="about-houmon" className="scroll-mt-32 bg-page py-5 md:py-7">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
            <div className="flex items-start gap-3">
              {HomeHeartIcon && <HomeHeartIcon className="mt-0.5 w-6 h-6 shrink-0 text-primary" aria-hidden="true" />}
              <div className="min-w-0 flex-1">
                <h2 className="mb-1 text-xl font-bold text-heading">訪問診療とは</h2>
                <p className="text-sm leading-relaxed text-gray-700">
                  <strong>訪問診療</strong>とは、医師がご自宅・施設へ定期的に伺い、診察・処方・検査を行う医療です。<strong>健康保険・介護保険が適用</strong>されます。
                </p>
                <details className="mt-2">
                  <summary className="flex min-h-[44px] list-none cursor-pointer items-center gap-1 px-1 text-xs font-semibold text-gray-700 hover:underline">
                    {ChevronDownIcon && <ChevronDownIcon className="w-3.5 h-3.5" />} 往診との違いを見る
                  </summary>
                  <p className="mt-2 text-xs leading-relaxed text-gray-700">
                    往診は急変時の臨時訪問ですが、訪問診療は計画的な定期訪問です。当院は定期訪問に加え、<strong>24時間365日の緊急往診</strong>にも対応しています。
                  </p>
                </details>
              </div>
              <a
                href="/houmon-shinryo"
                className="inline-flex min-h-[44px] shrink-0 items-center gap-1 whitespace-nowrap px-2 text-sm font-bold text-gray-700 underline hover:text-heading"
              >
                詳しく {ArrowRightIcon && <ArrowRightIcon className="w-3.5 h-3.5" />}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ 4つの特徴 ================================================================ */}
      <Features
        id="features"
        scrollMarginClass="scroll-mt-32"
        tagline="当院の特徴"
        title="かもめクリニックの4つの特徴"
        subtitle="2017年に開院しました。大阪市の下町に根ざし、患者さまお一人おひとりの暮らしに寄り添い続けています。"
        columns={1}
        classes={{
          container: 'pb-4 md:pb-6 lg:pb-8',
          items: {
            panel: 'w-full max-w-none rounded-2xl border border-gray-100 bg-white p-5 shadow-sm gap-4',
            title: 'text-base md:text-lg font-bold',
            description: 'text-sm text-gray-700 mt-2 leading-relaxed',
            icon: 'text-gray-700 bg-primary/10 rounded-full w-11 h-11 p-2.5 shrink-0 mr-0 md:mr-0 md:w-11 md:h-11 md:p-2.5',
          },
        }}
        items={[
          {
            title: '月2回の定期訪問診療',
            description:
              '医師が計画的にご自宅へ伺い、診察・処方・血液検査などを実施します。病状の変化を早めに捉え、悪化を防ぐ診療を心がけています。',
            icon: 'tabler:home-heart',
          },
          {
            title: '24時間365日の緊急往診',
            description:
              '厚生労働省が定める在宅医療の高い水準を満たす診療所として、夜間・休日を問わず急変時にも迅速に対応します。',
            icon: 'tabler:clock-24',
          },
          {
            title: '精神科医8名体制（専門医3名常勤・精神保健指定医在籍）',
            description: '精神科専門医が3名常勤し、非常勤を含め計8名の精神科医が在籍しています。精神保健指定医も在籍しています。うつ病・統合失調症・認知症・依存症にも専門的に対応します。',
            icon: 'tabler:brain',
          },
          {
            title: `大阪市内${KAMOME_BRANCH_COUNT}拠点で市内全域対応`,
            description: `港区・西淀川区・住之江区など、市内${KAMOME_BRANCH_COUNT}院体制で広く対応します。担当エリアの確認は、地域医療連携部（06-4301-7883）が一括でお受けします。`,
            icon: 'tabler:map-pin',
          },
        ]}
      />

      {/* 医療・介護関係者 ── フルブリードバンド */}
      <div className="not-prose bg-primary">
        <div className="mx-auto flex max-w-5xl flex-col gap-4 px-4 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/15">
              {BuildingHospitalIcon && <BuildingHospitalIcon className="w-5 h-5 text-white" aria-hidden="true" />}
            </div>
            <div>
              <p className="mb-0.5 text-xs font-semibold uppercase tracking-widest text-white/90">ご家族・医療・介護関係者の方へ</p>
              <p className="text-base font-bold leading-snug text-white">紹介の流れ・連携相談書・オンライン相談は専用ページへ</p>
            </div>
          </div>
          <a
            href="/renkei"
            className="inline-flex min-h-[48px] w-full shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-xl bg-white px-6 py-2.5 text-sm font-bold text-primary shadow-sm transition-colors hover:bg-blue-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-primary sm:w-auto"
          >
            紹介・連携専用ページへ
            {ArrowRightIcon && <ArrowRightIcon className="w-4 h-4 shrink-0" aria-hidden="true" />}
          </a>
        </div>
      </div>

      {/* ============================================================ 診療内容 ================================================================ */}
      <section id="departments" className="scroll-mt-32 py-8 md:py-14">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <div className="mb-8 text-center">
            <p className="mb-1 text-sm font-semibold tracking-widest text-gray-700">診療メニュー</p>
            <h2 className="text-2xl font-bold text-heading md:text-3xl">診療内容</h2>
          </div>
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {DEPARTMENTS.map(({ icon, title, desc, href }) => {
              const DeptIcon = resolveIcon(icon);
              return (
                <div
                  key={title}
                  className={`flex flex-col gap-3 rounded-2xl border border-gray-100 bg-white p-6 ${href ? 'hover:shadow-md transition-shadow' : ''}`}
                >
                  {DeptIcon && <DeptIcon className="w-9 h-9 text-primary" />}
                  <div>
                    <h3 className="mb-1 text-lg font-bold text-heading">{title}</h3>
                    <p className="text-sm text-gray-700">{desc}</p>
                  </div>
                  {href && (
                    <a
                      href={href}
                      className="mt-auto inline-flex min-h-[44px] items-center gap-1 px-2 text-sm font-bold text-gray-700 underline hover:text-heading"
                    >
                      詳しく見る {ArrowRightIcon && <ArrowRightIcon className="w-4 h-4" />}
                    </a>
                  )}
                </div>
              );
            })}
          </div>
          {/* 医師紹介（診療内容セクション末尾に統合） */}
          <div className="mt-5 flex flex-col gap-3 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <Image
                src="https://kamome-clinic.net/images/company/kinoshita.jpg"
                alt="木下 啓太 院長"
                width={44}
                height={44}
                className="h-11 w-11 shrink-0 rounded-full object-cover"
                style={{ objectPosition: 'center 15%' }}
              />
              <div>
                <p className="text-sm font-bold text-heading">木下 啓太 院長ほか、常勤医師13名</p>
                <p className="text-sm text-gray-700">内科・精神科・小児科の医師が連携。非常勤医師10名も参加しています。</p>
              </div>
            </div>
            <a
              href="/doctors"
              className="inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-full border-2 border-primary px-4 py-2 text-sm font-bold text-primary transition-colors hover:bg-blue-50"
            >
              医師紹介を見る {ArrowRightIcon && <ArrowRightIcon className="w-4 h-4" />}
            </a>
          </div>
        </div>
      </section>

      {/* 信頼情報・SNS・お知らせ（バッジ1種・縦積み） */}
      <section id="trust" className="not-prose scroll-mt-32 bg-white py-6 md:py-8" aria-label="信頼情報・SNS・お知らせ">
        <div className="mx-auto max-w-5xl space-y-5 px-4 sm:px-6">
          <div>
            <h2 className="mb-1 text-center text-xl font-bold text-heading">信頼情報</h2>
            <p className="mb-3 text-center text-xs text-gray-500">メディア掲載・施設基準・実績・教育活動</p>
            <div className="flex flex-col gap-3">
              <a
                href="https://www.kamome-clinic.net/blog/?p=157"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex w-full items-start gap-3 rounded-xl border border-gray-200 bg-white px-4 py-3 transition-shadow hover:shadow-sm"
                aria-label="毎日新聞掲載記事を読む"
              >
                <div className="min-w-[3.5rem] shrink-0 rounded-md border border-gray-300 bg-gray-50 px-2 py-1.5 text-center">
                  <span className="block text-sm font-bold leading-tight text-heading">メディア</span>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-bold text-heading transition-colors group-hover:text-primary">毎日新聞：院長インタビュー掲載</p>
                  <p className="mt-0.5 text-sm text-gray-700">在宅医療の現場と訪問診療の実態がテーマです。</p>
                </div>
                {ExternalLinkIcon && <ExternalLinkIcon className="mt-0.5 w-3.5 h-3.5 shrink-0 text-gray-500" aria-hidden="true" />}
              </a>
              <div className="flex w-full items-start gap-3 rounded-xl border border-gray-200 bg-white px-4 py-3">
                <div className="min-w-[3.5rem] shrink-0 rounded-md border border-gray-300 bg-gray-50 px-2 py-1.5 text-center">
                  <span className="block text-sm font-bold leading-tight text-heading">届出</span>
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-bold text-heading">機能強化型在宅療養支援診療所（在支診1）</p>
                  <p className="mt-0.5 text-sm text-gray-700">厚生労働省 施設基準届出。2017年開院以来、在支診1として在宅医療を担っています。</p>
                </div>
              </div>
              <div className="flex w-full items-start gap-3 rounded-xl border border-gray-200 bg-white px-4 py-3">
                <div className="min-w-[3.5rem] shrink-0 rounded-md border border-gray-300 bg-gray-50 px-2 py-1.5 text-center">
                  <span className="block text-sm font-bold leading-tight text-heading">認定</span>
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-bold text-heading">在宅医療充実体制加算 算定医療機関</p>
                  <p className="mt-0.5 text-sm text-gray-700">令和8年度診療報酬改定で新設された、重症・終末期の患者さまへの質の高い在宅医療を評価する仕組みです。算定には厳格な施設基準を満たす必要があります。</p>
                </div>
              </div>
              <div className="flex w-full items-start gap-3 rounded-xl border border-gray-200 bg-white px-4 py-3">
                <div className="min-w-[3.5rem] shrink-0 rounded-md border border-gray-300 bg-gray-50 px-2 py-1.5 text-center">
                  <span className="block text-sm font-bold leading-tight text-heading">実績</span>
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-bold text-heading">
                    グループ患者数 {GROUP_STATS.patientCount}（2025年12月時点）・{GROUP_STATS.locationCount}
                  </p>
                  <p className="mt-0.5 text-sm text-gray-700">
                    グループ年間看取り数 {GROUP_STATS.annualDeathCount}・常勤医師{GROUP_STATS.doctorCountFulltime}名（2025年実績）。
                  </p>
                </div>
              </div>
              <div className="flex w-full items-start gap-3 rounded-xl border border-gray-200 bg-white px-4 py-3">
                <div className="min-w-[3.5rem] shrink-0 rounded-md border border-gray-300 bg-gray-50 px-2 py-1.5 text-center">
                  <span className="block text-sm font-bold leading-tight text-heading">教育</span>
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-bold text-heading">医療関係者の受け入れ・在宅診療の教育</p>
                  <p className="mt-0.5 text-sm text-gray-700">在宅診療に関心のある学生・医師を毎年複数名受け入れ、在宅診療の教育と普及に取り組んでいます。</p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4 rounded-2xl border border-gray-200 bg-gray-50/50 p-4">
            <div>
              <p className="mb-2 text-xs font-semibold text-gray-500">お知らせ</p>
              <a href="/blog" className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:underline" aria-label="お知らせ・ブログを読む">
                {NewsIcon && <NewsIcon className="w-4 h-4 shrink-0" aria-hidden="true" />}
                院長コラム・お知らせを見る
                {ArrowRightIcon && <ArrowRightIcon className="w-4 h-4 shrink-0" aria-hidden="true" />}
              </a>
            </div>
            <div className="border-t border-gray-200 pt-4">
              <p className="mb-3 text-xs font-semibold text-gray-500">SNS</p>
              <div className="flex flex-row items-center gap-4 rounded-xl border border-gray-200 bg-transparent px-4 py-3">
                <div className="min-w-0 flex-1 space-y-1.5">
                  <p className="text-sm leading-relaxed text-gray-700">
                    かもめクリニックは日常を
                    <a
                      href={instagramUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-semibold text-primary hover:underline"
                      aria-label="Instagram @kamomeclinic を開く"
                    >
                      Instagram
                    </a>
                    で公開しています。
                  </p>
                  <p className="text-sm leading-relaxed text-gray-700">よかったらお友達登録お願いします。</p>
                </div>
                <a
                  href={instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 rounded-xl transition-opacity hover:opacity-90 active:opacity-80 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                  aria-label="Instagram @kamomeclinic を開く（QRコード）"
                >
                  <Image
                    src={INSTAGRAM_QR_IMAGE_SRC}
                    alt=""
                    width={240}
                    height={276}
                    className="max-h-36 w-auto rounded-lg bg-transparent object-contain"
                    loading="lazy"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* よくある質問（プレビュー・FAQPage は /faq） */}
      <section id="faq" className="scroll-mt-32 bg-page py-8 md:py-10">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <div id="faq-preview" className="mb-6 text-center">
            <p className="mb-1 text-sm font-semibold tracking-widest text-gray-700">Q&amp;A</p>
            <h2 className="text-2xl font-bold text-heading md:text-3xl">よくあるご質問</h2>
            <p className="mt-2 text-sm leading-relaxed text-gray-700">代表的な質問を掲載しています。すべてのQ&amp;Aは専用ページをご覧ください。</p>
          </div>
          <FaqAccordionList
            items={CLINIC_GENERAL_FAQ.slice(0, CLINIC_GENERAL_FAQ_PREVIEW_COUNT).map(({ q, answerHtml }) => ({
              title: q,
              description: answerHtml,
            }))}
          />
          <div className="mt-5 text-center">
            <a href="/faq" className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-bold text-white hover:opacity-90">
              {MessagesIcon && <MessagesIcon className="w-5 h-5" />} よくあるご質問をすべて見る
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
