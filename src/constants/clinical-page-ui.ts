/** トップページ Hero と揃えた診療系ランディングのタイポ・モーション */
const motion =
  'intersect-once intersect-quarter motion-safe:md:opacity-0 motion-safe:md:intersect:animate-fade';

export const clinicalHeroTitleClass =
  `text-3xl md:text-4xl lg:text-[2.5rem] font-bold leading-snug tracking-tight mb-3 font-heading text-gray-900 dark:text-gray-100 ${motion}`;

export const clinicalHeroSubtitleClass =
  `text-sm md:text-[15px] text-gray-600 dark:text-gray-300 mb-5 leading-relaxed ${motion}`;

export const clinicalHeroTaglineClass =
  `text-sm md:text-[15px] font-semibold text-primary dark:text-blue-300 tracking-wide ${motion}`;

/**
 * ヒーロー内の強調リード用。Speakable の cssSelector に含めない限り JSON-LD とは連動しない。
 * （各ページの Speakable は多くが `h1`/`h2` のみ — `cost`・`zaishin1` 等は `PageLayout` 先頭の script を参照）
 */
export const clinicalHeroSpeakableLeadClass =
  `hero-subtitle block mb-2 font-semibold text-primary dark:text-blue-300 ${motion}`;

/** Features / Features2 / FAQs / インラインセクションで共有する見出しトークン（ConsultCTA の eyebrow と階調を合わせる） */
export const clinicalSectionHeadline = {
  container: 'max-w-3xl mx-auto',
  tagline: 'text-xs font-semibold text-primary tracking-widest uppercase mb-1',
  title: 'text-2xl md:text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100',
  subtitle: 'mt-3 text-sm md:text-base text-gray-600 dark:text-gray-300 leading-relaxed',
} as const;

/**
 * PageTocNav（sticky）があるページのアンカースクロールオフセット
 * ヘッダー(~76px) + TOCバー(~50px) の合計を丸めた値
 */
export const clinicalAnchorScrollMargin = 'scroll-mt-32';

/** ヒーロー直下やセクション内で使う主要CTA（電話・プライマリ） */
export const ctaHeroPrimaryClass =
  'inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3.5 text-sm font-bold text-white shadow-md hover:opacity-90 transition-opacity';

export const ctaHeroSecondaryClass =
  'inline-flex items-center justify-center gap-2 rounded-xl border-2 border-gray-300 bg-white px-5 py-3 text-sm font-semibold text-gray-800 shadow-sm hover:border-gray-400 dark:border-slate-500 dark:bg-slate-800 dark:text-gray-100 transition-colors';
