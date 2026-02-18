"use client";

import { useEffect } from "react";
import { useLocale } from "next-intl";

export default function ClientLocaleSync() {
  const locale = useLocale();

  useEffect(() => {
    // console.log("Synchronizing client-side locale:", locale);
  }, [locale]);

  return null;
}