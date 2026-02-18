"use client";

import { useRef } from "react";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { ChevronDown, Globe } from "lucide-react";

type LocaleOption = {
  code: string;
  label: string;
  name: string;
};

const localeOptions: LocaleOption[] = [
  { code: "en", label: "EN", name: "English" },
  { code: "es", label: "ES", name: "Espanol" },
  { code: "fr", label: "FR", name: "Francais" },
  { code: "pt", label: "PT", name: "Portugues" },
];

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const detailsRef = useRef<HTMLDetailsElement>(null);

  const switchLocale = (newLocale: string) => {
    const pathnameWithoutLocale = pathname.replace(/^\/(en|es|fr|pt)/, "") || "/";
    const newPath = `/${newLocale}${pathnameWithoutLocale === "/" ? "" : pathnameWithoutLocale}`;
    router.push(newPath);
    router.refresh();
    detailsRef.current?.removeAttribute("open");
  };

  const activeLocale =
    localeOptions.find((option) => option.code === locale) ?? localeOptions[0];

  return (
    <div className="relative " aria-label="Language">
      <details ref={detailsRef} className="group">
        <summary className="flex cursor-pointer list-none items-center gap-2 rounded-full border border-white/20 bg-black px-3 py-2 text-xs font-semibold uppercase tracking-wide text-white">
          <span>{activeLocale.label}</span>
          <Globe className="h-4 w-4 text-[#FF7200]" aria-hidden="true" />
          <ChevronDown
            className="h-4 w-4 text-white/70 transition group-open:rotate-180"
            aria-hidden="true"
          />
        </summary>
        <div className="absolute right-0 z-20 mt-2 w-36 rounded-2xl border border-black/10 bg-white p-2 shadow-lg">
          {localeOptions.map((option) => (
            <button
              key={option.code}
              type="button"
              onClick={() => switchLocale(option.code)}
              className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-xs font-semibold uppercase transition ${
                option.code === locale
                  ? "bg-[#FF7200] text-white"
                  : "text-black hover:bg-black/5"
              }`}
              aria-current={option.code === locale ? "page" : undefined}
            >
              <span>{option.label}</span>
              <span className="text-[10px] font-medium normal-case text-black/60">
                {option.name}
              </span>
            </button>
          ))}
        </div>
      </details>
    </div>
  );
}