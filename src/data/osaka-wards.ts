/**
 * 大阪市24区（市公式の区並びに準拠）
 * slug が null の区は区別LP未作成。詳細は地域医療連携部へ誘導。
 */
export type OsakaWardEntry = {
  name: string;
  slug: string | null;
};

export const OSAKA_CITY_WARDS: OsakaWardEntry[] = [
  { name: '北区', slug: null },
  { name: '都島区', slug: null },
  { name: '福島区', slug: null },
  { name: '此花区', slug: null },
  { name: '中央区', slug: null },
  { name: '西区', slug: null },
  { name: '港区', slug: 'minato-ku' },
  { name: '大正区', slug: 'taisho-ku' },
  { name: '天王寺区', slug: null },
  { name: '浪速区', slug: 'naniwa-ku' },
  { name: '西淀川区', slug: 'nishiyodogawa-ku' },
  { name: '東淀川区', slug: null },
  { name: '東成区', slug: null },
  { name: '生野区', slug: null },
  { name: '旭区', slug: null },
  { name: '城東区', slug: null },
  { name: '鶴見区', slug: null },
  { name: '阿倍野区', slug: null },
  { name: '住吉区', slug: 'sumiyoshi-ku' },
  { name: '東住吉区', slug: 'higashisumiyoshi-ku' },
  { name: '平野区', slug: null },
  { name: '住之江区', slug: 'suminoe-ku' },
  { name: '西成区', slug: null },
  { name: '淀川区', slug: null },
];
