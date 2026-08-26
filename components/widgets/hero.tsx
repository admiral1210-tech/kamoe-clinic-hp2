import type { ReactNode } from 'react';
import Image from 'next/image';

const defaultTitleClass =
  'text-5xl md:text-6xl font-bold leading-tighter tracking-tighter mb-4 font-heading dark:text-gray-200';
const defaultSubtitleClass = 'text-xl text-muted mb-6 dark:text-slate-300';

export interface HeroAction {
  text?: string;
  href?: string;
  variant?: 'primary' | 'secondary' | 'tertiary' | 'link';
  target?: string;
  rel?: string;
  icon?: string;
}

export interface HeroImage {
  src: string;
  alt?: string;
  width?: number;
  height?: number;
}

export interface HeroProps {
  id?: string;
  tagline?: ReactNode;
  title?: ReactNode;
  subtitle?: ReactNode;
  content?: ReactNode;
  actions?: HeroAction[] | ReactNode;
  image?: HeroImage | ReactNode;
  bg?: ReactNode;
  imageFirst?: boolean;
  taglineClass?: string;
  titleClass?: string;
  subtitleClass?: string;
  imageContainerClass?: string;
  textBlockPaddingClass?: string;
  sectionPaddingClass?: string;
}

function isHeroImage(image: HeroProps['image']): image is HeroImage {
  return Boolean(image) && typeof image === 'object' && 'src' in (image as HeroImage);
}

export function Hero({
  id,
  tagline,
  title,
  subtitle,
  content,
  actions,
  image,
  bg,
  imageFirst = false,
  taglineClass,
  titleClass = defaultTitleClass,
  subtitleClass = defaultSubtitleClass,
  imageContainerClass = 'max-w-5xl',
  textBlockPaddingClass = 'pb-hero-content-pb',
  sectionPaddingClass,
}: HeroProps) {
  const sectionPad = sectionPaddingClass ?? (imageFirst ? 'pt-8 md:pt-12' : 'pt-12 md:pt-20');

  const imageBlock = image && (
    <div className={`relative m-auto ${imageContainerClass}`}>
      {isHeroImage(image) ? (
        <Image
          className="mx-auto w-full rounded-2xl object-cover shadow-lg"
          src={image.src}
          alt={image.alt ?? ''}
          width={image.width ?? 1024}
          height={image.height ?? 576}
          sizes="(max-width: 767px) 400px, (max-width: 1023px) 768px, (max-width: 2039px) 1024px, 2040px"
          priority
        />
      ) : (
        image
      )}
    </div>
  );

  return (
    <section className="relative md:-mt-[76px] not-prose" {...(id ? { id } : {})}>
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        {bg}
      </div>
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <div className="pointer-events-none pt-0 md:pt-[76px]" />
        <div className={sectionPad}>
          {imageFirst && image && <div className="mb-6 md:mb-8">{imageBlock}</div>}
          <div className={`mx-auto max-w-5xl text-center ${textBlockPaddingClass}`}>
            {tagline && (
              <p className={`text-base font-bold tracking-wide text-secondary dark:text-blue-200 ${taglineClass ?? ''}`}>
                {tagline}
              </p>
            )}
            {title && <h1 className={titleClass}>{title}</h1>}
            <div className="mx-auto max-w-3xl">
              {subtitle && <p className={subtitleClass}>{subtitle}</p>}
              {actions && (
                <div className="m-auto flex max-w-lg flex-col flex-nowrap gap-3 sm:flex-row sm:justify-center sm:gap-4">
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
            {content}
          </div>
          {!imageFirst && image && <div>{imageBlock}</div>}
        </div>
      </div>
    </section>
  );
}
