import type { CatalogItem } from '../generated/catalog';
import type { Locale } from '../lib/paths';
import { apiZh } from './api.zh';
import { en, type Messages } from './en';
import { zh } from './zh';

export type { Messages };

export const messages: Record<Locale, Messages> = { en, zh };

export function apiSummary(item: CatalogItem, locale: Locale): string {
  if (locale === 'zh') {
    return apiZh[`${item.category}/${item.name}`] ?? item.summary;
  }
  return item.summary;
}
