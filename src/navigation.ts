import { getPermalink } from './utils/permalinks';
import { OLD_BLOG_URL } from '~/data/site-policy';
import type { FooterData } from '~/types/footer';

/** Instagram 公式ナムタグ用 QR（静的アセット） */
export const INSTAGRAM_QR_IMAGE_SRC = '/images/instagram_qr_kamome.png';

export const headerData = {
  links: [
    {
      text: '訪問診療について',
      links: [
        { text: '訪問診療とは・ご利用の流れ', href: getPermalink('/houmon-shinryo') },
        { text: '費用・保険について', href: getPermalink('/cost') },
        { text: '医療費助成・診断書', href: getPermalink('/joseikin') },
        { text: '在支診1（最上位認定）とは', href: getPermalink('/zaishin1') },
      ],
    },
    {
      text: '診療内容',
      links: [
        { text: '内科の訪問診療', href: getPermalink('/naika') },
        { text: '精神科の訪問診療・オンライン診療', href: getPermalink('/seishinika') },
        { text: '小児科の訪問診療（医療ケア児対応）', href: getPermalink('/shoninka') },
        { text: '整形外科の訪問診療', href: getPermalink('/seikeigeka') },
        // { text: '患者さまの声・体験談', href: getPermalink('/testimonials') }, // 一時非表示中
      ],
    },
    {
      text: '拠点エリア',
      links: [
        { text: '港区', href: getPermalink('/area/minato-ku') },
        { text: '住之江区', href: getPermalink('/area/suminoe-ku') },
        { text: '西淀川区', href: getPermalink('/area/nishiyodogawa-ku') },
        { text: '住吉区', href: getPermalink('/area/sumiyoshi-ku') },
        { text: '東住吉区', href: getPermalink('/area/higashisumiyoshi-ku') },
      ],
    },
    {
      text: 'クリニック案内',
      links: [
        { text: 'よくあるご質問', href: getPermalink('/faq') },
        { text: '診療時間', href: getPermalink('/about#hours') },
        { text: 'アクセス・クリニック情報', href: getPermalink('/about#access') },
        { text: '医師紹介', href: getPermalink('/doctors') },
        { text: '院長プロフィール', href: getPermalink('/about/kinoshita') },
        {
          text: 'お知らせ・ブログ',
          href: getPermalink('/blog'),
        },
        {
          text: '旧ブログ（過去記事）',
          href: 'https://www.kamome-clinic.net/blog/',
        },
      ],
    },
    {
      text: 'ご家族・医療・介護関係者の方へ',
      href: getPermalink('/renkei'),
    },
    {
      text: '従業員募集',
      href: getPermalink('/recruit'),
    },
  ],
  /** 主要導線：全ページから相談窓口ページへ（固定CTAのショートカットと役割分担） */
  actions: [{ text: 'お問い合わせ', href: getPermalink('/renkei'), variant: 'primary' as const }],
};

export const footerData = {
  links: [
    {
      title: '診療案内',
      collapsibleMobile: true,
      links: [
        { text: '訪問診療とは・流れ', href: getPermalink('/houmon-shinryo') },
        { text: '費用・保険について', href: getPermalink('/cost') },
        { text: '医療費助成・診断書', href: getPermalink('/joseikin') },
        { text: '在支診1（最上位認定）とは', href: getPermalink('/zaishin1') },
        { text: '診療時間', href: getPermalink('/about#hours') },
        { text: 'よくあるご質問', href: getPermalink('/faq') },
      ],
    },
    {
      title: '診療エリア',
      collapsibleMobile: true,
      links: [
        { text: '大阪市の対応エリア', href: getPermalink('/area-osaka') },
        { text: '港区', href: getPermalink('/area/minato-ku') },
        { text: '住之江区', href: getPermalink('/area/suminoe-ku') },
        { text: '西淀川区', href: getPermalink('/area/nishiyodogawa-ku') },
        { text: '住吉区', href: getPermalink('/area/sumiyoshi-ku') },
        { text: '東住吉区', href: getPermalink('/area/higashisumiyoshi-ku') },
      ],
    },
    {
      title: 'クリニック情報',
      collapsibleMobile: true,
      links: [
        { text: 'クリニック案内・アクセス', href: getPermalink('/about#access') },
        { text: '院長プロフィール', href: getPermalink('/about/kinoshita') },
        // { text: '患者さまの声・体験談', href: getPermalink('/testimonials') }, // 一時非表示中
        { text: '第5院サイト', href: 'https://kamome-clinic5.net/', kind: 'external' as const },
        { text: '第8院サイト', href: 'https://kamome-clinic7.net/', kind: 'external' as const },
        { text: '旧ブログ（過去記事）', href: OLD_BLOG_URL, kind: 'legacy-blog' as const },
      ],
    },
    {
      title: '医療・介護関係者',
      collapsibleMobile: true,
      links: [
        { text: 'ご家族・医療・介護関係者の方へ', href: getPermalink('/renkei') },
        { text: 'かもめクリニックの在宅医療体制', href: getPermalink('/renkei#renkei-strengths') },
        { text: '受け入れ対象の例', href: getPermalink('/renkei#renkei-targets') },
        { text: '紹介の流れ', href: getPermalink('/renkei#renkei-flow') },
        { text: 'よくある質問（連携）', href: getPermalink('/renkei#renkei-faq') },
        { text: '訪問診療相談書（PDF）', href: '/pdf/houmonshinryo_soudan_re.pdf' },
      ],
    },
    {
      title: '採用情報',
      collapsibleMobile: true,
      links: [
        { text: '従業員募集', href: getPermalink('/recruit') },
        { text: '募集職種', href: getPermalink('/recruit#positions') },
        { text: '応募の流れ', href: getPermalink('/recruit#flow') },
      ],
    },
  ],
  secondaryLinks: [{ text: 'プライバシーポリシー', href: getPermalink('/privacy') }],
  socialLinks: [
    {
      ariaLabel: 'Instagram',
      href: 'https://www.instagram.com/kamomeclinic/',
      imageSrc: INSTAGRAM_QR_IMAGE_SRC,
      variant: 'instagram-qr' as const,
    },
  ],
} satisfies FooterData;
