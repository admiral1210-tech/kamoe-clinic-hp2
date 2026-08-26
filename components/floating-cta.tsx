import Link from 'next/link';
import { Phone, ClipboardList } from 'lucide-react';

import { CLINIC_CONTACT } from '~/data/clinic-contact';

export function FloatingCta() {
  return (
    <nav className="floating-cta" id="floating-cta" aria-label="固定表示の連絡先(電話・問い合わせフォーム)">
      <a href={CLINIC_CONTACT.telHref} className="floating-cta-tel">
        <Phone className="h-4 w-4" aria-hidden="true" /> {CLINIC_CONTACT.telDisplay}
      </a>
      <Link href="/renkei#renkei-contact-detail" className="floating-cta-form">
        <ClipboardList className="h-4 w-4" aria-hidden="true" /> 問い合わせフォーム
      </Link>
    </nav>
  );
}
