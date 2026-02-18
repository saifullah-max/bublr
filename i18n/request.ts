import { getRequestConfig } from "next-intl/server";
import { locales, defaultLocale } from "./config";

export default getRequestConfig(async ({ locale }) => {
  const resolvedLocale =
    locale && locales.includes(locale as (typeof locales)[number])
      ? locale
      : defaultLocale;

  const messages = (await import(`../messages/${resolvedLocale}.json`)).default;
  // console.log("Loaded messages for locale:", resolvedLocale, messages);

  return {
    locale: resolvedLocale,
    messages,
  };
});
