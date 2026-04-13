import defaultTheme from 'tailwindcss/defaultTheme';
import plugin from 'tailwindcss/plugin';
import typographyPlugin from '@tailwindcss/typography';

export default {
  content: ['./src/**/*.{astro,html,js,jsx,json,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        primary: 'var(--aw-color-primary)',
        secondary: 'var(--aw-color-secondary)',
        accent: 'var(--aw-color-accent)',
        default: 'var(--aw-color-text-default)',
        muted: 'var(--aw-color-text-muted)',
      },
      fontFamily: {
        sans: ['var(--aw-font-sans, ui-sans-serif)', ...defaultTheme.fontFamily.sans],
        serif: ['var(--aw-font-serif, ui-serif)', ...defaultTheme.fontFamily.serif],
        heading: ['var(--aw-font-heading, ui-sans-serif)', ...defaultTheme.fontFamily.sans],
      },

      animation: {
        fade: 'fadeInUp 1s both',
      },

      keyframes: {
        fadeInUp: {
          '0%': { opacity: 0, transform: 'translateY(2rem)' },
          '100%': { opacity: 1 },
        },
      },
    },
  },
  plugins: [
    typographyPlugin,
    plugin(({ addVariant }) => {
      addVariant('intersect', '&:not([no-intersect])');
    }),
  ],
  /**
   * dark: クラスポリシー（light:only モード運用）
   * ─────────────────────────────────────────────────────────
   * config.yaml に ui.theme:'light:only' を設定しているため、BasicScripts.astro
   * が document.documentElement.classList.remove('dark') を常に実行し、
   * .dark クラスは決してページに付与されない。
   *
   * したがって dark: 変種 CSS は生成されるが一切マッチしない（実質的デッドコード）。
   * 新規コードでは dark: クラスを使わないこと。
   * 既存ページの dark: クラスは段階的に除去する（P2-3）。
   *
   * 'class' のまま残す理由: Astrowind テンプレートコンポーネントが
   * .dark セレクタに依存するため、変更すると副作用がある。
   */
  darkMode: 'class',
};
