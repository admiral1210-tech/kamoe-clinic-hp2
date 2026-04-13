/**
 * `<script type="application/ld+json">` 内に埋め込む用。
 * 文字列値に `</script>` が含まれると HTML パーサが誤終了するため `<` をエスケープする。
 */
export function serializeJsonLdForScript(data: unknown): string {
  return JSON.stringify(data).replace(/</g, '\\u003c');
}
