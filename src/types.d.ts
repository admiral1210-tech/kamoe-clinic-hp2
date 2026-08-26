import type { AnchorHTMLAttributes } from 'react';

export interface Image {
  src: string;
  alt?: string;
}

export interface Item {
  title?: string;
  description?: string;
  /** 指定時は常に表示し、description は「続きを読む」内に表示（長文カードの段階開示） */
  descriptionSummary?: string;
  icon?: string;
  /** ItemGrid2 等でカードを視覚的に強調（採用LPの差別化項目など） */
  highlight?: boolean;
  classes?: Record<string, string>;
  callToAction?: CallToAction;
  image?: Image;
}

export interface CallToAction extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'type'> {
  variant?: 'primary' | 'secondary' | 'tertiary' | 'link' | 'line' | 'floatingCtaTel' | 'floatingCtaForm';
  text?: string;
  icon?: string;
  /** アイコンをテキストの前（左）に配置。未指定時は variant から自動判定 */
  iconBefore?: boolean;
  classes?: Record<string, string>;
  type?: 'button' | 'submit' | 'reset';
}
