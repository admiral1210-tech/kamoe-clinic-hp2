import type { ReactNode } from 'react';
import Image from 'next/image';

import { WidgetWrapper, type WidgetProps } from '@/components/ui/widget-wrapper';
import { Headline } from '@/components/ui/headline';
import { ItemGrid, type Item } from '@/components/ui/item-grid';
import { ItemGrid2 } from '@/components/ui/item-grid-2';

export interface FeaturesImage {
  src: string;
  alt?: string;
}

export interface FeaturesProps extends WidgetProps {
  title?: string;
  subtitle?: string;
  tagline?: string;
  items?: Item[];
  columns?: number;
  defaultIcon?: string;
  isBeforeContent?: boolean;
  isAfterContent?: boolean;
  image?: FeaturesImage | ReactNode;
  variant?: 'grid' | 'cards' | 'withImage';
  numberedTitles?: boolean;
  classes?: {
    container?: string;
    headline?: Record<string, string>;
    items?: Record<string, string>;
  };
}

function isFeaturesImage(image: FeaturesProps['image']): image is FeaturesImage {
  return Boolean(image) && typeof image === 'object' && 'src' in (image as FeaturesImage);
}

export function Features({
  id,
  isDark = false,
  bg,
  scrollMarginClass,
  title,
  subtitle,
  tagline,
  items = [],
  columns,
  defaultIcon,
  isBeforeContent,
  isAfterContent,
  image,
  variant = 'grid',
  numberedTitles = false,
  classes = {},
}: FeaturesProps) {
  const defaultColumns = variant === 'cards' ? 3 : 2;
  const resolvedColumns = columns ?? defaultColumns;

  const containerClass = (() => {
    if (variant === 'cards') return `mx-auto max-w-7xl ${classes?.container ?? ''}`;
    if (variant === 'withImage') {
      return `${isBeforeContent ? 'md:pb-8 lg:pb-12' : ''} ${isAfterContent ? 'pt-0 md:pt-0 lg:pt-0' : ''} ${classes?.container ?? ''}`;
    }
    return `max-w-5xl ${classes?.container ?? ''}`;
  })();

  return (
    <WidgetWrapper id={id} isDark={isDark} containerClass={containerClass} bg={bg} scrollMarginClass={scrollMarginClass}>
      <Headline title={title} subtitle={subtitle} tagline={tagline} classes={classes?.headline} />

      {variant === 'withImage' && (
        <div aria-hidden="true" className="aspect-w-16 aspect-h-7">
          {image && (
            <div className="mx-auto h-80 w-full rounded-card bg-gray-500 object-cover shadow-lg">
              {isFeaturesImage(image) ? (
                <Image
                  className="mx-auto h-80 w-full rounded-card bg-gray-500 object-cover shadow-lg"
                  src={image.src}
                  alt={image.alt ?? ''}
                  width={1200}
                  height={320}
                  sizes="(max-width: 768px) 100vw, 1200px"
                />
              ) : (
                image
              )}
            </div>
          )}
        </div>
      )}

      {variant === 'cards' ? (
        <ItemGrid2
          items={items}
          columns={resolvedColumns}
          defaultIcon={defaultIcon}
          numberedTitles={numberedTitles}
          classes={{
            container: 'gap-4 md:gap-6',
            panel:
              'rounded-card shadow-[0_4px_30px_rgba(0,0,0,0.1)] backdrop-blur border border-[#ffffff29] bg-white p-6',
            icon: 'w-12 h-12 mb-6 text-primary',
            title: '',
            description: '',
            ...(classes?.items ?? {}),
          }}
        />
      ) : (
        <ItemGrid
          items={items}
          columns={resolvedColumns}
          defaultIcon={defaultIcon}
          classes={
            variant === 'withImage'
              ? {
                  container: 'mt-12',
                  panel: 'max-w-full sm:max-w-md',
                  title: 'text-lg font-semibold',
                  description: 'mt-0.5',
                  icon: 'flex-shrink-0 mt-1 text-primary w-6 h-6',
                  ...(classes?.items ?? {}),
                }
              : {
                  container: '',
                  title: 'md:text-[1.3rem]',
                  icon: 'text-white bg-primary rounded-pill w-10 h-10 p-2 md:w-12 md:h-12 md:p-3 mr-4 rtl:ml-4 rtl:mr-0',
                  ...(classes?.items ?? {}),
                }
          }
        />
      )}
    </WidgetWrapper>
  );
}
