import { twMerge } from 'tailwind-merge';

import { cn } from '@/lib/utils';
import { resolveIcon } from '@/components/ui/icon-map';

export interface ItemCallToAction {
  text?: string;
  href?: string;
  variant?: 'primary' | 'secondary' | 'tertiary' | 'link';
  classes?: Record<string, string>;
}

export interface Item {
  title?: string;
  description?: string;
  descriptionSummary?: string;
  icon?: string;
  highlight?: boolean;
  classes?: {
    panel?: string;
    title?: string;
    description?: string;
    icon?: string;
    actionClass?: string;
  };
  callToAction?: ItemCallToAction;
}

export interface ItemGridProps {
  items?: Item[];
  columns?: number;
  defaultIcon?: string;
  classes?: {
    container?: string;
    panel?: string;
    title?: string;
    description?: string;
    icon?: string;
    action?: string;
  };
}

export function ItemGrid({ items = [], columns, defaultIcon = '', classes = {} }: ItemGridProps) {
  const {
    container: containerClass = '',
    panel: panelClass = '',
    title: titleClass = '',
    description: descriptionClass = '',
    icon: defaultIconClass = 'text-primary',
    action: actionClass = '',
  } = classes;

  if (!items.length) return null;

  return (
    <div
      className={twMerge(
        `mx-auto grid gap-8 md:gap-y-12 ${
          columns === 4
            ? 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
            : columns === 3
              ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
              : columns === 2
                ? 'grid-cols-1 sm:grid-cols-2'
                : ''
        }`,
        containerClass
      )}
    >
      {items.map(({ title, description, descriptionSummary, icon, callToAction, classes: itemClasses = {} }, index) => {
        const Icon = resolveIcon(icon || defaultIcon);
        return (
          <div key={title ?? index}>
            <div className={twMerge('flex max-w-md flex-row', panelClass, itemClasses?.panel)}>
              <div className="flex justify-center">
                {Icon && (
                  <Icon className={twMerge('mr-2 h-7 w-7 rtl:mr-0 rtl:ml-2', defaultIconClass, itemClasses?.icon)} />
                )}
              </div>
              <div className="mt-0.5">
                {title && (
                  <h3 className={twMerge('text-xl font-bold', titleClass, itemClasses?.title)}>{title}</h3>
                )}
                {descriptionSummary && (
                  <p className={twMerge(title ? 'mt-3' : '', 'text-muted', descriptionClass, itemClasses?.description)}>
                    {descriptionSummary}
                  </p>
                )}
                {description &&
                  (descriptionSummary ? (
                    <details className="mt-2">
                      <summary className="cursor-pointer list-none text-sm font-semibold text-primary hover:underline [&::-webkit-details-marker]:hidden">
                        続きを読む
                      </summary>
                      <div
                        className={twMerge('mt-2 text-muted', descriptionClass, itemClasses?.description)}
                        dangerouslySetInnerHTML={{ __html: description }}
                      />
                    </details>
                  ) : (
                    <p
                      className={twMerge(title ? 'mt-3' : '', 'text-muted', descriptionClass, itemClasses?.description)}
                      dangerouslySetInnerHTML={{ __html: description }}
                    />
                  ))}
                {callToAction && (
                  <div
                    className={twMerge(
                      title || description || descriptionSummary ? 'mt-3' : '',
                      actionClass,
                      itemClasses?.actionClass
                    )}
                  >
                    <a
                      href={callToAction.href}
                      className={cn('text-sm font-semibold text-primary hover:underline', callToAction.classes?.link)}
                    >
                      {callToAction.text}
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
