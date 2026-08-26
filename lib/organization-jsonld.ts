import { CLINIC_CONTACT, clinicPostalAddressJsonLd } from '~/data/clinic-contact';
import { buildNumberOfEmployees } from '~/data/clinic-meta';

/**
 * サイト全体で共有する組織(MedicalClinic)の基本スキーマ。
 * ページ固有の実績・診療科詳細等は各ページ移植時に個別スキーマとして追加する。
 */
export function buildOrganizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@id': 'https://kamome-clinic.net/#clinic',
    '@type': ['MedicalClinic', 'LocalBusiness'],
    name: 'かもめクリニック',
    alternateName: 'Kamome Clinic',
    url: 'https://kamome-clinic.net',
    logo: 'https://kamome-clinic.net/images/common/header/logo.png',
    telephone: CLINIC_CONTACT.telDisplay,
    address: clinicPostalAddressJsonLd(),
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '17:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        opens: '00:00',
        closes: '23:59',
        description: '緊急往診(24時間365日対応)',
      },
    ],
    medicalSpecialty: [
      'https://schema.org/InternalMedicine',
      'https://schema.org/Psychiatry',
      'https://schema.org/Pediatrics',
    ],
    numberOfEmployees: buildNumberOfEmployees(),
  };
}
