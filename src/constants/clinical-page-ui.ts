/** トップページ Hero と揃えた診療系ランディングのタイポ・モーション */
const motion =
  'intersect-once intersect-quarter motion-safe:md:opacity-0 motion-safe:md:intersect:animate-fade';

export const clinicalHeroTitleClass =
  `text-3xl md:text-4xl font-bold leading-snug tracking-tight mb-3 font-heading text-heading ${motion}`;

export const clinicalHeroSubtitleClass =
  `text-sm text-muted mb-5 leading-relaxed ${motion}`;

export const clinicalHeroTaglineClass =
  `text-sm font-semibold text-primary tracking-wide ${motion}`;

/**
 * Hero + PageTocNav の組み合わせで使う余白トークン。
 * Hero のデフォルト（画像あり前提）を上書きし、全診療ページで一貫した間隔にする。
 */
// pb は持たない（docs/design-system/spacing.md 参照）
export const clinicalHeroSectionPadding = 'pt-10 md:pt-16';
export const clinicalHeroTextBlockPadding = 'pb-2 md:pb-3';

/**
 * ヒーロー内の強調リード用。Speakable の cssSelector に含めない限り JSON-LD とは連動しない。
 * （各ページの Speakable は多くが `h1`/`h2` のみ — `cost`・`zaishin1` 等は `PageLayout` 先頭の script を参照）
 */
export const clinicalHeroSpeakableLeadClass =
  `hero-subtitle block mb-2 font-semibold text-primary ${motion}`;

/** Features / FAQs / インラインセクションで共有する見出しトークン（ConsultCTA の eyebrow と階調を合わせる） */
export const clinicalSectionHeadline = {
  container: 'max-w-3xl mx-auto',
  tagline: 'text-xs font-semibold text-primary tracking-widest uppercase mb-1',
  title: 'text-2xl md:text-3xl font-bold tracking-tight text-heading',
  subtitle: 'mt-3 text-sm md:text-base text-muted leading-relaxed',
} as const;

/**
 * PageTocNav（sticky）があるページのアンカースクロールオフセット
 * ヘッダー(~76px) + TOCバー(~50px) の合計を丸めた値
 */
export const clinicalAnchorScrollMargin = 'scroll-mt-32';

/** ヒーロー直下やセクション内で使う主要CTA（電話・プライマリ） */
export const ctaHeroPrimaryClass =
  'inline-flex items-center justify-center gap-2 rounded-card bg-primary px-5 py-3.5 text-sm font-bold text-white shadow-md hover:opacity-90 transition-opacity';

export const ctaHeroSecondaryClass =
  'inline-flex items-center justify-center gap-2 rounded-card border-2 border-gray-300 bg-white px-5 py-3 text-sm font-semibold text-default shadow-sm hover:border-gray-400 transition-colors';
