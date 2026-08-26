'use client';

import { useEffect, useRef, useState } from 'react';

import { cn } from '@/lib/utils';

export interface PageTocNavItem {
  href: string;
  label: string;
}

export interface PageTocNavProps {
  items: PageTocNavItem[];
  ariaLabel?: string;
  heading?: string;
}

export function PageTocNav({ items, ariaLabel = 'このページの目次', heading }: PageTocNavProps) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const navRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const sectionIds = items
      .map(({ href }) => (href.startsWith('#') ? href.slice(1) : null))
      .filter((id): id is string => id !== null);

    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      () => {
        let currentId: string | null = null;
        for (const section of sections) {
          const rect = section.getBoundingClientRect();
          if (rect.top <= 160) {
            currentId = section.id;
          }
        }
        if (currentId) setActiveId(currentId);
      },
      {
        rootMargin: '-80px 0px -40% 0px',
        threshold: [0, 0.1, 0.5, 1],
      }
    );

    sections.forEach((section) => observer.observe(section));

    const initialHash = window.location.hash.slice(1);
    if (initialHash && sectionIds.includes(initialHash)) {
      setActiveId(initialHash);
    } else if (sectionIds[0]) {
      setActiveId(sectionIds[0]);
    }

    return () => observer.disconnect();
  }, [items]);

  return (
    <nav
      ref={navRef}
      className="page-toc-nav not-prose sticky top-[4.5rem] z-30 border-b border-gray-200/80 bg-white/95 backdrop-blur-md md:top-[4.75rem]"
      aria-label={ariaLabel}
    >
      <div className="mx-auto max-w-5xl px-3 sm:px-4">
        <div className="scrollbar-none flex items-center justify-start overflow-x-auto md:justify-center">
          {heading && (
            <span className="mr-1 hidden shrink-0 items-center whitespace-nowrap pr-3 text-[0.65rem] font-semibold uppercase tracking-widest text-primary sm:inline-flex">
              {heading}
            </span>
          )}
          {items.map(({ href, label }) => {
            const isActive = href === `#${activeId}`;
            return (
              <a
                key={href}
                href={href}
                data-toc-link
                className={cn(
                  'toc-tab -mb-px inline-flex min-h-[2.75rem] shrink-0 items-center justify-center whitespace-nowrap border-b-2 border-transparent px-3 text-xs font-medium text-muted transition-colors duration-150 hover:text-default focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary/60 sm:px-4 sm:text-sm',
                  isActive && 'is-active border-primary font-semibold text-primary'
                )}
              >
                {label}
              </a>
            );
          })}
        </div>
      </div>
      <style>{`
        .scrollbar-none {
          scrollbar-width: none;
        }
        .scrollbar-none::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </nav>
  );
}
