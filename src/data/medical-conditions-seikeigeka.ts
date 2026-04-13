/**
 * 整形外科訪問診療LPの MedicalCondition JSON-LD 用データ（単一ソース）
 */
export interface SeikeigekaMedicalCondition {
  name: string;
  alternateName?: string;
}

export const seikeigekaMedicalConditions: SeikeigekaMedicalCondition[] = [
  { name: '変形性膝関節症' },
  { name: '骨粗しょう症', alternateName: '大腿骨頸部骨折・脊椎圧迫骨折' },
  { name: '腰部脊柱管狭窄症' },
  { name: '変形性股関節症' },
];

const ORTHOPEDIC = 'https://schema.org/Orthopedic';

export function seikeigekaMedicalConditionsJsonLd() {
  return seikeigekaMedicalConditions.map((c) => ({
    '@context': 'https://schema.org',
    '@type': 'MedicalCondition',
    name: c.name,
    ...(c.alternateName ? { alternateName: c.alternateName } : {}),
    relevantSpecialty: ORTHOPEDIC,
  }));
}
