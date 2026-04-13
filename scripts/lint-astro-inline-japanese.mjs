#!/usr/bin/env node
/**
 * lint-astro-inline-japanese.mjs
 *
 * .astro ファイル内に日本語テキストが直書きされていないかチェックする。
 * コンテンツは src/content/copy/ja/*.json に移動し、
 * .astro ファイルからは import 経由で参照するのが規約。
 *
 * 検知対象:
 *   - フロントマター（---...---）内の const/let/var 宣言のうち、
 *     metadata / jsonLd* 以外のブロックに含まれる日本語文字列
 *   - テンプレート（HTML部分）の日本語テキスト（HTML属性値・本文）
 *
 * 除外対象:
 *   - metadata / jsonLd* / seoData 変数ブロック（SEOメタデータ・構造化データ）
 *   - コメント行（// ... / HTML コメント <!-- ... -->）
 *   - 行末インラインコメント // の日本語（コメント部分を除去して再判定）
 *   - Astro テンプレート式 {expr} の内側（インポート済みデータを参照）
 *   - style / script ブロック内（CSSコメント・JSコメントは対象外）
 *   - Astro.props 行（コンポーネントプロップ宣言のデフォルト値）
 *   - 行末コメント "// lint-jp-ignore" で個別行を抑制
 *
 * 使用方法:
 *   node scripts/lint-astro-inline-japanese.mjs [--strict]
 *   --strict: MIN_JP_CHARS を 1 に下げて全ての日本語を検知
 */

import { readFileSync, readdirSync, statSync } from 'fs';
import { join, relative } from 'path';
import { fileURLToPath } from 'url';

// ============================================================
// 設定
// ============================================================

/** フラグを立てる最低日本語文字数（短すぎる単語の誤検知を抑える） */
const MIN_JP_CHARS = process.argv.includes('--strict') ? 1 : 3;

/** フロントマターで許可する変数名の先頭一致パターン */
const ALLOWED_VAR_PREFIXES = ['metadata', 'jsonLd', 'seoData'];

/** チェック対象ディレクトリ（プロジェクトルート相対） */
const TARGET_DIR = 'src';

/** 除外するディレクトリ名 */
const EXCLUDE_DIRS = new Set(['node_modules', '.git', 'dist', '.astro']);

// ============================================================
// ユーティリティ
// ============================================================

/** 日本語文字（ひらがな・カタカナ・漢字）を検出する正規表現 */
const JP_CHAR_RE = /[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FFF\u3400-\u4DBF\uF900-\uFAFF\u3000-\u303F]/g;

/** テキストに日本語が MIN_JP_CHARS 文字以上含まれるか */
function hasSignificantJapanese(text) {
  const m = text.match(JP_CHAR_RE);
  return m !== null && m.length >= MIN_JP_CHARS;
}

/**
 * 行内のインラインコメント（// 以降）を除去する。
 * 文字列リテラル内の // は考慮しない（ヒューリスティック）。
 */
