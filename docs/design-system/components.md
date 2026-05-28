# コンポーネント API 一覧

> 詳細な使い分けルールは `.cursor/rules/component-rules.mdc` を参照。  
> カラートークンは `docs/design-system/colors.md`、スペーシングは `docs/design-system/spacing.md` を参照。

---

## UI コンポーネント（`src/components/ui/`）

### Button

`src/components/ui/Button.astro`

| prop | 型 | デフォルト | 説明 |
|---|---|---|---|
| `variant` | `'primary'│'secondary'│'tertiary'│'link'│'line'│'floatingCtaTel'│'floatingCtaForm'` | `'secondary'` | ボタンスタイル |
| `text` | string | slot | ボタンラベル（HTMLも可） |
| `href` | string | — | リンク先（指定なし+`type`なし → `<a>` タグ） |
| `type` | `'button'│'submit'│'reset'` | — | 指定すると `<button>` タグになる |
| `icon` | string | — | astro-icon の名前（例: `'tabler:phone'`）|
| `iconBefore` | boolean | variant依存 | `true` でアイコンをテキスト左に配置 |
| `target` | string | — | `_blank` 等（自動で `rel="noopener noreferrer"` 付与） |
| `class` | string | — | 追加クラス（twMerge で結合） |

**バリアント早見表**:

| variant | 見た目 | 典型用途 |
|---|---|---|
| `primary` | 青塗り・白テキスト | メインCTA（電話・予約） |
| `secondary` | ボーダーのみ・透明背景 | サブCTA |
| `tertiary` | ボーダーなし・ミュートテキスト | 低優先リンク |
| `link` | テキストのみ・ホバーでprimary色 | 本文中インラインリンク |
| `line` | LINE緑塗り・白テキスト | LINE公式アカウント誘導 |
| `floatingCtaTel` | 青塗り・pill形状 | Hero内電話CTA |
| `floatingCtaForm` | 白塗り・primaryボーダー・pill形状 | Hero内フォームCTA |

---

### Headline

`src/components/ui/Headline.astro`  
汎用ウィジェット（Features/FAQs/Steps等）の見出し。中央揃えがデフォルト。

| prop | 型 | デフォルト | 説明 |
|---|---|---|---|
| `title` | string | slot | セクションタイトル（HTMLも可） |
| `subtitle` | string | slot | サブタイトル |
| `tagline` | string | — | 小見出し（タイトル上） |
| `classes.container` | string | `'max-w-3xl'` | 外側コンテナの追加クラス |
| `classes.title` | string | `'text-3xl md:text-4xl'` | タイトルの追加クラス |
| `classes.subtitle` | string | `'text-xl'` | サブタイトルの追加クラス |
| `classes.tagline` | string | — | tagline の追加クラス |

デフォルト: tagline = `text-secondary`, title = `text-heading`, subtitle = `text-muted`

---

### PageSectionHeading

`src/components/ui/PageSectionHeading.astro`  
診療ページのインラインセクション用見出し。`clinicalSectionHeadline` トークンを内部で使用。

| prop | 型 | デフォルト | 説明 |
|---|---|---|---|
| `title` | string | 必須 | セクションタイトル（HTMLも可） |
| `tagline` | string | — | 小見出し（タイトル上） |
| `subtitle` | string | — | サブタイトル |
| `class` | string | — | 外側コンテナへの追加クラス |
| `taglineDecorative` | boolean | `false` | `true` でtaglineに `aria-hidden="true"` |

スタイル: tagline = `text-xs font-semibold text-primary`, title = `text-2xl md:text-3xl font-bold text-heading`

---

### WidgetWrapper

`src/components/ui/WidgetWrapper.astro`  
全セクション（`<section>`）の標準ラッパー。intersect フェードを自動付与。

| prop | 型 | デフォルト | 説明 |
|---|---|---|---|
| `id` | string | — | アンカーリンク用ID |
| `isDark` | boolean | `false` | 背景ダーク化 |
| `containerClass` | string | `''` | 内側divへの追加クラス |
| `bg` | string (HTML) | — | 背景HTMLを直接渡す |
| `as` | HTMLTag | `'section'` | レンダリング要素 |
| `scrollMarginClass` | string | `'scroll-mt-[72px]'` | アンカースクロールオフセット |

---

### PageTocNav

`src/components/ui/PageTocNav.astro`  
診療ページのスティッキー目次ナビ。ヘッダー下に固定される。

| prop | 型 | デフォルト | 説明 |
|---|---|---|---|
| `items` | `{label: string, href: string}[]` | 必須 | TOCアイテム一覧 |
| `class` | string | — | 追加クラス |

`WidgetWrapper` の `scrollMarginClass` は `clinicalAnchorScrollMargin`（`scroll-mt-32`）に変更すること。

---

### FaqAccordionList

`src/components/ui/FaqAccordionList.astro`  
アコーディオン形式のFAQリスト。`FAQs` ウィジェットと独立して使用可。

| prop | 型 | 説明 |
|---|---|---|
| `items` | `{question: string, answer: string}[]` | FAQアイテム配列 |
| `class` | string | 追加クラス |

---

### Form

`src/components/ui/Form.astro`  
汎用フォームコンポーネント。  
**必須**: プライバシーポリシー同意チェックボックスを含めること（`.cursorrules` 規約）。

---

## ウィジェット（`src/components/widgets/`）

### Hero

`src/components/widgets/Hero.astro`

