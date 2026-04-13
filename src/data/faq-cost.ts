import type { ClinicalFaqEntry } from '~/utils/seo-faq';
import { interpolateFaqEntries } from '~/utils/faq-interpolate';
import type { RawFaqJson } from '~/utils/faq-interpolate';
import rawData from '~/content/copy/ja/faq/cost.json';

/** 費用・保険ページの FAQ（表示と FAQPage の単一ソース） */
export const costFaqEntries: ClinicalFaqEntry[] = interpolateFaqEntries(rawData as RawFaqJson);
