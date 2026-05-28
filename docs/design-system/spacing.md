# スペーシング デザインシステム

このドキュメントはスペーシングトークンの**唯一の真実（Single Source of Truth）**です。
CSS変数・Tailwindトークン・コンポーネントを変更する前に、必ずここを先に更新してください。

---

## 基本原則

### 8ptグリッド

すべての余白は **8pt（= 0.5rem at base 16px）の倍数** で構成します。
このサイトのベースフォントは `17px（mobile）/ 19px（tablet）/ 20px（desktop）` のため、
rem 値は `0.5rem 刻み` で管理し、px は参考値として記載します。

| ステップ | rem    | px（base 16px） |
|---------|--------|----------------|
| 1       | 0.5rem | 8px            |
| 2       | 1rem   | 16px           |
| 3       | 1.5rem | 24px           |
| 4       | 2rem   | 32px           |
| 6       | 3rem   | 48px           |
| 8       | 4rem   | 64px           |
| 10      | 5rem   | 80px           |

---

## セクション責任分担の原則

```
[ Hero セクション ]
  ├─ 上 padding: Hero が保持（ヘッダー高さ分の相殺を含む）
  ├─ コンテンツ下端: --aw-spacing-hero-content-pb（最小限の息継ぎ）
  └─ 下 padding: 0（意図的にゼロ）← ここが重要

[ 空白（ギャップ） ]
  └─ 次セクションの pt（= --aw-spacing-section-y の上半分）のみが担当

[ 次セクション（WidgetWrapper / インライン section） ]
  ├─ 上 padding: --aw-spacing-section-y
  └─ 下 padding: --aw-spacing-section-y
```

**「誰が余白の責任を持つか」を一箇所に集中させることで、積算バグをアーキテクチャレベルで防ぐ。**

---

## トークン定義（実装値）

### CSS変数（`src/components/CustomStyles.astro`）

| 変数名                          | mobile  | md（768px+） | lg（1024px+） | 用途                                          |
|---------------------------------|---------|-------------|--------------|-----------------------------------------------|
| `--aw-spacing-section-y`        | 2rem    | 3rem        | 4rem         | WidgetWrapper・インラインsectionの上下 padding  |
| `--aw-spacing-section-x`        | 1rem    | 1.5rem      | 1.5rem       | 水平 padding（変更なし）                        |
| `--aw-spacing-hero-content-pb`  | 1.5rem  | 2rem        | 2rem         | Hero テキストブロック下端の息継ぎ余白            |

#### 実装例（`src/components/CustomStyles.astro`）

```css
:root {
  --aw-spacing-section-y:       2rem;   /* mobile */
  --aw-spacing-section-x:       1rem;   /* mobile */
  --aw-spacing-hero-content-pb: 1.5rem; /* mobile */
}
@media (min-width: 768px) {
  :root {
    --aw-spacing-section-y:       3rem;
    --aw-spacing-section-x:       1.5rem;
    --aw-spacing-hero-content-pb: 2rem;
  }
}
@media (min-width: 1024px) {
  :root {
    --aw-spacing-section-y: 4rem;
  }
}
```

#### 変更履歴

- `--aw-spacing-section-y`（md）: `4rem` → `3rem`
  - 旧値では Hero との合計ギャップが md で最大 224px になっていた
  - Hero pb をゼロ化した後の次セクション上端として 3rem（48px 相当）が適切
- `--aw-spacing-section-y`（lg）: `5rem` → `4rem`
  - 同様の理由。lg でも視覚的に重すぎた
- `--aw-spacing-hero-content-pb`: 新規追加
  - Hero 内テキストブロックの下端に「コンテンツが終わった感」を出す最小限の余白
  - `pb-6 md:pb-8` / `pb-10 md:pb-16`（旧 textBlockPad ハードコード値）を置き換え
  - section 外部に漏れない

### Tailwindトークン（`tailwind.config.js`）

| クラス名                              | CSS変数                        | 用途                                     |
|--------------------------------------|-------------------------------|------------------------------------------|
| `py-section-y` / `pt-section-y` / `pb-section-y` | `--aw-spacing-section-y`       | 全セクションの上下余白                    |
| `px-section-x`                       | `--aw-spacing-section-x`       | 全セクションの水平余白                    |
| `pb-hero-content-pb`                 | `--aw-spacing-hero-content-pb` | Hero テキストブロック専用                 |

