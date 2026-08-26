import Image from 'next/image';

import { resolveIcon } from '@/components/ui/icon-map';

export function RenkeiStaffStrip() {
  const UserIcon = resolveIcon('tabler:user');

  return (
    <div
      id="renkei-staff"
      className="relative left-1/2 w-screen max-w-[100vw] -ml-[50vw] bg-gray-50 dark:bg-slate-800 border-y border-gray-100 dark:border-slate-700 scroll-mt-32"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 lg:py-20">
        <p className="text-center text-sm sm:text-base font-semibold text-primary tracking-widest uppercase mb-8 md:mb-10 lg:mb-12">
          地域医療連携部スタッフ
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-4 md:gap-6 lg:gap-8 w-full">
          <div className="bg-white dark:bg-slate-900 rounded-2xl md:rounded-3xl border border-gray-100 dark:border-slate-700 p-4 sm:p-8 md:p-10 lg:p-12 flex flex-col items-center text-center gap-5 md:gap-6 lg:gap-8 min-w-0 shadow-md">
            <div className="w-36 h-36 sm:w-40 sm:h-40 md:w-52 md:h-52 lg:w-60 lg:h-60 xl:w-72 xl:h-72 rounded-2xl md:rounded-3xl border-2 border-gray-200 dark:border-slate-600 overflow-hidden shrink-0">
              <Image
                src="/images/imai.jpg"
                alt="今井 淳也"
                width={576}
                height={576}
                sizes="(max-width: 639px) 30vw, (max-width: 1023px) 13rem, (max-width: 1279px) 15rem, 18rem"
                className="w-full h-full object-cover object-center"
                style={{ filter: 'contrast(1.12) saturate(1.08) brightness(1.02)' }}
                loading="eager"
                decoding="sync"
              />
            </div>
            <div className="min-w-0 w-full space-y-2 md:space-y-2.5">
              <p className="font-bold text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl text-gray-900 dark:text-white leading-tight">
                今井 淳也
              </p>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl text-primary font-semibold leading-snug">
                医療経営士
              </p>
            </div>
          </div>
          <div className="bg-white dark:bg-slate-900 rounded-2xl md:rounded-3xl border border-gray-100 dark:border-slate-700 p-4 sm:p-8 md:p-10 lg:p-12 flex flex-col items-center text-center gap-5 md:gap-6 lg:gap-8 min-w-0 shadow-md">
            <div className="w-36 h-36 sm:w-40 sm:h-40 md:w-52 md:h-52 lg:w-60 lg:h-60 xl:w-72 xl:h-72 rounded-2xl md:rounded-3xl bg-gray-100 dark:bg-slate-700 border-2 border-gray-200 dark:border-slate-600 flex items-center justify-center overflow-hidden shrink-0">
              {UserIcon && (
                <UserIcon
                  className="w-14 h-14 sm:w-24 sm:h-24 md:w-32 md:h-32 lg:w-36 lg:h-36 xl:w-44 xl:h-44 text-gray-400 dark:text-slate-500"
                  aria-hidden="true"
                />
              )}
            </div>
            <div className="min-w-0 w-full space-y-2 md:space-y-2.5">
              <p className="font-bold text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl text-gray-900 dark:text-white leading-tight">
                藤原 淳子
              </p>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl text-primary font-semibold leading-snug">
                精神保健福祉士・終末期ケア専門士
              </p>
            </div>
          </div>
          <div className="bg-white dark:bg-slate-900 rounded-2xl md:rounded-3xl border border-gray-100 dark:border-slate-700 p-4 sm:p-8 md:p-10 lg:p-12 flex flex-col items-center text-center gap-5 md:gap-6 lg:gap-8 min-w-0 shadow-md">
            <div className="w-36 h-36 sm:w-40 sm:h-40 md:w-52 md:h-52 lg:w-60 lg:h-60 xl:w-72 xl:h-72 rounded-2xl md:rounded-3xl border-2 border-gray-200 dark:border-slate-600 overflow-hidden shrink-0">
              <Image
                src="/images/taketomi.jpg"
                alt="武富 涼馬"
                width={576}
                height={576}
                sizes="(max-width: 639px) 30vw, (max-width: 1023px) 13rem, (max-width: 1279px) 15rem, 18rem"
                className="w-full h-full object-cover object-top"
                loading="lazy"
                decoding="async"
              />
            </div>
            <div className="min-w-0 w-full space-y-2 md:space-y-2.5">
              <p className="font-bold text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl text-gray-900 dark:text-white leading-tight">
                武富 涼馬
              </p>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl text-primary font-semibold leading-snug">
                連携担当
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
