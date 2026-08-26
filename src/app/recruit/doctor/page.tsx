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
import { recruitJobPostingDoctorJsonLd } from '~/data/recruit';
import { doctorSpecialties, doctorWorkStyle, doctorOnboarding, doctorStaffMessage } from '~/data/recruit-doctor';

export const metadata: Metadata = buildMetadata({
  title: '医師 募集要項｜かもめクリニック（大阪市・訪問診療）',
  ignoreTitleTemplate: true,
  description:
    '医師（常勤）の詳細募集要項。内科・精神科・小児科の訪問診療医を募集。週4日・9:00〜17:00・オンコール最小化。大阪市内の在宅診療クリニックで働きませんか。',
  path: '/recruit/doctor',
  ogImage: { url: 'https://kamome-clinic.net/images/default.png', width: 1200, height: 628 },
});

const jobPostingLd = {
  ...recruitJobPostingDoctorJsonLd,
  url: 'https://kamome-clinic.net/recruit/doctor',
};

const breadcrumbLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'ホーム', item: 'https://kamome-clinic.net/' },
    { '@type': 'ListItem', position: 2, name: '採用情報', item: 'https://kamome-clinic.net/recruit' },
    { '@type': 'ListItem', position: 3, name: '医師募集要項', item: 'https://kamome-clinic.net/recruit/doctor' },
  ],
};

const doctorFulltimeDetails = {
  title: '【医師・常勤】詳細募集要項',
  keyFactsHeading: '募集条件の概要',
  keyFacts: [
    { label: '雇用形態', valueHtml: '常勤（週4日）' },
    { label: '給与', valueHtml: '経験・スキルに応じて応相談' },
    { label: '勤務時間', valueHtml: '9:00〜17:00（休憩1時間・実働7時間）' },
    { label: '休日', valueHtml: '固定曜日＋土日。当院のカレンダーに応じて最大9連休の長期休み複数回あり。' },
    { label: '必須資格', valueHtml: '医師免許（専門・経験年次不問）' },
    { label: '勤務先', valueHtml: 'かもめクリニック本院・各分院（大阪市内）' },
    { label: '選考', valueHtml: '書類選考 → 面接（1回） → 内定' },
  ],
  introHtml: [
    '外来・病棟とは異なり、<strong>患者さまの生活の場に赴く訪問診療</strong>。診察室では見えなかった患者さまの暮らしや人生観を知りながら、長期的な主治医として関わることができます。',
    '訪問診療未経験の医師を歓迎します。入職後は段階的なサポートで、無理なく現場に慣れていただける体制を整えています。',
  ],
  leftColumn: [
    { label: '雇用形態', valueHtml: '常勤（週4日・相談可）' },
    { label: '給与', valueHtml: '経験・スキルに応じて応相談' },
    { label: '試用期間', valueHtml: '3ヶ月（同条件）' },
    { label: '賞与', valueHtml: '年1〜2ヶ月分（業績連動）' },
    { label: '昇給・手当', valueHtml: 'ベースアップ加算・管理職手当あり' },
    { label: '待遇', valueHtml: '社会保険完備・交通費規定支給（月1万円まで）' },
  ],
  rightColumn: [
    { label: '勤務時間', valueHtml: '9:00〜17:00（休憩1時間・実働7時間）' },
    { label: '休日', valueHtml: '固定曜日＋土日。当院のカレンダーに応じて最大9連休の長期休み複数回あり。' },
    { label: 'オンコール', valueHtml: '平日 月2回程度・週末 2〜3ヶ月に1回程度' },
    { label: '必須資格', valueHtml: '医師免許<br />（専門・経験年次・訪問診療経験 不問）' },
    { label: '勤務先', valueHtml: 'かもめクリニック本院・各分院（大阪市内）' },
    { label: '選考', valueHtml: '書類選考 → 面接（1回） → 内定' },
  ],
  desiredProfile: {
    heading: '求める人物像',
    items: [
      '医師免許をお持ちの方',
      '患者さまと長期的な信頼関係を築くことに関心がある方',
      '多職種と協力して在宅医療を届けたい方',
      '訪問診療未経験の方も丁寧に指導します。専門・経験年次は問いません。',
    ],
    emphasizedLast: true,
  },
};

