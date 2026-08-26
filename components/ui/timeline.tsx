import { twMerge } from 'tailwind-merge';

import { resolveIcon } from '@/components/ui/icon-map';

export interface TimelineItem {
  title?: string;
  description?: string;
  icon?: string;
  classes?: {
    panel?: string;
    title?: string;
    description?: string;
    icon?: string;
  };
}

export interface TimelineProps {
  items?: TimelineItem[];
  defaultIcon?: string;
  classes?: {
    container?: string;
    panel?: string;
    title?: string;
    description?: string;
    icon?: string;
  };
}

export function Timeline({ items = [], classes = {}, defaultIcon }: TimelineProps) {
  const {
    container: containerClass = '',
    panel: panelClass = '',
    title: titleClass = '',
    description: descriptionClass = '',
    icon: defaultIconClass = 'text-primary border-primary',
  } = classes;

  if (!items.length) return null;

  return (
    <div className={containerClass}>
      {items.map(({ title, description, icon, classes: itemClasses = {} }, index) => {
        const Icon = resolveIcon(icon || defaultIcon);
        const isLast = index === items.length - 1;
        return (
          <div key={title ?? index} className={twMerge('flex', panelClass, itemClasses?.panel)}>
            <div className="mr-4 flex flex-col items-center rtl:mr-0 rtl:ml-4">
              <div>
                <div className="flex items-center justify-center">
                  {Icon && (
                    <Icon
                      className={twMerge('h-10 w-10 rounded-full border-2 p-2', defaultIconClass, itemClasses?.icon)}
                    />
                  )}
                </div>
              </div>
              {!isLast && <div className="h-full w-px bg-black/10" />}
            </div>
            <div className={`pt-1 ${isLast ? '' : 'pb-8'}`}>
              {title && (
                <h3
                  className={twMerge('m-0 text-xl font-bold', titleClass, itemClasses?.title)}
                  dangerouslySetInnerHTML={{ __html: title }}
                />
              )}
              {description && (
                <p
                  className={twMerge('mt-2 text-muted', descriptionClass, itemClasses?.description)}
                  dangerouslySetInnerHTML={{ __html: description }}
                />
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
