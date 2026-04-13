import type { ClinicalFaqEntry } from '~/utils/seo-faq';
import { interpolateFaqEntries } from '~/utils/faq-interpolate';
import type { RawFaqJson } from '~/utils/faq-interpolate';
import rawData from '~/content/copy/ja/faq/shoninka.json';

/** 小児科訪問診療ページの FAQ */
export const shoninkaFaqEntries: ClinicalFaqEntry[] = interpolateFaqEntries(rawData as RawFaqJson);
