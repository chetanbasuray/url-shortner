"use client"; // required if using any hooks, optional if just returning script
import Script from "next/script";

export default function GoogleAnalytics() {
  return (
    <>
      {/* Global site tag (gtag.js) - Google Analytics */}
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=G-2KSVF1CN8W`}
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-2KSVF1CN8W', {
            page_path: window.location.pathname,
          });
        `}
      </Script>
    </>
  );
}
