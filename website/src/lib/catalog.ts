import { catalog, type CatalogItem } from '../generated/catalog';

export { catalog, type CatalogItem };

export const FEATURED = ['chunk', 'get', 'retry', 'debounce', 'groupBy'] as const;

export function groupedCatalog(): { name: string; items: CatalogItem[] }[] {
  const map = new Map<string, CatalogItem[]>();
  for (const item of catalog) {
    const list = map.get(item.category);
    if (list) {
      list.push(item);
    } else {
      map.set(item.category, [item]);
    }
  }
  return [...map.entries()].map(([name, items]) => ({ name, items }));
}

export function findFunction(category: string, name: string): CatalogItem | undefined {
  return catalog.find((item) => item.category === category && item.name === name);
}

export function searchCatalog(query: string): CatalogItem[] {
  const needle = query.trim().toLowerCase();
  if (!needle) return [];
  return catalog.filter(
    (item) =>
      item.name.toLowerCase().includes(needle) ||
      item.summary.toLowerCase().includes(needle) ||
      item.category.toLowerCase().includes(needle),
  );
}

export function featuredItems(): CatalogItem[] {
  return FEATURED.map((name) => catalog.find((item) => item.name === name)).filter(
    (item): item is CatalogItem => item !== undefined,
  );
}
