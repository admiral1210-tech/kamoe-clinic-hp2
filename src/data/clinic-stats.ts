/**
 * かもめクリニック グループ・かもめ1 共通統計データ
 *
 * サイト内の実績数値はこのファイルから参照する。
 * 数値を更新する場合はここだけを書き換えれば全ページに反映される。
 *
 * 最終更新: 2025年12月時点の数値
 */

/** グループ全体の統計（全院合計）*/
export const GROUP_STATS = {
  /** 2025年12月時点のグループ患者数 */
  patientCount: '約1500名',
  /** グループ年間看取り数 */
  annualDeathCount: '約120名',
  /** 拠点数表記（「院」を採用） */
  locationCount: '大阪市内6院',
  /** 拠点数（数値） */
  locationNumber: 6,
  /** 開院年 */
  foundedYear: '2017年',
  /** 常勤医師数 */
  doctorCountFulltime: 13,
  /** 常勤・非常勤含む精神科専門医数 */
  psychiatristCount: 8,
} as const;

/** かもめ1（本院）の統計 */
export const KAMOME1_STATS = {
  /** 2025年1月の患者数 */
  patientCount2025Jan: '220名',
  /** 2025年12月の患者数 */
  patientCount2025Dec: '450名',
  /** 年間看取り数 */
  annualDeathCount: '約50名',
} as const;
