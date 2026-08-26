import type { Metadata } from 'next';

import { Hero } from '@/components/widgets/hero';
import { Features } from '@/components/widgets/features';
import { Content } from '@/components/widgets/content';
import { Steps } from '@/components/widgets/steps';
import { FAQs } from '@/components/widgets/faqs';
import { CallToAction } from '@/components/widgets/call-to-action';
import { RecruitSection } from '@/components/recruit/recruit-section';
import { RecruitPositions } from '@/components/recruit/recruit-positions';
import { JsonLd } from '@/components/json-ld';
import type { Item as WidgetItem } from '@/components/ui/item-grid';
import { buildMetadata } from '@/lib/seo';
import {
  clinicalHeroSubtitleClass,
  clinicalHeroTaglineClass,
  clinicalHeroTitleClass,
  clinicalSectionHeadline,
} from '~/constants/clinical-page-ui';
import { KAMOME_BRANCH_COUNT } from '~/data/branches';
import { CLINIC_CONTACT } from '~/data/clinic-contact';
import {
  recruitBenefitsItems,
  recruitFaqItems,
  recruitFinalCtaActions,
  recruitFlowItems,
  recruitJobPostingNurseJsonLd,
  recruitWhyFeaturesItems,
} from '~/data/recruit';

export const metadata: Metadata = buildMetadata({
  title: '従業員募集｜かもめクリニック（大阪市・訪問診療）',
  ignoreTitleTemplate: true,
  description:
    'かもめクリニックでは訪問診療を一緒に支えてくれる仲間を募集しています。医師・看護師・事務スタッフなど各職種を随時募集。大阪市港区を拠点に複数院展開中。',
  path: '/recruit',
  ogImage: { url: 'https://kamome-clinic.net/images/default.png', width: 1200, height: 628 },
});

const jobPostingLd = {
  ...recruitJobPostingNurseJsonLd,
  url: 'https://kamome-clinic.net/recruit#nurse-fulltime',
};

const asWidgetItems = (items: unknown) => items as WidgetItem[];

export default function RecruitPage() {
  return (
    <>
      <JsonLd data={jobPostingLd} />

      <Hero
        tagline="採用情報"
        taglineClass={clinicalHeroTaglineClass}
        titleClass={clinicalHeroTitleClass}
        subtitleClass={`${clinicalHeroSubtitleClass} !mb-0`}
        sectionPaddingClass="pt-6 md:pt-10"
        title={
          <>
            「お家に帰りたい」という
            <br />
            <span className="text-accent dark:text-white highlight">想いを支える</span>
            <br />
            仕事をしませんか
          </>
        }
        subtitle={
          <>
            かもめクリニックは大阪市内{KAMOME_BRANCH_COUNT}院を展開する訪問診療専門クリニックです。
            <br className="hidden sm:inline" />
            患者さまが住み慣れた場所で暮らし続けられるよう、医療で支える仲間を募集しています。
          </>
        }
      />

      <Features
        variant="cards"
        id="why"
        tagline="働く環境"
        title="かもめクリニックで働く魅力"
        subtitle="訪問診療だからこそ生まれる、患者さまとの深い関わり。専門性を高めながら長く活躍できる環境があります。"
        classes={{
          headline: { ...clinicalSectionHeadline },
          container: '!pt-5 md:!pt-8 lg:!pt-10',
        }}
        items={asWidgetItems(recruitWhyFeaturesItems)}
      />

      <RecruitSection id="positions" className="py-16">
        <RecruitPositions />
      </RecruitSection>

      <Content
        id="benefits"
        tagline="福利厚生・待遇"
        title="安心して長く働ける環境を整えています"
        isReversed
        items={asWidgetItems(recruitBenefitsItems)}
        content="スタッフが長く活躍できる職場<br />訪問診療の現場で成長しながら、患者さまの生活を支え続けられる環境をつくっています。"
      />

      <Steps
        id="flow"
        title="応募の流れ"
        subtitle="まずはお気軽にご連絡ください。選考は面接1回のみ、スムーズに進めます。"
        items={asWidgetItems(recruitFlowItems)}
      />

      <FAQs
        id="faq"
        title="採用に関するよくある質問"
        subtitle="応募前にご確認ください。その他のご質問はお気軽にお問い合わせください。"
        tagline="FAQ"
        classes={{ container: 'max-w-7xl', headline: { ...clinicalSectionHeadline } }}
        items={asWidgetItems(recruitFaqItems)}
      />

      <CallToAction
        id="apply"
        title="一緒に訪問診療を支えませんか"
        subtitle={`ご質問・応募書類の送付はお気軽にどうぞ。<br />受付：${CLINIC_CONTACT.hoursPrimary} | TEL：${CLINIC_CONTACT.telDisplay}`}
        actions={recruitFinalCtaActions.map((action) => ({ text: action.text, href: String(action.href) }))}
      />
    </>
  );
}
