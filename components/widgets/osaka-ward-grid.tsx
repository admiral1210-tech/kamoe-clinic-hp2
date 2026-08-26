import Link from 'next/link';
import { ArrowRight, Phone } from 'lucide-react';

import { OSAKA_CITY_WARDS } from '~/data/osaka-wards';
import { ctaHeroPrimaryClass } from '~/constants/clinical-page-ui';

export interface OsakaWardGridProps {
  showCta?: boolean;
}

export function OsakaWardGrid({ showCta = false }: OsakaWardGridProps) {
  return (
    <>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
        {OSAKA_CITY_WARDS.map(({ name, slug }) =>
          slug ? (
            <Link
              key={name}
              href={`/area/${slug}`}
              className="inline-flex items-center justify-center gap-1 rounded-xl border border-blue-200 bg-white px-3 py-2.5 text-center text-sm font-medium text-gray-800 transition-colors hover:border-primary dark:border-slate-700 dark:bg-slate-900 dark:text-gray-200"
            >
              {name}
              <ArrowRight className="h-3.5 w-3.5 shrink-0 text-primary" />
            </Link>
          ) : (
            <span
              key={name}
              className="inline-flex items-center justify-center rounded-xl border border-blue-200 bg-white px-3 py-2.5 text-center text-sm font-medium text-gray-800 dark:border-slate-700 dark:bg-slate-900 dark:text-gray-200"
            >
              {name}
            </span>
          )
        )}
      </div>

      {showCta && (
        <div className="mt-6 text-center">
          <a href="tel:0643017883" className={ctaHeroPrimaryClass}>
            <Phone className="h-4 w-4 shrink-0" /> エリア・担当院のご相談 06-4301-7883
          </a>
        </div>
      )}
    </>
  );
}
