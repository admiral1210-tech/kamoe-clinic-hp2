import Image from 'next/image';

import { WidgetWrapper, type WidgetProps } from '@/components/ui/widget-wrapper';
import { Headline } from '@/components/ui/headline';

export interface TestimonialImage {
  src: string;
  alt?: string;
}

export interface Testimonial {
  title?: string;
  testimonial?: string;
  name?: string;
  job?: string;
  image?: TestimonialImage;
}

export interface TestimonialsCallToAction {
  text?: string;
  href?: string;
}

export interface TestimonialsProps extends WidgetProps {
  title?: string;
  subtitle?: string;
  tagline?: string;
  testimonials?: Testimonial[];
  callToAction?: TestimonialsCallToAction;
  classes?: {
    container?: string;
  };
}

export function Testimonials({
  id,
  isDark = false,
  bg,
  title = '',
  subtitle = '',
  tagline = '',
  testimonials = [],
  callToAction,
  classes = {},
}: TestimonialsProps) {
  return (
    <WidgetWrapper id={id} isDark={isDark} containerClass={`mx-auto max-w-6xl ${classes?.container ?? ''}`} bg={bg}>
      <Headline title={title} subtitle={subtitle} tagline={tagline} />

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {testimonials.map(({ title: cardTitle, testimonial, name, job, image }, index) => (
          <div key={name ?? index} className="flex h-auto">
            <div className="flex flex-col rounded-md p-4 shadow-xl dark:border dark:border-slate-600 dark:shadow-none md:p-6">
              {cardTitle && <h2 className="pb-4 text-lg font-medium leading-6">{cardTitle}</h2>}
              {testimonial && (
                <blockquote className="flex-auto">
                  <p className="text-muted">&quot; {testimonial} &quot;</p>
                </blockquote>
              )}

              <hr className="my-4 border-slate-200 dark:border-slate-600" />

              <div className="flex items-center">
                {image && (
                  <div className="h-10 w-10 rounded-full border border-slate-200 dark:border-slate-600">
                    <Image
                      className="h-10 w-10 min-h-full min-w-full rounded-full border border-slate-200 dark:border-slate-600"
                      src={image.src}
                      alt={image.alt ?? ''}
                      width={40}
                      height={40}
                    />
                  </div>
                )}

                <div className="ml-3 grow rtl:ml-0 rtl:mr-3">
                  {name && <p className="text-base font-semibold">{name}</p>}
                  {job && <p className="text-xs text-muted">{job}</p>}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {callToAction && (
        <div className="mx-auto mt-8 flex w-fit justify-center font-medium md:mt-12">
          <a href={callToAction.href} className="text-sm font-semibold text-primary hover:underline">
            {callToAction.text}
          </a>
        </div>
      )}
    </WidgetWrapper>
  );
}
