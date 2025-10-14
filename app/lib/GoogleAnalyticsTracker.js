"use client";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function GoogleAnalyticsTracker() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window.gtag !== "undefined") {
      window.gtag("config", "G-2KSVF1CN8W", {
        page_path: pathname,
      });
    }
  }, [pathname]);

  return null;
}
