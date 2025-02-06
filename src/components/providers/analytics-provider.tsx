'use client';

import Script from 'next/script';

const GA_ID = 'G-H1VGMCKL3D'; // Hardcode for testing

function AnalyticsContent() {
  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="lazyOnload"
      />
      <Script id="ga-script" strategy="lazyOnload">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_ID}');
          console.log('GA initialized');
        `}
      </Script>
    </>
  );
}

export function AnalyticsProvider() {
  return <AnalyticsContent />;
} 