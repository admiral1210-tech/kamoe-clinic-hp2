import { Phone, ClipboardList } from 'lucide-react';

import { cn } from '@/lib/utils';
import { CLINIC_CONTACT } from '~/data/clinic-contact';
import { ctaHeroPrimaryClass, ctaHeroSecondaryClass } from '~/constants/clinical-page-ui';

export interface ClinicalPageClosingProps {
  id?: string;
}

export function ClinicalPageClosing({ id }: ClinicalPageClosingProps) {
  return (
    <section
      {...(id ? { id } : {})}
      className={cn('relative border-t border-gray-200 py-14 not-prose md:py-16', id && 'scroll-mt-32')}
      aria-labelledby="clinical-closing-heading"
    >
      <div className="mx-auto max-w-3xl px-section-x text-center">
        <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-primary">ご相談・お問い合わせ</p>
        <h2 id="clinical-closing-heading" className="mb-3 font-heading text-2xl font-bold tracking-tight text-heading md:text-3xl">
          お気軽にご連絡ください
        </h2>
        <p className="mb-8 text-sm leading-relaxed text-muted md:text-base">
          訪問診療のご相談は、お電話・フォームから承っています。費用・保険については費用ページもあわせてご確認ください。
        </p>
        <div className="flex flex-col flex-wrap justify-center gap-3 sm:flex-row sm:gap-4">
          <a href={CLINIC_CONTACT.telHref} className={ctaHeroPrimaryClass}>
            <Phone className="h-5 w-5 shrink-0" aria-hidden="true" />
            {CLINIC_CONTACT.telDisplay}
          </a>
          <a href="/renkei" className={ctaHeroSecondaryClass}>
            <ClipboardList className="h-5 w-5 shrink-0" aria-hidden="true" />
            問い合わせフォーム
          </a>
          <a href="/cost" className={ctaHeroSecondaryClass}>
            費用・保険
          </a>
        </div>
      </div>
    </section>
  );
}
