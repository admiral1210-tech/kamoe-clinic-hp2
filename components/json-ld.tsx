/** `<script type="application/ld+json">` 埋め込み用。`</script>` によるパーサ誤終了を防ぐため `<` をエスケープする。 */
function serializeJsonLdForScript(data: unknown): string {
  return JSON.stringify(data).replace(/</g, '\\u003c');
}

export function JsonLd({ data }: { data: object }) {
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLdForScript(data) }} />
  );
}
