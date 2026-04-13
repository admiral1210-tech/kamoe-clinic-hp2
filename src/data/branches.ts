/**
 * かもめクリニックグループの診療拠点（本院・各院）。
 * 件数・表記はこの配列を唯一のソースとして導出すること。
 */
/** clinic-meta の branchFoundingYears と対応（本院は null） */
export type KamomeBranchSchemaKey = 'branch2' | 'branch3' | 'branch4' | 'branch5' | 'branch8';

export type KamomeBranch = {
  name: string;
  area: string;
  address: string;
  tel: string;
  fax: string | null;
  /** 院ごとの公式サイト（任意） */
  href: string | null;
  /** JSON-LD 支院 @id・開院年参照用（本院は null） */
  schemaBranchKey: KamomeBranchSchemaKey | null;
};

export const KAMOME_BRANCHES: KamomeBranch[] = [
  {
    name: 'かもめクリニック（本院）',
    area: '大阪市港区',
    address: '夕凪2丁目16-9 icrossAMポートビル4F-B',
    tel: '06-4301-7871',
    fax: null,
    href: null,
    schemaBranchKey: null,
  },
  {
    name: 'かもめクリニック第2',
    area: '大阪市港区',
    address: '夕凪2丁目17-14',
    tel: '06-6556-9571',
    fax: null,
    href: null,
    schemaBranchKey: 'branch2',
  },
  {
    name: 'かもめクリニック第3',
    area: '大阪市東住吉区',
    address: '〒546-0043 大阪市東住吉区駒川3丁目29-14',
    tel: '06-6115-6045',
    fax: '06-6115-6046',
    href: null,
    schemaBranchKey: 'branch3',
  },
  {
    name: 'かもめクリニック第4',
    area: '大阪市西淀川区',
    address: '柏里1丁目16-15',
    tel: '06-7506-9565',
    fax: null,
    href: null,
    schemaBranchKey: 'branch4',
  },
  {
    name: 'かもめクリニック第5',
    area: '大阪市住之江区',
    address: '北加賀屋2-12-6',
    tel: '06-6115-7018',
    fax: null,
    href: 'https://kamome-clinic5.net/',
    schemaBranchKey: 'branch5',
  },
  {
    name: 'かもめクリニック第8',
    area: '大阪市住吉区',
    address: '千躰2-2-39 ホリビル3階',
    tel: '06-6629-8852',
    fax: null,
    href: 'https://kamome-clinic7.net/',
    schemaBranchKey: 'branch8',
  },
];

/** 診療拠点の件数（本院を含む）。サイト内の「◯院」表記はこれに合わせる */
export const KAMOME_BRANCH_COUNT = KAMOME_BRANCHES.length;

/** 本院を除く支院のみの件数。「支院◯院」など運用コピー用（マスタと常に一致） */
export const KAMOME_BRANCH_SUBCOUNT = KAMOME_BRANCHES.filter((b) => b.schemaBranchKey !== null).length;

/**
 * 区ページ等「かもめクリニック◯◯が」の◯◯部分（本院 / 第2院 …）
 */
export function kamomeBranchTagSuffix(branch: KamomeBranch): string {
  if (branch.schemaBranchKey === null) return '本院';
  const m = branch.name.match(/第(\d+)/u);
  if (m) return `第${m[1]}院`;
  return branch.name.replace(/^かもめクリニック/u, '').trim() || '本院';
}
