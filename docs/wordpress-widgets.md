# 旧WordPress サイト向け 案内バナー設置ガイド

旧サイト（`www.kamome-clinic.net`）に設置する「新HPへの誘導バナー」の  
HTML テンプレートです。WordPress 管理画面からコピー＆ペーストで使えます。

---

## 設置場所（確定2箇所）

| # | 場所 | 用途 | 使うテンプレート |
|---|------|------|----------------|
| 1 | **ヘッダー固定バナー** | 全ページ上部に常時表示。最初に目に入る。 | [バナー用：短文](#1-ヘッダー固定バナー短文) |
| 2 | **サイドバー or フッターウィジェット** | 記事読了後・ページ下部で誘導。 | [ウィジェット用：詳細文](#2-サイドバーウィジェット詳細文) |

---

## テンプレート

### 1. ヘッダー固定バナー（短文）

**設置方法：**  
WordPress 管理画面 → 外観 → テーマエディター（または Customize）→  
ヘッダーテンプレート（`header.php`）の `<body>` 直後に追加。  
または「Advanced Custom Fields」「WP Insert」等のプラグインでヘッダーに挿入。

```html
<!-- かもめクリニック 新HP誘導バナー（ヘッダー固定） -->
<div style="
  background-color: #EFF6FF;
  border-bottom: 2px solid #3B82F6;
  padding: 10px 16px;
  text-align: center;
  font-size: 14px;
  font-family: sans-serif;
  line-height: 1.6;
">
  <span style="margin-right: 8px;">📢</span>
  <strong>公式ホームページをリニューアルしました。最新情報・診療案内は新サイトへ</strong>
  &nbsp;→&nbsp;
  <a
    href="https://kamome-clinic.net"
    target="_blank"
    rel="noopener noreferrer"
    style="
      color: #2563EB;
      text-decoration: underline;
      font-weight: bold;
    "
  >新しい公式サイトを見る</a>
</div>
<!-- /かもめクリニック 新HP誘導バナー -->
```

---

### 2. サイドバーウィジェット（詳細文）

**設置方法：**  
WordPress 管理画面 → 外観 → ウィジェット →  
サイドバー（またはフッター）エリアに「カスタム HTML」ウィジェットを追加し、  
以下のコードを貼り付ける。

```html
<!-- かもめクリニック 新HP誘導ウィジェット（サイドバー/フッター） -->
<div style="
  background-color: #F0F9FF;
  border: 1px solid #BAE6FD;
  border-left: 4px solid #0EA5E9;
  border-radius: 8px;
  padding: 16px;
  font-size: 14px;
  font-family: sans-serif;
  line-height: 1.7;
  margin-bottom: 20px;
">
  <p style="margin: 0 0 8px; font-weight: bold; font-size: 15px; color: #0369A1;">
    🏥 公式ホームページが新しくなりました
  </p>
  <p style="margin: 0 0 12px; color: #374151;">
    お知らせ・最新情報の発信も新しい公式サイト（kamome-clinic.net）で
    行っています。訪問診療の流れ・費用・診療内容・対応エリア・医師紹介など、
    クリニックの正確な情報はこちらからご確認ください。
    ご不明な点はお電話（06-4301-7871）またはLINEでお気軽にどうぞ。
  </p>
  <a
    href="https://kamome-clinic.net"
    target="_blank"
    rel="noopener noreferrer"
    style="
      display: inline-block;
      background-color: #0EA5E9;
      color: #ffffff;
      text-decoration: none;
      font-weight: bold;
      font-size: 14px;
      padding: 8px 18px;
      border-radius: 6px;
    "
  >新しい公式サイトへ →</a>
</div>
<!-- /かもめクリニック 新HP誘導ウィジェット -->
```

---

## 設置後の確認チェックリスト

- [ ] バナーがすべてのページのヘッダーに表示されているか
- [ ] リンクをクリックすると `kamome-clinic.net` に正しく遷移するか
- [ ] サイドバー/フッターウィジェットが記事ページに表示されているか
- [ ] スマートフォンで表示が崩れていないか

---

## 運用ルール（確定）

- **旧サイトへの新規投稿は行わない。** このバナーを設置することで、訪問者を新HPへ誘導する。
- **過去記事の修正は旧サイトで行う。** URL は変えない。
- **緊急のお知らせ**（休診など）は新HPのみに掲載。必要に応じ旧サイトに短文追記も可。
- **3か月後（2025年7月頃）** にアクセス状況を確認し、記事移植の要否を判断する。

---

_このファイルは `src/data/site-policy.ts` と対をなすドキュメントです。  
文言を変更する場合は `site-policy.ts` の定数も合わせて更新してください。_
