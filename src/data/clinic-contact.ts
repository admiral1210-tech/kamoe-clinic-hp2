/**
 * クリニックの連絡先・所在地（NAP）の単一ソース。
 * フッター・固定CTA など表示箇所はここを参照する。
 */
export const CLINIC_CONTACT = {
  postalCode: '〒552-0004',
  addressLine1: '大阪市港区夕凪2丁目16-9',
  addressLine2: 'icrossAMポートビル 4F-B',
  telDisplay: '06-4301-7871',
  /** tel: リンク用（ハイフンなし） */
  telHref: 'tel:0643017871',
  /** 地域医療連携部（医療・介護関係者向け）直通 */
  telRenkeiDisplay: '06-4301-7883',
  telRenkeiHref: 'tel:0643017883',
  /** 採用・一般問い合わせ共通の代表メール */
  email: 'kamome@kamome-clinic.net',
  hoursPrimary: '平日・祝日 9:00〜17:00',
  hoursEmergency: '緊急往診 24時間365日',
} as const;

/** mailto: URL（任意で subject を付与） */
export function clinicMailtoHref(subject?: string): string {
  const addr = CLINIC_CONTACT.email;
  if (!subject) return `mailto:${addr}`;
  return `mailto:${addr}?subject=${encodeURIComponent(subject)}`;
}

/** schema.org 用の郵便番号（ハイフン付き）。表示用 postalCode から導出 */
export function clinicPostalCodeForSchema(): string {
  return CLINIC_CONTACT.postalCode.replace(/^〒\s*/, '');
}

/**
 * schema.org PostalAddress（JSON-LD）。
 * addressLine1 の先頭「大阪市港区」を locality と分離し、町域＋建物を streetAddress にまとめる。
 */
export function clinicPostalAddressJsonLd() {
  const locality = '大阪市港区';
  const streetBase = CLINIC_CONTACT.addressLine1.replace(/^大阪市港区/, '').trim();
  return {
    '@type': 'PostalAddress' as const,
    streetAddress: `${streetBase} ${CLINIC_CONTACT.addressLine2}`,
    addressLocality: locality,
    addressRegion: '大阪府',
    postalCode: clinicPostalCodeForSchema(),
    addressCountry: 'JP',
  };
}
