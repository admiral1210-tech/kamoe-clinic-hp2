/** 旧サイト（クリニックのご案内）と同一のポートレート。高解像度のまま参照 */
export const legacyPortrait = (file: string) => `https://kamome-clinic.net/images/company/${file}`;

export type Doctor = {
  name: string;
  role: string;
  specialty: string;
  qualifications: string[] | null;
  education: string | null;
  career: string | null;
  hobbies: string | null;
  image: string | null;
  message: string;
};

export type SectionConfig = {
  id: string;
  label: string;
  /** Tabler Icons（astro-icon） */
  icon: `tabler:${string}`;
  accent: string;
  accentLight: string;
  accentText: string;
  accentBorder: string;
  placeholderBg: string;
  placeholderText: string;
  quoteBg: string;
  quoteLabel: string;
  doctors: Doctor[];
};

export const naika: Doctor[] = [
  {
    name: '木下 啓太',
    role: '院長',
    specialty: '一般内科・腎臓内科・血液・腹膜透析',
    qualifications: ['日本内科学会 認定医', '日本透析医学会 専門医', '日本腎臓学会 専門医', '日本医師会認定 産業医'],
    education:
      '平成22年　大阪市立大学医学部卒\n神戸市立医療センター西市民病院　初期研修修了\n神戸市立医療センター中央市民病院　腎臓内科',
    career: null,
    hobbies: 'ゴルフ、野球、スポーツ観戦',
    image: legacyPortrait('kinoshita.jpg'),
    message: '皆さんが安心してご自宅で過ごせるように頑張ります！',
  },
  {
    name: '中濵 瑛太郎',
    role: '医師',
    specialty: '一般内科・腎臓内科・血液・腹膜透析',
    qualifications: ['日本内科学会 認定医', '日本透析医学会 専門医', '日本腎臓学会 専門医'],
    education: '平成22年　大阪市立大学医学部卒\n宝生会PL病院　初期研修修了\n宝生会PL病院　腎臓内科',
    career: null,
    hobbies: 'ラグビー、ゴルフ、スノーボード、スキューバダイビング、旅行',
    image: legacyPortrait('nakahama.jpg'),
    message: '皆さんにとって身近な存在になれるように丁寧な医療を心がけます！',
  },
  {
    name: '林 尚輝',
    role: 'かもめクリニック第2 院長',
    specialty: '消化器内科・一般内科',
    qualifications: null,
    education: '平成22年　大阪市立大学医学部卒',
    career: null,
    hobbies: 'サイクリング、空手',
    image: legacyPortrait('hayashi.jpg'),
    message:
      '消化器内科は検査数が多く体力的に大変な科の一つですが、長く消化器内科医をしていたため体力には自信があります！ そこで得た体力を生かし、住み慣れた環境で過ごすお手伝いをさせていただきます。',
  },
  {
    name: '白川 裕一朗',
    role: '医師',
    specialty: '運動器疾患・一般内科',
    qualifications: null,
    education: null,
    career: null,
    hobbies: null,
    image: '/images/doctors/shirakawa.png',
    message: '運動器の問題を抱えながら在宅療養される患者さまにも、内科的管理と並行して対応します。',
  },
  {
    name: '澁谷 裕樹',
    role: '医師',
    specialty: '循環器疾患・在宅心不全管理・一般内科',
    qualifications: null,
    education: null,
    career: null,
    hobbies: null,
    image: '/images/doctors/shibuya.png',
    message: '心不全・不整脈など循環器疾患の在宅管理に取り組み、患者さまの安定した生活を支えます。',
  },
  {
    name: '栗本 浩行',
    role: '医師',
    specialty: '循環器疾患・複雑心疾患管理・一般内科',
    qualifications: null,
    education: null,
    career: null,
    hobbies: null,
    image: '/images/doctors/kurimoto.png',
    message: '循環器専門医として、複雑な心疾患を抱えた方の在宅療養をしっかり支えます。',
  },
  {
    name: '井上 祐真',
    role: '医師',
    specialty: '消化器疾患・在宅療養支援・一般内科',
    qualifications: null,
    education: null,
    career: null,
    hobbies: null,
    image: '/images/doctors/inoue.png',
    message: 'ご自宅での療養が安心して続けられるよう、消化器疾患の管理を丁寧に行います。',
  },
  {
    name: '中村 真崇',
    role: '医師',
    specialty: '救急・急変対応・一般内科',
    qualifications: null,
    education: null,
    career: null,
    hobbies: null,
    image: '/images/doctors/nakamura.png',
    message: '救急対応の経験を在宅医療に活かし、急変時の対応に取り組んでいます。',
  },
  {
    name: '立木 規与秀',
    role: '医師',
    specialty: '救急・緊急対応・一般内科',
    qualifications: null,
    education: null,
    career: null,
    hobbies: null,
    image: null,
    message: '緊急時でも冷静に対処できる救急科の知識を活かし、在宅での安心を支えます。',
  },
];