#### 実装例（`tailwind.config.js`）

```js
spacing: {
  'section-y':        'var(--aw-spacing-section-y)',
  'section-x':        'var(--aw-spacing-section-x)',
  'hero-content-pb':  'var(--aw-spacing-hero-content-pb)',
},
```

---

## コンポーネント別ガイド

### `Hero.astro`（`src/components/widgets/Hero.astro`）

```
sectionPad（section全体の padding）
  ├─ 上: pt-8 md:pt-12（imageFirst）または pt-12 md:pt-20（通常）
  └─ 下: 0（pb を持たない）← 必須

textBlockPad（テキストブロックの内部 padding）
  └─ 下: pb-hero-content-pb のみ（= 1.5rem mobile / 2rem md+）
```

**使用禁止**: `sectionPaddingClass` に `pb-*` を渡さないこと。
Hero の下余白はゼロが正解。余白が必要なら次セクション側の `pt-*` で調整する。

デフォルト値：

| Prop                  | デフォルト（imageFirst=false）     | デフォルト（imageFirst=true）      |
|-----------------------|-----------------------------------|-----------------------------------|
| `sectionPaddingClass` | `'pt-12 md:pt-20'`                | `'pt-8 md:pt-12'`                 |
| `textBlockPaddingClass` | `'pb-hero-content-pb'`          | `'pb-hero-content-pb'`            |

### `WidgetWrapper.astro`（`src/components/ui/WidgetWrapper.astro`）

```
py-section-y（上下ともトークンに従う）
```

変更なし。`--aw-spacing-section-y` の値変更で全 Widget 系が自動更新される。

### `PageTocNav.astro`（診療ページ・index）

```
py-2（8px padding）← py-1.5（6px）から修正済み
```

8ptグリッドに合わせ `py-2` に統一。

### 診療ページ専用トークン（`src/constants/clinical-page-ui.ts`）

```ts
clinicalHeroSectionPadding = 'pt-10 md:pt-16'
  // pb は持たない（原則に従う）

clinicalHeroTextBlockPadding = 'pb-2 md:pb-3'
  // ページ内部の微調整として許容（Hero 外に漏れない）
  // pb-hero-content-pb より小さい値だが、PageTocNav が直下に続くため意図的
```

---

## インラインセクションの値基準

`<section>` タグを直書きする場合は以下の値のみ使用する：

| 用途            | クラス        | rem    | 備考                           |
|----------------|--------------|--------|-------------------------------|
| コンパクト      | `py-4`        | 1rem   | リスト・補足コンテンツ           |
| 標準（小）      | `py-6`        | 1.5rem | モバイル主体のセクション         |
| 標準           | `py-8`        | 2rem   | = section-y mobile と同値      |
| 大             | `py-section-y` | CSS変数 | 原則こちらを優先               |

**使用禁止値**: `py-5`（20px）/ `py-7`（28px）/ `py-1.5`（6px）
→ これらは 8ptグリッド外。最寄りの値に置き換えること。

---

## 余白計算（md時・base 20px）

### 旧アーキテクチャ（トップページ）

```
Hero sectionPad 下:    py-12 の下半分 = 3rem = 60px
Hero textBlockPad 下:  pb-10          = 2.5rem = 50px（旧デフォルト）
次セクション 上:        --aw-spacing-section-y = 4rem = 80px（旧md値）
────────────────────────────────────────
合計                                  = 190px  ← 過大
```

### 新アーキテクチャ（全ページ共通）

```
Hero sectionPad 下:    0
Hero textBlockPad 下:  pb-hero-content-pb = 2rem = 40px（md時）
次セクション 上:        --aw-spacing-section-y   = 3rem = 60px（新md値）
────────────────────────────────────────
合計                                     = 100px  ← 適切（≒ 96px = 8pt×12）
```

---

## 関連ファイル一覧

| ファイル                                      | 役割                         |
|----------------------------------------------|------------------------------|
| `docs/design-system/spacing.md`               | **唯一の真実（このファイル）** |
| `src/components/CustomStyles.astro`           | CSS変数の実装                 |
| `tailwind.config.js`                          | Tailwindトークンの実装        |
| `src/components/widgets/Hero.astro`           | Hero コンポーネント            |
| `src/components/ui/WidgetWrapper.astro`       | Widget ラッパー               |
| `src/constants/clinical-page-ui.ts`           | 診療ページ専用トークン         |