| prop | 型 | デフォルト | 説明 |
|---|---|---|---|
| `title` | string | slot | H1見出し |
| `subtitle` | string | slot | サブテキスト |
| `tagline` | string | — | 小見出し（H1上） |
| `titleClass` | string | 5xl/6xl系 | タイトルクラス（診療ページは `clinicalHeroTitleClass`） |
| `subtitleClass` | string | `text-xl text-muted` | サブタイトルクラス |
| `taglineClass` | string | — | taglineクラス（診療ページは `clinicalHeroTaglineClass`） |
| `actions` | `CallToAction[]` | slot | CTAボタン配列 |
| `image` | `{src, alt}` | slot | ヒーロー画像 |
| `imageFirst` | boolean | `false` | 画像を左/上に配置 |
| `sectionPaddingClass` | string | pt-12/pt-20 | セクション上余白（`pb-*` は指定しない） |
| `textBlockPaddingClass` | string | `'pb-hero-content-pb'` | テキストブロック下余白 |
| `imageContainerClass` | string | `'max-w-5xl'` | 画像コンテナ幅 |
| `id` | string | — | セクションID |
| `bg` | string (HTML) | slot | 背景HTML |

---

### Features

`src/components/widgets/Features.astro`

| prop | 型 | デフォルト | 説明 |
|---|---|---|---|
| `title` | string | slot | 見出し |
| `subtitle` | string | slot | サブ見出し |
| `tagline` | string | slot | tagline |
| `items` | `Item[]` | `[]` | アイテム一覧（icon, title, description, link） |
| `columns` | number | variant依存 | グリッド列数（grid:2, cards:3） |
| `variant` | `'grid'│'cards'│'withImage'` | `'grid'` | レイアウト種別 |
| `defaultIcon` | string | — | 全アイテム共通アイコン |
| `numberedTitles` | boolean | `false` | タイトルに番号を付ける |
| `image` | `{src, alt}` | — | withImage時の画像 |
| `classes` | `{headline?, container?, ...}` | — | クラス上書き |
| `id` | string | — | アンカーID |
| `isDark` | boolean | `false` | ダーク背景 |
| `scrollMarginClass` | string | — | WidgetWrapperに渡す |

---

### FAQs

`src/components/widgets/FAQs.astro`

| prop | 型 | 説明 |
|---|---|---|
| `title` | string | セクション見出し |
| `tagline` | string | tagline |
| `items` | `Item[]` | Q&Aアイテム（title=質問, description=回答） |
| `classes` | `{headline?}` | Headline クラス上書き |
| `id` | string | アンカーID |
| `scrollMarginClass` | string | WidgetWrapperに渡す |

診療ページでは `classes={{ headline: clinicalSectionHeadline }}` を必ず指定する。

---

### ClinicalPageClosing

`src/components/widgets/ClinicalPageClosing.astro`

診療ページの末尾に必ず配置するクロージングCTAウィジェット。  
props不要（内部でクリニック連絡先データを自動取得）。

---

### ConsultCTA

`src/components/widgets/ConsultCTA.astro`

汎用の受診案内CTAウィジェット。

| prop | 型 | 説明 |
|---|---|---|
| `title` | string | タイトル |
| `subtitle` | string | サブタイトル |
| `isDark` | boolean | ダーク背景 |

---

### Header

`src/components/widgets/Header.astro`

通常は `PageLayout.astro` が自動で挿入するため、直接呼び出さない。

| prop | 型 | デフォルト | 説明 |
|---|---|---|---|
| `links` | `NavLink[]` | `navigation.ts` | ナビゲーションリンク |
| `actions` | `CallToAction[]` | — | ヘッダーCTAボタン |
| `isSticky` | boolean | `true` | スティッキーヘッダー |
| `isDark` | boolean | `false` | ダーク初期スタイル |
| `isFullWidth` | boolean | `false` | 全幅レイアウト |
| `showToggleTheme` | boolean | `false` | テーマ切り替えボタン表示（light:only では非表示推奨） |
| `position` | `'left'│'center'│'right'` | `'center'` | ロゴ位置 |

---

### Footer

`src/components/widgets/Footer.astro`

通常は `PageLayout.astro` が自動で挿入するため、直接呼び出さない。

| prop | 型 | デフォルト | 説明 |
|---|---|---|---|
| `theme` | `'light'│'dark'` | `'light'` | フッターテーマ |
| `links` | `FooterColumn[]` | — | フッターナビゲーション |
| `secondaryLinks` | `{text, href}[]` | — | プライバシーポリシー等 |
| `socialLinks` | `{ariaLabel, icon, href}[]` | — | SNSリンク |
| `footNote` | string | — | 最下部注記 |

---

## コンポーネント選択フロー

```
どのコンポーネントを使うか？
│
├── ページのメインヒーロー → Hero.astro
│   └── 診療ページ → clinicalHeroTitleClass / clinicalHeroSectionPadding 使用
│
├── セクションの見出し
│   ├── 汎用ページ / ウィジェット（Features等） → Headline.astro
│   ├── 診療ページ・ウィジェット見出し → classes={{ headline: clinicalSectionHeadline }}
│   └── 診療ページ・インラインセクション → PageSectionHeading.astro
│
├── CTAボタン
│   ├── 通常のCTA → Button.astro（variant 指定）
│   ├── ページ固定浮動CTA → PageLayout の floating-cta スロット
│   └── ページ末尾クロージング → ClinicalPageClosing.astro
│
├── セクションラッパー → WidgetWrapper.astro
│
├── Q&A → FAQs.astro（+ clinicalSectionHeadline）
│
└── 機能・特徴一覧 → Features.astro（+ clinicalSectionHeadline）
```
