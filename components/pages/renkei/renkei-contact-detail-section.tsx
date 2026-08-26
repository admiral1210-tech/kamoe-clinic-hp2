'use client';

import { useState } from 'react';
import { ClipboardList, ExternalLink, Phone } from 'lucide-react';

import { PageSectionHeading } from '@/components/ui/page-section-heading';
import { RENKEI_VISIT_CONSULT_FORM_URL } from '~/constants/renkei';

export function RenkeiContactDetailSection() {
  const [consented, setConsented] = useState(false);

  return (
    <div
      id="renkei-contact-detail"
      className="-mx-4 sm:-mx-6 px-4 sm:px-6 py-12 md:py-14 bg-blue-50 dark:bg-slate-800 border-b border-blue-100 dark:border-slate-700 scroll-mt-32"
    >
      <PageSectionHeading
        tagline="連絡先"
        title="地域医療連携部の連絡先"
        subtitle="ご家族の方も、医療・介護関係者の方も、まずはオンライン相談書からご連絡ください。内容を確認のうえ、担当者より折り返しご連絡します。"
      />

      <div className="mb-4">
        <label className="flex items-start gap-3 cursor-pointer bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-xl px-5 py-4 mb-3 max-w-2xl mx-auto">
          <input
            type="checkbox"
            id="renkei-privacy-consent"
            className="mt-0.5 h-5 w-5 shrink-0 accent-primary cursor-pointer"
            required
            aria-required="true"
            checked={consented}
            onChange={(e) => setConsented(e.target.checked)}
          />
          <span className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
            <a href="/privacy" className="underline text-primary hover:opacity-80" target="_blank" rel="noopener">
              個人情報保護方針
            </a>
            を確認・同意のうえ、フォームに進みます（必須）
          </span>
        </label>

        <a
          id="renkei-form-link"
          href={RENKEI_VISIT_CONSULT_FORM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className={`flex flex-col sm:flex-row items-center justify-between gap-4 bg-primary dark:bg-blue-700 hover:opacity-95 transition-opacity rounded-2xl px-8 py-6 group ${
            consented ? '' : 'opacity-40 pointer-events-none'
          }`}
          aria-disabled={consented ? undefined : 'true'}
          tabIndex={consented ? undefined : -1}
        >
          <div className="flex items-center gap-4 text-white">
            <ClipboardList className="w-10 h-10 shrink-0" aria-hidden="true" />
            <div>
              <p className="text-xs font-semibold text-blue-100 mb-0.5">オンライン相談書（Googleフォーム）</p>
              <p className="text-xl font-black leading-tight">かもめクリニック 訪問診療相談書</p>
              <p className="text-sm text-blue-100 mt-1">
                患者さまの基本情報・状態・ご要望を記入して送信できます。24時間受付。
              </p>
            </div>
          </div>
          <div className="shrink-0">
            <span className="inline-flex items-center gap-2 bg-white text-primary font-bold px-5 py-3 rounded-xl text-sm group-hover:shadow-md transition-shadow">
              <ExternalLink className="w-4 h-4 shrink-0" aria-hidden="true" />
              フォームを開く
            </span>
          </div>
        </a>
      </div>

      <p className="text-center text-sm text-gray-500 dark:text-gray-400 mb-4">
        お急ぎの場合はお電話でもご相談いただけます。
      </p>

      <div className="grid sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-gray-200 dark:border-slate-700 p-6 text-center">
          <Phone className="w-8 h-8 text-primary mx-auto mb-3" aria-hidden="true" />
          <p className="font-bold text-gray-900 dark:text-white mb-1">地域医療連携部（専用）</p>
          <a href="tel:0643017883" className="text-2xl font-black text-primary hover:underline block">
            06-4301-7883
          </a>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">平日・祝日 9:00〜17:00</p>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 leading-snug text-left px-1">
            病院・施設・ケアマネの方からのご紹介、施設連携、訪問診療の受け入れ可否・エリア確認など
          </p>
        </div>
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-gray-200 dark:border-slate-700 p-6 text-center">
          <Phone className="w-8 h-8 text-gray-500 mx-auto mb-3" aria-hidden="true" />
          <p className="font-bold text-gray-900 dark:text-white mb-1">一般受付</p>
          <a href="tel:0643017871" className="text-2xl font-black text-gray-700 dark:text-gray-300 hover:underline block">
            06-4301-7871
          </a>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">平日・祝日 9:00〜17:00</p>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 leading-snug text-left px-1">
            診療のご予約・変更、患者さまご本人・ご家族からのお問い合わせなど
          </p>
        </div>
      </div>

      <p className="text-center text-xs text-gray-400 dark:text-gray-500 mt-4">FAX：06-4301-7872（随時受付）</p>
    </div>
  );
}
