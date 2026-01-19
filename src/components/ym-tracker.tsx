"use client";

import { useEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { trackPageView } from "@/lib/ym";

export function YandexMetrikaTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const query = searchParams?.toString();
  const hasTrackedInitial = useRef(false);

  useEffect(() => {
    if (!hasTrackedInitial.current) {
      hasTrackedInitial.current = true;
      return;
    }
    const url = query ? `${pathname}?${query}` : pathname;
    trackPageView(url);
  }, [pathname, query]);

  return null;
}