export default function RecruitDoctorPage() {
  const PhoneIcon = resolveIcon('tabler:phone');
  const FileTextIcon = resolveIcon('tabler:file-text');
  const QuoteIcon = resolveIcon('tabler:quote');
  const StethoscopeIcon = resolveIcon('tabler:stethoscope');

  return (
    <>
      <JsonLd data={jobPostingLd} />
      <JsonLd data={breadcrumbLd} />

      <Hero
        tagline="医師（常勤）募集"
        taglineClass={clinicalHeroTaglineClass}
        titleClass={clinicalHeroTitleClass}
        subtitleClass={`${clinicalHeroSubtitleClass} !mb-0`}
        sectionPaddingClass="pt-6 md:pt-10"
        title={
          <>
            あなたの専門性を、
            <br />
            <span className="text-accent highlight">患者さまの自宅で</span>発揮しませんか
          </>
        }
        subtitle={
          <>
            内科・精神科・小児科の訪問診療医として、大阪市内の患者さまを長期的に支えます。
            <br className="hidden sm:inline" />
            週4日・9:00〜17:00・オンコール最小化。
          </>
        }
        actions={[
          { variant: 'primary', href: CLINIC_CONTACT.telHref, text: '電話で応募・相談する', icon: 'tabler:phone' },
          { variant: 'secondary', href: '/recruit', text: '採用情報トップへ戻る', icon: 'tabler:arrow-left' },
        ]}
      />

      {/* 担当診療科目 */}
      <RecruitSection id="specialties" className="py-section-y bg-white">
        <div className="max-w-7xl mx-auto px-section-x">
          <div className="text-center mb-10 max-w-3xl mx-auto">
            <p className="text-xs font-semibold text-primary tracking-widest uppercase mb-1">Specialties</p>
            <h2 className="text-2xl md:text-3xl font-bold text-heading">担当する診療科目</h2>
            <p className="mt-3 text-sm md:text-base text-muted leading-relaxed">
              内科・精神科・小児科の<strong className="text-heading">3科が連携する訪問診療チーム</strong>
              。いずれかの専門を活かしながら、幅広い症例に携わることができます。
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {doctorSpecialties.map((item) => {
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

      {/* 働き方の魅力 */}
      <RecruitSection id="work-style" className="py-section-y">
        <div className="max-w-7xl mx-auto px-section-x">
          <div className="text-center mb-10 max-w-3xl mx-auto">
            <p className="text-xs font-semibold text-primary tracking-widest uppercase mb-1">Work Style</p>
            <h2 className="text-2xl md:text-3xl font-bold text-heading">働き方の魅力</h2>
            <p className="mt-3 text-sm md:text-base text-muted leading-relaxed">
              医師のライフスタイルを守りながら、質の高い在宅医療を届けられる環境を整えています。
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {doctorWorkStyle.map((item) => {
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
      <RecruitSection id="onboarding" className="py-section-y bg-white">
        <div className="max-w-3xl mx-auto px-section-x">
          <div className="text-center mb-10">
            <p className="text-xs font-semibold text-primary tracking-widest uppercase mb-1">Onboarding</p>
            <h2 className="text-2xl md:text-3xl font-bold text-heading">入職後サポート体制</h2>
            <p className="mt-3 text-sm md:text-base text-muted leading-relaxed">
              訪問診療が初めてでも安心。段階的なサポートで現場に慣れていただけます。
            </p>
          </div>
          <ol className="space-y-5" aria-label="入職後のサポートステップ">
            {doctorOnboarding.map((item) => (
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
              <h3 className="text-white font-bold text-base sm:text-lg m-0">{doctorFulltimeDetails.title}</h3>
            </div>

            <div className="p-5 sm:p-6">
              <section
                className="mb-6 rounded-xl border border-primary/25 bg-gradient-to-b from-primary/[0.07] to-transparent px-4 py-4"
                aria-labelledby="doctor-keyfacts-heading"
              >
                <h4 id="doctor-keyfacts-heading" className="text-xs font-bold text-primary tracking-wide uppercase mb-3">
                  {doctorFulltimeDetails.keyFactsHeading}
                </h4>
                <dl className="grid grid-cols-1 gap-2.5 text-sm sm:grid-cols-2 sm:gap-3">
                  {doctorFulltimeDetails.keyFacts.map((row) => (
                    <div key={row.label} className="rounded-lg border border-gray-200/90 bg-white/95 px-3 py-2.5 shadow-sm">
                      <dt className="mb-1 text-[0.7rem] font-semibold text-muted sm:text-xs">{row.label}</dt>
                      <dd className="font-medium leading-snug text-heading" dangerouslySetInnerHTML={{ __html: row.valueHtml }} />
                    </div>
                  ))}
                </dl>
              </section>

              {doctorFulltimeDetails.introHtml.map((html) => (
                <p key={html} className="text-sm text-default mb-4 last:mb-0 leading-relaxed" dangerouslySetInnerHTML={{ __html: html }} />
              ))}

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 text-sm mt-6">
                <div className="space-y-3 min-w-0">
                  {doctorFulltimeDetails.leftColumn.map((row, i) => (
                    <div
                      key={row.label}
                      className={`flex gap-3 items-start min-w-0 ${
                        i < doctorFulltimeDetails.leftColumn.length - 1 ? 'border-b border-gray-100 pb-3' : ''
                      }`}
                    >
                      <span className="font-semibold text-muted w-24 shrink-0">{row.label}</span>
                      <span className="min-w-0 flex-1 text-default" dangerouslySetInnerHTML={{ __html: row.valueHtml }} />
                    </div>
                  ))}
                </div>
                <div className="space-y-3 min-w-0">
                  {doctorFulltimeDetails.rightColumn.map((row, i) => (
                    <div
                      key={row.label}
                      className={`flex gap-3 items-start min-w-0 ${
                        i < doctorFulltimeDetails.rightColumn.length - 1 ? 'border-b border-gray-100 pb-3' : ''
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
                <p className="text-sm font-semibold text-primary mb-2">{doctorFulltimeDetails.desiredProfile.heading}</p>
                <ul className="text-sm text-default space-y-1">
                  {doctorFulltimeDetails.desiredProfile.items.map((text, idx) => {
                    const isLast = idx === doctorFulltimeDetails.desiredProfile.items.length - 1;
                    const emphasized = doctorFulltimeDetails.desiredProfile.emphasizedLast && isLast;
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

      {/* 在籍医師からのメッセージ（※ 患者の声ではなくスタッフの声のため医療法上掲載可） */}
      <RecruitSection id="staff-voice" className="py-section-y bg-white">
        <div className="max-w-3xl mx-auto px-section-x">
          <div className="text-center mb-10">
            <p className="text-xs font-semibold text-primary tracking-widest uppercase mb-1">Staff Voice</p>
            <h2 className="text-2xl md:text-3xl font-bold text-heading">在籍医師からのメッセージ</h2>
          </div>
          <figure className="rounded-card border border-primary/25 bg-primary/5 p-6 sm:p-8">
            <blockquote>
              {QuoteIcon && <QuoteIcon className="w-8 h-8 text-primary/30 mb-3" aria-hidden="true" />}
              <p className="text-base text-default leading-relaxed italic">{doctorStaffMessage.message}</p>
            </blockquote>
            <figcaption className="mt-5 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/20">
                {StethoscopeIcon && <StethoscopeIcon className="w-5 h-5 text-primary" aria-hidden="true" />}
              </div>
              <div>
                <p className="text-sm font-bold text-heading">{doctorStaffMessage.name}</p>
                <p className="text-xs text-muted">{doctorStaffMessage.role}</p>
              </div>
            </figcaption>
          </figure>
        </div>
      </RecruitSection>

      {/* 応募CTA */}
      <RecruitSection id="apply" className="py-section-y bg-primary">
        <div className="max-w-3xl mx-auto px-section-x text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">一緒に訪問診療を届けませんか</h2>
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
        </div>
      </RecruitSection>
    </>
  );
}
