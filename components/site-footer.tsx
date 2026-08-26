import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Clock, Phone, ClipboardList, ExternalLink, ChevronDown } from 'lucide-react';

import { CLINIC_CONTACT } from '~/data/clinic-contact';
import { footerData, type FooterNavLink, type FooterNavSection } from '@/lib/navigation';

const INSTAGRAM_QR_IMAGE_SRC = '/images/instagram_qr_kamome.png';
const SITE_NAME = 'かもめクリニック';

export function SiteFooter() {
  return (
    <footer className="relative border-t border-gray-200 not-prose">
      <div className="relative mx-auto max-w-7xl px-section-x">
        <div className="flex flex-col gap-8 border-b border-gray-100 py-8 lg:flex-row">
          <div className="shrink-0 space-y-4 lg:w-64">
            <Link
              href="/"
              className="block text-base font-bold text-heading transition-colors hover:text-primary"
            >
              {SITE_NAME}
            </Link>

            <address className="not-italic space-y-2 text-sm text-muted">
              <p className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                <span>
                  {CLINIC_CONTACT.postalCode} {CLINIC_CONTACT.addressLine1}
                  <br />
                  {CLINIC_CONTACT.addressLine2}
                </span>
              </p>
              <p className="flex items-start gap-2">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                <span>
                  <span className="text-caption">通常受付:</span>
                  {CLINIC_CONTACT.hoursPrimary}
                  <br />
                  {CLINIC_CONTACT.hoursEmergency}
                </span>
              </p>
            </address>

            <a
              href={CLINIC_CONTACT.telHref}
              className="flex items-center gap-3 rounded-xl bg-primary/10 px-4 py-3 transition-colors hover:bg-primary/15"
            >
              <Phone className="h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
              <span>
                <span className="mb-0.5 block text-xs text-caption">お電話でのご相談</span>
                <span className="text-lg font-bold leading-none tracking-wider text-primary">
                  {CLINIC_CONTACT.telDisplay}
                </span>
              </span>
            </a>

            <Link href="/renkei" className="flex items-center gap-1.5 text-sm text-primary hover:underline">
              <ClipboardList className="h-4 w-4 shrink-0" aria-hidden="true" />
              お問い合わせフォーム
            </Link>

            <div className="flex items-center gap-3 pt-1">
              <a
                href="https://www.instagram.com/kamomeclinic/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="shrink-0"
              >
                <Image
                  src={INSTAGRAM_QR_IMAGE_SRC}
                  alt="かもめクリニック Instagram QRコード"
                  width={240}
                  height={276}
                  className="h-14 w-auto rounded-lg border border-gray-200 bg-white object-contain"
                />
              </a>
              <p className="text-xs leading-snug text-caption">
                Instagram
                <br />
                公式アカウント
                <br />
                <span className="text-[#BE1745]">@kamomeclinic</span>
              </p>
            </div>
          </div>

          <h2 id="footer-nav-heading" className="sr-only">
            サイトマップ
          </h2>
          <nav
            className="grid flex-1 grid-cols-1 gap-x-4 gap-y-0 lg:grid-cols-5 lg:gap-y-6"
            aria-labelledby="footer-nav-heading"
          >
            {footerData.links.map((section) => (
              <FooterColumn key={section.title} section={section} />
            ))}
          </nav>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 py-4 text-sm text-muted">
          <div className="flex flex-wrap gap-4">
            {footerData.secondaryLinks.map((link) => (
              <Link
                key={link.text}
                href={link.href}
                className="transition duration-150 ease-in-out hover:text-default hover:underline"
              >
                {link.text}
              </Link>
            ))}
          </div>
          <p className="text-xs text-muted">© {new Date().getFullYear()} かもめクリニック</p>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ section }: { section: FooterNavSection }) {
  const titleClass = 'font-bold text-xs text-gray-900 tracking-wide';

  if (!section.collapsibleMobile) {
    return (
      <div>
        <h3 className={`${titleClass} mb-2`}>{section.title}</h3>
        <FooterLinkList links={section.links} />
      </div>
    );
  }

  return (
    <div>
      <details className="group border-b border-gray-200 lg:hidden">
        <summary
          className={`${titleClass} flex cursor-pointer list-none items-center justify-between gap-2 py-3 [&::-webkit-details-marker]:hidden`}
        >
          <span>{section.title}</span>
          <ChevronDown
            className="h-4 w-4 shrink-0 text-gray-500 transition-transform group-open:rotate-180"
            aria-hidden="true"
          />
        </summary>
        <div className="pb-3">
          <FooterLinkList links={section.links} />
        </div>
      </details>
      <div className="hidden lg:block">
        <h3 className={`${titleClass} mb-2`}>{section.title}</h3>
        <FooterLinkList links={section.links} />
      </div>
    </div>
  );
}

function FooterLinkList({ links }: { links: FooterNavLink[] }) {
  return (
    <ul className="space-y-1.5">
      {links.map((link) => {
        const outbound = link.kind === 'external' || link.kind === 'legacy-blog';
        return (
          <li key={link.text}>
            <a
              href={link.href}
              className="inline-flex max-w-full items-center gap-1 text-sm leading-snug text-muted transition duration-150 ease-in-out hover:text-gray-700 hover:underline"
              {...(outbound ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            >
              <span className="break-words">{link.text}</span>
              {outbound && (
                <>
                  <ExternalLink className="h-3.5 w-3.5 shrink-0 opacity-70" aria-hidden="true" />
                  <span className="sr-only">(別タブで開きます)</span>
                </>
              )}
            </a>
          </li>
        );
      })}
    </ul>
  );
}
