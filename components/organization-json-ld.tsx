'use client';

import { usePathname } from 'next/navigation';

import { JsonLd } from '@/components/json-ld';
import { buildOrganizationJsonLd } from '@/lib/organization-jsonld';

/** トップページは独自のより詳細な MedicalClinic スキーマを持つため、重複を避けてここでは出力しない。 */
export function OrganizationJsonLd() {
  const pathname = usePathname();
  if (pathname === '/') return null;
  return <JsonLd data={buildOrganizationJsonLd()} />;
}
