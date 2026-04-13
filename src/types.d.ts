import type { AstroComponentFactory } from 'astro/runtime/server/index.js';
import type { HTMLAttributes, ImageMetadata } from 'astro/types';

export interface Post {
  /** A unique ID number that identifies a post. */
  id: string;

  /** A post’s unique slug – part of the post’s URL based on its name, i.e. a post called “My Sample Page” has a slug “my-sample-page”. */
  slug: string;

  /**  */
  permalink: string;

  /**  */
  publishDate: Date;
  /**  */
  updateDate?: Date;

  /**  */
  title: string;
  /** Optional summary of post content. */
  excerpt?: string;
  /**  */
  image?: ImageMetadata | string;

  /**  */
  category?: Taxonomy;
  /**  */
  tags?: Taxonomy[];
  /**  */
  author?: string;

  /**  */
  metadata?: MetaData;

  /**  */
  draft?: boolean;

  /**  */
  Content?: AstroComponentFactory;
  content?: string;

  /**  */
  readingTime?: number;
}

/** 一覧・RSS・ウィジェット向け。`render()` による本文は含めない。 */
export type PostSummary = Omit<Post, 'Content'>;

export interface Taxonomy {
  slug: string;
  title: string;
}

export interface MetaData {
  title?: string;
  ignoreTitleTemplate?: boolean;

  canonical?: string;

  robots?: MetaDataRobots;

  description?: string;

  openGraph?: MetaDataOpenGraph;
  twitter?: MetaDataTwitter;
}

export interface MetaDataRobots {
  index?: boolean;
  follow?: boolean;
}

export interface MetaDataImage {
  url: string;
  width?: number;
  height?: number;
}

export interface MetaDataOpenGraph {
  url?: string;
  siteName?: string;
  images?: Array<MetaDataImage>;
  locale?: string;
  type?: string;
}

export interface MetaDataTwitter {
  handle?: string;
  site?: string;
  cardType?: string;
}

export interface Image {
  src: string;
  alt?: string;
}

export interface Video {
  src: string;
  type?: string;
}

export interface Widget {
  id?: string;
  isDark?: boolean;
  bg?: string;
  classes?: Record<string, string | Record<string, string>>;
  /** 付与する Tailwind scroll-margin クラス（例: scroll-mt-32）。未指定時は WidgetWrapper 既定。 */
  scrollMarginClass?: string;
}

export interface Headline {
  title?: string;
  subtitle?: string;
  tagline?: string;
  classes?: Record<string, string>;
}

interface TeamMember {
  name?: string;
  job?: string;
  image?: Image;
  socials?: Array<Social>;
  description?: string;
  classes?: Record<string, string>;
}

interface Social {
  icon?: string;
  href?: string;
}

export interface Stat {
  amount?: number | string;
  title?: string;
  icon?: string;
}

export interface Item {
  title?: string;
  description?: string;
  /** 指定時は常に表示し、description は「続きを読む」内に表示（長文カードの段階開示） */
  descriptionSummary?: string;
  icon?: string;
  /** ItemGrid2 等でカードを視覚的に強調（採用LPの差別化項目など） */
  highlight?: boolean;
  classes?: Record<string, string>;
  callToAction?: CallToAction;
  image?: Image;
}

export interface Price {
  title?: string;
  subtitle?: string;
  description?: string;
  price?: number | string;
  period?: string;
  items?: Array<Item>;
  callToAction?: CallToAction;
  hasRibbon?: boolean;
  ribbonTitle?: string;
}

export interface Testimonial {
  title?: string;
  testimonial?: string;
  name?: string;
  job?: string;
  image?: string | unknown;
}

export interface Input {
  type: HTMLInputTypeAttribute;
  name: string;
  label?: string;
  autocomplete?: string;
  placeholder?: string;
}

export interface Textarea {
  label?: string;
  name?: string;
  placeholder?: string;
  rows?: number;
}

export interface Disclaimer {
  label?: string;
}

// COMPONENTS
export interface CallToAction extends Omit<HTMLAttributes<'a'>, 'slot'> {
  variant?: 'primary' | 'secondary' | 'tertiary' | 'link' | 'line' | 'floatingCtaTel' | 'floatingCtaForm';
  text?: string;
  icon?: string;
  classes?: Record<string, string>;
  type?: 'button' | 'submit' | 'reset';
}

