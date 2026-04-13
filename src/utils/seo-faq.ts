import { escapeHtml } from '~/utils/html-escape';

/** UI（アコーディオン）と FAQPage JSON-LD の共通ソース */
export interface ClinicalFaqEntry {
  question: string;
  /** 構造化データ・音声読み上げ用のプレーン文（HTML 不可） */
  answerPlain: string;
  /** アコーディオン表示用。未指定時は answerPlain をエスケープして使用 */
  answerHtml?: string;
}

export function buildFaqPageJsonLd(entries: ClinicalFaqEntry[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: entries.map((e) => ({
      '@type': 'Question',
      name: e.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: e.answerPlain,
      },
    })),
  };
}

export function faqEntriesToWidgetItems(entries: ClinicalFaqEntry[]) {
  return entries.map((e) => ({
    title: e.question,
    description: e.answerHtml ?? escapeHtml(e.answerPlain),
  }));
}
