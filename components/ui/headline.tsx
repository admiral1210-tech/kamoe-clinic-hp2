import { twMerge } from 'tailwind-merge';

export interface HeadlineProps {
  title?: string;
  subtitle?: string;
  tagline?: string;
  classes?: {
    container?: string;
    title?: string;
    subtitle?: string;
    tagline?: string;
  };
}

export function Headline({ title, subtitle, tagline, classes = {} }: HeadlineProps) {
  const {
    container: containerClass = 'max-w-3xl',
    title: titleClass = 'text-3xl md:text-4xl ',
    subtitle: subtitleClass = 'text-xl',
    tagline: taglineClass,
  } = classes;

  if (!title && !subtitle && !tagline) return null;

  return (
    <div className={twMerge('mb-8 text-center md:mx-auto md:mb-12', containerClass)}>
      {tagline && (
        <p
          className={twMerge('text-base font-bold uppercase tracking-wide text-secondary', taglineClass)}
          dangerouslySetInnerHTML={{ __html: tagline }}
        />
      )}
      {title && (
        <h2
          className={twMerge(
            'font-heading text-3xl font-bold leading-tighter tracking-tighter text-heading',
            titleClass
          )}
          dangerouslySetInnerHTML={{ __html: title }}
        />
      )}
      {subtitle && (
        <p className={twMerge('mt-4 text-muted', subtitleClass)} dangerouslySetInnerHTML={{ __html: subtitle }} />
      )}
    </div>
  );
}
