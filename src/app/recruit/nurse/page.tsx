import type { Metadata } from 'next';

import { Hero } from '@/components/widgets/hero';
import { resolveIcon } from '@/components/ui/icon-map';
import { RecruitSection } from '@/components/recruit/recruit-section';
import { JsonLd } from '@/components/json-ld';
import { buildMetadata } from '@/lib/seo';
import {
  clinicalHeroSubtitleClass,
  clinicalHeroTaglineClass,
  clinicalHeroTitleClass,
} from '~/constants/clinical-page-ui';
import { CLINIC_CONTACT } from '~/data/clinic-contact';
import { recruitNurseFulltime, recruitJobPostingNurseJsonLd } from '~/data/recruit';
import { nurseJobDetails, nurseDailyFlow, nurseWorkStyle, nurseOnboarding, nurseStaffMessage } from '~/data/recruit-nurse';

export const metadata: Metadata = buildMetadata({
  title: '看護師 募集要項｜かもめクリニック（大阪市・訪問診療）',
  ignoreTitleTemplate: true,
  description:
    '診療同行看護師（正社員）の詳細募集要項。月給30〜35万円・土日休み・残業ほぼなし。大阪市内の在宅診療クリニックで働きませんか。',
  path: '/recruit/nurse',
  ogImage: { url: 'https://kamome-clinic.net/images/default.png', width: 1200, height: 628 },
});

const nf = recruitNurseFulltime;

const jobPostingLd = {
  ...recruitJobPostingNurseJsonLd,
  url: 'https://kamome-clinic.net/recruit/nurse',
  baseSalary: {
    '@type': 'MonetaryAmount',
    currency: 'JPY',
    value: {
      '@type': 'QuantitativeValue',
      minValue: 300000,
      maxValue: 350000,
      unitText: 'MONTH',
    },
  },
};

const breadcrumbLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'ホーム', item: 'https://kamome-clinic.net/' },
    { '@type': 'ListItem', position: 2, name: '採用情報', item: 'https://kamome-clinic.net/recruit' },
    { '@type': 'ListItem', position: 3, name: '看護師募集要項', item: 'https://kamome-clinic.net/recruit/nurse' },
  ],
};

