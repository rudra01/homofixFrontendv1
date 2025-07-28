'use client'
import Script from "next/script"
const Googletags = () =>{
  return (
    <>
        <Script
                strategy="afterInteractive"
                src={`https://www.googletagmanager.com/gtag/js?id=AW-16494970140`}
            />
            <Script
                id="google-analytics-init"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                    __html: `
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                  
                    gtag('config', 'AW-16494970140');                  
                    `,
                }}
            />
            
    </>
  )
}
export default Googletags;