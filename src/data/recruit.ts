import { CLINIC_CONTACT, clinicMailtoHref } from './clinic-contact';
import { KAMOME_BRANCH_COUNT } from './branches';
import type { CallToAction, Item } from '~/types';

/** 採用メールの件名（mailto の subject） */
export const RECRUIT_MAIL_SUBJECT = '採用応募';

export const recruitApplicationMailtoHref = () => clinicMailtoHref(RECRUIT_MAIL_SUBJECT);

export const recruitWhyFeaturesItems: Item[] = [
  {
    title: '患者さまと深く関わる医療',
    description:
      '外来と違い、患者さまの生活の場に入り込む訪問診療。信頼関係を築きながら長期的に支える仕事です。',
    icon: 'tabler:heart-handshake',
    highlight: true,
  },
  {
    title: '多職種連携の充実した環境',
    description:
      '内科・精神科・小児科が連携するクリニックで、幅広い症例に関われます。ケアマネジャー・訪問看護師とも密に連携します。',
    icon: 'tabler:network',
    highlight: true,
  },
  {
    title: '複数拠点で安定した組織基盤',
    description: `大阪市内${KAMOME_BRANCH_COUNT}院を展開する組織力で、安定した雇用環境とキャリアパスを提供します。`,
    icon: 'tabler:building',
  },
  {
    title: '24時間体制をチームで分担',
    description:
      '緊急対応はチームで分担し、一人に負担が偏らない体制を整えています。プライベートとの両立が可能です。',
    icon: 'tabler:clock-24',
  },
  {
    title: '専門医のいる職場で学べる',
    description: '精神科専門医・小児科専門医が常勤。日常業務を通じて専門知識を深められる環境です。',
    icon: 'tabler:school',
  },
  {
    title: '人生の最終段階に寄り添う仕事',
    description: 'ターミナルケア・ACPなど、人生の最終段階に関わる重要な医療を担える職場です。',
    icon: 'tabler:home-heart',
    highlight: true,
  },
];

export type RecruitPositionCta =
  | { type: 'anchor'; href: string; label: string }
  /** 詳細を同一カード内の details で開閉 */
  | { type: 'details'; label: string; detailsId: string };

export interface RecruitPositionCard {
  title: string;
  rows: { label: string; value: string }[];
  cta: RecruitPositionCta;
}

export const recruitPositionCards: RecruitPositionCard[] = [
  {
    title: '医師（内科・精神科・小児科）',
    rows: [
      { label: '雇用形態', value: '常勤・非常勤（相談可）' },
      { label: '勤務地', value: '大阪市内各院（港区・西淀川区・住之江区 等）' },
      { label: '勤務時間', value: '平日 9:00〜17:00（緊急往診はオンコール制）' },
      { label: '必須資格', value: '医師免許（経験・年次不問、訪問診療未経験可）' },
      { label: '給与', value: '経験・スキルに応じて応相談' },
    ],
    cta: { type: 'anchor', href: '#apply', label: '応募・お問い合わせ' },
  },
  {
    title: '看護師',
    rows: [
      { label: '雇用形態', value: '正社員・パート（相談可）' },
      { label: '勤務地', value: '大阪市内各院・訪問先（車で移動）' },
      { label: '勤務時間', value: '平日 9:00〜17:00（曜日・時間相談可）' },
      { label: '必須資格', value: '看護師免許（訪問看護経験不問）' },
      { label: '給与', value: '経験・スキルに応じて応相談' },
    ],
    cta: { type: 'details', detailsId: 'nurse-fulltime', label: '詳細募集要項を見る' },
  },
  {
    title: '医療事務',
    rows: [
      { label: '雇用形態', value: '正社員・パート' },
      { label: '勤務地', value: '大阪市港区（本院）' },
      { label: '勤務時間', value: '平日 9:00〜17:00' },
      { label: '必須資格', value: '不問（医療事務経験者優遇）' },
      { label: '給与', value: '経験・スキルに応じて応相談' },
    ],
    cta: { type: 'anchor', href: '#apply', label: '応募・お問い合わせ' },
  },
];

export interface RecruitNurseDetailRow {
  label: string;
  valueHtml: string;
}

export const recruitNurseFulltime = {
  title: '【看護師・正社員】詳細募集要項',
  introHtml: [
    '「訪問看護」ではありません。<strong>常に医師とともに行動する「診療同行看護師」</strong>として、患者さまの生活を医師の「目」となって守る役割をお任せします。',
    'スピードより「丁寧さ・確実さ」を大切にできる方を歓迎します。訪問診療の経験は不問。ブランクのある方も丁寧に指導します。',
  ],
  leftColumn: [
    { label: '雇用形態', valueHtml: '正社員（常勤）' },
    { label: '賞与', valueHtml: '年1.5〜2ヶ月分（昨年度実績）' },
    { label: '昇給・手当', valueHtml: 'ベースアップ加算 1〜3万円/年・役職手当あり' },
    { label: '待遇', valueHtml: '社会保険完備・交通費規定支給（月1万円まで）' },
  ] satisfies RecruitNurseDetailRow[],
  rightColumn: [
    { label: '勤務時間', valueHtml: '8:45〜17:30（休憩45分・実働8時間）' },
    {
      label: '休日',
      valueHtml:
        '土日・設定休暇（1〜9日）・有給（入社6ヶ月後10日）<br /><span class="text-gray-500">※年間休日120日程度</span>',
    },
    { label: '必須資格', valueHtml: '看護師免許<br />普通自動車免許（AT限定可）' },
    { label: '勤務先', valueHtml: 'かもめクリニック本院・各分院（大阪市内）' },
    { label: '選考', valueHtml: '書類選考 → 面接（1回） → 内定' },
  ] satisfies RecruitNurseDetailRow[],
  desiredProfile: {
    heading: '求める人物像',
    items: [
      '看護師免許をお持ちの方',
      '「丁寧さ」「確実さ」を大切にできる方',
      '患者さまのお話にじっくり耳を傾けられる方',
      '運転に抵抗がない方（安全運転第一）',
      '訪問診療の経験は問いません。ブランクがある方も丁寧に指導します。',
    ],
    emphasizedLast: true,
  },
};

