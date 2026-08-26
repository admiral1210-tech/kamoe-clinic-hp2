import type { ReactNode } from 'react';

import { resolveIcon } from '@/components/ui/icon-map';
import { ctaHeroPrimaryClass, ctaHeroSecondaryClass } from '~/constants/clinical-page-ui';

export interface ConsultCTAAction {
  text: string;
  href: string;
  icon?: string;
  variant?: 'primary' | 'secondary';
  target?: string;
  rel?: string;
}

export interface ConsultCTAProps {
  tagline?: string;
  title?: string;
  subtitle?: string | ReactNode;
  actions?: ConsultCTAAction[];
  showNap?: boolean;
  id?: string;
}

const defaultConsultActions: ConsultCTAAction[] = [
  { text: 'お電話でのご相談', href: 'tel:0643017871', icon: 'tabler:phone', variant: 'primary' },
  {
    text: '問い合わせフォームはこちら',
    href: '/renkei#renkei-contact-detail',
    icon: 'tabler:clipboard-list',
    variant: 'secondary',
  },
];

const variantClass: Record<string, string> = {
  primary: ctaHeroPrimaryClass,
  secondary: ctaHeroSecondaryClass,
};

export function ConsultCTA({
  tagline = '相談窓口',
  title = 'お気軽にご相談ください',
  subtitle = '受付は平日・祝日 9:00〜17:00。緊急往診は24時間365日対応。\nご本人・ご家族・医療介護関係者からのお問い合わせも歓迎します。',
  actions = defaultConsultActions,
  showNap = true,
  id = 'contact',
}: ConsultCTAProps) {
  const isRichSubtitle = typeof subtitle !== 'string';

  return (
    <section id={id} className="scroll-mt-32 bg-white py-8 not-prose md:py-10">
      <div className="mx-auto max-w-7xl px-section-x">
        <div className="mb-5 text-center">
          {tagline && <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-primary">{tagline}</p>}
          <h2 className="font-heading text-xl font-bold text-heading md:text-2xl">{title}</h2>
          {isRichSubtitle ? (
            <div className="mt-2 text-sm leading-relaxed text-muted [&_a]:font-semibold [&_a]:text-primary [&_a]:underline">
              {subtitle}
            </div>
          ) : (
            subtitle && <p className="mt-2 whitespace-pre-line text-sm leading-relaxed text-muted">{subtitle}</p>
          )}
        </div>

        <div className="rounded-2xl border border-gray-100 bg-gray-50 p-4 shadow-sm">
          <div className="mb-3 flex flex-col justify-center gap-3 sm:flex-row">
            {actions.map((action) => {
              const Icon = resolveIcon(action.icon);
              return (
                <a
                  key={action.text}
                  href={action.href}
                  target={action.target}
                  rel={action.rel}
                  className={variantClass[action.variant ?? 'primary']}
                >
                  {Icon && <Icon className="h-5 w-5 shrink-0" />}
                  {action.text}
                </a>
              );
            })}
          </div>
          {showNap && (
            // eslint-disable-next-line no-irregular-whitespace -- full-width spaces match the original copy
            <p className="text-center text-xs text-muted">〒552-0004 大阪市港区夕凪2丁目16-9　TEL 06-4301-7871　FAX 06-4301-7872</p>
          )}
        </div>
      </div>
    </section>
  );
}
