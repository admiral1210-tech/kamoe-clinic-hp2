import { recruitPositionCards } from '~/data/recruit';

export function RecruitPositions() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6">
      <div className="text-center mb-12 max-w-3xl mx-auto">
        <p className="text-xs font-semibold text-primary tracking-widest uppercase mb-1">Positions</p>
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">募集職種</h2>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {recruitPositionCards.map((card) => (
          <div key={card.title} className="min-w-0 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden flex flex-col">
            <div className="bg-primary px-6 py-4">
              <h3 className="text-white font-bold text-lg">{card.title}</h3>
            </div>
            <div className="min-w-0 p-6 space-y-3 text-sm text-gray-700 dark:text-gray-300 flex flex-col flex-1">
              {card.rows.map((row) => (
                <div key={row.label} className="flex gap-2">
                  <span className="font-semibold w-20 shrink-0 text-gray-500">{row.label}</span>
                  <span>{row.value}</span>
                </div>
              ))}
              <div className="mt-auto pt-3">
                <a
                  href={card.cta.href}
                  className="inline-flex items-center justify-center rounded-xl bg-primary px-4 py-2.5 text-sm font-bold text-white hover:opacity-90 transition-opacity w-full"
                >
                  {card.cta.label}
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      <p className="mt-8 text-center text-sm text-muted">
        ※ 上記以外の職種でも随時ご相談を受け付けています。まずはお気軽にお問い合わせください。
      </p>
    </div>
  );
}