export const recruitBenefitsItems: Item[] = [
  {
    title: '各種社会保険完備',
    description: '健康保険・厚生年金・雇用保険・労災保険に加入しています。',
  },
  {
    title: '交通費支給・車通勤可',
    description: '公共交通機関の実費を支給。訪問業務には法人車両を使用します（普通自動車免許優遇）。',
  },
  {
    title: '年間休日・有給休暇',
    description: '土日祝休み（週休2日）。有給休暇は入社6ヶ月後より付与（法定通り）。',
  },
  {
    title: '研修・スキルアップ支援',
    description: '専門医によるカンファレンス・院内勉強会を定期開催。外部研修の費用補助制度もあります。',
  },
];

export const recruitFlowItems: Item[] = [
  {
    title: 'Step 1: お問い合わせ・履歴書送付',
    description: `メール（${CLINIC_CONTACT.email}）またはお電話（${CLINIC_CONTACT.telDisplay}）にてご連絡ください。履歴書・職務経歴書をお送りいただければ幸いです。`,
    icon: 'tabler:send',
  },
  {
    title: 'Step 2: 書類選考',
    description: '書類到着後、1週間以内に結果をご連絡します。',
    icon: 'tabler:file-check',
  },
  {
    title: 'Step 3: 面接（1回）',
    description: '院長・担当者との面接を行います。ご希望に応じてオンライン面接も対応可能です。',
    icon: 'tabler:user-check',
  },
  {
    title: 'Step 4: 内定・入職',
    description:
      '内定後は入職日・条件などを調整します。訪問診療が初めての方には丁寧なオリエンテーションを行います。',
    icon: 'tabler:home-check',
  },
];

export const recruitFaqItems: Item[] = [
  {
    title: '訪問診療の経験がなくても応募できますか？',
    description:
      'はい、歓迎しています。入職後は先輩スタッフと同行研修を行いますので、訪問診療が初めての方もご安心ください。外来や病棟での経験をお持ちであれば十分です。',
  },
  {
    title: '非常勤・パートでの勤務は可能ですか？',
    description:
      '可能です。週1日からの非常勤・週2〜3日のパートタイム勤務など、ご希望に合わせて相談します。育児・介護中の方も多く活躍しています。',
  },
  {
    title: '車の運転は必須ですか？',
    description:
      '看護師・医師など訪問業務を行う職種は普通自動車免許（AT限定可）があると業務がスムーズです。ただし、免許がない場合も相談可能です。事務職は不要です。',
  },
  {
    title: '夜間・休日対応はありますか？',
    description: '医師の場合、夜間・休日対応は当番制を敷いております。月に２〜３回程度です。',
  },
  {
    title: '転職活動中で在職中でも相談できますか？',
    description:
      'もちろんです。在職中の転職活動でも、秘密厳守でご対応します。まずはお気軽にお電話またはメールでご相談ください。',
  },
];

export const recruitFinalCtaActions: CallToAction[] = [
  {
    variant: 'primary',
    text: 'メールで応募・お問い合わせ',
    href: recruitApplicationMailtoHref(),
    icon: 'tabler:mail',
  },
  {
    variant: 'secondary',
    text: `お電話でのご相談（${CLINIC_CONTACT.telDisplay}）`,
    href: CLINIC_CONTACT.telHref,
    icon: 'tabler:phone',
  },
];

/** schema.org JobPosting（看護師正社員）用。表示内容と整合させる。 */
export const recruitJobPostingNurseJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'JobPosting',
  title: '看護師（正社員・診療同行）',
  description:
    '訪問診療における診療同行看護師。常に医師とともに行動し、患者さまの生活を支えます。訪問診療経験不問。',
  datePosted: '2026-01-01',
  validThrough: '2027-12-31',
  employmentType: 'FULL_TIME',
  hiringOrganization: {
    '@type': 'Organization',
    name: 'かもめクリニック',
    sameAs: 'https://kamome-clinic.net',
  },
  jobLocation: {
    '@type': 'Place',
    address: {
      '@type': 'PostalAddress',
      addressLocality: '大阪市',
      addressRegion: '大阪府',
      addressCountry: 'JP',
    },
  },
  identifier: {
    '@type': 'PropertyValue',
    name: 'recruitPage',
    value: 'nurse-fulltime',
  },
} as const;
