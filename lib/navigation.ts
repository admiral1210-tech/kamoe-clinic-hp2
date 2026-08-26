export interface NavLink {
  text: string;
  href?: string;
  links?: NavLink[];
}

export const headerData: { links: NavLink[]; actions: { text: string; href: string }[] } = {
  links: [
    {
      text: '訪問診療について',
      links: [
        { text: '訪問診療とは・ご利用の流れ', href: '/houmon-shinryo' },
        { text: '費用・保険について', href: '/cost' },
        { text: '医療費助成・診断書', href: '/joseikin' },
        { text: '在支診1(最上位認定)とは', href: '/zaishin1' },
      ],
    },
    {
      text: '診療内容',
      links: [
        { text: '内科の訪問診療', href: '/naika' },
        { text: '精神科の訪問診療・オンライン診療', href: '/seishinika' },
        { text: '小児科の訪問診療(医療ケア児対応)', href: '/shoninka' },
        { text: '整形外科の訪問診療', href: '/seikeigeka' },
      ],
    },
    {
      text: '拠点エリア',
      links: [
        { text: '港区', href: '/area/minato-ku' },
        { text: '住之江区', href: '/area/suminoe-ku' },
        { text: '西淀川区', href: '/area/nishiyodogawa-ku' },
        { text: '住吉区', href: '/area/sumiyoshi-ku' },
        { text: '東住吉区', href: '/area/higashisumiyoshi-ku' },
      ],
    },
    {
      text: 'クリニック案内',
      links: [
        { text: 'よくあるご質問', href: '/faq' },
        { text: '診療時間', href: '/about#hours' },
        { text: 'アクセス・クリニック情報', href: '/about#access' },
        { text: '医師紹介', href: '/doctors' },
        { text: '院長プロフィール', href: '/about/kinoshita' },
        { text: 'お知らせ・ブログ', href: '/blog' },
        { text: '旧ブログ(過去記事)', href: 'https://www.kamome-clinic.net/blog/' },
      ],
    },
    { text: 'ご家族・医療・介護関係者の方へ', href: '/renkei' },
    { text: '従業員募集', href: '/recruit' },
  ],
  actions: [{ text: 'お問い合わせ', href: '/renkei' }],
};

export type FooterLinkKind = 'internal' | 'external' | 'legacy-blog';

export interface FooterNavLink {
  text: string;
  href: string;
  kind?: FooterLinkKind;
}

export interface FooterNavSection {
  title: string;
  links: FooterNavLink[];
  collapsibleMobile?: boolean;
}

export const footerData: { links: FooterNavSection[]; secondaryLinks: { text: string; href: string }[] } = {
  links: [
    {
      title: '診療案内',
      collapsibleMobile: true,
      links: [
        { text: '訪問診療とは・流れ', href: '/houmon-shinryo' },
        { text: '費用・保険について', href: '/cost' },
        { text: '医療費助成・診断書', href: '/joseikin' },
        { text: '在支診1(最上位認定)とは', href: '/zaishin1' },
        { text: '診療時間', href: '/about#hours' },
        { text: 'よくあるご質問', href: '/faq' },
      ],
    },
    {
      title: '診療エリア',
      collapsibleMobile: true,
      links: [
        { text: '大阪市の対応エリア', href: '/area-osaka' },
        { text: '港区', href: '/area/minato-ku' },
        { text: '住之江区', href: '/area/suminoe-ku' },
        { text: '西淀川区', href: '/area/nishiyodogawa-ku' },
        { text: '住吉区', href: '/area/sumiyoshi-ku' },
        { text: '東住吉区', href: '/area/higashisumiyoshi-ku' },
      ],
    },
    {
      title: 'クリニック情報',
      collapsibleMobile: true,
      links: [
        { text: 'クリニック案内・アクセス', href: '/about#access' },
        { text: '院長プロフィール', href: '/about/kinoshita' },
        { text: '第5院サイト', href: 'https://kamome-clinic5.net/', kind: 'external' },
        { text: '第8院サイト', href: 'https://kamome-clinic7.net/', kind: 'external' },
        { text: '旧ブログ(過去記事)', href: 'https://www.kamome-clinic.net/blog/', kind: 'legacy-blog' },
      ],
    },
    {
      title: '医療・介護関係者',
      collapsibleMobile: true,
      links: [
        { text: 'ご家族・医療・介護関係者の方へ', href: '/renkei' },
        { text: 'かもめクリニックの在宅医療体制', href: '/renkei#renkei-strengths' },
        { text: '受け入れ対象の例', href: '/renkei#renkei-targets' },
        { text: '紹介の流れ', href: '/renkei#renkei-flow' },
        { text: 'よくある質問(連携)', href: '/renkei#renkei-faq' },
        { text: '訪問診療相談書(PDF)', href: '/pdf/houmonshinryo_soudan_re.pdf' },
      ],
    },
    {
      title: '採用情報',
      collapsibleMobile: true,
      links: [
        { text: '従業員募集', href: '/recruit' },
        { text: '募集職種', href: '/recruit#positions' },
        { text: '応募の流れ', href: '/recruit#flow' },
      ],
    },
  ],
  secondaryLinks: [{ text: 'プライバシーポリシー', href: '/privacy' }],
};
