/**
 * 医療費助成・診断書ページのコンテンツローダー。
 * テキストの単一ソースは src/content/copy/ja/joseikin-content.json。
 */
import rawData from '~/content/copy/ja/joseikin-content.json';

export interface JoseikinFlowStep {
  step: string;
  title: string;
  body: string;
}

export interface JoseikinFeatureItem {
  title: string;
  descriptionSummary: string;
  description: string;
  icon: string;
}

export interface JoseikinPointItem {
  icon: string;
  title: string;
  body: string;
}

export const joseikinFlowSteps: JoseikinFlowStep[] = rawData.flowSteps;
export const joseikinShindanshoFeatureItems: JoseikinFeatureItem[] = rawData.shindanshoFeatureItems;
export const joseikinJoseiFeatureItems: JoseikinFeatureItem[] = rawData.joseiFeatureItems;
export const joseikinPointItems: JoseikinPointItem[] = rawData.pointItems;
