/**
 * 精神科ページ用 JSON-LD（FAQ 以外）
 *
 * - MedicalCondition: 複数 script タグではなく @graph 1 本に集約（差分の取りこぼし防止）
 * - Speakable: メンテ対効果が限定的なため出力しない（必要になったら WebPage と合わせて再検討）
 */

export const seishinikaMedicalConditionGraph = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'MedicalCondition',
      name: 'うつ病',
      alternateName: '抑うつ状態・大うつ病性障害',
      relevantSpecialty: 'https://schema.org/Psychiatry',
      recognizingAuthority: { '@type': 'Organization', name: '日本精神神経学会' },
    },
    {
      '@type': 'MedicalCondition',
      name: '統合失調症',
      relevantSpecialty: 'https://schema.org/Psychiatry',
    },
    {
      '@type': 'MedicalCondition',
      name: '認知症',
      alternateName: 'アルツハイマー型認知症・レビー小体型認知症・血管性認知症',
      relevantSpecialty: 'https://schema.org/Psychiatry',
    },
    {
      '@type': 'MedicalCondition',
      name: '双極性障害',
      alternateName: '躁うつ病',
      relevantSpecialty: 'https://schema.org/Psychiatry',
    },
    {
      '@type': 'MedicalCondition',
      name: '発達障害',
      alternateName: 'ADHD・ASD・自閉スペクトラム症・注意欠如多動症',
      relevantSpecialty: 'https://schema.org/Psychiatry',
    },
  ],
};
