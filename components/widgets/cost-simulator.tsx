'use client';

import { useState } from 'react';
import { ChevronDown, Phone } from 'lucide-react';

import { cn } from '@/lib/utils';

type Insurance = 'kouki' | 'korei' | 'ippan' | 'seikatsu';
type Ratio = '1割' | '2割' | '3割';
type Place = 'jitaku' | 'gh' | 'tokuteishisetsu' | 'kaigo';
type Content = 'basic' | 'psych' | 'treat' | 'capd';

const INSURANCE_OPTIONS: { v: Insurance; l: string; s: string }[] = [
  { v: 'kouki', l: '後期高齢者医療', s: '75歳以上' },
  { v: 'korei', l: '高齢者医療', s: '70〜74歳' },
  { v: 'ippan', l: '一般医療保険', s: '70歳未満' },
  { v: 'seikatsu', l: '生活保護受給', s: '' },
];

const RATIO_OPTIONS: Ratio[] = ['1割', '2割', '3割'];

const PLACE_OPTIONS: { v: Place; l: string; s: string }[] = [
  { v: 'jitaku', l: 'ご自宅', s: '一戸建て・マンションなど' },
  { v: 'gh', l: 'グループホーム', s: '認知症の方の共同施設' },
  { v: 'tokuteishisetsu', l: '特定施設', s: '有料老人ホーム・サ高住など' },
  { v: 'kaigo', l: '介護老人施設', s: '特養・老健など' },
];

const CONTENT_OPTIONS: { v: Content; l: string; s: string }[] = [
  { v: 'basic', l: '診察・処方のみ', s: '定期訪問とお薬の処方' },
  { v: 'psych', l: '精神科診療あり', s: '精神科専門医による加算' },
  { v: 'treat', l: '医療処置あり', s: '胃ろう・カテーテル等の管理' },
  { v: 'capd', l: '在宅透析・高度医療あり', s: '腹膜透析（CAPD）を実施中' },
];

const TABLE: Record<Insurance, Partial<Record<Ratio | '0割', Record<Place, [number, number]>>>> = {
  kouki: {
    '1割': { jitaku: [5000, 8000], gh: [3000, 5000], tokuteishisetsu: [3000, 5000], kaigo: [2000, 4000] },
    '2割': { jitaku: [10000, 16000], gh: [6000, 10000], tokuteishisetsu: [6000, 10000], kaigo: [4000, 8000] },
    '3割': { jitaku: [15000, 24000], gh: [9000, 15000], tokuteishisetsu: [9000, 15000], kaigo: [6000, 12000] },
  },
  korei: {
    '2割': { jitaku: [10000, 16000], gh: [6000, 10000], tokuteishisetsu: [6000, 10000], kaigo: [4000, 8000] },
    '3割': { jitaku: [15000, 24000], gh: [9000, 15000], tokuteishisetsu: [9000, 15000], kaigo: [6000, 12000] },
  },
  ippan: {
    '1割': { jitaku: [5000, 8000], gh: [3000, 5000], tokuteishisetsu: [3000, 5000], kaigo: [2000, 4000] },
    '2割': { jitaku: [10000, 16000], gh: [6000, 10000], tokuteishisetsu: [6000, 10000], kaigo: [4000, 8000] },
    '3割': { jitaku: [15000, 24000], gh: [9000, 15000], tokuteishisetsu: [9000, 15000], kaigo: [6000, 12000] },
  },
  seikatsu: { '0割': { jitaku: [0, 0], gh: [0, 0], tokuteishisetsu: [0, 0], kaigo: [0, 0] } },
};

const CONTENT_ADD: Record<Content, [number, number]> = {
  basic: [0, 0],
  psych: [1500, 3000],
  treat: [2000, 5000],
  capd: [5000, 10000],
};

