# カラーパレット（SSOT）

> **更新方法**: `src/components/CustomStyles.astro` の `:root` を変更し、このファイルを同時に更新する。  
> Tailwind クラス名は `tailwind.config.js` の `theme.extend.colors` を参照。

---

## ブランドカラー

| トークン名 | CSS変数 | Tailwindクラス | hex相当 | rgb値 |
|---|---|---|---|---|
| primary | `--aw-color-primary` | `text-primary` / `bg-primary` | `#1850A3` | rgb(24 80 163) |
| primary-tint | `--aw-color-primary-tint` | — | `#1850A3` @ 6% | rgb(24 80 163 / 6%) |
| secondary | `--aw-color-secondary` | `text-secondary` / `bg-secondary` | `#0A2864` | rgb(10 40 100) |
| accent | `--aw-color-accent` | `text-accent` / `bg-accent` | `#B44A26` | rgb(180 74 38) |

### 使用コンテキスト

**primary（`#1850A3`）**
- メインCTAボタン背景（`btn-primary`）
- ナビゲーション現在地インジケーター（`.aw-link-active`）
- `h2` の左ボーダー（グローバル適用）
- tagline テキスト（診療ページ: `text-primary`）
- フォーカスリング（`ring-primary/60`）
- 選択（selection）背景の 15% tint

**secondary（`#0A2864`）**
- tagline テキスト（汎用ウィジェット: `text-secondary`）
- primaryボタンのホバー背景

**accent（`#B44A26`）**
- 装飾的アクセント（数値強調・バッジ等）
- **CTAテキストには使わない**（十分なコントラスト確保が前提）
- WCAG AA: ベージュ背景 `rgb(253 248 241)` 上でコントラスト比 5.07:1 達成

---

## テキストカラー

| トークン名 | CSS変数 | Tailwindクラス | hex相当 | コントラスト比（ベージュ背景） |
|---|---|---|---|---|
| heading | `--aw-color-text-heading` | `text-heading` | `#0A1937` | ≈ 11.5:1 |
| default | `--aw-color-text-default` | `text-default` | `#192D4B` | ≈ 8.7:1 |
| muted | `--aw-color-text-muted` | `text-muted` | `#2D4169` | ≈ 5.5:1 |

### 使用コンテキスト

| トークン | 用途 |
|---|---|
| `text-heading` | h1〜h6、セクションタイトル、見出し全般 |
| `text-default` | 本文、説明文、リストアイテム |
| `text-muted` | サブテキスト、補足説明、captionより重要な副情報 |

### 禁止テキストクラス（本文への使用禁止）

| クラス | 理由 |
|---|---|
| `text-gray-900` / `text-slate-900` | `text-heading` で代替 |
| `text-gray-700` / `text-slate-700` | `text-default` で代替 |
| `text-gray-400` 以下（本文用途） | コントラスト不足（caption・装飾専用） |

> `CustomStyles.astro` が `text-gray-400/500/600` を強制上書きしてコントラストを補正しているが、
> **新規コードではそれに依存せず `text-muted` / `text-default` を使う**。

---

## 背景カラー

| トークン名 | CSS変数 | Tailwindクラス | hex相当 | 用途 |
|---|---|---|---|---|
| bg-page | `--aw-color-bg-page` | `bg-page` / `bg-light` | `#FDF8F1` | ページ全体の背景（ウォームベージュ） |
| bg-page-dark | `--aw-color-bg-page-dark` | `bg-dark` | `#0F172A` | ダークモード背景（light:only 運用のため実質未使用） |
| bg-header-dark | `--aw-color-bg-header-dark` | — | `#030621` @ 90% | ヘッダースクロール後のダーク背景（内部使用） |

### セクション背景パターン

| 用途 | 推奨クラス |
|---|---|
| 通常セクション | `bg-page`（デフォルト、指定不要） |
| 強調セクション | `bg-white` |
| プライマリ淡め | `bg-primary/5`（= `bg-blue-50` 相当） |
| CTA / クロージング | `WidgetWrapper isDark` |

---

## ブランド固定カラー

| 名前 | CSS変数 | hex値 | 用途 |
|---|---|---|---|
| LINE | `--aw-color-line` | `#06C755` | LINEブランドボタン背景 |
| LINE hover | `--aw-color-line-hover` | `#05A847` | LINEボタンホバー |

> これらは外部ブランドカラーのため固定値のまま変更しない。

---

## WCAG AA コントラスト確認表

ベージュ背景 `rgb(253 248 241)` (≈ `#FDF8F1`) 上での計算値。

| テキスト色 | コントラスト比 | AA 通常テキスト (4.5:1) | AA 大テキスト (3:1) |
|---|---|---|---|
| `text-heading` (#0A1937) | ≈ 11.5:1 | ✅ 合格 | ✅ 合格 |
| `text-default` (#192D4B) | ≈ 8.7:1 | ✅ 合格 | ✅ 合格 |
| `text-muted` (#2D4169) | ≈ 5.5:1 | ✅ 合格 | ✅ 合格 |
| `text-primary` (#1850A3) | ≈ 5.4:1 | ✅ 合格 | ✅ 合格 |
| `text-accent` (#B44A26) | ≈ 5.07:1 | ✅ 合格（装飾用途のみ） | ✅ 合格 |
| `text-gray-400`（補正前） | ≈ 2.1:1 | ❌ 不合格 | — |
| `text-gray-400`（補正後） | ≈ 5.6:1 | ✅ CustomStyles が上書き | ✅ 合格 |

---

## グレースケール補正

`CustomStyles.astro` がTailwindの薄いグレーをベージュ背景でも読めるよう上書きしている。

```css
.text-gray-400 { color: rgb(90, 100, 118); }   /* 5.6:1 on beige */
.text-gray-500 { color: rgb(85, 94, 110); }    /* 5.0:1 on beige */
.text-gray-600 { color: rgb(60, 70, 88); }     /* 6.5:1 on beige */
```

これに依存した実装は避け、セマンティックトークン（`text-muted` 等）を優先する。

---

## セレクション・インタラクション

| 状態 | 色 |
|---|---|
| テキスト選択背景 | `rgb(24 80 163 / 15%)` |
| テキスト選択文字 | `rgb(10 25 55)` = heading トークン |
| フォーカスリング | `ring-primary/60` （= `rgb(24 80 163 / 60%)`） |
| 浮動CTAフォーカス輪郭 | `outline: 3px solid white` + `box-shadow: 0 0 0 5px var(--aw-color-primary)` |

---

## ダークモード変数（保険用）

`light:only` 運用のため通常は使われないが、`.dark` クラスが万が一付与された場合のフォールバック。

| CSS変数 | ダーク時の値 |
|---|---|
| `--aw-color-bg-page` | `rgb(15 23 42)` (slate-900相当) |
| `--aw-color-text-heading` | `rgb(226 232 240)` (slate-200、コントラスト 11.2:1) |
| `--aw-color-text-default` | `rgb(203 213 225)` (slate-300、コントラスト 8.7:1) |
| `--aw-color-text-muted` | `rgb(148 163 184)` (slate-400、コントラスト 5.2:1) |
