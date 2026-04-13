import { CLINIC_CONTACT } from '~/data/clinic-contact';
import { getPermalink } from '~/utils/permalinks';

/** 訪問診療ページの「ご利用の流れ」— 画面の Steps と JSON-LD HowTo の単一ソース */
export const HOMMON_SHINRYO_FLOW_HOW_TO = {
  name: '訪問診療のご利用開始までの流れ（かもめクリニック）',
  description: '訪問診療を始めるまでの4ステップです。状況によっては当日中の開始も可能です。',
  totalTime: 'P1D' as const,
};

const contactFormPath = getPermalink('/renkei');

export interface HoumonShinryoFlowStep {
  icon: string;
  /** HowToStep.name および Steps の見出し（同一文言） */
  headline: string;
  /** HowToStep.text（プレーン） */
  howToText: string;
  /** Steps の説明（HTML） */
  descriptionHtml: string;
}

export const houmonShinryoFlowSteps: HoumonShinryoFlowStep[] = [
  {
    icon: 'tabler:phone',
    headline: 'まずはお電話・お問い合わせフォームでご相談',
    howToText: `TEL ${CLINIC_CONTACT.telDisplay} またはお問い合わせフォームで、患者さまの状態とお住まいをお知らせください。担当スタッフが丁寧にお答えします。`,
    descriptionHtml: `TEL <a href="${CLINIC_CONTACT.telHref}" class="text-primary underline">${CLINIC_CONTACT.telDisplay}</a> または<a href="${contactFormPath}" class="text-primary underline">お問い合わせフォーム</a>で、患者さまの状態とお住まいをお知らせください。担当スタッフが丁寧にお答えします。`,
  },
  {
    icon: 'tabler:user-check',
    headline: '担当エリア・担当医の確認',
    howToText:
      'ご住所と病状を確認し、最寄り拠点の担当医を決めます。当日から翌営業日以内に、こちらからご連絡します。',
    descriptionHtml:
      'ご住所と病状を確認し、最寄り拠点の担当医を決めます。当日から翌営業日以内に、こちらからご連絡します。',
  },
  {
    icon: 'tabler:home-heart',
    headline: '初回訪問・診療計画のご説明',
    howToText:
      '担当医が初回訪問し、診療計画・訪問スケジュール・緊急時の連絡方法を、わかりやすくご説明します。',
    descriptionHtml:
      '担当医が初回訪問し、診療計画・訪問スケジュール・緊急時の連絡方法を、わかりやすくご説明します。',
  },
  {
    icon: 'tabler:stethoscope',
    headline: '定期訪問診療スタート',
    howToText: '月2回の定期訪問診療が始まります。急変時は24時間365日、担当医へ直接ご連絡いただけます。',
    descriptionHtml:
      '月2回の定期訪問診療が始まります。急変時は24時間365日、担当医へ直接ご連絡いただけます。',
  },
];

export function houmonShinryoFlowHowToSteps() {
  return houmonShinryoFlowSteps.map((s, i) => ({
    '@type': 'HowToStep' as const,
    position: i + 1,
    name: s.headline,
    text: s.howToText,
  }));
}

export function houmonShinryoFlowStepsItems() {
  return houmonShinryoFlowSteps.map((s) => ({
    title: s.headline,
    description: s.descriptionHtml,
    icon: s.icon,
  }));
}
