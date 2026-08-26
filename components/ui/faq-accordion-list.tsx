import { twMerge } from 'tailwind-merge';
import { Plus, X } from 'lucide-react';

export interface FaqAccordionItem {
  title?: string;
  description?: string;
}

export interface FaqAccordionListProps {
  items?: FaqAccordionItem[];
  className?: string;
}

export function FaqAccordionList({ items = [], className }: FaqAccordionListProps) {
  const list = items.filter((item) => item.title?.trim());

  if (!list.length) return null;

  return (
    <div className={twMerge('space-y-3', className)}>
      {list.map((item, index) => (
        <details key={item.title ?? index} className="group overflow-hidden rounded-xl border border-gray-200 bg-white">
          <summary className="flex cursor-pointer list-none select-none items-start gap-3 p-4 md:p-5">
            <span
              className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-black text-primary"
              aria-hidden="true"
            >
              Q
            </span>
            <span className="flex-1 font-heading text-base font-bold leading-snug text-heading md:text-lg">
              {item.title}
            </span>
            <Plus className="mt-0.5 h-6 w-6 shrink-0 text-primary transition-transform group-open:hidden" aria-hidden="true" />
            <X className="mt-0.5 hidden h-6 w-6 shrink-0 text-primary group-open:block" aria-hidden="true" />
          </summary>
          <div className="px-4 pb-4 pl-14 md:px-5 md:pb-5 md:pl-16">
            {item.description && (
              <div
                className="text-base leading-relaxed text-default [&_a]:text-primary [&_a]:underline [&_p]:my-2 [&_p:first-child]:mt-0 [&_p:last-child]:mb-0"
                dangerouslySetInnerHTML={{ __html: item.description }}
              />
            )}
          </div>
        </details>
      ))}
    </div>
  );
}
