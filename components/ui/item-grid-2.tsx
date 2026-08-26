import { twMerge } from 'tailwind-merge';

import { resolveIcon } from '@/components/ui/icon-map';
import type { Item } from '@/components/ui/item-grid';

export interface ItemGrid2Props {
  items?: Item[];
  columns?: number;
  defaultIcon?: string;
  numberedTitles?: boolean;
  classes?: {
    container?: string;
    panel?: string;
    title?: string;
    description?: string;
    icon?: string;
  };
}

export function ItemGrid2({ items = [], columns, defaultIcon = '', classes = {}, numberedTitles = false }: ItemGrid2Props) {
  const {
    container: containerClass = '',
    panel: panelClass = '',
    title: titleClass = '',
    description: descriptionClass = '',
    icon: defaultIconClass = 'text-primary',
  } = classes;

  if (!items.length) return null;

  return (
    <div
      className={twMerge(
        `grid gap-8 gap-x-12 sm:gap-y-8 ${
          columns === 4
            ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'
            : columns === 3
              ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
              : columns === 2
                ? 'grid-cols-1 sm:grid-cols-2'
                : ''
        }`,
        containerClass,
        numberedTitles && 'clinical-itemgrid2-numbered'
      )}
    >
      {items.map(
        ({ title, description, descriptionSummary, icon, callToAction, highlight, classes: itemClasses = {} }, index) => {
          const Icon = resolveIcon(icon || defaultIcon);
          return (
            <div
              key={title ?? index}
              className={twMerge(
                'relative flex flex-col',
                panelClass,
                itemClasses?.panel,
                highlight && 'shadow-[0_4px_24px_rgba(0,0,0,0.08)] ring-2 ring-primary/35'
              )}
            >
              {Icon && <Icon className={twMerge('mb-2 h-10 w-10', defaultIconClass, itemClasses?.icon)} />}
              {title && <h3 className={twMerge('text-xl font-bold', titleClass, itemClasses?.title)}>{title}</h3>}
              {descriptionSummary && (
                <p className={twMerge('mt-2 text-muted', descriptionClass, itemClasses?.description)}>
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
                    className={twMerge('mt-2 text-muted', descriptionClass, itemClasses?.description)}
                    dangerouslySetInnerHTML={{ __html: description }}
                  />
                ))}
              {callToAction && (
                <div className="mt-2">
                  <a href={callToAction.href} className="text-sm font-semibold text-primary hover:underline">
                    {callToAction.text}
                  </a>
                </div>
              )}
            </div>
          );
        }
      )}
      {numberedTitles && (
        <style>{`
          .clinical-itemgrid2-numbered {
            counter-reset: clinical-feature2;
          }
          .clinical-itemgrid2-numbered > div > h3::before {
            counter-increment: clinical-feature2;
            content: counter(clinical-feature2) '.\\00a0';
            font-weight: 800;
            color: var(--aw-color-primary);
          }
        `}</style>
      )}
    </div>
  );
}
