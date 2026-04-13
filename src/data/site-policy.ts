/**
 * サイト運用ポリシー・案内文 一元管理
 *
 * 【運用ポリシー】
 * - 新HP (kamome-clinic.net): かもめクリニック公式ホームページ。
 *                             訪問診療の詳細情報・診療案内・費用・アクセス・医師紹介など
 *                             クリニックの正式情報を掲載。
 *                             お知らせ・院長コラム・スタッフ記事など随時の情報発信も新HPで行う。
 * - 旧サイト (www.kamome-clinic.net): MIGRATION_START 以前の過去記事のアーカイブとして参照可能。
 *                                     新規投稿は行わない。旧サイトには新HPへの誘導バナーを設置する。
 *
 * 【投稿先ルール（確定）】
 * - 休診・診療体制変更のお知らせ → 新HP のみ
 * - 院長コラム・スタッフ記事       → 新HP のみ
 * - 採用・イベント情報             → 新HP のみ
 * - 過去記事の修正                 → 旧サイトのみ（URLを変えない）
 * - 重要なお知らせ（緊急）         → 新HP を優先。必要に応じ旧サイトにも短文掲載
 */

/** 新HPでの情報発信開始時期（表示用ラベル） */
export const MIGRATION_START = '2025年4月';

/** 旧サイト（WordPress トップ）の URL */
export const OLD_SITE_URL = 'https://www.kamome-clinic.net/';

/** 旧ブログ（WordPress）の URL（過去記事アーカイブ参照用） */
export const OLD_BLOG_URL = 'https://www.kamome-clinic.net/blog/';

/** 新HP の URL */
export const NEW_HP_URL = 'https://kamome-clinic.net';

/** 新HP ブログ（お知らせ）の URL */
export const NEW_BLOG_URL = 'https://kamome-clinic.net/blog';

/** 旧ブログ活用の運用ポリシー（確定文） */
export const OLD_BLOG_USAGE_POLICY =
  '新HP（kamome-clinic.net）を公式情報の発信元とし、旧ブログ（www.kamome-clinic.net/blog）は過去記事アーカイブとして案内する。新規投稿・最新情報は新HP側で継続して発信する。';

// ─────────────────────────────────────────────────────────────────
// 旧ブログ → 新HP への案内文（旧サイト埋め込み用）
// ─────────────────────────────────────────────────────────────────

/** 旧ブログ ヘッダーバナー用：短文 */
export const OLD_TO_NEW_SHORT =
  '公式ホームページをリニューアルしました。最新情報・診療案内は新サイトへ';

/** 旧ブログ サイドバー/フッターウィジェット用：詳細文 */
export const OLD_TO_NEW_DETAIL =
  '公式ホームページが新しくなりました。お知らせ・最新情報の発信も新しい公式サイト（kamome-clinic.net）で' +
  '行っています。訪問診療の流れ・費用・診療内容・対応エリア・医師紹介など、' +
  'クリニックの正確な情報はこちらからご確認ください。' +
  'ご不明な点はお電話（06-4301-7871）またはお問い合わせフォームでお気軽にどうぞ。';

// ─────────────────────────────────────────────────────────────────
// 新HP → 旧ブログ への案内文（新サイト導線用）
// ─────────────────────────────────────────────────────────────────

/** 新HP ナビゲーション用：短文 */
export const NEW_TO_OLD_SHORT = '旧ブログ（過去記事）はこちら';

/** 新HP 補足案内用：詳細文 */
export const NEW_TO_OLD_DETAIL =
  '過去に公開した記事は旧ブログ（www.kamome-clinic.net/blog）で引き続きご覧いただけます。' +
  '最新のお知らせ・診療案内は新しい公式ホームページ（kamome-clinic.net）をご確認ください。';

/** 旧ブログ活用導線の設置位置 */
export type OldBlogLinkPlacement =
  | 'new-hp-header-clinic-guide'
  | 'new-hp-footer-secondary-links'
  | 'old-blog-header-banner'
  | 'old-blog-sidebar-or-footer-widget';

/** 導線設置位置（新HP側・確定2箇所） */
export const NEW_HP_OLD_BLOG_LINK_PLACEMENTS: OldBlogLinkPlacement[] = [
  'new-hp-header-clinic-guide',
  'new-hp-footer-secondary-links',
];

/** 導線設置位置（旧ブログ側・確定2箇所） */
export const OLD_BLOG_NEW_HP_LINK_PLACEMENTS: OldBlogLinkPlacement[] = [
  'old-blog-header-banner',
  'old-blog-sidebar-or-footer-widget',
];
