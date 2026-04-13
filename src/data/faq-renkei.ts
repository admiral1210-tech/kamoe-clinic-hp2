import { interpolateFaqEntries } from '~/utils/faq-interpolate';
import type { ClinicalFaqEntry } from '~/utils/seo-faq';
import rawData from '~/content/copy/ja/faq/renkei.json';

export const renkeiFaqEntries: ClinicalFaqEntry[] = interpolateFaqEntries(rawData);
