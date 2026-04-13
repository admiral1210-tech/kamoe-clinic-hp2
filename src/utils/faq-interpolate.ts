/**
 * FAQ JSONファイルのプレースホルダー置換・スニペット付与ユーティリティ
 *
 * JSONファイル内で使用できるプレースホルダー:
 *   {{TEL}}              → CLINIC_CONTACT.telDisplay
 *   {{TEL_HREF}}         → CLINIC_CONTACT.telHref
 *   {{TEL_RENKEI}}       → CLINIC_CONTACT.telRenkeiDisplay（地域医療連携部）
 *   {{TEL_RENKEI_HREF}}  → CLINIC_CONTACT.telRenkeiHref
 *   {{BRANCH_COUNT}}     → KAMOME_BRANCH_COUNT
 *   {{COST_HREF}}        → /cost
 *   {{RENKEI_HREF}}      → /renkei
 *
 * trailingSnippet フィールド:
 *   "phoneFormConsult"  → 末尾に「お電話またはフォームでご相談ください。」を付与
 *   "costPageAndPhone"  → 末尾に「費用・保険ページまたはお電話でご確認ください。」を付与
 */

import { CLINIC_CONTACT } from '~/data/clinic-contact';
import { KAMOME_BRANCH_COUNT } from '~/data/branches';
import type { ClinicalFaqEntry } from '~/utils/seo-faq';

export type TrailingSnippetKey = 'phoneFormConsult' | 'costPageAndPhone';

export interface RawFaqEntry {
  question: string;
  /** プレースホルダーを含むプレーンテキスト版回答 */
  answerPlain: string;
  /** プレースホルダーを含むHTML版回答（省略時は answerPlain を使用） */
  answerHtml?: string;
  /** 末尾に追加する定型スニペットのキー */
  trailingSnippet?: TrailingSnippetKey;
}

export interface RawFaqJson {
  entries: RawFaqEntry[];
}

const PLACEHOLDERS: Record<string, string> = {
  '{{TEL}}': CLINIC_CONTACT.telDisplay,
  '{{TEL_HREF}}': CLINIC_CONTACT.telHref,
  '{{TEL_RENKEI}}': CLINIC_CONTACT.telRenkeiDisplay,
  '{{TEL_RENKEI_HREF}}': CLINIC_CONTACT.telRenkeiHref,
  '{{BRANCH_COUNT}}': String(KAMOME_BRANCH_COUNT),
  '{{COST_HREF}}': '/cost',
  '{{RENKEI_HREF}}': '/renkei',
};

function interpolate(text: string): string {
  return Object.entries(PLACEHOLDERS).reduce(
    (acc, [placeholder, value]) => acc.replaceAll(placeholder, value),
    text
  );
}

function buildTrailingSnippetPlain(key: TrailingSnippetKey): string {
  switch (key) {
    case 'phoneFormConsult':
      return `まずはお電話（${CLINIC_CONTACT.telDisplay}）またはお問い合わせフォームでご相談ください。`;
    case 'costPageAndPhone':
      return `詳しくは費用・保険ページまたはお電話（${CLINIC_CONTACT.telDisplay}）でご確認ください。`;
  }
}

function buildTrailingSnippetHtml(key: TrailingSnippetKey): string {
  switch (key) {
    case 'phoneFormConsult':
      return `まずはお電話（<a href="${CLINIC_CONTACT.telHref}" class="text-primary font-bold hover:underline">${CLINIC_CONTACT.telDisplay}</a>）または<a href="/renkei" class="text-primary font-bold hover:underline">お問い合わせフォーム</a>でご相談ください。`;
    case 'costPageAndPhone':
      return `詳しくは<a href="/cost" class="text-primary underline">費用・保険ページ</a>またはお電話（<a href="${CLINIC_CONTACT.telHref}" class="text-primary font-bold hover:underline">${CLINIC_CONTACT.telDisplay}</a>）でご確認ください。`;
  }
}

/**
 * RawFaqJson からプレースホルダー展開・スニペット付与済みの ClinicalFaqEntry[] を生成する。
 */
export function interpolateFaqEntries(raw: RawFaqJson): ClinicalFaqEntry[] {
  return raw.entries.map((entry) => {
    const corePlain = interpolate(entry.answerPlain);
    const coreHtml = interpolate(entry.answerHtml ?? entry.answerPlain);

    const snippetPlain = entry.trailingSnippet ? buildTrailingSnippetPlain(entry.trailingSnippet) : '';
    const snippetHtml = entry.trailingSnippet ? buildTrailingSnippetHtml(entry.trailingSnippet) : '';

    return {
      question: entry.question,
      answerPlain: corePlain + snippetPlain,
      answerHtml: coreHtml + snippetHtml,
    };
  });
}
