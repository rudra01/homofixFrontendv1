'use client'
import Script from 'next/script'
export default function Scripthead() {
  return (
    <>
    

        <Script src="https://ebz-static.s3.ap-south-1.amazonaws.com/easecheckout/easebuzz-checkout.js" strategy="lazyOnload"
        onLoad={() =>
          console.log(`script loaded correctly, window.FB has been populated`)
        } />
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-0KJ071CS4W" />
        <Script id="google-analytics">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
  
            gtag('config', 'G-0KJ071CS4W');
          `}
        </Script>
    </>
  )
}
