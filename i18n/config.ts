export const locales = ["en", "es", "fr", "pt"] as const;
export const defaultLocale = "en";

export type Locale = (typeof locales)[number];
