"use client";
import { useRouter } from "next/navigation";

interface Localization {
  slug?: string;
  locale: string;
}

interface LanguageSwitcherProps {
  currentLocale: string;
  currentSlug?: string;
  localizations: Localization[];
  basePath?: string;
}

export function LanguageSwitcher({
  currentLocale,
  currentSlug,
  localizations,
  basePath,
}: Readonly<LanguageSwitcherProps>) {
  const router = useRouter();

  if (!localizations?.length) return null;

  const allLocales = [
    { slug: currentSlug, locale: currentLocale },
    ...localizations,
  ];

  function handleSwitch(loc: Localization) {
    if (basePath && loc.slug) {
      router.push(`/${basePath}/${loc.slug}`);
    } else {
      router.push(`/?locale=${loc.locale}`);
    }
  }

  return (
    <div className="flex gap-2">
      {allLocales.map((loc) => (
        <button
          key={loc.locale}
          onClick={() => handleSwitch(loc)}
          className={`px-3 py-1 rounded text-sm font-medium border ${
            currentLocale === loc.locale
              ? "bg-teal-600 text-white border-teal-600"
              : "bg-white text-gray-600 border-gray-300 hover:border-teal-500"
          }`}
        >
          {loc.locale.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
