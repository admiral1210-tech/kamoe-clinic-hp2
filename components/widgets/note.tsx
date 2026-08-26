import type { ReactNode } from 'react';

import { resolveIcon } from '@/components/ui/icon-map';

export interface NoteProps {
  icon?: string;
  title?: ReactNode;
  description?: ReactNode;
}

export function Note({ icon = 'tabler:info-square', title, description }: NoteProps) {
  const Icon = resolveIcon(icon);

  return (
    <section className="bg-blue-50 not-prose" aria-labelledby="widget-note-heading">
      <div className="mx-auto max-w-6xl px-4 py-4 text-center text-base font-medium text-slate-800 sm:px-6">
        <div className="flex flex-col items-center gap-2 sm:flex-row sm:justify-center sm:gap-3">
          <div className="flex items-center justify-center gap-2">
            {Icon && <Icon className="h-5 w-5 shrink-0 text-primary" aria-hidden="true" />}
            <h2 id="widget-note-heading" className="m-0 text-base font-bold leading-snug sm:text-lg">
              {title}
            </h2>
          </div>
          <div className="max-w-3xl leading-relaxed text-slate-700">{description}</div>
        </div>
      </div>
    </section>
  );
}
