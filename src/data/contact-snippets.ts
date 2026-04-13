import { CLINIC_CONTACT } from '~/data/clinic-contact';
import { getPermalink } from '~/utils/permalinks';

const contactHref = getPermalink('/renkei');

/** FAQ 等で繰り返す「電話＋お問い合わせフォーム」締め（プレーン） */
export function faqSnippetPhoneFormConsultPlain(): string {
  return `まずはお電話（${CLINIC_CONTACT.telDisplay}）またはお問い合わせフォームでご相談ください。`;
}

/** FAQ 等で繰り返す「電話＋お問い合わせフォーム」締め（リンク付き HTML 断片） */
export function faqSnippetPhoneFormConsultHtml(): string {
  return `まずはお電話（<a href="${CLINIC_CONTACT.telHref}" class="text-primary font-bold hover:underline">${CLINIC_CONTACT.telDisplay}</a>）または<a href="${contactHref}" class="text-primary font-bold hover:underline">お問い合わせフォーム</a>でご相談ください。`;
}

/** 費用ページ＋電話（プレーン） */
export function faqSnippetCostPageAndPhonePlain(): string {
  return `詳しくは費用・保険ページまたはお電話（${CLINIC_CONTACT.telDisplay}）でご確認ください。`;
}

/** 費用ページ＋電話（リンク付き） */
export function faqSnippetCostPageAndPhoneHtml(costHref: string): string {
  return `詳しくは<a href="${costHref}" class="text-primary underline">費用・保険ページ</a>またはお電話（<a href="${CLINIC_CONTACT.telHref}" class="text-primary font-bold hover:underline">${CLINIC_CONTACT.telDisplay}</a>）でご確認ください。`;
}
