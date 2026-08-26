import type { ReactNode } from 'react';
import Image from 'next/image';

import { WidgetWrapper, type WidgetProps } from '@/components/ui/widget-wrapper';
import { Headline } from '@/components/ui/headline';
import { ItemGrid, type Item } from '@/components/ui/item-grid';

export interface ContentImage {
  src: string;
  alt?: string;
  width?: number;
  height?: number;
}

export interface ContentCallToAction {
  text?: string;
  href?: string;
}

export interface ContentProps extends WidgetProps {
  title?: string;
  subtitle?: string;
  tagline?: string;
  content?: string;
  callToAction?: ContentCallToAction;
  items?: Item[];
  columns?: number;
  image?: ContentImage | ReactNode;
  isReversed?: boolean;
  isAfterContent?: boolean;
  classes?: {
    container?: string;
    headline?: Record<string, string>;
  };
}

function isContentImage(image: ContentProps['image']): image is ContentImage {
  return Boolean(image) && typeof image === 'object' && 'src' in (image as ContentImage);
}

export function Content({
  id,
  isDark = false,
  bg,
  scrollMarginClass,
  title,
  subtitle,
  tagline,
  content,
  callToAction,
  items = [],
  columns,
  image,
  isReversed = false,
  isAfterContent = false,
  classes = {},
}: ContentProps) {
  const hasImage = Boolean(image);

  return (
    <WidgetWrapper
      id={id}
      isDark={isDark}
      containerClass={`mx-auto max-w-7xl ${isAfterContent ? 'pt-0 md:pt-0 lg:pt-0' : ''} ${classes?.container ?? ''}`}
      bg={bg}
      scrollMarginClass={scrollMarginClass}
    >
      <Headline
        title={title}
        subtitle={subtitle}
        tagline={tagline}
        classes={{
          container: 'max-w-xl sm:mx-auto lg:max-w-2xl',
          title: 'text-4xl md:text-5xl font-bold tracking-tighter mb-4 font-heading',
          subtitle: 'max-w-3xl mx-auto sm:text-center text-xl text-muted dark:text-slate-400',
          ...(classes?.headline ?? {}),
        }}
      />
      <div className="mx-auto max-w-7xl p-4 md:px-8">
        <div className={`md:flex ${isReversed ? 'md:flex-row-reverse' : ''} md:gap-16`}>
          <div className={hasImage ? 'self-center md:basis-1/2' : 'w-full'}>
            {content && (
              <div className="mb-12 text-lg dark:text-slate-400" dangerouslySetInnerHTML={{ __html: content }} />
            )}

            {callToAction && (
              <div className="mb-8 mt-[-40px] text-primary">
                <a href={callToAction.href} className="text-sm font-semibold hover:underline">
                  {callToAction.text}
                </a>
              </div>
            )}

            <ItemGrid
              items={items}
              columns={columns}
              defaultIcon="tabler:check"
              classes={{
                container: 'gap-y-4 md:gap-y-8',
                panel: 'max-w-none',
                title: 'text-lg font-medium leading-6 dark:text-white ml-2 rtl:ml-0 rtl:mr-2',
                description: 'text-muted dark:text-slate-400 ml-2 rtl:ml-0 rtl:mr-2',
                icon: 'flex h-7 w-7 items-center justify-center rounded-full bg-green-600 dark:bg-green-700 text-gray-50 p-1',
                action: 'text-lg font-medium leading-6 dark:text-white ml-2 rtl:ml-0 rtl:mr-2',
              }}
            />
          </div>
          {hasImage && (
            <div aria-hidden="true" className="mt-10 md:mt-0 md:basis-1/2">
              <div className="relative m-auto max-w-4xl">
                {isContentImage(image) ? (
                  <Image
                    className="mx-auto w-full rounded-lg bg-gray-500 shadow-lg"
                    src={image.src}
                    alt={image.alt ?? ''}
                    width={image.width ?? 500}
                    height={image.height ?? 500}
                    sizes="(max-width: 768px) 100vw, 432px"
                  />
                ) : (
                  image
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </WidgetWrapper>
  );
}
