import type { ClinicalFaqEntry } from '~/utils/seo-faq';
import { interpolateFaqEntries } from '~/utils/faq-interpolate';
import type { RawFaqJson } from '~/utils/faq-interpolate';
import rawData from '~/content/copy/ja/faq/naika.json';

/** 内科訪問診療ページの FAQ（表示と FAQPage JSON-LD の単一ソース） */
export const naikaFaqEntries: ClinicalFaqEntry[] = interpolateFaqEntries(rawData as RawFaqJson);
