import Link from 'next/link';
import { Globe } from 'lucide-react';

const localeLabels: Record<string, string> = {
  en: 'EN',
  id: 'ID',
};

interface LanguageSwitcherProps {
  currentLocale: string;
  availableLocales: { locale: string; slug: string }[];
}

export function LanguageSwitcher({ currentLocale, availableLocales }: LanguageSwitcherProps) {
  if (availableLocales.length <= 1) return null;

  return (
    <div className="flex items-center gap-1.5 text-sm">
      <Globe className="w-3.5 h-3.5 text-muted-foreground" />
      <div className="flex items-center rounded-md border border-border/50 overflow-hidden">
        {availableLocales.map(({ locale, slug }) => {
          const isActive = locale === currentLocale;
          return isActive ? (
            <span
              key={locale}
              className="px-2.5 py-1 text-xs font-medium bg-primary text-primary-foreground"
            >
              {localeLabels[locale] || locale.toUpperCase()}
            </span>
          ) : (
            <Link
              key={locale}
              href={`/blog/${slug}`}
              className="px-2.5 py-1 text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
            >
              {localeLabels[locale] || locale.toUpperCase()}
            </Link>
          );
        })}
      </div>
    </div>
  );
}

/**
 * Compact language badges for the blog list page.
 */
export function LanguageBadges({ locales }: { locales: { locale: string; slug: string }[] }) {
  if (locales.length <= 1) return null;

  return (
    <div className="flex items-center gap-1">
      <Globe className="w-3 h-3 text-muted-foreground" />
      {locales.map(({ locale }) => (
        <span
          key={locale}
          className="text-[10px] font-medium text-muted-foreground uppercase"
        >
          {localeLabels[locale] || locale.toUpperCase()}
        </span>
      ))}
    </div>
  );
}
