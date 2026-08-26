import type { ReactNode } from 'react';

import { cn } from '@/lib/utils';

export interface RecruitSectionProps {
  id?: string;
  className?: string;
  scrollMarginClass?: string;
  children?: ReactNode;
}

/**
 * 固定ヘッダー下でアンカー先見出しが隠れないよう、WidgetWrapper と同じ scroll-margin を付与する。
 */
export function RecruitSection({ id, className, scrollMarginClass = 'scroll-mt-[72px]', children }: RecruitSectionProps) {
  return (
    <section id={id} className={cn(scrollMarginClass, className)}>
      {children}
    </section>
  );
}
