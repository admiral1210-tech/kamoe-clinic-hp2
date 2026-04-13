/**
 * 在支診1ページのコンテンツローダー。
 * テキストの単一ソースは src/content/copy/ja/zaishin1-content.json。
 */
import rawData from '~/content/copy/ja/zaishin1-content.json';

export interface Zaishin1BenefitCard {
  icon: string;
  title: string;
  description: string;
  badge: string;
}

export interface Zaishin1FeatureStat {
  title: string;
  description: string;
  icon: string;
}

export interface Zaishin1ComparisonRow {
  scene: string;
  withZaishin1: string;
  withoutExample: string;
}

export interface Zaishin1Comparison {
  caption: string;
  footnote: string;
  columnScene: string;
  columnWith: string;
  columnWithout: string;
  rows: Zaishin1ComparisonRow[];
}

export const zaishin1BenefitCards: Zaishin1BenefitCard[] = rawData.benefitCards;
export const zaishin1FeatureStats: Zaishin1FeatureStat[] = rawData.featureStats;
export const zaishin1Comparison: Zaishin1Comparison = rawData.comparison;
