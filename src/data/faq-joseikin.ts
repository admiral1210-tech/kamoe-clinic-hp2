import { interpolateFaqEntries } from '~/utils/faq-interpolate';
import type { ClinicalFaqEntry } from '~/utils/seo-faq';
import rawData from '~/content/copy/ja/faq/joseikin.json';

export const joseikinFaqEntries: ClinicalFaqEntry[] = interpolateFaqEntries(rawData);