function stripInlineComment(line) {
  // テンプレートリテラル・文字列内の // を除外するのは困難なため、
  // // が行内に存在し、かつ前後が文字列外っぽい場合のみ除去。
  // 簡易実装: 最後の // 以降を除去（引用符の外にある可能性が高い箇所のみ）
  const commentIdx = line.indexOf('//');
  if (commentIdx === -1) return line;
  // // より前の引用符の数が偶数なら、// は文字列の外にあると推定
  const before = line.slice(0, commentIdx);
  const singleQuotes = (before.match(/'/g) || []).length;
  const doubleQuotes = (before.match(/"/g) || []).length;
  const backticks = (before.match(/`/g) || []).length;
  if (singleQuotes % 2 === 0 && doubleQuotes % 2 === 0 && backticks % 2 === 0) {
    return before;
  }
  return line;
}

/**
 * 行内の `${...}` テンプレートリテラル展開部分を除去してからブレース数をカウント。
 * ブレース内の文字列リテラルを完全にパースするのは困難なため、
 * 実用上十分な精度のヒューリスティックを使用する。
 */
function countBraces(line) {
  // ${ ... } は テンプレートリテラル展開なのでブレースカウントから除外
  const cleaned = line.replace(/\$\{[^}]*\}/g, '');
  let open = 0;
  let close = 0;
  for (const ch of cleaned) {
    if (ch === '{' || ch === '[') open++;
    else if (ch === '}' || ch === ']') close++;
  }
  return { open, close };
}

/** ディレクトリを再帰的に走査して .astro ファイルを収集 */
function collectAstroFiles(dir, result = []) {
  for (const entry of readdirSync(dir)) {
    if (EXCLUDE_DIRS.has(entry)) continue;
    const full = join(dir, entry);
    const stat = statSync(full);
    if (stat.isDirectory()) {
      collectAstroFiles(full, result);
    } else if (entry.endsWith('.astro')) {
      result.push(full);
    }
  }
  return result;
}

// ============================================================
// フロントマター解析
// ============================================================

/**
 * フロントマター（--- 〜 --- 間）の行を解析し、
 * 許可されていない変数ブロック内の日本語を検出する。
 *
 * 検出方針:
 *   - const/let/var の通常宣言: ALLOWED_VAR_PREFIXES 以外をフラグ
 *   - const { ... } = Astro.* 形式の分割代入: ブロック全体を許可（プロップのデフォルト値）
 *   - interface / type / export interface: 型定義なので全体をスキップ
 *   - ブロック内の違反は、ブロック種別が確定するまでバッファリングしてから emit
 *
 * @returns {{ violations: Violation[], frontmatterEndIdx: number }}
 */
function checkFrontmatter(lines) {
  const violations = [];

  // --- の位置を特定
  let fmStart = -1;
  let fmEnd = -1;
  let dashCount = 0;
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].trim() === '---') {
      dashCount++;
      if (dashCount === 1) fmStart = i;
      if (dashCount === 2) { fmEnd = i; break; }
    }
  }

  if (fmStart === -1 || fmEnd === -1) {
    return { violations, frontmatterEndIdx: 0 };
  }

  // フロントマター内部を解析
  let depth = 0;
  /** @type {'allowed' | 'flagged' | 'destructuring' | 'typedef'} */
  let blockKind = 'allowed'; // トップレベルは "allowed" 扱い（depth=0 の間は何も emit しない）
  let currentVarName = null;
  /** @type {Violation[]} 現ブロックの違反バッファ（ブロック種別確定後に emit） */
  let pending = [];

  for (let i = fmStart + 1; i < fmEnd; i++) {
    const line = lines[i];
    const lineNum = i + 1; // 1-based
    const trimmed = line.trim();

    // 行末の抑制コメントがあればスキップ
    if (trimmed.includes('// lint-jp-ignore')) continue;

    // コメント行はスキップ（日本語も許可）
    if (
      !trimmed ||
      trimmed.startsWith('//') ||
      trimmed.startsWith('*') ||
      trimmed.startsWith('/*')
    ) continue;

    // ブレース数を計算
    const { open, close } = countBraces(line);

    // ─── depth === 0 のとき: 新しいトップレベル宣言を検出 ───
    if (depth === 0) {
      // 型定義: interface / type / export interface
      if (/^(?:export\s+)?(?:interface|type)\s+\w+/.test(trimmed)) {
        blockKind = 'typedef';
        currentVarName = null;
        pending = [];
      }
      // 通常の変数宣言: const foo = ...
      else {
        const varMatch = trimmed.match(/^(?:export\s+)?(?:const|let|var)\s+(\w+)\s*[=:]/);
        // 分割代入: const { ... } = Astro.* （複数行の場合は depth > 0 になる前に判定できないので
        // "destructuring" として保留し、ブロック末で確定する）
        const isDestructuring = /^(?:export\s+)?(?:const|let|var)\s*\{/.test(trimmed);

        if (isDestructuring) {
          blockKind = 'destructuring';
          currentVarName = '__destructuring__';
          pending = [];
        } else if (varMatch) {
          currentVarName = varMatch[1];
          const isAllowed = ALLOWED_VAR_PREFIXES.some(
            (p) => currentVarName === p || currentVarName.startsWith(p)
          );
          blockKind = isAllowed ? 'allowed' : 'flagged';
          pending = [];
        }
        // else: import 文・関数呼び出しなどは blockKind を変えない
      }
    }

    // ─── 違反チェック ───
    if (blockKind === 'flagged') {
      const withoutComment = stripInlineComment(line);
      if (hasSignificantJapanese(withoutComment)) {
        pending.push({
          lineNum,
          content: trimmed.length > 120 ? trimmed.slice(0, 120) + '…' : trimmed,
          section: 'frontmatter',
          varName: currentVarName ?? '(トップレベル)',
        });
      }
    }
    // typedef / allowed / destructuring は違反チェックしない

    // ─── depth 更新 ───
    const prevDepth = depth;
    depth = Math.max(0, depth + open - close);

    // ─── depth が 0 に戻ったとき: ブロック終了処理 ───
    if (prevDepth > 0 && depth === 0) {
      if (blockKind === 'destructuring') {
        // 分割代入の終端行に = Astro.* があれば props のデフォルト値 → 破棄
        // それ以外（例: 通常のオブジェクト分割代入）→ pending を emit
        if (/=\s*Astro\.\w+/.test(trimmed)) {
          // プロップのデフォルト値: 許可
          pending = [];
        } else {
          violations.push(...pending);
          pending = [];
        }
      } else if (blockKind === 'flagged') {
        violations.push(...pending);
        pending = [];
      }

      // ブロック種別をリセット
      blockKind = 'allowed';
      currentVarName = null;
    }
  }

  return { violations, frontmatterEndIdx: fmEnd + 1 };
}

// ============================================================
// テンプレート解析
// ============================================================

/**
 * テンプレート部分（HTML/Astro JSX）を解析し、
 * 直書きされた日本語テキストを検出する。
 *
 * ルール:
 *   - HTML コメント <!-- ... --> はスキップ（複数行対応）
 *   - <style> / <script> ブロックはスキップ
 *   - Astro 式 {expr} の内側はスキップ（インポート済みデータ参照）
 *   - それ以外で日本語を含む行をフラグ
 */
function checkTemplate(lines, startIdx) {
  const violations = [];
  let inHtmlComment = false;
  let inStyleBlock = false;
  let inScriptBlock = false;
  let exprDepth = 0; // { } の深さ（Astroテンプレート式の追跡）

  for (let i = startIdx; i < lines.length; i++) {
    const line = lines[i];
    const lineNum = i + 1;
    const trimmed = line.trim();

    // 行末の抑制コメントがあればスキップ
    if (trimmed.includes('{/* lint-jp-ignore */}') || trimmed.includes('<!-- lint-jp-ignore -->')) continue;

    // ─── <style> / </style> ブロック追跡 ───
    if (!inStyleBlock && !inScriptBlock) {
      if (/^<style[\s>]/.test(trimmed) || trimmed === '<style>') {
        // 自己閉じ（<style ... />）は行をスキップするだけでブロックは開始しない
        if (!trimmed.endsWith('/>')) inStyleBlock = true;
        continue;
      }
    }
    if (inStyleBlock) {
      if (trimmed.includes('</style>')) inStyleBlock = false;
      continue; // style ブロック内はスキップ（CSSコメントも含む）
    }

    // ─── <script> / </script> ブロック追跡 ───
    if (!inScriptBlock) {
      if (/^<script[\s>]/.test(trimmed) || trimmed === '<script>') {
        // 自己閉じ（<script set:html={...} />）はスキップするだけでブロックは開始しない
        if (!trimmed.endsWith('/>')) inScriptBlock = true;
        continue;
      }
    }
    if (inScriptBlock) {
      if (trimmed.includes('</script>')) inScriptBlock = false;
      continue; // script ブロック内はスキップ
    }

    // ─── HTMLコメント（複数行対応） ───
    if (inHtmlComment) {
      if (trimmed.includes('-->')) inHtmlComment = false;
      continue;
    }
    if (trimmed.startsWith('<!--')) {
      if (!trimmed.includes('-->')) inHtmlComment = true;
      continue; // コメント行全体をスキップ
    }

    // JS/CSS コメント行（<script> 外でも稀に混在する場合）
    if (trimmed.startsWith('//') || trimmed.startsWith('/*') || trimmed.startsWith('*')) continue;

    // ─── Astro式 {expr} の開閉を追跡 ───
    // exprDepth > 0 の行は式の内部 → 日本語はインポートデータ由来として許可
    const { open, close } = countBraces(line);

    if (exprDepth > 0) {
      // この行は Astro 式の内部
      exprDepth = Math.max(0, exprDepth + open - close);
      continue;
    }

    // exprDepth === 0: テンプレートの直接テキスト部分
    // 単一行の {expr} を除去してから日本語チェック
    const stripped = line.replace(/\{[^{}]*\}/g, '');

    if (hasSignificantJapanese(stripped)) {
      violations.push({
        lineNum,
        content: trimmed.length > 120 ? trimmed.slice(0, 120) + '…' : trimmed,
        section: 'template',
        varName: null,
      });
    }

    // この行で式が開いた場合は次の行から追跡
    const netOpen = open - close;
    if (netOpen > 0) {
      exprDepth = netOpen;
    }
  }

  return violations;
}

// ============================================================
// メイン
// ============================================================

import { writeFileSync, existsSync } from 'fs';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const ROOT = join(__dirname, '..');
const srcDir = join(ROOT, TARGET_DIR);

// ─── 引数パース ───
const args = process.argv.slice(2);
const WARN_ONLY = args.includes('--warn');
const UPDATE_BASELINE = args.includes('--update-baseline');
const CHECK_BASELINE = args.includes('--check-baseline');
const STRICT = args.includes('--strict');
const maxArg = args.find((a) => a.startsWith('--max='));
const MAX_VIOLATIONS = maxArg ? parseInt(maxArg.slice(6), 10) : Infinity;

const BASELINE_FILE = join(ROOT, 'scripts', '.jp-baseline.json');

// ─── スキャン ───
const files = collectAstroFiles(srcDir);
files.sort();

/** @typedef {{ lineNum: number, content: string, section: string, varName: string|null }} Violation */
/** @type {{ file: string, violations: Violation[] }[]} */
const report = [];
let totalViolations = 0;

for (const file of files) {
  const content = readFileSync(file, 'utf-8');
  const lines = content.split('\n');

  const { violations: fmViolations, frontmatterEndIdx } = checkFrontmatter(lines);
  const tmViolations = checkTemplate(lines, frontmatterEndIdx);

  const all = [...fmViolations, ...tmViolations];
  if (all.length > 0) {
    report.push({ file: relative(ROOT, file), violations: all });
    totalViolations += all.length;
  }
}

// ============================================================
// ベースライン操作
// ============================================================

/** @type {{ totalViolations: number, files: Record<string, number> } | null} */
let baseline = null;

if (UPDATE_BASELINE) {
  const baselineData = {
    updatedAt: new Date().toISOString(),
    totalViolations,
    files: Object.fromEntries(report.map(({ file, violations }) => [file, violations.length])),
  };
  writeFileSync(BASELINE_FILE, JSON.stringify(baselineData, null, 2) + '\n', 'utf-8');
  console.log(`✅ ベースラインを更新しました: ${BASELINE_FILE}`);
  console.log(`   総件数: ${totalViolations} 件 / ${report.length} ファイル`);
  process.exit(0);
}

if (CHECK_BASELINE && existsSync(BASELINE_FILE)) {
  baseline = JSON.parse(readFileSync(BASELINE_FILE, 'utf-8'));
}

// ============================================================
// 出力
// ============================================================

if (totalViolations === 0) {
  console.log('✅ .astro ファイルに日本語直書きは検出されませんでした。');
  process.exit(0);
}

const printReport = () => {
  for (const { file, violations } of report) {
    console.error(`\n📄 ${file}  (${violations.length} 件)`);
    for (const v of violations) {
      const loc = `  ${String(v.lineNum).padStart(4)}`;
      const section = v.section === 'frontmatter' ? `[FM:${v.varName}]` : '[HTML]';
      console.error(`${loc}  ${section.padEnd(24)}  ${v.content}`);
    }
  }
  console.error('\n' + '─'.repeat(80));
  console.error(`合計: ${totalViolations} 件 / ${report.length} ファイル\n`);
};

// ─── ベースライン比較モード ───
if (CHECK_BASELINE && baseline) {
  const byFile = Object.fromEntries(report.map(({ file, violations }) => [file, violations.length]));
  const newViolations = [];

  for (const { file, violations } of report) {
    const baselineCount = baseline.files[file] ?? 0;
    if (violations.length > baselineCount) {
      newViolations.push({ file, before: baselineCount, after: violations.length });
    }
  }

  // ベースラインにないファイルに新規違反
  for (const { file } of report) {
    if (!(file in (baseline.files ?? {}))) {
      const count = byFile[file];
      newViolations.push({ file, before: 0, after: count });
    }
  }

  if (newViolations.length === 0) {
    const delta = totalViolations - (baseline.totalViolations ?? 0);
    const deltaStr = delta <= 0 ? `▼${Math.abs(delta)}` : `▲${delta}`;
    console.log(`✅ 新規の日本語直書きはありません (${deltaStr} / ベースライン比)`);
    console.log(`   現在 ${totalViolations} 件 (ベースライン: ${baseline.totalViolations} 件)`);
    process.exit(0);
  } else {
    console.error(`\n❌ 新規の日本語直書きが検出されました: ${newViolations.length} ファイル\n`);
    for (const { file, before, after } of newViolations) {
      console.error(`  ${file}: ${before} → ${after} 件 (▲${after - before})`);
    }
    console.error('\n詳細レポート:');
    console.error('─'.repeat(80));
    printReport();
    process.exit(1);
  }
}

// ─── 通常モード / --max モード / --warn モード ───
const prefix = WARN_ONLY ? '⚠️ ' : '❌';
console.error(`\n${prefix} .astro ファイル内の日本語直書き: ${totalViolations} 件\n`);
console.error('   コンテンツは src/content/copy/ja/*.json に移動し、import で参照してください。');
console.error('   個別行を抑制する場合: 行末に  // lint-jp-ignore  を追加\n');
console.error('─'.repeat(80));
printReport();

if (WARN_ONLY) {
  process.exit(0);
}

if (totalViolations > MAX_VIOLATIONS) {
  console.error(`❌ 上限 ${MAX_VIOLATIONS} 件を超えています (現在 ${totalViolations} 件)`);
  process.exit(1);
} else if (MAX_VIOLATIONS !== Infinity) {
  console.log(`✅ 上限内 (${totalViolations} / ${MAX_VIOLATIONS} 件)`);
  process.exit(0);
}

process.exit(1);
