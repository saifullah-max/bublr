import Link from "next/link";
import { getTranslations } from "next-intl/server";
import ApplyForm from "./components/ApplyForm";
import ClientLocaleSync from "./ClientLocaleSync";
import LanguageSwitcher from "./LanguageSwitcher";
import Image from "next/image";
import { Car, Droplets, MapPin, Shield, Sparkles, Timer } from "lucide-react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({
    locale,
    namespace: "Home",
  });

  return {
    title: t("meta.title"),
    description: t("meta.description"),
    alternates: {
      canonical: `/${locale}`,
      languages: {
        en: "/en",
        es: "/es",
        fr: "/fr",
        pt: "/pt",
      },
    },
    openGraph: {
      title: t("meta.title"),
      description: t("meta.description"),
      url: `/${locale}`,
      siteName: "Bubld Wash",
      locale,
      type: "website",
      images: [
        {
          url: "/car-wash-banner.svg",
          alt: "Bubld Wash mobile car wash",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t("meta.title"),
      description: t("meta.description"),
      images: ["/car-wash-banner.svg"],
    },
  };
}

type Props = {
  params: { locale: string }
};

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({
    locale,
    namespace: "Home",
  });

  // console.log("Server-side translations for locale:", locale);

  const benefits = t.raw("benefits.items") as Array<{
    title: string;
    body: string;
  }>;
  const steps = t.raw("how.steps") as Array<{
    title: string;
    body: string;
  }>;
  const services = t.raw("services.items") as Array<string>;
  const pricingItems = t.raw("pricing.items") as Array<{
    title: string;
    body: string;
  }>;
  const testimonials = t.raw("testimonials.items") as Array<{
    quote: string;
    name: string;
    role: string;
  }>;
  const faq = t.raw("faq.items") as Array<{ q: string; a: string }>;
  const applyBullets = t.raw("apply.bullets") as Array<string>;
  const serviceIcons = [Sparkles, Droplets, Shield, Timer, MapPin, Car];

  return (
    <>
      <ClientLocaleSync />
      <div className="min-h-screen bg-sand text-foreground">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-6 focus:top-6 focus:rounded-full focus:bg-white focus:px-4 focus:py-2"
        >
          {t("skip")}
        </a>
        <header className="relative overflow-hidden">
          <div className="mx-auto flex w-full items-center justify-between px-6 py-6 bg-black">
            <Link
              href={`/${locale}`}
              className="flex items-center gap-3 text-lg font-semibold"
              aria-label={t("nav.brand")}
            >
              <Image
                src='/logo.svg'
                height={150}
                width={150}
                alt="Bubld Wash logo"
                priority
                sizes="150px"
              />
            </Link>
            <nav
              className="hidden items-center gap-10 text-base font-medium lg:flex"
              aria-label={t("nav.aria")}
            >
              <ul className="flex items-center gap-10" role="list">
                <li>
                  <a href="#how" className="text-white hover:text-[#FF7200]">
                    {t("nav.how")}
                  </a>
                </li>
                <li>
                  <a href="/about-us" className="text-white hover:text-[#FF7200]">
                    {t("nav.about")}
                  </a>
                </li>
                <li>
                  <a href="#benefits" className="text-white hover:text-[#FF7200]">
                    {t("nav.benefits")}
                  </a>
                </li>
                <li>
                  <a href="#pricing" className="text-white hover:text-[#FF7200]">
                    {t("nav.pricing")}
                  </a>
                </li>
                <li>
                  <a href="#faq" className="text-white hover:text-[#FF7200]">
                    {t("nav.faq")}
                  </a>
                </li>
                <li>
                  <LanguageSwitcher />
                </li>
              </ul>
            </nav>
          </div>
          <section
            className="mx-auto grid w-full gap-12 px-6 pb-20 pt-10 lg:grid-cols-[0.8fr_1.2fr]"
            aria-labelledby="hero-title"
          >
            <div className="space-y-6">
              <span className="inline-flex rounded-full bg-[#FF7200]/15 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-black">
                {t("hero.eyebrow")}
              </span>
              <Image
                src='/logo.svg'
                height={200}
                width={200}
                alt="Bubld Wash"
                className="M-0"
                priority
                sizes="200px"
              />

              <h1
                id="hero-title"
                className="m-0 font-display text-6xl font-bold leading-tight text-black md:text-6xl"
              >
                {t("hero.title")}
              </h1>
              <p className="max-w-xl text-base leading-7 text-black/70 md:text-lg">
                {t("hero.subtitle")}
              </p>
              <div className="flex flex-col gap-3 sm:flex-row">
                <a
                  href="#apply"
                  className="inline-flex h-12 items-center justify-center rounded-full bg-[#FF7200] px-6 text-sm font-semibold text-white transition hover:-translate-y-px hover:bg-black"
                  aria-label={t("hero.primaryCta")}
                >
                  {t("hero.primaryCta")}
                </a>
                <a
                  href="#how"
                  className="inline-flex h-12 items-center justify-center rounded-full border border-black px-6 text-sm font-semibold text-black transition hover:bg-black hover:text-white"
                  aria-label={t("hero.secondaryCta")}
                >
                  {t("hero.secondaryCta")}
                </a>
              </div>
              <p className="text-sm text-black/60">{t("hero.trust")}</p>
            </div>
            <Image
              src='/car-wash-banner.svg'
              height={1400}
              width={1400}
              alt="Mobile car wash in action"
              priority
              sizes="(max-width: 1024px) 100vw, 60vw"
            />
          </section>
        </header>

        <main id="main" className="mx-auto w-full  px-6 pb-24">
          <section
            id="benefits"
            aria-labelledby="benefits-title"
            className="grid gap-10 py-16 lg:grid-cols-[1fr_1.2fr]"
          >
            <div className="space-y-4">
              <h2 id="benefits-title" className="font-display text-3xl font-bold text-black">
                {t("benefits.title")}
              </h2>
              <p className="text-black/70">{t("benefits.subtitle")}</p>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="overflow-hidden rounded-3xl border border-black/10 bg-white p-3">
                  <Image
                    src="/car-wash-banner.svg"
                    alt="Detail of a fresh wash"
                    width={600}
                    height={420}
                    className="h-40 w-full rounded-2xl object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 40vw"
                  />
                </div>
                <div className="overflow-hidden rounded-3xl border border-black/10 bg-white p-3">
                  <Image
                    src="/join-bubid.svg"
                    alt="Clean finish detail"
                    width={600}
                    height={420}
                    className="h-40 w-full rounded-2xl object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 40vw"
                  />
                </div>
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {benefits.map((item, index) => (
                <article
                  key={item.title}
                  className="border border-[#FF7200]/50 rounded-3xl bg-white p-6"
                  aria-label={item.title}
                >
                  <span className="text-sm font-bold uppercase tracking-[0.2em] text-[#FF7200]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-3 text-lg font-semibold">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-black/70">{item.body}</p>
                </article>
              ))}
            </div>
          </section>

          <section id="how" aria-labelledby="how-title" className="py-16">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div className="space-y-4">
                <h2 id="how-title" className="font-display text-4xl font-bold text-black">
                  {t("how.title")}
                </h2>
                <p className="max-w-xl text-black/70">{t("how.subtitle")}</p>
              </div>
              <p className="text-sm text-black/60">{t("how.note")}</p>
            </div>
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              <div className="overflow-hidden rounded-3xl border border-black/10 bg-white p-3">
                <Image
                  src="/car-wash-banner.svg"
                  alt="Wash process overview"
                  width={700}
                  height={500}
                  className="h-40 w-full rounded-2xl object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 33vw, 30vw"
                />
              </div>
              <div className="overflow-hidden rounded-3xl border border-black/10 bg-white p-3">
                <Image
                  src="/get-verified.jpg"
                  alt="Coverage area"
                  width={700}
                  height={500}
                  className="h-40 w-full rounded-2xl object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 33vw, 30vw"
                />
              </div>
              <div className="overflow-hidden rounded-3xl border border-black/10 bg-white p-3">
                <Image
                  src="/accept-job.jpg"
                  alt="Easy onboarding"
                  width={700}
                  height={500}
                  className="h-40 w-full rounded-2xl object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 33vw, 30vw"
                />
              </div>
            </div>
            <div className="mt-10 grid gap-5 lg:grid-cols-3">
              {steps.map((step, index) => (
                <article key={step.title} className="rounded-3xl border border-black/5 bg-white p-6">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#FF7200] text-sm font-semibold text-white">
                    {index + 1}
                  </div>
                  <h3 className="mt-4 text-lg font-semibold">{step.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-black/70">{step.body}</p>
                </article>
              ))}
            </div>
          </section>

          <section aria-labelledby="services-title" className="py-16">
            <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
              <div className="space-y-4">
                <h2 id="services-title" className="font-display text-4xl font-bold text-black">
                  {t("services.title")}
                </h2>
                <p className="text-black/70">{t("services.subtitle")}</p>
                <ul className="mt-6 grid gap-3 sm:grid-cols-2" role="list">
                  {services.map((service, index) => {
                    const Icon = serviceIcons[index % serviceIcons.length];
                    return (
                      <li
                        key={service}
                        className="flex items-center justify-between gap-3 rounded-2xl bg-white px-4 py-3 text-sm font-semibold text-black"
                      >
                        <span>{service}</span>
                        <Icon className="h-8 w-8 text-[#FF7200]" aria-hidden="true" />
                      </li>
                    );
                  })}
                </ul>
              </div>
              <div className="rounded-4xl border border-black/10 bg-white p-8">
                <div className="overflow-hidden rounded-3xl border border-black/10 bg-sand p-4">
                  <Image
                    src="/car-wash-banner.svg"
                    alt="Services in action"
                    width={700}
                    height={520}
                    className="h-44 w-full rounded-2xl object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 45vw, 35vw"
                  />
                </div>
                <h3 className="mt-6 font-display text-2xl font-semibold text-black">
                  {t("services.highlightTitle")}
                </h3>
                <p className="mt-4 text-sm leading-6 text-black/70">
                  {t("services.highlightBody")}
                </p>
                <div className="mt-6 inline-flex items-center rounded-full bg-[#FF7200] px-4 py-2 text-sm font-semibold text-white">
                  {t("services.highlightStat")}
                </div>
              </div>
            </div>
          </section>

          <section id="pricing" aria-labelledby="pricing-title" className="py-16">
            <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr]">
              <div className="space-y-4">
                <h2 id="pricing-title" className="font-display text-4xl font-bold text-black">
                  {t("pricing.title")}
                </h2>
                <p className="text-black/70">{t("pricing.subtitle")}</p>
                <div className="rounded-3xl bg-white p-6 shadow-[0_20px_60px_rgba(17,18,20,0.08)]">
                  <p className="text-sm text-black/70">{t("pricing.cardLabel")}</p>
                  <p className="mt-2 text-4xl font-semibold text-[#FF7200]">{t("pricing.cardValue")}</p>
                  <p className="mt-2 text-sm text-black/70">{t("pricing.cardNote")}</p>
                </div>
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <div className="overflow-hidden rounded-3xl border border-black/10 bg-white p-3">
                    <Image
                      src="/earning.png"
                      alt="Pricing package detail"
                      width={600}
                      height={420}
                      className="h-36 w-full rounded-2xl object-contain"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 40vw"
                    />
                  </div>
                  <div className="overflow-hidden rounded-3xl border border-black/10 bg-white p-3">
                    <Image
                      src="/earning-sec.jpeg"
                      alt="Flexible plan options"
                      width={600}
                      height={420}
                      className="h-36 w-full rounded-2xl object-cover"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 40vw"
                    />
                  </div>
                </div>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                {pricingItems.map((item) => (
                  <article key={item.title} className="rounded-3xl border border-black/5 bg-white p-6">
                    <h3 className="text-lg font-semibold">{item.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-black/70">{item.body}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section aria-labelledby="testimonials-title" className="py-16">
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <h2 id="testimonials-title" className="font-display text-4xl font-bold text-black">
                {t("testimonials.title")}
              </h2>
              <p className="text-sm text-black/70">{t("testimonials.subtitle")}</p>
            </div>
            <div className="mt-6 grid gap-4 sm:grid-cols-4">
              <div className="rounded-2xl border border-black/10 bg-white p-3">
                <Image
                  src="/logo.svg"
                  alt="Partner logo Bubld Wash"
                  width={200}
                  height={80}
                  className="h-10 w-full object-contain"
                  sizes="(max-width: 640px) 50vw, 20vw"
                />
              </div>
              <div className="rounded-2xl border border-black/10 bg-white p-3">
                <Image
                  src="/window.svg"
                  alt="Partner logo window icon"
                  width={200}
                  height={80}
                  className="h-10 w-full object-contain"
                  sizes="(max-width: 640px) 50vw, 20vw"
                />
              </div>
              <div className="rounded-2xl border border-black/10 bg-white p-3">
                <Image
                  src="/globe.svg"
                  alt="Partner logo globe icon"
                  width={200}
                  height={80}
                  className="h-10 w-full object-contain"
                  sizes="(max-width: 640px) 50vw, 20vw"
                />
              </div>
              <div className="rounded-2xl border border-black/10 bg-white p-3">
                <Image
                  src="/file.svg"
                  alt="Partner logo file icon"
                  width={200}
                  height={80}
                  className="h-10 w-full object-contain"
                  sizes="(max-width: 640px) 50vw, 20vw"
                />
              </div>
            </div>
            <div className="mt-8 grid gap-5 lg:grid-cols-3">
              {testimonials.map((item) => (
                <figure key={item.name} className="rounded-3xl bg-white p-6 shadow-[0_20px_60px_rgba(17,18,20,0.08)]">
                  <blockquote className="text-sm leading-6 text-black/70">“{item.quote}”</blockquote>
                  <figcaption className="mt-4 text-sm font-semibold">
                    {item.name}
                    <span className="block text-xs text-black/60">{item.role}</span>
                  </figcaption>
                </figure>
              ))}
            </div>
          </section>

          <section id="faq" aria-labelledby="faq-title" className="py-16">
            <h2 id="faq-title" className="font-display text-4xl font-bold text-black">
              {t("faq.title")}
            </h2>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              <div className="overflow-hidden rounded-3xl border border-black/10 bg-white p-3">
                <Image
                  src="/car-wash-banner.svg"
                  alt="FAQ support"
                  width={700}
                  height={520}
                  className="h-36 w-full rounded-2xl object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 33vw, 30vw"
                />
              </div>
              <div className="overflow-hidden rounded-3xl border border-black/10 bg-white p-3">
                <Image
                  src="/join-bubid.svg"
                  alt="FAQ details"
                  width={700}
                  height={520}
                  className="h-36 w-full rounded-2xl object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 33vw, 30vw"
                />
              </div>
              <div className="overflow-hidden rounded-3xl border border-black/10 bg-white p-3">
                <Image
                  src="/earning-sec.jpeg"
                  alt="FAQ coverage"
                  width={700}
                  height={520}
                  className="h-36 w-full rounded-2xl object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 33vw, 30vw"
                />
              </div>
            </div>
            <div className="mt-8 grid gap-4 lg:grid-cols-2">
              {faq.map((item) => (
                <details key={item.q} className="rounded-3xl border border-black/5 bg-white p-6">
                  <summary className="cursor-pointer text-base font-semibold text-black">
                    {item.q}
                  </summary>
                  <p className="mt-3 text-sm leading-6 text-black/70">{item.a}</p>
                </details>
              ))}
            </div>
          </section>

          <section id="apply" aria-labelledby="apply-title" className="py-16">
            <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr]">
              <div className="space-y-4">
                <h2 id="apply-title" className="font-display text-4xl font-bold text-black">
                  {t("apply.title")}
                </h2>
                <p className="text-black/70">{t("apply.subtitle")}</p>
                <ul className="mt-6 grid gap-3 text-sm text-black/70" role="list">
                  {applyBullets.map((bullet, index) => (
                    <li
                      key={bullet}
                      className="flex items-center gap-3 rounded-2xl bg-white px-4 py-3 border border-[#FF7200]/30"
                    >
                      <span className="text-sm font-bold text-[#FF7200]">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="font-semibold">{bullet}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <div className="overflow-hidden rounded-3xl border border-black/10 bg-white p-3">
                    <Image
                      src="/accept-job.jpg"
                      alt="Application preview"
                      width={600}
                      height={420}
                      className="h-32 w-full rounded-2xl object-cover"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 40vw"
                    />
                  </div>
                  <div className="overflow-hidden rounded-3xl border border-black/10 bg-white p-3">
                    <Image
                      src="/car-wash-banner.svg"
                      alt="Application locations"
                      width={600}
                      height={420}
                      className="h-32 w-full rounded-2xl object-cover"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 40vw"
                    />
                  </div>
                </div>
              </div>
              <ApplyForm
                labels={{
                  title: t("apply.form.title"),
                  name: t("apply.form.name"),
                  email: t("apply.form.email"),
                  phone: t("apply.form.phone"),
                  city: t("apply.form.city"),
                  experience: t("apply.form.experience"),
                  submit: t("apply.form.submit"),
                  note: t("apply.form.note"),
                }}
              />
            </div>
          </section>

          <section id="gallery" className="py-16">
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <h2 className="font-display text-4xl font-bold text-black">Gallery</h2>
              <p className="text-sm text-black/70">A quick look at the finish and details.</p>
            </div>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <div className="overflow-hidden rounded-3xl border border-black/10 bg-white p-3 shadow-lg">
                <Image
                  src="/engine-clean.svg"
                  alt="Engine cleaning detail"
                  width={600}
                  height={420}
                  className="h-48 w-full rounded-2xl object-contain"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
              <div className="overflow-hidden rounded-3xl border border-black/10 bg-white p-3 shadow-lg">
                <Image
                  src="/undercarriage-wash.svg"
                  alt="Undercarriage wash detail"
                  width={600}
                  height={420}
                  className="h-48 w-full rounded-2xl object-contain"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
              <div className="overflow-hidden rounded-3xl border border-black/10 bg-white p-3 shadow-lg">
                <Image
                  src="/carpet-clean.svg"
                  alt="Carpet cleaning detail"
                  width={600}
                  height={420}
                  className="h-48 w-full rounded-2xl object-contain"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
            </div>
          </section>

          <section id="cta" className="py-16">
            <div className="grid gap-8 rounded-4xl border border-black/10 bg-white p-10 lg:grid-cols-[1.2fr_0.8fr]">
              <div>
                <h2 className="font-display text-4xl font-bold text-black">{t("cta.title")}</h2>
                <p className="mt-4 text-lg text-black/70">{t("cta.subtitle")}</p>
                <a
                  href="#apply"
                  className="mt-6 inline-flex h-12 items-center justify-center rounded-full bg-[#FF7200] px-8 text-base font-semibold text-white transition hover:bg-black"
                >
                  {t("cta.button")}
                </a>
              </div>
              <div className="overflow-hidden rounded-3xl border border-black/10 bg-sand p-4">
                <Image
                  src="/car-wash-banner.svg"
                  alt="Call to action"
                  width={700}
                  height={520}
                  className="h-56 w-full rounded-2xl object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 45vw, 35vw"
                />
              </div>
            </div>
          </section>
        </main>

        <footer className="border-t border-black/5 bg-white">
          <div className="mx-auto flex w-full  flex-col gap-6 px-6 py-10 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="font-display text-lg font-semibold">{t("footer.brand")}</p>
              <p className="text-sm text-muted">{t("footer.tagline")}</p>
            </div>
            <div className="text-sm text-muted">
              <p>{t("footer.contact")}</p>
              <p>{t("footer.location")}</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}