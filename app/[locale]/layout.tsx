import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { locales, type Locale } from "../../i18n/config";

type Props = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  const resolvedLocale = locale as Locale;

  if (!locales.includes(resolvedLocale)) {
    notFound();
  }

  setRequestLocale(resolvedLocale);

  const messages = await getMessages();

  return (
    <NextIntlClientProvider key={resolvedLocale} locale={resolvedLocale} messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
}