export const seishinika: Doctor[] = [
  {
    name: '石本 英之',
    role: '精神科専門医',
    specialty: '精神科・心療内科・一般内科',
    qualifications: ['精神保健指定医', '医学博士', '日本神経精神学会 専門医', '日本医師会認定 産業医'],
    education:
      '平成22年　大阪市立大学医学部卒\n神戸市立医療センター西市民病院　初期研修修了\n大阪市立大学医学部付属病院　神経精神科\n平成29年　大阪市立大学医学部大学院卒',
    career: null,
    hobbies: 'ゴルフ、読書、スポーツ観戦、虫取り',
    image: legacyPortrait('ishimoto.jpg'),
    message: '皆さんが笑顔になるように、明るく楽しく頑張ります！',
  },
  {
    name: '菅近 優',
    role: '精神科専門医・指導医',
    specialty: '精神科・心療内科・一般内科',
    qualifications: ['精神保健指定医', '医学博士', '日本神経精神学会 専門医・指導医', '日本医師会認定 産業医'],
    education:
      '平成20年　福岡大学医学部卒\n大阪市立大学医学部附属病院　卒後臨床研修プログラム修了\n大阪市立大学医学部付属病院　神経精神科\n平成27年　大阪市立大学医学部大学院卒\n桐葉会　木島病院　精神科',
    career: null,
    hobbies: 'ゴルフ、スポーツ観戦、旅行、ゲーム',
    image: legacyPortrait('kanchika.jpg'),
    message: '患者さんとそのご家族の満足する医療を目指しています！',
  },
  {
    name: '西田 宜代',
    role: '精神科専門医',
    specialty: '精神科・心療内科',
    qualifications: null,
    education: null,
    career: null,
    hobbies: null,
    image: null,
    message: 'お薬の管理から日常生活の相談まで、ご本人だけでなくご家族の不安にも寄り添います。',
  },
];

export const shoninka: Doctor[] = [
  {
    name: '河内 要',
    role: 'かもめクリニック第4 院長',
    specialty: '小児科・小児循環器・一般内科',
    qualifications: null,
    education: '平成22年　大阪市立大学医学部卒',
    career: null,
    hobbies: 'フットサル、ウインドウショッピング、ジムでの運動',
    image: legacyPortrait('kawauchi.jpg'),
    message:
      '小児科では生まれつきの御病気のために治療を続けている方の診療を担当させて頂くことが多かったです。\nその中には通院が困難な方も多く、御家族様が苦労して通院されている場面によく遭遇していました。この度、かもめグループに勤務することでそのような方に訪問診療を通じて自宅で安心して過ごせる環境を提供できるように尽力します。',
  },
];

export const doctorIntroSections: SectionConfig[] = [
  {
    id: 'naika',
    label: '内科',
    icon: 'tabler:stethoscope',
    accent: 'bg-sky-600',
    accentLight: 'bg-sky-50 dark:bg-slate-800',
    accentText: 'text-sky-700 dark:text-sky-300',
    accentBorder: 'border-sky-100 dark:border-slate-700',
    placeholderBg: 'bg-sky-50 dark:bg-slate-700',
    placeholderText: 'text-sky-300 dark:text-slate-500',
    quoteBg: 'bg-sky-50 dark:bg-slate-700',
    quoteLabel: 'text-sky-600 dark:text-sky-400',
    doctors: naika,
  },
  {
    id: 'seishinika',
    label: '精神科',
    icon: 'tabler:brain',
    accent: 'bg-purple-600',
    accentLight: 'bg-purple-50 dark:bg-slate-900',
    accentText: 'text-purple-700 dark:text-purple-300',
    accentBorder: 'border-purple-100 dark:border-slate-700',
    placeholderBg: 'bg-purple-50 dark:bg-slate-700',
    placeholderText: 'text-purple-300 dark:text-slate-500',
    quoteBg: 'bg-purple-50 dark:bg-slate-700',
    quoteLabel: 'text-purple-600 dark:text-purple-400',
    doctors: seishinika,
  },
  {
    id: 'shoninka',
    label: '小児科',
    icon: 'tabler:baby-carriage',
    accent: 'bg-emerald-600',
    accentLight: 'bg-emerald-50 dark:bg-slate-800',
    accentText: 'text-emerald-700 dark:text-emerald-300',
    accentBorder: 'border-emerald-100 dark:border-slate-700',
    placeholderBg: 'bg-emerald-50 dark:bg-slate-700',
    placeholderText: 'text-emerald-300 dark:text-slate-500',
    quoteBg: 'bg-emerald-50 dark:bg-slate-700',
    quoteLabel: 'text-emerald-600 dark:text-emerald-400',
    doctors: shoninka,
  },
];
