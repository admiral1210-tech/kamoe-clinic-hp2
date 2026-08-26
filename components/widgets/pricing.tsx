import { WidgetWrapper, type WidgetProps } from '@/components/ui/widget-wrapper';
import { Headline } from '@/components/ui/headline';
import { resolveIcon } from '@/components/ui/icon-map';

export interface PriceItem {
  description?: string;
  icon?: string;
}

export interface PriceCallToAction {
  text?: string;
  href?: string;
  target?: string;
  rel?: string;
}

export interface Price {
  title?: string;
  subtitle?: string;
  price?: number | string;
  period?: string;
  items?: PriceItem[];
  callToAction?: PriceCallToAction;
  hasRibbon?: boolean;
  ribbonTitle?: string;
}

export interface PricingProps extends WidgetProps {
  title?: string;
  subtitle?: string;
  tagline?: string;
  prices?: Price[];
  riskNotes?: string;
  sideEffectNotes?: string;
  classes?: {
    container?: string;
  };
}

export function Pricing({
  id,
  isDark = false,
  bg,
  title = '',
  subtitle = '',
  tagline = '',
  prices = [],
  riskNotes,
  sideEffectNotes,
  classes = {},
}: PricingProps) {
  return (
    <WidgetWrapper id={id} isDark={isDark} containerClass={`mx-auto max-w-7xl ${classes?.container ?? ''}`} bg={bg}>
      <Headline title={title} subtitle={subtitle} tagline={tagline} />
      <div className="flex items-stretch justify-center">
        <div className="grid grid-cols-3 gap-4 dark:text-white sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
          {prices.map(
            ({ title: priceTitle, subtitle: priceSubtitle, price, period, items, callToAction, hasRibbon = false, ribbonTitle }, index) =>
              price && period ? (
                <div key={priceTitle ?? index} className="col-span-3 mx-auto flex w-full sm:col-span-1 md:col-span-1 lg:col-span-1 xl:col-span-1">
                  <div className="relative flex w-full max-w-sm flex-col justify-between rounded-lg border border-gray-200 bg-white px-6 py-8 text-center shadow backdrop-blur dark:border-gray-700 dark:bg-slate-900">
                    {hasRibbon && ribbonTitle && (
                      <div className="absolute right-[-5px] top-[-5px] z-[1] h-[100px] w-[100px] overflow-hidden text-right rtl:right-auto rtl:left-[-8px] 2xl:right-[-8px] 2xl:top-[-10px] rtl:2xl:left-[-10px]">
                        <span className="absolute right-[-21px] top-[19px] block w-full rotate-45 bg-green-700 text-center text-[10px] font-bold uppercase leading-5 text-white shadow-[0_3px_10px_-5px_rgba(0,0,0,0.3)] before:absolute before:left-0 before:top-full before:z-[-1] before:border-[3px] before:border-b-transparent before:border-l-green-800 before:border-r-transparent before:border-t-green-800 before:content-[''] after:absolute after:right-0 after:top-full after:z-[-1] after:border-[3px] after:border-b-transparent after:border-l-transparent after:border-r-green-800 after:border-t-green-800 after:content-[''] rtl:-rotate-45 rtl:right-auto rtl:left-[-21px]">
                          {ribbonTitle}
                        </span>
                      </div>
                    )}
                    <div className="px-2 py-0">
                      {priceTitle && (
                        <h3 className="mb-2 text-center text-xl font-semibold uppercase leading-6 tracking-wider">{priceTitle}</h3>
                      )}
                      {priceSubtitle && <p className="font-light text-gray-600 dark:text-slate-400 sm:text-lg">{priceSubtitle}</p>}
                      <div className="my-8">
                        <div className="mb-1 flex items-center justify-center text-center">
                          <span className="text-5xl">$</span>
                          <span className="text-6xl font-extrabold">{price}</span>
                        </div>
                        <span className="text-base leading-6 lowercase text-gray-600 dark:text-slate-400">{period}</span>
                      </div>
                      {items && (
                        <ul className="my-8 space-y-2 text-left md:my-10">
                          {items.map(({ description, icon }, itemIndex) => {
                            if (!description) return null;
                            const Icon = resolveIcon(icon || 'tabler:check');
                            return (
                              <li key={itemIndex} className="mb-1.5 flex items-start space-x-3 leading-7">
                                <div className="mt-1 rounded-full bg-primary">
                                  {Icon && <Icon className="h-5 w-5 p-1 font-bold text-white" />}
                                </div>
                                <span>{description}</span>
                              </li>
                            );
                          })}
                        </ul>
                      )}
                    </div>
                    {callToAction && callToAction.href && (
                      <div className="flex justify-center">
                        <a
                          href={callToAction.href}
                          target={callToAction.target}
                          rel={callToAction.rel}
                          className={
                            hasRibbon
                              ? 'inline-flex items-center justify-center rounded-card bg-primary px-6 py-3 text-sm font-bold text-white shadow-md transition-opacity hover:opacity-90'
                              : 'inline-flex items-center justify-center rounded-card border-2 border-gray-300 px-6 py-3 text-sm font-semibold text-default shadow-sm transition-colors hover:border-gray-400'
                          }
                        >
                          {callToAction.text}
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              ) : null
          )}
        </div>
      </div>
      {(riskNotes || sideEffectNotes) && (
        <div className="mx-auto mt-8 max-w-3xl space-y-2 rounded-lg border border-amber-200 bg-amber-50 px-6 py-4 text-sm text-gray-700 dark:border-amber-800 dark:bg-amber-900/20 dark:text-gray-300">
          <p className="font-bold text-amber-700 dark:text-amber-400">自費診療に関する重要事項</p>
          {riskNotes && (
            <p>
              <span className="font-semibold">リスク・注意事項：</span>
              {riskNotes}
            </p>
          )}
          {sideEffectNotes && (
            <p>
              <span className="font-semibold">副作用・合併症：</span>
              {sideEffectNotes}
            </p>
          )}
        </div>
      )}
    </WidgetWrapper>
  );
}
