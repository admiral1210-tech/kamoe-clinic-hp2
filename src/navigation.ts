import { getPermalink } from './utils/permalinks';

export const headerData = {
  links: [
    {
      text: '訪問診療について',
      href: getPermalink('/houmon-shinryo'),
    },
    {
      text: '診療内容',
      links: [
        { text: '診療内容トップ', href: getPermalink('/#departments') },
        { text: '内科の訪問診療', href: getPermalink('/naika') },
        { text: '精神科の訪問診療・オンライン診療', href: getPermalink('/seishinika') },
        { text: '小児科の訪問診療（医療ケア児対応）', href: getPermalink('/shoninka') },
        { text: '整形外科の訪問診療', href: getPermalink('/seikeigeka') },
        { text: '費用・保険について', href: getPermalink('/cost') },
        { text: '医療費助成・診断書', href: getPermalink('/joseikin') },
        { text: '在支診1（最上位認定）とは', href: getPermalink('/zaishin1') },
        { text: '患者さまの声・体験談', href: getPermalink('/testimonials') },
      ],
    },
    {
      text: '診療エリア',
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
      text: 'クリニック案内',
      links: [
        { text: 'よくあるご質問', href: getPermalink('/faq') },
        { text: '診療時間', href: getPermalink('/about#hours') },
        { text: 'アクセス・クリニック情報', href: getPermalink('/about#access') },
        { text: '医師紹介', href: getPermalink('/about#doctors') },
        { text: '院長プロフィール', href: getPermalink('/about/kinoshita') },
        {
          text: '公式ブログ',
          href: 'https://www.kamome-clinic.net/blog/',
        },
      ],
    },
    {
      text: '医療・介護関係者の方へ',
      href: getPermalink('/renkei'),
    },
    {
      text: '従業員募集',
      href: getPermalink('/recruit'),
    },
  ],
  actions: [{ text: 'お問い合わせ', href: getPermalink('/#contact') }],
};

export const footerData = {
  links: [
    {
      title: '診療案内',
      links: [
        { text: '訪問診療とは・流れ', href: getPermalink('/houmon-shinryo') },
        { text: '診療内容（内科・精神科・小児科）', href: getPermalink('/#departments') },
        { text: '内科の訪問診療', href: getPermalink('/naika') },
        { text: '精神科の訪問診療・オンライン診療', href: getPermalink('/seishinika') },
        { text: '小児科の訪問診療（医療ケア児対応）', href: getPermalink('/shoninka') },
        { text: '整形外科の訪問診療', href: getPermalink('/seikeigeka') },
        { text: '費用・保険について', href: getPermalink('/cost') },
        { text: '医療費助成・診断書', href: getPermalink('/joseikin') },
        { text: '在支診1（最上位認定）とは', href: getPermalink('/zaishin1') },
        { text: '診療時間', href: getPermalink('/about#hours') },
        { text: 'よくあるご質問', href: getPermalink('/faq') },
      ],
    },
    {
      title: '診療エリア',
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
      links: [
        { text: 'クリニック案内・アクセス', href: getPermalink('/about#access') },
        { text: '院長プロフィール', href: getPermalink('/about/kinoshita') },
        { text: '患者さまの声・体験談', href: getPermalink('/testimonials') },
        { text: '第5院サイト', href: 'https://kamome-clinic5.net/' },
        { text: '第8院サイト', href: 'https://kamome-clinic7.net/' },
      ],
    },
    {
      title: '医療・介護関係者',
      links: [
        { text: '医療・介護関係者の方へ', href: getPermalink('/renkei') },
        { text: '紹介の流れ', href: getPermalink('/renkei#step-1-') },
        { text: 'よくある質問（連携）', href: getPermalink('/renkei#faq') },
        { text: '訪問診療相談書（PDF）', href: '/pdf/houmonshinryo_soudan_re.pdf' },
      ],
    },
    {
      title: '採用情報',
      links: [
        { text: '従業員募集', href: getPermalink('/recruit') },
        { text: '募集職種', href: getPermalink('/recruit#positions') },
        { text: '応募の流れ', href: getPermalink('/recruit#flow') },
      ],
    },
  ],
  secondaryLinks: [
    { text: 'プライバシーポリシー', href: getPermalink('/privacy') },
    { text: 'お問い合わせ', href: getPermalink('/#contact') },
  ],
  socialLinks: [
    { ariaLabel: 'Instagram', icon: 'tabler:brand-instagram', href: 'https://www.instagram.com/kamomeclinic/' },
    { ariaLabel: 'LINE', icon: 'tabler:brand-line', href: 'https://line.me/R/ti/p/%40512ysmzx' },
  ],
  footNote: `
    〒552-0004 大阪市港区夕凪2丁目16-9 icrossAMポートビル 4F-B TEL：<a class="text-blue-600 underline dark:text-muted" href="tel:0643017871">06-4301-7871</a>
  `,
};
