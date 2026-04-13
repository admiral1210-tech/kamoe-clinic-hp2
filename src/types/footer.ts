export type FooterLinkKind = 'internal' | 'external' | 'legacy-blog';

export interface FooterNavLink {
  text: string;
  href: string;
  ariaLabel?: string;
  /** 未指定は内部リンク（同一サイト・相対パス想定） */
  kind?: FooterLinkKind;
}

export interface FooterNavSection {
  title: string;
  links: FooterNavLink[];
  /** モバイルで折りたたみ表示する（長いセクション向け） */
  collapsibleMobile?: boolean;
}

interface FooterSocialLinkBase {
  ariaLabel: string;
  href: string;
}

/** アイコンフォント（tabler など）を使うソーシャルリンク */
interface FooterSocialIconLink extends FooterSocialLinkBase {
  icon: string;
  imageSrc?: never;
  variant?: never;
}

/** 画像（QRコードなど）を使うソーシャルリンク */
interface FooterSocialImageLink extends FooterSocialLinkBase {
  imageSrc: string;
  icon?: never;
  variant?: 'instagram-qr';
}

export type FooterSocialLink = FooterSocialIconLink | FooterSocialImageLink;

export interface FooterSecondaryLink {
  text: string;
  href: string;
}

export interface FooterData {
  links: FooterNavSection[];
  secondaryLinks: FooterSecondaryLink[];
  socialLinks: FooterSocialLink[];
}
