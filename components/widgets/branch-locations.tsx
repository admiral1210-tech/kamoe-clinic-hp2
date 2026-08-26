import { MapPin, ExternalLink } from 'lucide-react';

import { KAMOME_BRANCHES, KAMOME_BRANCH_COUNT } from '~/data/branches';

export function BranchLocations() {
  return (
    <section id="access" className="scroll-mt-32 border-y border-blue-100 bg-blue-50 py-16" aria-labelledby="access-heading">
      <div className="mx-auto max-w-5xl px-section-x">
        <div className="mb-10 text-center">
          <p className="mb-1 text-sm font-semibold tracking-widest text-primary">診療拠点</p>
          <h2 id="access-heading" className="font-heading text-3xl font-bold text-heading">
            大阪市内{KAMOME_BRANCH_COUNT}院の診療拠点
          </h2>
          <p className="mt-2 text-sm text-muted">
            各拠点が連携し、大阪市内全域に対応しています。担当エリアのご確認はお気軽に地域医療連携部（06-4301-7883）へご相談ください。
          </p>
        </div>
        <ul className="m-0 grid list-none gap-4 p-0 sm:grid-cols-2 lg:grid-cols-3">
          {KAMOME_BRANCHES.map(({ name, area, address, tel, fax, href }) => (
            <li key={name} className="min-h-0">
              <div className="flex h-full flex-col gap-3 rounded-xl border border-gray-100 bg-white p-5">
                <div className="flex items-start gap-2">
                  <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
                  <p className="font-bold text-heading">{name}</p>
                </div>
                <address className="space-y-1 pl-7 text-sm not-italic text-muted">
                  <p>{area}</p>
                  <p>{address}</p>
                  <a href={`tel:${tel.replace(/-/g, '')}`} className="block font-bold text-primary hover:underline">
                    TEL: {tel}
                  </a>
                  {fax ? <p>FAX: {fax}</p> : null}
                </address>
                {href ? (
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${name}の公式サイト。新しいタブで開きます。`}
                    className="mt-auto ml-7 inline-flex w-fit items-center gap-1.5 rounded-full border border-primary px-4 py-1.5 text-sm font-bold text-primary transition-colors hover:bg-blue-50"
                  >
                    <ExternalLink className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                    専用サイトを見る
                  </a>
                ) : null}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
