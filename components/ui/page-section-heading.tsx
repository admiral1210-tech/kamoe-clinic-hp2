import { twMerge } from 'tailwind-merge';

import { clinicalSectionHeadline } from '~/constants/clinical-page-ui';

export interface PageSectionHeadingProps {
  tagline?: string;
  title: string;
  subtitle?: string;
  className?: string;
  taglineDecorative?: boolean;
}

export function PageSectionHeading({
  tagline,
  title,
  subtitle,
  className,
  taglineDecorative = false,
}: PageSectionHeadingProps) {
  const h = clinicalSectionHeadline;

  return (
    <div className={twMerge('mb-8 text-center md:mb-10', h.container, className)}>
      {tagline && (
        <p className={h.tagline} {...(taglineDecorative ? { 'aria-hidden': 'true' } : {})}>
          {tagline}
        </p>
      )}
      <h2 className={twMerge(h.title, 'font-heading')} dangerouslySetInnerHTML={{ __html: title }} />
      {subtitle && <p className={h.subtitle} dangerouslySetInnerHTML={{ __html: subtitle }} />}
    </div>
  );
}
