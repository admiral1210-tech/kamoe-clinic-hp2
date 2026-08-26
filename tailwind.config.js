import defaultTheme from 'tailwindcss/defaultTheme';
import plugin from 'tailwindcss/plugin';
import typographyPlugin from '@tailwindcss/typography';
import tailwindcssAnimate from 'tailwindcss-animate';

export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './components/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: 'var(--aw-color-primary)',
        secondary: 'var(--aw-color-secondary)',
        accent: 'var(--aw-color-accent)',
        default: 'var(--aw-color-text-default)',
        muted: 'var(--aw-color-text-muted)',
        heading: 'var(--aw-color-text-heading)',
        // ナビゲーションホバー色（hover:text-link で使用）
        link: 'var(--aw-color-primary)',
        // shadcn/ui コンポーネントトークン
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
      },
      spacing: {
        'section-y': 'var(--aw-spacing-section-y)',
        'section-x': 'var(--aw-spacing-section-x)',
        'hero-content-pb': 'var(--aw-spacing-hero-content-pb)',
      },
      borderRadius: {
        card: 'var(--aw-radius-card)',
        pill: 'var(--aw-radius-pill)',
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
    tailwindcssAnimate,
    plugin(({ addVariant }) => {
      addVariant('intersect', '&:not([no-intersect])');
    }),
  ],
  /**
   * dark: クラスポリシー（light:only モード運用）
   * ─────────────────────────────────────────────────────────
   * .dark クラスを付与するロジックは存在しないため、dark: 変種 CSS は
   * 生成されるが一切マッチしない（実質的デッドコード）。
   * 新規コードでは dark: クラスを使わないこと。
   */
  darkMode: 'class',
};
