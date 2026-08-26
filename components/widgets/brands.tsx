import Image from 'next/image';

import { WidgetWrapper, type WidgetProps } from '@/components/ui/widget-wrapper';
import { Headline } from '@/components/ui/headline';
import { resolveIcon } from '@/components/ui/icon-map';

export interface BrandImage {
  src: string;
  alt?: string;
}

export interface BrandsProps extends WidgetProps {
  title?: string;
  subtitle?: string;
  tagline?: string;
  icons?: string[];
  images?: BrandImage[];
  classes?: {
    container?: string;
  };
}

export function Brands({ id, isDark = false, bg, title = '', subtitle = '', tagline = '', icons = [], images = [], classes = {} }: BrandsProps) {
  return (
    <WidgetWrapper id={id} isDark={isDark} containerClass={`mx-auto max-w-6xl ${classes?.container ?? ''}`} bg={bg}>
      <Headline title={title} subtitle={subtitle} tagline={tagline} />

      <div className="flex flex-wrap justify-center gap-x-6 sm:gap-x-12 lg:gap-x-24">
        {icons.map((icon, index) => {
          const Icon = resolveIcon(icon);
          return Icon ? <Icon key={index} className="mx-auto h-auto w-12 py-3 text-gray-500 sm:mx-0 lg:py-5" /> : null;
        })}
        {images.map(
          (image, index) =>
            image.src && (
              <div key={index} className="col-span-1 my-2 flex justify-center rounded-md px-3 py-1 dark:bg-gray-200 lg:my-4">
                <Image src={image.src} alt={image.alt ?? ''} className="max-h-12" width={120} height={48} />
              </div>
            )
        )}
      </div>
    </WidgetWrapper>
  );
}
