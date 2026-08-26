import type { Metadata } from 'next';

import { DoctorIntroCard } from '@/components/doctors/doctor-intro-card';
import { Content } from '@/components/widgets/content';
import { Features } from '@/components/widgets/features';
import { JsonLd } from '@/components/json-ld';
import { buildMetadata } from '@/lib/seo';
import { clinicalSectionHeadline } from '~/constants/clinical-page-ui';
import { KAMOME_BRANCH_COUNT } from '~/data/branches';
import { GROUP_STATS, STATS_PERIOD_NOTE } from '~/data/clinic-stats';
import { doctorIntroSections, naika } from '~/data/doctors-intro';

const naikaSection = doctorIntroSections[0];
const kinoshitaDoctor = naika[0];

export const metadata: Metadata = buildMetadata({
  title: '院長プロフィール・木下啓太｜かもめクリニック（大阪市）',
  ignoreTitleTemplate: true,
  description:
    'かもめクリニック院長・木下啓太のプロフィール。大阪市港区を拠点に2017年開院。内科・在宅医療専門。在支診1届出・精神科専門医常勤3名を含む体制を構築。訪問診療への想いをご紹介します。',
  path: '/about/kinoshita',
  ogImage: { url: 'https://kamome-clinic.net/images/company/kinoshita.jpg', width: 960, height: 1280 },
});

const jsonLdBreadcrumb = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'トップページ', item: 'https://kamome-clinic.net/' },
    { '@type': 'ListItem', position: 2, name: '院長プロフィール', item: 'https://kamome-clinic.net/about/kinoshita' },
  ],
};

const jsonLdPhysician = {
  '@context': 'https://schema.org',
  '@type': 'Physician',
  name: '木下 啓太',
  jobTitle: '院長・理事長',
  worksFor: {
    '@type': 'MedicalClinic',
    '@id': 'https://kamome-clinic.net/#clinic',
    name: 'かもめクリニック',
  },
  medicalSpecialty: 'https://schema.org/InternalMedicine',
  url: 'https://kamome-clinic.net/about/kinoshita',
  description:
    'かもめクリニック院長。2017年大阪市港区に開院。内科・在宅医療専門。機能強化型在宅療養支援診療所（在支診1）届出。',
  alumniOf: { '@type': 'CollegeOrUniversity', name: '大阪医科大学（現：大阪医科薬科大学）' },
};

export default function KinoshitaPage() {
  return (
    <>
      <JsonLd data={jsonLdBreadcrumb} />
      <JsonLd data={jsonLdPhysician} />

      <section className="relative md:-mt-[76px] not-prose">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          <div className="pt-0 md:pt-[76px] pointer-events-none" />
          <div className={`py-12 px-4 ${naikaSection.accentLight}`}>
            <div className="max-w-3xl mx-auto">
              <h1 className="text-center mb-8 md:mb-10 text-3xl md:text-4xl lg:text-[2.75rem] font-extrabold leading-tight tracking-tight font-heading text-primary dark:text-sky-300">
                院長プロフィール
              </h1>
              <DoctorIntroCard section={naikaSection} doc={kinoshitaDoctor} imageLoading="eager" />
            </div>
          </div>
        </div>
      </section>

      <Content
        tagline="院長メッセージ"
        title="訪問診療への想い"
        items={[
          {
            title: '「在宅で最期まで」を支える医療を',
            description:
              '病院での治療が一段落した後も、多くの方が住み慣れた自宅や施設に戻り、そこでの生活を続けたいと願っています。かもめクリニックはその願いに応えるため、24時間365日対応の訪問診療体制を構築してきました。',
          },
          {
            title: '精神科・小児科まで一体的に診る',
            description:
              '内科に加え、精神科専門医3名・小児科専門医が常勤することで、複合的な疾患を持つ患者さまも1つのクリニックで対応できる体制を整えています。',
          },
          {
            title: '地域に根ざした在宅医療グループへ',
            description:
              '2017年の本院開設以来、大阪市内に複数の拠点を展開し、約50施設・多くのご自宅への訪問診療を継続してきました。これからも地域の在宅医療を支え続けるクリニックグループでありたいと考えています。',
          },
        ]}
        bg={<div className="absolute inset-0 bg-white dark:bg-transparent" />}
      />

      <Features
        variant="cards"
        tagline="クリニックの実績"
        title="2017年の開院から積み上げた実績"
        classes={{ headline: { ...clinicalSectionHeadline }, container: 'max-w-7xl mx-auto' }}
        items={[
          {
            title: '2017年 大阪市港区に本院開設',
            description: '大阪市港区夕凪にかもめクリニック本院を開設。在宅療養支援診療所として地域の在宅医療をスタート。',
            icon: 'tabler:building-hospital',
          },
          {
            title: '在支診1（機能強化型）の施設基準届出',
            description:
              '機能強化型在宅療養支援診療所（在支診1）の施設基準を満たし届出。24時間対応・看取り実績など厳格な要件をクリア。',
            icon: 'tabler:certificate',
          },
          {
            title: '複数拠点への展開',
            description: `大阪市内に計${KAMOME_BRANCH_COUNT}の診療拠点を構え、西淀川区・住之江区をはじめ市内全域をカバー。`,
            icon: 'tabler:map-2',
          },
          {
            title: `年間看取り${GROUP_STATS.annualDeathCount}`,
            description: `グループ全体で年間${GROUP_STATS.annualDeathCount}の在宅看取りを実施（${STATS_PERIOD_NOTE}）。「最期まで住み慣れた場所で」という願いを支え続けています。`,
            icon: 'tabler:heart',
          },
          {
            title: '精神科医8名体制（専門医3名常勤）',
            description:
              '精神科専門医が常勤3名、非常勤を含め計8名の精神科医が在籍（精神保健指定医在籍）。うつ病・統合失調症・認知症など精神疾患を持つ患者さまの在宅医療にも専門対応。',
            icon: 'tabler:brain',
          },
          {
            title: '常勤医師13名・約50施設対応',
            description:
              '内科・精神科・小児科あわせて常勤医師13名。有料老人ホーム・グループホーム・特養など約50施設に対応。',
            icon: 'tabler:users',
          },
        ]}
        bg={<div className="absolute inset-0 bg-blue-50 dark:bg-transparent" />}
      />
    </>
  );
}
