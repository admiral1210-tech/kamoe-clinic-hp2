import { WidgetWrapper, type WidgetProps } from '@/components/ui/widget-wrapper';
import { Headline } from '@/components/ui/headline';
import { resolveIcon } from '@/components/ui/icon-map';

export interface Stat {
  title?: string;
  amount?: string | number;
  icon?: string;
}

export interface StatsProps extends WidgetProps {
  title?: string;
  subtitle?: string;
  tagline?: string;
  stats?: Stat[];
  footnote?: string;
  classes?: {
    container?: string;
  };
}

export function Stats({ id, isDark = false, bg, title, subtitle, tagline, stats = [], footnote, classes = {} }: StatsProps) {
  return (
    <WidgetWrapper id={id} isDark={isDark} containerClass={`mx-auto max-w-6xl ${classes?.container ?? ''}`} bg={bg}>
      <Headline title={title} subtitle={subtitle} tagline={tagline} />
      <div className="-m-4 flex flex-wrap justify-center text-center">
        {stats.map(({ amount, title: statTitle, icon }, index) => {
          const Icon = resolveIcon(icon);
          return (
            <div
              key={statTitle ?? index}
              className="w-full min-w-[220px] p-4 text-center dark:md:border-slate-500 sm:w-1/2 md:w-1/4 md:border-r md:last:border-none"
            >
              {Icon && (
                <div className="mx-auto mb-4 flex items-center justify-center text-primary">
                  <Icon className="h-10 w-10" />
                </div>
              )}
              {amount && (
                <div className="font-heading text-[2.6rem] font-bold text-primary dark:text-white lg:text-5xl xl:text-6xl">
                  {amount}
                </div>
              )}
              {statTitle && (
                <div className="text-sm font-medium uppercase tracking-widest text-gray-800 dark:text-slate-400 lg:text-base">
                  {statTitle}
                </div>
              )}
            </div>
          );
        })}
      </div>
      {footnote && <p className="mt-4 text-center text-xs leading-relaxed text-gray-400 dark:text-gray-500">{footnote}</p>}
    </WidgetWrapper>
  );
}
