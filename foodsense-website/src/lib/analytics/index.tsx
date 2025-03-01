"use client";

import Script from "next/script";
import { Analytics } from "@vercel/analytics/react";
import React, { useEffect } from "react";
import { initializeClarity } from "./clarity-config";

export function AnalyticsProvider(): React.ReactNode {
  useEffect(() => {
    // Initialize Clarity with custom configurations
    initializeClarity();
  }, []);

  return (
    <React.Fragment>
      <Analytics />
      {/* Microsoft Clarity */}
      <Script strategy="afterInteractive" id="microsoft-clarity">
        {`
          (function(c,l,a,r,i,t,y){
            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "${process.env.NEXT_PUBLIC_CLARITY_ID}");
        `}
      </Script>
      {/* Google Analytics */}
      <Script
        strategy="lazyOnload"
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}`}
      />
      <Script
        id="google-analytics"
        strategy="lazyOnload"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
    </React.Fragment>
  );
}
