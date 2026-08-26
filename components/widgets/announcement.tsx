import Link from 'next/link';

const NEW_BLOG_PATH = '/blog';
const ANNOUNCEMENT_TEXT = '院長コラム・お知らせ・スタッフブログを新HPで発信中';

export function Announcement() {
  return (
    <div
      className="hidden items-center justify-center gap-2 overflow-hidden bg-blue-700 px-4 py-2 text-sm text-white md:flex"
      role="banner"
      aria-label="お知らせ・ブログのご案内"
    >
      <span className="shrink-0 rounded bg-white/20 px-2 py-0.5 text-xs font-semibold text-white">お知らせ</span>

      <span className="truncate">{ANNOUNCEMENT_TEXT}</span>

      <Link
        href={NEW_BLOG_PATH}
        className="shrink-0 whitespace-nowrap font-bold underline underline-offset-2 transition-colors hover:text-blue-100"
        aria-label="お知らせ・ブログを読む"
      >
        ブログを読む&nbsp;»
      </Link>
    </div>
  );
}
