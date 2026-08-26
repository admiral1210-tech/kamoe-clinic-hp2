import type { ReactNode } from 'react';
import Image from 'next/image';

import { WidgetWrapper, type WidgetProps } from '@/components/ui/widget-wrapper';
import { Headline } from '@/components/ui/headline';
import { Timeline } from '@/components/ui/timeline';
import { resolveIcon } from '@/components/ui/icon-map';
import type { Item } from '@/components/ui/item-grid';

export interface StepsCallToAction {
  text?: string;
  href?: string;
}

export interface StepsImage {
  src: string;
  alt?: string;
}

export interface StepsProps extends WidgetProps {
  title?: string;
  subtitle?: string;
  tagline?: string;
  callToAction?: StepsCallToAction | ReactNode;
  items?: Item[];
  image?: StepsImage | ReactNode;
  isReversed?: boolean;
  variant?: 'timeline' | 'numbered';
  classes?: {
    container?: string;
    headline?: Record<string, string>;
    items?: Record<string, string>;
  };
}

function isStepsImage(image: StepsProps['image']): image is StepsImage {
  return Boolean(image) && typeof image === 'object' && 'src' in (image as StepsImage);
}

function isCallToAction(action: StepsProps['callToAction']): action is StepsCallToAction {
  return Boolean(action) && typeof action === 'object' && 'href' in (action as StepsCallToAction);
}

export function Steps({
  id,
  isDark = false,
  bg,
  scrollMarginClass,
  title,
  subtitle,
  tagline,
  callToAction,
  items = [],
  image,
  isReversed = false,
  variant = 'timeline',
  classes = {},
}: StepsProps) {
  if (variant === 'numbered') {
    return (
      <WidgetWrapper id={id} isDark={isDark} containerClass={`mx-auto max-w-6xl ${classes?.container ?? ''}`} bg={bg}>
        <div className={`flex flex-col gap-8 md:flex-row md:gap-12 ${isReversed ? 'md:flex-row-reverse' : ''}`}>
          <div className={`w-full gap-8 md:gap-12 lg:w-1/2 ${isReversed ? 'ml-0 md:ml-8 lg:ml-16' : 'mr-0 md:mr-8 lg:mr-16'}`}>
            <Headline
              title={title}
              subtitle={subtitle}
              tagline={tagline}
              classes={{
                container: 'text-center md:text-left rtl:md:text-right mb-4 md:mb-8',
                title: 'mb-4 text-3xl lg:text-4xl font-bold font-heading',
                subtitle: 'mb-8 text-xl text-muted',
              }}
            />
            <div className="w-full text-center md:text-left rtl:md:text-right">
              {isCallToAction(callToAction) && callToAction.text && callToAction.href && (
                <a
                  href={callToAction.href}
                  className="mb-12 inline-flex w-auto items-center justify-center text-sm font-semibold text-primary hover:underline"
                >
                  {callToAction.text}
                </a>
              )}
              {!isCallToAction(callToAction) && callToAction}
            </div>
          </div>
          <div className="w-full px-0 lg:w-1/2">
            <ul className="space-y-10">
              {items.map(({ title: itemTitle, description, icon }, index) => {
                const Icon = resolveIcon(icon);
                return (
                  <li key={itemTitle ?? index} className="flex md:-mx-4">
                    <div className="pr-4 rtl:pl-4 rtl:pr-0 sm:pl-4 rtl:sm:pl-0 rtl:sm:pr-4">
                      <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-pill bg-blue-100 text-2xl font-bold text-primary">
                        {Icon ? <Icon className="icon-bold h-6 w-6" /> : index + 1}
                      </span>
                    </div>
                    <div className="pl-4 rtl:pl-0 rtl:pr-4">
                      {itemTitle && (
                        <h3 className="mb-4 font-heading text-xl font-semibold" dangerouslySetInnerHTML={{ __html: itemTitle }} />
                      )}
                      {description && <p className="text-muted" dangerouslySetInnerHTML={{ __html: description }} />}
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </WidgetWrapper>
    );
  }

  return (
    <WidgetWrapper id={id} isDark={isDark} containerClass={`max-w-5xl ${classes?.container ?? ''}`} bg={bg} scrollMarginClass={scrollMarginClass}>
      <div
        className={`flex flex-col gap-8 md:gap-12 ${isReversed ? 'md:flex-row-reverse' : ''} ${image ? 'md:flex-row' : ''}`}
      >
        <div className={`md:self-center md:py-4 ${image ? 'md:basis-1/2' : 'w-full'}`}>
          <Headline
            title={title}
            subtitle={subtitle}
            tagline={tagline}
            classes={{
              container: 'text-left rtl:text-right',
              title: 'text-3xl lg:text-4xl',
              ...(classes?.headline ?? {}),
            }}
          />
          <div role="region" aria-label="応募の流れの各ステップ">
            <Timeline items={items} classes={classes?.items} />
          </div>
        </div>
        {image && (
          <div className="relative md:basis-1/2">
            {isStepsImage(image) ? (
              <Image
                className="inset-0 w-full rounded-card bg-gray-400 object-cover object-top shadow-lg md:absolute md:h-full"
                src={image.src}
                alt={image.alt ?? ''}
                width={432}
                height={768}
                sizes="(max-width: 768px) 100vw, 432px"
              />
            ) : (
              image
            )}
          </div>
        )}
      </div>
    </WidgetWrapper>
  );
}