function OptionButton({
  selected,
  onClick,
  label,
  sub,
  className,
}: {
  selected: boolean;
  onClick: () => void;
  label: string;
  sub?: string;
  className?: string;
}) {
  return (
    <label className={cn('fee-option cursor-pointer', className)}>
      <button
        type="button"
        onClick={onClick}
        className={cn(
          'fee-btn w-full rounded-xl border-2 p-3 text-center font-medium text-gray-700 transition-colors hover:border-primary dark:text-gray-200',
          selected ? 'border-primary bg-blue-50' : 'border-gray-200'
        )}
      >
        {label}
        {sub && (
          <>
            <br />
            <span className="text-sm font-normal text-gray-500">{sub}</span>
          </>
        )}
      </button>
    </label>
  );
}

export function CostSimulator() {
  const [insurance, setInsurance] = useState<Insurance | null>(null);
  const [ratio, setRatio] = useState<Ratio | null>(null);
  const [place, setPlace] = useState<Place | null>(null);
  const [content, setContent] = useState<Content | null>(null);
  const [result, setResult] = useState<{ min: number; max: number } | null>(null);
  const [breakdownOpen, setBreakdownOpen] = useState(false);

  const showStep2 = Boolean(insurance) && insurance !== 'seikatsu';
  const showStep3 = Boolean(insurance) && (insurance === 'seikatsu' || Boolean(ratio));
  const showStep4 = Boolean(place);
  const showCalcBtn = Boolean(content);

  function resetResult() {
    setResult(null);
  }

  function handleCalc() {
    if (!insurance) return;
    const p = place ?? 'jitaku';
    const c = content ?? 'basic';
    let min: number;
    let max: number;
    if (insurance === 'seikatsu') {
      min = 0;
      max = 0;
    } else {
      const r = ratio ?? '3割';
      const base = TABLE[insurance]?.[r]?.[p] ?? [5000, 8000];
      const add = CONTENT_ADD[c];
      min = base[0] + add[0];
      max = base[1] + add[1];
    }
    setResult({ min, max });
    setBreakdownOpen(false);
  }

  return (
    <div className="rounded-2xl border border-blue-100 bg-white p-6 shadow-md dark:border-slate-700 dark:bg-slate-800 md:p-8">
      <div className="mb-6">
        <p className="mb-3 flex items-center gap-2 text-lg font-bold text-gray-800 dark:text-white">
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-primary text-sm font-bold text-white">
            1
          </span>
          保険の種類を教えてください
        </p>
        <div className="grid grid-cols-2 gap-2">
          {INSURANCE_OPTIONS.map(({ v, l, s }) => (
            <OptionButton
              key={v}
              selected={insurance === v}
              onClick={() => {
                setInsurance(v);
                if (v === 'seikatsu') setRatio(null);
                resetResult();
              }}
              label={l}
              sub={s}
            />
          ))}
        </div>
      </div>

      {showStep2 && (
        <div className="mb-6">
          <p className="mb-3 flex items-center gap-2 text-lg font-bold text-gray-800 dark:text-white">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-primary text-sm font-bold text-white">
              2
            </span>
            自己負担割合を選んでください
          </p>
          <p className="mb-3 text-sm text-gray-500">保険証に記載されています。</p>
          <div className="flex gap-2">
            {RATIO_OPTIONS.map((r) => (
              <OptionButton
                key={r}
                className="flex-1"
                selected={ratio === r}
                onClick={() => {
                  setRatio(r);
                  resetResult();
                }}
                label={r}
              />
            ))}
          </div>
        </div>
      )}

      {showStep3 && (
        <div className="mb-6">
          <p className="mb-3 flex items-center gap-2 text-lg font-bold text-gray-800 dark:text-white">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-primary text-sm font-bold text-white">
              3
            </span>
            お住まいの場所を選んでください
          </p>
          <div className="grid grid-cols-2 gap-2">
            {PLACE_OPTIONS.map(({ v, l, s }) => (
              <OptionButton
                key={v}
                selected={place === v}
                onClick={() => {
                  setPlace(v);
                  resetResult();
                }}
                label={l}
                sub={s}
              />
            ))}
          </div>
        </div>
      )}

      {showStep4 && (
        <div className="mb-6">
          <p className="mb-3 flex items-center gap-2 text-lg font-bold text-gray-800 dark:text-white">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-primary text-sm font-bold text-white">
              4
            </span>
            診療の内容を選んでください
          </p>
          <div className="grid grid-cols-2 gap-2">
            {CONTENT_OPTIONS.map(({ v, l, s }) => (
              <OptionButton
                key={v}
                selected={content === v}
                onClick={() => {
                  setContent(v);
                  resetResult();
                }}
                label={l}
                sub={s}
              />
            ))}
          </div>
        </div>
      )}

      {showCalcBtn && (
        <div>
          <button
            type="button"
            onClick={handleCalc}
            className="w-full rounded-xl bg-primary py-4 text-lg font-bold text-white transition-opacity hover:opacity-90"
          >
            月々の目安を計算する
          </button>
        </div>
      )}

      {result && (
        <div className="mt-6">
          <div className="rounded-xl border border-blue-200 bg-blue-50 p-6 text-center dark:border-slate-600 dark:bg-slate-700">
            <p className="mb-2 text-gray-600 dark:text-gray-300">月々の自己負担目安（診療料のみ）</p>
            <p className="mb-2 text-5xl font-black text-primary">
              {result.min === 0 && result.max === 0
                ? '0円（全額公費）'
                : `約 ${result.min.toLocaleString()}〜${result.max.toLocaleString()}円`}
            </p>
            <p className="text-sm text-gray-500">※ 薬代・処置・検査費用は別途加算されます</p>
          </div>

          <div className="mt-4">
            <button
              type="button"
              onClick={() => setBreakdownOpen((v) => !v)}
              className="flex w-full items-center justify-between rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100"
              aria-expanded={breakdownOpen}
            >
              <span>費用の内訳を確認する</span>
              <ChevronDown className={cn('h-5 w-5 transition-transform duration-200', breakdownOpen && 'rotate-180')} />
            </button>
            {breakdownOpen && (
              <div className="mt-2 overflow-hidden rounded-xl border border-gray-100 text-sm">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50 text-left text-gray-500">
                      <th className="px-4 py-2 font-medium">費用項目</th>
                      <th className="px-4 py-2 text-right font-medium">点数目安</th>
                      <th className="px-4 py-2 text-right font-medium">備考</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 text-gray-700">
                    <tr>
                      <td className="px-4 py-3">在宅患者訪問診療料</td>
                      <td className="px-4 py-3 text-right">888点/回×月2回</td>
                      <td className="px-4 py-3 text-right text-gray-500">在支診1の場合</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="px-4 py-3">在宅時医学総合管理料</td>
                      <td className="px-4 py-3 text-right">5,385点/月</td>
                      <td className="px-4 py-3 text-right text-gray-500">ご自宅・月2回の場合</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3">処方箋料</td>
                      <td className="px-4 py-3 text-right">68点/回</td>
                      <td className="px-4 py-3 text-right text-gray-500">薬は薬局で別途</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="px-4 py-3" colSpan={3}>
                        薬剤費・調剤料：処方内容により異なります（薬局でのお支払い）
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3" colSpan={3}>
                        検査・処置費：必要に応じて加算（採血・心電図など）
                      </td>
                    </tr>
                  </tbody>
                </table>
                <p className="border-t border-gray-100 bg-gray-50 px-4 py-3 text-xs text-gray-500">
                  ※ 上記は2024年度診療報酬に基づく参考値です。実際の点数は算定条件により異なります。
                </p>
              </div>
            )}
          </div>

          <p className="mt-4 text-center text-gray-600 dark:text-gray-300">
            詳しくはお電話またはお問い合わせフォームでご説明します。{' '}
            <a href="tel:0643017871" className="inline-flex items-center gap-1 font-bold text-primary hover:underline">
              <Phone className="h-5 w-5" /> 06-4301-7871
            </a>
          </p>
        </div>
      )}
    </div>
  );
}
