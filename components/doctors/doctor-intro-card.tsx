import Image from 'next/image';

import type { Doctor, SectionConfig } from '~/data/doctors-intro';

export interface DoctorIntroCardProps {
  section: SectionConfig;
  doc: Doctor;
  /** 医師紹介ページと同じく lazy。ヒーローでは eager を指定 */
  imageLoading?: 'eager' | 'lazy';
}

export function DoctorIntroCard({ section, doc, imageLoading = 'lazy' }: DoctorIntroCardProps) {
  return (
    <article className={`bg-white rounded-2xl shadow-sm overflow-hidden border ${section.accentBorder}`}>
      <div className={`${section.accent} h-1 w-full`} />

      <div className="flex justify-center bg-gray-100 py-4 sm:py-5">
        <figure className="relative m-0 aspect-[3/4] w-[min(260px,70vw)] sm:w-[290px] overflow-hidden rounded-xl shadow-sm ring-1 ring-black/5 bg-gray-100">
          {doc.image ? (
            <Image
              src={doc.image}
              alt={`${doc.name}の写真`}
              width={960}
              height={1280}
              className="absolute inset-0 h-full w-full object-cover object-top"
              loading={imageLoading}
              fetchPriority={imageLoading === 'eager' ? 'high' : undefined}
              decoding="async"
              sizes="(max-width:640px) 70vw, 290px"
            />
          ) : (
            <div
              className={`absolute inset-0 flex flex-col items-center justify-center gap-3 px-6 ${section.placeholderBg}`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-14 w-14 shrink-0 opacity-35 ${section.placeholderText}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.25}
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                />
              </svg>
              <p className={`text-sm font-semibold tracking-wide ${section.placeholderText}`}>準備中</p>
            </div>
          )}
        </figure>
      </div>

      <div className="px-5 pt-6 pb-2 text-center sm:px-6">
        <h3 className="text-2xl font-bold font-heading leading-snug text-heading">{doc.name}</h3>
        <p className={`mt-2 text-sm font-semibold leading-snug text-balance ${section.accentText}`}>{doc.role}</p>
      </div>

      <dl className="mt-4 space-y-4 px-5 pb-2 sm:px-6">
        <div>
          <dt className="mb-1 text-xs font-bold uppercase tracking-wider text-muted">専門</dt>
          <dd className="text-sm leading-relaxed text-default">{doc.specialty}</dd>
        </div>

        {doc.qualifications && (
          <div>
            <dt className="mb-1 text-xs font-bold uppercase tracking-wider text-muted">所属学会・資格</dt>
            <dd>
              <ul className="space-y-1">
                {doc.qualifications.map((q) => (
                  <li key={q} className="flex items-start gap-2 text-sm leading-relaxed text-default">
                    <span className={`mt-2 h-1 w-1 shrink-0 rounded-full ${section.accent}`} aria-hidden="true" />
                    {q}
                  </li>
                ))}
              </ul>
            </dd>
          </div>
        )}

        {(doc.education || doc.career) && (
          <div>
            <dt className="mb-1 text-xs font-bold uppercase tracking-wider text-muted">略歴</dt>
            <dd className="space-y-2 text-sm leading-relaxed text-default">
              {doc.education && <p className="whitespace-pre-line">{doc.education}</p>}
              {doc.career && <p className="whitespace-pre-line text-muted">{doc.career}</p>}
            </dd>
          </div>
        )}

        {doc.hobbies && (
          <div>
            <dt className="mb-1 text-xs font-bold uppercase tracking-wider text-muted">趣味</dt>
            <dd className="text-sm leading-relaxed text-default">{doc.hobbies}</dd>
          </div>
        )}
      </dl>

      <div className={`mx-5 mb-6 mt-5 rounded-xl p-4 sm:mx-6 ${section.quoteBg}`}>
        <p className={`mb-2 text-xs font-bold ${section.quoteLabel}`}>ひとこと</p>
        <p className="whitespace-pre-line text-sm leading-relaxed text-default">{doc.message}</p>
      </div>
    </article>
  );
}
