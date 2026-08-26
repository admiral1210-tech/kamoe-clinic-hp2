import type { Metadata } from 'next';
import Link from 'next/link';

import { Hero } from '@/components/widgets/hero';
import { buildMetadata } from '@/lib/seo';
import {
  clinicalHeroSubtitleClass,
  clinicalHeroTaglineClass,
  clinicalHeroTitleClass,
  ctaHeroPrimaryClass,
} from '~/constants/clinical-page-ui';

export const metadata: Metadata = buildMetadata({
  title: 'プライバシーポリシー｜かもめクリニック',
  ignoreTitleTemplate: true,
  description:
    'かもめクリニックの個人情報保護方針（プライバシーポリシー）。患者さまの個人情報・医療情報の取り扱いについて説明しています。',
  path: '/privacy',
});

const sectionHeadingClass = 'text-xl font-bold mt-10 mb-3 pb-2 border-b-2 border-primary/20 text-heading';

export default function PrivacyPage() {
  return (
    <>
      <Hero
        tagline="プライバシーポリシー"
        taglineClass={clinicalHeroTaglineClass}
        titleClass={clinicalHeroTitleClass}
        subtitleClass={clinicalHeroSubtitleClass}
        title="個人情報の取り扱い"
        subtitle="患者さまをはじめとする皆さまの個人情報・医療情報を適切に保護するための方針です。"
      />

      <section className="bg-gray-50 py-12 dark:bg-slate-800 md:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mx-auto max-w-3xl">
            <p className="mb-2 text-center text-xs font-semibold uppercase tracking-widest text-primary">
              Privacy Policy
            </p>
            <p className="mb-10 text-center text-sm text-muted">個人情報保護方針</p>

            <div className="max-w-none text-default" style={{ lineHeight: 1.9 }}>
              <p>
                医療法人社団
                かもめクリニック（以下「当院」）は、患者さまをはじめとする皆さまの個人情報・医療情報を適切に保護することが、在宅医療を提供する医療機関としての重要な責務であると認識しています。以下の方針に基づき、個人情報の保護に努めます。
              </p>

              <h2 className={sectionHeadingClass}>1. 個人情報の収集について</h2>
              <p>当院は、以下の目的のために必要な範囲で個人情報を収集します。</p>
              <ul className="ml-6 list-disc space-y-1">
                <li>訪問診療・在宅医療サービスの提供</li>
                <li>診療録・処方箋・各種医療書類の作成</li>
                <li>診療費の請求・医療保険・介護保険への請求</li>
                <li>医療相談（電話・お問い合わせフォーム・メール等）への対応</li>
                <li>採用選考・従業員管理</li>
                <li>ウェブサイトからのお問い合わせへの対応</li>
              </ul>

              <h2 className={sectionHeadingClass}>2. 個人情報の利用目的</h2>
              <p>収集した個人情報は、次の目的に使用します。</p>
              <ul className="ml-6 list-disc space-y-1">
                <li>患者さまへの適切な医療・看護・介護サービスの提供</li>
                <li>医療機関・介護施設・調剤薬局等との診療情報の共有（患者さまの同意のうえ）</li>
                <li>医療費の請求および各種保険請求事務</li>
                <li>地域医療連携・退院支援・ケアカンファレンスへの参加</li>
                <li>当院が行う医療・看護・介護に関する実習・研修への協力（匿名化のうえ）</li>
                <li>医療の質向上のための内部的な分析・統計（匿名加工情報として使用）</li>
              </ul>

              <h2 className={sectionHeadingClass}>3. 個人情報の第三者への提供</h2>
              <p>当院は、以下の場合を除き、患者さまの個人情報を事前の同意なく第三者に提供しません。</p>
              <ul className="ml-6 list-disc space-y-1">
                <li>法令に基づく開示が必要な場合（感染症法、児童虐待防止法、裁判所命令等）</li>
                <li>生命・身体・財産の保護のために緊急かつやむを得ない場合</li>
                <li>患者さまご本人の同意を得た場合（他院への紹介状、多職種連携等）</li>
                <li>医療保険・介護保険の保険者への診療報酬請求</li>
              </ul>

              <h2 className={sectionHeadingClass}>4. 個人情報の安全管理</h2>
              <p>当院は、個人情報の漏洩・滅失・毀損の防止のため、以下の安全管理措置を講じます。</p>
              <ul className="ml-6 list-disc space-y-1">
                <li>個人情報保護責任者の設置および職員への定期的な教育・研修の実施</li>
                <li>電子カルテ・情報システムへのアクセス制御および通信の暗号化</li>
                <li>書類・媒体の施錠保管および廃棄時の適切な処理</li>
                <li>外部委託先（システム会社・請求代行等）との機密保持契約の締結</li>
              </ul>

              <h2 className={sectionHeadingClass}>5. 個人情報の開示・訂正・削除のご請求</h2>
              <p>
                患者さまご本人（またはご家族・法定代理人）は、当院が保有するご自身の個人情報について、以下の請求を行うことができます。ご請求の際は、本人確認書類をご持参のうえ、下記の窓口までお申し出ください。
              </p>
              <ul className="ml-6 list-disc space-y-1">
                <li>開示の請求</li>
                <li>訂正・追加の請求</li>
                <li>削除の請求</li>
                <li>利用停止の請求</li>
                <li>消去の請求</li>
                <li>第三者提供の停止の請求</li>
              </ul>
              <p>
                なお、診療録等の医療情報の開示については、「診療情報の提供等に関する指針」（厚生労働省）に基づき対応いたします。
              </p>

              <h2 className={sectionHeadingClass}>6. Cookieおよびアクセス解析について</h2>
              <p>
                当院のウェブサイトでは、サービス改善・利用状況の把握のため、Google
                Analytics等のアクセス解析ツールを使用しています。これらのツールはCookieを通じて情報を収集しますが、個人を特定する情報は含まれません。Cookieの利用を希望されない場合は、ブラウザの設定で無効にすることができます。
              </p>

              <h2 className={sectionHeadingClass}>7. 外部サービスの利用と個人情報の国外移転</h2>
              <p>
                当院のウェブサイトでは、お問い合わせフォームの運営にあたり、Google
                LLC（米国）が提供するGoogleフォームを利用しています。Googleフォームに入力された情報（お名前・所属機関・お問い合わせ内容等）は、Google
                LLCのサーバー（主に米国）に送信・保管されます。
              </p>
              <p>
                これはGDPR第46条および個人情報保護法第24条（外国にある第三者への提供）に基づく国外移転に該当します。Google
                LLCは、欧州委員会の十分性認定を受けた標準契約条項（SCC）に準拠するなど、適切な保護措置を講じています。詳細は{' '}
                <a
                  href="https://policies.google.com/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary underline"
                >
                  Google プライバシーポリシー
                </a>
                をご参照ください。
              </p>
              <p>
                Googleフォームへの情報入力は任意です。入力内容は送信ボタンを押した時点でGoogle
                LLCへ送信されます。送信前に本ページおよびGoogleのプライバシーポリシーをご確認のうえ、ご入力ください。
              </p>

              <h2 className={sectionHeadingClass}>8. プライバシーポリシーの改定</h2>
              <p>
                本方針は、法令の改正・社会情勢の変化等に応じて適宜見直し・改定を行います。改定後の内容は、当ウェブサイト上に掲載した時点から効力を発するものとします。
              </p>

              <h2 className={sectionHeadingClass}>9. お問い合わせ窓口</h2>
              <p>個人情報の取り扱いに関するご質問・ご相談・ご請求は、以下の窓口までご連絡ください。</p>

              <div className="mt-6 rounded-r-lg border-l-4 border-primary bg-primary/[0.06] px-8 py-6">
                <p className="mb-3 text-[1.05rem] font-bold text-heading">医療法人社団 かもめクリニック</p>
                <p className="my-1">開示等請求受付窓口：地域医療連携部</p>
                <p className="my-1">
                  電話：
                  <a href="tel:0643017871" className="font-semibold text-primary">
                    06-4301-7871
                  </a>
                </p>
                <p className="my-1">FAX：06-4301-7872</p>
                <p className="my-1">受付時間：平日・祝日 9:00〜17:00</p>
              </div>

              <p className="mt-10 text-right text-sm text-muted">
                制定：2017年4月1日
                <br />
                最終改定：2025年4月1日
              </p>
            </div>

            <div className="mt-12 text-center">
              <Link href="/" className={`inline-flex items-center gap-2 ${ctaHeroPrimaryClass}`}>
                ← トップページへ戻る
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
