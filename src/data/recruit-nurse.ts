/**
 * 看護師採用ページ（/recruit/nurse）専用データ。
 * recruit.ts の共通データと分離して管理する。
 */

export const nurseJobDetails = [
  {
    number: '01',
    title: '安全運転で医師をサポート（移動）',
    body: '軽自動車（AT/ナビ付）で大阪市内を回ります。急ぐ必要は全くありません。お願いしたいのは「優しく丁寧な安全運転」です。移動時間は医師との貴重な打ち合わせタイムです。',
    icon: 'tabler:car',
    highlight: false,
  },
  {
    number: '02',
    title: '診療補助（現場）',
    body: 'バイタル測定・採血・点滴・処置の準備など。医師の診察をそばでサポートします。',
    icon: 'tabler:stethoscope',
    highlight: false,
  },
  {
    number: '03',
    title: '多職種連携・生活背景の把握',
    body: '介護疲れや社会的サポート不足を察知し、ケアマネジャー・訪問看護師などと連携します。患者さまの「生活」を医師の目となって守る、最も重要な役割です。',
    icon: 'tabler:network',
    highlight: true,
  },
];

export const nurseDailyFlow = [
  {
    time: '08:45',
    label: '朝礼・出発準備',
    desc: '患者さまの情報を共有し、当日の訪問スケジュールを確認します。',
  },
  {
    time: '09:00',
    label: '午前の訪問出発',
    desc: '医師とペアで軽自動車に乗り込み、大阪市内を巡回します。',
  },
  {
    time: '12:00',
    label: '昼休憩（45分）',
    desc: 'クリニックに戻り、午後の準備と休憩。',
  },
  {
    time: '13:00',
    label: '午後の訪問出発',
    desc: '午後の患者さまのもとへ。夕方には全訪問が完了します。',
  },
  {
    time: '17:30',
    label: '業務終了',
    desc: '残業はほぼありません。プライベートをしっかり守れる環境です。',
  },
];

export const nurseWorkStyle = [
  {
    title: '17:30 業務終了（残業ほぼなし）',
    icon: 'tabler:clock',
    desc: '前年度の平均月間残業は1時間程度。',
  },
  {
    title: '土日休み・年間休日120日',
    icon: 'tabler:calendar-off',
    desc: '設定休暇（1〜9日）と有給休暇も完備。',
  },
  {
    title: '一人にさせない安心感',
    icon: 'tabler:users',
    desc: '医師とペアで動くため、孤立した対応は一切ありません。',
  },
];

export const nurseOnboarding = [
  {
    step: '1',
    title: 'オリエンテーション',
    desc: '入職初日に診療の流れと院内システムを丁寧に説明します。',
  },
  {
    step: '2',
    title: '先輩看護師との同行研修',
    desc: '慣れるまで先輩と一緒に訪問。現場の動きを見て学べます。',
  },
  {
    step: '3',
    title: '随時フィードバック',
    desc: '疑問はその日のうちに解決。小さな不安も放置しません。',
  },
  {
    step: '4',
    title: 'ブランク・未経験も歓迎',
    desc: '訪問診療が初めてでも、丁寧に指導します。',
  },
];

export const nurseStaffMessage = {
  name: '看護師スタッフ',
  role: '診療同行看護師',
  // TODO: 実名または「Aさん（看護師歴〇年）」等に変更してください
  message:
    '訪問診療の仕事は、患者さまの「生活の場」に入らせていただく、特別な仕事です。病院では見えなかった患者さまの日常が見えて、より深く関わることができます。最初は不安でしたが、医師と一緒に動くので、一人で悩むことがありません。ぜひ一緒に働きましょう。',
};