export default function RecruitNursePage() {
  const PhoneIcon = resolveIcon('tabler:phone');
  const FileTextIcon = resolveIcon('tabler:file-text');
  const QuoteIcon = resolveIcon('tabler:quote');
  const UserIcon = resolveIcon('tabler:user');

  return (
    <>
      <JsonLd data={jobPostingLd} />
      <JsonLd data={breadcrumbLd} />

      <Hero
        tagline="看護師（正社員）募集"
        taglineClass={clinicalHeroTaglineClass}
        titleClass={clinicalHeroTitleClass}
        subtitleClass={`${clinicalHeroSubtitleClass} !mb-0`}
        sectionPaddingClass="pt-6 md:pt-10"
        title={
          <>
            あなたの看護を、
            <br />
            <span className="text-accent highlight">患者さまの自宅で</span>発揮しませんか
          </>
        }
        subtitle={
          <>
            診療同行看護師として、医師とペアで大阪市内を巡回します。
            <br className="hidden sm:inline" />
            残業ほぼなし・土日休み・月給30〜35万円。
          </>
        }
        actions={[
          { variant: 'primary', href: CLINIC_CONTACT.telHref, text: '電話で応募・相談する', icon: 'tabler:phone' },
          { variant: 'secondary', href: '/recruit', text: '採用情報トップへ戻る', icon: 'tabler:arrow-left' },
        ]}
      />

      {/* 仕事内容（3つの柱） */}
      <RecruitSection id="job-details" className="py-section-y bg-white">
        <div className="max-w-7xl mx-auto px-section-x">
          <div className="text-center mb-10 max-w-3xl mx-auto">
            <p className="text-xs font-semibold text-primary tracking-widest uppercase mb-1">Job Details</p>
            <h2 className="text-2xl md:text-3xl font-bold text-heading">仕事内容 — 3つの柱</h2>
            <p className="mt-3 text-sm md:text-base text-muted leading-relaxed">
              「訪問看護」ではありません。
              <strong className="text-heading">常に医師とともに行動する「診療同行看護師」</strong>
              として、患者さまの生活を支えます。
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {nurseJobDetails.map((item) => {
              const Icon = resolveIcon(item.icon);
              return (
                <div
                  key={item.number}
                  className={`rounded-card border overflow-hidden flex flex-col ${
                    item.highlight ? 'border-primary/40 shadow-md' : 'border-gray-200 shadow-sm'
                  }`}
                >
                  <div
                    className={`px-5 py-4 flex items-center gap-3 ${item.highlight ? 'bg-primary' : 'bg-primary/10'}`}
                  >
                    <span
                      className={`text-2xl font-black tracking-tighter ${
                        item.highlight ? 'text-white/60' : 'text-primary/40'
                      }`}
                    >
                      {item.number}
                    </span>
                    {Icon && (
                      <Icon
                        className={`w-6 h-6 shrink-0 ${item.highlight ? 'text-white' : 'text-primary'}`}
                        aria-hidden="true"
                      />
                    )}
                    <h3
                      className={`font-bold text-sm leading-snug m-0 ${
                        item.highlight ? 'text-white' : 'text-heading'
                      }`}
                    >
                      {item.title}
                    </h3>
                  </div>
                  <div className="p-5 flex-1 bg-white">
                    <p className="text-sm text-default leading-relaxed">{item.body}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </RecruitSection>

      {/* 1日の流れ */}
      <RecruitSection id="daily-flow" className="py-section-y">
        <div className="max-w-3xl mx-auto px-section-x">
          <div className="text-center mb-10">
            <p className="text-xs font-semibold text-primary tracking-widest uppercase mb-1">Daily Flow</p>
            <h2 className="text-2xl md:text-3xl font-bold text-heading">1日の流れ</h2>
            <p className="mt-3 text-sm md:text-base text-muted leading-relaxed">
              規則正しいスケジュールで、プライベートとの両立が可能です。
            </p>
          </div>
          <ol className="relative border-l-2 border-primary/25 pl-8 space-y-8" aria-label="1日の業務タイムライン">
            {nurseDailyFlow.map((item, idx) => (
              <li key={item.time} className="relative">
                <span
                  className="absolute -left-[2.35rem] top-0.5 flex h-7 w-7 items-center justify-center rounded-full bg-primary text-white text-xs font-bold"
                  aria-hidden="true"
                >
                  {idx + 1}
                </span>
                <div className="flex items-baseline gap-3">
                  <time className="shrink-0 text-sm font-bold text-primary tabular-nums" dateTime={item.time}>
                    {item.time}
                  </time>
                  <h3 className="text-base font-bold text-heading m-0">{item.label}</h3>
                </div>
                <p className="mt-1 text-sm text-muted leading-relaxed">{item.desc}</p>
              </li>
            ))}
          </ol>
        </div>
      </RecruitSection>

      {/* 働き方の魅力 */}
      <RecruitSection id="work-style" className="py-section-y bg-white">
        <div className="max-w-7xl mx-auto px-section-x">
          <div className="text-center mb-10 max-w-3xl mx-auto">
            <p className="text-xs font-semibold text-primary tracking-widest uppercase mb-1">Work Style</p>
            <h2 className="text-2xl md:text-3xl font-bold text-heading">働き方の魅力</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {nurseWorkStyle.map((item) => {
              const Icon = resolveIcon(item.icon);
              return (
                <div
                  key={item.title}
                  className="rounded-card border border-gray-200 bg-primary/5 p-6 flex flex-col items-center text-center shadow-sm"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 mb-4">
                    {Icon && <Icon className="w-7 h-7 text-primary" aria-hidden="true" />}
                  </div>
                  <h3 className="text-base font-bold text-heading mb-2">{item.title}</h3>
                  <p className="text-sm text-muted leading-relaxed">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </RecruitSection>

      {/* 入職後サポート体制 */}
      <RecruitSection id="onboarding" className="py-section-y">
        <div className="max-w-3xl mx-auto px-section-x">
          <div className="text-center mb-10">
            <p className="text-xs font-semibold text-primary tracking-widest uppercase mb-1">Onboarding</p>
            <h2 className="text-2xl md:text-3xl font-bold text-heading">入職後サポート体制</h2>
            <p className="mt-3 text-sm md:text-base text-muted leading-relaxed">
              訪問診療が初めてでも安心。丁寧なサポートで現場に慣れていただけます。
            </p>
          </div>
          <ol className="space-y-5" aria-label="入職後のサポートステップ">
            {nurseOnboarding.map((item) => (
              <li key={item.step} className="flex gap-4 items-start rounded-card border border-gray-200 bg-white p-5 shadow-sm">
                <span
                  className="shrink-0 flex h-9 w-9 items-center justify-center rounded-full bg-primary text-white text-sm font-bold"
                  aria-label={`ステップ ${item.step}`}
                >
                  {item.step}
                </span>
                <div>
                  <h3 className="text-base font-bold text-heading mb-1">{item.title}</h3>
                  <p className="text-sm text-muted leading-relaxed">{item.desc}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </RecruitSection>

      {/* スタッフからのメッセージ（※ 患者の声ではなくスタッフの声のため医療法上掲載可） */}
      <RecruitSection id="staff-voice" className="py-section-y bg-white">
        <div className="max-w-3xl mx-auto px-section-x">
          <div className="text-center mb-10">
            <p className="text-xs font-semibold text-primary tracking-widest uppercase mb-1">Staff Voice</p>
            <h2 className="text-2xl md:text-3xl font-bold text-heading">スタッフからのメッセージ</h2>
          </div>
          <figure className="rounded-card border border-primary/25 bg-primary/5 p-6 sm:p-8">
            <blockquote>
              {QuoteIcon && <QuoteIcon className="w-8 h-8 text-primary/30 mb-3" aria-hidden="true" />}
              <p className="text-base text-default leading-relaxed italic">{nurseStaffMessage.message}</p>
            </blockquote>
            <figcaption className="mt-5 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/20">
                {UserIcon && <UserIcon className="w-5 h-5 text-primary" aria-hidden="true" />}
              </div>
              <div>
                <p className="text-sm font-bold text-heading">{nurseStaffMessage.name}</p>
                <p className="text-xs text-muted">{nurseStaffMessage.role}</p>
              </div>
            </figcaption>
          </figure>
        </div>
      </RecruitSection>

      {/* 詳細募集要項 */}
      <RecruitSection id="requirements" className="py-section-y">
        <div className="max-w-4xl mx-auto px-section-x">
          <div className="text-center mb-10">
            <p className="text-xs font-semibold text-primary tracking-widest uppercase mb-1">Requirements</p>
            <h2 className="text-2xl md:text-3xl font-bold text-heading">詳細募集要項</h2>
          </div>

          <div className="rounded-card border-2 border-primary/40 overflow-hidden bg-white shadow-sm">
            <div className="bg-primary px-5 py-4 flex items-center gap-3">
              {FileTextIcon && <FileTextIcon className="w-6 h-6 text-white shrink-0" aria-hidden="true" />}
              <h3 className="text-white font-bold text-base sm:text-lg m-0">{nf.title}</h3>
            </div>

            <div className="p-5 sm:p-6">
              <section
                className="mb-6 rounded-xl border border-primary/25 bg-gradient-to-b from-primary/[0.07] to-transparent px-4 py-4"
                aria-labelledby="nurse-keyfacts-heading"
              >
                <h4 id="nurse-keyfacts-heading" className="text-xs font-bold text-primary tracking-wide uppercase mb-3">
                  {nf.keyFactsHeading}
                </h4>
                <dl className="grid grid-cols-1 gap-2.5 text-sm sm:grid-cols-2 sm:gap-3">
                  {nf.keyFacts.map((row) => (
                    <div key={row.label} className="rounded-lg border border-gray-200/90 bg-white/95 px-3 py-2.5 shadow-sm">
                      <dt className="mb-1 text-[0.7rem] font-semibold text-muted sm:text-xs">{row.label}</dt>
                      <dd className="font-medium leading-snug text-heading" dangerouslySetInnerHTML={{ __html: row.valueHtml }} />
                    </div>
                  ))}
                </dl>
              </section>

              {nf.introHtml.map((html) => (
                <p key={html} className="text-sm text-default mb-4 last:mb-0 leading-relaxed" dangerouslySetInnerHTML={{ __html: html }} />
              ))}

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 text-sm mt-6">
                <div className="space-y-3 min-w-0">
                  {nf.leftColumn.map((row, i) => (
                    <div
                      key={row.label}
                      className={`flex gap-3 items-start min-w-0 ${
                        i < nf.leftColumn.length - 1 ? 'border-b border-gray-100 pb-3' : ''
                      }`}
                    >
                      <span className="font-semibold text-muted w-24 shrink-0">{row.label}</span>
                      <span className="min-w-0 flex-1 text-default" dangerouslySetInnerHTML={{ __html: row.valueHtml }} />
                    </div>
                  ))}
                </div>
                <div className="space-y-3 min-w-0">
                  {nf.rightColumn.map((row, i) => (
                    <div
                      key={row.label}
                      className={`flex gap-3 items-start min-w-0 ${
                        i < nf.rightColumn.length - 1 ? 'border-b border-gray-100 pb-3' : ''
                      }`}
                    >
                      <span className="font-semibold text-muted w-24 shrink-0">{row.label}</span>
                      <span className="min-w-0 flex-1 text-default" dangerouslySetInnerHTML={{ __html: row.valueHtml }} />
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 rounded-xl border border-gray-200 bg-gray-50 p-4 text-sm space-y-1.5">
                <p className="font-semibold text-heading">勤務先</p>
                <p className="text-default">医療法人かもめ会 かもめクリニック</p>
                <p className="text-muted">
                  {CLINIC_CONTACT.postalCode} {CLINIC_CONTACT.addressLine1} {CLINIC_CONTACT.addressLine2}
                </p>
                <p className="text-muted">最寄駅：大阪市営地下鉄中央線 朝潮橋駅から徒歩3分</p>
              </div>

              <div className="mt-6 bg-blue-50 rounded-xl p-4">
                <p className="text-sm font-semibold text-primary mb-2">{nf.desiredProfile.heading}</p>
                <ul className="text-sm text-default space-y-1">
                  {nf.desiredProfile.items.map((text, idx) => {
                    const isLast = idx === nf.desiredProfile.items.length - 1;
                    const emphasized = nf.desiredProfile.emphasizedLast && isLast;
                    return (
                      <li key={text} className={emphasized ? 'text-primary font-medium' : ''}>
                        ・{text}
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </RecruitSection>

      {/* 応募CTA */}
      <RecruitSection id="apply" className="py-section-y bg-primary">
        <div className="max-w-3xl mx-auto px-section-x text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">一緒に訪問診療を支えませんか</h2>
          <p className="text-white/85 text-sm md:text-base leading-relaxed mb-8">
            ご質問・応募書類の送付はお気軽にどうぞ。
            <br />
            受付：{CLINIC_CONTACT.hoursPrimary}
            {'　'}
            TEL：{CLINIC_CONTACT.telDisplay}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={CLINIC_CONTACT.telHref}
              className="inline-flex items-center justify-center gap-2 rounded-pill bg-white text-primary font-bold px-7 py-3.5 text-base hover:bg-white/90 transition-colors focus-visible:ring-2 focus-visible:ring-white"
            >
              {PhoneIcon && <PhoneIcon className="w-5 h-5 shrink-0" aria-hidden="true" />}
              {CLINIC_CONTACT.telDisplay}
            </a>
          </div>

          <div className="mt-8 rounded-card bg-white/10 p-5 text-sm text-white/85 text-left space-y-1">
            <p className="font-semibold text-white mb-2">応募書類のご案内</p>
            <p>・履歴書（写真貼付）</p>
            <p>・職務経歴書（お持ちの場合）</p>
            <p className="text-white/65 text-xs mt-2">
              ※ お電話いただいた後、郵送またはメールにてお送りください。書類到着後1週間以内に結果をご連絡します。
            </p>
          </div>
        </div>
      </RecruitSection>
    </>
  );
}
