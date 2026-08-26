import type { MetadataRoute } from 'next';

import { SEO_DEFAULTS } from '@/lib/seo';
import { OSAKA_CITY_WARDS } from '~/data/osaka-wards';

const { SITE_URL } = SEO_DEFAULTS;

const STATIC_PATHS = [
  '/',
  '/about',
  '/about/kinoshita',
  '/area-osaka',
  '/blog',
  '/cost',
  '/doctors',
  '/faq',
  '/houmon-shinryo',
  '/joseikin',
  '/naika',
  '/privacy',
  '/recruit',
  '/recruit/doctor',
  '/recruit/nurse',
  '/renkei',
  '/seikeigeka',
  '/seishinika',
  '/services',
  '/shoninka',
  '/terms',
  '/zaishin1',
];

const WARD_PATHS = OSAKA_CITY_WARDS.filter((ward) => ward.slug !== null).map((ward) => `/area/${ward.slug}`);

export default function sitemap(): MetadataRoute.Sitemap {
  return [...STATIC_PATHS, ...WARD_PATHS].map((path) => ({
    url: new URL(path, SITE_URL).toString(),
    lastModified: undefined,
  }));
}
