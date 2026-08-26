import type { Metadata } from 'next';

import { Hero } from '@/components/widgets/hero';
import { DoctorIntroCard } from '@/components/doctors/doctor-intro-card';
import { resolveIcon } from '@/components/ui/icon-map';
import { buildMetadata } from '@/lib/seo';
import {
  clinicalHeroSubtitleClass,
  clinicalHeroTaglineClass,
  clinicalHeroTitleClass,
} from '~/constants/clinical-page-ui';
import { KAMOME_BRANCH_COUNT } from '~/data/branches';
import { doctorIntroSections as sections } from '~/data/doctors-intro';

export const metadata: Metadata = buildMetadata({
  title: '医師紹介｜かもめクリニック（大阪市）',
  ignoreTitleTemplate: true,
  description:
    'かもめクリニックの医師紹介ページ。内科・精神科・小児科の常勤医師13名（内科9名・精神科3名・小児科1名）が連携し、大阪市内で在宅医療を提供しています。',
  path: '/doctors',
});

export default function DoctorsPage() {
  return (
    <>
      <Hero
        tagline="医師紹介"
        taglineClass={clinicalHeroTaglineClass}
        titleClass={clinicalHeroTitleClass}
        subtitleClass={clinicalHeroSubtitleClass}
        title={
          <>
            常勤医師13名が
            <br />
            在宅医療を支えます
          </>
        }
        subtitle={
          <>
            内科・精神科・小児科の医師が連携し、
            <br className="hidden sm:inline" />
            大阪市内{KAMOME_BRANCH_COUNT}院体制で24時間365日の在宅医療を提供しています。
          </>
        }
      />

      {/* ===== Stats ===== */}
      <section className="border-b border-gray-100 bg-white px-4 py-8 dark:border-slate-700 dark:bg-slate-900">
        <div className="mx-auto grid max-w-sm grid-cols-3 divide-x divide-gray-200 text-center dark:divide-slate-700">
          <div className="px-2">
            <p className="text-3xl font-extrabold tabular-nums text-sky-600 dark:text-sky-400">13名</p>
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">常勤医師（内科9・精神科3・小児科1）</p>
          </div>
          <div className="px-2">
            <p className="text-3xl font-extrabold tabular-nums text-sky-600 dark:text-sky-400">
              {KAMOME_BRANCH_COUNT}院
            </p>
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">市内拠点</p>
          </div>
          <div className="px-2">
            <p className="text-3xl font-extrabold tabular-nums text-sky-600 dark:text-sky-400">2017</p>
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">年 開院</p>
          </div>
        </div>
      </section>

      {/* ===== 診療科ジャンプリンク ===== */}
      <nav className="sticky top-0 z-10 border-b border-gray-200 bg-white/90 backdrop-blur dark:border-slate-700 dark:bg-slate-900/90">
        <div className="mx-auto flex max-w-3xl">
          {sections.map((s) => {
            const Icon = resolveIcon(s.icon);
            return (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="flex flex-1 items-center justify-center gap-1.5 py-3 text-sm font-semibold text-gray-600 transition-colors hover:text-sky-600 dark:text-gray-300 dark:hover:text-sky-400"
              >
                {Icon && <Icon className="h-5 w-5 shrink-0 opacity-90" aria-hidden="true" />}
                {s.label}
              </a>
            );
          })}
        </div>
      </nav>

      {/* ===== 診療科セクション ===== */}
      {sections.map((section) => {
        const Icon = resolveIcon(section.icon);
        return (
          <section key={section.id} id={section.id} className={`px-4 py-12 ${section.accentLight}`}>
            <div className="mx-auto max-w-3xl">
              <div className="mb-8 flex items-center gap-3">
                {Icon && <Icon className={`h-8 w-8 shrink-0 ${section.accentText}`} aria-hidden="true" />}
                <h2 className={`text-2xl font-bold ${section.accentText}`}>{section.label}</h2>
                <div className="h-px flex-1 bg-gray-200 dark:bg-slate-700" />
              </div>

              <div className="space-y-6">
                {section.doctors.map((doc) => (
                  <DoctorIntroCard key={doc.name} section={section} doc={doc} />
                ))}
              </div>
            </div>
          </section>
        );
      })}
    </>
  );
}
