/**
 * かもめクリニック クリニック情報 一元管理ファイル
 *
 * ここに数値を入力するだけで、JSON-LDスキーマ・ページ表示の両方に反映されます。
 * null のままの項目はスキーマから自動的に除外されます（エラーになりません）。
 *
 * 更新手順:
 *   1. 下記の null を実際の値に書き換える
 *   2. ファイルを保存する（`npm run dev` 中であれば即時反映）
 */

// ===========================================================================
// 1. Googleビジネスプロフィール レビュー評価
//    → MedicalClinic JSON-LD の aggregateRating に使用
//    → リッチリザルト（★付きスニペット）でクリック率向上
//
//    確認方法: Googleマップ または Googleビジネスプロフィール管理画面
//    例: ratingValue: 4.8, reviewCount: 32
//
//    ⚠️ 医療広告ガイドライン上の注意（有効化前に必ず確認）:
//    Googleレビューは患者の体験談に相当し、医療法・医療広告ガイドライン（厚生労働省）の
//    規制対象です。原則として患者体験談の広告掲載は禁止されています（限定解除要件あり）。
//    有効化する場合は医療法第6条の5・医療広告ガイドラインを遵守し、
//    法務・顧問弁護士の確認を取ったうえで設定してください。
//    null のままであればトップページに一切表示されません（現在は安全な状態です）。
// ===========================================================================
export const googleReview = {
  ratingValue: null as number | null, // null = 非表示（医療広告ガイドライン確認後に設定）
  reviewCount: null as number | null, // null = 非表示（医療広告ガイドライン確認後に設定）
};

// ===========================================================================
// 2. 累計患者数・診察件数（開院以来）
//    → MedicalClinic description・ページ実績バナーに使用（E-E-A-T強化）
//    → 「9年間で約○万件」という形で表示
//
//    確認方法: 電子カルテ・院内統計データ
//    例: totalPatients: '約5,000名', totalVisits: '約3万件'
// ===========================================================================
export const cumulativeStats = {
  totalPatients: null as string | null, // TODO: 例 → '約5,000名'（開院以来の延べ患者数）
  totalVisits: null as string | null, // TODO: 例 → '約3万件'（開院以来の累計診察件数）
  yearsInOperation: 9, // 2017年開院・確定値
};

// ===========================================================================
// 3. スタッフ総人数
//    → MedicalClinic JSON-LD の numberOfEmployees に使用
//    → 組織規模の信頼性指標（E-E-A-T）
//
//    確認方法: 人事・給与管理データ（常勤・非常勤を区別して確認）
//    例: total: 52, nurses: 20, adminStaff: 10
// ===========================================================================
export const staffCount = {
  doctors: 13, // 常勤医師数・確定値
  nurses: null as number | null, // TODO: 例 → 20（常勤・非常勤合計）
  adminStaff: null as number | null, // TODO: 例 → 10（事務・コーディネーター）
  other: null as number | null, // TODO: その他スタッフ数
  total: null as number | null, // TODO: 例 → 52（全スタッフ合計）
};

// ===========================================================================
// 4. 各支院の開院年
//    → LocalBusiness JSON-LD の foundingDate に使用
//    → 支院ページ・ブランチスキーマに反映
//
//    確認方法: 各院の開設届・法人登記。公開情報のみ反映（第3・第4は公式ブログ）。
//    null は未入力（スキーマから除外）。推測で埋めないこと。
// ===========================================================================
export const branchFoundingYears = {
  main: 2017, // 本院（港区）・確定値
  /** 開業年は院内・開設届で要確認（公開情報に年なし） */
  branch2: null as number | null,
  /** 公式ブログ「かもめクリニック第3、かもめクリニック第4の案内」2021年8月開業 */
  branch3: 2021,
  /** 同上 2021年9月開業 */
  branch4: 2021,
  /** 開業年は院内・開設届で要確認 */
  branch5: null as number | null,
  /** 開業年は院内・開設届で要確認 */
  branch8: null as number | null,
};

// ===========================================================================
// ユーティリティ関数
// ===========================================================================

/**
 * AggregateRating スキーマオブジェクトを生成する。
 * ratingValue または reviewCount が null の場合は undefined を返す（スキーマから除外）。
 */
export function buildAggregateRating() {
  if (googleReview.ratingValue === null || googleReview.reviewCount === null) {
    return undefined;
  }
  return {
    '@type': 'AggregateRating',
    ratingValue: String(googleReview.ratingValue),
    reviewCount: String(googleReview.reviewCount),
    bestRating: '5',
    worstRating: '1',
  };
}

/**
 * numberOfEmployees スキーマオブジェクトを生成する。
 * total が設定されていれば詳細を、未設定なら医師数のみを返す。
 */
export function buildNumberOfEmployees() {
  if (staffCount.total !== null) {
    const parts = [
      `常勤医師${staffCount.doctors}名`,
      staffCount.nurses !== null ? `看護師${staffCount.nurses}名` : null,
      staffCount.adminStaff !== null ? `事務・コーディネーター${staffCount.adminStaff}名` : null,
    ]
      .filter(Boolean)
      .join('・');
    return {
      '@type': 'QuantitativeValue',
      value: staffCount.total,
      description: `スタッフ総数${staffCount.total}名（${parts}）`,
    };
  }
  // total 未設定時は医師数だけを返す（現状維持）
  return {
    '@type': 'QuantitativeValue',
    minValue: staffCount.doctors,
    description: `常勤医師${staffCount.doctors}名（内科・精神科・小児科）`,
  };
}

/**
 * 分院の foundingDate 文字列を返す。null の場合は undefined（スキーマから除外）。
 */
export function getBranchFoundingDate(branchKey: keyof typeof branchFoundingYears): string | undefined {
  const year = branchFoundingYears[branchKey];
  return year !== null ? String(year) : undefined;
}

/**
 * 累計実績の表示テキストを返す（どちらかが null の場合は null を返す）。
 */
export function getCumulativeText(): string | null {
  if (cumulativeStats.totalPatients && cumulativeStats.totalVisits) {
    return `開院以来${cumulativeStats.yearsInOperation}年・延べ患者数${cumulativeStats.totalPatients}・累計診察${cumulativeStats.totalVisits}`;
  }
  return null;
}

/** ヒーロー等の表示用。未設定・空文字のときは従来どおりの確定コピーを返す */
export function getCumulativePatientsDisplay(): string {
  const v = cumulativeStats.totalPatients;
  if (v != null && String(v).trim() !== '') return String(v).trim();
  return '1,000名';
}

export function getCumulativeVisitsDisplay(): string {
  const v = cumulativeStats.totalVisits;
  if (v != null && String(v).trim() !== '') return String(v).trim();
  return '1.2万件';
}
