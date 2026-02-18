import { getTranslations, setRequestLocale } from "next-intl/server";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import ClientLocaleSync from "../ClientLocaleSync";
import LanguageSwitcher from "../LanguageSwitcher";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({
    locale,
    namespace: "About",
  });

  return {
    title: t("meta.title"),
    description: t("meta.description"),
    alternates: {
      canonical: `/${locale}/about-us`,
      languages: {
        en: "/en/about-us",
        es: "/es/about-us",
        fr: "/fr/about-us",
        pt: "/pt/about-us",
      },
    },
    openGraph: {
      title: t("meta.title"),
      description: t("meta.description"),
      url: `/${locale}/about-us`,
      siteName: "Bubld Wash",
      locale,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: t("meta.title"),
      description: t("meta.description"),
    },
  };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({
    locale,
    namespace: "About",
  });

  const storyItems = t.raw("story.items");
  const missionItems = t.raw("mission.items");
  const valueItems = t.raw("values.items");

  return (
    <>
      <ClientLocaleSync />
      <div className="min-h-screen bg-sand text-foreground">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-6 focus:top-6 focus:rounded-full focus:bg-white focus:px-4 focus:py-2"
        >
          Skip to content
        </a>
        <header className="relative">
          <div className="mx-auto flex w-full items-center justify-between px-6 py-6 bg-black">
            <Link
              href={`/${locale}`}
              className="flex items-center gap-3 text-lg font-semibold"
              aria-label="Bubld Wash"
            >
              <Image
                src="/logo.svg"
                height={150}
                width={150}
                alt="Bubld Wash logo"
                priority
                sizes="150px"
              />
            </Link>
            <nav
              className="hidden items-center gap-10 text-base font-medium lg:flex"
              aria-label="Primary"
            >
              <ul className="flex items-center gap-10" role="list">
                <li>
                  <Link href={`/${locale}`} className="text-white hover:text-[#FF7200]">
                    Home
                  </Link>
                </li>
                <li>
                  <LanguageSwitcher />
                </li>
              </ul>
            </nav>
          </div>
        </header>

        <main id="main">
          {/* Hero Section */}
          <section
            className="mx-auto grid w-full gap-12 px-6 py-16 sm:px-8 lg:px-12"
            aria-labelledby="about-hero-title"
          >
            <div className="space-y-6 mx-auto max-w-4xl w-full text-center">
              <h1
                id="about-hero-title"
                className="font-display text-5xl font-bold leading-tight text-black md:text-6xl"
              >
                {t("hero.title")}
              </h1>
              <p className="text-lg text-black/90 md:text-xl">
                {t("hero.subtitle")}
              </p>
            </div>
          </section>

          {/* Story Section */}
          <section
            className="mx-auto w-full px-6 py-16 sm:px-8 lg:px-12"
            aria-labelledby="about-story-title"
          >
            <div className="mx-auto max-w-4xl">
              <h2
                id="about-story-title"
                className="mb-12 text-3xl font-bold text-black sm:text-4xl"
              >
                {t("story.title")}
              </h2>

              <div className="space-y-8">
                {Array.isArray(storyItems) &&
                  storyItems.map((item: any, idx: number) => (
                    <article key={idx} className="border-l-4 border-[#FF7200] pl-6">
                      <h3 className="mb-2 text-2xl font-semibold text-black">
                        {item.title}
                      </h3>
                      <p className="text-black/80 leading-relaxed">{item.body}</p>
                    </article>
                  ))}
              </div>
            </div>
          </section>

          {/* Mission Section */}
          <section
            className="mx-auto w-full px-6 py-16 sm:px-8 lg:px-12"
            aria-labelledby="about-mission-title"
          >
            <div className="mx-auto max-w-4xl">
              <h2
                id="about-mission-title"
                className="mb-12 text-3xl font-bold text-black sm:text-4xl"
              >
                {t("mission.title")}
              </h2>

              <div className="grid gap-8 md:grid-cols-2">
                {Array.isArray(missionItems) &&
                  missionItems.map((item: any, idx: number) => (
                    <div
                      key={idx}
                      className="rounded-lg bg-white p-6 shadow-sm ring-1 ring-black/5"
                    >
                      <h3 className="mb-3 text-xl font-semibold text-black">
                        {item.title}
                      </h3>
                      <p className="text-black/80">{item.body}</p>
                    </div>
                  ))}
              </div>
            </div>
          </section>

          {/* Values Section */}
          <section
            className="mx-auto w-full px-6 py-16 sm:px-8 lg:px-12"
            aria-labelledby="about-values-title"
          >
            <div className="mx-auto max-w-4xl">
              <h2
                id="about-values-title"
                className="mb-12 text-3xl font-bold text-black sm:text-4xl"
              >
                {t("values.title")}
              </h2>

              <div className="grid gap-6 md:grid-cols-3">
                {Array.isArray(valueItems) &&
                  valueItems.map((item: any, idx: number) => (
                    <article
                      key={idx}
                      className="rounded-lg border border-black/10 bg-white p-6 text-center"
                    >
                      <div className="mb-4 text-4xl font-bold text-[#FF7200]">
                        {(idx + 1).toString().padStart(2, "0")}
                      </div>
                      <h3 className="mb-2 text-lg font-semibold text-black">
                        {item.title}
                      </h3>
                      <p className="text-sm text-black/80">{item.body}</p>
                    </article>
                  ))}
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section
            className="mx-auto w-full bg-[#FF7200] px-6 py-16 text-center sm:px-8 lg:px-12"
            aria-labelledby="about-cta-title"
          >
            <div className="mx-auto max-w-2xl">
              <h2
                id="about-cta-title"
                className="mb-4 text-3xl font-bold text-white sm:text-4xl"
              >
                {t("cta.title")}
              </h2>
              <p className="mb-8 text-lg text-white/90">{t("cta.subtitle")}</p>
              <Link
                href={`/${locale}`}
                className="inline-flex items-center gap-2 rounded-lg bg-black px-8 py-3 font-semibold text-white transition-all hover:bg-black/90 active:scale-95"
              >
                {t("cta.button")}
                <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}
