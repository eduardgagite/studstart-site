"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { trackPageView } from "@/lib/ym";

export function YandexMetrikaTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const query = searchParams?.toString();

  useEffect(() => {
    const url = query ? `${pathname}?${query}` : pathname;
    trackPageView(url);
  }, [pathname, query]);

  return null;
}
