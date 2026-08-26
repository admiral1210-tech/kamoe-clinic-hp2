import type { Metadata } from 'next';

const SITE_URL = 'https://kamome-clinic.net';
const SITE_NAME = 'かもめクリニック';
const DEFAULT_TITLE = 'かもめクリニック｜24時間対応 訪問診療 内科・精神科・小児科(大阪市)';
const DEFAULT_DESCRIPTION =
  'かもめクリニックは大阪市を中心に展開する24時間365日対応の在宅療養支援診療所です。内科・精神科・小児科(医療ケア児対応)の訪問診療を行い、住み慣れた場所での療養生活をサポートします。';
const DEFAULT_OG_IMAGE = { url: '/images/default.png', width: 1200, height: 628 };

export interface PageMetadataInput {
  title?: string;
  /** true の場合、タイトルテンプレート「%s｜かもめクリニック」を適用しない */
  ignoreTitleTemplate?: boolean;
  description?: string;
  path?: string;
  noindex?: boolean;
  nofollow?: boolean;
  ogImage?: { url: string; width?: number; height?: number };
}

export function buildMetadata(input: PageMetadataInput = {}): Metadata {
  const {
    title,
    ignoreTitleTemplate = false,
    description = DEFAULT_DESCRIPTION,
    path = '/',
    noindex = false,
    nofollow = false,
    ogImage = DEFAULT_OG_IMAGE,
  } = input;

  const resolvedTitle = title ? (ignoreTitleTemplate ? title : `${title}｜${SITE_NAME}`) : DEFAULT_TITLE;
  const canonical = new URL(path, SITE_URL).toString();

  return {
    metadataBase: new URL(SITE_URL),
    title: resolvedTitle,
    description,
    alternates: { canonical },
    robots: { index: !noindex, follow: !nofollow },
    openGraph: {
      title: resolvedTitle,
      description,
      url: canonical,
      siteName: SITE_NAME,
      images: [ogImage],
      locale: 'ja_JP',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: resolvedTitle,
      description,
      images: [ogImage.url],
    },
  };
}

export const SEO_DEFAULTS = { SITE_URL, SITE_NAME, DEFAULT_TITLE, DEFAULT_DESCRIPTION };
