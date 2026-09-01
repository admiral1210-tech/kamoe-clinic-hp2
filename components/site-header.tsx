'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Menu } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import { headerData, type NavLink } from '@/lib/navigation';

function isExternalHref(href?: string): boolean {
  return Boolean(href?.startsWith('http://') || href?.startsWith('https://'));
}

export function SiteHeader() {
  const pathname = usePathname() ?? '';
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header
      data-slot="site-header"
      className="sticky top-0 z-40 w-full border-b border-gray-100/80 bg-white/90 backdrop-blur-sm"
    >
      <div className="mx-auto flex w-full max-w-7xl items-center gap-3 px-3 py-2 md:px-6">
        <Link href="/" className="flex shrink-0 items-center">
          <Image
            src="/images/common/header/logo.png"
            alt="かもめクリニック"
            width={224}
            height={56}
            className="h-12 w-auto object-contain md:h-14"
            priority
          />
        </Link>

        <NavigationMenu viewport={false} className="hidden min-w-0 max-w-none flex-1 justify-center md:flex">
          <NavigationMenuList className="flex-wrap justify-center gap-x-0.5 gap-y-1 space-x-0">
            {headerData.links.map((link) => (
              <NavigationMenuItem key={link.text} className="relative">
                {link.links?.length ? (
                  <>
                    <NavigationMenuTrigger className="h-auto whitespace-nowrap bg-transparent px-2 py-2 text-sm font-medium lg:px-3">
                      {link.text}
                    </NavigationMenuTrigger>
                    <NavigationMenuContent className="z-50 rounded-md border bg-popover text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=open]:fade-in data-[state=closed]:fade-out data-[state=open]:zoom-in-95 data-[state=closed]:zoom-out-95 md:absolute md:left-0 md:top-full md:w-auto">
                      <ul className="grid w-[280px] gap-1 p-2">
                        {link.links.map((sub) => (
                          <li key={sub.text}>
                            <NavigationMenuLink asChild>
                              <Link
                                href={sub.href ?? '#'}
                                className={cn(
                                  'block rounded px-3 py-2 text-sm hover:bg-gray-100 hover:text-primary',
                                  sub.href === pathname && 'text-primary font-semibold'
                                )}
                                {...(isExternalHref(sub.href) ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                              >
                                {sub.text}
                              </Link>
                            </NavigationMenuLink>
                          </li>
                        ))}
                      </ul>
                    </NavigationMenuContent>
                  </>
                ) : (
                  <NavigationMenuLink asChild>
                    <Link
                      href={link.href ?? '#'}
                      className={cn(
                        'inline-flex h-auto w-max items-center justify-center whitespace-nowrap rounded-md px-2 py-2 text-sm font-medium hover:text-primary lg:px-3',
                        link.href === pathname && 'text-primary font-semibold'
                      )}
                    >
                      {link.text}
                    </Link>
                  </NavigationMenuLink>
                )}
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        <div className="ml-auto hidden shrink-0 md:flex">
          {headerData.actions.map((action) => (
            <Button key={action.text} asChild>
              <Link href={action.href}>{action.text}</Link>
            </Button>
          ))}
        </div>

        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger asChild className="ml-auto md:hidden">
            <Button variant="ghost" size="icon" aria-label="メニューを開く">
              <Menu className="h-6 w-6" aria-hidden="true" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[85vw] overflow-y-auto sm:max-w-sm">
            <SheetTitle className="text-left">メニュー</SheetTitle>
            <MobileNav links={headerData.links} pathname={pathname} onNavigate={() => setMobileOpen(false)} />
            <div className="mt-4 flex flex-col gap-2">
              {headerData.actions.map((action) => (
                <Button key={action.text} asChild onClick={() => setMobileOpen(false)}>
                  <Link href={action.href}>{action.text}</Link>
                </Button>
              ))}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}

function MobileNav({
  links,
  pathname,
  onNavigate,
}: {
  links: NavLink[];
  pathname: string;
  onNavigate: () => void;
}) {
  return (
    <ul className="mt-4 flex flex-col text-base">
      {links.map((link) => (
        <li key={link.text} className="border-b border-gray-100 py-1">
          {link.links?.length ? (
            <MobileNavGroup link={link} pathname={pathname} onNavigate={onNavigate} />
          ) : (
            <Link
              href={link.href ?? '#'}
              onClick={onNavigate}
              className={cn(
                'block py-2 font-medium hover:text-primary',
                link.href === pathname && 'text-primary font-semibold'
              )}
            >
              {link.text}
            </Link>
          )}
        </li>
      ))}
    </ul>
  );
}

function MobileNavGroup({
  link,
  pathname,
  onNavigate,
}: {
  link: NavLink;
  pathname: string;
  onNavigate: () => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center justify-between py-2 text-left font-medium"
      >
        {link.text}
        <span className={cn('text-muted transition-transform', open && 'rotate-180')} aria-hidden="true">
          ▾
        </span>
      </button>
      {open && (
        <ul className="flex flex-col pb-2 pl-3">
          {link.links?.map((sub) => (
            <li key={sub.text}>
              <Link
                href={sub.href ?? '#'}
                onClick={onNavigate}
                className={cn(
                  'block py-2 text-sm hover:text-primary',
                  sub.href === pathname && 'text-primary font-semibold'
                )}
                {...(isExternalHref(sub.href) ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              >
                {sub.text}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
