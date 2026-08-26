import type { ReactNode } from 'react';
import Image from 'next/image';

import type { HeroAction, HeroImage } from '@/components/widgets/hero';

export interface Hero2Props {
  id?: string;
  tagline?: ReactNode;
  title?: ReactNode;
  subtitle?: ReactNode;
  content?: ReactNode;
  actions?: HeroAction[] | ReactNode;
  image?: HeroImage | ReactNode;
  bg?: ReactNode;
}

function isHeroImage(image: Hero2Props['image']): image is HeroImage {
  return Boolean(image) && typeof image === 'object' && 'src' in (image as HeroImage);
}

export function Hero2({ id, tagline, title, subtitle, content, actions, image, bg }: Hero2Props) {
  return (
    <section className="relative md:-mt-[76px] not-prose" {...(id ? { id } : {})}>
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        {bg}
      </div>
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <div className="pointer-events-none pt-0 md:pt-[76px]" />
        <div className="py-12 md:py-20 lg:flex lg:h-screen lg:items-center lg:gap-8 lg:py-0">
          <div className="mx-auto basis-1/2 pb-10 text-center md:pb-16 lg:text-left">
            {tagline && (
              <p className="text-base font-bold uppercase tracking-wide text-secondary dark:text-blue-200">{tagline}</p>
            )}
            {title && (
              <h1 className="mb-4 font-heading text-5xl font-bold leading-tighter tracking-tighter dark:text-gray-200 md:text-6xl">
                {title}
              </h1>
            )}
            <div className="mx-auto max-w-3xl lg:max-w-none">
              {subtitle && <p className="mb-6 text-xl text-muted dark:text-slate-300">{subtitle}</p>}
              {actions && (
                <div className="m-auto flex max-w-xs flex-col flex-nowrap gap-4 sm:max-w-md sm:flex-row sm:justify-center lg:m-0 lg:max-w-7xl lg:justify-start">
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
          <div className="basis-1/2">
            {image && (
              <div className="relative m-auto max-w-5xl">
                {isHeroImage(image) ? (
                  <Image
                    className="mx-auto w-full rounded-md"
                    src={image.src}
                    alt={image.alt ?? ''}
                    width={image.width ?? 600}
                    height={image.height ?? 600}
                    sizes="(max-width: 767px) 400px, (max-width: 1023px) 768px, (max-width: 2039px) 1024px, 2040px"
                    priority
                  />
                ) : (
                  image
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
