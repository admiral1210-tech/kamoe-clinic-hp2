import type { ClinicalFaqEntry } from '~/utils/seo-faq';
import { interpolateFaqEntries } from '~/utils/faq-interpolate';
import type { RawFaqJson } from '~/utils/faq-interpolate';
import rawData from '~/content/copy/ja/faq/seikeigeka.json';

/** 整形外科訪問診療ページの FAQ */
export const seikeigekaFaqEntries: ClinicalFaqEntry[] = interpolateFaqEntries(rawData as RawFaqJson);
