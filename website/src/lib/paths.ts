export type Locale = 'en' | 'zh';

export function localeFromPath(pathname: string): Locale {
  return pathname === '/zh' || pathname.startsWith('/zh/') ? 'zh' : 'en';
}

export function prefixFor(locale: Locale): string {
  return locale === 'zh' ? '/zh' : '';
}

export function stripLocale(pathname: string): string {
  if (pathname === '/zh') return '/';
  if (pathname.startsWith('/zh/')) {
    const rest = pathname.slice(3);
    return rest.startsWith('/') ? rest : `/${rest}`;
  }
  return pathname;
}

export function withLocale(pathname: string, locale: Locale): string {
  const rest = stripLocale(pathname);
  if (locale === 'zh') {
    return rest === '/' ? '/zh' : `/zh${rest}`;
  }
  return rest;
}

export function homePath(prefix: string): string {
  return prefix || '/';
}

export function apiPath(prefix: string, category?: string, name?: string): string {
  if (!category) return `${prefix}/api`;
  if (!name) return `${prefix}/api/${category}`;
  return `${prefix}/api/${category}/${name}`;
}
