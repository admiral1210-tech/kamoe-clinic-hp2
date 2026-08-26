import type { ElementType, ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

import { cn } from '@/lib/utils';

export interface WidgetProps {
  id?: string;
  isDark?: boolean;
  bg?: ReactNode;
  scrollMarginClass?: string;
}

interface BackgroundProps {
  isDark?: boolean;
  children?: ReactNode;
}

export function Background({ isDark = false, children }: BackgroundProps) {
  return <div className={cn('absolute inset-0', isDark && 'bg-dark dark:bg-transparent')}>{children}</div>;
}

export interface WidgetWrapperProps extends WidgetProps {
  containerClass?: string;
  as?: ElementType;
  children?: ReactNode;
}

export function WidgetWrapper({
  id,
  isDark = false,
  containerClass = '',
  bg,
  as: WrapperTag = 'section',
  scrollMarginClass,
  children,
}: WidgetWrapperProps) {
  const scrollMt = scrollMarginClass ?? 'scroll-mt-[72px]';

  return (
    <WrapperTag className={cn('relative not-prose', scrollMt)} {...(id ? { id } : {})}>
      <div className="pointer-events-none absolute inset-0 -z-[1]" aria-hidden="true">
        {bg ?? <Background isDark={isDark} />}
      </div>
      <div
        className={cn(
          twMerge('relative mx-auto max-w-7xl px-section-x py-section-y text-default', containerClass),
          isDark && 'dark'
        )}
      >
        {children}
      </div>
    </WrapperTag>
  );
}
