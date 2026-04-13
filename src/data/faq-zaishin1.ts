import type { ClinicalFaqEntry } from '~/utils/seo-faq';
import { interpolateFaqEntries } from '~/utils/faq-interpolate';
import type { RawFaqJson } from '~/utils/faq-interpolate';
import rawData from '~/content/copy/ja/faq/zaishin1.json';

/** 在支診1ページの FAQ（画面上の並び順に JSON-LD を揃える） */
export const zaishin1FaqEntries: ClinicalFaqEntry[] = interpolateFaqEntries(rawData as RawFaqJson);
