import type { ReactNode } from 'react';

import { WidgetWrapper, type WidgetProps } from '@/components/ui/widget-wrapper';
import { Headline } from '@/components/ui/headline';

export interface CallToActionAction {
  text?: string;
  href?: string;
  target?: string;
  rel?: string;
}

export interface CallToActionProps extends WidgetProps {
  title?: string;
  subtitle?: string;
  tagline?: string;
  actions?: CallToActionAction[] | ReactNode;
  classes?: {
    container?: string;
  };
}

export function CallToAction({
  id,
  isDark = false,
  bg,
  scrollMarginClass,
  title,
  subtitle,
  tagline,
  actions,
  classes = {},
}: CallToActionProps) {
  return (
    <WidgetWrapper
      id={id}
      isDark={isDark}
      containerClass={`mx-auto max-w-7xl ${classes?.container ?? ''}`}
      scrollMarginClass={scrollMarginClass}
      bg={bg}
    >
      <div className="mx-auto max-w-3xl rounded-md p-6 text-center shadow-xl">
        <Headline
          title={title}
          subtitle={subtitle}
          tagline={tagline}
          classes={{
            container: 'mb-0 md:mb-0',
            title: 'text-2xl md:text-3xl font-bold font-heading tracking-tight mb-3 text-heading',
            subtitle: 'text-sm md:text-base text-muted leading-relaxed',
          }}
        />
        {actions && (
          <div className="m-auto mt-6 flex max-w-lg flex-col flex-nowrap gap-3 sm:flex-row sm:justify-center sm:gap-3">
            {Array.isArray(actions)
              ? actions.map((action, index) => (
                  <div key={action.text ?? index} className="flex w-full sm:w-auto">
                    <a
                      href={action.href}
                      target={action.target}
                      rel={action.rel}
                      className="inline-flex w-full items-center justify-center rounded-card bg-primary px-6 py-3 text-sm font-bold text-white shadow-md transition-opacity hover:opacity-90 sm:mb-0 sm:w-auto"
                    >
                      {action.text}
                    </a>
                  </div>
                ))
              : actions}
          </div>
        )}
      </div>
    </WidgetWrapper>
  );
}
