# かもめクリニック 公式サイト

大阪市を中心に展開する24時間365日対応の在宅療養支援診療所「かもめクリニック」の公式ウェブサイトです。
内科・精神科・小児科（医療ケア児対応）の訪問診療情報を提供しています。

**本番サイト:** [https://kamome-clinic.net](https://kamome-clinic.net)

![Astro](https://img.shields.io/badge/Astro-5.x-FF5D01?style=flat-square&logo=astro&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.x-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-nginx%3Aalpine-2496ED?style=flat-square&logo=docker&logoColor=white)

---

## 技術スタック

| 区分 | 技術 |
|------|------|
| フレームワーク | [Astro 5](https://astro.build/)（ベース：[AstroWind](https://github.com/arthelokyo/astrowind)） |
| スタイル | [Tailwind CSS 3](https://tailwindcss.com/) |
| 言語 | TypeScript 5 |
| コンテンツ | MDX（`@astrojs/mdx`）、ブログ・お知らせ記事管理 |
| CMS | [Decap CMS](https://decapcms.org/)（`/admin` から操作） |
| SEO | `@astrolib/seo`、Sitemap（`@astrojs/sitemap`）、RSS |
| Web サーバー | nginx（`nginx/nginx.conf`）、Docker コンテナで静的配信 |
| Node バージョン | `^18.17.1 \|\| ^20.3.0 \|\| >= 21.0.0` |

---

## ディレクトリ構造（ルーティング）

```
/
├── src/
│   ├── pages/                  # ルーティング（ファイル名がそのままURLになる）
│   │   ├── index.astro         # / トップページ
│   │   ├── naika.astro         # /naika 内科
│   │   ├── seishinika.astro    # /seishinika 精神科
│   │   ├── shoninka.astro      # /shoninka 小児科
│   │   ├── houmon-shinryo.astro # /houmon-shinryo 訪問診療
│   │   ├── area-osaka.astro    # /area-osaka 対応エリア
│   │   └── [...blog]/          # /blog/* ブログ一覧・カテゴリ・タグ
│   ├── data/                   # クリニック固有データ（管理者が更新する設定ファイル）
│   │   ├── clinic-meta.ts      # Googleレビュー評価・患者数など JSON-LD 用データ
│   │   ├── faq-general.ts      # よくある質問データ
│   │   ├── osaka-wards.ts      # 対応エリア（大阪市各区）データ
│   │   └── site-policy.ts      # サイトポリシー関連データ
│   ├── components/             # UI コンポーネント（widgets / ui / blog / common）
│   ├── layouts/                # ページレイアウト
│   ├── assets/                 # 画像・スタイル（ビルド時に最適化）
│   ├── content/                # コンテンツコレクション定義（config.ts）
│   ├── utils/                  # ユーティリティ関数
│   ├── config.yaml             # サイト全体設定（サイト名・URL・SEO・テーマ）
│   └── navigation.ts           # ヘッダー・フッターナビゲーション定義
├── public/
│   ├── decapcms/               # Decap CMS 設定（config.yml・index.html）
│   ├── images/                 # 静的画像アセット
│   └── robots.txt
├── .github/workflows/actions.yaml  # CI/CD（Node 18/20/22 マトリクス）
├── nginx/nginx.conf                # Docker 本番環境用 nginx 設定
├── Dockerfile                      # マルチステージビルド（node → nginx:alpine）
├── docker-compose.yml
├── netlify.toml                    # Netlify デプロイ設定
├── vercel.json                     # Vercel Clean URL・キャッシュヘッダー設定
├── astro.config.ts
├── tailwind.config.js
└── package.json
```

---

## CI/CD 方針

GitHub Actions（`.github/workflows/actions.yaml`）により `main` ブランチへの push・PR で自動実行。

| ジョブ | 内容 |
|--------|------|
| `build` | Node 18 / 20 / 22 マトリクスでビルド互換性を確認 |
| `check` | Node 22 で型チェック + ESLint + Prettier を一括検証 |

---

## ブランチ方針

| ブランチ名 | 用途 |
|-----------|------|
| `main` | 本番リリース（直接 push 禁止） |
| `feature/*` | 新機能・ページ追加 |
| `fix/*` | バグ修正・コンテンツ修正 |
| `hotfix/*` | 本番障害の緊急対応 |

マージ条件：CI 全ジョブ green。コミット規約は [Conventional Commits](https://www.conventionalcommits.org/ja/) に準拠。

---

## パフォーマンス目標

Lighthouse（本番環境・モバイル計測）:

| Performance | Accessibility | Best Practices | SEO |
|:-----------:|:-------------:|:--------------:|:---:|
| 90 以上 | 100 | 100 | 100 |

主な最適化：静的生成（`output: 'static'`）・`astro-compress`・WebP 変換・`Cache-Control: immutable`。

---

## 旧ブログ活用ポリシー

新HP（`kamome-clinic.net`）を公式情報の発信元とし、旧ブログ（`www.kamome-clinic.net/blog`）は過去記事アーカイブとして案内します。新規投稿・最新情報は新HP側で継続して発信します。

### 案内文（新HP → 旧ブログ）

- 短文: `旧ブログ（過去記事）はこちら`
- 詳細文: `過去に公開した記事は旧ブログ（www.kamome-clinic.net/blog）で引き続きご覧いただけます。最新のお知らせ・診療案内は新しい公式ホームページ（kamome-clinic.net）をご確認ください。`

### 導線設置位置（確定）

- 新HP側（2箇所）:
  - ヘッダー「クリニック案内」配下
  - フッター `secondaryLinks`
- 旧ブログ側（2箇所）:
  - ヘッダーバナー
  - サイドバー/フッターウィジェット

---

## ライセンス

ベーステンプレート [AstroWind](https://github.com/arthelokyo/astrowind) は [MIT ライセンス](LICENSE.md)。
クリニック固有のコンテンツ・画像・ブランド素材の著作権はかもめクリニックに帰属します。無断転載・二次利用を禁じます。
