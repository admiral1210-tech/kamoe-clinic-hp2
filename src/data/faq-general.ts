/** 一般向けよくある質問（/faq の本文・FAQPage JSON-LD の単一ソース） */

import { interpolateFaqEntries } from '~/utils/faq-interpolate';
import type { RawFaqJson } from '~/utils/faq-interpolate';
import rawData from '~/content/copy/ja/faq/general.json';

export type ClinicGeneralFaqEntry = {
  q: string;
  /** schema.org Answer.text 用（HTMLなし） */
  answerPlain: string;
  /** 画面表示用（必要に応じてリンク付き） */
  answerHtml: string;
};

const _entries = interpolateFaqEntries(rawData as RawFaqJson);

export const CLINIC_GENERAL_FAQ: ClinicGeneralFaqEntry[] = _entries.map((e) => ({
  q: e.question,
  answerPlain: e.answerPlain,
  answerHtml: e.answerHtml ?? e.answerPlain,
}));

export function buildClinicGeneralFaqJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: CLINIC_GENERAL_FAQ.map(({ q, answerPlain }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: answerPlain },
    })),
  };
}

/** トップページ掲載用（先頭のみ・重複スキーマ回避のため質問本文は /faq に一本化） */
export const CLINIC_GENERAL_FAQ_PREVIEW_COUNT = 5;