export interface ItemGrid {
  items?: Array<Item>;
  columns?: number;
  defaultIcon?: string;
  classes?: Record<string, string>;
  /** ItemGrid2 のみ使用。見出しに CSS 番号を付与 */
  numberedTitles?: boolean;
}

export interface Collapse {
  iconUp?: string;
  iconDown?: string;
  items?: Array<Item>;
  columns?: number;
  classes?: Record<string, string>;
}

export interface Form {
  inputs?: Array<Input>;
  textarea?: Textarea;
  disclaimer?: Disclaimer;
  button?: string;
  description?: string;
}

// WIDGETS
export interface Hero extends Omit<Headline, 'classes'>, Omit<Widget, 'isDark' | 'classes'> {
  content?: string;
  actions?: string | CallToAction[];
  image?: string | unknown;
  /** true のとき画像ブロックを見出しより上に配置（LCP・ファーストビュー優先） */
  imageFirst?: boolean;
  /** タグライン用の追加クラス（例: normal-case） */
  taglineClass?: string;
  /** 省略時は既定の見出しスタイル（ページごとに上書き可） */
  titleClass?: string;
  /** 省略時は既定のリード文スタイル */
  subtitleClass?: string;
  /** image スロット外枠の幅クラス（例: max-w-7xl）。省略時は max-w-5xl */
  imageContainerClass?: string;
  /** 見出し・リード文ブロックの下余白（省略時は imageFirst に応じて pb-6〜pb-16） */
  textBlockPaddingClass?: string;
  /** メイン縦パディング（省略時は py-12 md:py-20） */
  sectionPaddingClass?: string;
}

export interface Team extends Omit<Headline, 'classes'>, Widget {
  team?: Array<TeamMember>;
}

export interface Stats extends Omit<Headline, 'classes'>, Widget {
  stats?: Array<Stat>;
  footnote?: string;
}

export interface Pricing extends Omit<Headline, 'classes'>, Widget {
  prices?: Array<Price>;
  /** 自費診療の場合は必須：リスク・注意事項の説明文（SelfPayPricing を使用すること） */
  riskNotes?: string;
  /** 自費診療の場合は必須：副作用・合併症の説明文（SelfPayPricing を使用すること） */
  sideEffectNotes?: string;
}

/** 自由診療（自費）コンテンツ専用。医療広告ガイドライン準拠のため riskNotes・sideEffectNotes を必須とする。 */
export interface SelfPayPricing extends Pricing {
  /** 必須：リスク・注意事項の説明文 */
  riskNotes: string;
  /** 必須：副作用・合併症の説明文 */
  sideEffectNotes: string;
}

export interface Testimonials extends Omit<Headline, 'classes'>, Widget {
  testimonials?: Array<Testimonial>;
  callToAction?: CallToAction;
}

export interface Brands extends Omit<Headline, 'classes'>, Widget {
  icons?: Array<string>;
  images?: Array<Image>;
}

export interface Features extends Omit<Headline, 'classes'>, Widget {
  image?: string | unknown;
  video?: Video;
  items?: Array<Item>;
  columns?: number;
  defaultIcon?: string;
  callToAction1?: CallToAction;
  callToAction2?: CallToAction;
  isReversed?: boolean;
  isBeforeContent?: boolean;
  isAfterContent?: boolean;
}

export interface Faqs extends Omit<Headline, 'classes'>, Widget {
  iconUp?: string;
  iconDown?: string;
  items?: Array<Item>;
  columns?: number;
}

export interface Steps extends Omit<Headline, 'classes'>, Widget {
  items?: Array<Item>;
  callToAction?: string | CallToAction;
  image?: string | Image;
  isReversed?: boolean;
}

export interface Content extends Omit<Headline, 'classes'>, Widget {
  content?: string;
  image?: string | unknown;
  items?: Array<Item>;
  columns?: number;
  isReversed?: boolean;
  isAfterContent?: boolean;
  callToAction?: CallToAction;
}

export interface Contact extends Omit<Headline, 'classes'>, Form, Widget {}
